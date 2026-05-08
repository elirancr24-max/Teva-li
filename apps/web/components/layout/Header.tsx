'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  Box,
  InputBase,
  IconButton,
  Badge,
  Stack,
  Typography,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { useAppSelector } from '@/store';
import { BRAND } from '@/lib/theme';

export function Header() {
  const router = useRouter();
  const [q, setQ] = useState('');
  const cartCount = useAppSelector((s) => s.cart.items.length);

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    if (q.trim()) router.push(`/shop?q=${encodeURIComponent(q.trim())}`);
  }

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: BRAND.ink,
        color: '#F5F0E8',
        borderBottom: `2px solid ${BRAND.green}`,
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 64, md: 80 }, px: { xs: 2, md: 4 }, gap: 2 }}>
        {/* Logo + brand */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Image
            src="/logo.png"
            alt="פרי לי"
            width={56}
            height={56}
            priority
            style={{ objectFit: 'contain', flexShrink: 0 }}
          />
          <Stack sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <Typography sx={{ fontSize: 22, fontWeight: 800, lineHeight: 1, color: '#F5F0E8' }}>
              פרי לי
            </Typography>
            <Typography sx={{ fontSize: 11, opacity: 0.65, letterSpacing: '0.06em', color: '#F5F0E8' }}>
              דימונה · מאז 2019
            </Typography>
          </Stack>
        </Link>

        {/* Search */}
        <Box
          component="form"
          onSubmit={submitSearch}
          sx={{
            flex: 1,
            maxWidth: 600,
            mx: { xs: 0, md: 'auto' },
            display: 'flex',
            alignItems: 'center',
            bgcolor: '#fff',
            borderRadius: '999px',
            px: 2,
            py: 0.5,
          }}
        >
          <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
          <InputBase
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="חיפוש מוצר…"
            sx={{ flex: 1, fontSize: 15 }}
          />
          <IconButton type="submit" size="small" sx={{ color: BRAND.green }} aria-label="חיפוש">
            <SearchIcon />
          </IconButton>
        </Box>

        {/* Right actions (in RTL = visual left) */}
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Button
            component={Link}
            href="/delivery-areas"
            startIcon={<PlaceOutlinedIcon />}
            sx={{
              color: '#F5F0E8',
              display: { xs: 'none', md: 'inline-flex' },
              '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
            }}
          >
            לאן מגיעים?
          </Button>
          <Button
            component={Link}
            href="/account"
            startIcon={<PersonOutlineIcon />}
            sx={{
              color: '#F5F0E8',
              display: { xs: 'none', md: 'inline-flex' },
              '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
            }}
          >
            התחברות
          </Button>
          <IconButton
            component={Link}
            href="/cart"
            sx={{ color: '#F5F0E8' }}
            aria-label="עגלה"
          >
            <Badge badgeContent={cartCount} color="primary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
