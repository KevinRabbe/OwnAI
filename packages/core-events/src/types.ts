export type EventSeverity = 'trace' | 'info' | 'warning' | 'error' | 'critical';

export interface OwnAIEvent<TPayload = unknown> {
  id: string;
  type: string;
  timestamp: string;
  source: string;
  taskId?: string;
  correlationId?: string;
  severity: EventSeverity;
  summary?: string;
  payload: TPayload;
  metadata?: Record<string, unknown>;
}

export type EventHandler<TPayload = unknown> = (
  event: OwnAIEvent<TPayload>
) => Promise<void> | void;

export interface EventSubscription {
  unsubscribe(): void;
}

export interface EventBus {
  emit<TPayload>(event: OwnAIEvent<TPayload>): Promise<void>;

  subscribe<TPayload>(
    eventType: string,
    handler: EventHandler<TPayload>
  ): EventSubscription;

  subscribeAll(handler: EventHandler): EventSubscription;
}

/** Optional history surface implemented by {@link InMemoryEventBus} (Phase 2 observability). */
export interface RecordedEventBus extends EventBus {
  getRecordedEvents(): readonly OwnAIEvent[];
  clearRecordedEvents(): void;
}

export const OWN_AI_EVENTS = {
  TASK_CREATED: 'task.created',
  TASK_QUEUED: 'task.queued',
  TASK_STARTED: 'task.started',
  TASK_COMPLETED: 'task.completed',
  TASK_FAILED: 'task.failed',
  TASK_BLOCKED: 'task.blocked',

  MODE_CHANGED: 'mode.changed',

  REPO_SCANNED: 'repo.scanned',
  MEMORY_INITIALIZED: 'memory.initialized',
  HEATMAP_GENERATED: 'heatmap.generated',
  NAVIGATION_MAP_GENERATED: 'navigation.map.generated',
  CONTEXT_PACK_GENERATED: 'context.pack.generated',

  FOCUS_CHANGED: 'focus.changed',
  MODEL_ROUTED: 'model.routed',
  THREAD_PLAN_CREATED: 'thread.plan.created',

  VERIFICATION_COMPLETED: 'verification.completed',
  PATCH_QUALITY_EVALUATED: 'patch.quality.evaluated',
  REPLAY_REPORT_GENERATED: 'replay.report.generated',

  TEMP_ARTIFACT_CREATED: 'temp.artifact.created',
  TEMP_ARTIFACT_DELETED: 'temp.artifact.deleted',

  PIPELINE_COMPLETED: 'pipeline.completed',
  PIPELINE_FAILED: 'pipeline.failed'
} as const;
