(function () {
  var K = ['ogTitle', 'ogDesc', 'ogUrl', 'ogImg', 'ogSite', 'ogType', 'ogCard', 'ogHandle'], e = {};
  K.forEach(function (k) { e[k] = SV.$(k); });
  var out = SV.$('ogOut'), hints = SV.$('ogHints');
  function at(s) { return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }
  function update() {
    var t = e.ogTitle.value.trim(), d = e.ogDesc.value.trim(), u = e.ogUrl.value.trim(), img = e.ogImg.value.trim(), site = e.ogSite.value.trim(), h = e.ogHandle.value.trim().replace(/^@?/, '@');
    var L = [];
    function p(k, v) { if (v) L.push('<meta property="' + k + '" content="' + at(v) + '">'); }
    function n(k, v) { if (v) L.push('<meta name="' + k + '" content="' + at(v) + '">'); }
    p('og:type', e.ogType.value); p('og:title', t); p('og:description', d); p('og:url', u); p('og:image', img); p('og:site_name', site);
    if (img) p('og:image:alt', t);
    n('twitter:card', e.ogCard.value); n('twitter:title', t); n('twitter:description', d); n('twitter:image', img); if (h.length > 1) n('twitter:site', h);
    out.value = L.join('\n');
    SV.$('ogPvTitle').textContent = t || 'Your page title';
    SV.$('ogPvDesc').textContent = d || 'Your description shows here when the link is shared.';
    var host = ''; try { host = new URL(u).hostname; } catch (x) { host = 'example.com'; }
    SV.$('ogPvHost').textContent = host.toUpperCase();
    var pi = SV.$('ogPvImg'); pi.className = 'og-pv-img' + (e.ogCard.value === 'summary' ? ' og-small' : '');
    if (img && /^https?:\/\//.test(img)) { pi.style.backgroundImage = 'url("' + img.replace(/"/g, '%22') + '")'; pi.textContent = ''; } else { pi.style.backgroundImage = ''; pi.textContent = '1200 x 630 image'; }
    var w = [];
    if (!t) w.push(['warn', 'Add a title.']); else if (t.length > 70) w.push(['warn', 'Long titles get cut off in most share previews. Aim for under about 60 characters.']);
    if (!d) w.push(['warn', 'Add a description.']); else if (d.length > 200) w.push(['warn', 'Long descriptions are usually truncated. Keep the key point early.']);
    if (!img) w.push(['warn', 'Add an image URL. Without one, platforms show a plain text link or guess an image.']); else if (!/^https:\/\//.test(img)) w.push(['warn', 'Use a full https:// image URL. Relative paths do not work for social previews.']);
    if (u && !/^https?:\/\//.test(u)) w.push(['warn', 'og:url should be the full canonical URL.']);
    if (!w.length) w.push(['ok', 'Tags look complete. Recommended image size is 1200x630 px.']);
    hints.innerHTML = ''; w.forEach(function (x) { var li = document.createElement('li'); li.className = x[0]; li.textContent = x[1]; hints.appendChild(li); });
  }
  K.forEach(function (k) { e[k].addEventListener('input', update); e[k].addEventListener('change', update); });
  update();
})();
