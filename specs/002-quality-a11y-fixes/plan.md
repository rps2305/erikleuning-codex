# Implementation Plan: Site Quality Improvements

**Branch**: `002-quality-a11y-fixes` | **Date**: 2026-01-13 | **Spec**: [specs/002-quality-a11y-fixes/spec.md](spec.md)
**Input**: Feature specification from `/specs/002-quality-a11y-fixes/spec.md`

## Summary

Align the navigation width rules, metadata, and focus behavior to eliminate layout drift, stale canonical tags, and missing accessibility cues that surfaced during the manual audit and lint runs.

## Technical Context

**Language/Version**: Vanilla HTML5, CSS3, and ES2021 JavaScript  
**Primary Dependencies**: None (static assets only; tooling is htmlhint, stylelint, eslint, axe-core)  
**Storage**: N/A (no persistence)  
**Testing**: htmlhint, stylelint, eslint, axe-core CLI  
**Target Platform**: Modern browsers on desktop/mobile (static host)  
**Project Type**: Web (static multi-page site)  
**Performance Goals**: Maintain Lighthouse-friendly budgets (LCP ≤ 2.5s, CLS ≤ 0.1) already implied by current spec  
**Constraints**: No build tooling; changes must preserve the existing declarative DOM structure and Alpine-driven focus behavior  
**Scale/Scope**: Single-page homepage + privacy page + design reference page (~3 files)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Mobile-first layout (>=320px) with no horizontal scrolling. (Validated by lint plan to keep width rules in sync.)  
- Progressive enhancement: navigation and content degrade gracefully (no-JS links + Alpine guard logic).  
- Deterministic UX: CSS `--content-max` + focus trapping ensures no layout shifts and predictable focus.  
- Security/privacy: No embedded secrets, analytics loaded only after consent (per cookie banner logic).  
- Consent + CORS: Consent flow defaults to essential cookies; no APIs are introduced that would require CORS.  
- Performance + accessibility: Lints + axe-core CLI run in quickstart; budgets noted in success criteria.  
- Config discipline: Environment-specific values already stored outside this feature (analytics ID is static, no new secrets).

## Project Structure

### Documentation (this feature)

```text
specs/002-quality-a11y-fixes/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── README.md
└── tasks.md
```

### Source Code (repository root)

```text
assets/
├── css/main.css
├── js/main.js
├── [existing images/icons]
index.html
privacyverklaring.html
design-system.html
robots.txt
sitemap.xml
```

**Structure Decision**: Single static web project rooted at the repo base; assets live under `assets/` while each page (`index.html`, `privacyverklaring.html`, `design-system.html`) is served from the root. There is no backend service directory.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations detected; complexity tracking not needed.
