'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import { adminLogout } from '@/app/admin/login/actions';
import { BRAND } from '@/lib/brand';

const NAV = [
  { href: '/admin',            label: 'לוח בקרה', icon: '◐' },
  { href: '/admin/orders',     label: 'הזמנות',   icon: '◊' },
  { href: '/admin/kayaks',     label: 'קיאקים',   icon: '⬡' },
  { href: '/admin/products',   label: 'מוצרים',   icon: '◇' },
  { href: '/admin/categories', label: 'קטגוריות', icon: '▦' },
  { href: '/admin/coupons',    label: 'קופונים',  icon: '✺' },
  { href: '/admin/settings',   label: 'הגדרות',   icon: '⚙' },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Box
      component="aside"
      sx={{
        width: 220,
        minHeight: '100vh',
        bgcolor: BRAND.ink,
        color: BRAND.paper,
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <Box sx={{ p: '24px 20px', borderBottom: '1px solid #333' }}>
        <Typography sx={{ fontWeight: 900, fontSize: 20, color: BRAND.paper }}>
          טבע לי
        </Typography>
        <Typography sx={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.2em', color: '#666', mt: 0.5 }}>
          ADMIN
        </Typography>
      </Box>

      {/* Nav */}
      <Box component="nav" sx={{ p: '16px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {NAV.map(({ href, label, icon }) => {
          const isActive = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);
          return (
            <Link key={href} href={href} style={{ textDecoration: 'none' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  px: 1.5,
                  py: 1.25,
                  bgcolor: isActive ? BRAND.paper : 'transparent',
                  color: isActive ? BRAND.ink : BRAND.paper,
                  borderRadius: 0,
                  cursor: 'pointer',
                  transition: 'background 160ms',
                  '&:hover': { bgcolor: isActive ? BRAND.paper : '#1a1a1a' },
                }}
              >
                <span style={{ opacity: 0.7, fontSize: 15 }}>{icon}</span>
                <Typography sx={{ fontWeight: 700, fontSize: 14, color: 'inherit' }}>
                  {label}
                </Typography>
              </Box>
            </Link>
          );
        })}
      </Box>

      {/* Logout */}
      <Box sx={{ p: '20px', borderTop: '1px solid #333' }}>
        <form action={adminLogout}>
          <Box
            component="button"
            type="submit"
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              p: '10px 12px',
              bgcolor: 'transparent',
              color: '#888',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'monospace',
              fontSize: 11,
              letterSpacing: '0.08em',
              '&:hover': { color: BRAND.paper },
            }}
          >
            <span>⎋</span> יציאה
          </Box>
        </form>
      </Box>
    </Box>
  );
}
