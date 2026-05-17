'use client';
import { createTheme } from '@mui/material/styles';
import { heIL } from '@mui/material/locale';
// Re-export brand tokens for backward-compat with files that still import BRAND from theme.
export { BRAND, MESH } from './brand';
import { BRAND } from './brand';

export const theme = createTheme(
  {
    direction: 'rtl',
    palette: {
      mode: 'light',
      primary: {
        main: BRAND.green,
        dark: BRAND.greenDark,
        light: BRAND.greenLight,
        contrastText: '#fff',
      },
      secondary: {
        main: BRAND.gold,
        dark: BRAND.goldDark,
        light: BRAND.goldLight,
        contrastText: BRAND.brown,
      },
      error: { main: BRAND.watermelon, dark: BRAND.watermelonDark, contrastText: '#fff' },
      info: { main: BRAND.teal, dark: BRAND.tealDark, contrastText: '#fff' },
      grey: {
        50: '#FAF8F2',
        100: '#F5F2E9',
        200: '#EFE9D8',
        300: '#D6CFB8',
      },
      background: {
        default: BRAND.cream,
        paper: BRAND.paper,
      },
      text: {
        primary: BRAND.brown,
        secondary: BRAND.brownLight,
      },
      divider: 'rgba(42,24,16,0.10)',
    },
    typography: {
      fontFamily: 'var(--font-rubik), var(--font-heebo), Rubik, Heebo, system-ui, Arial, sans-serif',
      h1: { fontWeight: 900, letterSpacing: '-0.025em' },
      h2: { fontWeight: 900, letterSpacing: '-0.025em', fontSize: '1.8rem' },
      h3: { fontWeight: 800, letterSpacing: '-0.015em' },
      h6: { fontWeight: 800 },
      button: { fontWeight: 800 },
    },
    shape: { borderRadius: 14 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            textTransform: 'none',
            fontWeight: 800,
            paddingInline: 24,
          },
          containedPrimary: {
            backgroundColor: BRAND.green,
            boxShadow: '0 6px 18px -6px rgba(76,174,58,0.55)',
            '&:hover': {
              backgroundColor: BRAND.greenDark,
              boxShadow: '0 10px 24px -6px rgba(76,174,58,0.65)',
            },
          },
          containedSecondary: {
            backgroundColor: BRAND.gold,
            color: BRAND.brown,
            boxShadow: '0 6px 18px -6px rgba(255,179,48,0.55)',
            '&:hover': {
              backgroundColor: BRAND.goldDark,
              boxShadow: '0 10px 24px -6px rgba(255,179,48,0.65)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: '0 2px 12px rgba(42,24,16,0.06)',
            borderRadius: 16,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          rounded: { borderRadius: 16 },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: { boxShadow: 'none' },
        },
      },
    },
  },
  heIL,
);
