# Portfolio navigation system concept

This portfolio is structured as a multi-page website with a horizontal navigation experience.

## Primary horizontal navigation

Every page includes the same horizontally scrollable navigation bar:

1. Home
2. About
3. Work
4. Archive
5. Contact

The nav supports a visual designer's portfolio browsing pattern by making the top-level sections persistent and easy to scan from left to right. On small screens, the navigation remains horizontal and scrollable instead of collapsing into a menu.

## Project index system

The Work page is the canonical project index. It lists five distinct projects in numbered order:

- Project 01 — T-Rex Communication System
- Project 02 — Oracle Glyph System
- Project 03 — AR / Interactive Typography
- Project 04 — Speculative Branding System
- Project 05 — Editorial / Visual Communication Project

Each project has a stable URL slug and appears in the same order on the Work page, project pages, and project pagination.

## Routing model

The site uses static HTML pages so it can be hosted on any static host. Each folder contains an `index.html` file, which creates clean URLs such as `/about/`, `/work/`, and `/work/project-01-t-rex-communication-system/`.

## Visual design status

This pass intentionally avoids visual design. The CSS only defines structural behavior: document flow, horizontal navigation, project index layout, and readable content scaffolding.
