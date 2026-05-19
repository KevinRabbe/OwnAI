# OwnAI Autonomy Wait States & Human Handoff

OwnAI should not freeze the whole workflow when a task reaches a point that requires human input.

Instead, the blocked area should enter a clear wait state while the system continues safe independent work.

## Core Principle

```text
Pause what requires the human.
Continue what is safe without the human.
Resume when the human returns.
```

---

# Why This Matters

Long-running AI workflows often stop completely when they need one decision, one approval, or one missing piece of information.

That wastes time and breaks autonomy.

OwnAI should support bounded autonomy by separating:

```text
- blocked work
- safe parallel work
- preparation work
- validation work
- documentation work
- replay/compression work
```

---

# Human Wait State

A task or subtask may enter:

```text
WAITING_FOR_HUMAN
```

when it needs:

```text
- approval
- clarification
- merge decision
- security review
- dependency approval
- destructive action approval
- protected core change approval
- autonomy level increase approval
```

The system should record:

```text
- what is blocked
- why human input is needed
- what options the human can choose
- what work can continue safely
- what must not continue
```

---

# Human Handoff Record

Example:

```json
{
  "handoffId": "handoff_001",
  "taskId": "task_123",
  "status": "waiting_for_human",
  "reason": "Security-sensitive dependency added.",
  "requiredDecision": "Approve or reject dependency addition.",
  "options": ["approve", "reject", "request_alternative"],
  "blockedScope": ["merge_to_main", "dependency_install"],
  "safeToContinue": ["write docs", "prepare tests", "run static analysis", "create replay summary"],
  "createdAt": "2026-05-18T00:00:00Z"
}
```

---

# Safe Work While Waiting

While waiting for human input, OwnAI may continue work that is:

```text
- non-destructive
- reversible
- isolated
- validation-only
- documentation-only
- analysis-only
- clearly inside scope
```

Examples:

```text
- run tests
- collect logs
- summarize current state
- prepare alternative options
- create a draft PR description
- update replay evidence
- compress context
- inspect related files
- prepare rollback plan
```

---

# Unsafe Work While Waiting

OwnAI must not continue work that:

```text
- depends on the human decision
- modifies protected core
- merges branches
- installs unapproved dependencies
- changes security-sensitive code beyond review scope
- performs destructive filesystem operations
- increases autonomy level
- bypasses validation or governance
```

---

# Work-Around Strategy

When blocked, OwnAI should ask:

```text
What can be completed safely around the blocked area?
```

Example:

```text
Blocked:
Need approval before merging branch.

Safe work:
- run tests
- inspect branch diff
- prepare review report
- update documentation registry
- create rollback notes
- record handoff summary
```

This allows progress without violating governance.

---

# Resume Behavior

When the human returns, OwnAI should:

```text
- show the handoff reason
- show current state
- show what continued while waiting
- show remaining blocked decision
- ask for or apply the selected decision
- resume from durable task state
```

---

# Integration With Durable Task State

Task state should support statuses such as:

```text
running
blocked
waiting_for_human
resumable
completed
failed
```

The wait reason should be persisted under:

```text
.ownai/tasks/<taskId>/state.json
```

---

# Integration With Observability

The timeline should record:

```text
- task entered WAITING_FOR_HUMAN
- safe work continued
- handoff summary created
- human returned
- decision applied
- task resumed
```

---

# Integration With Governance

Governance decides what may continue while waiting.

Core rule:

```text
Autonomy may work around blocked areas,
but may not bypass the block.
```

---

# Integration With Circuit Breaker

If a task repeatedly reaches the same blocked state, a circuit breaker may stop further attempts and require human review.

---

# Integration With Replay

Replay should learn:

```text
- which tasks commonly require handoff
- which safe work was useful while waiting
- which handoff summaries helped the human decide
- which blocked states caused wasted work
```

---

# Core Rule

```text
Human input should block only the unsafe or undecidable part,
not the entire cognition workflow.
```
