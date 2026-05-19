# OwnAI Governance Maturity Model

Governance in OwnAI is not just documentation, rules, or suggestions.

Governance is operational infrastructure that decides what the system may do, what it must prove, when it must stop, and when human review is required.

## Core Principle

```text
Governance must be enforceable, observable, evidence-based, and hard to bypass.
```

A merely "solid" governance layer is not enough for OwnAI's architecture.

OwnAI needs governance that can support autonomous workflows, security-sensitive code, model routing, reusable skills, task state, validation, recovery, and long-running cognition operations.

---

# Why Strong Governance Matters

AI systems can fail through:

```text
- scope drift
- false confidence
- fake validation
- unsafe code generation
- uncontrolled retries
- token budget burn
- stale context pollution
- untrusted skill execution
- bad voting systems
- weak model routing
- hidden security regressions
```

Governance is the layer that prevents these failures from silently becoming accepted system behavior.

---

# Governance Must Control

Governance should be able to control:

```text
- task scope
- autonomy level
- model access
- tool access
- file access
- network access
- shell execution
- validation requirements
- security review requirements
- merge acceptance
- replay promotion
- skill promotion
- trust updates
- documentation source-of-truth status
```

---

# Governance Maturity Levels

## Level 0 — Advisory Governance

Rules exist only in documentation.

Example:

```text
Agent is told not to start Roadmap 02.
```

Risk:

```text
The system can ignore or forget the rule.
```

Status:

```text
acceptable only for early design notes
```

---

## Level 1 — Checklist Governance

Rules are expressed as checklists.

Example:

```text
Agent Branch Acceptance Checklist
AGENTS.md
Document Registry
```

Benefit:

```text
humans and agents have clear review structure
```

Limitation:

```text
still manually enforced
```

Status:

```text
current early-stage foundation
```

---

## Level 2 — Recorded Governance

Governance decisions are recorded as structured evidence.

Example:

```json
{
  "decisionType": "branch_acceptance",
  "result": "needs_fixes",
  "reason": "tests were not run",
  "evidence": ["validation_report_001"],
  "operatorReviewRequired": true
}
```

Benefit:

```text
decisions become replayable and auditable
```

Status:

```text
Roadmap 01 compatible
```

---

## Level 3 — Enforced Governance

Governance rules actively block unsafe actions.

Examples:

```text
- task cannot be accepted without required validation
- untrusted skill cannot write files
- security-sensitive patch requires review
- circuit breaker blocks repeated failed attempts
- dead-letter queue isolates corrupted task state
```

Benefit:

```text
rules become system behavior
```

Status:

```text
required before higher autonomy
```

---

## Level 4 — Adaptive Governance

Governance changes behavior based on trust, replay, risk, and context.

Examples:

```text
- high-risk task requires stronger validation
- low-trust model gets narrower permissions
- repeatedly successful skill gains limited autonomy
- security-sensitive task triggers veto-capable review
```

Benefit:

```text
governance becomes context-aware
```

Status:

```text
later roadmap
```

---

## Level 5 — Auditable Governance Kernel

Governance becomes a protected core subsystem.

Requirements:

```text
- versioned policies
- decision records
- override logs
- human approval records
- rollback support
- policy test suite
- protected core boundaries
- tamper-resistant evidence records where possible
```

Benefit:

```text
OwnAI can safely support more autonomy without blind trust
```

Status:

```text
long-term target
```

---

# Governance Decision Record

Every important governance decision should eventually create a record.

Example:

```json
{
  "governanceDecisionId": "gov_001",
  "taskId": "task_123",
  "decisionType": "scope_check",
  "result": "blocked",
  "reason": "Candidate branch includes Roadmap 02 model routing inside Roadmap 01 validation work.",
  "evidence": ["branch_diff_roadmap01_phases_3_10"],
  "requiredAction": "split branch or remove Roadmap 02 changes",
  "timestamp": "2026-05-18T00:00:00Z"
}
```

---

# Governance Must Be Observable

The observability layer should eventually show:

```text
- governance checks executed
- rules passed
- rules failed
- vetoes
- overrides
- required human review
- blocked actions
- policy version used
```

No hidden governance.

If governance blocks something, the system should explain why.

---

# Governance Must Be Evidence-Based

Governance should not block or allow actions based only on vibes.

It should use evidence such as:

```text
- validation result
- test result
- branch diff
- security report
- trust score
- replay outcome
- task packet scope
- document registry status
- acceptance checklist result
```

---

# Governance Must Resist Majority Failure

Voting cannot override governance for protected decisions.

Core rule:

```text
Voting recommends.
Governance can block.
Validation proves.
```

Examples:

```text
5 agents vote to accept patch.
Security gate detects risky command execution.
Governance blocks acceptance.
```

---

# Governance Must Protect Scope

Scope governance prevents the system from turning one task into many unrelated tasks.

Examples:

```text
Roadmap 01 branch must not start Roadmap 02.
Validation branch must not add new architecture features.
Bugfix task must not refactor unrelated packages.
```

---

# Governance Must Protect Trust

Trust updates should require evidence.

Avoid:

```text
- trust increases from unvalidated success
- trust increases from high reuse alone
- trust increases from model confidence alone
```

Require:

```text
- validation evidence
- successful reuse evidence
- replay outcome
- security result when relevant
```

---

# Governance Must Protect Documentation

Documentation is operational memory.

Governance should enforce:

```text
- new architecture docs update DOCUMENT_REGISTRY.md
- active roadmap overrides parked ideas
- reference docs do not become accidental implementation source
- obsolete docs are archived or marked superseded
```

---

# Governance Must Protect Human Control

OwnAI is a trusted human-AI bridge, not a replacement for human authority.

Governance should require human review for:

```text
- destructive filesystem actions
- security-sensitive code
- dependency additions
- merge into main
- autonomy level increases
- protected core changes
- policy changes
```

---

# Roadmap 01 Scope

Roadmap 01 should not build full adaptive governance.

Roadmap 01 should support governance by defining:

```text
- DecisionRecord
- VoteRecord
- ValidationGate
- TrustRecord
- Observation
- TaskState acceptance status
- branch acceptance checklist
- AGENTS.md instructions
```

Kernel-compatible v0:

```text
record governance decisions
require validation before acceptance
emit observations when governance blocks something
```

---

# Anti-Patterns

Avoid:

```text
- governance only in prompts
- hidden blocking logic
- majority vote overriding security
- accepting branches without validation
- trust changes without evidence
- agents choosing their own scope
- governance rules that are impossible to audit
- policy changes without versioning
```

---

# Core Rule

```text
OwnAI governance must not be decorative.
It must become operational control infrastructure.
```
