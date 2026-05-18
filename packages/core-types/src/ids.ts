/**
 * Branded id types for the Minimal Cognition Kernel so ids are not cross-wired at compile time.
 * Values are plain strings at runtime (e.g. UUIDs).
 */

declare const brand: unique symbol;

type Brand<T, B extends string> = T & { readonly [brand]: B };

/** Stable id for a user-facing cognition task. */
export type TaskId = Brand<string, 'TaskId'>;

/** Id of a structured task packet derived from intent. */
export type TaskPacketId = Brand<string, 'TaskPacketId'>;

/** Id of a context pack attached to a task. */
export type ContextPackId = Brand<string, 'ContextPackId'>;

/** Id of a validation gate instance. */
export type ValidationGateId = Brand<string, 'ValidationGateId'>;

/** Id of a replay ledger entry. */
export type ReplayEntryId = Brand<string, 'ReplayEntryId'>;

/** Id of a trust registry record. */
export type TrustRecordId = Brand<string, 'TrustRecordId'>;

/** Id of a recovery checkpoint. */
export type RecoveryPointId = Brand<string, 'RecoveryPointId'>;

/** Correlates events and observations across subsystems. */
export type CorrelationId = Brand<string, 'CorrelationId'>;

export function asTaskId(value: string): TaskId {
  return value as TaskId;
}

export function asTaskPacketId(value: string): TaskPacketId {
  return value as TaskPacketId;
}

export function asContextPackId(value: string): ContextPackId {
  return value as ContextPackId;
}

export function asValidationGateId(value: string): ValidationGateId {
  return value as ValidationGateId;
}

export function asReplayEntryId(value: string): ReplayEntryId {
  return value as ReplayEntryId;
}

export function asTrustRecordId(value: string): TrustRecordId {
  return value as TrustRecordId;
}

export function asRecoveryPointId(value: string): RecoveryPointId {
  return value as RecoveryPointId;
}

export function asCorrelationId(value: string): CorrelationId {
  return value as CorrelationId;
}
