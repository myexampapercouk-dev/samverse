(function () {
  var type = SV.$('qrType'), msg = SV.$('qrMsg'), box = SV.$('qrBox'), dl = SV.$('qrDl'), size = SV.$('qrSize'), ecl = SV.$('qrEcl'), fg = SV.$('qrFg'), bg = SV.$('qrBg');
  var groups = document.querySelectorAll('[data-qr]'), timer = null;
  function v(id) { return SV.$(id).value.trim(); }
  function wesc(s) { return s.replace(/([\\;,:"])/g, '\\$1'); }
  function payload() {
    var t = type.value;
    if (t === 'url') { var u = v('qrUrl'); return u ? (/^[a-z]+:/i.test(u) ? u : 'https://' + u) : ''; }
    if (t === 'text') return SV.$('qrText').value;
    if (t === 'wifi') { var s = v('qrSsid'); if (!s) return ''; var enc = SV.$('qrEnc').value; return 'WIFI:T:' + enc + ';S:' + wesc(s) + ';' + (enc !== 'nopass' ? 'P:' + wesc(SV.$('qrPass').value) + ';' : '') + (SV.$('qrHidden').checked ? 'H:true;' : '') + ';'; }
    var fn = v('qrFn'), ln = v('qrLn'); if (!fn && !ln) return '';
    var L = ['BEGIN:VCARD', 'VERSION:3.0', 'N:' + ln + ';' + fn + ';;;', 'FN:' + (fn + ' ' + ln).trim()];
    if (v('qrOrg')) L.push('ORG:' + v('qrOrg')); if (v('qrTel')) L.push('TEL;TYPE=CELL:' + v('qrTel')); if (v('qrEmail')) L.push('EMAIL:' + v('qrEmail')); if (v('qrWeb')) L.push('URL:' + v('qrWeb'));
    L.push('END:VCARD'); return L.join('\n');
  }
  function show() {
    groups.forEach(function (g) { g.hidden = g.getAttribute('data-qr') !== type.value; });
    var p = payload(); box.innerHTML = ''; dl.innerHTML = '';
    if (!p) { msg.textContent = 'Fill in the fields to create your QR code.'; return; }
    SV.qr(p, ecl.value).then(function (q) {
      var c = SV.qrCanvas(q, +size.value, fg.value, bg.value), i = new Image();
      i.alt = 'Generated QR code'; i.src = c.toDataURL('image/png'); i.width = 240; i.height = 240; box.appendChild(i);
      msg.textContent = 'QR code ready (' + c.width + 'x' + c.width + ' px). Scan it with your phone camera to test before printing.';
      SV.toBlob(c, 'image/png').then(function (b) { dl.innerHTML = ''; dl.appendChild(SV.link(b, 'qr-code.png', 'Download PNG')); dl.appendChild(SV.link(new Blob([SV.qrSvg(q, fg.value, bg.value)], { type: 'image/svg+xml' }), 'qr-code.svg', 'Download SVG')); });
    }).catch(function (e) { msg.textContent = /overflow|too long|length/i.test(String(e && e.message || e)) ? 'That is too much data for one QR code. Shorten it.' : 'The QR code library could not load. Check your connection and try again.'; });
  }
  function later() { clearTimeout(timer); timer = setTimeout(show, 250); }
  document.querySelectorAll('.qr-tool input, .qr-tool select, .qr-tool textarea').forEach(function (el) { el.addEventListener('input', later); el.addEventListener('change', later); });
  show();
})();
