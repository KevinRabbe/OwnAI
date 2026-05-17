# OwnAI Task Packet Generator

The Task Packet Generator turns rough user intent into structured operational work packets that models, agents, skills, and automation systems can execute safely and efficiently.

## Core Principle

```text
Users describe intent.
OwnAI creates the operational task packet.
```

The user should not need to manually craft perfect prompts before every task. OwnAI should retrieve context, apply project memory, define scope, add validation, and produce a safe executable task packet automatically.

---

# Main Goals

- Reduce prompt engineering burden for users
- Reduce token waste
- Prevent scope drift
- Preserve project continuity
- Improve automation safety
- Make task execution machine-readable
- Improve model routing
- Improve validation and acceptance tracking
- Support crash/disconnect resume
- Support replay learning

---

# Why Task Packets Matter

A raw request like:

```text
Fix the worker jiggle bug.
```

is too vague for reliable autonomous execution.

OwnAI should transform it into:

```text
- current project state
- task goal
- protected systems
- files to inspect
- likely causes
- rules and non-goals
- validation commands
- acceptance criteria
- commit message
- final report requirements
- stop conditions
```

This gives models better working conditions and lowers the chance of failure.

---

# Task Packet Structure

Example shape:

```json
{
  "taskId": "worker-stuck-recovery",
  "project": "Capital Frontiers",
  "repo": "KevinRabbe/RTS-game",
  "branch": "phase-6-visual-placeholder-pipeline",
  "goal": "Fix worker stuck/jiggle behavior around gather/drop-off interaction targets.",
  "scopeRestrictions": [
    "no_ui_changes",
    "no_networking_changes",
    "no_map_layout_changes"
  ],
  "filesToInspect": [
    "MovementSystem.cs",
    "ResourceGatherSystem.cs",
    "ResourceDepositSystem.cs",
    "ConstructionSystem.cs"
  ],
  "acceptanceCriteria": [
    "Godot build PASS",
    "Tests build PASS",
    "Full tests PASS",
    "Chaos stress PASS",
    "Determinism preserved"
  ],
  "stopCondition": "Stop after commit and final report."
}
```

---

# Required Fields

A task packet should include:

```text
- task id
- project/repo/branch
- current known state
- task goal
- scope boundaries
- protected systems
- files to inspect
- likely causes or hypotheses
- implementation constraints
- validation commands
- acceptance bar
- commit/report format
- stop conditions
```

---

# Optional Fields

Depending on task type:

```text
- security review requirements
- rollback requirements
- recovery point id
- model routing profile
- autonomy level
- skill candidates
- replay lessons
- related GitHub issues
- relevant previous commits
- manual smoke notes
```

---

# Task Packet Generation Flow

```text
rough user request
→ retrieve project memory
→ inspect current repo/task state
→ infer task type
→ detect risk/protected systems
→ select relevant context
→ apply project rules
→ add validation requirements
→ add acceptance criteria
→ generate task packet
→ operator approval if needed
→ queue/execute
```

---

# Automation Benefits

Task packets make automation easier because they expose machine-readable:

```text
- scope
- risk
- validation
- acceptance
- stop conditions
- protected systems
- recovery requirements
- routing profile
```

This allows OwnAI to automate safely instead of improvising from raw text.

---

# Integration With Context Protocol

Task packets should reference context packs instead of dumping excessive history.

The packet should include only high-signal context and links to deeper context if needed.

---

# Integration With Skills

Skills may consume, enrich, or generate task packet sections.

Examples:

```text
planning_skill
→ creates roadmap section

security_review_skill
→ adds security validation section

verification_skill
→ adds validation commands

recovery_skill
→ adds rollback plan
```

---

# Integration With Replay

Replay should store:

```text
- task packet used
- result quality
- validation outcome
- token usage
- model routing decisions
- what context was useful
- what was unnecessary
```

This improves future packet generation.

---

# Integration With Crash/Resume

Task packets must be persisted with task state so interrupted tasks can resume safely.

A task is not complete until:

```text
validation passes
acceptance criteria are met
final report exists
commit state is known
```

---

# Core Rule

```text
A good task packet makes the task easier, safer, cheaper, and more reliable for any model.
```
