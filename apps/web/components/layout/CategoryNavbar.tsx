'use client';
import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppDispatch } from '@/store';
import { setActiveCategory, setCategories } from '@/store/slices/categoriesSlice';
import type { Category } from '@/types/shop';

/**
 * Header now renders the category nav bar (driven from Redux state).
 * This component is kept for backward compatibility with existing pages
 * (`/`, `/shop`) — its only job is to seed the Redux store with the SSR
 * categories list and active category from the `?cat=` query param so the
 * Header's category bar is populated on first paint.
 *
 * Renders nothing visually.
 */
function CategorySync({ categories }: { categories: Category[] }) {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const activeSlug = searchParams.get('cat');

  useEffect(() => {
    dispatch(setCategories(categories));
  }, [dispatch, categories]);

  useEffect(() => {
    const id = activeSlug
      ? categories.find((c) => c.slug === activeSlug)?.id ?? null
      : null;
    dispatch(setActiveCategory(id));
  }, [dispatch, activeSlug, categories]);

  return null;
}

export function CategoryNavbar({ categories }: { categories: Category[] }) {
  return (
    <Suspense fallback={null}>
      <CategorySync categories={categories} />
    </Suspense>
  );
}
