# OwnAI Cognition Infrastructure Detailed Integration Plan

This document deepens the 10 Cognition Infrastructure system blueprints and integrates them into the wider OwnAI architecture.

It extends:

```text
docs/COGNITION_INFRASTRUCTURE_SYSTEM_BLUEPRINTS.md
docs/REPLACEABLE_SELF_IMPROVING_SUBSYSTEMS.md
docs/ARCHITECTURE_RELATIONSHIP_DIAGRAMS.md
docs/CONNECTION_OWNERSHIP_AND_VALIDATION_MATRIX.md
docs/ROADMAP_01_MINIMAL_COGNITION_KERNEL.md
```

## Short Thesis

```text
AI gave us the engine.
OwnAI builds the car.
```

## Core Integration Rule

```text
Each system must own one clear responsibility,
produce versioned records,
consume records through stable contracts,
and improve through providers without breaking the rest of OwnAI.
```

---

# System List

The integrated cognition infrastructure contains:

```text
1. Operational Memory Graph
2. Context Compiler
3. Proof Layer
4. Experience Replay Engine
5. Capability Toolbelt
6. OwnAI Immune System
7. Mission Control
8. Repo Atlas
9. Personal Operating Layer
10. Consent & Authority Layer
```

These are not isolated modules.

They form the car around the model.

---

# High-Level Data Flow

```text
User Goal
→ Mission Control
→ Operational Memory + Personal Operating Layer
→ Repo Atlas / Source References / Domain Packs
→ Relationship Analysis
→ Context Compiler
→ Model + Capability Toolbelt
→ Consent & Authority if needed
→ Work Execution
→ Proof Layer
→ Immune System checks
→ Experience Replay
→ Operational Memory update
→ Heatmap / Observability update
```

Core flow:

```text
intent
→ plan
→ retrieve memory/context
→ map relationships
→ compile context
→ act with governed tools
→ prove result
→ learn from outcome
```

---

# Global Record Requirements

Every important record should include:

```text
schemaVersion
recordId
createdAt
createdBy or providerId
taskId when applicable
source/evidence links when applicable
confidence when applicable
status
limitations when applicable
```

Every provider should include:

```text
providerId
providerVersion
capabilities
limitations
inputSchema
outputSchema
replacementCompatibility
riskLevel
requiredPermissions
```

---

# 1. Operational Memory Graph — Detailed Plan

## System Responsibility

Operational Memory owns durable work memory.

It remembers project facts, decisions, preferences, failures, source-of-truth pointers, and replay lessons.

It must not become a random text dump.

## Owns

```text
MemoryRecord
DecisionRecord
ProjectFactRecord
PreferenceRecord
FailureLessonRecord
SourceOfTruthPointer
MemoryRetrievalResult
MemoryStalenessRecord
```

## Consumes

```text
TaskPacket
ProofRecord
ReplayLesson
HumanFeedback
DocumentRegistry entries
RepoUnderstandingReport
RelationshipAnalysisReport
WorkflowFlag
```

## Produces

```text
scoped memory retrieval
project context hints
known decisions
known constraints
previous failure warnings
source-of-truth pointers
```

## Integration Points

```text
Mission Control
→ asks memory for relevant project/task state

Context Compiler
→ receives memory records as context candidates

Proof Layer
→ sends accepted decisions/facts back to memory

Replay Engine
→ stores useful lessons into memory

Personal Operating Layer
→ stores user workflow preferences with evidence
```

## Trust Boundary

Memory updates require evidence.

```text
No evidence → no authoritative memory.
```

Memory can store unverified notes, but they must be marked:

```text
status: unverified
```

## v0 Implementation

```text
- JSON memory store
- scoped records
- evidence links
- stale/superseded status
- simple retrieval by tags/scope/project
```

## Future Providers

```text
memory_store_json_v0
memory_graph_sqlite_v1
memory_graph_vector_hybrid_v2
memory_graph_replay_weighted_v3
```

## Non-Goals

```text
- no hidden personal profiling
- no unscoped permanent memory
- no source-of-truth claims without registry/evidence
```

---

# 2. Context Compiler — Detailed Plan

## System Responsibility

The Context Compiler owns context selection.

It compiles task-specific context packs from available memory, repo maps, source docs, relationship reports, and risk signals.

## Owns

```text
ContextPack
ContextCandidate
ContextInclusionReason
ContextExclusionReason
MissingContextRecord
ContextBudgetReport
ContextQualityScore
```

## Consumes

```text
TaskPacket
RepoAtlas records
OperationalMemory records
RelationshipAnalysisReport
HeatmapRecords
SourceCodeReferenceChunks
DomainPack records
PersonalWorkflowProfile
```

## Produces

```text
task-specific context packs
missing-context warnings
context budget reports
context quality signals
```

## Integration Points

```text
Mission Control
→ requests context for task phase

Repo Atlas
→ provides chunks/symbols/tests/docs

Relationship Analysis
→ provides dependencies/contradictions/scenarios

Heatmap
→ prioritizes high-risk/high-uncertainty areas

Proof Layer
→ checks whether selected context was enough

Replay Engine
→ evaluates context quality after outcome
```

## Core Rule

```text
Context should be compiled like code.
Not dumped like garbage.
```

## v0 Implementation

```text
- build ContextPack JSON
- include exact reasons for each item
- include excluded items where useful
- include missing context
- include rough token/cost budget
```

## Future Providers

```text
context_compiler_rule_based_v0
context_compiler_heatmap_weighted_v1
context_compiler_relationship_graph_v2
context_compiler_replay_optimized_v3
```

## Non-Goals

```text
- no full repo dumping
- no unreasoned context stuffing
- no hidden context selection
```

---

# 3. Proof Layer — Detailed Plan

## System Responsibility

The Proof Layer owns acceptance evidence.

It decides whether completion claims are proven, unverified, blocked, or require human review.

## Owns

```text
ProofRecord
ValidationEvidence
CompletionDecision
UnverifiedClaimRecord
AcceptanceGateResult
ProofGapRecord
```

## Consumes

```text
TaskPacket
AcceptanceCriteria
ValidationRun
TestOutput
CodeExplanationResult
ExploitReviewResult
HumanApprovalRecord
DocumentationUpdateRecord
```

## Produces

```text
completion accepted/blocked/requires-review
proof gaps
unverified claim flags
validation pressure signals
```

## Integration Points

```text
Mission Control
→ cannot close task until Proof Layer allows it

Immune System
→ checks fake validation/evidence mismatch

Replay Engine
→ learns which proof checks missed failures

Operational Memory
→ stores accepted decisions only after proof

Heatmap
→ receives validation pressure and proof gap signals
```

## Core Rule

```text
No evidence, no completion.
```

## v0 Implementation

```text
- record claims
- link evidence
- mark proven/unverified/contradicted
- block completion when critical proof is missing
```

## Future Providers

```text
proof_layer_checklist_v0
proof_layer_test_aware_v1
proof_layer_security_aware_v2
proof_layer_replay_calibrated_v3
```

## Non-Goals

```text
- no accepting agent claims as proof
- no fake validation pass
- no silent missing evidence
```

---

# 4. Experience Replay Engine — Detailed Plan

## System Responsibility

Replay owns outcome learning.

It compares what OwnAI did with what happened later.

It improves providers, context selection, validation, tool choice, and memory quality without retraining the base model.

## Owns

```text
ReplayRecord
ReplayLesson
ProviderPerformanceRecord
ContextQualityFinding
RegressionFinding
ImprovementCandidate
ReplayOutcomeLink
```

## Consumes

```text
TaskPacket
ContextPack
ToolRunRecord
ProofRecord
ValidationRun
HumanFeedback
LaterFailureRecord
ProviderMetadata
```

## Produces

```text
lessons
provider performance data
regression warnings
improvement candidates
trust updates
memory update candidates
```

## Integration Points

```text
Replaceable Subsystems
→ replay compares providers

Context Compiler
→ replay scores context quality

Proof Layer
→ replay finds missed validation gaps

Mission Control
→ replay suggests safer future workflows

Operational Memory
→ replay promotes durable lessons when proven
```

## Core Rule

```text
OwnAI improves from outcomes, not from vibes.
```

## v0 Implementation

```text
- append-only replay store
- task/provider/outcome links
- simple lesson records
- failure/win classification
```

## Future Providers

```text
experience_replay_append_only_v0
experience_replay_pattern_detector_v1
experience_replay_provider_benchmark_v2
experience_replay_shadow_mode_controller_v3
```

## Non-Goals

```text
- no autonomous self-rewrite
- no silent provider promotion
- no learning from unevidenced claims
```

---

# 5. Capability Toolbelt — Detailed Plan

## System Responsibility

The Capability Toolbelt owns tool capability definitions, risk levels, and run records.

Tools are governed capabilities, not random plugins.

## Owns

```text
ToolCapabilityRecord
ToolPermissionRecord
ToolRunRecord
ToolRiskAssessment
ToolFailureRecord
ToolCapabilityPassport
```

## Consumes

```text
ToolDefinition
PermissionScope
TrustPassport
SandboxOutcome
ActionIntent
ApprovalRecord
RiskPolicy
```

## Produces

```text
allowed/blocked tool use
run logs
tool risk findings
tool performance data
tool failure events
```

## Integration Points

```text
Mission Control
→ asks which tools are available for phase

Consent & Authority
→ approves high-risk tool actions

Immune System
→ checks unknown/fake/changing tools

Replay Engine
→ learns tool performance/failure patterns

Proof Layer
→ uses tool run evidence
```

## Core Rule

```text
Tools are governed body parts.
```

## v0 Implementation

```text
- tool registry
- allowed/blocked actions
- risk levels
- tool run logging
- permission requirements
```

## Future Providers

```text
capability_toolbelt_registry_v0
capability_toolbelt_policy_enforcer_v1
capability_toolbelt_sandbox_integrated_v2
capability_toolbelt_replay_ranked_v3
```

## Non-Goals

```text
- no ungoverned tools
- no tool authority expansion
- no external/destructive action without consent
```

---

# 6. OwnAI Immune System — Detailed Plan

## System Responsibility

The Immune System owns identity/trust boundary detection.

It distinguishes self, non-self, changed-self, and fake-self.

## Owns

```text
ImmuneFinding
TrustPassport
SandboxRequiredFlag
QuarantineRecord
AuthorityMismatchRecord
EvidenceMismatchRecord
ChangedSelfRecord
FakeSelfSimilarityFinding
```

## Consumes

```text
ToolCapabilityRecord
PackageRecord
ReferenceRepoRecord
ValidationClaim
PermissionClaim
TrustUpdateRequest
SandboxRun
ProofRecord
```

## Produces

```text
sandbox required
block/quarantine decisions
identity findings
authority mismatch flags
evidence mismatch flags
risk heatmap signals
```

## Integration Points

```text
Capability Toolbelt
→ validates tools/packages

Proof Layer
→ catches fake validation/evidence mismatch

Consent Layer
→ blocks fake authority

Sandbox Trust Graduation
→ handles unknown objects

Heatmap
→ receives immune findings

Replay
→ learns repeated fake-self patterns
```

## Core Rule

```text
We do not need to know every possible enemy.
We need to know who we are.
Everything else is untrusted until proven otherwise.
```

## v0 Implementation

```text
- classify unknown/changed/fake-self
- require sandbox for unknowns where possible
- block fake validation and authority mismatch
- quarantine suspicious objects with evidence
```

## Future Providers

```text
immune_identity_checker_v0
immune_similarity_checker_v1
immune_package_risk_checker_v2
immune_behavioral_anomaly_checker_v3
```

## Non-Goals

```text
- no full malware scanner in v0
- no blind trust in familiar names
- no running unknown tools directly
```

---

# 7. Mission Control — Detailed Plan

## System Responsibility

Mission Control owns task orchestration, phases, wait states, dependency blocks, and safe continuation.

## Owns

```text
MissionPlan
PhaseState
DependencyBlockRecord
WaitStateRecord
SafeContinuationRecord
StopConditionRecord
MissionStatusReport
```

## Consumes

```text
TaskPacket
DependencyGraph
WorkflowFlag
ApprovalRequirement
RiskLevel
ProofResult
ToolAvailability
HumanWaitState
```

## Produces

```text
current task phase
blocked state
safe next action
approval needed
stop condition
resume state
```

## Integration Points

```text
Task Packet Generator
→ creates initial task structure

Context Compiler
→ provides phase context

Proof Layer
→ determines phase completion

Consent Layer
→ handles approval gates

Capability Toolbelt
→ lists available safe tools

Replay Engine
→ records mission outcome
```

## Core Rule

```text
Autonomy with brakes, lanes, mirrors, and traffic rules.
```

## v0 Implementation

```text
- mission plan JSON
- phase statuses
- dependency blocks
- safe continuation options
- stop conditions
```

## Future Providers

```text
mission_control_static_phase_v0
mission_control_dependency_aware_v1
mission_control_replay_optimized_v2
mission_control_multi_worker_v3
```

## Non-Goals

```text
- no chaotic autonomy
- no bypassing approval gates
- no high-risk continuation without consent
```

---

# 8. Repo Atlas — Detailed Plan

## System Responsibility

Repo Atlas owns persistent repository understanding.

It maps files, chunks, symbols, dependencies, tests, ownership, docs, and change history.

## Owns

```text
RepoAtlas
ChunkRecord
SymbolRecord
DependencyEdge
TestMapRecord
OwnershipRecord
DocMapRecord
ChangeCluster
RepoUnderstandingReport
```

## Consumes

```text
repo files
docs
test files
git history
validation results
source references
relationship reports
```

## Produces

```text
repo map
chunk index
symbol index
import graph
test map
ownership map
understanding report
```

## Integration Points

```text
Context Compiler
→ selects repo context from atlas

Relationship Analysis
→ uses atlas entities and edges

Heatmap
→ scores repo hotspots

Proof Layer
→ maps tests/evidence to files

Replay Engine
→ updates repo understanding from outcomes
```

## Core Rule

```text
The model should not read the whole world.
OwnAI should build the atlas, map the route, and load only what matters.
```

## v0 Implementation

```text
- chunk-index.json
- symbol-index.json
- import-graph.json
- test-map.json
- ownership-map.json
- repo-understanding-report.json
```

## Future Providers

```text
repo_atlas_simple_scan_v0
repo_atlas_tree_sitter_v1
repo_atlas_lsp_indexed_v2
repo_atlas_graph_semantic_hybrid_v3
```

## Non-Goals

```text
- no full semantic code intelligence required in v0
- no full graph database required in v0
- no blind full repo context loading
```

---

# 9. Personal Operating Layer — Detailed Plan

## System Responsibility

The Personal Operating Layer owns user/workflow adaptation.

It uses explicit and evidence-backed user/project preferences to improve planning and context.

## Owns

```text
UserWorkflowProfile
ProjectProfile
PreferenceRecord
ApprovalPreferenceRecord
PersonalContextPack
WorkflowRecommendation
PreferenceEvidenceRecord
```

## Consumes

```text
user instructions
past accepted workflows
human feedback
project records
approval history
memory records
```

## Produces

```text
personalized planning hints
preferred output style
approval preferences
project-specific defaults
workflow recommendations
```

## Integration Points

```text
Mission Control
→ adapts workflow style

Context Compiler
→ includes user/project preferences

Consent Layer
→ applies approval preferences where safe

Operational Memory
→ stores preference evidence

Replay Engine
→ learns which personalization helped
```

## Core Rule

```text
Not a chatbot.
A personal work operating system.
```

## v0 Implementation

```text
- explicit preference records
- project profile records
- evidence-backed personalization
- no hidden sensitive profiling
```

## Future Providers

```text
personal_layer_explicit_preferences_v0
personal_layer_project_profile_v1
personal_layer_replay_adapted_v2
personal_layer_privacy_preserving_local_v3
```

## Non-Goals

```text
- no creepy inference
- no unbounded sensitive memory
- no personalization without evidence
```

---

# 10. Consent & Authority Layer — Detailed Plan

## System Responsibility

Consent & Authority owns scoped human approval and action authority.

It ensures OwnAI cannot perform external/destructive/high-risk actions without exact permission.

## Owns

```text
ActionIntent
ApprovalRequest
ApprovalRecord
PermissionScope
ActionEvidence
AuthorityDecision
ConsentAuditRecord
```

## Consumes

```text
action request
risk level
tool capability record
human approval
policy rules
rollback plan
action preview
```

## Produces

```text
approved/denied action authority
permission scope
action evidence
audit trail
approval expiration
```

## Integration Points

```text
Mission Control
→ pauses at approval gates

Capability Toolbelt
→ executes only approved scoped actions

Immune System
→ checks fake authority claims

Proof Layer
→ uses action evidence

Replay Engine
→ reviews approval/action outcomes
```

## Core Rule

```text
The human should not approve vague actions.
The human should approve exact scoped authority.
```

## v0 Implementation

```text
- ActionIntent records
- ApprovalRequest/ApprovalRecord records
- one-time scoped permissions
- action evidence after execution
```

## Future Providers

```text
consent_authority_records_v0
consent_authority_policy_engine_v1
consent_authority_ui_preview_v2
consent_authority_replay_calibrated_v3
```

## Non-Goals

```text
- no blanket vague approval
- no agent self-approval
- no external action without matching approval
```

---

# Integration Matrix

| System | Consumes From | Produces For | Protected Boundary |
|---|---|---|---|
| Operational Memory | Replay, Proof, Docs, User Feedback | Context Compiler, Mission Control | No memory authority without evidence |
| Context Compiler | Memory, Repo Atlas, Heatmap, Relationships | Model, Mission Control, Proof | No blind context dumping |
| Proof Layer | Tests, Validation, Explanation, Reviews | Mission Control, Memory, Replay | No evidence, no completion |
| Replay Engine | Outcomes, Context, Tools, Proof | Memory, Providers, Heatmap | No silent self-rewrite |
| Capability Toolbelt | Tool Registry, Permissions, Trust | Mission Control, Proof, Replay | No ungoverned tool authority |
| Immune System | Tools, Packages, Claims, Trust | Sandbox, Heatmap, Proof | Unknown is untrusted |
| Mission Control | Tasks, Dependencies, Risk, Approvals | All workflow systems | No chaotic autonomy |
| Repo Atlas | Repo, Docs, Tests, History | Context Compiler, Relationships | No full repo dumping |
| Personal Layer | User prefs, Projects, Feedback | Mission Control, Context Compiler | No creepy inference |
| Consent Layer | Action Intents, Risk, Human Approval | Toolbelt, Proof, Replay | No vague approval |

---

# Roadmap 01 Integration Strategy

Roadmap 01 should not implement all systems fully.

Roadmap 01 should implement the minimum record contracts that allow later systems to plug in.

## Roadmap 01 Priority Contracts

```text
TaskPacket
ContextPack
ValidationEvidence
ReplayRecord
TrustRecord
ToolRunRecord
ActionIntent
ApprovalRecord
MemoryRecord
RepoAtlas basic records
ProofRecord
MissionPlan
```

## Later Roadmaps

```text
Roadmap 02
→ stronger repo atlas, context compiler, proof layer

Roadmap 03
→ capability toolbelt, consent UI, immune sandboxing

Roadmap 04
→ replay-driven provider improvement and shadow mode

Roadmap 05
→ advanced relationship/domain packs and personal operating layer
```

---

# Acceptance Rules For This Architecture

The integrated cognition infrastructure is not acceptable if:

```text
- systems have overlapping ownership without explicit boundary
- records lack schema versions
- providers lack capabilities/limitations
- context selection has no reasons
- completion has no proof
- memory updates lack evidence
- tools can expand authority
- unknown objects skip sandbox
- external actions skip consent
- replay can silently rewrite protected core
```

---

# Core Rule

```text
OwnAI capability should come from systems around the model:
memory, context, proof, replay, tools, safety, autonomy, maps, personalization, and consent.
```
