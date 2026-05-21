# OwnAI Bitcoin Market Context Pack

This document defines a BTC-only domain intelligence pack for relationship analysis over Bitcoin market context.

It extends:

```text
docs/DOMAIN_INTELLIGENCE_PACKS.md
docs/RELATIONSHIP_ANALYSIS_AND_CAUSAL_CONTEXT.md
```

## Core Principle

```text
BTC only.
Context understanding only.
Reasoning support, not trading automation.
```

---

# Scope

This pack is scoped to:

```text
asset: BTC
focus: Bitcoin market context
purpose: relationship understanding and scenario reasoning
```

Excluded unless explicitly defined in a separate pack:

```text
ETH
SOL
altcoins
memecoins
multi-coin rotation strategies
automated trading
financial advice automation
```

---

# Allowed Use

Allowed:

```text
- understand BTC context
- map BTC-relevant signals
- identify relationships between signals
- detect contradictions
- build possible scenarios
- identify missing data
- track which assumptions mattered later
```

---

# Disallowed Use

Disallowed:

```text
- automatic trading
- direct buy/sell commands
- guaranteed price prediction
- financial advice engine
- multi-coin trading system
- leverage strategy automation
```

Core rule:

```text
This pack helps OwnAI understand context.
It does not decide trades.
```

---

# Why Bitcoin Is Useful As A Thinking Example

Bitcoin has many interacting signals.

That makes it a useful domain for testing relationship reasoning.

The important skill is not predicting BTC perfectly.

The important skill is seeing:

```text
which signals connect
which signals conflict
which signals are missing
which scenarios are plausible
which assumptions should be replay-checked later
```

This same thinking ability helps OwnAI with large repositories and architecture contexts.

---

# Signal Categories

## 1. Price Structure

Signals:

```text
spot price
trend direction
support zones
resistance zones
range structure
breakout / breakdown attempts
volatility
volume profile if available
```

Purpose:

```text
visible market outcome and current structure
```

---

## 2. Liquidity And Macro Context

Signals:

```text
USD strength / DXY
interest rate expectations
liquidity conditions
risk-on / risk-off environment
major macro events
central bank events
inflation data
```

Purpose:

```text
external pressure or support for risk assets
```

---

## 3. Spot Demand

Signals:

```text
ETF flows
spot exchange volume
exchange reserves
stablecoin liquidity if relevant
long-term holder behavior
```

Purpose:

```text
real demand / supply pressure
```

---

## 4. Leverage And Derivatives

Signals:

```text
funding rates
open interest
liquidation clusters
long/short imbalance
basis / futures premium
options positioning if available
```

Purpose:

```text
fragility, squeeze risk, liquidation risk
```

---

## 5. On-Chain Context

Signals:

```text
exchange inflows/outflows
miner flows
realized price zones
active addresses
transaction volume
long-term holder supply
short-term holder cost basis
```

Purpose:

```text
underlying network and holder behavior
```

---

## 6. Sentiment And Narrative

Signals:

```text
news intensity
social sentiment
fear/greed style indicators
institutional narrative
regulatory events
market attention
```

Purpose:

```text
crowd positioning and narrative pressure
```

---

# Relationship Examples

```text
ETF inflows
→ supports spot demand

high funding + rising open interest
→ increases leverage flush risk

exchange reserves falling
→ may reduce sell-side supply

DXY rising + risk-off macro
→ may pressure BTC

price rising while spot demand weak
→ possible leverage-driven move

price falling while ETF inflows strong
→ possible macro/liquidity or leverage pressure
```

---

# Contradiction Patterns

OwnAI should flag contradictions such as:

```text
price bullish but funding overheated
spot inflows bullish but macro risk-off
exchange reserves falling but price not reacting
sentiment euphoric while on-chain demand weak
strong breakout claim but volume weak
agent states confidence high while key data is missing
```

Contradiction does not mean the market must reverse.

It means:

```text
confidence should be controlled
missing evidence should be identified
scenario alternatives should be kept open
```

---

# Scenario Templates

## Bull Continuation

Possible conditions:

```text
ETF/spot demand remains strong
funding not overheated
macro stable or supportive
price holds key breakout/support
exchange reserves not rising sharply
```

---

## Leverage Flush

Possible conditions:

```text
funding overheated
open interest high
price loses support
liquidation clusters below price
spot demand not strong enough to absorb selling
```

---

## Range / Chop

Possible conditions:

```text
mixed spot demand
macro uncertainty
no clear breakout confirmation
leverage resets repeatedly
support and resistance both defended
```

---

## Macro-Led Risk-Off

Possible conditions:

```text
DXY strong
rates repricing higher
liquidity tightens
risk assets weaken broadly
BTC loses support despite internal signals
```

---

# BTC Analysis Record

Example:

```json
{
  "analysisId": "btc_context_001",
  "domainPackId": "bitcoin_market_context_pack",
  "asset": "BTC",
  "questionType": "market_context_snapshot",
  "selectedSignals": [
    "price_structure",
    "etf_flows",
    "funding_rates",
    "open_interest",
    "macro_liquidity"
  ],
  "relationships": [
    {
      "from": "ETF inflows",
      "to": "spot demand",
      "relationshipType": "supports",
      "confidence": 0.7
    },
    {
      "from": "high funding rates",
      "to": "long liquidation risk",
      "relationshipType": "increases_risk_of",
      "confidence": 0.8
    }
  ],
  "contradictions": [
    "Spot demand supportive but leverage risk elevated."
  ],
  "scenarios": [
    {
      "name": "bull_continuation",
      "confidence": 0.55,
      "conditionsToWatch": ["ETF inflows continue", "funding cools", "support holds"]
    },
    {
      "name": "leverage_flush",
      "confidence": 0.35,
      "conditionsToWatch": ["funding remains high", "support breaks", "open interest stays elevated"]
    }
  ],
  "missingData": [
    "current ETF flow data",
    "current funding rates",
    "current liquidation map"
  ],
  "confidence": 0.62
}
```

---

# Confidence Rules

Confidence should decrease when:

```text
important data is missing
signals conflict
source freshness is weak
macro event risk is high
scenario depends on one unverified assumption
```

Confidence should increase when:

```text
multiple independent signals align
data is fresh
relationship has replay support
contradictions are resolved
expected signals appear after scenario formation
```

---

# Missing Data Rules

A BTC context analysis should explicitly say what is missing.

Examples:

```text
current funding rates missing
current ETF flow data missing
exchange reserve data stale
liquidation map unavailable
macro event calendar not checked
```

Core rule:

```text
No high-confidence analysis with critical missing data.
```

---

# Replay Learning Targets

Replay should track:

```text
which signals mattered later
which contradictions were useful
which scenario conditions appeared
which missing data would have changed the analysis
whether confidence was too high or too low
```

Replay should improve the pack as a reasoning aid, not as an autonomous trading system.

---

# Integration With General OwnAI Systems

Connects to:

```text
docs/RELATIONSHIP_ANALYSIS_AND_CAUSAL_CONTEXT.md
docs/DOMAIN_INTELLIGENCE_PACKS.md
docs/REPLACEABLE_SELF_IMPROVING_SUBSYSTEMS.md
docs/HEATMAP_SIGNAL_SOURCES_AND_SCORING.md
docs/CONTEXT_PROTOCOL.md
```

The pack should follow:

```text
stable contracts
replaceable signal collectors
explicit limitations
confidence tracking
replay-based improvement
```

---

# Roadmap Boundary

This is not needed for Roadmap 01 core implementation.

Allowed early:

```text
- define BTC-only signal map
- define scenario templates
- define allowed/disallowed use
- define BTC analysis record shape
```

Not allowed early:

```text
- exchange trading integration
- wallet actions
- leverage execution
- automated financial advice
- multi-coin prediction engine
```

---

# Core Rule

```text
Bitcoin is a complex-context reasoning test case,
not an automation target.
```
