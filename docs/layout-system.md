# Portfolio layout system

This layout system is intended for a visual designer portfolio that can read like an editorial publication while still supporting horizontal project browsing.

## CSS grid system

### Page grid

- Use `.editorial-grid` as the main vertical page scaffold.
- The grid has 12 columns on desktop and collapses to 4 columns on smaller screens.
- `.grid-full`, `.grid-wide`, `.grid-main`, `.grid-aside`, and `.grid-pull` define reusable column spans for hero copy, essays, metadata, indexes, and pull quotes.

### Project browsing rail

- Use `.horizontal-rail` for horizontal project browsing.
- The rail uses CSS grid auto-columns so project cards can scroll sideways while preserving editorial spacing.
- Use this pattern for project previews, archive experiments, and related-project navigation.

## Typography scale

The type system uses custom properties so a later visual pass can swap font families without changing layout:

- `--type-display`: large page titles and project openings.
- `--type-title`: section headings.
- `--type-subtitle`: project card titles and emphasized subsections.
- `--type-body`: default reading text.
- `--type-caption`: metadata, labels, filters, and navigation details.

Hierarchy is created through scale, line-height, letter-spacing, and max-width rather than decorative styling.

## Spacing rules

Spacing is based on fluid tokens:

- `--space-2xs` and `--space-xs`: inline labels, captions, small metadata gaps.
- `--space-sm` and `--space-md`: component padding and grouped controls.
- `--space-lg` and `--space-xl`: section rhythm and editorial blocks.
- `--space-2xl`: page-level vertical breathing room.

Use `.flow` for vertical text rhythm and `.cluster` for wrapping horizontal groups such as filters, tags, and metadata.

## Minimal experimental aesthetic

The aesthetic stays minimal by default but introduces experimental structure through:

- asymmetric editorial column spans,
- horizontal browsing rails,
- oversized type scale,
- thin rule-based boundaries,
- rotated or compact metadata labels via `.meta-kicker`,
- restrained monochrome tokens that can later be replaced by a fuller visual identity.
