import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

import {
  calculateScores,
  determineDecision,
  generateReasons
} from './scoring.js';

import type {
  GenerateHeatmapOptions,
  HeatmapRecord,
  HeatmapState
} from './types.js';

interface MemoryFileRecord {
  path: string;
  language: string;
  sizeBytes: number;
  todoCount: number;
  fixmeCount: number;
  memoryConfidence: number;
  verifiedByTests: boolean;
}

interface MemorySnapshot {
  files: MemoryFileRecord[];
}

export async function generateHeatmap(
  options: GenerateHeatmapOptions
): Promise<HeatmapState> {
  const warmPath = path.join(
    options.rootPath,
    '.ownai',
    'memory',
    'warm'
  );

  const heatmapPath = path.join(
    options.rootPath,
    '.ownai',
    'memory',
    'warm',
    'heatmap_state.json'
  );

  const snapshot = JSON.parse(
    await fs.readFile(path.join(warmPath, 'memory_snapshot.json'), 'utf8')
  ) as MemorySnapshot;

  const records: HeatmapRecord[] = snapshot.files.map(file => {
    const scores = calculateScores(file);

    const record: HeatmapRecord = {
      id: crypto.randomUUID(),
      path: file.path,
      scope: 'file',
      language: file.language,
      scores,
      decision: determineDecision(scores),
      reasons: []
    };

    record.reasons = generateReasons(record);

    return record;
  });

  const state: HeatmapState = {
    generatedAt: new Date().toISOString(),
    task: options.task,
    totalTargets: records.length,
    highAttentionTargets: records.filter(
      record => record.scores.attentionScore >= 0.7
    ).length,
    records: records.sort(
      (a, b) => b.scores.attentionScore - a.scores.attentionScore
    )
  };

  await fs.writeFile(heatmapPath, JSON.stringify(state, null, 2));

  return state;
}
