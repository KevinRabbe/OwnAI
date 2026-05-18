/**
 * Port interfaces for Roadmap 01. Implementations live in feature packages; this module only references `core-types`.
 */

import type {
  ContextPack,
  ContextPackId,
  DurableKernelTaskStateV0,
  KernelTask,
  Observation,
  RecoveryPoint,
  RecoveryPointId,
  ReplayEntry,
  ReplayEntryId,
  TaskId,
  TaskPacket,
  TaskPacketId,
  TrustRecord,
  TrustRecordId,
  ValidationGate,
  ValidationGateId
} from '../../core-types/src/index.js';

/** Load and persist durable kernel task state (Phase 3). */
export interface DurableTaskStateRepository {
  load(taskId: TaskId): Promise<DurableKernelTaskStateV0 | undefined>;
  save(state: DurableKernelTaskStateV0): Promise<void>;
}

/** Kernel task header CRUD (optional split from durable state in implementations). */
export interface KernelTaskRepository {
  get(taskId: TaskId): Promise<KernelTask | undefined>;
  upsert(task: KernelTask): Promise<void>;
}

export interface TaskPacketRepository {
  get(id: TaskPacketId): Promise<TaskPacket | undefined>;
  save(packet: TaskPacket): Promise<void>;
}

export interface ContextPackRepository {
  get(id: ContextPackId): Promise<ContextPack | undefined>;
  save(pack: ContextPack): Promise<void>;
}

export interface ValidationGateRepository {
  listForTask(taskId: TaskId): Promise<ValidationGate[]>;
  get(id: ValidationGateId): Promise<ValidationGate | undefined>;
  save(gate: ValidationGate): Promise<void>;
}

export interface ReplayStore {
  append(entry: ReplayEntry): Promise<void>;
  get(id: ReplayEntryId): Promise<ReplayEntry | undefined>;
  listByTask(taskId: TaskId): Promise<ReplayEntry[]>;
}

export interface TrustRegistry {
  get(id: TrustRecordId): Promise<TrustRecord | undefined>;
  upsert(record: TrustRecord): Promise<void>;
  findByTarget(
    targetKind: TrustRecord['targetKind'],
    targetKey: TrustRecord['targetKey']
  ): Promise<TrustRecord | undefined>;
}

export interface RecoveryPointRepository {
  get(id: RecoveryPointId): Promise<RecoveryPoint | undefined>;
  save(point: RecoveryPoint): Promise<void>;
  latestForTask(taskId: TaskId): Promise<RecoveryPoint | undefined>;
}

/** Accepts timeline observations (Phase 9). */
export interface ObservationSink {
  record(observation: Observation): Promise<void>;
}

/** Append-only timeline writer (e.g. JSONL file in Phase 9). */
export interface TimelineWriter extends ObservationSink {
  flush(): Promise<void>;
}
