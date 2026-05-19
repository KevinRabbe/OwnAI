# OwnAI Parallelism Maturity & Risk Classes

Parallelism in OwnAI must be controlled by dependency structure, governance, resource limits, validation isolation, rollback safety, and risk class.

More agents do not automatically mean better outcomes.

## Core Principle

```text
Parallelism must be earned by task structure.
```

OwnAI should not parallelize work simply because multiple agents or workers are available.

---

# Why This Matters

Parallel execution can improve throughput, but it can also create:

```text
- merge conflicts
- duplicated context use
- validation confusion
- hidden dependency violations
- inconsistent state
- resource exhaustion
- security mistakes
- faster failure
```

Therefore parallelism must be gated.

---

# Parallelism Maturity Ladder

OwnAI should climb parallelism gradually.

## Level 0 — Sequential Execution

One task at a time.

Use when:

```text
- system is early-stage
- task touches core contracts
- validation is immature
- rollback is unclear
```

---

## Level 1 — Blocked-Node Work-Around

Pause blocked dependencies and continue safe independent work.

Example:

```text
Phase 4 waits for human approval.
Phase 5 continues if independent.
```

---

## Level 2 — Background Maintenance

Parallel work that does not modify risky behavior.

Examples:

```text
- replay compression
- documentation registry checks
- context cleanup
- metrics aggregation
- observability summarization
```

---

## Level 3 — Parallel Validation

Multiple validators run in parallel.

Examples:

```text
- npm test
- typecheck
- docs registry scan
- security scan
- diff summary
```

Core rule:

```text
Prefer parallel validation before parallel modification.
```

---

## Level 4 — Parallel Analysis

Multiple read-only inspectors analyze different areas.

Examples:

```text
- repo scanner inspects package map
- security scanner inspects risky APIs
- docs scanner checks registry consistency
- dependency scanner checks package changes
```

---

## Level 5 — Isolated Branch Work

Independent implementation tasks may proceed in parallel only if they touch clearly separated areas and can be validated separately.

Requirements:

```text
- dependency graph allows it
- file overlap is low
- merge risk is acceptable
- rollback isolation exists
- validation isolation exists
```

---

## Level 6 — Coordinated Multi-Agent Execution

Advanced coordinated multi-agent implementation.

Only allowed after mature:

```text
- governance
- dependency graph
- resource scheduling
- validation gates
- rollback system
- observability
- trust registry
```

Status:

```text
future roadmap only
```

---

# Parallel Risk Classes

Parallel work should be classified before execution.

---

## Class A — Read-Only Parallel Work

Risk:

```text
low
```

Examples:

```text
- scan files
- summarize docs
- inspect branch diff
- collect metrics
- read logs
```

Allowed early:

```text
yes
```

---

## Class B — Validation Parallel Work

Risk:

```text
low-medium
```

Examples:

```text
- run tests
- run typecheck
- run lint
- run security scan
- verify docs registry
```

Allowed early:

```text
yes, with observability
```

---

## Class C — Preparation Parallel Work

Risk:

```text
medium
```

Examples:

```text
- draft PR description
- prepare rollback notes
- generate task packet draft
- prepare alternative plan
```

Allowed:

```text
yes, if clearly marked draft/pending
```

---

## Class D — Isolated Modification Work

Risk:

```text
medium-high
```

Examples:

```text
- edit separate package A
- edit separate docs file
- add tests for isolated module
```

Allowed:

```text
only if dependency graph and rollback are clear
```

---

## Class E — Shared-Core Modification Work

Risk:

```text
high
```

Examples:

```text
- edit core-types
- edit governance
- edit validation gates
- edit trust registry
- edit event contracts
```

Allowed:

```text
usually sequential or human-reviewed
```

---

## Class F — Security / Destructive Work

Risk:

```text
critical
```

Examples:

```text
- shell execution
- dependency installation
- filesystem deletion
- auth/security changes
- protected core changes
```

Allowed:

```text
governance gate + human approval required
```

---

# Parallel Readiness Evaluation

Before parallel execution, OwnAI should evaluate:

```text
- task independence
- dependency graph
- file overlap
- validation isolation
- rollback isolation
- governance risk
- security sensitivity
- resource pressure
- merge conflict risk
- context overlap
```

Possible results:

```text
parallel_ready
parallel_with_limits
sequential_required
human_review_required
blocked
```

---

# Resource Awareness

Parallelism must respect available resources:

```text
- RAM
- VRAM
- CPU
- disk
- API budget
- token budget
- model availability
```

Example:

```text
Task graph allows 5 workers.
Hardware profile allows 2.
OwnAI runs 2.
```

---

# Governance Rule

```text
Parallel work is allowed only when dependency graph, governance, and resource checks agree.
```

Governance may force sequential execution for high-risk tasks.

---

# Roadmap 01 Scope

Roadmap 01 should not implement parallel execution.

Roadmap 01 may define fields that make future parallelism possible:

```text
- blockedBy
- blocks
- safeToContinue
- task status
- validation evidence
- observation records
```

Actual parallel execution belongs to a later roadmap.

---

# Core Rules

```text
More agents increase speed, not necessarily quality.

Prefer parallel validation before parallel modification.

Parallelism level depends on risk class.

Do not parallelize shared-core or security-sensitive work without governance.
```
