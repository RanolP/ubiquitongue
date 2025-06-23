import SchemaBuilder from '@pothos/core';

const builder = new SchemaBuilder<{
  Context: { db: any };
}>({});

// Paper type
const Paper = builder.objectType('Paper', {
  fields: (t) => ({
    id: t.exposeString('id'),
    title: t.exposeString('title'),
    authors: t.exposeStringList('authors'),
    year: t.exposeInt('year'),
    doi: t.exposeString('doi', { nullable: true }),
    bibtex: t.exposeString('bibtex'),
  }),
});

// Semantic type
const Semantic = builder.objectType('Semantic', {
  fields: (t) => ({
    id: t.exposeString('id'),
    name: t.exposeString('name'),
    description: t.exposeString('description'),
    tags: t.exposeStringList('tags'),
    aliases: t.exposeStringList('aliases'),
  }),
});

// Syntax type
const Syntax = builder.objectType('Syntax', {
  fields: (t) => ({
    id: t.exposeString('id'),
    typstString: t.exposeString('typstString'),
    latexString: t.exposeString('latexString', { nullable: true }),
    typstCanonical: t.exposeString('typstCanonical'),
    description: t.exposeString('description', { nullable: true }),
  }),
});

// Usage type
const Usage = builder.objectType('Usage', {
  fields: (t) => ({
    id: t.exposeString('id'),
    semanticId: t.exposeString('semanticId'),
    syntaxId: t.exposeString('syntaxId'),
    paperId: t.exposeString('paperId'),
    context: t.exposeString('context', { nullable: true }),
    pageNumber: t.exposeString('pageNumber', { nullable: true }),
    isPrimaryDefinition: t.exposeBoolean('isPrimaryDefinition'),
    // Relations
    semantic: t.field({
      type: Semantic,
      nullable: true,
      resolve: (usage, _, ctx) => ctx.db.semantics.findById(usage.semanticId),
    }),
    syntax: t.field({
      type: Syntax,
      nullable: true,
      resolve: (usage, _, ctx) => ctx.db.syntaxes.findById(usage.syntaxId),
    }),
    paper: t.field({
      type: Paper,
      nullable: true,
      resolve: (usage, _, ctx) => ctx.db.papers.findById(usage.paperId),
    }),
  }),
});

// Query type (read-only)
builder.queryType({
  fields: (t) => ({
    papers: t.field({
      type: [Paper],
      resolve: (_, __, ctx) => ctx.db.papers.findMany(),
    }),
    paper: t.field({
      type: Paper,
      nullable: true,
      args: {
        id: t.arg.string({ required: true }),
      },
      resolve: (_, args, ctx) => ctx.db.papers.findById(args.id),
    }),
    
    semantics: t.field({
      type: [Semantic],
      resolve: (_, __, ctx) => ctx.db.semantics.findMany(),
    }),
    semantic: t.field({
      type: Semantic,
      nullable: true,
      args: {
        id: t.arg.string({ required: true }),
      },
      resolve: (_, args, ctx) => ctx.db.semantics.findById(args.id),
    }),
    
    syntaxes: t.field({
      type: [Syntax],
      resolve: (_, __, ctx) => ctx.db.syntaxes.findMany(),
    }),
    syntax: t.field({
      type: Syntax,
      nullable: true,
      args: {
        id: t.arg.string({ required: true }),
      },
      resolve: (_, args, ctx) => ctx.db.syntaxes.findById(args.id),
    }),
    
    usages: t.field({
      type: [Usage],
      resolve: (_, __, ctx) => ctx.db.usages.findMany(),
    }),
    usage: t.field({
      type: Usage,
      nullable: true,
      args: {
        id: t.arg.string({ required: true }),
      },
      resolve: (_, args, ctx) => ctx.db.usages.findById(args.id),
    }),
  }),
});

export const buildSchema = () => builder.toSchema();