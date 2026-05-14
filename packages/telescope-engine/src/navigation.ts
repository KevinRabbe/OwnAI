import crypto from 'node:crypto';
import path from 'node:path';

import type {
  NavigationMap,
  NavigationTarget,
  RepoZone,
  ZoomDepth
} from './types.js';

interface HeatmapRecord {
  path: string;
  decision: string;
  reasons: string[];
  scores: {
    attentionScore: number;
    unknownness: number;
    risk: number;
  };
}

interface HeatmapState {
  generatedAt: string;
  records: HeatmapRecord[];
}

export function buildNavigationMap(params: {
  heatmap: HeatmapState;
  task?: string;
  maxTargets?: number;
}): NavigationMap {
  const zoneMap = new Map<string, HeatmapRecord[]>();

  for (const record of params.heatmap.records) {
    const zoneName = getZoneName(record.path);

    if (!zoneMap.has(zoneName)) {
      zoneMap.set(zoneName, []);
    }

    zoneMap.get(zoneName)?.push(record);
  }

  const zones: RepoZone[] = [];
  const ignoredZones: RepoZone[] = [];
  const targets: NavigationTarget[] = [];

  for (const [zoneName, records] of zoneMap.entries()) {
    const averageAttentionScore = Number(
      (
        records.reduce(
          (sum, record) => sum + record.scores.attentionScore,
          0
        ) / records.length
      ).toFixed(2)
    );

    const maxAttentionScore = Math.max(
      ...records.map(record => record.scores.attentionScore)
    );

    const recommendedZoomDepth = determineZoomDepth({
      averageAttentionScore,
      maxAttentionScore
    });

    const knowledgeState = determineKnowledgeState(records);

    const zone: RepoZone = {
      id: crypto.randomUUID(),
      name: zoneName,
      rootPath: zoneName,
      files: records.map(record => record.path),
      averageAttentionScore,
      maxAttentionScore,
      knowledgeState,
      recommendedZoomDepth,
      reasons: generateZoneReasons(records)
    };

    if (averageAttentionScore < 0.25) {
      ignoredZones.push(zone);
      continue;
    }

    zones.push(zone);

    for (const record of records) {
      targets.push({
        id: crypto.randomUUID(),
        zoneId: zone.id,
        path: record.path,
        attentionScore: record.scores.attentionScore,
        decision: record.decision,
        zoomDepth: recommendedZoomDepth,
        reasons: record.reasons
      });
    }
  }

  return {
    generatedAt: new Date().toISOString(),
    task: params.task,
    zones: zones.sort(
      (a, b) => b.averageAttentionScore - a.averageAttentionScore
    ),
    targets: targets
      .sort((a, b) => b.attentionScore - a.attentionScore)
      .slice(0, params.maxTargets ?? 25),
    ignoredZones
  };
}

function getZoneName(filePath: string): string {
  const normalized = filePath.replace(/\\/g, '/');

  const parts = normalized.split('/');

  if (parts.length <= 1) {
    return 'root';
  }

  return parts[0] ?? 'root';
}

function determineZoomDepth(params: {
  averageAttentionScore: number;
  maxAttentionScore: number;
}): ZoomDepth {
  if (params.maxAttentionScore >= 0.85) {
    return 'line';
  }

  if (params.averageAttentionScore >= 0.7) {
    return 'symbol';
  }

  if (params.averageAttentionScore >= 0.5) {
    return 'file';
  }

  if (params.averageAttentionScore >= 0.3) {
    return 'folder';
  }

  return 'repo';
}

function determineKnowledgeState(
  records: HeatmapRecord[]
): 'known' | 'partly_known' | 'unknown' {
  const avgUnknownness =
    records.reduce(
      (sum, record) => sum + record.scores.unknownness,
      0
    ) / records.length;

  if (avgUnknownness >= 0.7) {
    return 'unknown';
  }

  if (avgUnknownness >= 0.4) {
    return 'partly_known';
  }

  return 'known';
}

function generateZoneReasons(records: HeatmapRecord[]): string[] {
  const reasons = new Set<string>();

  for (const record of records) {
    record.reasons.forEach(reason => reasons.add(reason));
  }

  return [...reasons];
}
