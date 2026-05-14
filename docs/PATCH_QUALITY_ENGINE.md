# OwnAI Patch Quality Engine

The Patch Quality Engine evaluates whether a change is not only correct, but also appropriate, maintainable, minimal, and worth the complexity it introduces.

## Core Principle

```text
Minimal sufficient patch first.
Complexity only with evidence.
```

Tests passing is necessary, but not always sufficient.

OwnAI should avoid producing patches that are technically correct but unnecessarily large, overengineered, or hard to maintain.

---

# Main Goals

- Score patch quality after verification
- Detect overcomplex solutions
- Prefer minimal diffs when possible
- Identify unrelated changes
- Evaluate maintainability
- Decide whether to accept, simplify, or warn
- Document why complexity was added
- Feed quality data into Replay, Token Economy, and Learning systems

---

# Quality Dimensions

## 1. Correctness

Questions:

```text
Do tests pass?
Does the patch solve the actual task?
Did it fix root cause instead of only symptoms?
```

Sources:
- Verification Layer
- test results
- build results
- manual task alignment checks

---

## 2. Minimalism

Questions:

```text
Did the patch change the fewest reasonable files?
Could this have been solved with fewer lines?
Was a new abstraction necessary?
Did it avoid unrelated formatting/refactors?
```

---

## 3. Complexity

Questions:

```text
Did the patch add unnecessary layers?
Did it make the code harder to understand?
Did it add generic systems for a specific bug?
Did it introduce future maintenance cost?
```

---

## 4. Maintainability

Questions:

```text
Does the solution follow existing project patterns?
Is the code readable?
Is naming clear?
Is duplicated logic reduced or increased?
Will a future developer understand this patch quickly?
```

---

## 5. Test Quality

Questions:

```text
Were meaningful tests added or updated?
Do tests cover the bug/feature directly?
Are tests too brittle?
Are tests only testing implementation details?
```

---

## 6. Safety

Questions:

```text
Does the patch touch high-blast-radius files?
Does it modify config, secrets, migrations, or build systems?
Is rollback simple?
Does it require user approval?
```

---

# Patch Quality Scores

Suggested score fields:

```json
{
  "correctnessScore": 0.92,
  "minimalismScore": 0.78,
  "complexityScore": 0.24,
  "maintainabilityScore": 0.81,
  "testQualityScore": 0.74,
  "safetyScore": 0.88,
  "overallQualityScore": 0.81
}
```

Complexity score works differently:

```text
0.0 = very simple
1.0 = very complex
```

High complexity is not automatically bad, but it must be justified.

---

# Overcomplexity Detection

Signals:

```text
- too many files changed
- too many lines changed
- new abstraction added for one use case
- unrelated refactors
- unrelated formatting changes
- new helper class/service without clear need
- solution harder to explain than the bug
- replay finds a smaller successful path
- tests pass but patch feels heavy
```

---

# Decision Logic

```text
If tests fail:
    reject and return to debug loop

If tests pass and quality is high:
    accept patch

If tests pass but patch is overcomplex and budget remains:
    run simplification pass

If tests pass but patch is overcomplex and budget is exhausted:
    warn and document concerns

If patch touches dangerous areas:
    require approval before commit/PR
```

---

# Complexity Justification

When OwnAI adds complexity, it must explain why.

Valid reasons:

```text
- reduces future bugs
- enables testing
- removes duplication
- isolates risky logic
- improves architecture
- lowers long-term maintenance cost
- required by framework constraints
```

Invalid reasons:

```text
- generic future-proofing without need
- model overthinking
- style preference only
- unrelated cleanup
- abstraction for a single trivial case
```

---

# Patch Quality Report

Suggested storage:

```text
.ownai/learning/patch_quality_report.json
```

Example:

```json
{
  "task": "Fix stamina regeneration after dodge",
  "verificationStatus": "passed",
  "changedFiles": [
    "src/player/StaminaSystem.cs",
    "tests/player/StaminaSystemTests.cs"
  ],
  "scores": {
    "correctnessScore": 0.96,
    "minimalismScore": 0.88,
    "complexityScore": 0.18,
    "maintainabilityScore": 0.84,
    "testQualityScore": 0.8,
    "safetyScore": 0.91,
    "overallQualityScore": 0.87
  },
  "decision": "accept",
  "reasons": [
    "Tests pass.",
    "Patch changes only directly related files.",
    "No unnecessary abstraction added."
  ]
}
```

---

# Integration With Other Systems

## Verification Layer

Provides correctness signals.

## Token Economy Engine

Decides whether quality improvement is worth remaining budget.

## Context Replay Engine

Identifies whether a smaller successful path was possible.

## Git Engine

Stores patch reports with patch records.

## Skill Engine

Uses patch quality to improve future coding skills.

## Dashboard UI

Shows:

```text
Correctness
Minimalism
Complexity
Maintainability
Test Quality
Safety
Decision
```

---

# Core Rule

```text
If less complexity solves the same task safely, prefer less complexity.
```
