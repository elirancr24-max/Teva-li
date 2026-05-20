import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'טבע לי · פירות וירקות טריים עד הדלת';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage() {
  const base = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3001';

  const logoUrl = `${base}/logo-brand.png`;

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: 'linear-gradient(135deg, #0F2818 0%, #1a3d25 55%, #0F2818 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
          direction: 'rtl',
        }}
      >
        {/* Decorative glow circles */}
        <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'rgba(76,174,58,0.10)', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: -80, left: -80, width: 320, height: 320, borderRadius: '50%', background: 'rgba(76,174,58,0.08)', display: 'flex' }} />

        {/* Top accent bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: 'linear-gradient(90deg, #4CAE3A, #3d9a2d, #4CAE3A)', display: 'flex' }} />
        {/* Bottom accent bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 6, background: 'linear-gradient(90deg, #4CAE3A, #3d9a2d, #4CAE3A)', display: 'flex' }} />

        {/* Two-column layout: logo right, text left (RTL) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 72, paddingLeft: 80, paddingRight: 80, width: '100%' }}>

          {/* Logo column (right in RTL) */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoUrl}
              width={300}
              height={300}
              alt="לוגו טבע לי"
              style={{ borderRadius: 32, boxShadow: '0 8px 40px rgba(0,0,0,0.50)' }}
            />
          </div>

          {/* Text column (left in RTL) */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            {/* Brand name */}
            <div style={{ fontSize: 100, fontWeight: 900, color: '#FFFFFF', letterSpacing: '-3px', lineHeight: 1, marginBottom: 16, display: 'flex' }}>
              טבע לי
            </div>

            {/* Green divider */}
            <div style={{ width: 56, height: 4, borderRadius: 2, background: '#4CAE3A', marginBottom: 22, display: 'flex' }} />

            {/* Tagline */}
            <div style={{ fontSize: 28, color: 'rgba(255,255,255,0.82)', fontWeight: 500, marginBottom: 36, display: 'flex' }}>
              פירות וירקות טריים · נקטף בבוקר, אצלכם עד הצהריים
            </div>

            {/* City badges */}
            <div style={{ display: 'flex', gap: 12, flexDirection: 'row' }}>
              {['דימונה', 'ירוחם', 'באר שבע'].map((city) => (
                <div
                  key={city}
                  style={{
                    background: 'rgba(76,174,58,0.20)',
                    border: '1.5px solid rgba(76,174,58,0.50)',
                    borderRadius: 100,
                    paddingLeft: 20,
                    paddingRight: 20,
                    paddingTop: 8,
                    paddingBottom: 8,
                    color: '#6fcf5c',
                    fontSize: 20,
                    fontWeight: 600,
                    display: 'flex',
                  }}
                >
                  📍 {city}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
