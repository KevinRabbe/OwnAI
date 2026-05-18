import fs from 'node:fs/promises';
import path from 'node:path';

import type { TaskPacket } from '../../core-types/src/taskPacket.js';
import type { TaskId, TaskPacketId } from '../../core-types/src/ids.js';

import { taskDirectory } from '../../task-state/src/paths.js';

const PACKET_FILENAME = 'packet.json';

export class FileTaskPacketStore {
  constructor(private readonly workspaceRoot: string) {}

  private filePath(taskId: TaskId): string {
    return path.join(taskDirectory(this.workspaceRoot, taskId), PACKET_FILENAME);
  }

  async save(packet: TaskPacket): Promise<void> {
    const dir = taskDirectory(this.workspaceRoot, packet.taskId);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(
      this.filePath(packet.taskId),
      JSON.stringify(packet, null, 2),
      'utf8'
    );
  }

  async getByTaskId(taskId: TaskId): Promise<TaskPacket | undefined> {
    try {
      const raw = await fs.readFile(this.filePath(taskId), 'utf8');
      return JSON.parse(raw) as TaskPacket;
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

  async get(id: TaskPacketId): Promise<TaskPacket | undefined> {
    const tasksRoot = path.join(
      this.workspaceRoot,
      '.ownai',
      'tasks'
    );

    try {
      const dirs = await fs.readdir(tasksRoot);

      for (const dir of dirs) {
        const packet = await this.getByTaskId(dir as TaskId);

        if (packet?.id === id) {
          return packet;
        }
      }
    } catch {
      return undefined;
    }

    return undefined;
  }
}
