import path from 'node:path';

import { generateNavigationMap } from './telescope.js';

async function main(): Promise<void> {
  const targetPath = process.argv[2]
    ? path.resolve(process.argv[2])
    : process.cwd();

  const task = process.argv[3];

  console.log(`\n[OwnAI] Generating navigation map: ${targetPath}`);

  const map = await generateNavigationMap({
    rootPath: targetPath,
    task,
    maxTargets: 25
  });

  console.log('\n[OwnAI] Navigation map generated');
  console.log(`Zones: ${map.zones.length}`);
  console.log(`Targets: ${map.targets.length}`);

  console.log('\nTop navigation targets:\n');

  map.targets.slice(0, 10).forEach((target, index) => {
    console.log(
      `${index + 1}. ${target.path} | score=${target.attentionScore} | zoom=${target.zoomDepth}`
    );
  });
}

main().catch(error => {
  console.error('\n[OwnAI] Navigation map generation failed');
  console.error(error);
  process.exit(1);
});
