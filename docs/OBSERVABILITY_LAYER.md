# OwnAI Observability Layer

The Observability Layer makes OwnAI inspectable, debuggable, explainable, and visually meaningful.

As OwnAI becomes more autonomous, it must expose what it is doing, why it is doing it, how confident it is, and what changed over time.

## Core Principle

```text
Autonomy must be observable.
```

OwnAI should never feel like a black box. Every major action should produce structured telemetry that can be shown in the UI, replayed later, and used for learning.

---

# Main Goals

- Track system activity
- Record cognition timelines
- Explain decisions
- Support replay and debugging
- Feed dashboard panels with real state
- Make advanced holographic UI meaningful
- Support self-improvement and training gym analysis
- Detect system drift, overuse, failures, and inefficiencies

---

# Observability Data

The layer should collect:

```text
- task events
- queue state
- operating mode changes
- model routing decisions
- token usage
- heatmap changes
- memory confidence changes
- telescope focus changes
- microscope focus ranges
- thread decisions
- verification results
- patch quality scores
- replay lessons
- confidence changes
- decision engine outputs
- Git/worktree actions
```

---

# Cognition Timeline

Every task should produce a timeline.

Example:

```text
00:00 Task queued
00:02 Repo scan started
00:05 Memory snapshot loaded
00:07 Heatmap generated
00:09 Telescope focused packages/heatmap-engine
00:12 Microscope generated context pack
00:15 Worker model selected
00:22 Patch generated
00:28 Verification warning detected
00:30 Patch quality check passed
00:32 Replay found 18% context waste
00:34 Task completed
```

This timeline should be visible in the dashboard and stored for replay.

---

# Event Sources

Observability should consume events from:

```text
core-events
agent-core
task-queue
memory-system
heatmap-engine
telescope-engine
microscope-engine
verifier
context-replay-engine
patch-quality-engine
token-economy-engine
model-adapters
git-engine
thread-coordinator
skill-engine
```

---

# Telemetry Record Shape

Example:

```json
{
  "id": "event_001",
  "timestamp": "2026-05-14T00:00:00Z",
  "taskId": "task_001",
  "source": "heatmap-engine",
  "type": "attention.targets.generated",
  "severity": "info",
  "summary": "Generated 24 attention targets.",
  "metadata": {
    "highAttentionTargets": 7,
    "topTarget": "packages/memory-system/src/memory.ts"
  }
}
```

---

# Severity Levels

```text
trace
info
warning
error
critical
```

Examples:

```text
trace   = small internal step
info    = normal system progress
warning = risk, low confidence, budget pressure
error   = failed step
critical = unsafe or blocked action
```

---

# Dashboard Integration

The Observability Layer powers:

```text
- cognition timeline
- active system status
- mode indicators
- confidence meters
- token economy panels
- replay panels
- queue progress
- thread visualizations
- memory telescope views
- knowledge graph visualizations
```

Important UI rule:

```text
Every non-decorative UI element should map to real observability data.
```

---

# Holographic UI Integration

Advanced visuals should represent real state.

Examples:

```text
Cognitive Core pulse speed
→ active task intensity

Color shift
→ operating mode

Orbiting nodes
→ active tasks/threads

Memory galaxy zoom
→ temporal memory decompression

Heat distortions
→ high attention zones

Flicker / instability
→ low confidence

Branch split animation
→ worktree or thread creation
```

---

# Storage Strategy

Short-term observability can be JSON.

Suggested paths:

```text
.ownai/observability/current_timeline.json
.ownai/observability/events.jsonl
```

Long-term observability should move into SQLite.

Suggested tables:

```text
timeline_events
system_metrics
decision_records
mode_transitions
```

---

# Integration With Replay

Replay should use observability data to reconstruct:

```text
- what happened
- which systems ran
- where time/tokens were spent
- which decisions were made
- which context was useful
- what could be optimized
```

---

# Integration With Self-Improvement

Self-improvement mode should use observability to answer:

```text
Which system produced the most warnings?
Which package caused repeated failures?
Where did token cost spike?
Which skill produced low-quality patches?
```

---

# Core Rule

```text
If OwnAI does something important, it should be observable, replayable, and explainable.
```
