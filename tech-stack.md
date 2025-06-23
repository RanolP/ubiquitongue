# Ubiquitongue Tech Stack Summary

This outlines the technology stack for Ubiquitongue, an SSG (Static Site Generated) website hosted on GitHub Pages. It features a Gatsby-like GraphQL data layer for local database querying at build time and uses SolidJS for interactive UI components.

## Core Components

1.  **Static Site Generator (SSG) / Main Framework:**
    *   **Tool:** Astro
    *   **Role:** Overall page structure, routing, static HTML generation, managing UI islands. Consumes data from the build-time GraphQL server.
    *   **Files:** `.astro` files for templating, `getStaticPaths` for dynamic route generation.

2.  **Interactive UI Components (Astro Islands):**
    *   **Library:** SolidJS
    *   **Integration:** Via `@astrojs/solid-js` Astro integration.
    *   **Role:** Building interactive UI elements such as the Typst notation editor, search interface, and other dynamic parts. These components receive pre-fetched data (via GraphQL by Astro at build time) as props.

3.  **Local Database:**
    *   **Type:** DuckDB or SQLite
    *   **Role:** Primary storage for notation data, semantic meanings, paper links, and other core content.
    *   **Management:** Stored as a local file (e.g., `data.duckdb`, `data.sqlite`) within the project repository.

4.  **Build-Time GraphQL Abstraction Layer (Custom Implementation):**
    *   **Purpose:** To provide a Gatsby-like GraphQL API over the local database, accessible only during the Astro build process.
    *   **Runtime Environment:** Node.js
    *   **Database Drivers:**
        *   `duckdb` (npm package) for DuckDB.
        *   `sqlite3` (npm package) for SQLite.
    *   **GraphQL Schema Definition & Execution:**
        *   `graphql` (npm package, also known as `graphql-js`): Core library for creating schemas, parsing, and executing GraphQL queries.
        *   `@graphql-tools/schema` (npm package): For schema-first development (defining schema in GraphQL Schema Definition Language - SDL).
    *   **Temporary GraphQL Server (Build Time Only):**
        *   **Frameworks:** Lightweight HTTP server like `express` or `fastify`.
        *   **Middleware:** `express-graphql` (for Express) or `mercurius` (for Fastify).
        *   **Operation:** Runs locally during `astro build`, serves GraphQL queries from Astro, and is then shut down.
    *   **SQL Query Construction (within Resolvers):**
        *   Direct SQL strings.
        *   Optional: SQL query builder like `knex.js` for complex queries.

5.  **Relay (Optional - Primarily for Compiler Benefits in SSG):**
    *   **Compiler:** `relay-compiler` (npm package).
    *   **Babel Plugin:** `babel-plugin-relay` (npm package).
    *   **Role with SolidJS (SSG Focus):**
        *   Primarily used for its compiler benefits: type generation from GraphQL fragments/queries, and fragment co-location for better component data definitions.
        *   Full Relay runtime (hooks like `useFragment`, `useLazyLoadQuery`) integration with SolidJS is complex due to lack of official bindings. For SSG, data fetched by Astro satisfying these fragments would be passed as props to SolidJS components.

6.  **Math Notation Rendering (`typst.ts`):**
    *   **Type:** Client-Side JavaScript Library.
    *   **Integration:** Embedded within the SolidJS editor component (Astro Island) to provide real-time previews of Typst math notation.

7.  **Client-Side Search (Initial Implementation for Pure SSG):**
    *   **Libraries:** Lunr.js, Fuse.js, or FlexSearch.
    *   **Process:**
        1.  Astro build generates a JSON search index from data fetched via the build-time GraphQL layer.
        2.  Client-side JavaScript (potentially within a SolidJS component) fetches and uses this index to perform searches directly in the browser.

8.  **Styling:**
    *   **Frameworks/Approaches:**
        *   Utility-first CSS (e.g., Tailwind CSS, UnoCSS).
        *   CSS Modules (supported by SolidJS).
        *   Scoped styles within SolidJS components.

9.  **Version Control:**
    *   **System:** Git
    *   **Hosting:** GitHub

10. **Build Automation & Hosting:**
    *   **CI/CD:** GitHub Actions
        *   **Workflow:**
            1.  Script starts the custom build-time GraphQL server.
            2.  (If using Relay) `relay-compiler` runs.
            3.  `astro build` executes (Astro fetches data from the local GraphQL server).
            4.  Script stops the build-time GraphQL server.
            5.  Generated static files (from Astro's `dist` folder) are deployed.
    *   **Website Hosting:** GitHub Pages

## Development Workflow Overview

1.  **Data Management:** Update the local DuckDB/SQLite database file.
2.  **GraphQL Layer:** Define/update the GraphQL schema (SDL) and implement/update Node.js resolvers that query the database.
3.  **UI Development (Astro & SolidJS):**
    *   In `.astro` files, write GraphQL queries (as strings) to `fetch` from the (to-be-running) local build-time GraphQL server.
    *   Develop SolidJS island components to display data and handle user interactions. Optionally define Relay fragments for data structure and type generation.
4.  **Build & Deployment:** Triggered by pushes to GitHub, orchestrated by GitHub Actions.
