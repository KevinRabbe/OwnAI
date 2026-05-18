import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import type { TrustTargetKey } from '../packages/core-types/src/trustRecord.js';
import {
  createTrustRecord,
  FileTrustRegistry,
  updateTrustFromOutcome
} from '../packages/trust-registry/src/index.js';

test('trust starts conservative and updates from validated outcomes', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'ownai-trust-'));
  const registry = new FileTrustRegistry(root);
  const key = 'demo-model' as TrustTargetKey;

  let record = createTrustRecord({
    targetKind: 'model',
    targetKey: key
  });
  const initial = record.score;
  await registry.upsert(record);

  record = updateTrustFromOutcome(record, {
    validated: true,
    passed: true,
    evidenceRef: 'run-1'
  });
  await registry.upsert(record);

  const loaded = await registry.findByTarget('model', key);
  assert.ok(loaded!.score > initial);
  assert.ok(loaded!.evidenceRefs?.includes('run-1'));
});

test('unvalidated success barely increases trust', () => {
  const key = 'x' as TrustTargetKey;
  const base = createTrustRecord({ targetKind: 'skill', targetKey: key });
  const validated = updateTrustFromOutcome(base, {
    validated: true,
    passed: true
  });
  const unvalidated = updateTrustFromOutcome(base, {
    validated: false,
    passed: true
  });
  assert.ok(validated.score - base.score > unvalidated.score - base.score);
});
