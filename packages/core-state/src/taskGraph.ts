/**
 * Pipeline execution graph (repo scan → memory → …). Not the same as `KernelTask` / `DurableKernelTaskStateV0`.
 */

export type TaskNodeType =
  | 'scan'
  | 'memory_update'
  | 'heatmap'
  | 'navigation'
  | 'inspection'
  | 'context_pack'
  | 'model_generation'
  | 'patch'
  | 'verification'
  | 'replay'
  | 'reflection'
  | 'git_action';

export type TaskNodeStatus =
  | 'pending'
  | 'running'
  | 'completed'
  | 'failed'
  | 'skipped';

export interface TaskNode {
  id: string;
  type: TaskNodeType;
  label: string;
  status: TaskNodeStatus;
  dependencies: string[];
  assignedSystem?: string;
  contextPackId?: string;
  startedAt?: string;
  completedAt?: string;
  error?: string;
}

export interface TaskGraph {
  id: string;
  createdAt: string;
  task?: string;
  status: TaskNodeStatus;
  nodes: TaskNode[];
}

export interface TaskGraphSummary {
  totalNodes: number;
  pendingNodes: number;
  runningNodes: number;
  completedNodes: number;
  failedNodes: number;
  skippedNodes: number;
}
