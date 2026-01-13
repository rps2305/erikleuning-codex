# Phase 1 Data Model: Mobile Site Polish

## Content Section
- **Description**: Named content block on the landing page used for navigation.
- **Fields**:
  - `id` (string): Anchor slug (e.g., `welkom`, `begeleiding`).
  - `title` (string): Visible heading text.
  - `order` (number): Display order on the landing page.
- **Validation**:
  - `id` must match the agreed anchor list.
  - Single H1 across the page; section headings are H2.
- **Relationships**:
  - Referenced by Navigation Link.

## Navigation Link
- **Description**: Header/footer link to an anchor or page.
- **Fields**:
  - `label` (string): Visible link text.
  - `target` (string): Anchor or page URL.
  - `location` (enum): `header` or `footer`.
- **Validation**:
  - `target` must resolve to an existing section or page.

## Consent Choice
- **Description**: User consent state for cookies.
- **Fields**:
  - `state` (enum): `essential-only`, `analytics`, `rejected`.
  - `timestamp` (datetime): When consent was stored.
- **Validation**:
  - Default to `essential-only` if storage is blocked.
