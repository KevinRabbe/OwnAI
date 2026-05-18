import type { PlanningDepth } from './modelRole.js';

/** System prompt for packet-goal refinement (Roadmap 02 + kernel integration). */
export function buildPlanningSystemPrompt(depth: PlanningDepth): string {
  const detail =
    depth === 'small'
      ? 'Reply in 2-4 bullet points.'
      : depth === 'medium'
        ? 'Reply with a short structured plan (goal, steps, validation).'
        : 'Reply with a careful plan including risks and stop conditions.';

  return [
    'You are OwnAI local planning assistant.',
    'Refine the user task into a clear engineering goal.',
    'Do not invent files that were not mentioned unless clearly implied.',
    detail
  ].join(' ');
}

export function buildPacketGoalRefinementPrompt(rawRequest: string): string {
  return [
    'Refine this user request into one clear task goal paragraph for a task packet.',
    '',
    'User request:',
    rawRequest
  ].join('\n');
}
