import crypto from 'node:crypto';

import type { TaskPacket } from '../../core-types/src/taskPacket.js';
import {
  asTaskId,
  asTaskPacketId,
  type TaskId
} from '../../core-types/src/ids.js';

const FILE_PATTERN =
  /(?:^|\s)(?:[\w./-]+\.(?:ts|tsx|js|jsx|md|json|py|go|rs)\b)/gi;

/**
 * v0: turn rough user intent into a structured {@link TaskPacket} (no model call).
 */
export function generateTaskPacketFromRequest(params: {
  taskId: TaskId;
  rawRequest: string;
}): TaskPacket {
  const now = new Date().toISOString();
  const goal = params.rawRequest.trim() || 'Unspecified task goal';

  const files = extractFileHints(params.rawRequest);
  const scopeRestrictions = extractScopeRestrictions(params.rawRequest);

  return {
    id: asTaskPacketId(crypto.randomUUID()),
    taskId: params.taskId,
    goal,
    scopeRestrictions: scopeRestrictions.length ? scopeRestrictions : undefined,
    filesToInspect: files.length ? files : undefined,
    validationCommands: [
      {
        id: crypto.randomUUID(),
        command: 'npm run typecheck',
        description: 'TypeScript compile check'
      }
    ],
    acceptanceCriteria: [
      {
        id: crypto.randomUUID(),
        description: 'Task goal is met and validations pass',
        required: true
      }
    ],
    stopConditions: [
      {
        id: crypto.randomUUID(),
        description: 'Stop if scope restrictions would be violated'
      }
    ],
    riskOrSecurityNotes: goal.toLowerCase().includes('secret')
      ? ['Review for secrets before committing']
      : undefined,
    createdAt: now,
    updatedAt: now
  };
}

function extractFileHints(text: string): string[] {
  const matches = text.match(FILE_PATTERN) ?? [];
  return [...new Set(matches.map(m => m.trim()))];
}

function extractScopeRestrictions(text: string): string[] {
  const lower = text.toLowerCase();
  const restrictions: string[] = [];

  if (lower.includes('do not') || lower.includes("don't")) {
    restrictions.push('Honor explicit do-not constraints from the request');
  }

  if (lower.includes('only ') || lower.includes('just ')) {
    restrictions.push('Limit changes to the scope described in the request');
  }

  return restrictions;
}

/** Convenience when only a raw string is known; generates a fresh task id. */
export function generateTaskPacketFromRawRequest(
  rawRequest: string
): TaskPacket {
  return generateTaskPacketFromRequest({
    taskId: asTaskId(crypto.randomUUID()),
    rawRequest
  });
}
