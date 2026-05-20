# OwnAI Heatmap + Telescope + Microscope + Lens Model

This document defines the conceptual visual model for how OwnAI observes, navigates, and focuses attention across a system.

It is both:

```text
- a cognition/navigation concept
- a future UI/observability direction
```

It is not only a visual gimmick.

It represents how OwnAI should think about scope, focus, uncertainty, and evidence.

## Core Principle

```text
OwnAI should be able to zoom out, zoom in, and filter its attention
without losing operational context.
```

---

# Purpose

This model exists to help OwnAI:

```text
- understand large systems without drowning in detail
- focus attention where it matters most
- reduce wasted context
- show why attention is being directed somewhere
- make cognition visible and steerable
- improve observability for humans and agents
```

---

# Concept Asset

Primary generated concept image:

```text
docs/assets/ownai-heatmap-telescope-microscope-lens-model.jpg
```

Status:

```text
concept asset
```

Note:

```text
The image is a visual direction, not a finalized UI specification.
The UI should later be driven by real OwnAI observability and task data.
```

---

# The Four Core Components

## 1. Heatmap

The Heatmap is the attention surface.

It visually represents where OwnAI should focus.

Possible heatmap signals include:

```text
- activity
- uncertainty
- risk
- validation failure likelihood
- trust instability
- replay importance
- dependency pressure
- exploit/security concern
- unresolved flags
- recent change density
```

## Heatmap Meaning

```text
cool / low intensity
→ low urgency, low uncertainty, low activity

warm / medium intensity
→ useful attention area, moderate uncertainty, active region

hot / high intensity
→ likely needs attention now
```

The Heatmap should not only show where work is happening.

It should also show:

```text
where attention is needed
where uncertainty is high
where failure risk is rising
where evidence is weak
```

---

## 2. Telescope

The Telescope is the zoomed-out navigation mode.

It gives macro understanding.

Use Telescope when OwnAI needs to inspect:

```text
- project-wide structure
- architecture zones
- package relationships
- subsystem ownership
- dependency clusters
- roadmap scope
- broad activity patterns
```

## Telescope Questions

```text
What part of the system is active?
Where are the risky zones?
Which subsystem owns this area?
What should be explored next?
What is the big-picture shape?
```

The Telescope should reduce wasted deep inspection by first identifying where zoom-in is actually worth it.

---

## 3. Microscope

The Microscope is the zoomed-in inspection mode.

It gives local detail.

Use Microscope when OwnAI needs to inspect:

```text
- a file
- a class
- a function
- a state transition
- a task artifact
- a validation result
- a trust update
- a security finding
- a flag lifecycle
- a replay entry
```

## Microscope Questions

```text
What exactly happened here?
What changed?
What is the risk?
What evidence exists?
What does this function or artifact actually do?
Why is this area hot?
```

The Microscope should only be used after a meaningful target is identified.

---

## 4. Lens

The Lens is the filter system.

It changes what the agent sees on the same underlying map.

Example lenses:

```text
- Risk Lens
- Trust Lens
- Validation Lens
- Security Lens
- Replay Lens
- Context Lens
- Dependency Lens
- Ownership Lens
- Activity Lens
- Cost Lens
```

## Lens Purpose

```text
same system
different interpretation
```

This is important because the same subsystem may look low-risk under one lens and high-priority under another.

Example:

```text
A file may look low activity under Activity Lens,
but high concern under Security Lens.
```

---

# How They Work Together

## Navigation Flow

```text
Heatmap
→ tells OwnAI where attention may be needed

Telescope
→ gives macro structure and chooses target region

Lens
→ changes interpretation of the region

Microscope
→ inspects the exact local cause, evidence, or behavior
```

---

# Example Workflows

## Example: Validation Failure Risk

```text
1. Heatmap shows a hot region in task-state and validation areas
2. Telescope shows this is inside the kernel execution path
3. Validation Lens highlights missing evidence links
4. Microscope zooms into the exact task artifact and validation result
5. OwnAI sees why confidence is low
6. Replay later strengthens future heatmap weighting
```

## Example: Security Risk

```text
1. Heatmap shows a moderate hotspot near action authority
2. Telescope shows it belongs to permissions/external actions
3. Security Lens raises intensity because external action code changed
4. Microscope inspects approval gating logic
5. Exploit review artifact confirms residual risk
```

---

# Data Model Meaning

This visual system should eventually be backed by real signals, not fake decoration.

Possible inputs:

```text
- task state changes
- event stream volume
- unresolved flags
- validation failures
- retry counts
- trust score changes
- replay importance
- dependency centrality
- recent code/document changes
- exploit review findings
- missing evidence
- approval wait states
```

---

# Human Value

For the user, this system should make OwnAI feel:

```text
- visible
- understandable
- steerable
- powerful without being chaotic
```

It should help the user answer:

```text
What is OwnAI focusing on?
Why is it focusing there?
How risky is that area?
How sure is it?
What should happen next?
```

---

# Agent Value

For OwnAI's own agents, this model should help:

```text
- reduce unnecessary deep scans
- focus limited context budget
- route work better
- prioritize evidence gaps
- identify hotspots faster
- avoid wasting tokens on cold regions
```

---

# Roadmap 01 Boundary

Roadmap 01 should not attempt the full advanced visual system.

Roadmap 01 should only establish simple foundations:

```text
- observability events
- task/activity records
- validation signals
- trust/replay metadata hooks
- artifact ownership
- registry/source-of-truth structure
```

That means:

```text
Roadmap 01 = data foundations
Later roadmap = full heatmap/telescope/microscope/lens visualization
```

---

# Future Expansion

Later versions may add:

```text
- interactive 2D/3D system map
- animated focus transitions
- attention history playback
- heatmap diff over time
- lens comparison mode
- confidence overlays
- replay-informed hotspot learning
- multi-agent attention traces
- human override / steering controls
```

---

# Status

```text
Status: active concept
Type: architecture + UI concept
Implementation phase: future, after core kernel foundations
```

---

# Core Rule

```text
OwnAI should not inspect everything equally.
It should know where to look, why to look there, and how deeply to zoom.
```
