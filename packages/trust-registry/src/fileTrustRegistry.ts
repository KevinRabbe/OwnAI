import fs from 'node:fs/promises';
import path from 'node:path';

import type { TrustRecord } from '../../core-types/src/trustRecord.js';
import type { TrustRecordId } from '../../core-types/src/ids.js';
import type {
  TrustTargetKind,
  TrustTargetKey
} from '../../core-types/src/trustRecord.js';

const TRUST_DIR = path.join('.ownai', 'trust');

function sanitizeKey(key: string): string {
  return key.replace(/[^a-zA-Z0-9._-]/g, '_');
}

export class FileTrustRegistry {
  constructor(private readonly workspaceRoot: string) {}

  private trustRoot(): string {
    return path.join(this.workspaceRoot, TRUST_DIR);
  }

  private filePath(
    targetKind: TrustTargetKind,
    targetKey: TrustTargetKey
  ): string {
    return path.join(
      this.trustRoot(),
      `${targetKind}__${sanitizeKey(targetKey)}.json`
    );
  }

  async get(id: TrustRecordId): Promise<TrustRecord | undefined> {
    try {
      const files = await fs.readdir(this.trustRoot());

      for (const file of files) {
        const raw = await fs.readFile(
          path.join(this.trustRoot(), file),
          'utf8'
        );
        const record = JSON.parse(raw) as TrustRecord;

        if (record.id === id) {
          return record;
        }
      }
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

    return undefined;
  }

  async findByTarget(
    targetKind: TrustTargetKind,
    targetKey: TrustTargetKey
  ): Promise<TrustRecord | undefined> {
    try {
      const raw = await fs.readFile(
        this.filePath(targetKind, targetKey),
        'utf8'
      );
      return JSON.parse(raw) as TrustRecord;
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

  async upsert(record: TrustRecord): Promise<void> {
    await fs.mkdir(this.trustRoot(), { recursive: true });
    await fs.writeFile(
      this.filePath(record.targetKind, record.targetKey),
      JSON.stringify(record, null, 2),
      'utf8'
    );
  }
}
