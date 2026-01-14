# Quickstart: Design System Enhancements

## Setup
1. Ensure Node.js v25+ is installed (for optional linters).
2. Run lint checks:
   - `npx --yes htmlhint design-system.html`
   - `npx --yes stylelint "assets/**/*.css" --config .specify/scripts/stylelint.json`
   - `npx --yes eslint "assets/**/*.js" --config .specify/scripts/eslint.config.mjs`
3. Run accessibility checks:
   - `npx --yes @axe-core/cli "file://$PWD/design-system.html"`
4. Run performance checks:
   - `npx --yes lighthouse "http://127.0.0.1:8000/design-system.html" --only-categories=performance`
5. If checking console errors, serve over HTTP (not file://) to avoid CORS warnings for `site.webmanifest`:
   - `python -m http.server 8000`
   - Open `http://127.0.0.1:8000/index.html`

## Manual verification
- Review all buttons/inputs and confirm hover, focus, active, and disabled states are visually distinct.
- Verify the design-system page includes examples for success/error feedback, tooltips, modals, breadcrumbs, mobile menu mock, tabs, accordion, pagination/data display, media, empty states, loading/skeletons, and footer components.
- Confirm all new components have visible focus indicators and keyboard access (WCAG 2.1 AA expectations).

## Constitution checks
- Verify 320px mobile-first layout with no horizontal scrolling on design-system.html.
- Verify design-system.html remains readable with CSS disabled and with JS disabled (navigation/content accessible).
- Verify cookie consent defaults to functional-only and Reject is as easy as Accept (if banner present).

## Performance budget enforcement
- Current enforcement: manual Lighthouse checks as listed above (add CI gate if/when available).
