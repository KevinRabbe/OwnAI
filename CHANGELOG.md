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

## [Unreleased]

### Added

- Minimal Cognition Kernel shared contracts in `packages/core-types` (branded ids, `KernelTask`, `TaskPacket`, `ContextPack`, `ValidationGate`, `ReplayEntry`, `TrustRecord`, `Observation`, `RecoveryPoint`, `StateTransition`, `DurableKernelTaskStateV0`, `KernelDomainEvent`).
- `packages/core-interfaces` port interfaces for durable state, packets, context, validation, replay, trust, recovery, and observability sinks.
- Roadmap 01 kernel event constants and typed payloads in `packages/core-events` (`kernelEvents.ts`), exported alongside legacy `OWN_AI_EVENTS`.
- `tests/core-contracts.test.ts` smoke coverage for kernel event strings and id branding.

### Fixed

- `InMemoryEventBus` now implements `EventBus` fully (`subscribe` / `subscribeAll` return subscriptions; `createEvent` includes `severity`).
- Telescope navigation uses a single exported `HeatmapState` / `HeatmapRecord` shape so JSON loads type-check against `buildNavigationMap`.

### Changed

- `packages/core-state` barrel exports execution/task graph modules and re-exports kernel task types from `core-types` via `kernelTypes.ts`; documented pipeline `TaskGraph` vs kernel task distinction.

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
