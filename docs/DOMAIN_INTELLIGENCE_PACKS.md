# OwnAI Domain Intelligence Packs

This document defines how OwnAI can use domain-specific packs to understand complex contexts without turning them into uncontrolled automation or prediction systems.

A domain intelligence pack is a scoped knowledge and signal framework for one domain.

It extends:

```text
docs/RELATIONSHIP_ANALYSIS_AND_CAUSAL_CONTEXT.md
```

## Core Principle

```text
General reasoning engine.
Specific domain pack.
One scoped domain at a time.
```

---

# Why This Exists

Some domains require different kinds of relationship understanding.

Examples:

```text
large codebases
security systems
Bitcoin market context
software architecture
agent behavior
package ecosystems
```

The Relationship Analysis Engine defines the general capability:

```text
map signals
map relationships
find contradictions
build scenarios
track confidence
learn from replay
```

A Domain Intelligence Pack defines the domain-specific signals and relationships.

---

# What A Domain Pack Is

A domain pack contains:

```text
- domain scope
- allowed use
- disallowed use
- important entities
- signal categories
- relationship types
- contradiction patterns
- scenario templates
- confidence rules
- missing-data rules
- replay learning targets
```

It does not replace the reasoning engine.

It configures the reasoning engine for one domain.

---

# What A Domain Pack Is Not

A domain pack is not:

```text
- a prediction engine
- a trading bot
- an automatic action system
- a financial advice module
- a guarantee system
- a reason to skip validation
```

Core rule:

```text
Reasoning support, not prophecy.
```

---

# One Domain At A Time

Domain packs should be scoped tightly.

Bad:

```text
Crypto Intelligence Pack for all coins, all markets, all strategies
```

Better:

```text
Bitcoin Market Context Pack
```

Even better operationally:

```text
BTC-only analysis context
one asset
one timeframe
one question type
```

This prevents context explosion and false generalization.

---

# Domain Pack Record

Example:

```json
{
  "domainPackId": "domain_pack_bitcoin_market_context",
  "name": "Bitcoin Market Context Pack",
  "domain": "bitcoin_market_context",
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
  "status": "draft"
}
```

---

# Domain Pack Workflow

```text
1. choose one domain pack
2. define task question
3. collect relevant signals
4. map domain relationships
5. detect contradictions
6. build scenarios
7. state confidence and missing data
8. recommend next inspection
9. replay outcome later
```

---

# Integration With Relationship Analysis

Domain packs provide domain-specific interpretation.

Relationship Analysis provides the generic machinery.

Example:

```text
Relationship Analysis Engine
→ knows how to map relationships and confidence

Bitcoin Market Context Pack
→ knows which BTC-specific signals matter
```

The same engine can later support:

```text
repo understanding
security reasoning
architecture reasoning
agent behavior reasoning
```

---

# Integration With Context Protocol

A domain pack should create a context pack that is scoped and evidence-linked.

Required context metadata:

```text
domainPackId
questionType
selectedSignals
selectedRelationships
missingData
confidence
excludedScope
```

Example excluded scope:

```text
This context pack is BTC-only.
Altcoin data is excluded unless explicitly requested and separately scoped.
```

---

# Integration With Replay

Replay should track whether domain reasoning was useful.

Questions:

```text
Were selected signals relevant?
Were scenario conditions useful?
Was confidence too high or too low?
Which missing data mattered later?
Which relationship assumptions failed?
```

Replay should improve the pack over time without turning it into uncontrolled prediction.

---

# Integration With Replaceable Subsystems

Domain packs should follow:

```text
docs/REPLACEABLE_SELF_IMPROVING_SUBSYSTEMS.md
```

This means:

```text
stable pack schema
replaceable signal collectors
replaceable relationship mappers
versioned outputs
benchmarkable reasoning quality
safe rollback
```

---

# Roadmap 01 Boundary

Allowed:

```text
- define domain pack record shape
- define BTC-only pack concept
- define allowed/disallowed use
- define signal and relationship categories
```

Not Roadmap 01:

```text
- automated trading
- live exchange integration
- financial advice automation
- multi-coin market engine
- prediction guarantees
```

---

# Core Rule

```text
A domain pack narrows context so OwnAI can reason better.
It must not expand scope into uncontrolled prediction or automation.
```
