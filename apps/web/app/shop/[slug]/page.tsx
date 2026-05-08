import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { ProductDetail } from '@/components/shop/ProductDetail';
import type { Product, Review } from '@/types/db';

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: raw } = await supabase.from('products').select('*').eq('slug', slug).single();
  const data = raw as Product | null;
  if (!data) return { title: 'מוצר · פרי לי' };
  return {
    title: `${data.name_he} · פרי לי`,
    description: data.description_he ?? undefined,
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: rawProduct } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('active', true)
    .single();
  const product = rawProduct as Product | null;

  if (!product) notFound();

  const { data: rawReviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('product_id', product.id)
    .order('created_at', { ascending: false })
    .limit(10);
  const reviews = rawReviews as Review[] | null;

  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SiteHeader active="shop" />
      <ProductDetail product={product} reviews={reviews ?? []} />
      <SiteFooter />
    </div>
  );
}
