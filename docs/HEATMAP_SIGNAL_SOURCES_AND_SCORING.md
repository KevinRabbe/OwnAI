# OwnAI Heatmap Signal Sources & Scoring Model

This document turns the Heatmap + Telescope + Microscope + Lens concept into an implementable data model.

The full visual UI comes later.

The real first step is to make OwnAI produce trustworthy heatmap data.

## Core Principle

```text
The heatmap must be driven by real system evidence, not fake visual decoration.
```

This document extends:

```text
docs/HEATMAP_TELESCOPE_MICROSCOPE_LENS_MODEL.md
```

---

# Concept To Real System

The implementation path should be:

```text
1. collect signals
2. normalize signals
3. calculate heat scores
4. store heatmap records
5. expose simple query/output
6. render basic views
7. later build advanced visual UI
```

Do not start with the final UI.

Start with data that future UI can trust.

---

# What A Heatmap Cell Represents

A heatmap cell can represent different granularities.

Early version:

```text
repository
package
folder
file
document
task
artifact
```

Later version:

```text
function
class
symbol
state transition
worker
subsystem
architecture connection
```

Each cell should answer:

```text
what is this?
why is it hot?
which signals made it hot?
what should inspect it next?
```

---

# Heatmap Record Shape

Kernel-compatible v0 shape:

```json
{
  "heatmapRecordId": "heat_001",
  "scopeType": "file",
  "scopeId": "packages/task-state/src/store.ts",
  "taskId": "task_123",
  "timestamp": "2026-05-19T00:00:00Z",
  "scores": {
    "activity": 0.72,
    "uncertainty": 0.44,
    "risk": 0.81,
    "validationPressure": 0.67,
    "trustVolatility": 0.35,
    "reusePotential": 0.22,
    "attention": 0.74
  },
  "signals": [
    {
      "type": "exploit_review_finding",
      "weight": 0.9,
      "reason": "High severity approval bypass finding attached to changed file."
    },
    {
      "type": "recent_change_density",
      "weight": 0.6,
      "reason": "File changed in active task."
    }
  ],
  "recommendedView": "microscope",
  "recommendedLens": "security",
  "status": "active"
}
```

---

# Main Score Dimensions

## 1. Activity Score

Measures how much is happening in a region.

Inputs:

```text
- recent commits
- recent file changes
- active task references
- event count
- worker activity
- issue/PR activity
```

High activity does not always mean high risk.

It means OwnAI should know this area is moving.

---

## 2. Uncertainty Score

Measures how much OwnAI does not know or cannot verify.

Inputs:

```text
- missing validation evidence
- vague code explanation
- missing source-of-truth doc
- unresolved questions
- incomplete task packet
- unknown ownership
- weak context pack
```

High uncertainty means:

```text
inspect before trusting
```

---

## 3. Risk Score

Measures potential damage if the region is wrong.

Inputs:

```text
- security findings
- permission/action authority changes
- file deletion/write behavior
- shell execution
- protected core touch
- governance changes
- trust update logic
- external action logic
```

High risk means:

```text
stronger validation and possibly human review
```

---

## 4. Validation Pressure Score

Measures how badly a region needs validation.

Inputs:

```text
- tests not run
- tests failing
- acceptance criteria not proven
- validation result missing
- code explanation exists but no matching evidence
- changed behavior without validation
```

High validation pressure means:

```text
run checks or block acceptance
```

---

## 5. Trust Volatility Score

Measures whether trust in a model, skill, package, or workflow is unstable.

Inputs:

```text
- repeated failures
- inconsistent outputs
- exploit review findings
- wrong code explanations
- flaky validation results
- replay outcomes changing over time
```

High trust volatility means:

```text
route carefully and gather more evidence
```

---

## 6. Reuse Potential Score

Measures whether this area could become a reusable capability or skill.

Inputs:

```text
- repeated task pattern
- repeated code generation
- repeated validation workflow
- common repair action
- high token cost repeated many times
```

High reuse potential means:

```text
consider executable skill script or reusable workflow later
```

---

## 7. Attention Score

Composite score that decides whether the region should become visible/hot.

Simple v0 formula:

```text
attention =
  activity * 0.15
+ uncertainty * 0.20
+ risk * 0.25
+ validationPressure * 0.20
+ trustVolatility * 0.10
+ reusePotential * 0.10
```

This formula should be adjustable later.

Important:

```text
The formula is not truth.
It is an attention heuristic.
```

---

# Lens Mapping

Different lenses emphasize different scores.

## Risk Lens

```text
risk
validationPressure
protected core touch
exploit findings
```

## Trust Lens

```text
trustVolatility
wrong explanations
failed validations
replay outcomes
```

## Validation Lens

```text
validationPressure
test status
acceptance evidence
missing proof
```

## Security Lens

```text
exploit findings
dangerous sinks
permission boundaries
external action paths
secrets exposure
```

## Replay Lens

```text
historical failures
recurring patterns
lessons learned
regression risk
```

## Context Lens

```text
missing context
large context usage
weak context pack
source-of-truth uncertainty
```

## Ownership Lens

```text
unknown owner
duplicate subsystem risk
connection matrix conflicts
registry mismatch
```

---

# Telescope View Data

Telescope view should aggregate heat by large system area.

Early aggregation levels:

```text
repository
package
folder
document category
roadmap phase
subsystem
```

Example output:

```json
{
  "view": "telescope",
  "hotspots": [
    {
      "scopeType": "package",
      "scopeId": "packages/validation-gates",
      "attention": 0.82,
      "primaryReason": "High validation pressure and recent changes.",
      "recommendedLens": "validation"
    }
  ]
}
```

Telescope answers:

```text
where should we look broadly?
```

---

# Microscope View Data

Microscope view should expose local evidence.

Early local detail:

```text
changed files
events
flags
validation results
code explanations
exploit reviews
action intents
source records
replay entries
```

Example output:

```json
{
  "view": "microscope",
  "scopeType": "file",
  "scopeId": "packages/permission-authority/src/actions.ts",
  "attention": 0.91,
  "primarySignals": [
    "high exploit finding",
    "external action logic changed",
    "approval gate touched"
  ],
  "evidence": [
    "exploit_review_001",
    "code_explanation_001",
    "validation_result_003"
  ]
}
```

Microscope answers:

```text
why exactly is this area hot?
```

---

# Minimum Viable Implementation

Roadmap-compatible v0:

```text
- define HeatmapRecord type
- define HeatmapSignal type
- collect signals from existing artifacts
- calculate basic scores
- output JSON summary
- record heatmap generation event in observability
```

No advanced UI required.

The first usable interface can be:

```text
npm run heatmap
```

or:

```text
ownai heatmap --view telescope
ownai heatmap --view microscope --scope packages/task-state
ownai heatmap --lens security
```

---

# Signal Sources By Existing System

## Task State

Signals:

```text
- active tasks
- blocked tasks
- resumed tasks
- retry count
- incomplete tasks
```

## Event Bus / Observability

Signals:

```text
- event volume
- repeated failure events
- blocked events
- validation lifecycle events
- action approval events
```

## Validation Gates

Signals:

```text
- missing validation
- failed validation
- stale validation
- pass with warnings
```

## Code Explanation Gate

Signals:

```text
- missing explanation
- vague explanation
- explanation mismatch
- undocumented behavior change
```

## Exploit Review

Signals:

```text
- findings by severity
- risk areas touched
- unchecked scope
- residual risk
```

## Trust Registry

Signals:

```text
- trust decreases
- volatile trust
- repeated bad agent behavior
- repeated good validation behavior
```

## Replay Store

Signals:

```text
- repeated failures
- repeated successful fix patterns
- regression history
- reusable workflow candidates
```

## Documentation Registry

Signals:

```text
- missing registry entry
- duplicate doc risk
- outdated doc status
- source-of-truth conflict
```

---

# Scoring Rules

## Normalize To 0.0 - 1.0

All scores should be normalized.

```text
0.0 = none / cold
1.0 = maximum / hot
```

## Keep Reasons

Every score should have reasons.

Bad:

```json
{"risk": 0.82}
```

Better:

```json
{
  "risk": 0.82,
  "reasons": [
    "permission authority changed",
    "external action logic touched",
    "exploit finding severity high"
  ]
}
```

## Avoid Fake Precision

Do not pretend the score is mathematically perfect.

Scores are prioritization aids.

---

# Observability Events

Heatmap generation should emit events.

Examples:

```text
HEATMAP_GENERATED
HEATMAP_SIGNAL_COLLECTED
HEATMAP_HOTSPOT_DETECTED
HEATMAP_LENS_APPLIED
HEATMAP_MICROSCOPE_VIEW_REQUESTED
HEATMAP_TELESCOPE_VIEW_REQUESTED
```

---

# Acceptance Rules

A heatmap system should not be accepted if:

```text
- heat scores have no reasons
- heatmap uses fake/random data without labeling it as demo data
- risky areas are hidden by aggregation
- no source artifact links exist
- no observability event is recorded
- lenses cannot explain why scores changed
```

---

# Roadmap 01 Boundary

Roadmap 01 should only lay the foundations.

Allowed:

```text
- define types
- emit observability events
- produce JSON/text heatmap output
- connect to validation/replay/trust metadata when available
```

Not Roadmap 01:

```text
- full visual UI
- animated heatmap
- 3D map
- advanced graph layout
- autonomous multi-agent heat routing
```

---

# Core Rule

```text
Build the heatmap brain before the heatmap screen.
```
