'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Box, Stack } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useAppSelector } from '@/store';
import { BRAND } from '@/lib/brand';

const WA_HREF = 'https://wa.me/972548897445';

interface Tab {
  label: string;
  icon: React.ElementType;
  href: string;
  isCart?: boolean;
  isWhatsApp?: boolean;
  external?: boolean;
}

const TABS: Tab[] = [
  { label: 'ראשי', icon: HomeOutlinedIcon, href: '/' },
  { label: 'חנות', icon: GridViewOutlinedIcon, href: '/shop' },
  { label: 'עגלה', icon: ShoppingCartOutlinedIcon, href: '/cart', isCart: true },
  { label: 'וואטסאפ', icon: WhatsAppIcon, href: WA_HREF, isWhatsApp: true, external: true },
];

export function BottomNav() {
  const pathname = usePathname();
  const cartCount = useAppSelector((s) => s.cart.items.length);

  const isAdmin = pathname?.startsWith('/admin') || pathname === '/admin-login';

  /* Smart hide/show on scroll — hides when scrolling down, shows on scroll up */
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      if (Math.abs(y - lastY.current) < 6) return;
      setVisible(y < lastY.current || y < 80);
      lastY.current = y;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (isAdmin) return null;

  return (
    <>
    {/* Screen reader announcement for cart count changes */}
    <Box
      role="status"
      aria-live="polite"
      aria-atomic="true"
      sx={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}
    >
      {cartCount > 0 ? `${cartCount} פריטים בעגלה` : 'העגלה ריקה'}
    </Box>
    <Box
      component="nav"
      aria-label="ניווט תחתון"
      sx={{
        display: { xs: 'flex', md: 'none' },
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        flexDirection: 'row',
        alignItems: 'stretch',
        bgcolor: 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderTop: '0.5px solid rgba(0,0,0,0.12)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 260ms cubic-bezier(0.4,0,0.2,1)',
        willChange: 'transform',
      }}
    >
      {TABS.map(({ label, icon: Icon, href, isCart, isWhatsApp, external }) => {
        const isActive = !isWhatsApp && (href === '/' ? pathname === '/' : pathname.startsWith(href));
        const count = isCart ? cartCount : 0;

        return (
          <Box
            key={href}
            component={Link}
            href={href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            aria-label={label}
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              py: '10px',
              minHeight: 64,
              textDecoration: 'none',
              color: isWhatsApp ? '#fff' : isActive ? BRAND.green : 'rgba(0,0,0,0.45)',
              bgcolor: isWhatsApp ? BRAND.green : 'transparent',
              position: 'relative',
              transition: 'color 160ms, background-color 160ms, transform 120ms',
              '&:active': {
                transform: 'scale(0.88)',
                bgcolor: isWhatsApp ? BRAND.greenDark : 'rgba(0,0,0,0.04)',
              },
            }}
          >
            {/* Active indicator dot */}
            {isActive && !isWhatsApp && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 6,
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  bgcolor: BRAND.green,
                }}
              />
            )}

            {/* Icon + badge */}
            <Box sx={{ position: 'relative' }}>
              <Icon sx={{ fontSize: 24 }} />
              {count > 0 && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: -5,
                    left: -6,
                    minWidth: 16,
                    height: 16,
                    borderRadius: 999,
                    bgcolor: BRAND.gold,
                    color: BRAND.brown,
                    fontSize: 10,
                    fontWeight: 900,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: 0.5,
                    lineHeight: 1,
                  }}
                >
                  {count > 9 ? '9+' : count}
                </Box>
              )}
            </Box>

            <Box
              component="span"
              sx={{
                fontSize: 11,
                fontWeight: isActive ? 700 : 500,
                letterSpacing: '0.01em',
                lineHeight: 1,
              }}
            >
              {label}
            </Box>
          </Box>
        );
      })}
    </Box>
    </>
  );
}
