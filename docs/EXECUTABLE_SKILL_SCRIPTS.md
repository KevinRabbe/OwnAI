# OwnAI Executable Skill Scripts

OwnAI skills may contain reusable executable scripts, such as Python scripts, that can run repeatedly without being regenerated every session.

## Core Principle

```text
Do not spend tokens rewriting repetitive scripts.
Store reusable operational code inside skills.
```

A skill should not only be a prompt or instruction block. It may include validated scripts, helpers, checks, analyzers, formatters, scanners, or generators that can be reused across tasks.

---

# Main Goals

- Reduce token waste
- Reduce repeated code generation
- Improve workflow reliability
- Make skills more powerful than prompts
- Preserve tested operational scripts
- Support local-first automation
- Improve repeatability
- Improve validation and security workflows

---

# Why Executable Scripts Matter

Without reusable scripts:

```text
Every session re-generates similar Python helpers.
Every task spends tokens explaining the same logic.
Small variations create bugs.
Validation becomes inconsistent.
```

With executable skill scripts:

```text
The model only decides when and how to use the script.
The script performs the repeated operation reliably.
```

This improves:

```text
- cost
- speed
- correctness
- reproducibility
- local model usability
```

---

# Example Use Cases

## Repo Analysis

```text
- scan changed files
- detect package boundaries
- summarize file tree
- detect circular imports
```

## Security

```text
- scan diff for risky patterns
- detect leaked secrets
- detect unsafe shell usage
- check dependency changes
```

## Validation

```text
- run command suites
- parse test results
- normalize build logs
- detect repeated failure signatures
```

## Context Protocol

```text
- compress logs
- score context relevance
- split context packs
- detect duplicated context
```

## Replay

```text
- extract lessons from reports
- compare task outcomes
- calculate token/cost trends
```

---

# Skill Folder Structure

Suggested structure:

```text
.skills/
└── security/path_traversal_validation/
    ├── skill.json
    ├── README.md
    ├── scripts/
    │   └── scan_paths.py
    ├── tests/
    │   └── test_scan_paths.py
    └── examples/
        └── vulnerable_sample.txt
```

---

# Skill Manifest

Example:

```json
{
  "id": "path_traversal_validation",
  "version": "0.1.0",
  "status": "draft",
  "description": "Detects risky path handling patterns in changed files.",
  "entrypoints": [
    {
      "name": "scan_paths",
      "runtime": "python",
      "path": "scripts/scan_paths.py",
      "argsSchema": {
        "changedFiles": "string[]"
      }
    }
  ],
  "permissions": {
    "readFiles": true,
    "writeFiles": false,
    "network": false,
    "shell": false
  },
  "trust": 0.2
}
```

---

# Execution Rules

Executable scripts must be governed.

Rules:

```text
- no network access by default
- no destructive file writes by default
- permissions declared in skill manifest
- outputs must be structured when possible
- execution should be observable
- failures should create replay evidence
- risky scripts require sandboxing
```

---

# Output Contract

Scripts should prefer structured output.

Example:

```json
{
  "status": "completed",
  "findings": [
    {
      "file": "src/files.ts",
      "line": 42,
      "risk": "path_traversal",
      "severity": "high",
      "message": "User-controlled path is joined without boundary validation."
    }
  ]
}
```

---

# Validation

Before a script becomes trusted:

```text
- script tests must pass
- example inputs must be covered
- output schema must be stable
- permissions must be reviewed
- replay evidence must exist
```

---

# Trust Integration

Scripts can gain or lose trust.

Trust increases when:

```text
- script produces useful findings
- false positives stay low
- output remains stable
- task outcomes improve
```

Trust decreases when:

```text
- script misses obvious issues
- output is unstable
- false positives are too noisy
- script requires excessive permissions
```

---

# Security Integration

Executable scripts are powerful and must be treated carefully.

Security rules:

```text
- scripts should run locally
- scripts should avoid network access
- scripts should not handle secrets unless explicitly designed for it
- scripts should not execute untrusted input
- scripts should not modify project files unless granted permission
```

---

# Token Efficiency Benefit

Reusable skill scripts reduce token usage because OwnAI no longer needs to regenerate logic like:

```text
- parse changed files
- scan patterns
- summarize logs
- compare reports
- normalize output
```

The model spends tokens on:

```text
- deciding what matters
- interpreting results
- choosing next action
```

not on rewriting repetitive helper code.

---

# Integration With Skill Factory

When OwnAI repeatedly generates similar helper scripts, Skill Factory may propose converting them into executable skill scripts.

Flow:

```text
repeated helper script detected
→ draft executable skill script
→ add tests
→ benchmark reuse value
→ sandbox execution
→ promote if useful
```

---

# Integration With Task Packets

Task packets may request skill script execution.

Example:

```text
Security-sensitive filesystem patch detected.
Invoke path_traversal_validation.scan_paths before acceptance.
```

---

# Core Rule

```text
The model should orchestrate reusable skill code,
not recreate the same helper scripts forever.
```
