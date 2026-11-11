// Counts internal inbound links (from distinct indexed pages) for every indexed page in sitemap.xml.
// Usage: node tools/check-inbound.js [min=3] [--to /path/]  (exit 1 if any page is below min)
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..'), MIN = +process.argv[2] || 3;
const locs = [...fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8').matchAll(/<loc>https:\/\/samverse\.space(\/[^<]*)<\/loc>/g)].map(m => m[1]);
const indexed = new Set(locs);
const inbound = Object.fromEntries(locs.map(u => [u, new Set()]));
for (const from of locs) {
  const f = path.join(ROOT, from, 'index.html');
  if (!fs.existsSync(f)) continue;
  const html = fs.readFileSync(f, 'utf8');
  for (const m of html.matchAll(/<a\b[^>]*href="(?:https:\/\/samverse\.space)?(\/[^"#?]*)/g)) {
    let to = m[1]; if (!to.endsWith('/') && !/\.\w+$/.test(to)) to += '/';
    if (to !== from && indexed.has(to)) inbound[to].add(from);
  }
}
const ti = process.argv.indexOf('--to');
if (ti > 0) { const t = process.argv[ti + 1]; console.log((inbound[t] ? inbound[t].size : 'n/a'), t); }
const weak = locs.filter(u => inbound[u].size < MIN).sort((a, b) => inbound[a].size - inbound[b].size);
for (const u of weak) console.log(inbound[u].size, u);
console.log(`${locs.length} indexed pages, ${weak.length} with fewer than ${MIN} inbound links`);
process.exitCode = weak.length ? 1 : 0;
