-- 005_seed_from_meshek.sql — DDL/category changes for Meshek Dahan catalog import
-- Run via: paste into Supabase SQL editor.
-- Idempotent.

-- ─── Deactivate legacy categories (keep rows for rollback) ────────────────────
-- Products in these legacy categories are marked inactive so the storefront only
-- shows the new Meshek Dahan catalog. Categories rows themselves remain.
UPDATE products SET active = false
WHERE category_id IN (
  SELECT id FROM categories WHERE slug IN (
    'boxes', 'peeled', 'extras', 'citrus', 'berries', 'salads', 'whole-fruit'
  )
);

-- ─── New / updated categories ────────────────────────────────────────────────
-- categories table has: id, slug, name_he, sort_order (no name_en / active cols)
INSERT INTO categories (slug, name_he, sort_order) VALUES
  ('vegetables',  'ירקניה',                 1),
  ('fruits',      'פירות',                  2),
  ('mushrooms',   'פטריות ונבטים',          3),
  ('dried',       'פירות יבשים במשקל',      4),
  ('spreads',     'ממרחים ורטבים',          5),
  ('grocery',     'מוצרים כלליים',          6)
ON CONFLICT (slug) DO UPDATE
  SET name_he    = EXCLUDED.name_he,
      sort_order = EXCLUDED.sort_order;

-- Kayaks are NOT in products table — they live in kayak_orders. No-op for them.
