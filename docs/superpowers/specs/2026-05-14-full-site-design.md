# פרי לי — Full Site Build (Overnight)

**Date:** 2026-05-14
**Goal:** Production-ready site, only payments left to wire.

## Context

User has prototype + Next.js scaffold (Phases 1-3 + admin Phase 6 done). Going to sleep. Want to wake to a complete, polished, admin-controllable site that looks like ruthi.co.il / meshek-dahan.co.il.

## Reference sites — key takeaways

- **Ruthi**: greens-based palette, premium produce focus, category grid hero, customer loyalty CTA, WhatsApp/social prominent
- **Meshek Dahan**: clean white minimalist, red/green tomato accent, farm-to-door direct messaging, holiday banner, alphabetical product org, prominent phone/WhatsApp

## Architecture

### Database additions (`004_admin_features.sql`)
- `products.image_url text` — external image URL (no Storage bucket needed)
- `products.stock int default 100` — inventory count
- `products.sort_order int default 0`
- `site_settings(key, value)` table — business info, delivery fees, etc.
- `coupons(code, discount_pct, active, expires_at)` table

### File map

**Shared infra (sequential, by main thread):**
1. `supabase/migrations/004_admin_features.sql`
2. `types/db.ts` — extended types
3. `app/admin/actions.ts` — full CRUD actions
4. `lib/settings.ts` — settings fetcher
5. `components/admin/AdminSidebar.tsx` — nav extended

**Parallel agents (isolated file ownership):**

| Agent | Files | Scope |
|---|---|---|
| A — Product CRUD | `app/admin/products/new/`, `[id]/edit/`, `ProductForm.tsx` | Create/edit/delete products with image URL |
| B — Category CRUD | `app/admin/categories/` | Create/edit/delete categories |
| C — Settings + Coupons | `app/admin/settings/`, `app/admin/coupons/` | Site config + coupon CRUD |
| D — Kayak | `app/kayak/` | Public kayak configurator |
| E — Home redesign | `app/page.tsx`, `components/home/` | Hero, categories, about, CTAs |
| F — Footer/About/Contact/ProductCard | `components/layout/Footer.tsx`, `app/about/`, `app/contact/`, `ProductCard.tsx` image support |

## UX principles (from references)

1. **Trust signals**: phone, WhatsApp, address, "since 2019" badges
2. **Empty cart messaging**: encouraging, not blank
3. **Category grid as hero**: visual entry to shop
4. **Holiday/seasonal banner**: optional, admin-controlled
5. **Skip-to-content** for accessibility
6. **WhatsApp CTA** on every page
7. **Personal/family business feel** in copy

## Test plan

After build:
1. Run dev server, navigate every page (home, shop, cart, checkout, kayak, about, contact, admin/*)
2. Test admin: create product → see in shop, edit price → see updated, toggle active → hidden
3. Test mobile responsive
4. Fix any errors

## Verification

- [ ] All admin CRUD works
- [ ] Home matches reference style
- [ ] Kayak configurator submits to DB
- [ ] Footer has real contact info
- [ ] No console errors
- [ ] Mobile renders correctly
