import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductDetail } from '@/components/shop/ProductDetail';
import { getCatalog } from '@/lib/data/products';

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const { products } = await getCatalog();
  const product = products.find((p) => p.slug === slug);
  if (!product) return { title: 'מוצר' };
  const desc = `${product.name} טרי במשלוח חינם בדימונה מטבע לי. ${product.weight ?? ''} · ₪${(product.priceCents / 100).toFixed(2)}.`;
  return {
    title: product.name,
    description: desc,
    openGraph: {
      title: `${product.name} · טבע לי`,
      description: desc,
      images: product.imageUrl ? [product.imageUrl] : undefined,
    },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const { products } = await getCatalog();
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://teva-li.com';
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.fullName ?? product.name,
    image: product.imageUrl ? [product.imageUrl] : undefined,
    offers: {
      '@type': 'Offer',
      url: `${siteUrl}/shop/${product.slug}`,
      priceCurrency: 'ILS',
      price: (product.priceCents / 100).toFixed(2),
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'טבע לי' },
    },
  };

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <ProductDetail product={product} />
      <Footer />
    </>
  );
}
