# Research Summary

## Decision: Full build-ready Tailwind config reference
- Rationale: A full config with content paths and tokens supports future build adoption while remaining a static reference today.
- Alternatives considered: Token-only config; rejected due to explicit request for build-ready configuration.

## Decision: Missing component examples live only in design-system.html
- Rationale: Keeps production pages stable while centralizing system references.
- Alternatives considered: Duplicating examples into live pages; rejected to avoid UI drift.

## Decision: Design system documentation lives in docs/DESIGNSYSTEM.md
- Rationale: A docs folder keeps stakeholder-facing guidance discoverable and organized.
- Alternatives considered: Repo root or specs folder; rejected to avoid clutter or burying documentation.
