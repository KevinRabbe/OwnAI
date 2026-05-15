# OwnAI Protected Core Architecture

The Protected Core Architecture defines which parts of OwnAI are critical cognition infrastructure and therefore require stronger protection, verification, simulation, and approval before modification.

## Core Principle

```text
The systems that protect cognition must themselves be difficult to destabilize.
```

OwnAI may eventually improve itself, evolve skills, add plugins, and modify workflows. That power requires protected foundations.

---

# Main Goals

- Protect critical cognition infrastructure
- Prevent slow degradation of safety systems
- Prevent accidental weakening of governance
- Prevent replay/trust corruption
- Protect state legality rules
- Protect dependency discipline
- Support safe self-improvement
- Preserve long-term platform stability

---

# Protection Levels

## Level 0 — Normal

Low-risk areas.

Examples:

```text
- examples
- templates
- cosmetic UI themes
- generated documentation drafts
```

Rules:

```text
standard verification
normal patch quality check
```

---

## Level 1 — Important

Useful but not foundational.

Examples:

```text
- optional skills
- domain-specific adapters
- non-critical UI panels
- helper utilities
```

Rules:

```text
verification required
patch quality required
replay report recommended
```

---

## Level 2 — Sensitive

Systems that influence cognition quality.

Examples:

```text
- replay scoring
- token economy
- focus lens
- model routing
- patch quality heuristics
- planning model routing
```

Rules:

```text
simulation recommended
verification required
benchmark comparison recommended
patch report required
```

---

## Level 3 — Protected Core

Systems that control stability, safety, autonomy, or truth calibration.

Examples:

```text
- governance layer
- state machine
- dependency governance
- hallucination guard
- trust calibration
- failure recovery
- sandbox system
- autonomy levels
- protected memory retention rules
```

Rules:

```text
sandbox required
simulation required
verification required
replay comparison required
approval required before adoption
```

---

## Level 4 — Constitutional Core

Systems that define OwnAI identity, hard safety boundaries, or platform laws.

Examples:

```text
- cognitive constitution
- core philosophy
- governance rules
- protected-core rules
- local-first ownership principle
- user approval enforcement
```

Rules:

```text
manual approval required
sandbox required
simulation required
benchmark comparison required
identity alignment check required
rollback plan required
```

---

# Protected Core Examples

## Governance Core

Danger:

```text
A bad patch weakens approval requirements.
```

Required:

```text
sandbox + simulation + approval
```

---

## State Machine

Danger:

```text
Invalid transition allows unsafe execution.
```

Required:

```text
transition tests + recovery tests + governance review
```

---

## Trust System

Danger:

```text
Bad trust calibration causes unreliable systems to gain authority.
```

Required:

```text
benchmark comparison + replay analysis
```

---

## Dependency Governance

Danger:

```text
Architecture boundaries weaken and package spaghetti grows.
```

Required:

```text
dependency scan + circular import check + boundary verification
```

---

# Modification Flow

```text
change proposed
→ identify protection level
→ run required simulation
→ create sandbox if required
→ apply patch in sandbox
→ run verification
→ run benchmark/replay comparison
→ run identity alignment check
→ produce protected-core report
→ request approval if required
→ adopt or reject
```

---

# Protected Core Report

Example:

```json
{
  "target": "governance-layer",
  "protectionLevel": 3,
  "changeSummary": "Adjust approval threshold for dependency changes.",
  "sandboxRequired": true,
  "simulationPassed": true,
  "verificationPassed": true,
  "identityAlignment": 0.94,
  "rollbackPlan": "Restore previous governance rule set.",
  "approvalRequired": true
}
```

---

# Integration With Governance

Governance must enforce protection levels before execution.

Example:

```text
Attempt to modify state-machine legality rules
→ protection level 3 detected
→ sandbox required
→ direct patch blocked
```

---

# Integration With State Machine

Protected-core changes may only occur in safe states:

```text
SELF_IMPROVING
TRAINING
WAITING_APPROVAL
SAFE_MODE diagnostics
```

Never during unstable active task execution.

---

# Integration With Dependency Governance

Protected packages should not import experimental modules directly.

Protected core may depend on:

```text
core-types
core-interfaces
core-events
core-state
```

but should avoid depending on optional plugins or domain modules.

---

# Integration With Replay

Replay should compare:

```text
before behavior
vs
after behavior
```

for protected-core changes.

Examples:

```text
- did verification success improve?
- did token cost change?
- did governance blocks change?
- did fatigue signals increase?
- did trust calibration degrade?
```

---

# Core Rule

```text
Innovation should be easy at the edges
and careful at the core.
```
