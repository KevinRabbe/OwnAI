/**
 * Serializable resume handle for interrupted tasks (Roadmap 01).
 */

import type { RecoveryPointId, TaskId } from './ids.js';

export interface RecoveryPoint {
  id: RecoveryPointId;
  taskId: TaskId;
  /** Opaque pointer for storage layers (e.g. revision, offset, blob id). */
  checkpointRef: string;
  label?: string;
  createdAt: string;
  metadata?: Record<string, unknown>;
}
