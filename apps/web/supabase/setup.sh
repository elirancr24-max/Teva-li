#!/bin/bash
# Run this from YOUR machine (not the cloud IDE) to apply migrations to Supabase.
# Usage: bash apps/web/supabase/setup.sh

DB_URL="postgresql://postgres:IHuRNqhaZ87zaAab@db.iyjxsdxebxmbrrquxbnw.supabase.co:5432/postgres?sslmode=require"

echo "==> Running migration 001_initial_schema.sql..."
psql "$DB_URL" -f "$(dirname "$0")/migrations/001_initial_schema.sql"
echo "==> Running migration 002_seed.sql..."
psql "$DB_URL" -f "$(dirname "$0")/migrations/002_seed.sql"
echo "==> Done!"
