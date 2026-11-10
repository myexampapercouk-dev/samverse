const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, '..', 'assets', 'tutorials');
fs.mkdirSync(OUT, { recursive: true });

const W = 960, H = 560, RED = '#d63638', ORANGE = '#c2410c';
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const t = (x, y, s, o = {}) => `<text x="${x}" y="${y}"${o.size ? ` font-size="${o.size}"` : ''}${o.fill ? ` fill="${o.fill}"` : ''}${o.bold ? ' font-weight="600"' : ''}${o.anchor ? ` text-anchor="${o.anchor}"` : ''}${o.mono ? ' font-family="ui-monospace,Consolas,monospace"' : ''}>${esc(s)}</text>`;
const r = (x, y, w, h, fill, o = {}) => `<rect x="${x}" y="${y}" width="${w}" height="${h}"${o.rx ? ` rx="${o.rx}"` : ''} fill="${fill}"${o.stroke ? ` stroke="${o.stroke}"` : ''}/>`;
const btn = (x, y, label, primary = true, w) => { w = w || label.length * 7.4 + 24; return r(x, y, w, 30, primary ? '#2271b1' : '#f6f7f7', { rx: 3, stroke: primary ? '#2271b1' : '#2271b1' }) + t(x + w / 2, y + 20, label, { size: 13, fill: primary ? '#fff' : '#2271b1', anchor: 'middle' }); };
const checkbox = (x, y, on) => r(x, y, 16, 16, '#fff', { rx: 3, stroke: '#8c8f94' }) + (on ? `<path d="M${x + 3} ${y + 8}l4 4 6-8" fill="none" stroke="#2271b1" stroke-width="2.4"/>` : '');
const radio = (x, y, on) => `<circle cx="${x + 8}" cy="${y + 8}" r="8" fill="#fff" stroke="#8c8f94"/>` + (on ? `<circle cx="${x + 8}" cy="${y + 8}" r="4" fill="#2271b1"/>` : '');
const toggle = (x, y, on) => r(x, y, 40, 20, on ? '#2271b1' : '#8c8f94', { rx: 10 }) + `<circle cx="${x + (on ? 30 : 10)}" cy="${y + 10}" r="7" fill="#fff"/>`;

// Annotation: highlight box, curved arrow from callout to box, callout label
function mark(box, call) {
  const [bx, by, bw, bh] = box; const [cx, cy, label] = call;
  const cw = label.length * 7.6 + 28;
  const tx = cx < bx ? bx - 4 : (cx > bx + bw ? bx + bw + 4 : bx + bw / 2);
  const ty = cx >= bx && cx <= bx + bw ? (cy < by ? by - 4 : by + bh + 4) : by + bh / 2;
  const sx = cx + cw / 2, sy = cy < ty ? cy + 34 : cy;
  const mx = (sx + tx) / 2 + (sy < ty ? 40 : -40), my = (sy + ty) / 2;
  return `<rect x="${bx - 6}" y="${by - 6}" width="${bw + 12}" height="${bh + 12}" rx="8" fill="none" stroke="${RED}" stroke-width="3"/>` +
    `<path d="M${sx} ${sy} Q${mx} ${my} ${tx} ${ty}" fill="none" stroke="${RED}" stroke-width="3" marker-end="url(#ah)"/>` +
    r(cx, cy, cw, 34, ORANGE, { rx: 17 }) + t(cx + cw / 2, cy + 22, label, { size: 14, fill: '#fff', bold: true, anchor: 'middle' });
}

function doc(title, desc, inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-labelledby="t d" font-family="system-ui,-apple-system,'Segoe UI',Roboto,sans-serif" font-size="13" fill="#1d2327">
<title id="t">${esc(title)}</title><desc id="d">${esc(desc)}</desc>
<defs><marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${RED}"/></marker></defs>
${r(0, 0, W, H, '#f0f0f1')}
${inner}
${r(W - 214, H - 26, 206, 20, '#ffffff', { rx: 4, stroke: '#dcdcde' })}${t(W - 111, H - 12, 'Illustration by Samverse, not a screenshot', { size: 10.5, fill: '#646970', anchor: 'middle' })}
</svg>
`;
}

// WordPress admin: top bar + dark sidebar
const WP_MENU = ['Dashboard', 'Posts', 'Media', 'Pages', 'Comments', 'Appearance', 'Plugins', 'Users', 'Tools', 'Settings'];
function wp(menu, active, subs = [], subActive, extra = {}) {
  let s = r(0, 0, W, 32, '#1d2327') + t(14, 21, extra.bar || 'My Site', { fill: '#f0f0f1' }) + t(W - 14, 21, 'Howdy, admin', { fill: '#f0f0f1', anchor: 'end' });
  if (extra.barRed) s += r(130, 4, extra.barRed.length * 7 + 20, 24, RED, { rx: 3 }) + t(140, 21, extra.barRed, { fill: '#fff' });
  s += r(0, 32, 160, H - 32, '#1d2327');
  let y = 40;
  const pos = {};
  for (const m of menu) {
    const on = m === active;
    if (on) s += r(0, y, 160, 34, '#2271b1');
    s += r(12, y + 11, 12, 12, on ? '#fff' : '#a7aaad', { rx: 2 }) + t(34, y + 22, m, { fill: '#fff', bold: on });
    if (m === extra.badgeOn) s += r(116, y + 9, 22, 17, RED, { rx: 8 }) + t(127, y + 22, extra.badge || '3', { size: 11, fill: '#fff', anchor: 'middle' });
    pos[m] = [0, y, 160, 34]; y += 34;
    if (on && subs.length) {
      s += r(0, y, 160, subs.length * 28 + 10, '#2c3338');
      y += 6;
      for (const sb of subs) { s += t(34, y + 18, sb, { fill: sb === subActive ? '#fff' : '#c3c4c7', bold: sb === subActive }); pos['sub:' + sb] = [26, y + 2, 126, 24]; y += 28; }
      y += 4;
    }
  }
  return { s, pos };
}
const h1 = (x, y, s) => t(x, y, s, { size: 22, bold: false });
const panel = (x, y, w, h) => r(x, y, w, h, '#fff', { stroke: '#c3c4c7' });
const tabs = (x, y, items, on) => { let s = '', cx = x; for (const it of items) { const w = it.length * 7.3 + 22; s += r(cx, y, w, 30, it === on ? '#f0f0f1' : '#dcdcde', { stroke: '#c3c4c7' }) + t(cx + w / 2, y + 20, it, { size: 13, anchor: 'middle', bold: it === on }); cx += w + 4; } return s + `<line x1="${x}" y1="${y + 30}" x2="${W - 24}" y2="${y + 30}" stroke="#c3c4c7"/>`; };
const sublinks = (x, y, items, on) => { let s = '', cx = x; items.forEach((it, i) => { s += t(cx, y, it, { fill: it === on ? '#1d2327' : '#2271b1', bold: it === on }); cx += it.length * 7 + 10; if (i < items.length - 1) { s += t(cx, y, '|', { fill: '#a7aaad' }); cx += 14; } }); return s; };
function hpanel(active, items) {
  let s = r(0, 0, W, 56, '#fff', { stroke: '#e3e3e8' }) + t(24, 35, 'hPanel', { size: 18, bold: true, fill: '#673de6' }) + t(W - 24, 35, 'yourdomain.com', { anchor: 'end', fill: '#36344d' });
  s += r(0, 56, 210, H - 56, '#fff', { stroke: '#e3e3e8' });
  let y = 70; const pos = {};
  for (const it of items) {
    const sub = it.startsWith('  '); const name = it.trim(); const on = name === active;
    if (on) s += r(8, y, 194, 30, '#ebe4ff', { rx: 6 });
    s += t(sub ? 44 : 22, y + 20, name, { fill: on ? '#673de6' : '#36344d', bold: on || !sub, size: sub ? 13 : 14 });
    pos[name] = [8, y, 194, 30]; y += 32;
  }
  return { s, pos };
}
const HP = ['Dashboard', 'Security', 'Performance', 'WordPress', 'Domains', 'Files', 'Databases', 'Advanced', '  SSH Access', '  Cron Jobs', '  PHP Configuration', '  Cache Manager', '  DNS Zone Editor'];

// Light-sidebar app shell (Shopify admin, Razorpay, Cloudflare, hPanel style)
function app(o) {
  const sw = o.sideW || 210;
  let s = r(0, 0, W, 52, o.barBg || '#fff', { stroke: '#e1e3e5' }) + t(22, 33, o.brand, { size: 17, bold: true, fill: o.brandFill || '#1d2327' }) + t(W - 22, 33, o.right || 'yourdomain.com', { anchor: 'end', fill: o.barBg && o.barBg !== '#fff' ? '#e3e3e3' : '#4a4a63' });
  s += r(0, 52, sw, H - 52, o.sideBg || '#fff', { stroke: '#e1e3e5' });
  let y = 66; const pos = {};
  for (const it of o.nav) {
    const sub = it.startsWith('  '); const name = it.trim(); const on = name === o.active;
    if (on) s += r(8, y, sw - 16, 30, o.onBg || '#e8eaff', { rx: 6 });
    s += t(sub ? 42 : 22, y + 20, name, { fill: on ? (o.onFill || '#3040c4') : '#303030', bold: on || !sub, size: sub ? 13 : 14 });
    pos[name] = [8, y, sw - 16, 30]; y += 32;
  }
  return { s, pos, x: sw + 30 };
}
const ring = (b, rr = 8) => `<rect x="${b[0] - 4}" y="${b[1] - 4}" width="${b[2] + 8}" height="${b[3] + 8}" rx="${rr}" fill="none" stroke="${RED}" stroke-width="3"/>`;
const card_ = (x, y, w, h) => r(x, y, w, h, '#fff', { rx: 10, stroke: '#e1e3e5' });
const field = (x, y, w, label, val, o = {}) => t(x, y, label, { bold: true, size: 13 }) + r(x, y + 10, w, 34, '#fff', { rx: 4, stroke: '#8c8f94' }) + t(x + 12, y + 32, val, { fill: o.muted ? '#8c8f94' : '#1d2327', mono: o.mono });
const pill = (x, y, label, bg, fg, w) => { w = w || label.length * 7 + 22; return r(x, y, w, 30, bg, { rx: 6 }) + t(x + w / 2, y + 20, label, { fill: fg, anchor: 'middle', bold: true }); };
const WPM = ['Dashboard', 'Posts', 'Media', 'Pages', 'Comments', 'WooCommerce', 'Appearance', 'Plugins', 'Users', 'Tools', 'Settings'];

const images = {};

// ---------- 1. Razorpay in WooCommerce ----------
images['add-razorpay-to-woocommerce-step-1'] = doc('WordPress Plugins Add New Plugin screen searching for Razorpay', 'Illustrated WordPress admin, Plugins > Add New Plugin, with Razorpay typed in the search box and the Install Now button on the Razorpay for WooCommerce card highlighted.', (() => {
  const m = wp(WPM, 'Plugins', ['Installed Plugins', 'Add New Plugin', 'Plugin File Editor'], 'Add New Plugin');
  let s = m.s + h1(190, 74, 'Add Plugins') + r(650, 54, 286, 32, '#fff', { rx: 3, stroke: '#8c8f94' }) + t(662, 75, 'Razorpay');
  s += panel(190, 110, 360, 230) + r(206, 126, 90, 90, '#072654', { rx: 6 }) + t(251, 177, 'R', { size: 36, fill: '#3395ff', anchor: 'middle', bold: true });
  s += t(312, 146, 'Razorpay for WooCommerce', { size: 15, bold: true, fill: '#2271b1' }) + t(312, 170, 'Accept UPI, cards, netbanking', { fill: '#50575e' }) + t(312, 190, 'and wallets in WooCommerce.', { fill: '#50575e' });
  s += btn(420, 230, 'Install Now', false, 110) + t(206, 300, 'By Team Razorpay', { fill: '#50575e' });
  s += panel(570, 110, 366, 230) + t(590, 150, 'Other payment plugins', { size: 15, fill: '#8c8f94' });
  return s + mark([420, 230, 110, 30], [560, 400, 'Install, then Activate']) + ring(m.pos['sub:Add New Plugin'], 6);
})());

images['add-razorpay-to-woocommerce-step-2'] = doc('Razorpay Dashboard API Keys page in Test Mode with Generate Key', 'Illustrated Razorpay Dashboard with Test Mode on, Account & Settings open and the API Keys section showing the Generate Key button highlighted.', (() => {
  const m = app({ brand: 'Razorpay Dashboard', brandFill: '#072654', nav: ['Home', 'Transactions', 'Payment Links', 'Reports', 'Customers', 'Account & Settings'], active: 'Account & Settings', onBg: '#e6f0ff', onFill: '#2b6be4' });
  let s = m.s + pill(640, 11, 'Test Mode', '#fff3d6', '#8a5a00', 110) + t(m.x, 100, 'Account & Settings', { size: 22, bold: true });
  s += card_(m.x, 124, 696, 150) + t(m.x + 24, 158, 'Website and app settings', { size: 15, bold: true }) + t(m.x + 24, 190, 'API keys', { fill: '#2b6be4', bold: true }) + t(m.x + 24, 216, 'Webhooks', { fill: '#2b6be4' }) + t(m.x + 24, 242, 'Payment methods', { fill: '#2b6be4' });
  s += card_(m.x, 292, 696, 180) + t(m.x + 24, 326, 'API Keys (Test Mode)', { size: 15, bold: true }) + t(m.x + 24, 352, 'Generate a Key ID and Key Secret. The secret is shown only once: copy it somewhere safe.', { fill: '#5c6370' });
  s += pill(m.x + 24, 380, 'Generate Key', '#2b6be4', '#fff', 130);
  return s + mark([m.x + 24, 380, 130, 30], [m.x + 300, 420, 'Test keys first, live keys later']) + ring([630, 7, 130, 38]) + ring(m.pos['Account & Settings']);
})());

images['add-razorpay-to-woocommerce-step-3'] = doc('WooCommerce Settings Payments Razorpay settings with Key ID and Key Secret', 'Illustrated WooCommerce > Settings > Payments > Razorpay screen with the enable checkbox ticked and the Key ID and Key Secret fields highlighted.', (() => {
  const m = wp(WPM, 'WooCommerce', ['Home', 'Orders', 'Customers', 'Reports', 'Settings', 'Status'], 'Settings');
  let s = m.s + tabs(190, 50, ['General', 'Products', 'Shipping', 'Payments', 'Accounts', 'Emails'], 'Payments') + h1(190, 116, 'Razorpay');
  s += panel(190, 132, 746, 360);
  s += t(214, 170, 'Enable/Disable', { bold: true }) + checkbox(400, 158, true) + t(424, 171, 'Enable this payment method');
  s += field(214, 200, 420, 'Title', 'Pay with UPI, cards, netbanking (Razorpay)');
  s += field(214, 268, 420, 'Key ID', 'rzp_test_xxxxxxxxxxxx', { mono: true });
  s += field(214, 336, 420, 'Key Secret', '••••••••••••••••', { mono: true });
  s += t(214, 418, 'Payment Action', { bold: true }) + t(400, 418, 'Authorize and Capture', { fill: '#50575e' });
  s += btn(214, 446, 'Save changes');
  return s + mark([214, 278, 420, 102], [660, 300, 'Paste keys from Razorpay']) + ring([394, 152, 28, 28], 6);
})());

// ---------- 2. Connect a domain to Shopify ----------
const SHOP = { brand: 'Shopify admin', barBg: '#1a1a1a', brandFill: '#fff', right: 'My Store', sideBg: '#ebebeb', onBg: '#fff', onFill: '#1a1a1a' };
images['connect-domain-to-shopify-step-1'] = doc('Shopify admin Settings Domains with Connect existing domain', 'Illustrated Shopify admin Settings > Domains page with the Connect existing domain option highlighted.', (() => {
  const m = app({ ...SHOP, nav: ['General', 'Plan', 'Billing', 'Users and permissions', 'Payments', 'Checkout', 'Shipping and delivery', 'Taxes and duties', 'Domains', 'Notifications'], active: 'Domains' });
  let s = m.s + t(m.x, 100, 'Domains', { size: 22, bold: true });
  s += card_(m.x, 124, 696, 120) + t(m.x + 24, 158, 'mystore.myshopify.com', { size: 15, bold: true }) + t(m.x + 24, 184, 'Your free Shopify address. It stays active after you connect a domain.', { fill: '#616161' });
  s += r(m.x + 420, 260, 140, 32, '#fff', { rx: 8, stroke: '#8a8a8a' }) + t(m.x + 490, 281, 'Buy new domain', { anchor: 'middle', bold: true }) + r(m.x + 570, 260, 126, 32, '#303030', { rx: 8 }) + t(m.x + 633, 281, 'Connect existing', { anchor: 'middle', fill: '#fff', bold: true });
  s += card_(m.x, 312, 696, 130) + t(m.x + 24, 346, 'Connect existing domain', { size: 15, bold: true }) + field(m.x + 24, 372, 480, 'Domain', 'yourdomain.com') + pill(m.x + 520, 382, 'Next', '#303030', '#fff', 80);
  return s + mark([m.x + 570, 260, 126, 32], [m.x + 40, 470, 'Type the domain you already own']) + ring(m.pos['Domains']);
})());

images['connect-domain-to-shopify-step-2'] = doc('Domain registrar DNS records pointing a domain to Shopify', 'Illustrated domain registrar DNS zone with an A record for @ pointing to 23.227.38.65 and a CNAME record for www pointing to shops.myshopify.com, both highlighted.', (() => {
  const m = app({ brand: 'Your domain registrar', nav: ['Domains', '  yourdomain.com', '  DNS / Nameservers', 'Email', 'Billing'], active: 'DNS / Nameservers' });
  let s = m.s + t(m.x, 100, 'DNS records: yourdomain.com', { size: 22, bold: true });
  s += card_(m.x, 124, 696, 330);
  const cols = [[24, 'Type'], [110, 'Name'], [230, 'Points to'], [520, 'TTL']];
  cols.forEach(([x, c]) => s += t(m.x + x, 156, c, { bold: true, fill: '#5c6370' }));
  const rows = [['A', '@', '23.227.38.65', '3600'], ['CNAME', 'www', 'shops.myshopify.com', '3600'], ['MX', '@', 'mail provider (leave as is)', '3600'], ['TXT', '@', 'v=spf1 ... (leave as is)', '3600']];
  rows.forEach((row, i) => { const y = 176 + i * 52; s += `<line x1="${m.x}" y1="${y}" x2="${m.x + 696}" y2="${y}" stroke="#e1e3e5"/>`; row.forEach((v, j) => s += t(m.x + cols[j][0], y + 32, v, { mono: j === 2, fill: i > 1 ? '#8c8f94' : '#1d2327', bold: j === 0 })); });
  return s + mark([m.x + 10, 182, 640, 96], [m.x + 160, 410, 'Only change the A and www records']);
})());

images['connect-domain-to-shopify-step-3'] = doc('Shopify Domains list showing the custom domain Connected and set as primary', 'Illustrated Shopify admin Settings > Domains with yourdomain.com marked Connected and Primary, and www redirecting to it, highlighted.', (() => {
  const m = app({ ...SHOP, nav: ['General', 'Plan', 'Billing', 'Users and permissions', 'Payments', 'Checkout', 'Shipping and delivery', 'Taxes and duties', 'Domains', 'Notifications'], active: 'Domains' });
  let s = m.s + t(m.x, 100, 'Domains', { size: 22, bold: true }) + card_(m.x, 124, 696, 250);
  const rows = [['yourdomain.com', 'Primary', 'Connected'], ['www.yourdomain.com', 'Redirects to primary', 'Connected'], ['mystore.myshopify.com', 'Redirects to primary', '']];
  rows.forEach(([d, role, st], i) => { const y = 140 + i * 74; s += t(m.x + 24, y + 30, d, { size: 15, bold: true }) + t(m.x + 24, y + 54, role, { fill: '#616161' }); if (st) s += pill(m.x + 560, y + 16, st, '#cdfee1', '#0c5132', 110); });
  s += t(m.x, 410, 'SSL certificate: issued automatically once DNS is correct (can take up to 48 hours).', { fill: '#616161' });
  return s + mark([m.x + 20, 150, 676, 60], [m.x + 120, 460, 'Primary + Connected = done']);
})());

// ---------- 3. WP Mail SMTP ----------
const SMTPM = ['Dashboard', 'Posts', 'Media', 'Pages', 'Plugins', 'Users', 'Tools', 'Settings', 'WP Mail SMTP'];
images['setup-smtp-wordpress-step-1'] = doc('WP Mail SMTP Settings choosing the Other SMTP mailer', 'Illustrated WordPress admin, WP Mail SMTP > Settings, with From Email filled in and the Other SMTP mailer tile selected and highlighted.', (() => {
  const m = wp(SMTPM, 'WP Mail SMTP', ['Settings', 'Email Log', 'Tools', 'About Us'], 'Settings');
  let s = m.s + h1(190, 74, 'WP Mail SMTP: Settings') + panel(190, 92, 746, 420);
  s += field(214, 124, 360, 'From Email', 'hello@yourdomain.com') + t(590, 156, 'Force From Email', { fill: '#50575e' }) + checkbox(720, 144, true);
  s += field(214, 192, 360, 'From Name', 'Your Business');
  s += t(214, 270, 'Mailer', { bold: true });
  const tiles = ['SendLayer', 'Brevo', 'Gmail', 'Mailgun', 'Postmark', 'Amazon SES', 'Microsoft 365', 'Other SMTP'];
  tiles.forEach((n, i) => { const x = 214 + (i % 4) * 176, y = 286 + Math.floor(i / 4) * 80; const on = n === 'Other SMTP'; s += r(x, y, 160, 64, on ? '#f0f6fc' : '#fff', { rx: 6, stroke: on ? '#2271b1' : '#dcdcde' }) + t(x + 80, y + 38, n, { anchor: 'middle', bold: on, fill: on ? '#2271b1' : '#1d2327' }); });
  return s + mark([742, 366, 160, 64], [520, 466, 'Use your email host\'s SMTP']) + ring(m.pos['sub:Settings'], 6);
})());

images['setup-smtp-wordpress-step-2'] = doc('WP Mail SMTP Other SMTP host, encryption, port and authentication fields', 'Illustrated WP Mail SMTP Other SMTP settings with SMTP Host, SSL encryption, port 465, authentication on and username and password fields highlighted.', (() => {
  const m = wp(SMTPM, 'WP Mail SMTP', ['Settings', 'Email Log', 'Tools', 'About Us'], 'Settings');
  let s = m.s + h1(190, 74, 'Other SMTP') + panel(190, 92, 746, 430);
  s += field(214, 122, 360, 'SMTP Host', 'smtp.yourmailhost.com', { mono: true });
  s += t(214, 196, 'Encryption', { bold: true }) + radio(214, 208, false) + t(238, 221, 'None') + radio(300, 208, true) + t(324, 221, 'SSL') + radio(380, 208, false) + t(404, 221, 'TLS');
  s += field(214, 250, 120, 'SMTP Port', '465', { mono: true });
  s += t(214, 324, 'Authentication', { bold: true }) + toggle(340, 310, true);
  s += field(214, 350, 360, 'SMTP Username', 'hello@yourdomain.com') + field(214, 418, 360, 'SMTP Password', '••••••••••••');
  s += btn(214, 480, 'Save Settings');
  return s + mark([206, 104, 376, 140], [620, 150, 'SSL + 465 or TLS + 587']) + mark([206, 344, 376, 112], [620, 400, 'Full email address + its password']);
})());

images['setup-smtp-wordpress-step-3'] = doc('WP Mail SMTP Tools Email Test tab with Send Email button', 'Illustrated WP Mail SMTP > Tools > Email Test with a Send To address and the Send Email button highlighted, plus a success message.', (() => {
  const m = wp(SMTPM, 'WP Mail SMTP', ['Settings', 'Email Log', 'Tools', 'About Us'], 'Tools');
  let s = m.s + h1(190, 74, 'Tools') + tabs(190, 92, ['Email Test', 'Scheduled Actions', 'Debug Events'], 'Email Test') + panel(190, 132, 746, 330);
  s += field(214, 164, 360, 'Send To', 'your-personal@gmail.com') + t(214, 248, 'HTML', { bold: true }) + toggle(300, 234, true);
  s += btn(214, 280, 'Send Email', true, 120);
  s += r(214, 340, 690, 60, '#edfaef', { rx: 4, stroke: '#00a32a' }) + t(234, 376, 'Success! Test HTML email was sent successfully. Check the inbox (and spam).', { fill: '#1d2327' });
  return s + mark([214, 280, 120, 30], [560, 270, 'Send to an outside inbox']) + ring(m.pos['sub:Tools'], 6);
})());

// ---------- 4. Cloudflare ----------
const CF = { brand: 'Cloudflare dashboard', brandFill: '#f38020', onBg: '#fdeedf', onFill: '#9a4a07' };
images['setup-cloudflare-wordpress-step-1'] = doc('Cloudflare dashboard adding a domain and choosing the Free plan', 'Illustrated Cloudflare dashboard with yourdomain.com entered in the add a domain field and the Free plan highlighted.', (() => {
  const m = app({ ...CF, nav: ['Account home', 'Domains', 'Analytics', 'Billing', 'Manage account'], active: 'Account home' });
  let s = m.s + t(m.x, 100, 'Add a domain', { size: 22, bold: true }) + field(m.x, 130, 420, 'Enter an existing domain', 'yourdomain.com') + t(m.x, 214, 'Quick scan for DNS records (recommended)', { fill: '#5c6370' }) + checkbox(m.x + 300, 202, true);
  const plans = [['Free', 'For personal and small sites'], ['Pro', 'Paid'], ['Business', 'Paid']];
  plans.forEach(([p, d], i) => { const x = m.x + i * 236; s += card_(x, 240, 220, 150) + t(x + 20, 276, p, { size: 17, bold: true }) + t(x + 20, 302, d, { fill: '#5c6370', size: 12 }); });
  s += pill(m.x, 420, 'Continue', '#f38020', '#fff', 110);
  return s + mark([m.x, 240, 220, 150], [m.x + 300, 440, 'Free is enough for most sites']);
})());

images['setup-cloudflare-wordpress-step-2'] = doc('Domain registrar Change nameservers to the two Cloudflare nameservers', 'Illustrated registrar Nameservers screen with Change nameservers selected and two Cloudflare nameservers entered, highlighted.', (() => {
  const m = app({ brand: 'Your domain registrar', nav: ['Domains', '  yourdomain.com', '  DNS / Nameservers', 'Email', 'Billing'], active: 'DNS / Nameservers' });
  let s = m.s + t(m.x, 100, 'Nameservers', { size: 22, bold: true }) + card_(m.x, 124, 696, 330);
  s += radio(m.x + 24, 150, false) + t(m.x + 50, 163, 'Use default nameservers') + radio(m.x + 24, 184, true) + t(m.x + 50, 197, 'Change nameservers', { bold: true });
  s += field(m.x + 24, 236, 420, 'Nameserver 1', 'name1.ns.cloudflare.com', { mono: true }) + field(m.x + 24, 304, 420, 'Nameserver 2', 'name2.ns.cloudflare.com', { mono: true });
  s += pill(m.x + 24, 390, 'Save', '#673de6', '#fff', 80);
  return s + mark([m.x + 24, 246, 420, 102], [m.x + 470, 200, 'Copy the exact pair Cloudflare gives']);
})());

images['setup-cloudflare-wordpress-step-3'] = doc('Cloudflare SSL/TLS Overview with Full (strict) encryption mode selected', 'Illustrated Cloudflare SSL/TLS > Overview with the Full (strict) encryption mode selected and highlighted.', (() => {
  const m = app({ ...CF, right: 'yourdomain.com', nav: ['Overview', 'DNS', 'SSL/TLS', '  Overview', '  Edge Certificates', 'Security', 'Speed', 'Caching', 'Rules'], active: 'Overview' });
  let s = m.s.replace(/<rect x="8" y="66" width="194" height="30" rx="6" fill="#fdeedf"\/>/, '');
  s += t(m.x, 100, 'SSL/TLS encryption', { size: 22, bold: true }) + card_(m.x, 124, 696, 330);
  const modes = [['Off (not secure)', false], ['Flexible', false], ['Full', false], ['Full (strict)', true]];
  modes.forEach(([n, on], i) => { const y = 150 + i * 56; s += radio(m.x + 24, y, on) + t(m.x + 52, y + 13, n, { bold: on }) + t(m.x + 240, y + 13, ['Visitor to Cloudflare not encrypted', 'Avoid on WordPress: redirect loops', 'Encrypts to origin, any certificate', 'Encrypts to origin, valid certificate'][i], { fill: '#5c6370' }); });
  return s + mark([m.x + 16, 314, 200, 34], [m.x + 300, 410, 'Full (strict) with a valid host SSL']) + ring(m.pos['Overview']);
})());

// ---------- 5. Shopify COD ----------
images['enable-cash-on-delivery-shopify-step-1'] = doc('Shopify Settings Payments Manual payment methods dropdown', 'Illustrated Shopify admin Settings > Payments with the Manual payment methods section open and Cash on Delivery (COD) highlighted in the list.', (() => {
  const m = app({ ...SHOP, nav: ['General', 'Plan', 'Billing', 'Users and permissions', 'Payments', 'Checkout', 'Shipping and delivery', 'Taxes and duties', 'Domains', 'Notifications'], active: 'Payments' });
  let s = m.s + t(m.x, 100, 'Payments', { size: 22, bold: true });
  s += card_(m.x, 124, 696, 90) + t(m.x + 24, 158, 'Payment providers', { size: 15, bold: true }) + t(m.x + 24, 184, 'Your online gateway (for example Razorpay, PayU or Cashfree) stays as it is.', { fill: '#616161' });
  s += card_(m.x, 230, 696, 230) + t(m.x + 24, 264, 'Manual payment methods', { size: 15, bold: true }) + r(m.x + 24, 280, 230, 32, '#fff', { rx: 8, stroke: '#8a8a8a' }) + t(m.x + 139, 301, '+ Manual payment method', { anchor: 'middle', bold: true });
  s += r(m.x + 24, 318, 300, 130, '#fff', { rx: 8, stroke: '#c9c9c9' });
  ['Create custom payment method', 'Bank Deposit', 'Money Order', 'Cash on Delivery (COD)'].forEach((n, i) => s += t(m.x + 40, 344 + i * 30, n, { bold: i === 3 }));
  return s + mark([m.x + 32, 418, 200, 30], [m.x + 380, 360, 'Pick Cash on Delivery (COD)']) + ring(m.pos['Payments']);
})());

images['enable-cash-on-delivery-shopify-step-2'] = doc('Shopify Cash on Delivery activation with additional details and payment instructions', 'Illustrated Shopify Cash on Delivery (COD) setup panel with Additional details and Payment instructions filled in and the Activate button highlighted.', (() => {
  const m = app({ ...SHOP, nav: ['General', 'Plan', 'Billing', 'Users and permissions', 'Payments', 'Checkout', 'Shipping and delivery', 'Taxes and duties', 'Domains', 'Notifications'], active: 'Payments' });
  let s = m.s + t(m.x, 100, 'Set up Cash on Delivery (COD)', { size: 22, bold: true }) + card_(m.x, 124, 696, 330);
  s += field(m.x + 24, 156, 640, 'Additional details (shown at checkout)', 'Pay in cash or UPI when your order arrives.');
  s += field(m.x + 24, 226, 640, 'Payment instructions (order status page)', 'Keep the exact amount ready; our courier partner collects it.');
  s += t(m.x + 24, 314, 'Shown to customers at checkout and on the order confirmation.', { fill: '#616161' });
  s += pill(m.x + 576, 400, 'Activate', '#303030', '#fff', 96);
  return s + mark([m.x + 576, 400, 96, 30], [m.x + 140, 400, 'Activate COD']) + ring([m.x + 24, 166, 640, 34], 6);
})());

images['enable-cash-on-delivery-shopify-step-3'] = doc('Shopify checkout payment step showing Cash on Delivery (COD) option', 'Illustrated Shopify checkout payment section with the online payment option and Cash on Delivery (COD) radio button highlighted.', (() => {
  let s = r(0, 0, W, 60, '#fff', { stroke: '#e1e3e5' }) + t(40, 38, 'My Store', { size: 20, bold: true }) + r(0, 60, 560, H - 60, '#fff') + r(560, 60, 400, H - 60, '#f5f5f5', { stroke: '#e1e3e5' });
  s += t(40, 104, 'Payment', { size: 20, bold: true }) + t(40, 128, 'All transactions are secure and encrypted.', { fill: '#616161' });
  s += r(40, 146, 480, 60, '#fff', { rx: 6, stroke: '#d9d9d9' }) + radio(58, 168, false) + t(86, 181, 'Razorpay Secure (UPI, Cards, Wallets, NetBanking)');
  s += r(40, 206, 480, 110, '#f0f5ff', { rx: 6, stroke: '#1773b0' }) + radio(58, 228, true) + t(86, 241, 'Cash on Delivery (COD)', { bold: true }) + t(86, 272, 'Pay in cash or UPI when your order arrives.', { fill: '#616161' });
  s += r(40, 350, 480, 48, '#1773b0', { rx: 6 }) + t(280, 380, 'Complete order', { anchor: 'middle', fill: '#fff', bold: true });
  s += t(590, 110, 'Order summary', { size: 16, bold: true }) + t(590, 150, 'Product x 1', { fill: '#616161' }) + t(920, 150, '₹ —', { anchor: 'end' }) + t(590, 180, 'Shipping', { fill: '#616161' }) + t(920, 180, '₹ —', { anchor: 'end' });
  return s + mark([40, 206, 480, 110], [600, 300, 'Place a test COD order']);
})());

// ---------- 6. 301 redirects with Redirection ----------
const TOOLM = ['Dashboard', 'Posts', 'Media', 'Pages', 'Comments', 'Appearance', 'Plugins', 'Users', 'Tools', 'Settings'];
images['setup-301-redirects-wordpress-step-1'] = doc('Redirection plugin Add new redirection form with Source and Target URL', 'Illustrated WordPress Tools > Redirection screen with the Add new redirection form, a source URL, a target URL and the Add Redirect button highlighted.', (() => {
  const m = wp(TOOLM, 'Tools', ['Available Tools', 'Import', 'Export', 'Site Health', 'Redirection'], 'Redirection');
  let s = m.s + h1(190, 74, 'Redirection') + sublinks(190, 104, ['Redirects', 'Groups', 'Site', '404s', 'Log', 'Import/Export', 'Options'], 'Redirects');
  s += panel(190, 122, 746, 260) + t(214, 156, 'Add new redirection', { size: 16, bold: true });
  s += field(214, 180, 520, 'Source URL', '/old-services-page/', { mono: true }) + field(214, 248, 520, 'Target URL', 'https://yourdomain.com/services/', { mono: true });
  s += t(214, 324, 'Group', { bold: true }) + r(270, 308, 200, 30, '#fff', { rx: 3, stroke: '#8c8f94' }) + t(282, 328, 'Redirections') + btn(490, 308, 'Add Redirect', true, 120);
  s += panel(190, 398, 746, 120) + t(214, 430, 'Source', { bold: true, fill: '#50575e' }) + t(560, 430, 'Code', { bold: true, fill: '#50575e' }) + t(640, 430, 'Hits', { bold: true, fill: '#50575e' }) + t(214, 470, '/old-services-page/  →  /services/', { mono: true }) + t(560, 470, '301') + t(640, 470, '0');
  return s + mark([214, 190, 520, 102], [760, 220, 'Old path → new URL']) + ring([490, 308, 120, 30], 6) + ring(m.pos['sub:Redirection'], 6);
})());

images['setup-301-redirects-wordpress-step-2'] = doc('Redirection plugin 404s tab with Add Redirect on a broken URL', 'Illustrated Tools > Redirection > 404s tab listing missing URLs with hit counts and the Add Redirect action on the top row highlighted.', (() => {
  const m = wp(TOOLM, 'Tools', ['Available Tools', 'Import', 'Export', 'Site Health', 'Redirection'], 'Redirection');
  let s = m.s + h1(190, 74, 'Redirection') + sublinks(190, 104, ['Redirects', 'Groups', 'Site', '404s', 'Log', 'Import/Export', 'Options'], '404s') + panel(190, 122, 746, 330);
  s += t(214, 154, 'URL', { bold: true, fill: '#50575e' }) + t(700, 154, 'Count', { bold: true, fill: '#50575e' });
  const rows = [['/2024/05/12/website-cost/', '41'], ['/services-2/', '17'], ['/wp-login.php.bak', '3']];
  rows.forEach(([u, c], i) => { const y = 170 + i * 70; s += `<line x1="190" y1="${y}" x2="936" y2="${y}" stroke="#dcdcde"/>` + t(214, y + 30, u, { mono: true }) + t(700, y + 30, c) + (i < 2 ? t(214, y + 54, 'Add Redirect | Delete | Ignore', { fill: '#2271b1', size: 12 }) : t(214, y + 54, 'Ignore junk and bot probes', { fill: '#8c8f94', size: 12 })); });
  return s + mark([210, 212, 86, 20], [520, 470, 'Redirect real pages only']);
})());

images['setup-301-redirects-wordpress-step-3'] = doc('Redirection plugin regular expression redirect for date-based URLs', 'Illustrated Redirection add form with a regex source for old date-based post URLs, the Regex option ticked and a target using $1, highlighted.', (() => {
  const m = wp(TOOLM, 'Tools', ['Available Tools', 'Import', 'Export', 'Site Health', 'Redirection'], 'Redirection');
  let s = m.s + h1(190, 74, 'Redirection') + panel(190, 96, 746, 360) + t(214, 130, 'Add new redirection', { size: 16, bold: true });
  s += field(214, 156, 520, 'Source URL', '^/\\d{4}/\\d{2}/\\d{2}/(.*)$', { mono: true }) + t(750, 188, 'Regex', { bold: true }) + checkbox(806, 176, true);
  s += field(214, 224, 520, 'Target URL', '/$1', { mono: true });
  s += t(214, 304, 'HTTP code', { bold: true }) + r(300, 288, 260, 30, '#fff', { rx: 3, stroke: '#8c8f94' }) + t(312, 308, '301 - Moved Permanently');
  s += btn(214, 340, 'Add Redirect', true, 120) + t(214, 410, 'Example: /2024/05/12/website-cost/ → /website-cost/', { mono: true, fill: '#50575e' });
  return s + mark([744, 170, 88, 28], [620, 250, 'Tick Regex for patterns']) + ring([294, 282, 272, 42], 6);
})());

// ---------- 7. Reset WordPress password via phpMyAdmin ----------
images['reset-wordpress-password-phpmyadmin-step-1'] = doc('Hostinger hPanel Databases phpMyAdmin with Enter phpMyAdmin button', 'Illustrated Hostinger hPanel Databases > phpMyAdmin page listing the WordPress database with the Enter phpMyAdmin button highlighted.', (() => {
  const m = hpanel('phpMyAdmin', ['Dashboard', 'Websites', 'WordPress', 'Files', 'Databases', '  Management', '  phpMyAdmin', '  Remote MySQL', 'Advanced', 'Domains']);
  let s = m.s + t(240, 100, 'phpMyAdmin', { size: 22, bold: true, fill: '#2f1c6a' }) + r(240, 124, 696, 200, '#fff', { rx: 8, stroke: '#e3e3e8' });
  s += t(264, 158, 'Database', { bold: true, fill: '#6d7081' }) + t(560, 158, 'User', { bold: true, fill: '#6d7081' });
  s += t(264, 200, 'u123456789_wp01', { mono: true }) + t(560, 200, 'u123456789_wpuser', { mono: true }) + r(780, 180, 140, 34, '#673de6', { rx: 6 }) + t(850, 202, 'Enter phpMyAdmin', { fill: '#fff', anchor: 'middle', bold: true, size: 12 });
  s += t(264, 280, 'Not sure which database? Check DB_NAME in wp-config.php (File Manager).', { fill: '#6d7081' });
  return s + mark([780, 180, 140, 34], [500, 380, 'Open the database in DB_NAME']) + ring(m.pos['phpMyAdmin']);
})());

images['reset-wordpress-password-phpmyadmin-step-2'] = doc('phpMyAdmin wp_users table with Edit link on the admin user', 'Illustrated phpMyAdmin with the wp_users table selected in the left tree and the Edit link on the admin user row highlighted.', (() => {
  let s = r(0, 0, W, 40, '#f3f3f3', { stroke: '#d0d0d0' }) + t(16, 26, 'phpMyAdmin', { size: 16, bold: true, fill: '#6c78af' }) + r(0, 40, 220, H - 40, '#fff', { stroke: '#d0d0d0' });
  const tree = ['u123456789_wp01', '  wp_options', '  wp_postmeta', '  wp_posts', '  wp_usermeta', '  wp_users'];
  tree.forEach((n, i) => { const on = n.trim() === 'wp_users'; if (on) s += r(6, 54 + i * 28, 208, 26, '#e7ecf7'); s += t(n.startsWith(' ') ? 34 : 14, 72 + i * 28, n.trim(), { bold: on || !n.startsWith(' '), mono: true, size: 12 }); });
  s += sublinks(240, 66, ['Browse', 'Structure', 'SQL', 'Search', 'Insert', 'Export'], 'Browse') + r(240, 84, 700, 200, '#fff', { stroke: '#d0d0d0' });
  ['', 'ID', 'user_login', 'user_pass', 'user_email'].forEach((c, i) => s += t(250 + [0, 110, 160, 290, 520][i], 108, c, { bold: true, size: 12 }));
  s += `<line x1="240" y1="118" x2="940" y2="118" stroke="#d0d0d0"/>` + t(250, 146, 'Edit  Copy  Delete', { fill: '#235a81', size: 12 }) + t(360, 146, '1', { size: 12 }) + t(410, 146, 'admin', { mono: true, size: 12 }) + t(540, 146, '$wp$2y$10$Qe…', { mono: true, size: 12 }) + t(770, 146, 'you@yourdomain.com', { size: 12 });
  return s + mark([248, 132, 30, 20], [380, 330, 'Edit your own admin row']) + ring([6, 194, 208, 26], 4);
})());

images['reset-wordpress-password-phpmyadmin-step-3'] = doc('phpMyAdmin edit row setting user_pass with the MD5 function', 'Illustrated phpMyAdmin row editor with the MD5 function chosen for user_pass, a new password typed in the value box and the Go button highlighted.', (() => {
  let s = r(0, 0, W, 40, '#f3f3f3', { stroke: '#d0d0d0' }) + t(16, 26, 'phpMyAdmin', { size: 16, bold: true, fill: '#6c78af' }) + r(0, 40, 220, H - 40, '#fff', { stroke: '#d0d0d0' }) + t(14, 72, 'wp_users', { mono: true, bold: true, size: 12 });
  s += r(240, 60, 700, 340, '#fff', { stroke: '#d0d0d0' });
  ['Column', 'Type', 'Function', 'Value'].forEach((c, i) => s += t(256 + [0, 150, 280, 420][i], 86, c, { bold: true, size: 12 }));
  const rows = [['ID', 'bigint', '', '1'], ['user_login', 'varchar(60)', '', 'admin'], ['user_pass', 'varchar(255)', 'MD5', 'NewStrongPassword!2026'], ['user_email', 'varchar(100)', '', 'you@yourdomain.com']];
  rows.forEach((row, i) => { const y = 100 + i * 56; s += `<line x1="240" y1="${y}" x2="940" y2="${y}" stroke="#e5e5e5"/>` + t(256, y + 32, row[0], { mono: true, size: 12, bold: row[0] === 'user_pass' }) + t(406, y + 32, row[1], { size: 12, fill: '#666' }) + r(536, y + 14, 110, 26, '#fff', { stroke: '#aaa' }) + t(546, y + 32, row[2], { size: 12 }) + r(676, y + 14, 250, 26, '#fff', { stroke: '#aaa' }) + t(686, y + 32, row[3], { size: 12, mono: true }); });
  s += r(860, 420, 70, 30, '#f3f3f3', { rx: 3, stroke: '#aaa' }) + t(895, 440, 'Go', { anchor: 'middle', bold: true });
  return s + mark([536, 226, 390, 26], [300, 470, 'Function MD5 + new password']) + ring([860, 420, 70, 30], 6);
})());

// ---------- 8. Change WordPress permalinks ----------
images['change-wordpress-permalinks-step-1'] = doc('WordPress Settings Permalinks with Post name selected', 'Illustrated WordPress admin, Settings > Permalinks, with the Post name structure selected and highlighted.', (() => {
  const m = wp(TOOLM, 'Settings', ['General', 'Writing', 'Reading', 'Discussion', 'Media', 'Permalinks', 'Privacy'], 'Permalinks');
  let s = m.s + h1(190, 74, 'Permalink Settings') + panel(190, 92, 746, 370) + t(214, 124, 'Permalink structure', { size: 15, bold: true });
  const opts = [['Plain', '/?p=123'], ['Day and name', '/2026/11/10/sample-post/'], ['Month and name', '/2026/11/sample-post/'], ['Numeric', '/archives/123'], ['Post name', '/sample-post/'], ['Custom Structure', '/%postname%/']];
  opts.forEach(([n, ex], i) => { const y = 144 + i * 44; s += radio(214, y, n === 'Post name') + t(242, y + 13, n, { bold: n === 'Post name' }) + t(440, y + 13, 'https://yourdomain.com' + ex, { mono: true, size: 12, fill: '#50575e' }); });
  s += btn(214, 420, 'Save Changes');
  return s + mark([206, 314, 520, 30], [620, 410, 'Post name: short, readable URLs']) + ring(m.pos['sub:Permalinks'], 6);
})());

images['change-wordpress-permalinks-step-2'] = doc('WordPress post editor URL slug field in the post settings sidebar', 'Illustrated WordPress block editor with the post settings sidebar open and the URL slug field highlighted.', (() => {
  let s = r(0, 0, W, 56, '#fff', { stroke: '#dcdcde' }) + r(0, 0, 56, 56, '#1d2327') + t(28, 35, 'W', { fill: '#fff', anchor: 'middle', bold: true, size: 18 }) + btn(820, 13, 'Update', true, 100);
  s += r(0, 56, 640, H - 56, '#fff') + t(80, 140, 'How Much Does a Website Cost?', { size: 28, bold: true }) + t(80, 190, 'Your post content…', { fill: '#8c8f94', size: 16 });
  s += r(640, 56, 320, H - 56, '#fff', { stroke: '#dcdcde' }) + sublinks(660, 88, ['Post', 'Block'], 'Post');
  s += t(660, 130, 'Status', { fill: '#50575e' }) + t(760, 130, 'Published') + t(660, 162, 'Publish', { fill: '#50575e' }) + t(760, 162, 'Immediately') + t(660, 194, 'Slug', { fill: '#50575e' }) + t(760, 194, 'website-cost', { fill: '#2271b1' });
  s += r(660, 214, 280, 130, '#fff', { rx: 4, stroke: '#1d2327' }) + t(676, 240, 'Slug', { bold: true }) + r(676, 252, 248, 32, '#fff', { rx: 2, stroke: '#8c8f94' }) + t(686, 273, 'website-cost', { mono: true }) + t(676, 310, 'yourdomain.com/website-cost/', { size: 12, fill: '#50575e' });
  return s + mark([676, 252, 248, 32], [250, 380, 'Short slug, keywords first']);
})());

images['change-wordpress-permalinks-step-3'] = doc('Google Search Console URL Inspection testing the new permalink', 'Illustrated Google Search Console URL Inspection for the new post-name URL, showing URL is on Google and the Request indexing link highlighted.', (() => {
  let s = r(0, 0, W, 56, '#fff', { stroke: '#dadce0' }) + t(24, 35, 'Google Search Console', { size: 17, fill: '#5f6368' }) + r(300, 14, 520, 30, '#f1f3f4', { rx: 6 }) + t(316, 34, 'https://yourdomain.com/website-cost/', { fill: '#3c4043' });
  s += r(0, 56, 230, H - 56, '#fff', { stroke: '#dadce0' });
  ['Overview', 'Performance', 'URL inspection', 'Pages', 'Sitemaps'].forEach((n, i) => { const on = n === 'URL inspection'; if (on) s += r(8, 74 + i * 34, 214, 30, '#e8f0fe', { rx: 15 }); s += t(28, 94 + i * 34, n, { fill: on ? '#1a73e8' : '#3c4043', bold: on }); });
  s += t(260, 100, 'URL Inspection', { size: 22 }) + r(260, 124, 676, 110, '#e6f4ea', { rx: 8 }) + t(284, 160, 'URL is not on Google yet', { size: 16, bold: true, fill: '#137333' }) + t(284, 188, 'Test the live URL, then request indexing.', { fill: '#3c4043' });
  s += r(760, 250, 176, 34, '#fff', { rx: 4, stroke: '#dadce0' }) + t(848, 272, 'TEST LIVE URL', { anchor: 'middle', fill: '#1a73e8', bold: true }) + t(284, 272, 'REQUEST INDEXING', { fill: '#1a73e8', bold: true });
  return s + mark([280, 256, 140, 22], [480, 400, 'Do this for your key pages']);
})());

for (const [name, svg] of Object.entries(images)) {
  fs.writeFileSync(path.join(OUT, name + '.svg'), svg);
  console.log(name + '.svg', svg.length, 'bytes');
}
module.exports = Object.keys(images);
