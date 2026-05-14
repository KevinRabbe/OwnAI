import type {
  ModelAdapter,
  ModelRequest,
  ModelResponse
} from './types.js';

export class OllamaAdapter implements ModelAdapter {
  id: string;

  provider = 'ollama';

  capabilities;

  constructor(params: {
    id: string;
    capabilities: ModelAdapter['capabilities'];
  }) {
    this.id = params.id;
    this.capabilities = params.capabilities;
  }

  async generate(
    request: ModelRequest
  ): Promise<ModelResponse> {
    const start = Date.now();

    // placeholder until real Ollama integration exists

    const simulatedOutput = [
      '[OwnAI/OllamaAdapter]',
      `model=${this.id}`,
      '',
      'Simulated generation output.',
      'Real Ollama API integration planned later.',
      '',
      `Prompt preview: ${request.prompt.slice(0, 120)}`
    ].join('\n');

    return {
      model: this.id,
      output: simulatedOutput,
      tokensEstimated: Math.ceil(request.prompt.length / 4),
      durationMs: Date.now() - start
    };
  }
}
