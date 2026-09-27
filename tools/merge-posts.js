// Appends new blog post entries (a file containing one or more `{ slug: ..., },` objects,
// in the same format as tools/blog-data.js) to tools/blog-data.js, then validates everything.
// Usage: node tools/merge-posts.js path/to/new-posts.js
const fs = require('fs');
const path = require('path');

const input = process.argv[2];
if (!input) { console.error('Usage: node tools/merge-posts.js <file-with-post-entries>'); process.exit(1); }
const FILE = path.join(__dirname, 'blog-data.js');

let data = fs.readFileSync(FILE, 'utf8');
const addition = fs.readFileSync(input, 'utf8').trimEnd();
const end = data.lastIndexOf('\n];');
if (end < 0) throw new Error('Could not find the end of the array in blog-data.js');
const before = data;
data = data.slice(0, end) + '\n' + addition + data.slice(end);
fs.writeFileSync(FILE, data);

// Validate (and roll back on failure)
try {
  delete require.cache[require.resolve('./blog-data')];
  const posts = require('./blog-data');
  const pages = require('./pages-data').map(p => p.slug);
  const summaries = require('./blog-summaries');
  const slugs = posts.map(p => p.slug);
  const dupes = slugs.filter((s, i) => slugs.indexOf(s) !== i);
  const badRelated = posts.flatMap(p => p.related.filter(s => !pages.includes(s)).map(s => `${p.slug} -> ${s}`));
  const noSummary = posts.filter(p => !summaries[p.slug]).map(p => p.slug);
  const future = posts.filter(p => p.date > new Date().toISOString().slice(0, 10)).map(p => p.slug);
  if (dupes.length || badRelated.length) throw new Error(`duplicates: ${dupes} | bad related: ${badRelated}`);
  console.log(`${posts.length} posts. Missing takeaways: ${noSummary.length ? noSummary.join(', ') : 'none'}. Future dates: ${future.length ? future.join(', ') : 'none'}.`);
} catch (e) {
  fs.writeFileSync(FILE, before);
  console.error('Merge rolled back:', e.message);
  process.exit(1);
}
