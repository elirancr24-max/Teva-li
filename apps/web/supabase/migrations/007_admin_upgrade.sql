-- Admin panel upgrade: audit log, internal notes on orders, perf indexes.
-- Idempotent; safe to re-run.

create table if not exists admin_audit_log (
  id uuid primary key default gen_random_uuid(),
  action text not null,
  target_type text,
  target_id text,
  payload jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_audit_created on admin_audit_log (created_at desc);

alter table orders add column if not exists notes_internal text;

create index if not exists idx_orders_status_created on orders (status, created_at desc);
create index if not exists idx_products_active_cat on products (active, category_id);
