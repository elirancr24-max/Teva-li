'use client';

import { useState, useTransition } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { BRAND } from '@/lib/brand';
import { createCategory, updateCategory, deleteCategory } from '@/app/admin/actions';
import { useAdminToast } from '@/components/admin/AdminToastProvider';
import type { Category } from '@/types/db';

type DialogState =
  | { mode: 'closed' }
  | { mode: 'create' }
  | { mode: 'edit'; category: Category };

const monoLabel = {
  fontFamily: 'monospace',
  fontSize: 10,
  letterSpacing: '0.12em',
  fontWeight: 700,
  textTransform: 'uppercase' as const,
};

export function CategoriesClient({ categories }: { categories: Category[] }) {
  const [dialog, setDialog] = useState<DialogState>({ mode: 'closed' });
  const [confirmDelete, setConfirmDelete] = useState<Category | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const toast = useAdminToast();

  const closeDialog = () => {
    setDialog({ mode: 'closed' });
    setError(null);
  };

  async function handleSubmit(formData: FormData) {
    setError(null);
    const slug = String(formData.get('slug') ?? '').trim();
    const name_he = String(formData.get('name_he') ?? '').trim();
    const sort_order = Number(formData.get('sort_order') ?? 0);

    if (!slug || !name_he) {
      setError('יש למלא slug ושם');
      return;
    }
    if (Number.isNaN(sort_order)) {
      setError('סדר חייב להיות מספר');
      return;
    }

    const payload = { slug, name_he, sort_order };

    const result =
      dialog.mode === 'edit'
        ? await updateCategory(dialog.category.id, payload)
        : await createCategory(payload);

    if (result && 'error' in result && result.error) {
      setError(result.error);
    }
  }

  function handleDelete(id: string, name: string) {
    startTransition(async () => {
      const res = await deleteCategory(id);
      if (res.ok) {
        toast.success(`קטגוריה "${name}" נמחקה`);
        setConfirmDelete(null);
      } else {
        toast.error(res.error);
      }
    });
  }

  const editing = dialog.mode === 'edit' ? dialog.category : null;
  const dialogOpen = dialog.mode !== 'closed';

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          onClick={() => {
            setError(null);
            setDialog({ mode: 'create' });
          }}
          sx={{
            bgcolor: BRAND.green,
            color: BRAND.paper,
            borderRadius: 0,
            border: `2px solid ${BRAND.ink}`,
            px: 2.5,
            py: 1.25,
            fontFamily: 'monospace',
            fontSize: 12,
            letterSpacing: '0.12em',
            fontWeight: 700,
            textTransform: 'uppercase',
            '&:hover': { bgcolor: BRAND.greenDark },
          }}
        >
          + קטגוריה חדשה
        </Button>
      </Box>

      <Paper
        variant="outlined"
        sx={{ borderRadius: 0, border: `2px solid ${BRAND.ink}`, overflow: 'hidden' }}
      >
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: '#f0efec' }}>
              {['slug', 'שם בעברית', 'סדר', 'פעולות'].map((h) => (
                <TableCell key={h} sx={{ ...monoLabel, py: 1.5 }}>
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  sx={{
                    textAlign: 'center',
                    py: 6,
                    fontFamily: 'monospace',
                    fontSize: 12,
                    color: '#888',
                  }}
                >
                  אין קטגוריות עדיין.
                </TableCell>
              </TableRow>
            )}
            {categories.map((cat) => (
              <TableRow key={cat.id} sx={{ '&:hover': { bgcolor: '#fafafa' } }}>
                <TableCell sx={{ fontFamily: 'monospace', fontSize: 12 }}>{cat.slug}</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 14 }}>{cat.name_he}</TableCell>
                <TableCell sx={{ fontFamily: 'monospace', fontSize: 12 }}>
                  {cat.sort_order}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      onClick={() => {
                        setError(null);
                        setDialog({ mode: 'edit', category: cat });
                      }}
                      sx={{
                        minWidth: 0,
                        px: 1.5,
                        py: 0.5,
                        border: `2px solid ${BRAND.ink}`,
                        borderRadius: 0,
                        bgcolor: BRAND.paper,
                        color: BRAND.ink,
                        fontFamily: 'monospace',
                        fontSize: 10,
                        letterSpacing: '0.1em',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        '&:hover': { bgcolor: '#f0efec' },
                      }}
                    >
                      ערוך
                    </Button>
                    <Button
                      onClick={() => setConfirmDelete(cat)}
                      sx={{
                        minWidth: 0,
                        px: 1.5,
                        py: 0.5,
                        border: `2px solid ${BRAND.ink}`,
                        borderRadius: 0,
                        bgcolor: BRAND.paper,
                        color: '#b00020',
                        fontFamily: 'monospace',
                        fontSize: 10,
                        letterSpacing: '0.1em',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        '&:hover': { bgcolor: '#fdecef' },
                      }}
                    >
                      מחק
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Create / Edit dialog */}
      <Dialog
        open={dialogOpen}
        onClose={closeDialog}
        fullWidth
        maxWidth="sm"
        dir="rtl"
        PaperProps={{
          sx: { borderRadius: 0, border: `2px solid ${BRAND.ink}` },
        }}
      >
        <Box component="form" action={handleSubmit}>
          <DialogTitle
            sx={{
              ...monoLabel,
              fontSize: 12,
              borderBottom: `2px solid ${BRAND.ink}`,
              py: 2,
            }}
          >
            {editing ? 'עריכת קטגוריה' : 'קטגוריה חדשה'}
          </DialogTitle>
          <DialogContent sx={{ pt: 3, pb: 2, display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>
            <Box>
              <Typography sx={{ ...monoLabel, mb: 0.75 }}>slug</Typography>
              <TextField
                name="slug"
                defaultValue={editing?.slug ?? ''}
                placeholder="berries"
                required
                fullWidth
                size="small"
                InputProps={{
                  sx: {
                    borderRadius: 0,
                    fontFamily: 'monospace',
                    '& fieldset': { border: `2px solid ${BRAND.ink}` },
                    '&:hover fieldset': { border: `2px solid ${BRAND.ink}` },
                    '&.Mui-focused fieldset': { border: `2px solid ${BRAND.green} !important` },
                  },
                }}
              />
            </Box>

            <Box>
              <Typography sx={{ ...monoLabel, mb: 0.75 }}>שם בעברית</Typography>
              <TextField
                name="name_he"
                defaultValue={editing?.name_he ?? ''}
                placeholder="פירות יער"
                required
                fullWidth
                size="small"
                InputProps={{
                  sx: {
                    borderRadius: 0,
                    '& fieldset': { border: `2px solid ${BRAND.ink}` },
                    '&:hover fieldset': { border: `2px solid ${BRAND.ink}` },
                    '&.Mui-focused fieldset': { border: `2px solid ${BRAND.green} !important` },
                  },
                }}
              />
            </Box>

            <Box>
              <Typography sx={{ ...monoLabel, mb: 0.75 }}>סדר הצגה</Typography>
              <TextField
                name="sort_order"
                type="number"
                defaultValue={editing?.sort_order ?? 0}
                fullWidth
                size="small"
                inputProps={{ step: 1 }}
                InputProps={{
                  sx: {
                    borderRadius: 0,
                    fontFamily: 'monospace',
                    '& fieldset': { border: `2px solid ${BRAND.ink}` },
                    '&:hover fieldset': { border: `2px solid ${BRAND.ink}` },
                    '&.Mui-focused fieldset': { border: `2px solid ${BRAND.green} !important` },
                  },
                }}
              />
            </Box>

            {error && (
              <Box
                sx={{
                  p: 1.5,
                  border: `2px solid #b00020`,
                  bgcolor: '#fdecef',
                  fontFamily: 'monospace',
                  fontSize: 12,
                  color: '#b00020',
                }}
              >
                {error}
              </Box>
            )}
          </DialogContent>
          <DialogActions
            sx={{
              px: 3,
              py: 2,
              borderTop: `2px solid ${BRAND.ink}`,
              gap: 1.5,
            }}
          >
            <Button
              type="button"
              onClick={closeDialog}
              sx={{
                borderRadius: 0,
                border: `2px solid ${BRAND.ink}`,
                bgcolor: BRAND.paper,
                color: BRAND.ink,
                px: 2.5,
                py: 1,
                fontFamily: 'monospace',
                fontSize: 11,
                letterSpacing: '0.12em',
                fontWeight: 700,
                textTransform: 'uppercase',
                '&:hover': { bgcolor: '#f0efec' },
              }}
            >
              ביטול
            </Button>
            <Button
              type="submit"
              sx={{
                borderRadius: 0,
                border: `2px solid ${BRAND.ink}`,
                bgcolor: BRAND.green,
                color: BRAND.paper,
                px: 2.5,
                py: 1,
                fontFamily: 'monospace',
                fontSize: 11,
                letterSpacing: '0.12em',
                fontWeight: 700,
                textTransform: 'uppercase',
                '&:hover': { bgcolor: BRAND.greenDark },
              }}
            >
              שמור
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* Delete confirm dialog */}
      <Dialog
        open={confirmDelete !== null}
        onClose={() => setConfirmDelete(null)}
        dir="rtl"
        PaperProps={{
          sx: { borderRadius: 0, border: `2px solid ${BRAND.ink}` },
        }}
      >
        <DialogTitle
          sx={{
            ...monoLabel,
            fontSize: 12,
            borderBottom: `2px solid ${BRAND.ink}`,
            py: 2,
          }}
        >
          מחיקת קטגוריה
        </DialogTitle>
        <DialogContent sx={{ pt: 3, pb: 2, mt: 1 }}>
          <Typography sx={{ fontSize: 14 }}>
            למחוק את הקטגוריה{' '}
            <Box component="span" sx={{ fontWeight: 800 }}>
              {confirmDelete?.name_he}
            </Box>
            ? פעולה זו אינה הפיכה.
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            px: 3,
            py: 2,
            borderTop: `2px solid ${BRAND.ink}`,
            gap: 1.5,
          }}
        >
          <Button
            onClick={() => setConfirmDelete(null)}
            disabled={isPending}
            sx={{
              borderRadius: 0,
              border: `2px solid ${BRAND.ink}`,
              bgcolor: BRAND.paper,
              color: BRAND.ink,
              px: 2.5,
              py: 1,
              fontFamily: 'monospace',
              fontSize: 11,
              letterSpacing: '0.12em',
              fontWeight: 700,
              textTransform: 'uppercase',
              '&:hover': { bgcolor: '#f0efec' },
            }}
          >
            ביטול
          </Button>
          <Button
            onClick={() => confirmDelete && handleDelete(confirmDelete.id, confirmDelete.name_he)}
            disabled={isPending}
            sx={{
              borderRadius: 0,
              border: `2px solid ${BRAND.ink}`,
              bgcolor: '#b00020',
              color: BRAND.paper,
              px: 2.5,
              py: 1,
              fontFamily: 'monospace',
              fontSize: 11,
              letterSpacing: '0.12em',
              fontWeight: 700,
              textTransform: 'uppercase',
              '&:hover': { bgcolor: '#8a0019' },
            }}
          >
            מחק
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
