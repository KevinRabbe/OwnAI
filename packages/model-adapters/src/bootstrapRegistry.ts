import { OfflineOllamaAdapter, OllamaAdapter } from './ollamaAdapter.js';
import { OllamaClient } from './ollamaClient.js';
import type { ModelRole } from './modelRole.js';
import { ModelRegistry } from './registry.js';
import { selectModelForRole } from './roleSelection.js';
import type { ModelRoutingConfig } from './routingConfig.js';

export interface BootstrapRegistryResult {
  registry: ModelRegistry;
  ollamaAvailable: boolean;
  discoveredModels: string[];
}

/**
 * Discover Ollama models and register scout/worker/expert adapters.
 * Falls back to offline placeholders when Ollama is unreachable.
 */
export async function bootstrapModelRegistry(
  config: ModelRoutingConfig
): Promise<BootstrapRegistryResult> {
  const registry = new ModelRegistry();
  const client = new OllamaClient(
    config.ollamaBaseUrl,
    config.requestTimeoutMs
  );
  const available = await client.isAvailable();

  if (!available) {
    for (const role of ['scout', 'worker', 'expert'] as ModelRole[]) {
      registry.register(
        new OfflineOllamaAdapter(`offline-${role}`, { role })
      );
    }

    return {
      registry,
      ollamaAvailable: false,
      discoveredModels: []
    };
  }

  const tags = await client.listModels();
  const discoveredModels = tags.map(t => t.name);
  const roles: ModelRole[] = ['scout', 'worker', 'expert'];

  for (const role of roles) {
    const modelId = selectModelForRole(
      tags,
      role,
      config.roleModels[role]
    );

    if (!modelId) {
      continue;
    }

    registry.register(
      new OllamaAdapter(modelId, client, {
        role,
        capabilities:
          role === 'scout'
            ? ['compression', 'planning']
            : role === 'expert'
              ? ['reasoning', 'planning', 'coding']
              : ['coding', 'planning', 'reasoning']
      })
    );
  }

  if (registry.list().length === 0 && tags[0]) {
    registry.register(
      new OllamaAdapter(tags[0].name, client, { role: 'worker' })
    );
  }

  return {
    registry,
    ollamaAvailable: true,
    discoveredModels
  };
}
