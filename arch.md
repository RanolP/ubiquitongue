# Ubiquitongue Data Management and Build Workflow

This document outlines the data management strategy for the Ubiquitongue project, focusing on how data is authored, stored, versioned, and used during the application build process. The primary goals are to maintain Git-friendly data versioning, leverage a powerful query engine (DuckDB) for data manipulation and reads, and use GraphQL as an interface for both writes (local development) and reads (build time).

## Core Principles

1.  **Single Source of Truth (SSOT) for Git:** Human-readable JSON or YAML files are the definitive, version-controlled source of all application data.
2.  **GraphQL for Data Interaction:** GraphQL serves as the API layer for both modifying data (during local development/admin tasks) and querying data (during the Astro build process).
3.  **DuckDB as a Query Engine:**
    *   A **persistent DuckDB file** (not committed to Git) acts as the primary target for data writes made via a local GraphQL server. This allows for SQL-based data manipulation and validation during authoring.
    *   An **in-memory DuckDB instance** is used during the build process. It's populated from the JSON/YAML SSOT files and shares the same schema as the persistent DuckDB, ensuring consistent query logic.
4.  **Git-Friendly Diffs:** All changes to the SSOT (JSON/YAML files) result in clear, text-based diffs in Git.
5.  **Reproducible Builds:** The Astro build process relies solely on the committed JSON/YAML SSOT files, ensuring that builds are reproducible from any point in the Git history.

## Data Components and Their Roles

1.  **JSON/YAML Files (e.g., `data/**/*.yaml`)**
    *   **Role:** The Single Source of Truth (SSOT).
    *   **Format:** YAML (preferred for readability) or JSON. Organized into directories by entity type (e.g., `data/semantics/`, `data/papers/`), with one file per data record.
    *   **Versioning:** Committed to Git. All data history and diffs are tracked here.
    *   **Generation:** These files are generated/updated by an "Export Script" that reads from the persistent DuckDB file. **They are not manually edited directly as the primary input method if using the GraphQL write flow.**
    *   **Usage:** Read by the build process to populate the in-memory DuckDB.

2.  **Persistent DuckDB File (e.g., `local_master_data.duckdb`)**
    *   **Role:** Primary write target during local development and data authoring.
    *   **Access:** Modified exclusively via a local "Write" GraphQL server.
    *   **Versioning:** **Explicitly listed in `.gitignore`**; NOT committed to Git. It's a local operational database.
    *   **Schema:** Its table schemas (defined in versioned `.sql` files) are the canonical representation of data structures.
    *   **Purpose:** Allows authors to use SQL power and GraphQL mutations for structured data input and validation. Acts as the source for generating the JSON/YAML SSOT.

3.  **In-Memory DuckDB Instance (Build Time)**
    *   **Role:** Ephemeral query engine used by the "Read" GraphQL server during the Astro build process.
    *   **Lifecycle:** Created at the start of the build, populated from the JSON/YAML SSOT files, and discarded after the build.
    *   **Schema:** Uses the exact same `CREATE TABLE` definitions as the persistent `local_master_data.duckdb` to ensure query logic consistency.

4.  **SQL Schema Files (e.g., `schemas/*.sql`)**
    *   **Role:** Define the `CREATE TABLE` statements for all entities.
    *   **Versioning:** Committed to Git.
    *   **Usage:** Used to set up the schema in both the persistent `local_master_data.duckdb` (when initialized or migrated) and the in-memory DuckDB instance during builds.

## Workflow Steps

### A. Local Development: Data Authoring & Modification (Write Path)

1.  **Start Local "Write" GraphQL Server:**
    *   This server (e.g., Node.js with Express/Apollo Server) connects to the persistent `local_master_data.duckdb`.
    *   Its GraphQL schema defines mutations (e.g., `createSemantic`, `updatePaper`) and potentially queries for authoring convenience.
    *   Mutation resolvers execute SQL (`INSERT`, `UPDATE`, `DELETE`) against `local_master_data.duckdb`.
2.  **Interact via GraphQL Client:**
    *   Use a local admin UI, CLI tool, or GraphQL IDE (e.g., Insomnia, Postman) to send mutations to the "Write" GraphQL server.
    *   Data is written to/modified in `local_master_data.duckdb`.

### B. Synchronization: Exporting DuckDB Data to JSON/YAML SSOT

1.  **Run Export Script (e.g., `node scripts/duckdb-to-json.js`):**
    *   This script is run manually by the developer *after* making data changes via the "Write" GraphQL server.
    *   **Connects** to `local_master_data.duckdb`.
    *   **Reads** data from all tables.
    *   **Generates/Updates/Deletes** JSON/YAML files in the `data/` directory to reflect the current state of `local_master_data.duckdb`. This includes creating new files, overwriting existing ones with changes, and deleting files for records no longer in the database.
2.  **Commit SSOT to Git:**
    *   Add the changed JSON/YAML files in the `data/` directory to Git staging (`git add data/`).
    *   Commit these changes with a descriptive message.
    *   The `local_master_data.duckdb` file remains untracked by Git.

### C. Application Build (Astro SSG - Local or CI)

1.  **Read JSON/YAML SSOT Files:**
    *   The build script (e.g., part of `astro build` orchestration or a preliminary Node.js script) reads all JSON/YAML files from the `data/` directory (which were committed to Git).
    *   Parses the content into JavaScript objects.
    *   (Recommended) Validates the parsed data using a schema validation library (e.g., Zod).
2.  **Populate In-Memory DuckDB:**
    *   An in-memory DuckDB instance is created.
    *   The **canonical SQL table schemas** (from versioned `.sql` files) are applied to this in-memory instance.
    *   The validated data from the JSON/YAML files is loaded into these tables.
3.  **Start Build-Time "Read" GraphQL Server:**
    *   This server connects to the in-memory DuckDB instance.
    *   Its GraphQL schema defines queries needed by Astro pages/components.
    *   Resolvers execute SQL queries against the in-memory DuckDB. **The SQL logic used here should be consistent with queries one might run against `local_master_data.duckdb` due to the shared schema.**
4.  **Run Astro Build (`astro build`):**
    *   Astro pages and components fetch data from the "Read" GraphQL server.
    *   Astro generates the static HTML, CSS, and JavaScript files.
5.  **Cleanup:** The in-memory DuckDB and the "Read" GraphQL server are shut down.

## Rationale for this Approach

*   **Git-Friendly SSOT:** Ensures all data changes are versioned transparently as text.
*   **Structured Writes:** GraphQL mutations provide a controlled API for data input, leveraging SQL power within DuckDB for persistence and validation during authoring.
*   **Consistent Query Logic:** By using the same SQL table schemas for both the persistent write DB and the in-memory build DB, the SQL used in GraphQL resolvers can be consistent, reducing logic duplication and potential for errors.
*   **Decoupling:**
    *   The data authoring process (GraphQL -> DuckDB) is decoupled from the build data source (JSON/YAML).
    *   The Astro build process is decoupled from the "live" state of the persistent DuckDB, relying instead on the committed SSOT.
*   **Developer Experience:** Authors can benefit from database features during data entry, while the project maintains a clean, text-based version history.

## Tooling Summary

*   **Data Files (SSOT):** YAML or JSON
*   **Persistent DB (Write Target, `.gitignored`):** DuckDB (`.duckdb` file)
*   **In-Memory DB (Build-Time Query Engine):** DuckDB
*   **SQL Schema Definition:** `.sql` files
*   **"Write" GraphQL Server:** Node.js (e.g., Express/Apollo Server/Mercurius) + `duckdb` driver
*   **"Export" Script:** Node.js + `duckdb` driver + YAML/JSON parsing/writing libraries
*   **"Read" GraphQL Server (Build Time):** Node.js + `duckdb` driver (in-memory) + YAML/JSON parsers
*   **Build System:** Astro
*   **UI Islands:** SolidJS
*   **Data Validation:** Zod (recommended)

This workflow requires discipline in running the export script but provides a robust separation of concerns and leverages the strengths of each tool for its intended purpose.
