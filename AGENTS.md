# OwnAI Agent Operating Guide

This file tells AI agents, coding assistants, and automation tools how to work inside this repository.

## Core Rule

```text
Start from the registry, not from the whole repository.
```

Before planning or editing, inspect:

```text
docs/DOCUMENT_REGISTRY.md
```

Use active roadmap and architecture documents as source of truth.
Treat reference documents as inspiration only.
Do not implement parked ideas unless an active roadmap or issue requires them.

---

# Current Active Execution Focus

```text
Roadmap 01 — Minimal Cognition Kernel
```

Primary roadmap document:

```text
docs/ROADMAP_01_MINIMAL_COGNITION_KERNEL.md
```

Primary issue track:

```text
#1  Core Contracts
#2  Event Bus v0
#3  Durable Task State v0
#4  Task Packet Generator v0
#5  Context Pack v0
#6  Validation Gates v0
#7  Replay Store v0
#8  Trust Registry v0
#9  Observability Timeline v0
#10 First Vertical Slice
```

Support issues:

```text
#11 Heartbeat v0
#12 Circuit Breaker v0
#13 Dead-Letter Queue v0
```

---

# What To Read First

For implementation work, read in this order:

```text
1. docs/DOCUMENT_REGISTRY.md
2. docs/ROADMAP_01_MINIMAL_COGNITION_KERNEL.md
3. the GitHub issue for the active phase
4. only the active docs relevant to that issue
```

Do not load every document by default.

---

# Active Source-Of-Truth Documents

Use these when relevant:

```text
docs/TASK_PACKET_GENERATOR.md
docs/CONTEXT_PROTOCOL.md
docs/CRASH_DISCONNECT_AND_RESUME_PROTOCOL.md
docs/RUNTIME_HEARTBEAT_AND_HEALTH_PULSE.md
docs/MODEL_COGNITIVE_LOAD_REDUCTION.md
docs/REUSABLE_CAPABILITY_METRICS.md
docs/LONGITUDINAL_BENCHMARK_REGRESSION_TRACKING.md
docs/DOCUMENT_LIFECYCLE_AND_ARCHIVING.md
```

Security-related source material:

```text
docs/CODE_QUALITY_AND_SECURITY_GUARDRAILS.md
docs/AI_CODE_SECURITY_RISK_MITIGATION.md
docs/SECURITY_VALIDATION_LAYER.md
docs/SECURITY_EVIDENCE_AND_LEARNING_LOOP.md
```

Reference/inspiration docs should not override active roadmap scope.

---

# Scope Rules

Do not start these unless explicitly requested by an active issue:

```text
- Roadmap 02 model routing
- advanced UI / holographic UI
- multi-agent swarms
- deep self-improvement
- federated cognition
- advanced KV-cache optimization
- speculative futures
- biological routing algorithms
```

Park ideas in:

```text
docs/ROADMAP_IDEA_PARKING_LOT.md
```

---

# Development Principles

## Build Narrowly

```text
Brainstorm broadly.
Build narrowly.
```

## Preserve Kernel Focus

Roadmap 01 must prove:

```text
intent → task packet → context pack → task state → validation → replay → trust → observability
```

## Do Not Fake Signal

Never create fake telemetry, fake validation, fake trust, fake benchmark results, or fake task completion.

If something is unknown, mark it as unknown.

## Reduce Model Cognitive Load

Do not ask the model to rediscover what tools can compute.

Prefer deterministic systems for:

```text
- repo scanning
- test execution
- file listing
- log parsing
- schema validation
- counting
- persistence
```

Use the model for:

```text
- judgment
- tradeoffs
- root-cause reasoning
- ambiguous interpretation
- planning next action
```

## Keep Generated Code Human-Owned

Generated code must be understandable, maintainable, reviewable, and secure.

A senior engineer should be able to understand the diff, tests, and reason for the change.

---

# Required Validation

Before claiming work is done, run or report why you could not run:

```bash
npm install
npm run typecheck
npm test
```

For kernel-slice changes, also run the available kernel slice command if present.

Do not say tests passed unless they actually ran.

---

# Final Report Format

After implementation, report:

```text
branch
commit hash
changed files
issue addressed
validation commands run
validation result
tests added/changed
remaining risks
whether scope stayed within Roadmap 01
```

---

# Git Rules

Prefer focused branches and commits.

Do not mix Roadmap 02 work into Roadmap 01 branches.

If a branch has diverged from `main`, rebase or merge latest `main` before final validation.

---

# Documentation Rules

When adding or changing architecture docs:

```text
- update docs/DOCUMENT_REGISTRY.md
- mark status/version if needed
- avoid duplicate sources of truth
- archive or merge outdated docs later
```

Documentation is operational memory. Keep it useful.

---

# Core Operating Identity

OwnAI is not trying to build the biggest AI model.

OwnAI is building trusted cognition infrastructure that helps humans and AI work together safely, efficiently, observably, and with less wasted context.
