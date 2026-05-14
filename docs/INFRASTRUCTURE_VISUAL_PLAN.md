# OwnAI Visual Infrastructure Plan

This document shows the complete OwnAI infrastructure as visual architecture diagrams.

The goal is to make the system understandable before implementation grows too large.

---

# 1. High-Level System Architecture

```mermaid
flowchart TD
    User[User / Developer]
    UI[Dashboard UI]
    Cortex[Cortex Engine]

    Memory[Memory System]
    Heatmap[Heatmap Engine]
    Telescope[Telescope Engine]
    Microscope[Microscope Engine]

    Skills[Skill Engine]
    Git[Git / GitHub Engine]
    Verify[Test / Build Verifier]
    Models[Model Adapter Layer]

    Learning[Self-Learning Layer]

    User --> UI
    UI --> Cortex

    Cortex --> Memory
    Cortex --> Heatmap
    Cortex --> Telescope
    Cortex --> Microscope
    Cortex --> Skills
    Cortex --> Git
    Cortex --> Verify
    Cortex --> Models
    Cortex --> Learning

    Memory --> Heatmap
    Heatmap --> Telescope
    Telescope --> Microscope
    Microscope --> Skills
    Skills --> Verify
    Skills --> Git
    Verify --> Learning
    Git --> Learning
    Learning --> Memory
    Learning --> Heatmap
```

---

# 2. Core Cognitive Loop

```mermaid
flowchart LR
    Task[Task Received]
    LoadMemory[Load Memory]
    Heat[Calculate Heatmap]
    Telescope[Route Attention / Telescope]
    Microscope[Inspect Deeply / Microscope]
    Context[Build Context Pack]
    Skill[Run Skill]
    Patch[Apply Patch]
    Verify[Run Tests / Build]
    Reflect[Reflection]
    Replay[Context Replay]
    UpdateMemory[Update Memory]

    Task --> LoadMemory
    LoadMemory --> Heat
    Heat --> Telescope
    Telescope --> Microscope
    Microscope --> Context
    Context --> Skill
    Skill --> Patch
    Patch --> Verify
    Verify --> Reflect
    Reflect --> Replay
    Replay --> UpdateMemory
    UpdateMemory --> LoadMemory
```

---

# 3. Repository Understanding Pipeline

```mermaid
flowchart TD
    Repo[Repository]
    Scanner[Repo Scanner]
    Hashes[File Hashes]
    Summary[Repo Summary]
    FileSummaries[File Summaries]
    DependencyGraph[Dependency Graph]
    Heatmap[Heatmap State]
    NavMap[Navigation Map]
    ContextPacks[Context Packs]

    Repo --> Scanner
    Scanner --> Hashes
    Scanner --> Summary
    Scanner --> FileSummaries
    Scanner --> DependencyGraph
    FileSummaries --> Heatmap
    DependencyGraph --> Heatmap
    Heatmap --> NavMap
    NavMap --> ContextPacks
```

---

# 4. Memory Infrastructure

```mermaid
flowchart TD
    Hot[Hot Memory]
    Warm[Warm Memory]
    Long[Long-Term Memory]
    Learning[Learning Store]

    Hot --> Warm
    Warm --> Long
    Learning --> Long

    HotFiles[Active Files / Errors / Tests]
    WarmFiles[Repo Summary / File Summaries / Heatmap]
    LongFiles[Lessons / Solved Bugs / Failed Attempts]
    LearningFiles[Replays / Reflections / Patterns]

    Hot --> HotFiles
    Warm --> WarmFiles
    Long --> LongFiles
    Learning --> LearningFiles
```

Expected structure:

```text
.ownai/
├── memory/
│   ├── hot/
│   ├── warm/
│   └── long_term/
├── cache/
└── learning/
```

---

# 5. Attention / Heatmap Flow

```mermaid
flowchart TD
    MemoryConfidence[Memory Confidence]
    Activity[Activity]
    Risk[Risk]
    Unknownness[Unknownness]
    BlastRadius[Blast Radius]
    Coverage[Coverage Gap]
    TaskRelevance[Task Relevance]

    Score[Attention Score]
    Decision[Attention Decision]

    MemoryConfidence --> Score
    Activity --> Score
    Risk --> Score
    Unknownness --> Score
    BlastRadius --> Score
    Coverage --> Score
    TaskRelevance --> Score

    Score --> Decision

    Decision --> Ignore[Ignore]
    Decision --> Cache[Cache]
    Decision --> Refresh[Refresh]
    Decision --> Zoom[Zoom In]
    Decision --> Verify[Verify]
```

---

# 6. Telescope and Microscope Relationship

```mermaid
flowchart LR
    RepoMap[Global Repo Map]
    Zones[Subsystem Zones]
    Focus[Focus Target]
    Depth[Zoom Depth]
    File[File Level]
    Symbol[Symbol Level]
    Lines[Exact Lines]
    Context[Focused Context Pack]

    RepoMap --> Zones
    Zones --> Focus
    Focus --> Depth
    Depth --> File
    File --> Symbol
    Symbol --> Lines
    Lines --> Context
```

Rule:

```text
Telescope decides where and how deep.
Microscope performs the deep inspection.
```

---

# 7. Skill Execution Flow

```mermaid
flowchart TD
    SkillSelect[Select Skill]
    Inputs[Prepare Inputs]
    Tools[Run Tools]
    Patch[Generate Patch]
    Tests[Run Verifier]
    Retry{Passed?}
    Result[Result Summary]
    Memory[Update Memory]

    SkillSelect --> Inputs
    Inputs --> Tools
    Tools --> Patch
    Patch --> Tests
    Tests --> Retry
    Retry -- No --> Inputs
    Retry -- Yes --> Result
    Result --> Memory
```

---

# 8. Self-Learning Layer

```mermaid
flowchart TD
    Run[Completed Task Run]
    Reflection[Reflection Engine]
    Replay[Context Replay Engine]
    Attention[Attention Optimizer]
    Confidence[Confidence Engine]
    Experience[Experience Graph]
    Patterns[Pattern Extraction]
    Strategy[Strategy Engine]

    Run --> Reflection
    Run --> Replay
    Reflection --> Experience
    Replay --> Attention
    Experience --> Patterns
    Patterns --> Strategy
    Confidence --> Strategy
    Attention --> Strategy
    Strategy --> FutureRuns[Future Runs]
```

---

# 9. Git-Safe Autonomy Flow

```mermaid
flowchart TD
    Task[Task]
    Branch[Create Branch / Worktree]
    Patch[Apply Patch]
    Verify[Run Tests / Build]
    Diff[Show Diff]
    Approval{User Approval?}
    Commit[Commit]
    PR[Open Pull Request]
    Rollback[Rollback]

    Task --> Branch
    Branch --> Patch
    Patch --> Verify
    Verify --> Diff
    Diff --> Approval
    Approval -- Yes --> Commit
    Commit --> PR
    Approval -- No --> Rollback
```

---

# 10. Package Infrastructure

```mermaid
flowchart TD
    Apps[apps]
    Packages[packages]
    Docs[docs]

    Dashboard[apps/dashboard]

    AgentCore[packages/agent-core]
    RepoScanner[packages/repo-scanner]
    Memory[packages/memory-system]
    Heatmap[packages/heatmap-engine]
    Telescope[packages/telescope-engine]
    Microscope[packages/microscope-engine]
    Skills[packages/skill-engine]
    Git[packages/git-engine]
    Verifier[packages/verifier]
    Models[packages/model-adapters]
    Learning[packages/learning]
    UI[packages/ui]

    Apps --> Dashboard
    Packages --> AgentCore
    Packages --> RepoScanner
    Packages --> Memory
    Packages --> Heatmap
    Packages --> Telescope
    Packages --> Microscope
    Packages --> Skills
    Packages --> Git
    Packages --> Verifier
    Packages --> Models
    Packages --> Learning
    Packages --> UI
```

---

# 11. Implementation Order

```mermaid
flowchart TD
    RepoScanner[1. Repo Scanner]
    Memory[2. Memory System]
    Heatmap[3. Heatmap Engine]
    Telescope[4. Telescope Engine]
    Microscope[5. Microscope Engine]
    Context[6. Context Packs]
    Git[7. Git Engine]
    Verify[8. Test/Build Verifier]
    Skills[9. Skill Engine]
    AgentCore[10. Agent Core]
    UI[11. Dashboard UI]
    Learning[12. Self-Learning Layer]

    RepoScanner --> Memory
    Memory --> Heatmap
    Heatmap --> Telescope
    Telescope --> Microscope
    Microscope --> Context
    Context --> Git
    Git --> Verify
    Verify --> Skills
    Skills --> AgentCore
    AgentCore --> UI
    UI --> Learning
```

---

# Final Infrastructure Rule

```text
Every module should be independently understandable, testable, replaceable, and improvable by OwnAI itself.
```
