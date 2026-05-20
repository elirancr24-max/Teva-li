# מדריך פריסה — שדרוג פאנל הניהול

מסמך זה מתעד את שדרוג פאנל הניהול של teva-li, משתני סביבה נדרשים, בדיקות עשן והערכת מצב לאחר ההתחברות.

---

## 1. מה נפרס

חמישה שלבי עבודה (WS) נדחפו בקומיטים הבאים:

| Commit    | Workstream | תיאור |
|-----------|------------|-------|
| `e4d85b7` | WS-1       | Sidebar רספונסיבי במובייל — `Drawer` מתחת ל-`md`, topbar דביק עם כפתור hamburger |
| `6740c8f` | WS-2       | מערכת Toast למשוב + `ConfirmDialog` — מחליפים את `window.confirm` הגנרי |
| `e8dafa7` | WS-3       | Dashboard עם sparkline, בורר טווח (7d/30d/90d), Top products, Low stock, עמוד Customers, פרטי הזמנה עם הערות פנימיות, עמוד Audit log |
| `cc17109` | WS-4       | Auth מאובטח: אימות `bcryptjs` + סשנים חתומים `HMAC-SHA256` + rate-limit IP בזיכרון (5 ניסיונות / 15 דקות) + audit log על כל mutation |
| `0d71aaa` | WS-5       | Migration 007: טבלת `admin_audit_log`, עמודה `orders.notes_internal`, אינדקסים לביצועים |

---

## 2. משתני סביבה ב-Vercel (Scope: Production)

יש להגדיר ב-Project Settings → Environment Variables (Production):

| משתנה | חובה? | תיאור |
|-------|-------|-------|
| `ADMIN_PASSWORD` | כן (תקופת מעבר) | סיסמת admin בטקסט גלוי (legacy). שמור עד למעבר מלא ל-hash. |
| `ADMIN_SESSION_SECRET` | **חובה** | 32 בייט אקראיים ב-hex לחתימת סשנים. ללא משתנה זה ההתחברות תיכשל. |
| `ADMIN_PASSWORD_HASH` | אופציונלי | bcrypt של הסיסמה. אם מוגדר — גובר על `ADMIN_PASSWORD`. |
| `NEXT_PUBLIC_SUPABASE_URL` | כן | קיים מראש. |
| `SUPABASE_SERVICE_ROLE_KEY` | כן | קיים מראש. |

ייצור ערכים מקומית:

```bash
# ADMIN_SESSION_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# ADMIN_PASSWORD_HASH (החלף PASSWORD בסיסמה האמיתית)
node -e "console.log(require('bcryptjs').hashSync('PASSWORD', 10))"
```

לאחר עדכון משתנים — Redeploy את ה-deployment האחרון (Vercel → Deployments → ⋯ → Redeploy).

---

## 3. מיגרציית DB (חד-פעמית, בוצעה ב-2026-05-20)

- קובץ: `apps/web/supabase/migrations/007_admin_upgrade.sql`
- הופעל ידנית דרך Supabase Dashboard → SQL Editor.
- להפעלה מחדש (אם נדרש בסביבה חדשה): הדבק את תוכן ה-SQL ב-Dashboard, או הרץ דרך CLI מקושר:

```bash
supabase db push
```

המיגרציה יוצרת:
- טבלה `admin_audit_log` (id, actor, action, target, ip, ua, created_at, metadata)
- עמודה `orders.notes_internal text`
- אינדקסים לביצועי שאילתות (orders.created_at, products.is_active וכו')

---

## 4. הערה קריטית על תצורת Vercel

`vercel.json` ב-root משתמש ב-`npm install --legacy-peer-deps` — **לא ב-pnpm**.

לכן, בכל פעם שמוסיפים תלות עם `pnpm add`:

1. ריצו גם:
   ```bash
   cd apps/web && npm install --legacy-peer-deps
   ```
2. ודאו ששני קבצי ה-lockfile מסונכרנים: `pnpm-lock.yaml` ו-`package-lock.json`.
3. רק לאחר מכן — commit + push.

אחרת ה-build ב-Vercel לא יכלול את התלות החדשה והאפליקציה תיפול ב-runtime.

---

## 5. בדיקות עשן בפרודקשן

```bash
# Auth gate test — אמור להחזיר 307 (redirect ל-/admin-login)
curl -sI -o /dev/null -w "%{http_code}\n" https://teva-li.vercel.app/admin

# כל ה-routes של admin פרוסים — כולם אמורים להחזיר 307
for p in /admin /admin/orders /admin/products /admin/customers /admin/audit /admin/kayaks /admin/categories /admin/coupons /admin/settings; do
  echo "$p: $(curl -sI -o /dev/null -w '%{http_code}' https://teva-li.vercel.app$p)"
done

# עמוד ה-login נטען
curl -s https://teva-li.vercel.app/admin-login | grep -oE 'ADMIN PANEL|כניסה' | head -2
```

---

## 6. צ'קליסט אימות לאחר התחברות

לאחר התחברות מוצלחת ב-`/admin-login`:

- [ ] DevTools → Application → Cookies → ה-cookie `admin-token` בפורמט `<uuid>.<hex>` (לא טקסט גלוי)
- [ ] `/admin/audit` מציג רשומת `login.success` עם ה-IP שלך
- [ ] החלפת מצב מוצר (active) → toast ירוק "המוצר הופעל" + שורה חדשה ב-audit
- [ ] מחיקה קבוצתית של 2 מוצרים → `ConfirmDialog` "למחוק 2 מוצרים?" → אישור → toast
- [ ] פרטי הזמנה → כתיבת הערה פנימית → שמירה → toast → רענון → ההערה נשמרה
- [ ] 5 ניסיונות התחברות שגויים → "יותר מדי ניסיונות. נסה שוב בעוד X שניות"
- [ ] מובייל (375px) → כפתור hamburger מופיע, drawer נפתח מימין לשמאל (RTL), הניווט פעיל
- [ ] `/admin/customers` מציג לקוחות מקובצים לפי טלפון, שורות פתיחות

---

## 7. מגבלות ידועות

- **Rate limit בזיכרון לכל instance** של Vercel (מתאפס בקור-סטארט). להגנה אמיתית מפני brute-force בקנה מידה — להעביר ל-Upstash Redis.
- **Audit log** — אין עדיין UI לסינון/חיפוש מעבר ל-pagination בסיסי.
- **שם לקוח** — שדה `name` נופל ל-`delivery_name` או `customer_name`; אם שניהם חסרים, מוצג `—`.
