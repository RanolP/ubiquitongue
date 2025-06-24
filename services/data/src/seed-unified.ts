import { nanoid } from 'nanoid';
import fs from 'fs';
import path from 'path';

interface Paper {
  id: string;
  title: string;
  authors: string[];
  year: number;
  bibtex: string;
  abstract?: string;
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
  
  createdAt: number;
  updatedAt: number;
}

const dataDir = path.join(process.cwd(), 'data');

function writeData(filename: string, data: any) {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(path.join(dataDir, `${filename}.json`), JSON.stringify(data, null, 2));
}

async function seedUnified() {
  console.log('🌱 Seeding unified data...');

  // Papers remain the same
  const papers: Paper[] = [
    {
      id: nanoid(),
      title: 'Types and Programming Languages',
      authors: ['Benjamin C. Pierce'],
      year: 2002,
      bibtex: '@book{pierce2002types, title={Types and Programming Languages}, author={Pierce, Benjamin C.}, year={2002}, publisher={MIT Press}}'
    },
    {
      id: nanoid(),
      title: 'A Theory of Objects',
      authors: ['Martín Abadi', 'Luca Cardelli'],
      year: 1996,
      bibtex: '@book{abadi1996theory, title={A Theory of Objects}, author={Abadi, Martín and Cardelli, Luca}, year={1996}, publisher={Springer}}'
    },
    {
      id: nanoid(),
      title: 'Introduction to Set Theory',
      authors: ['Karel Hrbacek', 'Thomas Jech'],
      year: 1999,
      bibtex: '@book{hrbacek1999introduction, title={Introduction to Set Theory}, author={Hrbacek, Karel and Jech, Thomas}, year={1999}, publisher={Marcel Dekker}}'
    }
  ];

  // Unified notations
  const notations: Notation[] = [
    {
      id: nanoid(),
      name: 'Type Judgment',
      description: 'A formal statement asserting that a term has a certain type in a given context',
      tags: ['type theory', 'PLT'],
      aliases: ['typing relation', 'type assignment'],
      typstString: '$Gamma tack e : tau$',
      latexString: '\\Gamma \\vdash e : \\tau',
      papers: [{
        paperId: papers[0].id,
        context: 'Introduced in Chapter 3',
        pageNumber: '32',
        isPrimaryDefinition: true
      }],
      createdAt: Date.now(),
      updatedAt: Date.now()
    },
    {
      id: nanoid(),
      name: 'Lambda Abstraction',
      description: 'A function definition in lambda calculus',
      tags: ['lambda calculus', 'PLT'],
      aliases: ['function literal', 'anonymous function'],
      typstString: '$lambda x. e$',
      latexString: '\\lambda x. e',
      papers: [{
        paperId: papers[0].id,
        context: 'Used throughout the book',
        pageNumber: '15',
        isPrimaryDefinition: false
      }],
      createdAt: Date.now(),
      updatedAt: Date.now()
    },
    {
      id: nanoid(),
      name: 'Set Union',
      description: 'The union of two sets A and B is the set of elements which are in A, in B, or in both',
      tags: ['set theory', 'operations'],
      aliases: ['union', 'join'],
      typstString: '$A union B$',
      latexString: 'A \\cup B',
      unicodeString: 'A ∪ B',
      papers: [{
        paperId: papers[2].id,
        context: 'Basic set operations',
        pageNumber: '45',
        isPrimaryDefinition: true
      }],
      createdAt: Date.now(),
      updatedAt: Date.now()
    },
    {
      id: nanoid(),
      name: 'Set Intersection',
      description: 'The intersection of two sets A and B is the set of elements which are in both A and B',
      tags: ['set theory', 'operations'],
      aliases: ['intersection', 'meet'],
      typstString: '$A sect B$',
      latexString: 'A \\cap B',
      unicodeString: 'A ∩ B',
      papers: [{
        paperId: papers[2].id,
        context: 'Basic set operations',
        pageNumber: '46',
        isPrimaryDefinition: true
      }],
      createdAt: Date.now(),
      updatedAt: Date.now()
    },
    {
      id: nanoid(),
      name: 'Element Membership',
      description: 'A relation between an element and a set, indicating that the element belongs to the set',
      tags: ['set theory', 'relations'],
      aliases: ['belongs to', 'is in', 'membership'],
      typstString: '$x in A$',
      latexString: 'x \\in A',
      unicodeString: 'x ∈ A',
      papers: [{
        paperId: papers[2].id,
        context: 'Fundamental set relation',
        pageNumber: '12',
        isPrimaryDefinition: true
      }],
      createdAt: Date.now(),
      updatedAt: Date.now()
    },
    {
      id: nanoid(),
      name: 'Summation',
      description: 'The sum of a sequence of numbers',
      tags: ['arithmetic', 'analysis'],
      aliases: ['sum', 'sigma notation'],
      typstString: '$sum_(i=1)^n a_i$',
      latexString: '\\sum_{i=1}^{n} a_i',
      unicodeString: '∑ᵢ₌₁ⁿ aᵢ',
      papers: [{
        paperId: papers[2].id,
        context: 'Mathematical notation appendix',
        pageNumber: '302',
        isPrimaryDefinition: false
      }],
      createdAt: Date.now(),
      updatedAt: Date.now()
    },
    {
      id: nanoid(),
      name: 'Universal Quantification',
      description: 'A logical statement asserting that a property holds for all elements in a domain',
      tags: ['logic', 'quantifiers'],
      aliases: ['for all', 'universal quantifier'],
      typstString: '$forall x. P(x)$',
      latexString: '\\forall x. P(x)',
      unicodeString: '∀x. P(x)',
      papers: [{
        paperId: papers[2].id,
        context: 'First-order logic introduction',
        pageNumber: '120',
        isPrimaryDefinition: true
      }],
      createdAt: Date.now(),
      updatedAt: Date.now()
    },
    {
      id: nanoid(),
      name: 'Existential Quantification',
      description: 'A logical statement asserting that there exists at least one element satisfying a property',
      tags: ['logic', 'quantifiers'],
      aliases: ['there exists', 'existential quantifier'],
      typstString: '$exists x. P(x)$',
      latexString: '\\exists x. P(x)',
      unicodeString: '∃x. P(x)',
      papers: [{
        paperId: papers[2].id,
        context: 'First-order logic introduction',
        pageNumber: '121',
        isPrimaryDefinition: true
      }],
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
  ];

  // Write the data
  writeData('papers', papers);
  writeData('notations', notations);

  console.log('✅ Unified seeding complete!');
  console.log(`Created ${papers.length} papers and ${notations.length} notations`);
}

seedUnified().catch(console.error);