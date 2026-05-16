# Deploy טבע לי — Vercel Guide

## Quick deploy (Bash / PowerShell)

The CLI fails on this machine because the Windows username "אלירן" contains non-ASCII bytes that crash Vercel's User-Agent header. Use a **Vercel token** to skip the login flow:

```bash
# 1. Get a token from https://vercel.com/account/tokens
export VERCEL_TOKEN=YOUR_TOKEN_HERE

# 2. Link the existing teva-li project (only once)
cd apps/web
vercel link --yes --project teva-li --token $VERCEL_TOKEN

# 3. Push env vars (only once)
vercel env add NEXT_PUBLIC_SUPABASE_URL production --token $VERCEL_TOKEN
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production --token $VERCEL_TOKEN
vercel env add SUPABASE_SERVICE_ROLE_KEY production --token $VERCEL_TOKEN
vercel env add ADMIN_PASSWORD production --token $VERCEL_TOKEN
# (paste value when prompted — values are in apps/web/.env.local)

# 4. Deploy to production
vercel --prod --token $VERCEL_TOKEN
```

## Alternative — Git integration (one-time setup)

```bash
# 1. Create a GitHub repo at https://github.com/new (name: teva-li or any)
# 2. Locally:
git remote add origin https://github.com/YOUR_USERNAME/teva-li.git
git branch -M main
git push -u origin main

# 3. Go to https://vercel.com/dashboard → import the GitHub repo
#    - Root directory: apps/web
#    - Framework: Next.js (auto-detected)
#    - Build: pnpm build
#    - Output: .next
#    - Add env vars (see above)
#
# 4. Every push to main → auto-deploys to teva-li.vercel.app
```

## Already deployed at https://teva-li.vercel.app ?

If the project already exists, you only need to push new code via git or run `vercel --prod` after linking.

---

## What's in this commit

- Rebrand פרי לי → טבע לי across 18 source files
- 181 Meshek Dahan products with real Supabase Storage product images (JPG, no SVG fallback for catalog items)
- Old peri-li seed products deactivated (so only real Meshek Dahan items render)
- Header with brown bar + green badge logo
- Admin panel with drag-drop image upload, sharp crop/resize, multi-image gallery
- Categories: ירקניה, פירות, פטריות ונבטים, פירות יבשים, ממרחים, מוצרים כלליים
- Cart sidebar (RTL sticky), 2-column shop layout, 3-column dark footer

## Remaining manual steps

1. **Logo PNG** — current logo.png in /public still shows old "פרי לי" letters. Replace with a Teva Li PNG by drag-dropping into `/apps/web/public/logo.png` (overwrite) or via the admin Settings page once you have an image. The Header currently uses a clean text logo "טבע לי" + green check badge which works without a graphic logo.

2. **Migrations 004/006** — paste these into Supabase SQL Editor (https://supabase.com/dashboard/project/iyjxsdxebxmbrrquxbnw/sql):
   - `apps/web/supabase/migrations/004_admin_features.sql` (stock + sort_order columns)
   - `apps/web/supabase/migrations/006_product_images_primary.sql` (is_primary column on product_images)

3. **Stripe + Resend keys** — fill in `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY` in `.env.local` and Vercel env vars when ready to accept real payments.
