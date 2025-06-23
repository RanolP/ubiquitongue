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

  console.log('✅ Seeding complete!');
}

seed().catch(console.error);