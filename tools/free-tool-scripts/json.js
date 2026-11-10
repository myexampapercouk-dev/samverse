(function () {
  var inp = SV.$('jsIn'), out = SV.$('jsOut'), hints = SV.$('jsHints'), ind = SV.$('jsIndent');
  function strip(s) { return s.replace(/^\s*<script[^>]*>/i, '').replace(/<\/script>\s*$/i, ''); }
  function where(s, e) {
    var m = /position (\d+)/.exec(e.message), lm = /line (\d+) column (\d+)/.exec(e.message);
    if (lm) return ' (line ' + lm[1] + ', column ' + lm[2] + ')';
    if (!m) return '';
    var pos = +m[1], before = s.slice(0, pos).split('\n');
    return ' (line ' + before.length + ', column ' + (before[before.length - 1].length + 1) + ')';
  }
  function ld(o, w, path) {
    if (Array.isArray(o)) { o.forEach(function (x, i) { ld(x, w, path + '[' + i + ']'); }); return; }
    if (!o || typeof o !== 'object') return;
    if (path === '' && !o['@context'] && !o['@graph']) w.push(['warn', 'No @context found. JSON-LD for Google needs "@context": "https://schema.org".']);
    if (o['@context'] && /^http:\/\/schema/.test(o['@context'])) w.push(['ok', 'http://schema.org works, but https://schema.org is the usual form.']);
    if (o['@graph']) ld(o['@graph'], w, path + '.@graph');
    else if (path !== '' || o['@context']) { if (!o['@type'] && path.indexOf('@graph') >= 0 && /\]$/.test(path)) w.push(['warn', 'An item at ' + path + ' has no @type.']); }
    Object.keys(o).forEach(function (k) { if (k !== '@graph' && typeof o[k] === 'object') ld(o[k], w, path + '.' + k); if (typeof o[k] === 'string' && /<[a-z][^>]*>/i.test(o[k]) && k !== 'text') w.push(['warn', 'The value of "' + k + '" contains HTML tags. Most schema fields expect plain text.']); });
  }
  function run(minify) {
    var s = strip(inp.value.trim()), w = [];
    if (!s) { out.value = ''; hints.innerHTML = ''; return; }
    try {
      var o = JSON.parse(s);
      out.value = minify ? JSON.stringify(o) : JSON.stringify(o, null, ind.value === 'tab' ? '\t' : +ind.value);
      w.push(['ok', 'Valid JSON. ' + SV.bytes(s.length) + ' in, ' + SV.bytes(out.value.length) + ' out.']);
      if (JSON.stringify(o).indexOf('@') >= 0 || /schema\.org/.test(s)) ld(o, w, '');
    } catch (e) {
      out.value = '';
      w.push(['warn', 'Invalid JSON: ' + e.message.replace(/^JSON\.parse: /, '') + where(s, e) + '.']);
      if (/'/.test(s) && !/"/.test(s)) w.push(['warn', 'JSON needs double quotes, not single quotes.']);
      if (/,\s*[}\]]/.test(s)) w.push(['warn', 'There is a trailing comma before a closing } or ]. JSON does not allow it.']);
      if (/[“”]/.test(s)) w.push(['warn', 'Curly quotes (“ ”) were found, usually from Word or Google Docs. Replace them with straight quotes.']);
    }
    hints.innerHTML = ''; w.forEach(function (x) { var li = document.createElement('li'); li.className = x[0]; li.textContent = x[1]; hints.appendChild(li); });
  }
  SV.$('jsFormat').addEventListener('click', function () { run(false); });
  SV.$('jsMin').addEventListener('click', function () { run(true); });
  inp.addEventListener('input', function () { run(false); }); ind.addEventListener('change', function () { run(false); });
})();
