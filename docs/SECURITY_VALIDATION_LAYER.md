# OwnAI Security Validation Layer

The Security Validation Layer checks newly produced code for common security weaknesses before a patch can be accepted.

## Core Principle

```text
AI-generated code should be security-checked before it becomes trusted code.
```

Builds and unit tests are not enough. Code can compile, pass tests, and still introduce exploitable behavior.

---

# Main Goals

- Detect risky AI-generated code
- Add security-focused tests where needed
- Scan new diffs for dangerous patterns
- Trigger review for security-sensitive changes
- Reduce trust in models/skills that repeatedly produce unsafe code
- Prevent insecure patterns from becoming replay lessons
- Make security impact visible in patch reports

---

# Validation Types

## 1. Static Security Pattern Scan

Scan diffs for suspicious code patterns.

Examples:

```text
- string-concatenated SQL
- shell execution with user input
- raw password/token logging
- permissive CORS wildcard
- disabled certificate validation
- unsafe deserialization
- unchecked file paths
- broad catch blocks hiding errors
```

---

## 2. Security-Focused Tests

When code touches risky areas, OwnAI should add or require tests.

Examples:

```text
Path traversal:
- rejects ../ paths
- rejects absolute paths outside allowed root
- accepts valid relative paths

SQL/database:
- parameterized query path tested
- malicious input does not alter query behavior

Auth:
- unauthenticated user rejected
- unauthorized role rejected
- authorized user accepted

Secrets:
- logs do not contain tokens/passwords
```

---

## 3. Diff-Aware Security Review

Only inspect what changed first.

For each changed file:

```text
- classify risk area
- detect risky APIs
- check whether tests exist
- check whether security report exists
- decide if human review is required
```

---

## 4. Dependency Security Check

When dependencies change:

```text
- require justification
- check whether dependency is optional/core
- check license compatibility
- check known vulnerability status when possible
- isolate behind adapter if optional
```

---

# Security Risk Categories

Security validation should classify changes into categories:

```text
none
low
medium
high
critical
```

Examples:

```text
Documentation update
→ none

Input parser change
→ medium

Authentication logic change
→ high

Secret handling or command execution change
→ critical
```

---

# Acceptance Rules

## Low Risk

```text
normal tests + patch report
```

## Medium Risk

```text
normal tests + targeted security tests + security report
```

## High Risk

```text
targeted security tests + static scan + human review recommended/required
```

## Critical Risk

```text
sandbox required + security review required + approval required
```

---

# Security Report Shape

Example:

```json
{
  "riskLevel": "high",
  "securitySensitiveFilesChanged": true,
  "categories": ["filesystem", "user_input"],
  "patternsDetected": ["path_join_without_boundary_check"],
  "testsRequired": ["path_traversal_rejection_test"],
  "testsFound": [],
  "approvalRequired": true,
  "recommendation": "block_until_security_test_added"
}
```

---

# Integration With Task Packets

Task packets should include security validation when needed:

```text
Security-sensitive task detected.
Required:
- threat category check
- targeted tests
- security report
- review recommendation
```

---

# Integration With Governance

Governance may block acceptance when:

```text
- security report missing
- required security tests missing
- risky pattern detected
- dependency justification missing
- critical security area changed without approval
```

---

# Integration With Trust

Security validation results should update trust.

Examples:

```text
Model repeatedly generates unsafe command execution
→ lower trust for CLI/filesystem tasks

Skill adds strong security tests automatically
→ increase trust for security-sensitive workflows
```

---

# Integration With Replay

Replay should store:

```text
- security issue detected
- mitigation used
- test added
- model/skill involved
- final outcome
```

This allows OwnAI to reuse security lessons later.

---

# Future Implementation Ideas

```text
packages/security-validation/
├── src/types.ts
├── src/diffSecurityScanner.ts
├── src/securityRiskClassifier.ts
├── src/securityTestRecommender.ts
├── src/securityReport.ts
└── src/cli.ts
```

Future command:

```bash
npm run security:check
```

---

# Core Rules

```text
Security validation should be automatic where possible.
Human review should be required where automation is not enough.

The goal is risk reduction, not fake guarantees.
```
