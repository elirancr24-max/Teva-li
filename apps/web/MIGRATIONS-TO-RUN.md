# Migrations to run in Supabase SQL Editor

Run these in order in the Supabase dashboard (SQL Editor) for project
`iyjxsdxebxmbrrquxbnw`. Both are idempotent — re-running is safe.

After both migrations are applied, run the seed script:
```
cd apps/web
node scripts/seed-from-catalog.mjs
```

---

## 1. `supabase/migrations/005_seed_from_meshek.sql`

Deactivates legacy storefront categories and inserts the new Meshek Dahan
category set (`vegetables`, `fruits`, `mushrooms`, `dried`, `spreads`,
`grocery`).

```sql
-- 005_seed_from_meshek.sql — DDL/category changes for Meshek Dahan catalog import
UPDATE products SET active = false
WHERE category_id IN (
  SELECT id FROM categories WHERE slug IN (
    'boxes', 'peeled', 'extras', 'citrus', 'berries', 'salads', 'whole-fruit'
  )
);

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
```

---

## 2. `supabase/migrations/006_product_images_primary.sql`

Adds `is_primary` flag to `product_images` plus partial index.

```sql
ALTER TABLE product_images
  ADD COLUMN IF NOT EXISTS is_primary boolean DEFAULT false;

CREATE INDEX IF NOT EXISTS idx_product_images_primary
  ON product_images(product_id)
  WHERE is_primary = true;
```
