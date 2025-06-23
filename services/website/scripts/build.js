import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, cpSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

async function build() {
  console.log('🏗️  Building Ubiquitongue website...');

  // 1. Copy data files from data service
  const dataSource = join(rootDir, '../data/data');
  const dataDest = join(rootDir, 'data');
  
  if (existsSync(dataSource)) {
    console.log('📁 Copying data files...');
    cpSync(dataSource, dataDest, { recursive: true });
  } else {
    console.error('❌ Data directory not found. Run data seeding first.');
    process.exit(1);
  }

  // 2. Generate search indices
  console.log('🔍 Generating search indices...');
  await new Promise((resolve, reject) => {
    const indexGen = spawn('node', ['scripts/generate-search-index.js'], {
      cwd: rootDir,
      stdio: 'inherit',
    });

    indexGen.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Search index generation failed with code ${code}`));
      }
    });
  });

  // 3. Start read GraphQL server
  console.log('🚀 Starting read GraphQL server...');
  const serverProcess = spawn('tsx', ['src/data/run-server.ts', dataDest], {
    cwd: rootDir,
    stdio: 'inherit',
  });
  
  // Wait for server to start
  await new Promise(resolve => setTimeout(resolve, 2000));

  try {
    // 4. Run Astro build
    console.log('🔨 Building Astro site...');
    await new Promise((resolve, reject) => {
      const astro = spawn('pnpm', ['astro', 'build'], {
        cwd: rootDir,
        stdio: 'inherit',
      });

      astro.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Astro build failed with code ${code}`));
        }
      });
    });

    console.log('✅ Build complete!');
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  } finally {
    // 5. Stop GraphQL server
    serverProcess.kill();
  }
}

build().catch(console.error);