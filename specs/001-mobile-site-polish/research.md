# Phase 0 Research: Mobile Site Polish

## Decision 1: Front-end stack approach
- **Decision**: Keep semantic HTML, modern CSS (Grid/Flex), minimal JS.
- **Rationale**: Aligns with progressive enhancement and performance budgets while
  avoiding dependency bloat for a static site.
- **Alternatives considered**: Adding a heavier JS framework; rejected due to
  performance and complexity risks.

## Decision 2: Responsive audit baseline
- **Decision**: Use viewport matrix 320/360/390/414/768/1024/1440 with a reproducible
  issue list (viewport, steps, expected behavior).
- **Rationale**: Matches requested audit deliverable and ensures consistent regression
  checks.
- **Alternatives considered**: Ad-hoc testing; rejected for lack of repeatability.

## Decision 3: Image stability strategy
- **Decision**: Define width/height or aspect-ratio for all media and provide
  responsive sources with compression.
- **Rationale**: Prevents CLS and supports mobile performance targets.
- **Alternatives considered**: Leaving images unconstrained; rejected due to CLS risk.

## Decision 4: Cookie consent behavior
- **Decision**: Provide Reject + Accept, plus Manage preferences limited to
  analytics vs essential.
- **Rationale**: Meets privacy requirements while keeping UX simple.
- **Alternatives considered**: Full category breakdown; rejected as unnecessary scope.

## Decision 5: Navigation fallback without JS
- **Decision**: Keep hamburger for JS users, add visible fallback nav list in main
  content when JS is disabled.
- **Rationale**: Ensures navigation remains usable without JS and avoids duplicate
  menus on JS-enabled views.
- **Alternatives considered**: Always show full nav; rejected to avoid layout clutter
  on small screens.

## Decision 6: Canonical URL strategy
- **Decision**: Canonical URL uses the current host (environment-specific).
- **Rationale**: Supports prototype and production environments without hardcoding.
- **Alternatives considered**: Hardcoded production canonical; rejected due to
  prototype needs.

## Decision 7: Performance and accessibility gates
- **Decision**: Enforce LCP <= 2.5s and CLS <= 0.1 in lab testing, plus keyboard
  walkthroughs, contrast checks, and screen reader spot checks.
- **Rationale**: Matches spec success criteria and WCAG 2.1 AA target.
- **Alternatives considered**: No formal budgets; rejected due to regression risk.
