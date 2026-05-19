# OwnAI Agent Documentation Workflow

The documentation system is part of the OwnAI agent workflow.

It is not only for external coding agents that build OwnAI.

It is also for OwnAI's own runtime agents when they plan tasks, inspect systems, create artifacts, avoid duplication, coordinate work, and update operational memory.

Docs are operational memory, source-of-truth control, anti-duplication protection, architecture governance, and task-navigation infrastructure.

## Core Principle

```text
OwnAI agents must use the documentation system before, during, and after meaningful system work.
```

---

# Two Agent Layers

This workflow applies to two layers.

## Layer A — Development Agents

Agents such as Codex or other coding assistants that help build the OwnAI repository.

They use docs to:

```text
- avoid duplicate implementation
- follow active roadmap scope
- update operational memory after code changes
- validate before claiming completion
```

---

## Layer B — OwnAI Runtime Agents

OwnAI's own agents/workers once the system is running.

They use docs/registry-style operational memory to:

```text
- find the source of truth
- avoid redoing planned work
- choose the right subsystem owner
- understand allowed connections
- decide whether to flag, escalate, or continue
- create structured artifacts instead of chatter
- route future ideas into parking lots instead of active work
```

This layer is the more important long-term target.

---

# Why This Matters

Without documentation workflow integration, agents may:

```text
- redo already planned work
- create duplicate packages or capabilities
- ignore active roadmap scope
- implement parked ideas too early
- create hidden architecture connections
- forget to update source-of-truth docs
- claim success without updating operational memory
- make future agents rediscover the same context
- turn useful architecture into spaghetti
```

OwnAI must avoid this.

---

# Required Agent Flow

Every meaningful agent task should follow this flow:

```text
1. Registry check
2. Source-of-truth check
3. Roadmap / task / issue check
4. Relationship / connection check
5. Work execution
6. Validation or evidence collection
7. Documentation / memory update if needed
8. Registry update if docs changed
9. Final evidence report or task artifact
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
- whether a new doc/system/capability would duplicate an existing one
```

Runtime equivalent:

```text
agent checks the operational registry before deciding where work belongs
```

---

# Step 2 — Source-Of-Truth Check

Before creating new architecture, packages, capabilities, docs, or long-lived artifacts, inspect:

```text
docs/ANTI_DUPLICATION_AND_SOURCE_OF_TRUTH_PROTOCOL.md
```

Questions:

```text
Does this concept already exist?
Which doc owns it?
Which package or subsystem owns it?
Which task/issue owns it?
Should this update an existing artifact instead of creating a new one?
```

Core rule:

```text
Extend existing source of truth before creating a new one.
```

---

# Step 3 — Roadmap / Task / Issue Check

For repository implementation, inspect the active roadmap and issue.

Current active roadmap:

```text
docs/ROADMAP_01_MINIMAL_COGNITION_KERNEL.md
```

Development agent must confirm:

```text
- active phase
- related issue number
- acceptance criteria
- non-goals
- validation expectations
```

Runtime agent equivalent:

```text
- active task packet
- task state
- allowed scope
- blocked dependencies
- validation/evidence requirements
```

If the work is not relevant to the active task/roadmap:

```text
park it, flag it, or require explicit approval
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

Runtime equivalent:

```text
no worker should create hidden state, hidden trust updates, hidden actions, or hidden dependencies
```

---

# Step 5 — Work Execution

Work must stay inside the active task scope.

Agents should avoid:

```text
- unrelated refactors
- new dependencies without justification
- duplicate packages/capabilities
- hidden runtime behavior
- fake telemetry
- fake validation success
- trust updates without evidence
- parked roadmap work
- uncontrolled worker chatter
```

---

# Step 6 — Validation Or Evidence Collection

For repository code changes, run or report why unable to run:

```bash
npm install
npm run typecheck
npm test
```

For kernel-slice changes, also run the available kernel slice command.

Development agents must not claim tests passed unless they actually ran.

Runtime agents must collect appropriate evidence before claiming task success.

Examples:

```text
validation result
source record
action evidence
flag resolution evidence
human approval record
replay outcome
trust evidence link
```

---

# Step 7 — Documentation / Memory Update

After meaningful work, the agent must decide whether operational memory needs updating.

Update docs or memory when work changes:

```text
- architecture behavior
- package/subsystem ownership
- public contracts
- event types
- artifact schemas
- validation rules
- governance behavior
- task state fields
- acceptance criteria
- workflow flags
- permission behavior
- source-of-truth status
```

Do not update docs for purely internal cleanup unless it changes behavior, ownership, or future agent decisions.

Runtime equivalent:

```text
create or update the correct artifact, replay entry, task state, source record, trust record, or observation
```

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

Runtime equivalent:

```text
if a new long-lived capability/artifact type exists, register it in the relevant registry
```

---

# Step 9 — Final Evidence Report / Task Artifact

Development agent final report should include:

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

Runtime agent final artifact should include:

```text
task id
source-of-truth checked
artifacts created/updated
validation/evidence collected
flags opened/resolved
permissions requested/used
observability events emitted
remaining risks
next safe action
```

---

# Documentation / Memory Update Decision Tree

```text
Did work change architecture behavior?
→ update relevant architecture doc or operational memory

Did work add a new artifact/schema/event?
→ update owner doc/registry and relationship matrix if needed

Did work add a new package/subsystem/capability?
→ update registry, relationship diagrams, connection matrix

Did work implement a parked idea?
→ stop unless explicitly approved

Did work make an old doc wrong?
→ update, mark superseded, or flag for review

Did work only refactor internals with no behavior change?
→ no doc change required, but mention in report
```

---

# Agent Pre-Work Checklist

Before executing meaningful work, agent should record internally or in task notes:

```text
Registry checked: yes/no
Active source docs/memory: ...
Related task/issue: ...
Scope: ...
Existing owner subsystem: ...
New connection needed: yes/no
Duplicate risk: low/medium/high
```

---

# Agent Post-Work Checklist

After work, agent should verify:

```text
Validation/evidence collected
Artifacts persisted if required
Observability events real
No fake success signal
Docs/memory updated if behavior changed
Registry updated if docs/capabilities changed
No duplicate source of truth created
Final report includes evidence
```

---

# Integration With AGENTS.md

`AGENTS.md` tells agents how to operate globally.

This document provides the detailed documentation/memory workflow for agent work.

Development agents should read:

```text
AGENTS.md
→ DOCUMENT_REGISTRY.md
→ this workflow when doing code changes
```

OwnAI runtime agents should follow the same pattern conceptually:

```text
agent instructions
→ operational registry
→ task packet / task state
→ source-of-truth artifacts
→ evidence-producing work
```

---

# Anti-Patterns

Avoid:

```text
- working first, checking docs/memory later
- creating package/capability before checking ownership
- adding docs without registry update
- updating README with too much detail
- using reference docs as active roadmap authority
- implementing future interface ideas during Roadmap 01
- accepting branches without validation and documentation review
- runtime agents creating long-lived artifacts without registration
- workers communicating through chatter instead of artifacts/flags
```

---

# Core Rules

```text
A coding task is not complete if the code changed the system but operational memory was not updated.

A runtime task is not complete if the agent changed system state but left no evidence, artifact, or observable trace.
```
