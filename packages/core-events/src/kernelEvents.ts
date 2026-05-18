/**
 * Roadmap 01 kernel event names and typed payloads (Phase 1 contracts).
 * Wire format uses `kernel.roadmap01.*` to avoid colliding with legacy `OWN_AI_EVENTS` values.
 */

import type {
  ContextPackId,
  DurableKernelTaskStateV0,
  KernelTaskStatus,
  Observation,
  ReplayEntryId,
  TaskId,
  TaskPacketId,
  TrustRecordId,
  ValidationGateId
} from '../../core-types/src/index.js';

import type { OwnAIEvent } from './types.js';

export const KERNEL_ROADMAP_01_EVENTS = {
  TASK_CREATED: 'kernel.roadmap01.task_created',
  TASK_PACKET_CREATED: 'kernel.roadmap01.task_packet_created',
  CONTEXT_PACK_CREATED: 'kernel.roadmap01.context_pack_created',
  TASK_STATE_CHANGED: 'kernel.roadmap01.task_state_changed',
  VALIDATION_STARTED: 'kernel.roadmap01.validation_started',
  VALIDATION_COMPLETED: 'kernel.roadmap01.validation_completed',
  REPLAY_ENTRY_CREATED: 'kernel.roadmap01.replay_entry_created',
  TRUST_UPDATED: 'kernel.roadmap01.trust_updated',
  OBSERVATION_RECORDED: 'kernel.roadmap01.observation_recorded',
  TASK_COMPLETED: 'kernel.roadmap01.task_completed',
  TASK_FAILED: 'kernel.roadmap01.task_failed'
} as const;

export type KernelRoadmap01EventType =
  (typeof KERNEL_ROADMAP_01_EVENTS)[keyof typeof KERNEL_ROADMAP_01_EVENTS];

/** Payload keyed by canonical kernel roadmap event string (literals align with `KERNEL_ROADMAP_01_EVENTS`). */
export type KernelRoadmap01EventPayloads = {
  'kernel.roadmap01.task_created': {
    taskId: TaskId;
    title?: string;
  };
  'kernel.roadmap01.task_packet_created': {
    taskId: TaskId;
    taskPacketId: TaskPacketId;
  };
  'kernel.roadmap01.context_pack_created': {
    taskId: TaskId;
    contextPackId: ContextPackId;
  };
  'kernel.roadmap01.task_state_changed': {
    taskId: TaskId;
    status: KernelTaskStatus;
    snapshot?: Partial<DurableKernelTaskStateV0>;
  };
  'kernel.roadmap01.validation_started': {
    taskId: TaskId;
    validationGateId: ValidationGateId;
  };
  'kernel.roadmap01.validation_completed': {
    taskId: TaskId;
    validationGateId: ValidationGateId;
    passed: boolean;
  };
  'kernel.roadmap01.replay_entry_created': {
    taskId: TaskId;
    replayEntryId: ReplayEntryId;
  };
  'kernel.roadmap01.trust_updated': {
    trustRecordId: TrustRecordId;
    taskId?: TaskId;
  };
  'kernel.roadmap01.observation_recorded': {
    observation: Observation;
  };
  'kernel.roadmap01.task_completed': {
    taskId: TaskId;
  };
  'kernel.roadmap01.task_failed': {
    taskId: TaskId;
    error?: string;
  };
};

export type KernelRoadmap01Payload<
  TType extends KernelRoadmap01EventType = KernelRoadmap01EventType
> = KernelRoadmap01EventPayloads[TType];

/** Discriminated `OwnAIEvent` variants for kernel roadmap traffic. */
export type KernelRoadmap01OwnAIEvent = {
  [K in KernelRoadmap01EventType]: OwnAIEvent<KernelRoadmap01EventPayloads[K]> & {
    type: K;
  };
}[KernelRoadmap01EventType];

export function isKernelRoadmap01EventType(
  value: string
): value is KernelRoadmap01EventType {
  return (Object.values(KERNEL_ROADMAP_01_EVENTS) as string[]).includes(value);
}
