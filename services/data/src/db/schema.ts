import { relations } from 'drizzle-orm';
import {
  text,
  integer,
  primaryKey,
  sqliteTable as table,
} from 'drizzle-orm/sqlite-core';

// ----------
// Papers
// ----------
export const papers = table('papers', {
  id: text('id').primaryKey(), // e.g., a UUID or a Hayagriva-compatible key like 'pierce2002types'
  doi: text('doi').unique(),
  title: text('title').notNull(),
  // For authors, storing as a JSON string
  authorsJson: text('authors_json'), // JSON string: [{ name: "...", affiliation: "..." }, ...]
  year: integer('year'),
  publicationVenue: text('publication_venue'),
  // Store full bib data (e.g., CSL-JSON or BibTeX string)
  rawBibtex: text('raw_bibtex'),
  cslJson: text('csl_json'), // JSON string of CSL-JSON item
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull().default(Date.now()),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull().default(Date.now()),
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
  // For tags and aliases, JSON strings
  domainTagsJson: text('domain_tags_json'), // JSON string: ["Statistics", "PLT"]
  aliasesJson: text('aliases_json'), // JSON string: ["Std Dev", "Sigma (concept)"]
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull().default(Date.now()),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull().default(Date.now()),
});

export const semanticsRelations = relations(semantics, ({ many }) => ({
  usages: many(usages),
}));

// ----------
// Syntaxes (Notations)
// ----------
export const syntaxes = table('syntaxes', {
  id: text('id').primaryKey(), // e.g., UUID
  typstString: text('typst_string').notNull().unique(), // The Typst notation string
  // LaTeX equivalent can be useful for display or search
  latexString: text('latex_string'),
  // Canonical form for search
  typstCanonical: text('typst_canonical').notNull(),
  description: text('description'), // Optional brief note about the syntax
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull().default(Date.now()),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull().default(Date.now()),
});

export const syntaxesRelations = relations(syntaxes, ({ many }) => ({
  usages: many(usages),
}));

// ----------
// Usages (The link between Syntax, Semantic, and Paper)
// ----------
export const usages = table('usages', {
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
  }).default(false), // Is this where the paper primarily defines this syntax?
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull().default(Date.now()),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull().default(Date.now()),
});

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

// Type exports for use in application code
export type Paper = typeof papers.$inferSelect;
export type NewPaper = typeof papers.$inferInsert;

export type Semantic = typeof semantics.$inferSelect;
export type NewSemantic = typeof semantics.$inferInsert;

export type Syntax = typeof syntaxes.$inferSelect;
export type NewSyntax = typeof syntaxes.$inferInsert;

export type Usage = typeof usages.$inferSelect;
export type NewUsage = typeof usages.$inferInsert;