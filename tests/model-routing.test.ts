import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { probeOllamaEnvironment } from '../packages/environment-awareness/src/index.js';
import { OllamaClient } from '../packages/model-adapters/src/ollamaClient.js';
import {
  bootstrapModelRegistry,
  ModelRouter,
  refineTaskGoalWithLocalModel,
  selectModelForRole
} from '../packages/model-adapters/src/index.js';
import type { OllamaModelTag } from '../packages/model-adapters/src/ollamaClient.js';
import { DEFAULT_MODEL_ROUTING_CONFIG } from '../packages/model-adapters/src/routingConfig.js';

const originalFetch = globalThis.fetch;

function mockOllamaFetch() {
  globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);

    if (url.endsWith('/api/tags') && (!init || init.method === 'GET')) {
      return new Response(
        JSON.stringify({
          models: [
            { name: 'phi3:mini' },
            { name: 'qwen2.5-coder:7b' },
            { name: 'deepseek-coder-v2:16b' }
          ]
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (url.endsWith('/api/generate') && init?.method === 'POST') {
      const body = JSON.parse(String(init.body)) as { model: string; prompt: string };
      return new Response(
        JSON.stringify({
          model: body.model,
          response: `Refined goal for: ${body.prompt.slice(0, 40)}`,
          done: true,
          eval_count: 12
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response('not found', { status: 404 });
  };
}

test('selectModelForRole picks scout/worker/expert heuristically', () => {
  const models: OllamaModelTag[] = [
    { name: 'phi3:mini' },
    { name: 'qwen2.5-coder:7b' },
    { name: 'deepseek-coder-v2:16b' }
  ];

  assert.equal(selectModelForRole(models, 'scout'), 'phi3:mini');
  assert.equal(selectModelForRole(models, 'worker'), 'qwen2.5-coder:7b');
  assert.equal(selectModelForRole(models, 'expert'), 'deepseek-coder-v2:16b');
});

test('bootstrap registers ollama adapters when API is up', async () => {
  mockOllamaFetch();

  try {
    const config = {
      ...DEFAULT_MODEL_ROUTING_CONFIG,
      ollamaBaseUrl: 'http://127.0.0.1:11434'
    };
    const boot = await bootstrapModelRegistry(config);

    assert.equal(boot.ollamaAvailable, true);
    assert.ok(boot.registry.list().length >= 1);

    const router = new ModelRouter(boot.registry, { ollamaAvailable: true });
    const route = router.route({
      capability: 'planning',
      planningDepth: 'small',
      config
    });

    assert.equal(route.role, 'scout');
    assert.match(route.modelId, /phi3/i);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('refineTaskGoal falls back when ollama is down', async () => {
  globalThis.fetch = async () => {
    throw new Error('connection refused');
  };

  try {
    const result = await refineTaskGoalWithLocalModel({
      rawRequest: 'Update README only',
      config: DEFAULT_MODEL_ROUTING_CONFIG
    });

    assert.equal(result.usedModel, false);
    assert.equal(result.goal, 'Update README only');
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('refineTaskGoal uses mocked ollama output', async () => {
  mockOllamaFetch();

  try {
    const result = await refineTaskGoalWithLocalModel({
      rawRequest: 'Plan a small docs change',
      config: DEFAULT_MODEL_ROUTING_CONFIG
    });

    assert.equal(result.usedModel, true);
    assert.match(result.goal, /Refined goal/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('probeOllamaEnvironment reports availability', async () => {
  mockOllamaFetch();

  try {
    const snap = await probeOllamaEnvironment({
      baseUrl: 'http://127.0.0.1:11434'
    });
    assert.equal(snap.available, true);
    assert.ok(snap.models.length >= 1);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('OllamaClient listModels parses tags', async () => {
  mockOllamaFetch();

  try {
    const client = new OllamaClient('http://127.0.0.1:11434', 5000);
    const models = await client.listModels();
    assert.equal(models.length, 3);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('loadModelRoutingConfig uses defaults when missing', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'ownai-routing-'));
  const { loadModelRoutingConfig } = await import(
    '../packages/model-adapters/src/routingConfig.js'
  );
  const config = await loadModelRoutingConfig(root);
  assert.equal(config.localOnly, true);
});
