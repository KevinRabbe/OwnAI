# OwnAI Relationship Engine & Domain Pack Architecture

This document defines the detailed architecture for the relationship-analysis stack.

It connects:

```text
1. Relationship Analysis Engine
2. Domain Intelligence Pack System
3. Bitcoin Market Context Pack
```

Important boundary:

```text
Bitcoin is not its own engine.
Bitcoin is a domain pack running on the general relationship engine.
```

---

# Core Principle

```text
Build one general reasoning engine.
Configure it with scoped domain packs.
Use Bitcoin as one complex-context test pack, not as a trading system.
```

---

# Why This Architecture Exists

OwnAI needs better ability to see:

```text
Zusammenhänge
```

That means:

```text
- what connects to what
- what depends on what
- what contradicts what
- what evidence supports a claim
- what evidence is missing
- which scenarios are plausible
- where confidence is weak
- what should be inspected next
```

This is useful for:

```text
- large repo understanding
- security analysis
- architecture decisions
- debugging
- agent behavior analysis
- package ecosystem risk
- Bitcoin market context as a complex-context example
```

---

# Stack Overview

```text
Relationship Analysis Engine
→ generic engine for relationships, contradictions, scenarios, and confidence

Domain Intelligence Pack System
→ scoped domain configuration layer

Bitcoin Market Context Pack
→ BTC-only domain pack/example
```

The engine should not know Bitcoin-specific rules directly.

The Bitcoin pack should not implement its own reasoning engine.

---

# Layer 1 — Relationship Analysis Engine

The Relationship Analysis Engine is the reusable core.

It should answer:

```text
What entities exist?
How are they connected?
Which relationships matter?
Which claims contradict each other?
What explanations/scenarios are possible?
How confident are we?
What evidence is missing?
What should be inspected next?
```

## Engine Responsibilities

```text
- accept signals/entities from context systems
- normalize entity references
- create relationship records
- create contradiction records
- build causal context candidates
- build scenario records
- assign confidence
- preserve evidence links
- identify missing evidence
- recommend next inspection target
- emit heatmap/replay signals
```

## Engine Non-Responsibilities

The engine should not:

```text
- hard-code BTC rules
- hard-code repo-specific rules
- execute trades
- make external actions
- claim predictions as certainty
- override governance
- become source-of-truth without evidence
```

---

# Relationship Engine Inputs

The engine can receive inputs from many systems:

```text
Repo Atlas
Heatmap Records
Context Packs
Validation Results
Exploit Reviews
Immune Findings
Replay Records
Source Code Reference Chunks
Domain Packs
User Questions
```

Generic input shape:

```json
{
  "analysisRequestId": "analysis_req_001",
  "questionType": "bug_fix | architecture_review | security_review | market_context_snapshot",
  "scope": {
    "domainPackId": "optional_domain_pack_id",
    "topic": "permission approval flow"
  },
  "entities": [],
  "signals": [],
  "claims": [],
  "evidence": []
}
```

---

# Relationship Engine Outputs

The engine should produce stable output records:

```text
RelationshipRecord
CausalContextRecord
ScenarioRecord
ContradictionRecord
RelationshipAnalysisReport
```

Output must be:

```text
versioned
evidence-linked
confidence-aware
provider-attributed
replayable
```

---

# RelationshipRecord

A RelationshipRecord connects two entities.

Example:

```json
{
  "schemaVersion": "1.0",
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
  "providerId": "relationship_mapper_simple_v0",
  "limitations": ["heuristic test mapping"]
}
```

---

# CausalContextRecord

A CausalContextRecord is an explanation candidate, not proof.

Example:

```json
{
  "schemaVersion": "1.0",
  "causalContextId": "cause_001",
  "topic": "permission approval test failure",
  "observedOutcome": "approval gate test failed",
  "candidateCauses": [
    {
      "cause": "Missing approval is treated as allowed in action execution branch.",
      "supportingEvidence": ["diff_001", "test_failure_001"],
      "contradictingEvidence": [],
      "confidence": 0.72
    }
  ],
  "missingEvidence": ["runtime trace of action execution"],
  "recommendedNextInspection": "microscope inspect approval status branch",
  "providerId": "causal_context_builder_v0"
}
```

Core rule:

```text
Causal context must state evidence and uncertainty.
```

---

# ScenarioRecord

A ScenarioRecord helps reason under uncertainty.

Example:

```json
{
  "schemaVersion": "1.0",
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
  "confidence": 0.61,
  "providerId": "scenario_builder_v0"
}
```

Scenarios are not predictions.

They are structured possibilities.

---

# ContradictionRecord

A ContradictionRecord identifies conflicting claims or evidence.

Example:

```json
{
  "schemaVersion": "1.0",
  "contradictionId": "contra_001",
  "claims": [
    "Agent says validation passed.",
    "No validation artifact exists."
  ],
  "severity": "high",
  "response": "block acceptance until evidence exists",
  "evidenceLinks": ["task_report_001", "validation_registry_query_001"],
  "providerId": "contradiction_detector_v0"
}
```

Contradictions should feed:

```text
- workflow flags
- heatmap
- validation pressure
- immune findings
- replay learning
```

---

# RelationshipAnalysisReport

A report bundles the engine outputs for one question/task.

Example:

```json
{
  "schemaVersion": "1.0",
  "relationshipAnalysisReportId": "rel_report_001",
  "taskId": "task_123",
  "questionType": "architecture_review",
  "domainPackId": null,
  "relationships": ["rel_001", "rel_002"],
  "causalContexts": ["cause_001"],
  "scenarios": ["scenario_001"],
  "contradictions": ["contra_001"],
  "confidence": 0.68,
  "missingEvidence": [
    "No runtime trace available.",
    "No direct test mapping for approval timeout behavior."
  ],
  "recommendedNextInspection": "inspect permission-authority package under Risk Lens",
  "providerId": "relationship_analysis_engine_v0"
}
```

---

# Layer 2 — Domain Intelligence Pack System

A Domain Intelligence Pack configures the Relationship Analysis Engine for one domain.

It should define:

```text
- domain scope
- allowed use
- disallowed use
- entity types
- signal categories
- relationship categories
- contradiction patterns
- scenario templates
- confidence rules
- missing-data rules
- replay targets
```

The pack narrows context.

It does not execute actions.

---

# Domain Pack Responsibilities

A domain pack should:

```text
- explain which signals matter in the domain
- define useful relationship types
- define common contradiction patterns
- define scenario templates
- define missing-data rules
- define confidence downgrade rules
- define excluded scope
```

A domain pack should not:

```text
- execute actions
- bypass permissions
- become source-of-truth for unrelated domains
- expand into multiple domains silently
- make guaranteed predictions
```

---

# DomainPackRecord

Example:

```json
{
  "schemaVersion": "1.0",
  "domainPackId": "domain_pack_bitcoin_market_context",
  "name": "Bitcoin Market Context Pack",
  "domain": "bitcoin_market_context",
  "status": "active_reference",
  "scope": {
    "assets": ["BTC"],
    "excludedAssets": ["ETH", "SOL", "altcoins"],
    "allowedUse": [
      "context understanding",
      "signal relationship mapping",
      "scenario reasoning",
      "missing data identification"
    ],
    "disallowedUse": [
      "automatic trading",
      "financial advice",
      "guaranteed prediction",
      "multi-coin generalization"
    ]
  },
  "providerId": "domain_pack_loader_v0"
}
```

---

# Domain Pack Boundary Rule

```text
A domain pack narrows context.
It must not expand scope into uncontrolled prediction or automation.
```

This is important because domain packs can become powerful.

Strong boundaries prevent scope creep.

---

# Layer 3 — Bitcoin Market Context Pack

The Bitcoin Market Context Pack is the first concrete domain pack.

It is scoped to:

```text
BTC only
context understanding only
reasoning support only
```

It excludes:

```text
ETH
SOL
altcoins
memecoins
automatic trading
financial advice automation
multi-coin prediction
```

---

# Bitcoin Pack Responsibilities

The Bitcoin pack defines BTC-specific signals:

```text
price structure
liquidity and macro context
spot demand
leverage and derivatives
on-chain context
sentiment and narrative
```

It defines relationship examples:

```text
ETF inflows → supports spot demand
high funding + rising open interest → increases leverage flush risk
exchange reserves falling → may reduce sell-side supply
DXY rising + risk-off macro → may pressure BTC
```

It defines scenarios:

```text
bull continuation
leverage flush
range / chop
macro-led risk-off
```

It must always state missing data.

Core rule:

```text
No high-confidence BTC analysis with critical missing data.
```

---

# Bitcoin Pack Non-Responsibilities

The Bitcoin pack must not:

```text
- execute trades
- recommend financial actions as authority
- connect to exchanges for execution
- manage wallets
- automate leverage
- generalize to altcoins
- pretend scenarios are guaranteed predictions
```

---

# Engine/Pack Interaction

```text
User question
→ Relationship Analysis Engine receives request
→ optional Domain Pack is loaded
→ pack defines domain signals/relationships/scenarios
→ engine maps relationships and contradictions
→ engine outputs report with confidence and missing data
→ replay later evaluates usefulness
```

Example:

```text
Question: What is the BTC context right now?
→ load Bitcoin Market Context Pack
→ collect BTC-only signals
→ map relationships
→ detect contradictions
→ build scenarios
→ state missing data
→ output analysis report
```

Example for repo:

```text
Question: Why did this test fail?
→ no Bitcoin pack
→ use Repo Atlas + Relationship Engine
→ map file/test/symbol relationships
→ detect contradiction/missing evidence
→ output analysis report
```

---

# Provider Model

This stack must follow:

```text
docs/REPLACEABLE_SELF_IMPROVING_SUBSYSTEMS.md
```

Provider examples:

```text
relationship_analysis_engine_v0
relationship_mapper_simple_v0
contradiction_detector_v0
scenario_builder_v0
domain_pack_loader_v0
bitcoin_signal_schema_v0
```

Every provider should declare:

```text
providerId
providerVersion
inputSchema
outputSchema
capabilities
limitations
confidence behavior
replacement compatibility
```

---

# Heatmap Integration

Relationship outputs should produce heatmap signals.

Examples:

```text
relationship_uncertainty_high
contradiction_detected
missing_critical_evidence
high_risk_scenario
scenario_requires_validation
confidence_low_due_to_missing_data
```

For repos:

```text
contradiction between docs and code
→ heatmap increases validation/context pressure
```

For BTC pack:

```text
signals strongly conflict
→ confidence drops and scenario uncertainty increases
```

---

# Replay Integration

Replay should evaluate:

```text
- were selected relationships useful?
- did contradictions matter?
- was confidence calibrated?
- did missing-data warnings matter later?
- did scenarios help choose next inspection?
```

Replay should improve:

```text
relationship mapping
confidence rules
scenario templates
missing-data rules
retrieval strategy
```

Replay must not silently promote risky behavior.

---

# Roadmap 01 Boundary

Allowed:

```text
- define record schemas
- define engine/pack boundaries
- define BTC-only pack scope
- create static relationship/domain records
- connect conceptually to repo atlas, heatmap, and replay
```

Not Roadmap 01:

```text
- full causal inference engine
- live market data engine
- exchange integration
- trading automation
- full scenario simulator
- autonomous prediction system
```

---

# Implementation Issue Split

Recommended issues:

```text
Issue A — Implement v0 relationship analysis records
Issue B — Implement v0 domain pack registry and loader records
Issue C — Implement BTC-only market context pack schema fixtures
```

Do not implement Bitcoin-specific logic before the general relationship records exist.

---

# Acceptance Rules

This architecture is not acceptable if:

```text
- Bitcoin logic is hard-coded into the relationship engine
- a domain pack can execute actions
- scenarios are presented as guaranteed predictions
- confidence exists without evidence/missing-data rules
- records lack schema versions
- providers lack limitations
- pack scope silently expands to unrelated domains
```

---

# Core Rule

```text
The engine reasons.
The pack scopes.
The report explains.
Replay improves.
Governance constrains.
```
