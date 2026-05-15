# OwnAI Adaptive Trust & Truth Calibration

The Adaptive Trust & Truth Calibration system tracks how much OwnAI should trust models, memories, replay lessons, simulations, predictions, skills, systems, and strategies over time.

## Core Principle

```text
Stored memory is not automatically verified truth.
```

OwnAI should distinguish facts, observations, predictions, assumptions, hypotheses, deprecated knowledge, conflicting knowledge, and untrusted outputs.

---

# Main Goals

- Prevent stale intelligence
- Prevent replay bias
- Prevent hallucination accumulation
- Prevent overtrusting unreliable systems
- Improve decision voting quality
- Improve model routing
- Improve long-term memory reliability
- Support self-calibrating cognition
- Support trust-aware autonomy

---

# Trust Targets

OwnAI may assign trust scores to:

```text
- models
- skills
- replay lessons
- memory nodes
- simulations
- predictions
- strategies
- systems
- sources
- files/modules
- compressed summaries
```

---

# Knowledge Status Levels

## Verified

Confirmed by tests, files, Git history, benchmarks, or direct evidence.

## Observed

Seen in execution, but not fully proven.

## Inferred

Derived from multiple signals.

## Predicted

Forecasted by Simulation or Prediction systems.

## Hypothesized

Possible explanation or strategy, not yet tested.

## Conflicted

Contradictory evidence exists.

## Deprecated

Used to be useful, but newer evidence reduced reliability.

## Untrusted

Low evidence, high contradiction, hallucination risk, or repeated failure.

---

# Trust Score

Suggested range:

```text
0.0 = do not trust
1.0 = highly trusted
```

Trust should be dynamic.

It should change based on:

```text
- verification success
- patch quality outcomes
- simulation accuracy
- replay usefulness
- hallucination rate
- governance conflicts
- token efficiency
- recovery frequency
- contradiction detection
- benchmark results
```

---

# Situational Trust

Trust is not universal.

Example:

```text
Model A:
Trust high for TypeScript patches.
Trust low for architecture planning.

Replay Strategy B:
Trust high in low-resource mode.
Trust low during parallel thread execution.
```

OwnAI should eventually learn:

```text
which tools are trustworthy under which conditions.
```

---

# Trust Decay

Trust should decay when knowledge becomes old, contradicted, or untested.

Examples:

```text
Old replay strategy not used for months
→ slight decay

Recent failures contradict old success
→ stronger decay

Architecture changed significantly
→ context-specific trust reduction
```

---

# Trust Reinforcement

Trust increases when:

```text
- repeated verification succeeds
- predictions match outcomes
- replay lessons improve results
- model outputs remain stable
- skill benchmarks improve
- strategy reduces cost/risk
```

---

# Vote Weighting

Decision Voting should weight votes by trust.

Example:

```text
Patch Quality vote confidence: 0.82
Patch Quality trust: 0.93
Effective influence: high

Replay vote confidence: 0.88
Replay trust: 0.41
Effective influence: reduced
```

---

# Model Routing Integration

Model Router should use trust scores.

Examples:

```text
Model frequently hallucinates paths
→ avoid for repo navigation

Model produces strong compressed summaries
→ prefer for compression skill

Model fails structured JSON output
→ avoid for tool-call planning
```

---

# Memory Integration

Memory records should include:

```text
- trust score
- evidence source
- knowledge status
- last verified date
- contradiction count
- related replay reports
```

Example:

```json
{
  "memoryId": "lesson_123",
  "status": "observed",
  "trust": 0.76,
  "lastVerified": "2026-05-14T00:00:00Z",
  "evidence": ["replay_report_88", "verification_pass_22"],
  "contradictions": []
}
```

---

# Replay Integration

Replay should update trust based on actual outcomes.

Examples:

```text
Prediction matched result
→ simulation trust increases

Replay strategy caused wasted context
→ strategy trust decreases

Old lesson failed in new context
→ mark context-specific limitation
```

---

# Hallucination Guard Integration

Unsupported claims should be marked as:

```text
hypothesized
or
untrusted
```

until evidence is found.

---

# Dashboard Integration

The UI can show:

```text
- trust indicators
- model reliability
- memory stability
- replay lesson confidence
- contradiction alerts
- trust decay curves
- knowledge status labels
```

Example:

```text
Replay Strategy: Narrow Focus Recovery
Trust: 91%
Status: Verified
Last Reinforced: 2 days ago
Known Limitation: weak on multi-thread tasks
```

---

# Core Rule

```text
OwnAI should not only remember knowledge.
OwnAI should remember how much that knowledge deserves trust.
```
