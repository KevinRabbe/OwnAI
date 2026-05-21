# OwnAI Roadmap Idea Parking Lot

This document preserves strong brainstorm ideas without allowing them to distract from Roadmap 01.

## Core Principle

```text
Brainstorm broadly.
Build narrowly.
```

Good ideas should not be lost, but they should not enter implementation until they strengthen the current roadmap.

---

# Current Active Focus

```text
Roadmap 01 — Minimal Cognition Kernel
```

Only ideas that directly strengthen the kernel should be considered active.

Active kernel priorities:

```text
- core contracts
- event bus
- durable task state
- task packet generator
- context pack v0
- validation gates
- replay store
- trust registry
- observability timeline
- executable skill scripts
- simple recovery/resume
```

---

# Acceptance Filter For New Ideas

A new idea may enter the active roadmap only if it clearly improves at least one of:

```text
- quality
- cost
- risk
- wasted context
- security
- speed
- system intelligence
- kernel stability
```

And it must answer:

```text
Does this help the Minimal Cognition Kernel work?
Can it be implemented without large dependency growth?
Can it be validated?
Can it be observed?
Can it fail safely?
```

If not, park it here.

---

# Ideas To Use Now

These are compatible with Roadmap 01.

## Task Packet Generator

Turns rough user intent into structured operational packets.

Status:

```text
active roadmap
```

---

## Context Protocol

Manages context as structured cognition fuel.

Status:

```text
active roadmap
```

---

## Durable Task State

Allows tasks to survive crashes, disconnects, and restarts.

Status:

```text
active roadmap
```

---

## Plain Observability Timeline

Records real events before advanced UI exists.

Status:

```text
active roadmap
```

---

## Validation Gates

Prevents false task completion.

Status:

```text
active roadmap
```

---

## Simple Circuit Breaker

Stops retry loops after bounded failure.

Status:

```text
kernel-compatible
```

---

## Executable Skill Scripts

Reusable scripts generated once, validated, then reused many times.

Status:

```text
kernel-compatible
```

---

## Simple Hierarchical Memory / Pointers

Use tiny pointers and summaries before raw history.

Status:

```text
kernel-compatible
```

---

# Parked Ideas For Later

These are valuable but should not distract from Roadmap 01.

## Differentiated Capability Ideas — What OwnAI Could Do Differently

Question:

```text
What could OwnAI do differently from normal AI products,
to improve capability without only using a bigger model?
```

Core direction:

```text
OwnAI does not compete by being the biggest model.
OwnAI competes by building the best cognition infrastructure around models.
```

Short thesis:

```text
AI gave us the engine.
OwnAI builds the car.
```

Mental model:

```text
The model is the engine.
OwnAI is the vehicle, dashboard, memory, safety system, map, tools, and repair system around it.
```

Strategic thesis:

```text
Bigger-model competition is a different battlefield.
OwnAI should improve capability by improving how models are grounded, routed, constrained, observed, remembered, validated, and reused.
```

Key infrastructure slogans:

```text
Context should be compiled like code.
Not dumped like garbage.

The model should not read the whole world.
OwnAI should build the atlas, map the route, and load only what matters.
```

Possible ideas:

```text
1. Evidence-first thinking
→ Every important answer/action has evidence links, confidence, missing evidence, and contradiction checks.

2. Replay-native learning
→ OwnAI improves from past task outcomes instead of forgetting every workflow after chat ends.

3. Context as engineered fuel
→ Context is selected, scoped, versioned, and justified instead of dumped into the model.

4. Relationship-first reasoning
→ OwnAI maps Zusammenhänge between entities, signals, files, tests, docs, risks, and outcomes.

5. Replaceable providers everywhere
→ Every subsystem can improve or be rewritten behind stable contracts.

6. Shadow-mode improvement
→ New subsystem versions run in parallel before they control decisions.

7. Immune-system trust boundary
→ OwnAI defines what belongs to itself, sandboxes unknowns, and blocks fake-self objects.

8. Local operational memory
→ Docs, decisions, task state, replay, and trust records become durable memory, not loose chat history.

9. Context economy metric
→ Track decision quality per context token, not only raw accuracy.

10. Human-governed autonomy
→ OwnAI can continue safe independent work around blocked dependencies, but external/destructive actions need approval.

11. Source-code reference library
→ Curated code references become chunked, scoped, evidence-linked context sources.

12. Relationship domain packs
→ Complex domains can be understood one scoped pack at a time without becoming uncontrolled automation.

13. Explainability as validation
→ If an agent cannot explain what its code does against the actual implementation, the branch is suspicious.

14. Contradiction-driven work
→ Contradictions between docs, code, tests, claims, and evidence automatically create validation pressure.

15. Capability quarantine
→ Unknown tools/packages/scripts may exist but cannot affect trusted state until sandboxed and scoped.
```

Different thinking perspective:

```text
Most AI products focus on answering.
OwnAI should focus on knowing what it knows, why it knows it, what it does not know, and what should happen next.
```

Reason parked:

```text
This is strategic direction. Individual ideas should be promoted only when they strengthen a roadmap issue.
```

---

## Future Interface Layer — Editor Adapter, Browser Workspace, Terminal Adapter

OwnAI should not replace trusted user tools too early.

It should eventually wrap them with cognition infrastructure.

Possible interface surfaces:

```text
- Editor Adapter
- Browser Workspace
- Terminal Adapter
- Git Adapter
```

Editor direction:

```text
Use an existing editor ecosystem first, likely VS Code-style integration.
Do not build a full editor from scratch unless there is a strong reason later.
```

Browser direction:

```text
Provide an integrated governed browser workspace for research, docs, citations, source collection, and web evidence.
```

Browser should create artifacts such as:

```text
ResearchNote
SourceRecord
CitationRecord
DownloadedDocRecord
WebTaskEvidence
```

Governance constraints:

```text
browser may read
browser may collect sources
browser may summarize
browser must not auto-submit forms, payments, account actions, or destructive actions without human approval
```

Reason parked:

```text
valuable future interface layer, but Roadmap 01 must prove the kernel before UI/editor/browser integration
```

---

## Advanced KV Cache Surgery

Examples:

```text
- attention pruning
- custom KV compression
- precision layering inside model runtime
```

Reason parked:

```text
research-grade optimization; not needed for first kernel
```

---

## Speculative Futures

Preloading multiple likely outcomes before validation completes.

Reason parked:

```text
useful later for speed, but too complex before task state/replay works
```

---

## Multi-Agent Swarms

Multiple agents working in parallel.

Reason parked:

```text
requires strong task boundaries, validation, trust, and resource scheduling first
```

---

## Advanced Biological Routing

Examples:

```text
- slime-mold path optimization
- pheromone-style skill routing
- immune-system-like distributed detection
```

Reason parked:

```text
strong inspiration, but should be applied after basic replay/trust data exists
```

---

## Holographic UI

Advanced spatial cognition visualization.

Reason parked:

```text
requires real observability data first
```

---

## Deep Self-Improvement

Self-modifying cognition systems.

Reason parked:

```text
requires protected core, rollback, trust, validation, and sandboxing first
```

---

## Federated Cognition Nodes

Multiple OwnAI instances sharing skill genetics or benchmark data.

Reason parked:

```text
requires mature local identity, privacy, trust, and skill lineage first
```

---

# Parking Lot Rule

```text
A parked idea is not rejected.
It is protected from premature implementation.
```

---

# Core Rule

```text
Do not build impressive complexity before the kernel can prove simple reliability.
```
