---
id: implementation-plan
created_at: 2025-06-23T00:00:00Z
updated_at: 2025-06-23T00:00:00Z
status: in-progress
type: plan
phase: 1
estimated_completion: 2025-07-31T00:00:00Z
---

# Ubiquitongue Implementation Plan

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Development                            │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────┐   │
│  │   Write     │    │   DuckDB     │    │    JSON      │   │
│  │  GraphQL    │───▶│ (persistent) │───▶│    SSOT      │   │
│  │   Server    │    │.gitignored   │    │ (versioned)  │   │
│  └─────────────┘    └──────────────┘    └──────────────┘   │
└─────────────────────────────────────────────────────────────┘
                                                │
┌─────────────────────────────────────────────────────────────┐
│                         Build                 │              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │    JSON      │    │  In-Memory   │    │    Read      │  │
│  │    SSOT      │───▶│   DuckDB     │◀──│   GraphQL    │  │
│  │             │    │              │    │   Server     │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│                                                │             │
│                                          ┌──────────────┐    │
│                                          │    Astro     │    │
│                                          │    Build     │    │
│                                          └──────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## Phase 1: Core Data Infrastructure (Current Phase)

### Task 1: Drizzle ORM Schemas
- [ ] Create `services/data/src/db/schema.ts`
- [ ] Define tables: semantics, syntaxes, papers, usages
- [ ] Handle array/struct types appropriately
- [ ] Add proper TypeScript types

### Task 2: DuckDB Setup
- [ ] Install DuckDB and drizzle-kit dependencies
- [ ] Generate initial migrations
- [ ] Create `local_master_data.duckdb`
- [ ] Update `.gitignore`

### Task 3: Write GraphQL Server
- [ ] Set up Pothos GraphQL schema
- [ ] Implement CRUD mutations
- [ ] Connect Drizzle ORM to DuckDB
- [ ] Add validation logic

### Task 4: Data Seeding
- [ ] Create seed scripts
- [ ] Add sample data for each entity type
- [ ] Test GraphQL mutations

### Task 5: Export Script
- [ ] Create `scripts/export-to-json.ts`
- [ ] Read from DuckDB, write to JSON
- [ ] Handle deletions properly
- [ ] Add to npm scripts

## Phase 2: Build Infrastructure

### Astro Setup
- [ ] Configure workspaces in `pnpm-workspace.yaml`
- [ ] Add Astro + SolidJS to website service
- [ ] Configure TypeScript paths
- [ ] Set up UnoCSS

### Read GraphQL Server
- [ ] Create build-time server
- [ ] Load JSON into in-memory DuckDB
- [ ] Implement query resolvers
- [ ] Add to build pipeline

## Phase 3: Core UI Components

### Typst Integration
- [ ] Install typst.ts
- [ ] Create TypstPreview component
- [ ] Handle LaTeX conversion

### Display Components
- [ ] SemanticCard
- [ ] SyntaxDisplay
- [ ] PaperReference
- [ ] UsageContext

## Phase 4: Search & Discovery

### Search Index
- [ ] FlexSearch integration
- [ ] Index generation script
- [ ] Client-side loading

### Smart Parser
- [ ] Moo lexer setup
- [ ] Parsing rules
- [ ] Canonical form conversion

## Phase 5: Community Features

### Statistics
- [ ] Usage counting
- [ ] Ambiguity scoring
- [ ] Visualization components

### Contribution
- [ ] GitHub integration
- [ ] Issue templates
- [ ] Contribution docs

## Phase 6: Deployment

### CI/CD
- [ ] GitHub Actions workflow
- [ ] Build validation
- [ ] Auto-deployment

### Performance
- [ ] Code splitting
- [ ] Search optimization
- [ ] Asset optimization

## Timeline

- **Week 1-2**: Data Infrastructure (Phase 1)
- **Week 2-3**: Build Setup (Phase 2)
- **Week 3-4**: UI Components (Phase 3)
- **Week 4-5**: Search (Phase 4)
- **Week 5-6**: Community & Deploy (Phase 5-6)