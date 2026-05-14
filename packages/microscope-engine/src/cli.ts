import path from 'node:path';

import { generateContextPack } from './microscope.js';

async function main(): Promise<void> {
  const targetPath = process.argv[2]
    ? path.resolve(process.argv[2])
    : process.cwd();

  const task = process.argv[3];

  console.log(`\n[OwnAI] Generating context pack: ${targetPath}`);

  const contextPack = await generateContextPack({
    rootPath: targetPath,
    task,
    maxFiles: 5
  });

  console.log('\n[OwnAI] Context pack generated');
  console.log(`Selected files: ${contextPack.selectedFiles.length}`);
  console.log(`Selected symbols: ${contextPack.selectedSymbols.length}`);
  console.log(`Token estimate: ${contextPack.tokenEstimate}`);

  console.log('\nFocused files:\n');

  contextPack.selectedFiles.forEach((file, index) => {
    console.log(`${index + 1}. ${file}`);
  });
}

main().catch(error => {
  console.error('\n[OwnAI] Context pack generation failed');
  console.error(error);
  process.exit(1);
});
