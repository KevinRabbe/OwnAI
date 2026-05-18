/**
 * Evidence-based completion gates (Roadmap 01 Phase 6, v0 contract).
 */

import type { TaskId, ValidationGateId } from './ids.js';

export type ValidationGateType =
  | 'manual_result'
  | 'command_result'
  | 'build_result'
  | 'test_result'
  | 'security_result';

export type ValidationGateRunStatus =
  | 'pending'
  | 'running'
  | 'passed'
  | 'failed'
  | 'skipped';

/** Recorded outcome for a gate (shape evolves per gate type in later phases). */
export interface ValidationGateResult {
  status: ValidationGateRunStatus;
  /** Free-form log excerpt, exit code text, or human note. */
  detail?: string;
  recordedAt: string;
}

export interface ValidationGate {
  id: ValidationGateId;
  taskId: TaskId;
  type: ValidationGateType;
  required: boolean;
  label: string;
  result?: ValidationGateResult;
  createdAt: string;
  updatedAt: string;
}
