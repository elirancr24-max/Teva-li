'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Box,
  Stack,
  Typography,
  Button,
  IconButton,
  Badge,
  InputBase,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { useAppDispatch, useAppSelector } from '@/store';
import { setActiveCategory } from '@/store/slices/categoriesSlice';
import { BRAND } from '@/lib/brand';

const TOP_BAR_HEIGHT_MD = 72;
const TOP_BAR_HEIGHT_XS = 64;
const NAV_BAR_HEIGHT_XS = 56;
const NAV_BAR_HEIGHT_MD = 48;

export function Header() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [q, setQ] = useState('');
  const [locOpen, setLocOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 8); }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const cartCount = useAppSelector((s) => s.cart.items.length);
  const categoryIds = useAppSelector((s) => s.categories.ids);
  const categoriesById = useAppSelector((s) => s.categories.byId);
  const activeCategoryId = useAppSelector((s) => s.categories.activeCategoryId);
  const categories = categoryIds.map((id) => categoriesById[id]).filter(Boolean);

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    if (q.trim()) router.push(`/shop?q=${encodeURIComponent(q.trim())}`);
  }

  function handleCategoryClick(catId: string | null, slug?: string) {
    dispatch(setActiveCategory(catId));
    router.push(slug ? `/shop?cat=${slug}` : '/shop');
  }

  return (
    <>
      {/* Top brown bar */}
      <Box
        component="header"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          bgcolor: scrolled ? 'rgba(42,24,16,0.90)' : BRAND.brown,
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          color: '#fff',
          height: { xs: TOP_BAR_HEIGHT_XS, md: TOP_BAR_HEIGHT_MD },
          display: 'flex',
          alignItems: 'center',
          transition: 'background-color 300ms ease, backdrop-filter 300ms ease',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 'xl',
            mx: 'auto',
            px: { xs: 1, sm: 2 },
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 1, md: 2 },
          }}
        >
          {/* Right (logical first) — Logo image */}
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              textDecoration: 'none',
              color: 'inherit',
              flexShrink: 0,
            }}
          >
            <Box
              component="img"
              src="/logo-teva-trans.png"
              alt="טבע לי"
              sx={{
                height: { xs: 52, md: 68 },
                width: 'auto',
                display: 'block',
                filter:
                  'drop-shadow(0 0 4px rgba(255,255,255,0.95)) drop-shadow(0 0 12px rgba(255,255,255,0.7)) drop-shadow(0 4px 8px rgba(0,0,0,0.35))',
              }}
            />
          </Link>

          {/* Center — Search bar */}
          <Box
            component="form"
            onSubmit={submitSearch}
            sx={{
              flex: 1,
              maxWidth: 560,
              mx: 'auto',
              display: 'flex',
              alignItems: 'center',
              bgcolor: '#fff',
              borderRadius: '24px',
              px: 1.5,
              py: 0.5,
              height: { xs: 44, md: 44 },
            }}
          >
            <IconButton
              type="submit"
              size="small"
              sx={{ color: BRAND.brown, p: 0.5 }}
              aria-label="חיפוש"
            >
              <SearchIcon sx={{ fontSize: 20 }} />
            </IconButton>
            <InputBase
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="חיפוש מוצר"
              sx={{
                flex: 1,
                fontSize: 15,
                color: BRAND.ink,
                px: 1,
              }}
              inputProps={{ 'aria-label': 'חיפוש מוצר' }}
            />
          </Box>

          {/* Left actions */}
          <Stack
            direction="row"
            spacing={{ xs: 0.5, md: 1 }}
            sx={{ alignItems: 'center', flexShrink: 0 }}
          >
            <Button
              onClick={() => setLocOpen(true)}
              startIcon={<PlaceOutlinedIcon />}
              sx={{
                color: '#fff',
                display: { xs: 'none', md: 'inline-flex' },
                fontSize: 14,
                '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
              }}
            >
              לאן מגיעים? <Box component="span" sx={{ ml: 0.5, opacity: 0.85 }}>· דימונה</Box>
            </Button>
            <Button
              component={Link}
              href="/admin-login"
              startIcon={<PersonOutlineIcon />}
              sx={{
                color: '#fff',
                display: { xs: 'none', md: 'inline-flex' },
                fontSize: 14,
                '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
              }}
            >
              הרשמה / התחברות
            </Button>
            <IconButton
              component={Link}
              href="/cart"
              sx={{ color: '#fff' }}
              aria-label="עגלה"
            >
              <Badge badgeContent={cartCount} color="primary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
          </Stack>
        </Box>
      </Box>

      {/* Category nav bar */}
      <Box
        component="nav"
        sx={{
          position: 'sticky',
          top: { xs: TOP_BAR_HEIGHT_XS, md: TOP_BAR_HEIGHT_MD },
          zIndex: 99,
          bgcolor: scrolled ? 'rgba(255,255,255,0.96)' : '#fff',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          color: BRAND.ink,
          height: { xs: NAV_BAR_HEIGHT_XS, md: NAV_BAR_HEIGHT_MD },
          borderBottom: `2px solid ${BRAND.greenLight}`,
          display: 'flex',
          alignItems: 'center',
          transition: 'background-color 300ms ease',
        }}
      >
        <Box
          role="tablist"
          aria-label="קטגוריות מוצרים"
          sx={{
            width: '100%',
            maxWidth: 'xl',
            mx: 'auto',
            px: { xs: 1.5, md: 2 },
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 1, md: 0 },
            overflowX: 'auto',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <CategoryButton
            label="כל המוצרים"
            active={!activeCategoryId}
            onClick={() => handleCategoryClick(null)}
          />
          {categories.map((c) => (
            <CategoryButton
              key={c.id}
              label={c.name}
              active={activeCategoryId === c.id}
              onClick={() => handleCategoryClick(c.id, c.slug)}
            />
          ))}
        </Box>
      </Box>

      {/* Location placeholder dialog */}
      <Dialog open={locOpen} onClose={() => setLocOpen(false)}>
        <DialogTitle>לאן מגיעים?</DialogTitle>
        <DialogContent>
          <Typography sx={{ fontSize: 15 }}>
            כרגע משלוחים זמינים בדימונה בלבד.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLocOpen(false)} variant="contained">
            סגירה
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function CategoryButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Box
      component="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      sx={{
        /* Mobile: pill chip */
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'inherit',
        whiteSpace: 'nowrap',
        flexShrink: 0,
        transition: 'background-color 160ms, color 160ms, box-shadow 160ms',
        /* Mobile styles — pill */
        borderRadius: { xs: 999, md: 0 },
        fontSize: { xs: 14, md: 15 },
        fontWeight: active ? 800 : 600,
        px: { xs: '16px', md: '18px' },
        py: { xs: '8px', md: '12px' },
        minHeight: { xs: 40, md: 'auto' },
        bgcolor: {
          xs: active ? BRAND.green : 'rgba(0,0,0,0.06)',
          md: 'transparent',
        },
        color: {
          xs: active ? '#fff' : BRAND.ink,
          md: active ? BRAND.green : BRAND.ink,
        },
        boxShadow: {
          xs: active ? `0 4px 12px rgba(15,40,24,0.25)` : 'none',
          md: 'none',
        },
        position: 'relative',
        /* Desktop: underline indicator */
        '&::after': {
          content: '""',
          display: { xs: 'none', md: 'block' },
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '3px',
          bgcolor: active ? BRAND.green : 'transparent',
          transition: 'background-color 160ms',
        },
        '&:hover': {
          bgcolor: {
            xs: active ? BRAND.greenDark : 'rgba(0,0,0,0.10)',
            md: BRAND.greenLight,
          },
          color: {
            xs: active ? '#fff' : BRAND.ink,
            md: BRAND.green,
          },
        },
      }}
    >
      {label}
    </Box>
  );
}
