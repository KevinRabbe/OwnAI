# OwnAI Algorithmic Primitives

This document defines algorithmic primitives that are useful for OwnAI as a cognition infrastructure system.

The goal is not to add algorithms for complexity.

The goal is to reduce model thinking, reduce context load, improve routing, and preserve intelligence while using less context.

## Core Principle

```text
Algorithms should reduce model thinking,
not make the model think more.
```

A stronger rule:

```text
Decrease context without losing much intelligence.
```

---

# Why This Matters

Large language models become expensive, slow, and error-prone when forced to hold too much context.

OwnAI should avoid this pattern:

```text
load everything
think about everything
hope the model finds the right thing
```

Better pattern:

```text
scan broadly with cheap structure
summarize locally
route intelligently
load deeply only when needed
validate with evidence
```

This preserves intelligence by moving repeated structural work out of the model and into reusable algorithms.

---

# Context Reduction Without Intelligence Loss

Context should be reduced by structure, not by blindness.

Bad compression:

```text
remove details randomly
```

Good compression:

```text
keep summaries, ownership, evidence, risk, dependencies, and open questions
```

Best OwnAI behavior:

```text
use algorithms to decide what context matters before asking the model to reason
```

---

# 1. Octopus Router

Algorithm family:

```text
Multi-Armed Bandit
```

Metaphor:

```text
octopus with many arms
```

Each arm can be:

```text
- small local model
- reasoning model
- repo scanner
- documentation worker
- security worker
- browser research worker
- code explanation worker
- exploit review worker
- validation runner
- reusable skill script
```

Purpose:

```text
choose the cheapest capable arm for the task
```

The router learns over time:

```text
which model/tool works for which task type
which option wastes tokens
which worker fails on security tasks
which skill is reliable
which arm needs human review
```

Core rule:

```text
Do not always use the biggest model.
Use the cheapest capable arm first.
```

---

# 2. Minecraft Chunk Scanner

Algorithm family:

```text
MapReduce / Divide-and-Conquer
```

Metaphor:

```text
large repo = Minecraft world
repo section = chunk
loaded context = currently loaded chunks
```

Purpose:

```text
scan huge repositories without loading the whole repo into model context
```

Workflow:

```text
1. split repo into chunks
2. scan each chunk locally
3. summarize each chunk
4. score each chunk
5. merge chunk summaries
6. create telescope overview
7. load microscope view only for selected chunks
```

Chunk examples:

```text
package
folder
module
file group
document group
task artifact group
```

Chunk record example:

```json
{
  "chunkId": "chunk_packages_task_state",
  "scopeType": "package",
  "scopeId": "packages/task-state",
  "summary": "Owns durable task state and resume behavior.",
  "owners": ["task-state"],
  "hotspots": ["state persistence", "resume edge cases"],
  "risks": ["state corruption", "missing event emission"],
  "evidenceLinks": ["ROADMAP_01_MINIMAL_COGNITION_KERNEL.md"],
  "recommendedLens": "validation"
}
```

Core rule:

```text
Only load deep context for hot or relevant chunks.
```

---

# 3. Smart Mission Path

Algorithm family:

```text
A* Search
```

Purpose:

```text
find the safest cheapest route from current task state to accepted completion
```

In OwnAI terms:

```text
start = current task state
goal = accepted task completion
path = possible sequence of actions
cost = tokens, time, risk, blocked dependencies, human approval
heuristic = estimated distance to safe completion
```

Core rule:

```text
Optimize for safe completion, not just quick completion.
```

---

# 4. Dependency Order

Algorithm family:

```text
Topological Sort
```

Purpose:

```text
execute dependent work in safe order
```

Useful for:

```text
- roadmap phases
- task dependencies
- issue order
- validation pipeline
- document update order
- parallel work planning
```

Core rule:

```text
Do not run dependent work before its prerequisite exists.
```

---

# 5. Safety Stop

Algorithm family:

```text
Circuit Breaker
```

Purpose:

```text
stop repeated failure loops
```

States:

```text
closed
→ normal operation

open
→ blocked after repeated failure

half-open
→ careful retry after cooldown or new evidence
```

Use for:

```text
- failing tools
- failing validation commands
- broken dependency install
- repeated model failure
- browser automation failure
- repeated code generation failure
- repeated unsafe action attempt
```

Core rule:

```text
Repeated failure should create a flag, not infinite retries.
```

---

# 6. Trust Updating

Algorithm family:

```text
Bayesian Updating / Evidence-Based Confidence Updating
```

Purpose:

```text
update trust from outcomes instead of static opinion
```

Use for:

```text
- model reliability
- worker reliability
- skill reliability
- source reliability
- validation confidence
- routing decisions
```

Core rule:

```text
Trust must move because of evidence.
```

---

# 7. Duplicate Detection

Algorithm family:

```text
Similarity Hashing / Locality-Sensitive Hashing / Embedding Similarity
```

Purpose:

```text
detect near-duplicates before they become architecture spaghetti
```

Use for:

```text
- duplicate docs
- duplicate issues
- duplicate task packets
- repeated ideas
- overlapping subsystem names
- similar code explanations
```

Core rule:

```text
Similar concepts should be merged, linked, or clearly separated before implementation.
```

---

# 8. System Importance

Algorithm family:

```text
Graph Algorithms
```

Useful algorithms:

```text
- centrality
- PageRank
- shortest path
- connected components
- community detection
- dependency impact analysis
```

Purpose:

```text
understand which parts of OwnAI matter most structurally
```

Use for:

```text
- heatmap scoring
- telescope view
- protected core detection
- dependency impact
- critical document detection
- module ownership mapping
```

Core rule:

```text
Important nodes are not always the largest nodes.
They are the nodes many things depend on.
```

---

# Combined Architecture Loop

The strongest combination:

```text
Minecraft Chunk Scanner
→ splits large system into manageable chunks

Graph Algorithms
→ understand structure and importance

Heatmap Scoring
→ identify hot chunks

Lens System
→ interpret heat by risk/trust/security/context

A* Smart Mission Path
→ choose safe path to completion

Octopus Router
→ choose best model/tool/worker for each step

Validation + Explanation + Exploit Review
→ prove outcome quality

Replay + Trust Updating
→ improve future routing

Circuit Breaker
→ stop unsafe loops
```

---

# Example End-To-End Flow

```text
1. User asks OwnAI to modify a large repo
2. Chunk Scanner splits repo into chunks
3. Cheap scanner summarizes chunks
4. Heatmap identifies hot/risky chunks
5. Ownership Lens checks responsible subsystem
6. A* planner chooses safe implementation path
7. Octopus Router selects workers/tools per step
8. Code changes are made
9. Validation runs
10. Code explanation gate checks understanding
11. Exploit review checks abuse paths
12. Docs/memory update if needed
13. Replay stores outcome
14. Trust updates routing probabilities
15. Circuit breaker triggers if repeated failure occurs
```

---

# Context Intelligence Budget

OwnAI should track the value of context.

Possible idea:

```text
context intelligence budget
```

Meaning:

```text
How much intelligence do we preserve per token of context?
```

Bad context:

```text
large raw files with no relevance
```

Good context:

```text
small summary with ownership, risks, evidence links, open questions, and exact pointers
```

Core metric idea:

```text
preserved_decision_quality / context_tokens_used
```

---

# Roadmap 01 Boundary

Roadmap 01 should not implement all algorithms fully.

Allowed for Roadmap 01:

```text
- basic topological ordering for dependent tasks if needed
- basic chunk summaries for repo/document scanning
- simple heatmap records and scoring
- simple circuit breaker flags for repeated failures
- evidence-based trust update hooks
```

Future roadmap:

```text
- full octopus router
- advanced bandit learning
- A* task planner
- graph centrality map
- semantic duplicate detection
- evolutionary skill optimization
```

---

# Anti-Patterns

Avoid:

```text
- adding algorithms because they sound smart
- using big models where a cheap scan works
- compressing context until evidence is lost
- hiding uncertainty behind a score
- trusting scores without reasons
- optimizing speed while increasing risk
- allowing self-modifying core evolution
```

---

# Core Rule

```text
OwnAI should spend model intelligence only where algorithmic structure cannot solve the problem cheaper.
```
