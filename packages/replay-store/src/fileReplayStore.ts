import fs from 'node:fs/promises';
import path from 'node:path';

import type { ReplayEntry } from '../../core-types/src/replayEntry.js';
import type { ReplayEntryId, TaskId } from '../../core-types/src/ids.js';

const REPLAY_DIR = path.join('.ownai', 'replay', 'entries');

export class FileReplayStore {
  constructor(private readonly workspaceRoot: string) {}

  private entriesRoot(): string {
    return path.join(this.workspaceRoot, REPLAY_DIR);
  }

  private entryPath(id: ReplayEntryId): string {
    return path.join(this.entriesRoot(), `${id}.json`);
  }

  async append(entry: ReplayEntry): Promise<void> {
    await fs.mkdir(this.entriesRoot(), { recursive: true });
    await fs.writeFile(
      this.entryPath(entry.id),
      JSON.stringify(entry, null, 2),
      'utf8'
    );
  }

  async get(id: ReplayEntryId): Promise<ReplayEntry | undefined> {
    try {
      const raw = await fs.readFile(this.entryPath(id), 'utf8');
      return JSON.parse(raw) as ReplayEntry;
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

  async listByTask(taskId: TaskId): Promise<ReplayEntry[]> {
    try {
      const files = await fs.readdir(this.entriesRoot());
      const entries: ReplayEntry[] = [];

      for (const file of files) {
        if (!file.endsWith('.json')) {
          continue;
        }

        const raw = await fs.readFile(
          path.join(this.entriesRoot(), file),
          'utf8'
        );
        const entry = JSON.parse(raw) as ReplayEntry;

        if (entry.taskId === taskId) {
          entries.push(entry);
        }
      }

      return entries;
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

  /** v0: filter by substring in packet summary or result summary. */
  async queryByTaskTypeHint(hint: string): Promise<ReplayEntry[]> {
    const lower = hint.toLowerCase();

    try {
      const files = await fs.readdir(this.entriesRoot());
      const entries: ReplayEntry[] = [];

      for (const file of files) {
        if (!file.endsWith('.json')) {
          continue;
        }

        const raw = await fs.readFile(
          path.join(this.entriesRoot(), file),
          'utf8'
        );
        const entry = JSON.parse(raw) as ReplayEntry;
        const haystack = [
          entry.taskPacketSummary,
          entry.resultSummary,
          entry.validationOutcome
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        if (haystack.includes(lower)) {
          entries.push(entry);
        }
      }

      return entries;
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
}
