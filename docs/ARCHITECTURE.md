# OwnAI Architecture

## Core Architecture

```text
User Task
→ Cortex Engine
→ Telescope Engine
→ Heatmap Engine
→ Microscope Engine
→ Skill Engine
→ Tool Execution
→ Test/Build Verification
→ Git Actions
→ Memory Compression
→ Updated Knowledge State
```

---

# Core Systems

## Cortex Engine

Purpose:
- Attention management
- Context compression/decompression
- Cache prioritization
- Memory confidence management
- Attention budgeting

Responsibilities:
- Decide what deserves tokens/RAM/tool calls
- Maintain hot/warm/cold memory layers
- Decide what to ignore
- Track known vs unknown repo areas

---

## Telescope Engine

Purpose:
Strategic repository navigation.

Responsibilities:
- Build global repo map
- Detect frameworks/languages
- Detect important systems
- Identify hotspots
- Decide zoom depth
- Route attention to important areas

Zoom levels:

```text
repo
→ subsystem
→ folder
→ file
→ class
→ function
→ exact lines
```

---

## Microscope Engine

Purpose:
Deep tactical inspection.

Responsibilities:
- Inspect exact functions/classes
- Extract symbols and dependencies
- Build compressed summaries
- Generate focused context packs
- Minimize unnecessary context loading

---

## Heatmap Engine

Purpose:
The attention system of OwnAI.

Heat categories:
- Risk
- Activity
- Unknownness
- Task relevance
- Blast radius
- Memory confidence
- Test coverage
- Dependency impact

Important concept:

```text
Attention Score =
Task Relevance ×
(Unknownness + Risk + Activity + Blast Radius)
```

---

## Memory System

### Hot Memory
- active tasks
- selected files
- latest logs/errors
- current tests

### Warm Memory
- repo summaries
- file summaries
- dependency graph
- recent actions

### Long-Term Memory
- solved bugs
- learned patterns
- project conventions
- failed attempts
- architecture summaries

---

## Skill Engine

Skills are reusable autonomous workflows.

Examples:
- analyze_repo
- fix_build_error
- write_tests
- apply_patch
- run_verification
- update_memory

Each skill contains:
- workflow logic
- allowed tools
- retry rules
- success metrics
- memory hooks

---

## Git/GitHub Engine

Responsibilities:
- branches
- diffs
- commits
- pull requests
- rollback
- issue integration
- worktrees

Git is a core safety system.

---

## Model Layer

Models are replaceable.

Initial backend:
- Ollama

Possible models:
- Qwen Coder
- DeepSeek Coder
- Devstral
- CodeLlama
- Mistral

The product is the agent system, not the model.
