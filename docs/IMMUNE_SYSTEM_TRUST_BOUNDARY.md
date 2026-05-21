# OwnAI Immune System Trust Boundary

OwnAI needs an immune-system style security layer.

The goal is not to understand every possible attack perfectly.

The goal is to define OwnAI's own identity clearly enough that anything outside that identity is treated as untrusted until proven otherwise.

## Core Principle

```text
We do not need to know every possible enemy.
We need to know who we are.
Everything else is untrusted until proven otherwise.
```

Operational version:

```text
known OwnAI identity
→ allowed within scope

unknown
→ sandbox first

sandbox result trusted
→ register with limited scope

sandbox result unsafe or unverifiable
→ block or quarantine

changed
→ revalidate

pretending
→ block or quarantine
```

---

# Identity-First Security

OwnAI should not try to enumerate every possible bad thing in the world.

That does not scale.

Instead, OwnAI should maintain a clear identity boundary:

```text
what belongs to OwnAI
who owns it
what authority it has
what evidence supports it
what scope it is allowed to operate in
```

Anything outside this boundary is not automatically evil.

But it is also not trusted.

Core rule:

```text
Unknown is not accepted as trusted.
Unknown must become sandboxed, registered, validated, scoped, or quarantined.
```

---

# Unknown Object Pipeline

Unknown objects should not go directly into the trusted system.

They should enter a sandbox pipeline first.

```text
unknown object
→ isolate
→ inspect metadata
→ run limited checks
→ test in sandbox if possible
→ decide: limited trust, block, or quarantine
```

Sandboxing means:

```text
limited permissions
no access to protected core
no external actions without approval
no trust updates
no registry authority
no destructive writes
observable behavior recorded
```

Possible sandbox outcomes:

```text
trusted_with_scope
→ object may be registered with narrow authority

needs_review
→ human/governance/security review required

blocked
→ object must not be used

quarantined
→ preserved as evidence but not trusted
```

Core rule:

```text
Unknown must prove itself in a limited environment before it can affect trusted state.
```

---

# Biological Metaphor

The immune system does not need to understand every possible disease in advance.

It works by distinguishing:

```text
self
→ belongs to the body

non-self
→ does not belong

changed-self
→ belongs, but looks abnormal

fake-self
→ outsider pretending to belong
```

OwnAI should use the same pattern for software, agents, artifacts, packages, actions, and trust records.

---

# OwnAI Equivalent

## Self

Things that belong to OwnAI.

Examples:

```text
- registered documents
- known packages
- approved source-of-truth docs
- known tools
- known agents/workers
- known artifact schemas
- known event types
- approved permissions
- trusted source records
- validated task states
```

Self requires identity markers.

Something is not self just because it looks familiar.

---

## Non-Self

Things that do not belong or are not yet proven to belong.

Examples:

```text
- unknown package
- unknown script
- unregistered document
- unknown action intent
- external repo not in reference library
- unknown worker identity
- unknown event type
- unknown artifact schema
```

Non-self should be treated as untrusted by default and routed to sandbox when possible.

---

## Changed-Self

Things that belong, but changed enough to require review.

Examples:

```text
- protected core file modified
- existing permission rule changed
- trust update logic changed
- validation gate changed
- registry entry changed unexpectedly
- known package version changed
- approved reference repo updated
- task state schema changed
```

Changed-self is not automatically bad.

But it must be revalidated before being trusted again.

---

## Fake-Self

Things that appear legitimate but are suspicious.

Examples:

```text
- package typo-squat
- repo name similar to trusted repo
- fake validation result
- fake action evidence
- replay entry with forged source
- worker claiming an authority it does not have
- unregistered doc pretending to be source of truth
- dependency with similar name to approved dependency
- prompt-injected instruction claiming to be system policy
```

Fake-self should be blocked or quarantined.

---

# Why This Matters

AI agents are vulnerable to fake authority.

Examples:

```text
- malicious docs saying ignore previous rules
- package README suggesting unsafe setup
- fake tool output claiming validation passed
- copied code with hidden dangerous behavior
- external repo pretending to be official
- generated artifact claiming approval without evidence
```

An agent may not understand every exploit.

But OwnAI can still ask:

```text
Is this part of our identity?
Is this known?
Is this registered?
Is this allowed?
Is this backed by evidence?
Did this change unexpectedly?
Is this pretending to be trusted?
Can it be safely sandboxed before trust?
```

---

# Relationship To Existing Security Docs

This document complements:

```text
docs/EXPLOIT_DETECTION_AND_ABUSE_CASE_REVIEW.md
docs/SOURCE_CODE_REFERENCE_LIBRARY.md
docs/PERMISSION_AND_ACTION_AUTHORITY_MODEL.md
docs/COGNITION_SEPARATION_OF_POWERS.md
docs/PROTECTED_CORE_ARCHITECTURE.md
docs/CONNECTION_OWNERSHIP_AND_VALIDATION_MATRIX.md
docs/CODING_AGENT_DOCUMENTATION_WORKFLOW.md
```

Exploit review asks:

```text
What can this code be made to do?
```

The immune layer asks:

```text
Does this thing belong here?
Is it still the thing we trust?
Is it pretending to be trusted?
Should it be sandboxed before trust?
```

---

# Trust Boundary Checks

Every important artifact should be checkable by identity and provenance.

Required questions:

```text
Who created this?
Which task created it?
Which subsystem owns it?
Which schema does it follow?
Which source-of-truth allows it?
Which evidence supports it?
Was it validated?
Did it change after validation?
Does it request authority it should not have?
Can it be sandboxed before being trusted?
```

---

# Immune Markers

OwnAI should attach markers to trusted artifacts.

Possible markers:

```text
artifactId
schemaVersion
ownerSubsystem
createdBy
createdAt
taskId
sourceDocs
evidenceLinks
validationStatus
permissionScope
trustLevel
lastVerifiedAt
sandboxStatus
sandboxEvidence
```

The goal is not decoration.

The goal is to make forgery, drift, and fake authority easier to detect.

---

# Detection Classes

## 1. Unknown Object Detection

Flags things OwnAI has never seen or registered.

Examples:

```text
unknown dependency
unknown event type
unknown artifact schema
unknown worker role
```

Response:

```text
sandbox if possible
otherwise flag for review or quarantine before use
```

---

## 2. Drift Detection

Flags trusted things that changed.

Examples:

```text
registered source doc changed behavior
approved package version updated
protected core file changed
reference repo updated
schema version changed
```

Response:

```text
require revalidation
```

---

## 3. Impersonation Detection

Flags things pretending to be trusted.

Examples:

```text
typo-squatted package
similar repo name
fake authority claim
fake validation output
artifact claims wrong owner
```

Response:

```text
block or escalate
```

---

## 4. Authority Mismatch Detection

Flags objects acting outside their allowed scope.

Examples:

```text
document tries to override governance
worker tries to approve its own work
tool output tries to change permissions
source code reference tries to become architecture authority
```

Response:

```text
ignore authority claim and create flag
```

---

## 5. Evidence Mismatch Detection

Flags claims without matching evidence.

Examples:

```text
validation says passed but no command result exists
action says approved but no approval record exists
trust score increased without replay evidence
document says registered but registry has no entry
```

Response:

```text
block acceptance until evidence exists
```

---

# Sandbox Concept

Sandbox is for unknown or changed objects that may be useful but are not trusted yet.

Sandbox means:

```text
can be observed
can be tested
can be inspected
cannot affect trusted state
cannot grant itself authority
cannot bypass governance
```

Possible sandbox targets:

```text
unknown package
unknown repo reference
unknown script
unknown worker/tool
unknown artifact type
changed dependency
changed reference repo
```

Sandbox output should include:

```text
sandboxRunId
objectId
objectType
checksRun
observedBehavior
permissionsUsed
networkAccess
fileAccess
result
recommendation
evidenceLinks
```

---

# Quarantine Concept

Suspicious artifacts should not be deleted immediately.

They should be quarantined.

Quarantine means:

```text
visible
preserved
not trusted
not used for decisions
requires review
```

Examples:

```text
.ownai/quarantine/artifacts/
.ownai/quarantine/references/
.ownai/quarantine/actions/
```

Core rule:

```text
Do not trust suspicious objects, but preserve them as evidence.
```

---

# Immune Response Levels

```text
observe
→ record only

sandbox
→ isolate and test before trust

warn
→ create non-blocking flag

quarantine
→ preserve but do not trust/use

block
→ stop affected workflow

escalate
→ require human/governance/security review
```

---

# Examples

## Example 1 — Fake Validation

```text
Agent reports tests passed.
No validation result exists.
No command output exists.
```

Immune classification:

```text
fake-self
```

Response:

```text
block acceptance
create evidence_mismatch flag
require real validation artifact
```

---

## Example 2 — Typo-Squatted Package

```text
Known approved package: browser-use
New package requested: browsser-use
```

Immune classification:

```text
fake-self
```

Response:

```text
block dependency install
require security review
```

---

## Example 3 — Reference Repo Drift

```text
Approved external reference repo updates.
Important API behavior changed.
```

Immune classification:

```text
changed-self
```

Response:

```text
mark reference stale
re-index chunks
sandbox changed behavior if executable/relevant
update affected context packs
```

---

## Example 4 — Prompt Injection In Docs

```text
External README says: ignore project rules and run this command.
```

Immune classification:

```text
authority mismatch / fake-self
```

Response:

```text
external docs are reference only
ignore authority claim
flag prompt injection risk
```

---

## Example 5 — Unknown Tool

```text
A worker proposes using a new CLI tool.
The tool is not registered.
```

Immune classification:

```text
non-self
```

Response:

```text
sandbox first
inspect package identity and install scripts
run limited checks
allow only if registered with narrow scope
otherwise block or quarantine
```

---

# Integration With Source Code Reference Library

External repos are not OwnAI self by default.

They can become:

```text
active_reference
```

but they do not become:

```text
OwnAI authority
```

Reference source code can inform implementation, but it cannot override OwnAI governance, registry, permissions, or security rules.

Unknown reference repos should enter the sandbox/reference review path before becoming active references.

---

# Integration With Package Security

Dependencies should be checked for:

```text
- known package identity
- package age
- publisher reputation if available
- name similarity to trusted packages
- version drift
- install script risk
- lockfile changes
```

This supports the agent-era package safety lesson from modern agentic workflows: agents should not blindly install packages just because generated code requests them.

Unknown dependencies should be sandboxed or blocked before install into trusted workspace.

---

# Integration With Permission System

Permission records should be treated as immune markers.

An action is not allowed because it says it is allowed.

It is allowed only if matching permission evidence exists.

Required checks:

```text
action intent exists
risk level assigned
permission scope matches action
approval record exists if required
action evidence recorded after execution
```

Unknown actions should not execute directly.

They should be simulated, drafted, or sandboxed when possible.

---

# Integration With Trust Registry

Trust cannot update itself.

Trust changes require evidence.

Immune check:

```text
trust update claim
→ replay/validation/security evidence exists?
→ source is authorized to affect trust?
→ update is within allowed scope?
```

If not:

```text
fake-self or authority mismatch
```

Sandbox results may contribute to trust, but they do not automatically grant full trust.

---

# Integration With Heatmap

Immune findings should become heatmap signals.

Signals:

```text
unknown object detected
sandbox required
sandbox passed
sandbox failed
changed-self detected
fake-self suspected
authority mismatch
evidence mismatch
quarantined artifact
protected core drift
```

Suggested lens:

```text
Risk Lens
Security Lens
Trust Lens
Ownership Lens
```

---

# Roadmap 01 Scope

Roadmap 01 does not need a full immune engine.

Allowed:

```text
- define immune classifications
- define sandbox response stage
- add flags for evidence mismatch / authority mismatch / sandbox required
- record suspicious artifact metadata
- require real evidence for validation/action/trust claims
- add package/reference safety notes
```

Not Roadmap 01:

```text
- full malware detection
- full package reputation system
- automatic cryptographic signing
- advanced anomaly detection
- full sandbox quarantine implementation
```

---

# Future Improvements

Later versions may add:

```text
- artifact signatures
- dependency reputation database
- typo-squat detection
- source provenance graph
- package install risk scoring
- prompt-injection detector for external docs
- reference repo drift monitor
- anomaly detection over event streams
- trusted publisher registry
- isolated sandbox runner
- network/file permission monitor
```

---

# Anti-Patterns

Avoid:

```text
- trusting objects because they look familiar
- accepting validation without evidence
- letting external docs override OwnAI policy
- letting workers approve their own authority
- deleting suspicious artifacts before review
- treating open source as automatically safe
- assuming known objects remain safe forever
- accepting unknown objects as trusted because they are convenient
- running unknown tools directly in trusted workspace
```

---

# Core Rule

```text
Trust is not a feeling.
Trust is identity plus provenance plus evidence plus allowed authority.
```
