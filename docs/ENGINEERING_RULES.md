# OwnAI Engineering Rules

These rules exist to prevent architecture drift and uncontrolled complexity.

---

# 1. Everything Must Be Version Controlled

Every meaningful change must be traceable.

Required:

```text
- Git commits
- Changelog updates
- Architecture decision notes
- Patch summaries
- Verification results
```

OwnAI itself should eventually generate:

```text
- patch reports
- replay reports
- verification reports
- architecture change summaries
```

---

# 2. Every System Must Be Modular

No giant god-classes.

Every system should be:

```text
- isolated
- testable
- replaceable
- understandable
```

---

# 3. OwnAI Must Understand OwnAI

All systems must expose:

```text
- clear interfaces
- structured state
- documented outputs
- explainable reasoning
```

---

# 4. Attention Is a Limited Resource

OwnAI should minimize:

```text
- unnecessary context
- unnecessary token usage
- unnecessary file loading
- unnecessary threads
```

The smallest successful context is preferred.

---

# 5. Verification Before Trust

No patch should be trusted without verification.

Verification examples:

```text
- tests
- builds
- linting
- static analysis
- replay comparison
```

---

# 6. Parallelism Must Be Adaptive

Threads are optional acceleration tools.

They should be used only when:

```text
expected_value > thread_cost
```

---

# 7. New Ideas Must Improve Existing Systems

Avoid architecture chaos.

Rule:

```text
Improve systems.
Do not endlessly create disconnected systems.
```

---

# 8. State Over Prompts

Prompts are temporary.

Persistent cognition should come from:

```text
- memory
- attention
- replay
- verification
- learning
- structured state
```

---

# 9. Local-First Design

OwnAI should function on:

```text
- weak hardware
- low VRAM systems
- CPU-assisted workflows
```

More hardware should unlock more cognition layers, not just brute force.

---

# 10. Every Task Should Improve Future Tasks

All completed tasks should contribute to:

```text
- replay optimization
- memory improvement
- better attention routing
- strategy evolution
- lower token usage
```
