-- Phase 2: Seed data — categories, products, kayak sizes
-- Migrated from peri-li-bundle.html (ALL_PRODUCTS array + KayakSizeCard data)

-- ─── Categories ───────────────────────────────────────────────────────────────
insert into categories (slug, name_he, sort_order) values
  ('peeled',   'קלופים ופרוסים', 1),
  ('salads',   'סלטי פירות',     2),
  ('berries',  'יער ואקזוטי',    3),
  ('dried',    'יבשים ואגוזים',  4)
on conflict (slug) do nothing;

-- ─── Products (12) ───────────────────────────────────────────────────────────
-- Slugs are English transliterations of the Hebrew names
with cat as (
  select id, slug as cslug from categories
)
insert into products (slug, name_he, name_en, category_id, kind, price_cents, weight, description_he, rating, reviews_count, tag)
values
  -- קלופים
  ('pineapple-peeled',
   'אננס קלוף ופרוס', 'Peeled Pineapple',
   (select id from cat where cslug='peeled'),
   'pineapple', 2490, '500ג׳',
   'אננס טרי קלוף ופרוס, מתוק ועסיסי. נקצר ונחתך ביום ההזמנה.',
   4.9, 142, 'הכי נמכר'),

  ('watermelon-cubed',
   'אבטיח מרובע', 'Cubed Watermelon',
   (select id from cat where cslug='peeled'),
   'watermelon', 1990, '500ג׳',
   'אבטיח מתוק חתוך לקוביות, מושלם לימי קיץ.',
   4.8, 98, null),

  ('strawberry-pack',
   'תות שדה', 'Strawberries',
   (select id from cat where cslug='berries'),
   'strawberry', 2990, '300ג׳',
   'תותים טריים, קטיפים ומתוקים. מגיעים שלמים עם עלים.',
   4.7, 76, 'חדש'),

  ('mango-sliced',
   'מנגו פרוס', 'Sliced Mango',
   (select id from cat where cslug='peeled'),
   'mango', 3490, '400ג׳',
   'מנגו אלפונסו פרוס, ארומטי ועשיר. מיובא ישירות מהודו.',
   4.9, 61, null),

  ('fruit-salad-classic',
   'סלט פירות קלאסי', 'Classic Fruit Salad',
   (select id from cat where cslug='salads'),
   'mixed-salad', 2290, '400ג׳',
   'תערובת קלאסית של פירות עונתיים חתוכים — אבטיח, מלון, ענבים, תות.',
   4.8, 205, 'הכי נמכר'),

  ('grape-green',
   'ענבים ירוקים', 'Green Grapes',
   (select id from cat where cslug='peeled'),
   'green-grape', 1990, '500ג׳',
   'ענבים ירוקים חסרי גרעינים, קריספיים ומרעננים.',
   4.6, 44, null),

  ('blueberry-pack',
   'אוכמניות', 'Blueberries',
   (select id from cat where cslug='berries'),
   'blueberry', 3990, '200ג׳',
   'אוכמניות טריות מיובאות, עשירות בנוגדי חמצון.',
   4.8, 33, 'פרמיום'),

  ('cherry-pack',
   'דובדבנים', 'Cherries',
   (select id from cat where cslug='berries'),
   'cherry', 4490, '300ג׳',
   'דובדבנים אדומים כהים, בשלים ומתוקים. עונתיים בלבד.',
   4.9, 28, 'עונתי'),

  ('berry-mix',
   'קוקטייל יער', 'Berry Mix',
   (select id from cat where cslug='berries'),
   'berry-mix', 3290, '300ג׳',
   'תערובת פירות יער — אוכמניות, פטל, דומדמניות. מושלם לקינוחים.',
   4.7, 52, null),

  ('melon-cubed',
   'מלון מרובע', 'Cubed Melon',
   (select id from cat where cslug='peeled'),
   'melon', 1790, '500ג׳',
   'מלון ירוק מתוק, קלוף וחתוך לקוביות. מרענן ודיאטטי.',
   4.5, 87, null),

  ('kiwi-sliced',
   'קיווי פרוס', 'Sliced Kiwi',
   (select id from cat where cslug='peeled'),
   'kiwi', 2190, '400ג׳',
   'קיווי ירוק חמצמץ-מתוק, עשיר בוויטמין C. פרוס לחצאים.',
   4.6, 39, null),

  ('tropical-box',
   'קופסת טרופי', 'Tropical Box',
   (select id from cat where cslug='salads'),
   'mixed-salad', 4990, '600ג׳',
   'קופסת גורמה: מנגו, אננס, פפאיה, קוקוס מגורר. מתנה מושלמת.',
   4.9, 18, 'גורמה')

on conflict (slug) do nothing;

-- ─── Kayak sizes ─────────────────────────────────────────────────────────────
insert into kayak_sizes (id, label, guests, price_cents) values
  ('s',   'קיאק S — יחיד',        '1 אורח',       59900),
  ('m',   'קיאק M — זוגי',        '2 אורחים',     89900),
  ('l',   'קיאק L — משפחתי',      '2–4 אורחים',  129900),
  ('xl',  'קיאק XL — אירוע',      '5–10 אורחים', 199900)
on conflict (id) do nothing;
