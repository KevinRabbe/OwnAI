import crypto from 'node:crypto';

import type { TrustRecord } from '../../core-types/src/trustRecord.js';
import { asTrustRecordId } from '../../core-types/src/ids.js';
import type {
  TrustTargetKind,
  TrustTargetKey
} from '../../core-types/src/trustRecord.js';

const INITIAL_TRUST_SCORE = 0.35;
const MAX_DELTA_PER_UPDATE = 0.08;

export function createTrustRecord(params: {
  targetKind: TrustTargetKind;
  targetKey: TrustTargetKey;
  notes?: string;
}): TrustRecord {
  return {
    id: asTrustRecordId(crypto.randomUUID()),
    targetKind: params.targetKind,
    targetKey: params.targetKey,
    score: INITIAL_TRUST_SCORE,
    notes: params.notes,
    evidenceRefs: [],
    updatedAt: new Date().toISOString()
  };
}

/**
 * Conservative update: unvalidated success barely moves trust; failures penalize more.
 */
export function updateTrustFromOutcome(
  record: TrustRecord,
  params: {
    validated: boolean;
    passed: boolean;
    evidenceRef?: string;
  }
): TrustRecord {
  let delta = 0;

  if (params.validated && params.passed) {
    delta = MAX_DELTA_PER_UPDATE;
  } else if (params.validated && !params.passed) {
    delta = -MAX_DELTA_PER_UPDATE * 1.5;
  } else if (!params.validated && params.passed) {
    delta = MAX_DELTA_PER_UPDATE * 0.25;
  } else {
    delta = -MAX_DELTA_PER_UPDATE * 0.5;
  }

  const nextScore = Math.max(
    0,
    Math.min(1, record.score + delta)
  );

  const evidenceRefs = [...(record.evidenceRefs ?? [])];

  if (params.evidenceRef) {
    evidenceRefs.push(params.evidenceRef);
  }

  return {
    ...record,
    score: Number(nextScore.toFixed(4)),
    evidenceRefs,
    updatedAt: new Date().toISOString()
  };
}
