export type FocusState = 'wide' | 'narrow' | 'precision' | 'compression';

export interface FocusDecision {
  focusState: FocusState;
  recommendedZoomDepth: string;
  maxFiles: number;
  maxSymbols: number;
  allowContextExpansion: boolean;
  compressionRecommended: boolean;
  reasons: string[];
}
