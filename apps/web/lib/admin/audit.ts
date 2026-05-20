// Audit log helper. Writes to admin_audit_log table.
// Swallows errors so a failed audit never blocks the main mutation.
// If the table doesn't exist yet (migration 007 not applied), this is a no-op.

import { adminSupabase } from '@/lib/supabase/admin';

export async function logAdminAction(
  action: string,
  targetType?: string,
  targetId?: string | null,
  payload?: Record<string, unknown>,
): Promise<void> {
  try {
    // Table type not in generated db.ts until migration 007 lands; cast to bypass.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (adminSupabase.from as any)('admin_audit_log').insert({
      action,
      target_type: targetType ?? null,
      target_id: targetId ?? null,
      payload: payload ?? null,
    });
  } catch {
    // Audit failures must never break the UI.
  }
}
