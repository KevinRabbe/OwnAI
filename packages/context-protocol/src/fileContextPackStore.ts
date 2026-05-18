import fs from 'node:fs/promises';
import path from 'node:path';

import type { ContextPack } from '../../core-types/src/contextPack.js';
import type { ContextPackId, TaskId } from '../../core-types/src/ids.js';

import { taskDirectory } from '../../task-state/src/paths.js';

const CONTEXT_PACK_FILENAME = 'context-pack.json';

export class FileContextPackStore {
  constructor(private readonly workspaceRoot: string) {}

  private filePath(taskId: TaskId): string {
    return path.join(
      taskDirectory(this.workspaceRoot, taskId),
      CONTEXT_PACK_FILENAME
    );
  }

  async save(pack: ContextPack): Promise<void> {
    const dir = taskDirectory(this.workspaceRoot, pack.taskId);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(
      this.filePath(pack.taskId),
      JSON.stringify(pack, null, 2),
      'utf8'
    );
  }

  async get(id: ContextPackId): Promise<ContextPack | undefined> {
    const tasksRoot = path.join(this.workspaceRoot, '.ownai', 'tasks');

    try {
      const dirs = await fs.readdir(tasksRoot);

      for (const dir of dirs) {
        const pack = await this.getByTaskId(dir as TaskId);

        if (pack?.id === id) {
          return pack;
        }
      }
    } catch {
      return undefined;
    }

    return undefined;
  }

  async getByTaskId(taskId: TaskId): Promise<ContextPack | undefined> {
    try {
      const raw = await fs.readFile(this.filePath(taskId), 'utf8');
      return JSON.parse(raw) as ContextPack;
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
}
