/**
 * Re-exports Minimal Cognition Kernel contracts from `core-types` for imports anchored on `core-state`.
 * Pipeline graph types (`TaskNode`, `TaskGraph`) remain in `./taskGraph.js` and are not kernel tasks.
 */

export type {
  DurableKernelTaskStateV0,
  KernelTask,
  KernelTaskStatus
} from '../../core-types/src/index.js';
