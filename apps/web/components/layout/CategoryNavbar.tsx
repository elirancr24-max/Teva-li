'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Box, Stack, Typography } from '@mui/material';
import { BRAND } from '@/lib/theme';
import type { Category } from '@/types/shop';

type Item = { label: string; href: string; matchSlug?: string | null };

export function CategoryNavbar({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCat = searchParams.get('cat');

  const items: Item[] = [
    { label: 'כל המוצרים', href: '/shop', matchSlug: null },
    ...categories.map((c) => ({
      label: c.name,
      href: `/shop?cat=${c.slug}`,
      matchSlug: c.slug,
    })),
    { label: 'קיאקי פירות', href: '/kayak' },
  ];

  return (
    <Box
      sx={{
        position: 'sticky',
        top: { xs: 64, md: 80 },
        zIndex: 10,
        bgcolor: '#fff',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
      }}
    >
      <Stack
        direction="row"
        spacing={0}
        sx={{
          maxWidth: 1400,
          mx: 'auto',
          px: { xs: 1, md: 3 },
          overflowX: 'auto',
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
        }}
      >
        {items.map((item) => {
          const isShop = item.href.startsWith('/shop');
          const isKayak = item.href === '/kayak';
          const isActive = isKayak
            ? pathname === '/kayak'
            : isShop && pathname === '/shop' && (activeCat ?? null) === (item.matchSlug ?? null);

          return (
            <Link key={item.href + item.label} href={item.href} scroll={false}>
              <Box
                sx={{
                  px: 2.5,
                  py: 2,
                  borderBottom: '3px solid',
                  borderColor: isActive ? BRAND.green : 'transparent',
                  whiteSpace: 'nowrap',
                  transition: 'border-color 160ms, color 160ms',
                  '&:hover': { borderColor: isActive ? BRAND.green : 'rgba(0,0,0,0.1)' },
                }}
              >
                <Typography
                  sx={{
                    fontSize: 15,
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? BRAND.green : 'rgba(0,0,0,0.75)',
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            </Link>
          );
        })}
      </Stack>
    </Box>
  );
}
