import type {
  ModelAdapter,
  ModelCapability,
  RegisteredModel
} from './types.js';

export class ModelRegistry {
  private adapters = new Map<string, ModelAdapter>();

  register(adapter: ModelAdapter): void {
    this.adapters.set(adapter.id, adapter);
  }

  get(modelId: string): ModelAdapter | undefined {
    return this.adapters.get(modelId);
  }

  list(): RegisteredModel[] {
    return [...this.adapters.values()].map(adapter => ({
      id: adapter.id,
      provider: adapter.provider,
      capabilities: adapter.capabilities,
      role: adapter.role
    }));
  }

  findByCapability(capability: ModelCapability): ModelAdapter[] {
    return [...this.adapters.values()].filter(adapter =>
      adapter.capabilities.includes(capability)
    );
  }

  findByRole(role: NonNullable<ModelAdapter['role']>): ModelAdapter[] {
    return [...this.adapters.values()].filter(adapter => adapter.role === role);
  }

  clear(): void {
    this.adapters.clear();
  }
}
