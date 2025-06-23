import { waddler } from 'waddler';
import * as schema from './schema.js';

// Create database connection using waddler
export const sql = waddler({ 
  url: 'local_master_data.duckdb',
  min: 1,
  max: 1
});

// Export db as sql for compatibility
export const db = sql;

// Export schema for use in other files
export * from './schema.js';