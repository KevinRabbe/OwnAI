# OwnAI

OwnAI is an attention-aware autonomous coding system focused on low-memory local AI workflows.

The goal is not to build another chatbot. The goal is to build a visible autonomous software engineering system that can understand repositories, manage context efficiently, write tests, apply patches, run verification loops, and work safely through Git and GitHub.

## Core Philosophy

OwnAI does not maximize context size.
OwnAI maximizes useful attention.

```text
Raw repository
→ compressed repo map
→ known/unknown heatmap
→ task relevance filter
→ focused context pack
→ model action
→ test/git verification
→ updated memory
```

## Main Systems

```text
OwnAI
├── Cortex Engine
├── Telescope Engine
├── Microscope Engine
├── Heatmap Engine
├── Memory System
├── Skill Engine
├── Git/GitHub Engine
├── Test/Build Verifier
├── Model Adapters
└── Dashboard UI
```

## Key Concepts

### Cortex Engine
The attention and memory brain of OwnAI. It decides what matters, what should be cached, what should be ignored, and what should be decompressed into active context.

### Telescope Engine
The strategic navigation layer. It zooms out, understands the global repository map, identifies important systems, and decides where the agent should focus.

### Microscope Engine
The tactical inspection layer. It zooms into folders, files, classes, functions, and exact lines only when needed.

### Heatmap Engine
The agent attention system. It tracks risk, activity, unknownness, memory confidence, test coverage, dependency impact, and task relevance.

### Memory System
Stores compressed understanding of the repository and learns from each task. It uses hot, warm, and long-term memory layers.

### Skill Engine
Reusable autonomous workflows such as `analyze_repo`, `fix_build_error`, `write_tests`, `apply_patch`, `run_verification`, and `update_memory`.

### Git/GitHub Engine
Provides safety, history, collaboration, branches, diffs, pull requests, issues, and learning data.

## MVP Focus

The first milestone is not model training or advanced UI effects.

The first milestone is:

```text
1. Git/GitHub Engine
2. Repo Scanner
3. Memory System
4. Heatmap Engine
5. Telescope/Microscope Navigation
6. Test/Build Loop
7. Ollama Model Adapter
8. Visible Task Execution
```

## Long-Term Vision

OwnAI should become a persistent autonomous software engineering system:

- local-first
- model-agnostic
- low-memory focused
- test-driven
- Git-native
- skill-based
- attention-aware
- transparent through visible task execution

## Status

Early architecture phase.
