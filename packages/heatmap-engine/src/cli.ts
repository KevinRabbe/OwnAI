import path from 'node:path';

import { generateHeatmap } from './heatmap.js';

async function main(): Promise<void> {
  const targetPath = process.argv[2]
    ? path.resolve(process.argv[2])
    : process.cwd();

  const task = process.argv[3];

  console.log(`\n[OwnAI] Generating heatmap: ${targetPath}`);

  const state = await generateHeatmap({
    rootPath: targetPath,
    task
  });

  console.log('\n[OwnAI] Heatmap generated');
  console.log(`Targets: ${state.totalTargets}`);
  console.log(`High attention: ${state.highAttentionTargets}`);

  console.log('\nTop attention targets:\n');

  state.records.slice(0, 10).forEach((record, index) => {
    console.log(
      `${index + 1}. ${record.path} | score=${record.scores.attentionScore} | decision=${record.decision}`
    );
  });
}

main().catch(error => {
  console.error('\n[OwnAI] Heatmap generation failed');
  console.error(error);
  process.exit(1);
});
