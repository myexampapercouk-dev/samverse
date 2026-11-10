// Site-wide quality check on the generated HTML: valid JSON-LD, broken internal links,
// duplicate titles/descriptions, missing or multiple h1s. Exits with code 1 on problems.
// Usage: node tools/check-site.js
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SKIP = ['node_modules', '.git', 'docs', 'tools', 'netlify', '.claude'];
const files = [];
(function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    if (SKIP.includes(f)) continue;
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.html')) files.push(p);
  }
})(ROOT);

// Built from reversed letters so the name itself isn't written in the source.
const NAME = new RegExp('reemas'.split('').reverse().join(''), 'i');
const problems = [];
const titles = {}, descs = {}, ogChecked = {};
for (const f of files) {
  const rel = path.relative(ROOT, f);
  const h = fs.readFileSync(f, 'utf8');
  for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch (e) { problems.push(`invalid JSON-LD: ${rel}`); }
  }
  // Code examples inside <pre> show escaped markup, not real links.
  for (const m of h.replace(/<pre>[\s\S]*?<\/pre>/g, '').matchAll(/href="(\/[^"#?]*)/g)) {
    const u = m[1];
    const target = u.endsWith('/') ? path.join(ROOT, u, 'index.html') : path.join(ROOT, u);
    if (!fs.existsSync(target)) problems.push(`broken link ${u} in ${rel}`);
  }
  // The owner's personal name must never appear on the site; the brand is Samverse.
  if (NAME.test(h)) problems.push(`personal name in ${rel}`);
  if (rel === '404.html') continue;
  const t = (h.match(/<title>(.*?)<\/title>/) || [])[1];
  const d = (h.match(/<meta name="description" content="(.*?)"/) || [])[1];
  (titles[t] = titles[t] || []).push(rel);
  if (d) (descs[d] = descs[d] || []).push(rel);
  // Search results truncate long snippets: keep titles <= 60 and meta descriptions <= 155 characters
  const unesc = s => String(s || '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  if (t && unesc(t).length > 60) problems.push(`title ${unesc(t).length} chars (>60): ${rel}`);
  if (d && unesc(d).length > 155) problems.push(`meta description ${unesc(d).length} chars (>155): ${rel}`);
  if (!/<meta name="twitter:card"/.test(h)) problems.push(`missing twitter:card: ${rel}`);
  // og:image must be a real 1200x630 raster image on this site
  const og = (h.match(/<meta property="og:image" content="https:\/\/samverse\.space(\/[^"]+)"/) || [])[1];
  if (!og) problems.push(`missing or external og:image: ${rel}`);
  else {
    const p = path.join(ROOT, og);
    if (!fs.existsSync(p)) problems.push(`og:image file missing ${og}: ${rel}`);
    else if (!(og in ogChecked)) {
      const b = fs.readFileSync(p);
      ogChecked[og] = b.slice(1, 4).toString() === 'PNG' && b.readUInt32BE(16) === 1200 && b.readUInt32BE(20) === 630;
    }
    if (fs.existsSync(p) && !ogChecked[og]) problems.push(`og:image not a 1200x630 PNG ${og}: ${rel}`);
  }
  const h1 = (h.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) problems.push(`${h1} h1 tags: ${rel}`);
}
for (const f of ['llms.txt', 'blog/feed.xml', 'sitemap.xml', 'site.webmanifest', 'assets/logo.svg']) {
  const p = path.join(ROOT, f);
  if (fs.existsSync(p) && NAME.test(fs.readFileSync(p, 'utf8'))) problems.push(`personal name in ${f}`);
}
for (const [t, list] of Object.entries(titles)) if (list.length > 1) problems.push(`duplicate title "${t}": ${list.join(', ')}`);
for (const [d, list] of Object.entries(descs)) if (list.length > 1) problems.push(`duplicate description: ${list.join(', ')}`);

console.log(`${files.length} pages checked, ${problems.length} problems`);
problems.slice(0, 200).forEach(p => console.log(' - ' + p));
process.exit(problems.length ? 1 : 0);
