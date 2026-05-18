import path from 'node:path';

import { asTaskId } from '../../core-types/src/ids.js';

import { runVerticalSlice } from './runVerticalSlice.js';

const rawRequest =
  process.argv.slice(2).join(' ').trim() ||
  'Create a task packet for a small README update (demo)';
const workspaceRoot = process.cwd();
const taskIdArg = process.env.OWNAI_TASK_ID;

async function main(): Promise<void> {
  const result = await runVerticalSlice({
    workspaceRoot,
    rawRequest,
    taskId: taskIdArg ? asTaskId(taskIdArg) : undefined
  });

  console.log(
    JSON.stringify(
      {
        ok: true,
        workspaceRoot: path.resolve(workspaceRoot),
        ownAiDir: path.join(workspaceRoot, '.ownai'),
        ...result
      },
      null,
      2
    )
  );
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
