import type { Metadata } from 'next';
import { Box, Container, Stack, Typography } from '@mui/material';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactMethods } from '@/components/contact/ContactMethods';
import { getSettings } from '@/lib/settings';
import { BRAND } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'צור קשר',
  description: 'דברו איתנו ב-WhatsApp, טלפון, אימייל, או בואו לבקר בדימונה.',
};

const LABEL_SX = {
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  fontSize: 11,
  letterSpacing: '0.22em',
  textTransform: 'uppercase' as const,
  color: BRAND.green,
};

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <>
      <Header />

      {/* Hero */}
      <Box sx={{ bgcolor: BRAND.cream, borderBottom: `2px solid ${BRAND.ink}` }}>
        <Container maxWidth="lg" sx={{ py: { xs: 8, md: 14 } }}>
          <Stack spacing={3} sx={{ maxWidth: 820 }}>
            <Typography sx={LABEL_SX}>// צור קשר</Typography>
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
              בואו
              <br />
              <Box component="span" sx={{ color: BRAND.green }}>
                נדבר.
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
              שאלה על הזמנה? קיאק לאירוע? פשוט רוצים להגיד שלום? אנחנו כאן —
              ב-WhatsApp, בטלפון, ובאימייל. אנחנו עונים מהר.
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Content: 2-column layout */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 6, md: 8 },
          }}
        >
          {/* Form (right in RTL = visual right; first in markup) */}
          <Box>
            <Stack spacing={3}>
              <Stack spacing={1.5}>
                <Typography sx={LABEL_SX}>// טופס יצירת קשר</Typography>
                <Typography
                  sx={{
                    fontSize: { xs: 26, md: 34 },
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                    color: BRAND.ink,
                  }}
                >
                  כתבו לנו הודעה.
                </Typography>
                <Typography sx={{ fontSize: 14, color: 'text.secondary', lineHeight: 1.6 }}>
                  הטופס יפתח את אפליקציית האימייל שלכם עם ההודעה מוכנה לשליחה אלינו.
                </Typography>
              </Stack>
              <ContactForm to={settings.business_email} />
            </Stack>
          </Box>

          {/* Contact methods */}
          <Box>
            <Stack spacing={3}>
              <Stack spacing={1.5}>
                <Typography sx={LABEL_SX}>// דרכי יצירת קשר</Typography>
                <Typography
                  sx={{
                    fontSize: { xs: 26, md: 34 },
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                    color: BRAND.ink,
                  }}
                >
                  בחרו את הדרך
                  <br />
                  הכי נוחה לכם.
                </Typography>
              </Stack>
              <ContactMethods
                phone={settings.business_phone}
                whatsapp={settings.business_whatsapp}
                email={settings.business_email}
                address={settings.business_address}
                hours={settings.business_hours}
              />
            </Stack>
          </Box>
        </Box>
      </Container>

      <Footer />
    </>
  );
}
