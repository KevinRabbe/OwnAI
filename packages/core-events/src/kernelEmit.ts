/**
 * Typed helpers for Roadmap 01 kernel events on {@link InMemoryEventBus}.
 */

import type { InMemoryEventBus } from './InMemoryEventBus.js';
import type {
  KernelRoadmap01EventPayloads,
  KernelRoadmap01EventType,
  KernelRoadmap01OwnAIEvent
} from './kernelEvents.js';
import type { EventSeverity, OwnAIEvent } from './types.js';

export type CreateKernelRoadmap01EventParams<
  TType extends KernelRoadmap01EventType
> = {
  type: TType;
  source: string;
  payload: KernelRoadmap01EventPayloads[TType];
  taskId?: string;
  correlationId?: string;
  severity?: EventSeverity;
  summary?: string;
  metadata?: Record<string, unknown>;
};

/** Build a kernel roadmap event with `type` and `payload` aligned to Phase 1 contracts. */
export function createKernelRoadmap01Event<
  TType extends KernelRoadmap01EventType
>(
  bus: InMemoryEventBus,
  params: CreateKernelRoadmap01EventParams<TType>
): KernelRoadmap01OwnAIEvent {
  const taskIdFromPayload =
    params.payload &&
    typeof params.payload === 'object' &&
    'taskId' in params.payload &&
    typeof (params.payload as { taskId?: unknown }).taskId === 'string'
      ? (params.payload as { taskId: string }).taskId
      : undefined;

  return bus.createEvent({
    type: params.type,
    source: params.source,
    taskId: params.taskId ?? taskIdFromPayload,
    correlationId: params.correlationId,
    severity: params.severity,
    summary: params.summary,
    payload: params.payload,
    metadata: params.metadata
  }) as KernelRoadmap01OwnAIEvent;
}

/** Create and emit a kernel roadmap event in one call. */
export async function emitKernelRoadmap01Event<
  TType extends KernelRoadmap01EventType
>(
  bus: InMemoryEventBus,
  params: CreateKernelRoadmap01EventParams<TType>
): Promise<KernelRoadmap01OwnAIEvent> {
  const event = createKernelRoadmap01Event(bus, params);
  await bus.emit(event as OwnAIEvent);
  return event;
}

/** Subscribe to one kernel roadmap event type with a typed handler. */
export function subscribeKernelRoadmap01<
  TType extends KernelRoadmap01EventType
>(
  bus: InMemoryEventBus,
  eventType: TType,
  handler: (event: Extract<KernelRoadmap01OwnAIEvent, { type: TType }>) => void | Promise<void>
) {
  return bus.subscribe(eventType, handler as (event: OwnAIEvent) => void | Promise<void>);
}
