import fs from 'fs';
import path from 'path';

export interface Paper {
  id: string;
  title: string;
  authors: string[];
  year: number;
  bibtex: string;
  abstract?: string;
}

export interface Notation {
  id: string;
  // Semantic information
  name: string;
  description: string;
  tags: string[];
  aliases: string[];
  
  // Syntax information
  typstString: string;
  latexString?: string;
  unicodeString?: string;
  
  // Usage information
  papers: {
    paperId: string;
    context?: string;
    pageNumber?: string;
    isPrimaryDefinition: boolean;
  }[];
  
  createdAt: number;
  updatedAt: number;
}

const dataDir = path.join(process.cwd(), 'data');

function readJsonFile<T>(filename: string): T {
  const filePath = path.join(dataDir, `${filename}.json`);
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

export const data = {
  papers: readJsonFile<Paper[]>('papers'),
  notations: readJsonFile<Notation[]>('notations')
};

// Helper functions
export function getNotationById(id: string): Notation | undefined {
  return data.notations.find(n => n.id === id);
}

export function getPaperById(id: string): Paper | undefined {
  return data.papers.find(p => p.id === id);
}

export function getNotationsByPaperId(paperId: string): Notation[] {
  return data.notations.filter(n => 
    n.papers.some(p => p.paperId === paperId)
  );
}

export function getNotationsByTag(tag: string): Notation[] {
  return data.notations.filter(n => n.tags.includes(tag));
}