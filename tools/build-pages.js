// Generates the industry landing pages from the PAGES data below.
// Header, process, contact form and footer are copied from index.html so they stay in sync.
// Run after editing index.html or this file:   node tools/build-pages.js
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://samverse.space';
// Per-page social image from tools/og-images.js, falling back to the default
const ogImage = key => fs.existsSync(path.join(__dirname, '..', 'assets', 'og', key + '.png')) ? `${SITE}/assets/og/${key}.png` : `${SITE}/assets/og-image.png`;
const ogForUrl = url => { const parts = url.replace(SITE, '').split('/').filter(Boolean); if (parts.length === 2) return ogImage(`${parts[0]}-${parts[1]}`); if (parts.length === 1) { const k = fs.existsSync(path.join(__dirname, '..', 'assets', 'og', `extra-${parts[0]}.png`)) ? `extra-${parts[0]}` : `page-${parts[0]}`; return ogImage(k); } return ogImage('none'); };
const WA = '917417049145';
const index = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const between = (start, end) => {
  const a = index.indexOf(start);
  const b = index.indexOf(end, a);
  if (a < 0 || b < 0) throw new Error(`Section not found in index.html: ${start}`);
  return index.slice(a, b + end.length);
};
// Make copied markup work from a sub-folder, and point site nav at the homepage sections
const rebase = html => html
  .replace(/(src|href)="assets\//g, '$1="/assets/')
  .replace(/href="#(about|services|work|process|faq|industries)"/g, 'href="/#$1"')
  .replace(/href="#top" class="brand"/g, 'href="/" class="brand"');

const header = rebase(between('<header class="header"', '</header>'));
const process_ = between('<!-- ===== Process ===== -->', '</section>');
const contact = between('<!-- ===== Contact ===== -->', '</section>');
const footer = rebase(between('<footer class="footer">', '</footer>'));
const waFloat = between('<a class="wa-float"', '</a>');

const PAGES = require('./pages-data');
const PROJECTS = require('./projects');
const POSTS = require('./blog-data');

// Static portfolio cards (crawlable links); script.js only manages the screenshots
const projectCards = (names = []) => PROJECTS.filter(p => !names.length || names.includes(p.name)).map(p => {
  const host = new URL(p.url).hostname.replace(/^www\./, '');
  const shot = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(p.url)}?w=800&h=500`;
  const ext = p.study ? '' : ' target="_blank" rel="noopener"';
  return `          <a class="work-card reveal" href="${p.study || p.url}"${ext}>
            <div class="browser-bar"><i></i><i></i><i></i></div>
            <div class="work-thumb" style="background:${p.color}">
              <div class="fallback">${esc(p.name)}</div>
              <img src="${p.thumb || shot}" data-shot="${shot}" alt="Screenshot of the ${esc(p.name)} website" width="800" height="500" loading="lazy">
            </div>
            <div class="work-body">
              <span class="work-tag">${esc(p.tag)}</span>
              <h3>${esc(p.name)}</h3>
              <div class="work-url"><span>${host}</span><span class="arrow">${p.study ? 'Case study →' : '↗'}</span></div>
            </div>
          </a>`;
}).join('\n');

// Write the cards into the homepage between markers
{
  const indexPath = path.join(ROOT, 'index.html');
  let home = fs.readFileSync(indexPath, 'utf8');
  const re = /(<!-- work-cards:start -->)[\s\S]*?(<!-- work-cards:end -->)/;
  if (!re.test(home)) throw new Error('index.html is missing the work-cards markers');
  home = home.replace(re, (m, start, end) => `${start}\n${projectCards()}\n          ${end}`);
  fs.writeFileSync(indexPath, home);
}

const tick = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 16.2l-3.5-3.5L4 14.2l5 5 11-11-1.4-1.4z"/></svg>';

const related = p => {
  const same = PAGES.filter(x => x.type === p.type);
  const i = same.indexOf(p);
  return [1, 2, 3].map(n => same[(i + n) % same.length]).filter(x => x !== p);
};
const card = x => `<a class="industry" href="/${x.slug}/"><h3>${esc(x.nav)}</h3><p>${esc(x.description.split('. ')[0])}.</p><span class="ind-arrow">→</span></a>`;

// "In depth" section (tools/pages-details.js)
const DETAILS = require('./pages-details');
const depthFor = p => {
  const d = DETAILS[p.slug];
  if (!d) return '';
  return `    <section class="section depth">
      <div class="container">
        <div class="section-head reveal"><span class="eyebrow">In depth</span><h2>${esc(d.title)}</h2></div>
        <div class="depth-grid">
${d.items.map(([h, t], i) => `          <article class="depth-item reveal"><span class="depth-num">0${i + 1}</span><h3>${esc(h)}</h3><p>${esc(t)}</p></article>`).join('\n')}
        </div>
      </div>
    </section>
`;
};

// Blog posts that recommend this landing page
const readingFor = p => {
  const posts = POSTS.filter(x => x.related.includes(p.slug)).slice(0, 3);
  if (!posts.length) return "";
  return `    <section class="section reading">
      <div class="container faq-wrap">
        <div class="section-head reveal"><span class="eyebrow">Helpful reading</span><h2>Guides from the blog</h2></div>
        <ul class="reading-list reveal">
${posts.map(x => `          <li><a href="/blog/${x.slug}/">${esc(x.title)}</a><span>${esc(x.category)}</span></li>`).join("\n")}
        </ul>
      </div>
    </section>`;
};

const render = p => {
  const url = `${SITE}/${p.slug}/`;
  const waLink = `https://wa.me/${WA}?text=${encodeURIComponent(p.wa)}`;
  const plainH1 = p.h1.replace(/<[^>]+>/g, '');
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service', '@id': `${url}#service`, name: plainH1, serviceType: p.nav, description: p.description, url,
        areaServed: 'Worldwide',
        provider: { '@type': 'Person', '@id': `${SITE}/#sameer`, name: 'Sameer Gupta', url: `${SITE}/`, telephone: '+91-7417049145' },
      },
      {
        '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: p.nav, item: url },
        ],
      },
      {
        '@type': 'FAQPage', mainEntity: p.faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
      },
    ],
  };

  return `<!DOCTYPE html>
<html lang="en-IN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(p.title)}</title>
  <meta name="description" content="${esc(p.description)}">
  <meta name="author" content="Sameer Gupta">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Samverse">
  <meta property="og:locale" content="en_IN">
  <meta property="og:url" content="${url}">
  <meta property="og:title" content="${esc(p.title)}">
  <meta property="og:description" content="${esc(p.description)}">
  <meta property="og:image" content="${ogForUrl(url)}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="${ogForUrl(url)}">
  <meta name="theme-color" content="#6D4AFF">
  <link rel="icon" type="image/svg+xml" href="/assets/logo-mark.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32.png">
  <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <script src="/config.js" defer></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"></noscript>
  <link rel="stylesheet" href="/style.min.css">
  <script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
  </script>
</head>
<body>

  <!-- Generated by tools/build-pages.js: edit that file, not this one -->
  ${header}

  <main>
    <section class="hero lp-hero">
      <div class="container">
        <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> <span>/</span> ${esc(p.nav)}</nav>
        <div class="lp-hero-copy">
          <span class="pill"><span class="dot"></span> ${esc(p.eyebrow)}</span>
          <h1>${p.h1}</h1>
          <p class="lead">${esc(p.lead)}</p>
          <div class="hero-cta">
            <a href="#contact" class="btn">Get a Free Quote</a>
            <a href="${waLink}" class="btn btn-ghost" target="_blank" rel="noopener">WhatsApp Me</a>
          </div>
          <ul class="lp-trust">
            <li>${tick} Building WordPress sites since 2020</li>
            <li>${tick} Fixed quote in 24 hours</li>
            <li>${tick} Support after launch</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow">Why it matters</span>
          <h2>${esc(p.painTitle)}</h2>
        </div>
        <div class="services-grid lp-benefits">
${p.pains.map(([t, d]) => `          <article class="service reveal"><div class="icon">${tick}</div><h3>${esc(t)}</h3><p>${esc(d)}</p></article>`).join('\n')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container lp-gets reveal">
        <div>
          <span class="eyebrow">What you get</span>
          <h2>${esc(p.getsTitle)}</h2>
          <p class="muted">Every project is built on WordPress, so you own your website and can update it yourself. Need something that isn't listed? Just ask.</p>
          <a href="#contact" class="btn" style="margin-top:22px">Discuss Your Project</a>
        </div>
        <ul class="checklist">
${p.gets.map(g => `          <li>${tick} ${esc(g)}</li>`).join('\n')}
        </ul>
      </div>
    </section>

${depthFor(p)}
    <section class="section" id="work">
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow">Related work</span>
          <h2>Websites I've built</h2>
          <p class="muted">Live projects. Click a card for the case study, or <a href="/#work" class="link-inline">see the full portfolio</a>.</p>
        </div>
        <div class="work-grid" id="workGrid">
${projectCards(p.projects)}
        </div>
      </div>
    </section>

    ${process_}

    <section class="section" id="faq">
      <div class="container faq-wrap">
        <div class="section-head reveal">
          <span class="eyebrow">FAQ</span>
          <h2>Common questions</h2>
        </div>
        <div class="faq reveal">
${p.faqs.map(([q, a]) => `          <details>\n            <summary>${esc(q)}</summary>\n            <p>${esc(a)}</p>\n          </details>`).join('\n')}
        </div>
      </div>
    </section>

${readingFor(p)}
    <section class="section related">
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow">${p.type === 'industry' ? 'Other industries' : 'Related services'}</span>
          <h2>You might also need</h2>
        </div>
        <div class="industries related-grid reveal">
${related(p).map(x => '          ' + card(x)).join('\n')}
        </div>
        <p class="related-all"><a href="/solutions/" class="link-inline">See all industries &amp; services →</a></p>
      </div>
    </section>

    ${contact}
  </main>

  ${footer}

  ${waFloat.replace(/href="[^"]*"/, `href="${waLink}"`)}

  <script src="/script.js" defer></script>
</body>
</html>
`;
};

// Minified stylesheet used by every page (edit style.css, then rebuild)
const css = fs.readFileSync(path.join(ROOT, "style.css"), "utf8")
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/\s+/g, " ")
  .replace(/\s*([{};,>])\s*/g, "$1")
  .replace(/;}/g, "}")
  .trim();
fs.writeFileSync(path.join(ROOT, "style.min.css"), css + "\n");
console.log("style.min.css", css.length, "bytes");

for (const p of PAGES) {
  const dir = path.join(ROOT, p.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), render(p));
  console.log('built', `/${p.slug}/`);
}

// /solutions/ hub: links to every landing page (helps Google discover them all)
const hub = () => {
  const group = (type, title, intro) => `
    <section class="section">
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow">${type === 'industry' ? 'Industries' : 'Services'}</span>
          <h2>${title}</h2>
          <p class="muted">${intro}</p>
        </div>
        <div class="industries reveal">
${PAGES.filter(x => x.type === type).map(x => '          ' + card(x)).join('\n')}
        </div>
      </div>
    </section>`;
  const url = `${SITE}/solutions/`;
  const schema = {
    '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'WordPress Services & Industries', url,
    hasPart: PAGES.map(x => ({ '@type': 'WebPage', name: x.nav, url: `${SITE}/${x.slug}/` })),
  };
  return `<!DOCTYPE html>
<html lang="en-IN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WordPress Services &amp; Industries | Samverse by Sameer Gupta</title>
  <meta name="description" content="All WordPress services by Sameer Gupta: website design for doctors, manufacturers, restaurants, real estate and more, plus redesign, speed, SEO, maintenance and security.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url}">
  <meta property="og:title" content="WordPress Services & Industries | Samverse">
  <meta property="og:image" content="${SITE}/assets/og-image.png">
  <meta name="theme-color" content="#6D4AFF">
  <link rel="icon" type="image/svg+xml" href="/assets/logo-mark.svg">
  <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
  <script src="/config.js" defer></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"></noscript>
  <link rel="stylesheet" href="/style.min.css">
  <script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
  </script>
</head>
<body>

  <!-- Generated by tools/build-pages.js -->
  ${header}

  <main>
    <section class="hero lp-hero">
      <div class="container">
        <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> <span>/</span> Solutions</nav>
        <div class="lp-hero-copy">
          <h1>WordPress solutions for <span class="grad">every kind of business</span></h1>
          <p class="lead">Pick your industry or the service you need to see exactly how I can help. Not sure? Send me a message and I'll recommend the right approach.</p>
          <div class="hero-cta">
            <a href="#contact" class="btn">Get a Free Quote</a>
            <a href="https://wa.me/${WA}" class="btn btn-ghost" target="_blank" rel="noopener">WhatsApp Me</a>
          </div>
        </div>
      </div>
    </section>
${group('industry', 'Websites by industry', 'Websites planned around what your customers need to see and do.')}
${group('service', 'Services', 'Specialist WordPress services for new and existing websites.')}

    ${contact}
  </main>

  ${footer}

  ${waFloat}

  <script src="/script.js" defer></script>
</body>
</html>
`;
};
fs.mkdirSync(path.join(ROOT, 'solutions'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'solutions', 'index.html'), hub());
console.log('built /solutions/');

// ===================== BLOG =====================
const bySlug = Object.fromEntries(PAGES.map(x => [x.slug, x]));
const fmtDate = d => new Date(d + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
const readMins = html => Math.max(3, Math.round(html.replace(/<[^>]+>/g, ' ').split(/\s+/).length / 200));

const headCommon = (title, description, url, extra = '') => `<!DOCTYPE html>
<html lang="en-IN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="author" content="Sameer Gupta">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="${url}">
  <meta property="og:site_name" content="Samverse">
  <meta property="og:locale" content="en_IN">
  <meta property="og:url" content="${url}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:image" content="${ogForUrl(url)}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="${ogForUrl(url)}">
  <meta name="theme-color" content="#6D4AFF">
  <link rel="icon" type="image/svg+xml" href="/assets/logo-mark.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32.png">
  <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="alternate" type="application/rss+xml" title="Samverse Blog" href="${SITE}/blog/feed.xml">
  <script src="/config.js" defer></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"></noscript>
  <link rel="stylesheet" href="/style.min.css">
${extra}</head>`;

const renderPost = (post, i) => {
  const url = `${SITE}/blog/${post.slug}/`;
  // Table of contents from the article's h2 headings (with anchors added)
  const toc = [];
  const body = post.body.replace(/<h2>(.*?)<\/h2>/g, (m, t) => {
    const id = t.replace(/<[^>]+>/g, '').toLowerCase().replace(/&amp;/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    toc.push([id, t]);
    return `<h2 id="${id}">${t}</h2>`;
  });
  // Most related posts: shared service pages count most, then same category, then links between the two posts
  // (a shared niche page like the doctors page counts more than a common one like SEO services)
  const freq = s => POSTS.filter(p => p.related.includes(s)).length;
  const score = x => x.related.filter(s => post.related.includes(s)).reduce((sum, s) => sum + 12 / freq(s), 0)
    + (x.category === post.category ? 1 : 0)
    + (post.body.includes(`/blog/${x.slug}/`) || x.body.includes(`/blog/${post.slug}/`) ? 2 : 0);
  const others = POSTS.filter(x => x !== post)
    .map((x, j) => ({ x, s: score(x), j }))
    .sort((a, b) => b.s - a.s || a.j - b.j)
    .slice(0, 3).map(o => o.x);
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting', '@id': `${url}#article`, headline: post.title, description: post.description,
        datePublished: post.date, dateModified: post.updated || post.date, mainEntityOfPage: url,
        image: ogImage(`blog-${post.slug}`), articleSection: post.category, inLanguage: 'en-IN',
        author: { '@type': 'Person', '@id': `${SITE}/#sameer`, name: 'Sameer Gupta', url: `${SITE}/` },
        publisher: { '@type': 'Organization', name: 'Samverse', logo: { '@type': 'ImageObject', url: `${SITE}/assets/icon-512.png` } },
      },
      {
        '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog/` },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
    ],
  };
  // Add the brand only when the title stays short enough for Google results
  const base = post.seoTitle || post.title;
  const pageTitle = (base + ' | Samverse').length <= 65 ? base + ' | Samverse' : base;
  return `${headCommon(pageTitle, post.description, url, `  <meta property="og:type" content="article">
  <meta property="article:published_time" content="${post.date}">
  <script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
  </script>
`)}
<body>

  <!-- Generated by tools/build-pages.js from tools/blog-data.js -->
  ${header}

  <main>
    <article class="post">
      <header class="post-head container">
        <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> <span>/</span> <a href="/blog/">Blog</a> <span>/</span> ${esc(post.category)}</nav>
        <span class="eyebrow">${esc(post.category)}</span>
        <h1>${esc(post.title)}</h1>
        <p class="post-meta">By <a href="/about/">Sameer Gupta</a> · <time datetime="${post.date}">${fmtDate(post.date)}</time> · ${readMins(post.body)} min read</p>
      </header>

      <div class="post-layout container">
        <aside class="post-toc">
          <strong>On this page</strong>
          <ol>
${toc.map(([id, t]) => `            <li><a href="#${id}">${t}</a></li>`).join('\n')}
          </ol>
        </aside>
        <div class="post-body">
${body.trim()}

          <div class="post-cta">
            <h2>Need help with your website?</h2>
            <p>I'm Sameer, a freelance WordPress developer building fast, SEO-friendly websites since 2020. Tell me what you need and I'll reply with a plan and a fixed quote within 24 hours.</p>
            <div class="hero-cta">
              <a href="#contact" class="btn">Get a Free Quote</a>
              <a href="https://wa.me/${WA}?text=${encodeURIComponent('Hi Sameer, I read your article "' + post.title + '" and need help.')}" class="btn btn-ghost" target="_blank" rel="noopener">WhatsApp Me</a>
            </div>
          </div>

          <div class="post-author">
            <img src="/assets/logo-mark.svg" alt="" width="56" height="56">
            <div><strong><a href="/about/">Sameer Gupta</a></strong><p>Freelance WordPress developer and founder of Samverse. Builds websites for clinics, manufacturers, agencies and online stores.</p></div>
          </div>
        </div>
      </div>
    </article>

    <section class="section related">
      <div class="container">
        <div class="section-head reveal"><span class="eyebrow">Services</span><h2>How I can help</h2></div>
        <div class="industries related-grid reveal">
${post.related.map(s => bySlug[s]).filter(Boolean).map(x => '          ' + card(x)).join('\n')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head reveal"><span class="eyebrow">Keep reading</span><h2>More articles</h2></div>
        <div class="post-grid reveal">
${others.map(x => '          ' + postCard(x)).join('\n')}
        </div>
      </div>
    </section>

    ${contact}
  </main>

  ${footer}

  ${waFloat}

  <script src="/script.js" defer></script>
</body>
</html>
`;
};

const postCard = x => `<a class="post-card" href="/blog/${x.slug}/"><span class="work-tag">${esc(x.category)}</span><h3>${esc(x.title)}</h3><p>${esc(x.description)}</p><span class="post-card-meta">${fmtDate(x.date)} · ${readMins(x.body)} min read</span></a>`;

// Topic groups on /blog/ (each post's `category` maps to one group; unknown categories fall into Guides)
const BLOG_TOPICS = [
  { id: 'planning', name: 'Planning & costs', cats: ['Pricing', 'Guides'], intro: 'What websites cost, how long they take, which platform to choose and how to brief a developer.' },
  { id: 'seo-growth', name: 'SEO & growth', cats: ['SEO', 'Growth'], intro: 'Get found on Google, turn visitors into enquiries and measure what works.' },
  { id: 'speed-security', name: 'Speed, security & maintenance', cats: ['Speed', 'Security', 'Maintenance'], intro: 'Keep your WordPress site fast, safe and running smoothly.' },
  { id: 'ecommerce', name: 'E-commerce', cats: ['E-commerce'], intro: 'Selling online with WooCommerce: payments, platforms and launch checklists.' },
  { id: 'industries', name: 'Industry guides', cats: ['Industries'], intro: 'What websites need to do for clinics, manufacturers, real estate, hotels, schools and more.' },
  { id: 'agencies', name: 'For agencies', cats: ['Agencies'], intro: 'White-label WordPress delivery and design handoff for agencies and designers.' },
];
const knownCats = BLOG_TOPICS.flatMap(t => t.cats);
const topicPosts = t => POSTS.filter(p => t.cats.includes(p.category) || (t.id === 'planning' && !knownCats.includes(p.category)))
  .sort((a, b) => b.date.localeCompare(a.date));

const renderBlogIndex = () => {
  const url = `${SITE}/blog/`;
  const schema = {
    '@context': 'https://schema.org', '@type': 'Blog', name: 'Samverse Blog', url,
    author: { '@type': 'Person', '@id': `${SITE}/#sameer`, name: 'Sameer Gupta' },
    blogPost: POSTS.map(p => ({ '@type': 'BlogPosting', headline: p.title, url: `${SITE}/blog/${p.slug}/`, datePublished: p.date })),
  };
  return `${headCommon('WordPress & Website Tips for Business Owners | Samverse Blog', 'Practical guides on WordPress websites, costs, speed, security, SEO and online stores, written for business owners by freelance developer Sameer Gupta.', url, `  <meta property="og:type" content="website">
  <script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
  </script>
`)}
<body>

  <!-- Generated by tools/build-pages.js -->
  ${header}

  <main>
    <section class="hero lp-hero">
      <div class="container">
        <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> <span>/</span> Blog</nav>
        <div class="lp-hero-copy">
          <span class="eyebrow">Blog</span>
          <h1>Website tips for <span class="grad">business owners</span></h1>
          <p class="lead">Plain-English guides on WordPress, website costs, speed, security, SEO and selling online, so you can make better decisions about your website.</p>
        </div>
      </div>
    </section>
    <section class="section" style="padding-top:10px">
      <div class="container">
        <nav class="topic-nav" aria-label="Blog topics">
${BLOG_TOPICS.filter(t => topicPosts(t).length).map(t => `          <a href="#${t.id}">${esc(t.name)} <span>${topicPosts(t).length}</span></a>`).join('\n')}
        </nav>
${BLOG_TOPICS.filter(t => topicPosts(t).length).map(t => `        <section class="topic-group" id="${t.id}">
          <div class="topic-head"><h2>${esc(t.name)}</h2><p class="muted">${esc(t.intro)}</p></div>
          <div class="post-grid">
${topicPosts(t).map(x => '            ' + postCard(x)).join('\n')}
          </div>
        </section>`).join('\n')}
      </div>
    </section>

    ${contact}
  </main>

  ${footer}

  ${waFloat}

  <script src="/script.js" defer></script>
</body>
</html>
`;
};

fs.mkdirSync(path.join(ROOT, 'blog'), { recursive: true });
POSTS.forEach((post, i) => {
  const dir = path.join(ROOT, 'blog', post.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), renderPost(post, i));
  console.log('built', `/blog/${post.slug}/`);
});
fs.writeFileSync(path.join(ROOT, 'blog', 'index.html'), renderBlogIndex());
// RSS feed (helps discovery and lets people subscribe)
fs.writeFileSync(path.join(ROOT, 'blog', 'feed.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Samverse Blog</title>
  <link>${SITE}/blog/</link>
  <atom:link href="${SITE}/blog/feed.xml" rel="self" type="application/rss+xml"/>
  <description>WordPress and website tips for business owners by Sameer Gupta.</description>
  <language>en-in</language>
${POSTS.map(p => `  <item>\n    <title>${esc(p.title)}</title>\n    <link>${SITE}/blog/${p.slug}/</link>\n    <guid>${SITE}/blog/${p.slug}/</guid>\n    <pubDate>${new Date(p.date + 'T09:00:00+05:30').toUTCString()}</pubDate>\n    <description>${esc(p.description)}</description>\n  </item>`).join('\n')}
</channel>
</rss>
`);
console.log('built /blog/ + feed.xml');

// ===================== CASE STUDIES (/work/<slug>/) =====================
const WORK = require('./work-data');
const shotFor = w => w.thumb || `https://s.wordpress.com/mshots/v1/${encodeURIComponent(w.url)}?w=1200&h=750`;

const renderWork = (w, i) => {
  const url = `${SITE}/work/${w.slug}/`;
  const title = `${w.name} Website Case Study | Samverse`;
  const next = WORK[(i + 1) % WORK.length];
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork', '@id': `${url}#work`, name: `${w.name} website`, description: w.summary, url,
        image: w.thumb ? `${SITE}${w.thumb}` : shotFor(w), genre: w.industry, inLanguage: 'en-IN',
        creator: { '@type': 'Person', '@id': `${SITE}/#sameer`, name: 'Sameer Gupta', url: `${SITE}/` },
        about: { '@type': 'Organization', name: w.name, url: w.url },
      },
      {
        '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Work', item: `${SITE}/work/` },
          { '@type': 'ListItem', position: 3, name: w.name, item: url },
        ],
      },
    ],
  };
  return `${headCommon(title, w.summary, url, `  <meta property="og:type" content="article">
  <script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
  </script>
`)}
<body>

  <!-- Generated by tools/build-pages.js from tools/work-data.js -->
  ${header}

  <main>
    <section class="hero lp-hero">
      <div class="container">
        <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> <span>/</span> <a href="/work/">Work</a> <span>/</span> ${esc(w.name)}</nav>
        <div class="lp-hero-copy">
          <span class="pill"><span class="dot"></span> Case study · ${esc(w.industry)}</span>
          <h1>${esc(w.name)}</h1>
          <p class="lead">${esc(w.summary)}</p>
          <div class="hero-cta">
            <a href="${w.url}" class="btn" target="_blank" rel="noopener">Visit Live Website ↗</a>
            <a href="#contact" class="btn btn-ghost">Build Something Similar</a>
          </div>
        </div>
        <figure class="cs-shot">
          <div class="browser-bar"><i></i><i></i><i></i></div>
          <img src="${shotFor(w)}" alt="Homepage of the ${esc(w.name)} website" width="1200" height="750" loading="eager">
        </figure>
      </div>
    </section>

    <section class="section">
      <div class="container cs-grid">
        <div class="cs-main">
          <h2>About the client</h2>
          <p>${esc(w.client)}</p>
          <h2>What the website needed to do</h2>
          <ul class="checklist cs-list">
${w.goals.map(g => `            <li>${tick} ${esc(g)}</li>`).join('\n')}
          </ul>
          <h2>What I built</h2>
          <ul class="cs-built">
${w.built.map(b => `            <li>${esc(b)}</li>`).join('\n')}
          </ul>
        </div>
        <aside class="cs-side">
          <dl>
            <dt>Client</dt><dd>${esc(w.name)}</dd>
            <dt>Industry</dt><dd>${esc(w.industry)}</dd>
            <dt>Website</dt><dd><a href="${w.url}" target="_blank" rel="noopener">${esc(new URL(w.url).hostname)}</a></dd>
            <dt>Built with</dt><dd>${w.stack.map(esc).join(', ')}</dd>
          </dl>
          <a href="#contact" class="btn btn-block">Get a Similar Website</a>
        </aside>
      </div>
    </section>

    <section class="section related">
      <div class="container">
        <div class="section-head reveal"><span class="eyebrow">Services used</span><h2>Want a website like this?</h2></div>
        <div class="industries related-grid reveal">
${w.related.map(s => bySlug[s]).filter(Boolean).map(x => '          ' + card(x)).join('\n')}
        </div>
        <p class="related-all"><a href="/work/${next.slug}/" class="link-inline">Next case study: ${esc(next.name)} →</a></p>
      </div>
    </section>

    ${contact}
  </main>

  ${footer}

  ${waFloat}

  <script src="/script.js" defer></script>
</body>
</html>
`;
};

// /work/ portfolio index
const renderWorkIndex = () => {
  const url = `${SITE}/work/`;
  const schema = {
    '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'WordPress Portfolio: Sameer Gupta', url,
    hasPart: WORK.map(w => ({ '@type': 'CreativeWork', name: `${w.name} website`, url: `${SITE}/work/${w.slug}/` })),
  };
  return `${headCommon('WordPress Portfolio & Case Studies | Sameer Gupta | Samverse', 'Portfolio of WordPress websites by freelance developer Sameer Gupta: case studies for agencies, manufacturers, healthcare, directories and more, built with Elementor.', url, `  <meta property="og:type" content="website">
  <script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
  </script>
`)}
<body>

  <!-- Generated by tools/build-pages.js -->
  ${header}

  <main>
    <section class="hero lp-hero">
      <div class="container">
        <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> <span>/</span> Work</nav>
        <div class="lp-hero-copy">
          <span class="eyebrow">Portfolio</span>
          <h1>Websites I've <span class="grad">designed &amp; built</span></h1>
          <p class="lead">Live WordPress websites for agencies, manufacturers, healthcare, media and directory businesses. Open a case study to see what each site needed and how it was built.</p>
        </div>
      </div>
    </section>
    <section class="section" style="padding-top:20px">
      <div class="container">
        <div class="work-grid" id="workGrid">
${projectCards()}
        </div>
      </div>
    </section>

    ${contact}
  </main>

  ${footer}

  ${waFloat}

  <script src="/script.js" defer></script>
</body>
</html>
`;
};
fs.mkdirSync(path.join(ROOT, 'work'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'work', 'index.html'), renderWorkIndex());
console.log('built /work/');

WORK.forEach((w, i) => {
  const dir = path.join(ROOT, 'work', w.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), renderWork(w, i));
  console.log('built', `/work/${w.slug}/`);
});

// ===================== EXTRA PAGES (calculator, about, glossary...) =====================
const EXTRA = require('./extra-pages');
const renderExtra = x => {
  const url = `${SITE}/${x.slug}/`;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      ...(x.schema ? [x.schema(url)] : []),
      {
        '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: x.crumb, item: url },
        ],
      },
    ],
  };
  return `${headCommon(x.title, x.description, url, `  <meta property="og:type" content="website">
  <script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
  </script>
`)}
<body>

  <!-- Generated by tools/build-pages.js from tools/extra-pages.js -->
  ${header}

  <main>
    <section class="hero lp-hero">
      <div class="container">
        <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> <span>/</span> ${esc(x.crumb)}</nav>
        <div class="lp-hero-copy">
          <span class="eyebrow">${esc(x.eyebrow)}</span>
          <h1>${x.h1}</h1>
          <p class="lead">${esc(x.lead)}</p>
        </div>
      </div>
    </section>

${x.main}

    ${contact}
  </main>

  ${footer}

  ${waFloat}

  <script src="/script.js" defer></script>
${x.script ? `  <script>\n${x.script}\n  </script>\n` : ''}</body>
</html>
`;
};
EXTRA.forEach(x => {
  const dir = path.join(ROOT, x.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), renderExtra(x));
  console.log('built', `/${x.slug}/`);
});

// llms.txt: a plain-text guide to the site for AI assistants and answer engines (llmstxt.org)
const md = (x, u, d) => `- [${x}](${u}): ${d}`;
fs.writeFileSync(path.join(ROOT, 'llms.txt'), `# Samverse: Sameer Gupta, Freelance WordPress Developer

> Samverse (samverse.space) is the portfolio and service site of Sameer Gupta, a freelance WordPress developer in India working with businesses and agencies since 2020. Services: WordPress website development, Elementor, WooCommerce stores, redesigns, speed optimization, SEO setup, maintenance, malware removal and migrations. Contact: sameergpt9719@gmail.com, WhatsApp +91 74170 49145.

## Key pages
${md('Home', `${SITE}/`, 'Services, portfolio, process, FAQ and contact')}
${md('About Sameer Gupta', `${SITE}/about/`, 'Background, approach and tools')}
${md('Portfolio', `${SITE}/work/`, 'Case studies of live client websites')}
${md('All services & industries', `${SITE}/solutions/`, 'Index of every service and industry page')}
${EXTRA.filter(x => x.slug !== 'about').map(x => md(x.crumb, `${SITE}/${x.slug}/`, x.description)).join('\n')}

## Services
${PAGES.filter(p => p.type === 'service').map(p => md(p.nav, `${SITE}/${p.slug}/`, p.description)).join('\n')}

## Industries
${PAGES.filter(p => p.type === 'industry').map(p => md(p.nav, `${SITE}/${p.slug}/`, p.description)).join('\n')}

## Case studies
${WORK.map(w => md(w.name, `${SITE}/work/${w.slug}/`, w.summary)).join('\n')}

## Blog
${[...POSTS].sort((a, b) => b.date.localeCompare(a.date)).map(p => md(p.title, `${SITE}/blog/${p.slug}/`, p.description)).join('\n')}
`);
console.log('built llms.txt');

// Keep the sitemap in step with the pages
const today = new Date().toISOString().slice(0, 10);
const urls = [{ loc: `${SITE}/`, pr: '1.0' }, { loc: `${SITE}/solutions/`, pr: '0.9' }, ...PAGES.map(p => ({ loc: `${SITE}/${p.slug}/`, pr: '0.8' })),
  { loc: `${SITE}/blog/`, pr: '0.8' }, ...POSTS.map(p => ({ loc: `${SITE}/blog/${p.slug}/`, pr: '0.7', lastmod: p.updated || p.date })),
  { loc: `${SITE}/work/`, pr: '0.8' }, ...EXTRA.map(x => ({ loc: `${SITE}/${x.slug}/`, pr: x.priority || '0.8' })), ...WORK.map(w => ({ loc: `${SITE}/work/${w.slug}/`, pr: '0.7' }))];
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod || today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${u.pr}</priority>\n  </url>`).join('\n')}
</urlset>
`);
console.log('updated sitemap.xml');

module.exports = { PAGES };
