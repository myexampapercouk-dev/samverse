// Generates a branded 1200x630 cover image for every article, landing page, case study and
// extra page into /assets/og/ — PNG (for social sharing) and WebP (for on-page covers/thumbnails).
// Each topic gets its own colour and icon. Pages without an image fall back to /assets/og-image.png.
// Setup once:  cd tools && npm install
// Run:         node tools/og-images.js   (then node tools/build-pages.js)
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'assets', 'og');
fs.mkdirSync(OUT, { recursive: true });

const PAGES = require('./pages-data');
const POSTS = require('./blog-data');
const WORK = require('./work-data');
const EXTRA = require('./extra-pages');

const xml = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const plain = s => String(s).replace(/<[^>]+>/g, '');

// Material-style 24x24 icon paths
const ICONS = {
  book: 'M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z',
  bolt: 'M13 2L3 14h7l-1 8 10-12h-7l1-8z',
  shield: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z',
  wrench: 'M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z',
  building: 'M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z',
  cart: 'M7 18a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4zM1 2h3.3l.9 2H21a1 1 0 01.9 1.4l-3.6 6.5A2 2 0 0116.6 13H8.1l-1.1 2H19v2H7a2 2 0 01-1.7-3l1.4-2.5L3 4H1V2z',
  chart: 'M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z',
  search: 'M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
  people: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
  briefcase: 'M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 0h-4V4h4v2z',
  monitor: 'M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z',
  spark: 'M12 1l2.6 7.4L22 11l-7.4 2.6L12 21l-2.6-7.4L2 11l7.4-2.6z',
  rupee: null, // drawn as a ₹ glyph
};

// Topic → [accent colour, soft background, icon]
const THEMES = {
  Pricing: ['#059669', '#E7F7F0', 'rupee'],
  Guides: ['#6D4AFF', '#EEEAFF', 'book'],
  Speed: ['#EA580C', '#FDEEE4', 'bolt'],
  Security: ['#DC2626', '#FCE9E9', 'shield'],
  Maintenance: ['#0E7490', '#E3F3F6', 'wrench'],
  Industries: ['#2563EB', '#E6EEFD', 'building'],
  'E-commerce': ['#DB2777', '#FCE8F2', 'cart'],
  Growth: ['#16A34A', '#E7F6EC', 'chart'],
  SEO: ['#7C3AED', '#F0E9FD', 'search'],
  Agencies: ['#0891B2', '#E2F4F8', 'people'],
  Service: ['#6D4AFF', '#EEEAFF', 'briefcase'],
  Industry: ['#2563EB', '#E6EEFD', 'building'],
  'Case study': ['#334155', '#EAEEF3', 'monitor'],
  Extra: ['#6D4AFF', '#EEEAFF', 'spark'],
};

// Greedy word wrap by approximate character count
const wrap = (text, maxChars) => {
  const lines = [];
  let line = '';
  for (const word of text.split(/\s+/)) {
    if ((line + ' ' + word).trim().length > maxChars && line) { lines.push(line); line = word; }
    else line = (line + ' ' + word).trim();
  }
  if (line) lines.push(line);
  return lines;
};

const mark = `<rect width="64" height="64" rx="18" fill="#6D4AFF"/>
  <path d="M42 21H27.5a6.5 6.5 0 0 0 0 13h9a6.5 6.5 0 0 1 0 13H22" fill="none" stroke="#FFFFFF" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M50 6.5Q51 12 56.5 13Q51 14 50 19.5Q49 14 43.5 13Q49 12 50 6.5Z" fill="#7DF0FF"/>`;

const svgFor = (theme, label, title) => {
  const [accent, soft, iconName] = THEMES[theme] || THEMES.Guides;
  let size = 56, maxChars = 21, lines = wrap(title, maxChars);
  if (lines.length > 4) { size = 46; maxChars = 26; lines = wrap(title, maxChars); }
  if (lines.length > 5) { lines = lines.slice(0, 5); lines[4] = lines[4].replace(/\s*\S*$/, '') + '…'; }
  const lineH = Math.round(size * 1.2);
  const labelY = 205;
  const top = labelY + 24 + size;
  const icon = iconName === 'rupee'
    ? `<text x="960" y="400" font-size="250" font-weight="700" fill="#FFFFFF" text-anchor="middle">₹</text>`
    : `<g transform="translate(840 195) scale(10)"><path d="${ICONS[iconName]}" fill="#FFFFFF"/></g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" font-family="Segoe UI, Arial, sans-serif">
  <rect width="1200" height="630" fill="#F7F7FC"/>
  <rect x="740" y="0" width="460" height="630" fill="${soft}"/>
  <circle cx="1140" cy="60" r="120" fill="${accent}" opacity=".10"/>
  <circle cx="780" cy="600" r="90" fill="${accent}" opacity=".08"/>
  <circle cx="960" cy="315" r="190" fill="${accent}"/>
  ${icon}
  <rect x="0" y="0" width="14" height="630" fill="${accent}"/>
  <g transform="translate(80 64) scale(1.1)">${mark}</g>
  <text x="170" y="112" font-size="30" font-weight="700" fill="#14142B">sam<tspan fill="#6D4AFF">verse</tspan></text>
  <text x="80" y="${labelY}" font-size="22" font-weight="700" fill="${accent}" letter-spacing="3">${xml(label.toUpperCase())}</text>
  ${lines.map((l, i) => `<text x="80" y="${top + i * lineH}" font-size="${size}" font-weight="700" fill="#14142B" letter-spacing="-1">${xml(l)}</text>`).join('\n  ')}
  <text x="80" y="585" font-size="24" fill="#5B5B7A">Sameer Gupta · samverse.space</text>
</svg>`;
};

const jobs = [
  ...POSTS.map(p => [`blog-${p.slug}`, p.category, p.category, p.seoTitle || p.title]),
  ...PAGES.map(p => [`page-${p.slug}`, p.type === 'industry' ? 'Industry' : 'Service', p.type === 'industry' ? 'Industry' : 'Service', plain(p.h1)]),
  ...WORK.map(w => [`work-${w.slug}`, 'Case study', `Case study · ${w.industry}`, `${w.name} website`]),
  ...EXTRA.map(x => [`extra-${x.slug}`, 'Extra', x.eyebrow, plain(x.h1)]),
];

// Only regenerate images whose content changed (tracked in a manifest of SVG hashes).
// Run with --force to rebuild everything (e.g. after changing the design above).
const crypto = require('crypto');
const MANIFEST = path.join(OUT, 'manifest.json');
const FORCE = process.argv.includes('--force');

(async () => {
  let manifest = {};
  try { manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8')); } catch (e) { /* first run */ }
  let made = 0, skipped = 0;
  for (const [key, theme, label, title] of jobs) {
    const svgText = svgFor(theme, label, title);
    const hash = crypto.createHash('sha1').update(svgText).digest('hex');
    const png = path.join(OUT, `${key}.png`);
    const webp = path.join(OUT, `${key}.webp`);
    if (!FORCE && manifest[key] === hash && fs.existsSync(png) && fs.existsSync(webp)) { skipped++; continue; }
    const svg = Buffer.from(svgText);
    await sharp(svg).png({ palette: true, quality: 90, compressionLevel: 9 }).toFile(png);
    await sharp(svg).webp({ quality: 82 }).toFile(webp);
    manifest[key] = hash;
    made++;
  }
  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 1));
  console.log(`cover images: ${made} generated, ${skipped} unchanged (${jobs.length} pages)`);
})();
