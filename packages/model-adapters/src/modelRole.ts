/** Planning depth from {@link docs/PLANNING_MODEL_ROUTING.md}. */
export type PlanningDepth = 'small' | 'medium' | 'deep';

/** Local model tier for routing (scout / worker / expert). */
export type ModelRole = 'scout' | 'worker' | 'expert';

export const PLANNING_DEPTH_TO_ROLE: Record<PlanningDepth, ModelRole> = {
  small: 'scout',
  medium: 'worker',
  deep: 'expert'
};
