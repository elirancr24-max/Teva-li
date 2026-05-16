# 🌅 MORNING DELIVERABLES — טבע לי

תאריך: 2026-05-16
URL יעד: https://teva-li.vercel.app/

## מה הושג בלילה

### ✅ בוצע במלואו
- **רימותג מלא**: כל המופעים של "פרי לי" → "טבע לי" ב-18 קבצים: layout, Header, Footer, AboutSection, Hero, ContactForm, AdminSidebar, robots, sitemap, settings, etc.
- **קטלוג מוצרים**: 181 מוצרים מ-meshek-dahan.co.il זרמו ל-Supabase עם כל המידע (שם, מחיר 1:1, יחידה, פרימיום/מבצע)
- **תמונות**: כל 181 התמונות הופלו ל-Supabase Storage שלכם (bucket: `product-images`, path: `meshek/*.jpg`). אלה תמונות JPG/PNG אמיתיות **(לא SVG)**
- **קטגוריות חדשות**: ירקניה (63), פירות (74), פטריות ונבטים (13), פירות יבשים (2), ממרחים ורטבים (19), מוצרים כלליים (11)
- **מוצרים ישנים**: 31 מוצרי peri-li seed עם תמונות שבורות סומנו `active=false` — לא יוצגו, אך נשמרו במאגר למקרה צורך
- **Layout בסגנון משק דהן**: Header חום כהה + תפריט קטגוריות לבן, כפתורי מוצרים עם לוגו פרימיום + משולש הנחה, סייד-בר עגלה ימני sticky, פוטר חום עם 3 עמודות
- **Admin Panel מלא**: drag-drop העלאת תמונות (react-dropzone), crop+resize אוטומטי ל-400×400 (sharp), גלריית מולטי-תמונות עם sortable, bulk actions, search/filter/sort, סטוק alert
- **Routes**: 25 routes נבנו ב-build (`/`, `/shop`, `/shop/[slug]`, `/cart`, `/checkout`, `/kayak`, `/admin/*`, `/admin-login`, etc.)
- **Git**: repo `peri-li-main/.git` יוצר עם commit אחד מסכם

### ⚠️ דרוש פעולה ידנית

1. **Vercel Deploy** (חוסם בגלל user.name עברי שלא תקין כ-HTTP header)
   - פתח https://vercel.com/account/tokens → צור token
   - הרץ פקודות מ-`DEPLOY.md`
   - אלטרנטיבה: push ל-GitHub וחבר לפרויקט קיים של teva-li ב-Vercel dashboard

2. **2 מיגרציות SQL להריץ ב-Supabase SQL Editor**:
   - https://supabase.com/dashboard/project/iyjxsdxebxmbrrquxbnw/sql
   - העתק את:
     - `apps/web/supabase/migrations/004_admin_features.sql` (מוסיף `stock` + `sort_order`)
     - `apps/web/supabase/migrations/006_product_images_primary.sql` (מוסיף `is_primary`)
   - בלי אלה: admin panel עובד אבל לא יראה stock או is_primary

3. **לוגו PNG**
   - הקובץ הקיים `apps/web/public/logo.png` עדיין מראה "פרי לי" — צריך להחליף בלוגו טבע לי
   - **או** להישאר עם logo טקסטואלי בהאדר (text "טבע לי" + תג צ׳ק ירוק) — נראה נקי מאוד
   - fal-ai (Nano Banana) היה exhausted balance בלילה, לא היה ניתן לייצר אוטומטית

4. **תשלום אמיתי** (אופציונלי לעכשיו)
   - Stripe keys + Resend API ריקים ב-`.env.local`
   - האתר עובד 100% חוץ מ-checkout flow

---

## גישה לפאנל אדמין

- URL: `https://teva-li.vercel.app/admin-login` (אחרי deploy) או `http://localhost:3000/admin-login` (local)
- סיסמה: `admin123` (ב-`.env.local` כ-`ADMIN_PASSWORD`)
- אחרי login יש שליטה מלאה: הוסף/ערוך/מחק מוצרים, העלה תמונות drag-drop, ערוך קטגוריות, הזמנות, קופונים, הגדרות אתר

---

## איך להריץ לוקלית

```bash
cd "C:\Users\elira\OneDrive\שולחן העבודה\peri-li-main\apps\web"
pnpm install                    # אם לא הותקן
pnpm dev                        # http://localhost:3000
```

---

## מבנה הפרויקט

```
peri-li-main/
├── apps/web/                   ← הNext.js app
│   ├── app/                    ← App Router routes
│   ├── components/             ← React components
│   │   ├── home/              ← Hero, Featured, CategoryGrid, etc.
│   │   ├── layout/            ← Header, Footer, CategoryNavbar
│   │   ├── products/          ← ProductCard, ProductGrid
│   │   ├── shop/              ← ShopClient, ProductDetail
│   │   ├── cart/              ← CartSidebar, CartView
│   │   └── admin/             ← AdminSidebar, etc.
│   ├── lib/
│   │   ├── data/products.ts   ← getCatalog() with Supabase + mock fallback
│   │   ├── theme.ts           ← BRAND tokens
│   │   ├── supabase/          ← server, client, admin
│   │   └── image-processing.ts ← sharp wrapper
│   ├── scripts/
│   │   ├── scrape-meshek-dahan.mjs       ← Playwright scraper
│   │   ├── mirror-images.mjs             ← Image mirror to Supabase Storage
│   │   ├── seed-from-catalog.mjs         ← Product upsert
│   │   ├── apply-005-categories.mjs      ← Categories migration via REST
│   │   ├── deactivate-old-products.mjs   ← Clean broken-image products
│   │   ├── rebrand-to-teva-li.mjs        ← Bulk rebrand script
│   │   └── diagnose-products.mjs         ← DB health check
│   ├── supabase/migrations/
│   │   ├── 001_initial_schema.sql        ← (already applied)
│   │   ├── 002_seed.sql                  ← (already applied)
│   │   ├── 003_products_full.sql         ← (already applied)
│   │   ├── 004_admin_features.sql        ← ⚠️ run manually
│   │   ├── 005_seed_from_meshek.sql      ← ✅ applied via apply-005-categories.mjs
│   │   └── 006_product_images_primary.sql ← ⚠️ run manually
│   └── public/                ← static assets
├── DEPLOY.md                  ← deploy instructions
└── MORNING-DELIVERABLES.md    ← this file
```

---

## בעיות ידועות (תקלות שייתכן ותראה)

1. **דף הבית בעמוד הראשון מציג רק 8 מוצרים** — ה-rail "מוצרים פופולריים" משתמש ב-`tag === 'פופולרי'`. מוצרי משק דהן יש להם tag 'פרימיום' או 'מבצע'. הפתרון: או לעדכן ב-admin את ה-tag למוצרים שרוצים בפופולרי, או לערוך `app/page.tsx` line 29 לקרוא אחרת.

2. **תמונה ראשונה של hero** — `/public/hero-banner.jpg` הוא העתק של `/public/kayak-real.jpg` (12KB, לא יפה). מומלץ להחליף בתמונה רחבה 1920×600 דרך file upload פשוט.

3. **לוגו ב-/public/logo.png** — עדיין מציג "פרי לי" כתוב באותיות. צריך להחליף בלוגו "טבע לי".

4. **Migrations 004+006 לא רצו** — Supabase MCP לא מחובר לפרויקט הזה, ו-DDL לא נתמך דרך REST. צריך להריץ ידנית.

---

## סיכום

- ✅ 181 מוצרים אמיתיים ב-DB עם תמונות PNG/JPG אמיתיות מ-Supabase Storage
- ✅ Rebrand מלא ל-טבע לי
- ✅ Build production מצליח (0 errors)
- ✅ Dev server רץ ב-localhost:3000
- ⚠️ Deploy ל-Vercel דורש token (CLI נכשל בגלל username עברי)
- ⚠️ 2 migrations DDL ידניות + לוגו PNG חדש

האתר 95% מוכן. ה-5% החסרים הם דברים שדורשים את הלחיצה שלך:
1. הצמדת token של Vercel + deploy
2. הדבקת 2 SQL migrations
3. החלפת לוגו PNG (אופציונלי — text logo יפה גם כן)
