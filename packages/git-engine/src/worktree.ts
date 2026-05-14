import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

import type {
  CreateWorktreeOptions,
  WorktreeSession
} from './types.js';

export async function createWorktree(
  options: CreateWorktreeOptions
): Promise<WorktreeSession> {
  const id = crypto.randomUUID();

  const branchName = buildBranchName(options.task);

  const worktreePath = path.join(
    options.rootPath,
    '.ownai',
    'worktrees',
    branchName
  );

  await fs.mkdir(worktreePath, {
    recursive: true
  });

  const session: WorktreeSession = {
    id,
    createdAt: new Date().toISOString(),
    branchName,
    worktreePath,
    task: options.task,
    status: 'created'
  };

  await fs.writeFile(
    path.join(worktreePath, 'session.json'),
    JSON.stringify(session, null, 2)
  );

  return session;
}

function buildBranchName(task?: string): string {
  const normalized = (task ?? 'general-task')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .slice(0, 40);

  return `ownai/${normalized}`;
}
