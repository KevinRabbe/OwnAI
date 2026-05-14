import fs from 'node:fs/promises';
import path from 'node:path';

import { scanRepository } from './scanner.js';

async function main(): Promise<void> {
  const targetPath = process.argv[2]
    ? path.resolve(process.argv[2])
    : process.cwd();

  console.log(`\n[OwnAI] Scanning repository: ${targetPath}`);

  const result = await scanRepository(targetPath);

  const ownAiPath = path.join(targetPath, '.ownai');
  const memoryPath = path.join(ownAiPath, 'memory');
  const warmPath = path.join(memoryPath, 'warm');
  const cachePath = path.join(ownAiPath, 'cache');

  await fs.mkdir(warmPath, { recursive: true });
  await fs.mkdir(cachePath, { recursive: true });

  await fs.writeFile(
    path.join(warmPath, 'repo_summary.json'),
    JSON.stringify(result.summary, null, 2)
  );

  await fs.writeFile(
    path.join(warmPath, 'file_summaries.json'),
    JSON.stringify(result.files, null, 2)
  );

  const fileHashes = result.files.map(file => ({
    path: file.path,
    hash: file.hash,
    modifiedAt: file.modifiedAt
  }));

  await fs.writeFile(
    path.join(cachePath, 'file_hashes.json'),
    JSON.stringify(fileHashes, null, 2)
  );

  console.log('\n[OwnAI] Scan complete');
  console.log(`Files: ${result.summary.totalFiles}`);
  console.log(`Directories: ${result.summary.totalDirectories}`);
  console.log(
    `Languages: ${result.summary.detectedLanguages.join(', ') || 'none'}`
  );

  console.log('\n[OwnAI] Memory files created:');
  console.log('- .ownai/memory/warm/repo_summary.json');
  console.log('- .ownai/memory/warm/file_summaries.json');
  console.log('- .ownai/cache/file_hashes.json');
}

main().catch(error => {
  console.error('\n[OwnAI] Repo scan failed');
  console.error(error);
  process.exit(1);
});
