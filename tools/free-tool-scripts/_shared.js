// Shared helpers for the free tools (inlined before each tool script by tools/tools-pages-more.js).
var SV = {
  $: function (id) { return document.getElementById(id); },
  bytes: function (n) { return n < 1024 ? n + ' B' : n < 1048576 ? (n / 1024).toFixed(1) + ' KB' : (n / 1048576).toFixed(2) + ' MB'; },
  base: function (name) { return String(name || 'image').replace(/\.[^.]+$/, '').replace(/[^\w.-]+/g, '-') || 'image'; },
  ext: { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/avif': 'avif' },
  canEncode: function (type) {
    try { var c = document.createElement('canvas'); c.width = c.height = 2; return c.toDataURL(type).indexOf('data:' + type) === 0; } catch (e) { return false; }
  },
  loadImg: function (file) {
    return new Promise(function (res, rej) {
      if (!file || !/^image\//.test(file.type)) { rej(new Error('not an image')); return; }
      var url = URL.createObjectURL(file), img = new Image();
      img.onload = function () { res(img); };
      img.onerror = function () { URL.revokeObjectURL(url); rej(new Error('unreadable')); };
      img.src = url;
    });
  },
  toBlob: function (canvas, type, q) {
    return new Promise(function (res, rej) { canvas.toBlob(function (b) { b ? res(b) : rej(new Error('encode failed')); }, type, q); });
  },
  link: function (blob, name, text) {
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; a.textContent = text || ('Download ' + name); a.className = 'btn btn-sm';
    return a;
  },
  copy: function (text, btn) {
    var old = btn.textContent;
    function done() { btn.textContent = 'Copied'; setTimeout(function () { btn.textContent = old; }, 1500); }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, function () {});
    else { var t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove(); done(); }
  },
  loadScript: function (src) {
    return new Promise(function (res, rej) {
      var s = document.createElement('script'); s.src = src; s.async = true; s.crossOrigin = 'anonymous';
      s.onload = res; s.onerror = function () { rej(new Error('load failed')); }; document.head.appendChild(s);
    });
  },
  // QR codes: qrcode-generator 1.4.4 (MIT) loaded from jsDelivr only when first needed.
  qr: function (text, ecl) {
    var go = function () { var q = window.qrcode(0, ecl || 'M'); q.addData(unescape(encodeURIComponent(text))); q.make(); return q; };
    if (window.qrcode) return Promise.resolve(go());
    return SV.loadScript('https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js').then(go);
  },
  qrCanvas: function (q, size, fg, bg) {
    var n = q.getModuleCount(), quiet = 4, cell = Math.max(1, Math.floor(size / (n + quiet * 2))), px = cell * (n + quiet * 2);
    var c = document.createElement('canvas'); c.width = c.height = px; var x = c.getContext('2d');
    x.fillStyle = bg || '#ffffff'; x.fillRect(0, 0, px, px); x.fillStyle = fg || '#000000';
    for (var r = 0; r < n; r++) for (var k = 0; k < n; k++) if (q.isDark(r, k)) x.fillRect((k + quiet) * cell, (r + quiet) * cell, cell, cell);
    return c;
  },
  qrSvg: function (q, fg, bg) {
    var n = q.getModuleCount(), quiet = 4, w = n + quiet * 2, d = '';
    for (var r = 0; r < n; r++) for (var k = 0; k < n; k++) if (q.isDark(r, k)) d += 'M' + (k + quiet) + ' ' + (r + quiet) + 'h1v1h-1z';
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + ' ' + w + '" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="' + (bg || '#ffffff') + '"/><path fill="' + (fg || '#000000') + '" d="' + d + '"/></svg>';
  },
};
document.querySelectorAll('[data-copy]').forEach(function (b) {
  b.addEventListener('click', function () { var t = SV.$(b.getAttribute('data-copy')); SV.copy(t.value !== undefined ? t.value : t.textContent, b); });
});
