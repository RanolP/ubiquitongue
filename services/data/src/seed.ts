import { db } from './db.js';

async function seed() {
  console.log('🌱 Seeding data...');

  // Create some papers
  const paper1 = db.papers.create({
    title: 'Types and Programming Languages',
    authors: ['Benjamin C. Pierce'],
    year: 2002,
    bibtex: '@book{pierce2002types, title={Types and Programming Languages}, author={Pierce, Benjamin C.}, year={2002}, publisher={MIT Press}}'
  });

  const paper2 = db.papers.create({
    title: 'A Theory of Objects',
    authors: ['Martín Abadi', 'Luca Cardelli'],
    year: 1996,
    bibtex: '@book{abadi1996theory, title={A Theory of Objects}, author={Abadi, Martín and Cardelli, Luca}, year={1996}, publisher={Springer}}'
  });

  // Create some semantics
  const sem1 = db.semantics.create({
    name: 'Type Judgment',
    description: 'A formal statement asserting that a term has a certain type in a given context',
    tags: ['type theory', 'PLT'],
    aliases: ['typing relation', 'type assignment']
  });

  const sem2 = db.semantics.create({
    name: 'Lambda Abstraction',
    description: 'A function definition in lambda calculus',
    tags: ['lambda calculus', 'PLT'],
    aliases: ['function literal', 'anonymous function']
  });

  // Create some syntaxes
  const syn1 = db.syntaxes.create({
    typstString: '$Gamma tack e : tau$',
    latexString: '\\Gamma \\vdash e : \\tau',
    typstCanonical: 'Gamma tack e : tau',
    description: 'Standard notation for type judgments'
  });

  const syn2 = db.syntaxes.create({
    typstString: '$lambda x. e$',
    latexString: '\\lambda x. e',
    typstCanonical: 'lambda x. e',
    description: 'Lambda abstraction notation'
  });

  // Create some usages
  db.usages.create({
    semanticId: sem1.id,
    syntaxId: syn1.id,
    paperId: paper1.id,
    context: 'Introduced in Chapter 3',
    pageNumber: '32',
    isPrimaryDefinition: true
  });

  db.usages.create({
    semanticId: sem2.id,
    syntaxId: syn2.id,
    paperId: paper1.id,
    context: 'Used throughout the book',
    pageNumber: '15',
    isPrimaryDefinition: false
  });

  // Add more mathematical examples
  const paper3 = db.papers.create({
    title: 'Introduction to Set Theory',
    authors: ['Karel Hrbacek', 'Thomas Jech'],
    year: 1999,
    bibtex: '@book{hrbacek1999introduction, title={Introduction to Set Theory}, author={Hrbacek, Karel and Jech, Thomas}, year={1999}, publisher={Marcel Dekker}}'
  });

  const sem3 = db.semantics.create({
    name: 'Set Union',
    description: 'The union of two sets A and B is the set of elements which are in A, in B, or in both',
    tags: ['set theory', 'operations'],
    aliases: ['union', 'join']
  });

  const sem4 = db.semantics.create({
    name: 'Set Intersection',
    description: 'The intersection of two sets A and B is the set of elements which are in both A and B',
    tags: ['set theory', 'operations'],
    aliases: ['intersection', 'meet']
  });

  const sem5 = db.semantics.create({
    name: 'Element Membership',
    description: 'A relation between an element and a set, indicating that the element belongs to the set',
    tags: ['set theory', 'relations'],
    aliases: ['belongs to', 'is in', 'membership']
  });

  const syn3 = db.syntaxes.create({
    typstString: '$A union B$',
    latexString: 'A \\cup B',
    typstCanonical: 'A union B',
    description: 'Set union operation'
  });

  const syn4 = db.syntaxes.create({
    typstString: '$A sect B$',
    latexString: 'A \\cap B',
    typstCanonical: 'A sect B',
    description: 'Set intersection operation'
  });

  const syn5 = db.syntaxes.create({
    typstString: '$x in A$',
    latexString: 'x \\in A',
    typstCanonical: 'x in A',
    description: 'Element membership in a set'
  });

  // Create usages for set theory
  db.usages.create({
    semanticId: sem3.id,
    syntaxId: syn3.id,
    paperId: paper3.id,
    context: 'Basic set operations',
    pageNumber: '45',
    isPrimaryDefinition: true
  });

  db.usages.create({
    semanticId: sem4.id,
    syntaxId: syn4.id,
    paperId: paper3.id,
    context: 'Basic set operations',
    pageNumber: '46',
    isPrimaryDefinition: true
  });

  db.usages.create({
    semanticId: sem5.id,
    syntaxId: syn5.id,
    paperId: paper3.id,
    context: 'Fundamental set relation',
    pageNumber: '12',
    isPrimaryDefinition: true
  });

  // Add summation notation
  const sem6 = db.semantics.create({
    name: 'Summation',
    description: 'The sum of a sequence of numbers',
    tags: ['arithmetic', 'analysis'],
    aliases: ['sum', 'sigma notation']
  });

  const syn6 = db.syntaxes.create({
    typstString: '$sum_(i=1)^n a_i$',
    latexString: '\\sum_{i=1}^{n} a_i',
    typstCanonical: 'sum_(i=1)^n a_i',
    description: 'Summation from i=1 to n'
  });

  db.usages.create({
    semanticId: sem6.id,
    syntaxId: syn6.id,
    paperId: paper3.id,
    context: 'Mathematical notation appendix',
    pageNumber: '302',
    isPrimaryDefinition: false
  });

  console.log('✅ Seeding complete!');
}

seed().catch(console.error);