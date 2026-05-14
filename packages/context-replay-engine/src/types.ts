export interface ReplayContextSummary {
  selectedFiles: string[];
  selectedSymbols: number;
  focusRanges: number;
  tokenEstimate: number;
}

export interface VerificationSummary {
  overallStatus: string;
  totalSteps: number;
  passedSteps: number;
  failedSteps: number;
  warningSteps: number;
  skippedSteps: number;
}

export interface ContextReplayReport {
  id: string;
  createdAt: string;
  task?: string;
  context: ReplayContextSummary;
  verification: VerificationSummary;
  estimatedWaste: {
    lowValueFiles: string[];
    estimatedTokenWaste: number;
    tokenEfficiencyScore: number;
  };
  minimalSuccessfulPath: string[];
  lessons: string[];
}

export interface GenerateReplayOptions {
  rootPath: string;
  task?: string;
}
