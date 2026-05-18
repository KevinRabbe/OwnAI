/**
 * Conservative trust tracking (Roadmap 01 Phase 8, v0 contract).
 */

import type { TrustRecordId } from './ids.js';

export type TrustTargetKind =
  | 'model'
  | 'skill'
  | 'workflow'
  | 'validation_strategy'
  | 'context_source';

/** Stable key for the thing being scored (e.g. model name, skill id). */
export type TrustTargetKey = string & { readonly __trustTargetKey?: unique symbol };

export interface TrustRecord {
  id: TrustRecordId;
  targetKind: TrustTargetKind;
  targetKey: TrustTargetKey;
  /** Conservative score; interpretation is policy-specific (v0). */
  score: number;
  evidenceRefs?: string[];
  notes?: string;
  updatedAt: string;
}
