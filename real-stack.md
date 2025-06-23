- Astro
- typst.ts
- solid-js
- unocss
- lunr 
- Relay
- drizzle-orm
- DuckDB

# Ubiquitongue Tech Stack - Brief Summary (with FlexSearch)

*   **Frontend & SSG:** Astro builds the static site; SolidJS powers interactive UI islands.
*   **SSOT (Git):** JSON files, versioned in Git, are the single source of truth.
*   **Primary Write DB (Local, `.gitignored`):** A persistent DuckDB file, modified via a local "Write" GraphQL server.
*   **Data Sync to SSOT:** A Node.js script exports data from the persistent DuckDB to the JSON SSOT files for Git commit.
*   **"Write" GraphQL Server (Local Dev):** Pothos (schema) and Drizzle ORM (type-safe SQL to DuckDB); Relay client for Admin UI if React, else `graphql-request`.
*   **Smart Input Parser (Client-Side):** Custom logic (e.g., using `moo` for lexing + `Nearley.js`/`Peggy` or rules for parsing) converts user search input into canonical/slotted query terms.
*   **Client-Side Indexed Search:** **FlexSearch** is used to:
    *   Index fields like `typstStringCanonical`, `semanticName`, and `description` from a pre-built index generated from the JSON SSOT.
    *   Perform **exact matches** on `typstStringCanonical` using canonical terms from the Smart Input Parser.
    *   Execute flexible, full-text search on descriptive fields.
*   **Build-Time "Read" GraphQL Server (for Astro):** Pothos & Drizzle query an in-memory DuckDB (populated from JSON SSOT) to serve Astro's build process.
*   **Astro Data Fetching (Build):** Uses `graphql-request` to query the "Read" GraphQL server.
*   **Core Tech:** DuckDB schema via Drizzle (TypeScript), `typst.ts` for math, GitHub Pages/Actions.
