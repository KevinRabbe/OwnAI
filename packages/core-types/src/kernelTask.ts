/**
 * Header for a cognition-kernel task (Roadmap 01). Distinct from pipeline `TaskNode` in core-state.
 */

import type {
  ContextPackId,
  RecoveryPointId,
  TaskId,
  TaskPacketId
} from './ids.js';

/** Lifecycle of a kernel task. */
export type KernelTaskStatus =
  | 'draft'
  | 'running'
  | 'blocked'
  | 'completed'
  | 'failed';

/**
 * Minimal task record shared across packet, context, validation, and replay subsystems.
 */
export interface KernelTask {
  id: TaskId;
  title: string;
  summary?: string;
  status: KernelTaskStatus;
  /** High-level step within the cognition loop (e.g. packet_build, validation). */
  phase?: string;
  taskPacketId?: TaskPacketId;
  contextPackId?: ContextPackId;
  recoveryPointId?: RecoveryPointId;
  createdAt: string;
  updatedAt: string;
}
