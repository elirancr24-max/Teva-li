import type { Metadata } from 'next';
import { Box, Typography, Paper, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { adminSupabase } from '@/lib/supabase/admin';
import { BRAND } from '@/lib/brand';

export const metadata: Metadata = { title: 'יומן פעולות — אדמין', robots: { index: false, follow: false } };

type AuditRow = {
  id: string;
  action: string;
  target_type: string | null;
  target_id: string | null;
  payload: Record<string, unknown> | null;
  created_at: string;
};

const monoHead = {
  fontFamily: 'monospace',
  fontSize: 10,
  letterSpacing: '0.12em',
  fontWeight: 700,
  textTransform: 'uppercase' as const,
  py: 1.5,
};

const PER_PAGE = 50;

export default async function AuditPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page ?? '1') || 1);
  const offset = (page - 1) * PER_PAGE;

  // Table type isn't in generated db.ts until migration 007 applied; cast.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (adminSupabase.from as any)('admin_audit_log')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + PER_PAGE - 1);

  const rows = (data ?? []) as AuditRow[];
  const missingTable = error?.code === '42P01';

  return (
    <Box>
      <Box sx={{ px: { xs: 2, md: 4 }, pt: { xs: 3, md: 4 }, pb: 2.5, borderBottom: `2px solid ${BRAND.ink}` }}>
        <Typography sx={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.15em', color: '#888', mb: 0.5 }}>
          עמוד {page} · {rows.length} רשומות
        </Typography>
        <Typography variant="h1" sx={{ fontSize: { xs: 32, md: 52 }, fontWeight: 900, letterSpacing: '-0.04em' }}>
          יומן פעולות.
        </Typography>
      </Box>

      <Box sx={{ p: { xs: 2, md: 4 } }}>
        {missingTable && (
          <Box sx={{ p: 3, border: '2px solid #f0a500', bgcolor: '#fff8e1', mb: 3 }}>
            <Typography sx={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 700, color: '#8a6d3b' }}>
              ⚠ טבלת admin_audit_log לא קיימת. הרץ את מיגרציה 007 (supabase db push).
            </Typography>
          </Box>
        )}

        <Box sx={{ overflowX: 'auto' }}>
          <Paper variant="outlined" sx={{ borderRadius: 0, border: `2px solid ${BRAND.ink}`, minWidth: 700 }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: '#f0efec' }}>
                  <TableCell sx={monoHead}>תאריך</TableCell>
                  <TableCell sx={monoHead}>פעולה</TableCell>
                  <TableCell sx={monoHead}>סוג</TableCell>
                  <TableCell sx={monoHead}>מזהה יעד</TableCell>
                  <TableCell sx={monoHead}>מידע</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} sx={{ textAlign: 'center', py: 6, fontFamily: 'monospace', color: '#888' }}>
                      {missingTable ? 'הפעל מיגרציה כדי להתחיל לתעד' : 'אין רשומות'}
                    </TableCell>
                  </TableRow>
                )}
                {rows.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell sx={{ fontFamily: 'monospace', fontSize: 11, color: '#888', whiteSpace: 'nowrap' }}>
                      {new Date(r.created_at).toLocaleString('he-IL')}
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 700 }}>{r.action}</TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', fontSize: 12, color: '#666' }}>{r.target_type ?? '—'}</TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', fontSize: 11, color: '#888' }}>
                      {r.target_id ? r.target_id.slice(0, 12) : '—'}
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', fontSize: 10, color: '#666', maxWidth: 280 }}>
                      <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {r.payload ? JSON.stringify(r.payload) : '—'}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Box>

        {/* Simple paginator */}
        <Box sx={{ display: 'flex', gap: 1, mt: 2, justifyContent: 'flex-end' }}>
          {page > 1 && (
            <a
              href={`/admin/audit?page=${page - 1}`}
              style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 700, padding: '8px 12px', border: `2px solid ${BRAND.ink}`, color: BRAND.ink, textDecoration: 'none' }}
            >
              ← קודם
            </a>
          )}
          {rows.length === PER_PAGE && (
            <a
              href={`/admin/audit?page=${page + 1}`}
              style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 700, padding: '8px 12px', border: `2px solid ${BRAND.ink}`, color: BRAND.ink, textDecoration: 'none' }}
            >
              הבא →
            </a>
          )}
        </Box>
      </Box>
    </Box>
  );
}
