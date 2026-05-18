import path from 'node:path';

import type { TaskId } from '../../core-types/src/ids.js';

export const OWN_AI_DIR = '.ownai';
export const TASKS_DIR = 'tasks';
export const STATE_FILENAME = 'state.json';

export function ownAiRoot(workspaceRoot: string): string {
  return path.join(workspaceRoot, OWN_AI_DIR);
}

export function taskDirectory(workspaceRoot: string, taskId: TaskId): string {
  return path.join(ownAiRoot(workspaceRoot), TASKS_DIR, taskId);
}

export function taskStateFilePath(
  workspaceRoot: string,
  taskId: TaskId
): string {
  return path.join(taskDirectory(workspaceRoot, taskId), STATE_FILENAME);
}
