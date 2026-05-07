/**
 * Supabase generated types — placeholder.
 *
 * After Phase 2 (DB schema migration), regenerate with:
 *   pnpm supabase gen types typescript --local > types/db.ts
 */
export type Json = string | number | boolean | null | { [k: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: Record<string, never>;
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};
