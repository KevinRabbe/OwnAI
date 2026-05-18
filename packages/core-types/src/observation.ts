/**
 * Timeline-friendly observation (Roadmap 01 Phase 9, v0 contract).
 */

import type { CorrelationId, TaskId } from './ids.js';

export type ObservationKind =
  | 'task_created'
  | 'task_packet_created'
  | 'context_pack_created'
  | 'task_state_changed'
  | 'validation_started'
  | 'validation_completed'
  | 'replay_entry_created'
  | 'trust_updated'
  | 'task_completed'
  | 'task_failed'
  | 'custom';

export interface Observation {
  id: string;
  kind: ObservationKind;
  timestamp: string;
  taskId?: TaskId;
  correlationId?: CorrelationId;
  /** Small machine-readable payload; keep serializable. */
  data?: Record<string, unknown>;
  message?: string;
}
