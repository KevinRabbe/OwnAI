# OwnAI Replaceable Self-Improving Subsystems

This document defines a global OwnAI architecture principle:

```text
Every important subsystem should be individually improvable, replaceable, benchmarkable, and replay-learnable.
```

This is not only a repo-understanding rule.

It applies to the whole OwnAI architecture.

## Core Principle

```text
Stable contracts.
Replaceable internals.
Observable outcomes.
Replay-based improvement.
Safe promotion or rollback.
```

---

# Why This Matters

OwnAI should improve over time without becoming fragile.

The system should avoid this failure mode:

```text
one subsystem improves
→ other systems break
→ architecture becomes tangled
→ no one knows what changed
```

Better:

```text
subsystem has a stable contract
new version runs behind the contract
outputs are benchmarked
replay compares old vs new
better version is promoted
worse version is rolled back
```

---

# Global Rule

Every major OwnAI subsystem should be designed as:

```text
interface / contract
+ implementation provider
+ versioned artifacts
+ observability
+ benchmark evidence
+ replay learning
+ rollback path
```

This means v0 can be simple.

v1 can improve.

v2 can rewrite internals.

But OwnAI should not break because the contract remains stable or migratable.

---

# Applies To

This principle applies to:

```text
- repo understanding
- Minecraft Chunk Scanner
- heatmap scoring
- lens filtering
- context protocol
- task packet generation
- validation gates
- code explanation gate
- exploit review
- sandbox/trust graduation
- immune trust boundary
- source code reference library
- agent/worker routing
- Octopus Router / model-tool selection
- replay engine
- trust registry
- document registry
- automation permissions
- workflow flags
```

No important subsystem should be treated as permanently final.

---

# Provider Model

Each subsystem should be able to have providers.

Example:

```text
SymbolExtractor
→ regex_symbol_extractor_v0
→ tree_sitter_symbol_extractor_v1
→ lsp_symbol_indexer_v2
```

Example:

```text
HeatmapScorer
→ simple_weighted_formula_v0
→ replay_adjusted_scorer_v1
→ graph_augmented_scorer_v2
```

Example:

```text
ExploitReview
→ checklist_review_v0
→ static_rule_review_v1
→ taint_analysis_review_v2
→ sandbox_adversarial_review_v3
```

The rest of OwnAI should consume the contract, not depend on one internal method.

---

# Required Provider Metadata

Every replaceable provider should declare:

```text
providerId
providerVersion
subsystem
inputSchema
outputSchema
capabilities
limitations
riskLevel
requiredPermissions
observabilityEvents
benchmarkSuites
replacementCompatibility
```

Example:

```json
{
  "providerId": "heatmap_scorer_simple_weighted_v0",
  "providerVersion": "0.1.0",
  "subsystem": "heatmap_scoring",
  "inputSchema": "HeatmapSignal[]@1.0",
  "outputSchema": "HeatmapRecord@1.0",
  "capabilities": ["weighted_scores", "reason_preservation"],
  "limitations": ["no replay learning", "no graph centrality"],
  "riskLevel": "medium",
  "requiredPermissions": ["read_heatmap_signals", "write_heatmap_records"],
  "observabilityEvents": ["HEATMAP_GENERATED"],
  "benchmarkSuites": ["heatmap_fixture_v0"],
  "replacementCompatibility": ["HeatmapRecord@1.0"]
}
```

---

# Self-Improvement Modes

OwnAI can improve subsystems through different modes.

## 1. Idle Mode Improvement

When no urgent user task is active, OwnAI may inspect low-risk improvement candidates.

Examples:

```text
- find duplicate docs
- identify stale records
- suggest better chunking
- compare old vs new summaries
- prepare benchmark candidates
```

Idle mode should not make high-risk changes without approval.

---

## 2. Replay Engine Improvement

Replay can compare past outcomes and discover patterns.

Examples:

```text
- chunk scanner missed relevant files
- heatmap underweighted security risk
- exploit review missed a repeated pattern
- context pack included too much irrelevant context
- model/tool router chose expensive worker unnecessarily
```

Replay should produce improvement candidates, not silently rewrite protected systems.

---

## 3. Self-Improving Mode

A controlled improvement mode may test new subsystem providers.

Example:

```text
old provider: regex_symbol_extractor_v0
new provider: tree_sitter_symbol_extractor_v1
```

Process:

```text
run both on same fixture
compare outputs
measure cost/quality/errors
check compatibility
promote only with evidence
```

Self-improvement must stay governed.

---

# Promotion Pipeline

New subsystem versions should move through a safe path.

```text
candidate
→ sandboxed evaluation
→ benchmark comparison
→ shadow mode
→ limited rollout
→ active provider
→ monitored stable provider
```

Rollback path:

```text
active provider fails
→ revert to previous stable provider
→ preserve failure evidence
→ create replay lesson
```

---

# Shadow Mode

Shadow mode means a new provider runs without controlling production output.

Example:

```text
current heatmap scorer produces official HeatmapRecords
new heatmap scorer runs in parallel
outputs are compared
new scorer does not affect decisions yet
```

Useful for:

```text
- heatmap scoring
- repo understanding
- context pack building
- model/tool routing
- exploit review
- trust scoring
```

Core rule:

```text
A new provider should prove itself before controlling decisions.
```

---

# Benchmark Requirements

A subsystem provider should not be promoted only because it sounds better.

Promotion should compare:

```text
accuracy
coverage
cost
token usage
latency
failure rate
security risk
explainability
compatibility
human acceptance
```

This connects to:

```text
docs/LONGITUDINAL_BENCHMARK_REGRESSION_TRACKING.md
docs/REUSABLE_CAPABILITY_METRICS.md
```

---

# Replay Requirements

Replay should store:

```text
which provider was used
what input it saw
what output it produced
what decision followed
what validation happened
whether human accepted it
whether failure appeared later
```

This allows OwnAI to answer:

```text
Did the new provider actually help?
Did it reduce context without losing intelligence?
Did it create hidden risk?
```

---

# Contract Stability

Contracts should be stable enough that subsystems can improve internally.

Examples:

```text
ChunkScannerProvider outputs ChunkRecord
HeatmapScorerProvider outputs HeatmapRecord
RepoUnderstandingProvider outputs RepoUnderstandingReport
ExploitReviewProvider outputs ExploitReview
SandboxProvider outputs SandboxRun
```

If a contract must change:

```text
version it
migrate old records if needed
support backward compatibility where practical
update registry and docs
```

---

# Capability Boundaries

A provider should not gain authority just because it performs better.

Example:

```text
better exploit review provider
≠ permission to modify governance
```

Example:

```text
better repo scanner
≠ permission to execute unknown scripts
```

Provider permissions must remain explicit.

This connects to:

```text
docs/PERMISSION_AND_ACTION_AUTHORITY_MODEL.md
docs/SANDBOX_TRUST_GRADUATION_MODEL.md
docs/IMMUNE_SYSTEM_TRUST_BOUNDARY.md
```

---

# Heatmap Integration

Self-improvement opportunities should appear as heatmap signals.

Examples:

```text
provider_high_failure_rate
provider_high_token_cost
provider_low_confidence
provider_repeated_human_rejection
provider_benchmark_regression
provider_shadow_mode_outperforming_active
```

Suggested lenses:

```text
Cost Lens
Trust Lens
Validation Lens
Replay Lens
Risk Lens
```

---

# Anti-Patterns

Avoid:

```text
- making one implementation permanent by accident
- changing provider internals without versioning
- promoting new versions without benchmarks
- letting self-improvement modify protected core directly
- optimizing token cost while reducing correctness silently
- replacing a subsystem without rollback
- letting a provider expand its own authority
- hiding provider limitations
```

---

# Roadmap 01 Boundary

Roadmap 01 does not need full self-improving infrastructure.

Allowed:

```text
- define provider metadata shape
- require versioned artifacts
- require limitations/capabilities fields
- define shadow-mode concept
- define benchmark/promotion concepts
- record provider IDs in outputs where practical
```

Not Roadmap 01:

```text
- automatic provider evolution
- autonomous promotion to production
- full benchmark orchestration
- full replay-driven self-rewrite
- advanced model/tool bandit routing
```

---

# Core Rule

```text
OwnAI systems should be designed to improve themselves safely,
not lock themselves into their first implementation.
```
