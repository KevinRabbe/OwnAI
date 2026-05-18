import test from 'node:test';
import assert from 'node:assert/strict';

import { asTaskId } from '../packages/core-types/src/ids.js';
import {
  KERNEL_ROADMAP_01_EVENTS,
  isKernelRoadmap01EventType
} from '../packages/core-events/src/kernelEvents.js';

test('kernel roadmap event constants are stable strings', () => {
  assert.equal(
    KERNEL_ROADMAP_01_EVENTS.TASK_CREATED,
    'kernel.roadmap01.task_created'
  );
  assert.ok(isKernelRoadmap01EventType('kernel.roadmap01.task_created'));
  assert.ok(!isKernelRoadmap01EventType('task.created'));
});

test('branded task id helper produces assignable TaskId', () => {
  const id = asTaskId('550e8400-e29b-41d4-a716-446655440000');
  assert.equal(id, '550e8400-e29b-41d4-a716-446655440000');
});
