/**
 * Focused context for model or operator use (Roadmap 01 Phase 5 shape, v0 contract).
 */

import type { ContextPackId, TaskId } from './ids.js';

/** One unit of context with an explicit rationale. */
export interface ContextPackItem {
  id: string;
  /** File path, URI, snippet id, or short label. */
  reference: string;
  /** Why this item was included. */
  reason: string;
  /** Optional body or pointer to stored content. */
  content?: string;
}

export interface ContextPackTrustMetadata {
  /** Conservative hint for downstream routing (0–1). */
  confidence?: number;
  sources?: string[];
}

export interface ContextPack {
  id: ContextPackId;
  taskId: TaskId;
  taskSummary: string;
  items: ContextPackItem[];
  constraints?: string[];
  validationTargets?: string[];
  /** Rough planning hint; not authoritative telemetry. */
  tokenBudgetEstimate?: number;
  trust?: ContextPackTrustMetadata;
  createdAt: string;
  updatedAt: string;
}
