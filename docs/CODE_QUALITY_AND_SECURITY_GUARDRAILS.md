# OwnAI Code Quality & Security Guardrails

OwnAI-generated code must be understandable, maintainable, reviewable, and security-conscious.

## Core Principle

```text
Generated code should be understandable by real engineers.
```

OwnAI should not produce clever, obscure, overcompressed, or magical code that only the model can explain.

A senior engineer should be able to read the produced code and understand:

```text
- what it does
- why it exists
- how it fits the system
- what risks it introduces
- how to test it
- how to modify it later
```

---

# Main Goals

- Produce maintainable code
- Avoid AI-style overengineering
- Avoid unclear abstractions
- Avoid insecure shortcuts
- Avoid copying or leaking proprietary code patterns
- Avoid hidden security regressions
- Make patches reviewable by humans
- Preserve project style and architecture intent

---

# Engineering Readability Bar

OwnAI code should be:

```text
clear
boring when possible
well-scoped
project-style consistent
locally understandable
test-backed
reviewable
```

A patch should not require trust in the model.

It should be understandable from:

```text
- code diff
- tests
- commit message
- patch report
```

---

# Senior Engineer Review Standard

Generated code should pass this question:

```text
Would a competent senior engineer understand and accept this direction after reading the diff and tests?
```

If not, OwnAI should:

```text
- simplify
- document the reason
- reduce scope
- add tests
- explain tradeoffs
- request review
```

---

# Avoid Junior-Style Code

OwnAI should avoid:

```text
- copy-paste duplication
- huge functions
- vague variable names
- random abstractions
- hidden side effects
- fragile condition chains
- unrelated refactors
- changes without tests
- fixing symptoms without root cause
```

---

# Avoid AI-Style Code Smell

OwnAI should avoid:

```text
- overly generic helpers
- unnecessary interfaces
- speculative abstractions
- magic fallback behavior
- broad try/catch swallowing errors
- comments that restate code
- inconsistent style
- massive files generated at once
```

---

# Security Guardrails

OwnAI should never introduce code that:

```text
- leaks secrets
- logs credentials or tokens
- weakens authentication
- bypasses authorization
- disables validation without reason
- opens unsafe network access
- executes untrusted input
- stores sensitive data insecurely
- silently ignores security errors
```

Security-sensitive changes require stronger validation and review.

---

# Code Reuse & Leakage Guardrails

OwnAI should not intentionally reproduce proprietary, private, or leaked code.

It should prefer:

```text
- project-local patterns
- documented public APIs
- original implementation
- standard algorithms
- clearly attributed open-source dependencies when allowed
```

If a solution appears to rely on copied external code, OwnAI should flag it.

---

# Dependency Security

New dependencies should be treated as risk.

Before adding dependency:

```text
- justify need
- check if standard library is enough
- check maintenance status
- check license compatibility
- check security risk
- isolate behind adapter if optional
```

---

# Patch Quality Questions

Every non-trivial patch should answer:

```text
What root cause was fixed?
Why is this solution minimal enough?
What behavior changed?
What tests prove it?
What security risk changed?
What files were intentionally not changed?
```

---

# Security Review Triggers

Security review is required when patch touches:

```text
- authentication
- authorization
- secrets
- encryption
- networking
- filesystem deletion
- dependency loading
- command execution
- serialization/deserialization
- user input handling
```

---

# Governance Integration

Governance may block code when:

```text
- patch is not understandable
- security impact is unclear
- dependency risk is unjustified
- tests are missing for risky behavior
- code bypasses protected architecture
- patch appears copied or unreviewable
```

---

# Replay Integration

Replay should learn from quality/security outcomes:

```text
- which bug patterns produced maintainable fixes
- which model produced unclear code
- which abstractions caused later regressions
- which security checks prevented problems
```

---

# Core Rule

```text
OwnAI should generate code that engineers can own, review, secure, and maintain.
```
