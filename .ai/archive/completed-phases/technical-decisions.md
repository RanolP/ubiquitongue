---
id: technical-decisions
created_at: 2025-06-23T00:00:00Z
updated_at: 2025-06-23T00:00:00Z
status: active
type: plan
category: architecture
---

# Technical Decisions for Ubiquitongue

## Data Architecture

### Storage Strategy
- **Write Storage**: DuckDB (persistent, local file)
- **Version Control**: JSON files as Single Source of Truth
- **Build Storage**: In-memory DuckDB populated from JSON

### Why This Approach?
1. **Git-friendly**: JSON diffs are readable
2. **Powerful queries**: SQL capabilities during development
3. **Type safety**: Drizzle ORM provides TypeScript types
4. **Reproducible**: Builds depend only on committed JSON

## Technology Stack

### Backend
- **ORM**: Drizzle - Type-safe, supports DuckDB
- **GraphQL**: Pothos - Code-first schema with TypeScript
- **Database**: DuckDB - Embedded, analytical, powerful
- **Runtime**: Node.js for scripts and servers

### Frontend
- **SSG**: Astro - Fast builds, great DX
- **UI**: SolidJS - Reactive, lightweight islands
- **Styling**: UnoCSS - Atomic CSS, fast
- **Math**: typst.ts - Modern notation rendering

### Search
- **Indexing**: FlexSearch - Fast client-side search
- **Parsing**: Moo (lexer) + custom parser
- **Strategy**: Pre-built index, client-side execution

## Data Model Design

### Entities

```typescript
// Semantic: A mathematical/CS concept
{
  id: string;
  name: string;
  description: string;
  tags: string[];
  aliases: string[];
}

// Syntax: A notation/symbol
{
  id: string;
  typstString: string;
  latexString?: string;
  typstCanonical: string; // Normalized for search
}

// Paper: Academic reference
{
  id: string;
  title: string;
  authors: string[];
  year: number;
  doi?: string;
  bibtex: string; // Hayagriva format
}

// Usage: Links all three
{
  id: string;
  semanticId: string;
  syntaxId: string;
  paperId: string;
  context?: string;
  pageNumber?: number;
}
```

## Build Process

### Development Workflow
1. **Write**: GraphQL mutations → DuckDB
2. **Export**: DuckDB → JSON files
3. **Commit**: JSON files to Git

### Build Workflow
1. **Load**: JSON → In-memory DuckDB
2. **Serve**: GraphQL queries during build
3. **Generate**: Static HTML with data
4. **Index**: Create search index from data

## Deployment Strategy

### Hosting
- **Static Files**: GitHub Pages
- **CI/CD**: GitHub Actions
- **Domain**: Custom domain via CNAME

### Performance
- **Caching**: Leverage browser cache
- **CDN**: GitHub Pages CDN
- **Optimization**: Code splitting, minification

## Security Considerations

### Data Validation
- Input validation in GraphQL resolvers
- Schema validation when loading JSON
- Sanitization of user-provided content

### Access Control
- Write server is local-only (not deployed)
- Public site is read-only
- Contributions via GitHub issues

## Future Considerations

### Scalability
- JSON files scale well for thousands of entries
- Could migrate to external DB if needed
- Search index can be sharded if too large

### Extensibility
- Schema designed for additional fields
- GraphQL allows backward compatibility
- Plugin system for notation parsers

### Internationalization
- UTF-8 support throughout
- Structure supports multiple languages
- UI can be localized later