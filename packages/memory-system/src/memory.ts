import fs from 'node:fs/promises';
import path from 'node:path';

import type {
  FileMemoryRecord,
  InitializeMemoryOptions,
  MemorySnapshot,
  RepoMemorySummary
} from './types.js';

import {
  calculateMemoryConfidence,
  determineKnowledgeState
} from './confidence.js';

interface RepoScannerFileRecord {
  path: string;
  language: string;
  sizeBytes: number;
  hash: string;
  modifiedAt: string;
  todoCount: number;
  fixmeCount: number;
}

interface RepoScannerSummary {
  scannedAt: string;
  rootPath: string;
  totalFiles: number;
  totalDirectories: number;
  detectedLanguages: string[];
}

export async function initializeMemory(
  options: InitializeMemoryOptions
): Promise<MemorySnapshot> {
  const ownAiPath = path.join(options.rootPath, '.ownai');
  const warmPath = path.join(ownAiPath, 'memory', 'warm');
  const hotPath = path.join(ownAiPath, 'memory', 'hot');
  const longTermPath = path.join(ownAiPath, 'memory', 'long_term');
  const learningPath = path.join(ownAiPath, 'learning');

  await fs.mkdir(warmPath, { recursive: true });
  await fs.mkdir(hotPath, { recursive: true });
  await fs.mkdir(longTermPath, { recursive: true });
  await fs.mkdir(learningPath, { recursive: true });

  const repoSummaryPath = path.join(warmPath, 'repo_summary.json');
  const fileSummariesPath = path.join(warmPath, 'file_summaries.json');

  const repoSummary = JSON.parse(
    await fs.readFile(repoSummaryPath, 'utf8')
  ) as RepoScannerSummary;

  const fileSummaries = JSON.parse(
    await fs.readFile(fileSummariesPath, 'utf8')
  ) as RepoScannerFileRecord[];

  const files: FileMemoryRecord[] = fileSummaries.map(file => {
    const verifiedByTests = false;

    const memoryConfidence = calculateMemoryConfidence({
      sizeBytes: file.sizeBytes,
      todoCount: file.todoCount,
      fixmeCount: file.fixmeCount,
      verifiedByTests
    });

    return {
      path: file.path,
      language: file.language,
      sizeBytes: file.sizeBytes,
      hash: file.hash,
      modifiedAt: file.modifiedAt,
      knowledgeState: determineKnowledgeState(memoryConfidence),
      memoryConfidence,
      summaryStale: false,
      verifiedByTests,
      todoCount: file.todoCount,
      fixmeCount: file.fixmeCount,
      lastScannedAt: repoSummary.scannedAt
    };
  });

  const averageMemoryConfidence = Number(
    (
      files.reduce((sum, file) => sum + file.memoryConfidence, 0) /
      Math.max(files.length, 1)
    ).toFixed(2)
  );

  const memorySummary: RepoMemorySummary = {
    scannedAt: repoSummary.scannedAt,
    rootPath: repoSummary.rootPath,
    totalFiles: repoSummary.totalFiles,
    totalDirectories: repoSummary.totalDirectories,
    detectedLanguages: repoSummary.detectedLanguages,
    averageMemoryConfidence,
    knownFiles: files.filter(file => file.knowledgeState === 'known').length,
    partlyKnownFiles: files.filter(
      file => file.knowledgeState === 'partly_known'
    ).length,
    unknownFiles: files.filter(file => file.knowledgeState === 'unknown').length
  };

  const snapshot: MemorySnapshot = {
    repo: memorySummary,
    files,
    staleFiles: files.filter(file => file.summaryStale),
    lowConfidenceFiles: files.filter(
      file => file.memoryConfidence < 0.5
    )
  };

  await fs.writeFile(
    path.join(warmPath, 'memory_snapshot.json'),
    JSON.stringify(snapshot, null, 2)
  );

  await fs.writeFile(
    path.join(hotPath, 'session_state.json'),
    JSON.stringify(
      {
        activeTasks: [],
        activeContextPacks: [],
        activeThreads: []
      },
      null,
      2
    )
  );

  return snapshot;
}
