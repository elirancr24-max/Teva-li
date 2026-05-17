import type { Metadata } from 'next';
import Link from 'next/link';
import { Box, Container, Stack, Typography, Button } from '@mui/material';
import LocalFloristOutlinedIcon from '@mui/icons-material/LocalFloristOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BRAND } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'עלינו',
  description: 'הסיפור המשפחתי מאחורי טבע לי. עסק קטן מדימונה, מאז 2019.',
};

const LABEL_SX = {
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  fontSize: 11,
  letterSpacing: '0.22em',
  textTransform: 'uppercase' as const,
  color: BRAND.green,
};

const VALUES = [
  {
    icon: LocalFloristOutlinedIcon,
    title: 'טריות',
    body: 'כל פרי וכל ירק נבחר ידנית בבוקר. אם הוא לא יעלה על השולחן שלנו, הוא לא יעלה על שלכם.',
  },
  {
    icon: FavoriteBorderOutlinedIcon,
    title: 'אישיות',
    body: 'אנחנו מכירים את הלקוחות שלנו בשם. מזמינים, מתקשרים, ולפעמים גם שולחים תפוח מתנה.',
  },
  {
    icon: GroupsOutlinedIcon,
    title: 'קהילתיות',
    body: 'דימונה היא הבית שלנו. אנחנו תומכים בחקלאים מקומיים ומחזירים לקהילה שגדלנו בה.',
  },
];

const TIMELINE = [
  {
    year: '2019',
    title: 'ההתחלה',
    body: 'דוכן קטן בשוק העירוני של דימונה. שני ארגזי פירות וחיוך גדול.',
  },
  {
    year: '2021',
    title: 'הקיאקים הראשונים',
    body: 'התחלנו לסדר קיאקי פירות לאירועים משפחתיים. הביקוש הפך לנהר.',
  },
  {
    year: '2023',
    title: 'משלוחים לכל העיר',
    body: 'רכב משלוחים ראשון. הזמנות מקוונות. צוות של חמישה בני משפחה.',
  },
  {
    year: '2025',
    title: 'הדור הבא',
    body: 'אתר חדש, מטבח חיתוך מקצועי, ושותפויות עם חקלאים בערבה ובאזורים נוספים.',
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <Box sx={{ bgcolor: BRAND.cream, borderBottom: `2px solid ${BRAND.ink}` }}>
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 14 } }}>
          <Stack spacing={3} sx={{ maxWidth: 820 }}>
            <Typography sx={LABEL_SX}>// אודות · טבע לי</Typography>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: 44, md: 88 },
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                color: BRAND.ink,
              }}
            >
              המשפחה
              <br />
              מאחורי
              <Box component="span" sx={{ color: BRAND.green }}>
                {' '}
                טבע לי.
              </Box>
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 16, md: 19 },
                color: 'text.secondary',
                maxWidth: 620,
                lineHeight: 1.6,
              }}
            >
              עסק משפחתי קטן מדימונה, שבחר לעשות דבר אחד ולעשות אותו טוב.
              פירות וירקות טריים, חיתוך נקי, ויחס אישי שלא תמצאו בשום סופר.
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Story */}
      <Container maxWidth="md" sx={{ py: { xs: 8, md: 14 } }}>
        <Stack spacing={4}>
          <Typography sx={LABEL_SX}>// הסיפור</Typography>
          <Typography
            sx={{
              fontSize: { xs: 28, md: 40 },
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: BRAND.ink,
            }}
          >
            התחלנו ב-2019 בדימונה.
          </Typography>
          <Typography sx={{ fontSize: 17, lineHeight: 1.85, color: 'text.primary' }}>
            הכל התחיל בארגז אבטיחים אחד שאבא הביא משוק בנמל. הוא חתך, סידר, ואמר לאמא: &quot;תראי
            כמה זה יפה ככה.&quot; באותו בוקר נולד טבע לי. דוכן קטן בשוק העירוני, עם שלט כתוב ביד
            וחלום פשוט: שכל אחד בדימונה יוכל לקבל פירות שנראים ומרגישים כאילו קטפו אותם ברגע זה.
          </Typography>
          <Typography sx={{ fontSize: 17, lineHeight: 1.85, color: 'text.primary' }}>
            שש שנים אחר כך, אנחנו עדיין בוחרים כל פרי ביד. עדיין מכירים את הלקוחות שלנו בשם. עדיין
            מתעוררים לפני הזריחה כדי להגיע לחקלאים. אבל היום אפשר להזמין גם דרך האתר, וזה מגיע
            אליכם הביתה, ארוז, חתוך, מוכן. עם אותה תשומת לב שאבא נתן לאבטיח הראשון.
          </Typography>
          <Typography
            sx={{
              fontSize: 17,
              lineHeight: 1.85,
              color: BRAND.brown,
              fontWeight: 700,
              borderRight: `3px solid ${BRAND.green}`,
              pr: 3,
            }}
          >
            כי בסוף, פירות זה לא רק אוכל. זה דרך להגיד למישהו &quot;חשבתי עליך היום&quot;.
          </Typography>
        </Stack>
      </Container>

      {/* Values */}
      <Box sx={{ bgcolor: '#fff', borderTop: `2px solid ${BRAND.ink}`, borderBottom: `2px solid ${BRAND.ink}` }}>
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
          <Stack spacing={6}>
            <Stack spacing={2}>
              <Typography sx={LABEL_SX}>// הערכים שלנו</Typography>
              <Typography
                sx={{
                  fontSize: { xs: 28, md: 44 },
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.05,
                  color: BRAND.ink,
                }}
              >
                שלושה עקרונות.
                <br />
                ללא פשרות.
              </Typography>
            </Stack>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                gap: { xs: 3, md: 4 },
              }}
            >
              {VALUES.map(({ icon: Icon, title, body }) => (
                <Box
                  key={title}
                  sx={{
                    border: `2px solid ${BRAND.ink}`,
                    p: 4,
                    bgcolor: BRAND.cream,
                    transition: 'transform 200ms, background-color 200ms',
                    '&:hover': { transform: 'translateY(-4px)', bgcolor: '#fff' },
                  }}
                >
                  <Stack spacing={2}>
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        border: `2px solid ${BRAND.green}`,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: BRAND.green,
                      }}
                    >
                      <Icon sx={{ fontSize: 30 }} />
                    </Box>
                    <Typography
                      sx={{ fontSize: 24, fontWeight: 800, color: BRAND.ink, letterSpacing: '-0.01em' }}
                    >
                      {title}
                    </Typography>
                    <Typography sx={{ fontSize: 15, color: 'text.secondary', lineHeight: 1.7 }}>
                      {body}
                    </Typography>
                  </Stack>
                </Box>
              ))}
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Timeline */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 14 } }}>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Typography sx={LABEL_SX}>// ציר הזמן</Typography>
            <Typography
              sx={{
                fontSize: { xs: 28, md: 44 },
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
                color: BRAND.ink,
              }}
            >
              שש שנים. ארבע נקודות ציון.
            </Typography>
          </Stack>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              gap: { xs: 3, md: 0 },
              position: 'relative',
            }}
          >
            {TIMELINE.map((item, idx) => (
              <Box
                key={item.year}
                sx={{
                  position: 'relative',
                  p: { xs: 3, md: 4 },
                  borderTop: `4px solid ${BRAND.green}`,
                  borderRight: {
                    xs: 'none',
                    md: idx < TIMELINE.length - 1 ? `1px dashed ${BRAND.ink}` : 'none',
                  },
                  pr: { md: 4 },
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: 36, md: 48 },
                    fontWeight: 900,
                    color: BRAND.ink,
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                    mb: 1.5,
                  }}
                >
                  {item.year}
                </Typography>
                <Typography
                  sx={{ fontSize: 17, fontWeight: 700, color: BRAND.brown, mb: 1 }}
                >
                  {item.title}
                </Typography>
                <Typography sx={{ fontSize: 14, color: 'text.secondary', lineHeight: 1.6 }}>
                  {item.body}
                </Typography>
              </Box>
            ))}
          </Box>
        </Stack>
      </Container>

      {/* CTA */}
      <Box sx={{ bgcolor: BRAND.ink, color: '#F5F0E8' }}>
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={4}
            alignItems={{ xs: 'flex-start', md: 'center' }}
            justifyContent="space-between"
          >
            <Stack spacing={2} sx={{ maxWidth: 620 }}>
              <Typography
                sx={{
                  ...LABEL_SX,
                  color: BRAND.green,
                }}
              >
                // הסיפור שלנו ממשיך
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 30, md: 48 },
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                }}
              >
                בואו לטעום
                <br />
                את ההבדל.
              </Typography>
            </Stack>
            <Link href="/shop" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowBackIcon />}
                sx={{
                  bgcolor: BRAND.green,
                  color: BRAND.ink,
                  px: 4,
                  py: 1.75,
                  fontSize: 16,
                  fontWeight: 800,
                  borderRadius: 0,
                  '&:hover': { bgcolor: '#fff' },
                }}
              >
                לקטלוג המוצרים
              </Button>
            </Link>
          </Stack>
        </Container>
      </Box>

      <Footer />
    </>
  );
}
