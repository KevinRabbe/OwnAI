import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { asTaskId } from '../packages/core-types/src/ids.js';
import {
  createContextPackFromTaskPacket
} from '../packages/context-protocol/src/index.js';
import { generateTaskPacketFromRequest } from '../packages/task-packet-generator/src/index.js';
import {
  createReplayEntryFromTask,
  FileReplayStore
} from '../packages/replay-store/src/index.js';

test('replay entry links packet and context', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'ownai-replay-'));
  const taskId = asTaskId('replay-task');
  const packet = generateTaskPacketFromRequest({
    taskId,
    rawRequest: 'README update task'
  });
  const context = createContextPackFromTaskPacket(packet);
  const entry = createReplayEntryFromTask({
    packet,
    contextPack: context,
    validationOutcome: 'passed',
    resultSummary: 'done'
  });

  const store = new FileReplayStore(root);
  await store.append(entry);

  const byTask = await store.listByTask(taskId);
  assert.equal(byTask.length, 1);
  assert.equal(byTask[0]?.taskPacketId, packet.id);
  assert.equal(byTask[0]?.contextPackId, context.id);

  const byHint = await store.queryByTaskTypeHint('readme');
  assert.equal(byHint.length, 1);
});
