'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Box } from '@mui/material';
import { BRAND } from '@/lib/brand';

const OPTIONS: { value: '7d' | '30d' | '90d'; label: string }[] = [
  { value: '7d', label: '7 ימים' },
  { value: '30d', label: '30 ימים' },
  { value: '90d', label: '90 ימים' },
];

export function RangeSelector({ current }: { current: '7d' | '30d' | '90d' }) {
  const pathname = usePathname();
  const params = useSearchParams();

  function href(value: string) {
    const p = new URLSearchParams(params?.toString() ?? '');
    p.set('range', value);
    return `${pathname}?${p.toString()}`;
  }

  return (
    <Box
      role="tablist"
      aria-label="טווח תאריכים"
      sx={{ display: 'flex', border: `2px solid ${BRAND.ink}` }}
    >
      {OPTIONS.map((o) => {
        const active = o.value === current;
        return (
          <Link key={o.value} href={href(o.value)} style={{ textDecoration: 'none' }} prefetch={false}>
            <Box
              role="tab"
              aria-selected={active}
              sx={{
                px: 2,
                py: 1,
                bgcolor: active ? BRAND.ink : '#fff',
                color: active ? BRAND.paper : BRAND.ink,
                fontFamily: 'monospace',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderLeft: '1px solid #ddd',
                cursor: 'pointer',
                '&:hover': { bgcolor: active ? BRAND.ink : '#f0efec' },
              }}
            >
              {o.label}
            </Box>
          </Link>
        );
      })}
    </Box>
  );
}
