# OwnAI Composable Security Skills

Security should not exist as a disconnected final scan.

Security should exist as reusable cognition skills that can be invoked by planning, coding, verification, replay, governance, and automation workflows.

## Core Principle

```text
Security should be part of operational cognition flow.
```

---

# Main Goals

- Make security reusable
- Allow skills to invoke security checks automatically
- Reduce repeated security mistakes
- Improve security validation quality over time
- Integrate security into normal workflows
- Support composable cognition pipelines
- Improve automation safety

---

# Security Skills

Examples:

```text
- path_traversal_validation
- sql_injection_review
- secrets_logging_check
- auth_flow_validation
- unsafe_command_execution_review
- dependency_risk_audit
- cors_security_review
- deserialization_risk_check
- filesystem_boundary_validation
- race_condition_review
```

---

# Why Skills Matter

Without composable skills:

```text
security is easy to forget
security checks are inconsistent
validation logic gets duplicated
```

With composable skills:

```text
security becomes reusable operational intelligence
```

---

# Invocation Examples

```text
filesystem_patch_skill
→ invokes path_traversal_validation

networking_patch_skill
→ invokes cors_security_review

cli_automation_skill
→ invokes unsafe_command_execution_review

planning_skill
→ invokes dependency_risk_audit before adding dependency
```

---

# Skill Outputs

Security skills may produce:

```text
- risk classification
- suspicious patterns
- mitigation recommendations
- required tests
- review recommendation
- trust updates
- replay lessons
- security evidence records
```

---

# Security Skill Trust

Security skills must also be evaluated.

Trust factors:

```text
- false positive rate
- missed vulnerability rate
- usefulness of mitigations
- quality of recommended tests
- replay usefulness
```

Security skills are not automatically trusted forever.

---

# Integration With Task Packets

Task packets may automatically include security skill invocation.

Example:

```text
Task touches filesystem and user input.
Automatically invoke:
- path_traversal_validation
- unsafe_command_execution_review
```

---

# Integration With Governance

Governance may require specific security skills before acceptance.

Example:

```text
Task changes auth logic.
Required:
- auth_flow_validation
- session_security_review
```

---

# Integration With Replay

Replay should learn:

```text
- which security skills prevented issues
- which mitigations worked
- which scans produced noise
- which workflows reduced vulnerabilities
```

---

# Integration With Skill Factory

Security skills themselves may evolve.

Flow:

```text
draft security workflow
→ benchmark
→ trusted security skill
→ replay improvements
→ evolved validation strategy
```

---

# Future Architecture Idea

```text
packages/security-skills/
├── pathTraversalValidation/
├── sqlInjectionReview/
├── authFlowValidation/
├── dependencyRiskAudit/
└── unsafeCommandExecutionReview/
```

---

# Core Rule

```text
Security should be composable, reusable, observable, and continuously improving.
```
