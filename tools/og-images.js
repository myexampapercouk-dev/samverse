// Generates a branded 1200x630 social share image for every article, landing page,
// case study and extra page into /assets/og/. Pages without one fall back to /assets/og-image.png.
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

// Greedy word wrap by approximate character width
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

const svgFor = (label, title) => {
  let size = 64, maxChars = 30, lines = wrap(title, maxChars);
  if (lines.length > 3) { size = 54; maxChars = 36; lines = wrap(title, maxChars); }
  if (lines.length > 4) { lines = lines.slice(0, 4); lines[3] = lines[3].replace(/\s*\S*$/, '') + '…'; }
  const lineH = Math.round(size * 1.18);
  // Label sits at a fixed position under the logo; the title starts just below it
  const labelY = 205;
  const top = labelY + 26 + size;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" font-family="Segoe UI, Arial, sans-serif">
  <rect width="1200" height="630" fill="#F7F7FC"/>
  <circle cx="1120" cy="70" r="230" fill="#EEEAFF"/>
  <rect x="0" y="0" width="14" height="630" fill="#6D4AFF"/>
  <g transform="translate(80 64) scale(1.1)">${mark}</g>
  <text x="170" y="112" font-size="30" font-weight="700" fill="#14142B">sam<tspan fill="#6D4AFF">verse</tspan></text>
  <text x="80" y="${labelY}" font-size="24" font-weight="700" fill="#0E7490" letter-spacing="3">${xml(label.toUpperCase())}</text>
  ${lines.map((l, i) => `<text x="80" y="${top + i * lineH}" font-size="${size}" font-weight="700" fill="#14142B" letter-spacing="-1">${xml(l)}</text>`).join('\n  ')}
  <rect x="80" y="540" width="1040" height="2" fill="#E3E0F5"/>
  <text x="80" y="585" font-size="26" fill="#5B5B7A">Sameer Gupta · Freelance WordPress Developer</text>
  <text x="1120" y="585" font-size="26" font-weight="700" fill="#6D4AFF" text-anchor="end">samverse.space</text>
</svg>`;
};

const jobs = [
  ...POSTS.map(p => [`blog-${p.slug}`, p.category, p.title]),
  ...PAGES.map(p => [`page-${p.slug}`, p.type === 'industry' ? 'Industry' : 'Service', plain(p.h1)]),
  ...WORK.map(w => [`work-${w.slug}`, `Case study · ${w.industry}`, `${w.name} website`]),
  ...EXTRA.map(x => [`extra-${x.slug}`, x.eyebrow, plain(x.h1)]),
];

(async () => {
  let made = 0, bytes = 0;
  for (const [key, label, title] of jobs) {
    const file = path.join(OUT, `${key}.png`);
    await sharp(Buffer.from(svgFor(label, title))).png({ palette: true, quality: 90, compressionLevel: 9 }).toFile(file);
    bytes += fs.statSync(file).size;
    made++;
  }
  console.log(`og images: ${made} files, ${(bytes / 1024 / 1024).toFixed(1)} MB total`);
})();
