# OwnAI Coding Agent Documentation Workflow

The documentation system is part of the coding agent workflow.

Coding agents must not treat documentation as an optional afterthought.

Docs are operational memory, source-of-truth control, anti-duplication protection, and architecture governance.

## Core Principle

```text
Coding agents must use the documentation system before, during, and after code changes.
```

---

# Why This Matters

Without documentation workflow integration, coding agents may:

```text
- redo already planned work
- create duplicate packages
- ignore active roadmap scope
- implement parked ideas too early
- create hidden architecture connections
- forget to update source-of-truth docs
- claim success without updating operational memory
- make future agents rediscover the same context
```

OwnAI must avoid this.

---

# Required Coding Agent Flow

Every coding agent task should follow this flow:

```text
1. Registry check
2. Source-of-truth check
3. Issue / roadmap check
4. Relationship / connection check
5. Implementation
6. Validation
7. Documentation update
8. Registry update if needed
9. Final evidence report
```

---

# Step 1 — Registry Check

Before planning, inspect:

```text
docs/DOCUMENT_REGISTRY.md
```

Purpose:

```text
find the active source of truth
avoid loading irrelevant docs
avoid using reference docs as implementation authority
```

Agent must identify:

```text
- relevant active docs
- relevant reference docs if any
- docs that must not be used as implementation source
- whether a new doc/system would duplicate an existing one
```

---

# Step 2 — Source-Of-Truth Check

Before creating new architecture, packages, or docs, inspect:

```text
docs/ANTI_DUPLICATION_AND_SOURCE_OF_TRUTH_PROTOCOL.md
```

Questions:

```text
Does this concept already exist?
Which doc owns it?
Which package owns it?
Which issue owns it?
Should this update an existing artifact instead of creating a new one?
```

Core rule:

```text
Extend existing source of truth before creating a new one.
```

---

# Step 3 — Issue / Roadmap Check

For implementation, inspect the active roadmap and issue.

Current active roadmap:

```text
docs/ROADMAP_01_MINIMAL_COGNITION_KERNEL.md
```

Agent must confirm:

```text
- active phase
- related issue number
- acceptance criteria
- non-goals
- validation expectations
```

If the task is not Roadmap 01 relevant:

```text
park it or require explicit approval
```

---

# Step 4 — Relationship / Connection Check

Before adding a new relationship between systems, inspect:

```text
docs/ARCHITECTURE_RELATIONSHIP_DIAGRAMS.md
docs/CONNECTION_OWNERSHIP_AND_VALIDATION_MATRIX.md
```

Agent must answer:

```text
What systems are connected?
What is the cardinality?
Who owns the connection?
What artifact crosses the boundary?
How is it validated?
How is it observed?
What happens when it fails?
```

Core rule:

```text
No invisible coupling.
```

---

# Step 5 — Implementation

Implementation must stay inside the active issue scope.

Agent should avoid:

```text
- unrelated refactors
- new dependencies without justification
- duplicate packages
- hidden runtime behavior
- fake telemetry
- fake validation success
- trust updates without evidence
- parked roadmap work
```

---

# Step 6 — Validation

Before claiming completion, run or report why unable to run:

```bash
npm install
npm run typecheck
npm test
```

For kernel-slice changes, also run the available kernel slice command.

Agent must not claim tests passed unless they actually ran.

---

# Step 7 — Documentation Update

After code changes, the agent must decide whether documentation needs updating.

Update docs when code changes:

```text
- architecture behavior
- package ownership
- public contracts
- event types
- artifact schemas
- validation rules
- governance behavior
- task state fields
- acceptance criteria
- workflow flags
- permission behavior
```

Do not update docs for purely internal code cleanup unless it changes behavior or ownership.

---

# Step 8 — Registry Update

If a new document is created, update:

```text
docs/DOCUMENT_REGISTRY.md
```

If a document changes implementation meaning, bump version.

If a document becomes outdated, mark it:

```text
candidate_for_merge
candidate_for_archive
superseded
deprecated
candidate_for_delete
```

---

# Step 9 — Final Evidence Report

Every coding agent final report should include:

```text
branch
commit hash
issue addressed
source-of-truth docs checked
changed files
architecture connections added/changed
validation commands run
validation result
docs updated
document registry updated if needed
remaining risks
scope confirmation
```

---

# Documentation Update Decision Tree

```text
Did code change architecture behavior?
→ update relevant architecture doc

Did code add a new artifact/schema/event?
→ update owner doc and relationship matrix if needed

Did code add a new package/subsystem?
→ update registry, relationship diagrams, connection matrix

Did code implement a parked idea?
→ stop unless explicitly approved

Did code make an old doc wrong?
→ update, mark superseded, or flag for review

Did code only refactor internals with no behavior change?
→ no doc change required, but mention in report
```

---

# Agent Pre-Work Checklist

Before editing code, agent should report internally or in task notes:

```text
Registry checked: yes/no
Active source docs: ...
Related issue: ...
Roadmap scope: ...
Existing owner package: ...
New connection needed: yes/no
Duplicate risk: low/medium/high
```

---

# Agent Post-Work Checklist

After editing code, agent should verify:

```text
Validation executed
Artifacts persisted if required
Observability events real
No fake success signal
Docs updated if behavior changed
Registry updated if docs changed
No duplicate source of truth created
Final report includes evidence
```

---

# Integration With AGENTS.md

`AGENTS.md` tells agents how to operate globally.

This document provides the detailed documentation workflow for coding tasks.

Agents should read:

```text
AGENTS.md
→ DOCUMENT_REGISTRY.md
→ this workflow when doing code changes
```

---

# Anti-Patterns

Avoid:

```text
- coding first, checking docs later
- creating package before checking ownership
- adding docs without registry update
- updating README with too much detail
- using reference docs as active roadmap authority
- implementing future interface ideas during Roadmap 01
- accepting branches without validation and documentation review
```

---

# Core Rule

```text
A coding task is not complete if the code changed the system but operational memory was not updated.
```
