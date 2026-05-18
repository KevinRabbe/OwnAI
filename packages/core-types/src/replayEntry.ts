/**
 * Operational evidence for post-hoc review (Roadmap 01 Phase 7, v0 contract).
 */

import type {
  ContextPackId,
  ReplayEntryId,
  TaskId,
  TaskPacketId
} from './ids.js';

export interface ReplayEntry {
  id: ReplayEntryId;
  taskId: TaskId;
  taskPacketId?: TaskPacketId;
  contextPackId?: ContextPackId;
  taskPacketSummary?: string;
  contextPackSummary?: string;
  validationOutcome?: string;
  modelOrSkillLabel?: string;
  resultSummary?: string;
  lessonsLearned?: string[];
  tokenOrCostEstimate?: string;
  createdAt: string;
}
