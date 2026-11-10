(function () {
  var cc = SV.$('waCc'), num = SV.$('waNum'), txt = SV.$('waText'), out = SV.$('waOut'), html = SV.$('waHtml'), msg = SV.$('waMsg');
  var qrBtn = SV.$('waQrBtn'), qrBox = SV.$('waQr'), qrDl = SV.$('waQrDl'), test = SV.$('waTest');
  function link() {
    var n = (cc.value + num.value).replace(/\D/g, '').replace(/^0+/, '');
    var t = txt.value.trim();
    return n ? 'https://wa.me/' + n + (t ? '?text=' + encodeURIComponent(t) : '') : '';
  }
  function update() {
    var l = link(), digits = num.value.replace(/\D/g, '');
    out.value = l; html.value = l ? '<a href="' + l + '" target="_blank" rel="noopener">Chat on WhatsApp</a>' : '';
    test.href = l || '#'; test.hidden = !l;
    msg.textContent = !digits ? 'Enter the WhatsApp number without the country code.' : digits.length < 6 ? 'That number looks too short.' : /^0/.test(digits) ? 'Leave out the leading 0; the country code replaces it.' : 'Link ready. Test it on your phone before you share it.';
    qrBox.innerHTML = ''; qrDl.innerHTML = '';
  }
  qrBtn.addEventListener('click', function () {
    var l = link(); if (!l) { msg.textContent = 'Enter a number first.'; return; }
    qrBtn.disabled = true;
    SV.qr(l, 'M').then(function (q) {
      var c = SV.qrCanvas(q, 512); qrBox.innerHTML = ''; var i = new Image(); i.alt = 'QR code for the WhatsApp link'; i.src = c.toDataURL('image/png'); i.width = 220; i.height = 220; qrBox.appendChild(i);
      SV.toBlob(c, 'image/png').then(function (b) { qrDl.innerHTML = ''; qrDl.appendChild(SV.link(b, 'whatsapp-qr.png', 'Download QR (PNG)')); qrDl.appendChild(SV.link(new Blob([SV.qrSvg(q)], { type: 'image/svg+xml' }), 'whatsapp-qr.svg', 'Download QR (SVG)')); });
    }).catch(function () { msg.textContent = 'The QR code library could not load. Check your connection and try again.'; }).then(function () { qrBtn.disabled = false; });
  });
  [cc, num, txt].forEach(function (el) { el.addEventListener('input', update); el.addEventListener('change', update); });
  update();
})();
