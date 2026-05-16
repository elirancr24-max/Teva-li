import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/db';

// Server-only client — uses service role key, bypasses all RLS.
// Never import this in client components.
export const adminSupabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } },
);
