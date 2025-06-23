import fs from 'fs';
import path from 'path';

export interface Paper {
  id: string;
  title: string;
  authors: string[];
  year: number;
  bibtex: string;
  abstract?: string;
  createdAt: string;
  updatedAt: string;
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
  typstCanonical: string;
  latexString?: string;
  unicodeString?: string;
  
  // Usage information
  papers: {
    paperId: string;
    context?: string;
    pageNumber?: string;
    isPrimaryDefinition: boolean;
  }[];
  
  createdAt: string;
  updatedAt: string;
}

// Get the root data directory
const rootDir = path.join(process.cwd(), '..', '..', 'data');
const papersDir = path.join(rootDir, 'papers');
const notationsDir = path.join(rootDir, 'notations');

function readJsonFile<T>(filePath: string): T {
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

function loadAllFromDirectory<T>(dir: string, indexFile: string = '_index.json'): T[] {
  const items: T[] = [];
  
  // Read all files in directory
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    // Skip index file and non-JSON files
    if (file === indexFile || !file.endsWith('.json')) continue;
    
    const filePath = path.join(dir, file);
    const item = readJsonFile<T>(filePath);
    items.push(item);
  }
  
  return items;
}

// Load all data
export const data = {
  papers: loadAllFromDirectory<Paper>(papersDir),
  notations: loadAllFromDirectory<Notation>(notationsDir)
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

// Get all unique tags
export function getAllTags(): string[] {
  const tags = new Set<string>();
  data.notations.forEach(n => n.tags.forEach(tag => tags.add(tag)));
  return Array.from(tags).sort();
}