import test from 'node:test';
import assert from 'node:assert/strict';

import { asTaskId } from '../packages/core-types/src/ids.js';
import { InMemoryEventBus } from '../packages/core-events/src/InMemoryEventBus.js';
import {
  KERNEL_ROADMAP_01_EVENTS,
  emitKernelRoadmap01Event,
  subscribeKernelRoadmap01
} from '../packages/core-events/src/index.js';
import type { OwnAIEvent } from '../packages/core-events/src/types.js';

test('InMemoryEventBus records emitted events for observability', async () => {
  const bus = new InMemoryEventBus({ maxHistoryEntries: 5 });

  await bus.emit(
    bus.createEvent({
      type: 'test.event',
      source: 'test',
      payload: { n: 1 }
    })
  );

  const history = bus.getRecordedEvents();
  assert.equal(history.length, 1);
  assert.equal(history[0]?.type, 'test.event');
});

test('InMemoryEventBus ring buffer drops oldest entries', async () => {
  const bus = new InMemoryEventBus({ maxHistoryEntries: 2 });

  for (let i = 0; i < 3; i++) {
    await bus.emit(
      bus.createEvent({
        type: 'test.ring',
        source: 'test',
        payload: { i }
      })
    );
  }

  const history = bus.getRecordedEvents();
  assert.equal(history.length, 2);
  assert.deepEqual((history[0]?.payload as { i: number }).i, 1);
  assert.deepEqual((history[1]?.payload as { i: number }).i, 2);
});

test('unsubscribe stops scoped and global handlers', async () => {
  const bus = new InMemoryEventBus({ recordHistory: false });
  const seen: string[] = [];

  const sub = bus.subscribe('a', () => {
    seen.push('a');
  });
  const globalSub = bus.subscribeAll(() => {
    seen.push('all');
  });

  await bus.emit(
    bus.createEvent({ type: 'a', source: 't', payload: null })
  );
  assert.deepEqual(seen, ['a', 'all']);

  sub.unsubscribe();
  globalSub.unsubscribe();
  seen.length = 0;

  await bus.emit(
    bus.createEvent({ type: 'a', source: 't', payload: null })
  );
  assert.deepEqual(seen, []);
});

test('kernel roadmap emit and subscribe are typed', async () => {
  const bus = new InMemoryEventBus();
  const taskId = asTaskId('task-1');
  let received: OwnAIEvent | undefined;

  const sub = subscribeKernelRoadmap01(
    bus,
    KERNEL_ROADMAP_01_EVENTS.TASK_CREATED,
    event => {
      received = event;
    }
  );

  await emitKernelRoadmap01Event(bus, {
    type: KERNEL_ROADMAP_01_EVENTS.TASK_CREATED,
    source: 'test',
    payload: { taskId, title: 'demo' }
  });

  sub.unsubscribe();
  assert.equal(received?.type, KERNEL_ROADMAP_01_EVENTS.TASK_CREATED);
  assert.equal(
    (received?.payload as { title?: string }).title,
    'demo'
  );
  assert.ok(
    bus
      .getRecordedEvents()
      .some(e => e.type === KERNEL_ROADMAP_01_EVENTS.TASK_CREATED)
  );
});
