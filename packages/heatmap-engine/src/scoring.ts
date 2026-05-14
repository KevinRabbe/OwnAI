import type {
  AttentionDecision,
  HeatmapRecord,
  HeatmapScores
} from './types.js';

interface FileInput {
  path: string;
  language: string;
  todoCount: number;
  fixmeCount: number;
  memoryConfidence: number;
  verifiedByTests: boolean;
  sizeBytes: number;
}

export function calculateScores(file: FileInput): HeatmapScores {
  const activity = normalize(file.todoCount + file.fixmeCount, 0, 20);

  const unknownness = Number((1 - file.memoryConfidence).toFixed(2));

  const risk = normalize(
    file.fixmeCount * 2 + (file.verifiedByTests ? 0 : 3),
    0,
    12
  );

  const blastRadius = normalize(file.sizeBytes, 0, 100_000);

  const coverageGap = file.verifiedByTests ? 0.1 : 0.9;

  const taskRelevance = estimateTaskRelevance(file.path);

  const attentionScore = Number(
    (
      activity * 0.15 +
      unknownness * 0.25 +
      risk * 0.2 +
      blastRadius * 0.1 +
      coverageGap * 0.15 +
      taskRelevance * 0.15
    ).toFixed(2)
  );

  return {
    activity,
    unknownness,
    risk,
    blastRadius,
    coverageGap,
    taskRelevance,
    memoryConfidence: file.memoryConfidence,
    attentionScore
  };
}

export function determineDecision(
  scores: HeatmapScores
): AttentionDecision {
  if (scores.attentionScore >= 0.8) {
    return 'zoom_in';
  }

  if (scores.attentionScore >= 0.65) {
    return 'verify';
  }

  if (scores.attentionScore >= 0.45) {
    return 'refresh';
  }

  if (scores.attentionScore >= 0.25) {
    return 'cache';
  }

  return 'ignore';
}

export function generateReasons(record: HeatmapRecord): string[] {
  const reasons: string[] = [];

  if (record.scores.unknownness > 0.6) {
    reasons.push('low_memory_confidence');
  }

  if (record.scores.risk > 0.6) {
    reasons.push('high_risk');
  }

  if (record.scores.coverageGap > 0.6) {
    reasons.push('low_test_coverage');
  }

  if (record.scores.activity > 0.5) {
    reasons.push('high_activity');
  }

  return reasons;
}

function normalize(value: number, min: number, max: number): number {
  if (max <= min) {
    return 0;
  }

  const normalized = (value - min) / (max - min);

  return Math.max(0, Math.min(1, Number(normalized.toFixed(2))));
}

function estimateTaskRelevance(path: string): number {
  const lowered = path.toLowerCase();

  if (
    lowered.includes('movement') ||
    lowered.includes('combat') ||
    lowered.includes('player')
  ) {
    return 0.9;
  }

  if (
    lowered.includes('test') ||
    lowered.includes('spec')
  ) {
    return 0.7;
  }

  return 0.4;
}
