import { nanoid } from 'nanoid';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = path.join(__dirname, '../../..');
const dataDir = path.join(rootDir, 'data');

interface Paper {
  id: string;
  title: string;
  authors: string[];
  year: number;
  bibtex: string;
  abstract?: string;
  createdAt: string;
  updatedAt: string;
}

interface Notation {
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
  
  createdAt: string;
  updatedAt: string;
}

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function writeJsonFile(filePath: string, data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function writeMarkdownFile(filePath: string, frontmatter: any, content: string) {
  const yaml = Object.entries(frontmatter)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}:\n${value.map(v => `  - ${v}`).join('\n')}`;
      } else if (typeof value === 'object') {
        return `${key}:\n${Object.entries(value).map(([k, v]) => `  ${k}: ${v}`).join('\n')}`;
      }
      return `${key}: ${value}`;
    })
    .join('\n');
  
  const fullContent = `---\n${yaml}\n---\n\n${content}`;
  fs.writeFileSync(filePath, fullContent);
}

async function seedSeparated() {
  console.log('🌱 Seeding data to separate files...');

  // Ensure directories exist
  ensureDir(path.join(dataDir, 'papers'));
  ensureDir(path.join(dataDir, 'notations'));

  // Create papers
  const papers: Paper[] = [
    {
      id: 'pierce-2002-types',
      title: 'Types and Programming Languages',
      authors: ['Benjamin C. Pierce'],
      year: 2002,
      bibtex: '@book{pierce2002types, title={Types and Programming Languages}, author={Pierce, Benjamin C.}, year={2002}, publisher={MIT Press}}',
      abstract: 'A comprehensive introduction to type systems and programming language theory.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'abadi-1996-theory',
      title: 'A Theory of Objects',
      authors: ['Martín Abadi', 'Luca Cardelli'],
      year: 1996,
      bibtex: '@book{abadi1996theory, title={A Theory of Objects}, author={Abadi, Martín and Cardelli, Luca}, year={1996}, publisher={Springer}}',
      abstract: 'A foundation for object-oriented programming based on typed lambda calculus.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'hrbacek-1999-set-theory',
      title: 'Introduction to Set Theory',
      authors: ['Karel Hrbacek', 'Thomas Jech'],
      year: 1999,
      bibtex: '@book{hrbacek1999introduction, title={Introduction to Set Theory}, author={Hrbacek, Karel and Jech, Thomas}, year={1999}, publisher={Marcel Dekker}}',
      abstract: 'A modern introduction to set theory, covering both naive and axiomatic approaches.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  // Write papers as JSON files
  papers.forEach(paper => {
    const paperPath = path.join(dataDir, 'papers', `${paper.id}.json`);
    writeJsonFile(paperPath, paper);
    console.log(`📄 Created paper: ${paper.id}`);
  });

  // Create notations
  const notations: Notation[] = [
    {
      id: 'type-judgment',
      name: 'Type Judgment',
      description: 'A formal statement asserting that a term has a certain type in a given context',
      tags: ['type theory', 'PLT'],
      aliases: ['typing relation', 'type assignment'],
      typstString: '$Gamma tack.r e : tau$',
      latexString: '\\Gamma \\vdash e : \\tau',
      papers: [{
        paperId: 'pierce-2002-types',
        context: 'Introduced in Chapter 3 as the fundamental judgment of type systems',
        pageNumber: '32',
        isPrimaryDefinition: true
      }],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'lambda-abstraction',
      name: 'Lambda Abstraction',
      description: 'A function definition in lambda calculus',
      tags: ['lambda calculus', 'PLT', 'functional programming'],
      aliases: ['function literal', 'anonymous function', 'lambda expression'],
      typstString: '$lambda x. e$',
      latexString: '\\lambda x. e',
      papers: [{
        paperId: 'pierce-2002-types',
        context: 'Used throughout the book',
        pageNumber: '15',
        isPrimaryDefinition: false
      }, {
        paperId: 'abadi-1996-theory',
        context: 'Extended with object-oriented features',
        pageNumber: '23',
        isPrimaryDefinition: false
      }],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'set-union',
      name: 'Set Union',
      description: 'The union of two sets A and B is the set of elements which are in A, in B, or in both',
      tags: ['set theory', 'operations', 'binary operations'],
      aliases: ['union', 'join', 'disjunction of sets'],
      typstString: '$A union B$',
      latexString: 'A \\cup B',
      unicodeString: 'A ∪ B',
      papers: [{
        paperId: 'hrbacek-1999-set-theory',
        context: 'Basic set operations introduced in Chapter 2',
        pageNumber: '45',
        isPrimaryDefinition: true
      }],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'set-intersection',
      name: 'Set Intersection',
      description: 'The intersection of two sets A and B is the set of elements which are in both A and B',
      tags: ['set theory', 'operations', 'binary operations'],
      aliases: ['intersection', 'meet', 'conjunction of sets'],
      typstString: '$A sect B$',
      latexString: 'A \\cap B',
      unicodeString: 'A ∩ B',
      papers: [{
        paperId: 'hrbacek-1999-set-theory',
        context: 'Basic set operations introduced in Chapter 2',
        pageNumber: '46',
        isPrimaryDefinition: true
      }],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'element-membership',
      name: 'Element Membership',
      description: 'A relation between an element and a set, indicating that the element belongs to the set',
      tags: ['set theory', 'relations', 'membership'],
      aliases: ['belongs to', 'is in', 'membership', 'element of'],
      typstString: '$x in A$',
      latexString: 'x \\in A',
      unicodeString: 'x ∈ A',
      papers: [{
        paperId: 'hrbacek-1999-set-theory',
        context: 'Fundamental set relation, first axiom of set theory',
        pageNumber: '12',
        isPrimaryDefinition: true
      }],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'summation',
      name: 'Summation',
      description: 'The sum of a sequence of numbers, typically indexed over a range',
      tags: ['arithmetic', 'analysis', 'series'],
      aliases: ['sum', 'sigma notation', 'series sum'],
      typstString: '$sum_(i=1)^n a_i$',
      latexString: '\\sum_{i=1}^{n} a_i',
      unicodeString: '∑ᵢ₌₁ⁿ aᵢ',
      papers: [{
        paperId: 'hrbacek-1999-set-theory',
        context: 'Mathematical notation appendix',
        pageNumber: '302',
        isPrimaryDefinition: false
      }],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'universal-quantification',
      name: 'Universal Quantification',
      description: 'A logical statement asserting that a property holds for all elements in a domain',
      tags: ['logic', 'quantifiers', 'first-order logic'],
      aliases: ['for all', 'universal quantifier', 'generalization'],
      typstString: '$forall x. P(x)$',
      latexString: '\\forall x. P(x)',
      unicodeString: '∀x. P(x)',
      papers: [{
        paperId: 'hrbacek-1999-set-theory',
        context: 'First-order logic introduction',
        pageNumber: '120',
        isPrimaryDefinition: true
      }],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'existential-quantification',
      name: 'Existential Quantification',
      description: 'A logical statement asserting that there exists at least one element satisfying a property',
      tags: ['logic', 'quantifiers', 'first-order logic'],
      aliases: ['there exists', 'existential quantifier', 'existence'],
      typstString: '$exists x. P(x)$',
      latexString: '\\exists x. P(x)',
      unicodeString: '∃x. P(x)',
      papers: [{
        paperId: 'hrbacek-1999-set-theory',
        context: 'First-order logic introduction',
        pageNumber: '121',
        isPrimaryDefinition: true
      }],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  // Write notations as separate JSON files
  notations.forEach(notation => {
    const notationPath = path.join(dataDir, 'notations', `${notation.id}.json`);
    writeJsonFile(notationPath, notation);
    console.log(`📝 Created notation: ${notation.id}`);
  });

  // Create index files for easier loading
  const paperIndex = papers.map(p => ({ id: p.id, title: p.title, year: p.year }));
  const notationIndex = notations.map(n => ({ id: n.id, name: n.name, tags: n.tags }));
  
  writeJsonFile(path.join(dataDir, 'papers', '_index.json'), paperIndex);
  writeJsonFile(path.join(dataDir, 'notations', '_index.json'), notationIndex);

  console.log('✅ Seeding complete!');
  console.log(`📚 Created ${papers.length} papers`);
  console.log(`📐 Created ${notations.length} notations`);
}

seedSeparated().catch(console.error);