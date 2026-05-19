# OwnAI Worker Help Request & Escalation Protocol

Workers should not communicate constantly.

They should ask for help only when they have a real blocker, uncertainty, missing dependency, permission boundary, or risk condition.

## Core Principle

```text
Workers do not talk by default.
Workers request help when needed.
```

Unnecessary worker communication wastes tokens, creates noise, and makes coordination harder to audit.

---

# Why This Matters

Uncontrolled worker chatter creates:

```text
- token waste
- duplicated reasoning
- circular discussions
- hidden decisions
- unclear ownership
- noisy context
- slower execution
- harder debugging
```

OwnAI should prefer structured artifacts and state updates.

Direct communication should be treated as an escalation path, not normal operation.

---

# When A Worker Should Ask For Help

A worker may request help when:

```text
- required input is missing
- dependency is blocked
- task scope is unclear
- validation result is ambiguous
- security risk is detected
- required permission is unavailable
- artifact is corrupted or missing
- worker reached retry/circuit limit
- worker found conflicting evidence
- task requires human/operator decision
- another worker owns the needed artifact
```

---

# When A Worker Should Not Ask For Help

A worker should not ask for help when it can solve the problem by:

```text
- reading task state
- reading the task packet
- reading relevant artifacts
- checking the document registry
- running an allowed deterministic tool
- producing a draft artifact
- marking uncertainty in its own output
```

Core rule:

```text
Read state and artifacts before asking another worker.
```

---

# Help Request Types

## Clarification Request

Used when a task requirement is unclear.

Example:

```text
Context worker cannot build context pack because target files are unknown.
```

---

## Dependency Request

Used when another artifact or phase must complete first.

Example:

```text
Validation worker needs implementation artifact before running tests.
```

---

## Permission Request

Used when an action requires higher permission.

Example:

```text
Worker needs approval before installing dependency.
```

---

## Security Escalation

Used when security risk is detected.

Example:

```text
Patch touches shell execution and needs security review.
```

---

## Conflict Escalation

Used when workers disagree or evidence conflicts.

Example:

```text
Validation passes but security worker flags high risk.
```

---

## Human Handoff

Used when only the human/operator can decide.

Example:

```text
Merge approval required.
```

---

# Help Request Record

Example:

```json
{
  "helpRequestId": "help_001",
  "taskId": "task_123",
  "fromWorker": "context-worker",
  "to": "coordinator",
  "type": "clarification_request",
  "severity": "medium",
  "summary": "Context pack cannot be finalized because target files are unknown.",
  "evidence": ["task_packet_001"],
  "attemptedBeforeAsking": [
    "read_task_state",
    "read_task_packet",
    "searched_artifacts"
  ],
  "requestedAction": "Provide target files or allow scanner-based discovery.",
  "blocks": ["context_pack_creation"],
  "safeToContinue": ["repo_scan", "draft_context_pack"],
  "createdAt": "2026-05-18T00:00:00Z"
}
```

---

# Help Request Flow

```text
worker detects blocker
→ reads task state/artifacts first
→ creates HelpRequest artifact
→ emits HELP_REQUESTED event
→ updates task state if blocked
→ coordinator/human/owning worker responds
→ response is recorded
→ worker resumes or remains blocked
```

---

# Response Types

Possible responses:

```text
answered
approved
rejected
request_more_evidence
delegate_to_worker
human_required
blocked
cancelled
```

---

# Help Response Record

Example:

```json
{
  "helpResponseId": "response_001",
  "helpRequestId": "help_001",
  "from": "coordinator",
  "result": "answered",
  "answer": "Use scanner-based discovery and mark target files as inferred.",
  "conditions": ["do not modify files", "record inferred context reason"],
  "createdAt": "2026-05-18T00:00:30Z"
}
```

---

# Escalation Levels

## Level 0 — No Help Needed

Worker completes task independently through state/artifacts/tools.

---

## Level 1 — Coordinator Help

Worker asks coordinator for routing, ownership, or dependency clarification.

---

## Level 2 — Specialist Worker Help

Worker requests help from a specialist worker.

Examples:

```text
security worker
validation worker
docs worker
repo scanner
```

---

## Level 3 — Governance Review

Worker escalates to governance when a rule may block or constrain action.

---

## Level 4 — Human Handoff

Worker escalates to human/operator for decisions that require human authority.

---

# Anti-Spam Rules

To avoid noisy communication:

```text
- one help request per blocker
- do not repeat the same request without new evidence
- include attemptedBeforeAsking
- include evidence links
- include exact requested action
- include safeToContinue list when possible
```

If a worker repeatedly asks unclear questions, trust may decrease.

---

# Integration With Task State

Task state may record:

```text
helpRequests
blockedBy
waitingFor
safeToContinue
lastHelpRequestAt
```

---

# Integration With Observability

Timeline should record:

```text
HELP_REQUESTED
HELP_RESPONDED
HELP_ESCALATED
HUMAN_HANDOFF_CREATED
TASK_RESUMED_AFTER_HELP
```

---

# Integration With Governance

Governance may require help escalation for:

```text
- security-sensitive changes
- protected core changes
- dependency additions
- destructive actions
- merge approval
- autonomy increase
```

---

# Integration With Dependency-Aware Autonomy

When a help request blocks one node, OwnAI should still continue safe independent nodes.

Core rule:

```text
A help request blocks only what depends on the unresolved answer.
```

---

# Core Rules

```text
Workers should leave artifacts, not conversations.

Ask for help only after checking available state and artifacts.

Escalate when blocked, risky, ambiguous, or permission-limited.

Record the help request so future workers can learn from it.
```
