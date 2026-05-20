'use client';
import { useState } from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, Drawer, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { usePathname } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { BRAND } from '@/lib/brand';

const SIDEBAR_WIDTH = 220;

const PAGE_TITLES: Record<string, string> = {
  '/admin': 'לוח בקרה',
  '/admin/orders': 'הזמנות',
  '/admin/kayaks': 'קיאקים',
  '/admin/products': 'מוצרים',
  '/admin/categories': 'קטגוריות',
  '/admin/coupons': 'קופונים',
  '/admin/customers': 'לקוחות',
  '/admin/settings': 'הגדרות',
  '/admin/audit': 'יומן פעולות',
};

function pageTitle(pathname: string | null): string {
  if (!pathname) return 'אדמין';
  // Exact match first, then prefix.
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname];
  const match = Object.keys(PAGE_TITLES)
    .filter((k) => k !== '/admin' && pathname.startsWith(k))
    .sort((a, b) => b.length - a.length)[0];
  return match ? PAGE_TITLES[match] : 'אדמין';
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const close = () => setDrawerOpen(false);

  return (
    <Box sx={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
      {/* Desktop: permanent sidebar */}
      {isDesktop && <AdminSidebar onNavigate={close} />}

      {/* Mobile: temporary drawer */}
      {!isDesktop && (
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={close}
          ModalProps={{ keepMounted: true }}
          PaperProps={{ sx: { bgcolor: BRAND.ink, width: SIDEBAR_WIDTH } }}
        >
          <AdminSidebar onNavigate={close} />
        </Drawer>
      )}

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Mobile top bar */}
        {!isDesktop && (
          <AppBar
            position="sticky"
            elevation={0}
            sx={{
              bgcolor: BRAND.ink,
              color: BRAND.paper,
              borderBottom: `2px solid ${BRAND.ink}`,
            }}
          >
            <Toolbar sx={{ minHeight: 56, px: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ fontWeight: 900, fontSize: 18, letterSpacing: '-0.02em' }}>
                {pageTitle(pathname)}
              </Typography>
              <IconButton
                onClick={() => setDrawerOpen(true)}
                aria-label="פתיחת תפריט אדמין"
                sx={{ color: BRAND.paper }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        )}

        <Box sx={{ flex: 1, overflow: 'auto', bgcolor: '#f8f7f5' }}>{children}</Box>
      </Box>
    </Box>
  );
}
