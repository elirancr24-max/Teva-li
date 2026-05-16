'use client';
import { createTheme } from '@mui/material/styles';
import { heIL } from '@mui/material/locale';

export const BRAND = {
  green: '#8CBE3C',
  greenDark: '#7AA635',
  greenLight: '#F4FAEB',
  brown: '#47251C',
  cream: '#F0EFEC',
  ink: '#0D0D0D',
  paper: '#FFFFFF',
} as const;

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
        main: BRAND.brown,
        contrastText: '#fff',
      },
      grey: {
        50: '#F7F6F5',
        100: '#F5F3F0',
        200: '#EDECE9',
        300: '#CBC9C6',
      },
      background: {
        default: BRAND.cream,
        paper: BRAND.paper,
      },
      text: {
        primary: '#1f1f1f',
        secondary: '#5b5b5b',
      },
      divider: 'rgba(0,0,0,0.08)',
    },
    typography: {
      fontFamily: 'var(--font-rubik), var(--font-heebo), Rubik, Heebo, system-ui, Arial, sans-serif',
      h1: { fontWeight: 800, letterSpacing: '-0.02em' },
      h2: { fontWeight: 800, letterSpacing: '-0.02em', fontSize: '1.6rem' },
      h3: { fontWeight: 700, letterSpacing: '-0.01em' },
      h6: { fontWeight: 700 },
      button: { fontWeight: 700 },
    },
    shape: { borderRadius: 8 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 700,
          },
          containedPrimary: {
            backgroundColor: BRAND.green,
            '&:hover': { backgroundColor: BRAND.greenDark },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
            borderRadius: 8,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          rounded: { borderRadius: 8 },
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
