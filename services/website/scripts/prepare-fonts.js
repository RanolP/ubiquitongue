#!/usr/bin/env node

import { existsSync, mkdirSync } from 'fs';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FONTS_DIR = join(__dirname, '../public/fonts');
const CTAN_MIRROR = 'https://mirror.ctan.org/fonts/cm-unicode/fonts/otf';

const CM_FONTS = [
  'cmunbmr.otf',  // Computer Modern Bright Roman
  'cmunbmo.otf',  // Computer Modern Bright Oblique
  'cmunbmr.otf',  // Computer Modern Bright Bold
  'cmunbso.otf',  // Computer Modern Bright Bold Oblique
  'cmunrm.otf',   // Computer Modern Roman
  'cmunit.otf',   // Computer Modern Italic
  'cmunbx.otf',   // Computer Modern Bold Extended
  'cmunbi.otf',   // Computer Modern Bold Italic
  'cmunss.otf',   // Computer Modern Sans Serif
  'cmunsi.otf',   // Computer Modern Sans Serif Oblique
  'cmunsx.otf',   // Computer Modern Sans Serif Bold Extended
  'cmunso.otf',   // Computer Modern Sans Serif Bold Oblique
  'cmuntt.otf',   // Computer Modern Typewriter
  'cmuntb.otf',   // Computer Modern Typewriter Bold
  'cmuntx.otf',   // Computer Modern Typewriter Oblique
  'cmunti.otf',   // Computer Modern Typewriter Italic
];

async function downloadFont(fontName) {
  const url = `${CTAN_MIRROR}/${fontName}`;
  const outputPath = join(FONTS_DIR, fontName);
  
  if (existsSync(outputPath)) {
    console.log(`✓ ${fontName} already exists`);
    return;
  }
  
  try {
    console.log(`Downloading ${fontName}...`);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }
    
    const buffer = await response.arrayBuffer();
    await writeFile(outputPath, Buffer.from(buffer));
    console.log(`✓ Downloaded ${fontName}`);
  } catch (error) {
    console.error(`✗ Failed to download ${fontName}:`, error.message);
  }
}

async function main() {
  console.log('Preparing Computer Modern fonts for Typst rendering...\n');
  
  // Create fonts directory if it doesn't exist
  if (!existsSync(FONTS_DIR)) {
    mkdirSync(FONTS_DIR, { recursive: true });
  }
  
  // Download all fonts
  for (const font of CM_FONTS) {
    await downloadFont(font);
  }
  
  console.log('\nFont preparation complete!');
}

main().catch(console.error);