(function () {
  var fgT = SV.$('ccFg'), bgT = SV.$('ccBg'), fgP = SV.$('ccFgPick'), bgP = SV.$('ccBgPick'), ratio = SV.$('ccRatio'), res = SV.$('ccRes'), pv = SV.$('ccPv');
  var cin = SV.$('cvIn'), cout = SV.$('cvOut'), cmsg = SV.$('cvMsg'), sw = SV.$('cvSwatch');
  function parse(s) {
    s = String(s).trim().toLowerCase(); var m;
    if ((m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/.exec(s))) { var h = m[1].length === 3 ? m[1].replace(/./g, '$&$&') : m[1]; return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]; }
    if ((m = /^rgba?\(\s*(\d{1,3})[\s,]+(\d{1,3})[\s,]+(\d{1,3})/.exec(s))) return [+m[1], +m[2], +m[3]].map(function (v) { return Math.min(255, v); });
    if ((m = /^hsla?\(\s*(-?[\d.]+)(?:deg)?[\s,]+([\d.]+)%[\s,]+([\d.]+)%/.exec(s))) return hsl2rgb(+m[1], +m[2] / 100, +m[3] / 100);
    return null;
  }
  function hsl2rgb(h, s, l) {
    h = ((h % 360) + 360) % 360; var c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs((h / 60) % 2 - 1)), m = l - c / 2, r = [0, 0, 0];
    r = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
    return r.map(function (v) { return Math.round((v + m) * 255); });
  }
  function rgb2hsl(r, g, b) {
    r /= 255; g /= 255; b /= 255; var mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, h = 0, s = 0, d = mx - mn;
    if (d) { s = d / (1 - Math.abs(2 * l - 1)); h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= 60; if (h < 0) h += 360; }
    return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
  }
  function hex(c) { return '#' + c.map(function (v) { return ('0' + v.toString(16)).slice(-2); }).join(''); }
  function lum(c) { var a = c.map(function (v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }); return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2]; }
  function check() {
    var f = parse(fgT.value), b = parse(bgT.value);
    if (!f || !b) { ratio.textContent = '-'; res.innerHTML = '<li class="warn">Enter colours as HEX (#1a1a2e), rgb(26, 26, 46) or hsl(240, 28%, 14%).</li>'; return; }
    fgP.value = hex(f); bgP.value = hex(b);
    var l1 = lum(f), l2 = lum(b), r = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    ratio.textContent = (Math.floor(r * 100) / 100).toFixed(2) + ' : 1';
    pv.style.color = hex(f); pv.style.background = hex(b);
    res.innerHTML = '';
    [['AA normal text (4.5:1)', 4.5], ['AA large text, 18pt or 14pt bold (3:1)', 3], ['AAA normal text (7:1)', 7], ['AAA large text (4.5:1)', 4.5], ['UI components and icons (3:1)', 3]].forEach(function (x) {
      var li = document.createElement('li'), ok = r >= x[1]; li.className = ok ? 'ok' : 'warn'; li.textContent = (ok ? 'Pass: ' : 'Fail: ') + x[0]; res.appendChild(li);
    });
  }
  fgP.addEventListener('input', function () { fgT.value = fgP.value; check(); });
  bgP.addEventListener('input', function () { bgT.value = bgP.value; check(); });
  fgT.addEventListener('input', check); bgT.addEventListener('input', check);
  SV.$('ccSwap').addEventListener('click', function () { var t = fgT.value; fgT.value = bgT.value; bgT.value = t; check(); });
  function conv() {
    var c = parse(cin.value);
    if (!c) { cout.value = ''; cmsg.textContent = cin.value.trim() ? 'Could not read that colour. Try #7C3AED, rgb(124, 58, 237) or hsl(262, 83%, 58%).' : ''; sw.style.background = 'transparent'; return; }
    var h = rgb2hsl(c[0], c[1], c[2]);
    cout.value = 'HEX: ' + hex(c).toUpperCase() + '\nRGB: rgb(' + c.join(', ') + ')\nHSL: hsl(' + h[0] + ', ' + h[1] + '%, ' + h[2] + '%)';
    cmsg.textContent = ''; sw.style.background = hex(c);
  }
  cin.addEventListener('input', conv);
  check(); conv();
})();
