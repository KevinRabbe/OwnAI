# OwnAI Planning Model Routing

Planning is a first-class cognition workflow in OwnAI.

OwnAI should choose the right model for planning based on planning depth, project risk, available hardware, privacy mode, token budget, and required quality.

## Core Principle

```text
Do not waste expert models on simple planning.
Do not use weak models for high-impact architecture planning.
```

Planning should be routed like any other serious cognition task.

---

# Main Goals

- Improve planning quality
- Reduce unnecessary token spending
- Stay VRAM-efficient
- Use small models when enough
- Escalate only when planning complexity justifies it
- Respect local-only mode
- Support project creation workflows
- Support architecture planning workflows

---

# Planning Depth Levels

## 1. Small Planning

Examples:

```text
- short task list
- naming suggestions
- simple next steps
- basic roadmap
- small refactor plan
```

Preferred model:

```text
Scout or small Worker model
```

---

## 2. Medium Planning

Examples:

```text
- feature breakdown
- project phases
- module structure
- implementation roadmap
- task queue generation
```

Preferred model:

```text
Worker model
```

---

## 3. Deep Planning

Examples:

```text
- full architecture design
- risk analysis
- self-improvement strategy
- large repo restructuring
- multi-system integration
- platform design
```

Preferred model:

```text
Expert model if available,
or strongest trusted local Worker model
```

---

# Routing Inputs

Planning model selection should consider:

```text
- planning depth
- project intent
- goal hierarchy level
- privacy mode
- token budget
- hardware state
- available models
- model benchmark results
- model trust score
- hallucination risk
- architecture risk
```

---

# Routing Profiles

## Local-Only Planning

Cloud models disabled.

```text
Use best trusted local model available.
```

---

## Budget Planning

Minimize token/cost usage.

```text
Use small model first.
Escalate only if confidence is low.
```

---

## Quality Planning

Maximize plan quality.

```text
Use strongest trusted model available.
Run optional review pass.
```

---

## Fast Planning

Minimize latency.

```text
Use fastest acceptable model.
Skip deep simulation unless risk is high.
```

---

# Planning Escalation Rules

Escalate planning when:

```text
- architecture risk is high
- confidence is low
- goal hierarchy impact is high
- project creation affects long-term structure
- governance detects drift risk
- simulation predicts costly mistakes
```

Do not escalate when:

```text
- task is low-risk
- plan is temporary
- user requested fast/budget mode
- local-only mode is active
- Scout/Worker confidence is sufficient
```

---

# Planning Output Requirements

Planning outputs should include:

```text
- goal alignment
- assumptions
- risks
- phases
- first tasks
- recommended model/routing reason
- confidence level
```

Example:

```json
{
  "planningDepth": "medium",
  "selectedModelRole": "worker",
  "reason": "Feature planning requires module breakdown but not expert architecture review.",
  "confidence": 0.82,
  "escalationRecommended": false
}
```

---

# Project Creation Integration

When creating a new project, OwnAI should route planning in stages:

```text
Name generation
→ Scout/Worker

MVP definition
→ Worker

Architecture plan
→ Worker or Expert

Risk review
→ Expert if available or trusted local model

Task queue generation
→ Worker/Scout
```

---

# Replay Integration

Replay should learn:

```text
- which models make better plans
- which plans caused architecture drift
- which models overengineer
- which models produce useful phase breakdowns
- which models generate realistic task queues
```

---

# Benchmark Integration

Model Benchmark Arena should benchmark models for:

```text
- roadmap quality
- architecture quality
- token efficiency
- risk detection
- simplicity bias
- goal alignment
- task decomposition quality
```

---

# Dashboard Integration

The UI should show:

```text
Planning Mode
Selected Model
Planning Depth
Token Budget
Confidence
Escalation Status
Goal Alignment
```

Example:

```text
Planning: Architecture Roadmap
Depth: Deep
Model: Expert / GPT API
Reason: high-impact platform design
Budget: within limit
Confidence: 0.87
```

---

# Core Rule

```text
Planning is cognition work.
Cognition work deserves intelligent routing.
```
