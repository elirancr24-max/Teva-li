import { Resend } from 'resend';

let _client: Resend | null = null;

function getClient(): Resend | null {
  if (_client) return _client;
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  _client = new Resend(key);
  return _client;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://teva-li.vercel.app';
const FROM = process.env.EMAIL_FROM ?? 'טבע לי <orders@teva-li.com>';
const ADMIN_TO = process.env.EMAIL_ADMIN ?? 'admin@teva-li.com';
const BRAND_DARK = '#0F2818';
const BRAND_GREEN = '#4CAE3A';
const BRAND_GOLD = '#FFB330';
const BRAND_BIT = '#009FE3';

const shekel = (cents: number) =>
  `₪${(cents / 100).toLocaleString('he-IL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));
}

function itemsTable(items: { name: string; weight: string; qty: number; priceCents: number }[]): string {
  const rows = items
    .map(
      (i) => `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #f0ede8;font-size:14px;color:#1A1612">
            ${escapeHtml(i.name)}
            ${i.weight ? `<span style="color:#888;font-size:12px"> (${escapeHtml(i.weight)})</span>` : ''}
          </td>
          <td style="padding:10px 12px;border-bottom:1px solid #f0ede8;text-align:center;font-size:14px;color:#555">×${i.qty}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #f0ede8;text-align:left;font-size:14px;font-weight:700;color:#1A1612;white-space:nowrap">${shekel(i.priceCents * i.qty)}</td>
        </tr>`,
    )
    .join('');
  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-radius:8px;overflow:hidden;border:1px solid #ede9e2">
      <thead>
        <tr style="background:#F5F0E8">
          <th style="padding:10px 12px;text-align:right;font-size:11px;color:#888;font-weight:700;letter-spacing:0.1em;font-family:monospace">מוצר</th>
          <th style="padding:10px 12px;text-align:center;font-size:11px;color:#888;font-weight:700;letter-spacing:0.1em;font-family:monospace">כמות</th>
          <th style="padding:10px 12px;text-align:left;font-size:11px;color:#888;font-weight:700;letter-spacing:0.1em;font-family:monospace">סה"כ</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

function totalsBlock(subtotal: number, delivery: number, total: number): string {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px">
      <tr>
        <td style="padding:4px 0;font-size:13px;color:#666">סכום ביניים</td>
        <td style="padding:4px 0;font-size:13px;color:#666;text-align:left">${shekel(subtotal)}</td>
      </tr>
      <tr>
        <td style="padding:4px 0;font-size:13px;color:#666">משלוח</td>
        <td style="padding:4px 0;font-size:13px;color:#666;text-align:left">${shekel(delivery)}</td>
      </tr>
      <tr>
        <td colspan="2" style="padding:4px 0"><hr style="border:none;border-top:2px solid ${BRAND_DARK};margin:8px 0"></td>
      </tr>
      <tr>
        <td style="font-size:18px;font-weight:800;color:${BRAND_DARK}">סה"כ</td>
        <td style="font-size:18px;font-weight:800;color:${BRAND_GREEN};text-align:left">${shekel(total)}</td>
      </tr>
    </table>`;
}

function emailShell(title: string, headerTag: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light">
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background-color:#F0EFEC;font-family:Arial,Helvetica,sans-serif;direction:rtl;color:#1A1612">
  <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0"><tr><td><![endif]-->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F0EFEC;padding:32px 16px">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.10)">

          <!-- ── Header ── -->
          <tr>
            <td style="background:${BRAND_DARK};padding:28px 32px;text-align:center">
              <img src="${SITE_URL}/logo-teva-trans.png" alt="טבע לי" width="110" height="auto"
                   style="display:block;margin:0 auto 14px;opacity:0.95">
              ${headerTag}
            </td>
          </tr>

          <!-- ── Body ── -->
          <tr>
            <td style="padding:28px 32px">
              ${body}
            </td>
          </tr>

          <!-- ── Divider ── -->
          <tr>
            <td style="padding:0 32px">
              <hr style="border:none;border-top:1px solid #ede9e2;margin:0">
            </td>
          </tr>

          <!-- ── Legal footer ── -->
          <tr>
            <td style="background:#F8F6F2;padding:20px 32px;text-align:center;border-radius:0 0 16px 16px">
              <div style="font-size:13px;font-weight:700;color:${BRAND_DARK};margin-bottom:3px">טבע לי — פירות וירקות טריים</div>
              <div style="font-size:12px;color:#888;margin-bottom:2px">דימונה, ישראל &nbsp;·&nbsp; 054-8897445</div>
              <div style="font-size:12px;color:#888;margin-bottom:14px">א–ה 8:00–19:00 &nbsp;·&nbsp; ו 8:00–13:00</div>
              <div style="font-size:10px;color:#bbb;line-height:1.6;max-width:460px;margin:0 auto">
                אימייל זה נשלח אוטומטית לאחר ביצוע הזמנה באתר טבע-לי ומהווה אישור עסקה.
                בהתאם לסעיף 30א לחוק התקשורת (בזק ושידורים), אין צורך בביטול הרשמה לאימיילי עסקאות.
                לפניות ובירורים: <a href="mailto:orders@teva-li.com" style="color:#888">orders@teva-li.com</a>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
  <!--[if mso]></td></tr></table><![endif]-->
</body>
</html>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. ADMIN — new order notification
// ─────────────────────────────────────────────────────────────────────────────

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

export async function sendNewOrderEmail(args: NewOrderEmailArgs): Promise<void> {
  const client = getClient();
  if (!client) { console.warn('[resend] RESEND_API_KEY not set — skipping admin email'); return; }

  const shortId = args.orderId.slice(0, 8).toUpperCase();

  const headerTag = `
    <div style="color:${BRAND_GOLD};font-size:10px;letter-spacing:0.25em;font-family:monospace;margin-bottom:6px">NEW ORDER · ${shortId}</div>
    <div style="color:#ffffff;font-size:24px;font-weight:800">הזמנה חדשה 📋</div>`;

  const body = `
    <!-- Customer info -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F6F2;border-radius:8px;margin-bottom:20px">
      <tr><td style="padding:16px 20px">
        <div style="font-size:10px;color:#888;letter-spacing:0.15em;font-family:monospace;margin-bottom:6px">CUSTOMER</div>
        <div style="font-size:16px;font-weight:800;color:${BRAND_DARK}">${escapeHtml(args.customerName)}</div>
        <div style="font-size:13px;color:#555;margin-top:3px">${escapeHtml(args.customerPhone)} &nbsp;·&nbsp; ${escapeHtml(args.customerEmail || '—')}</div>
        <div style="font-size:13px;color:#555;margin-top:2px">${escapeHtml(args.address)}</div>
      </td></tr>
    </table>

    <!-- Delivery info -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F6F2;border-radius:8px;margin-bottom:20px">
      <tr><td style="padding:14px 20px">
        <div style="font-size:10px;color:#888;letter-spacing:0.15em;font-family:monospace;margin-bottom:6px">DELIVERY</div>
        <div style="font-size:15px;font-weight:700;color:${BRAND_DARK}">${escapeHtml(args.deliveryDate)} &nbsp;·&nbsp; ${escapeHtml(args.deliveryWindow)}</div>
      </td></tr>
    </table>

    ${itemsTable(args.items)}
    ${totalsBlock(args.subtotalCents, args.deliveryCents, args.totalCents)}

    ${args.notes ? `<div style="margin-top:16px;padding:12px 16px;background:#FFF9E5;border-right:3px solid ${BRAND_GOLD};border-radius:4px;font-size:13px;color:#555"><strong>הערות:</strong> ${escapeHtml(args.notes)}</div>` : ''}

    <div style="margin-top:24px;text-align:center">
      <a href="${SITE_URL}/admin/orders/${args.orderId}"
         style="display:inline-block;background:${BRAND_GREEN};color:#fff;padding:13px 28px;border-radius:8px;text-decoration:none;font-weight:800;font-size:14px">
        פתח בניהול הזמנות →
      </a>
    </div>`;

  const html = emailShell('הזמנה חדשה | טבע לי', headerTag, body);

  try {
    await client.emails.send({
      from: FROM,
      to: ADMIN_TO,
      subject: `📋 הזמנה חדשה · ${args.customerName} · ${shekel(args.totalCents)}`,
      html,
    });
  } catch (err) {
    console.error('[resend] sendNewOrderEmail failed', err);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. CUSTOMER — order confirmation (sent immediately after checkout)
// ─────────────────────────────────────────────────────────────────────────────

export interface OrderConfirmationEmailArgs {
  orderId: string;
  customerName: string;
  customerEmail: string;
  address: string;
  deliveryDate: string;
  deliveryWindow: string;
  items: { name: string; weight: string; qty: number; priceCents: number }[];
  subtotalCents: number;
  deliveryCents: number;
  totalCents: number;
  bitUrl: string | null;
  notes?: string;
}

export async function sendOrderConfirmationEmail(args: OrderConfirmationEmailArgs): Promise<void> {
  const client = getClient();
  if (!client || !args.customerEmail) return;

  const shortId = args.orderId.slice(0, 8).toUpperCase();

  const headerTag = `
    <div style="color:${BRAND_GOLD};font-size:10px;letter-spacing:0.25em;font-family:monospace;margin-bottom:6px">הזמנה #${shortId}</div>
    <div style="color:#ffffff;font-size:26px;font-weight:800">הזמנתך התקבלה! 🌿</div>
    <div style="color:rgba(255,255,255,0.65);font-size:13px;margin-top:6px">תודה ${escapeHtml(args.customerName)}, מחכים לשלם ולשגר</div>`;

  const bitCard = args.bitUrl ? `
    <!-- Bit payment card -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#EFF8FF;border:2px solid ${BRAND_BIT};border-radius:12px;margin-bottom:24px">
      <tr><td style="padding:22px 24px;text-align:center">
        <div style="font-size:32px;margin-bottom:8px">💙</div>
        <div style="font-size:17px;font-weight:800;color:#006fa0;margin-bottom:4px">שלמו בביט עכשיו</div>
        <div style="font-size:32px;font-weight:900;color:#006fa0;margin-bottom:16px">${shekel(args.totalCents)}</div>
        <a href="${escapeHtml(args.bitUrl)}"
           style="display:inline-block;background:${BRAND_BIT};color:#ffffff;padding:14px 36px;border-radius:8px;text-decoration:none;font-weight:800;font-size:16px;letter-spacing:0.02em">
          פתח ביט לתשלום
        </a>
        <div style="font-size:11px;color:#888;margin-top:10px">הלינק יפתח את אפליקציית ביט עם הסכום מולאמלא</div>
      </td></tr>
    </table>` : '';

  const deliveryCard = `
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5FAF0;border:1px solid #c8e6b4;border-radius:8px;margin-bottom:20px">
      <tr><td style="padding:14px 20px">
        <div style="font-size:10px;color:#888;letter-spacing:0.15em;font-family:monospace;margin-bottom:5px">📦 משלוח</div>
        <div style="font-size:15px;font-weight:700;color:${BRAND_DARK}">${escapeHtml(args.deliveryDate)} &nbsp;·&nbsp; ${escapeHtml(args.deliveryWindow)}</div>
        <div style="font-size:13px;color:#555;margin-top:3px">${escapeHtml(args.address)}</div>
      </td></tr>
    </table>`;

  const body = `
    ${bitCard}
    ${deliveryCard}
    ${itemsTable(args.items)}
    ${totalsBlock(args.subtotalCents, args.deliveryCents, args.totalCents)}
    ${args.notes ? `<div style="margin-top:16px;padding:12px 16px;background:#FFF9E5;border-right:3px solid ${BRAND_GOLD};border-radius:4px;font-size:13px;color:#555"><strong>הערות שלך:</strong> ${escapeHtml(args.notes)}</div>` : ''}
    <div style="margin-top:24px;padding:16px;background:#F8F6F2;border-radius:8px;text-align:center;font-size:13px;color:#555;line-height:1.6">
      לאחר התשלום בביט — ניצור איתך קשר לאישור המשלוח.<br>
      שאלות? <a href="https://wa.me/972548897445" style="color:${BRAND_GREEN};font-weight:700">וואטסאפ</a>
      &nbsp;או&nbsp;
      <a href="tel:0548897445" style="color:${BRAND_GREEN};font-weight:700">054-8897445</a>
    </div>`;

  const html = emailShell(`אישור הזמנה #${shortId} | טבע לי`, headerTag, body);

  try {
    await client.emails.send({
      from: FROM,
      to: args.customerEmail,
      subject: `✅ הזמנה #${shortId} התקבלה | טבע לי`,
      html,
    });
  } catch (err) {
    console.error('[resend] sendOrderConfirmationEmail failed', err);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. CUSTOMER — payment confirmed (sent when admin marks order as "paid")
// ─────────────────────────────────────────────────────────────────────────────

export interface PaymentConfirmedEmailArgs {
  orderId: string;
  customerName: string;
  customerEmail: string;
  address: string;
  deliveryDate: string;
  deliveryWindow: string;
  items: { name: string; weight: string; qty: number; priceCents: number }[];
  subtotalCents: number;
  deliveryCents: number;
  totalCents: number;
}

export async function sendPaymentConfirmedEmail(args: PaymentConfirmedEmailArgs): Promise<void> {
  const client = getClient();
  if (!client || !args.customerEmail) return;

  const shortId = args.orderId.slice(0, 8).toUpperCase();

  const headerTag = `
    <div style="color:${BRAND_GOLD};font-size:10px;letter-spacing:0.25em;font-family:monospace;margin-bottom:6px">הזמנה #${shortId}</div>
    <div style="color:#ffffff;font-size:26px;font-weight:800">התשלום אושר! 🎉</div>
    <div style="color:rgba(255,255,255,0.65);font-size:13px;margin-top:6px">ההזמנה שלך בהכנה ובדרך אליך</div>`;

  const statusCard = `
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F0FBE8;border:2px solid ${BRAND_GREEN};border-radius:12px;margin-bottom:24px">
      <tr><td style="padding:20px 24px;text-align:center">
        <div style="font-size:36px;margin-bottom:8px">✅</div>
        <div style="font-size:18px;font-weight:900;color:#1A5C0A;margin-bottom:4px">תשלום אושר בהצלחה</div>
        <div style="font-size:28px;font-weight:900;color:${BRAND_GREEN};margin-bottom:4px">${shekel(args.totalCents)}</div>
        <div style="font-size:13px;color:#555">התקבל ✓</div>
      </td></tr>
    </table>`;

  const timelineCard = `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px">
      <tr>
        <td width="44" valign="top" style="text-align:center;padding-top:2px">
          <div style="width:32px;height:32px;background:${BRAND_GREEN};border-radius:50%;display:inline-block;line-height:32px;color:#fff;font-size:15px;font-weight:800;text-align:center">✓</div>
        </td>
        <td style="padding:4px 0 4px 12px">
          <div style="font-size:14px;font-weight:700;color:${BRAND_DARK}">תשלום אושר</div>
          <div style="font-size:12px;color:#888">ההזמנה עברה לשלב ההכנה</div>
        </td>
      </tr>
      <tr><td colspan="2" style="padding:2px 0 2px 16px"><div style="width:2px;height:16px;background:#e0e0e0;margin-right:15px"></div></td></tr>
      <tr>
        <td width="44" valign="top" style="text-align:center;padding-top:2px">
          <div style="width:32px;height:32px;background:${BRAND_GOLD};border-radius:50%;display:inline-block;line-height:32px;color:#fff;font-size:15px;font-weight:800;text-align:center">🌿</div>
        </td>
        <td style="padding:4px 0 4px 12px">
          <div style="font-size:14px;font-weight:700;color:${BRAND_DARK}">בהכנה</div>
          <div style="font-size:12px;color:#888">אוספים ואורזים את המוצרים הטריים</div>
        </td>
      </tr>
      <tr><td colspan="2" style="padding:2px 0 2px 16px"><div style="width:2px;height:16px;background:#e0e0e0;margin-right:15px"></div></td></tr>
      <tr>
        <td width="44" valign="top" style="text-align:center;padding-top:2px">
          <div style="width:32px;height:32px;background:#e0e0e0;border-radius:50%;display:inline-block;line-height:32px;color:#888;font-size:15px;font-weight:800;text-align:center">🚀</div>
        </td>
        <td style="padding:4px 0 4px 12px">
          <div style="font-size:14px;font-weight:700;color:#aaa">משלוח — ${escapeHtml(args.deliveryDate)}</div>
          <div style="font-size:12px;color:#bbb">${escapeHtml(args.deliveryWindow)} · ${escapeHtml(args.address)}</div>
        </td>
      </tr>
    </table>`;

  const body = `
    ${statusCard}
    ${timelineCard}
    <div style="font-size:13px;font-weight:700;color:${BRAND_DARK};margin-bottom:10px">פירוט ההזמנה</div>
    ${itemsTable(args.items)}
    ${totalsBlock(args.subtotalCents, args.deliveryCents, args.totalCents)}
    <div style="margin-top:24px;padding:16px;background:#F8F6F2;border-radius:8px;text-align:center;font-size:13px;color:#555;line-height:1.6">
      שאלות לגבי המשלוח?<br>
      <a href="https://wa.me/972548897445" style="color:${BRAND_GREEN};font-weight:700">וואטסאפ</a>
      &nbsp;·&nbsp;
      <a href="tel:0548897445" style="color:${BRAND_GREEN};font-weight:700">054-8897445</a>
    </div>`;

  const html = emailShell(`התשלום אושר! הזמנה #${shortId} | טבע לי`, headerTag, body);

  try {
    await client.emails.send({
      from: FROM,
      to: args.customerEmail,
      subject: `💙 תשלום אושר! הזמנה #${shortId} בדרך | טבע לי`,
      html,
    });
  } catch (err) {
    console.error('[resend] sendPaymentConfirmedEmail failed', err);
  }
}
