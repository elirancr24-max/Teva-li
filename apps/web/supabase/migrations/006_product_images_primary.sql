-- 006_product_images_primary.sql — flag primary image per product
-- Run via: paste into Supabase SQL editor. Idempotent.

ALTER TABLE product_images
  ADD COLUMN IF NOT EXISTS is_primary boolean DEFAULT false;

CREATE INDEX IF NOT EXISTS idx_product_images_primary
  ON product_images(product_id)
  WHERE is_primary = true;
