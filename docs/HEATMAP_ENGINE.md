# OwnAI Heatmap Engine

The Heatmap Engine is OwnAI's attention targeting system.

It decides where the agent should spend time, tokens, RAM, and tool calls.

## Core Principle

```text
The heatmap is not just a visualization.
The heatmap is the agent's attention system.
```

OwnAI should avoid spending resources on low-value areas. It should focus where activity is high, knowledge is low, risk is meaningful, and task relevance is strong.

---

# Main Goals

- Prioritize important repo areas
- Avoid wasting model context
- Highlight known, partly known, and unknown code
- Connect memory confidence with repo activity
- Guide Telescope zoom decisions
- Guide Microscope deep inspections
- Support proactive test/refactor suggestions
- Make agent behavior visible in the dashboard

---

# Heatmap Layers

OwnAI should not use only one heat score. It should maintain multiple heat layers.

## 1. Activity Heatmap

Tracks how active a file/module is.

Inputs:
- recent git changes
- file modification time
- current task usage
- recent agent interactions
- issue/PR references

High activity means the file is currently important.

---

## 2. Unknownness Heatmap

Tracks how poorly OwnAI understands an area.

Inputs:
- never scanned
- stale summary
- low memory confidence
- changed since last scan
- missing symbol summary
- missing dependency data

High unknownness means OwnAI should inspect or summarize the area.

---

## 3. Risk Heatmap

Tracks where bugs are likely.

Inputs:
- high complexity
- TODO/FIXME count
- large file size
- previous failed patches
- known fragile modules
- security-sensitive code
- missing validation

High risk means the agent should be careful and test-first.

---

## 4. Blast Radius Heatmap

Tracks how much could break if a file changes.

Inputs:
- number of imports/users
- dependency graph centrality
- public API exposure
- shared utility usage
- framework entry points

High blast radius means OwnAI should use safer workflows:

```text
write tests first
make minimal diff
run wider verification
require stronger confidence
```

---

## 5. Coverage Heatmap

Tracks where tests are weak or missing.

Inputs:
- direct test files found
- coverage reports if available
- related failing tests
- generated test gaps

Low coverage increases priority when risk or task relevance is high.

---

## 6. Task Relevance Heatmap

Tracks how relevant an area is to the current task.

Inputs:
- keyword matching
- symbol matching
- error trace matching
- semantic search
- issue/PR text
- recent user prompt

Task relevance changes per task.

---

## 7. Memory Confidence Heatmap

Tracks how much OwnAI trusts its existing memory.

Inputs:
- summary quality
- staleness
- tests verified
- symbol extraction quality
- failed attempt history

Low memory confidence increases attention priority.

---

# Attention Score

Base formula:

```text
Attention Score =
Task Relevance ×
(Unknownness + Risk + Activity + Blast Radius + Coverage Gap)
- Stability Bonus
```

Alternative simple MVP formula:

```text
attention_score =
(task_relevance * 2.0)
+ unknownness
+ risk
+ activity
+ blast_radius
+ coverage_gap
- memory_confidence
```

Scores should be normalized between 0 and 100.

---

# Heatmap Decision Types

Every file/function should receive an action decision.

```text
IGNORE
- low relevance
- low risk
- known
- inactive

CACHE
- useful but stable
- known enough
- not currently task-critical

REFRESH
- changed since last scan
- summary stale
- confidence dropped

ZOOM_IN
- active
- unknown
- risky
- task-relevant

VERIFY
- high blast radius
- touched by patch
- linked to failing tests
```

---

# Example Heatmap Record

```json
{
  "path": "src/player/StaminaSystem.cs",
  "scope": "file",
  "scores": {
    "activity": 92,
    "unknownness": 62,
    "risk": 74,
    "blast_radius": 51,
    "coverage_gap": 43,
    "task_relevance": 95,
    "memory_confidence": 61,
    "attention_score": 88
  },
  "decision": "ZOOM_IN",
  "reasons": [
    "Task mentions stamina.",
    "File changed recently.",
    "Dodge interaction has weak test coverage.",
    "Memory confidence below target."
  ]
}
```

---

# Function-Level Heatmap

File-level heat is not enough.

Large files should get internal heatmaps.

Example:

```json
{
  "path": "src/player/StaminaSystem.cs",
  "symbols": [
    {
      "name": "Regenerate",
      "kind": "method",
      "attention_score": 91,
      "decision": "ZOOM_IN",
      "reasons": ["Task mentions regeneration", "No direct tests found"]
    },
    {
      "name": "Drain",
      "kind": "method",
      "attention_score": 47,
      "decision": "CACHE"
    }
  ]
}
```

---

# Heat Reasons

OwnAI must never show only a score.

Each heat decision should explain why it exists.

Example:

```text
InventoryService.cs — 91/100
Reasons:
- changed 14 times this week
- no direct tests found
- imported by 22 files
- previous agent patch failed here
- memory confidence only 43%
```

This makes the dashboard transparent and useful.

---

# Dashboard Colors

Suggested UI mapping:

```text
Blue   = known / stable
Gold   = active / partly known
Red    = risky / failing / high attention
Gray   = unknown / unscanned
Purple = hot cache / active memory
Green  = verified / safe
```

---

# Heatmap Lifecycle

```text
scan repo
→ load memory state
→ calculate base heat
→ receive task
→ calculate task relevance
→ update attention score
→ produce action decisions
→ Telescope chooses zones
→ Microscope inspects targets
→ tests/git verify changes
→ memory updates
→ heatmap recalculates
```

---

# MVP Implementation

## Heatmap Engine v0.1

Inputs:
- file hashes
- file size
- modified time
- TODO/FIXME count
- test file presence
- memory confidence
- task keyword matching

Outputs:

```text
.ownai/memory/warm/heatmap_state.json
```

Minimum record:

```json
{
  "path": "src/example.py",
  "scope": "file",
  "activity": 20,
  "unknownness": 80,
  "risk": 30,
  "task_relevance": 50,
  "memory_confidence": 40,
  "attention_score": 67,
  "decision": "REFRESH",
  "reasons": []
}
```

---

# Future Versions

## v0.2
- Git churn analysis
- import/dependency count
- function-level scoring

## v0.3
- coverage reports
- failing-test relation
- blast radius scoring

## v0.4
- semantic task relevance
- issue/PR relevance
- historical bug memory

## v0.5
- proactive task recommendations
- dashboard heatmap visualization
- auto-prioritized refactor/test backlog

---

# Core Rule

```text
Spend attention where activity is high and knowledge is low.
```
