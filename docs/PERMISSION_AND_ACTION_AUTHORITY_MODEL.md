# OwnAI Permission & Action Authority Model

OwnAI may prepare work autonomously, but it must understand when an action affects the outside world and requires user permission.

## Core Principle

```text
OwnAI can prepare and assist.
OwnAI needs permission to act.
```

This is essential for trusted automation.

---

# Why This Matters

AI systems can become unsafe when they do not distinguish between:

```text
- preparing an action
- drafting an action
- executing an action
- performing a high-risk external action
```

Examples:

```text
Writing an email is preparation.
Sending an email is an external action.

Preparing a form is assistance.
Submitting a form is an external action.

Creating a patch is workspace action.
Deleting files is destructive action.

Inspecting a PR is read-only.
Merging to main is high-risk action.
```

OwnAI must treat these differently.

---

# Permission Levels

## Level 0 — Read

Allowed when the user has granted access and the task scope permits it.

Examples:

```text
- read project files
- inspect repository state
- open documentation
- read email metadata if permission exists
- read public web pages
```

---

## Level 1 — Prepare

OwnAI may prepare outputs without affecting external systems.

Examples:

```text
- write email text
- draft a plan
- summarize a web page
- prepare a patch proposal
- create a review report
- prepare a form response
```

---

## Level 2 — Draft / Stage

OwnAI may create reversible or reviewable drafts if permission exists.

Examples:

```text
- create email draft
- create pull request draft
- stage generated files in workspace
- prepare browser form content without submitting
```

---

## Level 3 — Execute Internal / Low-Risk Action

OwnAI may execute bounded internal actions when the task grants permission.

Examples:

```text
- run tests
- run typecheck
- create branch
- write files inside workspace
- create task artifacts
- update observability records
```

---

## Level 4 — Execute External / Consequential Action

Requires explicit user approval unless pre-approved by a narrow trusted workflow.

Examples:

```text
- send email
- submit web form
- post message
- upload file
- install dependency
- commit changes
- create public issue/comment
```

---

## Level 5 — High-Risk Action

Requires explicit human approval every time.

Examples:

```text
- merge to main
- delete files
- destructive shell command
- payment or purchase
- account settings change
- security-sensitive code change
- protected core change
- legal/financial/business commitment
```

---

# Action Intent

Before performing any consequential action, OwnAI should create an ActionIntent.

Example:

```json
{
  "actionIntentId": "action_001",
  "taskId": "task_123",
  "actionType": "send_email",
  "riskLevel": 4,
  "target": "max@example.com",
  "summary": "Send prepared email about project update.",
  "requiresApproval": true,
  "preparedArtifact": "email_draft_001",
  "createdAt": "2026-05-19T00:00:00Z"
}
```

---

# Approval Gate

If approval is required, OwnAI should show:

```text
- action type
- target
- exact content if applicable
- risk level
- reason for action
- expected effect
- cancel option
```

Example:

```text
Prepared email:
To: max@example.com
Subject: Project Update
Body: ...

Action requested:
Send email now?
```

The action executes only after explicit approval.

---

# Permission Scope

Permission should be scoped.

Bad:

```text
OwnAI can send emails.
```

Better:

```text
OwnAI can create email drafts.
Sending requires confirmation.
```

Best for pre-approved workflows:

```text
OwnAI may send daily status report to my own email at 18:00.
No attachments.
No new recipients.
Max 500 words.
```

---

# Pre-Approved Workflows

Some low-risk recurring actions may be pre-approved.

Requirements:

```text
- narrow scope
- known recipient/target
- low risk
- reversible if possible
- observable action record
- easy disable option
```

Examples:

```text
- send daily status report to yourself
- create weekly local benchmark report
- open known project workspace
- run scheduled validation
```

Not suitable for broad pre-approval:

```text
- legal emails
- financial emails
- purchases
- public posting
- deleting data
- protected core changes
- dependency installation
```

---

# Email Example

User request:

```text
Write an email to max@example.com and send it.
```

Safe OwnAI behavior:

```text
1. Write email.
2. Show recipient, subject, and body.
3. Ask for explicit send approval.
4. Send only after approval.
5. Record EmailActionEvidence.
```

Core distinction:

```text
Creating a draft is reversible.
Sending is an external-world action.
```

---

# Browser Example

Allowed without confirmation when scoped:

```text
- open page
- read docs
- collect citation
- create SourceRecord
```

Requires confirmation:

```text
- submit form
- post comment
- upload file
- change settings
- accept terms
- buy something
```

---

# Git Example

Allowed with task permission:

```text
- inspect diff
- create branch
- run tests
- prepare commit message
```

Requires explicit approval:

```text
- commit to protected branch
- merge to main
- force push
- delete branch with unmerged work
```

---

# Filesystem Example

Allowed with task permission:

```text
- read workspace files
- write generated files inside task scope
- create .ownai artifacts
```

Requires explicit approval:

```text
- delete files
- modify protected core
- write outside workspace
- run destructive shell commands
```

---

# Action Evidence

Every consequential action should produce evidence.

Example:

```json
{
  "actionEvidenceId": "evidence_001",
  "actionIntentId": "action_001",
  "taskId": "task_123",
  "actionType": "send_email",
  "approvedBy": "human_operator",
  "executedAt": "2026-05-19T00:01:00Z",
  "result": "sent",
  "target": "max@example.com"
}
```

---

# Integration With Governance

Governance decides whether an action requires approval.

Governance may block:

```text
- high-risk external actions
- destructive actions
- protected core changes
- actions outside task scope
- actions without required evidence
```

---

# Integration With Observability

Timeline should record:

```text
ACTION_INTENT_CREATED
ACTION_APPROVAL_REQUIRED
ACTION_APPROVED
ACTION_REJECTED
ACTION_EXECUTED
ACTION_BLOCKED_BY_GOVERNANCE
```

---

# Integration With Flags

If an action needs approval, create a flag:

```text
human_required
```

or:

```text
permission_required
```

The flag blocks only the affected action, not the entire workflow.

---

# Anti-Patterns

Avoid:

```text
- broad permission without scope
- auto-sending messages to new recipients
- auto-submitting forms
- auto-buying items
- deleting files without approval
- merging to main without approval
- hiding action details from the user
- treating draft/preparation as the same as execution
```

---

# Roadmap 01 Scope

Roadmap 01 does not need full action automation.

Kernel-compatible v0:

```text
- define ActionIntent type
- define ActionEvidence type
- define permission/risk levels
- allow flags for permission_required/human_required
- record action intent in observability
```

Actual email/browser automation belongs to later roadmaps.

---

# Core Rule

```text
Agents may prepare actions autonomously.
Agents may execute consequential actions only with permission.
```
