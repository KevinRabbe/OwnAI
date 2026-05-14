# OwnAI Self-Learning Systems

OwnAI should improve over time without needing model training at first.

The first layer of self-improvement is not changing model weights. It is improving:

- attention decisions
- context selection
- skill workflows
- retry strategies
- memory confidence
- heatmap weights
- verifier choices
- project-specific knowledge

## Core Principle

```text
OwnAI should learn from every task it performs.
```

Every run should produce structured experience data:

```text
task
→ selected context
→ skills used
→ tool calls
→ patch attempts
→ test results
→ final result
→ score
→ lesson
→ future rule update
```

---

# Core Self-Learning Systems

```text
Self-Learning Layer
├── Context Replay Engine
├── Attention Optimizer
├── Reflection Engine
├── Confidence Engine
├── Experience Graph
├── Pattern Extraction Engine
├── Retry Intelligence System
└── Strategy Engine
```

---

# 1. Context Replay Engine

Purpose:
Replay completed agent runs and find the minimal successful path.

It asks:

```text
Could this task have been solved with fewer files?
Could fewer tokens have been used?
Could fewer tool calls have been used?
Could the correct target have been selected earlier?
Could a smaller model have handled part of the task?
```

Output:
- reduced context recipe
- wasted context report
- improved attention rules
- replay dataset for future training

---

# 2. Attention Optimizer

Purpose:
Improve how OwnAI spends tokens, RAM, time, and tool calls.

Tracks:
- files loaded
- symbols loaded
- token usage
- RAM usage
- tool calls
- retry count
- success/failure
- unused context

Output:
- better heatmap weights
- better zoom-depth rules
- better context budget rules

---

# 3. Reflection Engine

Purpose:
Analyze why a task succeeded or failed.

It answers:

```text
What worked?
What failed?
Which context mattered?
Which context was unnecessary?
Which skill should be improved?
Which memory entry was wrong or stale?
```

Output:
- task lesson
- skill feedback
- memory update
- failure explanation

---

# 4. Confidence Engine

Purpose:
Estimate when OwnAI should trust itself and when it should slow down.

Confidence types:
- task understanding confidence
- memory confidence
- patch confidence
- verifier confidence
- architecture confidence
- skill confidence

Low confidence can trigger:
- deeper inspection
- more tests
- wider verification
- extra agent thread
- human approval gate

---

# 5. Experience Graph

Purpose:
Store engineering experience as a graph instead of isolated notes.

Example graph:

```text
bug
→ affected files
→ selected context
→ failed attempts
→ successful patch
→ verifier command
→ lesson
→ similar future tasks
```

This allows OwnAI to retrieve similar past situations.

---

# 6. Pattern Extraction Engine

Purpose:
Extract reusable patterns from repeated tasks.

Examples:

```text
Resource path bugs in JavaFX often require package-level verification.
Movement bugs in games often involve input, stamina, animation, and state reset logic.
Async bugs often require checking lifecycle order and stale cached values.
```

Output:
- reusable patterns
- skill improvements
- future fine-tuning data

---

# 7. Retry Intelligence System

Purpose:
Make retries strategic instead of random.

Example escalation:

```text
Retry 1: minimal patch
Retry 2: inspect direct dependencies
Retry 3: write additional tests
Retry 4: spawn parallel thread or ask for approval
```

Output:
- retry strategy profiles
- failure-specific escalation rules

---

# 8. Strategy Engine

Purpose:
Choose the best workflow strategy before acting.

Strategies:
- test-first
- minimal-diff
- investigate-first
- refactor-safe
- high-confidence-only
- parallel-threads
- rollback-safe

The Strategy Engine learns which strategies work best for each repo and task type.

---

# Self-Improvement Safety Rule

OwnAI may improve its own systems only through safe engineering workflow:

```text
create branch
→ inspect isolated package
→ write/update tests
→ patch minimal code
→ run verification
→ show diff
→ require approval
```

OwnAI must not silently mutate its own core logic.

---

# Data Storage

Suggested folder:

```text
.ownai/learning/
├── task_runs.jsonl
├── reflections.jsonl
├── context_replays.jsonl
├── attention_reports.jsonl
├── confidence_reports.jsonl
├── experience_graph.json
├── extracted_patterns.jsonl
├── retry_profiles.json
└── strategy_scores.json
```

---

# Core Rule

```text
Every completed task should make the next similar task cheaper, safer, or faster.
```
