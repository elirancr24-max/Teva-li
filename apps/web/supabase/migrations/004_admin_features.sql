-- Phase 4: Admin features — image URLs, stock, sort, settings, coupons
-- Run via: paste into Supabase SQL editor

-- Extend products
alter table products add column if not exists image_url text;
alter table products add column if not exists stock int default 100;
alter table products add column if not exists sort_order int default 0;

-- Site settings (key/value)
create table if not exists site_settings (
  key   text primary key,
  value text not null,
  updated_at timestamptz default now()
);

-- Coupons
create table if not exists coupons (
  id            uuid primary key default gen_random_uuid(),
  code          text unique not null,
  discount_pct  int not null check (discount_pct between 1 and 100),
  active        boolean default true,
  expires_at    timestamptz,
  created_at    timestamptz default now()
);

-- RLS
alter table site_settings enable row level security;
alter table coupons       enable row level security;

create policy "public read site_settings"
  on site_settings for select using (true);

create policy "public read active coupons"
  on coupons for select using (active = true and (expires_at is null or expires_at > now()));

create policy "admin all site_settings"
  on site_settings for all using (is_admin());

create policy "admin all coupons"
  on coupons for all using (is_admin());

-- Seed default settings
insert into site_settings (key, value) values
  ('business_name',      'פרי לי'),
  ('business_phone',     '054-1234567'),
  ('business_whatsapp',  '972541234567'),
  ('business_email',     'orders@peri-li.com'),
  ('business_address',   'דימונה'),
  ('business_hours',     'א-ה 8:00-19:00 · ו 8:00-13:00'),
  ('delivery_fee_cents', '2500'),
  ('min_order_cents',    '8000'),
  ('hero_title',         'פירות טריים. ישר לדלת.'),
  ('hero_subtitle',      'פרי לי דימונה — חתוך, ארוז, מוכן לאכילה. מאז 2019.'),
  ('banner_message',     '')
on conflict (key) do nothing;
