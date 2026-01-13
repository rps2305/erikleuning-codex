<!-- Sync Impact Report:
Version change: unversioned -> 1.0.0
Modified principles: Placeholder principle slots -> I. Mobile-First, Content-First; II. Progressive Enhancement and Resilience; III. Deterministic UX and Stable Layout; IV. Security, Privacy, and Consent; V. Configuration, Release, and Accessibility Discipline
Added sections: Operational Standards; Quality Gates and Review Workflow
Removed sections: None
Templates requiring updates: ✅ .specify/templates/plan-template.md; ✅ .specify/templates/spec-template.md; ✅ .specify/templates/tasks-template.md
Follow-up TODOs: TODO(RATIFICATION_DATE): original adoption date unknown.
-->
# Erik Leuning Website Constitution

## Core Principles

### I. Mobile-First, Content-First
Layouts MUST render from 320px width upward with no horizontal scrolling. Content
structure (sections, headings, navigation anchors) MUST be defined once and reused
across templates to avoid drift.

### II. Progressive Enhancement and Resilience
Core navigation and content MUST work with CSS and JS disabled. Enhancements MUST
not block reading or contacting. If images or fonts fail, content remains readable.

### III. Deterministic UX and Stable Layout
No layout shifts after initial render (CLS control). Focus order MUST be predictable,
spacing consistent, and all header/footer links and in-page anchors MUST resolve.

### IV. Security, Privacy, and Consent
No secrets in repo, build artifacts, or client JS. Form endpoints MUST validate
input server-side, rate-limit requests, and use spam protection without dark patterns.
CORS MUST explicitly list allowed origins (scheme + domain + port), with OPTIONS
preflight supported and tested. Cookie consent defaults to functional-only; Reject
is as easy as Accept. Never log PII (names, phones, emails, free-text messages) in
plaintext.

### V. Configuration, Release, and Accessibility Discipline
Environment-specific values (analytics IDs, API URLs, mail endpoints) MUST come
from config, with a documented `.env.example`. If no environment-specific values
exist (purely static site), `.env.example` is not required. Builds MUST be
reproducible with pinned dependencies and automated lint/format. Rollback path
MUST be documented. Accessibility checks are part of Definition of Done.

## Operational Standards

- Client telemetry is opt-in and anonymized (no fingerprints).
- Server logs are structured, rotated, and least-privilege access only.
- Performance budgets are enforced in CI (Lighthouse or equivalent).
- Supported browsers: latest stable Chrome, Firefox, Edge, Safari, Brave, Opera,
  plus iOS Safari and Android Chrome.
- Hosting remains portable (static or server) with no vendor lock-in.

## Quality Gates and Review Workflow

- Every change MUST verify: progressive enhancement, zero broken navigation,
  deterministic layout, and cookie consent behavior.
- If APIs exist, CORS and preflight behavior MUST be covered by tests.
- Accessibility checks and performance budget verification are required gates.
- Security/privacy requirements are non-negotiable and block release if violated.

## Governance

- This constitution supersedes all other practices.
- Amendments require a documented proposal, rationale, and migration impact.
- Versioning follows semantic versioning: MAJOR for incompatible governance
  changes or removals, MINOR for new/expanded principles, PATCH for clarifications.
- Compliance is reviewed in specs, plans, and PRs before merge.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): original adoption date unknown. | **Last Amended**: 2026-01-13
