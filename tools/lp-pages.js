// Paid-ads landing pages (/lp/...). Called from build-pages.js.
// noindex,follow; kept out of the sitemap, nav, llms.txt and IndexNow (sitemap lists pages explicitly).
// Minimal header (logo only), no menu, no outbound links except call / WhatsApp / email.
const fs = require('fs');
const path = require('path');

const LPS = [
  {
    slug: 'lp/website',
    title: 'WordPress & Shopify Website for Your Business | Samverse',
    description: 'Get a fast WordPress or Shopify website for your business. Free sample homepage layout and a fixed quote within 24 hours.',
    eyebrow: 'WordPress & Shopify websites',
    h1: 'A WordPress or Shopify website for <span class="grad">your business</span>',
    sub: 'Share your business and get a free sample homepage layout plus a fixed quote within 24 hours.',
    cta: 'Get My Free Sample Layout',
    wa: 'Hi, I saw your ad and want a website for my business. Please send a sample layout and quote.',
    type: 'New WordPress website',
    includedTitle: 'What is included',
    included: [
      ['Free sample homepage layout', 'Before you pay anything, you see a layout of your homepage based on your business.'],
      ['Fixed quote in 24 hours', 'One clear price for the agreed pages and features, so there are no surprises later.'],
      ['Mobile-first, fast design', 'Built to load quickly and look right on phones, where most of your visitors are.'],
      ['Enquiry and WhatsApp buttons', 'Contact form, click-to-call and WhatsApp on every page so visitors can reach you.'],
      ['SEO basics set up', 'Titles, descriptions, sitemap and Google Search Console set up at launch.'],
      ['You own everything', 'Domain, hosting and site are set up in your name, and you can edit content yourself.'],
    ],
    work: ['Dr. Sunaina Dental Care', 'Studio Agama Interiors', 'Southern Flavours', 'Sahni Power Solutions', 'Vansh Group', 'Streak Creative'],
    steps: [
      ['Tell me about your business', 'Fill in the form or message on WhatsApp with what you do and what the site needs.'],
      ['Get a sample layout and quote', 'I send a sample homepage layout and a fixed quote, usually within 24 hours.'],
      ['Build and launch', 'I build the site, you review it, and it goes live with SEO basics in place.'],
    ],
    faqs: [
      ['Is the sample homepage layout really free?', 'Yes. You get a sample layout of your homepage with the quote, with no obligation to go ahead.'],
      ['WordPress or Shopify: which should I choose?', 'WordPress suits service businesses, clinics and content-led sites. Shopify suits stores that mainly sell products online. I will recommend one based on your needs.'],
      ['How long does a website take?', 'A business website of 5–8 pages usually takes 1–2 weeks once content is ready. Online stores take 2–4 weeks depending on products and features.'],
      ['How is the price decided?', 'By the number of pages, design needs and features such as online payments or bookings. You get one fixed quote before any work starts.'],
      ['Can I update the website myself?', 'Yes. You get access to edit text, images and products, and help is available if you need changes later.'],
    ],
  },
  {
    slug: 'lp/fix-wordpress',
    title: 'Fix a Slow, Broken or Hacked WordPress Site | Samverse',
    description: 'WordPress site slow, showing errors or hacked? Get it checked and fixed quickly, with a fixed quote before any work starts.',
    eyebrow: 'Urgent WordPress fixes',
    h1: 'Fix a slow, broken or <span class="grad">hacked WordPress site</span>',
    sub: 'Tell me what is wrong and get a fixed quote to fix it, often the same day.',
    cta: 'Get My Site Fixed',
    wa: 'Hi, I saw your ad. My WordPress site needs an urgent fix. The problem is: ',
    type: 'Speed / SEO optimization',
    includedTitle: 'What the fix includes',
    included: [
      ['Problem check', 'I look at the error, slowness or hack and tell you what is causing it.'],
      ['Fixed quote before work', 'You know the price before anything is changed on your site.'],
      ['Backup first', 'A full backup is taken before any fix, so nothing is lost.'],
      ['Malware cleanup and hardening', 'Hacked sites are cleaned, passwords and keys reset, and security tightened.'],
      ['Speed fixes', 'Caching, image optimisation and removing heavy plugins to make pages load faster.'],
      ['Errors and broken layouts', 'White screens, critical errors, plugin conflicts and broken Elementor layouts fixed.'],
    ],
    work: ['Dr. Nitish Gupta', 'Dr. Sudhir Arora', 'Our Temples', 'Sahni Power Solutions'],
    steps: [
      ['Tell me the problem', 'Send a short note or a screenshot through the form or WhatsApp.'],
      ['Get a fixed quote', 'I check the site and send a fixed price and time to fix it.'],
      ['Fixed and tested', 'I fix it, test it on mobile and desktop, and tell you what was done.'],
    ],
    faqs: [
      ['How quickly can you fix my site?', 'Many problems such as errors and broken layouts are fixed the same day. Hacked sites and larger speed work can take a little longer; you get a time estimate with the quote.'],
      ['What do you need from me?', 'Your website address, a description or screenshot of the problem, and admin or hosting access once you approve the quote.'],
      ['Will I lose any content?', 'A full backup is taken before any fix, so your content and settings can be restored if needed.'],
      ['Can you stop my site being hacked again?', 'After cleanup I update WordPress, themes and plugins, remove unused ones, reset passwords and add security hardening to lower the risk.'],
      ['Do you offer ongoing maintenance?', 'Yes. After the fix, monthly maintenance with updates, backups and monitoring is available if you want it.'],
    ],
  },
];

module.exports = ({ ROOT, SITE, WA, esc, headCommon, contact, projectCards }) => {
  const waIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.8 1 3.8 1.5 5.8 1.5 6.6 0 12-5.4 12-12S18.6 0 12 0zm5.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3 2.4 1 2.9.8 3.4.7.5-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3z"/></svg>';
  LPS.forEach(p => {
    const url = `${SITE}/${p.slug}/`;
    const waLink = `https://wa.me/${WA}?text=${encodeURIComponent(p.wa)}`;
    // Portfolio cards without links (no exits to case studies on an ad page)
    const cards = projectCards(p.work)
      .replace(/<a class="work-card reveal" href="[^"]*"[^>]*>/g, '<div class="work-card reveal">')
      .replace(/<\/a>/g, '</div>');
    // Contact form: preselect the project type for this offer
    const form = contact
      .replace(`<option>${esc(p.type)}</option>`, `<option selected>${esc(p.type)}</option>`)
      .replace('<input type="hidden" name="form-name" value="contact">', '<input type="hidden" name="form-name" value="contact">\n            <input type="hidden" name="utm" value="">');
    const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: p.faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
    const html = `${headCommon(p.title, p.description, url, `  <meta property="og:type" content="website">
  <script type="application/ld+json">
${JSON.stringify(faqSchema, null, 2)}
  </script>
`).replace('<meta name="robots" content="index, follow, max-image-preview:large">', '<meta name="robots" content="noindex, follow">')}
<body class="lp-ad">

  <!-- Generated by tools/lp-pages.js (ad landing page, noindex) -->
  <header class="header lp-ad-header" id="top">
    <div class="container nav">
      <span class="brand" aria-label="Samverse">
        <img src="/assets/logo-mark.svg" alt="" width="40" height="40">
        <span class="brand-text">sam<span class="grad">verse</span></span>
      </span>
      <a href="tel:+917417049145" class="btn btn-ghost lp-ad-call">+91 74170 49145</a>
    </div>
  </header>

  <main>
    <section class="hero lp-hero">
      <div class="container">
        <div class="lp-hero-copy">
          <span class="eyebrow">${esc(p.eyebrow)}</span>
          <h1>${p.h1}</h1>
          <p class="lead">${esc(p.sub)}</p>
          <div class="lp-ad-ctas">
            <a href="#contact" class="btn">${esc(p.cta)}</a>
            <a href="${waLink}" class="btn btn-ghost" target="_blank" rel="noopener">${waIcon} WhatsApp Now</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow">The offer</span>
          <h2>${esc(p.includedTitle)}</h2>
        </div>
        <ol class="process lp-ad-included">
${p.included.map(([t, d], i) => `          <li class="reveal"><span class="step">${String(i + 1).padStart(2, '0')}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></li>`).join('\n')}
        </ol>
      </div>
    </section>

    <section class="section" id="work">
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow">Recent work</span>
          <h2>Websites I have built</h2>
        </div>
        <div class="work-grid" id="workGrid">
${cards}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow">How it works</span>
          <h2>Three simple steps</h2>
        </div>
        <ol class="process lp-ad-steps">
${p.steps.map(([t, d], i) => `          <li class="reveal"><span class="step">0${i + 1}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></li>`).join('\n')}
        </ol>
        <p style="text-align:center;margin-top:28px"><a href="#contact" class="btn">${esc(p.cta)}</a></p>
      </div>
    </section>

    <section class="section">
      <div class="container faq-wrap">
        <div class="section-head reveal">
          <span class="eyebrow">FAQs</span>
          <h2>Questions before you start</h2>
        </div>
        <div class="faq reveal">
${p.faqs.map(([q, a]) => `          <details>\n            <summary>${esc(q)}</summary>\n            <p>${esc(a)}</p>\n          </details>`).join('\n')}
        </div>
      </div>
    </section>

    ${form}
  </main>

  <footer class="footer lp-ad-footer">
    <div class="container"><p>© <span id="year">2026</span> Samverse. Freelance WordPress and Shopify developer, Pune, India.</p></div>
  </footer>

  <nav class="lp-sticky" aria-label="Quick contact">
    <a href="tel:+917417049145">Call</a>
    <a href="${waLink}" target="_blank" rel="noopener">WhatsApp</a>
    <a href="#contact" class="lp-sticky-quote">Get Quote</a>
  </nav>

  <script src="/script.js?v=20261112b" defer></script>
</body>
</html>
`;
    const dir = path.join(ROOT, p.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
    console.log('built', `/${p.slug}/ (ad landing page, noindex)`);
  });
};
