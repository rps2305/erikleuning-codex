# Implementation Plan: Menu Home Label and Width Alignment

**Branch**: `001-menu-width-home` | **Date**: 2026-01-13 | **Spec**: `/Users/ronald/Developer/www/erikleuning-codex/specs/001-menu-width-home/spec.md`
**Input**: Feature specification from `/specs/001-menu-width-home/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Rename the first navigation label to “Home” and align the header/menu container
width with the main content using a 1260px max-width.

## Technical Context

**Language/Version**: HTML5, CSS3, JavaScript (ES2015+)  
**Primary Dependencies**: Tailwind CSS (precompiled), Alpine.js (navigation + cookie banner)  
**Storage**: N/A (static files only)  
**Testing**: Manual QA  
**Target Platform**: Modern browsers on desktop and mobile (latest stable Chrome/Firefox/Edge/Safari, iOS Safari, Android Chrome)  
**Project Type**: web (static site)  
**Performance Goals**: No measurable impact (layout alignment)  
**Constraints**: Must keep mobile-first behavior; no horizontal scrolling  
**Scale/Scope**: Single marketing site with two pages (landing + privacy)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Mobile-first layout (>=320px) with no horizontal scrolling. PASS (layout alignment only).
- Progressive enhancement: content + navigation usable without CSS/JS. PASS (static label + width update).
- Deterministic UX: no layout shifts after render; predictable focus order. PASS (static layout change).
- Security/privacy: no secrets in repo or client JS; PII-safe logging plan. PASS (no new data).
- Consent + CORS: opt-in analytics, easy Reject; explicit origins and preflight coverage if APIs exist. PASS (no API).
- Performance + accessibility: CI budgets and a11y checks defined. PASS (no perf impact).
- Config discipline: environment values via config with `.env.example`. PASS (static-only).

## Project Structure

### Documentation (this feature)

```text
specs/001-menu-width-home/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
.
├── index.html
├── privacyverklaring.html
├── assets/
│   ├── css/
│   │   └── main.css
│   └── js/
│       └── main.js
```

**Structure Decision**: Single static site; update navigation labels and shared
layout widths in CSS and nav data.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
