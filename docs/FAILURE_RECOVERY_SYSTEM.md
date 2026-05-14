# OwnAI Failure Recovery System

The Failure Recovery System defines how OwnAI detects, contains, diagnoses, and recovers from failed execution, unstable cognition, hallucination risk, bad patches, and broken task flow.

## Core Principle

```text
Failure should become structured recovery data, not uncontrolled retries.
```

OwnAI should not blindly repeat failed actions. It should understand what failed, why it failed, what recovery paths are available, and when to stop or ask for approval.

---

# Main Goals

- Prevent endless retry loops
- Recover from failed verification
- Recover from bad patches
- Recover from context drift
- Recover from token budget pressure
- Recover from unstable votes
- Recover from failed model outputs
- Preserve useful failure lessons
- Trigger Safe Mode when needed

---

# Recovery Position In Architecture

```text
Failure detected
→ Observability records event
→ Failure Recovery classifies failure
→ Simulation estimates recovery options
→ Voting recommends action
→ Governance validates
→ State Machine transitions
→ Recovery action runs
→ Replay learns from outcome
```

---

# Failure Categories

## 1. Verification Failure

Examples:

```text
- tests failed
- build failed
- lint failed
- typecheck failed
```

Possible recovery actions:

```text
- narrow focus
- inspect failing output
- patch smaller area
- restore previous patch
- run deeper microscope inspection
```

---

## 2. Patch Failure

Examples:

```text
- patch does not apply
- patch touches unrelated files
- patch becomes overcomplex
- patch causes regression
```

Possible recovery actions:

```text
- rollback patch
- simplify patch
- regenerate patch with smaller context
- require approval
```

---

## 3. Context Drift

Examples:

```text
- hot memory contains stale assumptions
- model references files that do not exist
- task state no longer matches repo state
- hallucination guard detects unsupported claims
```

Possible recovery actions:

```text
- compress context
- reload memory snapshot
- refresh heatmap
- verify assumptions
- ask user if uncertainty remains
```

---

## 4. Token / Resource Pressure

Examples:

```text
- token budget exceeded
- context near limit
- hardware overloaded
- too many threads active
```

Possible recovery actions:

```text
- compress context
- switch to smaller model
- reduce thread count
- postpone background tasks
- enter low-resource mode
```

---

## 5. Decision Instability

Examples:

```text
- conflicting high-confidence votes
- repeated decision reversals
- simulation contradicts confidence engine
- governance repeatedly blocks actions
```

Possible recovery actions:

```text
- pause and request approval
- run deeper simulation
- lower autonomy level
- enter recovering state
```

---

## 6. Model Output Failure

Examples:

```text
- invalid JSON
- incomplete patch
- hallucinated paths
- low-quality code
- overlong response
```

Possible recovery actions:

```text
- ask model for repair
- retry with stricter format
- route to different model
- reduce context
- use verifier feedback
```

---

# Recovery Decision Shape

```json
{
  "failureType": "verification_failure",
  "severity": "medium",
  "detectedBy": "verifier",
  "state": "VERIFYING",
  "recommendedRecovery": "narrow_focus_and_retry",
  "requiresApproval": false,
  "maxRetriesRemaining": 2,
  "reason": "Tests failed in localized module and context is still stable."
}
```

---

# Retry Policy

Retries must be controlled.

```text
Do not retry the same action with the same context forever.
```

Each retry should change at least one variable:

```text
- narrower context
- different model
- different skill strategy
- different verification target
- simplified patch
- refreshed memory
```

---

# Recovery Escalation

Escalation path:

```text
retry once with same strategy if cheap
→ retry with narrower focus
→ simulate alternative
→ switch model/skill
→ ask approval
→ Safe Mode if unstable
```

---

# Safe Mode Trigger

Enter Safe Mode when:

```text
- recovery fails repeatedly
- hallucination risk remains high
- governance violation occurs
- destructive action was attempted
- long-term memory corruption is suspected
- state machine cannot find safe transition
```

---

# Replay Integration

Replay should record:

```text
- failure cause
- recovery path
- successful recovery strategy
- wasted tokens
- wrong assumptions
- future prevention rule
```

Example lesson:

```text
TypeScript build failures in core-events often require checking shared type exports before patch regeneration.
```

---

# Dashboard Integration

The UI should show:

```text
Failure Type
Severity
Current Recovery Step
Retries Remaining
Suggested Action
Governance Status
Replay Lesson Created
```

---

# Core Rule

```text
Every failure should either recover safely, create a useful lesson, or stop before causing damage.
```
