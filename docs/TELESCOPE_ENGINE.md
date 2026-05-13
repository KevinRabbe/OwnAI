# OwnAI Telescope Engine

The Telescope Engine is the strategic navigation layer of OwnAI.

Its purpose is to understand the repository globally before the Microscope Engine performs deep inspections.

## Core Principle

```text
The Telescope Engine answers:
Where should the agent look?
How deeply should it zoom?
```

The Telescope Engine works together with:
- Cortex Engine
- Heatmap Engine
- Memory System
- Microscope Engine

---

# Main Goals

- Build a global repository map
- Detect important systems and modules
- Identify architecture patterns
- Route agent attention efficiently
- Avoid unnecessary deep scans
- Decide zoom depth dynamically
- Feed the Microscope Engine with focused targets

---

# Navigation Levels

The Telescope Engine works hierarchically.

```text
Repository
→ Subsystem
→ Folder
→ File
→ Class
→ Function
→ Exact lines
```

It should stay zoomed out unless deeper inspection is justified.

---

# Main Responsibilities

## 1. Repository Mapping

Build a high-level understanding of the repo.

Inputs:
- folder structure
- language/framework detection
- dependency graph
- entry points
- build/test commands
- memory summaries

Outputs:
- subsystem map
- architecture map
- dependency clusters

---

## 2. Architecture Detection

Detect patterns such as:

```text
- MVC
- ECS
- layered architecture
- service-oriented
- event-driven
- monolith
- microservices
- React frontend
- Node backend
- Unity/Godot project
```

The Telescope should create compressed architectural understanding.

Example:

```json
{
  "repo_type": "game_project",
  "architecture": "ecs_like",
  "languages": ["csharp"],
  "important_systems": [
    "combat",
    "movement",
    "inventory",
    "save_system"
  ]
}
```

---

## 3. Hotspot Routing

The Telescope Engine consumes heatmap data.

It asks:

```text
Which repo areas are:
- active?
- unknown?
- risky?
- task relevant?
```

Then it decides:

```text
Ignore
Cache
Refresh
Zoom in
Verify
```

---

## 4. Zoom Depth Decisions

The Telescope Engine decides how deeply OwnAI should inspect.

Example:

```text
Task:
Fix stamina regeneration after dodge.

Decision:
- repo-level scan unnecessary
- subsystem-level scan sufficient
- zoom to movement/stamina cluster
- function-level inspection required
```

---

# Attention Routing

The Telescope Engine is the strategic attention router.

It should minimize:
- tokens
- RAM
- unnecessary context
- deep scans
- repeated inspections

It should maximize:
- relevant understanding
- task focus
- compressed navigation

---

# Telescope Decision Flow

```text
load repo memory
→ inspect heatmap
→ detect task relevance
→ identify affected subsystems
→ choose zoom depth
→ route targets to Microscope Engine
→ receive inspection summaries
→ update navigation map
```

---

# Example Workflow

## User Task

```text
Fix multiplayer desync after sprint.
```

## Telescope Actions

```text
1. Detect relevant keywords:
   - multiplayer
   - desync
   - sprint

2. Find related systems:
   - networking
   - movement
   - prediction
   - stamina

3. Load heatmap:
   - NetworkSync.cs hot
   - PlayerMovement.cs partly known
   - SprintPrediction.cs high risk

4. Choose zoom depth:
   - function-level for prediction logic
   - file-level for movement system

5. Route inspection targets to Microscope Engine
```

---

# Repository Zones

The Telescope Engine should divide repositories into logical zones.

Example:

```json
{
  "zones": [
    {
      "name": "movement_system",
      "paths": [
        "src/player/",
        "src/movement/"
      ],
      "heat": 78,
      "knowledge_state": "PARTLY_KNOWN"
    },
    {
      "name": "ui",
      "paths": ["src/ui/"],
      "heat": 12,
      "knowledge_state": "KNOWN"
    }
  ]
}
```

Zones help OwnAI avoid scanning unrelated systems.

---

# Navigation Graph

The Telescope Engine should eventually build a graph.

Example:

```text
MovementSystem
├── depends on StaminaSystem
├── connected to InputSystem
├── triggers AnimationSystem
└── syncs through NetworkPrediction
```

This graph becomes part of the repo memory.

---

# Telescope Context Packs

The Telescope Engine should prepare compressed navigation packs.

Example:

```json
{
  "task": "Fix sprint stamina bug",
  "relevant_zones": [
    "movement_system",
    "stamina_system"
  ],
  "selected_files": [
    "PlayerMovement.cs",
    "StaminaSystem.cs"
  ],
  "zoom_depth": "function",
  "ignored_zones": [
    "ui",
    "audio",
    "build_tools"
  ]
}
```

---

# Dashboard Integration

The Telescope Engine should drive the global repo map UI.

Visual concepts:

```text
- repo galaxy map
- subsystem clusters
- heat overlays
- active attention routes
- zoom transitions
```

The user should see:

```text
Where OwnAI is focusing.
Why it is focusing there.
How deeply it is inspecting.
```

---

# MVP Implementation

## Telescope Engine v0.1

Must support:
- folder tree scan
- language detection
- repo zones
- heatmap integration
- task keyword routing
- zoom depth selection
- relevant file selection

Outputs:

```text
.ownai/memory/warm/navigation_map.json
```

---

# Future Versions

## v0.2
- subsystem clustering
- architecture detection
- dependency graph integration

## v0.3
- semantic navigation
- graph-based routing
- symbol-level targeting

## v0.4
- parallel thread routing
- autonomous focus shifting
- architecture evolution tracking

## v0.5
- live interactive repo map
- animated attention routing
- predictive hotspot analysis

---

# Core Rule

```text
Stay zoomed out until deeper inspection becomes necessary.
```
