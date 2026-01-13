---

description: "Task list template for feature implementation"
---

# Tasks: Menu Privacy Link and Current Year

**Input**: Design documents from `/specs/001-menu-privacy-year/`
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

- [X] T001 Create implementation notes in specs/001-menu-privacy-year/implementation-notes.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T002 Confirm footer Privacy link is present in index.html and privacyverklaring.html

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Visitor sees a simplified top menu (Priority: P1) 🎯 MVP

**Goal**: Remove Privacy from top navigation on all pages while keeping footer access.

**Independent Test**: Header menu contains no Privacy link on index and privacy pages; footer Privacy link remains.

### Implementation for User Story 1

- [X] T003 [US1] Remove the Privacy item from NAV_ITEMS in assets/js/main.js
- [X] T004 [US1] Verify header menus in index.html and privacyverklaring.html render without Privacy link

**Checkpoint**: User Story 1 is fully functional and testable independently

---

## Phase 4: User Story 2 - Site shows the current year (Priority: P2)

**Goal**: Footer displays the current calendar year without JavaScript.

**Independent Test**: Footer year equals the current calendar year on both pages.

### Implementation for User Story 2

- [X] T005 [US2] Update footer year to the current year (2026) in index.html
- [X] T006 [US2] Update footer year to the current year (2026) in privacyverklaring.html
- [X] T007 [US2] Update manual checks for footer year in specs/001-menu-privacy-year/quickstart.md

**Checkpoint**: User Stories 1 AND 2 work independently

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T008 [P] Run quickstart.md validation in specs/001-menu-privacy-year/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Independent

### Within Each User Story

- Core implementation before verification
- Story complete before moving to next priority

### Parallel Opportunities

- Setup tasks marked [P] can run in parallel
- Polish tasks marked [P] can run in parallel

---

## Parallel Example: User Story 1

```bash
Task: "Remove the Privacy item from NAV_ITEMS in assets/js/main.js"
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

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
