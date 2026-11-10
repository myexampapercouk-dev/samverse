// Used by both the image converter and the image compressor (different defaults, same engine).
(function () {
  var root = document.querySelector('[data-imgbatch]'); if (!root) return;
  var pre = root.getAttribute('data-imgbatch');
  var file = SV.$(pre + 'File'), fmt = SV.$(pre + 'Fmt'), q = SV.$(pre + 'Q'), qv = SV.$(pre + 'Qv'), maxw = SV.$(pre + 'Max'), run = SV.$(pre + 'Run'), list = SV.$(pre + 'List'), msg = SV.$(pre + 'Msg');
  if (SV.canEncode('image/avif')) { var o = document.createElement('option'); o.value = 'image/avif'; o.textContent = 'AVIF'; fmt.appendChild(o); }
  else if (pre === 'cv') SV.$('cvAvifNote').textContent = 'AVIF output is not supported by this browser, so it is hidden. Chrome and Edge usually support it.';
  function sync() { qv.textContent = q.value + '%'; q.disabled = fmt.value === 'image/png'; }
  q.addEventListener('input', sync); fmt.addEventListener('change', sync); sync();
  run.addEventListener('click', function () {
    var files = [].slice.call(file.files || []).filter(function (f) { return /^image\//.test(f.type); });
    if (!files.length) { msg.textContent = 'Choose one or more images first.'; return; }
    list.innerHTML = ''; var type = fmt.value, total0 = 0, total1 = 0, done = 0;
    msg.textContent = 'Working on ' + files.length + ' image' + (files.length > 1 ? 's' : '') + '...';
    files.forEach(function (f) {
      var li = document.createElement('li'); li.className = 'img-row'; li.textContent = f.name + ': processing...'; list.appendChild(li);
      SV.loadImg(f).then(function (img) {
        var w = img.naturalWidth, h = img.naturalHeight, m = parseInt(maxw && maxw.value, 10);
        if (m > 0 && w > m) { h = Math.round(h * m / w); w = m; }
        var c = document.createElement('canvas'); c.width = w; c.height = h; var x = c.getContext('2d');
        if (type === 'image/jpeg') { x.fillStyle = '#ffffff'; x.fillRect(0, 0, w, h); }
        x.imageSmoothingQuality = 'high'; x.drawImage(img, 0, 0, w, h);
        return SV.toBlob(c, type, q.value / 100).then(function (b) {
          total0 += f.size; total1 += b.size;
          var pct = Math.round((1 - b.size / f.size) * 100);
          li.innerHTML = '';
          var t = document.createElement('span');
          t.textContent = f.name + ' (' + img.naturalWidth + 'x' + img.naturalHeight + ', ' + SV.bytes(f.size) + ') → ' + w + 'x' + h + ', ' + SV.bytes(b.size) + (pct >= 0 ? ' (' + pct + '% smaller)' : ' (' + (-pct) + '% larger: keep the original)');
          li.appendChild(t); li.appendChild(SV.link(b, SV.base(f.name) + '.' + SV.ext[type], 'Download'));
        });
      }).catch(function () { li.textContent = f.name + ': could not be read or encoded.'; })
        .then(function () { if (++done === files.length) msg.textContent = 'Finished. Total ' + SV.bytes(total0) + ' → ' + SV.bytes(total1) + '. Download each file below.'; });
    });
  });
})();
