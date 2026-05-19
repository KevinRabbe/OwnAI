# OwnAI Architecture Relationship Diagrams

This document maps the major OwnAI systems and their relationship cardinalities.

It is intended as a high-level overview so agents and humans can understand how systems connect without loading every detailed document.

## Core Principle

```text
Understand the system graph before adding new nodes.
```

This supports:

```text
- anti-duplication
- source-of-truth discipline
- dependency-aware autonomy
- future parallel work
- safer worker coordination
```

---

# Relationship Legend

```text
1 → 1
one system owns or produces one primary related artifact

1 → N
one system produces or controls many related artifacts/workers/events

N → 1
many systems report into one shared system/source of truth

N ↔ N
many systems interact through structured records, events, or artifacts
```

---

# High-Level System Graph

```mermaid
flowchart TD
    User[Human Operator]
    Agents[Agents / Workers]
    Governance[Governance]
    TaskPacket[Task Packet Generator]
    Context[Context Protocol]
    TaskState[Durable Task State]
    Events[Event Bus]
    Validation[Validation Gates]
    Observability[Observability Timeline]
    Replay[Replay Store]
    Trust[Trust Registry]
    Flags[Workflow Flags]
    Handoff[Human Handoff]
    Actions[Permission / Action Authority]
    Docs[Document Registry]
    Parking[Roadmap Idea Parking Lot]

    User -->|creates intent| TaskPacket
    User -->|approves high-risk actions| Actions
    User -->|resolves handoff| Handoff

    Agents -->|read first| Docs
    Agents -->|execute scoped work| TaskState
    Agents -->|create artifacts| TaskPacket
    Agents -->|create/use context| Context
    Agents -->|raise flags| Flags
    Agents -->|emit events| Events

    Governance -->|allows/blocks| TaskState
    Governance -->|controls| Actions
    Governance -->|requires validation| Validation
    Governance -->|creates/escalates| Flags

    TaskPacket -->|feeds| Context
    TaskPacket -->|attached to| TaskState
    Context -->|attached to| TaskState
    Validation -->|evidence for| TaskState
    Validation -->|evidence for| Trust
    Replay -->|lessons for| Context
    Replay -->|evidence for| Trust
    Trust -->|routing/reliability signal| Agents

    Events -->|recorded by| Observability
    TaskState -->|state changes emit| Events
    Flags -->|flag lifecycle emits| Events
    Handoff -->|handoff lifecycle emits| Events
    Actions -->|action lifecycle emits| Events

    Docs -->|source-of-truth check| Agents
    Parking -->|future ideas only| Docs
```

---

# Core Cardinality Map

| Relationship | Cardinality | Meaning |
|---|---:|---|
| Human Operator → Task Packets | 1 → N | One human can create many task intents over time. |
| Task Packet → Context Pack | 1 → 1 / 1 → N | A task usually has one active context pack, but may create multiple versions. |
| Task → Task State | 1 → 1 | Each task has one durable state record. |
| Task State → Events | 1 → N | One task state emits many lifecycle events. |
| Event Bus → Observability Timeline | N → 1 | Many events are recorded into one timeline stream. |
| Task → Validation Results | 1 → N | One task may require many validation results. |
| Validation Results → Acceptance Decision | N → 1 | Many validation records inform one acceptance decision. |
| Task → Replay Entries | 1 → N | A task may produce replay entries for success, failure, or partial learning. |
| Replay Entries → Trust Record | N → 1 | Many replay outcomes may update one trust record. |
| Models / Skills / Workflows → Trust Registry | N → 1 | Many actors report reliability into one trust system. |
| Agents / Workers → Artifacts | N → N | Many workers create and consume many artifacts. |
| Flags → Task State | N → 1 | Many flags may block or annotate one task state. |
| Task State → Flags | 1 → N | One task may own many open/closed flags. |
| Flags → Human Handoff | N → 1 | Multiple flags may require one human handoff decision. |
| Action Intents → Approval Gate | N → 1 | Many action intents may pass through one permission model. |
| Docs → Agents | 1 → N | One registry guides many agents. |
| Ideas → Parking Lot | N → 1 | Many future ideas go into one controlled parking lot. |

---

# 1 → 1 Relationships

These relationships should stay simple and stable.

```mermaid
erDiagram
    TASK ||--|| TASK_STATE : owns
    ACTION_INTENT ||--|| ACTION_EVIDENCE : produces_when_executed
    GOVERNANCE_DECISION ||--|| DECISION_RECORD : records
    DOCUMENT ||--|| REGISTRY_ENTRY : indexed_by
```

Examples:

```text
Task → TaskState
ActionIntent → ActionEvidence after execution
Document → Registry entry
```

Risk if broken:

```text
unclear ownership
multiple competing state records
hard-to-debug acceptance state
```

---

# 1 → N Relationships

One source creates or governs many records.

```mermaid
erDiagram
    TASK ||--o{ EVENTS : emits
    TASK ||--o{ VALIDATION_RESULTS : requires
    TASK ||--o{ FLAGS : may_raise
    TASK ||--o{ REPLAY_ENTRIES : produces
    TASK_PACKET ||--o{ CONTEXT_PACK_VERSIONS : may_generate
    GOVERNANCE ||--o{ BLOCKS : may_create
    HUMAN_OPERATOR ||--o{ APPROVALS : grants
    DOCUMENT_REGISTRY ||--o{ DOCUMENT_ENTRIES : indexes
```

Examples:

```text
Task → many events
Task → many validations
Task → many flags
Document Registry → many document entries
```

Design rule:

```text
The one-side must be a clear owner or source of truth.
```

---

# N → 1 Relationships

Many systems report into one shared system.

```mermaid
erDiagram
    EVENTS }o--|| OBSERVABILITY_TIMELINE : recorded_in
    VALIDATION_RESULTS }o--|| TASK_ACCEPTANCE : inform
    REPLAY_ENTRIES }o--|| TRUST_RECORD : update
    WORKERS }o--|| TASK_STATE : coordinate_through
    DOCUMENTS }o--|| DOCUMENT_REGISTRY : indexed_by
    IDEAS }o--|| ROADMAP_PARKING_LOT : parked_in
```

Examples:

```text
Many events → one timeline
Many workers → one task state
Many docs → one registry
Many replay entries → one trust record
```

Risk:

```text
shared systems can become bottlenecks or noisy if inputs are unstructured
```

Protection:

```text
require structured records, owners, timestamps, and evidence links
```

---

# N ↔ N Relationships

These are powerful but dangerous. They need contracts.

```mermaid
flowchart LR
    Workers[Many Workers]
    Artifacts[Many Artifacts]
    Models[Many Models]
    Skills[Many Skills]
    Tasks[Many Tasks]
    Flags[Many Flags]
    Trust[Trust Registry]
    Replay[Replay Store]

    Workers <-->|create/read| Artifacts
    Models <-->|selected for| Tasks
    Skills <-->|invoked by| Tasks
    Flags <-->|block/annotate| Tasks
    Replay <-->|learns from / informs| Tasks
    Trust <-->|updates / routes| Models
    Trust <-->|updates / routes| Skills
```

Examples:

```text
Workers ↔ Artifacts
Tasks ↔ Flags
Models ↔ Trust
Skills ↔ Trust
Replay ↔ Tasks
```

Design rule:

```text
N ↔ N relationships must go through structured artifacts, events, or registries.
Never through uncontrolled conversation.
```

---

# Task Lifecycle Relationship Diagram

```mermaid
sequenceDiagram
    participant U as Human/User
    participant TPG as Task Packet Generator
    participant CP as Context Protocol
    participant TS as Task State
    participant V as Validation Gates
    participant R as Replay Store
    participant TR as Trust Registry
    participant O as Observability
    participant G as Governance

    U->>TPG: rough intent
    TPG->>TS: create TaskPacket reference
    TPG->>CP: request ContextPack
    CP->>TS: attach ContextPack reference
    TS->>O: TASK_STATE_CHANGED
    G->>TS: scope/permission decision
    V->>TS: validation result
    V->>O: VALIDATION_COMPLETED
    R->>TS: replay entry reference
    R->>TR: update evidence signal
    TR->>O: TRUST_UPDATED
    G->>TS: allow/block acceptance
    TS->>O: TASK_COMPLETED or TASK_BLOCKED
```

---

# Worker Communication Relationship Diagram

```mermaid
flowchart TD
    Coordinator[Coordinator]
    WorkerA[Worker A]
    WorkerB[Worker B]
    State[Shared Task State]
    Events[Event Bus]
    Artifacts[Artifacts]
    Flags[Workflow Flags]
    Handoff[Human Handoff]
    Obs[Observability]

    WorkerA -->|reads/writes scoped state| State
    WorkerB -->|reads/writes scoped state| State
    WorkerA -->|creates| Artifacts
    WorkerB -->|creates| Artifacts
    WorkerA -->|emits| Events
    WorkerB -->|emits| Events
    Events -->|recorded in| Obs
    WorkerA -->|flags blocker| Flags
    Flags -->|may require| Coordinator
    Flags -->|may require| Handoff
    Coordinator -->|assigns safe work| WorkerB
```

Core rule:

```text
Workers communicate through state, artifacts, events, and flags.
Direct conversation is last resort.
```

---

# Governance / Validation / Observability Split

```mermaid
flowchart LR
    Model[Model / Worker]
    Governance[Governance = Law]
    Validation[Validation = Evidence]
    Observability[Observability = Witness]
    Replay[Replay = Memory]
    Trust[Trust = Reputation]
    Human[Human = Final Authority]

    Model -->|proposes / executes scoped work| Validation
    Validation -->|evidence| Governance
    Governance -->|allows / blocks| Model
    Governance -->|requires review| Human
    Validation -->|results| Observability
    Governance -->|decisions| Observability
    Observability -->|history| Replay
    Replay -->|outcomes| Trust
    Trust -->|reliability signals| Governance
```

Core rule:

```text
The model must not be judge, witness, and executor at the same time.
```

---

# Permission / Action Authority Relationships

```mermaid
erDiagram
    TASK ||--o{ ACTION_INTENTS : may_request
    ACTION_INTENT ||--o{ APPROVAL_GATES : passes_through
    APPROVAL_GATE ||--|| ACTION_DECISION : creates
    ACTION_INTENT ||--o| ACTION_EVIDENCE : produces_if_executed
    HUMAN_OPERATOR ||--o{ ACTION_DECISIONS : approves_or_rejects
    GOVERNANCE ||--o{ ACTION_DECISIONS : blocks_or_allows
```

Examples:

```text
Task → many action intents
ActionIntent → approval gate
Human/Governance → action decision
Executed action → action evidence
```

Core rule:

```text
OwnAI can prepare and assist.
OwnAI needs permission to act.
```

---

# Documentation Relationship Diagram

```mermaid
flowchart TD
    Registry[DOCUMENT_REGISTRY.md]
    Agents[Agents / Humans]
    ActiveDocs[Active Docs]
    RefDocs[Reference Docs]
    Parking[Parking Lot]
    Archive[Archive]
    Issues[GitHub Issues]

    Agents -->|start here| Registry
    Registry -->|points to| ActiveDocs
    Registry -->|points to| RefDocs
    Registry -->|points to| Parking
    Registry -->|may point to| Archive
    ActiveDocs -->|define scope for| Issues
    Parking -->|future ideas only| Issues
```

Core rule:

```text
Registry first.
Expand details only when needed.
```

---

# Most Important N ↔ N Risk Zones

These relationships require strong contracts because they can become spaghetti:

| Risk Zone | Why Dangerous | Required Protection |
|---|---|---|
| Workers ↔ Workers | Can become endless chat | Use flags/artifacts, not conversation |
| Workers ↔ Artifacts | Ownership conflicts | Each artifact has owner and schema |
| Tasks ↔ Flags | Flags can become noise | Lifecycle and acceptance rules |
| Models ↔ Trust | Self-trust risk | Trust updates only from evidence |
| Skills ↔ Trust | High reuse may hide failures | Count success/failure and validation |
| Docs ↔ Docs | Conflicting source of truth | Registry and anti-duplication protocol |
| Roadmaps ↔ Ideas | Scope creep | Parking lot and active roadmap priority |
| Actions ↔ Permissions | External-world risk | Approval gates and action evidence |

---

# Current Roadmap 01 Relationship Boundaries

Roadmap 01 should implement or preserve only foundational relationships:

```text
Task → TaskState
Task → TaskPacket
Task → ContextPack
Task → ValidationResult
Task → ReplayEntry
Task → TrustRecord
Task → Observability events
Task → Flags if needed
```

Roadmap 01 should not yet implement:

```text
full multi-agent orchestration
full browser automation
full permission/action automation
advanced model routing
parallel execution scheduler
adaptive governance engine
```

---

# Core Rule

```text
Every connection should have a direction, owner, artifact, and validation path.
```
