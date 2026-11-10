(function () {
  var ids = ['rbWp', 'rbSearch', 'rbFeeds', 'rbAi', 'rbBlockAll', 'rbSitemap', 'rbCustom', 'rbAllow'];
  var el = {}; ids.forEach(function (i) { el[i] = SV.$(i); });
  var out = SV.$('rbOut'), hints = SV.$('rbHints');
  function update() {
    var L = ['User-agent: *'], w = [];
    if (el.rbBlockAll.checked) { L.push('Disallow: /'); w.push(['warn', 'Disallow: / blocks search engines from crawling your whole site. Only use it on staging or development sites, never on a live site you want in Google.']); }
    else {
      if (el.rbWp.checked) { L.push('Disallow: /wp-admin/'); L.push('Allow: /wp-admin/admin-ajax.php'); }
      if (el.rbSearch.checked) { L.push('Disallow: /?s='); L.push('Disallow: /search/'); }
      if (el.rbFeeds.checked) L.push('Disallow: /*/feed/');
      el.rbCustom.value.split(/\r?\n/).map(function (s) { return s.trim(); }).filter(Boolean).forEach(function (p) {
        if (p[0] !== '/' && p[0] !== '*') p = '/' + p;
        if (p === '/') { w.push(['warn', 'A custom rule of "/" blocks the whole site. Removed it; tick the block-everything option if you really mean it.']); return; }
        if (/^\/wp-content\/?$|^\/wp-includes\/?$/.test(p)) w.push(['warn', 'Blocking ' + p + ' can stop Google loading your CSS, JavaScript and images, which hurts how it renders your pages.']);
        L.push('Disallow: ' + p);
      });
      el.rbAllow.value.split(/\r?\n/).map(function (s) { return s.trim(); }).filter(Boolean).forEach(function (p) { L.push('Allow: ' + (p[0] === '/' ? p : '/' + p)); });
      if (L.length === 1) L.push('Disallow:');
    }
    if (el.rbAi.checked) ['GPTBot', 'CCBot', 'Google-Extended', 'ClaudeBot', 'PerplexityBot'].forEach(function (b) { L.push('', 'User-agent: ' + b, 'Disallow: /'); });
    var sm = el.rbSitemap.value.trim();
    if (sm) {
      if (!/^https?:\/\//.test(sm)) w.push(['warn', 'The sitemap line needs a full URL starting with https://.']);
      L.push('', 'Sitemap: ' + sm);
    } else w.push(['warn', 'Add your sitemap URL. On WordPress it is usually /wp-sitemap.xml, or /sitemap_index.xml with Yoast or Rank Math.']);
    w.push(['ok', 'robots.txt controls crawling, not indexing. To keep a page out of Google, use a noindex tag and let it be crawled.']);
    out.value = L.join('\n') + '\n';
    hints.innerHTML = ''; w.forEach(function (x) { var li = document.createElement('li'); li.className = x[0]; li.textContent = x[1]; hints.appendChild(li); });
  }
  ids.forEach(function (i) { el[i].addEventListener('input', update); el[i].addEventListener('change', update); });
  update();
})();
