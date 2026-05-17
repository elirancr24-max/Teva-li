'use client';
import { useEffect, useState, useCallback } from 'react';
import { Box, IconButton, Stack, Typography, Button, Drawer } from '@mui/material';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import CloseIcon from '@mui/icons-material/Close';
import TextIncreaseIcon from '@mui/icons-material/TextIncrease';
import TextDecreaseIcon from '@mui/icons-material/TextDecrease';
import ContrastIcon from '@mui/icons-material/Contrast';
import LinkIcon from '@mui/icons-material/Link';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { BRAND } from '@/lib/brand';

interface State {
  fontScale: number;
  highContrast: boolean;
  highlightLinks: boolean;
  reduceMotion: boolean;
}

const DEFAULT: State = { fontScale: 1, highContrast: false, highlightLinks: false, reduceMotion: false };
const STORAGE_KEY = 'a11y-prefs';

function apply(state: State) {
  const root = document.documentElement;
  root.style.fontSize = `${state.fontScale * 100}%`;
  root.classList.toggle('a11y-contrast', state.highContrast);
  root.classList.toggle('a11y-links', state.highlightLinks);
  root.classList.toggle('a11y-motion', state.reduceMotion);
}

export function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<State>(DEFAULT);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = { ...DEFAULT, ...JSON.parse(raw) };
        setState(parsed);
        apply(parsed);
      }
    } catch {}
  }, []);

  const update = useCallback((patch: Partial<State>) => {
    setState((prev) => {
      const next = { ...prev, ...patch };
      apply(next);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setState(DEFAULT);
    apply(DEFAULT);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  }, []);

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        aria-label="פתיחת תפריט נגישות"
        sx={{
          position: 'fixed',
          bottom: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
          zIndex: 1300,
          bgcolor: BRAND.green,
          color: '#fff',
          width: 56,
          height: 56,
          boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
          '&:hover': { bgcolor: BRAND.greenDark },
        }}
      >
        <AccessibilityNewIcon fontSize="medium" />
      </IconButton>

      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ sx: { width: { xs: '85vw', sm: 340 }, p: 2.5 } }}
      >
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography component="h2" sx={{ fontSize: 20, fontWeight: 900, color: BRAND.brown }}>
              נגישות
            </Typography>
            <IconButton onClick={() => setOpen(false)} aria-label="סגירה" size="small">
              <CloseIcon />
            </IconButton>
          </Stack>

          <Stack spacing={1}>
            <Typography sx={{ fontSize: 13, fontWeight: 700, color: 'text.secondary' }}>גודל גופן</Typography>
            <Stack direction="row" spacing={1}>
              <ActionButton
                onClick={() => update({ fontScale: Math.min(1.6, state.fontScale + 0.1) })}
                icon={<TextIncreaseIcon />}
                label="הגדלה"
              />
              <ActionButton
                onClick={() => update({ fontScale: Math.max(0.85, state.fontScale - 0.1) })}
                icon={<TextDecreaseIcon />}
                label="הקטנה"
              />
            </Stack>
            <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>גודל נוכחי: {Math.round(state.fontScale * 100)}%</Typography>
          </Stack>

          <ToggleRow
            active={state.highContrast}
            onClick={() => update({ highContrast: !state.highContrast })}
            icon={<ContrastIcon />}
            label="ניגודיות גבוהה"
          />
          <ToggleRow
            active={state.highlightLinks}
            onClick={() => update({ highlightLinks: !state.highlightLinks })}
            icon={<LinkIcon />}
            label="הדגשת קישורים"
          />
          <ToggleRow
            active={state.reduceMotion}
            onClick={() => update({ reduceMotion: !state.reduceMotion })}
            icon={<PauseCircleOutlineIcon />}
            label="ביטול אנימציות"
          />

          <Button
            onClick={reset}
            startIcon={<RestartAltIcon />}
            variant="outlined"
            fullWidth
            sx={{ mt: 1, color: BRAND.brown, borderColor: BRAND.brown }}
          >
            איפוס
          </Button>

          <Box sx={{ pt: 2, borderTop: '1px solid #eee' }}>
            <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
              <a href="/accessibility" style={{ color: BRAND.green, fontWeight: 700 }}>
                הצהרת נגישות מלאה
              </a>
            </Typography>
          </Box>
        </Stack>
      </Drawer>
    </>
  );
}

function ActionButton({ onClick, icon, label }: { onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <Button
      onClick={onClick}
      variant="outlined"
      startIcon={icon}
      aria-label={label}
      sx={{ flex: 1, color: BRAND.brown, borderColor: BRAND.brown, fontWeight: 700 }}
    >
      {label}
    </Button>
  );
}

function ToggleRow({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <Button
      onClick={onClick}
      variant={active ? 'contained' : 'outlined'}
      startIcon={icon}
      fullWidth
      aria-pressed={active}
      sx={{
        justifyContent: 'flex-start',
        bgcolor: active ? BRAND.green : 'transparent',
        color: active ? '#fff' : BRAND.brown,
        borderColor: BRAND.brown,
        fontWeight: 700,
        '&:hover': { bgcolor: active ? BRAND.greenDark : BRAND.cream },
      }}
    >
      {label}
    </Button>
  );
}
