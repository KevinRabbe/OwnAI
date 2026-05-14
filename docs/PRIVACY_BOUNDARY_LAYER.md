# OwnAI Privacy Boundary Layer

The Privacy Boundary Layer is a future optional safety layer for users who work with private, sensitive, or proprietary repositories.

It is not part of the first MVP implementation, but it must be documented early so the architecture can support it later without major redesign.

## Core Principle

```text
Privacy should be configurable, local-first, and fast.
```

Privacy must not slow down normal workflows unless the user enables stricter protection modes.

---

# Privacy Modes

## Default Mode

For personal projects and relaxed workflows.

```text
- fastest mode
- normal local memory
- GitHub allowed
- no extra approval for normal files
```

## Private Mode

For proprietary code or sensitive projects.

```text
- redacted memory
- secret scanning
- restricted paths respected
- approval before external actions
```

## Strict Mode

For high privacy requirements.

```text
- no cloud model usage
- no GitHub writes unless explicitly approved
- restricted files are ephemeral only
- no raw sensitive data in memory, replay, or logs
```

---

# Privacy Configuration

OwnAI should eventually support:

```text
.ownai/privacy.json
```

Example:

```json
{
  "mode": "private",
  "blocked_paths": [
    ".env",
    "secrets/",
    "private/",
    "customer-data/",
    "production-config/"
  ],
  "ephemeral_only_paths": [
    "config/local/",
    "credentials.example.json"
  ],
  "allow_github_upload": false,
  "allow_cloud_models": false,
  "secret_scanning": true
}
```

---

# Path Rules

## Blocked Paths

OwnAI must never read these paths.

Examples:

```text
.env
secrets/
private/
customer-data/
production-config/
```

## Ephemeral-Only Paths

OwnAI may inspect these paths only with approval, but must not store raw content in:

```text
- memory
- replay logs
- long-term lessons
- context replay records
- GitHub comments or PR summaries
```

## Normal Paths

OwnAI may scan and store compressed summaries normally.

---

# Privacy Metadata

To avoid repeated expensive checks, OwnAI should cache privacy labels.

Example:

```json
{
  "path": "config/local/settings.json",
  "privacy_level": "ephemeral_only",
  "memory_policy": "never_store_raw",
  "github_policy": "never_upload_raw",
  "requires_approval": true
}
```

Suggested storage:

```text
.ownai/cache/privacy_labels.json
```

---

# Integration Points

## Repo Scanner

The Repo Scanner should eventually:

```text
- read .ownai/privacy.json
- skip blocked paths
- label sensitive files
- avoid hashing/storing raw restricted content if required
```

## Memory System

The Memory System must:

```text
- never store raw secrets
- redact sensitive values
- respect ephemeral-only policies
- store privacy-safe summaries only
```

## Context Replay Engine

The Context Replay Engine must:

```text
- never replay raw restricted files
- store only sanitized replay summaries
- exclude blocked paths from optimization records
```

## Git/GitHub Engine

Before commit or PR creation, OwnAI should:

```text
- scan diffs for secrets
- block restricted files from upload
- require approval for sensitive changes
```

## Model Adapter Layer

If cloud models are disabled:

```text
- use local model adapters only
- block external inference calls
```

---

# Secret Scanning

OwnAI should eventually detect:

```text
- API keys
- passwords
- access tokens
- private SSH keys
- database credentials
- .env values
- cloud provider secrets
```

Detected secrets should be replaced with:

```text
[REDACTED_SECRET]
```

---

# Dashboard Integration

The UI should show privacy state clearly.

Examples:

```text
Privacy Mode: Default
Privacy Mode: Private
Privacy Mode: Strict
```

Restricted paths should be visible as blocked/locked zones in the repository map.

---

# MVP Priority

This layer is documented now but implemented later.

Current priority remains:

```text
1. Repo Scanner
2. Memory System
3. Heatmap Engine
4. Telescope Engine
5. Microscope Engine
6. Context Packs
7. Git/Test Verification
8. Context Replay Optimization
```

---

# Core Rule

```text
Users should be able to tell OwnAI where it is not allowed to look.
```
