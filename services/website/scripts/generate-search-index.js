import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '../data');
const publicDir = path.join(__dirname, '../public');

async function readJsonFile(filename) {
  const content = await fs.readFile(path.join(dataDir, filename), 'utf-8');
  return JSON.parse(content);
}

async function generateSearchIndices() {
  console.log('Generating search indices...');
  
  // Read all data
  const [semantics, syntaxes, papers] = await Promise.all([
    readJsonFile('semantics.json'),
    readJsonFile('syntaxes.json'),
    readJsonFile('papers.json')
  ]);

  // For now, let's create a simple searchable data structure
  // We'll implement FlexSearch on the client side instead
  const searchData = {
    semantics: semantics.map(s => ({
      id: s.id,
      name: s.name,
      description: s.description,
      tags: s.tags,
      aliases: s.aliases,
      searchText: [
        s.name,
        s.description,
        ...s.tags,
        ...s.aliases
      ].join(' ').toLowerCase()
    })),
    syntaxes: syntaxes.map(s => ({
      id: s.id,
      typstString: s.typstString,
      typstCanonical: s.typstCanonical,
      description: s.description || '',
      latexString: s.latexString || '',
      searchText: [
        s.typstString,
        s.typstCanonical,
        s.description || '',
        s.latexString || ''
      ].join(' ').toLowerCase()
    })),
    papers: papers.map(p => ({
      id: p.id,
      title: p.title,
      authors: p.authors,
      year: p.year,
      abstract: p.abstract || '',
      searchText: [
        p.title,
        ...p.authors,
        p.abstract || ''
      ].join(' ').toLowerCase()
    }))
  };


  // Ensure public directory exists
  await fs.mkdir(publicDir, { recursive: true });

  // Write search data
  await fs.writeFile(
    path.join(publicDir, 'search-data.json'),
    JSON.stringify(searchData, null, 2)
  );

  console.log(`Indexed ${semantics.length} semantics, ${syntaxes.length} syntaxes, ${papers.length} papers`);

  console.log('Search indices generated successfully!');
}

// Run generation
generateSearchIndices().catch(console.error);