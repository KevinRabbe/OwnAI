import type { PlanningDepth } from './modelRole.js';
import { bootstrapModelRegistry } from './bootstrapRegistry.js';
import {
  buildPacketGoalRefinementPrompt,
  buildPlanningSystemPrompt
} from './planningPrompt.js';
import { ModelRouter } from './router.js';
import type { ModelRoutingConfig } from './routingConfig.js';

export interface RefineTaskGoalResult {
  goal: string;
  modelId: string;
  role: string;
  ollamaAvailable: boolean;
  usedModel: boolean;
}

/**
 * Optionally refine a raw request into a stronger packet goal via local routing.
 * Falls back to the raw request when Ollama is offline or generation fails.
 */
export async function refineTaskGoalWithLocalModel(params: {
  rawRequest: string;
  config: ModelRoutingConfig;
  planningDepth?: PlanningDepth;
}): Promise<RefineTaskGoalResult> {
  const depth = params.planningDepth ?? 'small';
  const { registry, ollamaAvailable } = await bootstrapModelRegistry(
    params.config
  );
  const router = new ModelRouter(registry, { ollamaAvailable });

  if (!ollamaAvailable) {
    return {
      goal: params.rawRequest.trim(),
      modelId: 'none',
      role: 'offline',
      ollamaAvailable: false,
      usedModel: false
    };
  }

  try {
    const result = await router.generate({
      capability: 'planning',
      planningDepth: depth,
      config: params.config,
      request: {
        systemPrompt: buildPlanningSystemPrompt(depth),
        prompt: buildPacketGoalRefinementPrompt(params.rawRequest),
        maxTokens: depth === 'deep' ? 800 : depth === 'medium' ? 500 : 256,
        temperature: 0.2
      }
    });

    const trimmed = result.output.trim();

    return {
      goal: trimmed.length > 0 ? trimmed : params.rawRequest.trim(),
      modelId: result.route.modelId,
      role: result.route.role,
      ollamaAvailable: true,
      usedModel: trimmed.length > 0
    };
  } catch {
    return {
      goal: params.rawRequest.trim(),
      modelId: 'error',
      role: 'worker',
      ollamaAvailable: true,
      usedModel: false
    };
  }
}
