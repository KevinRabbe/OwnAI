# OwnAI Skill Factory & Adaptive Skill Lifecycle

OwnAI should not ship with a huge static skill library.

OwnAI should start with a small core and create skills automatically when repeated or useful workflows appear.

## Core Principle

```text
Small core.
Self-growing skill layer.
No bloated default install.
```

Skills should emerge from useful workflows, replay evidence, benchmarks, and trust calibration.

---

# Main Goals

- Avoid shipping 50+ static skills
- Automatically create draft skills when useful workflows appear
- Keep skills lightweight and evidence-based
- Promote skills only when verified
- Let skills evolve through replay and Training Gym
- Support domain expansion without core bloat
- Preserve local-first efficiency

---

# What A Skill Is

A skill is not just a prompt.

A skill is:

```text
an adaptive cognition recipe
```

A skill may include:

```text
- goal type
- context strategy
- model routing preferences
- simulation strategy
- verification strategy
- recovery strategy
- replay lessons
- trust score
- benchmark history
- resource profile
- operating constraints
```

---

# Skill Creation Flow

```text
new task
→ search existing skills
→ no strong match found
→ create temporary workflow
→ execute safely
→ observe outcome
→ if useful, save as draft skill
→ benchmark in Training Gym
→ promote only if verified/trusted
```

---

# Skill Lifecycle

## 1. Temporary Workflow

Created automatically during task execution.

Purpose:

```text
solve current task without polluting skill registry
```

---

## 2. Draft Skill

Created when a temporary workflow appears reusable.

Rules:

```text
- untrusted by default
- not used autonomously for risky tasks
- requires replay/benchmark data
```

---

## 3. Tested Skill

Skill has passed basic verification/benchmarking.

Rules:

```text
- may be suggested
- may be used in low-risk contexts
- trust score still limited
```

---

## 4. Trusted Skill

Skill has demonstrated reliability over time.

Rules:

```text
- can be used autonomously within governance limits
- contributes stronger votes
- may be used in task queue execution
```

---

## 5. Evolved Skill

Skill has improved through replay, benchmarks, or Training Gym.

Rules:

```text
- previous version backed up
- benchmark comparison required
- rollback available
```

---

# Auto-Creation Conditions

OwnAI may create a draft skill when:

```text
- workflow succeeds
- replay finds reusable pattern
- task type repeats
- user repeats similar requests
- benchmark suggests reusable strategy
- workflow reduces cost/risk/context waste
```

OwnAI should not create a skill when:

```text
- workflow failed without useful lesson
- task was one-off and low-value
- workflow was unsafe
- workflow depended on accidental context
- replay confidence is low
```

---

# Skill Promotion Requirements

Before promotion:

```text
- benchmark result required
- trust score required
- replay lesson required
- recovery plan required
- resource profile required
```

Risky skills require:

```text
- sandbox validation
- governance approval
- backup of prior version
```

---

# Example Skill

```json
{
  "id": "fix_bug_with_tests",
  "version": "1.2.0",
  "status": "trusted",
  "goalType": "bug_fix",
  "preferredModelRole": "worker",
  "contextStrategy": "narrow_focus_first",
  "verificationStrategy": "run_targeted_tests_then_typecheck",
  "recoveryStrategy": "rollback_then_replay_search",
  "trust": 0.88,
  "resourceProfile": {
    "vramMode": "10gb-compatible",
    "tokenBudget": "medium"
  },
  "knownWeaknesses": [
    "large multi-package refactors",
    "unclear failing test output"
  ]
}
```

---

# Training Gym Integration

Training Gym improves skills by:

```text
- replaying old tasks
- comparing strategies
- benchmarking models
- measuring token cost
- measuring verification success
- testing recovery paths
```

---

# Trust Integration

Skills gain or lose trust based on:

```text
- verification success
- replay usefulness
- benchmark performance
- hallucination rate
- recovery success
- token efficiency
- patch quality
```

---

# Governance Integration

Governance may block skills when:

```text
- skill is untrusted
- skill tries protected-core changes
- skill requires external dependency
- skill bypasses observability
- skill lacks rollback path
```

---

# Dashboard Integration

The UI should show:

```text
Skill status
Trust score
Version
Benchmark history
Known strengths
Known weaknesses
Recovery availability
Training Gym results
```

---

# Core Rule

```text
OwnAI should create skills from proven workflows,
not collect unused skills for appearance.
```
