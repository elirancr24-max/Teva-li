import { Resend } from 'resend';

let _client: Resend | null = null;

function getClient(): Resend | null {
  if (_client) return _client;
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  _client = new Resend(key);
  return _client;
}

const shekel = (cents: number) =>
  `₪${(cents / 100).toLocaleString('he-IL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export interface NewOrderEmailArgs {
  orderId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  address: string;
  deliveryDate: string;
  deliveryWindow: string;
  items: { name: string; weight: string; qty: number; priceCents: number }[];
  subtotalCents: number;
  deliveryCents: number;
  totalCents: number;
  notes?: string;
}

/**
 * Send an admin notification email when a new WhatsApp order is created.
 * Returns silently if RESEND_API_KEY is not configured — the order itself is
 * still saved, the admin just won't get an email until the key is added.
 */
export async function sendNewOrderEmail(args: NewOrderEmailArgs): Promise<void> {
  const client = getClient();
  if (!client) {
    console.warn('[resend] RESEND_API_KEY not set — skipping admin email');
    return;
  }
  const from = process.env.EMAIL_FROM ?? 'טבע לי <orders@teva-li.com>';
  const adminTo = process.env.EMAIL_ADMIN ?? 'admin@teva-li.com';

  const itemsHtml = args.items
    .map(
      (i) =>
        `<tr><td style="padding:6px 8px;border-bottom:1px solid #eee">${escapeHtml(i.name)} (${escapeHtml(
          i.weight,
        )})</td><td style="padding:6px 8px;border-bottom:1px solid #eee;text-align:center">${i.qty}</td><td style="padding:6px 8px;border-bottom:1px solid #eee;text-align:left;font-weight:600">${shekel(
          i.priceCents * i.qty,
        )}</td></tr>`,
    )
    .join('');

  const html = `<!DOCTYPE html>
<html lang="he" dir="rtl"><head><meta charset="utf-8"><title>הזמנה חדשה</title></head>
<body style="font-family:Heebo,system-ui,sans-serif;background:#F0EFEC;padding:24px;color:#1A1612">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e6e6e6">
    <div style="background:#0F2818;color:#fff;padding:20px 24px">
      <div style="font-size:11px;letter-spacing:0.2em;opacity:0.75;font-family:monospace">NEW ORDER · ${args.orderId.slice(0, 8).toUpperCase()}</div>
      <div style="font-size:22px;font-weight:800;margin-top:4px">הזמנה חדשה ב‑WhatsApp</div>
    </div>
    <div style="padding:20px 24px">
      <div style="margin-bottom:18px">
        <div style="font-size:13px;color:#666;font-family:monospace;letter-spacing:0.12em">CUSTOMER</div>
        <div style="font-size:16px;font-weight:700;margin-top:4px">${escapeHtml(args.customerName)}</div>
        <div style="font-size:14px;color:#444;margin-top:4px">${escapeHtml(args.customerPhone)} · ${escapeHtml(args.customerEmail)}</div>
        <div style="font-size:14px;color:#444;margin-top:2px">${escapeHtml(args.address)}</div>
      </div>
      <div style="margin-bottom:18px">
        <div style="font-size:13px;color:#666;font-family:monospace;letter-spacing:0.12em">DELIVERY</div>
        <div style="font-size:15px;font-weight:600;margin-top:4px">${escapeHtml(args.deliveryDate)} · ${escapeHtml(args.deliveryWindow)}</div>
      </div>
      <table style="width:100%;border-collapse:collapse;margin:18px 0;font-size:14px">
        <thead><tr style="background:#F5F0E8;font-size:12px;color:#666"><th style="padding:8px;text-align:right;font-weight:700">מוצר</th><th style="padding:8px;text-align:center;font-weight:700">כמות</th><th style="padding:8px;text-align:left;font-weight:700">סה"כ</th></tr></thead>
        <tbody>${itemsHtml}</tbody>
      </table>
      <div style="margin-top:14px;padding-top:14px;border-top:2px solid #0F2818">
        <div style="display:flex;justify-content:space-between;font-size:13px;color:#444;margin-bottom:4px"><span>סכום ביניים</span><span>${shekel(args.subtotalCents)}</span></div>
        <div style="display:flex;justify-content:space-between;font-size:13px;color:#444;margin-bottom:8px"><span>משלוח</span><span>${shekel(args.deliveryCents)}</span></div>
        <div style="display:flex;justify-content:space-between;font-size:18px;font-weight:800;color:#4F8C2E"><span>סה"כ</span><span>${shekel(args.totalCents)}</span></div>
      </div>
      ${
        args.notes
          ? `<div style="margin-top:18px;padding:12px;background:#FFF9E5;border-right:3px solid #FFB330;font-size:13px;color:#444"><strong>הערות:</strong> ${escapeHtml(args.notes)}</div>`
          : ''
      }
      <div style="margin-top:24px;text-align:center">
        <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://teva-li.vercel.app'}/admin/orders" style="display:inline-block;background:#4F8C2E;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:700;font-size:14px">פתח בניהול הזמנות</a>
      </div>
    </div>
  </div>
</body></html>`;

  try {
    await client.emails.send({
      from,
      to: adminTo,
      subject: `הזמנה חדשה · ${args.customerName} · ${shekel(args.totalCents)}`,
      html,
    });
  } catch (err) {
    console.error('[resend] send failed', err);
  }
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));
}
