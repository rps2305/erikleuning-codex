# Phase 1 Data Model: Menu Home Label and Width Alignment

## Navigation Item
- **Description**: A link displayed in the header navigation.
- **Fields**:
  - `label` (string): Visible link text.
  - `target` (string): Anchor or URL.
- **Validation**:
  - First label must be "Home".

## Layout Width
- **Description**: Max-width used for header and main content.
- **Fields**:
  - `value` (number): 1260 (pixels).
- **Validation**:
  - Header and main content use the same max-width.
