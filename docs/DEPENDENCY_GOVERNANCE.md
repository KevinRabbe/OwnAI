# OwnAI Dependency Governance

The Dependency Governance system protects OwnAI from dependency explosion, circular imports, package spaghetti, and unstable coupling between cognition systems.

## Core Principle

```text
Depend on contracts, not implementations.
```

OwnAI should remain modular enough that every system can be improved, replaced, tested, or removed without destabilizing the whole architecture.

---

# Main Goals

- Prevent circular dependencies
- Prevent package-to-package spaghetti
- Prevent unnecessary npm dependency growth
- Keep systems independently improvable
- Keep UI decoupled from engine internals
- Preserve clean architecture boundaries
- Make future self-improvement safer
- Make architecture easier for AI assistants to understand

---

# Dependency Layers

## 1. Core Contracts Layer

Shared contracts only.

Packages:

```text
core-types
core-interfaces
core-events
core-state
```

Allowed to be imported by almost everything.

Should contain:

```text
- shared types
- public interfaces
- event contracts
- state contracts
```

Should not contain:

```text
- heavy business logic
- model calls
- file system side effects
- engine-specific implementation details
```

---

## 2. Engine Layer

Cognition and execution systems.

Examples:

```text
memory-system
heatmap-engine
telescope-engine
focus-lens-engine
microscope-engine
verifier
replay-engine
simulation-layer
governance-layer
```

Engines should prefer:

```text
core contracts
+ events
+ state snapshots
```

instead of direct imports from other engines.

---

## 3. Orchestration Layer

Coordinates systems but should not own their internals.

Examples:

```text
agent-core
decision-engine
task-queue
state-machine
```

Allowed to compose engines through public APIs.

---

## 4. UI Layer

Dashboard and visual systems.

Examples:

```text
apps/dashboard
ui-core
ui-holographics
ui-visualizations
```

UI should read:

```text
- observable state
- timeline events
- reports
- public APIs
```

UI should not directly import cognition engine internals.

---

# Allowed Dependency Direction

Preferred direction:

```text
UI
→ public state / observability / APIs

Orchestration
→ engine public APIs

Engines
→ core contracts

Core contracts
→ no engine dependencies
```

Forbidden direction:

```text
core-types → engines
core-events → engines
engine A → engine B internals
UI → engine internals
```

---

# Cross-System Communication Rule

Systems should communicate through:

```text
- events
- state snapshots
- reports
- public interfaces
- task graph outputs
```

Not through:

```text
- hidden direct imports
- shared mutable objects
- private internal files
- undocumented side effects
```

---

# Circular Dependency Rule

```text
Circular dependencies are architecture bugs.
```

If two systems need each other:

```text
extract shared contract
→ move it to core-types/core-interfaces
→ communicate through events or state
```

---

# External Dependency Rule

Every new npm dependency must justify itself.

Before adding one, ask:

```text
- Can Node built-ins solve this?
- Is this dependency maintained?
- Does it increase install size heavily?
- Does it affect local-first operation?
- Does it introduce security risk?
- Is it needed in core, or only optional/plugin layer?
```

---

# Dependency Categories

## Core Dependency

Required for OwnAI to run.

Should be minimal.

---

## Optional Dependency

Used only by optional systems.

Examples:

```text
- image generation adapters
- 3D generation tools
- Bambu Lab integrations
- cloud provider SDKs
```

Should not break local core if missing.

---

## Plugin Dependency

Belongs to plugins/skills/adapters.

Should remain isolated.

---

# Dependency Approval Checklist

Before adding dependency:

```text
1. What problem does it solve?
2. Can this be done with existing tools?
3. Is it core or optional?
4. Does it affect local-first usability?
5. Does it create security risk?
6. Does it increase install complexity?
7. Can it be isolated behind an adapter?
```

---

# Package Boundary Rules

Each package should expose:

```text
src/index.ts
src/types.ts
README.md
tests/
```

Other packages should import from:

```text
package/src/index.ts
```

not:

```text
package/src/internal/private-file.ts
```

unless explicitly approved.

---

# UI Boundary Rule

The UI should never become the owner of cognition logic.

UI may:

```text
- display state
- send user commands
- show observability
- request actions
```

UI may not:

```text
- directly mutate memory internals
- directly bypass governance
- directly execute patches
- directly override state machine rules
```

---

# Self-Improvement Safety

When OwnAI improves itself:

```text
- dependency changes require explicit patch report
- new external dependencies require approval
- package boundary violations should fail verification
- circular dependency detection should run
```

---

# Future Automation

OwnAI should eventually include:

```text
- dependency graph scanner
- circular import detector
- dependency risk report
- package boundary verifier
- external dependency audit
```

---

# Core Rules

```text
Keep the core small.
Keep dependencies explicit.
Keep packages replaceable.
Keep UI decoupled.
Keep optional systems optional.
```
