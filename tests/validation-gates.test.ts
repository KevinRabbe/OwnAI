import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { asTaskId } from '../packages/core-types/src/ids.js';
import {
  canAcceptTask,
  FileValidationGateStore,
  hasFailedValidation,
  registerValidationGate,
  recordValidationResult
} from '../packages/validation-gates/src/index.js';

test('validation gates register, store results, enforce acceptance', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'ownai-val-'));
  const taskId = asTaskId('val-task');
  const store = new FileValidationGateStore(root);

  let gate = registerValidationGate({
    taskId,
    type: 'manual_result',
    label: 'Human review',
    required: true
  });
  await store.save(gate);

  assert.equal(canAcceptTask(await store.listForTask(taskId)), false);

  gate = recordValidationResult(gate, {
    status: 'passed',
    detail: 'Looks good'
  });
  await store.save(gate);

  const gates = await store.listForTask(taskId);
  assert.equal(canAcceptTask(gates), true);
  assert.equal(hasFailedValidation(gates), false);
});

test('failed validation is detectable', async () => {
  const taskId = asTaskId('val-fail');
  let gate = registerValidationGate({
    taskId,
    type: 'test_result',
    label: 'npm test',
    required: true
  });
  gate = recordValidationResult(gate, { status: 'failed', detail: 'exit 1' });
  assert.equal(hasFailedValidation([gate]), true);
  assert.equal(canAcceptTask([gate]), false);
});
