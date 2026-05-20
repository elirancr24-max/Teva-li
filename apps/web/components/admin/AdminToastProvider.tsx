'use client';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

type Severity = 'success' | 'error' | 'info' | 'warning';
type Toast = { id: number; message: string; severity: Severity };

type Ctx = {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
  warning: (message: string) => void;
};

const ToastContext = createContext<Ctx | null>(null);

export function AdminToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((message: string, severity: Severity) => {
    setToasts((t) => [...t, { id: Date.now() + Math.random(), message, severity }]);
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      success: (m) => push(m, 'success'),
      error: (m) => push(m, 'error'),
      info: (m) => push(m, 'info'),
      warning: (m) => push(m, 'warning'),
    }),
    [push],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toasts.map((t, i) => (
        <Snackbar
          key={t.id}
          open
          autoHideDuration={t.severity === 'error' ? 6000 : 3500}
          onClose={() => dismiss(t.id)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          sx={{ mb: i * 7 }}
        >
          <Alert
            onClose={() => dismiss(t.id)}
            severity={t.severity}
            variant="filled"
            sx={{
              borderRadius: 0,
              fontWeight: 700,
              fontFamily: 'inherit',
              minWidth: 260,
              boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
            }}
          >
            {t.message}
          </Alert>
        </Snackbar>
      ))}
    </ToastContext.Provider>
  );
}

export function useAdminToast(): Ctx {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    // Outside provider: no-op so client comps don't crash in storybook/tests.
    return {
      success: () => {},
      error: () => {},
      info: () => {},
      warning: () => {},
    };
  }
  return ctx;
}
