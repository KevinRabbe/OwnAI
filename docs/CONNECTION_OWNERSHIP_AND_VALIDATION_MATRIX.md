# OwnAI Connection Ownership & Validation Matrix

This document turns architecture relationships into reviewable connection contracts.

A connection between systems should not exist just because it is convenient.

It should have a clear direction, owner, artifact, validation path, risk class, and observability signal.

## Core Principle

```text
Every connection must justify itself.
```

This document extends:

```text
docs/ARCHITECTURE_RELATIONSHIP_DIAGRAMS.md
```

---

# Why This Matters

Large systems become spaghetti when connections are added without ownership.

Common failure patterns:

```text
- system A writes system B's data directly
- workers communicate without artifacts
- trust updates without evidence
- replay stores unclear outcomes
- governance decisions are not observable
- validation results are not linked to acceptance
- docs mention relationships that code does not respect
```

OwnAI should avoid invisible coupling.

---

# Required Connection Fields

Every important system connection should define:

```text
- source system
- target system
- cardinality
- direction
- owner
- artifact or record exchanged
- event emitted if any
- validation path
- observability signal
- risk class
- failure mode
- rollback or recovery behavior
```

---

# Connection Contract Shape

Example:

```json
{
  "connectionId": "task_to_validation_results",
  "source": "TaskState",
  "target": "ValidationGates",
  "cardinality": "1_to_many",
  "direction": "task_requests_validation_results",
  "owner": "validation-gates",
  "artifact": "ValidationResult",
  "events": ["VALIDATION_STARTED", "VALIDATION_COMPLETED"],
  "validationPath": "actual command/test/security result is recorded",
  "observability": "timeline records validation lifecycle",
  "riskClass": "medium",
  "failureMode": "task remains not accepted",
  "recovery": "rerun validation or block task with flag"
}
```

---

# Core Connection Matrix

| Connection | Cardinality | Owner | Artifact / Record | Validation Path | Risk |
|---|---:|---|---|---|---|
| User → TaskPacket | 1 → N | task-packet-generator | TaskPacket | packet has goal, scope, acceptance criteria | medium |
| TaskPacket → ContextPack | 1 → 1 / 1 → N | context-protocol | ContextPack | context items have inclusion reasons | medium |
| Task → TaskState | 1 → 1 | task-state | DurableTaskState | state persists and reloads | high |
| TaskState → EventBus | 1 → N | core-events | KernelEvent | event has task id and timestamp | medium |
| EventBus → Observability | N → 1 | observability-layer | Observation / timeline entry | timeline append succeeds | medium |
| Task → ValidationResult | 1 → N | validation-gates | ValidationResult | command/test/security evidence exists | high |
| ValidationResult → Acceptance | N → 1 | governance / validation-gates | DecisionRecord if available | required gates passed | high |
| Task → ReplayEntry | 1 → N | replay-store | ReplayEntry | outcome and evidence links exist | medium |
| ReplayEntry → TrustRecord | N → 1 | trust-registry | TrustRecord update | trust change links to evidence | high |
| Worker → Artifact | N → N | artifact owner subsystem | typed artifact | schema and owner rules pass | medium-high |
| Worker → Flag | N → N | workflow-flags | FlagRecord | blocked scope and owner exist | medium |
| Flag → TaskState | N → 1 | task-state / workflow-flags | open flag reference | completion blocked if required | high |
| ActionIntent → ApprovalGate | N → 1 | permission/action authority | ActionIntent | approval required by risk level | high |
| ApprovalGate → ActionEvidence | 1 → 0/1 | permission/action authority | ActionEvidence | action executed only after approval | critical |
| Docs → DocumentRegistry | N → 1 | documentation governance | RegistryEntry | new docs registered | medium |
| Ideas → ParkingLot | N → 1 | roadmap governance | ParkingLotEntry | future idea not active roadmap | low-medium |

---

# Ownership Rules

## Rule 1 — The Target Does Not Automatically Own The Connection

Ownership should usually belong to the subsystem responsible for the artifact.

Example:

```text
ValidationResult is owned by validation-gates,
even though TaskState references it.
```

---

## Rule 2 — Shared State Must Not Become Shared Mutation

Many workers may read task state.

Only authorized systems should mutate specific fields.

Example:

```text
validation worker may update validation status
trust worker may update trust evidence
coordinator may update assignment state
governance may update blocked/allowed decisions
```

---

## Rule 3 — N ↔ N Connections Require Extra Control

Any many-to-many relationship needs:

```text
- schemas
- ownership
- event records
- conflict handling
- observability
```

Do not allow N ↔ N communication through uncontrolled chat.

---

# Validation Rules By Connection Type

## Data Connection

Example:

```text
TaskPacket → ContextPack
```

Required:

```text
- schema valid
- references valid
- source artifact exists
- target artifact persists
```

---

## Decision Connection

Example:

```text
ValidationResult → AcceptanceDecision
```

Required:

```text
- evidence exists
- decision reason recorded
- governance allowed decision
- observability records decision
```

---

## Trust Connection

Example:

```text
ReplayEntry → TrustRecord
```

Required:

```text
- trust update links to replay or validation evidence
- trust does not self-increase
- failure outcomes can decrease trust
```

---

## Action Connection

Example:

```text
ActionIntent → ActionEvidence
```

Required:

```text
- risk level assigned
- approval requirement checked
- approval recorded if required
- action result recorded
```

---

## Worker Connection

Example:

```text
Worker → Worker via HelpRequest
```

Required:

```text
- task-specific blocker
- attemptedBeforeAsking recorded
- owner assigned
- no broad chatter
```

---

# Connection Review Checklist

Before accepting a new connection, answer:

```text
Does this connection already exist?
Which document owns the concept?
Which package owns the implementation?
What artifact crosses the boundary?
Who may mutate the artifact?
What event is emitted?
How is the connection validated?
How is it observed?
What happens if it fails?
Can it create scope creep?
Can it bypass governance?
Can it create duplicate source of truth?
```

If answers are unclear:

```text
create a flag or architecture review note
```

Do not silently add the connection.

---

# Anti-Duplication Rule

Before creating a new connection, check:

```text
docs/DOCUMENT_REGISTRY.md
docs/ANTI_DUPLICATION_AND_SOURCE_OF_TRUTH_PROTOCOL.md
docs/ARCHITECTURE_RELATIONSHIP_DIAGRAMS.md
existing packages
existing issues
```

If the connection already has an owner:

```text
extend the existing owner
```

Do not create a parallel path.

---

# Roadmap 01 Scope

Roadmap 01 should focus on these connections:

```text
Task → TaskState
Task → TaskPacket
TaskPacket → ContextPack
Task → ValidationResult
Task → ReplayEntry
ReplayEntry → TrustRecord
TaskState → EventBus
EventBus → Observability
TaskState → Flags if needed
```

Roadmap 01 should not implement uncontrolled N ↔ N worker communication.

---

# Core Rules

```text
No invisible coupling.
No ownerless artifact.
No trust update without evidence.
No acceptance without validation.
No external action without permission.
No new connection without source-of-truth check.
```
