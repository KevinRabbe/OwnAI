export interface OwnAIEvent<TPayload = unknown> {
  id: string;
  type: string;
  timestamp: string;
  source: string;
  taskId?: string;
  payload: TPayload;
}

export type EventHandler<TPayload = unknown> = (
  event: OwnAIEvent<TPayload>
) => Promise<void> | void;

export interface EventBus {
  emit<TPayload>(event: OwnAIEvent<TPayload>): Promise<void>;

  subscribe<TPayload>(
    eventType: string,
    handler: EventHandler<TPayload>
  ): void;
}

export const OWN_AI_EVENTS = {
  TASK_CREATED: 'task.created',
  REPO_SCANNED: 'repo.scanned',
  MEMORY_INITIALIZED: 'memory.initialized',
  HEATMAP_GENERATED: 'heatmap.generated',
  NAVIGATION_MAP_GENERATED: 'navigation.map.generated',
  CONTEXT_PACK_GENERATED: 'context.pack.generated',
  VERIFICATION_COMPLETED: 'verification.completed',
  REPLAY_REPORT_GENERATED: 'replay.report.generated',
  PIPELINE_COMPLETED: 'pipeline.completed',
  PIPELINE_FAILED: 'pipeline.failed'
} as const;
