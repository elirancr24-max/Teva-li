import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CategoryNavbar } from '@/components/layout/CategoryNavbar';
import { ShopClient } from '@/components/shop/ShopClient';
import { getCatalog } from '@/lib/data/products';

export const metadata: Metadata = {
  title: 'קטלוג · פרי לי',
  description: 'פירות וירקות טריים. נחתכים בבוקר, נארזים במקרר. משלוח חינם בדימונה.',
};

type SearchParams = Promise<{ cat?: string }>;

export default async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const { cat } = await searchParams;
  const { products, categories } = await getCatalog();

  const activeCategoryName = cat ? categories.find((c) => c.slug === cat)?.name : undefined;

  return (
    <>
      <Header />
      <CategoryNavbar categories={categories} />
      <ShopClient
        products={products}
        categories={categories}
        activeCategorySlug={cat ?? null}
        title={activeCategoryName ?? 'כל המוצרים'}
      />
      <Footer />
    </>
  );
}
