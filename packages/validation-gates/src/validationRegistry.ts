import crypto from 'node:crypto';

import type { ValidationGate } from '../../core-types/src/validationGate.js';
import { asValidationGateId, type TaskId } from '../../core-types/src/ids.js';
import type { ValidationGateType } from '../../core-types/src/validationGate.js';

export function registerValidationGate(params: {
  taskId: TaskId;
  type: ValidationGateType;
  label: string;
  required?: boolean;
}): ValidationGate {
  const now = new Date().toISOString();

  return {
    id: asValidationGateId(crypto.randomUUID()),
    taskId: params.taskId,
    type: params.type,
    label: params.label,
    required: params.required ?? true,
    createdAt: now,
    updatedAt: now
  };
}

export function recordValidationResult(
  gate: ValidationGate,
  params: {
    status: 'passed' | 'failed' | 'skipped';
    detail?: string;
  }
): ValidationGate {
  return {
    ...gate,
    result: {
      status: params.status,
      detail: params.detail,
      recordedAt: new Date().toISOString()
    },
    updatedAt: new Date().toISOString()
  };
}

/** All required gates must have a passing result before acceptance. */
export function canAcceptTask(gates: ValidationGate[]): boolean {
  const required = gates.filter(g => g.required);

  if (required.length === 0) {
    return true;
  }

  return required.every(g => g.result?.status === 'passed');
}

export function hasFailedValidation(gates: ValidationGate[]): boolean {
  return gates.some(g => g.result?.status === 'failed');
}
