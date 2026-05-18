import fs from 'node:fs/promises';
import path from 'node:path';

import type { ValidationGate } from '../../core-types/src/validationGate.js';
import type { TaskId, ValidationGateId } from '../../core-types/src/ids.js';

import { taskDirectory } from '../../task-state/src/paths.js';

const VALIDATIONS_FILENAME = 'validations.json';

export class FileValidationGateStore {
  constructor(private readonly workspaceRoot: string) {}

  private filePath(taskId: TaskId): string {
    return path.join(
      taskDirectory(this.workspaceRoot, taskId),
      VALIDATIONS_FILENAME
    );
  }

  async listForTask(taskId: TaskId): Promise<ValidationGate[]> {
    try {
      const raw = await fs.readFile(this.filePath(taskId), 'utf8');
      return JSON.parse(raw) as ValidationGate[];
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

  async get(id: ValidationGateId): Promise<ValidationGate | undefined> {
    const tasksRoot = path.join(this.workspaceRoot, '.ownai', 'tasks');

    try {
      const dirs = await fs.readdir(tasksRoot);

      for (const dir of dirs) {
        const gates = await this.listForTask(dir as TaskId);
        const match = gates.find(g => g.id === id);

        if (match) {
          return match;
        }
      }
    } catch {
      return undefined;
    }

    return undefined;
  }

  async save(gate: ValidationGate): Promise<void> {
    const gates = await this.listForTask(gate.taskId);
    const index = gates.findIndex(g => g.id === gate.id);
    const next = [...gates];

    if (index >= 0) {
      next[index] = gate;
    } else {
      next.push(gate);
    }

    const dir = taskDirectory(this.workspaceRoot, gate.taskId);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(
      this.filePath(gate.taskId),
      JSON.stringify(next, null, 2),
      'utf8'
    );
  }
}
