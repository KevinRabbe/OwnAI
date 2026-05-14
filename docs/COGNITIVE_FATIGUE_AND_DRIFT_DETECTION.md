# OwnAI Cognitive Fatigue & Drift Detection

The Cognitive Fatigue & Drift Detection system monitors cognition quality over time and stabilizes OwnAI before autonomous execution degrades.

## Core Principle

```text
Cognition quality can degrade gradually, not only fail instantly.
```

OwnAI should detect when reasoning quality, focus quality, replay consistency, or execution stability begins to drift.

The system should then stabilize cognition before damage, hallucination cascades, or endless retry loops occur.

---

# Main Goals

- Detect cognition degradation early
- Detect hallucination escalation
- Detect unstable autonomous loops
- Detect context drift
- Detect token inefficiency growth
- Detect replay inconsistency
- Prevent long-session degradation
- Stabilize cognition adaptively
- Trigger recovery before collapse

---

# Position In Architecture

```text
Events
→ Observability
→ Fatigue & Drift Detection
→ Simulation
→ Voting
→ Governance
→ State Machine transition
→ stabilization/recovery action
```

---

# Difference Between Failure And Drift

## Failure

Immediate obvious issue.

Examples:

```text
- tests failed
- patch invalid
- command crashed
```

---

## Drift

Gradual cognition degradation.

Examples:

```text
- patch quality slowly worsening
- retries increasing
- hallucination probability increasing
- replay becoming inconsistent
- token usage increasing without better results
- conflicting votes becoming more frequent
```

Drift is dangerous because it can continue unnoticed.

---

# Drift Signals

## 1. Hallucination Drift

Signals:

```text
- unsupported claims increasing
- invalid file references
- fake symbols/functions
- unverifiable assumptions
- verifier contradiction frequency rising
```

Possible actions:

```text
- narrow focus
- refresh memory
- lower autonomy
- switch model
- require approval
```

---

## 2. Context Drift

Signals:

```text
- stale assumptions
- outdated memory references
- repo changed significantly
- heatmap mismatch
- replay mismatch
```

Possible actions:

```text
- recompress context
- refresh scanner
- rebuild memory map
- reset hot memory
```

---

## 3. Token Efficiency Drift

Signals:

```text
- token usage rising
- compression effectiveness falling
- context expansion growing repeatedly
- simulation cost increasing without quality gain
```

Possible actions:

```text
- enforce compression
- reduce simulation depth
- reduce thread count
- switch smaller model
```

---

## 4. Decision Drift

Signals:

```text
- conflicting high-confidence votes
- unstable decision reversals
- repeated governance blocks
- repeated recovery cycles
```

Possible actions:

```text
- request approval
- increase simulation depth
- reduce autonomy level
- enter RECOVERING state
```

---

## 5. Replay Drift

Signals:

```text
- replay lessons contradict each other
- historical strategies lose effectiveness
- replay confidence drops
- benchmark consistency falls
```

Possible actions:

```text
- recalibrate replay weighting
- retrain skill benchmark
- rebuild replay summaries
```

---

## 6. Complexity Drift

Signals:

```text
- patches become larger over time
- architecture expands unnecessarily
- file touches increase repeatedly
- patch quality warnings increase
```

Possible actions:

```text
- enforce minimalist mode
- simplify patch strategy
- narrow focus
- increase patch quality authority
```

---

# Fatigue Levels

## Stable

```text
Low drift signals.
```

---

## Mild Fatigue

```text
Small quality degradation.
```

Actions:

```text
- compress context
- reduce scope
- lower thread count
```

---

## Moderate Fatigue

```text
Multiple drift signals active.
```

Actions:

```text
- pause autonomous queue
- switch model
- refresh memory
- increase verification
```

---

## Severe Fatigue

```text
High instability risk.
```

Actions:

```text
- enter RECOVERING
- require approval
- disable self-improvement
- reduce autonomy sharply
```

---

## Critical Drift

```text
Unsafe cognition state.
```

Actions:

```text
- enter SAFE_MODE
- stop autonomous execution
- preserve diagnostics
- generate recovery report
```

---

# Drift Detection Inputs

The system consumes signals from:

```text
- Replay Engine
- Verification Layer
- Token Economy Engine
- Patch Quality Engine
- Observability Layer
- Focus Lens Engine
- Simulation Layer
- Governance Layer
- State Machine
- Confidence Engine
- Hallucination Guard
- Knowledge Graph Engine
```

---

# Example Drift Report

```json
{
  "fatigueLevel": "moderate",
  "hallucinationRisk": 0.42,
  "tokenEfficiencyTrend": "declining",
  "decisionInstability": 0.37,
  "repeatedRecoveryCycles": 3,
  "recommendedAction": "compress_context_and_reduce_parallelism",
  "requiresApproval": false,
  "reason": "Token usage and conflicting votes increased significantly during long session."
}
```

---

# Replay Integration

Replay should analyze:

```text
- which fatigue signals predicted failure best
- which stabilization actions worked best
- how long stable cognition sessions last
- which models drift faster
- which operating modes remain most stable
```

---

# State Machine Integration

Drift may trigger transitions:

```text
FOCUSED → COMPRESSING
VERIFYING → RECOVERING
SELF_IMPROVING → WAITING_APPROVAL
ANY_STATE → SAFE_MODE
```

---

# Dashboard Integration

The UI should visualize:

```text
- fatigue level
- hallucination trend
- token efficiency trend
- confidence stability
- replay consistency
- drift trajectory
- stabilization actions
```

---

# Core Rule

```text
OwnAI should stabilize cognition before degradation becomes failure.
```
