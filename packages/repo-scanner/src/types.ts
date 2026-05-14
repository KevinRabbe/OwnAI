export interface ScanFileRecord {
  path: string;
  extension: string;
  language: string;
  sizeBytes: number;
  hash: string;
  modifiedAt: string;
  todoCount: number;
  fixmeCount: number;
}

export interface RepoSummary {
  scannedAt: string;
  rootPath: string;
  totalFiles: number;
  totalDirectories: number;
  detectedLanguages: string[];
  ignoredDirectories: string[];
}

export interface ScanResult {
  summary: RepoSummary;
  files: ScanFileRecord[];
}
