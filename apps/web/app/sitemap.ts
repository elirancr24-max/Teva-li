import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://teva-li.com';
  const now = new Date();
  const routes = ['', '/shop', '/kayak', '/about', '/contact', '/cart'];
  return routes.map((r) => ({
    url: `${base}${r}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: r === '' ? 1 : r === '/shop' ? 0.9 : 0.7,
  }));
}
