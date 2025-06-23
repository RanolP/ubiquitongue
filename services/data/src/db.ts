import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { nanoid } from 'nanoid';

// Simple JSON file database
const dataDir = './data';
const dataFiles = {
  papers: join(dataDir, 'papers.json'),
  semantics: join(dataDir, 'semantics.json'),
  syntaxes: join(dataDir, 'syntaxes.json'),
  usages: join(dataDir, 'usages.json'),
};

// Ensure data directory exists
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

// Initialize files if they don't exist
for (const file of Object.values(dataFiles)) {
  if (!existsSync(file)) {
    writeFileSync(file, '[]');
  }
}

// Simple CRUD operations
function readData<T>(type: keyof typeof dataFiles): T[] {
  return JSON.parse(readFileSync(dataFiles[type], 'utf-8'));
}

function writeData<T>(type: keyof typeof dataFiles, data: T[]): void {
  writeFileSync(dataFiles[type], JSON.stringify(data, null, 2));
}

export const db = {
  // Papers
  papers: {
    findMany: () => readData<any>('papers'),
    findById: (id: string) => readData<any>('papers').find(p => p.id === id),
    create: (data: any) => {
      const papers = readData<any>('papers');
      const paper = { ...data, id: nanoid(), createdAt: Date.now(), updatedAt: Date.now() };
      papers.push(paper);
      writeData('papers', papers);
      return paper;
    },
    update: (id: string, data: any) => {
      const papers = readData<any>('papers');
      const index = papers.findIndex(p => p.id === id);
      if (index === -1) throw new Error('Paper not found');
      papers[index] = { ...papers[index], ...data, updatedAt: Date.now() };
      writeData('papers', papers);
      return papers[index];
    },
    delete: (id: string) => {
      const papers = readData<any>('papers');
      const filtered = papers.filter(p => p.id !== id);
      writeData('papers', filtered);
      return true;
    }
  },
  
  // Semantics
  semantics: {
    findMany: () => readData<any>('semantics'),
    findById: (id: string) => readData<any>('semantics').find(s => s.id === id),
    create: (data: any) => {
      const semantics = readData<any>('semantics');
      const semantic = { ...data, id: nanoid(), createdAt: Date.now(), updatedAt: Date.now() };
      semantics.push(semantic);
      writeData('semantics', semantics);
      return semantic;
    },
    update: (id: string, data: any) => {
      const semantics = readData<any>('semantics');
      const index = semantics.findIndex(s => s.id === id);
      if (index === -1) throw new Error('Semantic not found');
      semantics[index] = { ...semantics[index], ...data, updatedAt: Date.now() };
      writeData('semantics', semantics);
      return semantics[index];
    },
    delete: (id: string) => {
      const semantics = readData<any>('semantics');
      const filtered = semantics.filter(s => s.id !== id);
      writeData('semantics', filtered);
      return true;
    }
  },
  
  // Syntaxes
  syntaxes: {
    findMany: () => readData<any>('syntaxes'),
    findById: (id: string) => readData<any>('syntaxes').find(s => s.id === id),
    create: (data: any) => {
      const syntaxes = readData<any>('syntaxes');
      const syntax = { ...data, id: nanoid(), createdAt: Date.now(), updatedAt: Date.now() };
      syntaxes.push(syntax);
      writeData('syntaxes', syntaxes);
      return syntax;
    },
    update: (id: string, data: any) => {
      const syntaxes = readData<any>('syntaxes');
      const index = syntaxes.findIndex(s => s.id === id);
      if (index === -1) throw new Error('Syntax not found');
      syntaxes[index] = { ...syntaxes[index], ...data, updatedAt: Date.now() };
      writeData('syntaxes', syntaxes);
      return syntaxes[index];
    },
    delete: (id: string) => {
      const syntaxes = readData<any>('syntaxes');
      const filtered = syntaxes.filter(s => s.id !== id);
      writeData('syntaxes', filtered);
      return true;
    }
  },
  
  // Usages
  usages: {
    findMany: () => readData<any>('usages'),
    findById: (id: string) => readData<any>('usages').find(u => u.id === id),
    findBySemantic: (semanticId: string) => readData<any>('usages').filter(u => u.semanticId === semanticId),
    findBySyntax: (syntaxId: string) => readData<any>('usages').filter(u => u.syntaxId === syntaxId),
    findByPaper: (paperId: string) => readData<any>('usages').filter(u => u.paperId === paperId),
    create: (data: any) => {
      const usages = readData<any>('usages');
      const usage = { ...data, id: nanoid(), createdAt: Date.now(), updatedAt: Date.now() };
      usages.push(usage);
      writeData('usages', usages);
      return usage;
    },
    update: (id: string, data: any) => {
      const usages = readData<any>('usages');
      const index = usages.findIndex(u => u.id === id);
      if (index === -1) throw new Error('Usage not found');
      usages[index] = { ...usages[index], ...data, updatedAt: Date.now() };
      writeData('usages', usages);
      return usages[index];
    },
    delete: (id: string) => {
      const usages = readData<any>('usages');
      const filtered = usages.filter(u => u.id !== id);
      writeData('usages', filtered);
      return true;
    }
  }
};