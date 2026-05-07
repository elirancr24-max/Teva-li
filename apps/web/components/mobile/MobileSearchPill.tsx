type Props = { accent?: string };

/** Rounded search bar shown at top of mobile home (touch target). */
export function MobileSearchPill({ accent = 'var(--watermelon)' }: Props) {
  return (
    <div
      style={{
        margin: '0 16px 18px',
        padding: '12px 16px',
        background: 'var(--paper)',
        border: '1.5px solid var(--ink)',
        borderRadius: 999,
        boxShadow: '3px 3px 0 var(--ink)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        cursor: 'text',
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
        <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" />
        <path d="M16 16l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span
        style={{
          fontFamily: 'var(--mono)',
          fontSize: 13,
          opacity: 0.55,
          letterSpacing: '0.04em',
        }}
      >
        חפש פרי, סלט, קיאק...
      </span>
      <span
        style={{
          marginInlineStart: 'auto',
          padding: '3px 8px',
          background: accent,
          color: 'var(--paper)',
          fontFamily: 'var(--mono)',
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          borderRadius: 999,
        }}
      >
        חדש
      </span>
    </div>
  );
}
