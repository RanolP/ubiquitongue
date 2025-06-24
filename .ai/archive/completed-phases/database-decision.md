---
id: database-decision
created_at: 2025-06-23T01:15:00Z
updated_at: 2025-06-23T01:15:00Z
status: active
type: state
category: architecture-decision
---

# Database Decision Point

## Current Situation
- Trying to use DuckDB via waddler package
- waddler depends on native duckdb module (C++ compilation required)
- Build issues preventing progress

## Options

### 1. Use @duckdb/duckdb-wasm directly
- Pure WebAssembly, no native compilation
- Works in Node.js and browser
- May be slower than native but sufficient for our use case

### 2. Use SQLite with better-sqlite3
- Well-supported by Drizzle
- Easy to set up
- Our schemas are already SQLite-style
- Can migrate to DuckDB later if needed

### 3. Use a simple JSON file approach
- Since we're exporting to JSON anyway
- Could skip the database during development
- Direct manipulation of JSON files

### 4. Fix the native duckdb build
- Time-consuming
- Platform-specific issues
- Not worth the complexity for this project

## Recommendation
Either use SQLite (option 2) or go directly to JSON files (option 3) since our end goal is JSON files in Git anyway.