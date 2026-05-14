# OwnAI Governance Layer

The Governance Layer defines the hard operational rules, permissions, and execution boundaries of OwnAI.

## Core Principle

```text
Autonomy without governance becomes instability.
```

The Governance Layer prevents:

```text
- uncontrolled autonomy
- dangerous self-modification
- token waste
- architecture drift
- unsafe execution
- protected file modification
- endless autonomous loops
```

---

# Main Goals

- Enforce operational rules
- Enforce permissions
- Protect important systems/files
- Limit autonomous behavior
- Validate dangerous actions
- Control self-improvement
- Protect resource budgets
- Support explainable governance

---

# Governance Position In Pipeline

```text
Systems propose
→ Simulation forecasts
→ Voting evaluates
→ Decision Engine selects
→ Governance validates
→ State Layer enforces
→ execution happens
```

Governance exists between:

```text
decision
and
execution
```

---

# Governance Categories

## 1. File Governance

Controls file modification permissions.

Examples:

```text
- protected files
- protected folders
- architecture-critical systems
- user-defined protected paths
```

Example rules:

```text
Never modify:
- package-lock.json
- secrets
- user credentials
- governance rules themselves
without explicit approval.
```

---

## 2. Resource Governance

Controls computational/resource usage.

Examples:

```text
- token budgets
- cloud escalation limits
- thread limits
- memory limits
- GPU scheduling
- model usage policies
```

Example:

```text
Low-resource mode:
- disable deep simulation
- disable expensive cloud routing
- prefer compression
```

---

## 3. Self-Improvement Governance

Controls autonomous self-modification.

Core rule:

```text
OwnAI must never directly self-modify critical systems without sandbox validation.
```

Required flow:

```text
clone sandbox
→ simulate
→ benchmark
→ verify
→ compare metrics
→ governance approval
→ optional adoption
```

---

## 4. Operating Mode Governance

Different operating modes change allowed behavior.

Examples:

```text
Normal Mode
→ conservative autonomy

Debug Mode
→ high observability

Training Gym
→ isolated skill training only

Self-Improvement Mode
→ sandbox required

Minimalist Mode
→ avoid architecture expansion
```

---

## 5. Queue Governance

Controls autonomous queue execution.

Examples:

```text
- max autonomous tasks
- approval checkpoints
- retry limits
- cooldown rules
- queue pause conditions
```

---

## 6. Safety Governance

Protects against dangerous behavior.

Examples:

```text
- hallucination escalation
- unstable retry loops
- destructive commands
- recursive task explosions
- uncontrolled file deletion
```

---

# Governance Decision Example

```json
{
  "action": "modify_core_event_bus",
  "decision": "blocked",
  "reason": "Critical architecture package requires sandbox validation.",
  "requiredActions": [
    "create_sandbox",
    "run_simulation",
    "run_benchmark",
    "request_user_approval"
  ],
  "severity": "high"
}
```

---

# Governance Sources

Governance decisions may use:

```text
- operating mode
- confidence level
- simulation result
- replay history
- token economy
- hallucination risk
- project intent
- user-defined policies
- environment constraints
```

---

# Governance Profiles

Future feature.

Example profiles:

```text
Conservative
Balanced
Experimental
Local-Only
Minimalist
Enterprise
Research
```

Profiles modify:

```text
- approval strictness
- autonomy limits
- token budgets
- retry behavior
- sandbox requirements
```

---

# Observability Integration

Governance decisions must always be visible.

The cognition timeline should record:

```text
- blocked actions
- approval requirements
- governance warnings
- budget violations
- safety escalations
```

---

# Replay Integration

Replay should analyze:

```text
- which governance rules prevented failures
- which governance rules were too restrictive
- where autonomy became unstable
- where governance prevented token waste
```

---

# Core Rule

```text
Governance exists to preserve stable adaptive cognition,
not to remove autonomy entirely.
```
