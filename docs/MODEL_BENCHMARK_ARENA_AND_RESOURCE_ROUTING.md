# OwnAI Model Benchmark Arena & Resource-Aware Routing

The Model Benchmark Arena measures how different models perform across skills, modes, hardware states, token budgets, and quality targets.

The Resource-Aware Routing system uses those benchmark results to choose the smallest capable model for each action.

## Core Principle

```text
Model routing should be benchmark-driven, not opinion-driven.
```

OwnAI should learn which model works best for which job, under which constraints.

---

# Main Goals

- Improve VRAM efficiency
- Reduce token/cost waste
- Improve model routing quality
- Compare local vs cloud models fairly
- Benchmark speed vs output quality
- Learn model trust over time
- Support local-first workflows
- Support weak hardware and strong workstations
- Keep expensive models for tasks that justify them

---

# Model Roles

## Scout Model

Small, fast, cheap model.

Best for:

```text
- routing
- classification
- compression
- task labeling
- observability filtering
- replay summarization
- low-risk checks
```

Usually:

```text
0.5B → 3B
```

---

## Worker Model

Medium model for most coding and reasoning tasks.

Best for:

```text
- patch generation
- normal debugging
- refactoring
- code review
- documentation generation
```

Usually:

```text
7B → 14B
```

---

## Expert Model

Highest-capability model, local or cloud.

Best for:

```text
- difficult architecture
- hard bugs
- low-confidence decisions
- final review
- complex simulations
```

Cloud expert models are optional.

OwnAI must remain fully functional without them.

---

## Specialized Models

Optional models for special skills.

Examples:

```text
- vision models
- image generation models
- 3D generation models
- embedding models
- reranker models
```

These should be loaded only when needed.

---

# Routing Profiles

## Speed Mode

Goal:

```text
Fastest acceptable output.
```

Prefer:

```text
- small local models
- shallow simulation
- narrow context
```

---

## Quality Mode

Goal:

```text
Best output quality.
```

Prefer:

```text
- stronger models
- deeper verification
- more simulation
- patch quality review
```

---

## Budget Mode

Goal:

```text
Lowest token/cost usage.
```

Prefer:

```text
- local models
- compression
- fewer retries
- smaller context packs
```

---

## Balanced Mode

Goal:

```text
Good quality with reasonable speed and cost.
```

Default for most work.

---

## Local-Only Mode

Goal:

```text
No cloud usage.
```

Required for privacy-focused users.

---

## High-Trust Mode

Goal:

```text
Use models and strategies with the best historical reliability.
```

Prefer:

```text
- high verification success
- low hallucination rate
- stable output format
- good patch quality history
```

---

# Benchmark Dimensions

Models should be measured by:

```text
- speed
- token usage
- VRAM usage
- RAM usage
- output quality
- patch correctness
- test success rate
- hallucination rate
- formatting reliability
- cost
- context compression quality
- replay usefulness
- skill performance
```

---

# Benchmark Scope

Benchmarks should run by:

```text
- skill
- operating mode
- task type
- repository size
- hardware profile
- autonomy level
- focus state
```

Example:

```text
Skill: compress_context
Mode: Low-Resource
Model A vs Model B
Metric: token reduction while preserving verified facts
```

---

# Example Benchmark Result

```json
{
  "skill": "compress_context",
  "mode": "low_resource",
  "model": "local-scout-3b-q4",
  "tokensUsed": 3100,
  "durationMs": 4200,
  "qualityScore": 0.81,
  "hallucinationRisk": 0.12,
  "vramGb": 2.4,
  "recommendation": "default_for_low_resource_compression"
}
```

---

# VRAM-Aware Routing

OwnAI should avoid loading unnecessary models.

Rules:

```text
- keep Scout model available if possible
- load Worker model only when needed
- load Expert model only when justified
- unload inactive specialized models under memory pressure
- delay Training Gym when resources are constrained
- prefer CPU/lightweight tools for low-value background work
```

---

# Resource Pressure Behavior

When VRAM pressure rises:

```text
Environment Awareness detects pressure
→ Model Router selects smaller model
→ Focus Lens narrows context
→ Token Economy tightens budget
→ Simulation depth is reduced
→ Task Queue may delay non-critical work
→ Observability records stabilization
```

---

# Integration With Trust System

Benchmark results should affect trust.

Example:

```text
Model performs well on TypeScript patches
→ trust increases for TypeScript patching

Model frequently hallucinates file paths
→ trust decreases for repo navigation
```

---

# Integration With Training Gym

Training Gym can use idle time to benchmark:

```text
- model performance
- skill efficiency
- compression quality
- patch quality
- simulation accuracy
```

Only safe/sandboxed benchmarks should run automatically.

---

# Integration With Decision Voting

Model Router may vote:

```text
use_small_model
use_worker_model
escalate_to_expert
stay_local_only
```

Votes are weighted by:

```text
- benchmark results
- trust score
- budget
- risk
- operating mode
- user preference
```

---

# Dashboard Integration

The UI should show:

```text
- active loaded models
- VRAM usage
- model role assignment
- routing decision
- benchmark history
- model trust score
- speed/quality/budget profile
```

Example:

```text
Scout: local 3B loaded
Worker: local 14B loaded
Expert: cloud disabled
Profile: Balanced
VRAM Pressure: Medium
Routing: Worker selected for patch generation
```

---

# Core Rule

```text
Use the smallest capable model.
Escalate only when the task earns the cost.
```
