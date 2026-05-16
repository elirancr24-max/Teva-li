# פרי לי — Next Steps (Morning Wake-up)

## 1. Run the new DB migration

Open Supabase SQL Editor at https://supabase.com/dashboard/project/iyjxsdxebxmbrrquxbnw/sql

Paste and run the contents of:
```
apps/web/supabase/migrations/004_admin_features.sql
```

This adds:
- `image_url`, `stock`, `sort_order` columns to products
- `site_settings` table (business info, hero text, delivery fees)
- `coupons` table
- Default settings seeded

## 2. Start the dev server

```powershell
cd "C:\Users\elira\OneDrive\שולחן העבודה\peri-li-main\apps\web"
pnpm dev
```

Open http://localhost:3000

## 3. Login to admin

URL: http://localhost:3000/admin-login
Password: `admin123` (change in `.env.local` → `ADMIN_PASSWORD=...`)

## 4. What was built tonight

### Public pages
- **`/`** — full redesigned home (hero, trust badges, category grid, featured products, kayak teaser, WhatsApp CTA)
- **`/shop`** — already had 110 products from earlier migration
- **`/kayak`** — kayak configurator (S/M/L/XL → fruits → extras → event details → submit)
- **`/about`** — family story + values + timeline
- **`/contact`** — WhatsApp / phone / email / address + contact form
- **`/cart`**, **`/checkout`** — already worked

### Admin pages
- **`/admin`** — dashboard (KPIs + recent orders)
- **`/admin/orders`** — orders table with status updates
- **`/admin/kayaks`** — kayak orders with approve/reject
- **`/admin/products`** — products table + **create/edit/delete with image URL** ✨
- **`/admin/categories`** — categories CRUD ✨
- **`/admin/settings`** — business info, hero text, delivery fees, banner ✨
- **`/admin/coupons`** — coupon codes CRUD ✨

### What admin can change
- All product prices, images, names, descriptions, stock, active status
- All categories
- Business name, phone, WhatsApp, email, address, hours
- Hero title and subtitle on home page
- Banner message (shows at top of site if non-empty)
- Delivery fee + min order amount
- Coupon codes with % discount + expiry

## 5. To go fully live

The only thing left is **payments**:
- Add `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to `.env.local`
- Configure Stripe webhook to `/api/webhooks/stripe`
- Add `STRIPE_WEBHOOK_SECRET` to env

Also recommended:
- Add `RESEND_API_KEY` for transactional emails
- Upload actual product images (paste URLs in admin) — currently uses emojis as fallback
- Update business contact info in `/admin/settings`

## 6. Deploy

When ready:
```powershell
pnpm build
```

Deploy to Vercel: `vercel --prod` (or push to GitHub with Vercel auto-deploy configured).
