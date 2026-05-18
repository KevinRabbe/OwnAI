import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { asTaskId } from '../packages/core-types/src/ids.js';
import { FileTimelineWriter } from '../packages/observability-layer/src/index.js';
import { runVerticalSlice } from '../packages/kernel-slice/src/index.js';
import {
  createInitialTaskState,
  FileTaskStateStore,
  isInterruptedTaskState
} from '../packages/task-state/src/index.js';

test('vertical slice writes .ownai artifacts and completes task', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'ownai-slice-'));

  const result = await runVerticalSlice({
    workspaceRoot: root,
    rawRequest: 'Update README for demo vertical slice'
  });

  assert.equal(result.completed, true);
  assert.ok(result.timelineEntries >= 1);

  const statePath = path.join(
    root,
    '.ownai',
    'tasks',
    result.taskId,
    'state.json'
  );
  const stateRaw = await fs.readFile(statePath, 'utf8');
  const state = JSON.parse(stateRaw);
  assert.equal(state.status, 'completed');

  await fs.access(path.join(root, '.ownai', 'observability', 'timeline.jsonl'));
});

test('interrupted task can resume via task id', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'ownai-slice-resume-'));
  const taskId = asTaskId('resume-me');
  const store = new FileTaskStateStore(root);

  await store.save(
    createInitialTaskState(taskId, {
      status: 'running',
      currentPhase: 'context_pack'
    })
  );
  assert.ok(isInterruptedTaskState((await store.load(taskId))!));

  const result = await runVerticalSlice({
    workspaceRoot: root,
    rawRequest: 'Resume demo',
    taskId
  });

  assert.equal(result.resumed, true);
  assert.equal(result.completed, true);

  const timeline = new FileTimelineWriter(root);
  const entries = await timeline.readAll();
  assert.ok(entries.length >= 1);
});
