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
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import LocalCafeOutlinedIcon from '@mui/icons-material/LocalCafeOutlined';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import LocalFloristOutlinedIcon from '@mui/icons-material/LocalFloristOutlined';
import FilterVintageOutlinedIcon from '@mui/icons-material/FilterVintageOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import LocalDiningOutlinedIcon from '@mui/icons-material/LocalDiningOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import { useAppDispatch, useAppSelector } from '@/store';
import { setActiveCategory } from '@/store/slices/categoriesSlice';
import { BRAND } from '@/lib/brand';

const TOP_BAR_HEIGHT_MD = 80;
const TOP_BAR_HEIGHT_XS = 60;
const NAV_BAR_HEIGHT_XS = 56;
const NAV_BAR_HEIGHT_MD = 52;

/** Icon + color config per category slug — Wolt-style colored icon circles */
interface CatIconCfg { Icon: React.ElementType; bg: string; color: string; }

const CATEGORY_ICON: Record<string, CatIconCfg> = {
  cups:       { Icon: LocalCafeOutlinedIcon,     bg: '#FFF3E0', color: '#E65100' },
  vegetables: { Icon: SpaOutlinedIcon,           bg: '#E8F5E9', color: '#2E7D32' },
  fruits:     { Icon: LocalFloristOutlinedIcon,  bg: '#FCE4EC', color: '#C62828' },
  mushrooms:  { Icon: FilterVintageOutlinedIcon, bg: '#EFEBE9', color: '#5D4037' },
  dried:      { Icon: ShoppingBagOutlinedIcon,   bg: '#FFF8E1', color: '#E65100' },
  spreads:    { Icon: LocalDiningOutlinedIcon,   bg: '#EDE7F6', color: '#512DA8' },
  grocery:    { Icon: StorefrontOutlinedIcon,    bg: '#E3F2FD', color: '#1565C0' },
};
const ICON_ALL:     CatIconCfg = { Icon: GridViewOutlinedIcon, bg: '#F1F8E9', color: BRAND.greenDark };
const ICON_DEFAULT: CatIconCfg = { Icon: SpaOutlinedIcon,     bg: '#E8F5E9', color: BRAND.green };

export function Header() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [q, setQ] = useState('');
  const [locOpen, setLocOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

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
          overflowY: 'hidden',
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
                height: { xs: 44, md: 72 },
                width: 'auto',
                display: 'block',
                filter: {
                  xs: 'drop-shadow(0 0 5px rgba(255,255,255,0.98)) drop-shadow(0 0 14px rgba(255,255,255,0.8)) drop-shadow(0 2px 6px rgba(0,0,0,0.35))',
                  md: 'drop-shadow(0 0 6px rgba(255,255,255,0.98)) drop-shadow(0 0 18px rgba(255,255,255,0.85)) drop-shadow(0 6px 12px rgba(0,0,0,0.4))',
                },
              }}
            />
          </Link>

          {/* Center — Search bar: full on desktop, icon on mobile */}
          <Box
            component="form"
            onSubmit={submitSearch}
            sx={{
              flex: 1,
              maxWidth: 560,
              mx: 'auto',
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              bgcolor: '#fff',
              borderRadius: '24px',
              px: 1.5,
              py: 0.5,
              height: 44,
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
              sx={{ flex: 1, fontSize: 15, color: BRAND.ink, px: 1 }}
              inputProps={{ 'aria-label': 'חיפוש מוצר' }}
            />
          </Box>

          {/* Left actions */}
          <Stack
            direction="row"
            spacing={{ xs: 0.5, md: 1 }}
            sx={{ alignItems: 'center', flexShrink: 0 }}
          >
            {/* Mobile: search icon toggle */}
            <IconButton
              onClick={() => setSearchOpen((v) => !v)}
              sx={{ color: '#fff', display: { xs: 'inline-flex', md: 'none' } }}
              aria-label="פתיחת חיפוש"
            >
              <SearchIcon />
            </IconButton>
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
              <Badge badgeContent={cartCount} color="error">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
          </Stack>
        </Box>
      </Box>

      {/* Mobile expandable search bar */}
      {searchOpen && (
        <Box
          component="form"
          onSubmit={(e: React.FormEvent) => { submitSearch(e); setSearchOpen(false); }}
          sx={{
            display: { xs: 'flex', md: 'none' },
            position: 'sticky',
            top: TOP_BAR_HEIGHT_XS,
            zIndex: 99,
            bgcolor: BRAND.brown,
            px: 2,
            py: 1,
            gap: 1,
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              bgcolor: '#fff',
              borderRadius: '24px',
              px: 1.5,
              height: 44,
            }}
          >
            <IconButton type="submit" size="small" sx={{ color: BRAND.brown, p: 0.5 }} aria-label="חיפוש">
              <SearchIcon sx={{ fontSize: 20 }} />
            </IconButton>
            <InputBase
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="חיפוש מוצר"
              sx={{ flex: 1, fontSize: 15, color: BRAND.ink, px: 1 }}
              inputProps={{ 'aria-label': 'חיפוש מוצר' }}
            />
          </Box>
          <IconButton onClick={() => setSearchOpen(false)} sx={{ color: '#fff' }} aria-label="סגירת חיפוש">
            <Box component="span" sx={{ fontSize: 18, lineHeight: 1 }}>✕</Box>
          </IconButton>
        </Box>
      )}

      {/* Category nav bar */}
      <Box
        component="nav"
        sx={{
          position: 'sticky',
          top: { xs: TOP_BAR_HEIGHT_XS, md: TOP_BAR_HEIGHT_MD },
          zIndex: 99,
          bgcolor: { xs: '#fff', md: scrolled ? 'rgba(255,255,255,0.96)' : '#fff' },
          backdropFilter: { xs: 'none', md: scrolled ? 'blur(16px)' : 'none' },
          WebkitBackdropFilter: { xs: 'none', md: scrolled ? 'blur(16px)' : 'none' },
          color: BRAND.ink,
          height: { xs: NAV_BAR_HEIGHT_XS, md: NAV_BAR_HEIGHT_MD },
          borderBottom: '1px solid #eee',
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
            px: { xs: 1.25, md: 2 },
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 0.75, md: 0 },
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
            iconCfg={ICON_ALL}
          />
          {categories.map((c) => (
            <CategoryButton
              key={c.id}
              label={c.name}
              active={activeCategoryId === c.id}
              onClick={() => handleCategoryClick(c.id, c.slug)}
              iconCfg={CATEGORY_ICON[c.slug] ?? ICON_DEFAULT}
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
  iconCfg,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  iconCfg: CatIconCfg;
}) {
  const { Icon, bg, color } = iconCfg;

  return (
    <Box
      component="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      sx={{
        display: 'inline-flex',
        cursor: 'pointer',
        fontFamily: 'inherit',
        flexShrink: 0,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        gap: { xs: 0.75, md: 0 },
        // Mobile: pill button; Desktop: underline tab
        border: { xs: `1.5px solid ${active ? BRAND.green : '#e5e5e5'}`, md: 'none' },
        borderRadius: { xs: 999, md: 0 },
        bgcolor: { xs: active ? BRAND.green : '#fff', md: 'transparent' },
        px: { xs: 1.5, md: '18px' },
        py: { xs: 0.75, md: '12px' },
        fontSize: { xs: 13.5, md: 15 },
        fontWeight: active ? 800 : 600,
        color: { xs: active ? '#fff' : BRAND.brown, md: active ? BRAND.green : BRAND.ink },
        whiteSpace: 'nowrap',
        transition: 'background-color 160ms, color 160ms, border-color 160ms',
        boxShadow: { xs: active ? '0 4px 12px rgba(76,174,58,0.32)' : 'none', md: 'none' },
        /* Desktop: green underline */
        '&::after': {
          content: '""',
          display: { xs: 'none', md: 'block' },
          position: 'absolute',
          left: 0, right: 0, bottom: 0,
          height: '3px',
          bgcolor: active ? BRAND.green : 'transparent',
          transition: 'background-color 160ms',
        },
        '&:hover': {
          color: { xs: active ? '#fff' : BRAND.greenDark, md: BRAND.green },
          bgcolor: { xs: active ? BRAND.greenDark : '#f5f5f5', md: 'rgba(76,174,58,0.07)' },
        },
      }}
    >
      <Icon sx={{
        fontSize: { xs: 18, md: 0 },
        display: { xs: 'inline-flex', md: 'none' },
        color: active ? '#fff' : color,
      }} />
      <Box component="span">{label}</Box>
    </Box>
  );
}
