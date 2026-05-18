/**
 * Logical domain event shape (transport-agnostic). `OwnAIEvent` in core-events adds severity and metadata.
 */

import type { CorrelationId, TaskId } from './ids.js';

export interface KernelDomainEvent<TPayload = unknown> {
  id: string;
  type: string;
  timestamp: string;
  taskId?: TaskId;
  correlationId?: CorrelationId;
  payload: TPayload;
}
