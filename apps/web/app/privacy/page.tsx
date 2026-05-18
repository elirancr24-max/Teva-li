import type { Metadata } from 'next';
import { Box, Container, Stack, Typography } from '@mui/material';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BRAND } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'מדיניות פרטיות',
  description: 'מדיניות הפרטיות של אתר טבע לי — איזה מידע נאסף, איך הוא משמש, וזכויות הלקוח.',
};

export default function PrivacyPage() {
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
              מדיניות פרטיות
            </Typography>
            <Typography sx={{ fontSize: 15, color: 'text.secondary', textAlign: { xs: 'center', md: 'right' } }}>
              עודכן לאחרונה: 18 במאי 2026
            </Typography>

            <Section title="מי אנחנו">
              <p>
                אתר &quot;טבע לי&quot; (להלן: &quot;האתר&quot;) הוא חנות אינטרנטית של עסק משפחתי מדימונה
                למכירת פירות וירקות טריים, פירות מקולפים, ופחיות פירות מוכנות, וכן הזמנת קיאקי פירות
                לאירועים. בכל שאלה אפשר לפנות אלינו ב‑WhatsApp 054‑8897445 או באימייל
                orders@teva-li.com.
              </p>
            </Section>

            <Section title="איזה מידע אנחנו אוספים">
              <ul>
                <li><b>פרטי קשר ומשלוח</b> שאתם מזינים בעצמכם בעת הזמנה: שם מלא, מספר טלפון, כתובת אימייל, כתובת משלוח, תאריך וחלון משלוח, והערות שתכתבו.</li>
                <li><b>היסטוריית הזמנות</b> — פירוט המוצרים שהזמנתם וסכומי ההזמנה.</li>
                <li><b>נתוני שימוש בסיסיים</b> — דפי נחיתה ויציאה, סוג דפדפן, רזולוציית מסך, גודל חלון. אינפורמציה זו נאספת באמצעות Vercel Analytics ואינה מזהה אתכם אישית.</li>
                <li>אנחנו <b>לא</b> אוספים פרטי אמצעי תשלום ולא שומרים אותם — תשלום מתבצע מחוץ לאתר (Bit / העברה בנקאית).</li>
              </ul>
            </Section>

            <Section title="למה אנחנו משתמשים במידע">
              <ul>
                <li>עיבוד ואספקת ההזמנה לכתובת שמסרתם.</li>
                <li>יצירת קשר אישי לאישור הזמנה, פרטי תשלום, או עדכון על שינויי משלוח.</li>
                <li>שיפור האתר ושירות הלקוחות (סטטיסטיקות מצטברות בלבד).</li>
                <li>עמידה בדרישות חוק (חשבוניות, ספרים).</li>
              </ul>
            </Section>

            <Section title="היכן המידע נשמר">
              <p>
                המידע נשמר במסד נתונים מאובטח של Supabase (מאוחסן במרכזי נתונים מאובטחים באירופה).
                הגישה למידע מוגבלת לבעלי האתר בלבד באמצעות אימות סיסמה.
              </p>
            </Section>

            <Section title="העברת מידע לצדדים שלישיים">
              <p>
                אנחנו <b>לא מוכרים</b> ולא משכירים את המידע שלכם. המידע משותף רק עם:
              </p>
              <ul>
                <li><b>Supabase</b> — אחסון מסד הנתונים.</li>
                <li><b>Vercel</b> — אירוח האתר וניתוח שימוש.</li>
                <li><b>Resend</b> — שליחת אישורי הזמנה במייל.</li>
                <li>רשויות (אם נדרש בצו חוקי).</li>
              </ul>
            </Section>

            <Section title="עוגיות (Cookies)">
              <p>
                האתר משתמש בעוגיות הכרחיות בלבד לתפעול שלו (סשן, סל קניות). אנחנו לא מציבים עוגיות
                שיווק או מעקב צד שלישי.
              </p>
            </Section>

            <Section title="הזכויות שלכם">
              <ul>
                <li><b>זכות עיון</b> — בכל רגע תוכלו לבקש לראות את כל המידע ששמור עליכם.</li>
                <li><b>זכות תיקון</b> — תוכלו לבקש לתקן מידע שגוי.</li>
                <li><b>זכות מחיקה</b> — תוכלו לבקש למחוק את המידע כולו (למעט מידע שאנחנו חייבים בחוק לשמור, למשל לצורכי חשבונאות).</li>
              </ul>
              <p>
                לכל בקשה — שלחו אימייל ל‑<a href="mailto:orders@teva-li.com" style={{ color: BRAND.green, fontWeight: 700 }}>orders@teva-li.com</a> ונחזור תוך 7 ימי עבודה.
              </p>
            </Section>

            <Section title="עדכונים למדיניות">
              <p>
                ייתכן שנעדכן את המדיניות הזו מעת לעת. תאריך העדכון האחרון מופיע בראש הדף. שינויים
                מהותיים יפורסמו באתר.
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
