export interface ThreadDecision {
  allowParallelExecution: boolean;
  reason: string;
  estimatedConflictRisk: number;
}
