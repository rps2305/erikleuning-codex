# Research Summary

## Decision: Keep component examples on the design-system page only
- Rationale: The spec clarifies that new examples should be isolated to the reference page to avoid unintended changes on live pages.
- Alternatives considered: Mirroring examples onto live pages; rejected due to scope and risk of visual drift.

## Decision: Extend existing class patterns for interactive states
- Rationale: Aligning with current class naming keeps the design system consistent and minimizes refactor risk.
- Alternatives considered: Introducing a new naming system; rejected to avoid cross-page regressions.

## Decision: Static examples (no live data or backend interactions)
- Rationale: The project is static and the goal is illustrative reference content, not functional UI flows.
- Alternatives considered: Interactive demos; rejected to avoid introducing JS complexity.

## Decision: WCAG 2.1 AA expectations for new components
- Rationale: Matches existing accessibility commitments and constitution requirements.
- Alternatives considered: Lower or unspecified standards; rejected due to accessibility expectations.

## Decision: Keep current CSS delivery (no critical CSS split)
- Rationale: The spec explicitly disallows introducing a critical CSS split and avoids build tooling.
- Alternatives considered: Inline critical CSS; rejected due to scope and tooling constraints.
