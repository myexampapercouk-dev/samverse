(function () {
  var file = SV.$('b64File'), out = SV.$('b64Out'), css = SV.$('b64Css'), msg = SV.$('b64Msg');
  var inp = SV.$('b64In'), pv = SV.$('b64Pv'), msg2 = SV.$('b64Msg2'), dl = SV.$('b64Dl');
  file.addEventListener('change', function () {
    var f = file.files && file.files[0]; if (!f) return;
    var rd = new FileReader();
    rd.onload = function () {
      out.value = rd.result;
      css.value = 'background-image: url("' + rd.result + '");\n\n<img src="' + rd.result + '" alt="">';
      msg.textContent = f.name + ': ' + SV.bytes(f.size) + ' file, ' + SV.bytes(rd.result.length) + ' as Base64 (about a third larger).' + (f.size > 10240 ? ' Inlining files over about 10 KB usually slows pages down; a normal image file is better.' : '');
    };
    rd.readAsDataURL(f);
  });
  function decode() {
    var v = inp.value.trim().replace(/\s+/g, ''); pv.innerHTML = ''; dl.innerHTML = '';
    if (!v) { msg2.textContent = ''; return; }
    var m = /^data:(image\/[\w.+-]+);base64,(.*)$/.exec(v), type = m ? m[1] : 'image/png', data = m ? m[2] : v;
    try {
      var bin = atob(data), arr = new Uint8Array(bin.length);
      for (var i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
      if (!m) { if (arr[0] === 0xFF && arr[1] === 0xD8) type = 'image/jpeg'; else if (arr[0] === 0x47) type = 'image/gif'; else if (arr[8] === 0x57 && arr[9] === 0x45) type = 'image/webp'; else if (arr[0] === 0x3C) type = 'image/svg+xml'; }
      var blob = new Blob([arr], { type: type }), img = new Image();
      img.onload = function () { msg2.textContent = 'Decoded a ' + img.naturalWidth + 'x' + img.naturalHeight + ' ' + type + ' image (' + SV.bytes(blob.size) + ').'; };
      img.onerror = function () { msg2.textContent = 'The text decoded, but it is not an image a browser can show.'; pv.innerHTML = ''; };
      img.alt = 'Decoded image preview'; img.src = URL.createObjectURL(blob); pv.appendChild(img);
      dl.appendChild(SV.link(blob, 'decoded.' + (type.split('/')[1] || 'png').replace('svg+xml', 'svg').replace('jpeg', 'jpg'), 'Download image'));
    } catch (e) { msg2.textContent = 'That is not valid Base64. Paste a data:image/... URI or a plain Base64 string.'; }
  }
  inp.addEventListener('input', decode);
})();
