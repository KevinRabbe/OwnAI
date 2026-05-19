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
