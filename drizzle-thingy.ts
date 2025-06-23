// src/db/schema.ts
import { relations } from 'drizzle-orm';
import {
  text,
  integer,
  blob,
  primaryKey,
  sqliteTable as table,
} from 'drizzle-orm/sqlite-core';
// Note: Even for DuckDB with Drizzle, you might start with 'sqlite-core' for general SQL types
// and Drizzle might handle DuckDB specifics via the driver.
// If a dedicated DuckDB dialect import exists in Drizzle (e.g., `drizzle-orm/duckdb-core`), use that.
// For now, using `sqliteTable` as a placeholder for generic SQL table definition.
// DuckDB specific types like LIST or STRUCT might need custom type handling or workarounds
// if not directly supported by the Drizzle DuckDB driver in a first-class way.
// We'll use JSON strings for arrays/structs as a common fallback.

// ----------
// Papers
// ----------
export const papers = table('papers', {
  id: text('id').primaryKey(), // e.g., a UUID or a Hayagriva-compatible key like 'pierce2002types'
  doi: text('doi').unique(),
  title: text('title').notNull(),
  // For authors, storing as a JSON string is a common approach if not normalizing further.
  // DuckDB can query JSON effectively.
  authorsJson: text('authors_json'), // JSON string: [{ name: "...", affiliation: "..." }, ...]
  year: integer('year'),
  publicationVenue: text('publication_venue'),
  // Store full bib data (e.g., CSL-JSON or BibTeX string) for completeness and potential re-parsing
  rawBibtex: text('raw_bibtex'),
  cslJson: text('csl_json'), // JSON string of CSL-JSON item
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).defaultNow(), // Drizzle can handle Date -> number
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).defaultNow(),
});

export const papersRelations = relations(papers, ({ many }) => ({
  usages: many(usages),
}));

// ----------
// Semantics (Concepts/Meanings)
// ----------
export const semantics = table('semantics', {
  id: text('id').primaryKey(), // e.g., UUID
  name: text('name').notNull().unique(), // Concise name like "Standard Deviation"
  description: text('description').notNull(), // Natural language detailed explanation
  // For tags and aliases, JSON strings are a common approach.
  domainTagsJson: text('domain_tags_json'), // JSON string: ["Statistics", "PLT"]
  aliasesJson: text('aliases_json'), // JSON string: ["Std Dev", "Sigma (concept)"]
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).defaultNow(),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).defaultNow(),
});

export const semanticsRelations = relations(semantics, ({ many }) => ({
  usages: many(usages),
}));

// ----------
// Syntaxes (Notations)
// ----------
export const syntaxes = table('syntaxes', {
  id: text('id').primaryKey(), // e.g., UUID
  typstString: text('typst_string').notNull().unique(), // The Typst notation string, e.g., "#sym.sigma"
  // LaTeX equivalent can be useful for display or search, but Typst is primary
  latexString: text('latex_string'),
  description: text('description'), // Optional brief note about the syntax itself
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).defaultNow(),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).defaultNow(),
});

export const syntaxesRelations = relations(syntaxes, ({ many }) => ({
  usages: many(usages),
}));

// ----------
// Usages (The link between Syntax, Semantic, and Paper)
// ----------
export const usages = table(
  'usages',
  {
    id: text('id').primaryKey(), // e.g., UUID
    paperId: text('paper_id')
      .notNull()
      .references(() => papers.id, { onDelete: 'cascade' }),
    semanticId: text('semantic_id')
      .notNull()
      .references(() => semantics.id, { onDelete: 'cascade' }),
    syntaxId: text('syntax_id')
      .notNull()
      .references(() => syntaxes.id, { onDelete: 'cascade' }),
    contextNotes: text('context_notes'), // Specific notes about this usage in the paper
    pageNumber: text('page_number'), // e.g., "34", "34-35", "Section 3.2"
    isPrimaryDefinition: integer('is_primary_definition', {
      mode: 'boolean',
    }).default(false), // Is this where the paper primarily defines/introduces this syntax for this semantic?
    // For future community features:
    // upvotes: integer('upvotes').default(0),
    // downvotes: integer('downvotes').default(0),
    // confidenceScore: real('confidence_score').default(0.5),
    createdAt: integer('created_at', { mode: 'timestamp_ms' }).defaultNow(),
    updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).defaultNow(),
  },
  (table) => ({
    // Optional: Add a composite unique constraint if a syntax can only mean one thing in one paper
    // (though a syntax might be used for multiple semantics if the paper is multidisciplinary or reuses symbols)
    // This might be too restrictive. The `isPrimaryDefinition` flag helps disambiguate.
    // pk: primaryKey(table.paperId, table.semanticId, table.syntaxId), // This would make the triple unique
  }),
);

export const usagesRelations = relations(usages, ({ one }) => ({
  paper: one(papers, {
    fields: [usages.paperId],
    references: [papers.id],
  }),
  semantic: one(semantics, {
    fields: [usages.semanticId],
    references: [semantics.id],
  }),
  syntax: one(syntaxes, {
    fields: [usages.syntaxId],
    references: [syntaxes.id],
  }),
}));

// Potentially other tables for users, contributions, issues, etc. in the future.
