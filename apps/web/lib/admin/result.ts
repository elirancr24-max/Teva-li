// Uniform result shape returned by every server action in app/admin/actions.ts.
// Client consumers branch on `ok` and surface toasts/errors.

export type ActionResult<T = void> =
  | { ok: true; data?: T }
  | { ok: false; error: string };

export function okResult<T>(data?: T): ActionResult<T> {
  return { ok: true, data };
}

export function errResult(error: string): ActionResult<never> {
  return { ok: false, error };
}
