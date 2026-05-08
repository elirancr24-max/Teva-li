'use client';
import { useMemo, useEffect } from 'react';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Provider as ReduxProvider } from 'react-redux';
import { theme } from '@/lib/theme';
import { createRtlCache } from '@/lib/emotion-cache';
import { store, loadCartFromStorage } from '@/store';

export function Providers({ children }: { children: React.ReactNode }) {
  const cache = useMemo(() => createRtlCache(), []);

  useEffect(() => {
    loadCartFromStorage();
  }, []);

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ReduxProvider store={store}>{children}</ReduxProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
