---

description: "Task list template for feature implementation"
---

# Tasks: Mobile Site Polish

**Input**: Design documents from `/specs/001-mobile-site-polish/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are OPTIONAL unless required by the feature specification, but constitution gates (a11y + performance budgets + privacy/security checks) are MANDATORY.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create baseline audit checklist and bug list template in specs/001-mobile-site-polish/bug-list.md
- [X] T002 [P] Document IA + content parity inventory in specs/001-mobile-site-polish/ia-parity.md
- [X] T003 [P] Add design system reference page skeleton in design-system.html
- [X] T004 [P] Capture viewport/test matrix in specs/001-mobile-site-polish/test-matrix.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T005 Define CSS variables for typography, spacing, and breakpoints in assets/css/main.css
- [X] T006 Add base layout wrappers and readable measure rules in assets/css/main.css
- [X] T007 Add responsive image baseline rules (aspect-ratio, width/height, display) in assets/css/main.css
- [X] T008 Establish header/nav/main/footer landmark structure in index.html
- [X] T009 Add sticky header + mobile collapse styles in assets/css/main.css
- [X] T010 Add cookie banner markup with Reject/Accept/Manage controls in index.html
- [X] T010a Add safe-area inset padding for cookie banner in assets/css/main.css
- [X] T011 Implement consent state storage/defaults and analytics toggle logic in assets/js/main.js
- [X] T012 Add JS-disabled fallback nav list in main content in index.html
- [X] T013 Mirror header/footer + skip link structure in privacyverklaring.html
- [X] T014 Add JS-disabled fallback nav list in privacyverklaring.html

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Mobile visitor understands and contacts (Priority: P1) 🎯 MVP

**Goal**: Mobile visitor reads all sections without glitches and can contact via email/phone.

**Independent Test**: 320px viewport can scroll all sections with no horizontal scroll; mailto/tel links open.

### Implementation for User Story 1

- [X] T015 [P] [US1] Implement hero wrapper spacing and max-width in index.html
- [X] T016 [P] [US1] Refactor section card grid for consistent spacing in index.html
- [X] T017 [P] [US1] Update Contact section links (mailto/tel) and tap targets in index.html
- [X] T018 [US1] Fix mobile overflow and spacing issues in assets/css/main.css
- [X] T019 [US1] Add responsive image sources and dimensions in index.html and images/

**Checkpoint**: User Story 1 is fully functional and testable independently

---

## Phase 4: User Story 2 - Referrer validates doelgroep and shares (Priority: P2)

**Goal**: Referrer can quickly scan key sections and share a correctly described page.

**Independent Test**: Headings and anchors are consistent; shared link shows expected title/description.

### Implementation for User Story 2

- [X] T020 [P] [US2] Validate footer quick navigation targets in index.html and privacyverklaring.html
- [X] T021 [US2] Add SEO title/description/Open Graph tags in index.html
- [X] T022 [US2] Set canonical URL in index.html and privacyverklaring.html
- [X] T023 [US2] Verify section headings and anchor order in index.html

**Checkpoint**: User Stories 1 AND 2 work independently

---

## Phase 5: User Story 3 - Accessibility user reaches Contact (Priority: P3)

**Goal**: Keyboard and screen reader users can navigate landmarks, skip link, menu, and consent without traps.

**Independent Test**: Keyboard-only navigation reaches Contact; skip link is visible and functional; focus is visible.

### Implementation for User Story 3

- [X] T024 [US3] Implement skip-link focus styles and placement in assets/css/main.css and index.html
- [X] T025 [US3] Add keyboard support for mobile menu (Enter/Escape) in assets/js/main.js
- [X] T026 [US3] Add cookie banner ARIA labels and focus management in index.html and assets/js/main.js
- [X] T027 [US3] Ensure focus-visible styles and contrast updates in assets/css/main.css

**Checkpoint**: All user stories are independently functional

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T028 [P] Run viewport matrix audit and update findings in specs/001-mobile-site-polish/bug-list.md
- [ ] T029 [P] Record accessibility checks in specs/001-mobile-site-polish/accessibility-checklist.md
- [ ] T030 [P] Capture Lighthouse results in specs/001-mobile-site-polish/performance-report.md
- [X] T031 [P] Add CI Lighthouse budget enforcement notes in specs/001-mobile-site-polish/performance-report.md
- [X] T032 [P] Update quickstart verification steps in specs/001-mobile-site-polish/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Independent, verifies SEO/share
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Focused on a11y behavior

### Within Each User Story

- Core markup updates before behavior
- Styling adjustments before accessibility validation
- Story complete before moving to next priority

### Parallel Opportunities

- Setup tasks marked [P] can run in parallel
- User story tasks marked [P] can run in parallel (different files)
- Final polish tasks marked [P] can run in parallel

---

## Parallel Example: User Story 1

```bash
Task: "Implement hero wrapper spacing and max-width in index.html"
Task: "Refactor section card grid for consistent spacing in index.html"
Task: "Update Contact section links (mailto/tel) and tap targets in index.html"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
