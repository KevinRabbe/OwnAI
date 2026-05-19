# OwnAI Cognition Separation of Powers

OwnAI must not let the same model or subsystem act as executor, validator, witness, and judge at the same time.

That is a critical failure pattern.

## Core Principle

```text
The model must not be the judge, witness, and executor at the same time.
```

If one model performs the work, validates the work, reports what happened, and decides whether the work is accepted, the system becomes fragile and untrustworthy.

---

# Why This Matters

A model can:

```text
- misunderstand the task
- hallucinate success
- miss its own mistakes
- rationalize a bad patch
- hide uncertainty behind confident language
- mark incomplete work as done
- overlook security risks
- ignore scope drift
```

If the same model also decides acceptance, there is no independent control layer.

This creates false confidence.

---

# Correct Responsibility Split

OwnAI should separate responsibilities:

```text
Governance = law
Validation = evidence
Observability = witness
Replay = memory
Trust = reputation
Model = reasoning/execution component
Human = final authority for high-risk decisions
```

---

# Role Definitions

## Model

The model may:

```text
- reason
- propose
- write code
- explain tradeoffs
- interpret ambiguous failures
- suggest next actions
```

The model should not independently certify its own success.

---

## Governance

Governance decides:

```text
- what is allowed
- what is blocked
- what requires validation
- what requires human review
- what scope boundaries apply
```

Governance is the law of the system.

---

## Validation

Validation proves:

```text
- builds passed
- tests passed
- security checks passed
- acceptance criteria were met
- outputs exist where expected
```

Validation is evidence.

---

## Observability

Observability records:

```text
- what happened
- when it happened
- which task changed state
- which validation ran
- which event was emitted
- which decision was made
```

Observability is the witness.

---

## Replay

Replay stores:

```text
- what worked
- what failed
- what was learned
- what evidence existed
- what should be reused later
```

Replay is memory.

---

## Trust

Trust tracks:

```text
- reliability of models
- reliability of skills
- reliability of workflows
- reliability of context sources
- reliability of validation strategies
```

Trust is reputation.

---

## Human Operator

The human remains final authority for high-risk actions.

Human review should be required for:

```text
- merge into main
- destructive actions
- protected core changes
- security-sensitive changes
- dependency additions
- autonomy level increases
- governance policy changes
```

---

# Dangerous Anti-Pattern

Avoid:

```text
model writes patch
model says tests probably pass
model marks task complete
model increases its own trust
model updates replay as success
model recommends merge
```

This is unacceptable.

---

# Correct Pattern

Use separated checks:

```text
model proposes patch
validation runs actual tests
observability records results
governance checks scope/security
trust updates only from evidence
replay stores outcome
human reviews high-risk merge
```

---

# Acceptance Rule

A task should not be accepted because the model says it is done.

A task should be accepted only when:

```text
- required validation passed
- acceptance criteria are met
- scope rules were respected
- security gates passed when relevant
- observability recorded the workflow
- governance allows acceptance
```

---

# Voting Integration

Voting cannot replace separation of powers.

Example:

```text
Five models vote that a patch is acceptable.
Validation fails.
Result: not accepted.
```

Core rule:

```text
Voting recommends.
Governance can block.
Validation proves.
Observability records.
```

---

# Trust Integration

Trust must not be self-assigned.

A model or skill should not increase its own trust directly.

Trust updates should come from:

```text
- validation evidence
- replay outcomes
- security results
- human review
- long-term benchmark data
```

---

# Roadmap 01 Scope

Roadmap 01 should implement the first minimal version of this separation through:

```text
- TaskState acceptance status
- ValidationGate records
- Observation records
- ReplayEntry records
- TrustRecord evidence links
- DecisionRecord / VoteRecord types if available
```

No advanced enforcement is required yet, but the records should make future enforcement possible.

---

# Core Rule

```text
No single model or subsystem should control execution, proof, memory, trust, and acceptance alone.
```

This is a foundational safety rule for OwnAI.
