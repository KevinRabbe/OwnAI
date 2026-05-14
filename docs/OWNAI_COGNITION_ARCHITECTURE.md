# OwnAI Cognition Architecture

This document provides a high-level overview of the OwnAI architecture, systems, cognition flow, memory philosophy, execution philosophy, UI philosophy, and long-term direction.

---

# Core Vision

```text
OwnAI is a local-first adaptive cognition platform.
```

The goal is not only task execution.
The goal is persistent, observable, replay-driven engineering cognition.

OwnAI should feel:

```text
- adaptive
- persistent
- explainable
- efficient
- modular
- coworker-like
- local-first
- operationally meaningful
```

---

# Core Philosophy

## 1. Ownable Intelligence

```text
Users should own their AI.
```

Core systems should work locally without subscriptions.

Cloud systems should be optional.

---

## 2. Efficient Adaptive Cognition

```text
More context is not always more intelligence.
Better focus is often more intelligence.
```

OwnAI prioritizes:

```text
- adaptive focus
- compression
- replay learning
- efficient routing
- minimal sufficient complexity
```

instead of brute-force context expansion.

---

## 3. Observable Autonomy

```text
Autonomy must be observable.
```

Every important action should be:

```text
- visible
- replayable
- explainable
- inspectable
```

---

## 4. Meaningful UI

```text
Every non-decorative UI element must map to real system state.
```

The UI is an operational cognition cockpit, not decorative sci-fi.

---

# Cognition Stack

```text
Telescope Engine
→ strategic wide understanding

Focus Lens Engine
→ adaptive attention control

Microscope Engine
→ precise technical inspection
```

---

# Core System Layers

# Perception Layer

Responsible for understanding projects and context.

Systems:

```text
- Repo Scanner
- Memory System
- Heatmap Engine
- Telescope Engine
- Microscope Engine
- Knowledge Graph Engine
```

---

# Reasoning Layer

Responsible for execution planning and adaptive cognition.

Systems:

```text
- Skill Engine
- Task Graph Engine
- Model Router
- Thread Coordinator
- Focus Lens Engine
- Decision Engine
- Prediction Engine
- Environment Awareness Engine
```

---

# Judgment Layer

Responsible for quality and safety.

Systems:

```text
- Verification Layer
- Confidence Engine
- Patch Quality Engine
- Token Economy Engine
- Hallucination Guard
```

---

# Learning Layer

Responsible for long-term improvement.

Systems:

```text
- Context Replay Engine
- Training Gym
- Skill Evolution
- Temporal Compression
- Documentation and Retention Engine
```

---

# Execution Layer

Responsible for action execution.

Systems:

```text
- Git Engine
- Worktree System
- Task Queue System
- Skill Runtime
- Model Adapters
```

---

# Observability Layer

Responsible for telemetry and explainability.

Systems:

```text
- Observability Layer
- Cognition Timeline
- Dashboard Systems
- Operational Telemetry
```

---

# Memory Philosophy

OwnAI memory is layered.

## Hot Memory

```text
Fast temporary active context.
```

Storage:

```text
JSON
```

---

## Warm Memory

```text
Reusable session/project state.
```

Storage:

```text
JSON
```

---

## Long-Term Memory

```text
Replay lessons, historical milestones, reusable engineering knowledge.
```

Storage:

```text
SQLite
```

---

# Temporal Compression

OwnAI should summarize history by default.

Detailed decompression happens only when needed.

Flow:

```text
Month Summary
→ Week Summary
→ Task Summary
→ Patch Report
→ Exact Diff/File
```

---

# Skill Philosophy

```text
Skills are evolving capabilities.
```

Skills improve through:

```text
- replay
- benchmarking
- training gym
- verification
- real usage
```

Skills are:

```text
- versioned
- benchmarked
- replay-aware
- personalized
- specialized
```

---

# Skill Factory

If no suitable skill exists:

```text
- generate draft skill
- run in sandbox
- verify
- benchmark
- save as v0.1
- evolve through usage
```

---

# Task Queue Philosophy

```text
OwnAI should accept future work while current work is running.
```

The queue system enables:

```text
- backlog workflows
- autonomous progression
- sequential safe execution
- queue observability
- coworker-style task handling
```

---

# Hallucination Prevention

Hallucination risk increases in long sessions.

OwnAI mitigates this using:

```text
- Focus Lens
- Verification
- Replay
- Knowledge Graph
- Context Compression
- Hallucination Guard
- Source Tracking
```

Core rule:

```text
Facts, assumptions, predictions, and guesses must remain separated.
```

---

# Documentation Philosophy

```text
Document what matters.
Delete what does not.
Compress before forgetting when useful.
```

Not all artifacts deserve permanent retention.

Temporary artifacts should be automatically cleaned safely.

---

# Holographic UI Philosophy

The UI should visualize:

```text
real cognition
real memory
real telemetry
real focus
real confidence
real execution
```

Examples:

```text
Cognitive Core
→ active cognition state

Heatmap Nebula
→ actual attention density

Memory Galaxy
→ temporal memory navigation

Replay Streams
→ learning paths

Focus Rings
→ adaptive attention state

Queue Holograms
→ active and upcoming tasks
```

---

# Product Philosophy

## Free/Open Core

Should include:

```text
- CLI
- local cognition
- task queue
- replay
- memory
- local skills
- local routing
```

---

## Paid Experience

Should enhance:

```text
- desktop UI
- cognition cockpit
- holographic dashboard
- onboarding
- operational experience
```

Core rule:

```text
Users should pay for the experience,
not for ownership of their AI.
```

---

# Long-Term Direction

OwnAI is designed as:

```text
persistent adaptive cognition infrastructure
```

not:

```text
- chat wrapper
- autocomplete plugin
- simple agent loop
```

The architecture is intentionally:

```text
- modular
- replay-driven
- observable
- scalable
- self-improvable
- local-first
- future-proof
```

---

# Existing Architecture Documents

```text
TASK_QUEUE_SYSTEM.md
OPERATING_MODES.md
ENGINEERING_INTENT_SYSTEM.md
KNOWLEDGE_GRAPH_ENGINE.md
OBSERVABILITY_LAYER.md
FOCUS_LENS_ENGINE.md
DOCUMENTATION_AND_RETENTION_ENGINE.md
```

---

# Core Rule

```text
OwnAI should continuously transform experience into structured adaptive cognition.
```
