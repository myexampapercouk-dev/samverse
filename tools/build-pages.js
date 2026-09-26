// Generates the industry landing pages from the PAGES data below.
// Header, process, contact form and footer are copied from index.html so they stay in sync.
// Run after editing index.html or this file:   node tools/build-pages.js
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://samverse.space';
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

const PAGES = [
  {
    slug: 'wordpress-developer-for-agencies',
    nav: 'For Agencies',
    title: 'White-Label WordPress Developer for Agencies | Samverse',
    description: 'Outsource WordPress and Elementor development to a reliable white-label developer in India. Your brand, your client relationship, fixed quotes and on-time delivery.',
    eyebrow: 'For digital & design agencies',
    h1: 'Your <span class="grad">white-label</span> WordPress developer',
    lead: 'You win the client, I build the website. I turn your agency\'s designs and briefs into fast, responsive WordPress sites under your brand, so you can take on more projects without hiring.',
    wa: 'Hi Sameer, I run an agency and want to discuss white-label WordPress work.',
    painTitle: 'Why agencies outsource to me',
    pains: [
      ['Your name, not mine', 'I work behind the scenes under NDA. No contact with your clients unless you want it, and no credits on the site.'],
      ['Design to WordPress, accurately', 'Figma, XD or PDF designs built pixel-accurately in Elementor or your preferred theme.'],
      ['Clear, fixed quotes', 'A fixed price per project before work starts, so you can quote your client with confidence and keep your margin.'],
      ['Handles the overflow', 'Take on extra projects in busy months without hiring or training a full-time developer.'],
    ],
    getsTitle: 'What I can take off your plate',
    gets: ['Business & corporate websites', 'Landing pages for ad campaigns', 'WooCommerce stores', 'Theme & Elementor customization', 'Speed optimization & Core Web Vitals', 'Site migrations & redesigns', 'Monthly maintenance for your clients', 'Bug fixes & urgent updates'],
    projects: ['Third Eye Social', 'Streak Creative', 'Vansh Group', 'India Automation Hub'],
    faqs: [
      ['Do you work under NDA?', 'Yes. I\'m happy to sign an NDA, and I never contact your clients directly or add my credit to the sites I build for you.'],
      ['How do you price agency work?', 'Each project gets a fixed quote based on the pages and features in your brief. Regular partners get priority scheduling.'],
      ['What do you need from us to start?', 'The design files or reference sites, the content (or a note on who provides it), and hosting or staging access. I\'ll confirm scope and timeline before starting.'],
      ['Can you handle ongoing maintenance for our clients?', 'Yes. I can manage updates, backups, security checks and small changes on a monthly basis for your client sites.'],
    ],
  },
  {
    slug: 'wordpress-website-for-doctors',
    nav: 'Doctors & Clinics',
    title: 'Website Design for Doctors & Clinics in India | WordPress | Samverse',
    description: 'Professional WordPress websites for doctors, clinics and hospitals. Mobile-friendly, fast, found on Google, with appointment enquiries straight to WhatsApp.',
    eyebrow: 'For doctors, clinics & hospitals',
    h1: 'Websites that help <span class="grad">patients find you</span> and book',
    lead: 'Patients search on Google before they choose a doctor. I build professional, mobile-friendly clinic websites that build trust, rank for local searches and turn visitors into appointment enquiries.',
    wa: 'Hi Sameer, I need a website for my clinic / practice.',
    painTitle: 'What a good clinic website does for you',
    pains: [
      ['Builds trust before the visit', 'Your qualifications, experience, treatments and clinic photos presented professionally, so patients choose you with confidence.'],
      ['Gets found in local search', 'SEO set up for searches like "dermatologist near me" or "best orthopaedic doctor in [city]", along with your Google Business Profile.'],
      ['Makes booking easy', 'One-tap call, WhatsApp and appointment enquiry forms that work perfectly on the phones your patients use.'],
      ['Easy for your staff to update', 'Timings, notices and new treatments can be updated without calling a developer.'],
    ],
    getsTitle: 'What your clinic website includes',
    gets: ['Doctor profile & qualifications', 'Treatments & services pages', 'Appointment enquiry form', 'WhatsApp & one-tap call buttons', 'Google Maps & clinic timings', 'Patient testimonials section', 'Local SEO setup', 'Fast, mobile-first design'],
    projects: ['Dr. Sudhir Arora'],
    faqs: [
      ['Can patients book appointments on the website?', 'Yes. I can add an appointment enquiry form that emails you and opens WhatsApp, or integrate a booking system if you use one.'],
      ['Will my clinic show up on Google?', 'I set up on-page SEO, schema markup for medical practices, a sitemap and Search Console, and help link your Google Business Profile. That gives you the right foundation for local searches.'],
      ['How long does a clinic website take?', 'Usually 1–2 weeks once I have your content: photos, qualifications and the list of treatments.'],
      ['Can you write the content for the site?', 'I can structure the pages and help polish your content. Medical details should come from you so they are accurate.'],
    ],
  },
  {
    slug: 'website-for-manufacturers',
    nav: 'Manufacturers & B2B',
    title: 'Website Design for Manufacturers & Industrial Companies | Samverse',
    description: 'WordPress websites for manufacturers, industrial suppliers and B2B companies. Product catalogues, enquiry forms and SEO that bring in bulk and export enquiries.',
    eyebrow: 'For manufacturers, industrial & B2B',
    h1: 'B2B websites that <span class="grad">bring in enquiries</span>',
    lead: 'Buyers and procurement teams check your website before they call. I build clear, professional websites for manufacturers and industrial suppliers that show your products and capability, and turn visits into RFQs.',
    wa: 'Hi Sameer, I need a website for my manufacturing / B2B company.',
    painTitle: 'What your B2B website should do',
    pains: [
      ['Show your capability', 'Products, certifications, facilities and clients presented so buyers take you seriously from the first visit.'],
      ['Organise large catalogues', 'Product categories, specifications and downloadable brochures that are easy to browse and easy for you to update.'],
      ['Capture enquiries', 'Quote-request forms on every product, plus WhatsApp and email, so no enquiry is lost.'],
      ['Found by the right buyers', 'SEO for your product and industry keywords, so buyers searching for what you make can find you.'],
    ],
    getsTitle: 'What your company website includes',
    gets: ['Company profile & infrastructure', 'Product catalogue with specifications', 'Request-a-quote forms', 'Brochure & datasheet downloads', 'Certifications & client logos', 'Industries served pages', 'SEO for product keywords', 'Fast, mobile-friendly design'],
    projects: ['India Automation Hub', 'Sahni Power Solutions', 'Vansh Group'],
    faqs: [
      ['Can I add and update products myself?', 'Yes. Products are managed from the WordPress dashboard, so you can add items, change specifications and upload brochures without code.'],
      ['Do you build catalogues without online payments?', 'Yes. Most B2B sites use a catalogue with "Request a Quote" instead of a cart, and I can set up either.'],
      ['Can the website support export enquiries?', 'Yes. I can structure the site for international buyers and add multilingual support if you need it.'],
      ['How long does a B2B website take?', 'Usually 2–3 weeks depending on the number of products and pages, once content is ready.'],
    ],
  },
  {
    slug: 'woocommerce-developer',
    nav: 'Online Stores',
    title: 'WooCommerce Developer in India | Online Store Setup | Samverse',
    description: 'Hire a WooCommerce developer to build your online store on WordPress: products, payment gateways like Razorpay, shipping, and a fast mobile checkout.',
    eyebrow: 'For brands & online stores',
    h1: 'Start selling online with a <span class="grad">WooCommerce</span> store',
    lead: 'Own your online store instead of paying marketplace commissions. I build fast, mobile-friendly WooCommerce stores with payments, shipping and everything set up so you can start taking orders.',
    wa: 'Hi Sameer, I want to build an online store with WooCommerce.',
    painTitle: 'Why brands choose WooCommerce with me',
    pains: [
      ['No marketplace commission', 'Sell directly to customers on your own website and keep more of every order.'],
      ['Payments & shipping ready', 'Indian payment gateways like Razorpay, PayU or Cashfree, COD options and shipping rules set up and tested.'],
      ['Fast mobile checkout', 'Most shoppers buy on their phone, so product pages and checkout are optimized for speed and ease.'],
      ['Easy to manage', 'Add products, manage stock and process orders yourself from a simple dashboard.'],
    ],
    getsTitle: 'What your store includes',
    gets: ['Product catalogue & categories', 'Payment gateway integration', 'Cash on Delivery & shipping rules', 'Order & stock management', 'Order email notifications', 'Coupons & discounts', 'WhatsApp chat button', 'Speed & SEO optimization'],
    projects: ['CNN Food & Spices', 'Our Temples'],
    faqs: [
      ['Which payment gateways can you set up?', 'Popular Indian gateways such as Razorpay, PayU, Cashfree and PhonePe, plus PayPal or Stripe for international payments, and Cash on Delivery.'],
      ['How many products can the store have?', 'WooCommerce handles anything from a few products to thousands. I can also import your existing product list from a spreadsheet.'],
      ['Can I manage orders on my phone?', 'Yes. You can manage orders from the WordPress dashboard in your browser or the WooCommerce mobile app.'],
      ['How long does a store take to build?', 'Usually 2–4 weeks, depending on the number of products and features, once product details and photos are ready.'],
    ],
  },
];

const tick = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 16.2l-3.5-3.5L4 14.2l5 5 11-11-1.4-1.4z"/></svg>';

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
  <meta property="og:image" content="${SITE}/assets/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="${SITE}/assets/og-image.png">
  <meta name="theme-color" content="#6D4AFF">
  <link rel="icon" type="image/svg+xml" href="/assets/logo-mark.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32.png">
  <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <script src="/config.js"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/style.css">
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
        <div class="lp-hero-copy reveal">
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

    <section class="section" id="work">
      <div class="container">
        <div class="section-head reveal">
          <span class="eyebrow">Related work</span>
          <h2>Websites I've built</h2>
          <p class="muted">Live projects. Click a card to visit the site, or <a href="/#work" class="link-inline">see the full portfolio</a>.</p>
        </div>
        <div class="work-grid" id="workGrid" data-projects="${esc(p.projects.join('|'))}"></div>
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

    ${contact}
  </main>

  ${footer}

  ${waFloat.replace(/href="[^"]*"/, `href="${waLink}"`)}

  <script src="/script.js" defer></script>
</body>
</html>
`;
};

for (const p of PAGES) {
  const dir = path.join(ROOT, p.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), render(p));
  console.log('built', `/${p.slug}/`);
}

// Keep the sitemap in step with the pages
const today = new Date().toISOString().slice(0, 10);
const urls = [{ loc: `${SITE}/`, pr: '1.0' }, ...PAGES.map(p => ({ loc: `${SITE}/${p.slug}/`, pr: '0.8' }))];
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${u.pr}</priority>\n  </url>`).join('\n')}
</urlset>
`);
console.log('updated sitemap.xml');

module.exports = { PAGES };
