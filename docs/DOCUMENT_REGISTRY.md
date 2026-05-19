# OwnAI Document Registry

This registry is the central index of OwnAI architecture, roadmap, and design documents.

It exists so the documentation set does not grow forever without structure.

## Core Principle

```text
Documentation should evolve like code:
versioned, reviewed, deprecated, merged, or deleted when obsolete.
```

---

# Main Goals

- List important project documents in one place
- Track document purpose and version
- Identify outdated documents
- Decide which documents should merge
- Decide which documents can be deleted later
- Prevent architecture drift across conflicting docs
- Make Roadmap 01 implementation easier to navigate

---

# Document Status Values

```text
active
reference
draft
superseded
deprecated
candidate_for_merge
candidate_for_delete
```

Definitions:

```text
active
→ current source of truth

reference
→ useful background, not primary implementation source

draft
→ idea not yet accepted

superseded
→ replaced by newer document

deprecated
→ kept temporarily but should not guide implementation

candidate_for_merge
→ should probably be merged into another document

candidate_for_delete
→ likely removable after review
```

---

# Registry Table

| Document | Version | Status | Purpose | Notes |
|---|---:|---|---|---|
| `README.md` | 0.2 | active | Project identity and high-level architecture | Should stay concise over time. |
| `docs/ROADMAP_01_MINIMAL_COGNITION_KERNEL.md` | 1.0 | active | First executable kernel roadmap | Main execution source for Roadmap 01. |
| `docs/ROADMAP_IDEA_PARKING_LOT.md` | 1.0 | active | Stores good ideas without polluting active roadmap | Review periodically. |
| `docs/TASK_PACKET_GENERATOR.md` | 1.0 | active | Task packet concept and structure | Supports Roadmap 01 Phase 4. |
| `docs/CONTEXT_PROTOCOL.md` | 1.0 | active | Context pack and context management rules | Supports Roadmap 01 Phase 5. |
| `docs/CRASH_DISCONNECT_AND_RESUME_PROTOCOL.md` | 1.0 | active | Resumable task state and interruption handling | Supports durable task state. |
| `docs/RUNTIME_HEARTBEAT_AND_HEALTH_PULSE.md` | 1.0 | active | Real heartbeat and future UI pulse telemetry | Supports issue #11. |
| `docs/SYSTEM_PRIMITIVES_FOR_COGNITION_INFRASTRUCTURE.md` | 1.0 | reference | Design primitives from systems thinking | Keep as design reference, not direct roadmap expansion. |
| `docs/MODEL_COGNITIVE_LOAD_REDUCTION.md` | 1.0 | active | Reducing unnecessary model thinking | Core strategic architecture principle. |
| `docs/REUSABLE_CAPABILITY_METRICS.md` | 1.0 | active | Tracking reuse value and saved model work | Future benchmark support. |
| `docs/LONGITUDINAL_BENCHMARK_REGRESSION_TRACKING.md` | 1.0 | active | Detects version regressions over time | Future benchmark support. |
| `docs/EXECUTABLE_SKILL_SCRIPTS.md` | 1.0 | active | Reusable skill scripts generated once and reused | Supports Skill Factory later. |
| `docs/VOTING_AND_DECISION_SYSTEMS.md` | 1.0 | reference | Decision and voting design rules | Roadmap 01 should only define records, not full voting. |
| `docs/CODE_QUALITY_AND_SECURITY_GUARDRAILS.md` | 1.0 | active | Human-readable secure code standards | Supports safe coding workflows. |
| `docs/AI_CODE_SECURITY_RISK_MITIGATION.md` | 1.0 | active | Reducing AI-generated security risks | Security foundation. |
| `docs/SECURITY_VALIDATION_LAYER.md` | 1.0 | active | Security scanning and targeted validation | Later implementation layer. |
| `docs/SECURITY_EVIDENCE_AND_LEARNING_LOOP.md` | 1.0 | active | Security evidence becomes replay learning | Later implementation layer. |
| `docs/COMPOSABLE_SECURITY_SKILLS.md` | 1.0 | reference | Security as composable skills | Useful later, not Roadmap 01 core. |

---

# Maintenance Rules

## Rule 1 — One Source Of Truth Per Topic

If two documents define the same thing differently, choose one source of truth and mark the other as:

```text
candidate_for_merge
```

or:

```text
superseded
```

---

## Rule 2 — Roadmap Docs Override Brainstorm Docs

For implementation, roadmap documents override brainstorm/reference documents.

Example:

```text
Roadmap 01 says no advanced multi-agent systems.
A reference doc mentions multi-agent ideas.
Roadmap 01 wins.
```

---

## Rule 3 — Active Docs Need Version Bumps

When a document changes implementation meaning, bump its version.

Example:

```text
1.0 → 1.1 for clarification
1.0 → 2.0 for major change
```

---

## Rule 4 — Outdated Docs Should Be Merged Or Deleted

A document should not remain active if it no longer reflects the architecture.

Possible actions:

```text
merge into README
merge into roadmap
mark superseded
mark deprecated
delete after review
```

---

## Rule 5 — Registry Must Be Updated With New Docs

Every new architecture or roadmap document should be added here.

---

# Review Cadence

Suggested review cadence:

```text
after each roadmap phase
before each major version bump
before deleting documents
before merging roadmap branches
```

---

# Future Improvements

Later, OwnAI may generate this registry automatically by scanning docs metadata.

Possible future front matter:

```yaml
ownai_doc:
  version: 1.0
  status: active
  owner: architecture
  last_reviewed: 2026-05-18
  supersedes: []
```

---

# Core Rule

```text
Documentation is operational memory.
Operational memory must be maintained or it becomes noise.
```
