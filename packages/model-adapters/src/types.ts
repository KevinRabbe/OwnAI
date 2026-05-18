import type { ModelRole, PlanningDepth } from './modelRole.js';

export type ModelCapability =
  | 'reasoning'
  | 'coding'
  | 'compression'
  | 'planning'
  | 'verification';

export interface ModelRequest {
  systemPrompt?: string;
  prompt: string;
  contextFiles?: string[];
  maxTokens?: number;
  temperature?: number;
}

export interface ModelResponse {
  model: string;
  output: string;
  tokensEstimated: number;
  durationMs: number;
  provider?: string;
  role?: ModelRole;
}

export interface ModelAdapter {
  id: string;
  provider: string;
  capabilities: ModelCapability[];
  role?: ModelRole;

  generate(request: ModelRequest): Promise<ModelResponse>;
}

export interface RegisteredModel {
  id: string;
  provider: string;
  capabilities: ModelCapability[];
  role?: ModelRole;
  contextWindow?: number;
  recommendedUse?: string;
}

export interface ModelRouteDecision {
  adapter: ModelAdapter;
  modelId: string;
  role: ModelRole;
  planningDepth?: PlanningDepth;
  capability: ModelCapability;
  reason: string;
  ollamaAvailable: boolean;
}
