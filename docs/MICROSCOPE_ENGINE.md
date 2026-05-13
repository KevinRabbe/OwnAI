# OwnAI Microscope Engine

The Microscope Engine is the tactical inspection layer of OwnAI.

It performs deep targeted inspections only after the Telescope Engine identifies where attention should go.

## Core Principle

```text
The Microscope Engine answers:
What exactly is happening here?
```

It should inspect only what is necessary.

The Microscope Engine is responsible for:
- detailed code understanding
- symbol extraction
- exact context loading
- function-level analysis
- context decompression
- minimal attention usage

---

# Main Goals

- Avoid loading entire repositories
- Inspect exact relevant code
- Build focused context packs
- Extract symbols/classes/functions
- Understand dependencies locally
- Support debugging and patch generation
- Feed compressed understanding back into memory

---

# Inspection Levels

The Microscope Engine should inspect progressively.

```text
file
→ class
→ method/function
→ block
→ exact lines
```

It should stop zooming deeper once enough understanding is achieved.

---

# Main Responsibilities

## 1. Focused Inspection

Inspect only selected targets.

Inputs:
- Telescope routing
- Heatmap priorities
- current task
- failing tests/errors
- relevant symbols

Outputs:
- detailed summaries
- context packs
- dependency relations
- symbol metadata

---

## 2. Symbol Extraction

Extract important code structures.

Examples:

```text
- classes
- methods/functions
- interfaces
- enums
- structs
- imports
- decorators
- annotations
- routes/controllers
```

Example:

```json
{
  "file": "src/player/StaminaSystem.cs",
  "symbols": [
    {
      "name": "Regenerate",
      "kind": "method",
      "line_start": 52,
      "line_end": 91
    },
    {
      "name": "Drain",
      "kind": "method",
      "line_start": 93,
      "line_end": 127
    }
  ]
}
```

---

## 3. Local Dependency Understanding

The Microscope Engine should understand local relationships.

Example:

```text
Regenerate()
├── checks sprint state
├── checks dodge cooldown
├── reads PlayerStats
└── updates stamina value
```

This creates local reasoning graphs.

---

# Context Decompression

The Microscope Engine performs decompression.

## Compression

```text
Raw code
→ compressed summary
```

## Decompression

```text
Compressed summary
→ exact needed code
```

The Microscope Engine should load only:
- relevant files
- relevant symbols
- related tests
- nearby dependencies

Never unrelated systems.

---

# Context Pack Generation

One of the Microscope Engine's most important tasks.

## Example Context Pack

```json
{
  "task": "Fix stamina regeneration after dodge.",
  "selected_symbols": [
    "StaminaSystem.Regenerate",
    "DodgeAbility.Execute"
  ],
  "selected_files": [
    "src/player/StaminaSystem.cs",
    "src/player/DodgeAbility.cs"
  ],
  "related_tests": [
    "tests/player/StaminaSystemTests.cs"
  ],
  "local_dependencies": [
    "PlayerStats",
    "MovementState"
  ],
  "heat_reasons": [
    "No direct dodge/stamina interaction tests found."
  ]
}
```

This context pack becomes the active model context.

---

# Inspection Strategies

## Minimal Inspection

Used when:
- confidence is already high
- file is stable
- bug is localized

Inspect:
- exact function only

---

## Medium Inspection

Used when:
- confidence moderate
- dependencies matter
- multiple functions interact

Inspect:
- file + related symbols

---

## Deep Inspection

Used when:
- memory confidence low
- high blast radius
- architecture unclear
- repeated failures

Inspect:
- subsystem cluster
- multiple files
- dependency chain
- related tests

---

# Verification-Aware Inspection

The Microscope Engine should know:

```text
Which tests verify this code?
Which build step catches this bug?
Which linter/static analyzer applies?
```

This supports safe patch generation.

---

# Exact-Line Focus

The Microscope Engine should eventually narrow attention to exact line ranges.

Example:

```json
{
  "path": "src/player/StaminaSystem.cs",
  "focus_ranges": [
    {
      "start": 61,
      "end": 79,
      "reason": "Possible regeneration state conflict after dodge"
    }
  ]
}
```

This minimizes token usage.

---

# Integration With Heatmap

The Microscope Engine consumes heat decisions.

Example:

```text
Heatmap:
Regenerate() attention score = 91

Microscope:
- load exact function
- load related tests
- inspect local dependencies
- prepare patch context
```

---

# Integration With Memory

After inspection:

```text
inspect code
→ summarize
→ update memory confidence
→ store symbol summary
→ update heatmap
```

This allows OwnAI to become more efficient over time.

---

# Dashboard Integration

The Microscope Engine should power:

```text
- code zoom animations
- active symbol highlighting
- dependency tracing
- exact-line focus view
- live attention routes
```

The user should visually see:

```text
Where OwnAI is currently inspecting.
```

---

# MVP Implementation

## Microscope Engine v0.1

Must support:
- file loading
- symbol extraction
- function detection
- focused context pack generation
- task-linked file selection
- related test detection

Outputs:

```text
.ownai/memory/warm/context_packs/
```

Example:

```text
context_pack_0001.json
```

---

# Future Versions

## v0.2
- Tree-sitter integration
- AST parsing
- dependency tracing

## v0.3
- exact-line attention
- semantic symbol understanding
- automatic local graph building

## v0.4
- multi-thread inspection
- predictive dependency loading
- autonomous verification routing

## v0.5
- real-time repo visualization
- interactive code focus overlays
- adaptive decompression strategies

---

# Core Rule

```text
Inspect only what is necessary to solve the task safely.
```
