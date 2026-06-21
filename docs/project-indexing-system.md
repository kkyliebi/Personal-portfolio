# Project indexing system

## JSON source

Project data lives in `data/projects.json`. It is organized around two ideas:

- `readingOrder`: the intended narrative sequence from Project 01 through Project 05.
- `projects`: random-access project records with metadata, routes, tags, and previous/next relationships.

Each project record includes:

- `id`: stable internal identifier.
- `index`: visible portfolio number.
- `title`: project title.
- `year`: project year.
- `type`: project category.
- `medium`: one or more materials, platforms, or formats.
- `concept`: one-sentence conceptual framing.
- `route`: static page URL.
- `tags`: filter vocabulary.
- `previous` / `next`: narrative reading controls.

## Index UI concept

The Work page should behave as a project control surface, not a finished visual design.

### 1. Narrative reading order

A numbered ordered list presents Project 01 through Project 05. This creates a guided path for readers who want to experience the portfolio as a sequence.

### 2. Random access

A compact jump list exposes every project route directly. Visitors can enter any project without moving through the narrative sequence.

### 3. Metadata scanning

Each project item displays year, type, medium, and concept so visitors can compare projects before opening a case study.

### 4. Filter groups

Filter groups are represented as linkable concepts for now:

- Year: 2026, 2025, 2024
- Type: Speculative system, Symbol system, Interactive typography, Brand identity, Editorial design
- Medium: Interface, Sound, Motion, Glyphs, Print, Digital, AR, Typography, Spatial interaction, Identity, Guidelines, Publication, Image sequencing

A later enhancement can turn these filter groups into client-side controls powered by the same JSON source.
