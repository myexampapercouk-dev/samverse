(function () {
  var F = ['source', 'medium', 'campaign', 'id', 'term', 'content'];
  var url = SV.$('utmUrl'), out = SV.$('utmOut'), hints = SV.$('utmHints'), bulk = SV.$('utmBulk'), bout = SV.$('utmBulkOut'), lower = SV.$('utmLower');
  function val(k) { var v = SV.$('utm_' + k).value.trim(); if (lower.checked) v = v.toLowerCase(); return v.replace(/\s+/g, '_'); }
  function build(base) {
    base = base.trim(); if (!base) return '';
    if (!/^https?:\/\//i.test(base)) base = 'https://' + base;
    try { var u = new URL(base); } catch (e) { return ''; }
    if (u.hostname.indexOf('.') < 0 || /%20|\s/.test(u.hostname)) return '';
    F.forEach(function (k) { var v = val(k); u.searchParams.delete('utm_' + k); if (v) u.searchParams.set('utm_' + k, v); });
    return u.toString();
  }
  function update() {
    var w = [], r = build(url.value);
    if (!url.value.trim()) w.push(['warn', 'Enter the page URL people should land on.']);
    else if (!r) w.push(['warn', 'That URL is not valid.']);
    ['source', 'medium', 'campaign'].forEach(function (k) { if (!val(k)) w.push(['warn', 'utm_' + k + ' is recommended so GA4 can report the traffic correctly.']); });
    F.forEach(function (k) { var raw = SV.$('utm_' + k).value; if (/\s/.test(raw.trim())) w.push(['warn', 'Spaces in utm_' + k + ' were replaced with underscores.']); if (!lower.checked && /[A-Z]/.test(raw)) w.push(['warn', 'utm_' + k + ' has capitals. GA4 treats "Facebook" and "facebook" as different sources.']); });
    var m = val('medium'); if (m && ['cpc', 'email', 'social', 'paid_social', 'organic_social', 'referral', 'display', 'affiliate', 'sms', 'qr', 'whatsapp', 'push', 'video'].indexOf(m) < 0) w.push(['warn', 'The medium "' + m + '" may land in the Unassigned channel in GA4. Common values: cpc, email, social, paid_social, referral, display, sms.']);
    if (!w.length) w.push(['ok', 'Link ready.']);
    out.value = r;
    hints.innerHTML = ''; w.forEach(function (x) { var li = document.createElement('li'); li.className = x[0]; li.textContent = x[1]; hints.appendChild(li); });
    bout.value = bulk.value.split(/\r?\n/).filter(function (s) { return s.trim(); }).map(function (s) { return build(s) || ('# invalid URL: ' + s); }).join('\n');
  }
  [url, bulk, lower].concat(F.map(function (k) { return SV.$('utm_' + k); })).forEach(function (el) { el.addEventListener('input', update); el.addEventListener('change', update); });
  update();
})();
