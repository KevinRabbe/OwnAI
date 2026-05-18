import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { asTaskId } from '../packages/core-types/src/ids.js';
import {
  createContextPackFromTaskPacket,
  FileContextPackStore,
  summarizeContextPack
} from '../packages/context-protocol/src/index.js';
import { generateTaskPacketFromRequest } from '../packages/task-packet-generator/src/index.js';

test('context pack from packet has reasons and summary', async () => {
  const packet = generateTaskPacketFromRequest({
    taskId: asTaskId('ctx-task'),
    rawRequest: 'Inspect packages/core-types/src/index.ts'
  });

  const pack = createContextPackFromTaskPacket(packet);
  assert.ok(pack.items.every(i => i.reason.length > 0));
  assert.ok(pack.tokenBudgetEstimate);

  const summary = summarizeContextPack(pack);
  assert.match(summary, /Task/);
  assert.match(summary, /Context items/);
});

test('context pack persists to disk', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'ownai-ctx-'));
  const packet = generateTaskPacketFromRequest({
    taskId: asTaskId('ctx-persist'),
    rawRequest: 'demo'
  });
  const pack = createContextPackFromTaskPacket(packet);
  const store = new FileContextPackStore(root);
  await store.save(pack);

  const loaded = await store.getByTaskId(packet.taskId);
  assert.equal(loaded?.id, pack.id);
});
