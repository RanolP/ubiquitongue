import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDataDir = path.join(__dirname, '../../../data');
const publicDir = path.join(__dirname, '../public');

async function readJsonFile(filePath) {
  const content = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(content);
}

async function loadAllFromDirectory(dir) {
  const items = [];
  const files = await fs.readdir(dir);
  
  for (const file of files) {
    // Skip index file and non-JSON files
    if (file === '_index.json' || !file.endsWith('.json')) continue;
    
    const filePath = path.join(dir, file);
    const item = await readJsonFile(filePath);
    items.push(item);
  }
  
  return items;
}

async function generateSearchFromSeparated() {
  console.log('Generating search indices from separated files...');
  
  // Load all data from separated files
  const [notations, papers] = await Promise.all([
    loadAllFromDirectory(path.join(rootDataDir, 'notations')),
    loadAllFromDirectory(path.join(rootDataDir, 'papers'))
  ]);

  // Create searchable data structure
  const searchData = {
    notations: notations.map(n => ({
      id: n.id,
      name: n.name,
      description: n.description,
      tags: n.tags,
      aliases: n.aliases,
      typstString: n.typstString,
      typstCanonical: n.typstCanonical,
      latexString: n.latexString || '',
      unicodeString: n.unicodeString || '',
      searchText: [
        n.name,
        n.description,
        ...n.tags,
        ...n.aliases,
        n.typstString,
        n.typstCanonical,
        n.latexString || '',
        n.unicodeString || ''
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
    path.join(publicDir, 'unified-search-data.json'),
    JSON.stringify(searchData, null, 2)
  );

  console.log(`Indexed ${notations.length} notations and ${papers.length} papers`);
  console.log('Search indices generated successfully!');
}

// Run generation
generateSearchFromSeparated().catch(console.error);