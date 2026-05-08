import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'הזמנה התקבלה · פרי לי' };

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;

  return (
    <div
      style={{
        background: 'var(--paper)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(40px,8vw,100px) 24px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          border: '3px solid var(--leaf)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 36,
          marginBottom: 32,
          boxShadow: '5px 5px 0 var(--leaf)',
        }}
      >
        ✓
      </div>

      <h1
        className="display"
        style={{
          fontSize: 'clamp(52px,10vw,120px)',
          lineHeight: 0.85,
          letterSpacing: '-0.05em',
          marginBottom: 20,
        }}
      >
        ההזמנה
        <br />
        <span style={{ color: 'var(--leaf)' }}>התקבלה!</span>
      </h1>

      <p
        style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(16px,2vw,22px)',
          maxWidth: 520,
          lineHeight: 1.6,
          opacity: 0.75,
          marginBottom: 12,
        }}
      >
        שלחנו לך אישור במייל. הפירות ייחתכו בבוקר יום המשלוח ויגיעו אליך טריים.
      </p>

      {order && (
        <p
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 11,
            letterSpacing: '0.08em',
            opacity: 0.4,
            marginBottom: 32,
          }}
        >
          מספר הזמנה: {order.slice(0, 8).toUpperCase()}
        </p>
      )}

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link
          href="/shop"
          style={{
            padding: '14px 28px',
            background: 'var(--ink)',
            color: 'var(--paper)',
            fontFamily: 'var(--mono)',
            fontSize: 13,
            fontWeight: 700,
            textDecoration: 'none',
            border: '2px solid var(--ink)',
            boxShadow: '5px 5px 0 var(--watermelon)',
            letterSpacing: '0.06em',
          }}
        >
          המשך קנייה →
        </Link>
        <Link
          href="/"
          style={{
            padding: '14px 28px',
            background: 'none',
            color: 'var(--ink)',
            fontFamily: 'var(--mono)',
            fontSize: 13,
            fontWeight: 700,
            textDecoration: 'none',
            border: '2px solid var(--ink)',
            letterSpacing: '0.06em',
          }}
        >
          דף הבית
        </Link>
      </div>
    </div>
  );
}
