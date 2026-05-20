// Audit log helper. Writes to admin_audit_log table.
// Swallows errors so a failed audit never blocks the main mutation.
// If the table doesn't exist yet (migration 007 not applied), this is a no-op.

import { adminSupabase } from '@/lib/supabase/admin';
import type { Json } from '@/types/db';

export async function logAdminAction(
  action: string,
  targetType?: string,
  targetId?: string | null,
  payload?: Record<string, unknown>,
): Promise<void> {
  try {
    await adminSupabase.from('admin_audit_log').insert({
      action,
      target_type: targetType ?? null,
      target_id: targetId ?? null,
      payload: (payload ?? null) as Json | null,
    });
  } catch {
    // Audit failures must never break the UI.
  }
}
