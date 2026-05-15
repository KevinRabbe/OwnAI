# OwnAI Auto Backup & Recovery System

The Auto Backup & Recovery System protects OwnAI projects, skills, simulations, sandboxes, memory, and self-improvement workflows from irreversible damage.

## Core Principle

```text
Every risky action should have a recovery path before it executes.
```

OwnAI should not only detect failure. It should preserve safe restore points before high-risk work begins.

---

# Main Goals

- Create automatic recovery points
- Support rollback after failed patches
- Protect skill evolution experiments
- Protect simulation outputs
- Protect self-improvement workflows
- Protect long-term memory integrity
- Support recovery after corrupted state
- Make recovery visible in the UI
- Preserve useful failure lessons before cleanup

---

# Backup Targets

OwnAI may create backups for:

```text
- source patches
- generated docs
- skill definitions
- skill benchmark data
- model routing profiles
- governance rules
- state machine configs
- replay data
- trust calibration data
- long-term memory snapshots
- simulation artifacts
- sandbox outputs
- project planning docs
```

---

# Backup Types

## 1. Patch Backup

Created before modifying project files.

Used for:

```text
- rollback failed patches
- compare before/after behavior
- recover from overcomplex patches
```

---

## 2. Skill Backup

Created before evolving a skill.

Used for:

```text
- compare skill versions
- restore older skill behavior
- reject failed skill evolution
```

---

## 3. Simulation Backup

Created before sandbox or deep simulation execution.

Used for:

```text
- preserve simulation inputs
- compare predicted vs actual results
- replay failed simulation paths
```

---

## 4. Self-Improvement Backup

Created before OwnAI modifies its own systems.

Required for:

```text
- protected core changes
- governance changes
- state machine changes
- dependency governance changes
- trust calibration changes
```

---

## 5. Memory Snapshot

Created before memory compression, cleanup, or trust recalibration.

Used for:

```text
- restore corrupted long-term memory
- compare compression quality
- prevent loss of important lessons
```

---

# Recovery Point Metadata

Example:

```json
{
  "id": "recovery_001",
  "createdAt": "2026-05-15T00:00:00Z",
  "type": "skill_backup",
  "scope": "skills/coding/fix_bug_with_tests",
  "reason": "Skill evolution candidate v1.3 started.",
  "taskId": "task_441",
  "stateBefore": "TRAINING",
  "restorePath": ".ownai/backups/skills/fix_bug_with_tests/v1.2",
  "expiresAt": null,
  "protected": true
}
```

---

# When Backups Are Required

Backups are required before:

```text
- protected-core changes
- self-improvement patches
- skill version adoption
- governance rule changes
- state machine rule changes
- memory compression of high-importance data
- destructive cleanup
- dependency changes
- broad refactors
- Git operations that rewrite history
```

---

# When Backups Are Recommended

Backups are recommended before:

```text
- medium-risk patches
- model routing profile changes
- benchmark profile updates
- task queue batch execution
- simulation strategy changes
```

---

# Recovery Flow

```text
failure detected
→ identify latest valid recovery point
→ simulate rollback if possible
→ governance validates rollback
→ restore backup
→ run verification
→ create recovery report
→ replay stores lesson
```

---

# Skill Recovery

Skill evolution must be reversible.

Flow:

```text
backup skill v1.2
→ create candidate v1.3
→ benchmark candidate
→ compare against v1.2
→ approve or reject
→ restore v1.2 if candidate fails
```

No skill should replace a trusted version unless:

```text
- benchmark improves or stays acceptable
- regression risk is low
- trust score remains stable
- governance approves adoption
```

---

# Self-Improvement Recovery

Self-improvement requires strong recovery.

Flow:

```text
create protected backup
→ sandbox modification
→ simulation
→ verification
→ benchmark comparison
→ approval
→ adoption
```

If adoption fails:

```text
restore previous system state
→ enter RECOVERING or SAFE_MODE if needed
```

---

# Memory Recovery

Memory compression and cleanup can lose nuance.

Before high-importance compression:

```text
create memory snapshot
→ compress
→ compare information preservation
→ update trust/confidence
→ keep or rollback
```

---

# Backup Storage

Suggested runtime path:

```text
.ownai/backups/
├── patches/
├── skills/
├── simulations/
├── self-improvement/
├── memory/
└── governance/
```

Backups should be registered in:

```text
.ownai/backups/backup_registry.json
```

---

# Retention Rules

Backup retention should be governed by Documentation and Retention Engine.

Keep longer when:

```text
- protected core was modified
- skill version changed
- memory was compressed
- governance changed
- failure occurred
```

Delete sooner when:

```text
- backup is low-risk
- task completed successfully
- replay extracted all useful lessons
- TTL expired
```

---

# Governance Integration

Governance may block risky actions when no backup exists.

Example:

```text
Action: modify state machine transition rules
Backup: missing
Governance: blocked
Required: create protected recovery point
```

---

# State Machine Integration

Backups interact with states:

```text
PATCHING
→ patch backup recommended/required

SELF_IMPROVING
→ protected backup required

TRAINING
→ skill backup required before adoption

COMPRESSING
→ memory snapshot required for important memory

RECOVERING
→ restore recovery point
```

---

# Observability Integration

Backup and recovery actions must be visible.

Timeline examples:

```text
Recovery point created: skill v1.2
Candidate skill v1.3 failed benchmark
Restored skill v1.2
Replay lesson saved
```

---

# Dashboard Integration

The UI should show:

```text
Recovery Points
Latest Backup
Protected Backup Status
Rollback Available
Backup Age
Recovery Confidence
Storage Usage
```

---

# Core Rule

```text
OwnAI should be allowed to experiment,
but not without a way back.
```
