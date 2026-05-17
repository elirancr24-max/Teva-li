import type { MetadataRoute } from 'next';
import { getCatalog } from '@/lib/data/products';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://teva-li.com';
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`,              lastModified: now, changeFrequency: 'daily',   priority: 1.0 },
    { url: `${base}/shop`,          lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${base}/kayak`,         lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/about`,         lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/contact`,       lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/accessibility`, lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ];

  try {
    const { products, categories } = await getCatalog();
    const catRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
      url: `${base}/shop?cat=${c.slug}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.7,
    }));
    const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
      url: `${base}/shop/${p.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    }));
    return [...staticRoutes, ...catRoutes, ...productRoutes];
  } catch {
    return staticRoutes;
  }
}
