# Phase 1 Data Model: Menu Privacy Link and Current Year

## Navigation Item
- **Description**: A link displayed in the header or footer navigation.
- **Fields**:
  - `label` (string): Visible link text.
  - `target` (string): Link URL or anchor.
  - `location` (enum): `header` or `footer`.
- **Validation**:
  - Header must not contain Privacy item.

## Footer Year
- **Description**: Calendar year displayed in footer copyright.
- **Fields**:
  - `value` (string): Four-digit year (YYYY).
- **Validation**:
  - Must match current calendar year.
