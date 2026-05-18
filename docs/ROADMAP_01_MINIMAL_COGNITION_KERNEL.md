# Roadmap 01 — Minimal Cognition Kernel

This roadmap focuses only on the first executable foundation of OwnAI.

The goal is not to build every advanced system immediately.

The goal is to prove the smallest working cognition loop that demonstrates:

```text
intent → task packet → context pack → task state → validation → replay → trust → observability
```

---

# Core Principle

```text
Build the smallest real cognition loop before expanding the ecosystem.
```

No holographic UI, no large skill library, no complex self-improvement, no federated cognition, and no advanced simulation until this kernel works.

---

# Primary Goal

Create a Minimal Cognition Kernel that can:

```text
- accept a user task
- convert it into a structured task packet
- create a focused context pack
- store durable task state
- emit observable events
- run or record validation gates
- save replay evidence
- update basic trust records
- resume safely after interruption
```

---

# Non-Goals

Do not implement yet:

```text
- holographic UI
- 3D visualizations
- advanced skill evolution
- large plugin ecosystem
- federated cognition nodes
- deep simulation system
- full self-improvement loop
- large model benchmark arena
- complex autonomous queue execution
```

These systems depend on the kernel and should come later.

---

# Phase 1 — Core Contracts

## Goal

Define the shared language of OwnAI.

## Deliverables

```text
packages/core-types/
packages/core-interfaces/
packages/core-state/
packages/core-events/
```

Core contracts:

```text
Task
TaskPacket
ContextPack
Event
StateTransition
ValidationGate
ReplayEntry
TrustRecord
Observation
RecoveryPoint
```

## Acceptance Criteria

```text
- contracts compile
- contracts are documented
- no runtime-heavy logic in core contracts
- no engine dependencies in core contracts
```

---

# Phase 2 — Event Bus v0

## Goal

Make OwnAI event-driven from the beginning.

## Deliverables

```text
packages/core-events/src/InMemoryEventBus.ts
packages/core-events/src/types.ts
```

Required events:

```text
TASK_CREATED
TASK_PACKET_CREATED
CONTEXT_PACK_CREATED
TASK_STATE_CHANGED
VALIDATION_STARTED
VALIDATION_COMPLETED
REPLAY_ENTRY_CREATED
TRUST_UPDATED
OBSERVATION_RECORDED
TASK_COMPLETED
TASK_FAILED
```

## Acceptance Criteria

```text
- systems can emit events
- systems can subscribe to events
- event history can be recorded for observability
- unsubscribe works
```

---

# Phase 3 — Durable Task State v0

## Goal

Tasks must survive crashes, restarts, and disconnects.

## Deliverables

```text
packages/task-state/
```

Suggested storage:

```text
.ownai/tasks/<taskId>/state.json
```

Task state must track:

```text
- task id
- status
- current phase
- task packet id
- context pack id
- modified files
- validation status
- acceptance state
- recovery point id
- timestamps
```

## Acceptance Criteria

```text
- task state can be created
- task state can be updated
- task state can be reloaded after restart
- interrupted tasks are detected as unfinished
```

---

# Phase 4 — Task Packet Generator v0

## Goal

Turn rough user intent into a structured operational packet.

## Deliverables

```text
packages/task-packet-generator/
```

v0 packet sections:

```text
- task goal
- scope restrictions
- files to inspect if known
- validation commands
- acceptance criteria
- stop conditions
- risk/security notes
```

## Acceptance Criteria

```text
- rough request becomes structured packet
- packet can be persisted
- packet can be attached to task state
- packet includes explicit acceptance bar
```

---

# Phase 5 — Context Pack v0

## Goal

Create focused high-signal context instead of dumping history.

## Deliverables

```text
packages/context-protocol/
```

Context pack sections:

```text
- task summary
- relevant files/references
- trusted memory snippets
- constraints
- validation targets
- token budget estimate
- trust metadata
```

## Acceptance Criteria

```text
- context pack can be created from task packet
- each context item has a reason for inclusion
- context pack can be persisted
- context pack can be summarized for model use
```

---

# Phase 6 — Validation Gate v0

## Goal

Make task completion evidence-based.

## Deliverables

```text
packages/validation-gates/
```

v0 validation types:

```text
- manual_result
- command_result
- build_result
- test_result
- security_result
```

## Acceptance Criteria

```text
- validations can be registered
- validation results can be stored
- task cannot be accepted without required validation results
- failed validation emits event
```

---

# Phase 7 — Replay Store v0

## Goal

Store useful operational evidence from each task.

## Deliverables

```text
packages/replay-store/
```

Replay entry fields:

```text
- task id
- packet summary
- context pack summary
- validation outcome
- model/skill used if any
- result summary
- lessons learned
- token/cost estimate if available
```

## Acceptance Criteria

```text
- replay entry created after task completion/failure
- replay entry can be queried by task type
- replay entry links back to packet/context/validation
```

---

# Phase 8 — Trust Registry v0

## Goal

Start tracking reliability based on evidence.

## Deliverables

```text
packages/trust-registry/
```

Trust targets:

```text
- model
- skill
- workflow
- validation strategy
- context source
```

## Acceptance Criteria

```text
- trust record can be created
- trust record can be updated from validation/replay outcome
- trust starts conservative
- unvalidated success does not strongly increase trust
```

---

# Phase 9 — Plain Observability Timeline v0

## Goal

Make the kernel inspectable before building advanced UI.

## Deliverables

```text
packages/observability-layer/
```

v0 output:

```text
.ownai/observability/timeline.jsonl
```

Timeline events:

```text
- task created
- packet created
- context created
- validation started/completed
- replay saved
- trust updated
- task completed/failed
```

## Acceptance Criteria

```text
- every important action emits an observation
- timeline can be read after execution
- no fake telemetry
- observations reference real task ids/events
```

---

# Phase 10 — First Vertical Slice

## Goal

Prove the full kernel loop.

## Flow

```text
User request
→ TaskPacket created
→ ContextPack created
→ TaskState persisted
→ ValidationGate recorded
→ ReplayEntry saved
→ TrustRecord updated
→ Observability timeline written
→ Task marked completed or failed
```

## Acceptance Criteria

```text
- one command or script runs the full slice
- output files are created under .ownai/
- timeline shows the full flow
- task can be resumed if interrupted before completion
- no advanced systems required
```

---

# Suggested First Demo Task

Use a safe non-code task first:

```text
Create a task packet for a small README update,
create a context pack,
record manual validation,
save replay,
update trust,
write observability timeline.
```

Then extend to a real repo task later.

---

# Success Definition

Roadmap 01 is complete when OwnAI can run a minimal end-to-end cognition workflow with durable state and observable evidence.

```text
The kernel does not need to be smart yet.
It needs to be structured, resumable, observable, and extensible.
```

---

# Next Roadmaps After This

Only after Roadmap 01 works:

```text
Roadmap 02 — Local Model Routing & Ollama Integration
Roadmap 03 — Project Creation Flow
Roadmap 04 — Skill Factory v0
Roadmap 05 — Security Validation v0
Roadmap 06 — Recovery & Backup v0
Roadmap 07 — Operator Cockpit v0
```
