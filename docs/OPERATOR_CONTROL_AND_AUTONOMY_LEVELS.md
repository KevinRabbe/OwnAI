# OwnAI Operator Control & Autonomy Levels

OwnAI should be autonomous, but always steerable.

The user should feel like a supervisor/operator working with an engineering coworker, not like someone micromanaging every action or blindly trusting a hidden agent loop.

## Core Principle

```text
Autonomy should be layered, visible, and reversible.
```

OwnAI should not treat autonomy as a simple on/off switch.

---

# Main Goals

- Let users supervise cognition without micromanagement
- Make autonomy levels explicit
- Allow quick intervention
- Prevent autonomy mismatch
- Support project-specific risk tolerance
- Support trust-based autonomy growth
- Support fatigue-based autonomy reduction
- Connect autonomy to governance and state machine rules

---

# Operator Role

The user acts as:

```text
supervisor
operator
reviewer
approver
strategic decision maker
```

OwnAI acts as:

```text
engineering coworker
execution system
memory system
planning assistant
adaptive cognition platform
```

---

# Operator Controls

The user should always be able to:

```text
- pause autonomy
- resume autonomy
- lower autonomy
- increase autonomy
- force local-only mode
- force compression
- inspect why a decision happened
- reject a proposed action
- approve a blocked action
- lock protected paths
- disable a skill
- change model profile
- reorder task queue
- cancel a task
- change goal priority
- enter safe mode
```

---

# Autonomy Levels

## Level 0 — Manual Assistant

OwnAI provides suggestions only.

Allowed:

```text
- answer questions
- generate plans
- explain code
- suggest patches
```

Not allowed:

```text
- modify files
- run commands
- execute task queue
```

---

## Level 1 — Guided Assistance

OwnAI can prepare actions but needs approval.

Allowed:

```text
- generate patches for review
- prepare commands
- create task plans
- create documentation drafts
```

Requires approval for:

```text
- file changes
- command execution
- Git actions
```

---

## Level 2 — Safe Autonomous Execution

OwnAI can execute low-risk actions.

Allowed:

```text
- update generated docs
- run read-only analysis
- run tests/typecheck
- generate reports
- update temporary artifacts
```

Requires approval for:

```text
- source code patches
- dependency changes
- GitHub actions
- protected files
```

---

## Level 3 — Operational Coworker

OwnAI can execute queued implementation tasks within governance limits.

Allowed:

```text
- work through task queue
- apply low/medium-risk patches
- run verification
- recover from minor failures
- generate patch reports
```

Requires approval for:

```text
- high-risk changes
- public GitHub actions
- dependency changes
- architecture-critical files
```

---

## Level 4 — Adaptive Long-Running Cognition

OwnAI can run longer workflows with adaptive recovery and replay optimization.

Allowed:

```text
- queue progression
- controlled retry loops
- adaptive compression
- simulation before execution
- skill usage based on trust
- background low-risk learning
```

Requires approval for:

```text
- self-improvement
- destructive changes
- protected systems
- expensive cloud escalation
```

---

## Level 5 — Experimental Self-Improving Mode

OwnAI can improve its own systems, but only inside strict sandbox governance.

Allowed:

```text
- sandbox self-improvement
- skill evolution experiments
- training gym benchmarks
- candidate patch generation
```

Requires approval for:

```text
- adoption into main branch
- modifying governance/state systems
- external dependencies
- changing protected architecture rules
```

---

# Dynamic Autonomy Adjustment

OwnAI may recommend autonomy changes.

Examples:

```text
Fatigue rising
→ recommend Level 4 → Level 2

Replay trust stable for weeks
→ recommend Level 2 → Level 3

Critical production repo detected
→ recommend conservative autonomy

Sandbox training active
→ allow higher experimental autonomy inside sandbox only
```

The user should approve increases in autonomy.

OwnAI may automatically reduce autonomy for safety.

---

# Autonomy Inputs

Autonomy decisions should use:

```text
- trust scores
- governance profile
- operating mode
- fatigue level
- project intent
- simulation risk
- verification history
- model reliability
- queue state
- protected paths
- token/resource pressure
```

---

# Autonomy Mismatch

Autonomy mismatch happens when OwnAI is too aggressive or too cautious for the current situation.

Examples:

```text
Too aggressive:
patching critical files without enough trust

Too cautious:
asking approval for harmless generated docs every time
```

OwnAI should detect mismatch and recommend adjustment.

---

# Dashboard Integration

The UI should show:

```text
Current Autonomy Level
Allowed Actions
Blocked Actions
Reason for Current Level
Recommended Adjustment
Trust Stability
Fatigue Level
Governance Status
```

Example:

```text
Autonomy Level: 3 — Operational Coworker
Queue Execution: enabled
Self-Improvement: disabled
Protected Files: locked
Cloud Escalation: approval required
Fatigue: low
Trust Stability: high
```

---

# Governance Integration

Governance decides whether a requested action is allowed at the current autonomy level.

Even if systems vote for an action:

```text
Governance may block it.
```

---

# State Machine Integration

Certain states require specific autonomy levels.

Examples:

```text
SELF_IMPROVING
→ Level 5 required

SAFE_MODE
→ autonomy reduced to Level 0 or 1

TRAINING
→ allowed at Level 4+ for low-risk training
```

---

# Core Rule

```text
The user should control direction, boundaries, and approval — not every keystroke.
```
