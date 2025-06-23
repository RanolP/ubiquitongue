#!/bin/bash

# Run migrations using DuckDB CLI
echo "🔄 Running migrations using DuckDB CLI..."

# Create database if it doesn't exist
duckdb local_master_data.duckdb << 'EOF'
.read drizzle/0000_fancy_martin_li.sql
.exit
EOF

echo "✅ Migrations completed!"