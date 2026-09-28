// Standalone pages built by tools/build-pages.js: calculator, about, glossary.
// Each entry: slug, title, description, crumb, eyebrow, h1 (HTML), lead, main (HTML), optional script (plain JS), schema(url).
const SITE = 'https://samverse.space';
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---------------------------------------------------------------------------
// Glossary terms (plain-English definitions for business owners)
// ---------------------------------------------------------------------------
const GLOSSARY = [
  ['301 redirect', 'A permanent redirect that sends visitors and search engines from an old URL to a new one, passing on most of the old page\'s ranking value. Essential when you change URLs or redesign a site.'],
  ['Backup', 'A saved copy of your website\'s files and database that can be restored if something goes wrong. Good backups run automatically and are stored off-site.'],
  ['Block editor (Gutenberg)', 'WordPress\'s built-in editor, where pages are built from blocks like paragraphs, images and buttons. It\'s lightweight and free.'],
  ['Bounce rate', 'The share of visitors who leave without interacting further. In Google Analytics 4 the related metric is engagement rate.'],
  ['Cache / caching', 'Storing ready-made copies of pages so they load instantly instead of being built from scratch for every visitor. One of the biggest speed improvements for WordPress.'],
  ['CDN (Content Delivery Network)', 'A network of servers around the world that delivers your images and files from a location close to each visitor, making the site faster.'],
  ['CMS (Content Management System)', 'Software that lets you create and edit website content without coding. WordPress is the most widely used CMS.'],
  ['Conversion', 'A visitor taking the action you want, such as submitting a form, calling, clicking WhatsApp or buying.'],
  ['Core Web Vitals', 'Google\'s three user-experience metrics: LCP (loading), INP (responsiveness) and CLS (visual stability).'],
  ['CTA (Call to Action)', 'A button or link that tells visitors what to do next, like "Get a Free Quote" or "Book an Appointment".'],
  ['DNS (Domain Name System)', 'The system that connects your domain name to the server hosting your website and email. Nameservers and DNS records control where your domain points.'],
  ['Domain name', 'Your website\'s address, like example.com. It\'s renewed every year with a domain registrar.'],
  ['Elementor', 'A popular drag-and-drop page builder for WordPress that lets you design pages visually. Elementor Pro adds theme templates, forms and popups.'],
  ['Favicon', 'The small icon shown in browser tabs and bookmarks next to your site\'s name.'],
  ['Google Business Profile', 'Your free business listing on Google Search and Maps, showing your hours, reviews, photos and website. Key for local SEO.'],
  ['Google Search Console', 'A free Google tool showing how your site appears in search, which queries bring clicks, and any indexing or security problems.'],
  ['GA4 (Google Analytics 4)', 'Google\'s free analytics tool for measuring visitors, traffic sources and conversions on your website.'],
  ['Hosting', 'The service that stores your website on a server and makes it available on the internet. Quality hosting affects speed and uptime.'],
  ['HTTPS / SSL certificate', 'Encryption that secures the connection between visitors and your website, shown by the padlock in the browser. Required for trust and SEO.'],
  ['Indexing', 'When Google adds a page to its database so it can appear in search results. Pages that aren\'t indexed can\'t rank.'],
  ['Keyword', 'A word or phrase people type into search engines. SEO involves creating pages that match the keywords your customers use.'],
  ['Landing page', 'A focused page designed for one goal, usually capturing leads from an ad campaign.'],
  ['Lazy loading', 'Loading images and videos only when they are about to scroll into view, which speeds up the initial page load.'],
  ['Local SEO', 'Optimizing your website and Google Business Profile to appear in local searches like "dentist near me" and in Google Maps.'],
  ['Meta description', 'A short summary of a page (around 150–160 characters) that often appears under the title in Google results.'],
  ['Mobile-first / responsive design', 'Design that adapts to every screen size, built primarily for phones since most visitors browse on mobile.'],
  ['Payment gateway', 'A service like Razorpay, PayU or Cashfree that processes online payments by UPI, card and net banking on your website.'],
  ['Plugin', 'An add-on that extends WordPress with new features, such as forms, SEO tools, security or WooCommerce.'],
  ['Schema markup (structured data)', 'Code that helps search engines understand your content, such as your business details, FAQs, products or articles, and can enable rich results.'],
  ['SEO (Search Engine Optimization)', 'Improving your website so it ranks higher in search engines for the searches your customers make.'],
  ['Sitemap (XML sitemap)', 'A file listing the pages on your website to help search engines find and index them.'],
  ['Slug', 'The part of a URL that identifies a specific page, like /wordpress-maintenance/.'],
  ['Staging site', 'A private copy of your website used to build and test changes before they go live.'],
  ['Theme', 'The design framework that controls how a WordPress site looks. Popular lightweight themes include Astra and Hello Elementor.'],
  ['Title tag', 'The page title shown in browser tabs and as the clickable headline in Google results. One of the most important on-page SEO elements.'],
  ['Uptime', 'The percentage of time your website is online and working. Good hosting keeps uptime very high.'],
  ['UX (User Experience)', 'How easy and pleasant your website is to use, from navigation and readability to speed and mobile usability.'],
  ['WooCommerce', 'A free plugin that turns WordPress into a full online store with products, cart, checkout and payment gateways.'],
  ['WordPress', 'Free, open-source software for building websites. It powers a large share of all websites, from blogs to large business sites.'],
  ['White-label development', 'Work done by a developer on behalf of an agency and delivered under the agency\'s brand, without the developer being credited.'],
];
const termId = t => t.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// ---------------------------------------------------------------------------
// Cost calculator (numbers mirror /blog/wordpress-website-cost-india/)
// ---------------------------------------------------------------------------
const calculatorMain = `
    <section class="section" style="padding-top:10px">
      <div class="container calc">
        <form class="calc-form" id="calc" onsubmit="return false">
          <fieldset>
            <legend>1. What kind of website?</legend>
            <div class="calc-options">
              <label><input type="radio" name="type" value="landing"> <span><strong>Landing page</strong><small>1 page for ads or a single offer</small></span></label>
              <label><input type="radio" name="type" value="business" checked> <span><strong>Business website</strong><small>5–8 pages</small></span></label>
              <label><input type="radio" name="type" value="large"> <span><strong>Large / B2B website</strong><small>Many pages, catalogue</small></span></label>
              <label><input type="radio" name="type" value="store"> <span><strong>Online store</strong><small>WooCommerce</small></span></label>
            </div>
          </fieldset>

          <fieldset>
            <legend>2. How many pages? <output id="pagesOut">8</output></legend>
            <input type="range" id="pages" name="pages" min="1" max="40" value="8" aria-label="Number of pages">
          </fieldset>

          <fieldset id="productsSet" hidden>
            <legend>3. How many products? <output id="productsOut">50</output></legend>
            <input type="range" id="products" name="products" min="10" max="500" step="10" value="50" aria-label="Number of products">
          </fieldset>

          <fieldset>
            <legend>Extras you need</legend>
            <div class="calc-checks">
              <label><input type="checkbox" name="extra" value="design"> Custom design from Figma / XD</label>
              <label><input type="checkbox" name="extra" value="blog"> Blog section</label>
              <label><input type="checkbox" name="extra" value="booking"> Appointment / booking system</label>
              <label><input type="checkbox" name="extra" value="payments"> Online payments (fees, donations)</label>
              <label><input type="checkbox" name="extra" value="multilingual"> Multiple languages</label>
              <label><input type="checkbox" name="extra" value="seo"> Full SEO setup</label>
              <label><input type="checkbox" name="extra" value="speed"> Advanced speed optimization</label>
              <label><input type="checkbox" name="extra" value="content"> Content writing</label>
            </div>
          </fieldset>

          <fieldset>
            <legend>Ongoing care</legend>
            <label class="calc-single"><input type="checkbox" id="maint"> Monthly maintenance (updates, backups, security, small changes)</label>
          </fieldset>
        </form>

        <aside class="calc-result" aria-live="polite">
          <span class="eyebrow">Estimated cost</span>
          <p class="calc-price" id="price">₹15,000 – ₹40,000</p>
          <p class="calc-maint" id="maintOut" hidden></p>
          <ul class="calc-summary" id="summary"></ul>
          <a class="btn btn-block" id="calcWa" href="https://wa.me/917417049145" target="_blank" rel="noopener">Get an Exact Quote on WhatsApp</a>
          <a class="btn btn-ghost btn-block" href="#contact" style="margin-top:10px">Or Send Your Requirements</a>
          <p class="calc-note">Estimates use typical Indian freelance market ranges and are a guide, not a quote. Your final price depends on design, content and features. See <a href="/blog/wordpress-website-cost-india/">the full cost breakdown</a>.</p>
        </aside>
      </div>
    </section>

    <section class="section">
      <div class="container faq-wrap">
        <div class="section-head"><span class="eyebrow">FAQ</span><h2>About website costs</h2></div>
        <div class="faq">
          <details><summary>Why do website prices vary so much?</summary><p>Prices depend on the number of unique page designs, features like payments or bookings, whether content is ready, and how much speed and SEO work is included. A clear brief gets you an accurate fixed quote.</p></details>
          <details><summary>What yearly costs should I budget for?</summary><p>A domain (roughly ₹500–₹1,200 a year), hosting (roughly ₹2,500–₹15,000 a year) and any premium plugin licences. Maintenance plans are optional but recommended.</p></details>
          <details><summary>Is the estimate a fixed price?</summary><p>No. It's a guide based on typical market ranges. Share your requirements and you'll get a fixed quote within 24 hours.</p></details>
          <details><summary>Do I own the website after it's built?</summary><p>Yes. With WordPress you own your website, content and data, and you get full admin access.</p></details>
        </div>
      </div>
    </section>`;

const calculatorScript = `
(function () {
  var BASE = { landing: [5000, 15000, 1], business: [15000, 40000, 8], large: [35000, 80000, 20], store: [30000, 90000, 10] };
  var LABEL = { landing: 'Landing page', business: 'Business website', large: 'Large / B2B website', store: 'WooCommerce store' };
  var EXTRA = {
    design: [10000, 30000, 'Custom design'], blog: [3000, 6000, 'Blog'], booking: [8000, 20000, 'Booking system'],
    payments: [5000, 12000, 'Online payments'], multilingual: [10000, 25000, 'Multiple languages'], seo: [5000, 12000, 'Full SEO setup'],
    speed: [5000, 12000, 'Speed optimization'], content: [0, 0, 'Content writing']
  };
  var f = document.getElementById('calc');
  var inr = function (n) { return '\\u20B9' + (Math.round(n / 500) * 500).toLocaleString('en-IN'); };
  function calc() {
    var type = f.querySelector('input[name=type]:checked').value;
    var pages = +f.pages.value, products = +f.products.value;
    document.getElementById('pagesOut').textContent = pages;
    document.getElementById('productsOut').textContent = products;
    document.getElementById('productsSet').hidden = type !== 'store';
    var b = BASE[type], lo = b[0], hi = b[1], items = [LABEL[type]];
    var extraPages = Math.max(0, pages - b[2]);
    if (type === 'landing') extraPages = Math.max(0, pages - 1);
    if (extraPages) { lo += extraPages * 1500; hi += extraPages * 3000; items.push(pages + ' pages'); }
    if (type === 'store') { var blocks = Math.max(0, Math.ceil((products - 50) / 50)); lo += blocks * 3000; hi += blocks * 6000; items.push(products + ' products'); }
    f.querySelectorAll('input[name=extra]:checked').forEach(function (c) {
      var e = EXTRA[c.value];
      if (c.value === 'content') { lo += pages * 1000; hi += pages * 2500; } else { lo += e[0]; hi += e[1]; }
      items.push(e[2]);
    });
    document.getElementById('price').textContent = inr(lo) + ' \\u2013 ' + inr(hi);
    var m = document.getElementById('maint').checked, mo = document.getElementById('maintOut');
    mo.hidden = !m; mo.textContent = '+ ' + inr(2000) + ' \\u2013 ' + inr(6000) + ' per month for maintenance';
    if (m) items.push('Monthly maintenance');
    document.getElementById('summary').innerHTML = items.map(function (i) { return '<li>' + i + '</li>'; }).join('');
    var msg = 'Hi Sameer, I used your website cost calculator.\\n\\nProject: ' + items.join(', ') + '\\nEstimate shown: ' + inr(lo) + ' - ' + inr(hi) + '\\n\\nCan you give me an exact quote?';
    document.getElementById('calcWa').href = 'https://wa.me/917417049145?text=' + encodeURIComponent(msg);
    if (typeof gtag === 'function') gtag('event', 'calculator_used', { type: type });
  }
  f.addEventListener('input', calc);
  f.addEventListener('change', calc);
  calc();
})();`;

module.exports = [
  {
    slug: 'website-cost-calculator',
    crumb: 'Website Cost Calculator',
    title: 'Website Cost Calculator India: Estimate Your WordPress Site | Samverse',
    description: 'Free website cost calculator for India. Choose your website type, pages and features to get an instant estimate for a WordPress site or WooCommerce store.',
    eyebrow: 'Free tool',
    h1: 'Website <span class="grad">cost calculator</span>',
    lead: 'Get an instant estimate for your WordPress website or online store. Pick what you need, and when you\'re ready, get an exact fixed quote on WhatsApp.',
    main: calculatorMain,
    script: calculatorScript,
    priority: '0.9',
    schema: url => ({
      '@type': 'WebApplication', name: 'Website Cost Calculator (India)', url, applicationCategory: 'BusinessApplication',
      operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
      creator: { '@type': 'Person', '@id': `${SITE}/#sameer`, name: 'Sameer Gupta' },
    }),
  },
  {
    slug: 'about',
    crumb: 'About',
    title: 'About Sameer Gupta: Freelance WordPress Developer | Samverse',
    description: 'Meet Sameer Gupta, the freelance WordPress developer behind Samverse. Building fast, responsive, SEO-friendly websites for businesses and agencies since 2020.',
    eyebrow: 'About',
    h1: 'Hi, I\'m <span class="grad">Sameer Gupta</span>',
    lead: 'I\'m a freelance WordPress developer in India. I build fast, responsive, SEO-friendly websites for businesses, professionals and agencies, and I\'ve been doing it full time since 2020.',
    priority: '0.7',
    main: `
    <section class="section" style="padding-top:10px">
      <div class="container about-page">
        <div class="about-page-body">
          <h2>How Samverse started</h2>
          <p>When COVID pushed businesses online in 2020, many owners suddenly needed a proper website, fast. I started building WordPress websites to help them get there, and it quickly became my full-time work.</p>
          <p>Since then I've built websites for an electronics manufacturer, an AI automation agency, a growth marketing agency, an industrial automation media portal, a large temple directory, a doctor's wellness practice and a generator rental company, among others. You can see them in my <a href="/work/">portfolio</a>.</p>

          <h2>What I focus on</h2>
          <p>I care about the things that actually bring business: a site that looks professional on every phone, loads quickly, shows up on Google, and makes it easy for visitors to get in touch. And I build sites you can update yourself, so you're never stuck waiting for a developer.</p>

          <h2>Who I work with</h2>
          <ul>
            <li><strong>Business owners</strong> who need a new website, a redesign or an online store</li>
            <li><strong>Doctors, consultants and professionals</strong> building a personal brand</li>
            <li><strong>Manufacturers and B2B companies</strong> that want more enquiries</li>
            <li><strong>Agencies</strong> that need a reliable <a href="/wordpress-developer-for-agencies/">white-label WordPress developer</a></li>
          </ul>

          <h2>How I work</h2>
          <ul>
            <li>A clear, fixed quote before we start, usually within 24 hours</li>
            <li>Direct communication with me on WhatsApp, email or calls, with no middlemen</li>
            <li>Designs shared for feedback before the full build</li>
            <li>Testing on real devices, speed optimization and SEO basics before launch</li>
            <li>Support after launch, and ongoing <a href="/wordpress-maintenance/">maintenance</a> if you want it</li>
          </ul>
        </div>

        <aside class="about-page-side">
          <div class="about-card">
            <div class="avatar">SG</div>
            <p class="about-name">Sameer Gupta</p>
            <p class="muted">WordPress &amp; Web Developer</p>
            <ul class="about-meta">
              <li><span>Based in</span> Pune, India</li>
              <li><span>Working since</span> 2020</li>
              <li><span>Works with</span> Clients &amp; agencies</li>
            </ul>
          </div>
          <div class="about-skills">
            <strong>Tools I use</strong>
            <ul>
              <li>WordPress</li><li>Elementor Pro</li><li>WooCommerce</li><li>Astra</li><li>Hello Elementor</li><li>Rank Math</li><li>Yoast SEO</li><li>LiteSpeed Cache</li><li>WP Rocket</li><li>Google Search Console</li><li>Google Analytics 4</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>`,
    schema: url => ({
      '@type': 'ProfilePage', url, name: 'About Sameer Gupta',
      mainEntity: {
        '@type': 'Person', '@id': `${SITE}/#sameer`, name: 'Sameer Gupta', jobTitle: 'Freelance WordPress Developer',
        url: `${SITE}/`, email: 'mailto:sameergpt9719@gmail.com', telephone: '+91-7417049145',
        address: { '@type': 'PostalAddress', addressLocality: 'Pune', addressRegion: 'Maharashtra', addressCountry: 'IN' },
        knowsAbout: ['WordPress', 'Elementor', 'WooCommerce', 'Website Speed Optimization', 'Search Engine Optimization', 'Responsive Web Design'],
      },
    }),
  },
  {
    slug: 'wordpress-glossary',
    crumb: 'WordPress Glossary',
    title: 'WordPress & Website Glossary for Business Owners | Samverse',
    description: 'Plain-English definitions of 40 website terms business owners hear: WordPress, hosting, DNS, SSL, SEO, Core Web Vitals, WooCommerce, schema, caching and more.',
    eyebrow: 'Glossary',
    h1: 'Website terms, <span class="grad">in plain English</span>',
    lead: 'Confused by hosting, DNS, SSL or Core Web Vitals? Here are 40 terms you\'ll hear when building a website, explained simply for business owners.',
    priority: '0.6',
    main: `
    <section class="section" style="padding-top:10px">
      <div class="container faq-wrap">
        <nav class="glossary-index" aria-label="Glossary terms">
${GLOSSARY.map(([t]) => `          <a href="#${termId(t)}">${esc(t)}</a>`).join('\n')}
        </nav>
        <dl class="glossary">
${GLOSSARY.map(([t, d]) => `          <div class="glossary-item" id="${termId(t)}"><dt>${esc(t)}</dt><dd>${esc(d)}</dd></div>`).join('\n')}
        </dl>
        <p class="related-all">Want to go deeper? Read the <a href="/blog/" class="link-inline">blog</a> or <a href="#contact" class="link-inline">ask me a question</a>.</p>
      </div>
    </section>`,
    schema: url => ({
      '@type': 'DefinedTermSet', '@id': `${url}#terms`, name: 'WordPress & Website Glossary', url,
      hasDefinedTerm: GLOSSARY.map(([t, d]) => ({ '@type': 'DefinedTerm', name: t, description: d, url: `${url}#${termId(t)}` })),
    }),
  },
  {
    // Describes only what this site actually does: contact form email, WhatsApp, GA4, Clarity and Google AdSense (blog pages).
    slug: 'privacy-policy',
    crumb: 'Privacy Policy',
    title: 'Privacy Policy | Samverse',
    description: 'How samverse.space collects and uses information: contact form enquiries, WhatsApp, Google Analytics, Microsoft Clarity and Google AdSense cookies, and your choices.',
    eyebrow: 'Legal',
    h1: 'Privacy <span class="grad">policy</span>',
    lead: 'This page explains what information samverse.space collects, why, and the choices you have. Last updated: 28 September 2026.',
    priority: '0.3',
    main: `
    <section class="section" style="padding-top:10px">
      <div class="container about-page">
        <div class="about-page-body">
          <h2>Who we are</h2>
          <p>samverse.space is the website of Sameer Gupta, a freelance WordPress developer based in Pune, India ("I", "me"). For any privacy question, email <a href="mailto:sameergpt9719@gmail.com">sameergpt9719@gmail.com</a>.</p>

          <h2>Information you give me</h2>
          <p>When you use the contact form, you share your name, phone or WhatsApp number, email address (optional), project type and message. This is emailed to me so I can reply to your enquiry. After you submit the form, WhatsApp may open so we can continue the conversation there; WhatsApp's own privacy policy applies to chats on WhatsApp.</p>
          <p>I use these details only to respond to your enquiry and, if we work together, to deliver the project. I don't sell your information or add you to marketing lists without your consent.</p>

          <h2>Analytics</h2>
          <p>To understand how visitors use the site and improve it, the site may use:</p>
          <ul>
            <li><strong>Google Analytics 4</strong>, which uses cookies to measure visits, pages viewed, traffic sources and actions like form submissions or WhatsApp clicks</li>
            <li><strong>Microsoft Clarity</strong>, which uses cookies to show aggregated heatmaps and session recordings of how pages are used</li>
          </ul>
          <p>These tools collect information such as your device, browser, approximate location and interactions with the site. I don't use them to identify you personally.</p>

          <h2>Advertising</h2>
          <p>Some blog pages may show ads served by Google AdSense. Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visits to this and other sites on the internet.</p>
          <p>You can opt out of personalised advertising by visiting Google's Ads Settings. You can also learn how Google uses information from sites that use its services on Google's "How Google uses information from sites or apps that use our services" page.</p>

          <h2>Cookies and your choices</h2>
          <p>You can block or delete cookies in your browser settings. The site works without analytics and advertising cookies, although some measurements won't be recorded.</p>

          <h2>Hosting and security</h2>
          <p>The site is hosted on Netlify and served over HTTPS. Form submissions are processed by a secure server function and delivered by email. No payment information is collected on this site.</p>

          <h2>How long information is kept</h2>
          <p>Enquiry emails are kept as long as needed to respond and for reasonable business records. Analytics data is kept according to the retention settings of the analytics tools.</p>

          <h2>Your rights</h2>
          <p>You can ask me to access, correct or delete the personal information you've shared by emailing <a href="mailto:sameergpt9719@gmail.com">sameergpt9719@gmail.com</a>. I'll respond within a reasonable time.</p>

          <h2>Links to other websites</h2>
          <p>This site links to client websites and other services. Their privacy practices are their own, so please review their policies.</p>

          <h2>Changes to this policy</h2>
          <p>I may update this policy when the site or the tools it uses change. The date at the top shows when it was last updated.</p>
        </div>
      </div>
    </section>`,
    schema: url => ({ '@type': 'WebPage', '@id': `${url}#page`, name: 'Privacy Policy', url, dateModified: '2026-09-28' }),
  },
];
