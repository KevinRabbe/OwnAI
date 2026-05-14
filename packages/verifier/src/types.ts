export type VerificationStatus = 'passed' | 'failed' | 'warning' | 'skipped';

export interface VerificationStep {
  id: string;
  type: 'test' | 'build' | 'lint' | 'scan';
  command: string;
  status: VerificationStatus;
  durationMs: number;
  output: string;
}

export interface VerificationReport {
  id: string;
  createdAt: string;
  task?: string;
  overallStatus: VerificationStatus;
  totalSteps: number;
  passedSteps: number;
  failedSteps: number;
  warningSteps: number;
  skippedSteps: number;
  steps: VerificationStep[];
}

export interface RunVerificationOptions {
  rootPath: string;
  task?: string;
}
