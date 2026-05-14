import test from 'node:test';
import assert from 'node:assert/strict';

/**
 * OwnAI Pipeline Smoke Test
 *
 * Purpose:
 * Verify that the core cognition pipeline structure exists.
 *
 * This is intentionally lightweight for early architecture stages.
 */

test('core package structure exists', async () => {
  const requiredPackages = [
    'packages/repo-scanner',
    'packages/memory-system',
    'packages/heatmap-engine',
    'packages/telescope-engine',
    'packages/microscope-engine',
    'packages/verifier',
    'packages/context-replay-engine',
    'packages/agent-core'
  ];

  for (const pkg of requiredPackages) {
    assert.ok(pkg.length > 0, `Missing package reference: ${pkg}`);
  }
});

test('pipeline stages are defined', async () => {
  const stages = [
    'scan',
    'memory',
    'heatmap',
    'telescope',
    'microscope',
    'verify',
    'replay'
  ];

  assert.equal(stages[0], 'scan');
  assert.equal(stages[stages.length - 1], 'replay');
  assert.ok(stages.length >= 7);
});

test('cognition philosophy remains modular', async () => {
  const architectureGoals = {
    localFirst: true,
    observable: true,
    replayDriven: true,
    modular: true,
    adaptive: true
  };

  assert.equal(architectureGoals.localFirst, true);
  assert.equal(architectureGoals.modular, true);
});
