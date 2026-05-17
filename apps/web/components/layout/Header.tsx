'use client';
import { useState } from 'react';
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

const TOP_BAR_HEIGHT = 72;
const NAV_BAR_HEIGHT = 50;

export function Header() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [q, setQ] = useState('');
  const [locOpen, setLocOpen] = useState(false);

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
          bgcolor: BRAND.brown,
          color: '#fff',
          height: TOP_BAR_HEIGHT,
          display: 'flex',
          alignItems: 'center',
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
                height: { xs: 48, md: 60 },
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
              height: 40,
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
          top: TOP_BAR_HEIGHT,
          zIndex: 99,
          bgcolor: '#fff',
          color: BRAND.ink,
          height: NAV_BAR_HEIGHT,
          borderBottom: '1px solid #eee',
          display: 'flex',
          alignItems: 'stretch',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 'xl',
            mx: 'auto',
            px: { xs: 1, md: 2 },
            display: 'flex',
            alignItems: 'stretch',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
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
      onClick={onClick}
      sx={{
        position: 'relative',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontSize: 15,
        fontWeight: active ? 700 : 500,
        color: active ? BRAND.green : BRAND.ink,
        px: '18px',
        py: '12px',
        whiteSpace: 'nowrap',
        transition: 'background-color 160ms, color 160ms',
        '&:hover': {
          bgcolor: BRAND.greenLight,
          color: BRAND.green,
        },
        '&::after': active
          ? {
              content: '""',
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: '3px',
              bgcolor: BRAND.green,
            }
          : undefined,
      }}
    >
      {label}
    </Box>
  );
}
