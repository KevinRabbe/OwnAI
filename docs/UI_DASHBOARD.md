# OwnAI Dashboard UI

The OwnAI Dashboard is the visible control layer for the autonomous coding system.

It should not feel like a normal chatbot. It should feel like a command center where the user can watch OwnAI inspect, reason, test, patch, and verify software in real time.

## Core Principle

```text
OwnAI should not hide autonomy.
OwnAI should make autonomous work visible, inspectable, and controllable.
```

The UI exists to show:
- what OwnAI is doing
- where it is looking
- why it is focusing there
- what it knows
- what it does not know
- what changed
- what passed or failed

---

# Visual Direction

## Style

Fictional User Interface inspired by a Jarvis-like command center.

Avoid copying protected branding directly. The goal is the feeling:
- futuristic
- technical
- precise
- glass/holographic
- alive but functional

## Visual Language

```text
Dark background
Glassmorphism panels
Thin glowing borders
Subtle scanlines
HUD-style labels
Animated status indicators
Mechanical panel transitions
Code-first typography
```

## Color System

```text
Arc Blue      #00D2FF  standard operation / known / stable
Warning Gold  #FFAD00  thinking / partial confidence / attention needed
Alert Red     #FF0000  errors / failing tests / high-risk areas
System Green  #00FF88  verified / tests passing / safe state
Deep Purple   #8A5CFF  hot cache / active memory / agent threads
Neutral Gray  #6B7280  unknown / inactive / unscanned
```

---

# Typography

Suggested fonts:

```text
HUD / labels: Orbitron
Code / logs: JetBrains Mono
Main UI text: Inter or Geist
```

Code readability has priority over style.

---

# First Dashboard Layout

```text
┌─────────────────────────────────────────────────────────────┐
│ Top HUD Bar                                                  │
│ Repo | Branch | Model | Protocol | Memory | Test Status      │
├───────────────┬───────────────────────────────┬─────────────┤
│ Left Panel    │ Center Panel                  │ Right Panel │
│ Repo Map      │ Command Console / Task View   │ Agent Brain │
│ Heatmap       │ Visible Task Execution        │ Protocols   │
│ Telescope     │                               │ Memory      │
├───────────────┴───────────────────────────────┴─────────────┤
│ Bottom Panel: Tool Output / Logs / Diff / Tests              │
└─────────────────────────────────────────────────────────────┘
```

---

# UI Regions

## 1. Top HUD Bar

Purpose:
Always show the current system state.

Displays:
- selected repository
- current branch
- active model
- active protocol
- Git status
- test status
- memory status
- active task count

Example:

```text
OWNAI CORE ONLINE | Repo: Ashen-Hearth | Branch: ownai/debug-stamina | Model: qwen-coder | Protocol: DEBUG | Tests: 14/14 PASS
```

---

## 2. Left Panel — Repository Map

Purpose:
Show where OwnAI is looking.

Contains:
- Telescope Engine map
- subsystem zones
- known/unknown state
- heatmap overlay
- active focus route

Example states:

```text
Movement System    RED     high attention
Inventory System   BLUE    known/stable
UI System          GRAY    unscanned
Save System        GOLD    partly known
```

---

## 3. Center Panel — Command Console / Visible Tasks

Purpose:
Primary interaction area.

Contains:
- user command input
- current plan
- active task cards
- agent progress timeline
- approval checkpoints

Example task cards:

```text
[1] Load repo memory
[2] Calculate heatmap
[3] Zoom into movement system
[4] Write failing stamina test
[5] Apply minimal patch
[6] Run tests
[7] Prepare git diff
```

---

## 4. Right Panel — Agent Brain

Purpose:
Show the internal operational state without exposing raw hidden reasoning.

Contains:
- active skill
- active model
- selected expert/thread
- memory confidence
- context budget
- protocol mode
- autonomy level

Example:

```text
Active Skill: fix_bug_with_tests
Attention Budget: 68%
Memory Confidence: 74%
Context Loaded: 4 files / 2 functions
Autonomy: Normal Mode
```

---

## 5. Bottom Panel — Tool Output

Purpose:
Show concrete verification and execution results.

Tabs:
- Logs
- Tests
- Build
- Git Diff
- Patch Preview
- Replay

Example:

```text
pytest tests/player/test_stamina.py
14 passed in 1.82s
```

---

# Neural Orb

The Neural Orb is a visual status component, not the core product.

It should represent state:

```text
Idle       = slow blue pulse
Thinking   = gold rotating rings
Debugging  = red scan pulse
Verifying  = green pulse
Error      = red fragmented state
Threading  = purple multi-node orbit
```

MVP note:
The first UI does not need a complex 3D orb. A simple animated SVG/canvas placeholder is enough.

---

# Protocol System UI

Protocols are visible operating modes.

## Build Protocol

Purpose:
Fast implementation.

UI:
- Arc Blue
- code/diff focused
- task cards optimized for feature work

## Debug Protocol

Purpose:
Bug fixing.

UI:
- Alert Red accents
- logs and tests prioritized
- failing areas highlighted

## Stealth Protocol

Purpose:
Background cleanup/refactor/docs.

UI:
- Deep Purple / muted blue
- lower priority visible task stream
- requires review before major changes

## Combat Debug Mode

Purpose:
Aggressive retry loop for hard bugs.

UI:
- red/gold warning style
- retry counter visible
- test/build loop prominent

---

# Visible Autonomy

OwnAI should always expose high-level actions.

Show:

```text
Observing...
Planning...
Loading memory...
Calculating heatmap...
Zooming into StaminaSystem.cs...
Writing tests...
Applying patch...
Running verifier...
Updating memory...
Preparing diff...
```

Do not show private chain-of-thought. Show operational state instead.

---

# Approval Points

The user should control dangerous actions.

Suggested approval gates:

```text
Safe Mode:
- ask before editing files

Normal Mode:
- edit files and run tests
- ask before commit

Autonomous Mode:
- create branch
- edit files
- run tests
- commit
- ask before PR creation or merge
```

Dangerous operations require confirmation:
- deleting files
- force push
- dependency upgrades
- mass refactors
- touching secrets/config files
- changing database migrations

---

# MVP UI Scope

The first UI should include only what supports the core loop.

## Must Have

```text
- Top HUD Bar
- Repo selection state
- Model selection state
- Protocol indicator
- Visible task list
- Memory status card
- Heatmap placeholder
- Tool output panel
- Git diff preview placeholder
```

## Not Yet

```text
- full 3D Neural Orb
- voice control
- advanced animations
- marketplace
- multi-user collaboration
- cloud sync
```

---

# Suggested Tech Stack

```text
Frontend: Next.js / React
Styling: Tailwind CSS
Animation: Framer Motion
3D later: Three.js
Code/log font: JetBrains Mono
State management: Zustand or Redux Toolkit
Desktop wrapper later: Tauri
```

The UI should be able to run as a web app first, then optionally become a desktop app.

---

# First Component Breakdown

```text
apps/dashboard/
├── app/
├── components/
│   ├── hud/TopHudBar.tsx
│   ├── repo/RepoMapPanel.tsx
│   ├── tasks/VisibleTaskList.tsx
│   ├── agent/AgentBrainPanel.tsx
│   ├── memory/MemoryStatusCard.tsx
│   ├── heatmap/HeatmapPanel.tsx
│   ├── tools/ToolOutputPanel.tsx
│   └── diff/DiffPreviewPanel.tsx
└── styles/
```

---

# Example Dashboard State

```json
{
  "repo": "KevinRabbe/OwnAI",
  "branch": "main",
  "model": "qwen-coder:local",
  "protocol": "DEBUG",
  "autonomy_mode": "NORMAL",
  "memory": {
    "known_files": 42,
    "unknown_files": 13,
    "hot_cache_items": 8,
    "average_confidence": 0.71
  },
  "tasks": [
    {
      "id": "task_001",
      "label": "Calculate heatmap",
      "status": "running"
    },
    {
      "id": "task_002",
      "label": "Generate context pack",
      "status": "queued"
    }
  ],
  "tests": {
    "status": "passing",
    "passed": 14,
    "failed": 0
  }
}
```

---

# Design Rule

```text
Every visual element should answer one question:
What is OwnAI doing, why, and how safe is it?
```
