import crypto from 'node:crypto';

import type { ContextPack } from '../../core-types/src/contextPack.js';
import type { TaskPacket } from '../../core-types/src/taskPacket.js';
import { asContextPackId } from '../../core-types/src/ids.js';

/**
 * v0: build a focused context pack from a task packet (deterministic, no model).
 */
export function createContextPackFromTaskPacket(packet: TaskPacket): ContextPack {
  const now = new Date().toISOString();
  const items = [];

  items.push({
    id: crypto.randomUUID(),
    reference: `task-packet:${packet.id}`,
    reason: 'Primary structured intent for this task',
    content: packet.goal
  });

  for (const file of packet.filesToInspect ?? []) {
    items.push({
      id: crypto.randomUUID(),
      reference: file,
      reason: 'Listed in task packet files to inspect'
    });
  }

  for (const restriction of packet.scopeRestrictions ?? []) {
    items.push({
      id: crypto.randomUUID(),
      reference: 'scope-restriction',
      reason: restriction
    });
  }

  const tokenBudgetEstimate = Math.min(
    8000,
    400 + items.length * 120 + packet.goal.length
  );

  return {
    id: asContextPackId(crypto.randomUUID()),
    taskId: packet.taskId,
    taskSummary: packet.goal.slice(0, 240),
    items,
    constraints: packet.scopeRestrictions,
    validationTargets: packet.validationCommands?.map(c => c.command),
    tokenBudgetEstimate,
    trust: {
      confidence: 0.5,
      sources: ['task-packet-generator-v0']
    },
    createdAt: now,
    updatedAt: now
  };
}

/** Plain-text summary for model prompts. */
export function summarizeContextPack(pack: ContextPack): string {
  const lines = [
    `# Task`,
    pack.taskSummary,
    ``,
    `# Context items (${pack.items.length})`
  ];

  for (const item of pack.items) {
    lines.push(`- ${item.reference}: ${item.reason}`);
  }

  if (pack.constraints?.length) {
    lines.push(``, `# Constraints`);
    for (const c of pack.constraints) {
      lines.push(`- ${c}`);
    }
  }

  lines.push(``, `Estimated tokens: ~${pack.tokenBudgetEstimate ?? 'unknown'}`);

  return lines.join('\n');
}
