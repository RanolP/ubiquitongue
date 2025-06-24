---
id: claude-instructions
created_at: 2025-06-23T00:00:00Z
updated_at: 2025-06-24T03:30:00Z
type: instructions
priority: critical
---

# CLAUDE.md - Critical Instructions

## Core Directives

1. **The .ai folder is your knowledge base** - It's your second brain. You MUST keep it updated.
2. **Always update .ai when making significant changes** - Document goals, plans, state, and todos.
3. **Remember key decisions** - All architectural and design decisions must be documented.

## Project Principles

### Data Model
- **Notations are unified** - Semantics (meaning) and syntaxes (representation) are NOT separate. They are one entity called "notation".
- **Data lives in root /data folder** - Each notation and paper has its own file for better version control.

### Technical Decisions
- **Keep it simple** - Don't overcomplicate. The user explicitly said "make it simple as stupid" when we were overengineering with DuckDB.
- **Use the decided stack** - Don't try to add new technologies without explicit approval.
- **The file name should be consistently kebab-case** - Maintain naming consistency across the project.

### Domain
- **ubqt.ranolp.dev** - Custom domain, no base path needed.

## What to Remember

1. **Unified Data Model** - Notations combine both meaning and representation
2. **Separated Files** - Data stored as individual JSON files in /data
3. **Smart Search** - Implemented with FlexSearch and moo parser for mathematical notation
4. **Static Site** - Astro with SolidJS islands, deployed to GitHub Pages

## Current Stack

- **Monorepo**: pnpm workspaces + Turbo
- **Static Site**: Astro + SolidJS
- **Styling**: UnoCSS
- **Math Rendering**: typst.ts
- **Search**: FlexSearch + moo parser
- **Data**: JSON files in /data folder
- **Deployment**: GitHub Pages with custom domain

## Key Learnings

1. User prefers simplicity over complexity
2. Data unification reflects reality better (notation = meaning + syntax)
3. Separate files are better for collaboration
4. The .ai folder must be kept updated as the project's memory