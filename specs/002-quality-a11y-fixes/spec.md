# Feature Specification: Site Quality Improvements

**Feature Branch**: `002-quality-a11y-fixes`  
**Created**: 2026-01-13  
**Status**: Draft  
**Input**: User description: "Audit site quality and address accessibility, CSS duplication, and SEO/performance metadata gaps"

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.
  
  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - Consistent Navigation + Layout (Priority: P1)

As a site visitor, I can use the main navigation to reach the homepage and in-page
sections, and the header width matches the main content width at all breakpoints.

**Why this priority**: Broken navigation and inconsistent layout directly impact
first-time visitors.

**Independent Test**: Load each page at 320px, 768px, 1024px, 1366px, and 1440px
and verify the header and main content share the same computed width.

**Acceptance Scenarios**:

1. **Given** any page, **When** I click a main menu item, **Then** I land on the
homepage and the correct section anchor is shown.
2. **Given** viewport widths from 320px to 1440px, **When** I compare the header
container and main content widths, **Then** they match within 1px.

---

### User Story 2 - Accurate Metadata + Resource Hints (Priority: P2)

As the site owner, I want metadata and resource hints to match the production
URLs so search engines and social sharing work consistently.

**Why this priority**: SEO and link previews rely on correct canonical/OG values.

**Independent Test**: Inspect page head tags and confirm they use absolute
production URLs and only include used preconnects.

**Acceptance Scenarios**:

1. **Given** the homepage and privacy page, **When** I inspect canonical, OG, and
hreflang tags, **Then** they use absolute URLs for `https://www.erikleuning.nl/`.
2. **Given** the page head, **When** I list preconnect links, **Then** each one
is used by a corresponding resource on that page.

---

### User Story 3 - Mobile Menu Focus Control (Priority: P3)

As a keyboard or screen reader user, I can open the mobile menu and keep focus
within it until I close the menu.

**Why this priority**: Predictable focus flow is required for WCAG 2.1 AA.

**Independent Test**: Use keyboard-only navigation to open/close the mobile menu
and confirm focus stays inside the menu when open.

**Acceptance Scenarios**:

1. **Given** the mobile menu is closed, **When** I open it, **Then** focus moves
to the first menu item.
2. **Given** the mobile menu is open, **When** I press Escape, **Then** the menu
closes and focus returns to the toggle button.

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

- When JavaScript is disabled, the no-JS navigation still links to all sections.
- When localStorage is blocked, the cookie banner does not loop or block content.

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: CSS MUST define each selector once per cascade context (no duplicate
selector blocks for `:root`, `main`, `.page-wrapper`, `.site-header__container`,
`.cookie-banner`, `.hero__text`, `.privacy-hero__eyebrow`).
- **FR-002**: Header container and main content MUST share the same width rule
derived from a single `--content-max` token.
- **FR-003**: Canonical, OG URL, and hreflang tags MUST use absolute production
URLs and the privacy page URL MUST match the deployed route.
- **FR-004**: Resource hints MUST include only origins used on the page (remove
unused preconnects).
- **FR-005**: Mobile menu MUST provide focus trapping while open and restore focus
to the toggle on close.
- **FR-006**: HTML, CSS, and JavaScript lint checks MUST report zero errors.

### Non-Functional Requirements (Constitution)

- **NFR-001**: Layout must be mobile-first (>=320px), no horizontal scrolling.
- **NFR-002**: Core navigation/content must work without CSS/JS.
- **NFR-003**: No layout shifts after initial render; consistent focus order.
- **NFR-004**: Cookie consent defaults to functional-only; Reject is as easy as Accept.
- **NFR-005**: If APIs exist, CORS origins are explicit and OPTIONS preflight is supported.
- **NFR-006**: Performance budgets and accessibility checks are required gates.
- **NFR-007**: Environment-specific values come from config and `.env.example` is updated.

### Assumptions

- The production domain is `https://www.erikleuning.nl/`.
- The privacy page is deployed at `https://www.erikleuning.nl/privacyverklaring.html`.

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: `htmlhint`, `stylelint`, and `eslint` report zero errors on repo files.
- **SC-002**: axe-core CLI reports 0 violations for `index.html`,
`privacyverklaring.html`, and `design-system.html`.
- **SC-003**: Header container and main content widths match within 1px at 320px,
768px, 1024px, 1366px, and 1440px viewports.
- **SC-004**: Canonical/OG/hreflang values resolve to absolute production URLs
and match sitemap entries.
