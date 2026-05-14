# OwnAI Token Economy Engine

The Token Economy Engine controls token usage, model cost, and quality improvement decisions.

OwnAI should not only ask whether a task passed. It should ask whether the solution is good enough for the cost, risk, and available budget.

## Core Principle

```text
Every task has a budget.
Every improvement must justify its cost.
```

The goal is not always to spend the fewest tokens possible. The goal is to spend tokens where they improve quality, safety, maintainability, or future efficiency.

---

# Main Goals

- Track token usage per task
- Estimate model cost before execution
- Compare planned vs actual token usage
- Decide when to improve a passing solution
- Detect overcomplex solutions
- Document why extra tokens were spent
- Feed cost data into Context Replay and Attention Optimization
- Support local, hybrid, and cloud model modes

---

# Token Budget Lifecycle

```text
Task received
→ estimate token budget
→ choose model mode
→ execute task
→ verify result
→ evaluate output quality
→ decide stop or improve
→ record token report
→ update replay/learning data
```

---

# Budget Types

## Hard Budget

Absolute maximum token/cost limit.

```text
Never exceed this unless user approves.
```

## Soft Budget

Preferred spending target.

```text
Try to stay under this, but allow quality improvements if justified.
```

## Improvement Budget

Reserved budget after tests pass.

Used for:
- simplification
- cleanup
- documentation
- refactor review
- maintainability improvement
- patch quality review

---

# Output Quality Gate

A patch can pass tests but still be low quality.

OwnAI should evaluate:

```text
- Is the diff minimal?
- Is the solution overcomplex?
- Did it touch unrelated files?
- Does it match project style?
- Are tests meaningful?
- Did it add unnecessary abstraction?
- Is the fix maintainable?
- Does replay suggest wasted context?
```

If tests pass but quality is weak, OwnAI may spend remaining improvement budget.

---

# Stop vs Improve Decision

```text
If tests pass AND quality score is high:
    stop

If tests pass BUT quality score is low AND budget remains:
    improve patch

If tests pass BUT improvement would exceed budget:
    stop and document quality concerns

If tests fail:
    continue debug loop if budget remains
```

---

# Overcomplexity Detection

OwnAI should detect when it did too much.

Signals:

```text
- too many files changed
- new abstractions added unnecessarily
- large diff for small bug
- unrelated formatting changes
- duplicated logic
- tests pass but solution is hard to explain
- replay finds a smaller path
```

When detected, OwnAI should document:

```text
why it became complex
whether simplification is possible
whether simplification is worth the token cost
```

---

# Token Economy Report

Suggested storage:

```text
.ownai/learning/token_economy_report.json
```

Example:

```json
{
  "task": "Fix stamina regeneration after dodge",
  "mode": "hybrid",
  "budget": {
    "softTokens": 20000,
    "hardTokens": 40000,
    "improvementTokens": 6000
  },
  "usage": {
    "scoutTokens": 3500,
    "engineerTokens": 14000,
    "verificationTokens": 0,
    "replayTokens": 1200,
    "totalTokens": 18700
  },
  "quality": {
    "testsPassed": true,
    "qualityScore": 0.72,
    "overcomplexityScore": 0.31,
    "decision": "stop"
  },
  "notes": [
    "Tests passed within soft budget.",
    "Patch quality acceptable.",
    "No improvement pass required."
  ]
}
```

---

# Improvement Pass

If budget remains and quality is not good enough, OwnAI can run an improvement pass.

Examples:

```text
- simplify patch
- reduce changed files
- add missing test edge case
- improve naming
- update documentation
- remove unnecessary abstraction
- generate clearer commit message
```

The improvement pass must be verified again.

```text
passing patch
→ quality review
→ improvement pass if justified
→ verification again
→ final patch report
```

---

# Integration With Other Systems

## Context Replay Engine

Replay identifies wasted context and suggests smaller future paths.

## Attention Optimizer

Uses token reports to improve future attention allocation.

## Model Router

Uses budget to choose:
- tiny local model
- main local model
- cloud model
- hybrid mode

## Skill Engine

Skills can declare expected token budgets.

## Thread Coordinator

Threads must justify extra cost before execution.

## Dashboard UI

Shows:

```text
Estimated Cost
Current Token Usage
Budget Remaining
Improvement Budget
Quality Score
Stop/Improve Decision
```

---

# Core Rule

```text
Passing tests is necessary, but not always sufficient.
If budget remains, OwnAI may improve quality — but it must document why.
```
