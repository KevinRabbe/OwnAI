export type KnowledgeState = 'known' | 'partly_known' | 'unknown';

export interface FileHashRecord {
  path: string;
  hash: string;
  modifiedAt: string;
}

export interface FileMemoryRecord {
  path: string;
  language: string;
  sizeBytes: number;
  hash: string;
  modifiedAt: string;
  knowledgeState: KnowledgeState;
  memoryConfidence: number;
  summaryStale: boolean;
  verifiedByTests: boolean;
  todoCount: number;
  fixmeCount: number;
  lastScannedAt: string;
}

export interface RepoMemorySummary {
  scannedAt: string;
  rootPath: string;
  totalFiles: number;
  totalDirectories: number;
  detectedLanguages: string[];
  averageMemoryConfidence: number;
  knownFiles: number;
  partlyKnownFiles: number;
  unknownFiles: number;
}

export interface MemorySnapshot {
  repo: RepoMemorySummary;
  files: FileMemoryRecord[];
  staleFiles: FileMemoryRecord[];
  lowConfidenceFiles: FileMemoryRecord[];
}

export interface InitializeMemoryOptions {
  rootPath: string;
}
