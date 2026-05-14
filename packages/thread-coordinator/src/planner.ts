import crypto from 'node:crypto';

import type {
  ExecutionMode,
  PlannedThread,
  ThreadDecisionInput,
  ThreadPhase,
  ThreadPlan
} from './types.js';

export function createThreadPlan(
  input: ThreadDecisionInput
): ThreadPlan {
  const executionMode = determineExecutionMode(input);

  const phases: ThreadPhase[] = [];

  phases.push({
    id: crypto.randomUUID(),
    label: 'analysis',
    threads: [
      createThread({
        label: 'attention-analysis',
        purpose: 'Analyze repo attention and context focus.',
        systemFocus: [
          'heatmap-engine',
          'telescope-engine',
          'microscope-engine'
        ],
        requiresModel: false,
        requiresWorktree: false
      })
    ]
  });

  if (executionMode === 'assisted_thread') {
    phases.push({
      id: crypto.randomUUID(),
      label: 'verification_assist',
      threads: [
        createThread({
          label: 'verification-helper',
          purpose: 'Continuously verify generated patches.',
          systemFocus: ['verifier'],
          requiresModel: false,
          requiresWorktree: false
        })
      ]
    });
  }

  if (
    executionMode === 'parallel_threads' ||
    executionMode === 'competition_threads'
  ) {
    phases.push({
      id: crypto.randomUUID(),
      label: 'parallel_execution',
      threads: [
        createThread({
          label: 'implementation-thread-a',
          purpose: 'Primary implementation strategy.',
          systemFocus: ['model-adapters', 'git-engine'],
          requiresModel: true,
          requiresWorktree: true
        }),

        createThread({
          label: 'implementation-thread-b',
          purpose: 'Secondary implementation strategy.',
          systemFocus: ['model-adapters', 'git-engine'],
          requiresModel: true,
          requiresWorktree: true
        })
      ]
    });
  }

  return {
    executionMode,
    allowedModelThreads:
      executionMode === 'single_thread'
        ? 1
        : Math.min(input.hardware.maxModelThreads, 2),
    allowedToolThreads:
      executionMode === 'single_thread'
        ? 2
        : Math.min(input.hardware.maxToolThreads, 6),
    shouldCreateWorktrees:
      executionMode !== 'single_thread',
    reasons: generateReasons(input, executionMode),
    phases
  };
}

function determineExecutionMode(
  input: ThreadDecisionInput
): ExecutionMode {
  if (input.hardware.lowResourceMode) {
    return 'single_thread';
  }

  if (
    input.hardware.availableVramGb !== undefined &&
    input.hardware.availableVramGb < 10
  ) {
    return 'single_thread';
  }

  if (
    input.highAttentionTargets > 20 &&
    input.hardware.cpuThreads !== undefined &&
    input.hardware.cpuThreads >= 16
  ) {
    return 'parallel_threads';
  }

  if (
    input.averageConfidence < 0.45 &&
    input.hardware.availableRamGb !== undefined &&
    input.hardware.availableRamGb >= 64
  ) {
    return 'competition_threads';
  }

  return 'assisted_thread';
}

function generateReasons(
  input: ThreadDecisionInput,
  mode: ExecutionMode
): string[] {
  const reasons: string[] = [];

  reasons.push(`execution_mode:${mode}`);

  if (input.hardware.lowResourceMode) {
    reasons.push('low_resource_mode_enabled');
  }

  if (input.highAttentionTargets > 20) {
    reasons.push('large_attention_surface');
  }

  if (input.averageConfidence < 0.5) {
    reasons.push('low_memory_confidence');
  }

  return reasons;
}

function createThread(params: {
  label: string;
  purpose: string;
  systemFocus: string[];
  requiresModel: boolean;
  requiresWorktree: boolean;
}): PlannedThread {
  return {
    id: crypto.randomUUID(),
    label: params.label,
    purpose: params.purpose,
    systemFocus: params.systemFocus,
    requiresModel: params.requiresModel,
    requiresWorktree: params.requiresWorktree
  };
}
