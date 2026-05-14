# OwnAI Implementation Roadmap

This roadmap focuses on turning the architecture into a fully operational local-first cognition system.

The goal is to avoid architecture drift and continuously convert concepts into runnable systems.

---

# Phase 1 — Runnable Core Pipeline

Goal:

```text
Make the full cognition pipeline executable end-to-end.
```

Pipeline:

```text
scan
→ memory
→ heatmap
→ telescope
→ microscope
→ verify
→ replay
```

Tasks:

```text
- unify package scripts
- create root pipeline command
- generate .ownai outputs
- stabilize package contracts
- add typecheck workflow
- add lightweight tests
```

Success Criteria:

```text
npm run ownai:pipeline .
```

runs successfully on a repository.

---

# Phase 2 — Task Queue + Observability

Goal:

```text
Create coworker-style workflow execution.
```

Tasks:

```text
- implement task queue runtime
- implement task states
- implement queue persistence
- implement cognition timeline
- implement event bus
- implement observability events
```

Success Criteria:

```text
OwnAI can execute queued tasks sequentially and expose live telemetry.
```

---

# Phase 3 — Replay + Focus Lens

Goal:

```text
Make OwnAI adaptive and efficient.
```

Tasks:

```text
- replay scoring
- context usefulness tracking
- adaptive compression
- focus lens decisions
- token economy integration
- hallucination prevention hooks
```

Success Criteria:

```text
OwnAI reduces context usage over time while maintaining verification quality.
```

---

# Phase 4 — Local Model Routing

Goal:

```text
Support real local-first cognition.
```

Tasks:

```text
- Ollama adapter
- local worker model
- scout/worker routing
- optional cloud escalation
- environment awareness
- hardware-aware scheduling
```

Success Criteria:

```text
OwnAI runs fully local on consumer hardware.
```

---

# Phase 5 — Skill Evolution + Training Gym

Goal:

```text
Create evolving reusable capabilities.
```

Tasks:

```text
- skill registry
- skill runtime
- skill factory
- replay-fed improvement
- benchmark system
- idle training mode
```

Success Criteria:

```text
OwnAI improves workflows through replay and benchmarking.
```

---

# Phase 6 — Knowledge Graph + Temporal Memory

Goal:

```text
Create navigable engineering memory.
```

Tasks:

```text
- graph storage
- relationship indexing
- temporal summaries
- telescope time navigation
- decompression routing
```

Success Criteria:

```text
OwnAI can recall and zoom through project history efficiently.
```

---

# Phase 7 — Desktop Cognition Cockpit

Goal:

```text
Create the operational holographic UI.
```

Tasks:

```text
- cognition dashboard
- queue panels
- telescope visualization
- memory galaxy
- focus lens visualization
- confidence visualization
- observability timeline
```

Success Criteria:

```text
Every UI panel maps to real cognition state.
```

---

# Phase 8 — Multi-Domain Skills

Goal:

```text
Expand beyond coding.
```

Examples:

```text
- image generation
- 3D generation
- fabrication skills
- Bambu Lab integration
- design review
- cinematic UI generation
```

Success Criteria:

```text
OwnAI supports reusable multi-domain evolving skills.
```

---

# Core Rule

```text
Architecture without execution is incomplete.
Every phase should end with a runnable capability.
```
