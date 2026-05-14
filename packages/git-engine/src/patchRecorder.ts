import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

import type {
  PatchRecord,
  RecordPatchOptions
} from './types.js';

export async function recordPatch(
  options: RecordPatchOptions
): Promise<PatchRecord> {
  const patch: PatchRecord = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    task: options.task,
    worktreeId: options.worktree.id,
    changedFiles: options.changedFiles,
    summary: options.summary,
    verificationStatus: options.verificationStatus
  };

  const patchesPath = path.join(
    options.rootPath,
    '.ownai',
    'patches'
  );

  await fs.mkdir(patchesPath, {
    recursive: true
  });

  await fs.writeFile(
    path.join(patchesPath, `${patch.id}.json`),
    JSON.stringify(patch, null, 2)
  );

  return patch;
}
