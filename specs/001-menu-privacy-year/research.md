# Phase 0 Research: Menu Privacy Link and Current Year

## Decision 1: Navigation update scope
- **Decision**: Remove the Privacy link from top navigation on all pages.
- **Rationale**: Ensures consistent header navigation and matches clarified scope.
- **Alternatives considered**: Remove only on landing page; rejected due to
  inconsistent navigation across pages.

## Decision 2: Year rendering approach
- **Decision**: Render the year as static HTML content in the footer.
- **Rationale**: Meets the “no JS required” constraint and avoids runtime logic.
- **Alternatives considered**: JavaScript-based year; rejected because it fails
  non-JS requirement.
