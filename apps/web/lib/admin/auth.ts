// Admin session token utilities. Two formats supported during transition:
//   1. Legacy: cookie value === process.env.ADMIN_PASSWORD (plaintext).
//   2. Signed: "<uuid>.<hmacHex>" where hmac = HMAC-SHA256(secret, uuid).
//
// New logins always mint signed tokens. Layouts call verifyAdminCookie(token).
// Server-only — never import from a client component.

import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';

const HMAC_ALGO = 'sha256';

function getSecret(): string | null {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || null;
}

export function signSession(uuid: string): string {
  const secret = getSecret();
  if (!secret) throw new Error('ADMIN_SESSION_SECRET not set');
  const hmac = crypto.createHmac(HMAC_ALGO, secret).update(uuid).digest('hex');
  return `${uuid}.${hmac}`;
}

export function verifySignedSession(value: string): boolean {
  const secret = getSecret();
  if (!secret) return false;
  const dot = value.indexOf('.');
  if (dot <= 0) return false;
  const uuid = value.slice(0, dot);
  const sig = value.slice(dot + 1);
  const expected = crypto.createHmac(HMAC_ALGO, secret).update(uuid).digest('hex');
  // Constant-time compare to avoid timing attacks.
  if (sig.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expected, 'hex'));
}

/**
 * Validates the `admin-token` cookie value. Accepts:
 *  - signed format (preferred), or
 *  - legacy plaintext === ADMIN_PASSWORD (transitional, removable later).
 */
export function verifyAdminCookie(value: string | undefined): boolean {
  if (!value) return false;
  if (verifySignedSession(value)) return true;
  // Legacy fallback: plaintext password.
  const legacy = process.env.ADMIN_PASSWORD;
  return Boolean(legacy && value === legacy);
}

export async function verifyAdminPassword(input: string): Promise<boolean> {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (hash) {
    try {
      return await bcrypt.compare(input, hash);
    } catch {
      return false;
    }
  }
  // Transition path: compare against plaintext env var.
  const plain = process.env.ADMIN_PASSWORD;
  return Boolean(plain && input === plain);
}

export function mintSessionToken(): string {
  return signSession(crypto.randomUUID());
}

export function getClientIp(headers: Headers): string {
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    'unknown'
  );
}
