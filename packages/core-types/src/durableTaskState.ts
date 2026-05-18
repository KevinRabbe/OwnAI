/**
 * Durable on-disk task shape (Roadmap 01 Phase 3 preview; v0 contract only).
 */

import type {
  ContextPackId,
  RecoveryPointId,
  TaskId,
  TaskPacketId
} from './ids.js';

import type { KernelTaskStatus } from './kernelTask.js';

export type KernelValidationStatus =
  | 'not_started'
  | 'in_progress'
  | 'passed'
  | 'failed';

export type KernelAcceptanceState =
  | 'not_evaluated'
  | 'pending'
  | 'accepted'
  | 'rejected';

/**
 * Fields expected under `.ownai/tasks/<taskId>/state.json` in later phases.
 */
export interface DurableKernelTaskStateV0 {
  taskId: TaskId;
  status: KernelTaskStatus;
  currentPhase?: string;
  taskPacketId?: TaskPacketId;
  contextPackId?: ContextPackId;
  modifiedFiles?: string[];
  validationStatus?: KernelValidationStatus;
  acceptanceState?: KernelAcceptanceState;
  recoveryPointId?: RecoveryPointId;
  createdAt: string;
  updatedAt: string;
}
