# OwnAI Security Evidence & Learning Loop

The Security Evidence & Learning Loop ensures that security validation does not only block unsafe code, but also creates reusable learning data for future tasks.

## Core Principle

```text
Every security decision should produce reusable evidence.
```

Security validation should explain why something is risky, what mitigation was used, what tests were added, and how future workflows should improve.

---

# Main Goals

- Document why security decisions were made
- Preserve evidence from security checks
- Learn reusable vulnerability patterns
- Improve future task packets
- Improve trust calibration
- Improve model routing
- Improve skill evolution
- Improve security test recommendations
- Reduce repeated security mistakes over time

---

# What Should Be Documented

For security-relevant patches, OwnAI should document:

```text
- changed files
- security-sensitive areas touched
- detected risk categories
- exact risky patterns found
- why the pattern is risky
- mitigation chosen
- alternatives rejected
- tests added
- validation result
- remaining risk
- review recommendation
- model/skill involved
```

---

# Security Evidence Record

Example:

```json
{
  "evidenceId": "security_evidence_001",
  "taskId": "task_441",
  "patchId": "patch_092",
  "riskCategory": "path_traversal",
  "riskLevel": "high",
  "detectedPattern": "path_join_without_boundary_check",
  "whyRisky": "User-controlled paths can escape the allowed directory.",
  "mitigation": "Canonical path check added before file access.",
  "testsAdded": [
    "rejects_parent_directory_traversal",
    "rejects_absolute_path_escape",
    "allows_valid_relative_path"
  ],
  "validationResult": "passed",
  "remainingRisk": "low",
  "reviewRecommended": true,
  "model": "worker-coding-model",
  "skill": "filesystem_patch",
  "trustImpact": {
    "securityValidationWorkflow": "+0.04",
    "filesystemPatchSkill": "+0.02"
  }
}
```

---

# Learning Outputs

Security evidence can create reusable learning artifacts:

```text
- bug/security pattern memory
- test recommendation rules
- model trust updates
- skill trust updates
- task packet templates
- governance rules
- replay lessons
- future scanner rules
```

---

# Example Learning Loop

```text
Risk detected:
Path traversal possible.

Mitigation added:
Canonical boundary check.

Tests added:
Traversal rejection tests.

Replay lesson:
When file paths are user-controlled, always add boundary checks and traversal tests.

Future task packet:
Automatically include path traversal validation when filesystem/user-input code changes.
```

---

# Why Documentation Matters

Without documentation:

```text
- the same mistake repeats
- trust cannot improve accurately
- security tests are not reused
- future models lack structured lessons
- patch reports lose important reasoning
```

With documentation:

```text
- security work compounds
- future task packets improve
- security-aware skills evolve
- risky models lose trust
- safe workflows become reusable
```

---

# Integration With Replay

Replay should store security evidence as high-value learning data.

Replay should answer:

```text
- Which risks were detected before merge?
- Which mitigations worked?
- Which tests prevented regressions?
- Which models/skills produced unsafe code?
- Which security patterns repeat?
```

---

# Integration With Trust

Trust updates should use evidence.

Examples:

```text
Model generated unsafe command execution twice
→ reduce trust for shell/task automation

Skill consistently adds correct validation tests
→ increase trust for security-sensitive tasks
```

---

# Integration With Skill Factory

If security validation workflow repeats successfully, OwnAI may create a skill.

Examples:

```text
path_traversal_validation
sql_injection_guard_review
secrets_logging_check
unsafe_command_execution_review
```

These skills start as draft/untrusted and require benchmarking.

---

# Integration With Task Packets

Future task packets should reuse security evidence.

Example:

```text
Task touches filesystem and user input.
Recovered security lesson:
Check for path traversal and add boundary tests.
```

---

# Integration With Documentation Retention

Security evidence is usually high-value data.

Retention default:

```text
compressed long-term memory
```

Raw scanner logs may expire after the important lesson is preserved.

---

# Dashboard Integration

The UI should show:

```text
Security Risk Detected
Why It Matters
Mitigation Added
Tests Added
Remaining Risk
Trust Impact
Replay Lesson Created
```

---

# Core Rule

```text
Security validation should not only prevent one bad patch.
It should make future patches safer.
```
