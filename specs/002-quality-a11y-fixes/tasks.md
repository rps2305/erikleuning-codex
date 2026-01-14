---

description: "Task list for Site Quality Improvements"
---

# Tasks: Site Quality Improvements

**Input**: Design documents from `/specs/002-quality-a11y-fixes/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Tests are OPTIONAL; only include if requested. This feature relies on lint and axe-core checks in the polish phase.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and documentation alignment

- [X] T001 Update verification notes in specs/002-quality-a11y-fixes/quickstart.md to reflect the navigation, metadata, and focus-trap checks

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core cleanup that blocks all user story work

**CRITICAL**: No user story work can begin until this phase is complete

- [X] T002 Consolidate duplicate selector blocks (:root, main, .page-wrapper, .site-header__container, .cookie-banner, .hero__text, .privacy-hero__eyebrow) in assets/css/main.css to satisfy FR-001

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Consistent Navigation + Layout (Priority: P1) MVP

**Goal**: Navigation works across pages and header width matches main content at all breakpoints.

**Independent Test**: Resize to 320px, 768px, 1024px, 1366px, 1440px and confirm header container and main content widths match within 1px; verify nav items from non-home pages land on the correct homepage anchors.

### Implementation for User Story 1

- [X] T003 [US1] Define a single --content-max token and align main + .site-header__container width rules in assets/css/main.css
- [X] T004 [P] [US1] Update main nav anchor targets on privacyverklaring.html to point to index.html section anchors
- [X] T005 [P] [US1] Update main nav anchor targets on design-system.html to point to index.html section anchors
- [X] T006 [US1] Align header and main wrapper markup in index.html to use the shared width container class

**Checkpoint**: User Story 1 is independently functional

---

## Phase 4: User Story 2 - Accurate Metadata + Resource Hints (Priority: P2)

**Goal**: Canonical/OG/hreflang values and resource hints match production URLs and usage.

**Independent Test**: Inspect head tags for canonical/OG/hreflang and preconnect links on each page; confirm absolute production URLs and only used preconnect origins.

### Implementation for User Story 2

- [X] T007 [US2] Update canonical/og/hreflang URLs in index.html to use https://www.erikleuning.nl/ absolute production values
- [X] T008 [US2] Update canonical/og/hreflang URLs in privacyverklaring.html to use the production privacy page route
- [X] T009 [US2] Update canonical/og/hreflang URLs in design-system.html to use absolute production values
- [X] T010 [US2] Remove unused preconnect links and keep only used origins in index.html
- [X] T011 [US2] Remove unused preconnect links and keep only used origins in privacyverklaring.html
- [X] T012 [US2] Remove unused preconnect links and keep only used origins in design-system.html
- [X] T013 [US2] Align sitemap.xml URLs with the production canonical values

**Checkpoint**: User Story 2 is independently functional

---

## Phase 5: User Story 3 - Mobile Menu Focus Control (Priority: P3)

**Goal**: Focus is trapped within the mobile menu when open and restored on close.

**Independent Test**: Open the mobile menu via keyboard, confirm focus moves to the first item, tab cycles within the menu, and Escape closes the menu and returns focus to the toggle.

### Implementation for User Story 3

- [X] T014 [US3] Add focus trap and focus-restore logic to the Alpine menu behavior in assets/js/main.js
- [X] T015 [P] [US3] Add required x-ref or focusable selectors to the mobile menu and toggle in index.html
- [X] T016 [P] [US3] Add required x-ref or focusable selectors to the mobile menu and toggle in privacyverklaring.html
- [X] T017 [P] [US3] Add required x-ref or focusable selectors to the mobile menu and toggle in design-system.html

**Checkpoint**: User Story 3 is independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validation, linting, and documentation updates across stories

- [X] T018 Run htmlhint on index.html, privacyverklaring.html, design-system.html and fix any violations in those files
- [X] T019 [P] Run stylelint on assets/css/main.css and fix any violations in that file
- [X] T020 [P] Run eslint on assets/js/main.js and fix any violations in that file
- [X] T021 Run axe-core CLI on index.html, privacyverklaring.html, design-system.html and fix any violations in those files
- [X] T022 Run Lighthouse (or equivalent) performance budget checks on index.html, privacyverklaring.html, design-system.html and fix any regressions in those files
- [X] T023 Verify no horizontal scrolling at 320px, 768px, 1024px, 1366px, 1440px on index.html, privacyverklaring.html, design-system.html
- [X] T024 Verify navigation/content works with CSS disabled and JS disabled on index.html, privacyverklaring.html, design-system.html
- [X] T025 Verify cookie banner allows Reject as easily as Accept and does not block content on index.html and privacyverklaring.html
- [X] T026 Verify cookie banner behaves correctly when localStorage is blocked (no loop, no content block) on index.html and privacyverklaring.html
- [X] T027 Update specs/002-quality-a11y-fixes/quickstart.md with any new commands or validation notes introduced by these changes

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: Depend on Foundational phase completion
- **Polish (Phase 6)**: Depends on desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - no dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational - independent of US1
- **User Story 3 (P3)**: Can start after Foundational - independent of US1 and US2

### Parallel Opportunities

- **US1**: T004 and T005 can run in parallel (different HTML files)
- **US3**: T015, T016, and T017 can run in parallel (different HTML files)
- **Polish**: T019 and T020 can run in parallel (different asset files)

---

## Parallel Example: User Story 1

```bash
# Update non-home nav links in parallel:
Task: "Update main nav anchor targets on privacyverklaring.html to point to index.html section anchors"
Task: "Update main nav anchor targets on design-system.html to point to index.html section anchors"
```

---

## Parallel Example: User Story 2

```bash
# Metadata updates can be split by page:
Task: "Update canonical/og/hreflang URLs in index.html to use https://www.erikleuning.nl/ absolute production values"
Task: "Update canonical/og/hreflang URLs in privacyverklaring.html to use the production privacy page route"
Task: "Update canonical/og/hreflang URLs in design-system.html to use absolute production values"
```

---

## Parallel Example: User Story 3

```bash
# Add x-ref hooks per page in parallel:
Task: "Add required x-ref or focusable selectors to the mobile menu and toggle in index.html"
Task: "Add required x-ref or focusable selectors to the mobile menu and toggle in privacyverklaring.html"
Task: "Add required x-ref or focusable selectors to the mobile menu and toggle in design-system.html"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (blocks all stories)
3. Complete Phase 3: User Story 1
4. Validate User Story 1 independently

### Incremental Delivery

1. Complete Setup + Foundational
2. Add User Story 1 -> Test independently -> Deploy/Demo
3. Add User Story 2 -> Test independently -> Deploy/Demo
4. Add User Story 3 -> Test independently -> Deploy/Demo
5. Each story adds value without breaking previous stories
