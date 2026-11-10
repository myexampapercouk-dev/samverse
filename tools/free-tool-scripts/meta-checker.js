(function () {
  var t = SV.$('mcTitle'), d = SV.$('mcDesc'), u = SV.$('mcUrl'), dev = SV.$('mcDev'), hints = SV.$('mcHints');
  var pt = SV.$('mcPvTitle'), pd = SV.$('mcPvDesc'), pu = SV.$('mcPvUrl'), box = SV.$('mcPv'), tc = SV.$('mcTc'), dc = SV.$('mcDc');
  var ctx = document.createElement('canvas').getContext('2d');
  // Approximate limits: Google cuts titles by pixel width (commonly cited around 600px on desktop) and descriptions by length.
  var L = { desktop: { tf: '20px Arial', tw: 600, df: '14px Arial', dw: 920, dl: 1 }, mobile: { tf: '18px Arial', tw: 540, df: '14px Arial', dw: 680, dl: 1 } };
  function px(s, f) { ctx.font = f; return Math.round(ctx.measureText(s).width); }
  function cut(s, f, max) {
    if (px(s, f) <= max) return s;
    var lo = 0, hi = s.length;
    while (lo < hi) { var mid = (lo + hi + 1) >> 1; if (px(s.slice(0, mid) + ' ...', f) <= max) lo = mid; else hi = mid - 1; }
    return s.slice(0, lo).replace(/\s+\S*$/, '') + ' ...';
  }
  function update() {
    var c = L[dev.value], title = t.value.trim(), desc = d.value.trim(), tw = px(title, c.tf), dw = px(desc, c.df), lim = c.dw * c.dl;
    box.className = 'serp serp-' + dev.value;
    pt.textContent = cut(title || 'Your page title appears here', c.tf, c.tw);
    pd.textContent = cut(desc || 'Your meta description appears here. Write one or two sentences that tell searchers what they get on the page.', c.df, lim);
    var url = u.value.trim() || 'https://example.com/page/';
    try { var x = new URL(/^https?:/.test(url) ? url : 'https://' + url); pu.textContent = x.hostname + (x.pathname.length > 1 ? ' › ' + x.pathname.split('/').filter(Boolean).join(' › ') : ''); } catch (e) { pu.textContent = url; }
    tc.textContent = title.length + ' characters, about ' + tw + ' of ' + c.tw + ' px';
    dc.textContent = desc.length + ' characters, about ' + dw + ' of ' + lim + ' px';
    var w = [];
    if (!title) w.push(['warn', 'Add a title.']);
    else if (tw > c.tw) w.push(['warn', 'The title is likely to be cut off on ' + dev.value + '. Move the main keyword to the front or shorten it.']);
    else if (title.length < 30) w.push(['warn', 'The title is short. There is room to add the main keyword or your brand.']);
    else w.push(['ok', 'The title should show in full.']);
    if (!desc) w.push(['warn', 'Add a meta description. Without one, Google picks text from the page.']);
    else if (dw > lim) w.push(['warn', 'The description is likely to be truncated. Put the important part in the first sentence.']);
    else if (desc.length < 70) w.push(['warn', 'The description is short. Add a benefit or a call to action.']);
    else w.push(['ok', 'The description length looks good.']);
    w.push(['ok', 'Google may still rewrite titles and descriptions. These checks are close estimates, not guarantees.']);
    hints.innerHTML = ''; w.forEach(function (x) { var li = document.createElement('li'); li.className = x[0]; li.textContent = x[1]; hints.appendChild(li); });
  }
  [t, d, u, dev].forEach(function (el) { el.addEventListener('input', update); el.addEventListener('change', update); });
  update();
})();
