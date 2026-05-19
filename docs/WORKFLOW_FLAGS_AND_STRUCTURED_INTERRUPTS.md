# OwnAI Workflow Flags & Structured Interrupts

Workflow flags are structured signals used by workers, validators, governance, and runtime systems to indicate risk, blockers, missing input, or required review.

Flags replace noisy worker chatter.

## Core Principle

```text
Flags are structured interrupts.
They replace uncontrolled conversation.
```

A worker should not start a broad discussion when it is blocked.

It should flag the exact issue that prevents its assigned task from continuing safely.

---

# Why Flags Matter

Without structured flags, multi-worker systems create:

```text
- vague messages
- repeated questions
- unclear blockers
- hidden dependency issues
- noisy context
- full workflow pauses
- hard-to-replay decisions
```

With flags, OwnAI can:

```text
- pause only affected work
- continue independent safe work
- route to the right owner
- record evidence
- support human handoff
- support replay learning
- keep observability clean
```

---

# Flag Philosophy

A flag is not a conversation.

A flag is a precise operational signal:

```text
what happened
where it happened
what is blocked
who owns it
what evidence exists
what response is required
what can continue safely
```

---

# Flag Levels

## info

Useful note. No block.

Example:

```text
Repo scanner found no tests for package X.
```

---

## warning

Risk detected, but work may continue.

Example:

```text
Context pack includes inferred target files.
```

---

## blocked

Current task or subtask cannot continue.

Example:

```text
Validation worker cannot run tests because test command is missing.
```

---

## security_review_required

Security-sensitive issue requires review.

Example:

```text
Patch touches command execution.
```

---

## human_required

Human/operator decision required.

Example:

```text
Merge approval required.
```

---

## dead_letter

Unrecoverable or corrupted state must be isolated.

Example:

```text
Task state cannot be parsed.
```

---

# Flag Record Shape

Example:

```json
{
  "flagId": "flag_001",
  "taskId": "task_123",
  "createdBy": "context-worker",
  "level": "blocked",
  "category": "missing_required_input",
  "summary": "Context pack cannot be finalized because target files are unknown.",
  "blockedScope": ["context_pack_finalization"],
  "safeToContinue": ["draft_context_pack_metadata", "repo_scan"],
  "requiredResponse": "provide_target_files_or_allow_scanner_discovery",
  "owner": "coordinator",
  "evidence": ["task_packet_001"],
  "createdAt": "2026-05-18T00:00:00Z",
  "status": "open"
}
```

---

# Required Fields

Each flag should include:

```text
- flag id
- task id
- creator
- level
- category
- summary
- blocked scope
- safe to continue list
- required response
- owner
- evidence links
- status
- timestamp
```

---

# Flag Status

Suggested statuses:

```text
open
acknowledged
in_review
resolved
rejected
escalated
closed
```

---

# Flag Categories

Common categories:

```text
missing_required_input
blocked_dependency
ambiguous_validation
security_risk
permission_required
human_approval_required
corrupted_artifact
conflicting_evidence
resource_limit
scope_violation
circuit_breaker_triggered
dead_letter_created
```

---

# Flag Handling Flow

```text
worker detects issue
→ reads state/artifacts first
→ creates flag
→ emits FLAG_CREATED event
→ updates task state if blocked
→ owner responds or escalates
→ affected node pauses if needed
→ independent safe work continues
→ flag is resolved or escalated
→ replay stores outcome
```

---

# Scope Rules

A flag should block only its declared scope.

Example:

```text
blockedScope: ["context_pack_finalization"]
```

This should not automatically block:

```text
repo_scan
docs_update
review_report_draft
unrelated validation
```

Core rule:

```text
Flags pause affected nodes, not the whole system.
```

---

# Ownership Rules

Each flag needs an owner.

Examples:

```text
missing input → coordinator
security risk → security worker / governance
permission request → human operator / governance
corrupted state → recovery worker
validation ambiguity → validation worker
scope violation → governance
```

---

# Escalation Rules

A flag may escalate when:

```text
- no owner responds
- required decision is high-risk
- security risk is detected
- human approval is required
- repeated attempts fail
- conflicting evidence exists
```

Escalation path:

```text
worker
→ coordinator
→ specialist worker
→ governance
→ human operator
```

---

# Integration With Help Requests

A HelpRequest is a specific type of flag.

Difference:

```text
Flag
→ any structured interrupt

HelpRequest
→ flag that requires another worker, coordinator, governance, or human to respond
```

---

# Integration With Dependency-Aware Autonomy

Flags support dependency-aware autonomy by identifying:

```text
- blocked node
- dependent nodes
- independent safe nodes
- resume condition
```

This allows OwnAI to work around blockers without bypassing them.

---

# Integration With Observability

Timeline should record:

```text
FLAG_CREATED
FLAG_ACKNOWLEDGED
FLAG_ESCALATED
FLAG_RESOLVED
FLAG_CLOSED
```

Observability should show:

```text
- open flags
- blocked scopes
- owners
- severity
- age
- safe continuation paths
```

---

# Integration With Governance

Governance may create or escalate flags.

Examples:

```text
scope_violation
security_review_required
human_approval_required
protected_core_change
```

Governance flags can block acceptance.

---

# Integration With Replay

Replay should learn from flags:

```text
- which blockers repeat
- which workers ask for help too often
- which task packet fields were missing
- which validation gaps caused blockers
- which safe continuation paths were useful
```

---

# Anti-Patterns

Avoid:

```text
- vague flags without blocked scope
- flags without owner
- repeated flags for the same blocker
- using flags as chat messages
- blocking the entire workflow for a local issue
- closing flags without evidence
- hiding unresolved flags in successful task reports
```

---

# Roadmap 01 Scope

Roadmap 01 does not need a full flag engine.

Kernel-compatible v0:

```text
- define FlagRecord type
- allow task state to reference open flags
- emit FLAG_CREATED event when needed
- record flags in observability timeline
- include blockedScope and safeToContinue fields
```

Advanced flag routing can come later.

---

# Core Rule

```text
A worker does not ask broadly.
A worker flags exactly what prevents its assigned task from continuing safely.
```
