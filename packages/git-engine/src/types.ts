export type WorktreeStatus =
  | 'created'
  | 'active'
  | 'merged'
  | 'rolled_back'
  | 'failed';

export interface WorktreeSession {
  id: string;
  createdAt: string;
  branchName: string;
  worktreePath: string;
  task?: string;
  status: WorktreeStatus;
}

export interface PatchRecord {
  id: string;
  createdAt: string;
  task?: string;
  worktreeId: string;
  changedFiles: string[];
  summary: string;
  verificationStatus?: string;
}

export interface CreateWorktreeOptions {
  rootPath: string;
  task?: string;
}

export interface RecordPatchOptions {
  rootPath: string;
  worktree: WorktreeSession;
  changedFiles: string[];
  summary: string;
  verificationStatus?: string;
  task?: string;
}
