(function () {
  var file = SV.$('rzFile'), preset = SV.$('rzPreset'), W = SV.$('rzW'), H = SV.$('rzH'), keep = SV.$('rzKeep'), mode = SV.$('rzMode');
  var bg = SV.$('rzBg'), fmt = SV.$('rzFmt'), msg = SV.$('rzMsg'), out = SV.$('rzOut'), dl = SV.$('rzDl'), img = null, name = 'image';
  function ratio() { return img ? img.naturalHeight / img.naturalWidth : 1; }
  function render() {
    if (!img) return;
    var w = parseInt(W.value, 10), h = parseInt(H.value, 10);
    if (!(w > 0 && h > 0) || w > 8000 || h > 8000) { msg.textContent = 'Enter a width and height between 1 and 8000 pixels.'; return; }
    var c = document.createElement('canvas'); c.width = w; c.height = h; var x = c.getContext('2d'), iw = img.naturalWidth, ih = img.naturalHeight;
    x.imageSmoothingQuality = 'high';
    if (fmt.value === 'image/jpeg' || mode.value === 'fit') { x.fillStyle = bg.value; x.fillRect(0, 0, w, h); }
    if (mode.value === 'crop') {
      var s = Math.max(w / iw, h / ih), sw = w / s, sh = h / s;
      x.drawImage(img, (iw - sw) / 2, (ih - sh) / 2, sw, sh, 0, 0, w, h);
    } else if (mode.value === 'fit') {
      var r = Math.min(w / iw, h / ih), dw = iw * r, dh = ih * r;
      x.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
    } else x.drawImage(img, 0, 0, w, h);
    out.innerHTML = ''; var pv = new Image(); pv.alt = 'Resized preview, ' + w + ' by ' + h; pv.src = c.toDataURL('image/png'); out.appendChild(pv);
    SV.toBlob(c, fmt.value, 0.9).then(function (b) {
      dl.innerHTML = ''; dl.appendChild(SV.link(b, name + '-' + w + 'x' + h + '.' + SV.ext[fmt.value], 'Download ' + w + 'x' + h + ' (' + SV.bytes(b.size) + ')'));
      msg.textContent = 'Original ' + iw + 'x' + ih + 'px. Output ' + w + 'x' + h + 'px.' + (w > iw || h > ih ? ' Note: this enlarges the image, so it may look soft.' : '');
    });
  }
  preset.addEventListener('change', function () {
    if (!preset.value) return; var p = preset.value.split('x'); W.value = p[0]; H.value = p[1]; mode.value = 'crop'; render();
  });
  W.addEventListener('input', function () { if (keep.checked && img && mode.value === 'stretch') H.value = Math.round(W.value * ratio()); preset.value = ''; render(); });
  H.addEventListener('input', function () { if (keep.checked && img && mode.value === 'stretch') W.value = Math.round(H.value / ratio()); preset.value = ''; render(); });
  [keep, mode, bg, fmt].forEach(function (el) { el.addEventListener('change', render); });
  file.addEventListener('change', function () {
    var f = file.files && file.files[0]; if (!f) return;
    SV.loadImg(f).then(function (i) {
      img = i; name = SV.base(f.name);
      if (!preset.value) { W.value = i.naturalWidth; H.value = i.naturalHeight; }
      render();
    }).catch(function () { msg.textContent = 'That file could not be read. Choose a PNG, JPG or WebP image.'; });
  });
})();
