(function () {
  var LIB = 'https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.7.0/+esm';
  var file = SV.$('bgFile'), run = SV.$('bgRun'), msg = SV.$('bgMsg'), bar = SV.$('bgBar'), out = SV.$('bgOut');
  var mode = SV.$('bgMode'), color = SV.$('bgColor'), dl = SV.$('bgDl'), cut = null, name = 'image';
  function compose() {
    if (!cut) return;
    var c = document.createElement('canvas'); c.width = cut.width; c.height = cut.height;
    var x = c.getContext('2d');
    if (mode.value !== 'transparent') { x.fillStyle = mode.value === 'white' ? '#ffffff' : color.value; x.fillRect(0, 0, c.width, c.height); }
    x.drawImage(cut, 0, 0);
    out.innerHTML = ''; var pv = new Image(); pv.alt = 'Image with the background removed'; pv.src = c.toDataURL('image/png'); out.appendChild(pv);
    SV.toBlob(c, 'image/png').then(function (b) { dl.innerHTML = ''; dl.appendChild(SV.link(b, name + '-no-bg.png', 'Download PNG (' + SV.bytes(b.size) + ')')); });
  }
  run.addEventListener('click', function () {
    var f = file.files && file.files[0];
    if (!f || !/^image\//.test(f.type)) { msg.textContent = 'Choose a PNG, JPG or WebP image first.'; return; }
    name = SV.base(f.name); run.disabled = true; bar.hidden = false; bar.value = 0;
    msg.textContent = 'Loading the background removal model. The first run downloads it once, then your browser caches it.';
    import(LIB).then(function (m) {
      return m.removeBackground(f, {
        output: { format: 'image/png' },
        progress: function (key, cur, total) {
          if (total) bar.value = Math.round(cur / total * 100);
          msg.textContent = /fetch/.test(key) ? 'Downloading model files: ' + Math.round(cur / (total || 1) * 100) + '%' : 'Removing the background on your device...';
        },
      });
    }).then(function (blob) {
      var i = new Image();
      i.onload = function () { cut = i; bar.hidden = true; run.disabled = false; msg.textContent = 'Done. Pick a background below and download.'; compose(); };
      i.src = URL.createObjectURL(blob);
    }).catch(function (e) {
      bar.hidden = true; run.disabled = false;
      msg.textContent = 'Sorry, the background remover could not run here. It needs a recent Chrome, Edge, Firefox or Safari and an internet connection for the first model download. (' + (e && e.message ? e.message : 'unknown error') + ')';
    });
  });
  file.addEventListener('change', function () { cut = null; out.innerHTML = ''; dl.innerHTML = ''; msg.textContent = file.files[0] ? 'Ready. Press Remove background.' : ''; });
  [mode, color].forEach(function (el) { el.addEventListener('input', compose); el.addEventListener('change', compose); });
  mode.addEventListener('change', function () { color.disabled = mode.value !== 'custom'; });
  color.disabled = true;
})();
