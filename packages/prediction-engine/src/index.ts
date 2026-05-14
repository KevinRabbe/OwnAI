export interface PredictionResult {
  predictionType: string;
  confidence: number;
  summary: string;
  suggestedAction?: string;
}
