import path from 'node:path';

import { createWorktree } from './worktree.js';
import { recordPatch } from './patchRecorder.js';

async function main(): Promise<void> {
  const targetPath = process.argv[2]
    ? path.resolve(process.argv[2])
    : process.cwd();

  const task = process.argv[3] ?? 'general-task';

  console.log(`\n[OwnAI] Creating isolated worktree`);

  const worktree = await createWorktree({
    rootPath: targetPath,
    task
  });

  console.log(`Branch: ${worktree.branchName}`);
  console.log(`Worktree: ${worktree.worktreePath}`);

  const patch = await recordPatch({
    rootPath: targetPath,
    worktree,
    changedFiles: [],
    summary: 'Initial patch session created.',
    verificationStatus: 'pending',
    task
  });

  console.log('\n[OwnAI] Patch session initialized');
  console.log(`Patch ID: ${patch.id}`);
}

main().catch(error => {
  console.error('\n[OwnAI] Git engine failed');
  console.error(error);
  process.exit(1);
});
