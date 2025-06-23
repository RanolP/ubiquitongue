---
id: current-state-2025-06-24
created_at: 2025-06-24T03:35:00Z
updated_at: 2025-06-24T03:35:00Z
status: active
type: state
project_phase: 5
---

# Ubiquitongue Current State - June 24, 2025

## Project Status: Live and Deployed

The project is now live at https://ubqt.ranolp.dev

## Completed Phases

### Phase 1: Data Infrastructure ✅
- Started with complex DuckDB approach
- User feedback: "don't you made this too overcomplicated? make it simple as stupid"
- Simplified to JSON file-based storage
- Final structure: Individual JSON files in root /data folder

### Phase 2: Build Infrastructure ✅
- Astro static site generator
- SolidJS for interactive components
- UnoCSS for styling
- Simple build pipeline

### Phase 3: Core UI Components ✅
- Typst.ts integration for math rendering
- Unified notation display (combines semantics + syntax)
- Paper listing with notation usage

### Phase 4: Deployment ✅
- GitHub Pages deployment
- Custom domain: ubqt.ranolp.dev
- Automated CI/CD with GitHub Actions

### Phase 5: Enhanced Features ✅
- FlexSearch integration for fast searching
- Smart notation parser with moo lexer
- Unified data model (notations = semantics + syntaxes)
- Separated file storage for better version control

## Current Architecture

```
ubiquitongue/
├── data/                    # Root data directory (source of truth)
│   ├── notations/          # Individual notation files
│   │   ├── type-judgment.json
│   │   ├── lambda-abstraction.json
│   │   └── ...
│   └── papers/             # Individual paper files
│       ├── pierce-2002-types.json
│       └── ...
├── services/
│   ├── website/            # Astro static site
│   └── data/               # Data management scripts
└── .ai/                    # Knowledge base (Claude's memory)
```

## Key Features Implemented

1. **Unified Notations** - Each notation contains:
   - Semantic info (name, description, tags)
   - Syntax info (typst, latex, unicode)
   - Usage info (which papers use it)

2. **Smart Search** - Can search by:
   - Natural language (e.g., "union")
   - Mathematical notation (e.g., "a ∪ b")
   - Parsed canonical forms

3. **Static Generation** - Fast, SEO-friendly, no server needed

4. **Version Control Friendly** - Each notation/paper in its own file

## Technology Stack

- **Framework**: Astro (static site generator)
- **UI**: SolidJS (reactive components)
- **Styling**: UnoCSS (atomic CSS)
- **Math**: typst.ts (mathematical notation rendering)
- **Search**: FlexSearch (client-side search) + moo (notation parser)
- **Data**: JSON files (simple, version-controlled)
- **Build**: pnpm workspaces + Turbo
- **Deploy**: GitHub Pages + GitHub Actions

## Recent Major Changes

1. **Unified Data Model** (June 24)
   - Combined semantics and syntaxes into single "notation" entities
   - Better reflects reality: a symbol without meaning is incomplete

2. **Separated File Storage** (June 24)
   - Moved from single JSON files to individual files
   - Better for collaboration and version control

3. **Custom Domain** (June 24)
   - Configured ubqt.ranolp.dev
   - Removed base path complexity

## Next Potential Features

- GraphQL write server for easier contributions
- Statistics and analytics (most used, most ambiguous notations)
- Contribution workflow (GitHub integration)
- More comprehensive notation database
- Community features