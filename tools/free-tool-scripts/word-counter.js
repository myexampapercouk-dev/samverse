(function () {
  var t = SV.$('wcText'), wpm = SV.$('wcWpm'), stats = SV.$('wcStats'), dens = SV.$('wcDens'), phr = SV.$('wcPhr');
  var STOP = 'a an and are as at be but by for from has have he her his i if in into is it its me my not of on or our she so than that the their them then there these they this to us was we were what when which who will with you your can do does did just also about more all any been being would could should how out up no yes very'.split(' ');
  var stop = {}; STOP.forEach(function (w) { stop[w] = 1; });
  function cell(label, v) { return '<div class="wc-stat"><span>' + label + '</span><strong>' + v + '</strong></div>'; }
  function mins(n, rate) { var m = n / rate; return m < 1 ? Math.max(1, Math.round(m * 60)) + ' sec' : Math.round(m) + ' min'; }
  function rows(tb, arr, total) {
    tb.innerHTML = arr.length ? '' : '<tr><td colspan="3">Type or paste some text.</td></tr>';
    arr.forEach(function (x) { var tr = document.createElement('tr'); [x[0], x[1], (x[1] / total * 100).toFixed(1) + '%'].forEach(function (v) { var td = document.createElement('td'); td.textContent = v; tr.appendChild(td); }); tb.appendChild(tr); });
  }
  function update() {
    var s = t.value, words = s.toLowerCase().match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) || [], n = words.length, rate = parseInt(wpm.value, 10) || 200;
    var sent = (s.match(/[^.!?]+[.!?]+(\s|$)/g) || []).length || (n ? 1 : 0), paras = s.split(/\n\s*\n/).filter(function (p) { return p.trim(); }).length;
    stats.innerHTML = cell('Words', n) + cell('Characters', s.length) + cell('Characters (no spaces)', s.replace(/\s/g, '').length) + cell('Sentences', sent) + cell('Paragraphs', paras) +
      cell('Reading time', n ? mins(n, rate) : '0') + cell('Speaking time', n ? mins(n, 130) : '0') + cell('Avg words per sentence', sent ? (n / sent).toFixed(1) : '0');
    var c = {}, p = {};
    words.forEach(function (w, i) {
      if (!stop[w] && w.length > 2) c[w] = (c[w] || 0) + 1;
      var nx = words[i + 1]; if (nx && !stop[w] && !stop[nx]) { var k = w + ' ' + nx; p[k] = (p[k] || 0) + 1; }
    });
    function top(o) { return Object.keys(o).map(function (k) { return [k, o[k]]; }).filter(function (x) { return x[1] > 1 || o === c; }).sort(function (a, b) { return b[1] - a[1]; }).slice(0, 10); }
    rows(dens, top(c), n || 1); rows(phr, top(p), n || 1);
  }
  t.addEventListener('input', update); wpm.addEventListener('input', update);
  update();
})();
