'use client';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

export function createRtlCache() {
  return createCache({
    key: 'mui-rtl',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    stylisPlugins: [prefixer as any, rtlPlugin as any],
  });
}
