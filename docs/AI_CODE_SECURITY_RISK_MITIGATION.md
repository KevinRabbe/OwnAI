# OwnAI AI Code Security Risk Mitigation

AI-generated code can compile, pass basic tests, and look professional while still introducing serious security weaknesses.

OwnAI should not pretend it can eliminate this risk completely.

OwnAI should reduce the risk as much as possible through structure, validation, scanning, review triggers, trust calibration, and governance.

## Core Principle

```text
Security risk cannot be fully removed,
but it must be actively reduced at every stage.
```

---

# Main Goals

- Reduce insecure AI-generated code
- Detect common vulnerability patterns
- Trigger security review for sensitive changes
- Penalize risky skills/models through trust calibration
- Prefer understandable code over clever code
- Preserve human reviewability
- Prevent dangerous shortcuts from becoming trusted patterns
- Make security impact visible in patch reports

---

# Common AI Code Security Risks

OwnAI should actively watch for:

```text
- unsafe deserialization
- SQL injection risks
- authentication bypasses
- authorization bypasses
- insecure defaults
- leaked secrets in logs
- weak input validation
- dangerous dependency usage
- path traversal
- unsafe command execution
- permissive CORS/network settings
- hidden race conditions
- insecure temporary files
- weak cryptography
- disabled certificate validation
- broad try/catch blocks hiding security failures
```

---

# Why Basic Validation Is Not Enough

A vulnerable patch may still:

```text
- compile
- pass unit tests
- look clean
- follow style
- appear professional
```

Therefore OwnAI should not treat build/test success as full acceptance when security-sensitive code changed.

---

# Security-Sensitive Areas

Security review is required when touching:

```text
- authentication
- authorization
- session handling
- secrets
- tokens
- encryption
- password handling
- networking
- filesystem access
- command execution
- dependency loading
- serialization/deserialization
- database queries
- user input handling
- file upload/download
- CORS/security headers
- sandbox boundaries
```

---

# Security Review Gate

For security-sensitive patches, OwnAI should require:

```text
- explicit security impact statement
- changed files report
- threat category check
- relevant tests
- static analysis if available
- dependency risk check if dependencies changed
- human approval depending on autonomy level
```

---

# Patch Report Security Section

Every non-trivial patch should include:

```text
Security impact:
- touched security-sensitive code: yes/no
- risks introduced: list
- mitigations added: list
- validation performed: list
- review recommended: yes/no
```

Example:

```text
Security impact:
Touched user input validation.
Risk: path traversal if file path is not normalized.
Mitigation: canonical path check added.
Validation: added traversal rejection test.
Review recommended: yes.
```

---

# Security Pattern Detection

OwnAI should flag suspicious patterns such as:

```text
- string-concatenated SQL
- shell execution with user-controlled input
- JSON/XML deserialization into arbitrary types
- path joins without canonical boundary checks
- logging raw tokens/passwords
- catch blocks that ignore exceptions
- disabling TLS/certificate validation
- permissive wildcard CORS
- default admin credentials
- unsafe eval/dynamic execution
```

---

# Dependency Risk Control

New dependencies should be treated as security risk.

Before adding one:

```text
- justify why it is needed
- check if built-in APIs are enough
- check package maintenance
- check license compatibility
- check known vulnerability status when possible
- isolate optional dependencies behind adapters
```

---

# Trust Calibration

Security outcomes should affect trust.

Examples:

```text
Model repeatedly generates unsafe command execution
→ reduce trust for filesystem/CLI tasks

Skill introduces SQL string concatenation
→ reduce trust for database tasks

Security scan catches issue before merge
→ increase trust in security gate workflow
```

---

# Governance Integration

Governance may block patches when:

```text
- security-sensitive files changed without review
- patch report lacks security section
- dependency change lacks justification
- static analysis fails
- risky pattern is detected
- code is not human-reviewable
- rollback path is missing
```

---

# Autonomy Level Integration

Lower autonomy levels require approval for all security-sensitive changes.

Higher autonomy levels may allow low-risk changes, but should still require approval for:

```text
- auth changes
- secrets handling
- encryption changes
- command execution
- dependency additions
- external network exposure
```

---

# Replay Integration

Replay should remember:

```text
- which security patterns were caught
- which model/skill generated risky code
- which mitigations worked
- which reviews prevented vulnerabilities
- which tests should be reused later
```

---

# Training Gym Integration

Training Gym can train security skills using safe synthetic examples.

Examples:

```text
- detect SQL injection pattern
- detect path traversal pattern
- detect unsafe command execution
- detect leaked token logging
- suggest safer alternatives
```

Do not train on private or leaked code.

---

# Security-Aware Task Packets

When task involves security-sensitive areas, task packets should include:

```text
- threat categories
- forbidden shortcuts
- required validation
- review requirement
- rollback requirement
- security acceptance bar
```

---

# Core Rules

```text
Working code is not automatically safe code.

Passing tests is not automatically security acceptance.

OwnAI should generate code that engineers can understand, review, secure, and maintain.
```
