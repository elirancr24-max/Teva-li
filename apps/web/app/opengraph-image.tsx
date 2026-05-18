import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'טבע לי · פירות וירקות טריים עד הדלת';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: 'linear-gradient(135deg, #0F2818 0%, #1a3d25 55%, #0F2818 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circles */}
        <div style={{
          position: 'absolute',
          top: -80,
          right: -80,
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: 'rgba(76,174,58,0.12)',
          display: 'flex',
        }} />
        <div style={{
          position: 'absolute',
          bottom: -60,
          left: -60,
          width: 260,
          height: 260,
          borderRadius: '50%',
          background: 'rgba(76,174,58,0.10)',
          display: 'flex',
        }} />

        {/* Top accent bar */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: 'linear-gradient(90deg, #4CAE3A, #3d9a2d, #4CAE3A)',
          display: 'flex',
        }} />

        {/* Bottom accent bar */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 6,
          background: 'linear-gradient(90deg, #4CAE3A, #3d9a2d, #4CAE3A)',
          display: 'flex',
        }} />

        {/* Fruit emoji row */}
        <div style={{
          fontSize: 52,
          letterSpacing: 8,
          marginBottom: 32,
          display: 'flex',
          gap: 8,
        }}>
          🍓 🥭 🍋 🍇 🫐
        </div>

        {/* Brand name */}
        <div style={{
          fontSize: 120,
          fontWeight: 900,
          color: '#FFFFFF',
          letterSpacing: '-3px',
          lineHeight: 1,
          marginBottom: 16,
          display: 'flex',
        }}>
          טבע לי
        </div>

        {/* Green dot divider */}
        <div style={{
          width: 48,
          height: 4,
          borderRadius: 2,
          background: '#4CAE3A',
          marginBottom: 24,
          display: 'flex',
        }} />

        {/* Tagline */}
        <div style={{
          fontSize: 32,
          color: 'rgba(255,255,255,0.85)',
          fontWeight: 500,
          letterSpacing: 0,
          marginBottom: 40,
          display: 'flex',
        }}>
          פירות וירקות טריים נקטפים בבוקר · אצלכם עד הצהריים
        </div>

        {/* City badges */}
        <div style={{
          display: 'flex',
          gap: 16,
          flexDirection: 'row',
        }}>
          {['דימונה', 'ירוחם', 'באר שבע'].map((city) => (
            <div
              key={city}
              style={{
                background: 'rgba(76,174,58,0.20)',
                border: '1.5px solid rgba(76,174,58,0.50)',
                borderRadius: 100,
                paddingLeft: 24,
                paddingRight: 24,
                paddingTop: 10,
                paddingBottom: 10,
                color: '#6fcf5c',
                fontSize: 22,
                fontWeight: 600,
                display: 'flex',
              }}
            >
              📍 {city}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
