import type { OllamaModelTag } from './ollamaClient.js';
import type { ModelRole } from './modelRole.js';

const SCOUT_HINTS = [/phi/i, /gemma/i, /small/i, /1b\b/i, /2b\b/i, /3b\b/i];
const WORKER_HINTS = [
  /qwen/i,
  /deepseek/i,
  /coder/i,
  /devstral/i,
  /codellama/i,
  /mistral/i,
  /7b\b/i,
  /8b\b/i
];
const EXPERT_HINTS = [/70b/i, /32b/i, /large/i, /expert/i, /405b/i, /mixtral/i];

function scoreModelForRole(name: string, role: ModelRole): number {
  const hints =
    role === 'scout'
      ? SCOUT_HINTS
      : role === 'worker'
        ? WORKER_HINTS
        : EXPERT_HINTS;

  let score = 0;

  for (const pattern of hints) {
    if (pattern.test(name)) {
      score += 2;
    }
  }

  if (role === 'scout') {
    score -= name.length / 50;
  }

  if (role === 'expert') {
    score += name.length / 100;
  }

  return score;
}

/** Pick best Ollama tag for a role from available models. */
export function selectModelForRole(
  models: OllamaModelTag[],
  role: ModelRole,
  explicitId?: string
): string | undefined {
  if (explicitId && models.some(m => m.name === explicitId)) {
    return explicitId;
  }

  if (models.length === 0) {
    return undefined;
  }

  const ranked = [...models].sort((a, b) => {
    const diff =
      scoreModelForRole(b.name, role) - scoreModelForRole(a.name, role);

    if (diff !== 0) {
      return diff;
    }

    return a.name.localeCompare(b.name);
  });

  return ranked[0]?.name;
}
