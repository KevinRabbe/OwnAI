# OwnAI Project Creation & Planning Workflow

OwnAI should make it easy to create a new project from an idea, name it, plan it through chat, initialize the folder structure, and connect it to Git/GitHub.

## Core Principle

```text
Creating a project should feel like planning with a coworker,
then letting OwnAI turn the plan into a structured repository.
```

OwnAI should support project creation as a first-class workflow, not only work on existing repositories.

---

# Main Goals

- Create new projects from chat
- Help name projects
- Define project intent
- Generate architecture plans
- Create phase-based roadmaps
- Initialize folder structures
- Initialize Git
- Create GitHub repositories
- Create first commits
- Queue implementation phases
- Preserve planning context in memory

---

# User Flow

Example:

```text
User:
I want to build a local password manager for gamers.

OwnAI:
- helps choose project name
- defines project intent
- creates architecture plan
- creates feature roadmap
- creates repo structure
- initializes Git
- optionally creates GitHub repo
- queues first implementation tasks
```

---

# Project Creation Flow

```text
Idea
→ naming
→ intent profile
→ requirements
→ architecture plan
→ phase roadmap
→ folder structure
→ Git initialization
→ GitHub repository creation
→ task queue creation
→ first implementation phase
```

---

# Project Naming

OwnAI should help generate names based on:

```text
- purpose
- audience
- style
- uniqueness
- domain
- branding direction
```

It should support:

```text
- practical names
- product names
- codename names
- technical repo names
```

Example output:

```text
Product Name: VaultForge
Repository Name: vaultforge
Codename: Lockspire
```

---

# Project Intent Setup

Every new project should receive an intent profile.

Example:

```json
{
  "projectName": "VaultForge",
  "intent": "minimalist-production",
  "traits": [
    "local-first",
    "privacy-focused",
    "offline-capable",
    "gamer-oriented"
  ],
  "complexityTolerance": "low",
  "verificationStrictness": "high"
}
```

---

# Planning Through Chat

The chat should behave like a planning workspace.

OwnAI should help define:

```text
- vision
- target users
- core features
- non-goals
- technical stack
- architecture
- MVP scope
- phase roadmap
- risk list
- first tasks
```

The plan should be stored as structured project memory.

---

# Generated Planning Documents

OwnAI should generate:

```text
docs/PROJECT_VISION.md
docs/ROADMAP.md
docs/ARCHITECTURE.md
docs/FEATURES.md
docs/DECISIONS.md
docs/DEVELOPMENT_PLAN.md
```

Optional:

```text
docs/MVP_SCOPE.md
docs/RISK_REGISTER.md
docs/UI_PLAN.md
docs/MARKETING_PLAN.md
```

---

# Git Integration

OwnAI should support:

```text
- git init
- create .gitignore
- create first commit
- create branches
- create worktrees
- record patch history
```

Default first commit:

```text
Initial project structure and planning docs
```

---

# GitHub Integration

OwnAI should support optional GitHub creation:

```text
- create repository
- set description
- choose public/private
- push initial commit
- create issues from roadmap
- create milestones from phases
- create project board later
```

Example:

```text
GitHub repo:
KevinRabbe/vaultforge

Milestones:
- Phase 1: Core Vault
- Phase 2: Local Encryption
- Phase 3: Import System
- Phase 4: UI Polish
```

---

# Task Queue Integration

After planning, OwnAI should convert phases into queued tasks.

Example:

```text
Task Queue:
[Queued] Create project skeleton
[Queued] Add encryption module
[Queued] Add local database
[Queued] Add account CRUD
[Queued] Add first UI screen
```

The user should be able to queue full phases like a playlist.

---

# Goal Hierarchy Integration

New projects should automatically create:

```text
Vision
→ Goals
→ Subgoals
→ Tasks
→ Actions
```

Example:

```text
Vision:
Create a local-first password manager for gamers.

Goal:
Build secure offline vault.

Subgoal:
Implement encrypted storage.

Task:
Create encryption module.
```

---

# Memory Integration

OwnAI should store:

```text
- project name
- project intent
- planning decisions
- selected tech stack
- rejected ideas
- long-term goals
- roadmap phases
```

This allows future questions like:

```text
Why did we choose SQLite?
What was the original MVP?
What features did we reject?
What was Phase 2 supposed to do?
```

---

# UI Integration

The dashboard should support a project creation mode.

Suggested panels:

```text
Project Name
Project Intent
Planning Chat
Roadmap Builder
Git/GitHub Setup
Task Queue Preview
Architecture Preview
```

Holographic UI idea:

```text
New project core forms in the center.
Roadmap phases orbit around it.
GitHub connection appears as deployment bridge.
Task queue becomes the execution rail.
```

---

# Governance Rules

Project creation should require approval before:

```text
- creating GitHub repo
- making repo public
- pushing first commit
- deleting generated files
- overwriting existing folders
```

---

# Core Rule

```text
OwnAI should turn ideas into structured repositories,
not just answer questions about ideas.
```
