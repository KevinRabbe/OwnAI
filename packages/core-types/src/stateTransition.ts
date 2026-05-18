/**
 * Explicit kernel state change (audit / replay friendly).
 */

export type KernelPhase =
  | 'intake'
  | 'task_packet'
  | 'context_pack'
  | 'execution'
  | 'validation'
  | 'replay'
  | 'trust'
  | 'completed';

export interface StateTransition<TFrom extends string = string, TTo extends string = string> {
  from: TFrom;
  to: TTo;
  at: string;
  reason?: string;
}

/** Narrow helper for kernel phase transitions. */
export type KernelPhaseTransition = StateTransition<KernelPhase, KernelPhase>;
