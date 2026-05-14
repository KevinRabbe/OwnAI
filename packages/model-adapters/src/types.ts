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
}

export interface ModelAdapter {
  id: string;
  provider: string;
  capabilities: ModelCapability[];

  generate(request: ModelRequest): Promise<ModelResponse>;
}

export interface RegisteredModel {
  id: string;
  provider: string;
  capabilities: ModelCapability[];
  contextWindow?: number;
  recommendedUse?: string;
}
