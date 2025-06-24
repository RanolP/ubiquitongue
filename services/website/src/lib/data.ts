import { readFileSync } from 'fs';
import { join } from 'path';

// Read data directly from the data service
const dataDir = join(process.cwd(), '../data/data');

function readData<T>(file: string): T[] {
  try {
    return JSON.parse(readFileSync(join(dataDir, `${file}.json`), 'utf-8'));
  } catch {
    return [];
  }
}

export interface Paper {
  id: string;
  title: string;
  authors: string[];
  year: number;
  doi?: string;
  bibtex: string;
}

export interface Semantic {
  id: string;
  name: string;
  description: string;
  tags: string[];
  aliases: string[];
}

export interface Syntax {
  id: string;
  typstString: string;
  latexString?: string;
  description?: string;
}

export interface Usage {
  id: string;
  semanticId: string;
  syntaxId: string;
  paperId: string;
  context?: string;
  pageNumber?: string;
  isPrimaryDefinition: boolean;
}

export const data = {
  papers: readData<Paper>('papers'),
  semantics: readData<Semantic>('semantics'),
  syntaxes: readData<Syntax>('syntaxes'),
  usages: readData<Usage>('usages'),
};

export function getPaperById(id: string) {
  return data.papers.find(p => p.id === id);
}

export function getSemanticById(id: string) {
  return data.semantics.find(s => s.id === id);
}

export function getSyntaxById(id: string) {
  return data.syntaxes.find(s => s.id === id);
}

export function getUsagesBySemanticId(semanticId: string) {
  return data.usages.filter(u => u.semanticId === semanticId);
}

export function getUsagesBySyntaxId(syntaxId: string) {
  return data.usages.filter(u => u.syntaxId === syntaxId);
}

export function getUsagesByPaperId(paperId: string) {
  return data.usages.filter(u => u.paperId === paperId);
}