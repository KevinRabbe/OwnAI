import crypto from 'node:crypto';

import type {
  EventBus,
  EventHandler,
  EventSubscription,
  EventSeverity,
  OwnAIEvent
} from './types.js';

/** Options for Roadmap 01 Phase 2 in-memory bus (history supports observability). */
export interface InMemoryEventBusOptions {
  /**
   * When true (default), every emitted event is appended to an in-memory ring buffer
   * for debugging and timeline adapters. Disable for hot paths or tests that assert heap size.
   */
  recordHistory?: boolean;
  /** Cap for retained events; oldest entries are dropped when exceeded. Default 10_000. */
  maxHistoryEntries?: number;
}

/**
 * In-process publish/subscribe bus. Implements {@link EventBus} and optional event history.
 * Roadmap deliverable: `packages/core-events/src/InMemoryEventBus.ts`.
 */
export class InMemoryEventBus implements EventBus {
  private readonly recordHistory: boolean;
  private readonly maxHistoryEntries: number;
  private readonly history: OwnAIEvent[] = [];

  private handlers = new Map<string, Set<EventHandler>>();
  private globalHandlers = new Set<EventHandler>();

  constructor(options?: InMemoryEventBusOptions) {
    this.recordHistory = options?.recordHistory ?? true;
    this.maxHistoryEntries = options?.maxHistoryEntries ?? 10_000;
  }

  /** Immutable snapshot of emitted events (newest last) when history recording is enabled. */
  getRecordedEvents(): readonly OwnAIEvent[] {
    return [...this.history];
  }

  clearRecordedEvents(): void {
    this.history.length = 0;
  }

  async emit<TPayload>(event: OwnAIEvent<TPayload>): Promise<void> {
    if (this.recordHistory) {
      this.history.push(event as OwnAIEvent);
      if (this.history.length > this.maxHistoryEntries) {
        this.history.splice(0, this.history.length - this.maxHistoryEntries);
      }
    }

    const scopedHandlers = this.handlers.get(event.type) ?? new Set();

    for (const handler of scopedHandlers) {
      await handler(event);
    }

    for (const handler of this.globalHandlers) {
      await handler(event);
    }
  }

  subscribe<TPayload>(
    eventType: string,
    handler: EventHandler<TPayload>
  ): EventSubscription {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, new Set());
    }

    const set = this.handlers.get(eventType)!;
    set.add(handler as EventHandler);

    return {
      unsubscribe: () => {
        set.delete(handler as EventHandler);
      }
    };
  }

  subscribeAll(handler: EventHandler): EventSubscription {
    this.globalHandlers.add(handler);

    return {
      unsubscribe: () => {
        this.globalHandlers.delete(handler);
      }
    };
  }

  createEvent<TPayload>(params: {
    type: string;
    source: string;
    taskId?: string;
    correlationId?: string;
    severity?: EventSeverity;
    summary?: string;
    payload: TPayload;
    metadata?: Record<string, unknown>;
  }): OwnAIEvent<TPayload> {
    return {
      id: crypto.randomUUID(),
      type: params.type,
      timestamp: new Date().toISOString(),
      source: params.source,
      taskId: params.taskId,
      correlationId: params.correlationId,
      severity: params.severity ?? 'info',
      summary: params.summary,
      payload: params.payload,
      metadata: params.metadata
    };
  }
}
