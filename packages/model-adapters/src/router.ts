import type { ModelCapability, ModelRequest, ModelResponse } from './types.js';
import type { ModelRouteDecision } from './types.js';

import type { ModelRole, PlanningDepth } from './modelRole.js';
import { ModelRegistry } from './registry.js';
import type { ModelRoutingConfig } from './routingConfig.js';

export class ModelRouter {
  private ollamaAvailable: boolean;

  constructor(
    private readonly registry: ModelRegistry,
    options?: { ollamaAvailable?: boolean }
  ) {
    this.ollamaAvailable = options?.ollamaAvailable ?? false;
  }

  /**
   * Select adapter by capability and optional planning depth (Roadmap 02).
   */
  route(params: {
    capability: ModelCapability;
    planningDepth?: PlanningDepth;
    preferRole?: ModelRole;
    config: ModelRoutingConfig;
  }): ModelRouteDecision {
    const role =
      params.preferRole ??
      (params.planningDepth
        ? params.config.planningDepthRoles[params.planningDepth]
        : 'worker');

    const byRole = this.registry.findByRole(role);
    const byCapability = this.registry.findByCapability(params.capability);

    let candidates = byRole.filter(a =>
      byCapability.some(b => b.id === a.id)
    );

    if (candidates.length === 0) {
      candidates = byRole.length ? byRole : byCapability;
    }

    if (candidates.length === 0) {
      const any = this.registry.list();

      if (any.length === 0) {
        throw new Error('No model adapters registered');
      }

      const fallback = this.registry.get(any[0]!.id)!;
      return {
        adapter: fallback,
        modelId: fallback.id,
        role: fallback.role ?? 'worker',
        planningDepth: params.planningDepth,
        capability: params.capability,
        reason: 'fallback_first_registered',
        ollamaAvailable: this.ollamaAvailable
      };
    }

    const adapter = preferLocalAdapter(candidates, params.config.localOnly);

    return {
      adapter,
      modelId: adapter.id,
      role: adapter.role ?? role,
      planningDepth: params.planningDepth,
      capability: params.capability,
      reason: `role=${role},capability=${params.capability}`,
      ollamaAvailable: this.ollamaAvailable
    };
  }

  async generate(params: {
    capability: ModelCapability;
    request: ModelRequest;
    planningDepth?: PlanningDepth;
    preferRole?: ModelRole;
    config: ModelRoutingConfig;
  }): Promise<ModelResponse & { route: ModelRouteDecision }> {
    const route = this.route({
      capability: params.capability,
      planningDepth: params.planningDepth,
      preferRole: params.preferRole,
      config: params.config
    });

    const response = await route.adapter.generate(params.request);

    return {
      ...response,
      route
    };
  }
}

function preferLocalAdapter(
  adapters: import('./types.js').ModelAdapter[],
  localOnly: boolean
): import('./types.js').ModelAdapter {
  if (localOnly) {
    const local = adapters.filter(
      a => a.provider === 'ollama' || a.provider === 'ollama-offline'
    );

    if (local.length > 0) {
      return local[0]!;
    }
  }

  return adapters[0]!;
}
