import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

import {
  extractSymbols,
  generateFocusRanges
} from './symbols.js';

import type {
  ContextPack,
  GenerateContextPackOptions,
  InspectedFile
} from './types.js';

interface NavigationTarget {
  path: string;
  attentionScore: number;
}

interface NavigationMap {
  targets: NavigationTarget[];
}

export async function generateContextPack(
  options: GenerateContextPackOptions
): Promise<ContextPack> {
  const navigationMapPath = path.join(
    options.rootPath,
    '.ownai',
    'memory',
    'warm',
    'navigation_map.json'
  );

  const contextPackPath = path.join(
    options.rootPath,
    '.ownai',
    'memory',
    'hot',
    'context_pack.json'
  );

  const navigationMap = JSON.parse(
    await fs.readFile(navigationMapPath, 'utf8')
  ) as NavigationMap;

  const selectedTargets = navigationMap.targets.slice(
    0,
    options.maxFiles ?? 5
  );

  const inspectedFiles: InspectedFile[] = [];

  for (const target of selectedTargets) {
    const fullPath = path.join(options.rootPath, target.path);

    try {
      const content = await fs.readFile(fullPath, 'utf8');

      const symbols = extractSymbols({
        path: target.path,
        content
      });

      const focusRanges = generateFocusRanges({
        path: target.path,
        symbols
      });

      inspectedFiles.push({
        path: target.path,
        language: detectLanguage(target.path),
        contentPreview: content.slice(0, 500),
        totalLines: content.split('\n').length,
        symbols,
        focusRanges
      });
    } catch {
      // ignore unreadable files for now
    }
  }

  const selectedSymbols = inspectedFiles.flatMap(file => file.symbols);

  const focusRanges = inspectedFiles.flatMap(file => file.focusRanges);

  const tokenEstimate = estimateTokens(inspectedFiles);

  const contextPack: ContextPack = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    task: options.task,
    selectedFiles: inspectedFiles.map(file => file.path),
    selectedSymbols,
    focusRanges,
    tokenEstimate,
    notes: [
      'generated_by_microscope_engine',
      'focused_context_pack',
      'token_estimate_is_approximate'
    ]
  };

  await fs.writeFile(
    contextPackPath,
    JSON.stringify(contextPack, null, 2)
  );

  return contextPack;
}

function detectLanguage(filePath: string): string {
  const extension = path.extname(filePath).toLowerCase();

  switch (extension) {
    case '.ts':
    case '.tsx':
      return 'typescript';

    case '.py':
      return 'python';

    case '.java':
      return 'java';

    case '.rs':
      return 'rust';

    case '.go':
      return 'go';

    default:
      return 'unknown';
  }
}

function estimateTokens(files: InspectedFile[]): number {
  const totalCharacters = files.reduce(
    (sum, file) => sum + file.contentPreview.length,
    0
  );

  return Math.ceil(totalCharacters / 4);
}
