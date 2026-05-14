# OwnAI Operating Modes

OwnAI should have visible operating modes that change autonomy, safety, verification depth, model routing, and UI state.

## Core Principle

```text
Autonomy must be visible, controlled, and mode-aware.
```

---

# Modes

## 1. Normal Mode

Default working mode for regular repository work.

Behavior:

```text
- local-first model routing
- normal verification
- minimal sufficient changes
- approval before risky actions
```

UI color:

```text
Arc Blue
```

---

## 2. Debug Mode

Focused bug-fixing mode.

Behavior:

```text
- prioritizes logs, tests, and errors
- increases heatmap weight for failure areas
- writes or updates tests first when possible
- runs verification loops
```

UI color:

```text
Alert Red
```

---

## 3. Deep Debug Mode

Careful mode for hard issues, repeated failures, or low confidence.

Behavior:

```text
- stricter retry intelligence
- deeper microscope inspection
- optional assisted threads when useful
- stronger verification requirements
- patch report required
```

UI color:

```text
Red + Gold
```

---

## 4. Build Mode

Feature-building mode.

Behavior:

```text
- decomposes tasks into phases
- uses skills for implementation workflows
- writes tests when boundaries are clear
- creates patch records
```

UI color:

```text
Arc Blue + Green
```

---

## 5. Background Maintenance Mode

Low-risk background work mode.

Behavior:

```text
- documentation updates
- memory refresh
- context compression
- non-invasive analysis
- no commits without approval
```

UI color:

```text
Deep Purple / Muted Blue
```

---

## 6. Self-Improvement Mode

Visible and controlled mode where OwnAI improves one of its own systems.

Behavior:

```text
- branch or worktree required
- one module target at a time
- tests required
- patch report required
- approval required before merge
```

Visible flow:

```text
1. Select target module
2. Read module docs/contracts
3. Inspect tests
4. Generate improvement plan
5. Patch isolated module
6. Run module tests
7. Run integration tests
8. Generate patch report
9. Wait for approval
```

UI color:

```text
Purple
```

Core rule:

```text
Self-improvement must never be hidden.
```

---

## 7. Training Gym Mode

Controlled simulation mode for improving OwnAI behavior without touching production code.

Behavior:

```text
- sandbox/worktree only
- no production repo modifications
- no automatic merge
- produces learning reports
- improves skills, routing, confidence, and replay behavior
```

UI color:

```text
Orange / Cyan
```

---

# Mode Selection Signals

OwnAI can recommend a mode based on:

```text
- task type
- risk level
- confidence
- hardware budget
- failing tests
- user autonomy preference
- repository heatmap state
- token budget
```

---

# Core Rule

```text
Mode changes must be visible in the UI and recorded in task history.
```
