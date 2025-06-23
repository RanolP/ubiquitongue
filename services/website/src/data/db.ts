import { readFileSync } from 'fs';
import { join } from 'path';

// Read-only database interface
export function createDb(dataDir: string) {
  const dataFiles = {
    papers: join(dataDir, 'papers.json'),
    semantics: join(dataDir, 'semantics.json'),
    syntaxes: join(dataDir, 'syntaxes.json'),
    usages: join(dataDir, 'usages.json'),
  };

  function readData<T>(type: keyof typeof dataFiles): T[] {
    try {
      return JSON.parse(readFileSync(dataFiles[type], 'utf-8'));
    } catch {
      return [];
    }
  }

  return {
    papers: {
      findMany: () => readData<any>('papers'),
      findById: (id: string) => readData<any>('papers').find(p => p.id === id),
    },
    semantics: {
      findMany: () => readData<any>('semantics'),
      findById: (id: string) => readData<any>('semantics').find(s => s.id === id),
    },
    syntaxes: {
      findMany: () => readData<any>('syntaxes'),
      findById: (id: string) => readData<any>('syntaxes').find(s => s.id === id),
    },
    usages: {
      findMany: () => readData<any>('usages'),
      findById: (id: string) => readData<any>('usages').find(u => u.id === id),
      findBySemantic: (semanticId: string) => readData<any>('usages').filter(u => u.semanticId === semanticId),
      findBySyntax: (syntaxId: string) => readData<any>('usages').filter(u => u.syntaxId === syntaxId),
      findByPaper: (paperId: string) => readData<any>('usages').filter(u => u.paperId === paperId),
    }
  };
}