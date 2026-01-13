# Data Model for Site Quality Improvements

This enhancement does not introduce new persistent data entities. The feature focuses on static content, layout, and client-side behavior.

- **Content Layout**: Represents the structure of `main` vs `header` containers; no data fields beyond CSS custom properties (e.g., `--content-max`).
- **Navigation Focus State**: Tracks the mobile menu `mobileOpen` flag and `activeSection`; this state is managed purely in Alpine components without server persistence.
