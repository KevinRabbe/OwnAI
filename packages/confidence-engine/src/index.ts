export interface ConfidenceSignal {
  source: string;
  score: number;
  reason: string;
}

export interface ConfidenceReport {
  overallConfidence: number;
  riskLevel: 'low' | 'medium' | 'high';
  signals: ConfidenceSignal[];
}
