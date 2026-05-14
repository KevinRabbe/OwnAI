import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

import type {
  ContextReplayReport,
  GenerateReplayOptions
} from './types.js';

interface ContextPack {
  selectedFiles: string[];
  selectedSymbols: unknown[];
  focusRanges: unknown[];
  tokenEstimate: number;
}

interface VerificationReport {
  overallStatus: string;
  totalSteps: number;
  passedSteps: number;
  failedSteps: number;
  warningSteps: number;
  skippedSteps: number;
}

export async function generateReplayReport(
  options: GenerateReplayOptions
): Promise<ContextReplayReport> {
  const contextPackPath = path.join(
    options.rootPath,
    '.ownai',
    'memory',
    'hot',
    'context_pack.json'
  );

  const verificationPath = path.join(
    options.rootPath,
    '.ownai',
    'learning',
    'verification_report.json'
  );

  const replayPath = path.join(
    options.rootPath,
    '.ownai',
    'learning',
    'context_replay_report.json'
  );

  const contextPack = JSON.parse(
    await fs.readFile(contextPackPath, 'utf8')
  ) as ContextPack;

  const verification = JSON.parse(
    await fs.readFile(verificationPath, 'utf8')
  ) as VerificationReport;

  const lowValueFiles = contextPack.selectedFiles.filter(
    (_, index) => index >= 3
  );

  const estimatedTokenWaste = Math.floor(
    contextPack.tokenEstimate * 0.25
  );

  const tokenEfficiencyScore = Number(
    (1 - estimatedTokenWaste / Math.max(contextPack.tokenEstimate, 1)).toFixed(2)
  );

  const minimalSuccessfulPath = contextPack.selectedFiles.slice(0, 3);

  const lessons = generateLessons({
    tokenEfficiencyScore,
    verificationStatus: verification.overallStatus,
    selectedFiles: contextPack.selectedFiles.length
  });

  const report: ContextReplayReport = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    task: options.task,
    context: {
      selectedFiles: contextPack.selectedFiles,
      selectedSymbols: contextPack.selectedSymbols.length,
      focusRanges: contextPack.focusRanges.length,
      tokenEstimate: contextPack.tokenEstimate
    },
    verification: {
      overallStatus: verification.overallStatus,
      totalSteps: verification.totalSteps,
      passedSteps: verification.passedSteps,
      failedSteps: verification.failedSteps,
      warningSteps: verification.warningSteps,
      skippedSteps: verification.skippedSteps
    },
    estimatedWaste: {
      lowValueFiles,
      estimatedTokenWaste,
      tokenEfficiencyScore
    },
    minimalSuccessfulPath,
    lessons
  };

  await fs.writeFile(replayPath, JSON.stringify(report, null, 2));

  return report;
}

function generateLessons(params: {
  tokenEfficiencyScore: number;
  verificationStatus: string;
  selectedFiles: number;
}): string[] {
  const lessons: string[] = [];

  if (params.tokenEfficiencyScore < 0.7) {
    lessons.push('reduce_context_pack_size');
  }

  if (params.selectedFiles > 5) {
    lessons.push('prefer_more_aggressive_focus');
  }

  if (params.verificationStatus === 'failed') {
    lessons.push('increase_verification_attention');
  }

  if (lessons.length === 0) {
    lessons.push('current_context_path_is_reasonable');
  }

  return lessons;
}
