# Peri Li · Web (Next.js)

Production rewrite of [פרי לי](https://elirancr24-max.github.io/peri-li/), the Israeli fresh-cut-fruit & event-kayak brand. Next.js 15 + TypeScript + Tailwind v4 + Supabase + Stripe + Resend.

## Quick start

```bash
cd apps/web
pnpm install
cp .env.example .env.local   # fill in keys (see below)
pnpm dev                     # http://localhost:3000
```

## Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | Next.js 15 (App Router) | RSC + Server Actions, ISR, Vercel free tier |
| Language | TypeScript strict | DB types generated from Supabase schema |
| Styling | Tailwind v4 + design tokens via `@theme` | Brutalist tokens (`--ink`, `--paper`, `--watermelon`) |
| Fonts | next/font (Heebo · Frank Ruhl Libre · JetBrains Mono · Assistant) | Self-hosted, no Google CSS hop |
| Auth + DB + Storage | Supabase | Postgres + Auth (magic link + Google) + Storage |
| Cart state | Zustand (persistent) | Tiny, no boilerplate |
| Payments | Stripe (`@stripe/react-stripe-js`) | Works in IL, supports ILS |
| Email | Resend + react-email | RTL Hebrew templates |
| Hosting | Vercel Hobby (free) | Zero-config Next.js deploy |

## Status — Phase 1 complete (scaffold + design system port)

- [x] Next.js project structure, TS strict, ESLint, Tailwind v4
- [x] Design tokens, brutalist utilities, RTL baseline (`app/globals.css`)
- [x] Brand primitives — Sticker, SectionTag, Watermark, Halo, PriceTag, Logo, Marquee
- [x] Six CSS-art fruits + 12 photo kinds + Fruit factory using `next/image`
- [x] `useCompact` hook for the iOS preview frame + real mobile breakpoint
- [x] SiteHeader, SiteFooter, MobileBottomNav (frosted iOS), MobileBuyBar, MobileSearchPill, MobileGreeting
- [x] Full HomePage port: HeroMega, Ticker, ValueProps, BestSellersV2 + ProductCard, KayakHero + KayakSizeCard, ProcessSection, FruitMosaic + MosaicCell, Testimonials + TestimonialCard, CTASection
- [x] Stub routes for `/shop`, `/shop/[slug]`, `/kayak`, `/cart`, `/checkout`, `/account`, `/admin`
- [x] Supabase clients (browser, server, middleware) + cookie session refresh
- [x] Brand color: Berry Punch (`#C9184A`)
- [ ] Run build to validate types

## Next phases

| Phase | Scope |
| --- | --- |
| **2** | Supabase schema (products, categories, orders, kayak_orders, customers, reviews, admin_users), RLS, seed migration from JSX hardcoded data |
| **3** | Cart (Zustand) + Stripe checkout + delivery rules + order confirmation emails |
| **4** | Kayak configurator with DB persistence + admin approval flow + payment link emails |
| **5** | Supabase Auth (magic link + Google) + customer accounts |
| **6** | Admin panel: dashboard, products CRUD, orders, kayaks, customers, coupons |
| **7** | Email templates (react-email): order, kayak, delivery reminders, welcome |
| **8** | SEO (sitemap, robots, JSON-LD, OG via Satori), Vercel/Plausible analytics, perf budgets |
| **9** | QA pass with `peri-li-tester`, Playwright e2e, launch |

## Environment variables

See `.env.example`. Filled values needed for Phase 3+:

- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — public keys
- `SUPABASE_SERVICE_ROLE_KEY` — server-only, never bundle
- `STRIPE_SECRET_KEY` / `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` / `STRIPE_WEBHOOK_SECRET`
- `RESEND_API_KEY` / `EMAIL_FROM` / `EMAIL_ADMIN`

## Commands

```bash
pnpm dev          # local dev (http://localhost:3000)
pnpm build        # production build
pnpm start        # serve production build
pnpm lint         # eslint
pnpm typecheck    # tsc --noEmit
pnpm format       # prettier
```

## Subagents (Claude Code)

Two project-level subagents are defined at `<repo-root>/.claude/agents/`:

- `peri-li-designer` — brutalist-editorial design reviewer. Invoke proactively after visual changes.
- `peri-li-tester` — QA reviewer for end-to-end flows. Invoke before each phase deploy.

## Project layout

```
apps/web/
├── app/                      # routes (App Router)
│   ├── (marketing)/page.tsx  # home
│   ├── shop/, kayak/, cart/, checkout/, account/, admin/
│   ├── api/webhooks/stripe/route.ts
│   └── globals.css           # design tokens + brutalist utilities
├── components/
│   ├── brand/                # Sticker, SectionTag, Watermark, Halo, PriceTag, Logo, Marquee
│   ├── fruits/               # CSS-art + photo Fruit factory
│   ├── layout/               # SiteHeader, SiteFooter, PlaceholderPage
│   ├── home/                 # HomePage + 9 sections
│   ├── shop/                 # CatalogCard etc. (Phase 2)
│   └── mobile/               # MobileBottomNav, MobileBuyBar, MobileSearchPill, MobileGreeting, NavIcon
├── hooks/use-compact.ts
├── lib/
│   ├── supabase/{client,server,middleware}.ts
│   └── utils.ts
├── types/db.ts               # generated from Supabase (Phase 2)
└── public/kayak-real.jpg     # extracted from base64 in old bundle
```

## Static bundle archive

The previous static bundle is preserved at `<repo-root>/peri-li-bundle.html` and remains live at https://elirancr24-max.github.io/peri-li/ until this Next.js app is feature-complete and deployed to Vercel under `peri-li.com`.
