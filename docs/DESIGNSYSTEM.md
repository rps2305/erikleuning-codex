# Design System

**Purpose**: Single source of truth for visual standards, components, and usage guidance.
**Last updated**: 2026-01-14
**Reference page**: `design-system.html`

## Overview

This document explains the foundations and component rules that power the Erik Leuning website. All examples live on `design-system.html` and should remain static.

## Foundations

### Spacing Scale

Use a fixed spacing scale for margins, padding, and gaps:

- 4px (XS)
- 8px (S)
- 16px (M)
- 24px (L)
- 32px (XL)

### Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px – 1023px
- **Desktop**: 1024px and up

### Grid / Container

- Use the content shell max width to keep layouts consistent.
- Align major sections to the same horizontal container width.

### Color

- **Accent**: Used for primary actions, links, and highlights.
- **Surface / Body**: Use for section backgrounds to maintain contrast.

### Typography

- **Body**: Source Sans Pro for readability.
- **Accent**: Uppercase, letter-spaced headings for emphasis.
- **Handwritten**: Italic style only for optional highlight text.

### Icon Style

- Use simple line icons with consistent stroke weight.
- Keep icon sizes aligned (20–24px).

### Imagery

- Prefer real photography over illustrations.
- Use captions for context or attribution.

### Tone of Voice

- Warm, calm, and supportive.
- Avoid technical jargon in public-facing copy.

## Components

All component examples are listed in `design-system.html`:

- **Buttons**: Primary, secondary, ghost, destructive (`design-system.html#buttons`).
- **Links**: Inline links in paragraphs (`design-system.html#links`).
- **Forms**: Inputs, textarea, select, validation (`design-system.html#forms`).
- **Navigation**: Header and mobile menu patterns (`design-system.html#navigation`).
- **Lists**: Ordered and unordered (`design-system.html#lists`).
- **Cards**: Simple, with action, with image (`design-system.html#cards`).
- **Alerts**: Success and error messages (`design-system.html#feedback`).
- **Footer**: Full footer layout (`design-system.html#footer`).

## Token References

- **CSS variables** live in `assets/css/main.css` (e.g., `--accent`, `--body`).
- **Tailwind tokens** are mirrored in `tailwind.config.js` and should match the visual examples in `design-system.html`.

## States & Behavior

- **Hover**: Provide clear visual feedback.
- **Focus**: Focus ring must be visible for keyboard navigation.
- **Active**: Use subtle pressed state.
- **Disabled**: Reduce contrast and prevent interaction.
- **Error**: Use clear red feedback with guidance text.

## Accessibility

- Maintain WCAG 2.1 AA contrast for text and focus states.
- Ensure focus order is predictable.
- Keep hover effects secondary to focus states.

## References

- Visual examples: `design-system.html`
- Tokens: `tailwind.config.js`
