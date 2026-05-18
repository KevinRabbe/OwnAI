import fs from 'node:fs/promises';
import path from 'node:path';

import type { ModelRole, PlanningDepth } from './modelRole.js';
import { PLANNING_DEPTH_TO_ROLE } from './modelRole.js';

export interface ModelRoutingConfig {
  ollamaBaseUrl: string;
  /** When true, only local Ollama adapters may be selected. */
  localOnly: boolean;
  /** Explicit model id per role (Ollama tag names). */
  roleModels: Partial<Record<ModelRole, string>>;
  planningDepthRoles: Record<PlanningDepth, ModelRole>;
  requestTimeoutMs: number;
}

export const DEFAULT_MODEL_ROUTING_CONFIG: ModelRoutingConfig = {
  ollamaBaseUrl: process.env.OLLAMA_HOST ?? 'http://127.0.0.1:11434',
  localOnly: true,
  roleModels: {},
  planningDepthRoles: { ...PLANNING_DEPTH_TO_ROLE },
  requestTimeoutMs: 120_000
};

export function modelRoutingConfigPath(workspaceRoot: string): string {
  return path.join(workspaceRoot, '.ownai', 'config', 'model-routing.json');
}

export async function loadModelRoutingConfig(
  workspaceRoot: string
): Promise<ModelRoutingConfig> {
  const filePath = modelRoutingConfigPath(workspaceRoot);

  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const parsed = JSON.parse(raw) as Partial<ModelRoutingConfig>;
    return {
      ...DEFAULT_MODEL_ROUTING_CONFIG,
      ...parsed,
      roleModels: {
        ...DEFAULT_MODEL_ROUTING_CONFIG.roleModels,
        ...parsed.roleModels
      },
      planningDepthRoles: {
        ...DEFAULT_MODEL_ROUTING_CONFIG.planningDepthRoles,
        ...parsed.planningDepthRoles
      }
    };
  } catch (error) {
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      (error as NodeJS.ErrnoException).code === 'ENOENT'
    ) {
      return { ...DEFAULT_MODEL_ROUTING_CONFIG };
    }

    throw error;
  }
}

export async function saveModelRoutingConfig(
  workspaceRoot: string,
  config: ModelRoutingConfig
): Promise<void> {
  const filePath = modelRoutingConfigPath(workspaceRoot);
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(config, null, 2), 'utf8');
}
