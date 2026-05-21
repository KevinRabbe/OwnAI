# OwnAI Relationship Analysis & Causal Context

This document defines a general OwnAI capability for understanding relationships across large, complex contexts.

This is not a trading-bot concept.

Bitcoin/markets are only useful as a mental example because they contain many interacting signals.

The real OwnAI goal is broader:

```text
understand relationships, dependencies, causes, contradictions, scenarios, and confidence across complex systems
```

## Core Principle

```text
OwnAI should not only collect facts.
It should map relationships, conflicts, causes, scenarios, and confidence.
```

---

# Why This Matters

Large contexts are hard because the important thing is often not a single fact.

The important thing is the relationship between facts.

Examples:

```text
file A changed
→ test B failed
→ doc C is stale
→ subsystem D owns the behavior
→ package E depends on it
→ security gate F is now required
```

A weak system sees isolated items.

A stronger system sees:

```text
Zusammenhänge
```

This capability should help OwnAI reason over:

```text
- large repositories
- architecture decisions
- security risk
- validation evidence
- agent behavior
- market-style multi-signal domains
- debugging
- planning
- source-of-truth conflicts
```

---

# Not A Prediction Engine

This system should not claim to predict complex domains perfectly.

It should not be framed as:

```text
predict Bitcoin
predict markets
predict every bug
predict every exploit
```

Better framing:

```text
map relevant signals
identify relationships
find contradictions
build scenarios
state confidence
track outcomes
learn from replay
```

Core rule:

```text
Reasoning support, not prophecy.
```

---

# General Pattern

The relationship analysis flow:

```text
1. collect signals
2. normalize signals
3. identify entities
4. map relationships
5. detect conflicts
6. build possible explanations/scenarios
7. assign confidence
8. identify missing evidence
9. recommend next inspection
10. replay outcome later
```

---

# Codebase Example

For large repo understanding, signals may include:

```text
- changed files
- imports
- exports
- symbols
- tests
- failing tests
- source-of-truth docs
- ownership records
- package boundaries
- runtime events
- validation results
- security findings
- immune findings
- replay history
```

Relationship examples:

```text
file imports file
symbol is defined in file
symbol is referenced by test
test validates behavior
subsystem owns artifact
package depends on package
doc defines source of truth
change affects protected core
security finding blocks acceptance
```

Useful question:

```text
What connects to what, and why does it matter?
```

---

# Market Example As Analogy Only

Bitcoin can be used as a mental model because it has many interacting signals:

```text
price
liquidity
interest rates
ETF flows
exchange reserves
miner behavior
leverage/funding rates
liquidation zones
sentiment
macro risk-on/risk-off
```

The point is not trading automation.

The point is multi-signal relationship reasoning.

Repo equivalent:

```text
BTC price
→ visible outcome

ETF flows / liquidity / leverage
→ hidden drivers

support / liquidation zones
→ risk zones

on-chain behavior
→ underlying state
```

Codebase equivalent:

```text
failing test
→ visible outcome

imports / ownership / recent changes
→ hidden drivers

protected core / permissions / security findings
→ risk zones

runtime traces / event logs
→ underlying state
```

---

# Relationship Types

OwnAI should support different relationship categories.

```text
depends_on
causes_or_contributes_to
blocks
enables
validates
contradicts
owns
implements
derives_from
is_evidence_for
is_risk_for
is_duplicate_or_overlap_of
is_changed_by
is_used_by
is_source_of_truth_for
```

Each relationship should be evidence-linked where possible.

---

# Relationship Record

Example:

```json
{
  "relationshipId": "rel_001",
  "from": {
    "type": "file",
    "id": "packages/permission-authority/src/actions.ts"
  },
  "to": {
    "type": "test",
    "id": "packages/permission-authority/test/actions.test.ts"
  },
  "relationshipType": "validated_by",
  "confidence": 0.78,
  "evidenceLinks": [
    "import_graph_edge_001",
    "test_map_record_001"
  ],
  "notes": "Test imports action helpers and covers approval behavior."
}
```

---

# Causal Context Record

A causal context is not proof of cause.

It is a structured explanation candidate.

Example:

```json
{
  "causalContextId": "cause_001",
  "topic": "permission approval test failure",
  "observedOutcome": "approval gate test failed",
  "candidateCauses": [
    {
      "cause": "ActionIntent approval status now accepts missing approval as allowed",
      "supportingEvidence": ["diff_001", "test_failure_001"],
      "contradictingEvidence": [],
      "confidence": 0.72
    }
  ],
  "missingEvidence": [
    "runtime trace of action execution"
  ],
  "recommendedNextInspection": "microscope inspect approval status branch"
}
```

Core rule:

```text
Causal context should state evidence and uncertainty.
```

---

# Scenario Record

Scenarios help reason under uncertainty.

Example:

```json
{
  "scenarioId": "scenario_001",
  "name": "safe approval path preserved",
  "conditions": [
    "approval status is explicitly required",
    "missing approval blocks execution",
    "validation test passes"
  ],
  "expectedSignals": [
    "validation_passed",
    "no exploit finding"
  ],
  "riskIfWrong": "external action may execute without approval",
  "confidence": 0.61
}
```

---

# Contradiction Detection

OwnAI should explicitly look for contradictions.

Examples:

```text
code says action is allowed
doc says approval is required
validation artifact missing
agent claims tests passed
```

Contradiction record:

```json
{
  "contradictionId": "contra_001",
  "claims": [
    "Agent says validation passed.",
    "No validation artifact exists."
  ],
  "severity": "high",
  "response": "block acceptance until evidence exists"
}
```

Contradictions should feed:

```text
- heatmap
- validation pressure
- immune findings
- workflow flags
- replay learning
```

---

# Confidence And Missing Evidence

Every relationship/cause/scenario should include confidence.

Confidence should depend on:

```text
- evidence strength
- source reliability
- graph support
- test support
- runtime support
- contradiction count
- missing context
- freshness
```

Avoid fake certainty.

Core rule:

```text
The system should know when it does not know enough.
```

---

# Integration With Repo Understanding

This document extends:

```text
docs/REPO_UNDERSTANDING_AND_CONTEXT_ENGINEERING.md
```

Repo understanding provides:

```text
chunks
symbols
imports
tests
ownership
change history
heatmap records
```

Relationship analysis turns those into:

```text
relationships
candidate causes
contradictions
scenarios
confidence
next inspection targets
```

---

# Integration With Heatmap

Relationship analysis should produce heatmap signals.

Examples:

```text
high_relationship_uncertainty
critical_dependency_chain
contradiction_detected
missing_evidence_for_claim
high_risk_causal_path
scenario_requires_validation
```

A region should become hotter when:

```text
many important things depend on it
relationships are uncertain
contradictions exist
risk is high if the hypothesis is wrong
```

---

# Integration With Microscope/Telescope

Telescope view:

```text
shows broad relationship zones and dependency clusters
```

Microscope view:

```text
shows exact local relationship evidence
```

Example:

```text
Telescope sees permission system connected to action execution, validation, and governance.
Microscope inspects exact approval branch and related test.
```

---

# Integration With Replay

Replay should track whether relationship analysis helped.

Questions:

```text
Was the predicted relationship useful?
Was the candidate cause correct?
Was a contradiction real or false positive?
Did the selected context solve the task?
Did the scenario happen later?
```

Replay can improve future relationship mapping by storing:

```text
- useful relationship patterns
- false causal assumptions
- common missing evidence
- high-value signal combinations
- task types that need deeper graph context
```

---

# Integration With Replaceable Subsystems

Relationship analysis must follow:

```text
docs/REPLACEABLE_SELF_IMPROVING_SUBSYSTEMS.md
```

Provider examples:

```text
relationship_mapper_simple_v0
relationship_mapper_graph_v1
causal_context_builder_v0
contradiction_detector_v0
scenario_builder_v0
```

Stable outputs:

```text
RelationshipRecord
CausalContextRecord
ScenarioRecord
ContradictionRecord
```

Internals may improve later.

---

# Roadmap 01 Boundary

Roadmap 01 should not implement advanced causal reasoning.

Allowed:

```text
- define relationship record shapes
- define contradiction record shape
- connect repo atlas outputs conceptually
- allow simple relationship extraction from imports/tests/docs
- record confidence and missing evidence
```

Not Roadmap 01:

```text
- full causal inference engine
- market intelligence module
- autonomous prediction system
- advanced probabilistic graph engine
- full scenario simulator
```

---

# Anti-Patterns

Avoid:

```text
- treating correlation as proof
- hiding uncertainty
- pretending scenarios are predictions
- building a trading bot from this concept
- loading more context instead of mapping relationships
- making relationship analysis non-replaceable
- letting weak evidence produce strong conclusions
```

---

# Core Rule

```text
Intelligence is not only remembering more.
It is seeing how things connect, where evidence is weak, and what should be inspected next.
```
