import { Box, Container, Stack, Typography } from '@mui/material';
import { BRAND } from '@/lib/theme';

const CITIES = ['דימונה', 'ערד', 'באר שבע', 'ירוחם', 'מצפה רמון'];

/**
 * Delivery area block — Title + pill list of supported cities + free-shipping note.
 * Pure presentational server component.
 */
export function DeliveryAreas() {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: BRAND.cream,
        py: { xs: 6, md: 6 },
        px: 2,
        borderBottom: `2px solid ${BRAND.ink}`,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={2.5} alignItems="center">
          <Typography
            component="h2"
            sx={{
              color: BRAND.brown,
              fontSize: 32,
              fontWeight: 900,
              letterSpacing: '-0.02em',
              textAlign: 'center',
            }}
          >
            אזורי משלוח
          </Typography>
          <Typography
            sx={{
              color: BRAND.brown,
              fontSize: 16,
              textAlign: 'center',
              opacity: 0.85,
              fontWeight: 500,
            }}
          >
            אנו מספקים פירות וירקות טריים לאזורים הבאים:
          </Typography>

          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="center"
            sx={{ gap: 1.5, py: 1 }}
          >
            {CITIES.map((city) => (
              <Box
                key={city}
                sx={{
                  bgcolor: '#fff',
                  color: BRAND.brown,
                  px: 2,
                  py: 1,
                  borderRadius: 999,
                  border: `1px solid ${BRAND.brown}`,
                  fontSize: 14,
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                }}
              >
                {city}
              </Box>
            ))}
          </Stack>

          <Typography
            sx={{
              color: BRAND.brown,
              opacity: 0.75,
              fontSize: 14,
              fontWeight: 600,
              textAlign: 'center',
              pt: 1,
            }}
          >
            משלוח חינם בהזמנה מעל ₪150
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
