# OwnAI Flag Lifecycle & Acceptance Rules

Workflow flags must have a lifecycle.

A flag that is created but never resolved becomes context noise, hidden risk, and unreliable operational memory.

## Core Principle

```text
No task should be marked completed while it still has unresolved blocking flags.
```

Flags must either be resolved, escalated, accepted as known risk, or moved into a durable blocked state.

---

# Why This Matters

Flags are structured interrupts.

They are useful only if OwnAI treats them as real workflow state instead of passive notes.

Unmanaged flags create:

```text
- hidden blockers
- false task completion
- stale warnings
- noisy observability
- bad replay lessons
- incorrect trust updates
- unsafe acceptance decisions
```

---

# Flag Lifecycle

Suggested lifecycle:

```text
created
→ acknowledged
→ assigned
→ in_review
→ resolved
→ closed
```

Alternative lifecycle for escalations:

```text
created
→ escalated
→ waiting_for_human
→ resolved
→ closed
```

Alternative lifecycle for unrecoverable issues:

```text
created
→ dead_letter
→ archived
```

---

# Flag Status Definitions

## created

Flag exists but has not been reviewed.

---

## acknowledged

An owner has seen the flag.

---

## assigned

The flag has a responsible owner.

---

## in_review

A worker, governance layer, validator, or human is reviewing the flag.

---

## escalated

The flag requires a higher authority or specialist.

---

## waiting_for_human

The flag cannot be resolved without human/operator input.

---

## resolved

The underlying issue has been addressed or the required decision has been made.

---

## closed

The flag is no longer active and has final evidence attached.

---

## dead_letter

The flag points to unrecoverable or corrupted state that has been isolated.

---

# Flag Levels And Consequences

## info

Consequence:

```text
no block
```

Acceptance:

```text
can complete with info flag open, but report should mention it when relevant
```

---

## warning

Consequence:

```text
work may continue
```

Acceptance:

```text
can complete if warning is acknowledged or explicitly accepted as known risk
```

---

## blocked

Consequence:

```text
affected scope pauses
```

Acceptance:

```text
cannot complete affected task until resolved, escalated, or moved to waiting state
```

---

## security_review_required

Consequence:

```text
security/governance review required
```

Acceptance:

```text
cannot accept affected work without security review outcome
```

---

## human_required

Consequence:

```text
human handoff required
```

Acceptance:

```text
cannot complete affected decision until human response is recorded
```

---

## dead_letter

Consequence:

```text
state isolated
```

Acceptance:

```text
cannot mark original task successful; must mark failed, blocked, or partially recovered
```

---

# Acceptance Rules

A task may be accepted only when:

```text
- required validation passed
- acceptance criteria are met
- no unresolved blocking flags exist for accepted scope
- security review flags are resolved when relevant
- human-required flags have recorded decisions
- governance allows acceptance
- observability recorded final state
```

---

# Known-Risk Acceptance

Some warnings may be accepted as known risk.

Required fields:

```text
- acceptedBy
- reason
- risk description
- evidence
- expiration or review date if needed
```

Example:

```json
{
  "flagId": "flag_123",
  "status": "closed",
  "resolution": "accepted_known_risk",
  "acceptedBy": "human_operator",
  "reason": "Low-risk documentation warning. Implementation unaffected.",
  "createdAt": "2026-05-18T00:00:00Z",
  "closedAt": "2026-05-18T00:10:00Z"
}
```

Known-risk acceptance should not be used for critical security or destructive actions without explicit human approval.

---

# Resolution Types

Suggested resolution values:

```text
fixed
not_reproducible
accepted_known_risk
escalated_to_human
moved_to_dead_letter
superseded
duplicate
invalid_flag
```

---

# Flag Closure Evidence

A closed flag should include evidence.

Examples:

```text
- validation result
- security review result
- human decision
- updated artifact
- replay entry
- dead-letter record
- governance decision
```

Core rule:

```text
Do not close important flags without evidence.
```

---

# Task Completion Guard

Before task completion, OwnAI should check:

```text
open blocking flags?
open security flags?
open human-required flags?
unacknowledged warnings?
dead-letter state linked?
```

If yes:

```text
do not mark task completed
```

Instead use:

```text
blocked
waiting_for_human
failed
partially_completed
```

---

# Integration With Governance

Governance decides whether a flag blocks acceptance.

Examples:

```text
scope_violation flag
→ governance blocks acceptance

security_review_required flag
→ governance requires review

warning flag
→ governance may allow known-risk acceptance
```

---

# Integration With Validation

Validation provides closure evidence.

Example:

```text
Validation failed due to missing test command.
Flag created.
Test command added.
Validation rerun and passed.
Flag resolved as fixed.
```

---

# Integration With Observability

Timeline should record:

```text
FLAG_CREATED
FLAG_ACKNOWLEDGED
FLAG_ASSIGNED
FLAG_ESCALATED
FLAG_RESOLVED
FLAG_CLOSED
TASK_COMPLETION_BLOCKED_BY_FLAGS
```

---

# Integration With Replay

Replay should learn:

```text
- which flag categories repeat
- which flags correctly predicted failure
- which warnings were harmless
- which workers generate noisy flags
- which task packet fields prevent blockers
```

---

# Integration With Trust

Trust can change based on flag outcomes.

Examples:

```text
security worker repeatedly flags real issues
→ trust increases

worker repeatedly creates invalid flags
→ trust decreases

model ignores blocking flags
→ trust decreases
```

---

# Anti-Patterns

Avoid:

```text
- closing flags without evidence
- marking task complete while blocked flags are open
- treating security flags as normal warnings
- hiding accepted risks
- allowing workers to dismiss their own critical flags without review
- creating duplicate flags for same blocker
- leaving old flags open forever
```

---

# Roadmap 01 Scope

Roadmap 01 does not need a full flag engine.

Kernel-compatible v0:

```text
- define flag status values
- store open flag references in task state
- prevent completion when blocking flags exist
- emit basic flag lifecycle observations
```

Advanced flag routing and automatic resolution can come later.

---

# Core Rule

```text
Flags create obligations.
They must be resolved, escalated, or explicitly accepted before affected work is completed.
```
