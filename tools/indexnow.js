// Tells Bing, Yandex and other IndexNow search engines about every URL in sitemap.xml.
// Run AFTER deploying, once samverse.space is live:   node tools/indexnow.js
// The key file /d3b5a97e8c31d2a45b6f14873a8a9c52.txt must be reachable on the live site.
const fs = require('fs');
const path = require('path');

const HOST = 'samverse.space';
const KEY = 'd3b5a97e8c31d2a45b6f14873a8a9c52';
const sitemap = fs.readFileSync(path.join(__dirname, '..', 'sitemap.xml'), 'utf8');
const urlList = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);

(async () => {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
  });
  console.log(`Submitted ${urlList.length} URLs → HTTP ${res.status}`, res.status === 200 || res.status === 202 ? '(accepted)' : await res.text());
})();
