# OwnAI Voting & Decision Systems

Voting systems decide how OwnAI combines signals from models, skills, validators, replay, trust, security checks, and governance.

Voting must be designed carefully.

A bad voting system can make the whole cognition ecosystem worse, even when individual components are useful.

## Core Principle

```text
More votes do not automatically mean better decisions.
```

OwnAI should not blindly use majority voting, multi-agent consensus, or mixture-of-experts routing without trust weighting, context awareness, and validation.

---

# Main Goals

- Prevent bad majority decisions
- Prevent noisy agents from dominating decisions
- Prevent overconfident weak models from gaining authority
- Support trust-weighted decisions
- Support context-specific model/skill reliability
- Support safe routing for MoE-style systems
- Make decisions observable and reviewable
- Preserve governance override authority
- Improve decision quality over time through replay

---

# Why Voting Is Dangerous

Voting can fail when:

```text
- most voters are weak for the task
- voters share the same blind spot
- one high-quality minority vote is ignored
- stale replay dominates current evidence
- security risk is outvoted by convenience
- low-trust models vote confidently
- correlated models produce the same wrong answer
- majority vote hides uncertainty
```

A bad voting system can create false confidence.

---

# Voting Is Not Just For Agents

Voting may happen between:

```text
- models
- skills
- validators
- replay lessons
- context sources
- security checks
- routing strategies
- recovery options
- planning candidates
- patch candidates
```

Therefore voting is core infrastructure, not a UI feature.

---

# Basic Decision Inputs

A decision should consider:

```text
- vote value
- voter identity
- voter type
- confidence
- trust score
- task context
- historical reliability
- evidence quality
- risk level
- security sensitivity
- cost impact
- validation status
```

---

# Vote Record Shape

Example:

```json
{
  "voteId": "vote_001",
  "decisionId": "decision_123",
  "voterId": "security_validation_skill",
  "voterType": "skill",
  "value": "block",
  "confidence": 0.91,
  "trust": 0.87,
  "reason": "Patch touches command execution without validation.",
  "evidence": ["security_report_44"],
  "contextTags": ["security", "command_execution"]
}
```

---

# Decision Record Shape

Example:

```json
{
  "decisionId": "decision_123",
  "decisionType": "patch_acceptance",
  "result": "blocked",
  "method": "trust_weighted_veto",
  "votes": ["vote_001", "vote_002"],
  "winningReason": "Security veto overrides normal acceptance.",
  "governanceOverride": true,
  "requiresOperatorReview": true
}
```

---

# Voting Methods

## 1. Simple Majority

Use only for low-risk, low-impact decisions.

Example:

```text
choose between equivalent wording options
```

Do not use for:

```text
- security
- protected core
- acceptance decisions
- architecture-critical choices
```

---

## 2. Trust-Weighted Voting

Votes are weighted by the reliability of the voter.

Example:

```text
high-trust validator vote counts more than low-trust draft skill vote
```

Use for:

```text
- model routing
- skill selection
- context selection
- replay recommendation ranking
```

---

## 3. Context-Specific Trust Voting

Trust depends on task domain.

Example:

```text
Model A is high trust for code formatting.
Model A is low trust for architecture planning.
```

Use for:

```text
- MoE routing
- task-specific model selection
- skill invocation
```

---

## 4. Veto Voting

Certain voters can block a decision when risk is high.

Examples:

```text
security validation may veto unsafe command execution
protected core may veto governance weakening
validation gate may veto acceptance without tests
```

Use for:

```text
- security
- governance
- protected core
- destructive actions
```

---

## 5. Confidence-Gated Voting

If confidence is too low, the system does not decide automatically.

Result:

```text
needs more evidence
or
operator review required
```

Use for:

```text
- ambiguous routing
- unclear patch results
- uncertain replay lessons
```

---

## 6. Diversity-Aware Voting

Multiple votes from similar models or sources should not be treated as independent.

Example:

```text
three models from same family may share the same failure pattern
```

Use for:

```text
- multi-model review
- planning candidates
- security review
```

---

# MoE / Model Routing Voting

MoE-style routing must not be naive.

Routing should consider:

```text
- task type
- model benchmark history
- context size
- hardware limits
- token budget
- local/cloud policy
- trust score
- known weaknesses
- validation needs
```

Example:

```text
Small local model wins for simple structured task.
Cloud expert wins for architecture-risk task.
Security-sensitive task requires validation skill regardless of model preference.
```

---

# Anti-Patterns

Avoid:

```text
- majority vote for security decisions
- low-trust agents voting equally with validated systems
- votes without evidence
- hidden voting logic
- model confidence treated as truth
- correlated model votes counted as independent
- voting without validation feedback
- allowing convenience votes to override governance
```

---

# Governance Override

Governance may override voting.

Example:

```text
Five systems vote to accept patch.
Security gate detects unsafe command execution.
Governance blocks acceptance.
```

Core rule:

```text
Voting recommends.
Governance can block.
Validation proves.
```

---

# Replay Integration

Replay should evaluate decisions after outcomes.

Questions:

```text
- Was the winning vote correct?
- Did a minority vote predict the real issue?
- Did majority voting fail?
- Should a voter gain or lose trust?
- Should the decision method change for this task type?
```

---

# Trust Integration

Trust should update based on voting outcomes.

Examples:

```text
Security skill correctly blocked risky patch
→ trust increases

Model confidently voted for bad patch
→ trust decreases for that task type

Minority validator predicted failure
→ validator influence increases
```

---

# Observability Integration

The UI should show:

```text
- decision type
- voting method
- voters
- confidence
- trust weights
- vetoes
- final decision
- reason
- required review
```

Example:

```text
Decision: accept patch
Result: blocked
Reason: security veto
Votes: 4 accept, 1 block
Winning method: trust-weighted veto
Operator review: required
```

---

# Roadmap 01 Scope

Roadmap 01 should not implement advanced decision voting yet.

Roadmap 01 should define basic decision records and preserve evidence for later.

Kernel-compatible v0:

```text
- DecisionRecord type
- VoteRecord type
- trust score field
- confidence field
- reason field
- evidence links
- governance override field
```

Advanced voting methods can come later.

---

# Core Rules

```text
Never let weak consensus create false confidence.

Security and governance must be able to veto majority decisions.

Voting must be observable, evidence-based, and replay-learnable.
```
