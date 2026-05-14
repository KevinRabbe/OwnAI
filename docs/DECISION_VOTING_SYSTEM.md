# OwnAI Decision Voting System

The Decision Voting System prevents any single subsystem from overtaking global cognition control.

OwnAI operates through:

```text
systems proposing actions
→ voting
→ Decision Engine selecting outcome
→ State Layer enforcing execution
```

---

# Core Principle

```text
Systems vote.
Decision Engine decides.
State Machine enforces.
```

No subsystem owns global execution authority.

---

# Main Goals

- Prevent subsystem domination
- Improve explainability
- Improve safety
- Support modular cognition
- Support replay analysis
- Make autonomous execution controllable
- Enable weighted adaptive reasoning

---

# Voting Flow

```text
Event occurs
→ systems analyze event
→ systems produce votes
→ Decision Engine aggregates votes
→ final decision selected
→ State Layer validates permissions
→ execution occurs
→ observability records reasoning
```

---

# Example

```text
Patch generated.

Patch Quality Engine:
vote = simplify
confidence = 0.91

Verifier:
vote = retry_verification
confidence = 0.84

Token Economy:
vote = compress_context
confidence = 0.76

Replay Engine:
vote = reuse_previous_fix_pattern
confidence = 0.67

Decision Engine:
finalDecision = simplify_then_verify
```

---

# Voting Sources

Possible voting systems:

```text
- Heatmap Engine
- Focus Lens Engine
- Replay Engine
- Confidence Engine
- Patch Quality Engine
- Verification Layer
- Token Economy Engine
- Prediction Engine
- Environment Awareness
- Knowledge Graph Engine
- Thread Coordinator
- Skill Engine
- Hallucination Guard
```

---

# Vote Structure

Example:

```json
{
  "source": "patch-quality-engine",
  "vote": "simplify_patch",
  "confidence": 0.91,
  "priority": "high",
  "reason": "Complexity exceeds project intent.",
  "metadata": {
    "cyclomaticComplexityIncrease": 18,
    "projectIntent": "minimalist"
  }
}
```

---

# Vote Categories

## Execution Votes

Examples:

```text
continue
pause
retry
abort
ask_user
```

---

## Context Votes

Examples:

```text
expand_context
compress_context
reload_memory
narrow_focus
widen_focus
```

---

## Verification Votes

Examples:

```text
verify_more
verification_passed
retry_tests
rollback_patch
```

---

## Routing Votes

Examples:

```text
use_local_model
escalate_model
reduce_threads
increase_parallelism
```

---

# Weighted Voting

Votes may be weighted differently.

Examples:

```text
Hallucination Guard
→ high authority during uncertainty

Token Economy
→ higher authority under budget pressure

Environment Awareness
→ higher authority on weak hardware

Patch Quality
→ higher authority in minimalist mode
```

---

# Decision Engine Responsibilities

The Decision Engine should:

```text
- aggregate votes
- evaluate confidence
- evaluate project intent
- evaluate current state
- evaluate permissions
- choose final action
- produce explanation
```

---

# State Layer Responsibilities

The State Layer enforces:

```text
- operating mode restrictions
- approval requirements
- safety policies
- queue permissions
- resource limits
- rollback policies
```

Even if systems vote for execution:

```text
State Layer may still deny action.
```

---

# Replay Integration

Replay should analyze:

```text
- which votes led to success
- which votes caused failures
- which systems over-voted
- which decisions wasted tokens
- which vote patterns improved outcomes
```

This enables adaptive voting improvement.

---

# Observability Integration

The cognition timeline should record:

```text
- all major votes
- confidence levels
- final decision
- rejected alternatives
- reasoning summaries
```

Example:

```text
Patch Quality voted simplify_patch (0.91)
Verifier voted retry_verification (0.84)
Decision Engine selected simplify_then_verify
```

---

# Future Direction

Eventually the voting system may support:

```text
- adaptive weighted voting
- historical trust scoring
- skill-specialized voting
- project-specific voting profiles
- user-adjustable governance
```

---

# Core Rule

```text
OwnAI should behave like coordinated cognition,
not a single uncontrollable autonomous loop.
```
