import type { KnowledgeState } from './types.js';

export function calculateMemoryConfidence(params: {
  sizeBytes: number;
  todoCount: number;
  fixmeCount: number;
  verifiedByTests: boolean;
}): number {
  let confidence = 0.75;

  if (params.sizeBytes > 50_000) {
    confidence -= 0.1;
  }

  confidence -= params.todoCount * 0.01;
  confidence -= params.fixmeCount * 0.02;

  if (params.verifiedByTests) {
    confidence += 0.15;
  }

  return Math.max(0, Math.min(1, Number(confidence.toFixed(2))));
}

export function determineKnowledgeState(confidence: number): KnowledgeState {
  if (confidence >= 0.8) {
    return 'known';
  }

  if (confidence >= 0.45) {
    return 'partly_known';
  }

  return 'unknown';
}
