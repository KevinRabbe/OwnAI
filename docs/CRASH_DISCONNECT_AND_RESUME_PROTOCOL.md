# OwnAI Crash, Disconnect & Resume Protocol

The Crash, Disconnect & Resume Protocol defines how OwnAI preserves task state and safely resumes after interruptions.

## Core Principle

```text
A task must survive disconnects, crashes, restarts, and interrupted model/tool sessions.
```

OwnAI should not assume a task is complete just because generation stopped, the app closed, the device restarted, or a remote tool disconnected.

---

# Main Goals

- Preserve unfinished task state
- Resume safely after restart
- Detect incomplete validation
- Prevent false acceptance
- Prevent scope drift after continuation
- Recover from model/tool interruptions
- Preserve modified-file lists
- Preserve acceptance criteria
- Preserve command/test status
- Support long-running autonomous workflows

---

# Interruption Types

OwnAI must handle:

```text
- app crash
- device restart
- power loss
- network disconnect
- model/API timeout
- Codex/agent session interruption
- terminal process crash
- test command interruption
- Git operation interruption
- UI disconnect from backend runtime
```

---

# Persistent Task State

Every active task should have a durable task record.

Suggested path:

```text
.ownai/tasks/task_<id>/state.json
```

Example:

```json
{
  "taskId": "worker-loop-fix",
  "status": "unfinished",
  "currentState": "VERIFYING",
  "createdAt": "2026-05-15T00:00:00Z",
  "updatedAt": "2026-05-15T00:22:00Z",
  "modifiedFiles": [
    "GatherResourceCommand.cs",
    "ConstructionSystem.cs",
    "ResourceGatherSystem.cs",
    "ResourceDepositSystem.cs",
    "tests/Program.cs"
  ],
  "scopeRestrictions": [
    "no_ui_changes",
    "no_visual_changes",
    "no_bots_changes",
    "no_networking_changes",
    "no_map_layout_changes"
  ],
  "requiredValidation": [
    "dotnet build GodotClient\\RtsGame.GodotClient.csproj --no-restore",
    "dotnet build tests\\RtsGame.Tests.csproj --no-restore",
    "dotnet run --project tests\\RtsGame.Tests.csproj --no-build -- --fail-fast",
    "dotnet run --project src\\tools\\Headless\\RtsGame.Headless.csproj --no-build -- run-stress --scenario chaos-v4 --ticks 5000 --seed 77"
  ],
  "acceptanceState": "not_accepted",
  "commitRequired": true,
  "lastKnownSafePoint": "recovery_001"
}
```

---

# Resume Flow

On startup or reconnect:

```text
scan .ownai/tasks
→ find unfinished tasks
→ load task state
→ inspect Git diff
→ compare modified files
→ verify last command status
→ detect incomplete validation
→ rebuild context pack
→ ask operator or continue based on autonomy level
```

---

# Resume Safety Rules

## Rule 1 — Never Assume Completion

```text
If validation did not finish, task is unfinished.
```

## Rule 2 — Reconfirm Dirty State

Before continuing, OwnAI should inspect:

```text
- Git diff
- changed files
- untracked files
- last checkpoint
- backup availability
```

## Rule 3 — Preserve Scope Restrictions

Continuation must retain original scope limits.

Example:

```text
Do not change UI, visuals, bots, networking, or map layout.
```

## Rule 4 — Validation Must Restart Safely

Interrupted commands should be treated as unknown, not pass/fail.

## Rule 5 — Acceptance Requires Full Evidence

A patch can only be accepted if required validation completed successfully and evidence is stored.

---

# Command State Tracking

Long-running commands should be tracked.

Example:

```json
{
  "commandId": "cmd_004",
  "command": "dotnet run --project src/tools/Headless/RtsGame.Headless.csproj --no-build -- run-stress --scenario chaos-v4 --ticks 5000 --seed 77",
  "status": "interrupted",
  "startedAt": "2026-05-15T00:18:00Z",
  "finishedAt": null,
  "exitCode": null,
  "outputPath": ".ownai/tasks/worker-loop-fix/commands/cmd_004.log"
}
```

---

# Heartbeat / Checkpointing

OwnAI should periodically write checkpoints during long tasks.

Checkpoint triggers:

```text
- before file modifications
- after file modifications
- before command execution
- after command execution
- before Git actions
- before validation
- after validation
- before commit
```

---

# Recovery Points

Risky tasks should create recovery points before execution.

Used for:

```text
- rollback after crash
- diff comparison
- partial patch rejection
- restoring known good state
```

---

# Acceptance State

Tasks should track acceptance explicitly.

States:

```text
not_started
in_progress
validation_pending
validated
committed
accepted
rejected
blocked
```

Important rule:

```text
Committed does not equal accepted.
```

Acceptance requires:

```text
- validation evidence
- changed file report
- behavior explanation
- risk confirmation
- operator or governance approval depending on autonomy level
```

---

# Observability Integration

The UI should show:

```text
Interrupted Task Detected
Last Known State
Modified Files
Validation Status
Recovery Point Available
Resume Options
```

Example:

```text
Task: worker-loop-fix
State: VERIFYING interrupted
Modified files: 5
Stress test: not completed
Acceptance: blocked
Recommended: resume validation from command 3
```

---

# Governance Integration

Governance may block continuation when:

```text
- protected files changed
- validation evidence missing
- scope drift detected
- dirty Git state is inconsistent
- recovery point is missing for risky work
```

---

# Replay Integration

Replay should learn from interruptions:

```text
- which tasks commonly fail after restart
- which validations are frequently interrupted
- which checkpoint frequency works best
- which recovery paths succeed
```

---

# Core Rule

```text
Interruption is not failure.
But interruption without persistent state becomes unsafe.
```
