# OwnAI Agent Branch Acceptance Checklist

This checklist defines how AI-generated branches should be reviewed before they are accepted or merged.

AI-generated work is not accepted because it looks large, impressive, or plausible.

It is accepted only when it is validated, scoped, understandable, and aligned with the active roadmap.

## Core Principle

```text
Promising does not mean accepted.
Validated means accepted.
```

---

# When To Use This Checklist

Use this checklist for:

```text
- Codex branches
- AI-generated implementation branches
- agent-generated patches
- automated roadmap phase branches
- large refactor branches
- kernel implementation branches
```

Especially use it before merging into:

```text
main
```

---

# Required Branch Information

Before review, capture:

```text
- branch name
- base branch
- related issue number
- commit hash
- changed files
- roadmap phase
- stated goal
```

Example:

```text
branch: roadmap01-phases-3-10
base: main
issue: #3-#10
roadmap: Roadmap 01
```

---

# Scope Check

Confirm the branch did not start unrelated work.

For Roadmap 01, reject or split if the branch adds:

```text
- Roadmap 02 model routing
- advanced UI
- multi-agent swarms
- speculative cache systems
- deep self-improvement
- unrelated docs churn
- unnecessary dependency growth
```

Allowed:

```text
- core contracts
- event bus
- durable task state
- task packets
- context packs
- validation gates
- replay store
- trust registry
- observability timeline
- kernel vertical slice
- Roadmap 01 support primitives when relevant
```

---

# Validation Commands

Before acceptance, run or explicitly report why they could not be run:

```bash
npm install
npm run typecheck
npm test
```

For kernel-slice changes, also run the available kernel slice command.

Do not claim tests passed unless they actually executed.

---

# Test Integrity Check

Confirm:

```text
- tests actually ran
- test glob is not broken
- tests are not empty placeholders
- assertions verify real behavior
- tests do not only check object existence
- generated files are inspected when persistence is required
```

---

# Signal Integrity Check

Reject fake signal.

Check for:

```text
- fake telemetry
- fake validation success
- hardcoded success states
- trust increases without evidence
- replay entries without real task outcome
- context packs with irrelevant filler
- timelines without real task ids
```

Core rule:

```text
Unknown must be marked unknown.
```

---

# Persistence Check

If the branch touches task state, replay, validation, context packs, or observability, confirm output is written to expected locations.

Expected Roadmap 01 paths may include:

```text
.ownai/tasks/<taskId>/state.json
.ownai/observability/timeline.jsonl
.ownai/replay/
.ownai/context-packs/
.ownai/task-packets/
.ownai/trust/
.ownai/validation/
```

---

# Linkage Check

Records should link together.

Confirm:

```text
TaskState references TaskPacket
TaskState references ContextPack
ValidationResult references Task
ReplayEntry references Task/Packet/Context/Validation
Trust update references evidence
Timeline observations reference real task ids/events
```

---

# Architecture Check

Look for:

```text
- duplicate types
- bypassed core contracts
- package boundary violations
- circular dependencies
- runtime-heavy logic inside core-types
- direct coupling where an interface should exist
- large unrelated refactors
```

---

# Security Check

If code touches security-sensitive areas, require security review.

Security-sensitive areas include:

```text
- command execution
- filesystem writes/deletes
- dependency loading
- network access
- secrets
- auth
- user input handling
- serialization/deserialization
```

Required:

```text
- security impact statement
- validation evidence
- human review if high risk
```

---

# Dependency Check

If dependencies changed:

```text
- justify the dependency
- confirm built-in APIs are insufficient
- check package scope
- avoid unnecessary runtime dependencies
- update package-lock intentionally
```

---

# Documentation Check

If architecture docs were added or changed:

```text
- update docs/DOCUMENT_REGISTRY.md
- avoid duplicate sources of truth
- mark reference/active status correctly
- do not let brainstorm docs override active roadmap
```

---

# Acceptance Result

Use one of these outcomes:

```text
accepted
accepted_with_minor_followups
needs_fixes
split_required
rejected
blocked
```

---

# Final Review Report

A final branch review should report:

```text
branch
base
commit hash
related issue(s)
changed files
scope result
validation commands run
validation result
test integrity result
signal integrity result
persistence result
linkage result
architecture risks
security risks
dependency risks
documentation updates
acceptance decision
next action
```

---

# Merge Rule

```text
Do not merge AI-generated branches into main until validation, signal integrity, and scope checks pass.
```

---

# Core Rule

```text
AI branches must earn trust through evidence.
```
