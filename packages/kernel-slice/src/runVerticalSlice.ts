import crypto from 'node:crypto';

import { InMemoryEventBus } from '../../core-events/src/InMemoryEventBus.js';
import {
  emitKernelRoadmap01Event,
  KERNEL_ROADMAP_01_EVENTS
} from '../../core-events/src/index.js';
import { asTaskId, type TaskId } from '../../core-types/src/ids.js';
import {
  createContextPackFromTaskPacket,
  FileContextPackStore
} from '../../context-protocol/src/index.js';
import { FileTimelineWriter } from '../../observability-layer/src/index.js';
import {
  createReplayEntryFromTask,
  FileReplayStore
} from '../../replay-store/src/index.js';
import {
  createInitialTaskState,
  FileTaskStateStore,
  isInterruptedTaskState,
  updateTaskState
} from '../../task-state/src/index.js';
import {
  FileTaskPacketStore,
  generateTaskPacketFromRequest
} from '../../task-packet-generator/src/index.js';
import type { TrustTargetKey } from '../../core-types/src/trustRecord.js';
import {
  createTrustRecord,
  FileTrustRegistry,
  updateTrustFromOutcome
} from '../../trust-registry/src/index.js';
import {
  canAcceptTask,
  FileValidationGateStore,
  registerValidationGate,
  recordValidationResult
} from '../../validation-gates/src/index.js';

export interface RunVerticalSliceOptions {
  workspaceRoot: string;
  rawRequest: string;
  /** Resume an interrupted task when provided. */
  taskId?: TaskId;
  trustTargetKey?: TrustTargetKey;
}

export interface VerticalSliceResult {
  taskId: TaskId;
  resumed: boolean;
  completed: boolean;
  timelineEntries: number;
}

/**
 * Roadmap 01 Phase 10: run the minimal cognition loop end-to-end under `.ownai/`.
 */
export async function runVerticalSlice(
  options: RunVerticalSliceOptions
): Promise<VerticalSliceResult> {
  const bus = new InMemoryEventBus();
  const timeline = new FileTimelineWriter(options.workspaceRoot);
  const stateStore = new FileTaskStateStore(options.workspaceRoot);
  const packetStore = new FileTaskPacketStore(options.workspaceRoot);
  const contextStore = new FileContextPackStore(options.workspaceRoot);
  const validationStore = new FileValidationGateStore(options.workspaceRoot);
  const replayStore = new FileReplayStore(options.workspaceRoot);
  const trustRegistry = new FileTrustRegistry(options.workspaceRoot);

  let taskId = options.taskId ?? asTaskId(crypto.randomUUID());
  let resumed = false;

  let state =
    (await stateStore.load(taskId)) ??
    createInitialTaskState(taskId, {
      status: 'running',
      currentPhase: 'intake'
    });

  if (options.taskId && isInterruptedTaskState(state)) {
    resumed = true;
  } else if (!options.taskId) {
    await stateStore.save(state);
    await emitKernelRoadmap01Event(bus, {
      type: KERNEL_ROADMAP_01_EVENTS.TASK_CREATED,
      source: 'kernel-slice',
      payload: { taskId, title: options.rawRequest.slice(0, 80) }
    });
    await timeline.recordEvent(
      bus.getRecordedEvents()[bus.getRecordedEvents().length - 1]!
    );
  }

  let packet =
    (state.taskPacketId
      ? await packetStore.get(state.taskPacketId)
      : undefined) ??
    (await packetStore.getByTaskId(taskId));

  if (!packet) {
    packet = generateTaskPacketFromRequest({ taskId, rawRequest: options.rawRequest });
    await packetStore.save(packet);
    await emitKernelRoadmap01Event(bus, {
      type: KERNEL_ROADMAP_01_EVENTS.TASK_PACKET_CREATED,
      source: 'kernel-slice',
      payload: { taskId, taskPacketId: packet.id }
    });
    await timeline.recordEvent(
      bus.getRecordedEvents()[bus.getRecordedEvents().length - 1]!
    );
    state = updateTaskState(state, {
      taskPacketId: packet.id,
      currentPhase: 'task_packet'
    });
    await stateStore.save(state);
    await emitKernelRoadmap01Event(bus, {
      type: KERNEL_ROADMAP_01_EVENTS.TASK_STATE_CHANGED,
      source: 'kernel-slice',
      payload: { taskId, status: state.status, snapshot: state }
    });
  }

  let contextPack =
    (state.contextPackId
      ? await contextStore.get(state.contextPackId)
      : undefined) ?? (await contextStore.getByTaskId(taskId));

  if (!contextPack) {
    contextPack = createContextPackFromTaskPacket(packet);
    await contextStore.save(contextPack);
    await emitKernelRoadmap01Event(bus, {
      type: KERNEL_ROADMAP_01_EVENTS.CONTEXT_PACK_CREATED,
      source: 'kernel-slice',
      payload: { taskId, contextPackId: contextPack.id }
    });
    await timeline.recordEvent(
      bus.getRecordedEvents()[bus.getRecordedEvents().length - 1]!
    );
    state = updateTaskState(state, {
      contextPackId: contextPack.id,
      currentPhase: 'context_pack'
    });
    await stateStore.save(state);
  }

  let gates = await validationStore.listForTask(taskId);

  if (gates.length === 0) {
    let gate = registerValidationGate({
      taskId,
      type: 'manual_result',
      label: 'Operator confirms slice demo outcome',
      required: true
    });
    await validationStore.save(gate);
    await emitKernelRoadmap01Event(bus, {
      type: KERNEL_ROADMAP_01_EVENTS.VALIDATION_STARTED,
      source: 'kernel-slice',
      payload: { taskId, validationGateId: gate.id }
    });

    gate = recordValidationResult(gate, {
      status: 'passed',
      detail: 'v0 vertical slice manual validation'
    });
    await validationStore.save(gate);
    gates = [gate];

    await emitKernelRoadmap01Event(bus, {
      type: KERNEL_ROADMAP_01_EVENTS.VALIDATION_COMPLETED,
      source: 'kernel-slice',
      payload: { taskId, validationGateId: gate.id, passed: true }
    });
    await timeline.recordEvent(
      bus.getRecordedEvents()[bus.getRecordedEvents().length - 1]!
    );

    state = updateTaskState(state, {
      validationStatus: 'passed',
      acceptanceState: canAcceptTask(gates) ? 'accepted' : 'pending',
      currentPhase: 'validation'
    });
    await stateStore.save(state);
  }

  const existingReplay = await replayStore.listByTask(taskId);

  if (existingReplay.length === 0) {
    const entry = createReplayEntryFromTask({
      packet,
      contextPack,
      validationOutcome: 'passed',
      resultSummary: 'Vertical slice completed',
      lessonsLearned: ['Kernel loop wiring works in v0']
    });
    await replayStore.append(entry);
    await emitKernelRoadmap01Event(bus, {
      type: KERNEL_ROADMAP_01_EVENTS.REPLAY_ENTRY_CREATED,
      source: 'kernel-slice',
      payload: { taskId, replayEntryId: entry.id }
    });
    await timeline.recordEvent(
      bus.getRecordedEvents()[bus.getRecordedEvents().length - 1]!
    );
  }

  const trustKey =
    options.trustTargetKey ?? ('kernel-slice-v0' as TrustTargetKey);
  let trust =
    (await trustRegistry.findByTarget('workflow', trustKey)) ??
    createTrustRecord({
      targetKind: 'workflow',
      targetKey: trustKey,
      notes: 'Roadmap 01 vertical slice'
    });

  trust = updateTrustFromOutcome(trust, {
    validated: true,
    passed: true,
    evidenceRef: `task:${taskId}`
  });
  await trustRegistry.upsert(trust);
  await emitKernelRoadmap01Event(bus, {
    type: KERNEL_ROADMAP_01_EVENTS.TRUST_UPDATED,
    source: 'kernel-slice',
    payload: { trustRecordId: trust.id, taskId }
  });
  await timeline.recordEvent(
    bus.getRecordedEvents()[bus.getRecordedEvents().length - 1]!
  );

  state = updateTaskState(state, {
    status: 'completed',
    currentPhase: 'completed',
    acceptanceState: 'accepted'
  });
  await stateStore.save(state);

  await emitKernelRoadmap01Event(bus, {
    type: KERNEL_ROADMAP_01_EVENTS.TASK_COMPLETED,
    source: 'kernel-slice',
    payload: { taskId }
  });
  await timeline.recordEvent(
    bus.getRecordedEvents()[bus.getRecordedEvents().length - 1]!
  );

  const timelineEntries = (await timeline.readAll()).length;

  return {
    taskId,
    resumed,
    completed: state.status === 'completed',
    timelineEntries
  };
}
