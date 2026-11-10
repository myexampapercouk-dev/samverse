// Annotated step-by-step illustrations for blog posts (hand-built SVG mock-ups, not screenshots).
// Run: node tools/step-images.js  -> writes assets/blog/<slug>-step-N.svg
const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, '..', 'assets', 'blog');
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

const images = {};

// 1. why-is-my-wordpress-site-slow
images['why-is-my-wordpress-site-slow-step-1'] = doc('Chrome DevTools Network tab Timing showing Waiting for server response (TTFB)', 'Illustrated DevTools Network panel with the first document request selected and the Timing tab open; the Waiting for server response row is highlighted.', (() => {
  let s = r(0, 0, W, 40, '#dee1e6') + r(12, 8, 600, 24, '#fff', { rx: 12 }) + t(28, 25, 'https://yourdomain.com/', { fill: '#5f6368' });
  s += r(0, 40, W, 120, '#fff') + t(24, 90, 'Your page (loading)', { size: 18, fill: '#9aa0a6' });
  s += r(0, 160, W, 32, '#f1f3f4') + sublinks(16, 181, ['Elements', 'Console', 'Sources', 'Network', 'Performance'], 'Network');
  s += r(0, 192, 330, H - 192, '#fff', { stroke: '#dadce0' }) + t(14, 214, 'Name', { bold: true, fill: '#5f6368' });
  const rows = ['yourdomain.com', 'style.min.css', 'jquery.min.js', 'hero.webp', 'font.woff2', 'analytics.js'];
  rows.forEach((n, i) => { const y = 224 + i * 28; if (!i) s += r(0, y, 330, 28, '#d2e3fc'); s += t(14, y + 19, n, { fill: '#202124' }); });
  s += r(330, 192, W - 330, H - 192, '#fff', { stroke: '#dadce0' }) + sublinks(346, 214, ['Headers', 'Preview', 'Response', 'Initiator', 'Timing'], 'Timing');
  const tl = [['Resource Scheduling', null], ['Queueing', '1.2 ms'], ['Connection Start', null], ['Stalled', '2.0 ms'], ['DNS Lookup', '14 ms'], ['Initial connection', '38 ms'], ['SSL', '22 ms'], ['Request/Response', null], ['Request sent', '0.3 ms'], ['Waiting for server response', '1.84 s'], ['Content Download', '45 ms']];
  tl.forEach(([k, v], i) => { const y = 248 + i * 24; if (!v) s += t(346, y, k, { bold: true, fill: '#5f6368', size: 12 }); else { s += t(362, y, k, { size: 12 }) + r(590, y - 11, k.startsWith('Waiting') ? 220 : 10, 12, k.startsWith('Waiting') ? '#34a853' : '#9aa0a6') + t(W - 30, y, v, { size: 12, anchor: 'end' }); } });
  return s + mark([356, 450, 584, 22], [520, 290, 'Long wait = slow server (TTFB)']);
})());

images['why-is-my-wordpress-site-slow-step-2'] = doc('LiteSpeed Cache plugin Cache settings with Enable Cache turned on in WordPress', 'Illustrated WordPress admin, LiteSpeed Cache > Cache screen, with the Enable Cache setting switched on and highlighted.', (() => {
  const m = wp(['Dashboard', 'Posts', 'Media', 'Pages', 'Plugins', 'Settings', 'LiteSpeed Cache'], 'LiteSpeed Cache', ['Dashboard', 'Presets', 'General', 'Cache', 'CDN', 'Image Optimization', 'Page Optimization', 'Database', 'Toolbox'], 'Cache');
  let s = m.s + h1(190, 74, 'LiteSpeed Cache Settings') + tabs(190, 92, ['Cache', 'TTL', 'Purge', 'Excludes', 'ESI', 'Object', 'Browser', 'Advanced'], 'Cache');
  s += panel(190, 136, 746, 380) + t(214, 170, 'Cache Control Settings', { size: 16, bold: true });
  const rows = [['Enable Cache', true], ['Cache Logged-in Users', false], ['Cache Commenters', true], ['Cache REST API', true], ['Cache Login Page', true], ['Cache Mobile', false]];
  rows.forEach(([k, on], i) => { const y = 200 + i * 48; s += t(214, y + 15, k, { bold: true }) + toggle(440, y, on) + t(492, y + 15, on ? 'ON' : 'OFF', { fill: '#50575e' }); });
  s += btn(214, 474, 'Save Changes');
  return s + mark([206, 194, 320, 32], [600, 200, 'Turn page cache ON']) + mark(m.pos['sub:Cache'], [200, 470, 'LiteSpeed Cache > Cache']).replace(/<rect x="[^"]+" y="[^"]+" width="[^"]+" height="[^"]+" rx="17"[^>]*\/><text[^>]*>[^<]*<\/text>$/, '');
})());

// hPanel style shell
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

images['hostinger-website-slow-fix-step-1'] = doc('Hostinger hPanel Cache Manager with automatic cache on and Purge all', 'Illustrated Hostinger hPanel Advanced > Cache Manager screen with the automatic cache switch on and the Purge all button highlighted.', (() => {
  const m = hpanel('Cache Manager', HP);
  let s = m.s + t(240, 100, 'Cache Manager', { size: 22, bold: true, fill: '#2f1c6a' });
  s += r(240, 124, 696, 120, '#fff', { rx: 8, stroke: '#e3e3e8' }) + t(264, 160, 'Automatic cache', { size: 15, bold: true }) + t(264, 186, 'Serves stored copies of pages so the server does less work for each visit.', { fill: '#6d7081' }) + toggle(860, 148, true);
  s += r(240, 262, 696, 120, '#fff', { rx: 8, stroke: '#e3e3e8' }) + t(264, 298, 'Purge cache', { size: 15, bold: true }) + t(264, 324, 'Clear stored pages after changing the design or settings.', { fill: '#6d7081' }) + r(810, 296, 102, 36, '#673de6', { rx: 6 }) + t(861, 319, 'Purge all', { fill: '#fff', anchor: 'middle', bold: true });
  return s + mark([852, 142, 56, 32], [560, 410, 'Cache on, purge after changes']) + `<rect x="802" y="290" width="118" height="48" rx="8" fill="none" stroke="${RED}" stroke-width="3"/>` + `<rect x="2" y="${m.pos['Cache Manager'][1] - 4}" width="206" height="38" rx="8" fill="none" stroke="${RED}" stroke-width="3"/>`;
})());

images['hostinger-website-slow-fix-step-2'] = doc('Hostinger hPanel Advanced PHP Configuration PHP version selector', 'Illustrated Hostinger hPanel Advanced > PHP Configuration screen on the PHP version tab, with a current PHP 8 version selected and highlighted.', (() => {
  const m = hpanel('PHP Configuration', HP);
  let s = m.s + t(240, 100, 'PHP Configuration', { size: 22, bold: true, fill: '#2f1c6a' }) + sublinks(240, 140, ['PHP version', 'PHP extensions', 'PHP options'], 'PHP version');
  s += `<line x1="240" y1="152" x2="936" y2="152" stroke="#e3e3e8"/>`;
  s += r(240, 170, 696, 290, '#fff', { rx: 8, stroke: '#e3e3e8' }) + t(264, 204, 'Current PHP version: 7.4', { size: 15, bold: true }) + t(264, 228, 'Choose a newer version, then test the site.', { fill: '#6d7081' });
  ['8.3', '8.2', '8.1', '8.0', '7.4'].forEach((v, i) => { const y = 248 + i * 36; s += radio(264, y, i === 1) + t(292, y + 13, 'PHP ' + v, { bold: i === 1 }); });
  s += r(810, 410, 102, 36, '#673de6', { rx: 6 }) + t(861, 433, 'Update', { fill: '#fff', anchor: 'middle', bold: true });
  return s + mark([258, 280, 120, 26], [520, 300, 'Pick a current PHP 8 version']) + `<rect x="2" y="${m.pos['PHP Configuration'][1] - 4}" width="206" height="38" rx="8" fill="none" stroke="${RED}" stroke-width="3"/>`;
})());

// signs-wordpress-site-hacked
images['signs-wordpress-site-hacked-step-1'] = doc('Google Search Console Security issues report showing a hacked content warning', 'Illustrated Google Search Console with Security issues selected in the menu and a detected hacked content issue highlighted.', (() => {
  let s = r(0, 0, W, 56, '#fff', { stroke: '#dadce0' }) + t(24, 35, 'Google Search Console', { size: 17, fill: '#5f6368' }) + r(300, 14, 380, 30, '#f1f3f4', { rx: 6 }) + t(316, 34, 'Inspect any URL in "yourdomain.com"', { fill: '#5f6368' });
  s += r(0, 56, 230, H - 56, '#fff', { stroke: '#dadce0' });
  const nav = ['Overview', 'Performance', 'URL inspection', '#Indexing', 'Pages', 'Sitemaps', 'Removals', '#Security & Manual Actions', 'Manual actions', 'Security issues'];
  let y = 74, secPos;
  for (const n of nav) { if (n[0] === '#') { s += t(20, y + 16, n.slice(1), { size: 12, bold: true, fill: '#5f6368' }); } else { const on = n === 'Security issues'; if (on) { s += r(8, y, 214, 30, '#e8f0fe', { rx: 15 }); secPos = [8, y, 214, 30]; } s += t(28, y + 20, n, { fill: on ? '#1a73e8' : '#3c4043', bold: on }); } y += 34; }
  s += t(260, 100, 'Security issues', { size: 22 });
  s += r(260, 124, 676, 110, '#fce8e6', { rx: 8 }) + t(284, 158, '1 issue detected', { size: 16, bold: true, fill: '#c5221f' }) + t(284, 184, 'Google found content on your site that may harm visitors.', { fill: '#3c4043' }) + t(284, 208, 'Pages on your site may show a warning in search results.', { fill: '#3c4043' });
  s += r(260, 252, 676, 150, '#fff', { rx: 8, stroke: '#dadce0' }) + t(284, 284, 'Hacked: Content injection', { size: 15, bold: true }) + t(284, 310, 'Sample URLs', { fill: '#5f6368', bold: true });
  ['https://yourdomain.com/?p=cheap-pills-8841', 'https://yourdomain.com/jp/brand-bags-sale/'].forEach((u, i) => s += t(284, 336 + i * 24, u, { fill: '#1a73e8' }));
  s += btn(284, 412, 'REQUEST REVIEW', false, 140);
  return s + mark([268, 266, 260, 28], [600, 450, 'Any issue here = site is hacked']) + `<rect x="${secPos[0] - 4}" y="${secPos[1] - 4}" width="${secPos[2] + 8}" height="38" rx="19" fill="none" stroke="${RED}" stroke-width="3"/>`;
})());

images['signs-wordpress-site-hacked-step-2'] = doc('WordPress Users All Users filtered by Administrator showing an unknown admin account', 'Illustrated WordPress Users > All Users screen filtered to Administrator, with an unknown administrator account highlighted.', (() => {
  const m = wp(WP_MENU, 'Users', ['All Users', 'Add New User', 'Profile'], 'All Users');
  let s = m.s + h1(190, 74, 'Users') + btn(260, 54, 'Add New User', false) + sublinks(190, 112, ['All (4)', 'Administrator (3)', 'Editor (1)'], 'Administrator (3)');
  s += panel(190, 128, 746, 300) + r(190, 128, 746, 38, '#fff', { stroke: '#c3c4c7' });
  const cols = [['Username', 240], ['Name', 440], ['Email', 560], ['Role', 790], ['Posts', 880]];
  cols.forEach(([c, x]) => s += t(x, 152, c, { bold: true }));
  const rows = [['yourname', 'Site Owner', 'owner@yourdomain.com', 'Administrator', '24'], ['agency-dev', 'Web Agency', 'dev@agency.example', 'Administrator', '3'], ['wp_sysadmin2', '', 'x7k2q@mailinator.example', 'Administrator', '0']];
  rows.forEach((row, i) => { const y = 166 + i * 64; s += r(191, y, 744, 64, i % 2 ? '#fff' : '#f6f7f7') + checkbox(206, y + 22, false) + r(240, y + 14, 32, 32, '#dcdcde', { rx: 2 }); row.forEach((v, j) => s += t(j ? cols[j][1] : 282, y + 35, v, { fill: j === 0 ? '#2271b1' : '#3c434a', bold: j === 0 })); });
  return s + mark([196, 298, 734, 60], [380, 460, 'Unknown Administrator? Remove it']);
})());

// woocommerce-speed-optimization
const WC_MENU = ['Dashboard', 'Posts', 'Media', 'Pages', 'WooCommerce', 'Products', 'Plugins', 'Users', 'Tools', 'Settings'];
const WC_TABS = ['General', 'Products', 'Tax', 'Shipping', 'Payments', 'Accounts & Privacy', 'Emails', 'Advanced'];
images['woocommerce-speed-optimization-step-1'] = doc('WooCommerce Settings Advanced Features High-performance order storage HPOS enabled', 'Illustrated WooCommerce > Settings > Advanced > Features screen with High-performance order storage selected and highlighted.', (() => {
  const m = wp(WC_MENU, 'WooCommerce', ['Home', 'Orders', 'Customers', 'Reports', 'Settings', 'Status', 'Extensions'], 'Settings');
  let s = m.s + tabs(190, 50, WC_TABS, 'Advanced') + sublinks(190, 106, ['Page setup', 'REST API', 'Webhooks', 'Legacy API', 'Features'], 'Features');
  s += t(190, 146, 'Features', { size: 18, bold: true }) + t(190, 170, 'Start using new features that are being progressively rolled out to improve the store management experience.', { fill: '#50575e', size: 12.5 });
  s += t(190, 220, 'Order data storage', { bold: true }) + radio(400, 207, true) + t(426, 220, 'High-performance order storage (recommended)') + radio(400, 239, false) + t(426, 252, 'WordPress posts storage (legacy)');
  s += checkbox(400, 279, false) + t(426, 292, 'Enable compatibility mode (Synchronize orders between storage options)', { size: 12.5 });
  s += t(190, 350, 'Experimental features', { bold: true }) + checkbox(400, 337, false) + t(426, 350, 'Product block editor', { size: 12.5 });
  s += btn(190, 400, 'Save changes');
  return s + mark([394, 201, 380, 28], [560, 440, 'Turn on HPOS (after a backup)']);
})());

images['woocommerce-speed-optimization-step-2'] = doc('WooCommerce Tools Scheduled Actions Pending and Past-due actions in Action Scheduler', 'Illustrated WordPress Tools > Scheduled Actions screen with the Pending and Past-due filters highlighted to spot an Action Scheduler backlog.', (() => {
  const m = wp(WC_MENU, 'Tools', ['Available Tools', 'Import', 'Export', 'Site Health', 'Scheduled Actions', 'Theme File Editor'], 'Scheduled Actions');
  let s = m.s + h1(190, 74, 'Scheduled Actions') + sublinks(190, 112, ['All', 'Pending', 'Complete', 'Failed', 'Canceled', 'Past-due'], 'Pending');
  s += panel(190, 128, 746, 330) + r(190, 128, 746, 38, '#fff', { stroke: '#c3c4c7' });
  const cols = [['Hook', 206], ['Status', 520], ['Group', 610], ['Scheduled Date', 760]];
  cols.forEach(([c, x]) => s += t(x, 152, c, { bold: true }));
  const rows = [['woocommerce_cleanup_draft_orders', 'Pending', 'woocommerce'], ['wc-admin_import_orders', 'Pending', 'wc-admin-data'], ['woocommerce_run_on_woocommerce_admin_updated', 'Pending', 'woocommerce-remote'], ['wc-admin_import_customers', 'Pending', 'wc-admin-data'], ['woocommerce_cleanup_sessions', 'Pending', 'woocommerce']];
  rows.forEach((row, i) => { const y = 166 + i * 54; s += r(191, y, 744, 54, i % 2 ? '#fff' : '#f6f7f7') + t(206, y + 32, row[0], { fill: '#2271b1', size: 12.5 }) + t(520, y + 32, row[1]) + t(610, y + 32, row[2], { size: 12.5 }) + t(760, y + 32, 'Overdue', { fill: RED }); });
  return s + mark([254, 98, 290, 20], [580, 50, 'Check Pending, Failed and Past-due']);
})());

// technical-seo-audit-wordpress
images['technical-seo-audit-wordpress-step-1'] = doc('Google Search Console Pages report Why pages aren\'t indexed table', 'Illustrated Google Search Console Page indexing report with the Why pages aren\'t indexed table highlighted, listing reasons such as Excluded by noindex tag.', (() => {
  let s = r(0, 0, W, 56, '#fff', { stroke: '#dadce0' }) + t(24, 35, 'Google Search Console', { size: 17, fill: '#5f6368' });
  s += r(0, 56, 230, H - 56, '#fff', { stroke: '#dadce0' });
  ['Overview', 'Performance', 'URL inspection', '#Indexing', 'Pages', 'Sitemaps', 'Removals', '#Experience', 'Core Web Vitals', 'HTTPS'].forEach((n, i) => { const y = 74 + i * 34; if (n[0] === '#') s += t(20, y + 16, n.slice(1), { size: 12, bold: true, fill: '#5f6368' }); else { if (n === 'Pages') s += r(8, y, 214, 30, '#e8f0fe', { rx: 15 }); s += t(28, y + 20, n, { fill: n === 'Pages' ? '#1a73e8' : '#3c4043', bold: n === 'Pages' }); } });
  s += t(260, 96, 'Page indexing', { size: 22 });
  s += r(260, 112, 220, 70, '#fff', { rx: 8, stroke: '#dadce0' }) + t(276, 138, 'Not indexed', { fill: '#5f6368' }) + t(276, 168, 'Grey bar', { size: 12, fill: '#5f6368' }) + r(496, 112, 220, 70, '#fff', { rx: 8, stroke: '#dadce0' }) + t(512, 138, 'Indexed', { fill: '#188038' }) + t(512, 168, 'Green bar', { size: 12, fill: '#5f6368' });
  s += r(260, 198, 676, 290, '#fff', { rx: 8, stroke: '#dadce0' }) + t(280, 230, "Why pages aren't indexed", { size: 16, bold: true });
  [['Reason', 280], ['Source', 620], ['Validation', 720]].forEach(([c, x]) => s += t(x, 260, c, { bold: true, fill: '#5f6368', size: 12 }));
  ["Excluded by 'noindex' tag", 'Page with redirect', 'Not found (404)', 'Crawled - currently not indexed', 'Discovered - currently not indexed', 'Duplicate without user-selected canonical'].forEach((n, i) => { const y = 270 + i * 34; s += `<line x1="270" y1="${y}" x2="926" y2="${y}" stroke="#eceff1"/>` + t(280, y + 22, n) + t(620, y + 22, i > 2 ? 'Google systems' : 'Website', { size: 12 }) + t(720, y + 22, 'Not Started', { size: 12, fill: '#5f6368' }); });
  return s + mark([270, 212, 656, 92], [560, 120, 'Read every reason here']).replace(/(<rect x="\d+" y="120")/, '$1');
})());

images['technical-seo-audit-wordpress-step-2'] = doc('WordPress Settings Reading Discourage search engines from indexing this site checkbox', 'Illustrated WordPress Settings > Reading screen with the Search engine visibility checkbox, Discourage search engines from indexing this site, highlighted and unticked.', (() => {
  const m = wp(WP_MENU, 'Settings', ['General', 'Writing', 'Reading', 'Discussion', 'Media', 'Permalinks', 'Privacy'], 'Reading');
  let s = m.s + h1(190, 74, 'Reading Settings');
  const rows = [['Your homepage displays', 'Your latest posts'], ['Blog pages show at most', '10  posts'], ['Syndication feeds show the most recent', '10  items'], ['For each post in a feed, include', 'Full text']];
  rows.forEach(([k, v], i) => { const y = 110 + i * 50; s += t(190, y + 20, k, { bold: true, size: 13 }) + r(470, y + 2, 200, 28, '#fff', { rx: 4, stroke: '#8c8f94' }) + t(482, y + 21, v); });
  s += t(190, 330, 'Search engine visibility', { bold: true }) + checkbox(470, 317, false) + t(496, 330, 'Discourage search engines from indexing this site') + t(470, 356, 'It is up to search engines to honor this request.', { size: 12.5, fill: '#646970' });
  s += btn(190, 400, 'Save Changes');
  return s + mark([464, 311, 360, 28], [560, 440, 'Must be UNTICKED on a live site']);
})());

// elementor-layout-broken-after-update
const EL_MENU = ['Dashboard', 'Posts', 'Media', 'Pages', 'Elementor', 'Templates', 'Appearance', 'Plugins', 'Users', 'Tools', 'Settings'];
images['elementor-layout-broken-after-update-step-1'] = doc('Elementor Tools Regenerate Files and Data button (Regenerate CSS and Data)', 'Illustrated WordPress admin, Elementor > Tools > General tab, with the Regenerate Files & Data button highlighted.', (() => {
  const m = wp(EL_MENU, 'Elementor', ['Settings', 'Role Manager', 'Tools', 'System Info'], 'Tools');
  let s = m.s + h1(190, 74, 'Tools') + tabs(190, 92, ['General', 'Replace URL', 'Version Control', 'Maintenance Mode'], 'General');
  s += t(190, 170, 'Regenerate CSS & Data', { bold: true }) + btn(430, 150, 'Regenerate Files & Data', false, 190) + t(430, 204, 'Styles set in Elementor are saved in CSS files in the uploads folder', { size: 12.5, fill: '#646970' }) + t(430, 222, 'and the site\'s database. Recreate those files, according to the most recent settings.', { size: 12.5, fill: '#646970' });
  s += t(190, 270, 'Sync Library', { bold: true }) + btn(430, 250, 'Sync Library', false, 120) + t(190, 330, 'Safe Mode', { bold: true }) + r(430, 312, 120, 28, '#fff', { rx: 4, stroke: '#8c8f94' }) + t(442, 331, 'Disable');
  s += btn(190, 400, 'Save Changes');
  return s + mark([430, 150, 190, 30], [660, 290, 'Click, then clear all caches']);
})());

images['elementor-layout-broken-after-update-step-2'] = doc('Elementor System Info Server Environment PHP Memory Limit', 'Illustrated WordPress admin, Elementor > System Info screen, Server Environment table with the PHP Memory Limit row highlighted.', (() => {
  const m = wp(EL_MENU, 'Elementor', ['Settings', 'Role Manager', 'Tools', 'System Info'], 'System Info');
  let s = m.s + h1(190, 74, 'System Info') + panel(190, 96, 746, 380) + t(210, 126, 'Server Environment', { size: 15, bold: true });
  const rows = [['Operating System', 'Linux'], ['Software', 'LiteSpeed'], ['MySQL version', 'MariaDB Server v10.11'], ['PHP Version', '8.2'], ['PHP Memory Limit', '128M'], ['PHP Max Input Vars', '1000'], ['PHP Max Post Size', '64M'], ['GD Installed', 'Yes'], ['ZIP Installed', 'Yes'], ['Write-permissions', 'All right']];
  rows.forEach(([k, v], i) => { const y = 140 + i * 32; s += r(191, y, 744, 32, i % 2 ? '#fff' : '#f6f7f7') + t(210, y + 21, k + ':') + t(460, y + 21, v, { bold: k === 'PHP Memory Limit' }); });
  s += btn(190, 488, 'Download System Info', false, 180);
  return s + mark([198, 270, 330, 28], [620, 160, 'Check PHP Memory Limit']);
})());

// wordpress-update-button-missing
images['wordpress-update-button-missing-step-1'] = doc('WordPress Dashboard Updates screen with Check again and Update Plugins', 'Illustrated WordPress Dashboard > Updates screen showing available plugin updates, with the Updates menu item highlighted.', (() => {
  const m = wp(WP_MENU, 'Dashboard', ['Home', 'Updates'], 'Updates');
  let s = m.s + h1(190, 74, 'WordPress Updates') + t(190, 104, 'Last checked on November 10, 2026 at 9:14 am.', { fill: '#50575e' }) + btn(510, 86, 'Check again', false, 110);
  s += t(190, 150, 'You have the latest version of WordPress.', { size: 15 }) + t(190, 194, 'Plugins', { size: 18 }) + t(190, 218, 'The following plugins have new versions available. Check the ones you want to update and then click “Update Plugins”.', { size: 12, fill: '#50575e' });
  s += btn(190, 232, 'Update Plugins', false, 130) + panel(190, 272, 746, 140);
  ['Contact Form Plugin', 'SEO Plugin', 'Backup Plugin'].forEach((p, i) => { const y = 272 + i * 46; s += checkbox(206, y + 15, false) + t(234, y + 20, p, { bold: true }) + t(234, y + 38, 'You have version 2.1 installed. Update to 2.4.', { size: 12, fill: '#50575e' }); });
  return s + mark(m.pos['sub:Updates'], [300, 450, 'No Updates link? Check your role']).replace(/<path d="M[^"]+"/, m2 => m2) + mark([506, 84, 118, 34], [700, 140, 'Re-check for updates']).replace(/<rect x="[^"]+" y="[^"]+" width="[^"]+" height="[^"]+" rx="8"[^>]*\/>/, '<rect x="500" y="78" width="130" height="46" rx="8" fill="none" stroke="#d63638" stroke-width="3"/>');
})());

images['wordpress-update-button-missing-step-2'] = doc('WordPress Plugins list with a new version available but Automatic update is unavailable for this plugin', 'Illustrated WordPress Plugins > Installed Plugins screen where a premium plugin shows a new version with the notice Automatic update is unavailable for this plugin, highlighted.', (() => {
  const m = wp(WP_MENU, 'Plugins', ['Installed Plugins', 'Add New Plugin', 'Plugin File Editor'], 'Installed Plugins');
  let s = m.s + h1(190, 74, 'Plugins') + sublinks(190, 112, ['All (6)', 'Active (6)', 'Update Available (1)'], 'All (6)');
  s += panel(190, 128, 746, 320) + t(240, 152, 'Plugin', { bold: true }) + t(480, 152, 'Description', { bold: true }) + `<line x1="190" y1="166" x2="936" y2="166" stroke="#c3c4c7"/>`;
  const rows = ['Page Builder', 'Premium Slider', 'Forms'];
  rows.forEach((p, i) => { const y = 166 + i * 64; s += r(191, y, 744, 64, i === 1 ? '#f0f6fc' : '#fff') + checkbox(206, y + 14, false) + t(240, y + 26, p, { bold: true }) + t(240, y + 48, 'Settings | Deactivate', { size: 12, fill: '#2271b1' }) + t(480, y + 26, 'Version 3.2 | By Plugin Maker', { size: 12, fill: '#50575e' }); });
  s += r(191, 294, 744, 50, '#fcf9e8') + r(191, 294, 4, 50, '#dba617') + t(214, 324, 'There is a new version of Premium Slider available. View version 4.0 details. Automatic update is unavailable for this plugin.', { size: 12 });
  return s + mark([600, 308, 330, 22], [420, 400, 'No "update now" link = licence or lock']);
})());

// fix-wordpress-critical-error
images['fix-wordpress-critical-error-step-1'] = doc('WordPress recovery mode Plugins screen with a paused plugin', 'Illustrated WordPress Plugins screen in recovery mode with the Exit Recovery Mode button in the admin bar and a plugin paused during recovery mode highlighted.', (() => {
  const m = wp(WP_MENU, 'Plugins', ['Installed Plugins', 'Add New Plugin'], 'Installed Plugins', { barRed: 'Exit Recovery Mode' });
  let s = m.s + h1(190, 74, 'Plugins') + sublinks(190, 112, ['All (5)', 'Active (5)', 'Paused (1)'], 'Paused (1)');
  s += r(190, 126, 746, 44, '#fff') + r(190, 126, 4, 44, RED) + t(208, 153, 'One or more plugins failed to load properly. You can find more details and make changes on the Plugins screen.', { size: 12 });
  s += panel(190, 184, 746, 200) + r(191, 185, 744, 96, '#fcf0f1') + checkbox(206, 200, false) + t(240, 212, 'Old Slider', { bold: true }) + t(240, 234, 'Deactivate | Resume', { size: 12, fill: '#2271b1' }) + t(480, 212, 'Error Details', { bold: true, fill: RED }) + t(480, 234, 'This plugin failed to load properly and is paused during recovery mode.', { size: 12 }) + t(480, 256, 'An error of type E_ERROR was caused in line 42 of the file …/old-slider/slider.php', { size: 11.5, fill: '#50575e' });
  s += checkbox(206, 300, false) + t(240, 312, 'Contact Form Plugin', { bold: true }) + t(240, 334, 'Deactivate', { size: 12, fill: '#2271b1' });
  return s + mark([236, 196, 220, 46], [330, 430, 'Deactivate the paused plugin']) + `<rect x="124" y="0" width="${'Exit Recovery Mode'.length * 7 + 32}" height="32" rx="6" fill="none" stroke="${RED}" stroke-width="3"/>`;
})());

images['fix-wordpress-critical-error-step-2'] = doc('wp-config.php in a hosting File Manager editor with WP_DEBUG and WP_DEBUG_LOG lines', 'Illustrated hosting File Manager code editor with public_html/wp-config.php open and the WP_DEBUG, WP_DEBUG_LOG and WP_DEBUG_DISPLAY lines highlighted.', (() => {
  let s = r(0, 0, W, 50, '#fff', { stroke: '#dcdcde' }) + t(20, 31, 'File Manager', { size: 17, bold: true }) + t(170, 31, 'public_html / wp-config.php', { fill: '#50575e' }) + r(830, 10, 110, 30, '#2271b1', { rx: 4 }) + t(885, 30, 'Save', { fill: '#fff', anchor: 'middle', bold: true });
  s += r(0, 50, W, H - 50, '#1e1e1e');
  const code = ["define( 'DB_COLLATE', '' );", '', "$table_prefix = 'wp_';", '', '/* Add any custom values between this line and the "stop editing" line. */', '', "define( 'WP_DEBUG', true );", "define( 'WP_DEBUG_LOG', true );", "define( 'WP_DEBUG_DISPLAY', false );", '', "/* That's all, stop editing! Happy publishing. */", '', '/** Absolute path to the WordPress directory. */', "if ( ! defined( 'ABSPATH' ) ) {"];
  code.forEach((l, i) => { const y = 84 + i * 26; s += t(44, y, String(78 + i), { mono: true, fill: '#858585', anchor: 'end', size: 13 }) + t(64, y, l, { mono: true, fill: l.startsWith('define') ? '#dcdcaa' : (l.startsWith('/') ? '#6a9955' : '#d4d4d4'), size: 13 }); });
  return s + mark([60, 230, 330, 70], [520, 360, 'Add above "stop editing"']);
})());

// logo-favicon-brand-basics-website
const custPanel = (title, items) => { let s = r(0, 0, 300, H, '#fff', { stroke: '#dcdcde' }) + r(0, 0, 300, 46, '#f0f0f1') + t(16, 29, '✕', { size: 16 }) + btn(200, 8, 'Published', false, 90); s += t(16, 76, title, { size: 12, fill: '#50575e' }); return s; };
images['logo-favicon-brand-basics-website-step-1'] = doc('WordPress Appearance Customize Site Identity menu item', 'Illustrated WordPress Customizer panel with the Site Identity section highlighted, opened from Appearance > Customize.', (() => {
  let s = custPanel('You are customizing') + t(16, 100, 'My Site', { size: 20, bold: true });
  const secs = ['Site Identity', 'Colors', 'Menus', 'Widgets', 'Homepage Settings', 'Additional CSS'];
  secs.forEach((n, i) => { const y = 124 + i * 48; s += r(0, y, 300, 48, '#fff', { stroke: '#dcdcde' }) + t(16, y + 30, n, { size: 14 }) + t(280, y + 30, '›', { size: 18, fill: '#8c8f94', anchor: 'end' }); });
  s += r(300, 0, W - 300, H, '#e9ecef') + r(340, 40, 580, 460, '#fff', { rx: 6, stroke: '#dcdcde' }) + r(340, 40, 580, 60, '#f6f7f7') + r(364, 58, 26, 26, '#c3c4c7', { rx: 4 }) + t(402, 77, 'My Site', { size: 16, bold: true }) + t(364, 150, 'Site preview', { size: 18, fill: '#a7aaad' });
  return s + mark([4, 128, 292, 40], [360, 200, 'Appearance > Customize > Site Identity']);
})());

images['logo-favicon-brand-basics-website-step-2'] = doc('WordPress Site Identity Site Icon favicon setting, select site icon at least 512 by 512 pixels', 'Illustrated WordPress Customizer Site Identity section showing Logo, Site Title, Tagline and the Site Icon setting with the Select site icon button highlighted.', (() => {
  let s = custPanel('Customizing ▸ Site Identity') + t(16, 100, 'Site Identity', { size: 20, bold: true });
  s += t(16, 134, 'Logo', { bold: true }) + r(16, 144, 268, 50, '#f6f7f7', { rx: 4, stroke: '#c3c4c7' }) + t(150, 174, 'Select logo', { anchor: 'middle', fill: '#2271b1' });
  s += t(16, 220, 'Site Title', { bold: true }) + r(16, 228, 268, 28, '#fff', { rx: 4, stroke: '#8c8f94' }) + t(26, 247, 'My Site');
  s += t(16, 280, 'Tagline', { bold: true }) + r(16, 288, 268, 28, '#fff', { rx: 4, stroke: '#8c8f94' });
  s += t(16, 346, 'Site Icon', { bold: true }) + t(16, 368, 'Site Icons are what you see in browser tabs,', { size: 12, fill: '#50575e' }) + t(16, 384, 'bookmark bars, and within the WordPress mobile', { size: 12, fill: '#50575e' }) + t(16, 400, 'apps. It should be square and at least 512 by', { size: 12, fill: '#50575e' }) + t(16, 416, '512 pixels.', { size: 12, fill: '#50575e' });
  s += r(16, 428, 268, 50, '#f6f7f7', { rx: 4, stroke: '#c3c4c7' }) + t(150, 458, 'Select site icon', { anchor: 'middle', fill: '#2271b1' });
  s += r(300, 0, W - 300, H, '#e9ecef') + r(340, 40, 580, 50, '#dee1e6', { rx: 8 }) + r(352, 50, 220, 32, '#fff', { rx: 6 }) + r(362, 58, 16, 16, '#2271b1', { rx: 3 }) + t(388, 71, 'My Site', { size: 12 }) + t(360, 130, 'The site icon appears in the browser tab', { fill: '#50575e' });
  return s + mark([16, 428, 268, 50], [420, 300, 'Square image, at least 512 × 512 px']) + `<rect x="356" y="52" width="28" height="28" rx="6" fill="none" stroke="${RED}" stroke-width="3"/>`;
})());

// woocommerce-gst-invoices-india
images['woocommerce-gst-invoices-india-step-1'] = doc('WooCommerce Settings General Enable taxes, enable tax rates and calculations', 'Illustrated WooCommerce > Settings > General screen with the Enable taxes checkbox, Enable tax rates and calculations, ticked and highlighted.', (() => {
  const m = wp(WC_MENU, 'WooCommerce', ['Home', 'Orders', 'Customers', 'Reports', 'Settings', 'Status', 'Extensions'], 'Settings');
  let s = m.s + tabs(190, 50, WC_TABS, 'General') + t(190, 116, 'General options', { size: 16, bold: true });
  const rows = [['Selling location(s)', 'Sell to all countries'], ['Shipping location(s)', 'Ship to all countries you sell to'], ['Default customer location', 'Shop country/region']];
  rows.forEach(([k, v], i) => { const y = 136 + i * 48; s += t(190, y + 20, k, { bold: true }) + r(420, y + 2, 300, 28, '#fff', { rx: 4, stroke: '#8c8f94' }) + t(432, y + 21, v); });
  s += t(190, 300, 'Enable taxes', { bold: true }) + checkbox(420, 287, true) + t(446, 300, 'Enable tax rates and calculations') + t(420, 324, 'Rates will be configurable and taxes will be calculated during checkout.', { size: 12.5, fill: '#646970' });
  s += t(190, 370, 'Currency options', { size: 16, bold: true }) + t(190, 404, 'Currency', { bold: true }) + r(420, 386, 300, 28, '#fff', { rx: 4, stroke: '#8c8f94' }) + t(432, 405, 'Indian rupee (₹) — INR');
  s += btn(190, 450, 'Save changes');
  return s + mark([414, 281, 260, 28], [600, 220, 'Tick this first, then open Tax']);
})());

images['woocommerce-gst-invoices-india-step-2'] = doc('WooCommerce Settings Tax rates table with CGST and SGST rows for India GST', 'Illustrated WooCommerce > Settings > Tax rates table for a GST class with CGST 9% priority 1, SGST 9% priority 2 for Maharashtra and an IGST 18% row, highlighted.', (() => {
  const m = wp(WC_MENU, 'WooCommerce', ['Home', 'Orders', 'Customers', 'Reports', 'Settings', 'Status', 'Extensions'], 'Settings');
  let s = m.s + tabs(190, 50, WC_TABS, 'Tax') + sublinks(190, 106, ['Tax options', 'Standard rates', 'GST 18 rates', 'GST 5 rates'], 'GST 18 rates');
  s += t(190, 144, '"GST 18" tax rates', { size: 16, bold: true });
  const cols = [['Country code', 190], ['State code', 290], ['Postcode / ZIP', 380], ['City', 490], ['Rate %', 550], ['Tax name', 630], ['Priority', 720], ['Compound', 790], ['Shipping', 870]];
  s += panel(186, 160, 754, 190) + r(186, 160, 754, 34, '#f6f7f7', { stroke: '#c3c4c7' });
  cols.forEach(([c, x]) => s += t(x + 6, 182, c, { bold: true, size: 11.5 }));
  const rows = [['IN', 'MH', '*', '*', '9.0000', 'CGST', '1'], ['IN', 'MH', '*', '*', '9.0000', 'SGST', '2'], ['IN', '*', '*', '*', '18.0000', 'IGST', '1']];
  rows.forEach((row, i) => { const y = 194 + i * 40; row.forEach((v, j) => s += r(cols[j][1], y + 6, (cols[j + 1] ? cols[j + 1][1] : 940) - cols[j][1] - 6, 28, '#fff', { stroke: '#dcdcde' }) + t(cols[j][1] + 8, y + 25, v, { bold: j === 5 })); s += checkbox(806, y + 12, false) + checkbox(886, y + 12, false); });
  s += btn(190, 370, 'Insert row', false, 100) + btn(296, 370, 'Remove selected row(s)', false, 180) + btn(484, 370, 'Import CSV', false, 100) + btn(590, 370, 'Export CSV', false, 100) + btn(190, 420, 'Save changes');
  return s + mark([190, 200, 744, 74], [520, 470, 'CGST + SGST: priorities 1 and 2']);
})());

for (const [name, svg] of Object.entries(images)) {
  fs.writeFileSync(path.join(OUT, name + '.svg'), svg);
  console.log(name + '.svg', svg.length, 'bytes');
}
module.exports = Object.keys(images);
