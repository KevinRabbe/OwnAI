# OwnAI Sandbox Trust Graduation Model

This document defines how unknown or changed objects move through sandboxing, evidence collection, scoped trust, quarantine, or blocking.

It extends:

```text
docs/IMMUNE_SYSTEM_TRUST_BOUNDARY.md
```

## Core Principle

```text
Unknown objects do not become trusted.
They graduate through evidence-limited trust levels.
```

Stronger rule:

```text
Deny by default.
Allow only by identity, evidence, scope, and authority.
```

---

# Why This Exists

The immune system trust boundary says:

```text
We know who we are.
Everything else is untrusted until proven otherwise.
```

This document defines the graduation path from:

```text
unknown
```

to:

```text
limited trust
```

or:

```text
block / quarantine
```

This prevents dangerous jumps such as:

```text
unknown package passed one check
→ fully trusted
```

Correct behavior:

```text
unknown package passed sandbox
→ allowed only within narrow scope
→ revalidate on change
→ trust expires
```

---

# Improved Pipeline

```text
unknown object
→ classify object type
→ assign risk level
→ choose sandbox depth
→ collect evidence
→ decide trust level
→ register / restrict / quarantine / block
→ feed result into heatmap + replay + trust
```

---

# Trust Levels

Trust should not be binary.

## T0 — Unknown

```text
not registered
not validated
not allowed to affect trusted state
```

Default state for new objects.

---

## T1 — Observed Only

```text
metadata known
not trusted
not executable in trusted workspace
```

Useful for recording an object before deciding what to do.

---

## T2 — Sandbox-Passed

```text
passed limited sandbox checks
still not generally trusted
may be used only in test/sandbox context
```

---

## T3 — Limited Trust

```text
allowed for narrow task/scope
no authority expansion
no protected core access
requires revalidation on change
```

---

## T4 — Trusted Within Scope

```text
registered
validated
allowed only for declared scope
monitored for drift
trust expires or revalidates periodically
```

---

## T5 — Protected OwnAI Identity

```text
core OwnAI identity
protected by stronger review
changes require explicit governance/security validation
```

Examples:

```text
- governance rules
- permission authority
- trust registry logic
- validation gates
- protected core architecture
- document registry/source-of-truth control
```

---

# Sandbox Depth Levels

Different unknowns need different sandbox depth.

## S0 — Metadata Inspection Only

Use for low-risk objects.

Examples:

```text
new markdown document
new reference candidate
static metadata-only artifact
```

Checks:

```text
identity
schema
owner
source
registry status
```

---

## S1 — Static Scan

Use when object content matters but does not need execution.

Examples:

```text
script file
package manifest
document with authority claims
reference repo metadata
```

Checks:

```text
unsafe strings
install scripts
authority claims
secret exposure
suspicious package names
license notes
```

---

## S2 — Dry Run / No-Write Execution

Use when behavior can be simulated without writes.

Examples:

```text
CLI command preview
formatter/detector tool
repo scanner dry run
```

Limits:

```text
no writes
no external actions
no trust updates
no registry edits
```

---

## S3 — Isolated Execution With Fake Data

Use for tools/packages that need execution.

Examples:

```text
unknown CLI tool
unknown dependency
codegen utility
automation helper
```

Limits:

```text
fake data only
isolated temp workspace
no protected core access
restricted network if possible
logged filesystem access
```

---

## S4 — Restricted Real Integration

Use only after earlier checks pass.

Examples:

```text
new tool integrated into workflow
reference repo used for real task context
package used in non-critical path
```

Limits:

```text
narrow scope
observability required
rollback plan
no authority expansion
```

---

## S5 — Human / Security / Governance Review Required

Required for high-risk objects.

Examples:

```text
external action tool
email/browser automation
shell execution dependency
permission authority changes
trust registry changes
protected core changes
credential/secrets logic
```

---

# Object Risk Levels

## Low

```text
read-only
static
no execution
no authority
no external action
```

## Medium

```text
writes local artifacts
changes context behavior
adds dependency/reference
affects docs/memory
```

## High

```text
executes code
touches files/network
changes validation/trust/permissions
runs external tools
```

## Critical

```text
protected core
auth/secrets
external actions
governance override
trust updates
user data mutation
```

---

# Capability Quarantine

Quarantine should not only mean moving an object aside.

It can also mean restricting capabilities.

Example capability matrix:

```json
{
  "objectId": "tool:unknown-cli",
  "capabilities": {
    "readTempFiles": "allowed",
    "readProjectFiles": "blocked",
    "writeTempFiles": "allowed",
    "writeProjectFiles": "blocked",
    "networkAccess": "blocked",
    "shellExecution": "blocked",
    "registryUpdate": "blocked",
    "trustUpdate": "blocked",
    "externalAction": "blocked"
  }
}
```

Core rule:

```text
Suspicious objects may exist without being allowed to act.
```

---

# Identity Passport

Every object that becomes trusted should receive an identity passport.

Example:

```json
{
  "objectId": "package:browser-use",
  "objectType": "dependency",
  "identityStatus": "trusted_with_scope",
  "trustLevel": "T3",
  "allowedScopes": ["browser-automation-reference"],
  "sandboxLevelPassed": "S3",
  "riskLevel": "high",
  "evidence": ["sandbox_run_001", "package_age_check_001"],
  "lastVerifiedAt": "2026-05-20T00:00:00Z",
  "expiresAt": "2026-06-20T00:00:00Z",
  "revalidateOnChange": true,
  "revalidateOnVersionChange": true
}
```

---

# Trust Expiration And Revalidation

Trust should not last forever.

Required fields:

```text
lastVerifiedAt
expiresAt
revalidateOnChange
revalidateOnVersionChange
revalidateOnAuthorityChange
```

Examples:

```text
same package, same version
→ allowed within existing scope

same package, new version
→ changed-self, revalidate

same package, new maintainer/publisher
→ changed-self or fake-self risk

same reference repo, new major version
→ re-index and revalidate
```

Core rule:

```text
Known does not mean permanently trusted.
```

---

# Fake-Self Similarity Checks

OwnAI should detect objects that look similar to trusted objects.

Examples:

```text
browser-use
browsser-use

openai
open-ai-sdk-free

sveltejs/svelte
svelte-js/svelte-official
```

Useful checks:

```text
name similarity to trusted package
publisher similarity
repo similarity
package age
install script present
dependency count explosion
lockfile surprise changes
```

Agentic workflows are especially vulnerable to package mistakes because agents can install or suggest packages quickly. A transcript we reviewed specifically warned that agents should not blindly install very new packages, suggesting a rule like not installing packages younger than 14 days because malicious package attacks often appear in fresh releases. 

---

# Deny By Default Rules

Unknown objects cannot:

```text
affect trusted state
gain authority
update operational memory
become source of truth
execute external actions
skip sandbox
update trust
approve themselves
modify protected core
```

Unknown objects can only become useful through:

```text
evidence
registration
limited scope
validation
revalidation
```

---

# Sandbox Run Record

Example:

```json
{
  "sandboxRunId": "sandbox_001",
  "objectId": "package:unknown-tool",
  "objectType": "dependency",
  "sandboxLevel": "S3",
  "riskLevel": "high",
  "checksRun": [
    "metadata_inspection",
    "static_scan",
    "dry_run",
    "isolated_execution"
  ],
  "observedBehavior": [
    "read package manifest",
    "attempted temp file write"
  ],
  "permissionsUsed": ["temp_write"],
  "networkAccess": "blocked",
  "fileAccess": ["temp_workspace"],
  "result": "passed_with_restrictions",
  "recommendation": "trusted_with_scope",
  "evidenceLinks": ["log:sandbox_001"]
}
```

---

# Immune Finding Record

Example:

```json
{
  "immuneFindingId": "immune_001",
  "objectId": "package:browsser-use",
  "findingType": "fake_self_similarity",
  "severity": "high",
  "summary": "Package name is highly similar to trusted package browser-use.",
  "response": "block",
  "evidenceLinks": ["similarity_check_001"],
  "createdAt": "2026-05-20T00:00:00Z"
}
```

---

# Quarantine Record

Example:

```json
{
  "quarantineId": "quarantine_001",
  "objectId": "script:setup.sh",
  "objectType": "script",
  "reason": "Install script attempted network access during sandbox.",
  "quarantineType": "capability_quarantine",
  "blockedCapabilities": ["networkAccess", "projectWrite", "shellExecution"],
  "evidenceLinks": ["sandbox_002"],
  "reviewRequired": true
}
```

---

# Heatmap Integration

Sandbox and immune outcomes should heat up the map.

Examples:

```text
unknown package detected
→ Risk Lens heat increases

fake-self suspected
→ Security Lens heat spikes

changed-self in protected core
→ Trust Lens + Risk Lens high

sandbox passed
→ heat decreases, but not zero

sandbox failed
→ quarantine signal
```

Suggested heatmap signals:

```text
sandbox_required
sandbox_passed
sandbox_failed
trust_passport_created
trust_expired
fake_self_similarity_detected
capability_quarantine_active
```

---

# Immune Memory

The system should learn from immune events.

If OwnAI sees:

```text
fake package pattern
bad install script
fake validation artifact
prompt injection in README
agent trying to approve own work
```

it should store an immune memory.

Later:

```text
similar object appears
→ faster detection
→ stricter sandbox
→ higher initial risk score
```

This connects to replay, but focuses specifically on identity/security patterns.

---

# Roadmap 01 Boundary

Roadmap 01 does not need a full sandbox engine.

Allowed:

```text
- define TrustPassport record shape
- define SandboxRun record shape
- define SandboxOutcome values
- define ImmuneFinding record shape
- define QuarantineRecord shape
- add flags for sandbox_required / evidence_mismatch / authority_mismatch
- record heatmap signals when available
```

Not Roadmap 01:

```text
- full isolated execution engine
- full package reputation service
- full malware detection
- full automatic sandbox runner
- cryptographic signing system
```

---

# Acceptance Rules

The sandbox trust graduation system should not accept:

```text
unknown → trusted jumps
trust without evidence
trust without scope
trust without expiration
sandbox without recorded outcome
quarantine without preserved evidence
fake-self similarity ignored
changed-self without revalidation
```

---

# Core Rule

```text
Trust is graduated, scoped, evidenced, and temporary.
```
