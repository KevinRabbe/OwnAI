import { OllamaClient } from '../../model-adapters/src/ollamaClient.js';

import type { EnvironmentState } from './index.js';

export interface OllamaEnvironmentSnapshot {
  available: boolean;
  baseUrl: string;
  models: string[];
  environment: EnvironmentState;
}

export async function probeOllamaEnvironment(params?: {
  baseUrl?: string;
}): Promise<OllamaEnvironmentSnapshot> {
  const baseUrl = params?.baseUrl ?? process.env.OLLAMA_HOST ?? 'http://127.0.0.1:11434';
  const client = new OllamaClient(baseUrl);
  const available = await client.isAvailable();
  const models = available ? (await client.listModels()).map(m => m.name) : [];

  return {
    available,
    baseUrl,
    models,
    environment: {
      cloudAvailable: false,
      batteryMode: undefined,
      cpuLoad: undefined,
      ramUsage: undefined,
      gpuUsage: undefined
    }
  };
}
