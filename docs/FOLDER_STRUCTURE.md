# OwnAI Folder Structure

This document describes the intended scalable folder structure for OwnAI.

The goal is to keep every system modular, understandable, replaceable, and individually improvable.

---

# Root Structure

```text
OwnAI/
├── apps/
│   └── dashboard/
│
├── packages/
│   ├── agent-core/
│   ├── core-events/
│   ├── core-state/
│   ├── core-types/
│   ├── core-interfaces/
│   ├── core-utils/
│   │
│   ├── repo-scanner/
│   ├── memory-system/
│   ├── heatmap-engine/
│   ├── telescope-engine/
│   ├── focus-lens-engine/
│   ├── microscope-engine/
│   │
│   ├── verifier/
│   ├── patch-quality-engine/
│   ├── token-economy-engine/
│   ├── confidence-engine/
│   ├── decision-engine/
│   ├── prediction-engine/
│   ├── hallucination-guard/
│   │
│   ├── context-replay-engine/
│   ├── knowledge-graph-engine/
│   ├── documentation-retention-engine/
│   ├── observability-layer/
│   │
│   ├── skill-engine/
│   ├── skill-factory/
│   ├── training-gym/
│   ├── task-queue/
│   ├── thread-coordinator/
│   │
│   ├── git-engine/
│   ├── model-adapters/
│   ├── environment-awareness/
│   │
│   ├── ui-core/
│   ├── ui-holographics/
│   └── ui-visualizations/
│
├── skills/
│   ├── coding/
│   ├── documentation/
│   ├── research/
│   ├── image-generation/
│   ├── 3d-generation/
│   └── fabrication/
│
├── presets/
│   ├── intents/
│   ├── model-modes/
│   └── operating-modes/
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── smoke/
│
├── docs/
├── scripts/
├── examples/
└── templates/
```

---

# Runtime Output Structure

Runtime data is generated locally and is not committed.

```text
.ownai/
├── memory/
│   ├── hot/
│   ├── warm/
│   └── long_term.db
│
├── cache/
├── learning/
├── observability/
├── patches/
├── reports/
├── tmp/
└── worktrees/
```

---

# Package Convention

Each package should eventually follow this shape:

```text
package-name/
├── src/
│   ├── types.ts
│   ├── index.ts
│   └── *.ts
├── README.md
└── tests/
```

Rules:

```text
- types.ts defines public contracts
- index.ts exports the public API
- README.md explains the module purpose
- tests validate package behavior
```

---

# Core Rule

```text
Every folder should exist because it represents a real system, future system, artifact category, or UI layer.
```

No meaningless structure. Empty scaffolds are allowed only when they document planned architecture.
