# Implementation Plan: Menu Privacy Link and Current Year

**Branch**: `001-menu-privacy-year` | **Date**: 2026-01-13 | **Spec**: `/Users/ronald/Developer/www/erikleuning-codex/specs/001-menu-privacy-year/spec.md`
**Input**: Feature specification from `/specs/001-menu-privacy-year/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Remove the Privacy link from the top navigation on all pages while keeping footer
access, and ensure the footer displays the current calendar year without JS.

## Technical Context

**Language/Version**: HTML5, CSS3, JavaScript (ES2015+)  
**Primary Dependencies**: Tailwind CSS (precompiled), Alpine.js (navigation + cookie banner)  
**Storage**: N/A (static files only)  
**Testing**: Manual QA  
**Target Platform**: Modern browsers on desktop and mobile (latest stable Chrome/Firefox/Edge/Safari, iOS Safari, Android Chrome)  
**Project Type**: web (static site)  
**Performance Goals**: No measurable impact (static content changes)  
**Constraints**: Must work without JS; keep footer navigation intact  
**Scale/Scope**: Single marketing site with two pages (landing + privacy)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Mobile-first layout (>=320px) with no horizontal scrolling. PASS (unchanged layout).
- Progressive enhancement: content + navigation usable without CSS/JS. PASS (no JS dependency).
- Deterministic UX: no layout shifts after render; predictable focus order. PASS (static text change).
- Security/privacy: no secrets in repo or client JS; PII-safe logging plan. PASS (no new data).
- Consent + CORS: opt-in analytics, easy Reject; explicit origins and preflight coverage if APIs exist. PASS (no API).
- Performance + accessibility: CI budgets and a11y checks defined. PASS (no perf impact).
- Config discipline: environment values via config with `.env.example`. PASS (static-only).

## Project Structure

### Documentation (this feature)

```text
specs/001-menu-privacy-year/
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

**Structure Decision**: Single static site; update header menus and footer text in
root HTML files.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
