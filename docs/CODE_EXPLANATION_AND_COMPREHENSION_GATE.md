# OwnAI Code Explanation & Comprehension Gate

Passing tests is necessary, but not sufficient.

OwnAI should also require important code changes to be explainable, reviewable, and understandable.

## Core Principle

```text
If the agent cannot explain what the code does,
the code is not ready.
```

Stronger rule:

```text
If the explanation cannot be checked against the code,
the explanation is not enough.
```

---

# Why This Matters

Code can pass tests and still be low quality or unsuitable.

Examples:

```text
- tests cover only happy paths
- edge cases are not tested
- implementation is too complex
- code violates architecture boundaries
- behavior is unclear to future agents
- code works accidentally rather than intentionally
- documentation no longer matches behavior
```

OwnAI needs a comprehension gate to detect this class of failure.

---

# Responsibility Split

The same agent should not be the only judge of its own code.

Correct split:

```text
Coding Agent = author
Code Explanation Gate = comprehension check
Documentation Worker = documentation/memory updater
Validation Worker = test/build evidence
Review Worker = explanation-vs-diff check
Governance = acceptance control
```

---

# Required Code Explanation Artifact

For meaningful code changes, the coding agent should produce a structured explanation.

Example:

```json
{
  "codeExplanationId": "explain_001",
  "taskId": "task_123",
  "changedFiles": ["packages/task-state/src/store.ts"],
  "whatChanged": "Added durable task state persistence.",
  "whyChanged": "Roadmap 01 requires resumable task state.",
  "howItWorks": "Task state is serialized to .ownai/tasks/<taskId>/state.json and reloaded on resume.",
  "architectureConnections": ["TaskState -> EventBus", "TaskState -> Observability"],
  "risks": ["corrupted state file", "missing directory", "partial write during crash"],
  "validation": ["npm test", "state reload test"],
  "docsImpacted": ["CRASH_DISCONNECT_AND_RESUME_PROTOCOL.md"]
}
```

---

# Explanation Requirements

A useful explanation should answer:

```text
What changed?
Why did it change?
How does it work?
Which files changed?
Which subsystem owns it?
Which artifacts/events/schemas changed?
What could fail?
How was it validated?
Does documentation need updating?
Does this affect governance, trust, replay, validation, or permissions?
```

---

# Verification Questions

A separate review/comprehension worker should check:

```text
Does the explanation match the diff?
Does the explanation mention all important changed files?
Does it describe real behavior, not vague intent?
Does it identify risks and edge cases?
Does it mention validation evidence?
Does it identify docs/memory updates if needed?
Does it reveal hidden architecture coupling?
Does it violate the connection matrix?
Does it create a duplicate subsystem?
```

---

# Comprehension Failure Signals

The gate should flag code when:

```text
- explanation is vague
- explanation does not match diff
- changed behavior is undocumented
- risk section is empty for risky code
- validation evidence is missing
- code is complex but explanation is shallow
- the agent cannot identify ownership
- architecture connections are not declared
- docs should change but were not updated
- new artifact/schema/event lacks source-of-truth update
```

---

# Why This Finds Bugs Tests Miss

Tests usually check specific expected outputs.

The comprehension gate checks whether the implementation makes sense.

It can catch:

```text
- accidental behavior
- wrong abstraction
- hidden coupling
- missing edge cases
- unclear ownership
- unmaintainable complexity
- documentation drift
```

This means OwnAI can detect suspicious code even when tests pass.

---

# Gate Outcomes

Possible results:

```text
pass
pass_with_notes
needs_docs_update
needs_more_tests
needs_refactor
needs_review
blocked
```

---

# Acceptance Rules

A meaningful code change should not be accepted if:

```text
- tests pass but explanation is missing
- explanation does not match implementation
- changed architecture is undocumented
- risks are ignored
- ownership is unclear
- validation evidence is missing
```

---

# Integration With Documentation Workflow

This gate supports:

```text
docs/CODING_AGENT_DOCUMENTATION_WORKFLOW.md
```

If the explanation shows that operational memory changed, the Documentation Worker must update the relevant docs or create a flag.

---

# Integration With Connection Matrix

If code creates a new relationship between systems, the explanation must identify:

```text
- source
- target
- cardinality
- owner
- artifact exchanged
- validation path
- observability signal
```

If this is missing, create a flag.

---

# Integration With Flags

If the code cannot be explained or checked, create a flag:

```text
category: code_comprehension_failure
level: blocked or warning
```

Example:

```json
{
  "level": "blocked",
  "category": "code_comprehension_failure",
  "summary": "Tests pass, but explanation does not match diff in task-state persistence.",
  "blockedScope": ["branch_acceptance"],
  "requiredResponse": "Provide accurate explanation or refactor code."
}
```

---

# Integration With Trust

Trust should be affected by explanation quality.

Examples:

```text
Agent repeatedly explains code accurately
→ trust may increase

Agent repeatedly gives vague or wrong explanations
→ trust decreases

Agent writes passing tests but cannot explain risk
→ trust decreases for implementation tasks
```

---

# Roadmap 01 Scope

Roadmap 01 does not need a full automated comprehension engine.

Kernel-compatible v0:

```text
- define CodeExplanation artifact shape
- require explanation in branch acceptance checklist
- allow code_comprehension_failure flags
- record explanation check in observability
```

Advanced automatic diff-vs-explanation analysis can come later.

---

# Core Rule

```text
Tests prove observed behavior.
Explanations prove intended understanding.
Both are needed for trustworthy code.
```
