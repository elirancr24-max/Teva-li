'use client';
import { useEffect } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Provider as ReduxProvider } from 'react-redux';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { theme } from '@/lib/theme';
import { store, loadCartFromStorage } from '@/store';

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    loadCartFromStorage();
  }, []);

  return (
    <AppRouterCacheProvider
      options={{
        key: 'mui-rtl',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        stylisPlugins: [prefixer as any, rtlPlugin as any],
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ReduxProvider store={store}>{children}</ReduxProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
