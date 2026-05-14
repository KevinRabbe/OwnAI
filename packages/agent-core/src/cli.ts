import path from 'node:path';

import { runOwnAIPipeline } from './pipeline.js';

async function main(): Promise<void> {
  const targetPath = process.argv[2]
    ? path.resolve(process.argv[2])
    : process.cwd();

  const task = process.argv[3];

  console.log(`\n[OwnAI] Starting cognitive pipeline`);
  console.log(`[OwnAI] Repository: ${targetPath}`);

  if (task) {
    console.log(`[OwnAI] Task: ${task}`);
  }

  await runOwnAIPipeline({
    rootPath: targetPath,
    task
  });

  console.log('\n[OwnAI] Pipeline completed successfully');
}

main().catch(error => {
  console.error('\n[OwnAI] Pipeline execution failed');
  console.error(error);
  process.exit(1);
});
