import path from 'node:path';

import { runVerification } from './verifier.js';

async function main(): Promise<void> {
  const targetPath = process.argv[2]
    ? path.resolve(process.argv[2])
    : process.cwd();

  const task = process.argv[3];

  console.log(`\n[OwnAI] Running verification: ${targetPath}`);

  const report = await runVerification({
    rootPath: targetPath,
    task
  });

  console.log('\n[OwnAI] Verification complete');
  console.log(`Overall status: ${report.overallStatus}`);

  console.log('\nVerification steps:\n');

  report.steps.forEach((step, index) => {
    console.log(
      `${index + 1}. [${step.status}] ${step.type} -> ${step.command}`
    );
  });
}

main().catch(error => {
  console.error('\n[OwnAI] Verification failed');
  console.error(error);
  process.exit(1);
});
