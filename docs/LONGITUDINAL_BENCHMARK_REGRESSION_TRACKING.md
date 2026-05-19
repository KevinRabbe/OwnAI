# OwnAI Longitudinal Benchmark Regression Tracking

OwnAI should not only benchmark a new version once.

A version can look better in a short benchmark, but become worse after days or weeks of real usage due to hidden token growth, retry growth, context bloat, noisy reusable capabilities, or degraded routing behavior.

## Core Principle

```text
A version is not proven better until it stays better over time.
```

---

# Why This Matters

A new OwnAI version may initially show:

```text
- better task success
- faster completion
- cleaner outputs
- more reusable skills
```

but after real use it may reveal:

```text
- more tokens consumed
- more model calls
- more retries
- larger context packs
- more false positives
- more validation failures
- more operator interruptions
- more stale memory buildup
```

This means OwnAI needs both:

```text
short benchmark
+
longitudinal benchmark
```

---

# Main Goals

- Detect hidden regressions after real-world use
- Compare system versions over time
- Catch token creep
- Catch context bloat
- Catch noisy skill reuse
- Catch trust/routing drift
- Catch validation retry growth
- Prove infrastructure improvements with evidence
- Avoid accepting upgrades that only look good initially

---

# Benchmark Time Windows

OwnAI should compare versions across multiple windows:

```text
immediate
24 hours
3 days
7 days
30 days
```

Example:

```text
Version v0.3 looked better on day 1.
By day 7 it used 28% more tokens per task.
Result: regression detected.
```

---

# Metrics To Track

## Efficiency Metrics

```text
- tokens per task
- model calls per task
- average context pack size
- context compression ratio
- model calls avoided
- reusable capabilities used
- estimated tokens saved
```

---

## Quality Metrics

```text
- task completion rate
- validation pass rate
- first-pass success rate
- retries per task
- failed tasks
- blocked tasks
- operator corrections
```

---

## Safety Metrics

```text
- security findings
- false positives
- false negatives if known
- governance blocks
- dead-letter entries
- circuit breaker trips
```

---

## Stability Metrics

```text
- interrupted tasks resumed successfully
- corrupted task states
- stale tasks detected
- observability gaps
- replay lookup failures
```

---

## Reuse Metrics

```text
- reusable capability count
- reusable capability use rate
- successful reuse rate
- failed reuse rate
- estimated tokens saved by reuse
- obsolete capability count
```

---

# Version Comparison Record

Example:

```json
{
  "comparisonId": "compare_v0_2_to_v0_3_week1",
  "baselineVersion": "0.2.0",
  "candidateVersion": "0.3.0",
  "window": "7_days",
  "sameModel": true,
  "model": "local-8b-q4",
  "tasksCompared": 42,
  "result": "mixed",
  "summary": {
    "taskSuccessRateDelta": "+8%",
    "tokensPerTaskDelta": "+22%",
    "modelCallsPerTaskDelta": "-14%",
    "retryRateDelta": "+5%",
    "validationPassRateDelta": "+3%"
  },
  "decision": "hold_candidate",
  "reason": "Quality improved but token usage regressed significantly after one week."
}
```

---

# Regression Types

## Token Creep

```text
A version slowly uses more tokens per task even if outputs look better.
```

Possible causes:

```text
- larger task packets
- larger context packs
- too much replay included
- verbose observability injected into model context
- repeated unnecessary explanations
```

---

## Context Bloat

```text
Context packs grow over time without improving task success.
```

---

## Reuse Noise

```text
Reusable capabilities are called often but do not improve outcomes.
```

High reuse is not automatically good.

---

## Trust Drift

```text
Trust scores move in a direction that does not match real outcomes.
```

Example:

```text
A skill gains trust due to many uses but quietly causes more validation retries.
```

---

## Validation Drag

```text
Validation becomes more complete but too slow or too expensive for the task type.
```

This may still be acceptable for high-risk tasks but not low-risk tasks.

---

# Acceptance Policy For Upgrades

A new system version should only be promoted when it improves at least one important metric without unacceptable regression in others.

Evaluation axes:

```text
quality
cost
risk
security
speed
wasted context
system intelligence
operator friction
```

A version may be rejected even if it improves quality when:

```text
- token usage increases too much
- retry rate increases
- context bloat grows
- security false positives become noisy
- operator interruptions increase
```

---

# Same-Model Benchmarking

One of OwnAI's strongest benchmark types is:

```text
same model
same task family
new infrastructure version
```

This proves whether OwnAI improved because of infrastructure, not because of a bigger model.

Example:

```text
local 8B model unchanged
OwnAI v0.2 → v0.3
weekly token usage down 31%
validation success up 12%
```

---

# Replay Integration

Replay should store benchmark evidence:

```text
- version used
- model used
- task type
- context size
- validation results
- token estimates
- reusable capabilities used
- final outcome
```

This allows future benchmark windows to be computed from real workflow history.

---

# Observability Integration

The observability layer should eventually show:

```text
Version Health Over Time
Token Trend
Retry Trend
Context Size Trend
Reuse Value Trend
Trust Drift
Regression Warnings
```

---

# Core Rule

```text
Do not trust a benchmark spike.
Trust sustained operational improvement.
```
