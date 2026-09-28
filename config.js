// ===== Analytics & Ads: put your IDs here. Nothing loads until you do. =====
// Used by every page on the site.
window.SITE_CONFIG = {
  GA_ID: "G-XXXXXXXXXX",           // Google Analytics 4 Measurement ID
  ADSENSE_ID: "ca-pub-XXXXXXXXXXXXXXXX", // Google AdSense publisher ID
  CLARITY_ID: "XXXXXXXXXX"              // Microsoft Clarity project ID (heatmaps + recordings)
};
(function (c) {
  var real = function (id, prefix) { return id && id.indexOf(prefix) === 0 && id.indexOf("XXXX") === -1; };
  if (real(c.GA_ID, "G-")) {
    var g = document.createElement("script");
    g.async = true;
    g.src = "https://www.googletagmanager.com/gtag/js?id=" + c.GA_ID;
    document.head.appendChild(g);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag("js", new Date());
    gtag("config", c.GA_ID);
  }
  // Ads only on blog articles (not the homepage, service pages or /blog/ index), so they never pull leads away
  var isArticle = /^\/blog\/(?!topic\/)[^/]+\/$/.test(location.pathname);
  if (real(c.ADSENSE_ID, "ca-pub-") && isArticle) {
    var a = document.createElement("script");
    a.async = true;
    a.crossOrigin = "anonymous";
    a.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + c.ADSENSE_ID;
    document.head.appendChild(a);
  }
  if (c.CLARITY_ID && c.CLARITY_ID.indexOf("XXXX") === -1) {
    (function (w, d, t, id) {
      w.clarity = w.clarity || function () { (w.clarity.q = w.clarity.q || []).push(arguments); };
      var s = d.createElement(t); s.async = true; s.src = "https://www.clarity.ms/tag/" + id;
      d.head.appendChild(s);
    })(window, document, "script", c.CLARITY_ID);
  }
})(window.SITE_CONFIG);
