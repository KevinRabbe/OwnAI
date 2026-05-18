import path from 'node:path';

import { probeOllamaEnvironment } from '../../environment-awareness/src/ollamaEnvironment.js';

import { bootstrapModelRegistry } from './bootstrapRegistry.js';
import { ModelRouter } from './router.js';
import {
  DEFAULT_MODEL_ROUTING_CONFIG,
  loadModelRoutingConfig,
  saveModelRoutingConfig
} from './routingConfig.js';

const workspaceRoot = process.cwd();
const command = process.argv[2] ?? 'probe';

async function main(): Promise<void> {
  const config = await loadModelRoutingConfig(workspaceRoot);

  if (command === 'probe') {
    const env = await probeOllamaEnvironment({
      baseUrl: config.ollamaBaseUrl
    });
    const boot = await bootstrapModelRegistry(config);

    console.log(
      JSON.stringify(
        {
          workspaceRoot: path.resolve(workspaceRoot),
          configPath: path.join(workspaceRoot, '.ownai', 'config', 'model-routing.json'),
          ollama: env,
          registered: boot.registry.list(),
          ollamaAvailable: boot.ollamaAvailable
        },
        null,
        2
      )
    );
    return;
  }

  if (command === 'init-config') {
    await saveModelRoutingConfig(workspaceRoot, {
      ...DEFAULT_MODEL_ROUTING_CONFIG,
      ...config
    });
    console.log('Wrote model-routing.json');
    return;
  }

  if (command === 'route-test') {
    const prompt = process.argv.slice(3).join(' ') || 'Plan a README update';
    const boot = await bootstrapModelRegistry(config);
    const router = new ModelRouter(boot.registry, {
      ollamaAvailable: boot.ollamaAvailable
    });
    const result = await router.generate({
      capability: 'planning',
      planningDepth: 'small',
      config,
      request: {
        prompt,
        maxTokens: 128,
        temperature: 0.1
      }
    });

    console.log(
      JSON.stringify(
        {
          route: result.route,
          outputPreview: result.output.slice(0, 400)
        },
        null,
        2
      )
    );
    return;
  }

  console.error(`Unknown command: ${command}`);
  console.error('Usage: probe | init-config | route-test [prompt]');
  process.exitCode = 1;
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
