# Feature Specification: Mobile Site Polish

**Feature Branch**: `001-mobile-site-polish`  
**Created**: 2026-01-13  
**Status**: Draft  
**Input**: User description: "Problem statement A new website for Erik Leuning is being built for erikleuning.nl with a prototype currently hosted on GitHub Pages. The prototype contains “glitches like on mobile” and needs targeted improvements to responsiveness, navigation, accessibility, performance, and overall polish—without losing the existing information architecture and content sections. In-scope pages and content Landing page with sections matching the prototype structure, including: “Welkom bij Erik Leuning” “Begeleiding in beeld” “Over mij” “Doelgroep” “Werkwijze” “Visie” “Werkgebied” “Contact” Footer quick navigation + cookie consent banner Privacyverklaring page must remain present and reachable. Primary user journeys Mobile visitor finds who Erik is + what help he offers, scrolls sections, and can contact via email/phone. Referrer (municipality/organization) validates doelgroep/werkwijze/werkgebied quickly and shares the link. Accessibility user navigates by headings/landmarks and uses skip-link + keyboard to reach Contact. Functional requirements Navigation & information architecture Provide a sticky header navigation (or persistent menu) that: Collapses to a mobile menu at small widths. Supports keyboard navigation (Tab, Shift+Tab, Enter, Escape). Highlights active section while scrolling (optional but preferred). All footer “Snelle navigatie” links must point to valid sections/pages. Skip-link (“Overslaan…”) must jump focus to main content and be visible on focus. Mobile responsiveness (“glitches” acceptance criteria) At widths 320px–430px (common phones): No horizontal scrolling. No overlapping text/images/buttons. No “double-tap to zoom” requirements; ensure viewport/meta and scalable layout. The cookie banner must not cover the Contact actions permanently; it must be dismissible and respect safe-area insets (iOS notch). At widths >=768px (tablet) and >=1024px (desktop): Content uses readable measure (line length), consistent spacing, and balanced columns. Media (images/icons) Images must: Be responsive (srcset/sizes or equivalent). Not cause layout shift (width/height or aspect-ratio defined). Have meaningful alt text (decorative images marked appropriately). Prototype includes multiple “Image:” items that must be handled correctly. Accessibility (WCAG 2.1 AA target) The prototype claims WCAG 2.1 AA alignment; the implementation must meet it in practice: Correct heading hierarchy (single H1, logical H2/H3 nesting). Landmarks (header, nav, main, footer). Focus visible, sufficient contrast, and no keyboard traps. Accessible cookie consent (role/labels, focus management). Contact links (email/phone) are real links and screen-reader friendly. Contact Contact section must include: Email link and phone number link (tap-to-call on mobile). Optional: simple contact form (only if you decide to add backend handling; otherwise keep mailto/tel). If a form is added: Server-side validation + rate limiting + abuse protection. Clear consent/processing notice referencing Privacyverklaring. Cookie consent Provide three states: Reject all non-essential Accept all Manage preferences (optional but preferred) Default must be essential-only; store consent choices with minimal retention. Non-functional requirements Performance budgets Mobile Lighthouse targets (or equivalent): LCP <= 2.5s on mid-tier mobile (lab target) CLS <= 0.1 INP “good” range where feasible Total blocking JS must be minimized; avoid heavy frameworks unless justified. SEO & sharing Proper title/description, canonical URL, Open Graph tags. Structured data (Organization/LocalBusiness) optional. Maintainability Content should be editable without touching layout code (e.g., markdown/content files or CMS). Consistent component system (buttons, cards, typographic scale). Explicit security declarations Trust boundaries Browser is untrusted. Any server/API endpoints are trusted only after authn/authz and validation. Third-party embeds/analytics are untrusted and must be isolated. Authentication/authorization Public informational site: no auth required unless an admin/editor area exists (out of scope unless specified later). CORS policy If a backend API is introduced: Access-Control-Allow-Origin must be a strict allowlist, e.g.: https://www.erikleuning.nl (optional staging) https://rps2305.github.io only if needed Include ports explicitly for any non-443 origins (e.g., https://staging.example:8443). Access-Control-Allow-Credentials only if absolutely required; document justification. OPTIONS preflight must return consistent headers and 204/200. Edge cases Very long words/URLs (no overflow). User increases font size to 200% (layout must hold). Dark mode (optional): if supported, must maintain contrast. Offline/slow network: images may not load; still readable. Cookie banner + mobile safe areas + small viewport height. Failure modes & required behaviors Missing image/font: fall back gracefully. JS error: menu still operable (basic links visible). Consent storage blocked: default to essential-only; do not loop banners."

## Clarifications

### Session 2026-01-13

- Q: Include a contact form? → A: Mailto + tel links only (no contact form).
- Q: Cookie consent preference granularity? → A: Manage preferences with analytics vs essential toggle.
- Q: Canonical URL target? → A: Use current host (dynamic per environment).
- Q: JS-disabled navigation fallback? → A: Keep hamburger, add a visible fallback link list in main content.
- Q: Section anchor naming? → A: Use anchors: #welkom, #begeleiding, #over-mij, #doelgroep, #werkwijze, #visie, #werkgebied, #contact.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Mobile visitor understands and contacts (Priority: P1)

A mobile visitor lands on the site, quickly understands who Erik is and the help he
provides, scrolls through the main sections, and reaches the contact options.

**Why this priority**: This is the primary audience and conversion path for the site.

**Independent Test**: Can be fully tested on a phone-sized viewport by navigating
the landing page and activating email or phone contact links.

**Acceptance Scenarios**:

1. **Given** a 320px wide viewport, **When** the user scrolls through the landing
   page, **Then** all sections are readable without horizontal scrolling or overlap.
2. **Given** the Contact section is reached, **When** the user selects email or phone,
   **Then** a mail client or dialer opens via a real link.

---

### User Story 2 - Referrer validates doelgroep and shares (Priority: P2)

A referrer reviews the doelgroep, werkwijze, and werkgebied sections quickly and
shares the link with colleagues.

**Why this priority**: Referrers are decision-makers and influence referrals.

**Independent Test**: Can be tested by scanning headings and section content and
copying the page URL without confusion.

**Acceptance Scenarios**:

1. **Given** a desktop or tablet viewport, **When** the referrer scans the key
   sections, **Then** navigation and section headings are clear and consistent.
2. **Given** the referrer shares the link, **When** the recipient opens it, **Then**
   the landing page loads with correct title and description metadata.

---

### User Story 3 - Accessibility user reaches Contact (Priority: P3)

An accessibility-focused user navigates by keyboard and headings, uses the skip
link, and reaches the Contact section without traps.

**Why this priority**: Accessibility is a requirement and supports all users.

**Independent Test**: Can be tested with keyboard-only navigation and a screen
reader in a desktop browser.

**Acceptance Scenarios**:

1. **Given** the page loads, **When** the user presses Tab, **Then** the skip link is
   visible and moves focus to the main content.
2. **Given** the user navigates by headings and landmarks, **When** moving through
   the page, **Then** the hierarchy is logical and all sections are reachable.

---

### Edge Cases

- Very long words or URLs do not overflow or cause horizontal scroll.
- User increases font size to 200% and layout remains readable.
- Cookie banner respects safe-area insets and does not block Contact actions.
- Images or fonts fail to load and content remains readable.
- JS fails; navigation links remain usable and content remains accessible.
- Consent storage is blocked; banner defaults to essential-only without looping.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Site MUST preserve the existing information architecture and section
  order for the landing page content.
- **FR-001a**: Section anchors MUST be named: #welkom, #begeleiding, #over-mij,
  #doelgroep, #werkwijze, #visie, #werkgebied, #contact.
- **FR-002**: Site MUST provide a sticky header navigation that collapses to a
  mobile menu at small widths.
- **FR-003**: Navigation MUST be operable by keyboard (Tab/Shift+Tab/Enter/Escape).
- **FR-003a**: With JS disabled, a visible fallback list of navigation links MUST
  be available in the main content area.
- **FR-004**: Footer "Snelle navigatie" links MUST resolve to valid sections/pages.
- **FR-005**: Skip link MUST move focus to main content and be visible on focus.
- **FR-006**: Layout MUST avoid overlapping text, images, and buttons at 320px to
  430px widths.
- **FR-007**: Cookie banner MUST be dismissible and must not permanently cover
  contact actions; it MUST respect safe-area insets.
- **FR-007a**: Cookie banner MUST apply safe-area insets using `env(safe-area-inset-*)`
  on iOS devices.
- **FR-008**: Images MUST be responsive, include meaningful alt text (or be marked
  decorative), and avoid layout shifts.
- **FR-009**: Heading hierarchy MUST use a single H1 with logical H2/H3 nesting and
  include header/nav/main/footer landmarks.
- **FR-010**: Contact section MUST include mailto and tel links that are screen-reader
  friendly.
- **FR-010a**: The site MUST not include a contact form; contact is via mailto and
  tel links only.
- **FR-011**: Cookie consent MUST offer Reject and Accept with equal ease, default
  to essential-only, and store preferences for 90 days.
- **FR-011a**: Consent management MUST allow users to toggle analytics vs essential
  cookies only (no finer-grained categories).
- **FR-012**: SEO metadata MUST include a page title, description, canonical URL, and
  Open Graph tags.
- **FR-012a**: Canonical URL MUST use the current host (environment-specific).
- **FR-013**: Content MUST be editable without restructuring layout (content changes
  should not require redesigning sections or navigation).

### Non-Functional Requirements (Constitution)

- **NFR-001**: Layout must be mobile-first (>=320px), no horizontal scrolling.
- **NFR-002**: Core navigation/content must work without CSS/JS.
- **NFR-003**: No layout shifts after initial render; consistent focus order.
- **NFR-004**: Cookie consent defaults to functional-only; Reject is as easy as Accept.
- **NFR-005**: If APIs exist, CORS origins are explicit and OPTIONS preflight is supported.
- **NFR-006**: Performance budgets and accessibility checks are required gates.

### Key Entities *(include if feature involves data)*

- **Content Section**: A named section of the landing page used for navigation anchors.
- **Navigation Link**: A header or footer link that targets a content section or page.
- **Consent Choice**: The user's cookie consent state (essential-only, reject, accept).

## Assumptions

- No contact form backend will be added; contact is via mailto and tel links only.
- Active section highlight is a nice-to-have; if implemented it must not break
  accessibility or keyboard navigation.
- Structured data markup is optional and can be skipped if it adds risk or complexity.

## Deliverables

- Audit bug list with viewport + reproduction steps.
- IA and content parity inventory between prototype and current site.
- Viewport/test matrix for 320/360/390/414/768/1024/1440px.
- Design system reference page (typography, buttons, cards, spacing, cookie states).
- Accessibility checklist with fixes noted.
- Performance report with Lighthouse results and CI budget notes.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users on a 320px viewport can reach the Contact section without
  horizontal scrolling or overlapping content.
- **SC-002**: 100% of header and footer navigation links resolve to valid targets.
- **SC-003**: Keyboard-only users can reach Contact in under 15 Tab presses from
  page load.
- **SC-004**: Core content remains readable with images disabled and with 200% text
  zoom enabled.
- **SC-005**: Mobile performance meets LCP <= 2.5s and CLS <= 0.1 in lab testing.
