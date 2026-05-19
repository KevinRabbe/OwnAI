# OwnAI Anti-Duplication & Source-of-Truth Protocol

OwnAI must avoid redoing work that is already planned, documented, implemented, or parked.

Duplicate architecture creates spaghetti fast.

## Core Principle

```text
Do not recreate what already exists.
Find the source of truth, then extend or reference it.
```

---

# Why This Matters

AI agents are prone to generating new documents, new systems, new abstractions, and new plans instead of checking whether the idea already exists.

This creates:

```text
- duplicate concepts
- conflicting architecture
- bloated documentation
- unclear source of truth
- repeated implementation work
- inconsistent terminology
- harder onboarding
- wasted tokens
- spaghetti architecture
```

OwnAI should treat duplication as architecture debt.

---

# Required Check Before Creating Anything New

Before creating a new document, package, subsystem, issue, or architecture concept, the agent must check:

```text
1. docs/DOCUMENT_REGISTRY.md
2. docs/ROADMAP_01_MINIMAL_COGNITION_KERNEL.md if Roadmap 01 related
3. docs/ROADMAP_IDEA_PARKING_LOT.md
4. AGENTS.md
5. existing GitHub issues
6. existing package names / folders
```

If something already exists:

```text
extend it
reference it
update it
or mark it as superseded/merge candidate
```

Do not create a parallel duplicate.

---

# Source-of-Truth Resolution Order

When multiple documents mention the same concept, use this order:

```text
1. Active roadmap issue
2. Active roadmap document
3. DOCUMENT_REGISTRY status
4. Active architecture document
5. AGENTS.md for agent behavior
6. Reference document
7. Parking lot idea
8. Old/superseded/deprecated document
```

If conflict remains, create a flag or review note instead of guessing.

---

# Duplicate Detection Questions

Before adding a new artifact, ask:

```text
Is this already documented?
Is this already planned in an issue?
Is this a section that belongs in an existing doc?
Is this a duplicate of a parked idea?
Is this an implementation of a later roadmap too early?
Does this create a second source of truth?
Can I update an existing doc instead?
Can I add a cross-reference instead?
```

---

# What To Do When A Concept Already Exists

## If the existing doc is active

Update or reference the existing doc.

Do not create a new competing doc.

---

## If the existing doc is too broad

Add a small section first.

Split later only when the document becomes too heavy.

---

## If two docs overlap

Mark one as:

```text
candidate_for_merge
```

or:

```text
reference
```

Then update `docs/DOCUMENT_REGISTRY.md`.

---

## If the idea is future-only

Put it in:

```text
docs/ROADMAP_IDEA_PARKING_LOT.md
```

or mark the doc as:

```text
reference
```

Do not implement it in Roadmap 01.

---

# Documentation Rules

## Rule 1 — One Active Source Of Truth

Each major concept should have one active source of truth.

Examples:

```text
Task packets → TASK_PACKET_GENERATOR.md
Context packs → CONTEXT_PROTOCOL.md
Roadmap 01 scope → ROADMAP_01_MINIMAL_COGNITION_KERNEL.md
Agent behavior → AGENTS.md
Document status → DOCUMENT_REGISTRY.md
Governance maturity → GOVERNANCE_MATURITY_MODEL.md
```

---

## Rule 2 — New Docs Must Be Registered

Every new architecture/roadmap/protocol document must be added to:

```text
docs/DOCUMENT_REGISTRY.md
```

with:

```text
- version
- status
- purpose
- notes
```

---

## Rule 3 — Prefer Updating Over Duplicating

If a new idea fits an existing document, update that document instead of creating a new file.

---

## Rule 4 — Split Only When Useful

Split a document only when:

```text
- it is too long to use effectively
- sections have different owners/lifecycles
- implementation needs separate source-of-truth docs
- registry can clearly link the split documents
```

---

## Rule 5 — Archive Instead Of Leaving Noise

If a document is no longer active but still useful, move it to:

```text
docs/archive/
```

and update the registry.

---

# Implementation Rules

Before creating a package or subsystem, check whether an existing package already owns the responsibility.

Examples:

```text
Validation behavior → packages/validation-gates
Replay behavior → packages/replay-store
Trust behavior → packages/trust-registry
Context behavior → packages/context-protocol
Task state behavior → packages/task-state
Events → packages/core-events
Types/contracts → packages/core-types
```

Do not create:

```text
packages/task-manager
```

if the behavior belongs in:

```text
packages/task-state
packages/task-packet-generator
packages/kernel-slice
```

without a clear boundary reason.

---

# Issue Creation Rules

Before creating a GitHub issue, search existing issues.

If an issue already covers the work:

```text
comment/update existing issue
```

Do not create duplicate issue tracks.

---

# Agent Behavior Rules

Agents must not generate a new framework because they forgot to inspect the registry.

Required behavior:

```text
read registry first
identify source of truth
extend existing concept
update registry if needed
report overlap risks
```

Forbidden behavior:

```text
create duplicate docs
create duplicate packages
create duplicate issue tracks
redefine active concepts differently
implement parked ideas early
```

---

# Overlap Flag

If an agent detects possible duplication, it should create a structured flag:

```json
{
  "level": "warning",
  "category": "possible_duplicate_concept",
  "summary": "New worker communication idea overlaps AGENT_WORKER_COMMUNICATION_PROTOCOL.md.",
  "requiredResponse": "extend existing doc or mark split reason",
  "owner": "architecture"
}
```

---

# Final Report Requirement

For architecture/documentation changes, final reports should include:

```text
source-of-truth checked
existing docs reviewed
new docs created
registry updated
overlap risks
why update/split/create was chosen
```

---

# Core Rule

```text
Architecture should compound, not duplicate.
```

Every new piece should either:

```text
extend an existing source of truth
clarify an existing source of truth
or deliberately create a new source of truth with registry support
```
