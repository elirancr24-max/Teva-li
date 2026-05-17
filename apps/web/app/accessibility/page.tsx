import type { Metadata } from 'next';
import { Box, Container, Stack, Typography } from '@mui/material';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BRAND } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'הצהרת נגישות',
  description: 'הצהרת נגישות לאתר טבע לי לפי תקן ישראלי 5568 ו-WCAG 2.0 ברמה AA.',
};

export default function AccessibilityPage() {
  return (
    <>
      <Header />
      <Box component="main" id="main" sx={{ bgcolor: BRAND.cream, minHeight: '60vh' }}>
        <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
          <Stack spacing={3}>
            <Typography component="h1" sx={{ fontSize: { xs: 32, md: 44 }, fontWeight: 900, color: BRAND.brown, letterSpacing: '-0.02em' }}>
              הצהרת נגישות
            </Typography>
            <Typography sx={{ fontSize: 15, color: 'text.secondary' }}>
              עודכן לאחרונה: 17 במאי 2026
            </Typography>

            <Section title="מחויבות האתר לנגישות">
              <p>אתר טבע לי שואף לאפשר לכל אדם, לרבות אנשים עם מוגבלות, להשתמש באתר ולהתרשם מהמוצרים והשירותים שלנו. אנו פועלים לעמוד בדרישות תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע&quot;ג-2013, ובתקן הישראלי ת&quot;י 5568 ברמה AA.</p>
            </Section>

            <Section title="התאמות הנגישות באתר">
              <ul>
                <li>תפריט נגישות צף עם אפשרות להגדלת גופן, ניגודיות גבוהה, הדגשת קישורים, וכיבוי אנימציות.</li>
                <li>תמיכה מלאה בניווט באמצעות מקלדת.</li>
                <li>ניגודיות צבעים ברמת AA לפי WCAG 2.0.</li>
                <li>תיאורי alt לכל התמונות החשובות.</li>
                <li>שימוש ב-aria-labels לכפתורי אייקון.</li>
                <li>קישור &quot;דלג לתוכן העיקרי&quot; בתחילת כל דף.</li>
                <li>היררכיית כותרות תקינה.</li>
              </ul>
            </Section>

            <Section title="דרכי פנייה לרכז הנגישות">
              <p>אם נתקלתם בבעיית נגישות באתר, או יש לכם הצעה לשיפור, אנא צרו קשר עם רכז הנגישות שלנו:</p>
              <ul>
                <li>שם: אלירן (רכז נגישות)</li>
                <li>טלפון: 050-0000000</li>
                <li>דוא&quot;ל: <a href="mailto:eliranabu320@gmail.com" style={{ color: BRAND.green }}>eliranabu320@gmail.com</a></li>
                <li>זמן מענה: עד 3 ימי עבודה.</li>
              </ul>
            </Section>

            <Section title="חריגים מהנגישות">
              <p>חלק מהתכנים באתר, בעיקר תמונות מוצר ישנות, עשויים שלא להיות נגישים במלואם. אנו פועלים באופן שוטף לשפר זאת.</p>
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
      <Typography component="h2" sx={{ fontSize: { xs: 20, md: 24 }, fontWeight: 800, color: BRAND.brown, mt: 2 }}>
        {title}
      </Typography>
      <Box sx={{ fontSize: 16, lineHeight: 1.8, color: 'text.primary', '& ul': { pr: 3, m: 0 }, '& li': { mb: 0.5 }, '& p': { m: 0 }, '& a': { color: BRAND.green } }}>
        {children}
      </Box>
    </Stack>
  );
}
