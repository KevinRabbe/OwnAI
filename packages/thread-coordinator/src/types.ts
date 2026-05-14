export type ExecutionMode =
  | 'single_thread'
  | 'assisted_thread'
  | 'parallel_threads'
  | 'competition_threads';

export interface HardwareBudget {
  availableRamGb?: number;
  availableVramGb?: number;
  cpuThreads?: number;
  maxModelThreads: number;
  maxToolThreads: number;
  lowResourceMode: boolean;
}

export interface ThreadDecisionInput {
  task?: string;
  estimatedFiles: number;
  estimatedZones: number;
  highAttentionTargets: number;
  averageConfidence: number;
  hardware: HardwareBudget;
}

export interface ThreadPlan {
  executionMode: ExecutionMode;
  allowedModelThreads: number;
  allowedToolThreads: number;
  shouldCreateWorktrees: boolean;
  reasons: string[];
  phases: ThreadPhase[];
}

export interface ThreadPhase {
  id: string;
  label: string;
  threads: PlannedThread[];
}

export interface PlannedThread {
  id: string;
  label: string;
  purpose: string;
  systemFocus: string[];
  requiresModel: boolean;
  requiresWorktree: boolean;
}
