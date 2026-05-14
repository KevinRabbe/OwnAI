export interface ExecutionMetrics {
  estimatedTokensUsed: number;
  loadedFiles: number;
  generatedContextPacks: number;
  verificationRuns: number;
  replayRuns: number;
}

export interface ExecutionState {
  startedAt: string;
  activeTaskId?: string;
  currentNodeId?: string;
  currentSystem?: string;
  currentPhase?: string;
  metrics: ExecutionMetrics;
}

export function createInitialExecutionState(): ExecutionState {
  return {
    startedAt: new Date().toISOString(),
    metrics: {
      estimatedTokensUsed: 0,
      loadedFiles: 0,
      generatedContextPacks: 0,
      verificationRuns: 0,
      replayRuns: 0
    }
  };
}
