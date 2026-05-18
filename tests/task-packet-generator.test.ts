import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { asTaskId } from '../packages/core-types/src/ids.js';
import {
  FileTaskPacketStore,
  generateTaskPacketFromRequest
} from '../packages/task-packet-generator/src/index.js';
import {
  createInitialTaskState,
  FileTaskStateStore,
  updateTaskState
} from '../packages/task-state/src/index.js';

test('rough request becomes structured packet with acceptance bar', async () => {
  const taskId = asTaskId('pkt-task');
  const packet = generateTaskPacketFromRequest({
    taskId,
    rawRequest: 'Update README.md only. Do not change tests.'
  });

  assert.ok(packet.goal.includes('README'));
  assert.ok(packet.acceptanceCriteria?.some(c => c.required));
  assert.ok(packet.scopeRestrictions?.length);
});

test('packet persists and attaches to task state', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'ownai-packet-'));
  const taskId = asTaskId('pkt-persist');
  const packet = generateTaskPacketFromRequest({
    taskId,
    rawRequest: 'Fix types in src/index.ts'
  });

  const packetStore = new FileTaskPacketStore(root);
  await packetStore.save(packet);

  const stateStore = new FileTaskStateStore(root);
  await stateStore.save(
    updateTaskState(createInitialTaskState(taskId), {
      taskPacketId: packet.id
    })
  );

  const loaded = await packetStore.getByTaskId(taskId);
  const state = await stateStore.load(taskId);
  assert.equal(loaded?.id, packet.id);
  assert.equal(state?.taskPacketId, packet.id);
});
