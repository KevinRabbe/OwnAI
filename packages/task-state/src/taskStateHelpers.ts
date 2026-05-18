import type { DurableKernelTaskStateV0 } from '../../core-types/src/durableTaskState.js';
import type { TaskId } from '../../core-types/src/ids.js';
import type { KernelTaskStatus } from '../../core-types/src/kernelTask.js';

const UNFINISHED_STATUSES: KernelTaskStatus[] = [
  'draft',
  'running',
  'blocked'
];

/** Create a new durable task state record with timestamps. */
export function createInitialTaskState(
  taskId: TaskId,
  partial?: Partial<
    Omit<DurableKernelTaskStateV0, 'taskId' | 'createdAt' | 'updatedAt'>
  >
): DurableKernelTaskStateV0 {
  const now = new Date().toISOString();

  return {
    taskId,
    status: partial?.status ?? 'draft',
    currentPhase: partial?.currentPhase,
    taskPacketId: partial?.taskPacketId,
    contextPackId: partial?.contextPackId,
    modifiedFiles: partial?.modifiedFiles,
    validationStatus: partial?.validationStatus ?? 'not_started',
    acceptanceState: partial?.acceptanceState ?? 'not_evaluated',
    recoveryPointId: partial?.recoveryPointId,
    createdAt: now,
    updatedAt: now
  };
}

/** Merge a patch and bump `updatedAt`. */
export function updateTaskState(
  state: DurableKernelTaskStateV0,
  patch: Partial<Omit<DurableKernelTaskStateV0, 'taskId' | 'createdAt'>>
): DurableKernelTaskStateV0 {
  return {
    ...state,
    ...patch,
    taskId: state.taskId,
    createdAt: state.createdAt,
    updatedAt: new Date().toISOString()
  };
}

/** True when work was left unfinished (crash/restart detection). */
export function isInterruptedTaskState(
  state: DurableKernelTaskStateV0
): boolean {
  return UNFINISHED_STATUSES.includes(state.status);
}
