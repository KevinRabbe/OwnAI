# OwnAI Cognition Infrastructure System Blueprints

This document promotes the strategic OwnAI infrastructure ideas from parking-lot language into concrete system blueprints.

It exists so these ideas do not remain vague slogans, but also do not prematurely become implementation tasks.

## Short Thesis

```text
AI gave us the engine.
OwnAI builds the car.
```

## Core Metaphor

```text
The model is the engine.
OwnAI is the vehicle, dashboard, memory, safety system, map, tools, and repair system around it.
```

## Core Architecture Rule

```text
Stable contracts.
Replaceable internals.
Observable outcomes.
Replay-based improvement.
Safe promotion or rollback.
```

Every system in this document must follow:

```text
docs/REPLACEABLE_SELF_IMPROVING_SUBSYSTEMS.md
```

---

# Design Pattern For Every System

Each system should define:

```text
purpose
inputs
outputs
core records
v0 scope
integration points
validation requirements
observability events
provider model
non-goals
future improvements
```

A system should not be accepted if it lacks:

```text
schemaVersion
provider metadata
capabilities
limitations
confidence or validation status where relevant
failure behavior
safe rollback/retry behavior where relevant
```

---

# 1. Operational Memory Graph

## Purpose

Operational Memory stores usable work memory, not loose chat facts.

It should remember:

```text
what was decided
why it was decided
what implemented it
what validated it
what failed before
what should not be repeated
```

## Core Principle

```text
Not chat memory.
Work memory.
```

## Inputs

```text
task packets
decisions
document updates
validation results
replay lessons
trust updates
user preferences
repo atlas records
relationship analysis reports
workflow flags
```

## Outputs

```text
MemoryRecord
DecisionRecord
PreferenceRecord
ProjectFactRecord
FailureLessonRecord
SourceOfTruthPointer
MemoryRetrievalResult
```

## Core Records

```json
{
  "schemaVersion": "1.0",
  "memoryRecordId": "memory_001",
  "memoryType": "decision",
  "summary": "OwnAI should use existing editors instead of building its own editor early.",
  "source": "conversation_or_doc",
  "evidenceLinks": ["docs/ROADMAP_IDEA_PARKING_LOT.md"],
  "scope": "architecture",
  "confidence": 0.9,
  "lastVerifiedAt": "2026-05-21T00:00:00Z",
  "providerId": "operational_memory_v0"
}
```

## v0 Scope

```text
- store durable memory records
- link memory to evidence/docs/tasks
- retrieve memory by scope/topic
- mark stale or superseded memory
```

## Non-Goals

```text
- no hidden memory mutation
- no unverified source-of-truth claims
- no global permanent memory without scope
```

---

# 2. Context Compiler

## Purpose

The Context Compiler turns task intent and system knowledge into a minimal, evidence-linked context pack.

## Core Principle

```text
Context should be compiled like code.
Not dumped like garbage.
```

## Inputs

```text
task packet
repo atlas
operational memory
relationship reports
source docs
reference chunks
heatmap signals
risk level
user goal
```

## Outputs

```text
ContextPack
ContextCandidate
ContextInclusionReason
MissingContextRecord
ContextBudgetReport
```

## Core Records

```json
{
  "schemaVersion": "1.0",
  "contextPackId": "context_pack_001",
  "taskId": "task_123",
  "includedItems": [
    {
      "type": "file",
      "id": "packages/permission-authority/src/actions.ts",
      "whyIncluded": ["defines action approval behavior", "high risk lens signal"],
      "evidenceLinks": ["repo_atlas_symbol_001", "heatmap_record_001"]
    }
  ],
  "excludedItems": [
    {
      "id": "docs/archive/old_plan.md",
      "reason": "archived reference, not source of truth"
    }
  ],
  "missingContext": ["No runtime trace for approval execution."],
  "confidence": 0.74,
  "providerId": "context_compiler_v0"
}
```

## v0 Scope

```text
- select context from known records
- preserve inclusion reasons
- report missing context
- track approximate context cost
```

## Non-Goals

```text
- no blind full repo loading
- no unreasoned context stuffing
- no hidden context selection
```

---

# 3. Proof Layer

## Purpose

The Proof Layer prevents false completion.

It checks whether a task is actually done and what evidence proves it.

## Core Principle

```text
No evidence, no completion.
```

## Inputs

```text
task packet
acceptance criteria
validation results
test outputs
code explanation result
exploit review result
documentation updates
human approval records
```

## Outputs

```text
ProofRecord
ValidationEvidence
CompletionDecision
UnverifiedClaimRecord
AcceptanceGateResult
```

## Core Records

```json
{
  "schemaVersion": "1.0",
  "proofRecordId": "proof_001",
  "taskId": "task_123",
  "claims": [
    {
      "claim": "Tests passed.",
      "evidenceLinks": ["validation_run_001"],
      "status": "proven"
    },
    {
      "claim": "Security reviewed.",
      "evidenceLinks": [],
      "status": "unverified"
    }
  ],
  "completionStatus": "blocked_missing_evidence",
  "providerId": "proof_layer_v0"
}
```

## v0 Scope

```text
- require evidence for completion claims
- flag missing evidence
- block acceptance when critical proof is absent
```

## Non-Goals

```text
- no fake validation
- no accepting agent claims without artifacts
- no silent pass on missing security review
```

---

# 4. Experience Replay Engine

## Purpose

Replay lets OwnAI improve from past workflows without retraining the model.

## Core Principle

```text
OwnAI improves from outcomes, not from vibes.
```

## Inputs

```text
task records
context packs
model/tool choices
validation results
human feedback
failure reports
repair actions
provider metadata
```

## Outputs

```text
ReplayRecord
ReplayLesson
ProviderPerformanceRecord
ContextQualityFinding
RegressionFinding
ImprovementCandidate
```

## Core Records

```json
{
  "schemaVersion": "1.0",
  "replayRecordId": "replay_001",
  "taskId": "task_123",
  "providerIds": ["context_compiler_v0", "heatmap_scorer_v0"],
  "outcome": "accepted",
  "laterFailure": false,
  "lessons": [
    "Context pack correctly included approval tests."
  ],
  "providerId": "experience_replay_v0"
}
```

## v0 Scope

```text
- store replay records
- link outcomes to providers/context/tools
- identify repeated failures or wins
```

## Non-Goals

```text
- no autonomous self-rewrite
- no silent promotion of new providers
- no replay without evidence
```

---

# 5. Capability Toolbelt

## Purpose

The Capability Toolbelt governs tools as trusted or sandboxed capabilities, not random plugins.

## Core Principle

```text
Tools are governed body parts.
```

## Inputs

```text
tool definitions
permission model
sandbox trust passports
tool execution requests
risk classification
human approvals
```

## Outputs

```text
ToolCapabilityRecord
ToolPermissionRecord
ToolRunRecord
ToolRiskAssessment
ToolFailureRecord
```

## Core Records

```json
{
  "schemaVersion": "1.0",
  "toolCapabilityId": "tool_browser_read_v0",
  "toolName": "browser_read",
  "allowedActions": ["read_page", "collect_source", "summarize"],
  "blockedActions": ["submit_form", "make_payment", "delete_account"],
  "riskLevel": "medium",
  "requiredApproval": "none_for_read_only",
  "providerId": "capability_toolbelt_v0"
}
```

## v0 Scope

```text
- define tool capabilities
- attach risk levels
- log tool runs
- enforce permission boundaries conceptually or through wrappers
```

## Non-Goals

```text
- no ungoverned tools
- no tool authority expansion
- no external/destructive actions without approval
```

---

# 6. OwnAI Immune System

## Purpose

The immune system protects OwnAI from unknown, changed, or fake-self objects.

## Core Principle

```text
We do not need to know every possible enemy.
We need to know who we are.
Everything else is untrusted until proven otherwise.
```

## Inputs

```text
artifacts
tools
packages
reference repos
validation claims
permission claims
trust updates
sandbox outcomes
```

## Outputs

```text
ImmuneFinding
SandboxRequiredFlag
TrustPassport
QuarantineRecord
AuthorityMismatchRecord
EvidenceMismatchRecord
```

## v0 Scope

```text
- classify self / non-self / changed-self / fake-self
- route unknowns to sandbox when possible
- block fake validation/authority claims
- create quarantine records
```

## Non-Goals

```text
- no full malware detection
- no blind trust in familiar-looking objects
- no unknown tool execution in trusted workspace
```

Source docs:

```text
docs/IMMUNE_SYSTEM_TRUST_BOUNDARY.md
docs/SANDBOX_TRUST_GRADUATION_MODEL.md
```

---

# 7. Mission Control

## Purpose

Mission Control manages autonomous work safely across phases, dependencies, wait states, and approval boundaries.

## Core Principle

```text
Autonomy with brakes, lanes, mirrors, and traffic rules.
```

## Inputs

```text
task packet
roadmap phase
dependency graph
workflow flags
human approval requirements
risk level
blocked state
available independent tasks
```

## Outputs

```text
MissionPlan
PhaseState
DependencyBlockRecord
WaitStateRecord
SafeContinuationRecord
StopConditionRecord
```

## Core Records

```json
{
  "schemaVersion": "1.0",
  "missionPlanId": "mission_001",
  "taskId": "task_123",
  "phases": [
    {"phase": "scan", "status": "complete"},
    {"phase": "write", "status": "blocked_waiting_approval"},
    {"phase": "docs", "status": "can_continue"}
  ],
  "blockedBy": ["human_approval_required"],
  "safeContinuation": ["update docs", "prepare tests"],
  "providerId": "mission_control_v0"
}
```

## v0 Scope

```text
- represent mission phases
- track dependency blocks
- allow safe work-around tasks
- require approval for high-risk actions
```

## Non-Goals

```text
- no chaotic autonomy
- no bypassing blocked dependencies
- no high-risk continuation without approval
```

---

# 8. Repo Atlas

## Purpose

Repo Atlas maps large repositories so the model does not need to read everything.

## Core Principle

```text
The model should not read the whole world.
OwnAI should build the atlas, map the route, and load only what matters.
```

## Inputs

```text
repo files
docs
symbols
imports
tests
history
ownership rules
validation results
relationship analysis
```

## Outputs

```text
RepoAtlas
ChunkRecord
SymbolRecord
DependencyEdge
TestMapRecord
OwnershipRecord
RepoUnderstandingReport
```

## v0 Scope

```text
- chunk repo
- extract basic symbols
- map imports/dependencies
- map tests heuristically
- produce repo atlas JSON
```

## Non-Goals

```text
- no full graph database required
- no full LSP/Tree-sitter requirement in v0
- no full semantic repo understanding on day one
```

Source doc:

```text
docs/REPO_UNDERSTANDING_AND_CONTEXT_ENGINEERING.md
```

---

# 9. Personal Operating Layer

## Purpose

The Personal Operating Layer adapts OwnAI to the user’s real workflow.

## Core Principle

```text
Not a chatbot.
A personal work operating system.
```

## Inputs

```text
user preferences
active projects
workflow history
approval preferences
tool choices
learning goals
style preferences
risk tolerance
```

## Outputs

```text
UserWorkflowProfile
ProjectProfile
PreferenceRecord
ApprovalPreferenceRecord
PersonalContextPack
WorkflowRecommendation
```

## Core Records

```json
{
  "schemaVersion": "1.0",
  "userWorkflowProfileId": "workflow_profile_kevin_v0",
  "preferences": [
    "prefers full copy-ready code",
    "wants architecture plans before implementation",
    "wants docs maintained to prevent spaghetti"
  ],
  "activeProjects": ["OwnAI"],
  "providerId": "personal_operating_layer_v0"
}
```

## v0 Scope

```text
- represent preferences and project context
- use preferences in task planning/context packs
- avoid over-personalizing without evidence
```

## Non-Goals

```text
- no creepy inference
- no hidden sensitive profiling
- no unbounded personal memory without scope
```

---

# 10. Consent & Authority Layer

## Purpose

The Consent & Authority Layer makes human approval precise and scoped.

## Core Principle

```text
The human should not approve vague actions.
The human should approve exact scoped authority.
```

## Inputs

```text
action intent
risk level
permission scope
action preview
rollback plan
human approval
policy rules
```

## Outputs

```text
ActionIntent
ApprovalRequest
ApprovalRecord
PermissionScope
ActionEvidence
AuthorityDecision
```

## Core Records

```json
{
  "schemaVersion": "1.0",
  "approvalRequestId": "approval_001",
  "actionType": "send_email",
  "preview": {
    "to": "example@example.com",
    "subject": "Project update",
    "bodyHash": "sha256:..."
  },
  "scope": "one_time_send_only",
  "expiresAfter": "action_complete",
  "riskLevel": "medium",
  "status": "pending_human_approval",
  "providerId": "consent_authority_v0"
}
```

## v0 Scope

```text
- define approval request/record shapes
- require approval for external/destructive actions
- log action evidence after execution
```

## Non-Goals

```text
- no vague blanket approval
- no self-approval by agent
- no external action without matching approval
```

Source doc:

```text
docs/PERMISSION_AND_ACTION_AUTHORITY_MODEL.md
```

---

# Cross-System Flow

A strong OwnAI workflow should look like this:

```text
1. User gives goal
2. Mission Control creates task phases
3. Operational Memory retrieves relevant project/work context
4. Repo Atlas / source references locate relevant structures
5. Relationship Analysis maps dependencies and contradictions
6. Context Compiler builds the context pack
7. Capability Toolbelt selects allowed tools
8. Consent Layer requests approval if needed
9. Model/tool performs work
10. Proof Layer validates completion
11. Immune System checks unknown/fake/changing objects
12. Replay Engine records outcome and lessons
13. Memory updates only with evidence
```

---

# Roadmap Promotion Rule

A blueprint may become a roadmap issue only when it has:

```text
clear v0 scope
record shapes
validation path
observability path
safe failure behavior
known dependencies
```

---

# Core Rule

```text
OwnAI capability should come from systems around the model:
memory, context, proof, replay, tools, safety, autonomy, maps, personalization, and consent.
```
