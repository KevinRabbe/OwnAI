import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

import { LANGUAGE_MAP } from './languageMap.js';
import type { RepoSummary, ScanFileRecord, ScanResult } from './types.js';

const IGNORED_DIRECTORIES = [
  '.git',
  'node_modules',
  'dist',
  'build',
  '.next',
  '.turbo',
  'coverage',
  'bin',
  'obj'
];

export async function scanRepository(rootPath: string): Promise<ScanResult> {
  const files: ScanFileRecord[] = [];

  let totalDirectories = 0;

  async function walk(currentPath: string): Promise<void> {
    const entries = await fs.readdir(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);
      const relativePath = path.relative(rootPath, fullPath);

      if (entry.isDirectory()) {
        if (IGNORED_DIRECTORIES.includes(entry.name)) {
          continue;
        }

        totalDirectories += 1;
        await walk(fullPath);
        continue;
      }

      if (!entry.isFile()) {
        continue;
      }

      const extension = path.extname(entry.name).toLowerCase();
      const language = LANGUAGE_MAP[extension] ?? 'unknown';

      const contentBuffer = await fs.readFile(fullPath);
      const content = contentBuffer.toString('utf8');

      const stat = await fs.stat(fullPath);

      const hash = crypto
        .createHash('sha256')
        .update(contentBuffer)
        .digest('hex');

      const todoCount = (content.match(/TODO/g) ?? []).length;
      const fixmeCount = (content.match(/FIXME/g) ?? []).length;

      files.push({
        path: relativePath,
        extension,
        language,
        sizeBytes: stat.size,
        hash,
        modifiedAt: stat.mtime.toISOString(),
        todoCount,
        fixmeCount
      });
    }
  }

  await walk(rootPath);

  const detectedLanguages = [...new Set(files.map(file => file.language))]
    .filter(language => language !== 'unknown')
    .sort();

  const summary: RepoSummary = {
    scannedAt: new Date().toISOString(),
    rootPath,
    totalFiles: files.length,
    totalDirectories,
    detectedLanguages,
    ignoredDirectories: IGNORED_DIRECTORIES
  };

  return {
    summary,
    files
  };
}
