-- Phase 2: Peri Li initial schema
-- Run via: supabase db push  OR  paste into Supabase SQL editor

-- ─── Extensions ───────────────────────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ─── Categories ───────────────────────────────────────────────────────────────
create table if not exists categories (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  name_he     text not null,
  sort_order  int  not null default 0
);

-- ─── Products ─────────────────────────────────────────────────────────────────
create table if not exists products (
  id               uuid    primary key default gen_random_uuid(),
  slug             text    unique not null,
  name_he          text    not null,
  name_en          text,
  category_id      uuid    references categories(id),
  kind             text    not null,
  price_cents      int     not null,
  weight           text    not null,
  description_he   text,
  description_en   text,
  rating           numeric(2,1) default 4.5,
  reviews_count    int     default 0,
  tag              text,
  active           boolean default true,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

create table if not exists product_images (
  id          uuid primary key default gen_random_uuid(),
  product_id  uuid not null references products(id) on delete cascade,
  url         text not null,
  alt         text,
  sort_order  int  default 0
);

-- ─── Customers ────────────────────────────────────────────────────────────────
create table if not exists customers (
  id               uuid primary key default gen_random_uuid(),
  auth_user_id     uuid unique references auth.users(id) on delete set null,
  name             text,
  phone            text,
  email            text,
  default_address  text,
  created_at       timestamptz default now()
);

-- ─── Orders ───────────────────────────────────────────────────────────────────
create table if not exists orders (
  id                      uuid    primary key default gen_random_uuid(),
  customer_id             uuid    references customers(id),
  items                   jsonb   not null default '[]',
  subtotal_cents          int     not null,
  delivery_cents          int     not null default 0,
  total_cents             int     not null,
  status                  text    not null default 'pending',
  stripe_payment_intent   text,
  delivery_date           date,
  delivery_address        text,
  delivery_window         text,
  notes                   text,
  created_at              timestamptz default now(),
  updated_at              timestamptz default now(),

  constraint orders_status_check check (
    status in ('pending','paid','preparing','shipped','delivered','cancelled')
  )
);

-- ─── Reviews ──────────────────────────────────────────────────────────────────
create table if not exists reviews (
  id           uuid primary key default gen_random_uuid(),
  product_id   uuid not null references products(id) on delete cascade,
  customer_id  uuid references customers(id) on delete set null,
  rating       int  not null check (rating between 1 and 5),
  body_he      text,
  created_at   timestamptz default now()
);

-- ─── Kayak sizes ──────────────────────────────────────────────────────────────
create table if not exists kayak_sizes (
  id           text primary key,
  label        text not null,
  guests       text not null,
  price_cents  int  not null
);

-- ─── Kayak orders ─────────────────────────────────────────────────────────────
create table if not exists kayak_orders (
  id               uuid    primary key default gen_random_uuid(),
  customer_id      uuid    references customers(id),
  size_id          text    references kayak_sizes(id),
  fruits           text[]  default '{}',
  extras           text[]  default '{}',
  event_type       text,
  event_date       date,
  guests           int,
  delivery_address text,
  notes            text,
  status           text    not null default 'pending',
  total_cents      int,
  stripe_payment_intent text,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now(),

  constraint kayak_orders_status_check check (
    status in ('pending','approved','in_prep','ready','delivered','cancelled')
  )
);

-- ─── Admin users ──────────────────────────────────────────────────────────────
create table if not exists admin_users (
  auth_user_id  uuid primary key references auth.users(id) on delete cascade,
  role          text not null default 'admin',
  created_at    timestamptz default now()
);

-- ─── Updated_at trigger ───────────────────────────────────────────────────────
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger products_updated_at
  before update on products for each row execute function update_updated_at();

create trigger orders_updated_at
  before update on orders for each row execute function update_updated_at();

create trigger kayak_orders_updated_at
  before update on kayak_orders for each row execute function update_updated_at();

-- ─── RLS ──────────────────────────────────────────────────────────────────────
alter table categories     enable row level security;
alter table products       enable row level security;
alter table product_images enable row level security;
alter table customers      enable row level security;
alter table orders         enable row level security;
alter table reviews        enable row level security;
alter table kayak_sizes    enable row level security;
alter table kayak_orders   enable row level security;
alter table admin_users    enable row level security;

-- Public read: catalog + kayak sizes
create policy "public read categories"
  on categories for select using (true);

create policy "public read active products"
  on products for select using (active = true);

create policy "public read product_images"
  on product_images for select using (true);

create policy "public read kayak_sizes"
  on kayak_sizes for select using (true);

create policy "public read reviews"
  on reviews for select using (true);

-- Customers: own row only
create policy "customers own row select"
  on customers for select
  using (auth.uid() = auth_user_id);

create policy "customers own row insert"
  on customers for insert
  with check (auth.uid() = auth_user_id);

create policy "customers own row update"
  on customers for update
  using (auth.uid() = auth_user_id);

-- Orders: own orders only
create policy "orders own select"
  on orders for select
  using (
    customer_id in (
      select id from customers where auth_user_id = auth.uid()
    )
  );

create policy "orders own insert"
  on orders for insert
  with check (
    customer_id in (
      select id from customers where auth_user_id = auth.uid()
    )
  );

-- Kayak orders: own only
create policy "kayak_orders own select"
  on kayak_orders for select
  using (
    customer_id in (
      select id from customers where auth_user_id = auth.uid()
    )
  );

create policy "kayak_orders own insert"
  on kayak_orders for insert
  with check (true); -- allow guest submissions (customer_id nullable)

-- Admin bypass via helper function
create or replace function is_admin()
returns boolean language sql security definer as $$
  select exists (
    select 1 from admin_users where auth_user_id = auth.uid()
  );
$$;

-- Admin can do everything on all tables
create policy "admin all products"
  on products for all using (is_admin());

create policy "admin all orders"
  on orders for all using (is_admin());

create policy "admin all kayak_orders"
  on kayak_orders for all using (is_admin());

create policy "admin all customers"
  on customers for all using (is_admin());

create policy "admin all reviews"
  on reviews for all using (is_admin());

create policy "admin all admin_users"
  on admin_users for all using (is_admin());
