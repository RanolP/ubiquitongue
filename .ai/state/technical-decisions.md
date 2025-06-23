---
id: technical-decisions
created_at: 2025-06-24T03:45:00Z
updated_at: 2025-06-24T03:45:00Z
status: finalized
type: state
category: architecture
---

# Technical Decisions & Learnings

## Major Architecture Decisions

### 1. Data Storage Evolution

**Initial Approach**: DuckDB + Drizzle ORM
- Tried to use DuckDB for local database
- Complex setup with native modules
- User feedback: "don't you made this too overcomplicated? make it simple as stupid"

**Final Solution**: JSON Files
- Simple JSON files as source of truth
- Each notation/paper in its own file
- Located in root `/data` folder
- Benefits:
  - Simple to understand and edit
  - Great for version control
  - No build complexities
  - Easy collaboration

### 2. Data Model Unification

**Initial Model**: Separate semantics and syntaxes
- Had separate tables/entities
- Required complex joins
- Artificial separation

**Final Model**: Unified notations
- Single "notation" entity contains:
  - Semantic info (name, description, tags)
  - Syntax info (typst, latex, unicode)
  - Usage info (papers, context)
- Better reflects reality
- Simpler to query and display

### 3. Search Implementation

**Progressive Enhancement**:
1. Basic filtering in array
2. FlexSearch for performance
3. Moo parser for smart notation parsing

**Features**:
- Parse mathematical expressions: "a ∪ b" → "A union B"
- Canonical form matching
- Multi-field search

### 4. Deployment

**Platform**: GitHub Pages
- Static hosting
- Custom domain: ubqt.ranolp.dev
- GitHub Actions for CI/CD
- No server maintenance

## Technology Stack Rationale

### Core Framework: Astro
- Static site generation
- Island architecture for interactivity
- Great build performance
- SEO friendly

### UI Framework: SolidJS
- Lightweight reactive framework
- Great performance
- Works well with Astro islands

### Styling: UnoCSS
- Atomic CSS approach
- Fast build times
- Tailwind compatibility

### Math Rendering: typst.ts
- Modern math typesetting
- Browser-native (WASM)
- Better than MathJax/KaTeX for our needs

### Search: FlexSearch + Moo
- FlexSearch: Fast client-side search
- Moo: Lexer for parsing math notation
- No server required

## Key Learnings

1. **Simplicity Wins** - User was right about keeping it simple
2. **Unification is Natural** - Notations inherently combine meaning and form
3. **Static is Sufficient** - No need for complex server infrastructure
4. **Files are Features** - Individual files make great version control

## What NOT to Do

1. Don't add databases without clear need
2. Don't separate naturally coupled data
3. Don't overcomplicate the build process
4. Don't add dependencies without user approval