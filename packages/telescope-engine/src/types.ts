export type ZoomDepth = 'repo' | 'folder' | 'file' | 'symbol' | 'line';

export interface RepoZone {
  id: string;
  name: string;
  rootPath: string;
  files: string[];
  averageAttentionScore: number;
  maxAttentionScore: number;
  knowledgeState: 'known' | 'partly_known' | 'unknown';
  recommendedZoomDepth: ZoomDepth;
  reasons: string[];
}

export interface NavigationTarget {
  id: string;
  zoneId: string;
  path: string;
  attentionScore: number;
  decision: string;
  zoomDepth: ZoomDepth;
  reasons: string[];
}

export interface NavigationMap {
  generatedAt: string;
  task?: string;
  zones: RepoZone[];
  targets: NavigationTarget[];
  ignoredZones: RepoZone[];
}

export interface GenerateNavigationMapOptions {
  rootPath: string;
  task?: string;
  maxTargets?: number;
}
