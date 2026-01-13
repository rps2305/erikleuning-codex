# Quickstart: Site Quality Improvements

## Setup
1. Ensure Node.js v25+ is installed.
2. Run the lint suite in the repo root:
   - `npx --yes htmlhint index.html privacyverklaring.html design-system.html`
   - `npx --yes stylelint "assets/**/*.css" --config .specify/scripts/stylelint.json`
   - `npx --yes eslint "assets/**/*.js" --config .specify/scripts/eslint.config.mjs`
3. Run accessibility checks via axe-core CLI:
   - `npx --yes @axe-core/cli "file://$PWD/index.html"`
   - Repeat for `privacyverklaring.html` and `design-system.html`.

## Manual verification
- Resize the browser to 320px, 768px, 1024px, 1366px, 1440px and confirm the header container width matches the main content width.
- Click each nav link on the privacy page and ensure it navigates to the homepage sections.
- Open the mobile menu, navigate via keyboard, and press Escape to verify focus trap behavior.
- Inspect canonical/OG/hreflang tags to confirm they reference `https://www.erikleuning.nl/` (and `/privacyverklaring.html`).
