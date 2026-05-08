type Props = { kind: 'home' | 'shop' | 'cart' | 'user' };

/** 22px monoline SVG nav icons for the mobile bottom bar. */
export function NavIcon({ kind }: Props) {
  const stroke = 'currentColor';
  const sw = 1.6;
  if (kind === 'home') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H10v7H4a1 1 0 0 1-1-1V11z"
          stroke={stroke}
          strokeWidth={sw}
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (kind === 'shop') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 7h18l-1.5 12.5a1 1 0 0 1-1 .9H5.5a1 1 0 0 1-1-.9L3 7z"
          stroke={stroke}
          strokeWidth={sw}
          strokeLinejoin="round"
        />
        <path d="M8 7V5a4 4 0 1 1 8 0v2" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === 'cart') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 4h2.5l2.5 12h11l2-8H7"
          stroke={stroke}
          strokeWidth={sw}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <circle cx="9" cy="20" r="1.5" fill={stroke} />
        <circle cx="17" cy="20" r="1.5" fill={stroke} />
      </svg>
    );
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke={stroke} strokeWidth={sw} />
      <path
        d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinecap="round"
      />
    </svg>
  );
}
