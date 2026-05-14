# OwnAI Focus Lens Engine

The Focus Lens Engine is the adaptive attention layer between the Telescope Engine and the Microscope Engine.

It continuously decides how broad or narrow OwnAI's active focus should be.

## Core Principle

```text
OwnAI should dynamically adjust focus instead of loading more context by default.
```

The Focus Lens makes OwnAI efficient by controlling context expansion, compression, zoom depth, exploration width, verification intensity, and hallucination risk.

---

# Position in the Cognition Stack

```text
Telescope Engine
→ strategic wide view

Focus Lens Engine
→ adaptive attention control

Microscope Engine
→ precise technical inspection
```

The Telescope decides where to look.
The Focus Lens decides how much attention to spend.
The Microscope inspects exact details.

---

# Main Goals

- Reduce token waste
- Prevent irrelevant context expansion
- Improve local-model performance
- Lower hallucination risk
- Control long-session drift
- Decide when to compress or decompress context
- Adjust zoom depth dynamically
- Improve task queue efficiency
- Support adaptive hardware scaling

---

# Focus States

## Wide Focus

Used when:

```text
- task is unclear
- confidence is low
- architecture relation is unknown
- multiple systems may be involved
```

Behavior:

```text
- broader Telescope search
- more candidate targets
- lower precision
- more exploration
```

---

## Narrow Focus

Used when:

```text
- task target is clear
- confidence is high
- replay found similar past work
- token pressure is high
```

Behavior:

```text
- fewer files
- exact symbols
- smaller context packs
- minimal model input
```

---

## Precision Focus

Used when:

```text
- patch is being generated
- failing line/function is known
- high-risk file is touched
- verification failure is localized
```

Behavior:

```text
- exact-line context
- focused tests
- strict patch minimalism
```

---

## Compression Focus

Used when:

```text
- context usage approaches budget limit
- long session drift risk rises
- task queue has many pending tasks
- hot context is polluted
```

Behavior:

```text
- compress active state
- preserve verified facts
- discard low-value transient context
- reload structured state
```

---

# Inputs

The Focus Lens consumes signals from:

```text
- Heatmap Engine
- Telescope Engine
- Microscope Engine
- Memory System
- Context Replay Engine
- Token Economy Engine
- Confidence Engine
- Patch Quality Engine
- Verification Layer
- Knowledge Graph Engine
- Task Queue System
- Operating Mode
- Hardware Budget
```

---

# Outputs

The Focus Lens produces:

```text
- focus state
- recommended zoom depth
- max files to load
- max symbols to load
- context expansion permission
- compression recommendation
- hallucination risk warning
- verification intensity
```

---

# Example Decision

```json
{
  "task": "Fix stamina regeneration after dodge",
  "focusState": "precision",
  "recommendedZoomDepth": "symbol",
  "maxFiles": 3,
  "maxSymbols": 6,
  "allowContextExpansion": false,
  "compressionRecommended": false,
  "reasons": [
    "Task target is clear.",
    "Replay found similar movement bug.",
    "Token pressure is moderate.",
    "Confidence is high enough for narrow inspection."
  ]
}
```

---

# Context Compression Trigger

The Focus Lens should trigger compression when:

```text
- context budget usage exceeds threshold
- active context contains stale assumptions
- queue has advanced across multiple tasks
- session is long-running
- hot memory contains too many unrelated artifacts
```

Default threshold:

```text
90% context budget usage
```

---

# Long Session Protection

For long autonomous sessions:

```text
Every N tasks or near context limit:
→ compress active state
→ preserve verified facts
→ preserve queue state
→ preserve unresolved risks
→ preserve patch/replay references
→ clear low-value transient context
→ continue execution
```

---

# Integration With Hallucination Control

The Focus Lens should reduce hallucination risk by:

```text
- avoiding stale hot context
- requiring source-backed facts
- refreshing memory when confidence drops
- preventing context overload
- marking assumptions separately from verified facts
```

---

# Dashboard Integration

The UI can visualize Focus Lens state through:

```text
- focus rings
- zoom fields
- compression pulses
- precision targeting overlays
- context budget pressure
- attention stability
```

All visuals must map to real system state.

---

# Core Rule

```text
More context is not always more intelligence.
Better focus is often more intelligence.
```
