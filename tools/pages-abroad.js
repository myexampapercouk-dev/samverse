// Landing pages for overseas clients (UK, USA, Canada, UAE/GCC, Europe). Same 'location' system as pages-cities.js.
// Each page is written for its region: time zone overlap, invoicing currency, tax and platform specifics.
// Keep claims factual: the only overseas case study is Southern Flavours (UK). No prices, no invented clients.

const wa = region => `Hi, I found your ${region} page. I need help with a WordPress or Shopify website.`;

const commonFaqs = (region, cur) => [
  [`How do I pay a developer in India from the ${region}?`, `You are invoiced in ${cur} and can pay by international bank transfer or a common online payment method agreed at the start. Every invoice is itemised against the written scope, and larger projects are split into milestones.`],
  ['Will I own the website, domain and store?', 'Yes. The domain, hosting, Shopify store, payment accounts and apps are registered in your business name and you pay those providers directly. I work inside your accounts as a collaborator or staff user, so you can remove my access at any time.'],
  ['How much will my website cost?', 'It depends on the number of pages, features and whether you need a store. Send a short note through the contact page or WhatsApp with what you need, and you get a written scope and fixed quote, usually within 24 hours.'],
];

const remoteSteps = (region, when) => [
  ['Free review', `Send your current site, store or a short brief by email or WhatsApp. I review it and reply with a recommendation, ${when}.`],
  ['Written scope and fixed quote', 'You get a scope listing every page and feature, a fixed price and a timeline before any work starts.'],
  ['Build on staging', 'The site is built on a private staging link. You review it in your own time and leave feedback; changes are usually waiting for you the next working day.'],
  ['Launch and handover', `After your approval it goes live at a quiet time for your ${region} customers, with logins in your name and a recorded walkthrough for your team.`],
];

const page = c => ({
  type: 'location',
  slug: c.slug,
  nav: c.nav,
  title: c.title,
  description: c.description,
  eyebrow: c.eyebrow,
  h1: c.h1,
  lead: c.lead,
  wa: wa(c.region),
  painTitle: `Why ${c.region} businesses hire me`,
  pains: c.pains,
  getsTitle: `What I build for ${c.region} businesses`,
  gets: c.gets,
  projects: c.projects,
  areaServed: c.areaServed,
  readingFrom: c.readingFrom || 'hire-wordpress-developer',
  stepsTitle: `How a remote ${c.region} project runs`,
  steps: remoteSteps(c.region, c.when),
  faqs: c.faqs.concat(commonFaqs(c.region, c.cur)),
});

const country = name => ({ '@type': 'Country', name });
const city = name => ({ '@type': 'City', name });

const REGIONS = [
  {
    region: 'UK',
    cur: 'GBP',
    when: 'usually by your next morning UK time',
    slug: 'wordpress-shopify-developer-uk',
    nav: 'WordPress & Shopify Developer for the UK',
    title: 'Freelance WordPress Developer UK (and Shopify) | Samverse',
    description: 'Freelance WordPress developer for UK businesses, working remotely from India: WordPress, WooCommerce and Shopify builds, speed optimisation and fixes.',
    eyebrow: 'England, Scotland, Wales & Northern Ireland',
    h1: 'Freelance WordPress developer for <span class="grad">UK</span> businesses (and Shopify), working remotely from India',
    lead: 'I build WordPress websites, WooCommerce stores and Shopify stores for UK businesses, working remotely from India. Your mornings overlap my afternoon and evening, you are invoiced in GBP, and I have already built a live site for a UK restaurant.',
    pains: [
      ['A real UK project to look at', 'Southern Flavours, an Indian restaurant in Solihull, runs on a WordPress and WooCommerce site I built, with table reservations and online ordering.'],
      ['Working hours that overlap', 'India is 4.5 hours ahead of the UK in summer (BST) and 5.5 hours in winter (GMT), so your morning is my afternoon. Calls fit before your lunch, and fixes land while you sleep.'],
      ['Set up for UK selling', 'VAT rates and VAT-inclusive prices, Stripe or Shopify Payments, Royal Mail and courier shipping rates, and UK address formats at checkout.'],
      ['GDPR handled properly', 'Cookie consent that blocks analytics until visitors agree, a privacy policy page, and forms that only collect what you need.'],
    ],
    gets: ['WordPress business websites', 'WooCommerce stores', 'Shopify stores', 'Restaurant & booking sites', 'Website redesigns', 'Speed optimization', 'White-label work for UK agencies', 'Monthly maintenance'],
    projects: ['Southern Flavours', 'Streak Creative', 'Third Eye Social', 'Studio Agama Interiors'],
    areaServed: [country('United Kingdom'), city('London'), city('Birmingham'), city('Manchester')],
    readingFrom: 'woocommerce-developer',
    faqs: [
      ['What time are you available for UK calls?', 'India is 4.5 hours ahead of the UK during British Summer Time and 5.5 hours ahead in winter. Calls are easiest between about 8am and 1pm UK time, which is my afternoon and evening. Messages sent later in your day are usually answered by your next morning.'],
      ['Can you set up VAT on my WooCommerce or Shopify store?', 'Yes. I configure the standard, reduced and zero VAT rates you need, choose whether prices show including VAT, and set invoices to show your VAT number. Your accountant should confirm which rates apply to your products; I make the store follow them.'],
      ['Do you build for UK restaurants and hospitality?', 'Yes. The Southern Flavours site in Solihull includes table reservations with instant confirmation, a weekend buffet section, menus and a WooCommerce shop for online ordering.'],
      ['Do you work white-label for UK agencies?', 'Yes. I build from your Figma or Adobe XD designs, handle WordPress fixes and speed work, and stay in the background so your client relationship stays with you.'],
    ],
  },
  {
    region: 'USA',
    cur: 'USD',
    when: 'usually by the start of your next business day',
    slug: 'wordpress-shopify-developer-usa',
    nav: 'WordPress & Shopify Developer for the USA',
    title: 'WordPress & Shopify Developer for US Businesses | Samverse',
    description: 'Freelance WordPress and Shopify developer for US businesses: sales tax apps, ADA-minded accessibility, Stripe and Shopify Payments. Invoiced in USD.',
    eyebrow: 'East Coast to West Coast',
    h1: 'Freelance WordPress &amp; Shopify developer for <span class="grad">US</span> businesses, invoiced in USD',
    lead: 'I build WordPress websites and Shopify and WooCommerce stores for US businesses and agencies, working remotely from India. The time difference means work moves forward overnight while you sleep, you are invoiced in USD, and every account stays in your name.',
    pains: [
      ['Progress while you sleep', 'India is 9.5 to 10.5 hours ahead of US Eastern time and 12.5 to 13.5 hours ahead of Pacific. Send feedback at the end of your day and the changes are usually ready the next morning.'],
      ['Sales tax set up correctly', 'Shopify Tax, or a WooCommerce sales tax app such as TaxJar or Avalara, configured for the states where you collect tax.'],
      ['Accessibility built in', 'ADA claims usually cite WCAG. I build with proper headings, labels, contrast, alt text and keyboard navigation, and test key pages before launch.'],
      ['Payments US buyers expect', 'Stripe or Shopify Payments for cards, Apple Pay and Google Pay, plus PayPal if you want it, with US address formats and shipping rates at checkout.'],
    ],
    gets: ['Shopify stores', 'WooCommerce stores', 'WordPress business websites', 'Accessibility fixes', 'Website redesigns', 'Speed optimization', 'White-label work for US agencies', 'Monthly maintenance'],
    projects: ['Third Eye Social', 'Streak Creative', 'Southern Flavours', 'Vansh Group'],
    areaServed: [country('United States'), city('New York'), city('Los Angeles'), city('Chicago')],
    readingFrom: 'shopify-developer',
    faqs: [
      ['How do calls work with the time difference?', 'Calls are usually scheduled in your early morning on the East Coast, around 7am to 10am ET, which is my evening in India. West Coast clients mostly work by email, Loom videos and WhatsApp, with an occasional early call. Day to day, the time gap means feedback you send in the afternoon is often done by the next morning.'],
      ['Can you make my site ADA compliant?', 'I build and fix sites to follow WCAG 2.1 AA, the standard US accessibility claims usually refer to: headings, form labels, colour contrast, alt text, focus states and keyboard use. I can test and fix an existing site too. No developer can guarantee you will never receive a claim, but a site built this way is far easier to defend and to use.'],
      ['Do you handle US sales tax on Shopify or WooCommerce?', 'Yes. On Shopify I set up Shopify Tax for the states where you are registered. On WooCommerce I connect a sales tax service such as TaxJar or Avalara. Which states you must collect in is a question for your accountant; the store then follows those settings.'],
    ],
  },
  {
    region: 'Canada',
    cur: 'CAD',
    when: 'usually by the start of your next business day',
    slug: 'wordpress-shopify-developer-canada',
    nav: 'WordPress & Shopify Developer for Canada',
    title: 'WordPress & Shopify Developer for Canada | Samverse',
    description: 'Freelance WordPress and Shopify developer for Canadian businesses: GST/HST and PST setup, bilingual English and French sites, Canada Post. Invoiced in CAD.',
    eyebrow: 'Toronto, Vancouver, Montreal, Calgary & beyond',
    h1: 'WordPress &amp; Shopify developer for <span class="grad">Canadian</span> businesses',
    lead: 'I build WordPress websites and Shopify and WooCommerce stores for Canadian businesses, working remotely from India. Stores are set up for GST/HST and provincial tax, sites can run in English and French, and you are invoiced in CAD.',
    pains: [
      ['GST, HST and PST by province', 'Tax rates that change with the shipping province, set up in Shopify or WooCommerce so customers in Ontario, Quebec or BC see the right total.'],
      ['English and French', 'Bilingual sites with WPML or Polylang on WordPress, or Shopify Markets and translation apps, with a language switcher and properly translated URLs.'],
      ['Canadian shipping', 'Canada Post and courier rates, free-shipping thresholds and cross-border rules if you also sell into the US.'],
      ['Overnight progress', 'India is 9.5 to 10.5 hours ahead of Toronto and 12.5 to 13.5 hours ahead of Vancouver, so feedback sent in your afternoon is usually done by morning.'],
    ],
    gets: ['Shopify stores', 'WooCommerce stores', 'Bilingual EN/FR websites', 'WordPress business websites', 'Website redesigns', 'Speed optimization', 'Accessibility fixes', 'Monthly maintenance'],
    projects: ['Southern Flavours', 'Streak Creative', 'Third Eye Social', 'Vansh Group'],
    areaServed: [country('Canada'), city('Toronto'), city('Vancouver'), city('Montreal'), city('Calgary')],
    readingFrom: 'shopify-developer',
    faqs: [
      ['Can you build a bilingual English and French website?', 'Yes. On WordPress I use WPML or Polylang so each page has an English and a French version with its own URL, and the language switcher keeps visitors on the same page. On Shopify I use Shopify Markets with a translation app. You supply or approve the French copy; I do not machine-translate it and call it finished.'],
      ['Can you set up GST/HST on my store?', 'Yes. Shopify and WooCommerce can both charge GST, HST, PST or QST based on the customer\'s province. I set the rates and tax display your accountant confirms, and make sure your registration numbers appear on invoices.'],
      ['When can we have a call?', 'Calls work best in your early morning, roughly 7am to 10am Eastern, which is my evening. Vancouver clients usually prefer email, Loom videos and WhatsApp, with the occasional early call.'],
    ],
  },
  {
    region: 'UAE',
    cur: 'AED',
    when: 'usually the same day',
    slug: 'wordpress-shopify-developer-uae',
    nav: 'WordPress & Shopify Developer for UAE & GCC',
    title: 'WordPress & Shopify Developer Dubai & UAE | Samverse',
    description: 'Freelance WordPress and Shopify developer for Dubai, Abu Dhabi and GCC businesses: Arabic RTL sites, VAT, COD, Tabby and Tamara. Invoiced in AED.',
    eyebrow: 'Dubai, Abu Dhabi, Sharjah & the wider GCC',
    h1: 'WordPress &amp; Shopify developer for <span class="grad">Dubai &amp; the UAE</span>',
    lead: 'I build WordPress websites and Shopify and WooCommerce stores for businesses in Dubai, Abu Dhabi and across the GCC, working from India just 1.5 hours ahead of the UAE. Sites can run in Arabic and English, stores handle VAT, COD and buy-now-pay-later, and you are invoiced in AED.',
    pains: [
      ['Almost the same working day', 'India is 1.5 hours ahead of the UAE and 2.5 hours ahead of Saudi Arabia and Qatar, so we share nearly the full working day and can talk the same day you message.'],
      ['Arabic and English, done properly', 'Right-to-left Arabic layouts with mirrored menus and forms, Arabic fonts that read well, and WPML, Polylang or Shopify Markets for the language switch.'],
      ['Payments GCC shoppers use', 'Cash on delivery, cards through Stripe, Checkout.com or Shopify Payments where available, and Tabby or Tamara instalments at checkout.'],
      ['VAT-ready stores', 'UAE 5% VAT, Saudi 15% VAT and VAT-inclusive pricing, with your TRN on invoices.'],
    ],
    gets: ['Shopify stores', 'WooCommerce stores', 'Arabic RTL websites', 'WordPress business websites', 'Restaurant & booking sites', 'Website redesigns', 'Speed optimization', 'Monthly maintenance'],
    projects: ['Southern Flavours', 'Studio Agama Interiors', 'Third Eye Social', 'Dr. Sunaina Dental Care'],
    areaServed: [country('United Arab Emirates'), city('Dubai'), city('Abu Dhabi'), city('Sharjah'), country('Saudi Arabia'), country('Qatar'), country('Oman'), country('Bahrain'), country('Kuwait')],
    readingFrom: 'shopify-developer',
    faqs: [
      ['Can you build an Arabic right-to-left website?', 'Yes. WordPress handles Arabic RTL natively, and I check the theme so menus, sliders, forms and icons mirror correctly. With WPML or Polylang each page has Arabic and English versions. On Shopify I use a theme that supports RTL and Shopify Markets for translations. You supply or approve the Arabic copy.'],
      ['Can my store accept cash on delivery, Tabby and Tamara?', 'Yes. COD can be limited by emirate, city or order value, and Tabby and Tamara both offer plugins for WooCommerce and apps for Shopify. Each provider approves your business directly, and I install and test the checkout once your accounts are live.'],
      ['Do you work with businesses in Saudi Arabia, Qatar and the rest of the GCC?', 'Yes. The same setup applies across the GCC, with the VAT rate, currency and shipping zones changed for each market. Saudi Arabia and Qatar are 2.5 hours behind India, so the working day still overlaps well. Keep in mind the UAE weekend is Saturday and Sunday, while Saudi Arabia and Qatar take Friday and Saturday.'],
    ],
  },
  {
    region: 'Europe',
    cur: 'EUR',
    when: 'usually the same day',
    slug: 'wordpress-shopify-developer-europe',
    nav: 'WordPress & Shopify Developer for Europe',
    title: 'WordPress & Shopify Developer for Europe | Samverse',
    description: 'Freelance WordPress and Shopify developer for European businesses: GDPR cookie consent, multilingual WPML and Polylang sites, EU VAT OSS. Invoiced in EUR.',
    eyebrow: 'Germany, France, Netherlands, Ireland, Spain & more',
    h1: 'WordPress &amp; Shopify developer for <span class="grad">European</span> businesses',
    lead: 'I build WordPress websites and Shopify and WooCommerce stores for businesses across the EU, working remotely from India with a good overlap with Central European hours. Sites can run in several languages, stores are set up for EU VAT, and you are invoiced in EUR.',
    pains: [
      ['Most of your working day overlaps', 'India is 3.5 hours ahead of Central European time in summer and 4.5 hours in winter, so your whole morning and early afternoon fall inside my working day.'],
      ['GDPR cookie consent that works', 'A consent banner that actually blocks analytics and marketing tags until visitors opt in, connected to Google Consent Mode, with a clear privacy page.'],
      ['Multilingual without the mess', 'WPML or Polylang on WordPress, or Shopify Markets, with a page per language, hreflang tags and a switcher that keeps visitors on the same page.'],
      ['EU VAT and OSS', 'Destination-country VAT rates for cross-border sales, set up to match your One Stop Shop registration, with prices shown including VAT.'],
    ],
    gets: ['Multilingual websites', 'WooCommerce stores', 'Shopify stores', 'WordPress business websites', 'Cookie consent & GDPR setup', 'Website redesigns', 'Speed optimization', 'Monthly maintenance'],
    projects: ['Southern Flavours', 'Streak Creative', 'Third Eye Social', 'Vansh Group'],
    areaServed: [{ '@type': 'Place', name: 'European Union' }, country('Germany'), country('France'), country('Netherlands'), country('Ireland'), country('Spain'), country('Italy')],
    readingFrom: 'woocommerce-developer',
    faqs: [
      ['Is a developer outside the EU a problem for GDPR?', 'Your website and customer data stay on hosting you choose, which can be inside the EU, and the accounts are in your name. I only need admin access while working, which you can remove afterwards. I can sign your data processing agreement if your business uses one.'],
      ['Can you set up EU VAT One Stop Shop on WooCommerce or Shopify?', 'Yes. I configure each EU country\'s VAT rate so tax follows the customer\'s location, which is how OSS works for cross-border sales to consumers. Shopify handles much of this natively; on WooCommerce I use a tax rates table or a dedicated plugin. Your accountant confirms the registration; the store follows it.'],
      ['WPML or Polylang for a multilingual site?', 'WPML suits larger sites and WooCommerce stores that need translated products, attributes and checkout. Polylang is lighter and works well for brochure sites in two or three languages. I recommend one after seeing how many languages and pages you have.'],
    ],
  },
];

const pages = REGIONS.map(page);

const guides = {
  'wordpress-shopify-developer-uk': `
<h2>Freelance WordPress developer for the UK: what I do</h2>
<p>To be clear upfront: Samverse is not based in the UK. I work remotely from Pune, India, for UK clients. Everything below is work I do day to day.</p>
<h3>WordPress development</h3>
<p>New WordPress websites built on a lightweight theme or custom blocks, editable by you without a page-builder mess. Redesigns of existing sites, keeping your URLs and rankings intact.</p>
<h3>WooCommerce development</h3>
<p>WooCommerce stores with UK VAT, Stripe, PayPal and Royal Mail or courier shipping, plus fixes and upgrades on stores that already exist.</p>
<h3>Shopify development</h3>
<p>Shopify store setup, theme customisation and migrations from WooCommerce to Shopify for UK sellers who want less maintenance.</p>
<h3>WordPress speed optimisation</h3>
<p>Core Web Vitals work: image and script clean-up, caching, removing heavy plugins, and checking the checkout and cart pages, not only the homepage.</p>
<h3>WordPress technical SEO</h3>
<p>Redirects, sitemaps, schema, internal links and indexing fixes in Google Search Console, so the site is easy for Google to crawl.</p>
<h3>WordPress troubleshooting and maintenance</h3>
<p>Broken layouts after updates, plugin conflicts, white screens, malware clean-up and monthly care plans with updates and backups.</p>
<h3>WordPress hosting advice</h3>
<p>Help choosing and moving to UK or EU hosting that suits your traffic, with the account kept in your name.</p>
<h2>Why hire a freelance WordPress developer instead of an agency?</h2>
<p>You talk directly to the person building your site, decisions are faster, and you are not paying for account managers. The trade-off is capacity: one developer can take on fewer projects at once, so timelines are agreed before work starts.</p>
<h2>Hiring a WordPress or Shopify developer for a UK business</h2>
<p>If you are in the UK and comparing local agencies with a remote developer, the questions that matter are the same: can you see live work, will you own everything, and how will day-to-day communication work. This page answers those for my setup.</p>
<h2>The UK project you can check</h2>
<p><a href="/work/southern-flavours/">Southern Flavours</a> is an Indian restaurant on Stratford Road in Shirley, Solihull. The site I built on WordPress and WooCommerce has a table reservation form with party size and date selection and an instant confirmation, a weekend South Indian breakfast buffet section, menus, a gallery, and a shop for online ordering. Opening hours, address and phone appear on every page, which is what diners look for first.</p>
<h2>UK store setup checklist</h2>
<ul>
<li><strong>VAT:</strong> standard, reduced and zero rates, prices shown including VAT, and your VAT number on invoices.</li>
<li><strong>Payments:</strong> Stripe or Shopify Payments for cards, Apple Pay and Google Pay; PayPal or Klarna if you want them.</li>
<li><strong>Shipping:</strong> Royal Mail and courier rates by weight or zone, Click &amp; Drop or a shipping app for labels.</li>
<li><strong>GDPR and PECR:</strong> a cookie banner that blocks analytics until consent, a privacy policy, and opt-in boxes for marketing emails.</li>
</ul>
<h2>Working with clients across London and the UK</h2>
<p>India is 4.5 hours ahead in summer and 5.5 in winter. In practice your morning overlaps my afternoon and evening, so a call at 9 or 10am UK time is easy, and anything you send after lunch is usually done when you start the next day. Day-to-day contact runs on email, WhatsApp and short screen recordings.</p>
<p>Elsewhere? See the pages for the <a href="/wordpress-shopify-developer-europe/">EU</a>, <a href="/wordpress-shopify-developer-usa/">USA</a> and <a href="/wordpress-shopify-developer-uae/">UAE</a>, or read about <a href="/woocommerce-developer/">WooCommerce development</a>.</p>
`,
  'wordpress-shopify-developer-usa': `
<h2>Hiring an offshore WordPress or Shopify developer for a US business</h2>
<p>Working with a developer in India can work very well for US businesses and agencies, as long as the scope is written down, the accounts stay in your name and communication has a clear rhythm. Here is how I set that up.</p>
<h2>A working day that runs overnight</h2>
<p>India is 9.5 hours ahead of New York in summer (10.5 in winter) and 12.5 hours ahead of Los Angeles (13.5 in winter). The useful pattern is simple: you send feedback before you finish your day, I work on it during mine, and you wake up to the changes on the staging link. When a live call helps, we book it in your early morning.</p>
<h2>US store setup checklist</h2>
<ul>
<li><strong>Sales tax:</strong> Shopify Tax, or TaxJar or Avalara on WooCommerce, for the states where you are registered.</li>
<li><strong>Payments:</strong> Stripe or Shopify Payments with Apple Pay, Google Pay and Shop Pay, plus PayPal if you want it.</li>
<li><strong>Shipping:</strong> USPS, UPS and FedEx rates through a shipping app, free-shipping thresholds and US address validation.</li>
<li><strong>Accessibility:</strong> WCAG 2.1 AA checks on templates, forms and checkout: headings, labels, contrast, alt text and keyboard navigation.</li>
</ul>
<h2>Agencies and white-label work</h2>
<p>Many US agencies use offshore developers for builds and maintenance. I build from your designs, follow your coding and handover standards, and stay in the background. See <a href="/shopify-developer/">Shopify development</a> or <a href="/hire-wordpress-developer/">hire a WordPress developer</a> for the details of each service.</p>
<h2>Proof of work</h2>
<p>My case studies include <a href="/work/third-eye-social/">Third Eye Social</a>, an AI automation agency, <a href="/work/streak-creative/">Streak Creative</a>, a growth marketing agency, and <a href="/work/southern-flavours/">Southern Flavours</a>, a restaurant in the UK. Each one is a live site you can open and test.</p>
<p>Also selling into Canada? See the <a href="/wordpress-shopify-developer-canada/">Canada page</a>.</p>
`,
  'wordpress-shopify-developer-canada': `
<h2>Hiring a WordPress or Shopify developer for a Canadian business</h2>
<p>Canadian sites have two details that generic builds often get wrong: sales tax that changes by province, and a French version that needs to be as good as the English one. Both are part of the plan from the first call.</p>
<h2>Sales tax by province</h2>
<p>Depending on where your customer is, an order may carry GST alone, HST, or GST plus PST or QST. Shopify calculates these automatically once your registrations are entered; WooCommerce needs a rates table by province or a tax plugin. Either way I test checkout with addresses in several provinces before launch, and make sure your registration numbers show on invoices.</p>
<h2>Bilingual English and French sites</h2>
<ul>
<li>A page for each language with its own URL, such as /fr/, so both versions can be found in search.</li>
<li>WPML or Polylang on WordPress, or Shopify Markets with a translation app.</li>
<li>Translated menus, forms, emails and checkout text, not just page content.</li>
<li>A switcher that keeps visitors on the same page in the other language.</li>
</ul>
<p>Businesses in Quebec have specific French-language rules for commercial websites; I build the structure so French can be complete, and you confirm the copy with someone who knows those rules.</p>
<h2>Shipping and cross-border sales</h2>
<p>Canada Post and courier rates, plus separate zones, duties messaging and currency if you sell into the US. If the US is a large market for you, the <a href="/wordpress-shopify-developer-usa/">USA page</a> covers sales tax there.</p>
<h2>Working across the time difference</h2>
<p>India is 9.5 to 10.5 hours ahead of Eastern time and 12.5 to 13.5 hours ahead of Pacific. Feedback sent in your afternoon is usually done by your morning, and calls fit in your early morning. See <a href="/shopify-developer/">Shopify development</a> or <a href="/woocommerce-developer/">WooCommerce development</a> for more on each platform.</p>
`,
  'wordpress-shopify-developer-uae': `
<h2>Hiring a WordPress or Shopify developer in Dubai and the UAE</h2>
<p>Most UAE and GCC businesses need three things a generic build does not give them: a proper Arabic version, checkout options local shoppers trust, and VAT set up for the market. With only 1.5 hours between India and the UAE, we can also work through the same business day.</p>
<h2>Arabic RTL and English sites</h2>
<ul>
<li>Right-to-left layouts where menus, sliders, icons and forms mirror correctly, checked on mobile.</li>
<li>Arabic web fonts chosen for readability, not just the theme default.</li>
<li>WPML or Polylang on WordPress, or Shopify Markets, with a page per language and a switcher.</li>
<li>Arabic copy supplied or approved by you; I do not publish machine translation as final.</li>
</ul>
<h2>GCC checkout setup</h2>
<ul>
<li><strong>Cash on delivery:</strong> still widely used, with rules by emirate, city or order value.</li>
<li><strong>Buy now, pay later:</strong> Tabby and Tamara instalments, installed once each provider has approved your business.</li>
<li><strong>Cards:</strong> Stripe, Checkout.com, Telr or Shopify Payments where available in your market.</li>
<li><strong>VAT:</strong> 5% in the UAE, 15% in Saudi Arabia, prices shown including VAT and your TRN on invoices.</li>
<li><strong>Shipping:</strong> zones by emirate or country, with courier rates for Aramex and other local carriers.</li>
</ul>
<h2>Restaurants, clinics and service businesses</h2>
<p>For hospitality, the <a href="/work/southern-flavours/">Southern Flavours</a> restaurant site in the UK shows table reservations with instant confirmation, menus and online ordering. For clinics, the <a href="/work/dr-sunaina-dental-care/">dental clinic</a> case study shows treatments, timings and appointment requests that work on a phone.</p>
<h2>Working across the GCC</h2>
<p>I work with businesses in Dubai, Abu Dhabi, Sharjah, Riyadh, Jeddah, Doha and the rest of the Gulf remotely over WhatsApp, calls and video. The UAE weekend is Saturday and Sunday, while Saudi Arabia and Qatar take Friday and Saturday, so we agree review days that suit your team. See <a href="/shopify-developer/">Shopify development</a> or <a href="/woocommerce-developer/">WooCommerce development</a> for platform details.</p>
`,
  'wordpress-shopify-developer-europe': `
<h2>Hiring a WordPress or Shopify developer for a European business</h2>
<p>A European site usually has to work in more than one language, respect GDPR from the first page load, and charge the right VAT in every country it ships to. Getting these right at the start is far cheaper than fixing them later.</p>
<h2>GDPR cookie consent</h2>
<p>Many sites show a cookie banner but still load Google Analytics or Meta pixels before anyone clicks. I set up a consent tool that holds those tags back until the visitor opts in, connects to Google Consent Mode, records consent, and offers a clear reject option alongside accept. Forms collect only what you need, with a privacy page linked from each one.</p>
<h2>Multilingual sites</h2>
<ul>
<li><strong>WPML</strong> for larger sites and WooCommerce stores: translated products, attributes, emails and checkout.</li>
<li><strong>Polylang</strong> for lighter brochure sites in two or three languages.</li>
<li><strong>Shopify Markets</strong> for stores, with per-country currency, domains or subfolders and a translation app.</li>
<li>Correct hreflang tags so Google shows the German page in Germany and the French page in France.</li>
</ul>
<h2>EU VAT and the One Stop Shop</h2>
<p>When you sell to consumers in other EU countries above the threshold, VAT follows the customer's country and is reported through OSS. Shopify can handle much of this natively; on WooCommerce I set up country-by-country rates or a VAT plugin, validate business VAT numbers for B2B sales if you need it, and show prices including VAT.</p>
<h2>Working hours</h2>
<p>India is 3.5 hours ahead of Central European time in summer and 4.5 in winter, so your morning and early afternoon fall within my working day. Calls are easy to book, and anything left at the end of your day is usually done by the next morning. The <a href="/work/southern-flavours/">Southern Flavours</a> project in the UK ran the same way.</p>
<p>In the UK? See the <a href="/wordpress-shopify-developer-uk/">UK page</a>. For platform details, see <a href="/woocommerce-developer/">WooCommerce development</a> or <a href="/shopify-developer/">Shopify development</a>.</p>
`,
};

module.exports = { pages, guides };
