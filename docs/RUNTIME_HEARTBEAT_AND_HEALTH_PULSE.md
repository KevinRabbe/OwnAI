# OwnAI Runtime Heartbeat & Health Pulse

The Runtime Heartbeat is a real backend pulse used for liveness, checkpointing, observability, and future UI health visualization.

## Core Principle

```text
The heartbeat visual must represent real runtime state.
```

OwnAI should never show fake life-like UI animation that is not backed by real operational telemetry.

---

# Main Goals

- Prove the runtime is alive
- Check active task liveness
- Flush durable state
- Emit observability events
- Detect stalled tasks
- Support crash/disconnect recovery
- Provide a simple future UI pulse
- Make backend health visible

---

# Roadmap 01 Version

Roadmap 01 should start simple.

The heartbeat may be represented by:

```text
- HEARTBEAT event
- lastSeen timestamp
- active task count
- blocked task count
- failed task count
- runtime status
```

Suggested output:

```text
.ownai/runtime/heartbeat.json
.ownai/observability/timeline.jsonl
```

---

# Heartbeat Event Shape

Example:

```json
{
  "type": "HEARTBEAT",
  "timestamp": "2026-05-18T00:00:00Z",
  "runtimeStatus": "healthy",
  "activeTasks": 1,
  "blockedTasks": 0,
  "failedTasks": 0,
  "lastCheckpointAt": "2026-05-18T00:00:00Z"
}
```

---

# Heartbeat Responsibilities

The heartbeat can eventually:

```text
- scan active task states
- detect stale tasks
- checkpoint active tasks
- flush observability buffers
- check dead-letter queue
- sample resource pressure
- update UI health pulse
- detect disconnected backend
```

---

# UI Health Pulse Mapping

The future UI can visualize heartbeat state:

```text
steady pulse
→ runtime healthy

fast pulse
→ high activity

slow pulse
→ idle / low-power mode

irregular pulse
→ stalled task or blocked validation

red skipped pulse
→ worker crash or warning

flatline
→ backend disconnected
```

Important:

```text
Every pulse state must map to real backend data.
```

---

# Stale Task Detection

A task may be considered stale when:

```text
- no state update occurred for longer than the configured timeout
- validation command did not finish
- expected heartbeat is missing
- process crashed without completing task state
```

Roadmap 01 can record this as:

```text
stale_detected
```

Later systems can attempt recovery.

---

# Integration With Durable Task State

Heartbeat should update or inspect:

```text
.ownai/tasks/<taskId>/state.json
```

It should not falsely mark work as completed.

If uncertain:

```text
state = unknown_or_interrupted
```

---

# Integration With Observability

Each heartbeat should optionally append an observation:

```text
runtime heartbeat emitted
active tasks checked
stale task detected
blocked task detected
```

---

# Integration With Dead-Letter Queue

If a task is unrecoverably corrupted, heartbeat may route it to:

```text
.ownai/dead-letter/
```

but only with evidence.

---

# Core Rule

```text
OwnAI should feel alive because real operational state is visible,
not because the UI pretends.
```
