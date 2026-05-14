import path from 'node:path';

import { generateReplayReport } from './replay.js';

async function main(): Promise<void> {
  const targetPath = process.argv[2]
    ? path.resolve(process.argv[2])
    : process.cwd();

  const task = process.argv[3];

  console.log(`\n[OwnAI] Generating replay report: ${targetPath}`);

  const report = await generateReplayReport({
    rootPath: targetPath,
    task
  });

  console.log('\n[OwnAI] Replay report generated');

  console.log(
    `Token efficiency: ${report.estimatedWaste.tokenEfficiencyScore}`
  );

  console.log('\nReplay lessons:\n');

  report.lessons.forEach((lesson, index) => {
    console.log(`${index + 1}. ${lesson}`);
  });
}

main().catch(error => {
  console.error('\n[OwnAI] Replay generation failed');
  console.error(error);
  process.exit(1);
});
