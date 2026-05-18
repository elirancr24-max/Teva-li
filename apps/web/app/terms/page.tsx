import type { Metadata } from 'next';
import { Box, Container, Stack, Typography } from '@mui/material';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BRAND } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'תנאי שימוש',
  description: 'תנאי השימוש באתר טבע לי — הזמנות, משלוחים, החזרות וביטולים.',
};

export default function TermsPage() {
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
              תנאי שימוש
            </Typography>
            <Typography sx={{ fontSize: 15, color: 'text.secondary', textAlign: { xs: 'center', md: 'right' } }}>
              עודכן לאחרונה: 18 במאי 2026
            </Typography>

            <Section title="כללי">
              <p>
                השימוש באתר &quot;טבע לי&quot; (להלן: &quot;האתר&quot;) כפוף לתנאים המפורטים להלן. הגלישה
                באתר וביצוע הזמנות מהווים הסכמה לתנאים אלה. אם אינכם מסכימים — אנא הימנעו משימוש באתר.
              </p>
            </Section>

            <Section title="מי אנחנו">
              <p>
                האתר מופעל על ידי עסק משפחתי מדימונה למכירה והובלה של פירות וירקות טריים, פירות
                מקולפים, פחיות פירות, וקיאקי פירות לאירועים. ניתן ליצור איתנו קשר ב‑WhatsApp
                054‑8897445 או במייל orders@teva-li.com.
              </p>
            </Section>

            <Section title="הזמנות ותשלום">
              <ul>
                <li>הזמנה דרך האתר מועברת ב‑WhatsApp עם פירוט מלא. הזמנה תיחשב כסופית רק לאחר אישור טלפוני או ב‑WhatsApp מצד טבע לי.</li>
                <li>תשלום מתבצע מחוץ לאתר ב‑<b>Bit</b> או <b>העברה בנקאית</b> — פרטים יישלחו לאחר אישור ההזמנה.</li>
                <li>המחירים באתר כוללים מע&quot;מ ונקובים בשקלים חדשים.</li>
                <li>טבע לי שומרת לעצמה את הזכות לסרב לאשר הזמנה (חוסר במלאי, איזור מחוץ לכיסוי, מחיר שגוי באתר וכו&apos;).</li>
              </ul>
            </Section>

            <Section title="משלוחים">
              <ul>
                <li>משלוח חינם בדימונה מעל ₪150.</li>
                <li>משלוח לערים סמוכות (ערד, באר שבע, ירוחם, מצפה רמון) — ₪25.</li>
                <li>חלון משלוח נבחר בעת ההזמנה. אנחנו עושים מאמץ להגיע בזמן, אך עיכובים בגלל תנועה / מזג אוויר אפשריים.</li>
                <li>אם אין מענה בכתובת — ננסה ליצור קשר טלפוני. אם לא נצליח, נחזיר את המשלוח לדימונה והלקוח יישא בעלות משלוח חוזר.</li>
              </ul>
            </Section>

            <Section title="טריות ואיכות">
              <p>
                כל מוצר מועבר ביקורת ידנית לפני אריזה. במידה ופריט הגיע אליכם פגום או שאינו טרי —
                צרו קשר תוך 4 שעות מקבלת המשלוח עם תמונה ב‑WhatsApp, ואנחנו נחליף או נזכה. בקשות
                שיגיעו אחרי 4 שעות לא ניתן יהיה לקבל.
              </p>
            </Section>

            <Section title="ביטולים והחזרות">
              <ul>
                <li>ביטול הזמנה לפני יציאת המשלוח — ללא עלות.</li>
                <li>ביטול אחרי יציאת המשלוח — תיגבה עלות משלוח.</li>
                <li><b>פירות שכבר נחתכו</b> (פחיות, מקולפים, קיאקים) — לא ניתן להחזיר משיקולי בריאות.</li>
                <li>קיאק פירות לאירוע — ביטול עד 5 ימים לפני האירוע בלבד.</li>
              </ul>
            </Section>

            <Section title="קניין רוחני">
              <p>
                כל התוכן באתר (טקסטים, תמונות, עיצוב, לוגו) הוא רכושה הבלעדי של טבע לי. אסור להעתיק
                או לפרסם תוכן ללא אישור מראש ובכתב.
              </p>
            </Section>

            <Section title="פרטיות">
              <p>
                השימוש במידע אישי מפורט ב<a href="/privacy" style={{ color: BRAND.green, fontWeight: 700 }}> מדיניות הפרטיות</a>.
              </p>
            </Section>

            <Section title="שיפוט">
              <p>
                כל מחלוקת תידון לפי דין מדינת ישראל בבתי המשפט המוסמכים בבאר שבע.
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
          '& p': { m: 0 },
          '& a': { color: BRAND.green },
        }}
      >
        {children}
      </Box>
    </Stack>
  );
}
