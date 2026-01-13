# Feature Specification: Menu Privacy Link and Current Year

**Feature Branch**: `001-menu-privacy-year`  
**Created**: 2026-01-13  
**Status**: Draft  
**Input**: User description: "Remove link to Privacy from the main menu on the top. Copyright was last year, be sure it is always the current year"

## Clarifications

### Session 2026-01-13

- Q: Remove Privacy from top menu on which pages? → A: Remove on all pages (home + privacy page).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visitor sees a simplified top menu (Priority: P1)

A visitor uses the top navigation and does not see a Privacy link there, while the
footer still provides access to the privacy page.

**Why this priority**: The top menu should remain focused and consistent with
current navigation expectations.

**Independent Test**: Can be tested by loading the landing page and checking the
header menu items.

**Acceptance Scenarios**:

1. **Given** the landing page loads, **When** the user reviews the top menu,
   **Then** no Privacy link appears there.
2. **Given** the footer is visible, **When** the user looks for Privacy,
   **Then** the privacy page remains reachable from the footer.

---

### User Story 2 - Site shows the current year (Priority: P2)

A visitor sees the correct, current calendar year in the footer.

**Why this priority**: It avoids stale or misleading copyright messaging.

**Independent Test**: Can be tested by comparing the footer year to the system year.

**Acceptance Scenarios**:

1. **Given** the page loads, **When** the user reads the footer copyright line,
   **Then** the year matches the current calendar year.

---

### Edge Cases

- The year rolls over (Dec 31/Jan 1) and the footer reflects the new year.
- JavaScript is unavailable; the year still renders correctly.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The top navigation MUST not include a Privacy link on any page.
- **FR-002**: The Privacy page MUST remain reachable from the footer navigation.
- **FR-003**: The footer MUST display the current calendar year.
- **FR-004**: The year display MUST work without JavaScript.

### Non-Functional Requirements (Constitution)

- **NFR-001**: Layout must be mobile-first (>=320px), no horizontal scrolling.
- **NFR-002**: Core navigation/content must work without CSS/JS.
- **NFR-003**: No layout shifts after initial render; consistent focus order.
- **NFR-004**: Cookie consent defaults to functional-only; Reject is as easy as Accept.
- **NFR-005**: If APIs exist, CORS origins are explicit and OPTIONS preflight is supported.
- **NFR-006**: Performance budgets and accessibility checks are required gates.

### Key Entities *(include if feature involves data)*

- **Navigation Item**: A header or footer link shown to the user.
- **Footer Year**: The calendar year shown in the footer copyright line.

## Assumptions

- The Privacy link should remain in the footer only.
- The year should be rendered as a plain number (YYYY).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The top navigation contains zero Privacy links.
- **SC-002**: The footer year matches the current calendar year on page load.
- **SC-003**: The privacy page remains reachable via footer navigation.
