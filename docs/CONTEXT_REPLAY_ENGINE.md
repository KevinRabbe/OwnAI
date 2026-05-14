# OwnAI Context Replay Engine

The Context Replay Engine is a self-improvement system focused on reducing unnecessary context usage.

Its purpose is to replay previous tasks and discover how the same result could have been achieved with:

- fewer tokens
- fewer files
- fewer tool calls
- fewer retries
- less RAM
- less context pollution

## Core Principle

```text
The best context is not the largest context.
The best context is the smallest successful context.
```

---

# Main Goals

- Reduce token usage over time
- Improve attention routing
- Detect unnecessary inspections
- Optimize zoom-depth decisions
- Improve context-pack generation
- Build minimal successful workflows
- Feed improvements into the Attention Optimizer

---

# Replay Flow

```text
completed task
→ replay recorded execution
→ remove unnecessary context
→ compare outcomes
→ identify minimal successful path
→ generate optimization report
→ update attention rules
```

---

# Replay Analysis Questions

The engine should ask:

```text
Which files were actually necessary?
Which loaded files were never used?
Could the correct function have been targeted earlier?
Did the agent zoom too deeply?
Did the agent inspect unrelated systems?
Could a smaller model have solved this?
Could fewer retries have succeeded?
Which tool calls added no value?
```

---

# Replay Metrics

Track:

```text
- files loaded
- functions loaded
- tokens consumed
- RAM used
- retries
- tool calls
- successful patch quality
- verification cost
- context pack size
```

---

# Minimal Successful Path

One of the most important outputs.

Example:

```text
Minimal Successful Path:
1. Load stack trace
2. Load StaminaSystem.Regenerate()
3. Load DodgeAbility.Execute()
4. Load related test
5. Patch stamina reset logic
6. Run stamina test suite
```

This becomes reusable experience data.

---

# Integration With Attention Optimizer

The Context Replay Engine feeds optimization data into:

```text
- Heatmap weights
- Telescope zoom rules
- Microscope loading behavior
- context budget rules
- retry strategies
- skill selection
```

This is how OwnAI becomes more efficient over time.

---

# Replay Modes

## Passive Replay

Runs after completed tasks.

## Simulation Replay

Re-simulates old tasks using different context strategies.

---

# Dashboard Integration

The dashboard should show:

```text
Original Run:
42k tokens
18 files
4 retries

Optimized Replay:
9k tokens
4 files
1 retry

Estimated Efficiency Gain:
78%
```

---

# MVP Implementation

## Context Replay Engine v0.1

Must support:
- recording task runs
- recording loaded files
- recording token estimates
- recording retries
- replay summary generation
- minimal successful path extraction

Outputs:

```text
.ownai/learning/context_replays.jsonl
```

---

# Core Rule

```text
Every completed task should teach OwnAI how to solve similar tasks with less context.
```
