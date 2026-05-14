# OwnAI Task Queue System

The Task Queue System allows the user to give OwnAI multiple tasks in advance.

OwnAI should execute them one after another without requiring constant input, while still pausing when approval, clarification, or safety decisions are needed.

## Core Principle

```text
OwnAI should work like a trusted coworker with a task backlog.
```

The user should be able to assign several tasks and let OwnAI progress through them autonomously.

---

# Main Goals

- Accept multiple tasks in sequence
- Execute tasks one after another by default
- Track task status visibly
- Pause only when needed
- Verify each task before moving on
- Store reports, patches, replay data, and lessons per task
- Allow reorder, cancel, pause, and resume
- Support future parallel scheduling when hardware allows

---

# Queue Flow

```text
User adds tasks
→ Task Queue stores them
→ OwnAI starts task 1
→ builds task graph
→ runs cognition pipeline
→ verifies result
→ records patch/report/replay
→ marks task completed
→ moves to task 2
→ repeats until queue is done
```

---

# Example

User gives:

```text
1. Add tests for memory-system
2. Improve heatmap scoring
3. Update docs for model routing
4. Add CLI command for full pipeline
5. Run verification and summarize results
```

OwnAI executes:

```text
Task 1 running
Task 2 queued
Task 3 queued
Task 4 queued
Task 5 queued
```

If task 2 needs approval, OwnAI pauses there but keeps the remaining tasks queued.

---

# Task States

```text
queued
running
waiting_for_approval
blocked
completed
failed
skipped
cancelled
```

---

# Queue Item Shape

```json
{
  "id": "task_001",
  "createdAt": "2026-05-14T00:00:00Z",
  "title": "Improve heatmap scoring",
  "description": "Refine attention score weights using memory confidence and replay data.",
  "status": "queued",
  "priority": "normal",
  "mode": "normal",
  "requiresApproval": false,
  "taskGraphId": null,
  "dependsOn": []
}
```

---

# Execution Rules

## Default Rule

```text
Run one task at a time.
```

This is safest for low-resource systems and avoids unnecessary merge conflicts.

## Verification Rule

```text
Do not start the next task until the current task is verified or explicitly skipped.
```

## Approval Rule

Pause when:

```text
- files are deleted
- risky files are changed
- privacy boundaries are involved
- GitHub/PR actions are requested
- patch quality is low
- confidence is too low
- task requires user decision
```

## Failure Rule

When a task fails, OwnAI can:

```text
- retry if budget allows
- switch mode
- mark blocked
- ask for approval
- skip and continue if user allows
```

---

# Queue Controls

The user should be able to:

```text
- add task
- pause queue
- resume queue
- cancel task
- reorder tasks
- mark task as blocked
- skip task
- change priority
- change mode
```

---

# Dashboard UI

The dashboard should show:

```text
TASK QUEUE
[Running] Add tests for memory-system
[Queued]  Improve heatmap scoring
[Queued]  Update model routing docs
[Blocked] Open PR - waiting for approval
```

Each task card should show:

```text
- task title
- current mode
- status
- active system
- verification state
- confidence
- token budget
- patch status
```

---

# Integration With Other Systems

## Task Graph

Each queue item becomes a task graph.

## Operating Modes

Each task can run in a selected mode:
- Normal
- Debug
- Build
- Self-Improvement
- Training Gym

## Git Engine

Each task may create its own branch, worktree, or patch record.

## Verification Layer

Each task must produce verification output.

## Context Replay Engine

Each task generates replay data after completion.

## Token Economy Engine

Each task receives a token/cost budget.

## Patch Quality Engine

Each coding task receives a quality evaluation before acceptance.

---

# Future Parallel Queue

Later, OwnAI can run independent tasks in parallel if:

```text
- hardware allows it
- files do not overlap
- merge risk is low
- task dependency graph allows parallelism
- thread cost gate approves
```

Default remains sequential execution.

---

# Core Rule

```text
OwnAI should accept future work while current work is running,
but execute safely through a controlled queue.
```
