# OwnAI Goal Hierarchy & Intent Architecture

The Goal Hierarchy & Intent Architecture gives OwnAI long-term directional understanding beyond immediate tasks.

## Core Principle

```text
OwnAI should optimize for intent alignment,
not only local task completion.
```

Without intent hierarchy, autonomous systems tend toward:

```text
- feature creep
- overengineering
- architecture drift
- token waste
- local optimization that harms long-term goals
```

The hierarchy system keeps execution aligned with:

```text
vision
→ goals
→ subgoals
→ tasks
→ actions
```

---

# Main Goals

- Preserve long-term direction
- Prevent architecture drift
- Prevent overengineering
- Support coworker-style reasoning
- Support autonomous prioritization
- Improve simulation quality
- Improve replay usefulness
- Align decisions with user intent

---

# Hierarchy Structure

## 1. Vision

Highest-level project philosophy.

Examples:

```text
- OwnAI should remain local-first.
- OwnAI should prioritize efficiency over brute force.
- OwnAI should remain modular.
- Users should own their AI.
```

Vision changes rarely.

---

## 2. Goals

Large strategic objectives.

Examples:

```text
- reduce hardware requirements
- improve replay quality
- improve cognition stability
- improve observability
```

Goals may span weeks or months.

---

## 3. Subgoals

Specific measurable progress areas.

Examples:

```text
- improve compression
- reduce token waste
- improve patch quality
- improve state transitions
```

---

## 4. Tasks

Concrete execution units.

Examples:

```text
- refactor replay compressor
- add token metrics
- patch state validator
```

---

## 5. Actions

Immediate executable operations.

Examples:

```text
- modify file
- run tests
- update threshold
- regenerate summary
```

---

# Example Hierarchy

```text
Vision:
OwnAI should remain local-first.

Goal:
Reduce hardware requirements.

Subgoal:
Improve replay compression.

Task:
Refactor replay summarization.

Action:
Modify replay threshold logic.
```

---

# Intent Alignment

Every major action should be able to answer:

```text
Which goal does this support?
```

If no meaningful alignment exists:

```text
- reduce priority
- request approval
- reject action
- mark as drift risk
```

---

# Intent Misalignment Examples

## Example 1 — Overengineering

```text
Goal:
Keep replay lightweight.

Proposed action:
Add distributed replay cluster system.

Result:
Intent mismatch detected.
```

---

## Example 2 — Token Waste

```text
Goal:
Reduce resource usage.

Proposed action:
Run expensive deep simulation unnecessarily.

Result:
Simulation rejected.
```

---

# Intent Signals

Intent alignment may use:

```text
- project vision
- operating mode
- governance profile
- token economy
- replay lessons
- architecture philosophy
- user-defined priorities
- environment constraints
```

---

# Integration With Other Systems

## Decision Voting

Systems may vote based on intent alignment.

Example:

```text
Patch Quality:
vote = simplify_patch
reason = aligns with minimalist architecture goal
```

---

## Simulation Layer

Simulations may forecast:

```text
- alignment score
- drift probability
- long-term maintenance cost
```

---

## Governance Layer

Governance may block:

```text
- architecture drift
- unauthorized expansion
- anti-vision changes
```

---

## Replay Engine

Replay should learn:

```text
- which actions aligned best with long-term goals
- which actions caused drift
- which architectures stayed maintainable
```

---

## Focus Lens

Intent hierarchy may influence focus depth.

Example:

```text
Minimalist goal active
→ reduce context expansion
→ prefer smaller patch scope
```

---

# Goal Lifecycles

Goals may be:

```text
active
paused
completed
archived
rejected
experimental
```

---

# Goal Conflict Resolution

Sometimes goals conflict.

Example:

```text
Goal A:
maximize quality

Goal B:
minimize token usage
```

Resolution uses:

```text
- voting
- governance profile
- operating mode
- simulation
- user priority
```

---

# Dashboard Integration

The UI should show:

```text
Current Vision
Active Goals
Subgoal Progress
Task Alignment
Drift Risk
Intent Confidence
```

Example:

```text
Current Goal:
Reduce replay token usage

Current Task:
Replay compressor refactor

Intent Alignment:
92%

Drift Risk:
Low
```

---

# Replay Integration

Replay should track:

```text
- which goals were completed successfully
- which goal paths caused drift
- which subgoal structures improved outcomes
- which visions produced stable systems
```

---

# Core Rule

```text
Tasks should exist to serve goals.
Goals should exist to serve vision.
```
