# Feature Specification: Menu Home Label and Width Alignment

**Feature Branch**: `001-menu-width-home`  
**Created**: 2026-01-13  
**Status**: Draft  
**Input**: User description: "Welkom in the main menu must be Home; Be sure the main menu fits in the same width as the content; max-width is about 112-114px, make is 1260px"

## Clarifications

### Session 2026-01-13

- Q: Apply 1260px max-width to header and main content? → A: Yes, apply to both.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visitor sees Home in the main menu (Priority: P1)

A visitor scans the top navigation and sees a "Home" label instead of "Welkom".

**Why this priority**: The label should match expected navigation wording.

**Independent Test**: Can be tested by loading the landing page and checking the
first navigation label.

**Acceptance Scenarios**:

1. **Given** the landing page loads, **When** the user reviews the main menu,
   **Then** the first label reads "Home".

---

### User Story 2 - Menu width aligns with content (Priority: P2)

A visitor sees the top navigation and header aligned to the same width as the main
content.

**Why this priority**: Layout alignment should be consistent across header and main
content areas.

**Independent Test**: Can be tested by comparing header width to main content width
on desktop.

**Acceptance Scenarios**:

1. **Given** a desktop viewport, **When** the user compares the header and main
   content widths, **Then** they align to the same max-width.

---

### Edge Cases

- Narrow viewports still render the menu without horizontal scrolling.
- Long navigation labels do not break header alignment.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The main menu MUST show "Home" instead of "Welkom" for the first
  navigation item.
- **FR-002**: The header/menu container MUST align to the same max-width as the
  main content.
- **FR-003**: The header/menu max-width MUST be 1260px.
- **FR-003a**: The main content max-width MUST be 1260px.
- **FR-004**: The width alignment MUST hold across desktop breakpoints.

### Non-Functional Requirements (Constitution)

- **NFR-001**: Layout must be mobile-first (>=320px), no horizontal scrolling.
- **NFR-002**: Core navigation/content must work without CSS/JS.
- **NFR-003**: No layout shifts after initial render; consistent focus order.
- **NFR-004**: Cookie consent defaults to functional-only; Reject is as easy as Accept.
- **NFR-005**: If APIs exist, CORS origins are explicit and OPTIONS preflight is supported.
- **NFR-006**: Performance budgets and accessibility checks are required gates.

### Key Entities *(include if feature involves data)*

- **Navigation Item**: A header link shown in the main menu.
- **Layout Width**: The max-width used by header and main content containers.

## Assumptions

- "Home" is the only label change required in the main menu.
- The main content max-width should be updated to 1260px to match the header.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The first main menu label reads "Home" on page load.
- **SC-002**: Header and main content share a max-width of 1260px on desktop.
- **SC-003**: No horizontal scrolling introduced at 320px width.
