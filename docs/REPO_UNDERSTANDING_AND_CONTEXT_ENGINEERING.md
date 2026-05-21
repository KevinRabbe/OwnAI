# OwnAI Repo Understanding & Context Engineering

This document defines how OwnAI should understand large repositories without loading everything into model context.

The goal is not to make the model read the whole repo.

The goal is to build a repo intelligence layer that selects the right context, evidence, symbols, tests, and risks for the task.

## Core Principle

```text
Big repo understanding is not large context.
It is layered indexing, scoped retrieval, evidence-linked context, and confidence tracking.
```

Related principle:

```text
Do not give the model more context.
Give it better selected context.
```

---

# Future-Proof Subsystem Rule

Every repo-understanding subsystem must be replaceable or improvable.

```text
v0 may be simple.
v1 may improve.
v2 may rewrite internals.
Contracts and artifacts should remain stable enough that OwnAI does not break.
```

Core rule:

```text
Stable contracts, replaceable internals.
```

This means:

```text
- output schemas should be versioned
- implementation should be swappable
- scanners should declare capabilities
- confidence should be explicit
- old records should remain readable or migratable
- advanced engines should be able to replace simple engines later
```

Anti-pattern:

```text
hard-code one parser/search/indexing method as permanent architecture
```

Better:

```text
RepoAtlas v0 uses simple deterministic scans.
RepoAtlas v1 adds symbol extraction.
RepoAtlas v2 adds LSP/Tree-sitter.
RepoAtlas v3 adds semantic retrieval and graph analysis.
The rest of OwnAI still consumes RepoAtlas records.
```

---

# Why This Matters

Large repositories are too big for raw model context.

Bad pattern:

```text
load everything
think about everything
hope the model finds the right thing
```

Better pattern:

```text
index broadly
summarize locally
map relationships
select task-specific context
load deeply only where needed
record confidence and missing context
```

This directly supports:

```text
- lower token usage
- better repo navigation
- better large-codebase changes
- fewer hallucinated APIs
- better test selection
- safer refactors
- better security review
```

---

# Repo Intelligence Stack

OwnAI should understand repos through layered maps.

```text
Layer 1 — File / chunk map
Layer 2 — Symbol map
Layer 3 — Dependency / import / call graph
Layer 4 — Ownership / domain map
Layer 5 — Runtime / test map
Layer 6 — Change / history map
Layer 7 — Heatmap + lenses
Layer 8 — Task-specific context pack
```

Each layer answers a different question.

No single layer is enough.

---

# 1. File / Chunk Map

The chunk map splits the repo into manageable units.

Possible chunk types:

```text
folder chunk
module chunk
package chunk
symbol chunk
workflow chunk
test chunk
history chunk
documentation chunk
```

This extends the Minecraft Chunk Scanner idea:

```text
large repo = world
repo section = chunk
loaded context = currently loaded chunks
```

Purpose:

```text
avoid loading the whole repo
```

---

# 2. Symbol Map

The symbol map identifies code entities.

Examples:

```text
classes
functions
interfaces
types
exports
imports
events
schemas
routes
commands
configuration keys
```

Symbol records let OwnAI answer:

```text
where is this thing defined?
where is it used?
which chunk owns it?
which tests mention it?
```

Example:

```json
{
  "symbolId": "symbol_TaskStateStore",
  "name": "TaskStateStore",
  "kind": "class",
  "definedIn": "packages/task-state/src/store.ts",
  "ownerChunk": "chunk_packages_task_state",
  "referencedBy": [
    "packages/kernel/src/resume.ts",
    "packages/validation/src/task-state.test.ts"
  ]
}
```

Implementation should be replaceable.

Possible engines:

```text
v0: regex/simple export scan
v1: TypeScript compiler API or language-specific parser
v2: Tree-sitter
v3: LSP/SCIP-style index
```

---

# 3. Dependency / Import / Call Graph

The dependency graph records relationships.

Examples:

```text
file imports file
module depends on module
function calls function
event emitted by worker
artifact schema consumed by subsystem
doc describes package
test covers source file
```

Start simple:

```text
ImportGraph
FileGraph
DocGraph
TestGraph
```

Future advanced direction:

```text
Code Property Graph
call graph
dataflow graph
control-flow graph
```

The graph should be used for:

```text
impact analysis
risk propagation
heatmap scoring
microscope expansion
refactor planning
protected core detection
```

---

# 4. Ownership / Domain Map

Big repos are hard because file paths do not always reveal domain ownership.

OwnAI should infer or record:

```text
which package owns which behavior
which subsystem owns which artifact
which docs are source of truth
which modules are protected core
which teams/agents/tools should touch the area
```

Example:

```json
{
  "ownershipRecordId": "owner_permission_authority",
  "scopeType": "package",
  "scopeId": "packages/permission-authority",
  "ownerSubsystem": "permission-authority",
  "domain": "permission and action authority",
  "publicContracts": [
    "ActionIntent",
    "ApprovalRecord",
    "ActionEvidence"
  ],
  "dangerousCapabilities": [
    "external actions",
    "approval gates"
  ]
}
```

This connects directly to the immune-system rule:

```text
We need to know who we are.
```

---

# 5. Runtime / Test Map

OwnAI should know which tests prove which behavior.

Useful mappings:

```text
test file → source files
test name → behavior
test failure → likely chunks
source file → related tests
missing tests → validation pressure
```

Heatmap examples:

```text
changed file with no related tests
→ validation pressure increases

failing test linked to package
→ microscope opens that package

test coverage exists and passes
→ confidence increases
```

Implementation should be staged:

```text
v0: filename and folder heuristics
v1: import-based mapping
v2: coverage-based mapping
v3: runtime trace-based mapping
```

---

# 6. Change / History Map

Git history can reveal hidden relationships.

OwnAI should track:

```text
files often changed together
files changed in bug fixes
files changed in security patches
files frequently involved in regressions
PR/issue descriptions linked to changes
authors/owners if available
```

Use cases:

```text
hidden dependency detection
refactor risk estimation
regression prediction
heatmap activity scoring
context pack expansion
```

Example:

```text
permission-authority and task-state often change together
→ possible hidden relationship
```

---

# 7. Heatmap + Lenses

Repo understanding feeds the heatmap.

Signals:

```text
chunk activity
unknown ownership
missing tests
risk-sensitive code
protected core touch
recent changes
validation pressure
security findings
immune findings
```

Lenses:

```text
Context Lens
Risk Lens
Validation Lens
Security Lens
Ownership Lens
Trust Lens
Replay Lens
```

The heatmap should tell OwnAI:

```text
where to look
why to look there
how deeply to inspect
which lens explains the hotspot
```

---

# 8. Task-Specific Context Pack

Repo understanding becomes useful when it produces a task-specific context pack.

Context pack should include:

```text
selected chunks
selected symbols
selected tests
selected docs
selected graph neighbors
risk notes
missing context
confidence score
exact file/function pointers
```

Do not load broad context unless needed.

Core rule:

```text
Context should be selected by task type, not by repo size.
```

---

# Question-First Retrieval

OwnAI should classify the task/question before retrieving context.

Examples:

```text
Where is this feature implemented?
→ symbol + folder + docs search

Why does this bug happen?
→ call graph + tests + recent changes

Can we refactor this?
→ references + ownership + tests

Is this safe?
→ dangerous sinks + permissions + exploit review

What should I edit?
→ task map + heatmap + microscope
```

This prevents generic retrieval from pulling irrelevant context.

---

# Hybrid Retrieval

Repo understanding should combine multiple retrieval methods.

```text
lexical search
→ exact names, error strings, config keys

symbol search
→ definitions, references, types

embedding search
→ conceptual similarity

graph expansion
→ neighbors around retrieved files

history search
→ files changed together before
```

No single retrieval method should dominate permanently.

Future-proof rule:

```text
Retrieval engines are replaceable providers behind a stable ContextCandidate interface.
```

---

# Repo Atlas

OwnAI should persist repo understanding in a repo atlas.

Suggested structure:

```text
.ownai/repo-atlas/
  repo-atlas.json
  chunk-index.json
  symbol-index.json
  import-graph.json
  test-map.json
  doc-map.json
  ownership-map.json
  change-map.json
  repo-understanding-reports.json
```

Core rule:

```text
Repo understanding must persist.
Do not repeatedly spend tokens rediscovering the same structure.
```

---

# RepoAtlas Record

Example:

```json
{
  "repoAtlasId": "repo_atlas_001",
  "repoId": "KevinRabbe/OwnAI",
  "schemaVersion": "1.0",
  "generatedAt": "2026-05-20T00:00:00Z",
  "providers": {
    "chunkScanner": "minecraft_chunk_scanner_v0",
    "symbolExtractor": "regex_symbol_extractor_v0",
    "dependencyGraph": "import_graph_v0",
    "testMapper": "filename_heuristic_test_mapper_v0"
  },
  "capabilities": [
    "chunks",
    "symbols_basic",
    "imports_basic",
    "tests_heuristic"
  ],
  "limitations": [
    "no runtime traces",
    "no full call graph",
    "no semantic embeddings"
  ]
}
```

---

# Repo Understanding Report

For each meaningful task, OwnAI should produce a report.

Example:

```json
{
  "repoUnderstandingReportId": "understand_001",
  "taskId": "task_123",
  "questionType": "bug_fix",
  "selectedChunks": ["chunk_permission_authority"],
  "selectedSymbols": ["ActionIntent", "ApprovalRecord"],
  "selectedTests": ["permission-authority.test.ts"],
  "confidence": 0.76,
  "missingContext": ["No runtime trace available."],
  "recommendedNextAction": "microscope_inspect_selected_files"
}
```

Core rule:

```text
Do not act like the repo is understood if the map has holes.
```

---

# Repo Understanding Confidence

Confidence should be explicit.

Inputs:

```text
relevant chunks found
owner identified
entry points found
tests mapped
risk areas found
source-of-truth docs found
missing context count
conflicting evidence count
```

Example:

```json
{
  "repoUnderstanding": {
    "taskRelevantChunksFound": true,
    "ownerIdentified": true,
    "testsMapped": false,
    "entryPointsFound": true,
    "riskAreasFound": true,
    "confidence": 0.72,
    "missingContext": [
      "No direct test mapping found for permission approval flow."
    ]
  }
}
```

---

# Telescope → Lens → Microscope Workflow

Standard repo workflow:

```text
Telescope
→ inspect repo atlas, domains, chunks, hotspots

Lens
→ choose context/risk/validation/security/ownership view

Microscope
→ load exact files, symbols, tests, evidence

Action
→ edit only after sufficient understanding

Post-action
→ update atlas, heatmap, tests, docs, replay
```

---

# Replaceable Provider Model

Each repo-understanding subsystem should declare:

```text
providerId
providerVersion
input schema
output schema
capabilities
limitations
confidence behavior
replacement compatibility
```

Example:

```json
{
  "providerId": "symbol_extractor_v0_regex",
  "providerVersion": "0.1.0",
  "outputs": ["SymbolRecord"],
  "capabilities": ["basic_exports", "function_names"],
  "limitations": ["no type resolution", "no references"],
  "canBeReplacedBy": ["tree_sitter_symbol_extractor", "lsp_symbol_indexer"]
}
```

This lets OwnAI rewrite or replace internals without breaking the architecture.

---

# Versioning And Migration

Repo understanding artifacts should be versioned.

Required fields:

```text
schemaVersion
generatedBy
providerVersion
generatedAt
sourceRepoRevision
```

If schema changes:

```text
old records should be migrated, archived, or regenerated
```

---

# Practical Implementation Order

Recommended order:

```text
1. Chunk Scanner
2. Symbol Extractor
3. Import / Dependency Graph
4. Test Map
5. Ownership Inference
6. Repo Atlas JSON
7. Query Classifier
8. Context Pack Builder
9. Repo Understanding Report
10. Heatmap integration
11. Change-history clusters
12. Code property graph / deeper semantic analysis later
```

Do not start with embeddings first.

Start with deterministic structure.

Then add embeddings as a secondary retrieval channel.

---

# Roadmap 01 Boundary

Allowed:

```text
- define RepoAtlas record shape
- define SymbolRecord record shape
- define DependencyEdge record shape
- define TestMapRecord shape
- define RepoUnderstandingReport shape
- implement simple deterministic providers
- output JSON artifacts
- connect to chunk scanner and heatmap later
```

Not Roadmap 01:

```text
- full semantic search system
- full LSP integration
- full Tree-sitter pipeline
- full code property graph
- runtime tracing
- complex graph database
- autonomous repo-wide refactor planner
```

---

# Acceptance Rules

Repo understanding work should not be accepted if:

```text
- no artifact schema version exists
- no provider limitations are declared
- confidence is hidden or fake
- context pack has no reasons for included files
- large files are blindly loaded
- symbols are guessed without evidence
- tests are assumed without mapping
- provider internals are hard-coded as permanent
```

---

# Core Rule

```text
Repo intelligence should be persistent, versioned, evidence-linked, confidence-aware, and replaceable.
```
