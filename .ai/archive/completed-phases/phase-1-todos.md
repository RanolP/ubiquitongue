---
id: phase-1-todos
created_at: 2025-06-23T00:00:00Z
updated_at: 2025-06-23T01:30:00Z
status: completed
type: todos
phase: 1
completed: 5
total: 5
completed_at: 2025-06-23T01:30:00Z
---

# Phase 1: Core Data Infrastructure Todos

## High Priority Tasks

### 1. Create Drizzle ORM Schemas ⏳
**Status**: Pending  
**Description**: Implement Drizzle ORM schemas for Papers, Semantics, Syntaxes, and Usages
**Location**: `services/data/src/db/schema.ts`
**Details**:
- Define TypeScript interfaces
- Create Drizzle table definitions
- Handle JSON fields for arrays/structs
- Add proper relations between tables

### 2. Setup Persistent DuckDB ⏳
**Status**: Pending  
**Description**: Configure DuckDB with migrations
**Details**:
- Install dependencies: `duckdb`, `drizzle-orm`, `drizzle-kit`
- Generate initial SQL migrations
- Create `local_master_data.duckdb`
- Update `.gitignore` to exclude database file

### 3. Develop Write GraphQL Server ⏳
**Status**: Pending  
**Description**: Pothos GraphQL server for data mutations
**Details**:
- Set up Express/Apollo Server
- Configure Pothos schema builder
- Implement CRUD mutations for all entities
- Connect to DuckDB via Drizzle ORM
- Add input validation

## Medium Priority Tasks

### 4. Implement Data Seeding ⏳
**Status**: Pending  
**Description**: Test the Write server with sample data
**Details**:
- Create GraphQL mutation scripts
- Add 2-3 examples per entity type
- Verify data persistence in DuckDB

## High Priority Tasks (Continued)

### 5. Develop Export Script ⏳
**Status**: Pending  
**Description**: Sync DuckDB to JSON files
**Location**: `scripts/export-to-json.ts`
**Details**:
- Connect to `local_master_data.duckdb`
- Read all tables and export to JSON
- Structure: `data/{entity-type}/{id}.json`
- Handle create/update/delete operations
- Add npm script command

## Checklist for Completion

- [ ] Data service directory created
- [ ] All dependencies installed
- [ ] Schemas defined and typed
- [ ] Database initialized with migrations
- [ ] GraphQL server running locally
- [ ] Sample data successfully inserted
- [ ] Export script generates JSON files
- [ ] JSON files match expected structure

## Next Phase Prerequisites
Before moving to Phase 2, ensure:
1. JSON SSOT files are being generated correctly
2. GraphQL Write server is stable
3. Data model supports all required fields
4. Export process is documented