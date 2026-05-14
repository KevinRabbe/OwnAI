export type AttentionDecision =
  | 'ignore'
  | 'cache'
  | 'refresh'
  | 'zoom_in'
  | 'verify';

export type AttentionScope = 'repo' | 'folder' | 'file' | 'symbol' | 'line';

export interface HeatmapScores {
  activity: number;
  unknownness: number;
  risk: number;
  blastRadius: number;
  coverageGap: number;
  taskRelevance: number;
  memoryConfidence: number;
  attentionScore: number;
}

export interface HeatmapRecord {
  id: string;
  path: string;
  scope: AttentionScope;
  language: string;
  scores: HeatmapScores;
  decision: AttentionDecision;
  reasons: string[];
}

export interface HeatmapState {
  generatedAt: string;
  task?: string;
  totalTargets: number;
  highAttentionTargets: number;
  records: HeatmapRecord[];
}

export interface GenerateHeatmapOptions {
  rootPath: string;
  task?: string;
}
