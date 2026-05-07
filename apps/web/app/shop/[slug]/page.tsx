import type { Metadata } from 'next';
import { PlaceholderPage } from '@/components/layout/PlaceholderPage';

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `מוצר · ${slug}`,
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  return (
    <PlaceholderPage
      title={`מוצר ${slug}`}
      subtitle="דף המוצר ייטען מ-Supabase ב-Phase 2 — תיאורים, ביקורות, גלריית תמונות, וכפתור הוספה לסל."
      phase="02"
      active="shop"
      navActive="shop"
    />
  );
}
