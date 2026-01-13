# Research Summary

## Decision: Use existing linters (htmlhint/stylelint/eslint) + axe-core CLI for regressions
- Rationale: Repository is static HTML/CSS/JS, so lightweight linters that accept config files cover the needed surface and have already run successfully locally.
- Alternatives considered: Introduced heavier toolsets (e.g., Webpack + ESLint plugins). Those would require rebuilding or bundling and were rejected for this static site.

## Decision: Treat navigation + layout width as the main structural lift and ensure JS accessibility focus is handled via Alpine component logic
- Rationale: Fixing duplicated selectors and consistent `--content-max` rules eliminates wide layout drift; the mobile menu already uses Alpine, so adding explicit focus trapping can be done there.
- Alternatives considered: Rebuilding navigation with a CSS-only solution, but that would require more regressions without clear benefit.

## Decision: Document the improvements and tests in quickstart + plan/README for easy manual validation
- Rationale: Stakeholders expect minimal friction manual QA; providing the quickstart steps ensures future contributors can reproduce validation steps.
- Alternatives considered: Skip quickstart (less documentation) — rejected because other workflows rely on clear QA steps.
