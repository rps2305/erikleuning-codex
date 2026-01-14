# Repository Guidelines

## Project Structure and Module Organization
This is a fully static site. Key locations:
- `index.html` and `privacyverklaring.html` live in the repo root and are the primary pages.
- `assets/css/main.css` contains the precompiled Tailwind plus custom styles (no build step).
- `assets/js/main.js` includes Alpine.js initialization and helpers.
- `images/` holds site imagery; root-level favicon files and `site.webmanifest` are generated assets.

## Build, Test, and Development Commands
There is no build or test pipeline. Edit files directly and open them in a browser:
- Open `index.html` or `privacyverklaring.html` in your browser to preview changes.
- Optional favicon regeneration (requires ImageMagick):
  - `magick images/logo256x256-256.webp -resize 512x512 android-chrome-512x512.png`

## Coding Style and Naming Conventions
- HTML and CSS follow existing formatting in the files; keep indentation consistent with surrounding code.
- Class naming is Tailwind-first; prefer utility classes in HTML over new CSS where reasonable.
- JS in `assets/js/main.js` is small and plain; keep functions short and avoid new dependencies.

## Testing Guidelines
- No automated tests are defined in this repo.
- Manual checks: load `index.html` and `privacyverklaring.html` in a browser and verify layout, navigation, and the cookie banner.

## Commit and Pull Request Guidelines
- Commit history uses short, descriptive messages (often multiple clauses). Keep commits focused and concise.
- PRs should include a brief summary, list of pages touched, and screenshots for UI-visible changes.
- If you update analytics or favicons, mention the files and the source image used.

## Security and Configuration Tips
- Analytics is configured in both HTML files via the gtag snippet. Update IDs in both files to keep tracking consistent.

## Active Technologies
- HTML5, CSS3, JavaScript (ES2015+) + Tailwind CSS (precompiled), Alpine.js (navigation + cookie banner) (001-mobile-site-polish)
- N/A (static files only) (001-mobile-site-polish)
- Vanilla HTML5, CSS3, and ES2021 JavaScrip + None (static assets only; optional tooling via htmlhint, stylelint, eslint, axe-core, lighthouse) (001-design-system-enhancements)
- N/A (static site) (001-design-system-enhancements)
- Vanilla HTML5, CSS3, and ES2021 JavaScrip + None (static assets only; Tailwind config added as reference) (001-design-system-complete)

## Recent Changes
- 001-mobile-site-polish: Added HTML5, CSS3, JavaScript (ES2015+) + Tailwind CSS (precompiled), Alpine.js (navigation + cookie banner)
