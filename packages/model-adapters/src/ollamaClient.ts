export interface OllamaModelTag {
  name: string;
  model?: string;
  size?: number;
  modified_at?: string;
}

export interface OllamaTagsResponse {
  models: OllamaModelTag[];
}

export interface OllamaGenerateRequest {
  model: string;
  prompt: string;
  system?: string;
  stream?: boolean;
  options?: {
    temperature?: number;
    num_predict?: number;
  };
}

export interface OllamaGenerateResponse {
  model: string;
  response: string;
  done: boolean;
  total_duration?: number;
  eval_count?: number;
}

export class OllamaClient {
  constructor(
    private readonly baseUrl: string,
    private readonly timeoutMs = 120_000
  ) {}

  private url(path: string): string {
    return `${this.baseUrl.replace(/\/$/, '')}${path}`;
  }

  async isAvailable(): Promise<boolean> {
    try {
      const response = await this.fetchWithTimeout(this.url('/api/tags'), {
        method: 'GET'
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  async listModels(): Promise<OllamaModelTag[]> {
    const response = await this.fetchWithTimeout(this.url('/api/tags'), {
      method: 'GET'
    });

    if (!response.ok) {
      throw new Error(`Ollama tags failed: HTTP ${response.status}`);
    }

    const body = (await response.json()) as OllamaTagsResponse;
    return body.models ?? [];
  }

  async generate(
    request: OllamaGenerateRequest
  ): Promise<OllamaGenerateResponse> {
    const response = await this.fetchWithTimeout(this.url('/api/generate'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...request, stream: false })
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(
        `Ollama generate failed: HTTP ${response.status} ${text.slice(0, 200)}`
      );
    }

    return (await response.json()) as OllamaGenerateResponse;
  }

  private async fetchWithTimeout(
    url: string,
    init: RequestInit
  ): Promise<Response> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      return await fetch(url, { ...init, signal: controller.signal });
    } finally {
      clearTimeout(timer);
    }
  }
}
