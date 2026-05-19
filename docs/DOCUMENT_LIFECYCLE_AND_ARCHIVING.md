# OwnAI Document Lifecycle & Archiving

OwnAI documentation should behave like structured operational memory.

The system needs a clear overview first, and detailed documents only when needed.

## Core Principle

```text
Keep the registry hot.
Keep details expandable.
Archive what is no longer active.
```

This mirrors OwnAI's broader accordion-memory idea:

```text
central pointer
→ compressed summary
→ detailed document
→ archived raw history
```

---

# Main Goals

- Prevent documentation overload
- Keep one central overview
- Make details easy to find only when needed
- Archive outdated docs without losing useful knowledge
- Reduce conflicting architecture guidance
- Support document versioning
- Support future automated doc cleanup

---

# Document Memory Levels

## Level 0 — Registry Pointer

Stored in:

```text
docs/DOCUMENT_REGISTRY.md
```

Contains:

```text
- document path
- version
- status
- purpose
- short notes
```

Purpose:

```text
quick overview without opening every document
```

---

## Level 1 — Compressed Summary

Short summaries may live in the registry or future metadata.

Purpose:

```text
understand what a document does before expanding it
```

---

## Level 2 — Active Detail Document

Current implementation-relevant documents.

Examples:

```text
ROADMAP_01_MINIMAL_COGNITION_KERNEL.md
CONTEXT_PROTOCOL.md
TASK_PACKET_GENERATOR.md
```

Purpose:

```text
source of truth for active work
```

---

## Level 3 — Archived Detail Document

Older documents that are no longer active but still useful as historical context.

Suggested path:

```text
docs/archive/
```

Purpose:

```text
preserve useful history without polluting active guidance
```

---

## Level 4 — Deleted / Removed

Documents that are obsolete and no longer useful after review.

Deletion should happen only when:

```text
- useful content was merged elsewhere
- no active roadmap depends on it
- registry marks it as candidate_for_delete
- review confirms removal is safe
```

---

# Document Status Flow

Suggested lifecycle:

```text
draft
→ active
→ reference
→ candidate_for_merge
→ superseded
→ archived
→ candidate_for_delete
→ deleted
```

Not every document must pass through every state.

---

# Archiving Rules

Archive a document when:

```text
- it is no longer an implementation source of truth
- its ideas are preserved in a newer document
- it is useful historically but noisy for active work
- it conflicts with current architecture but should not be deleted yet
```

Do not archive when:

```text
- it guides Roadmap 01 implementation
- issues currently reference it as source material
- it defines active contracts or acceptance criteria
```

---

# Merge Rules

Merge documents when multiple docs explain the same active concept.

Example:

```text
If three docs describe context compression,
merge the source-of-truth parts into CONTEXT_PROTOCOL.md
and archive or delete the duplicates.
```

---

# Registry Rules

The registry should be the first place to look.

Every document should have:

```text
- path
- version
- status
- purpose
- notes
```

When a document is archived, update the registry:

```text
status: archived
path: docs/archive/<filename>
notes: superseded by <new doc>
```

---

# Detail-On-Demand Workflow

Instead of reading every document, OwnAI and the operator should follow:

```text
open registry
→ read short purpose/status
→ expand only relevant document
→ ignore archived/superseded docs unless needed
```

This reduces documentation context waste.

---

# Future Metadata Format

Later each document may include front matter:

```yaml
ownai_doc:
  version: 1.0
  status: active
  layer: architecture
  roadmap: roadmap-01
  last_reviewed: 2026-05-18
  supersedes: []
  archive_after: null
```

This would allow automated document indexing and cleanup.

---

# Future Automation Ideas

OwnAI may later provide:

```text
- docs registry scanner
- outdated-doc detector
- duplicate concept detector
- archive suggestion tool
- documentation compression tool
- registry update script
```

These should be executable skill scripts, not repeated model work.

---

# Core Rule

```text
Documentation should be easy to overview,
easy to expand,
and easy to retire when outdated.
```
