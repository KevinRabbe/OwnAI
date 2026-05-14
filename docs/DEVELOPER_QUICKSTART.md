# OwnAI Developer Quickstart

This guide explains how to run the current OwnAI cognition pipeline locally.

---

# Install

```bash
npm install
```

---

# Run Typecheck

```bash
npm run typecheck
```

---

# Run Tests

```bash
npm run test
```

---

# Run Full Pipeline

Analyze the current repository:

```bash
npm run ownai:pipeline:self
```

Analyze another repository:

```bash
npm run ownai:pipeline /path/to/repo
```

---

# Individual Systems

## Repo Scanner

```bash
npm run scan
```

## Memory System

```bash
npm run memory
```

## Heatmap Engine

```bash
npm run heatmap
```

## Telescope Engine

```bash
npm run telescope
```

## Microscope Engine

```bash
npm run microscope
```

## Verification

```bash
npm run verify
```

## Replay

```bash
npm run replay
```

---

# Generated Runtime Files

OwnAI runtime outputs are generated inside:

```text
.ownai/
```

This directory is intentionally gitignored.

---

# Current Architecture Direction

OwnAI is currently focused on:

```text
- local-first cognition
- replay-driven learning
- adaptive focus
- temporal memory
- observable autonomy
- evolving skills
- holographic operational UI
```

---

# Current Priority

```text
Stabilize the runnable cognition pipeline.
```

The current development focus is:

```text
scan
→ memory
→ heatmap
→ telescope
→ microscope
→ verify
→ replay
```

before implementing advanced autonomous systems.
