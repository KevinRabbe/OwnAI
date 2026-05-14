import type {
  ModelAdapter,
  ModelCapability,
  ModelRequest,
  ModelResponse
} from './types.js';

import { ModelRegistry } from './registry.js';

export class ModelRouter {
  constructor(private readonly registry: ModelRegistry) {}

  async generate(params: {
    capability: ModelCapability;
    request: ModelRequest;
  }): Promise<ModelResponse> {
    const adapters = this.registry.findByCapability(
      params.capability
    );

    if (adapters.length === 0) {
      throw new Error(
        `No model adapter found for capability: ${params.capability}`
      );
    }

    const adapter = selectBestAdapter(adapters);

    return adapter.generate(params.request);
  }
}

function selectBestAdapter(
  adapters: ModelAdapter[]
): ModelAdapter {
  // placeholder strategy
  // later:
  // - hardware-aware routing
  // - token-aware routing
  // - confidence-aware routing
  // - replay-aware routing

  return adapters[0] as ModelAdapter;
}
