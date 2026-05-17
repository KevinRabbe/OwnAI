# OwnAI Context Protocol

The Context Protocol defines how context is selected, ranked, compressed, trusted, reused, archived, and passed between cognition systems.

## Core Principle

```text
Context is not prompt text.
Context is managed cognition fuel.
```

Most AI systems waste enormous capability through context chaos. OwnAI should manage context as an economic and operational resource.

---

# Main Goals

- Reduce wasted tokens
- Improve focus quality
- Reduce hallucination risk
- Prevent stale context pollution
- Preserve high-signal information
- Improve local-model usability
- Support replay-aware context selection
- Support long-running project continuity
- Make context explainable and observable

---

# Context Problems

Common failures:

```text
- entire repo dumps
- stale architecture history
- repeated explanations
- conflicting memory
- noisy logs
- low-signal history
- irrelevant files
- duplicated validation info
```

These reduce:

```text
- reasoning quality
- routing quality
- token efficiency
- replay usefulness
- autonomy stability
```

---

# Context Pack

OwnAI should build structured context packs.

Example:

```json
{
  "task": "worker-stuck-recovery",
  "goal": "Fix worker jiggle behavior.",
  "relevantFiles": [
    "MovementSystem.cs",
    "ResourceGatherSystem.cs"
  ],
  "trustedReplayLessons": [
    "interaction_target_retention_v2"
  ],
  "constraints": [
    "determinism_required",
    "no_ui_changes"
  ],
  "acceptanceCriteria": [
    "stress_test_pass"
  ],
  "tokenBudget": "medium",
  "trustLevel": "high"
}
```

---

# Context Questions

Every context item should answer:

```text
Why is this included?
How trusted is it?
How expensive is it?
When should it expire?
Can it compress?
Must it remain exact?
```

---

# Context Types

```text
- exact code/files
- compressed summaries
- replay lessons
- task packets
- validation history
- benchmark results
- architectural constraints
- security evidence
- trust metadata
- operator preferences
```

---

# Context Temperature

Suggested categories:

```text
hot
warm
cold
archived
```

Examples:

```text
Hot:
currently edited files
active validation commands

Warm:
recent replay lessons
active architecture rules

Cold:
old roadmap discussions
completed patch reports

Archived:
obsolete experiments
expired debug logs
```

---

# Context Compression

Compression should preserve:

```text
- constraints
- decisions
- root causes
- validation outcomes
- trust signals
- architectural rules
```

while reducing:

```text
- duplicated explanations
- verbose logs
- repeated discussions
- low-signal history
```

---

# Focus Lens Integration

Focus systems should narrow context intentionally.

Examples:

```text
Microscope:
exact nearby files

Telescope:
architecture summaries

Replay Lens:
similar previous fixes
```

---

# Trust Integration

Context trust matters.

Examples:

```text
verified replay lesson
→ high trust

old speculative architecture note
→ lower trust

failed strategy from replay
→ avoid or mark deprecated
```

---

# Context Economics

Context has cost.

OwnAI should evaluate:

```text
- token cost
- VRAM cost
- reasoning overhead
- hallucination risk
- replay value
- relevance score
```

Goal:

```text
maximum signal with minimum waste.
```

---

# Integration With Task Packets

Task packets should reference context packs instead of embedding unnecessary history.

This supports:

```text
- crash recovery
- resumable workflows
- routing
- replay
- efficient automation
```

---

# Integration With Replay

Replay should learn:

```text
- which context helped
- which context was ignored
- which context caused confusion
- which compression strategies worked
```

---

# Integration With Observability

The UI may show:

```text
Context Size
Signal Score
Compression Ratio
Replay Influence
Context Trust
Token Cost Estimate
```

---

# Core Rule

```text
Better context management can outperform larger raw context windows.
```
