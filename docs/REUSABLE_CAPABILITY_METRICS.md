# OwnAI Reusable Capability Metrics

Reusable capabilities are one of OwnAI's strongest efficiency advantages.

A reusable capability is any validated workflow, script, skill, context template, scanner, parser, validator, replay lesson, task packet template, or routing rule that reduces repeated model work.

## Core Principle

```text
Generate once. Validate once. Reuse many times. Measure the savings.
```

OwnAI should not only reuse capabilities. It should count reuse and make the value visible.

---

# Why This Matters

Many AI workflows waste tokens by repeatedly regenerating the same helper logic, prompt structure, repo analysis, validation logic, or security checks.

OwnAI should convert repeated reasoning into reusable infrastructure.

Examples:

```text
- Python script generated once and reused 50 times
- task packet template reused across similar bug fixes
- replay lesson reused to avoid repeating a failed strategy
- context compressor reused for every validation log
- security scanner reused before patch acceptance
```

This proves the core OwnAI thesis:

```text
The system becomes more efficient and better over time without needing a bigger model.
```

---

# What Counts As Reusable

Reusable capabilities may include:

```text
- executable skill scripts
- validated skill workflows
- task packet templates
- context pack templates
- replay lessons
- validation command profiles
- security checkers
- log parsers
- repo scanners
- routing rules
- trust-calibrated workflows
- report normalizers
```

---

# Reuse Metric Record

Example:

```json
{
  "capabilityId": "parse_test_failure_log",
  "capabilityType": "executable_skill_script",
  "createdAt": "2026-05-18T00:00:00Z",
  "lastUsedAt": "2026-05-18T12:00:00Z",
  "uses": 47,
  "successfulUses": 44,
  "failedUses": 3,
  "estimatedTokensSaved": 62000,
  "estimatedModelCallsAvoided": 31,
  "averageTimeSavedMs": 1800,
  "trust": 0.82,
  "lastValidatedAt": "2026-05-18T11:55:00Z"
}
```

---

# Core Metrics

## Uses

How many times the capability was invoked.

```text
High use + high success = strong reusable asset.
```

---

## Successful Uses

How many times it helped complete a task or subtask.

---

## Failed Uses

How many times it produced bad, noisy, irrelevant, or invalid output.

Failure does not mean delete automatically. It means update trust and inspect.

---

## Estimated Tokens Saved

Approximate number of model tokens avoided by using the reusable capability instead of regenerating or re-explaining the same work.

Example:

```text
Reusable script call cost: 80 tokens of instruction
Manual regeneration cost estimate: 1,800 tokens
Estimated saved: 1,720 tokens
```

---

## Model Calls Avoided

How many LLM calls were avoided because a deterministic tool, script, or stored workflow handled the work.

---

## Time Saved

Approximate time saved through reuse.

Useful for:

```text
- local model workflows
- CI validation
- repeated scanner runs
- replay lookup
```

---

## Trust Impact

Reusable capabilities should affect trust.

Example:

```text
script reused 20 times with stable output
→ trust increases

script reused 5 times with noisy results
→ trust decreases
```

---

# Reusable Capability ROI

OwnAI can estimate the long-term value of reusable capabilities.

Simple formula:

```text
Reusable Capability ROI =
(total tokens saved + time saved + model calls avoided)
minus maintenance cost and failure cost
```

This helps decide whether a skill/script/template is worth keeping.

---

# Integration With Executable Skill Scripts

Every executable skill script should track:

```text
- uses
- success rate
- failures
- validation status
- tokens saved
- trust score
- last validated time
```

If a script repeatedly saves model work, it becomes a high-value operational asset.

---

# Integration With Task Packets

Task packet templates should track reuse.

Example:

```text
bugfix_with_tests_packet_template
uses: 28
average retries reduced: 34%
estimated tokens saved: 91,000
```

---

# Integration With Context Protocol

Context compression and context pack templates should track:

```text
- compression ratio
- reuse count
- relevance score
- hallucination reduction if measurable
- task success correlation
```

---

# Integration With Replay

Replay should answer:

```text
Which reusable capabilities helped most?
Which were unused?
Which reduced retries?
Which saved the most tokens?
Which caused failures?
```

---

# Integration With Observability

The UI/timeline should show reuse wins.

Example task summary:

```text
Task completed:
- reusable capabilities used: 4
- model calls avoided: 3
- estimated tokens saved: 8,400
- replay lessons reused: 2
- executable scripts reused: 1
```

This makes OwnAI's efficiency visible.

---

# Capability Decay

Unused or low-quality reusable capabilities should decay.

Decay signals:

```text
- not used for long time
- repeated failures
- obsolete project structure
- replaced by better capability
- low trust
```

Possible action:

```text
archive
reduce trust
mark deprecated
keep as cold memory
```

---

# Promotion Criteria

A reusable capability may be promoted when:

```text
- it has repeated successful uses
- validation is stable
- output is structured
- failure rate is low
- token savings are meaningful
- trust is high enough
```

---

# Anti-Patterns

Avoid:

```text
- counting reuse without checking quality
- treating high use as automatic trust
- keeping obsolete scripts forever
- overestimating token savings without evidence
- using reuse metrics as fake progress
```

Core warning:

```text
Reuse count measures frequency.
Validation measures quality.
Trust combines both.
```

---

# Roadmap 01 Scope

Roadmap 01 should only define basic reusable capability records and simple counting.

Kernel-compatible v0:

```text
- capability id
- capability type
- uses
- successful uses
- failed uses
- estimated tokens saved
- model calls avoided
- last used time
- trust score
```

Advanced ROI calculation can come later.

---

# Core Rule

```text
Every repeated task is an opportunity to create reusable capability.
Every reusable capability should prove its value through measured reuse.
```
