import SchemaBuilder from '@pothos/core';
import { db } from './db.js';

const builder = new SchemaBuilder<{
  Context: { db: typeof db };
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
    createdAt: t.exposeInt('createdAt'),
    updatedAt: t.exposeInt('updatedAt'),
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
    createdAt: t.exposeInt('createdAt'),
    updatedAt: t.exposeInt('updatedAt'),
  }),
});

// Syntax type
const Syntax = builder.objectType('Syntax', {
  fields: (t) => ({
    id: t.exposeString('id'),
    typstString: t.exposeString('typstString'),
    latexString: t.exposeString('latexString', { nullable: true }),
    description: t.exposeString('description', { nullable: true }),
    createdAt: t.exposeInt('createdAt'),
    updatedAt: t.exposeInt('updatedAt'),
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
    createdAt: t.exposeInt('createdAt'),
    updatedAt: t.exposeInt('updatedAt'),
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

// Query type
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

// Mutation type
builder.mutationType({
  fields: (t) => ({
    createPaper: t.field({
      type: Paper,
      args: {
        title: t.arg.string({ required: true }),
        authors: t.arg.stringList({ required: true }),
        year: t.arg.int({ required: true }),
        doi: t.arg.string(),
        bibtex: t.arg.string({ required: true }),
      },
      resolve: (_, args, ctx) => ctx.db.papers.create(args),
    }),
    
    createSemantic: t.field({
      type: Semantic,
      args: {
        name: t.arg.string({ required: true }),
        description: t.arg.string({ required: true }),
        tags: t.arg.stringList({ defaultValue: [] }),
        aliases: t.arg.stringList({ defaultValue: [] }),
      },
      resolve: (_, args, ctx) => ctx.db.semantics.create(args),
    }),
    
    createSyntax: t.field({
      type: Syntax,
      args: {
        typstString: t.arg.string({ required: true }),
        latexString: t.arg.string(),
        description: t.arg.string(),
      },
      resolve: (_, args, ctx) => ctx.db.syntaxes.create(args),
    }),
    
    createUsage: t.field({
      type: Usage,
      args: {
        semanticId: t.arg.string({ required: true }),
        syntaxId: t.arg.string({ required: true }),
        paperId: t.arg.string({ required: true }),
        context: t.arg.string(),
        pageNumber: t.arg.string(),
        isPrimaryDefinition: t.arg.boolean({ defaultValue: false }),
      },
      resolve: (_, args, ctx) => ctx.db.usages.create(args),
    }),
  }),
});

export const buildSchema = () => builder.toSchema();