import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { sql } from './index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function runMigrations() {
  console.log('🔄 Running migrations...');

  try {
    // Read the migration file
    const migrationPath = join(__dirname, '../../drizzle/0000_fancy_martin_li.sql');
    const migrationSQL = readFileSync(migrationPath, 'utf-8');
    
    // Split by statement-breakpoint and execute each statement
    const statements = migrationSQL.split('--> statement-breakpoint').filter(s => s.trim());
    
    for (const statement of statements) {
      const cleanStatement = statement.trim();
      if (cleanStatement) {
        console.log(`Executing: ${cleanStatement.substring(0, 50)}...`);
        // Use waddler's template literal syntax with raw SQL
        await sql`${sql.raw(cleanStatement)}`;
      }
    }
    
    console.log('✅ Migrations completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigrations();