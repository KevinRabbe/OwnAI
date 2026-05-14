import crypto from 'node:crypto';

import type {
  EventBus,
  EventHandler,
  OwnAIEvent
} from './types.js';

export class InMemoryEventBus implements EventBus {
  private handlers = new Map<string, EventHandler[]>();

  subscribe<TPayload>(
    eventType: string,
    handler: EventHandler<TPayload>
  ): void {
    const existingHandlers = this.handlers.get(eventType) ?? [];

    existingHandlers.push(handler as EventHandler);

    this.handlers.set(eventType, existingHandlers);
  }

  async emit<TPayload>(
    event: OwnAIEvent<TPayload>
  ): Promise<void> {
    const handlers = this.handlers.get(event.type) ?? [];

    for (const handler of handlers) {
      await handler(event);
    }
  }

  createEvent<TPayload>(params: {
    type: string;
    source: string;
    taskId?: string;
    payload: TPayload;
  }): OwnAIEvent<TPayload> {
    return {
      id: crypto.randomUUID(),
      type: params.type,
      timestamp: new Date().toISOString(),
      source: params.source,
      taskId: params.taskId,
      payload: params.payload
    };
  }
}
