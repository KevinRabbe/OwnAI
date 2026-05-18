/**
 * Structured operational packet (Roadmap 01 Phase 4 shape, v0 contract).
 */

import type { TaskPacketId, TaskId } from './ids.js';

/** One suggested command-line validation to run before acceptance. */
export interface TaskPacketValidationCommand {
  id: string;
  command: string;
  cwd?: string;
  description?: string;
}

/** Explicit bar for “done”. */
export interface TaskPacketAcceptanceCriterion {
  id: string;
  description: string;
  required: boolean;
}

/** When to stop autonomous work even if incomplete. */
export interface TaskPacketStopCondition {
  id: string;
  description: string;
}

export interface TaskPacket {
  id: TaskPacketId;
  taskId: TaskId;
  /** Primary user goal in plain language. */
  goal: string;
  /** Paths, topics, or systems that must not be touched. */
  scopeRestrictions?: string[];
  /** Known files to inspect first (optional). */
  filesToInspect?: string[];
  validationCommands?: TaskPacketValidationCommand[];
  acceptanceCriteria?: TaskPacketAcceptanceCriterion[];
  stopConditions?: TaskPacketStopCondition[];
  riskOrSecurityNotes?: string[];
  createdAt: string;
  updatedAt: string;
}
