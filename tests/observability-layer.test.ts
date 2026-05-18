import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { asTaskId } from '../packages/core-types/src/ids.js';
import { InMemoryEventBus } from '../packages/core-events/src/InMemoryEventBus.js';
import { KERNEL_ROADMAP_01_EVENTS } from '../packages/core-events/src/kernelEvents.js';
import { FileTimelineWriter } from '../packages/observability-layer/src/index.js';

test('timeline records observations with real task ids', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'ownai-obs-'));
  const writer = new FileTimelineWriter(root);
  const taskId = asTaskId('obs-task');

  await writer.record({
    id: 'obs-1',
    kind: 'task_created',
    timestamp: new Date().toISOString(),
    taskId,
    message: 'Task created'
  });

  const bus = new InMemoryEventBus();
  await writer.recordEvent(
    bus.createEvent({
      type: KERNEL_ROADMAP_01_EVENTS.TASK_COMPLETED,
      source: 'test',
      taskId,
      payload: { taskId }
    })
  );

  const timeline = await writer.readAll();
  assert.equal(timeline.length, 2);
  assert.equal(timeline[0]?.taskId, taskId);
  assert.match(timeline[1]?.message ?? '', /task_completed|completed/);
});
