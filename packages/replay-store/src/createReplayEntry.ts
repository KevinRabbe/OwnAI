import crypto from 'node:crypto';

import type { ContextPack } from '../../core-types/src/contextPack.js';
import type { ReplayEntry } from '../../core-types/src/replayEntry.js';
import type { TaskPacket } from '../../core-types/src/taskPacket.js';
import { asReplayEntryId } from '../../core-types/src/ids.js';

export function createReplayEntryFromTask(params: {
  packet: TaskPacket;
  contextPack?: ContextPack;
  validationOutcome?: string;
  resultSummary?: string;
  lessonsLearned?: string[];
}): ReplayEntry {
  return {
    id: asReplayEntryId(crypto.randomUUID()),
    taskId: params.packet.taskId,
    taskPacketId: params.packet.id,
    contextPackId: params.contextPack?.id,
    taskPacketSummary: params.packet.goal.slice(0, 200),
    contextPackSummary: params.contextPack?.taskSummary,
    validationOutcome: params.validationOutcome,
    resultSummary: params.resultSummary,
    lessonsLearned: params.lessonsLearned,
    createdAt: new Date().toISOString()
  };
}
