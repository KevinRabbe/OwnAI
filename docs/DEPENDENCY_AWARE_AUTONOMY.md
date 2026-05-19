# OwnAI Dependency-Aware Autonomy

Dependency-aware autonomy allows OwnAI to continue safe independent work when one phase, task, or node is blocked by human approval, validation, security review, or missing information.

## Core Principle

```text
Blocked dependencies pause only what depends on them.
Independent safe work may continue.
```

A blocked task should not freeze the entire workflow unless every remaining task depends on it.

---

# Why This Matters

Long-running roadmaps are rarely perfectly linear.

A task may be blocked because it needs:

```text
- human approval
- security review
- dependency approval
- merge approval
- protected core review
- missing information
- failed validation
```

But other tasks may still be safe and useful.

OwnAI should be able to work around the blocked area without bypassing governance.

---

# Dependency Graph Model

OwnAI should treat phases and tasks as nodes in a graph, not only as a flat sequence.

Example:

```text
Phase 1 — Core Contracts
  ↓
Phase 2 — Event Bus
  ↓
Phase 3 — Durable Task State
  ↓
Phase 4 — Security-Sensitive Area  → WAITING_FOR_HUMAN
  ↓
Phase 6 — Acceptance Validation

Phase 5 — Context Pack v0
  depends on Phase 1 and Phase 3
  does not depend on Phase 4
  → can continue
```

---

# Node States

Suggested states:

```text
ready
running
blocked
waiting_for_human
skipped_until_dependency_ready
safe_to_continue
completed
failed
```

---

# Dependency Types

## Hard Dependency

A task cannot proceed until the dependency is complete.

Example:

```text
Validation acceptance depends on validation results.
```

---

## Soft Dependency

A task can proceed partially, but final acceptance waits.

Example:

```text
Documentation can be drafted before final implementation is merged.
```

---

## Review Dependency

A task needs human or security review before completion.

Example:

```text
Dependency addition requires human approval.
```

---

## Information Dependency

A task needs missing data or clarification.

Example:

```text
Task packet cannot be finalized because acceptance criteria are unclear.
```

---

# Work-Around Rules

When a node is blocked, OwnAI should ask:

```text
Which tasks depend on the blocked node?
Which tasks are independent?
Which tasks can be partially prepared safely?
Which tasks must not continue?
```

---

# Safe Work Around Blocked Nodes

Allowed work may include:

```text
- unrelated independent roadmap phases
- tests that do not rely on blocked behavior
- documentation drafts
- review report preparation
- static analysis
- replay compression
- context cleanup
- registry updates
- rollback planning
- alternative option preparation
```

---

# Unsafe Work Around Blocked Nodes

Do not continue work that:

```text
- depends on the blocked decision
- assumes approval happened
- marks blocked work as accepted
- merges blocked changes
- increases trust from unapproved work
- builds new behavior on unvalidated behavior
- bypasses security/governance review
```

---

# Example

```text
Blocked:
Phase 4 touches security-sensitive filesystem access and requires review.

Skip/pause:
- Phase 4 acceptance
- Phase 6 final acceptance if it depends on Phase 4
- trust increase for Phase 4

Continue:
- Phase 5 context pack implementation if independent
- docs registry updates
- test scaffolding
- static analysis
- review report
- replay summary
```

---

# Partial Completion

Some tasks can be partially completed while waiting.

Example:

```text
Create tests
Prepare documentation
Generate review checklist
Create rollback plan
```

But they remain:

```text
pending_final_acceptance
```

until dependencies resolve.

---

# Integration With Human Handoff

When human input is required, create a handoff record.

Dependency-aware autonomy should include:

```text
- blocked node
- dependent nodes paused
- independent nodes continuing
- safe work list
- unsafe work list
- resume condition
```

---

# Integration With Governance

Governance decides whether a node may continue.

Core rule:

```text
Working around a block is allowed.
Bypassing a block is forbidden.
```

---

# Integration With Task State

Task state should record dependency status:

```json
{
  "taskId": "task_123",
  "status": "waiting_for_human",
  "blockedBy": ["security_review_001"],
  "blocks": ["task_126", "task_130"],
  "safeToContinue": ["task_124", "task_125"]
}
```

---

# Integration With Observability

The timeline should show:

```text
- node blocked
- dependent nodes paused
- independent nodes continued
- work-around selected
- human returned
- blocked node resumed
```

---

# Integration With Circuit Breaker

If OwnAI repeatedly tries to continue dependent work that should be paused, the circuit breaker should block the workflow and require review.

---

# Roadmap 01 Scope

Roadmap 01 should not implement a full dependency scheduler yet.

Kernel-compatible v0:

```text
- dependency fields in task state if useful
- blockedBy field
- blocks field
- safeToContinue notes
- handoff record references
- observability events for blocked and continued work
```

Advanced graph scheduling can come later.

---

# Core Rule

```text
Only skip the parts that require the blocked dependency.
Continue safe independent work around them.
```
