import { $typst } from '@myriaddreamin/typst.ts/dist/esm/contrib/snippet.mjs';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { glob } from 'glob';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function precompileTypst() {
  console.log('Precompiling Typst notations...');
  
  // Find all notation files
  const dataDir = path.join(__dirname, '../../../data/notations');
  const files = await glob('*.json', { cwd: dataDir });
  
  // Create output directory
  const outputDir = path.join(__dirname, '../src/assets/precompiled-typst');
  await mkdir(outputDir, { recursive: true });
  
  const manifest = {};
  
  for (const file of files) {
    const filePath = path.join(dataDir, file);
    const content = await readFile(filePath, 'utf-8');
    const notation = JSON.parse(content);
    
    if (notation.typstString) {
      console.log(`Compiling ${notation.id}...`);
      
      try {
        // Compile to vector format
        const vector = await $typst.vector({
          mainContent: notation.typstString,
        });
        
        // Also compile to SVG for fallback
        const svg = await $typst.svg({
          mainContent: notation.typstString,
        });
        
        // Save precompiled data
        const outputPath = path.join(outputDir, `${notation.id}.json`);
        await writeFile(outputPath, JSON.stringify({
          id: notation.id,
          vector,
          svg,
          typst: notation.typstString,
        }, null, 2));
        
        manifest[notation.id] = {
          path: `./assets/precompiled-typst/${notation.id}.json`,
          hasVector: true,
          hasSvg: true,
        };
      } catch (error) {
        console.error(`Failed to compile ${notation.id}:`, error);
        manifest[notation.id] = {
          error: error.message,
        };
      }
    }
  }
  
  // Write manifest
  await writeFile(
    path.join(outputDir, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  
  console.log('Typst precompilation complete!');
}

precompileTypst().catch(console.error);