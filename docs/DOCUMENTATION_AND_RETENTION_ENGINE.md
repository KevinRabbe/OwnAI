# OwnAI Documentation and Retention Engine

The Documentation and Retention Engine decides what OwnAI should document, how deeply it should document it, how long it should keep it, and when temporary artifacts should be deleted.

## Core Principle

```text
OwnAI should preserve meaning, not infinite raw history.
```

Not every event deserves permanent memory. Not every file deserves long-term storage. Temporary artifacts must be cleaned automatically when they are no longer needed.

---

# Main Goals

- Prevent documentation overload
- Preserve important engineering knowledge
- Delete temporary files safely
- Compress useful history
- Avoid memory pollution
- Keep learning data useful
- Make long-term memory searchable and meaningful
- Support replay, self-improvement, and Training Gym workflows

---

# Documentation Levels

## 1. Transient

Short-lived runtime data.

Examples:

```text
- temporary scratch files
- intermediate prompts
- temporary model outputs
- short-lived tool outputs
- temporary context fragments
```

Default retention:

```text
Delete when task completes or after TTL expires.
```

---

## 2. Session

Useful for the current active work session.

Examples:

```text
- active task state
- hot memory
- queue progress
- current context pack
- current verification output
```

Default retention:

```text
Keep until session compression or queue completion.
```

---

## 3. Replay

Useful for optimization and learning.

Examples:

```text
- context replay report
- token economy report
- patch quality report
- verification summary
- decision record
```

Default retention:

```text
Keep compressed summary long-term. Raw details may expire.
```

---

## 4. Long-Term

Reusable engineering knowledge.

Examples:

```text
- solved bugs
- recurring failure patterns
- architecture decisions
- skill improvements
- project conventions
- important lessons
```

Default retention:

```text
Store in long-term memory / SQLite.
```

---

## 5. Historical Landmark

Major project milestones.

Examples:

```text
- first full pipeline working
- major architecture rewrite
- successful self-improvement cycle
- new skill branch created
- major token efficiency improvement
```

Default retention:

```text
Permanent summary plus graph links to related artifacts.
```

---

# Retention Decision Inputs

The engine should use signals from:

```text
- Observability Layer
- Replay Engine
- Knowledge Graph Engine
- Confidence Engine
- Patch Quality Engine
- Token Economy Engine
- Prediction Engine
- Skill Evolution
- Telescope Engine
- Task Queue System
```

---

# Retention Decision Output

Example:

```json
{
  "artifactId": "artifact_001",
  "artifactType": "temporary_context_fragment",
  "retentionLevel": "transient",
  "ttlMinutes": 60,
  "deleteAfterTask": true,
  "compressBeforeDelete": false,
  "storeLongTermSummary": false,
  "reason": "Temporary context fragment with no replay value."
}
```

---

# Temporary File Cleanup

OwnAI must track all temporary artifacts it creates.

Suggested storage:

```text
.ownai/cache/temp_registry.json
```

Example:

```json
{
  "temporaryFiles": [
    {
      "path": ".ownai/tmp/context_fragments/task_001_chunk_03.json",
      "createdAt": "2026-05-14T00:00:00Z",
      "taskId": "task_001",
      "purpose": "temporary context chunk",
      "deleteAfterTask": true,
      "ttlMinutes": 120,
      "status": "active"
    }
  ]
}
```

---

# Cleanup Rules

## Delete Automatically When

```text
- task completed and artifact is marked deleteAfterTask
- TTL expired
- context was compressed into a durable summary
- replay found no value in raw artifact
- artifact is superseded by a newer version
- worktree/session was rolled back
```

## Keep Temporarily When

```text
- task is still running
- verification failed and debugging needs artifacts
- patch is waiting for approval
- replay analysis has not run yet
```

## Keep Long-Term When

```text
- artifact contains reusable lesson
- artifact explains failure cause
- artifact changed confidence strongly
- artifact documents architecture decision
- artifact improved a skill
- artifact is linked to historical milestone
```

---

# Safe Delete Policy

Before deleting, OwnAI should verify:

```text
- file is inside .ownai/tmp, .ownai/cache, or known generated area
- file is registered as temporary
- file is not part of user source code
- file is not referenced by active task graph
- file is not needed for pending approval
```

Core rule:

```text
Never delete unregistered user files automatically.
```

---

# Compression Before Deletion

Some artifacts should be compressed before deletion.

Example:

```text
Raw model output
→ compressed lesson summary
→ delete raw output
```

This reduces storage while preserving meaning.

---

# Dashboard Integration

The UI should show:

```text
Temporary Artifacts: 14
Scheduled Cleanup: 9
Long-Term Saved: 3
Deleted After Compression: 2
```

For transparency, cleanup actions should appear in the cognition timeline.

---

# Core Rules

```text
Document what matters.
Delete what does not.
Compress before forgetting when useful.
Never silently delete user-owned source files.
```
