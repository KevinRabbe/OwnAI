# OwnAI Changelog

All notable architecture and implementation changes should be documented here.

OwnAI should be built so every system change is traceable.

## Format

```text
## [version] - date

### Added
### Changed
### Fixed
### Removed
### Notes
```

---

## [0.1.0] - 2026-05-14

### Added

Initial architecture documentation:
- README
- Architecture overview
- Roadmap
- Memory System specification
- Heatmap Engine specification
- Telescope Engine specification
- Microscope Engine specification
- Dashboard UI specification
- Self-Learning Systems specification
- Context Replay Engine specification
- Privacy Boundary Layer specification
- Visual Infrastructure Plan

Initial executable packages:
- `packages/repo-scanner`
- `packages/memory-system`
- `packages/heatmap-engine`
- `packages/telescope-engine`
- `packages/microscope-engine`

### Notes

Current executable pipeline:

```text
Repo Scanner
→ Memory System
→ Heatmap Engine
→ Telescope Engine
→ Microscope Engine
```

Next planned package:
- `packages/verifier`
