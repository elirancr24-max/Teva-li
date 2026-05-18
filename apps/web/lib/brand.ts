/**
 * Tropical brand tokens — plain module (no 'use client').
 * Importable from both server + client components.
 * Extracted from theme.ts to fix server-component bgcolor: undefined bug.
 */
export const BRAND = {
  green: '#4CAE3A',
  greenDark: '#2D7A1D',
  greenLight: '#E8F5DC',

  gold: '#FFB330',
  goldDark: '#E89518',
  goldLight: '#FFF4D6',

  watermelon: '#FF5757',
  watermelonDark: '#D63F3F',

  teal: '#1FB6A0',
  tealDark: '#0E8A78',

  /** Deep forest green — replaces old brown for header/footer/text. Matches lime brand. */
  brown: '#0F2818',
  brownLight: '#3D5A45',

  cream: '#FFF9E5',
  paper: '#FDFCF8',
  ink: '#1A1612',
} as const;

export const MESH = {
  sunset: `
    radial-gradient(at 18% 22%, rgba(255,179,48,0.55) 0px, transparent 60%),
    radial-gradient(at 82% 12%, rgba(76,174,58,0.40) 0px, transparent 55%),
    radial-gradient(at 50% 85%, rgba(31,182,160,0.35) 0px, transparent 60%),
    radial-gradient(at 90% 70%, rgba(255,87,87,0.30) 0px, transparent 50%)
  `,
  tropical: `
    radial-gradient(at 25% 30%, rgba(31,182,160,0.45) 0px, transparent 55%),
    radial-gradient(at 75% 20%, rgba(76,174,58,0.40) 0px, transparent 50%),
    radial-gradient(at 55% 80%, rgba(255,179,48,0.30) 0px, transparent 55%)
  `,
} as const;
