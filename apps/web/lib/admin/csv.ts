// CSV helpers. RFC 4180 quoting + UTF-8 BOM so Excel renders Hebrew correctly.

const BOM = '﻿';

function escapeField(value: unknown): string {
  if (value === null || value === undefined) return '';
  const s = String(value);
  // Quote if contains comma, quote, newline, or starts/ends with whitespace.
  if (/[",\r\n]|^\s|\s$/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export function toCsv(headers: string[], rows: Array<Array<unknown>>): string {
  const lines = [headers.map(escapeField).join(',')];
  for (const row of rows) {
    lines.push(row.map(escapeField).join(','));
  }
  return BOM + lines.join('\r\n') + '\r\n';
}

export function csvResponse(filename: string, body: string): Response {
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  });
}
