import type { Metadata } from 'next';
import Link from 'next/link';
import { Box, Container, Stack, Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BRAND } from '@/lib/brand';
import { getSettings, whatsappLink, bitPayLink } from '@/lib/settings';

export const metadata: Metadata = { title: 'הזמנה התקבלה' };

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string; total?: string }>;
}) {
  const [{ order, total }, settings] = await Promise.all([searchParams, getSettings()]);
  const waLink = whatsappLink(settings.business_whatsapp);
  const businessPhone = settings.business_phone || null;

  const totalCents = total ? parseInt(total, 10) : 0;
  const totalShekel = totalCents > 0 ? `₪${(totalCents / 100).toFixed(2)}` : null;
  const shortId = order ? order.slice(0, 8).toUpperCase() : null;

  const bitLink =
    settings.business_bit_phone && totalCents > 0
      ? bitPayLink(
          settings.business_bit_phone,
          totalCents,
          `טבע לי הזמנה${shortId ? ` ${shortId}` : ''}`,
        )
      : null;

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 3 }, minHeight: '60vh', textAlign: 'center' }}>
        <Stack spacing={3} alignItems="center">
          <Box
            sx={{
              width: { xs: 80, md: 96 },
              height: { xs: 80, md: 96 },
              borderRadius: '50%',
              bgcolor: BRAND.greenLight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CheckCircleOutlineIcon sx={{ fontSize: { xs: 48, md: 56 }, color: BRAND.green }} />
          </Box>

          <Typography variant="h1" sx={{ fontSize: { xs: 28, md: 44 }, fontWeight: 800, lineHeight: 1.1 }}>
            הזמנתך נקלטה!
          </Typography>

          <Typography sx={{ fontSize: { xs: 15, md: 17 }, color: 'text.secondary', maxWidth: 540, lineHeight: 1.6 }}>
            ההזמנה נשמרה ונשלח אישור לאימייל שלך. יש לשלם בביט — לאחר מכן נאשר ונתאם את המשלוח.
          </Typography>

          {shortId && (
            <Box
              sx={{
                bgcolor: BRAND.cream,
                border: `1px solid ${BRAND.brownLight}`,
                borderRadius: 2,
                px: 2.5,
                py: 1.5,
              }}
            >
              <Typography sx={{ fontSize: 11, color: 'text.secondary', letterSpacing: '0.18em', fontFamily: 'monospace' }}>
                מספר הזמנה
              </Typography>
              <Typography sx={{ fontSize: 18, fontWeight: 800, fontFamily: 'monospace', color: BRAND.brown }}>
                {shortId}
              </Typography>
            </Box>
          )}

          {/* Pending confirmation notice */}
          <Box
            sx={{
              width: '100%',
              maxWidth: 480,
              border: `1.5px solid #f0a500`,
              borderRadius: 2.5,
              p: { xs: 2, md: 2.5 },
              bgcolor: '#fffbf0',
              textAlign: 'right',
            }}
          >
            <Typography sx={{ fontSize: 15, fontWeight: 800, color: '#b8700a', mb: 0.5 }}>
              ⏳ ההזמנה ממתינה לאישור העסק
            </Typography>
            <Typography sx={{ fontSize: 13, color: '#7a5200', lineHeight: 1.6 }}>
              לאחר תשלום בביט, ניצור איתך קשר לאישור ותיאום המשלוח.
              {businessPhone && (
                <> לשאלות ניתן לפנות לטלפון&nbsp;
                  <Box component="span" sx={{ fontWeight: 800, direction: 'ltr', display: 'inline-block' }}>
                    {businessPhone}
                  </Box>
                </>
              )}
            </Typography>
          </Box>

          {/* Bit payment card */}
          {bitLink && (
            <Box
              sx={{
                width: '100%',
                maxWidth: 420,
                border: '2px solid #009FE3',
                borderRadius: 3,
                p: { xs: 2.5, md: 3 },
                bgcolor: '#f0f9ff',
                textAlign: 'center',
              }}
            >
              <Box component="span" sx={{ fontSize: 36, display: 'block', mb: 1 }}>💙</Box>
              <Typography sx={{ fontSize: 20, fontWeight: 900, color: '#006fa0', mb: 0.5 }}>
                שלמו בביט עכשיו
              </Typography>
              {totalShekel && (
                <Typography sx={{ fontSize: 28, fontWeight: 900, color: '#006fa0', mb: 1.5 }}>
                  {totalShekel}
                </Typography>
              )}
              <Button
                component="a"
                href={bitLink}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  bgcolor: '#009FE3',
                  py: 1.5,
                  fontSize: 16,
                  fontWeight: 800,
                  borderRadius: 2,
                  '&:hover': { bgcolor: '#007ab8' },
                }}
              >
                פתח ביט לתשלום
              </Button>
              <Typography sx={{ fontSize: 11, color: 'text.secondary', mt: 1.5 }}>
                לחיצה תפתח את אפליקציית ביט עם הסכום המדויק מולאמלא
              </Typography>
            </Box>
          )}

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ pt: bitLink ? 0 : 2, width: { xs: '100%', sm: 'auto' } }}>
            <Button
              component="a"
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              variant={bitLink ? 'outlined' : 'contained'}
              size="large"
              startIcon={<WhatsAppIcon />}
              sx={
                bitLink
                  ? { py: 1.5, px: 3, width: { xs: '100%', sm: 'auto' } }
                  : {
                      bgcolor: BRAND.green,
                      py: 1.5,
                      px: 3,
                      fontWeight: 800,
                      width: { xs: '100%', sm: 'auto' },
                      '&:hover': { bgcolor: BRAND.greenDark },
                    }
              }
            >
              {bitLink ? 'שלחו פרטים ב‑WhatsApp' : 'פתח WhatsApp'}
            </Button>
            <Link href="/shop" style={{ textDecoration: 'none' }}>
              <Button
                variant="outlined"
                size="large"
                sx={{ py: 1.5, px: 3, width: { xs: '100%', sm: 'auto' } }}
              >
                המשך קנייה
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Container>
      <Footer />
    </>
  );
}
