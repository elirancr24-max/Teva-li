'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  Paper,
  Chip,
  ButtonBase,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAppDispatch, useAppSelector } from '@/store';
import { addItem, decrementAmount, incrementAmount } from '@/store/slices/cartSlice';
import { BRAND } from '@/lib/brand';
import type { Product } from '@/types/shop';

const KIND_EMOJI: Record<string, string> = {
  tomato: '🍅',
  cucumber: '🥒',
  pepper: '🌶️',
  pumpkin: '🎃',
  artichoke: '🌿',
  asparagus: '🌱',
  pineapple: '🍍',
  watermelon: '🍉',
  melon: '🍈',
  mango: '🥭',
};

const KIND_DESCRIPTION: Record<string, string> = {
  // ירקות
  tomato:      'עגבניות טריות ואיכותיות, מגיעות ישר מהשדה. מתאימות לסלטים, רטבים, ובישול. נמכרות לפי ק״ג.',
  cucumber:    'מלפפונים טריים ופריכים, מושלמים לסלט ישראלי קלאסי או כנשנוש בריא. נמכרים לפי ק״ג.',
  pepper:      'פלפלים צבעוניים וטריים — מתוקים, חריפים או מעורבים. מתאימים לאפייה, טיגון וסלטים.',
  pumpkin:     'דלעת טרייה ומתוקה, אידיאלית למרקים, תבשילים ותנור.',
  artichoke:   'ארטישוק טרי ואיכותי. מתאים לבישול, אפייה ואכילה עם לימון ושמן זית.',
  asparagus:   'אספרגוס טרי ועסיסי. מתאים לאידוי, צלייה ותוספות לארוחה.',
  eggplant:    'חצילים גדולים וטריים. מושלמים לסלט חצילים, אפייה בתנור ותבשילים.',
  carrot:      'גזרים מתוקים וצבעוניים. טובים לאכילה טרייה, מיצים, מרקים ותבשילים.',
  onion:       'בצל טרי ואיכותי — בסיס כל מטבח. מתאים לטיגון, בישול וסלטים.',
  garlic:      'שום טרי ריחני — מוסיף טעם עמוק לכל מנה. נמכר לפי יחידה/ראש.',
  cabbage:     'כרוב טרי ופריך. מתאים לסלטים, כבישה ובישול.',
  herb:        'עשבי תיבול טריים — פטרוזיליה, כוסברה, שמיר ועוד. מוסיפים ארומה וטעם לכל מנה.',
  beet:        'סלק טרי ומתוק. מתאים לסלטים, מיצים ובישול.',
  root:        'ירקות שורש טריים ואיכותיים.',
  corn:        'תירס מתוק וטרי. מוכן לבישול, אפייה או אכילה ישירה.',
  potato:      'תפוחי אדמה טריים ואיכותיים. מתאימים לכל שיטת בישול — אפייה, טיגון, מרק.',
  leek:        'כרישה טרייה ועדינה. מוסיפה טעם מיוחד למרקים, תבשילים וקישים.',
  // פירות
  pineapple:   'אננס מתוק ועסיסי, מיובא טרי. מושלם לאכילה טרייה, שייקים ופירות חתוכים.',
  watermelon:  'אבטיח מתוק וקריר — הקיץ הישראלי האמיתי. נמכר שלם או חצי לפי בחירה.',
  melon:       'מלון מתוק ועסיסי. מאורז ומוכן לאכילה.',
  mango:       'מנגו טרופי מתוק, בשל ומוכן לאכילה. מתאים גם לשייקים ומשקאות.',
  strawberry:  'תות שדה טרי, מתוק ועסיסי. מאוסף טרי — כדאי לצרוך תוך יומיים-שלושה.',
  'grape-green':'ענבים ירוקים, בשלים ומתוקים. ללא גרעינים (בהתאם לזן).',
  'grape-black':'ענבים שחורים עסיסיים ועשירים בטעם.',
  kiwi:        'קיווי טרי עם טעם חמצמץ-מתוק. עשיר בויטמין C.',
  apple:       'תפוחים טריים ופריכים. מגוון זנים — גלה, גרני, פינק ליידי ועוד.',
  pear:        'אגסים מתוקים ועסיסיים, בשלים ומוכנים לאכילה.',
  peach:       'אפרסקים מתוקים ורכים. קוטפים בבשלות מלאה.',
  apricot:     'משמשים מתוקים ועסיסיים, טריים מהעץ.',
  nectarine:   'נקטרינות מתוקות וחלקות. ללא שיער כמו האפרסק.',
  plum:        'שזיפים מתוקים-חמצמצים. עשירים בסיבים.',
  cherry:      'דובדבנים טריים ומתוקים — עונת הקיץ הקצרה.',
  blueberry:   'אוכמניות טריות וגדולות. עשירות בנוגדי חמצון.',
  berry:       'פירות יער טריים — מתוקים ומלאי טעם.',
  fig:         'תאנים טריות ומתוקות. בשלות ומוכנות לאכילה מיידית.',
  pomegranate: 'רימונים טריים ועסיסיים — מתאימים לסחיטה ולאכילה.',
  orange:      'תפוזים עסיסיים ומתוקים, מושלמים לסחיטה או אכילה.',
  lemon:       'לימונים טריים וחמצמצים. חיוניים בכל מטבח.',
  pomelo:      'פומלות גדולות ומתוקות — פחות חמצמץ מגרפ\'פרוט.',
  coconut:     'קוקוס טרי. אפשר לשתות את המים ולאכול את הבשר הלבן.',
  banana:      'בננות בשלות ומתוקות, עשירות באשלגן ואנרגיה.',
  lychee:      'ליצ\'י טרי ועסיסי עם קליפה אדומה. מתוק ואקזוטי.',
  guava:       'גויאבה טרופית טרייה, מתוקה ועסיסית.',
  'passion-fruit': 'פסיפלורה עם טעם טרופי מיוחד. מוסיפה לשייקים ומשקאות.',
  'cactus-pear': 'צבר ישראלי קלאסי. מתוק, צלול ורענן.',
  'mixed-salad': 'תערובת ירקות טריים לסלט — חתוכים ומוכנים לאכילה.',
  // קופסאות ותוספות
  'gift-box':  'סל/מארז פירות וירקות מהודר — מתנה מושלמת לכל אירוע. ניתן להתאמה אישית.',
  extra:       'תוספת מיוחדת לבחירה.',
};

const PURCHASE_RULES = `מינימום הזמנה: ₪50. משלוח עד הבית באזור דימונה והסביבה. תשלום בביט לאחר אישור ההזמנה. ניתן לבטל הזמנה עד שעה לפני אספקה.`;

const UNIT_LABEL: Record<string, string> = {
  kg: 'ק״ג',
  unit: 'יח׳',
  bunch: 'צרור',
};

export function ProductDetail({
  product,
  images,
}: {
  product: Product;
  images?: string[];
}) {
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((s) => s.cart.items.find((i) => i.productId === product.id));
  const inCart = !!cartItem;

  // Build gallery: prefer explicit images prop, else fall back to product.imageUrl.
  const gallery = (images && images.length > 0
    ? images
    : product.imageUrl
      ? [product.imageUrl]
      : []) as string[];

  const [activeIdx, setActiveIdx] = useState(0);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});

  const activeSrc = gallery[activeIdx];
  const showActiveImage = !!activeSrc && !imgError[activeIdx];

  const formatPrice = (cents: number) => `₪${(cents / 100).toFixed(2)}`;
  const unitLabel = (product.weight && product.weight.trim()) || UNIT_LABEL[product.unit] || '';

  const discountPct =
    product.originalPriceCents && product.originalPriceCents > product.priceCents
      ? Math.round((1 - product.priceCents / product.originalPriceCents) * 100)
      : 0;

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2.5, md: 4 }, px: { xs: 2, md: 3 }, pb: { xs: '100px', md: 4 } }}>
      {/* Back button — mobile only */}
      <Box sx={{ display: { xs: 'flex', md: 'none' }, mb: 1.5 }}>
        <Button
          component={Link}
          href="/shop"
          startIcon={<ArrowForwardIcon />}
          sx={{ color: BRAND.brown, fontWeight: 700, fontSize: 14, px: 0 }}
        >
          חזרה לחנות
        </Button>
      </Box>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 2.5, md: 4 }}>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Paper
            sx={{
              aspectRatio: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: { xs: 120, md: 200 },
              bgcolor: showActiveImage ? '#fff' : BRAND.greenLight,
              overflow: 'hidden',
              p: showActiveImage ? 2 : 0,
              boxShadow: 'none',
              border: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            {showActiveImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={activeSrc}
                alt={product.name}
                onError={() =>
                  setImgError((prev) => ({ ...prev, [activeIdx]: true }))
                }
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            ) : (
              <Box component="span" aria-hidden="true">
                {KIND_EMOJI[product.kind] ?? '🍎'}
              </Box>
            )}
          </Paper>

          {gallery.length > 1 && (
            <Stack
              direction="row"
              spacing={1}
              sx={{ overflowX: 'auto', pb: 0.5 }}
              role="tablist"
              aria-label="תמונות מוצר"
            >
              {gallery.map((src, i) => {
                const isActive = i === activeIdx;
                const failed = !!imgError[i];
                return (
                  <ButtonBase
                    key={`${src}-${i}`}
                    onClick={() => setActiveIdx(i)}
                    aria-label={`תמונה ${i + 1}`}
                    aria-selected={isActive}
                    role="tab"
                    sx={{
                      width: 72,
                      height: 72,
                      flexShrink: 0,
                      borderRadius: 1.5,
                      overflow: 'hidden',
                      bgcolor: '#fff',
                      border: isActive
                        ? `2px solid ${BRAND.green}`
                        : '1px solid rgba(0,0,0,0.08)',
                      p: 0.5,
                    }}
                  >
                    {failed ? (
                      <Box
                        sx={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 28,
                        }}
                        aria-hidden="true"
                      >
                        {KIND_EMOJI[product.kind] ?? '🍎'}
                      </Box>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={src}
                        alt=""
                        loading="lazy"
                        onError={() =>
                          setImgError((prev) => ({ ...prev, [i]: true }))
                        }
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          width: 'auto',
                          height: 'auto',
                          objectFit: 'contain',
                        }}
                      />
                    )}
                  </ButtonBase>
                );
              })}
            </Stack>
          )}
        </Box>

        <Stack spacing={2} sx={{ flex: 1 }}>
          {product.quality === 'premium' && (
            <Box>
              <Chip
                label="פרימיום"
                sx={{ bgcolor: BRAND.brown, color: '#fff', fontWeight: 700 }}
              />
            </Box>
          )}
          <Typography variant="h1" sx={{ fontSize: { xs: 24, md: 32 }, fontWeight: 800, lineHeight: 1.2 }}>
            {product.name}
          </Typography>
          {product.fullName && (
            <Typography sx={{ color: 'text.secondary' }}>{product.fullName}</Typography>
          )}

          {/* Description */}
          {(product.description || KIND_DESCRIPTION[product.kind]) && (
            <Box
              sx={{
                bgcolor: BRAND.greenLight,
                borderRadius: 2,
                p: 2,
                borderRight: `3px solid ${BRAND.green}`,
              }}
            >
              <Typography sx={{ fontSize: 15, color: 'text.primary', lineHeight: 1.7 }}>
                {product.description || KIND_DESCRIPTION[product.kind]}
              </Typography>
            </Box>
          )}

          {/* Purchase rules */}
          <Box sx={{ bgcolor: '#fffbf0', borderRadius: 2, p: 1.5, border: '1px solid #f0e0a0' }}>
            <Typography sx={{ fontSize: 12, color: '#7a6000', lineHeight: 1.7 }}>
              📦 {PURCHASE_RULES}
            </Typography>
          </Box>

          <Stack direction="row" spacing={2} alignItems="baseline">
            <Typography sx={{ fontSize: { xs: 28, md: 36 }, fontWeight: 800, color: BRAND.green }}>
              {formatPrice(product.priceCents)}
            </Typography>
            <Typography sx={{ fontSize: { xs: 14, md: 16 }, color: 'text.secondary' }}>/ {unitLabel}</Typography>
            {discountPct > 0 && product.originalPriceCents && (
              <Typography sx={{ fontSize: 14, color: 'text.secondary', textDecoration: 'line-through' }}>
                {formatPrice(product.originalPriceCents)}
              </Typography>
            )}
          </Stack>

          {discountPct > 0 && (
            <Chip
              label={`חיסכון ${discountPct}%`}
              sx={{ bgcolor: BRAND.green, color: '#fff', fontWeight: 700, alignSelf: 'flex-start' }}
            />
          )}

          <Box sx={{ pt: 2 }}>
            {inCart ? (
              <Stack direction="row" spacing={2} alignItems="center">
                <Button
                  variant="outlined"
                  onClick={() => dispatch(decrementAmount(product.id))}
                  startIcon={<RemoveIcon />}
                >
                  הפחת
                </Button>
                <Typography sx={{ fontSize: 18, fontWeight: 700, minWidth: 80, textAlign: 'center' }}>
                  {cartItem!.amount} {unitLabel}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => dispatch(incrementAmount(product.id))}
                  startIcon={<AddIcon />}
                >
                  הוסף
                </Button>
              </Stack>
            ) : (
              <Button
                variant="contained"
                size="large"
                startIcon={<AddIcon />}
                onClick={() => dispatch(addItem({ product }))}
                sx={{ width: { xs: '100%', sm: 'auto' }, py: 1.5, fontWeight: 800 }}
              >
                הוספה לסל
              </Button>
            )}
          </Box>
        </Stack>
      </Stack>

      {/* Sticky Add-to-Cart bar — mobile only, above bottom nav */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          position: 'fixed',
          bottom: 'calc(64px + env(safe-area-inset-bottom, 0px))',
          left: 0,
          right: 0,
          zIndex: 150,
          bgcolor: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderTop: '1px solid rgba(0,0,0,0.10)',
          px: 2,
          py: 1.25,
          gap: 2,
          alignItems: 'center',
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontSize: 12, color: 'text.secondary', lineHeight: 1 }}>{product.name}</Typography>
          <Typography sx={{ fontSize: 20, fontWeight: 800, color: BRAND.green, lineHeight: 1.2 }}>
            {formatPrice(product.priceCents)}
            <Typography component="span" sx={{ fontSize: 12, color: 'text.secondary', fontWeight: 400, ml: 0.5 }}>
              /{unitLabel}
            </Typography>
          </Typography>
        </Box>
        {inCart ? (
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton
              size="small"
              onClick={() => dispatch(decrementAmount(product.id))}
              aria-label="הפחת כמות"
              sx={{ bgcolor: BRAND.greenLight, color: BRAND.greenDark, width: 44, height: 44 }}
            >
              <RemoveIcon />
            </IconButton>
            <Typography sx={{ fontWeight: 700, minWidth: 32, textAlign: 'center' }}>
              {cartItem!.amount}
            </Typography>
            <IconButton
              size="small"
              onClick={() => dispatch(incrementAmount(product.id))}
              aria-label="הוסף כמות"
              sx={{ bgcolor: BRAND.green, color: '#fff', width: 44, height: 44, '&:hover': { bgcolor: BRAND.greenDark } }}
            >
              <AddIcon />
            </IconButton>
          </Stack>
        ) : (
          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={() => dispatch(addItem({ product }))}
            aria-label={`הוספה לסל ${product.name}`}
            sx={{ bgcolor: BRAND.green, color: '#fff', fontWeight: 800, px: 3, py: 1.25, borderRadius: 2, '&:hover': { bgcolor: BRAND.greenDark } }}
          >
            הוספה לסל
          </Button>
        )}
      </Box>
    </Container>
  );
}
