// Emails website form submissions to the owner's Gmail via nodemailer.
// Credentials come ONLY from Netlify environment variables:
//   GMAIL_USER, GMAIL_APP_PASSWORD, MAIL_TO (optional, defaults to GMAIL_USER)
const nodemailer = require('nodemailer');

const json = (statusCode, body) => ({ statusCode, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clip = (s, n) => String(s || '').trim().slice(0, n);
// Only pass a plain, single address to replyTo (no display names, commas or line breaks)
const isEmail = s => /^[^\s@,;<>"]+@[^\s@,;<>"]+\.[^\s@,;<>"]+$/.test(s);

exports.handler = async event => {
  if (event.httpMethod !== 'POST') return json(405, { ok: false, error: 'Method not allowed' });

  let data;
  try {
    const raw = event.isBase64Encoded ? Buffer.from(event.body || '', 'base64').toString() : (event.body || '');
    const type = (event.headers['content-type'] || '').toLowerCase();
    data = type.includes('application/json') ? JSON.parse(raw || '{}') : Object.fromEntries(new URLSearchParams(raw));
  } catch { return json(400, { ok: false, error: 'Invalid request' }); }

  if (data['bot-field']) return json(200, { ok: true }); // honeypot: silently drop bots

  const f = {
    form: clip(data['form-name'], 40).replace(/[^\w -]/g, '') || 'quote',
    name: clip(data.name, 120), phone: clip(data.phone, 40), email: clip(data.email, 160),
    type: clip(data.type, 60), message: clip(data.message, 4000), page: clip(data.page, 200)
  };
  if (!f.name || !f.phone) return json(400, { ok: false, error: 'Name and phone are required' });

  const { GMAIL_USER, GMAIL_APP_PASSWORD, MAIL_TO } = process.env;
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) { console.error('GMAIL env vars missing'); return json(500, { ok: false, error: 'Email is not configured' }); }

  const rows = [['Name', f.name], ['Phone', f.phone], ['Email', f.email], ['Project type', f.type],
    ['Message', f.message], ['Sent from', f.page]].filter(([, v]) => v);
  const text = `New ${f.form} request from samverse.space\n\n` + rows.map(([k, v]) => `${k}: ${v}`).join('\n');
  const html = `<h2 style="font-family:Arial,sans-serif">New ${esc(f.form)} request from samverse.space</h2><table style="font-family:Arial,sans-serif;border-collapse:collapse">` +
    rows.map(([k, v]) => `<tr><td style="padding:6px 14px 6px 0;color:#555;vertical-align:top"><b>${esc(k)}</b></td><td style="padding:6px 0;white-space:pre-wrap">${esc(v)}</td></tr>`).join('') + `</table>`;

  const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD.replace(/\s+/g, '') } });
  try {
    await transporter.sendMail({
      from: `"Samverse Website" <${GMAIL_USER}>`,
      to: MAIL_TO || GMAIL_USER,
      replyTo: isEmail(f.email) ? f.email : undefined,
      subject: `New ${f.form} request: ${f.name} (${f.phone})`.replace(/[\r\n]+/g, ' '),
      text, html
    });
    return json(200, { ok: true });
  } catch (err) { console.error('sendMail failed', err); return json(502, { ok: false, error: 'Could not send email' }); }
};
