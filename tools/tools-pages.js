// Free browser tools built by tools/build-pages.js (merged into the extra pages).
// Served under /free-tools/ because /tools/ is the build-script folder and is blocked by .htaccess/netlify.toml.
// Everything runs client-side: no uploads, no external APIs, no tracking beyond the site's normal analytics.
const SITE = 'https://samverse.space';
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const HUB = 'free-tools';

const faqHtml = (heading, faqs) => `
    <section class="section">
      <div class="container faq-wrap">
        <div class="section-head"><span class="eyebrow">FAQ</span><h2>${esc(heading)}</h2></div>
        <div class="faq">
${faqs.map(([q, a]) => `          <details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('\n')}
        </div>
      </div>
    </section>`;
const faqSchema = (url, faqs) => ({ '@type': 'FAQPage', '@id': `${url}#faq`, mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
const appSchema = (url, name, description) => ({
  '@type': 'WebApplication', '@id': `${url}#app`, name, url, description,
  applicationCategory: 'DeveloperApplication', operatingSystem: 'Any (runs in the browser)', isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', '@id': `${SITE}/#service`, name: 'Samverse', url: `${SITE}/` },
});
const howTo = (steps, extra = '') => `
    <section class="section" style="padding-top:0">
      <div class="container faq-wrap tool-howto">
        <h2>How to use it</h2>
        <ol>
${steps.map(s => `          <li>${s}</li>`).join('\n')}
        </ol>${extra}
      </div>
    </section>`;

// ---------------------------------------------------------------------------
// 1. Favicon & app icon generator
// ---------------------------------------------------------------------------
const FAV_FAQ = [
  ['Which favicon sizes do I actually need?', 'For most sites: a 32x32 and 16x16 PNG for browser tabs, a 180x180 apple-touch-icon for iPhone and iPad home screens, and 192x192 and 512x512 icons listed in a web app manifest for Android and installable web apps. A 48x48 icon is a safe extra because Google asks for favicons that are a multiple of 48px.'],
  ['Is my image uploaded anywhere?', 'No. The image is read and resized by your own browser using the canvas API. Nothing is sent to a server.'],
  ['Do I still need favicon.ico?', 'Modern browsers use the PNG link tags. Some older tools and crawlers still request /favicon.ico at the site root, so keeping one there is harmless. You can convert the 32x32 or 48x48 PNG with any ICO converter.'],
  ['What image should I start from?', 'A square PNG or SVG of at least 512x512 pixels works best. Use a simple mark or letter rather than a full logo with small text, because it has to stay readable at 16 pixels.'],
  ['How do I add favicons in WordPress?', 'Go to Appearance, Customize, Site Identity and upload a 512x512 square image as the Site Icon. WordPress then outputs the main sizes for you. Use the link tags below only if your theme or a static site needs them added by hand.'],
];
const favMain = `
    <section class="section" style="padding-top:10px">
      <div class="container tool">
        <div class="tool-panel">
          <label class="tool-label" for="favFile">Choose a square image (PNG, JPG, SVG or WebP)</label>
          <input type="file" id="favFile" accept="image/png,image/jpeg,image/svg+xml,image/webp">
          <div class="tool-row">
            <label class="calc-single"><input type="checkbox" id="favPad"> Add padding (10%) around the image</label>
            <label class="calc-single"><input type="checkbox" id="favBg"> Fill transparent areas with</label>
            <input type="color" id="favColor" value="#ffffff" aria-label="Background colour">
          </div>
          <p class="tool-msg" id="favMsg" role="status" aria-live="polite">Your image stays in your browser. Nothing is uploaded.</p>
          <div class="fav-grid" id="favGrid"></div>
        </div>
        <div class="tool-panel">
          <div class="tool-out-head"><h2 class="tool-h">HTML link tags</h2><button type="button" class="btn btn-sm btn-ghost" data-copy="favTags">Copy</button></div>
          <label class="tool-label" for="favTags">Paste inside &lt;head&gt;</label>
          <textarea id="favTags" class="tool-code" rows="7" readonly></textarea>
          <div class="tool-out-head"><h2 class="tool-h">site.webmanifest</h2><button type="button" class="btn btn-sm btn-ghost" data-copy="favManifest">Copy</button></div>
          <label class="tool-label" for="favName">App name for the manifest</label>
          <input type="text" id="favName" class="tool-input" value="My Website">
          <label class="tool-label" for="favManifest">Save as /site.webmanifest</label>
          <textarea id="favManifest" class="tool-code" rows="12" readonly></textarea>
        </div>
      </div>
    </section>
${howTo([
  'Pick a square image, ideally 512x512 pixels or larger. Non-square images are centred and fitted inside the square.',
  'Check the previews, especially the 16px and 32px ones. If the icon is unreadable, simplify it to a single letter or mark.',
  'Download each PNG and upload them to your site root (the same folder as your homepage).',
  'Copy the link tags into your &lt;head&gt; and save the manifest as site.webmanifest in the root.',
], `
        <h3>What each size is for</h3>
        <ul>
          <li><strong>16x16 and 32x32:</strong> browser tabs, bookmarks and history.</li>
          <li><strong>48x48:</strong> Google search results show your favicon next to your URL and ask for a multiple of 48px.</li>
          <li><strong>180x180 (apple-touch-icon):</strong> the icon when someone adds your site to an iPhone or iPad home screen.</li>
          <li><strong>192x192 and 512x512:</strong> Android home screens and installable web apps, listed in the manifest.</li>
        </ul>
        <p>For choosing the image itself, read <a href="/blog/logo-favicon-brand-basics-website/" class="link-inline">logo and favicon basics for your website</a>.</p>`)}
${faqHtml('Favicon questions', FAV_FAQ)}`;
const favScript = `
(function () {
  var SIZES = [[16, 'favicon-16x16.png'], [32, 'favicon-32x32.png'], [48, 'favicon-48x48.png'], [180, 'apple-touch-icon.png'], [192, 'android-chrome-192x192.png'], [512, 'android-chrome-512x512.png']];
  var file = document.getElementById('favFile'), grid = document.getElementById('favGrid'), msg = document.getElementById('favMsg');
  var pad = document.getElementById('favPad'), bg = document.getElementById('favBg'), color = document.getElementById('favColor');
  var tags = document.getElementById('favTags'), man = document.getElementById('favManifest'), nameIn = document.getElementById('favName');
  var img = null;
  function text() {
    function L(rel, sz, f, t) { return '<link rel="' + rel + '"' + (t ? ' type="image/png"' : '') + (sz ? ' sizes="' + sz + '"' : '') + ' href' + '="/' + f + '">'; }
    tags.value = [L('icon', '16x16', 'favicon-16x16.png', 1), L('icon', '32x32', 'favicon-32x32.png', 1), L('icon', '48x48', 'favicon-48x48.png', 1),
      L('apple-touch-icon', '180x180', 'apple-touch-icon.png'), L('manifest', '', 'site.webmanifest')].join('\\n');
    var n = nameIn.value.trim() || 'My Website';
    man.value = JSON.stringify({ name: n, short_name: n.slice(0, 12), icons: [
      { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }],
      theme_color: color.value, background_color: color.value, display: 'standalone' }, null, 2);
  }
  function render() {
    text();
    if (!img) return;
    grid.innerHTML = '';
    SIZES.forEach(function (s) {
      var c = document.createElement('canvas'); c.width = c.height = s[0];
      var x = c.getContext('2d');
      if (bg.checked) { x.fillStyle = color.value; x.fillRect(0, 0, s[0], s[0]); }
      var box = pad.checked ? s[0] * 0.8 : s[0], r = Math.min(box / img.width, box / img.height);
      var w = img.width * r, h = img.height * r;
      x.imageSmoothingQuality = 'high';
      x.drawImage(img, (s[0] - w) / 2, (s[0] - h) / 2, w, h);
      var url = c.toDataURL('image/png');
      var fig = document.createElement('figure'); fig.className = 'fav-item';
      var pv = document.createElement('img'); pv.src = url; pv.alt = s[0] + ' by ' + s[0] + ' preview'; pv.width = Math.min(s[0], 96); pv.height = pv.width;
      var cap = document.createElement('figcaption'); cap.textContent = s[0] + 'x' + s[0];
      var a = document.createElement('a'); a.href = url; a.download = s[1]; a.textContent = 'Download ' + s[1]; a.className = 'link-inline';
      fig.appendChild(pv); fig.appendChild(cap); fig.appendChild(a); grid.appendChild(fig);
    });
  }
  file.addEventListener('change', function () {
    var f = file.files && file.files[0];
    if (!f) return;
    if (!/^image\\//.test(f.type)) { msg.textContent = 'That file is not an image. Choose a PNG, JPG, SVG or WebP.'; return; }
    var rd = new FileReader();
    rd.onload = function () {
      var i = new Image();
      i.onload = function () {
        img = i;
        var w = i.width, h = i.height;
        msg.textContent = (w && h ? 'Loaded ' + w + 'x' + h + 'px. ' : 'Loaded. ') + (w && w !== h ? 'The image is not square, so it is centred inside each icon. ' : '') + (w && w < 512 ? 'It is smaller than 512px, so the largest icons may look soft.' : '');
        render();
      };
      i.onerror = function () { msg.textContent = 'This image could not be read. Try another file.'; };
      i.src = rd.result;
    };
    rd.readAsDataURL(f);
  });
  [pad, bg, color].forEach(function (el) { el.addEventListener('input', render); el.addEventListener('change', render); });
  nameIn.addEventListener('input', text);
  text();
})();`;

// ---------------------------------------------------------------------------
// 2. FAQ schema generator
// ---------------------------------------------------------------------------
const FAQ_FAQ = [
  ['Does FAQ schema still show rich results in Google?', 'Google now shows FAQ rich results mainly for well-known government and health websites, so most sites will not see the expandable answers. The markup is still valid structured data that helps search engines and AI answer tools understand your questions and answers.'],
  ['Where do I paste the JSON-LD?', 'Inside the page that shows the same questions and answers, either in the head or the body, wrapped in the script tag the tool outputs. In WordPress you can use a code snippet plugin, a custom HTML block or your SEO plugin\'s schema settings.'],
  ['Can I use FAQ schema for questions that are not on the page?', 'No. Google\'s guidelines say the questions and answers in the markup must be visible to users on the same page. Hidden or different content can be treated as spammy structured data.'],
  ['Can answers contain links or formatting?', 'Google allows a few basic HTML tags in answers, such as links, lists and bold text. Plain text is the safest choice and is what this tool expects; any HTML you type is escaped so it shows up literally.'],
  ['How do I test the output?', 'Paste the full code into Google\'s Rich Results Test or the Schema Markup Validator. Both are free and show any errors or warnings.'],
];
const faqMain = `
    <section class="section" style="padding-top:10px">
      <div class="container tool">
        <div class="tool-panel">
          <h2 class="tool-h">Questions and answers</h2>
          <div id="qaList" class="qa-list"></div>
          <div class="tool-row">
            <button type="button" class="btn btn-sm" id="qaAdd">Add question</button>
            <button type="button" class="btn btn-sm btn-ghost" id="qaClear">Clear all</button>
          </div>
          <ul class="tool-hints" id="qaHints" aria-live="polite"></ul>
        </div>
        <div class="tool-panel">
          <div class="tool-out-head"><h2 class="tool-h">FAQPage JSON-LD</h2><button type="button" class="btn btn-sm btn-ghost" data-copy="qaOut">Copy</button></div>
          <label class="tool-label" for="qaOut">Paste into the same page as the visible FAQ</label>
          <textarea id="qaOut" class="tool-code" rows="20" readonly></textarea>
        </div>
      </div>
    </section>
${howTo([
  'Type each question exactly as it appears on your page, then its answer in plain text.',
  'Add at least two questions. Remove empty rows or they are left out of the code.',
  'Copy the JSON-LD and paste it into the page that shows those questions.',
  'Test the page in Google\'s Rich Results Test before and after publishing.',
], `
        <p>For which questions to write and how to lay out the page, see <a href="/blog/faq-page-seo/" class="link-inline">how to write an FAQ page that helps SEO</a>. To check your markup, follow <a href="/blog/test-structured-data-rich-results/" class="link-inline">how to test structured data and rich results</a>.</p>`)}
${faqHtml('FAQ schema questions', FAQ_FAQ)}`;
const faqScript = `
(function () {
  var list = document.getElementById('qaList'), out = document.getElementById('qaOut'), hints = document.getElementById('qaHints'), n = 0;
  function row(q, a) {
    n++;
    var d = document.createElement('div'); d.className = 'qa-item';
    d.innerHTML = '<label class="tool-label" for="q' + n + '">Question</label><input type="text" class="tool-input qa-q" id="q' + n + '">' +
      '<label class="tool-label" for="a' + n + '">Answer</label><textarea class="tool-input qa-a" id="a' + n + '" rows="3"></textarea>' +
      '<button type="button" class="qa-del link-inline">Remove</button>';
    d.querySelector('.qa-q').value = q || ''; d.querySelector('.qa-a').value = a || '';
    d.querySelector('.qa-del').addEventListener('click', function () { d.remove(); update(); });
    list.appendChild(d);
  }
  function update() {
    var items = [], warn = [];
    list.querySelectorAll('.qa-item').forEach(function (d, i) {
      var q = d.querySelector('.qa-q').value.trim(), a = d.querySelector('.qa-a').value.trim();
      if (!q && !a) return;
      if (!q || !a) { warn.push('Row ' + (i + 1) + ' needs both a question and an answer.'); return; }
      if (/<[a-z\\/][^>]*>/i.test(a)) warn.push('Row ' + (i + 1) + ': the answer contains HTML. Plain text is safest.');
      if (q.slice(-1) !== '?') warn.push('Row ' + (i + 1) + ': questions usually end with a question mark.');
      items.push({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } });
    });
    var seen = {};
    items.forEach(function (it) { var k = it.name.toLowerCase(); if (seen[k]) warn.push('Duplicate question: "' + it.name + '".'); seen[k] = 1; });
    if (items.length < 2) warn.unshift('Add at least 2 complete questions and answers.');
    var json = JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items }, null, 2).replace(/</g, '\\\\u003c');
    out.value = '<' + 'script type="application/' + 'ld+json">\\n' + json + '\\n</' + 'script>';
    hints.innerHTML = '';
    (warn.length ? warn : ['Looks good. Make sure the same questions and answers are visible on the page.']).forEach(function (w) {
      var li = document.createElement('li'); li.textContent = w; li.className = warn.length ? 'warn' : 'ok'; hints.appendChild(li);
    });
  }
  list.addEventListener('input', update);
  document.getElementById('qaAdd').addEventListener('click', function () { row(); update(); list.lastChild.querySelector('input').focus(); });
  document.getElementById('qaClear').addEventListener('click', function () { list.innerHTML = ''; row(); row(); update(); });
  row('How long does delivery take?', 'Most orders arrive within 3 to 5 working days.');
  row('Can I return an item?', 'Yes. You can return unused items within 14 days of delivery.');
  update();
})();`;

// ---------------------------------------------------------------------------
// 3. Redirect rule generator
// ---------------------------------------------------------------------------
const RED_FAQ = [
  ['Should I use a 301 or a 302 redirect?', 'Use 301 when a page has moved for good, such as after a redesign, a URL change or merging two posts. Use 302 only for temporary moves, like a short promotion or maintenance, when the old URL will come back.'],
  ['Where is the .htaccess file?', 'In the root folder of your site on Apache or LiteSpeed hosting, the same folder that holds wp-config.php on WordPress. It is a hidden file, so turn on "show hidden files" in your file manager. Put redirect rules above the # BEGIN WordPress block.'],
  ['Does this work for Nginx hosting?', 'Yes. Copy the Nginx output into the server block of your site configuration and reload Nginx. On managed hosts without config access, ask support to add the rules or use a redirect plugin.'],
  ['Can I redirect full URLs from another domain?', 'Yes. The tool reduces old full URLs to their path, because a rule on your server only sees the path. New URLs can be full URLs on any domain.'],
  ['How many redirects can I add?', 'Hundreds are fine. Avoid chains (A to B to C) by pointing every old URL straight to its final page, and remove loops where a URL redirects to itself.'],
];
const redMain = `
    <section class="section" style="padding-top:10px">
      <div class="container tool">
        <div class="tool-panel">
          <label class="tool-label" for="redIn">Old and new URLs, one pair per line (old,new)</label>
          <textarea id="redIn" class="tool-code" rows="10" spellcheck="false">/old-page/,/new-page/
/blog/2019/summer-sale/,/offers/
https://example.com/contact-us.html,/contact/</textarea>
          <p class="tool-note">Separate with a comma, tab or space. Paste straight from a spreadsheet.</p>
          <fieldset class="tool-row tool-radios">
            <legend class="tool-label">Redirect type</legend>
            <label class="calc-single"><input type="radio" name="redType" value="301" checked> 301 permanent</label>
            <label class="calc-single"><input type="radio" name="redType" value="302"> 302 temporary</label>
          </fieldset>
          <ul class="tool-hints" id="redHints" aria-live="polite"></ul>
        </div>
        <div class="tool-panel">
          <div class="tool-out-head"><h2 class="tool-h">Apache .htaccess</h2><button type="button" class="btn btn-sm btn-ghost" data-copy="redApache">Copy</button></div>
          <label class="tool-label" for="redApache">Add above # BEGIN WordPress</label>
          <textarea id="redApache" class="tool-code" rows="8" readonly></textarea>
          <div class="tool-out-head"><h2 class="tool-h">Nginx</h2><button type="button" class="btn btn-sm btn-ghost" data-copy="redNginx">Copy</button></div>
          <label class="tool-label" for="redNginx">Add inside the server { } block</label>
          <textarea id="redNginx" class="tool-code" rows="8" readonly></textarea>
          <div class="tool-out-head"><h2 class="tool-h">Redirection plugin CSV</h2><button type="button" class="btn btn-sm btn-ghost" data-copy="redCsv">Copy</button></div>
          <label class="tool-label" for="redCsv">WordPress: Tools, Redirection, Import/Export</label>
          <textarea id="redCsv" class="tool-code" rows="6" readonly></textarea>
        </div>
      </div>
    </section>
${howTo([
  'List each old URL and the page it should go to, one pair per line.',
  'Choose 301 for permanent moves (almost always) or 302 for temporary ones.',
  'Copy the rules for your server: .htaccess for Apache or LiteSpeed (most shared hosting), Nginx for VPS or Nginx hosts.',
  'On WordPress you can skip server files: save the CSV output as a .csv file and import it in the free Redirection plugin.',
  'Back up .htaccess first, then test each old URL in a private window after saving.',
], `
        <p>Not sure which code to use? Read <a href="/blog/301-vs-302-redirects/" class="link-inline">301 vs 302 redirects explained</a>.</p>`)}
${faqHtml('Redirect questions', RED_FAQ)}`;
const redScript = `
(function () {
  var inp = document.getElementById('redIn'), hints = document.getElementById('redHints');
  var ap = document.getElementById('redApache'), ng = document.getElementById('redNginx'), csv = document.getElementById('redCsv');
  function path(u) {
    u = u.trim();
    if (/^https?:\\/\\//i.test(u)) { try { var p = new URL(u); return p.pathname + p.search; } catch (e) { return null; } }
    if (u.charAt(0) !== '/') u = '/' + u;
    return u;
  }
  function target(u) { u = u.trim(); if (/^https?:\\/\\//i.test(u)) return u; return u.charAt(0) === '/' ? u : '/' + u; }
  function rx(s) { return s.replace(/[.*+?^$()|[\\]\\\\{}]/g, '\\\\$&'); }
  function update() {
    var code = document.querySelector('input[name=redType]:checked').value, a = [], n = [], c = ['source,target,regex,code'], warn = [], seen = {};
    inp.value.split(/\\r?\\n/).forEach(function (line, i) {
      line = line.trim();
      if (!line || line.charAt(0) === '#') return;
      var parts = line.split(/\\s*[,\\t]\\s*|\\s+/).filter(Boolean);
      if (parts.length < 2) { warn.push('Line ' + (i + 1) + ' needs an old and a new URL.'); return; }
      var from = path(parts[0]), to = target(parts[1]);
      if (!from) { warn.push('Line ' + (i + 1) + ': the old URL is not valid.'); return; }
      if (from === '/') warn.push('Line ' + (i + 1) + ': redirecting the homepage sends every visitor away. Check this is intended.');
      if (from === to || from.replace(/\\/$/, '') === to.replace(/\\/$/, '')) { warn.push('Line ' + (i + 1) + ' redirects a URL to itself and would loop. Skipped.'); return; }
      if (seen[from]) warn.push('Line ' + (i + 1) + ': ' + from + ' is listed twice. Only the first rule will run.');
      seen[from] = 1;
      var q = from.indexOf('?'), p = q < 0 ? from : from.slice(0, q), qs = q < 0 ? '' : from.slice(q + 1);
      var pat = '^' + rx(p.slice(1).replace(/\\/$/, '')) + '/?$';
      if (qs) a.push('RewriteCond %{QUERY_STRING} ^' + rx(qs) + '$');
      a.push('RewriteRule ' + pat + ' ' + to + (qs && to.indexOf('?') < 0 ? '?' : '') + ' [R=' + code + ',L]');
      n.push(qs ? '# ' + from + ' (query strings need an if ($args) check)\\nlocation = ' + p + ' { if ($args = "' + qs + '") { return ' + code + ' ' + to + '; } }'
        : 'location ~ ^' + rx(p.replace(/\\/$/, '')) + '/?$ { return ' + code + ' ' + to + '; }');
      c.push('"' + from.replace(/"/g, '""') + '","' + to.replace(/"/g, '""') + '",0,' + code);
    });
    ap.value = a.length ? '<IfModule mod_rewrite.c>\\nRewriteEngine On\\n' + a.join('\\n') + '\\n</IfModule>' : '';
    ng.value = n.join('\\n');
    csv.value = c.length > 1 ? c.join('\\n') : '';
    hints.innerHTML = '';
    var targets = {};
    inp.value.split(/\\r?\\n/).forEach(function (l) { var p = l.trim().split(/\\s*[,\\t]\\s*|\\s+/); if (p[1]) targets[target(p[1])] = 1; });
    Object.keys(seen).forEach(function (f) { if (targets[f]) warn.push(f + ' is both an old and a new URL. Point old URLs straight to the final page to avoid a redirect chain.'); });
    (warn.length ? warn : [a.length + ' rule' + (a.length === 1 ? '' : 's') + ' ready.']).forEach(function (w) {
      var li = document.createElement('li'); li.textContent = w; li.className = warn.length ? 'warn' : 'ok'; hints.appendChild(li);
    });
  }
  inp.addEventListener('input', update);
  document.querySelectorAll('input[name=redType]').forEach(function (r) { r.addEventListener('change', update); });
  update();
})();`;

// Shared copy-button behaviour, appended to every tool script
const copyScript = `
document.querySelectorAll('[data-copy]').forEach(function (b) {
  b.addEventListener('click', function () {
    var t = document.getElementById(b.getAttribute('data-copy')), old = b.textContent;
    function done() { b.textContent = 'Copied'; setTimeout(function () { b.textContent = old; }, 1500); }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(t.value).then(done, function () { t.select(); document.execCommand('copy'); done(); });
    else { t.select(); document.execCommand('copy'); done(); }
  });
});`;

const TOOLS = [
  {
    cat: 'Image tools', slug: `${HUB}/favicon-size-checker`, name: 'Favicon & App Icon Generator', crumb: 'Favicon Generator',
    title: 'Favicon & App Icon Size Generator (Free) | Samverse',
    description: 'Make favicons in every size from one image: 16, 32, 48, 180 apple-touch-icon, 192 and 512 PNGs, plus link tags and a webmanifest. Runs in your browser.',
    blurb: 'Turn one square image into favicon and app icon PNGs at 16, 32, 48, 180, 192 and 512 pixels, with the link tags and web manifest to copy.',
    eyebrow: 'Free tool', h1: 'Favicon and app icon size generator',
    lead: 'Upload one image and get every favicon size a modern site needs, ready to download, plus the exact HTML and site.webmanifest to paste. It all happens in your browser.',
    main: favMain, script: favScript + '\n' + copyScript, faqs: FAV_FAQ,
  },
  {
    cat: 'SEO tools', slug: `${HUB}/faq-schema-generator`, name: 'FAQ Schema Generator', crumb: 'FAQ Schema Generator',
    title: 'FAQ Schema Generator: Free FAQPage JSON-LD | Samverse',
    description: 'Free FAQPage JSON-LD generator. Add questions and answers, get valid schema markup live with validation hints, and copy it into your page.',
    blurb: 'Add your questions and answers and copy valid FAQPage JSON-LD, with hints for missing answers, duplicates and HTML.',
    eyebrow: 'Free tool', h1: 'FAQ schema generator (FAQPage JSON-LD)',
    lead: 'Type your questions and answers and the FAQPage structured data updates as you go. Copy it, paste it into the page that shows the same FAQ, and test it.',
    main: faqMain, script: faqScript + '\n' + copyScript, faqs: FAQ_FAQ,
  },
  {
    cat: 'Developer tools', slug: `${HUB}/redirect-htaccess-generator`, name: 'Redirect Generator (.htaccess & Nginx)', crumb: 'Redirect Generator',
    title: '301 Redirect Generator for .htaccess & Nginx | Samverse',
    description: 'Paste old and new URLs and get 301 or 302 redirect rules for Apache .htaccess, Nginx and a CSV for the WordPress Redirection plugin. Free.',
    blurb: 'Bulk-paste old and new URLs and get 301 or 302 rules for Apache .htaccess, Nginx and the WordPress Redirection plugin, with loop and chain checks.',
    eyebrow: 'Free tool', h1: '301 and 302 redirect generator for .htaccess and Nginx',
    lead: 'Paste your old and new URLs, pick 301 or 302, and copy ready-made rules for Apache, Nginx or the WordPress Redirection plugin. The tool flags loops, duplicates and chains.',
    main: redMain, script: redScript + '\n' + copyScript, faqs: RED_FAQ,
  },
  ...require('./tools-pages-more')({ esc, howTo, faqHtml, HUB }),
];
const CATS = ['Image tools', 'SEO tools', 'Marketing tools', 'Developer tools'];

const HUB_FAQ = [
  ['Are these tools free?', 'Yes. They are free to use with no sign-up, and they run entirely in your browser, so nothing you enter is sent to a server.'],
  ['Can I link to these tools?', 'Yes. Feel free to link to any tool page from your own guides, documentation or resource lists.'],
  ['Do the tools work for WordPress sites?', 'Yes. Each tool explains the WordPress route as well as the manual one, such as the Site Icon setting for favicons and the Redirection plugin for redirects.'],
];

module.exports = [
  {
    slug: HUB, crumb: 'Free Tools',
    title: 'Free Website Tools: Image, SEO & Marketing | Samverse',
    description: 'Free browser-based tools: background remover, image converter and compressor, meta tag checker, robots.txt, UTM, QR code and WhatsApp link generators.',
    eyebrow: 'Free tools', h1: 'Free website tools',
    lead: 'Practical image, SEO, marketing and developer tools for site owners. No sign-up, and nothing is uploaded: each tool runs 100% in your browser.',
    priority: '0.7',
    main: `
    <section class="section" style="padding-top:10px">
      <div class="container">
${CATS.map(c => `        <h2 class="tool-cat">${c}</h2>
        <div class="tool-cards">
${TOOLS.filter(t => t.cat === c).map(t => `          <a class="post-card" href="/${t.slug}/"><span class="work-tag">Free tool</span><h3>${esc(t.name)}</h3><p>${esc(t.blurb)}</p><span class="post-card-meta">Open tool →</span></a>`).join('\n')}
        </div>`).join('\n')}
      </div>
    </section>
${faqHtml('About these tools', HUB_FAQ)}`,
    script: '',
    schema: url => [
      { '@type': 'CollectionPage', '@id': `${url}#page`, name: 'Free Website Tools', url,
        mainEntity: { '@type': 'ItemList', numberOfItems: TOOLS.length, itemListElement: TOOLS.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, url: `${SITE}/${t.slug}/` })) } },
      faqSchema(url, HUB_FAQ),
    ],
  },
  ...TOOLS.map(t => ({
    slug: t.slug, crumb: t.crumb, parent: ['Free Tools', `/${HUB}/`],
    title: t.title, description: t.description, eyebrow: t.eyebrow, h1: t.h1, lead: t.lead, priority: '0.7',
    main: t.main + `
    <section class="section" style="padding-top:0"><div class="container faq-wrap"><p class="related-all">More ${t.cat.toLowerCase()}: ${TOOLS.filter(o => o !== t && o.cat === t.cat).map(o => `<a href="/${o.slug}/" class="link-inline">${esc(o.name)}</a>`).join(', ')}, or see <a href="/${HUB}/" class="link-inline">all free tools</a>.</p></div></section>`,
    script: t.script,
    schema: url => [appSchema(url, t.name, t.description), faqSchema(url, t.faqs)],
  })),
];
