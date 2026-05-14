# OwnAI State Machine Architecture

The State Machine Architecture controls global execution state and prevents autonomous cognition from becoming chaotic.

## Core Principle

```text
Events request transitions.
Governance validates transitions.
The State Machine controls execution legality.
```

OwnAI should not allow systems to freely jump between behaviors. State transitions must be explicit, observable, validated, and replayable.

---

# Main Goals

- Coordinate global execution state
- Prevent unstable autonomous loops
- Prevent systems from overtaking execution
- Enforce operating mode limits
- Support recovery states
- Support long-running sessions
- Support self-improvement safety
- Support queue execution
- Make UI state meaningful

---

# Position In Architecture

```text
Event Bus
→ Decision Voting
→ Decision Engine
→ Governance Layer
→ State Machine
→ Execution
```

The State Machine is the final control layer before execution.

---

# Core States

## IDLE

OwnAI is not actively executing a task.

Allowed transitions:

```text
IDLE → QUEUED
IDLE → TRAINING
IDLE → MEMORY_RECALL
```

---

## QUEUED

One or more tasks are waiting.

Allowed transitions:

```text
QUEUED → SCANNING
QUEUED → WAITING_APPROVAL
QUEUED → IDLE
```

---

## SCANNING

Repo Scanner is active.

Allowed transitions:

```text
SCANNING → ANALYZING
SCANNING → RECOVERING
```

---

## ANALYZING

Memory, Heatmap, Telescope, and Focus Lens are building understanding.

Allowed transitions:

```text
ANALYZING → FOCUSED
ANALYZING → COMPRESSING
ANALYZING → WAITING_APPROVAL
ANALYZING → RECOVERING
```

---

## FOCUSED

Microscope-level inspection is active.

Allowed transitions:

```text
FOCUSED → SIMULATING
FOCUSED → PATCHING
FOCUSED → VERIFYING
FOCUSED → COMPRESSING
```

---

## SIMULATING

Simulation Layer forecasts action outcomes.

Allowed transitions:

```text
SIMULATING → PATCHING
SIMULATING → VERIFYING
SIMULATING → WAITING_APPROVAL
SIMULATING → RECOVERING
```

---

## PATCHING

OwnAI is generating or applying a patch.

Allowed transitions:

```text
PATCHING → VERIFYING
PATCHING → RECOVERING
PATCHING → WAITING_APPROVAL
```

---

## VERIFYING

Verification Layer is checking correctness.

Allowed transitions:

```text
VERIFYING → REPLAYING
VERIFYING → PATCHING
VERIFYING → RECOVERING
VERIFYING → WAITING_APPROVAL
```

---

## REPLAYING

Context Replay and learning systems analyze the completed action.

Allowed transitions:

```text
REPLAYING → DOCUMENTING
REPLAYING → QUEUED
REPLAYING → IDLE
```

---

## DOCUMENTING

Documentation and Retention Engine stores meaningful artifacts and cleans temporary files.

Allowed transitions:

```text
DOCUMENTING → QUEUED
DOCUMENTING → IDLE
```

---

## COMPRESSING

Context Compression Cycle is active.

Allowed transitions:

```text
COMPRESSING → ANALYZING
COMPRESSING → FOCUSED
COMPRESSING → QUEUED
COMPRESSING → IDLE
```

---

## TRAINING

Training Gym is active.

Allowed transitions:

```text
TRAINING → DOCUMENTING
TRAINING → IDLE
TRAINING → WAITING_APPROVAL
```

Rules:

```text
Training must not modify production code directly.
```

---

## SELF_IMPROVING

OwnAI is improving one of its own modules.

Allowed transitions:

```text
SELF_IMPROVING → SIMULATING
SELF_IMPROVING → VERIFYING
SELF_IMPROVING → WAITING_APPROVAL
SELF_IMPROVING → RECOVERING
```

Rules:

```text
- sandbox required
- one module target at a time
- tests required
- approval required before merge
```

---

## WAITING_APPROVAL

OwnAI is paused until user approval.

Allowed transitions:

```text
WAITING_APPROVAL → PATCHING
WAITING_APPROVAL → VERIFYING
WAITING_APPROVAL → QUEUED
WAITING_APPROVAL → IDLE
WAITING_APPROVAL → RECOVERING
```

---

## RECOVERING

OwnAI is recovering from failure, unstable state, hallucination risk, or corrupted task flow.

Allowed transitions:

```text
RECOVERING → COMPRESSING
RECOVERING → VERIFYING
RECOVERING → WAITING_APPROVAL
RECOVERING → SAFE_MODE
RECOVERING → IDLE
```

---

## SAFE_MODE

OwnAI enters restricted mode after severe instability.

Allowed transitions:

```text
SAFE_MODE → WAITING_APPROVAL
SAFE_MODE → IDLE
```

Rules:

```text
- no autonomous patching
- no self-improvement
- no cloud escalation unless approved
- diagnostics only
```

---

# Transition Request Shape

```json
{
  "from": "FOCUSED",
  "to": "SIMULATING",
  "source": "decision-engine",
  "reason": "Patch risk requires simulation before execution.",
  "confidence": 0.82,
  "requiresApproval": false
}
```

---

# Transition Validation

Every transition should be checked against:

```text
- current state
- operating mode
- governance profile
- task queue status
- confidence level
- simulation result
- token budget
- environment state
- approval requirements
```

---

# Recovery Triggers

OwnAI should enter RECOVERING when:

```text
- repeated verification failures
- hallucination risk escalates
- conflicting high-confidence votes
- context drift detected
- token budget exceeded
- queue state becomes inconsistent
- patch application fails
- unsafe file operation attempted
```

---

# Safe Mode Triggers

OwnAI should enter SAFE_MODE when:

```text
- governance violation
- repeated recovery failure
- unauthorized self-modification attempt
- destructive command attempt
- corrupted long-term state
- severe hallucination warning
```

---

# Observability Integration

Every state transition must produce an event.

Example timeline:

```text
00:00 IDLE → QUEUED
00:01 QUEUED → SCANNING
00:04 SCANNING → ANALYZING
00:07 ANALYZING → FOCUSED
00:09 FOCUSED → SIMULATING
00:12 SIMULATING → PATCHING
00:18 PATCHING → VERIFYING
00:24 VERIFYING → REPLAYING
00:28 REPLAYING → DOCUMENTING
00:30 DOCUMENTING → QUEUED
```

---

# Dashboard Integration

The UI should show:

```text
Current State
Previous State
Next Likely States
Transition Reason
Governance Status
Confidence
Active System
Recovery Risk
```

Example:

```text
Current State: FOCUSED
Likely Next: SIMULATING
Governance: approved
Confidence: 0.82
Reason: patch risk requires forecast
```

---

# Replay Integration

Replay should analyze:

```text
- which state paths succeed
- which transitions waste tokens
- where recovery happens repeatedly
- which modes cause instability
- where compression should happen earlier
```

---

# Core Rule

```text
OwnAI should never execute important actions outside an allowed state transition.
```
