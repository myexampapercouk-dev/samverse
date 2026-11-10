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


// ---- Batch 3 ----
const ring = (x, y, w, h, rx = 8) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="none" stroke="${RED}" stroke-width="3"/>`;
const input = (x, y, w, val = '', o = {}) => r(x, y, w, 28, '#fff', { rx: 4, stroke: '#8c8f94' }) + (val ? t(x + 10, y + 19, val, { fill: o.fill || '#1d2327', mono: o.mono }) : '');
const select = (x, y, w, val) => input(x, y, w, val) + t(x + w - 14, y + 19, '▾', { fill: '#50575e', anchor: 'middle' });
const fileMgr = (pathLabel) => r(0, 0, W, 50, '#fff', { stroke: '#dcdcde' }) + t(20, 31, 'File Manager', { size: 17, bold: true }) + t(170, 31, pathLabel, { fill: '#50575e' }) + r(830, 10, 110, 30, '#2271b1', { rx: 4 }) + t(885, 30, 'Save', { fill: '#fff', anchor: 'middle', bold: true });
const codeLines = (lines, start, y0 = 84, hot = () => false) => lines.map((l, i) => { const y = y0 + i * 26; return t(44, y, String(start + i), { mono: true, fill: '#858585', anchor: 'end', size: 13 }) + t(64, y, l, { mono: true, fill: hot(l) ? '#f48771' : (l.startsWith('#') ? '#6a9955' : '#d4d4d4'), size: 13 }); }).join('');
function gsc(active, nav) {
  nav = nav || ['Overview', 'Performance', 'URL inspection', '#Indexing', 'Pages', 'Sitemaps', 'Removals', '#Security & Manual Actions', 'Manual actions', 'Security issues', '#Legacy tools and reports', 'Links'];
  let s = r(0, 0, W, 56, '#fff', { stroke: '#dadce0' }) + t(24, 35, 'Google Search Console', { size: 17, fill: '#5f6368' }) + r(300, 14, 380, 30, '#f1f3f4', { rx: 6 }) + t(316, 34, 'Inspect any URL in "yourdomain.com"', { fill: '#5f6368' });
  s += r(0, 56, 230, H - 56, '#fff', { stroke: '#dadce0' });
  let y = 70, pos;
  for (const n of nav) { if (n[0] === '#') { s += t(20, y + 16, n.slice(1), { size: 12, bold: true, fill: '#5f6368' }); } else { const on = n === active; if (on) { s += r(8, y, 214, 30, '#e8f0fe', { rx: 15 }); pos = [8, y, 214, 30]; } s += t(28, y + 20, n, { fill: on ? '#1a73e8' : '#3c4043', bold: on }); } y += 32; }
  return { s, pos };
}
const yoastNav = (items, on) => { let s = r(176, 44, 200, H - 80, '#fff', { rx: 6, stroke: '#dcdcde' }); let y = 60; const pos = {}; for (const it of items) { const sub = it.startsWith('  '), n = it.trim(); if (n === on) s += r(184, y - 2, 184, 28, '#f3e8f8', { rx: 4 }); s += t(sub ? 210 : 194, y + 17, n, { size: sub ? 12.5 : 13, bold: !sub || n === on, fill: n === on ? '#a61e69' : '#1d2327' }); pos[n] = [184, y - 2, 184, 28]; y += 30; } return { s, pos }; };
const YOAST_MENU = ['Dashboard', 'Posts', 'Media', 'Pages', 'Yoast SEO', 'Appearance', 'Plugins', 'Users', 'Tools', 'Settings'];
const YOAST_SUBS = ['General', 'Settings', 'Integrations', 'Tools'];

// fix-wordpress-redirect-hack
images['fix-wordpress-redirect-hack-step-1'] = doc('.htaccess in a hosting File Manager with a malicious RewriteRule redirect', 'Illustrated hosting File Manager editor with public_html/.htaccess open; a RewriteCond and RewriteRule block sending search and mobile visitors to a spam domain sits above the BEGIN WordPress block and is highlighted.', (() => {
  let s = fileMgr('public_html / .htaccess') + r(0, 50, W, H - 50, '#1e1e1e');
  const code = ['RewriteEngine On', 'RewriteCond %{HTTP_REFERER} (google|bing|facebook) [NC]', 'RewriteCond %{HTTP_USER_AGENT} (android|iphone|mobile) [NC]', 'RewriteRule ^(.*)$ https://spam-domain.example/ [R=302,L]', '', '# BEGIN WordPress', '<IfModule mod_rewrite.c>', 'RewriteEngine On', 'RewriteBase /', 'RewriteRule ^index\\.php$ - [L]', 'RewriteCond %{REQUEST_FILENAME} !-f', 'RewriteCond %{REQUEST_FILENAME} !-d', 'RewriteRule . /index.php [L]', '</IfModule>', '# END WordPress'];
  s += codeLines(code, 1, 84, l => /HTTP_|spam-domain/.test(l));
  return s + mark([60, 66, 520, 102], [600, 300, 'Not yours? Remove it']);
})());

images['fix-wordpress-redirect-hack-step-2'] = doc('WordPress Plugins screen with an unknown plugin you did not install', 'Illustrated WordPress Plugins > Installed Plugins list where a plugin named WP Core Helper, with no author and a vague description, is highlighted as unknown.', (() => {
  const m = wp(WP_MENU, 'Plugins', ['Installed Plugins', 'Add New Plugin', 'Plugin File Editor'], 'Installed Plugins');
  let s = m.s + h1(190, 74, 'Plugins') + sublinks(190, 112, ['All (5)', 'Active (5)'], 'All (5)');
  s += panel(190, 128, 746, 340) + t(240, 152, 'Plugin', { bold: true }) + t(480, 152, 'Description', { bold: true }) + `<line x1="190" y1="166" x2="936" y2="166" stroke="#c3c4c7"/>`;
  const rows = [['Contact Form Plugin', 'Simple contact forms. Version 5.9 | By Forms Team'], ['WP Core Helper', 'Core helper. Version 1.0 |'], ['SEO Plugin', 'Search engine optimisation. Version 22.1 | By SEO Team'], ['Backup Plugin', 'Backups and restores. Version 1.24 | By Backup Team']];
  rows.forEach(([p, d], i) => { const y = 166 + i * 70; s += r(191, y, 744, 70, i === 1 ? '#fcf0f1' : '#fff') + checkbox(206, y + 14, false) + t(240, y + 26, p, { bold: true }) + t(240, y + 50, 'Deactivate', { size: 12, fill: '#2271b1' }) + t(480, y + 26, d, { size: 12, fill: '#50575e' }); });
  return s + mark([236, 240, 560, 44], [560, 480, 'Unknown plugin, no author']) + ring(m.pos['Users'][0] + 2, m.pos['Users'][1], 156, 34, 6);
})());

// elementor-vs-gutenberg
images['elementor-vs-gutenberg-step-1'] = doc('Elementor editor widget panel with Elements tab and Search Widget field', 'Illustrated Elementor editor with the left widget panel open on the Elements tab, showing Layout and Basic widgets such as Container, Heading, Image, Text Editor and Button, with the panel highlighted.', (() => {
  let s = r(0, 0, W, 44, '#26292c') + t(20, 28, 'elementor', { size: 15, bold: true, fill: '#fff' }) + r(840, 8, 100, 28, '#93003c', { rx: 3 }) + t(890, 27, 'Publish', { fill: '#fff', anchor: 'middle', bold: true });
  s += r(0, 44, 300, H - 44, '#fff', { stroke: '#e6e8ea' }) + r(0, 44, 150, 40, '#fff') + t(75, 69, 'Elements', { anchor: 'middle', bold: true }) + r(20, 82, 110, 2, '#93003c') + t(225, 69, 'Globals', { anchor: 'middle', fill: '#69727d' });
  s += input(16, 96, 268, 'Search Widget...', { fill: '#9da5ae' });
  s += t(16, 148, 'Layout', { bold: true, size: 12, fill: '#69727d' });
  const tile = (x, y, n) => r(x, y, 82, 70, '#fff', { rx: 3, stroke: '#d5d8dc' }) + r(x + 31, y + 14, 20, 20, '#69727d', { rx: 3 }) + t(x + 41, y + 56, n, { size: 11.5, anchor: 'middle' });
  s += tile(16, 158, 'Container') + tile(108, 158, 'Grid');
  s += t(16, 256, 'Basic', { bold: true, size: 12, fill: '#69727d' });
  ['Heading', 'Image', 'Text Editor', 'Video', 'Button', 'Divider', 'Spacer', 'Icon', 'Google Maps'].forEach((n, i) => s += tile(16 + (i % 3) * 92, 266 + Math.floor(i / 3) * 80, n));
  s += r(300, 44, W - 300, H - 44, '#f1f3f5') + r(340, 90, 580, 300, '#fff', { stroke: '#d5d8dc' }) + `<rect x="380" y="180" width="500" height="120" fill="none" stroke="#9da5ae" stroke-dasharray="6 5"/>` + t(630, 246, 'Drag widget here', { anchor: 'middle', fill: '#69727d' });
  return s + mark([12, 150, 278, 360], [520, 430, 'Drag widgets onto the page']);
})());

images['elementor-vs-gutenberg-step-2'] = doc('WordPress block editor with the plus Block Inserter open', 'Illustrated WordPress block editor with the blue plus Block Inserter button in the top toolbar open, showing the Blocks tab with Paragraph, Heading, Image, List, Quote, Buttons, Columns and Group blocks, highlighted.', (() => {
  let s = r(0, 0, W, 60, '#fff', { stroke: '#e0e0e0' }) + r(0, 0, 60, 60, '#1e1e1e') + r(18, 18, 24, 24, '#fff', { rx: 12 }) + r(76, 14, 32, 32, '#3858e9', { rx: 2 }) + t(92, 37, '+', { size: 22, fill: '#fff', anchor: 'middle', bold: true });
  s += t(480, 36, 'Add title', { anchor: 'middle', fill: '#757575' }) + t(780, 36, 'Save draft', { fill: '#1e1e1e' }) + r(860, 14, 80, 32, '#3858e9', { rx: 2 }) + t(900, 35, 'Publish', { fill: '#fff', anchor: 'middle' });
  s += r(0, 60, 350, H - 60, '#fff', { stroke: '#e0e0e0' }) + input(16, 76, 318, 'Search', { fill: '#757575' });
  s += t(40, 136, 'Blocks', { bold: true, anchor: 'middle' }) + r(14, 144, 56, 2, '#3858e9') + t(120, 136, 'Patterns', { anchor: 'middle', fill: '#757575' }) + t(200, 136, 'Media', { anchor: 'middle', fill: '#757575' });
  s += t(16, 176, 'TEXT', { size: 11, bold: true, fill: '#757575' });
  const blk = (x, y, n) => r(x + 32, y, 36, 30, '#1e1e1e', { rx: 3 }) + t(x + 50, y + 48, n, { size: 12, anchor: 'middle' });
  ['Paragraph', 'Heading', 'List', 'Quote', 'Code', 'Table'].forEach((n, i) => s += blk(16 + (i % 3) * 106, 190 + Math.floor(i / 3) * 74, n));
  s += t(16, 352, 'MEDIA', { size: 11, bold: true, fill: '#757575' });
  ['Image', 'Gallery', 'Video'].forEach((n, i) => s += blk(16 + i * 106, 366, n));
  s += t(16, 450, 'DESIGN', { size: 11, bold: true, fill: '#757575' });
  ['Buttons', 'Columns', 'Group'].forEach((n, i) => s += blk(16 + i * 106, 464, n));
  s += r(350, 60, W - 350, H - 60, '#fff') + t(420, 160, 'Type / to choose a block', { fill: '#757575', size: 15 });
  return s + mark([76, 14, 32, 32], [480, 240, 'The + opens every block']);
})());

// xml-sitemaps-explained
images['xml-sitemaps-explained-step-1'] = doc('Yoast SEO Settings Site features XML sitemaps toggle on', 'Illustrated WordPress admin, Yoast SEO > Settings > Site features, with the XML sitemaps card in the APIs section switched on and the View the XML sitemap link highlighted.', (() => {
  const m = wp(YOAST_MENU, 'Yoast SEO', YOAST_SUBS, 'Settings');
  const n = yoastNav(['General', '  Site features', '  Site basics', '  Site representation', 'Content types', 'Categories & tags', 'Advanced'], 'Site features');
  let s = m.s + n.s + t(400, 74, 'Site features', { size: 20, bold: true }) + t(400, 108, 'APIs', { size: 15, bold: true });
  const card = (x, title, line1, on, link) => r(x, 122, 260, 260, '#fff', { rx: 6, stroke: '#dcdcde' }) + r(x, 122, 260, 90, '#f6f7f7', { rx: 6 }) + t(x + 18, 240, title, { size: 15, bold: true }) + t(x + 18, 266, line1, { size: 12, fill: '#50575e' }) + (link ? t(x + 18, 300, link, { size: 12.5, fill: '#2271b1' }) : '') + toggle(x + 18, 336, on) + t(x + 70, 351, on ? 'Enable feature' : 'Enable feature', { size: 12.5 });
  s += card(400, 'XML sitemaps', 'Lists the pages you want search engines to find.', true, 'View the XML sitemap') + card(676, 'REST API endpoint', 'Lets other tools read SEO data.', true);
  return s + mark([412, 286, 160, 78], [560, 440, 'On, then open your sitemap']) + ring(n.pos['Site features'][0] - 2, n.pos['Site features'][1] - 2, 188, 32, 6);
})());

images['xml-sitemaps-explained-step-2'] = doc('Google Search Console Sitemaps Add a new sitemap with Submit', 'Illustrated Google Search Console Indexing > Sitemaps screen with sitemap_index.xml typed into the Add a new sitemap field and the Submit button highlighted, above the Submitted sitemaps table.', (() => {
  const g = gsc('Sitemaps');
  let s = g.s + t(260, 96, 'Sitemaps', { size: 22 });
  s += r(260, 116, 676, 130, '#fff', { rx: 8, stroke: '#dadce0' }) + t(284, 148, 'Add a new sitemap', { size: 15, bold: true }) + r(284, 166, 440, 40, '#fff', { rx: 4, stroke: '#9aa0a6' }) + t(296, 191, 'https://yourdomain.com/', { fill: '#5f6368' }) + t(470, 191, 'sitemap_index.xml') + r(744, 168, 92, 36, '#fff', { rx: 4 }) + t(790, 191, 'SUBMIT', { fill: '#1a73e8', bold: true, anchor: 'middle' });
  s += r(260, 264, 676, 190, '#fff', { rx: 8, stroke: '#dadce0' }) + t(284, 296, 'Submitted sitemaps', { size: 15, bold: true });
  const cols = [['Sitemap', 284], ['Type', 470], ['Submitted', 560], ['Last read', 660], ['Status', 770]];
  cols.forEach(([c, x]) => s += t(x, 330, c, { size: 12, bold: true, fill: '#5f6368' }));
  s += `<line x1="260" y1="342" x2="936" y2="342" stroke="#dadce0"/>` + t(284, 372, '/sitemap_index.xml', { fill: '#1a73e8' }) + t(470, 372, 'Sitemap index') + t(560, 372, '—') + t(660, 372, '—') + t(770, 372, 'Success', { fill: '#188038', bold: true });
  return s + mark([740, 166, 100, 40], [600, 480, 'Submit the index only']) + ring(g.pos[0] - 4, g.pos[1] - 4, g.pos[2] + 8, 38, 19);
})());

// wordpress-plugin-conflicts-troubleshooting
images['wordpress-plugin-conflicts-troubleshooting-step-1'] = doc('WordPress Plugins screen Bulk actions Deactivate with plugins selected', 'Illustrated WordPress Plugins > Installed Plugins screen with several plugins ticked, the Bulk actions dropdown set to Deactivate and the Apply button highlighted.', (() => {
  const m = wp(WP_MENU, 'Plugins', ['Installed Plugins', 'Add New Plugin', 'Plugin File Editor'], 'Installed Plugins');
  let s = m.s + h1(190, 74, 'Plugins') + sublinks(190, 108, ['All (6)', 'Active (6)'], 'All (6)');
  s += select(190, 120, 150, 'Deactivate') + btn(348, 119, 'Apply', false, 70);
  s += panel(190, 160, 746, 330) + checkbox(206, 172, false) + t(240, 186, 'Plugin', { bold: true }) + t(480, 186, 'Description', { bold: true }) + `<line x1="190" y1="200" x2="936" y2="200" stroke="#c3c4c7"/>`;
  ['Slider Plugin', 'Caching Plugin', 'Gallery Plugin', 'Pop-up Plugin', 'WooCommerce'].forEach((p, i) => { const y = 200 + i * 56, on = i < 4; s += r(191, y, 744, 56, on ? '#f0f6fc' : '#fff') + checkbox(206, y + 14, on) + t(240, y + 26, p, { bold: true }) + t(240, y + 44, 'Deactivate', { size: 12, fill: '#2271b1' }) + t(480, y + 26, on ? 'Selected for deactivation' : 'Kept on: the broken feature needs it', { size: 12, fill: '#50575e' }); });
  return s + mark([190, 120, 228, 30], [560, 100, 'Deactivate half, then retest']);
})());

images['wordpress-plugin-conflicts-troubleshooting-step-2'] = doc('Tools Site Health Troubleshooting tab Enable Troubleshooting Mode (Health Check plugin)', 'Illustrated WordPress Tools > Site Health screen with the Troubleshooting tab added by the Health Check & Troubleshooting plugin and the Enable Troubleshooting Mode button highlighted.', (() => {
  const m = wp(WP_MENU, 'Tools', ['Available Tools', 'Import', 'Export', 'Site Health'], 'Site Health');
  let s = m.s + r(160, 32, W - 160, 110, '#fff') + t(548, 76, 'Site Health', { size: 22, anchor: 'middle' });
  [['Status', 400], ['Info', 490], ['Troubleshooting', 590], ['Tools', 710]].forEach(([n, x]) => s += t(x, 126, n, { anchor: 'middle', bold: n === 'Troubleshooting' }) + (n === 'Troubleshooting' ? r(x - 60, 136, 120, 4, '#2271b1') : ''));
  s += panel(200, 170, 700, 280) + t(224, 206, 'Troubleshooting mode', { size: 16, bold: true });
  s += t(224, 236, 'When troubleshooting mode is enabled, all plugins are disabled and a default theme', { size: 12.5, fill: '#50575e' }) + t(224, 256, 'is used, but only for your logged-in session. Visitors see the normal site.', { size: 12.5, fill: '#50575e' });
  s += btn(224, 290, 'Enable Troubleshooting Mode', true, 220);
  return s + mark([224, 290, 220, 30], [520, 380, 'Only you see the test setup']) + ring(526, 104, 128, 40, 6);
})());

// woocommerce-orders-not-showing-fix
images['woocommerce-orders-not-showing-fix-step-1'] = doc('WooCommerce Orders screen with All status filter and date filter', 'Illustrated WooCommerce > Orders screen with the status links All, Pending payment, Processing, On hold, Completed, Cancelled and Failed, with All selected and highlighted, plus the date and customer filters.', (() => {
  const m = wp(WC_MENU, 'WooCommerce', ['Home', 'Orders', 'Customers', 'Reports', 'Settings', 'Status', 'Extensions'], 'Orders');
  let s = m.s + h1(190, 74, 'Orders') + btn(270, 54, 'Add order', false, 90);
  s += sublinks(190, 112, ['All', 'Pending payment', 'Processing', 'On hold', 'Completed', 'Cancelled', 'Failed'], 'All');
  s += select(190, 128, 140, 'All dates') + select(338, 128, 220, 'Filter by registered customer') + btn(566, 127, 'Filter', false, 64) + input(720, 128, 140, '') + btn(866, 127, 'Search', false, 70);
  s += panel(190, 172, 746, 290) + t(240, 196, 'Order', { bold: true }) + t(520, 196, 'Date', { bold: true }) + t(640, 196, 'Status', { bold: true }) + t(800, 196, 'Total', { bold: true });
  [['Pending payment', '#f0f0f1'], ['Processing', '#c6e1c6'], ['On hold', '#f8dda7'], ['Completed', '#c8d7e1']].forEach(([st, c], i) => { const y = 210 + i * 56; s += `<line x1="190" y1="${y}" x2="936" y2="${y}" stroke="#dcdcde"/>` + checkbox(206, y + 20, false) + t(240, y + 33, '#10' + (42 + i) + ' Customer name', { fill: '#2271b1', bold: true }) + t(520, y + 33, 'Nov 10, 2026') + r(640, y + 16, st.length * 7 + 20, 26, c, { rx: 4 }) + t(650, y + 34, st, { size: 12 }); });
  return s + mark([186, 96, 560, 24], [560, 490, 'Check All, not just Processing']);
})());

images['woocommerce-orders-not-showing-fix-step-2'] = doc('WooCommerce Settings Advanced Features Order data storage HPOS and compatibility mode', 'Illustrated WooCommerce > Settings > Advanced > Features screen with Order data storage options High-performance order storage and WordPress posts storage, and the Enable compatibility mode checkbox, highlighted.', (() => {
  const m = wp(WC_MENU, 'WooCommerce', ['Home', 'Orders', 'Customers', 'Reports', 'Settings', 'Status', 'Extensions'], 'Settings');
  let s = m.s + tabs(190, 50, WC_TABS, 'Advanced') + sublinks(190, 106, ['Page setup', 'REST API', 'Webhooks', 'Legacy API', 'WooCommerce.com', 'Features'], 'Features');
  s += t(190, 150, 'Features', { size: 16, bold: true }) + t(190, 196, 'Order data storage', { bold: true });
  s += radio(420, 182, true) + t(446, 196, 'High-performance order storage (recommended)') + t(446, 216, 'Orders are stored in custom tables optimized for WooCommerce.', { size: 12, fill: '#646970' });
  s += radio(420, 236, false) + t(446, 250, 'WordPress posts storage (legacy)') + t(446, 270, 'Orders are stored in the WordPress posts table.', { size: 12, fill: '#646970' });
  s += checkbox(420, 296, true) + t(446, 309, 'Enable compatibility mode (Synchronizes orders to the posts table.)');
  s += btn(190, 380, 'Save changes');
  return s + mark([414, 176, 470, 140], [560, 420, 'Which storage is in charge?']);
})());

// google-merchant-center-woocommerce
images['google-merchant-center-woocommerce-step-2'] = doc('Google Merchant Center Products Diagnostics item issues such as missing GTIN and price mismatch', 'Illustrated Google Merchant Center Products > Diagnostics screen with an Item issues table listing Mismatched value (page crawl) [price], Missing value [shipping] and Invalid value [gtin], with the issues highlighted.', (() => {
  let s = r(0, 0, W, 56, '#fff', { stroke: '#dadce0' }) + t(24, 35, 'Google Merchant Center', { size: 17, fill: '#5f6368' });
  s += r(0, 56, 230, H - 56, '#fff', { stroke: '#dadce0' });
  let y = 74; for (const n of ['Overview', 'Products', '  All products', '  Diagnostics', '  Feeds', 'Performance', 'Growth']) { const sub = n.startsWith('  '), nm = n.trim(), on = nm === 'Diagnostics'; if (on) s += r(8, y, 214, 30, '#e8f0fe', { rx: 15 }); s += t(sub ? 44 : 28, y + 20, nm, { fill: on ? '#1a73e8' : '#3c4043', bold: on || !sub }); y += 34; }
  s += t(260, 96, 'Diagnostics', { size: 22 }) + sublinks(260, 132, ['Account issues', 'Feed issues', 'Item issues'], 'Item issues');
  s += r(260, 150, 676, 300, '#fff', { rx: 8, stroke: '#dadce0' }) + t(284, 180, 'Issue', { bold: true, size: 12, fill: '#5f6368' }) + t(700, 180, 'Status', { bold: true, size: 12, fill: '#5f6368' }) + `<line x1="260" y1="194" x2="936" y2="194" stroke="#dadce0"/>`;
  [['Mismatched value (page crawl) [price]', 'Disapproved'], ['Missing value [shipping]', 'Disapproved'], ['Invalid value [gtin]', 'Limited performance'], ['Image too small [image link]', 'Disapproved']].forEach(([iss, st], i) => { const yy = 194 + i * 56; s += t(284, yy + 34, iss, { fill: '#1a73e8' }) + t(700, yy + 34, st, { fill: st === 'Disapproved' ? '#c5221f' : '#b06000', bold: true }) + `<line x1="260" y1="${yy + 56}" x2="936" y2="${yy + 56}" stroke="#f1f3f4"/>`; });
  return s + mark([276, 206, 380, 160], [560, 480, 'Fix the top issue first']);
})());

images['google-merchant-center-woocommerce-step-1'] = doc('WooCommerce product edit Product data Inventory tab SKU and GTIN, UPC, EAN, or ISBN fields', 'Illustrated WooCommerce Products > Edit product screen with the Product data box on the Inventory tab, showing the SKU field and the GTIN, UPC, EAN, or ISBN field highlighted.', (() => {
  const m = wp(WC_MENU, 'Products', ['All Products', 'Add New Product', 'Categories', 'Tags', 'Attributes'], 'All Products');
  let s = m.s + h1(190, 74, 'Edit product') + input(190, 90, 746, 'Cotton Kurti for Women, Blue');
  s += panel(190, 140, 746, 330) + r(190, 140, 746, 40, '#fff', { stroke: '#c3c4c7' }) + t(206, 166, 'Product data —', { bold: true }) + select(320, 146, 160, 'Simple product');
  s += r(190, 180, 170, 290, '#fafafa', { stroke: '#eee' });
  ['General', 'Inventory', 'Shipping', 'Linked Products', 'Attributes', 'Advanced'].forEach((n, i) => { const y = 180 + i * 40; s += r(190, y, 170, 40, n === 'Inventory' ? '#eee' : '#fafafa') + t(210, y + 25, n, { fill: n === 'Inventory' ? '#1d2327' : '#2271b1', bold: n === 'Inventory' }); });
  s += t(380, 216, 'SKU') + input(560, 198, 300, 'KURTI-BLU-M') + t(380, 266, 'GTIN, UPC, EAN, or ISBN') + input(560, 248, 300, '8901234567890', { mono: true });
  s += t(380, 316, 'Stock management') + checkbox(560, 304, true) + t(586, 316, 'Track stock quantity for this product', { size: 12.5 });
  return s + mark([376, 196, 490, 82], [600, 400, 'Real barcode, never made up']);
})());

// woocommerce-checkout-not-working-fix
images['woocommerce-checkout-not-working-fix-step-1'] = doc('WooCommerce Settings Advanced Page setup Checkout page assignment', 'Illustrated WooCommerce > Settings > Advanced > Page setup screen with the Cart page, Checkout page, My account page and Terms and conditions dropdowns, and the Checkout page field highlighted.', (() => {
  const m = wp(WC_MENU, 'WooCommerce', ['Home', 'Orders', 'Customers', 'Reports', 'Settings', 'Status', 'Extensions'], 'Settings');
  let s = m.s + tabs(190, 50, WC_TABS, 'Advanced') + sublinks(190, 106, ['Page setup', 'REST API', 'Webhooks', 'Legacy API', 'WooCommerce.com', 'Features'], 'Page setup');
  s += t(190, 150, 'Page setup', { size: 16, bold: true });
  [['Cart page', 'Cart'], ['Checkout page', 'Checkout'], ['My account page', 'My account'], ['Terms and conditions', 'Terms and Conditions']].forEach(([k, v], i) => { const y = 170 + i * 52; s += t(190, y + 20, k, { bold: true }) + select(420, y + 2, 300, v); });
  s += btn(190, 420, 'Save changes');
  return s + mark([414, 216, 312, 36], [600, 470, 'Must point to the real checkout']);
})());

images['woocommerce-checkout-not-working-fix-step-2'] = doc('WooCommerce Status System status WooCommerce pages section', 'Illustrated WooCommerce > Status > System status report with the WooCommerce pages section listing Shop base, Cart, Checkout, My account and Terms and conditions, with the Checkout row highlighted.', (() => {
  const m = wp(WC_MENU, 'WooCommerce', ['Home', 'Orders', 'Customers', 'Reports', 'Settings', 'Status', 'Extensions'], 'Status');
  let s = m.s + tabs(190, 50, ['System status', 'Tools', 'Logs', 'Scheduled Actions'], 'System status') + btn(190, 96, 'Get system report', true, 150);
  s += panel(190, 144, 746, 300) + r(190, 144, 746, 36, '#f6f7f7', { stroke: '#c3c4c7' }) + t(206, 168, 'WooCommerce pages', { bold: true });
  [['Shop base', '#5 - /shop/'], ['Cart', '#6 - /cart/'], ['Checkout', '#7 - /checkout/'], ['My account', '#8 - /my-account/'], ['Terms and conditions', '#9 - /terms/']].forEach(([k, v], i) => { const y = 180 + i * 48; s += r(191, y, 744, 48, i % 2 ? '#fff' : '#f9f9f9') + t(206, y + 29, k + ':') + t(460, y + 29, '✔', { fill: '#008a20', bold: true }) + t(482, y + 29, v, { fill: '#2271b1' }); });
  return s + mark([198, 278, 400, 40], [620, 480, 'Errors show in red here']);
})());

// mixed-content-warnings-fix
images['mixed-content-warnings-fix-step-1'] = doc('Chrome DevTools Console Mixed Content warning for an insecure image', 'Illustrated Chrome DevTools Console tab showing a yellow Mixed Content warning: the page was loaded over HTTPS but requested an insecure image over http, with the insecure URL highlighted.', (() => {
  let s = r(0, 0, W, 40, '#f1f3f4') + r(12, 8, 600, 24, '#fff', { rx: 12 }) + t(30, 25, 'https://yourdomain.com/', { fill: '#3c4043' });
  s += r(0, 40, W, 180, '#fff') + t(40, 120, 'Your page', { size: 20, fill: '#9aa0a6' });
  s += r(0, 220, W, 34, '#f1f3f4', { stroke: '#dadce0' });
  [['Elements', 20], ['Console', 110], ['Sources', 196], ['Network', 278], ['Security', 362]].forEach(([n, x]) => s += t(x, 242, n, { fill: n === 'Console' ? '#1a73e8' : '#5f6368', bold: n === 'Console' }) + (n === 'Console' ? r(x - 6, 250, 70, 3, '#1a73e8') : ''));
  s += r(0, 254, W, H - 254, '#fff');
  s += r(0, 270, W, 70, '#fef7e0', { stroke: '#f9e3a1' }) + t(20, 292, '⚠', { fill: '#b06000', size: 14 }) + t(44, 292, "Mixed Content: The page at 'https://yourdomain.com/' was loaded over HTTPS, but requested an insecure", { size: 12.5, mono: true, fill: '#5c3c00' }) + t(44, 312, "image 'http://yourdomain.com/wp-content/uploads/logo.png'. This content should also be served over HTTPS.", { size: 12.5, mono: true, fill: '#5c3c00' });
  s += t(20, 370, '>', { fill: '#1a73e8', mono: true });
  return s + mark([90, 298, 420, 20], [560, 410, 'This URL still uses http://']);
})());

images['mixed-content-warnings-fix-step-2'] = doc('WordPress Settings General WordPress Address and Site Address using https', 'Illustrated WordPress Settings > General screen with WordPress Address (URL) and Site Address (URL) both set to https://yourdomain.com and highlighted.', (() => {
  const m = wp(WP_MENU, 'Settings', ['General', 'Writing', 'Reading', 'Discussion', 'Media', 'Permalinks', 'Privacy'], 'General');
  let s = m.s + h1(190, 74, 'General Settings');
  [['Site Title', 'My Site'], ['Tagline', ''], ['WordPress Address (URL)', 'https://yourdomain.com'], ['Site Address (URL)', 'https://yourdomain.com'], ['Administration Email Address', 'admin@yourdomain.com']].forEach(([k, v], i) => { const y = 100 + i * 52; s += t(190, y + 20, k, { bold: true }) + input(430, y + 2, 360, v); });
  s += btn(190, 420, 'Save Changes');
  return s + mark([426, 200, 368, 82], [560, 330, 'Both must start with https://']);
})());

// category-tag-pages-seo
images['category-tag-pages-seo-step-2'] = doc('Yoast SEO Settings Categories and tags Tags Show tags in search results switched off', 'Illustrated Yoast SEO > Settings > Categories & tags > Tags screen with the Show tags in search results toggle switched off and highlighted.', (() => {
  const m = wp(YOAST_MENU, 'Yoast SEO', YOAST_SUBS, 'Settings');
  const n = yoastNav(['General', 'Content types', 'Categories & tags', '  Categories', '  Tags', 'Advanced'], 'Tags');
  let s = m.s + n.s + t(400, 74, 'Tags', { size: 20, bold: true }) + t(400, 98, 'Determine how your tags should look in search engines.', { size: 12.5, fill: '#50575e' });
  s += r(400, 116, 536, 120, '#fff', { rx: 6, stroke: '#dcdcde' }) + toggle(420, 140, false) + t(474, 155, 'Show tags in search results', { bold: true }) + t(420, 190, 'Disabling this means that tags will not be indexed by search engines', { size: 12, fill: '#50575e' }) + t(420, 208, 'and will be excluded from XML sitemaps.', { size: 12, fill: '#50575e' });
  s += t(400, 270, 'SEO title', { bold: true }) + input(400, 280, 536, '%%term_title%% Archives %%page%% %%sep%% %%sitename%%', { mono: true }) + t(400, 340, 'Meta description', { bold: true }) + r(400, 350, 536, 60, '#fff', { rx: 4, stroke: '#8c8f94' });
  return s + mark([414, 134, 270, 32], [620, 460, 'Off for thin tag archives']) + ring(n.pos['Tags'][0] - 2, n.pos['Tags'][1] - 2, 188, 32, 6);
})());

images['category-tag-pages-seo-step-1'] = doc('WordPress Posts Tags screen with the Count column showing tags used once', 'Illustrated WordPress Posts > Tags screen listing tags with Name, Description, Slug and Count columns, with tags that have a count of 1 highlighted.', (() => {
  const m = wp(WP_MENU, 'Posts', ['All Posts', 'Add New Post', 'Categories', 'Tags'], 'Tags');
  let s = m.s + h1(190, 74, 'Tags');
  s += panel(190, 100, 746, 360) + r(190, 100, 746, 36, '#fff', { stroke: '#c3c4c7' }) + checkbox(206, 110, false);
  [['Name', 240], ['Description', 460], ['Slug', 640], ['Count', 860]].forEach(([c, x]) => s += t(x, 124, c, { bold: true }));
  [['website design', 'website-design', '14'], ['seo', 'seo', '11'], ['seo tips', 'seo-tips', '1'], ['google update', 'google-update', '1'], ['website ideas', 'website-ideas', '1']].forEach(([nm, sl, c], i) => { const y = 136 + i * 56; s += r(191, y, 744, 56, c === '1' ? '#fcf9e8' : (i % 2 ? '#fff' : '#f6f7f7')) + checkbox(206, y + 20, false) + t(240, y + 33, nm, { fill: '#2271b1', bold: true }) + t(460, y + 33, '—', { fill: '#646970' }) + t(640, y + 33, sl) + t(872, y + 33, c, { fill: '#2271b1', anchor: 'middle' }); });
  return s + mark([846, 254, 52, 160], [560, 486, 'Used once: merge or remove']);
})());

// orphan-pages-fix
images['orphan-pages-fix-step-1'] = doc('SEO crawler report with an Orphan URLs filter comparing sitemap and crawl', 'Illustrated desktop SEO crawler with the Sitemaps tab open and the Orphan URLs filter selected, listing pages found in the XML sitemap but not reached by internal links, highlighted.', (() => {
  let s = r(0, 0, W, 44, '#2b2b2b') + t(20, 28, 'SEO crawler', { fill: '#fff', bold: true, size: 15 }) + r(180, 8, 520, 28, '#fff', { rx: 3 }) + t(192, 27, 'https://yourdomain.com/') + r(712, 8, 70, 28, '#6dbb45', { rx: 3 }) + t(747, 27, 'Start', { fill: '#fff', anchor: 'middle', bold: true });
  s += r(0, 44, W, 34, '#e9e9e9');
  [['Internal', 20], ['External', 100], ['Response Codes', 182], ['Page Titles', 310], ['Sitemaps', 410]].forEach(([n, x]) => s += t(x, 66, n, { bold: n === 'Sitemaps' }) + (n === 'Sitemaps' ? r(x - 8, 46, 82, 32, '#fff') + t(x, 66, n, { bold: true }) : ''));
  s += t(20, 104, 'Filter:') + select(70, 86, 240, 'Orphan URLs');
  s += r(0, 124, 640, H - 160, '#fff', { stroke: '#d0d0d0' }) + t(16, 148, 'Address', { bold: true }) + t(460, 148, 'Indexability', { bold: true });
  ['/old-offer-page/', '/services/amc-solar-panels/', '/blog/2019-event-photos/', '/landing/diwali-sale/'].forEach((u, i) => { const y = 160 + i * 40; s += `<line x1="0" y1="${y}" x2="640" y2="${y}" stroke="#eee"/>` + t(16, y + 26, 'https://yourdomain.com' + u, { fill: '#2271b1' }) + t(460, y + 26, 'Indexable'); });
  s += r(640, 124, 320, H - 160, '#f7f7f7', { stroke: '#d0d0d0' }) + t(660, 150, 'Overview', { bold: true });
  ['All', 'URLs in Sitemap', 'URLs not in Sitemap', 'Orphan URLs', 'Non-Indexable URLs in Sitemap'].forEach((n, i) => s += t(676, 184 + i * 30, n, { bold: n === 'Orphan URLs', fill: n === 'Orphan URLs' ? '#1d2327' : '#50575e' }));
  return s + mark([66, 84, 248, 32], [380, 400, 'In sitemap, linked from nowhere']) + ring(666, 254, 120, 26, 4);
})());

images['orphan-pages-fix-step-2'] = doc('WordPress block editor link control adding an internal link to an orphan page', 'Illustrated WordPress block editor with a phrase selected in a paragraph and the link popover open, a search for the orphan page typed and the matching page result highlighted.', (() => {
  let s = r(0, 0, W, 60, '#fff', { stroke: '#e0e0e0' }) + r(0, 0, 60, 60, '#1e1e1e') + t(780, 36, 'Save draft') + r(860, 14, 80, 32, '#3858e9', { rx: 2 }) + t(900, 35, 'Update', { fill: '#fff', anchor: 'middle' });
  s += r(0, 60, W, H - 60, '#fff') + t(140, 130, 'Solar panel maintenance tips', { size: 26, bold: true });
  s += t(140, 190, 'Panels lose output when dust builds up. A yearly', { size: 16 }) + r(520, 172, 180, 26, '#cfe2ff') + t(524, 190, 'solar panel AMC', { size: 16 }) + t(650, 190, '', { size: 16 }) + t(140, 218, 'keeps cleaning and checks on a fixed schedule.', { size: 16 });
  s += r(470, 230, 380, 190, '#fff', { rx: 4, stroke: '#1e1e1e' }) + r(486, 246, 348, 36, '#fff', { stroke: '#949494' }) + t(498, 270, 'amc for solar');
  s += r(486, 296, 348, 52, '#f0f0f0') + t(500, 318, 'AMC for solar panels', { bold: true }) + t(500, 338, '/services/amc-solar-panels/', { size: 12, fill: '#757575' }) + t(820, 318, 'Page', { size: 11, fill: '#757575', anchor: 'end' });
  s += t(500, 380, 'Press ENTER to add this link', { size: 12, fill: '#757575' });
  return s + mark([486, 296, 348, 52], [160, 320, 'Link from a related page']);
})());

// regain-website-access-old-developer
images['regain-website-access-old-developer-step-1'] = doc('Domain registrar domain settings with Domain lock and Transfer authorisation (EPP) code', 'Illustrated generic domain registrar Domain settings screen showing the registrant, the Domain lock switch and the Transfer authorisation code (EPP code) with a Show code button, highlighted.', (() => {
  let s = r(0, 0, W, 56, '#fff', { stroke: '#dcdcde' }) + t(24, 35, 'Domain registrar', { size: 17, bold: true }) + t(W - 24, 35, 'My account', { anchor: 'end', fill: '#50575e' });
  s += t(40, 100, 'yourdomain.com', { size: 22, bold: true }) + t(40, 126, 'Domain settings', { fill: '#50575e' });
  const row = (y, k, v, extra = '') => r(40, y, 880, 64, '#fff', { rx: 6, stroke: '#dcdcde' }) + t(64, y + 28, k, { bold: true }) + t(64, y + 48, v, { size: 12.5, fill: '#50575e' }) + extra;
  s += row(146, 'Registrant (owner)', 'The name the domain is registered to. It should be your business.');
  s += row(222, 'Expiry date', 'Turn on auto-renew so the domain never lapses.', toggle(840, 244, true));
  s += row(298, 'Domain lock', 'Turn off only while you transfer the domain.', toggle(840, 320, true));
  s += row(374, 'Transfer authorisation code (EPP code)', 'Needed by the new registrar to move the domain.', btn(800, 390, 'Show code', false, 100));
  return s + mark([46, 304, 870, 140], [360, 470, 'Unlock, then copy the code']);
})());

images['regain-website-access-old-developer-step-2'] = doc('Generic hosting account Users and access screen with owner and old developer access', 'Illustrated generic hosting control panel Account access screen listing the owner and an old developer with full access, with the Remove access action for the developer highlighted.', (() => {
  let s = r(0, 0, W, 56, '#fff', { stroke: '#dcdcde' }) + t(24, 35, 'Hosting account', { size: 17, bold: true });
  s += r(0, 56, 200, H - 56, '#f6f7f9', { stroke: '#dcdcde' });
  ['Websites', 'Domains', 'Email', 'Billing', 'Account access', 'Security'].forEach((n, i) => { const y = 76 + i * 38, on = n === 'Account access'; if (on) s += r(8, y - 4, 184, 32, '#e5ecf6', { rx: 6 }); s += t(24, y + 17, n, { bold: on, fill: on ? '#1a4b8c' : '#36344d' }); });
  s += t(230, 100, 'Account access', { size: 22, bold: true }) + btn(800, 80, 'Invite user', true, 110);
  s += r(230, 124, 706, 260, '#fff', { rx: 8, stroke: '#dcdcde' }) + t(254, 156, 'Name / email', { bold: true, size: 12, fill: '#50575e' }) + t(560, 156, 'Access level', { bold: true, size: 12, fill: '#50575e' });
  [['You (owner)', 'owner@yourbusiness.com', 'Owner', ''], ['Old developer', 'dev@developer-mail.example', 'Full access', 'Remove access'], ['Accountant', 'accounts@yourbusiness.com', 'Billing only', 'Remove access']].forEach(([nm, em, lvl, act], i) => { const y = 170 + i * 68; s += `<line x1="230" y1="${y}" x2="936" y2="${y}" stroke="#eee"/>` + t(254, y + 28, nm, { bold: true }) + t(254, y + 48, em, { size: 12, fill: '#50575e' }) + t(560, y + 38, lvl) + (act ? t(900, y + 38, act, { fill: '#c5221f', anchor: 'end' }) : ''); });
  return s + mark([800, 252, 104, 24], [420, 430, 'Remove once you hold the keys']) + ring(8, 76 + 4 * 38 - 6, 186, 36, 6);
})());

// thank-you-pages-forms
images['thank-you-pages-forms-step-1'] = doc('Form plugin confirmation settings with Show page selected and a Thank You page chosen', 'Illustrated generic WordPress form builder Settings > Confirmations panel with the confirmation type options Message, Show page and Redirect to URL, Show page selected and the Thank You page highlighted.', (() => {
  let s = r(0, 0, W, 50, '#fff', { stroke: '#dcdcde' }) + t(20, 31, 'Form builder: Enquiry form', { size: 16, bold: true }) + r(840, 10, 100, 30, '#2271b1', { rx: 4 }) + t(890, 30, 'Save', { fill: '#fff', anchor: 'middle', bold: true });
  s += r(0, 50, 200, H - 50, '#f6f7f7', { stroke: '#dcdcde' });
  ['General', 'Notifications', 'Confirmations', 'Spam protection'].forEach((n, i) => { const y = 70 + i * 40, on = n === 'Confirmations'; if (on) s += r(0, y - 6, 200, 36, '#e5ecf6'); s += t(20, y + 17, n, { bold: on }); });
  s += t(230, 96, 'Confirmations', { size: 20, bold: true }) + t(230, 140, 'Confirmation type', { bold: true });
  [['Message', false], ['Show page', true], ['Redirect to URL', false]].forEach(([n, on], i) => s += radio(230, 156 + i * 34, on) + t(256, 169 + i * 34, n, { bold: on }));
  s += t(230, 290, 'Confirmation page', { bold: true }) + select(230, 302, 360, 'Thank You (/thank-you/)');
  s += t(230, 370, 'Send visitors to a real page so analytics and ads can count the lead.', { size: 12.5, fill: '#50575e' });
  return s + mark([226, 186, 368, 146], [640, 220, 'Show your thank-you page']) + ring(4, 140, 192, 40, 6);
})());

images['thank-you-pages-forms-step-2'] = doc('Yoast SEO Advanced tab Allow search engines to show this page in search results set to No', 'Illustrated WordPress page editor with the Yoast SEO box open on the Advanced section, where Allow search engines to show this Page in search results? is set to No and highlighted.', (() => {
  let s = r(0, 0, W, 60, '#fff', { stroke: '#e0e0e0' }) + r(0, 0, 60, 60, '#1e1e1e') + t(780, 36, 'Save draft') + r(860, 14, 80, 32, '#3858e9', { rx: 2 }) + t(900, 35, 'Update', { fill: '#fff', anchor: 'middle' });
  s += r(0, 60, W, 150, '#fff') + t(140, 130, 'Thank you', { size: 26, bold: true }) + t(140, 170, "Thanks, we've received your enquiry.", { size: 16 });
  s += r(40, 220, 880, 300, '#fff', { stroke: '#dcdcde' }) + r(40, 220, 880, 40, '#f6f7f7', { stroke: '#dcdcde' }) + t(60, 246, 'Yoast SEO', { bold: true });
  s += t(60, 290, 'SEO', { fill: '#50575e' }) + t(140, 290, 'Readability', { fill: '#50575e' }) + t(260, 290, 'Schema', { fill: '#50575e' }) + t(350, 290, 'Social', { fill: '#50575e' });
  s += t(60, 330, '▾ Advanced', { bold: true }) + t(60, 366, 'Allow search engines to show this Page in search results?', { bold: true }) + select(60, 378, 300, 'No') ;
  s += t(60, 436, 'Should search engines follow links on this Page?', { bold: true }) + radio(60, 448, true) + t(84, 461, 'Yes') + radio(130, 448, false) + t(154, 461, 'No');
  return s + mark([56, 350, 470, 58], [600, 440, 'No = noindex, out of the sitemap']);
})());

// backlink-audit-disavow
images['backlink-audit-disavow-step-1'] = doc('Google Search Console Links report External links Top linking sites', 'Illustrated Google Search Console Links report with the External links column showing Top linked pages, Top linking sites and Top linking text, with Top linking sites and its Export option highlighted.', (() => {
  const g = gsc('Links');
  let s = g.s + t(260, 96, 'Links', { size: 22 }) + r(830, 76, 106, 30, '#fff', { rx: 4, stroke: '#dadce0' }) + t(883, 96, 'EXPORT', { fill: '#1a73e8', bold: true, anchor: 'middle' });
  const card = (x, y, title, rows) => r(x, y, 330, 170, '#fff', { rx: 8, stroke: '#dadce0' }) + t(x + 20, y + 30, title, { size: 14, bold: true }) + rows.map((rw, i) => t(x + 20, y + 62 + i * 26, rw, { size: 12.5, fill: '#3c4043' })).join('') + t(x + 310, y + 156, 'MORE', { fill: '#1a73e8', bold: true, anchor: 'end', size: 12 });
  s += t(260, 132, 'External links', { size: 15, bold: true, fill: '#5f6368' }) + t(606, 132, 'Internal links', { size: 15, bold: true, fill: '#5f6368' });
  s += card(260, 144, 'Top linked pages', ['yourdomain.com/', 'yourdomain.com/services/', 'yourdomain.com/blog/guide/']);
  s += card(260, 330, 'Top linking sites', ['localnews.example', 'industry-association.example', 'supplier.example']);
  s += card(606, 144, 'Top linked pages', ['yourdomain.com/', 'yourdomain.com/contact/', 'yourdomain.com/about/']);
  return s + mark([260, 330, 330, 170], [620, 400, 'Export, then group by domain']) + ring(g.pos[0] - 4, g.pos[1] - 4, g.pos[2] + 8, 38, 19);
})());

images['backlink-audit-disavow-step-2'] = doc('Google disavow links tool Upload disavow list for a Search Console property', 'Illustrated Google Search Console disavow links tool with a domain property selected and the Upload disavow list button highlighted, with a note that a new file replaces the old one.', (() => {
  let s = r(0, 0, W, 56, '#fff', { stroke: '#dadce0' }) + t(24, 35, 'Google Search Console', { size: 17, fill: '#5f6368' });
  s += t(120, 120, 'Disavow links', { size: 24 }) + t(120, 150, 'Select a property to manage its disavowed links.', { fill: '#5f6368' });
  s += r(120, 172, 420, 40, '#fff', { rx: 4, stroke: '#9aa0a6' }) + t(136, 197, 'yourdomain.com (domain property)') + t(520, 197, '▾', { fill: '#5f6368', anchor: 'middle' });
  s += r(120, 240, 720, 180, '#fff', { rx: 8, stroke: '#dadce0' }) + t(144, 276, 'No disavow file has been uploaded for this property.', { size: 14 }) + t(144, 304, 'Upload a .txt file with one domain: entry or URL per line. A new upload replaces the current file.', { size: 12.5, fill: '#5f6368' });
  s += r(144, 336, 190, 38, '#1a73e8', { rx: 4 }) + t(239, 361, 'Upload disavow list', { fill: '#fff', anchor: 'middle', bold: true });
  return s + mark([144, 336, 190, 38], [480, 460, 'Keep a master copy first']);
})());

for (const [name, svg] of Object.entries(images)) {
  fs.writeFileSync(path.join(OUT, name + '.svg'), svg);
  console.log(name + '.svg', svg.length, 'bytes');
}
module.exports = Object.keys(images);
