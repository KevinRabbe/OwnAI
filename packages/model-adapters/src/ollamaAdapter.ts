import type {
  ModelAdapter,
  ModelCapability,
  ModelRequest,
  ModelResponse
} from './types.js';

import { OllamaClient } from './ollamaClient.js';
import type { ModelRole } from './modelRole.js';

export class OllamaAdapter implements ModelAdapter {
  readonly provider = 'ollama';
  readonly capabilities: ModelCapability[];
  readonly role: ModelRole;

  constructor(
    readonly id: string,
    private readonly client: OllamaClient,
    params?: {
      capabilities?: ModelCapability[];
      role?: ModelRole;
    }
  ) {
    this.capabilities = params?.capabilities ?? [
      'reasoning',
      'coding',
      'planning',
      'compression'
    ];
    this.role = params?.role ?? 'worker';
  }

  async generate(request: ModelRequest): Promise<ModelResponse> {
    const start = Date.now();
    const promptParts = [request.prompt];

    if (request.contextFiles?.length) {
      promptParts.push(
        '',
        'Context files:',
        ...request.contextFiles.map(f => `- ${f}`)
      );
    }

    const result = await this.client.generate({
      model: this.id,
      prompt: promptParts.join('\n'),
      system: request.systemPrompt,
      options: {
        temperature: request.temperature,
        num_predict: request.maxTokens
      }
    });

    const tokensEstimated =
      result.eval_count ?? Math.ceil((result.response?.length ?? 0) / 4);

    return {
      model: this.id,
      provider: this.provider,
      role: this.role,
      output: result.response ?? '',
      tokensEstimated,
      durationMs: Date.now() - start
    };
  }
}

/** Simulated adapter when Ollama is offline (tests / graceful degradation). */
export class OfflineOllamaAdapter implements ModelAdapter {
  readonly provider = 'ollama-offline';
  readonly capabilities: ModelCapability[];
  readonly role: ModelRole;

  constructor(
    readonly id: string,
    params?: { capabilities?: ModelCapability[]; role?: ModelRole }
  ) {
    this.capabilities = params?.capabilities ?? ['planning'];
    this.role = params?.role ?? 'worker';
  }

  async generate(request: ModelRequest): Promise<ModelResponse> {
    const start = Date.now();
    const output = [
      '[OwnAI/OfflineOllamaAdapter]',
      `model=${this.id}`,
      'Ollama was not reachable; returning deterministic placeholder output.',
      '',
      request.prompt.slice(0, 500)
    ].join('\n');

    return {
      model: this.id,
      output,
      provider: this.provider,
      role: this.role,
      tokensEstimated: Math.ceil(request.prompt.length / 4),
      durationMs: Date.now() - start
    };
  }
}
