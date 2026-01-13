# Implementation Plan: Mobile Site Polish

**Branch**: `001-mobile-site-polish` | **Date**: 2026-01-13 | **Spec**: `/Users/ronald/Developer/www/erikleuning-codex/specs/001-mobile-site-polish/spec.md`
**Input**: Feature specification from `/specs/001-mobile-site-polish/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Stabilize the mobile-first layout, navigation, accessibility, and performance of the
static site without changing information architecture, and document a phased rollout
from audit through production cutover.

## Technical Context

**Language/Version**: HTML5, CSS3, JavaScript (ES2015+)  
**Primary Dependencies**: Tailwind CSS (precompiled), Alpine.js (navigation + cookie banner)  
**Storage**: N/A (static files only)  
**Testing**: Manual QA + Lighthouse (CLI or DevTools) + CI Lighthouse budgets  
**Target Platform**: Modern browsers on desktop and mobile (latest stable Chrome/Firefox/Edge/Safari, iOS Safari, Android Chrome)  
**Project Type**: web (static site)  
**Performance Goals**: LCP <= 2.5s, CLS <= 0.1 on mobile lab runs  
**Constraints**: Mobile-first, progressive enhancement, no backend, no secrets, minimal JS, cookie consent opt-in  
**Scale/Scope**: Single marketing site with two pages (landing + privacy)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Mobile-first layout (>=320px) with no horizontal scrolling. PASS (core requirement).
- Progressive enhancement: content + navigation usable without CSS/JS. PASS (explicit fallback nav).
- Deterministic UX: no layout shifts after render; predictable focus order. PASS (image sizing + focus requirements).
- Security/privacy: no secrets in repo or client JS; PII-safe logging plan. PASS (no backend/logging).
- Consent + CORS: opt-in analytics, easy Reject; explicit origins and preflight coverage if APIs exist. PASS (no API planned).
- Performance + accessibility: CI budgets and a11y checks defined. PASS (budgets + checks in scope).
- Config discipline: environment values via config with `.env.example`. PASS (static-only; no env usage expected).

## Project Structure

### Documentation (this feature)

```text
specs/001-mobile-site-polish/
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
├── images/
├── robots.txt
├── sitemap.xml
└── site.webmanifest
```

**Structure Decision**: Single static site; keep current root HTML files with assets in
`assets/` and imagery in `images/`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
