# OwnAI Document Registry

This registry is the central index of OwnAI architecture, roadmap, governance, and design documents.

It exists so the documentation set does not grow forever without structure.

## Current Review State

```text
Last reviewed: 2026-05-19
Review type: architecture documentation audit
Current implementation focus: Roadmap 01 — Minimal Cognition Kernel
```

## Core Principle

```text
Documentation should evolve like code:
versioned, reviewed, deprecated, merged, archived, or deleted when obsolete.
```

---

# Main Goals

- List important project documents in one place
- Track document purpose and version
- Identify outdated documents
- Decide which documents should merge
- Decide which documents can be archived or deleted later
- Prevent architecture drift across conflicting docs
- Make Roadmap 01 implementation easier to navigate
- Help agents expand only the detail they need
- Prevent duplicate systems, duplicate docs, and duplicate issue tracks

---

# Document Status Values

```text
active
reference
draft
superseded
deprecated
candidate_for_merge
candidate_for_archive
candidate_for_delete
```

Definitions:

```text
active
→ current source of truth or active implementation support

reference
→ useful background, not primary implementation authority

draft
→ idea not yet accepted

superseded
→ replaced by newer document

deprecated
→ kept temporarily but should not guide implementation

candidate_for_merge
→ should probably be merged into another document

candidate_for_archive
→ should move to docs/archive/ after review

candidate_for_delete
→ likely removable after useful content is preserved
```

---

# Source-Of-Truth Priority

When documents conflict, use this priority order:

```text
1. AGENTS.md for agent operating behavior
2. docs/DOCUMENT_REGISTRY.md for documentation status
3. active roadmap docs for implementation scope
4. active architecture docs for subsystem rules
5. reference docs for inspiration only
6. parked ideas only when promoted by roadmap/issue
```

Roadmap documents override brainstorm/reference documents for implementation.

---

# Registry Table

## Root Documents

| Document | Version | Status | Purpose | Notes |
|---|---:|---|---|---|
| `README.md` | 0.3 | active | Project identity and high-level architecture | Should stay concise. Some detailed architecture should remain in docs, not README. |
| `AGENTS.md` | 1.0 | active | Operating guide for AI agents/coding assistants | Source of truth for how agents should read docs, validate, and avoid scope creep. |
| `CHANGELOG.md` | 0.1 | active | Trace notable architecture and implementation changes | Needs future update after Roadmap 01 implementation branches merge. |

---

## Documentation Governance

| Document | Version | Status | Purpose | Notes |
|---|---:|---|---|---|
| `docs/DOCUMENT_REGISTRY.md` | 1.4 | active | Central index of docs, status, and cleanup decisions | This file. Must be updated whenever new architecture/roadmap docs are added. |
| `docs/DOCUMENT_LIFECYCLE_AND_ARCHIVING.md` | 1.0 | active | Defines doc create/split/merge/archive/delete lifecycle | Complements this registry. |
| `docs/ANTI_DUPLICATION_AND_SOURCE_OF_TRUTH_PROTOCOL.md` | 1.0 | active | Prevents duplicate docs, systems, issues, and source-of-truth conflicts | Agents must check this before creating new architecture or implementation tracks. |
| `docs/ROADMAP_IDEA_PARKING_LOT.md` | 1.0 | active | Stores strong ideas without polluting active roadmap | Keep active as controlled idea buffer. Review periodically. |

---

## Architecture Overview Docs

| Document | Version | Status | Purpose | Notes |
|---|---:|---|---|---|
| `docs/ARCHITECTURE_RELATIONSHIP_DIAGRAMS.md` | 1.0 | active | High-level 1→1, 1→N, N→1, and N↔N relationship diagrams | Use before adding new nodes/connections. Helps prevent spaghetti architecture. |

---

## Active Roadmap 01 Execution Docs

| Document | Version | Status | Purpose | Notes |
|---|---:|---|---|---|
| `docs/ROADMAP_01_MINIMAL_COGNITION_KERNEL.md` | 1.0 | active | First executable kernel roadmap | Primary execution source for Roadmap 01. |
| `docs/TASK_PACKET_GENERATOR.md` | 1.0 | active | Task packet concept and structure | Supports Roadmap 01 Phase 4. |
| `docs/CONTEXT_PROTOCOL.md` | 1.0 | active | Context pack and context management rules | Supports Roadmap 01 Phase 5. |
| `docs/CRASH_DISCONNECT_AND_RESUME_PROTOCOL.md` | 1.0 | active | Resumable task state and interruption handling | Supports durable task state and recovery. |
| `docs/RUNTIME_HEARTBEAT_AND_HEALTH_PULSE.md` | 1.0 | active | Real heartbeat and future UI pulse telemetry | Supports issue #11. |
| `docs/AGENT_BRANCH_ACCEPTANCE_CHECKLIST.md` | 1.0 | active | Acceptance gate for AI-generated branches | Use before merging Codex/agent branches. |

---

## Kernel Safety, Governance, and Acceptance Docs

| Document | Version | Status | Purpose | Notes |
|---|---:|---|---|---|
| `docs/GOVERNANCE_MATURITY_MODEL.md` | 1.0 | active | Governance as enforceable operational control infrastructure | Key source for governance direction. |
| `docs/COGNITION_SEPARATION_OF_POWERS.md` | 1.0 | active | Ensures model is not judge, witness, and executor at once | Foundational safety rule. |
| `docs/PERMISSION_AND_ACTION_AUTHORITY_MODEL.md` | 1.0 | active | Defines permission levels, action authority, approval gates, and action evidence | Important for future browser/email/app automation. Roadmap 01 may only define records/flags. |
| `docs/VOTING_AND_DECISION_SYSTEMS.md` | 1.0 | reference | Decision and voting design rules | Roadmap 01 should only define records, not full voting. |
| `docs/WORKFLOW_FLAGS_AND_STRUCTURED_INTERRUPTS.md` | 1.0 | active | Flags as structured workflow interrupts | Supports worker communication, handoff, and observability. |
| `docs/FLAG_LIFECYCLE_AND_ACCEPTANCE_RULES.md` | 1.0 | active | Lifecycle and acceptance rules for workflow flags | Prevents completion with unresolved blocking flags. |
| `docs/AUTONOMY_WAIT_STATES_AND_HUMAN_HANDOFF.md` | 1.0 | active | Human wait states and safe work-around behavior | Supports bounded autonomy and human review. |
| `docs/DEPENDENCY_AWARE_AUTONOMY.md` | 1.0 | active | Continue independent work around blocked dependencies | Important for future scheduling and current handoff behavior. |
| `docs/PROTECTED_CORE_ARCHITECTURE.md` | 1.0 | active | Defines critical OwnAI systems that require stronger protection | Should be referenced by governance/security work. |

---

## Agent/Worker Coordination Docs

| Document | Version | Status | Purpose | Notes |
|---|---:|---|---|---|
| `docs/AGENT_WORKER_COMMUNICATION_PROTOCOL.md` | 1.0 | active | Structured state/artifact based worker communication | Prevents chatty multi-agent chaos. |
| `docs/WORKER_HELP_REQUEST_AND_ESCALATION_PROTOCOL.md` | 1.0 | active | Task-specific help requests and escalation | Complements workflow flags. |
| `docs/PARALLELISM_MATURITY_AND_RISK_CLASSES.md` | 1.0 | reference | Future parallelism levels and risk classes | Not Roadmap 01 implementation. Useful for future schedulers. |

---

## Cognitive Load, Reuse, and Benchmark Docs

| Document | Version | Status | Purpose | Notes |
|---|---:|---|---|---|
| `docs/MODEL_COGNITIVE_LOAD_REDUCTION.md` | 1.0 | active | Reducing unnecessary model thinking | Core strategic architecture principle. |
| `docs/REUSABLE_CAPABILITY_METRICS.md` | 1.0 | active | Tracking reuse value and saved model work | Future benchmark and skill ROI support. |
| `docs/LONGITUDINAL_BENCHMARK_REGRESSION_TRACKING.md` | 1.0 | active | Detects version regressions over time | Important for comparing system versions after real use. |
| `docs/EXECUTABLE_SKILL_SCRIPTS.md` | 1.0 | active | Reusable skill scripts generated once and reused many times | Supports future Skill Factory and token reduction. |

---

## Security Docs

| Document | Version | Status | Purpose | Notes |
|---|---:|---|---|---|
| `docs/CODE_QUALITY_AND_SECURITY_GUARDRAILS.md` | 1.0 | active | Human-readable secure code standards | Supports safe generated code. |
| `docs/AI_CODE_SECURITY_RISK_MITIGATION.md` | 1.0 | active | Reducing AI-generated security risks | Security foundation. |
| `docs/SECURITY_VALIDATION_LAYER.md` | 1.0 | active | Security scanning and targeted validation | Later implementation layer, but active design source. |
| `docs/SECURITY_EVIDENCE_AND_LEARNING_LOOP.md` | 1.0 | active | Security evidence becomes replay learning | Later implementation layer, but active design source. |
| `docs/COMPOSABLE_SECURITY_SKILLS.md` | 1.0 | reference | Security as composable skills | Useful later; not Roadmap 01 core. |

---

## Reference / Inspiration Docs

| Document | Version | Status | Purpose | Notes |
|---|---:|---|---|---|
| `docs/SYSTEM_PRIMITIVES_FOR_COGNITION_INFRASTRUCTURE.md` | 1.0 | reference | Design primitives from electronics, biology, and systems thinking | Keep as inspiration. Do not treat as direct implementation plan. |

---

# Audit Findings — 2026-05-19

## Not Outdated Yet

No document is currently safe to delete immediately.

Reason:

```text
Most documents are newly created architecture memory and still define either active rules or future design constraints.
```

---

## Registry Was Outdated

The registry was missing several newer documents:

```text
AGENTS.md
AGENT_BRANCH_ACCEPTANCE_CHECKLIST.md
GOVERNANCE_MATURITY_MODEL.md
COGNITION_SEPARATION_OF_POWERS.md
PERMISSION_AND_ACTION_AUTHORITY_MODEL.md
ARCHITECTURE_RELATIONSHIP_DIAGRAMS.md
AUTONOMY_WAIT_STATES_AND_HUMAN_HANDOFF.md
DEPENDENCY_AWARE_AUTONOMY.md
PARALLELISM_MATURITY_AND_RISK_CLASSES.md
AGENT_WORKER_COMMUNICATION_PROTOCOL.md
WORKER_HELP_REQUEST_AND_ESCALATION_PROTOCOL.md
WORKFLOW_FLAGS_AND_STRUCTURED_INTERRUPTS.md
FLAG_LIFECYCLE_AND_ACCEPTANCE_RULES.md
DOCUMENT_LIFECYCLE_AND_ARCHIVING.md
PROTECTED_CORE_ARCHITECTURE.md
ANTI_DUPLICATION_AND_SOURCE_OF_TRUTH_PROTOCOL.md
```

Action taken:

```text
added to registry and assigned active/reference status
```

---

## Candidate Future Merges

These documents are useful separately now, but may become merge candidates after implementation stabilizes:

```text
WORKFLOW_FLAGS_AND_STRUCTURED_INTERRUPTS.md
FLAG_LIFECYCLE_AND_ACCEPTANCE_RULES.md
WORKER_HELP_REQUEST_AND_ESCALATION_PROTOCOL.md
AGENT_WORKER_COMMUNICATION_PROTOCOL.md
```

Possible future merge target:

```text
docs/WORKER_COORDINATION_AND_INTERRUPTS.md
```

Do not merge yet. Separation is useful while concepts are still forming.

---

## Candidate Future Archives

These documents are not implementation sources for Roadmap 01 and may later move to `docs/archive/` or stay as references:

```text
SYSTEM_PRIMITIVES_FOR_COGNITION_INFRASTRUCTURE.md
PARALLELISM_MATURITY_AND_RISK_CLASSES.md
VOTING_AND_DECISION_SYSTEMS.md
COMPOSABLE_SECURITY_SKILLS.md
```

Current decision:

```text
keep as reference
```

Reason:

```text
they still provide useful design constraints for later roadmaps
```

---

## Strong Source-Of-Truth Documents

These should remain active and protected from accidental replacement:

```text
AGENTS.md
ROADMAP_01_MINIMAL_COGNITION_KERNEL.md
DOCUMENT_REGISTRY.md
ARCHITECTURE_RELATIONSHIP_DIAGRAMS.md
ANTI_DUPLICATION_AND_SOURCE_OF_TRUTH_PROTOCOL.md
GOVERNANCE_MATURITY_MODEL.md
COGNITION_SEPARATION_OF_POWERS.md
PERMISSION_AND_ACTION_AUTHORITY_MODEL.md
MODEL_COGNITIVE_LOAD_REDUCTION.md
AGENT_BRANCH_ACCEPTANCE_CHECKLIST.md
```

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

## Rule 4 — Outdated Docs Should Be Merged, Archived, Or Deleted

A document should not remain active if it no longer reflects the architecture.

Possible actions:

```text
merge into README
merge into roadmap
mark superseded
mark deprecated
move to docs/archive/
delete after review
```

---

## Rule 5 — Registry Must Be Updated With New Docs

Every new architecture or roadmap document must be added here.

---

## Rule 6 — Agents Must Use The Registry First

Agents should inspect this registry before loading detailed docs.

```text
registry first
→ expand only relevant active docs
→ ignore archived/reference docs unless needed
```

---

## Rule 7 — Do Not Redo Planned Or Documented Work

Before creating new architecture, packages, docs, or issues, check:

```text
docs/DOCUMENT_REGISTRY.md
docs/ANTI_DUPLICATION_AND_SOURCE_OF_TRUTH_PROTOCOL.md
docs/ROADMAP_IDEA_PARKING_LOT.md
existing GitHub issues
existing packages
```

If the concept already exists:

```text
extend it, reference it, or update it
```

Do not create a duplicate track.

---

# Review Cadence

Suggested review cadence:

```text
after each roadmap phase
before each major version bump
before deleting documents
before merging roadmap branches
after large agent-generated doc changes
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
  roadmap: roadmap-01
  last_reviewed: 2026-05-19
  supersedes: []
```

---

# Core Rule

```text
Documentation is operational memory.
Operational memory must be maintained or it becomes noise.
```
