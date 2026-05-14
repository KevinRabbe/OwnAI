# OwnAI Engineering Intent System

The Engineering Intent System helps OwnAI understand the philosophy behind a project, not only the current task.

Most agents execute instructions. OwnAI should also understand the engineering intent behind those instructions.

## Core Principle

```text
OwnAI should adapt its behavior to the project’s engineering intent.
```

A prototype, a game project, a production backend, and a safety-critical system should not be handled with the same patch style, verification strictness, or token budget.

---

# Main Goals

- Understand project philosophy
- Adapt patch style to project needs
- Adjust verification strictness
- Adjust complexity tolerance
- Adjust token spending
- Adjust model escalation
- Adjust thread usage
- Preserve user/team preferences
- Make engineering decisions more coworker-like

---

# Intent Profiles

OwnAI can classify projects or tasks into intent profiles.

## Prototype Intent

Purpose:
Move fast and explore ideas.

Behavior:

```text
- faster implementation
- lighter verification
- more tolerance for temporary code
- lower documentation requirements
- fewer abstractions unless useful immediately
```

---

## Production Intent

Purpose:
Stable, maintainable implementation.

Behavior:

```text
- stronger verification
- stricter patch quality
- better tests
- lower tolerance for risky changes
- clearer documentation
```

---

## Minimalist Intent

Purpose:
Prefer simple, small, direct solutions.

Behavior:

```text
- minimal diff preferred
- avoid new abstractions
- avoid broad refactors
- reject unnecessary complexity
- prefer existing patterns
```

---

## Architecture Intent

Purpose:
Improve long-term structure.

Behavior:

```text
- allows justified refactors
- permits new abstractions with evidence
- requires documentation of decisions
- stronger patch quality review
- higher verification requirements
```

---

## Safety-Critical Intent

Purpose:
Avoid regressions and unsafe changes.

Behavior:

```text
- strict verification
- approval gates
- more tests
- conservative patches
- stronger rollback requirements
- no risky automation without approval
```

---

## Low-Resource Intent

Purpose:
Optimize for weak hardware or limited budget.

Behavior:

```text
- aggressive compression
- small context packs
- local-first model routing
- avoid unnecessary threads
- strict token economy
```

---

# Intent Sources

OwnAI can infer intent from:

```text
- user preference
- project docs
- package type
- existing code style
- repo history
- patch quality history
- token economy settings
- operating mode
- task wording
```

User preference should override automatic inference.

---

# Intent Configuration

Suggested config:

```text
.ownai/intent.json
```

Example:

```json
{
  "defaultIntent": "minimalist",
  "projectTraits": [
    "local-first",
    "low-resource",
    "attention-efficient"
  ],
  "complexityTolerance": "low",
  "verificationStrictness": "medium",
  "preferredPatchStyle": "minimal-sufficient",
  "allowArchitectureRefactors": false,
  "allowCloudEscalation": false
}
```

---

# Intent-Aware Decisions

## Patch Quality Engine

Uses intent to decide whether complexity is acceptable.

Example:

```text
Minimalist intent:
new abstraction requires strong justification

Architecture intent:
new abstraction can be acceptable if it reduces future cost
```

## Token Economy Engine

Uses intent to decide whether more token spending is justified.

Example:

```text
Prototype intent:
stop when tests pass and quality is acceptable

Production intent:
spend improvement budget for maintainability review
```

## Confidence Engine

Uses intent to decide approval thresholds.

Example:

```text
Safety-critical intent:
require high confidence before autonomous action
```

## Thread Coordinator

Uses intent to decide parallel execution.

Example:

```text
Low-resource intent:
prefer single-thread

Architecture intent:
allow assisted or parallel analysis if useful
```

## Model Router

Uses intent to decide escalation.

Example:

```text
Local-first intent:
avoid cloud unless user explicitly allows

High-quality intent:
escalate to expert model if budget allows and confidence is low
```

---

# Dashboard Integration

The dashboard should show active intent clearly.

Example:

```text
Intent: Minimalist / Local-first
Patch Style: Minimal sufficient
Cloud Escalation: Disabled
Complexity Tolerance: Low
Verification: Medium
```

---

# Memory Integration

OwnAI should store project intent in memory.

Suggested storage:

```text
.ownai/memory/warm/project_intent.json
```

Long-term memory may store intent changes over time.

Example:

```text
2026-05-14:
Project intent changed from Prototype to Minimalist after architecture stabilized.
```

---

# Core Rule

```text
OwnAI should not only ask what to build.
OwnAI should understand how this project wants to be built.
```
