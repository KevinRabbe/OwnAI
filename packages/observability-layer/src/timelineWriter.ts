import fs from 'node:fs/promises';
import path from 'node:path';

import type { Observation } from '../../core-types/src/observation.js';
import type { OwnAIEvent } from '../../core-events/src/types.js';

const TIMELINE_RELATIVE = path.join(
  '.ownai',
  'observability',
  'timeline.jsonl'
);

/** Append-only JSONL timeline at `.ownai/observability/timeline.jsonl`. */
export class FileTimelineWriter {
  constructor(private readonly workspaceRoot: string) {}

  private timelinePath(): string {
    return path.join(this.workspaceRoot, TIMELINE_RELATIVE);
  }

  async record(observation: Observation): Promise<void> {
    await fs.mkdir(path.dirname(this.timelinePath()), { recursive: true });
    await fs.appendFile(
      this.timelinePath(),
      `${JSON.stringify(observation)}\n`,
      'utf8'
    );
  }

  async recordEvent(event: OwnAIEvent): Promise<void> {
    await this.record({
      id: event.id,
      kind: 'custom',
      timestamp: event.timestamp,
      taskId: event.taskId as Observation['taskId'],
      correlationId: event.correlationId as Observation['correlationId'],
      message: event.summary ?? event.type,
      data: {
        type: event.type,
        source: event.source,
        severity: event.severity,
        payload: event.payload
      }
    });
  }

  async flush(): Promise<void> {
    /* append-only file needs no flush in v0 */
  }

  async readAll(): Promise<Observation[]> {
    try {
      const raw = await fs.readFile(this.timelinePath(), 'utf8');
      const lines = raw.split('\n').filter(Boolean);
      return lines.map(line => JSON.parse(line) as Observation);
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
