# OwnAI Agent / Worker Communication Protocol

OwnAI workers, agents, skills, validators, scanners, and model calls must communicate through structured, observable, low-noise channels.

The goal is not to let agents endlessly chat with each other.

The goal is coordinated work through shared state, events, artifacts, and evidence.

## Core Principle

```text
Agents should communicate through structured state and artifacts,
not uncontrolled conversation.
```

---

# Why This Matters

Uncontrolled agent communication creates:

```text
- token waste
- duplicated reasoning
- conflicting plans
- unclear ownership
- hidden decisions
- circular debate loops
- noisy context
- untraceable outcomes
```

OwnAI should avoid chatty multi-agent chaos.

Workers should communicate by producing structured outputs that other workers can inspect, validate, and reuse.

---

# Communication Channels

OwnAI should prefer these communication channels, in order:

```text
1. Shared durable task state
2. Event bus
3. Structured artifacts
4. Observability timeline
5. Handoff records
6. Direct worker messages only when necessary
```

---

# 1. Shared Durable Task State

Primary communication channel.

Stored under:

```text
.ownai/tasks/<taskId>/state.json
```

Used for:

```text
- task status
- current phase
- blockedBy
- blocks
- safeToContinue
- assigned worker
- validation status
- acceptance state
- artifact links
- handoff state
```

Why:

```text
Every worker can read the same source of truth.
```

---

# 2. Event Bus

Used for runtime signaling.

Examples:

```text
TASK_CREATED
TASK_ASSIGNED
TASK_STATE_CHANGED
ARTIFACT_CREATED
VALIDATION_STARTED
VALIDATION_COMPLETED
WORKER_BLOCKED
HANDOFF_REQUIRED
HEARTBEAT
CIRCUIT_BREAKER_TRIPPED
DEAD_LETTER_CREATED
```

Events should be:

```text
- small
- structured
- timestamped
- linked to task ids
- observable
```

---

# 3. Structured Artifacts

Workers should communicate through artifacts.

Examples:

```text
- TaskPacket
- ContextPack
- ValidationResult
- ReplayEntry
- TrustRecord
- SecurityEvidence
- ReviewReport
- DiffSummary
- DependencyReport
- RollbackPlan
```

Artifact rule:

```text
If another worker needs the result later, write an artifact.
```

---

# 4. Observability Timeline

The timeline records what happened.

It is not the main coordination channel, but it is the witness.

Stored under:

```text
.ownai/observability/timeline.jsonl
```

Workers should not rely on reading the full timeline for normal execution unless debugging or replaying.

---

# 5. Handoff Records

When human input or another worker is needed, create a handoff record.

Example:

```json
{
  "handoffId": "handoff_001",
  "fromWorker": "security-review-worker",
  "to": "human_operator",
  "taskId": "task_123",
  "reason": "Dependency addition requires approval.",
  "blockedScope": ["dependency_install", "merge_to_main"],
  "safeToContinue": ["write tests", "prepare rollback plan"],
  "options": ["approve", "reject", "request_alternative"]
}
```

---

# 6. Direct Worker Messages

Direct worker-to-worker messages should be rare.

Allowed when:

```text
- fast clarification is needed
- artifact is too heavy for the question
- coordinator asks a targeted worker for a focused answer
```

Not allowed for:

```text
- open-ended debate
- hidden decisions
- long planning chains
- replacing artifacts
- bypassing task state
```

Direct messages should still be summarized into artifacts or observations if they affect the task.

---

# Worker Roles

Workers may include:

```text
- coordinator
- repo scanner
- context builder
- model reasoning worker
- validation worker
- security worker
- replay worker
- trust worker
- documentation worker
- recovery worker
```

Roles should be narrow.

Core rule:

```text
A worker should own one responsibility, not the whole workflow.
```

---

# Coordinator Role

The coordinator does not replace governance.

The coordinator may:

```text
- assign tasks
- inspect dependency graph
- choose safe next work
- request artifacts
- route worker outputs
- detect blocked states
```

The coordinator must not:

```text
- bypass governance
- accept work without validation
- increase trust without evidence
- hide worker disagreement
- merge high-risk work without approval
```

---

# Communication Object Types

## WorkerMessage

For rare direct messages.

```json
{
  "messageId": "msg_001",
  "fromWorker": "context-worker",
  "toWorker": "coordinator",
  "taskId": "task_123",
  "messageType": "clarification_response",
  "summary": "Context pack cannot be completed because validation target is missing.",
  "evidence": ["context_pack_draft_001"],
  "requiresAction": true
}
```

---

## ArtifactCreated

```json
{
  "eventType": "ARTIFACT_CREATED",
  "taskId": "task_123",
  "artifactId": "validation_result_001",
  "artifactType": "ValidationResult",
  "createdBy": "validation-worker",
  "path": ".ownai/validation/task_123/result.json"
}
```

---

## WorkerStatus

```json
{
  "workerId": "validation-worker-1",
  "role": "validation",
  "status": "idle",
  "currentTaskId": null,
  "lastHeartbeatAt": "2026-05-18T00:00:00Z",
  "capabilities": ["run_tests", "run_typecheck"]
}
```

---

# Communication Rules

## Rule 1 — State First

If the information affects task progress, update task state.

---

## Rule 2 — Artifact For Reuse

If the information will be reused, write an artifact.

---

## Rule 3 — Event For Runtime Notification

If another system needs to react now, emit an event.

---

## Rule 4 — Observation For Audit

If it matters later, record an observation.

---

## Rule 5 — Direct Message Last

Use direct worker messages only for narrow targeted communication.

---

# Ownership Rules

Each artifact should have an owner.

Examples:

```text
TaskPacket → task-packet-generator
ContextPack → context-protocol
ValidationResult → validation-worker
SecurityEvidence → security-worker
ReplayEntry → replay-store
TrustRecord → trust-registry
```

Only the owning subsystem should mutate its artifact.

Other workers may read it and create new derived artifacts.

---

# Conflict Handling

If workers disagree, do not hide it.

Create a DecisionRecord or ReviewReport.

Example:

```text
model worker says patch is safe
security worker says patch is risky
validation worker says tests pass

governance result:
requires human review
```

Core rule:

```text
Disagreement is evidence, not noise.
```

---

# Token Efficiency Rule

Workers should not send long raw context to each other.

Prefer:

```text
- artifact id
- summary
- evidence links
- exact file references
- structured fields
```

Avoid:

```text
- long chat transcripts
- repeated full summaries
- copied logs when path reference is enough
- duplicate context dumps
```

---

# Security Rules

Worker communication must not bypass security.

Do not pass secrets through messages unless explicitly required and protected.

Do not let untrusted workers request destructive operations directly.

Security-sensitive messages should create evidence records.

---

# Parallel Work Rules

For parallel workers:

```text
- each worker needs clear ownership
- each worker needs scoped task state
- artifacts must not be overwritten concurrently
- file write ownership must be explicit
- validation must identify which worker/branch produced output
```

Parallelism should follow:

```text
Dependency-Aware Autonomy
Parallelism Maturity & Risk Classes
Governance Maturity Model
```

---

# Roadmap 01 Scope

Roadmap 01 should not implement complex multi-agent communication.

Kernel-compatible v0:

```text
- event types
- artifact references
- task state fields
- observability records
- optional WorkerStatus type
- no direct worker chat required
```

Advanced worker coordination belongs to later roadmaps.

---

# Core Rules

```text
Agents do not need to talk endlessly.
They need to leave useful structured traces.

Shared state coordinates.
Events notify.
Artifacts preserve.
Observability witnesses.
Governance controls.
```
