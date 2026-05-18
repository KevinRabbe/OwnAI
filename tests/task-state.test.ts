import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { asTaskId } from '../packages/core-types/src/ids.js';
import {
  createInitialTaskState,
  FileTaskStateStore,
  isInterruptedTaskState,
  updateTaskState
} from '../packages/task-state/src/index.js';

test('task state create, update, reload after restart', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'ownai-task-state-'));
  const store = new FileTaskStateStore(root);
  const taskId = asTaskId('task-a');

  const created = createInitialTaskState(taskId, {
    status: 'running',
    currentPhase: 'intake'
  });
  await store.save(created);

  const reloaded = await store.load(taskId);
  assert.equal(reloaded?.status, 'running');
  assert.equal(reloaded?.currentPhase, 'intake');

  const updated = updateTaskState(reloaded!, {
    status: 'completed',
    currentPhase: 'completed'
  });
  await store.save(updated);

  const store2 = new FileTaskStateStore(root);
  const finalState = await store2.load(taskId);
  assert.equal(finalState?.status, 'completed');
});

test('interrupted tasks are detected as unfinished', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'ownai-task-state-'));
  const store = new FileTaskStateStore(root);

  await store.save(
    createInitialTaskState(asTaskId('running-task'), { status: 'running' })
  );
  await store.save(
    createInitialTaskState(asTaskId('done-task'), { status: 'completed' })
  );

  const interrupted = await store.listInterrupted();
  assert.equal(interrupted.length, 1);
  assert.equal(interrupted[0]?.taskId, 'running-task');
  assert.ok(isInterruptedTaskState(interrupted[0]!));
});
