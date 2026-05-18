import fs from 'node:fs/promises';
import path from 'node:path';

import type { DurableKernelTaskStateV0 } from '../../core-types/src/durableTaskState.js';
import type { TaskId } from '../../core-types/src/ids.js';

import { isInterruptedTaskState } from './taskStateHelpers.js';
import {
  ownAiRoot,
  taskDirectory,
  taskStateFilePath,
  TASKS_DIR
} from './paths.js';

/** File-backed {@link DurableTaskStateRepository} under `.ownai/tasks/<taskId>/state.json`. */
export class FileTaskStateStore {
  constructor(private readonly workspaceRoot: string) {}

  async load(taskId: TaskId): Promise<DurableKernelTaskStateV0 | undefined> {
    const filePath = taskStateFilePath(this.workspaceRoot, taskId);

    try {
      const raw = await fs.readFile(filePath, 'utf8');
      return JSON.parse(raw) as DurableKernelTaskStateV0;
    } catch (error) {
      if (
        error &&
        typeof error === 'object' &&
        'code' in error &&
        (error as NodeJS.ErrnoException).code === 'ENOENT'
      ) {
        return undefined;
      }

      throw error;
    }
  }

  async save(state: DurableKernelTaskStateV0): Promise<void> {
    const dir = taskDirectory(this.workspaceRoot, state.taskId);
    await fs.mkdir(dir, { recursive: true });
    const filePath = taskStateFilePath(this.workspaceRoot, state.taskId);
    await fs.writeFile(filePath, JSON.stringify(state, null, 2), 'utf8');
  }

  async listAll(): Promise<DurableKernelTaskStateV0[]> {
    const tasksRoot = path.join(ownAiRoot(this.workspaceRoot), TASKS_DIR);

    try {
      const entries = await fs.readdir(tasksRoot, { withFileTypes: true });
      const states: DurableKernelTaskStateV0[] = [];

      for (const entry of entries) {
        if (!entry.isDirectory()) {
          continue;
        }

        const state = await this.load(entry.name as TaskId);

        if (state) {
          states.push(state);
        }
      }

      return states;
    } catch (error) {
      if (
        error &&
        typeof error === 'object' &&
        'code' in error &&
        (error as NodeJS.ErrnoException).code === 'ENOENT'
      ) {
        return [];
      }

      throw error;
    }
  }

  async listInterrupted(): Promise<DurableKernelTaskStateV0[]> {
    const all = await this.listAll();
    return all.filter(isInterruptedTaskState);
  }
}
