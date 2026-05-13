# OwnAI Memory System

The Memory System is one of the core foundations of OwnAI.

Its job is to prevent the agent from wasting tokens, RAM, and time by repeatedly reading the same repository information. It stores compressed knowledge, tracks what OwnAI knows and does not know, and provides focused context only when needed.

## Core Principle

```text
OwnAI does not remember everything raw.
OwnAI remembers what matters, where to look, and when to zoom in.
```

## Main Goals

- Store compressed repository knowledge
- Track known, partly known, and unknown areas
- Support hot/warm/cold cache layers
- Reduce repeated scans
- Provide focused context packs for the model
- Keep memory fresh through file hashes and timestamps
- Learn from successful and failed tasks
- Feed the Heatmap, Telescope, and Microscope engines

---

# Memory Layers

## 1. Hot Memory

Short-lived memory for the current task/session.

Contains:
- active user task
- selected files
- exact functions/classes loaded
- latest compiler/test output
- active errors
- active patch/diff
- current skill chain
- current agent threads

Purpose:
- immediate context
- fast iteration
- retry loops

Stored in:

```text
.ownai/memory/hot/session_state.json
```

Hot memory can be cleared after a session, but important lessons should be compressed into warm or long-term memory.

---

## 2. Warm Memory

Medium-term repository knowledge.

Contains:
- repo summary
- folder summaries
- file summaries
- symbol summaries
- dependency graph
- build/test commands
- language/framework detection
- recent task summaries
- heatmap state

Purpose:
- avoid rescanning stable areas
- support fast repo understanding
- provide compressed context

Stored in:

```text
.ownai/memory/warm/
├── repo_summary.json
├── folder_summaries.json
├── file_summaries.json
├── symbol_summaries.json
├── dependency_graph.json
├── command_profile.json
└── heatmap_state.json
```

---

## 3. Long-Term Memory

Persistent project intelligence.

Contains:
- solved bugs
- failed attempts
- project conventions
- architectural decisions
- dangerous files/modules
- preferred commands
- recurring patterns
- known flaky tests
- lessons learned

Purpose:
- make OwnAI better on the same repo over time
- reduce repeated mistakes
- create future fine-tuning data

Stored in:

```text
.ownai/memory/long_term/
├── lessons.jsonl
├── solved_bugs.jsonl
├── failed_attempts.jsonl
├── project_rules.json
├── architecture_decisions.jsonl
└── conventions.json
```

---

# Knowledge State

Each repo area should have a knowledge state.

```text
KNOWN
- scanned
- summarized
- hash is current
- verified by tests or tools
- high confidence

PARTLY_KNOWN
- scanned and summarized
- but tests are missing
- or summary is stale
- or dependency impact is unclear

UNKNOWN
- never scanned
- changed since last scan
- too complex for current summary
- no tests
- low confidence
```

## Example

```json
{
  "path": "src/player/StaminaSystem.cs",
  "knowledge_state": "PARTLY_KNOWN",
  "memory_confidence": 0.61,
  "last_scanned_hash": "abc123",
  "current_hash": "abc123",
  "summary_stale": false,
  "verified_by_tests": false,
  "last_seen_in_task": "2026-05-14T00:00:00Z"
}
```

---

# Memory Confidence

Memory confidence tells OwnAI how much it should trust its compressed understanding.

## Confidence Inputs

- file hash unchanged
- summary age
- complexity
- test coverage
- recent changes
- successful verification
- failed past patches
- dependency blast radius
- symbol extraction quality

## Suggested Formula

```text
memory_confidence =
base_summary_quality
+ verification_bonus
+ test_coverage_bonus
- staleness_penalty
- recent_change_penalty
- complexity_penalty
- failed_attempt_penalty
```

Range:

```text
0.00 = unknown / do not trust
1.00 = highly trusted
```

---

# Compression

Compression turns raw repository data into structured memory.

## Compression Targets

```text
raw code
→ file summary
→ symbol summary
→ dependency summary
→ architectural role
→ known risks
→ test relation
```

## File Summary Shape

```json
{
  "path": "src/player/StaminaSystem.cs",
  "language": "csharp",
  "purpose": "Handles stamina drain and regeneration for player actions.",
  "important_symbols": [
    "StaminaSystem",
    "Drain",
    "Regenerate",
    "CanSpend"
  ],
  "depends_on": [
    "PlayerStats",
    "GameTime"
  ],
  "used_by": [
    "PlayerMovement",
    "DodgeAbility"
  ],
  "known_risks": [
    "Regeneration can conflict with sprint/dodge state."
  ],
  "test_relation": {
    "has_direct_tests": true,
    "test_files": ["tests/player/StaminaSystemTests.cs"]
  },
  "memory_confidence": 0.82
}
```

---

# Decompression

Decompression means loading exact code only when needed.

## Decompression Flow

```text
user task
→ load repo summary
→ calculate task relevance
→ inspect heatmap
→ select relevant files
→ select relevant symbols
→ load exact functions/classes
→ build context pack
```

## Context Pack Example

```json
{
  "task": "Fix stamina not regenerating after dodge.",
  "repo_summary": "2D survival game using C# systems.",
  "selected_files": [
    "src/player/StaminaSystem.cs",
    "src/player/DodgeAbility.cs",
    "src/player/PlayerMovement.cs"
  ],
  "selected_symbols": [
    "StaminaSystem.Regenerate",
    "DodgeAbility.Execute",
    "PlayerMovement.UpdateSprintState"
  ],
  "test_files": [
    "tests/player/StaminaSystemTests.cs"
  ],
  "latest_errors": [],
  "memory_notes": [
    "StaminaSystem is partly known because dodge interaction has no test coverage."
  ]
}
```

---

# Cache Policy

## Hot Cache

Keep:
- active files
- active symbols
- latest test output
- current patch state

Evict:
- old logs
- irrelevant files
- finished task scratch data

## Warm Cache

Keep:
- stable summaries
- dependency graph
- command profile
- heatmap data

Refresh when:
- file hash changes
- summary is stale
- confidence drops
- task relevance increases

## Cold/Long-Term Memory

Keep:
- important lessons
- recurring bugs
- project conventions
- architectural decisions

Never store:
- secrets
- private tokens
- API keys
- raw credentials

---

# File Hashing

Every scanned file should have a hash.

```json
{
  "path": "src/player/StaminaSystem.cs",
  "hash": "sha256:...",
  "last_scanned_at": "2026-05-14T00:00:00Z",
  "last_modified_at": "2026-05-14T00:00:00Z"
}
```

If the hash is unchanged, OwnAI can reuse the summary.

If the hash changed, OwnAI must mark the summary as stale and lower memory confidence.

---

# Learning From Tasks

After every task, OwnAI should run a memory update step.

## Post-Task Review

```text
What changed?
What files mattered?
Which commands were useful?
Which tests caught the issue?
What failed?
What succeeded?
Should this become a reusable lesson?
```

## Lesson Shape

```json
{
  "id": "lesson_0001",
  "task": "Fix JavaFX sound resource loading",
  "problem": "Sound files were not found after packaging.",
  "cause": "Resource path was filesystem-based instead of classpath-based.",
  "fix_pattern": "Use getResource('/sounds/file.wav') and ensure resources are packaged.",
  "applies_to": ["java", "javafx", "resources", "maven"],
  "confidence": 0.91,
  "created_at": "2026-05-14T00:00:00Z"
}
```

---

# Memory Safety

OwnAI must not store secrets.

## Secret Filters

Before writing memory, scan for:
- API keys
- passwords
- tokens
- private SSH keys
- `.env` values
- credentials

If detected:
- do not store the raw value
- replace with `[REDACTED_SECRET]`
- mark memory entry as sanitized

---

# MVP Implementation

## Memory System v0.1

Must support:
- `.ownai/` directory creation
- file hashing
- repo summary placeholder
- file summary records
- knowledge state
- memory confidence placeholder
- hot/warm/long-term folder structure
- JSON persistence

## Minimum Files

```text
.ownai/
├── memory/
│   ├── hot/
│   │   └── session_state.json
│   ├── warm/
│   │   ├── repo_summary.json
│   │   ├── file_summaries.json
│   │   ├── dependency_graph.json
│   │   └── heatmap_state.json
│   └── long_term/
│       ├── lessons.jsonl
│       ├── solved_bugs.jsonl
│       └── failed_attempts.jsonl
└── cache/
    └── file_hashes.json
```

---

# Future Versions

## v0.2
- symbol summaries
- language-specific parsers
- Tree-sitter integration
- dependency graph generation

## v0.3
- automatic context pack generation
- memory confidence scoring
- stale summary refresh

## v0.4
- post-task learning
- lesson extraction
- failure memory

## v0.5
- skill performance memory
- project-specific conventions
- replay system support

---

# Core Rule

```text
Spend attention where activity is high and knowledge is low.
```
