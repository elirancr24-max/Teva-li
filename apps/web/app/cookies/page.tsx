import type { Metadata } from 'next';
import { Box, Container, Stack, Typography } from '@mui/material';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BRAND } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'מדיניות עוגיות',
  description: 'מדיניות העוגיות של אתר טבע לי — אילו עוגיות אנחנו משתמשים ולמה, ואיך ניתן לנהל אותן.',
};

export default function CookiesPage() {
  return (
    <>
      <Header />
      <Box component="main" id="main" sx={{ bgcolor: BRAND.cream, minHeight: '60vh' }}>
        <Container maxWidth="md" sx={{ py: { xs: 5, md: 10 }, px: { xs: 2.5, md: 3 } }}>
          <Stack spacing={3}>
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: 28, md: 44 },
                fontWeight: 900,
                color: BRAND.brown,
                letterSpacing: '-0.02em',
                textAlign: { xs: 'center', md: 'right' },
              }}
            >
              מדיניות עוגיות
            </Typography>
            <Typography sx={{ fontSize: 15, color: 'text.secondary', textAlign: { xs: 'center', md: 'right' } }}>
              עודכן לאחרונה: 18 במאי 2026
            </Typography>

            <Section title="מה הן עוגיות?">
              <p>
                עוגיות (Cookies) הן קבצי טקסט קטנים שנשמרים בדפדפן שלכם כאשר אתם מבקרים באתר.
                הן מאפשרות לאתר לזכור העדפות ופעולות מסוימות בין הביקורים. בנוסף, חלק מהנתונים
                נשמרים ב-<b>localStorage</b> של הדפדפן — שם מידע מקומי שנשמר אצלכם בלבד, ללא
                שליחה לשרתינו.
              </p>
            </Section>

            <Section title="עוגיות הכרחיות">
              <p>
                עוגיות ואחסון מקומי הכרחיים לתפקוד בסיסי של האתר. ללא אלה, האתר לא יפעל כראוי.
              </p>
              <ul>
                <li>
                  <b>סל קניות (Redux Persist / localStorage):</b> פרטי הסל שלכם נשמרים ב-localStorage
                  בדפדפן שלכם בלבד. המידע אינו נשלח לשרתינו עד לרגע ביצוע ההזמנה, ומאפשר לשמור
                  את תוכן הסל גם אם סגרתם את הדפדפן.
                </li>
                <li>
                  <b>סשן אימות:</b> אם אתם מחוברים לחשבון, עוגיית סשן מאובטחת שומרת את זהותכם
                  כדי שלא תצטרכו להתחבר מחדש בכל דף.
                </li>
                <li>
                  <b>העדפת הסכמה לעוגיות (localStorage):</b> לאחר שתאשרו או תדחו את הבנר, נשמרת
                  הבחירה שלכם ב-localStorage כך שהבנר לא יוצג שוב.
                </li>
              </ul>
            </Section>

            <Section title="ניתוח שימוש — Vercel Analytics">
              <p>
                אנחנו משתמשים ב-<b>Vercel Analytics</b> כדי להבין כיצד המבקרים משתמשים באתר ולשפר
                את חווית הגלישה.
              </p>
              <ul>
                <li><b>Privacy-first:</b> Vercel Analytics אינו משתמש בעוגיות אישיות ואינו שומר מזהים אישיים (PII).</li>
                <li><b>ללא מעקב צולב:</b> המערכת אינה עוקבת אחריכם בין אתרים שונים.</li>
                <li><b>נתונים מצטברים:</b> הנתונים שנאספים הם סטטיסטיות מצטברות בלבד (כמות כניסות, דפים פופולריים, סוגי מכשיר) — ללא שיוך לפרט.</li>
                <li>לפרטים על מדיניות הפרטיות של Vercel: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer noopener">vercel.com/legal/privacy-policy</a>.</li>
              </ul>
            </Section>

            <Section title="כיצד לנהל ולמחוק עוגיות">
              <p>
                ניתן לנהל, לחסום, ולמחוק עוגיות דרך הגדרות הדפדפן שלכם:
              </p>
              <ul>
                <li><b>Google Chrome:</b> הגדרות ← פרטיות ואבטחה ← עוגיות ונתוני אתרים אחרים</li>
                <li><b>Firefox:</b> הגדרות ← פרטיות ואבטחה ← עוגיות ונתוני אתרים</li>
                <li><b>Safari:</b> העדפות ← פרטיות ← ניהול נתוני אתרים</li>
                <li><b>Edge:</b> הגדרות ← פרטיות, חיפוש ושירותים ← עוגיות ואישורי אתר</li>
              </ul>
              <p>
                שימו לב: חסימת עוגיות הכרחיות עלולה לפגוע בתפקוד האתר (למשל, סל הקניות לא יישמר).
              </p>
            </Section>

            <Section title="יצירת קשר">
              <p>
                לשאלות בנוגע למדיניות העוגיות שלנו, ניתן לפנות אלינו:
              </p>
              <ul>
                <li><b>WhatsApp / טלפון:</b> <a href="tel:054-8897445">054-8897445</a></li>
                <li><b>דוא&quot;ל:</b> <a href="mailto:orders@teva-li.com">orders@teva-li.com</a></li>
              </ul>
              <p>
                לפרטים נוספים על אופן טיפולנו במידע האישי שלכם, ראו את{' '}
                <a href="/privacy">מדיניות הפרטיות</a>.
              </p>
            </Section>
          </Stack>
        </Container>
      </Box>
      <Footer />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Stack spacing={1.5}>
      <Typography
        component="h2"
        sx={{
          fontSize: { xs: 20, md: 24 },
          fontWeight: 800,
          color: BRAND.brown,
          mt: 2,
          textAlign: { xs: 'center', md: 'right' },
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          fontSize: 16,
          lineHeight: 1.8,
          color: 'text.primary',
          '& ul': { pr: 3, m: 0 },
          '& li': { mb: 0.75 },
          '& p': { m: 0, mb: 1 },
          '& p:last-child': { mb: 0 },
          '& a': { color: BRAND.green },
        }}
      >
        {children}
      </Box>
    </Stack>
  );
}
