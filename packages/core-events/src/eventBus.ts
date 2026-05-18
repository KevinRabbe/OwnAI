import crypto from 'node:crypto';

import type {
  EventBus,
  EventHandler,
  EventSubscription,
  EventSeverity,
  OwnAIEvent
} from './types.js';

export class InMemoryEventBus implements EventBus {
  private handlers = new Map<string, Set<EventHandler>>();
  private globalHandlers = new Set<EventHandler>();

  async emit<TPayload>(event: OwnAIEvent<TPayload>): Promise<void> {
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
