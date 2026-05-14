# OwnAI Sandbox System

The Sandbox System provides isolated execution environments for risky actions, self-improvement, simulations, training, patch testing, and skill evolution.

## Core Principle

```text
Risky work must happen in isolation before it can affect the real project.
```

OwnAI should use sandboxes to prevent bad patches, failed experiments, unstable skills, or self-improvement attempts from damaging the main repository or long-term state.

---

# Main Goals

- Isolate risky execution
- Protect user projects
- Support self-improvement safely
- Support Training Gym workflows
- Support simulation and benchmarking
- Support rollback and comparison
- Prevent pollution of production memory
- Enable experimental skills without risk

---

# Sandbox Use Cases

## 1. Self-Improvement

OwnAI improves one of its own modules only inside a sandbox first.

Required flow:

```text
create sandbox
→ patch isolated module
→ run tests
→ run benchmarks
→ compare metrics
→ generate report
→ request approval before adoption
```

---

## 2. Risky Patches

For high-risk project changes.

Examples:

```text
- core architecture edits
- config/build system changes
- large refactors
- database migration changes
- dependency upgrades
```

---

## 3. Training Gym

Training Gym must use sandboxes or archived replay data.

Rules:

```text
- no production repo modifications
- no automatic merge
- generated skill candidates remain draft/untrusted
```

---

## 4. Simulation

Deep or sandbox simulations may execute real commands safely.

Examples:

```text
- apply patch in sandbox
- run tests
- compare output
- estimate conflicts
- test skill candidate
```

---

## 5. Fabrication / 3D Workflows

Future 3D/fabrication skills can sandbox generated models and slicer settings before printing.

Examples:

```text
- generate STL/3MF
- validate mesh
- simulate printability
- slice preview
- optimize orientation
- require approval before sending to printer
```

---

# Sandbox Types

## Worktree Sandbox

Uses Git worktrees for isolated code changes.

Best for:

```text
- patch testing
- feature work
- self-improvement
- branch comparison
```

---

## Temporary Filesystem Sandbox

Uses temporary directories for generated artifacts.

Best for:

```text
- model outputs
- generated prompts
- temporary reports
- image/3D generation drafts
```

---

## Replay Sandbox

Uses historical data without touching the filesystem.

Best for:

```text
- training skills
- benchmarking strategies
- replay optimization
- confidence calibration
```

---

## Tool Sandbox

Restricts allowed commands/tools.

Best for:

```text
- tests
- builds
- static analysis
- safe scripts
```

---

# Sandbox Metadata

Suggested record:

```json
{
  "id": "sandbox_001",
  "createdAt": "2026-05-14T00:00:00Z",
  "type": "worktree",
  "purpose": "self_improvement",
  "taskId": "task_123",
  "path": ".ownai/worktrees/self-improvement-memory-system",
  "status": "active",
  "allowedTools": ["test", "typecheck", "build"],
  "autoDelete": false,
  "requiresApprovalBeforeMerge": true
}
```

---

# Sandbox Lifecycle

```text
requested
→ created
→ active
→ verified
→ reported
→ approved/rejected
→ merged or deleted
```

---

# Governance Rules

Sandbox usage is required when:

```text
- self-improvement mode is active
- protected systems are modified
- critical files are touched
- simulation depth is sandbox
- skill evolution proposes adoption
- patch risk is high
```

---

# Cleanup Rules

Sandbox artifacts should be governed by the Documentation and Retention Engine.

Rules:

```text
- delete failed temporary sandboxes after useful data is compressed
- keep benchmark summaries
- keep important failure lessons
- never delete unregistered user files
- require approval before deleting active worktrees
```

---

# Observability Integration

Every sandbox action should be visible:

```text
- sandbox created
- sandbox command executed
- sandbox verification passed/failed
- sandbox diff generated
- sandbox deleted
- sandbox promoted
```

---

# Replay Integration

Replay should compare:

```text
sandbox prediction
vs
actual sandbox result
vs
final adopted result
```

This improves future simulation and decision quality.

---

# Dashboard Integration

The UI should show:

```text
Active Sandboxes
Sandbox Purpose
Risk Level
Changed Files
Verification Status
Promotion Status
Cleanup Status
```

---

# Core Rule

```text
No risky change earns trust until it survives isolation.
```
