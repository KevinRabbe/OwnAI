# OwnAI Source Code Reference Library

OwnAI should be able to use selected external source code repositories as reference material.

This is based on a simple principle:

```text
Code is often the best source of truth.
```

Human-written documentation can be incomplete, outdated, simplified, or ambiguous.

Source code shows the real implementation.

## Core Principle

```text
Use external code references to improve implementation accuracy,
not to blindly copy or bloat context.
```

---

# Why This Matters

Agents often fail when they guess how a library, framework, or tool works.

Better workflow:

```text
identify relevant technology
fetch or reference its source code
chunk it
summarize it
link exact files/functions
load only relevant chunks
use it as implementation evidence
```

This supports:

```text
- better context engineering
- less hallucination
- fewer API guesses
- better architecture alignment
- improved examples from real code
- stronger source-of-truth behavior
```

---

# Relationship To OwnAI Architecture

This document connects to:

```text
docs/ALGORITHMIC_PRIMITIVES_FOR_OWNAI.md
docs/HEATMAP_SIGNAL_SOURCES_AND_SCORING.md
docs/CONTEXT_PROTOCOL.md
docs/DOCUMENT_REGISTRY.md
docs/ANTI_DUPLICATION_AND_SOURCE_OF_TRUTH_PROTOCOL.md
docs/CODING_AGENT_DOCUMENTATION_WORKFLOW.md
```

The Source Code Reference Library should feed:

```text
Minecraft Chunk Scanner
→ chunk external repo

Context Protocol
→ load relevant reference chunks

Heatmap
→ identify hot/important reference areas

Code Explanation Gate
→ compare implementation against reference behavior

Exploit Review
→ check whether copied/derived patterns are safe
```

---

# What Counts As A Source Code Reference

Examples:

```text
- framework repositories
- SDK repositories
- CLI tool repositories
- open-source implementation examples
- official sample apps
- official adapter packages
- protocol implementations
```

A source code reference is not automatically trusted.

It is a structured reference artifact.

---

# Reference Repository Record

Example:

```json
{
  "referenceRepoId": "ref_repo_svelte",
  "name": "svelte",
  "source": "github",
  "repository": "sveltejs/svelte",
  "purpose": "Reference implementation for Svelte behavior and patterns.",
  "status": "active_reference",
  "allowedUse": [
    "read patterns",
    "inspect APIs",
    "compare implementation behavior"
  ],
  "disallowedUse": [
    "blind copy",
    "license-unsafe reuse",
    "full context dump"
  ],
  "addedBecause": "Project uses Svelte or Svelte-like UI patterns.",
  "lastIndexed": null,
  "licenseChecked": false
}
```

---

# Reference Repo Status Values

```text
candidate
active_reference
archived_reference
blocked
deprecated
```

Definitions:

```text
candidate
→ proposed but not yet approved/indexed

active_reference
→ approved for search/chunk/reference use

archived_reference
→ no longer active but kept for history

blocked
→ should not be used because of license/security/relevance risk

deprecated
→ reference is stale or replaced by another source
```

---

# When To Add A Reference Repo

Add a reference repo when:

```text
- OwnAI uses a framework/library heavily
- docs are unclear or incomplete
- agents repeatedly guess API behavior
- implementation correctness depends on library internals
- official examples are useful
- repeated tasks need the same external source knowledge
```

Do not add a repo just because it is popular.

---

# Selection Criteria

A reference repo should be:

```text
- relevant to the current project or roadmap
- reputable or official where possible
- license-compatible for reference use
- reasonably maintained
- useful for repeated tasks
- chunkable and searchable
```

Avoid repos that are:

```text
- abandoned
- license-problematic
- huge without clear need
- unrelated to active roadmap
- malware/security-risky
- low-quality example code
```

---

# Context Rules

Never dump an entire external repo into context by default.

Correct flow:

```text
reference repo
→ chunk scanner
→ chunk summaries
→ search relevant chunk
→ load exact file/function when needed
```

Core rule:

```text
External code reference should reduce guessing,
not explode context.
```

---

# License And Copying Rules

Reference does not mean copy.

Agents should avoid:

```text
- copying large blocks of code
- copying license-incompatible implementations
- hiding copied source
- treating external code as owned code
```

Safe use:

```text
- inspect API usage
- learn patterns
- verify behavior
- cite/reference source path internally
- implement original compatible code
```

If direct copying is needed, require explicit license review.

---

# Security Rules

External code references can contain unsafe patterns.

Before using a pattern from external code, check:

```text
- is the repo reputable?
- is the pattern current?
- does it touch dangerous sinks?
- does it bypass permissions?
- does it introduce dependency risk?
- does it conflict with OwnAI governance?
```

Do not treat open source as automatically safe.

---

# Reference Library Workflow

## Step 1 — Propose Reference

Create a candidate record:

```text
repository
purpose
why needed
expected tasks supported
risk/license notes
```

## Step 2 — Approve / Block

Governance or human review decides:

```text
active_reference
blocked
candidate stays parked
```

## Step 3 — Index / Chunk

Use Minecraft Chunk Scanner style processing:

```text
repo → chunks → summaries → reference index
```

## Step 4 — Use In Context

Agents load only relevant chunks.

Example prompt behavior:

```text
Reference the Svelte source chunk for store behavior.
Do not load the full repo.
```

## Step 5 — Update / Archive

Reference repos should be reviewed periodically.

---

# Reference Chunk Record

Example:

```json
{
  "referenceChunkId": "ref_svelte_store_runtime",
  "referenceRepoId": "ref_repo_svelte",
  "scopeType": "folder",
  "scopeId": "packages/svelte/src/store",
  "summary": "Svelte store runtime implementation and subscription behavior.",
  "importantFiles": [
    "packages/svelte/src/store/shared/index.js"
  ],
  "useFor": [
    "understanding store subscription behavior",
    "checking API-compatible patterns"
  ],
  "avoidFor": [
    "blind copying implementation"
  ]
}
```

---

# Integration With Heatmap

Reference repos can appear in the heatmap as separate external context zones.

Example heatmap scopes:

```text
referenceRepo:sveltejs/svelte
referenceChunk:ref_svelte_store_runtime
```

Useful heat signals:

```text
- reference used often
- reference outdated
- reference unclear
- implementation mismatch with reference
- security concern in referenced pattern
```

---

# Integration With Context Protocol

Context packs may include source code reference chunks.

Required metadata:

```text
why included
which task needs it
what exact behavior it supports
what not to use it for
license/security caveat if needed
```

---

# Integration With Code Explanation Gate

If an agent uses an external source reference, the code explanation should mention:

```text
which reference repo/chunk was used
what behavior was learned
whether implementation copies or merely follows pattern
```

---

# Integration With Exploit Review

If external reference code touches dangerous sinks, exploit review should verify the pattern is safe in OwnAI context.

Examples:

```text
- shell execution examples
- browser automation examples
- auth/permission examples
- file write/delete examples
- package installation examples
```

---

# Candidate Repositories

Candidate references should be added only when relevant.

Possible future categories:

```text
agent harnesses
browser automation
sandboxing
repository indexing
code review tools
frameworks used by OwnAI
security scanning tools
```

This section should stay curated, not huge.

---

# Roadmap 01 Boundary

Roadmap 01 does not need a full external repo reference system.

Allowed:

```text
- define ReferenceRepo and ReferenceChunk record shapes
- allow manually curated candidate references
- connect conceptually to chunk scanner/context protocol
```

Not Roadmap 01:

```text
- full automatic GitHub mirror system
- full external repo indexing service
- advanced semantic search over external repos
- automatic dependency-to-reference mapping
```

---

# Anti-Patterns

Avoid:

```text
- dumping full repos into context
- blindly trusting open-source code
- copying without license awareness
- adding references without purpose
- using outdated examples as source of truth
- treating third-party code as OwnAI architecture authority
```

---

# Core Rule

```text
Use code as source of truth,
but only through curated, chunked, scoped, and evidence-linked references.
```
