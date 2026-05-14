import path from 'node:path';

import { initializeMemory } from './memory.js';

async function main(): Promise<void> {
  const targetPath = process.argv[2]
    ? path.resolve(process.argv[2])
    : process.cwd();

  console.log(`\n[OwnAI] Initializing memory system: ${targetPath}`);

  const snapshot = await initializeMemory({
    rootPath: targetPath
  });

  console.log('\n[OwnAI] Memory initialization complete');

  console.log(`Known files: ${snapshot.repo.knownFiles}`);
  console.log(`Partly known files: ${snapshot.repo.partlyKnownFiles}`);
  console.log(`Unknown files: ${snapshot.repo.unknownFiles}`);

  console.log(
    `Average confidence: ${snapshot.repo.averageMemoryConfidence}`
  );
}

main().catch(error => {
  console.error('\n[OwnAI] Memory initialization failed');
  console.error(error);
  process.exit(1);
});
