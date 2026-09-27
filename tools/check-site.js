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

const problems = [];
const titles = {}, descs = {};
for (const f of files) {
  const rel = path.relative(ROOT, f);
  const h = fs.readFileSync(f, 'utf8');
  for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch (e) { problems.push(`invalid JSON-LD: ${rel}`); }
  }
  for (const m of h.matchAll(/href="(\/[^"#?]*)/g)) {
    const u = m[1];
    const target = u.endsWith('/') ? path.join(ROOT, u, 'index.html') : path.join(ROOT, u);
    if (!fs.existsSync(target)) problems.push(`broken link ${u} in ${rel}`);
  }
  if (rel === '404.html') continue;
  const t = (h.match(/<title>(.*?)<\/title>/) || [])[1];
  const d = (h.match(/<meta name="description" content="(.*?)"/) || [])[1];
  (titles[t] = titles[t] || []).push(rel);
  if (d) (descs[d] = descs[d] || []).push(rel);
  const h1 = (h.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) problems.push(`${h1} h1 tags: ${rel}`);
}
for (const [t, list] of Object.entries(titles)) if (list.length > 1) problems.push(`duplicate title "${t}": ${list.join(', ')}`);
for (const [d, list] of Object.entries(descs)) if (list.length > 1) problems.push(`duplicate description: ${list.join(', ')}`);

console.log(`${files.length} pages checked, ${problems.length} problems`);
problems.slice(0, 30).forEach(p => console.log(' - ' + p));
process.exit(problems.length ? 1 : 0);
