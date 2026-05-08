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
  if (!product) return { title: 'מוצר · פרי לי' };
  return {
    title: `${product.name} · פרי לי`,
    description: product.fullName ?? product.name,
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const { products } = await getCatalog();
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  return (
    <>
      <Header />
      <ProductDetail product={product} />
      <Footer />
    </>
  );
}
