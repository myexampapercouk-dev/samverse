// City landing pages for WordPress + Shopify work outside Pune, plus one national page.
// Each city has its own local content (industries, how buyers search, nearby projects). Keep claims factual:
// only cite real projects from work-data, no prices, no rankings promised. Follows docs/gsc/SEO-RULES.md.

const wa = city => `Hi, I found your ${city} page. I need help with a WordPress or Shopify website.`;

// FAQs every city page shares, worded for the city
const commonFaqs = city => [
  [`Do you build both WordPress and Shopify websites for ${city} businesses?`, `Yes. WordPress suits service businesses, clinics, manufacturers and content-led sites, and WooCommerce adds a store when you need one. Shopify suits product brands that want a hosted store with payments, shipping and apps ready to go. I help you choose based on what you sell and how you want to manage it, then build on that platform.`],
  [`Can you work with my ${city} business without meeting in person?`, `Yes. Projects run over WhatsApp, phone and video calls with screen sharing. You see progress on a private staging link from your own phone, and approve each step before launch.`],
  ['How much will my website cost?', 'It depends on the number of pages, features and whether you need a store. The website cost calculator gives a quick estimate, or send a short note on WhatsApp for a fixed quote, usually within 24 hours.'],
  ['Will I own the website, domain and store?', 'Yes. The domain, hosting, Shopify store and payment accounts are registered in your business name, and you get full admin access. I work inside your accounts as a collaborator, so you are never locked in.'],
];

const cityPage = c => ({
  type: 'location',
  slug: c.slug,
  nav: c.nav,
  title: c.title,
  description: c.description,
  eyebrow: c.eyebrow,
  h1: c.h1,
  lead: c.lead,
  wa: wa(c.city),
  painTitle: `Why ${c.city} businesses hire me`,
  pains: c.pains,
  getsTitle: `What I build for ${c.city} businesses`,
  gets: c.gets,
  projects: c.projects,
  areaServed: c.areaServed,
  readingFrom: c.readingFrom || 'hire-wordpress-developer',
  faqs: c.faqs.concat(commonFaqs(c.city)),
});

const CITIES = [
  {
    city: 'Mumbai',
    slug: 'wordpress-shopify-developer-mumbai',
    nav: 'WordPress & Shopify Developer in Mumbai',
    title: 'WordPress & Shopify Developer in Mumbai | Samverse',
    description: 'Freelance WordPress and Shopify developer for Mumbai businesses: fast service websites, WooCommerce and Shopify stores, redesigns and fixes. Fixed quotes.',
    eyebrow: 'Mumbai, Thane & Navi Mumbai',
    h1: 'WordPress & Shopify developer for <span class="grad">Mumbai</span> businesses',
    lead: 'I build fast WordPress websites and Shopify stores for Mumbai businesses, from D2C brands and consultants to clinics and traders. I\'m based in Pune, a few hours down the expressway, and work with Mumbai clients directly over WhatsApp, calls and video.',
    pains: [
      ['Competing in a crowded market', 'Mumbai buyers compare several options on their phone before calling. Clear service pages, proof of work and one-tap WhatsApp make you the easy choice.'],
      ['D2C brands that need to sell online', 'Shopify stores set up with UPI, cards and cash on delivery, shipping, GST invoices and a theme that loads quickly on mobile data.'],
      ['Agency prices without the agency', 'You work with one experienced developer directly, so there is no account manager markup and no hand-offs.'],
      ['Close enough to meet', 'Pune is next door, so a meeting in Mumbai can be arranged when a project really needs one.'],
    ],
    gets: ['Shopify stores for D2C brands', 'WordPress business websites', 'WooCommerce stores', 'Website redesigns', 'Speed optimization', 'Malware removal & security', 'Local SEO setup', 'Monthly maintenance'],
    projects: ['Third Eye Social', 'Streak Creative', 'Southern Flavours', 'Dr. Sudhir Arora'],
    areaServed: ['Mumbai', 'Thane', 'Navi Mumbai'],
    readingFrom: 'shopify-developer',
    faqs: [
      ['Are you based in Mumbai?', 'I\'m based in Pune and work with Mumbai, Thane and Navi Mumbai businesses remotely. Pune is close enough to meet in person when a project needs it.'],
      ['Should my Mumbai fashion or food brand use Shopify or WooCommerce?', 'If you mainly sell products and want payments, shipping and apps without managing hosting, Shopify is usually simpler. If content, blogs or custom features matter as much as the store, WooCommerce on WordPress gives more control. I explain the trade-offs for your catalogue before you decide.'],
    ],
  },
  {
    city: 'Delhi NCR',
    slug: 'wordpress-shopify-developer-delhi',
    nav: 'WordPress & Shopify Developer in Delhi NCR',
    title: 'WordPress & Shopify Developer in Delhi NCR | Samverse',
    description: 'WordPress and Shopify developer for Delhi, Gurugram, Noida and Faridabad businesses: manufacturer websites, Shopify stores, clinics and redesigns.',
    eyebrow: 'Delhi, Gurugram, Noida & Faridabad',
    h1: 'WordPress & Shopify developer for <span class="grad">Delhi NCR</span>',
    lead: 'I build WordPress websites and Shopify stores for businesses across Delhi NCR, including a manufacturer near the Delhi border, a Delhi-trained doctor\'s practice and an automation agency serving NCR clients. Everything runs remotely over WhatsApp, calls and video.',
    pains: [
      ['Manufacturers and exporters', 'Product catalogues, enquiry forms on every product and pages that explain capacity and certifications, the way the Vansh Group website does for its plants in Northern India.'],
      ['Doctors and clinics', 'Websites that show qualifications, treatments and timings clearly, with call and WhatsApp booking.'],
      ['Shopify brands', 'Stores with UPI, COD, shipping integrations and GST invoices, set up for buyers across India.'],
      ['Clear scope, fixed quote', 'You know exactly what is included and the price before work starts.'],
    ],
    gets: ['Manufacturer & B2B websites', 'Shopify stores', 'WooCommerce stores', 'Clinic & doctor websites', 'Website redesigns', 'Speed optimization', 'Security & malware cleanup', 'Monthly maintenance'],
    projects: ['Vansh Group', 'Third Eye Social', 'Dr. Sudhir Arora', 'Dr. Nitish Gupta'],
    areaServed: ['Delhi', 'Gurugram', 'Noida', 'Faridabad', 'Sonipat'],
    faqs: [
      ['Have you worked with businesses in Delhi NCR?', 'Yes. Vansh Group, an electronics manufacturer headquartered in Kundli Industrial Area just outside Delhi, and Third Eye Social, whose case studies include an NBFC in Delhi, are both in my portfolio.'],
      ['Can you build a product catalogue website for my factory?', 'Yes. Each product or category gets its own page with specifications, photos and an enquiry button, so buyers can send a specific enquiry and Google can index each product.'],
    ],
  },
  {
    city: 'Bengaluru',
    slug: 'wordpress-shopify-developer-bangalore',
    nav: 'WordPress & Shopify Developer in Bengaluru',
    title: 'WordPress & Shopify Developer in Bangalore | Samverse',
    description: 'WordPress and Shopify developer for Bengaluru startups, agencies and service businesses: marketing sites, Shopify stores, speed fixes and maintenance.',
    eyebrow: 'Bengaluru (Bangalore)',
    h1: 'WordPress & Shopify developer for <span class="grad">Bengaluru</span>',
    lead: 'Bengaluru clients have trusted me with a growth marketing agency site, a generator rental business and an AI automation agency. I build WordPress marketing sites and Shopify stores that load fast, are easy for your team to edit and are set up to bring enquiries.',
    pains: [
      ['Startups that move fast', 'Marketing sites your team can edit without a developer, with landing pages for campaigns and forms wired to your CRM or email.'],
      ['Local service businesses', 'Pages for each service and area, like the generator sizes, rentals and maintenance pages built for Sahni Power Solutions.'],
      ['Agencies needing a dev partner', 'Figma to WordPress builds, fixes and speed work delivered on time for your clients.'],
      ['Shopify for D2C', 'Clean Shopify setups with Indian payments, shipping and the apps you actually need.'],
    ],
    gets: ['Startup & SaaS marketing sites', 'Shopify stores', 'Figma to WordPress', 'Landing pages', 'Service-area websites', 'Speed optimization', 'Agency white-label development', 'Monthly maintenance'],
    projects: ['Streak Creative', 'Sahni Power Solutions', 'Third Eye Social', 'Studio Agama Interiors'],
    areaServed: ['Bengaluru'],
    faqs: [
      ['Which Bengaluru projects have you built?', 'Streak Creative, a growth marketing agency with a Bengaluru office; Sahni Power Solutions, a generator rental business serving Bangalore; and Third Eye Social, an AI automation agency whose case studies include a Bangalore hospital.'],
      ['Can you work as a white-label developer for my agency?', 'Yes. I can build from your designs, follow your process and stay in the background, with your agency managing the client relationship.'],
    ],
  },
  {
    city: 'Hyderabad',
    slug: 'wordpress-shopify-developer-hyderabad',
    nav: 'WordPress & Shopify Developer in Hyderabad',
    title: 'WordPress & Shopify Developer in Hyderabad | Samverse',
    description: 'WordPress and Shopify developer for Hyderabad and Andhra businesses: interior studios, directories, clinics and online stores built to bring enquiries.',
    eyebrow: 'Hyderabad, Vizag & Vijayawada',
    h1: 'WordPress & Shopify developer for <span class="grad">Hyderabad</span>',
    lead: 'I built the website for Studio Agama Interiors, a Hyderabad interior design studio, and Our Temples, a temple directory covering Telangana and Andhra Pradesh. I make WordPress websites and Shopify stores for Hyderabad businesses that want more enquiries from Google.',
    pains: [
      ['Visual businesses', 'Project galleries, before-and-after photos and quote request forms, the way the Studio Agama site showcases interiors.'],
      ['Reaching nearby cities', 'Location-focused pages and blog posts for Hyderabad, Vizag and Vijayawada, so you appear in each city you serve.'],
      ['Large content sites', 'Directories and listing sites with search, filters and festival or category guides, built to stay fast as they grow.'],
      ['Telugu and English', 'Multilingual sites with each language on its own pages, so Google can show the right version.'],
    ],
    gets: ['Interior & real estate websites', 'Directory & listing sites', 'Shopify stores', 'WooCommerce stores', 'Multilingual websites', 'Local SEO setup', 'Speed optimization', 'Monthly maintenance'],
    projects: ['Studio Agama Interiors', 'Our Temples', 'Sahni Power Solutions', 'Dr. Sunaina Dental Care'],
    areaServed: ['Hyderabad', 'Secunderabad', 'Visakhapatnam', 'Vijayawada'],
    faqs: [
      ['Have you worked with Hyderabad businesses?', 'Yes. Studio Agama Interiors is a Hyderabad interior design and turnkey studio, and its site includes location-focused articles for Hyderabad, Vizag and Vijayawada. Our Temples is a temple directory with guides such as Ganesh Chaturthi temples in Hyderabad.'],
      ['Can my website be in Telugu as well as English?', 'Yes. WordPress handles multiple languages well. Translations should be written or checked by a fluent speaker, and it usually makes sense to start with the key pages first.'],
    ],
  },
  {
    city: 'Chennai',
    slug: 'wordpress-shopify-developer-chennai',
    nav: 'WordPress & Shopify Developer in Chennai',
    title: 'WordPress & Shopify Developer in Chennai | Samverse',
    description: 'WordPress and Shopify developer for Chennai manufacturers, clinics, exporters and D2C brands: fast websites and online stores with fixed quotes.',
    eyebrow: 'Chennai',
    h1: 'WordPress & Shopify developer for <span class="grad">Chennai</span>',
    lead: 'Chennai has a deep base of manufacturers, auto component suppliers, hospitals and textile and food brands. I build WordPress websites that win B2B enquiries and Shopify stores that sell across India, working with you remotely from start to launch.',
    pains: [
      ['B2B suppliers', 'Product and capability pages that answer what procurement teams look for, with RFQ forms that reach the right inbox.'],
      ['Healthcare providers', 'Clinic and hospital websites with doctors, specialities, timings and appointment requests that are easy on mobile.'],
      ['Food, textile and D2C brands', 'Shopify or WooCommerce stores with UPI, COD, shipping and GST invoices set up properly.'],
      ['Tamil and English content', 'Multilingual sites with separate language pages so each audience gets the right version.'],
    ],
    gets: ['Manufacturer & B2B websites', 'Hospital & clinic websites', 'Shopify stores', 'WooCommerce stores', 'Multilingual websites', 'Website redesigns', 'Speed optimization', 'Monthly maintenance'],
    projects: ['Vansh Group', 'Dr. Sunaina Dental Care', 'Sahni Power Solutions', 'Our Temples'],
    areaServed: ['Chennai'],
    readingFrom: 'wordpress-website-development',
    faqs: [
      ['Do you have clients in Chennai?', 'My nearest work is in Bengaluru and Hyderabad, and I work with businesses all over India remotely. The manufacturer and clinic projects in my portfolio are close matches for many Chennai businesses.'],
      ['Can you add an RFQ form to each product page?', 'Yes. Each product can carry its own enquiry or RFQ form that includes the product name, so you know exactly what the buyer asked about.'],
    ],
  },
  {
    city: 'Ahmedabad',
    slug: 'wordpress-shopify-developer-ahmedabad',
    nav: 'WordPress & Shopify Developer in Ahmedabad',
    title: 'WordPress & Shopify Developer in Ahmedabad | Samverse',
    description: 'WordPress and Shopify developer for Ahmedabad and Gujarat traders, manufacturers and brands: catalogue websites, B2B enquiry sites and online stores.',
    eyebrow: 'Ahmedabad & Gandhinagar',
    h1: 'WordPress & Shopify developer for <span class="grad">Ahmedabad</span>',
    lead: 'Ahmedabad businesses, from textile and chemical manufacturers to pharma suppliers, traders and food brands, need websites that turn visitors into enquiries and orders. I build WordPress catalogue sites and Shopify stores that do exactly that.',
    pains: [
      ['Big catalogues, simple management', 'Products organised by category with specifications and bulk enquiry forms, easy to update from the WordPress admin.'],
      ['Wholesale and retail together', 'WooCommerce or Shopify stores that can show retail prices to consumers and take bulk enquiries from dealers.'],
      ['Exports', 'Clear English product pages, certifications and contact options for overseas buyers.'],
      ['Gujarati and English', 'Separate language pages for local customers where it helps.'],
    ],
    gets: ['Manufacturer catalogue websites', 'B2B enquiry websites', 'Shopify stores', 'WooCommerce wholesale stores', 'Export-ready websites', 'Website redesigns', 'Speed optimization', 'Monthly maintenance'],
    projects: ['Vansh Group', 'Sahni Power Solutions', 'Streak Creative', 'Studio Agama Interiors'],
    areaServed: ['Ahmedabad', 'Gandhinagar'],
    readingFrom: 'woocommerce-developer',
    faqs: [
      ['Can my site show different prices to wholesale buyers?', 'Yes. WooCommerce can show retail prices to the public and hide prices or show trade prices to approved dealers, or you can collect bulk orders as enquiries. Shopify can handle this too with the right setup or apps.'],
      ['Do you work with Gujarat businesses remotely?', 'Yes. Projects run over WhatsApp, phone and video, with a staging link you can check any time.'],
    ],
  },
  {
    city: 'Surat',
    slug: 'wordpress-shopify-developer-surat',
    nav: 'WordPress & Shopify Developer in Surat',
    title: 'WordPress & Shopify Developer in Surat | Samverse',
    description: 'Shopify and WordPress developer for Surat textile, saree and jewellery businesses: online stores, wholesale catalogues and WhatsApp-ready websites.',
    eyebrow: 'Surat',
    h1: 'Shopify & WordPress developer for <span class="grad">Surat</span>',
    lead: 'Surat is India\'s textile and diamond city, and many of its saree, fabric and jewellery businesses now sell straight to customers online. I build Shopify and WooCommerce stores with large catalogues, variants and WhatsApp ordering, plus WordPress sites for wholesalers.',
    pains: [
      ['Huge catalogues with variants', 'Sarees, suits and fabrics with colours, sizes and fabric types, organised so customers can filter and find them fast.'],
      ['Selling on WhatsApp and online', 'WhatsApp buttons on each product so customers can ask about a design, alongside a proper checkout.'],
      ['Wholesale buyers', 'Catalogue pages and bulk enquiry forms for retailers and resellers, separate from retail pricing.'],
      ['Payments and shipping', 'UPI, cards, COD and shipping partners set up for orders across India.'],
    ],
    gets: ['Shopify fashion stores', 'WooCommerce stores', 'Wholesale catalogue websites', 'Jewellery websites', 'Product photo-led designs', 'Speed optimization for big catalogues', 'Store migration', 'Monthly maintenance'],
    projects: ['Studio Agama Interiors', 'Vansh Group', 'Southern Flavours', 'Streak Creative'],
    areaServed: ['Surat'],
    readingFrom: 'shopify-developer',
    faqs: [
      ['Is Shopify or WooCommerce better for a saree or fabric store?', 'Shopify is quicker to run if you mainly sell retail and want hosting, payments and apps handled. WooCommerce gives more control for very large catalogues, wholesale rules and content. I recommend one after looking at your catalogue size and how you sell.'],
      ['Can customers order on WhatsApp from my website?', 'Yes. Each product can have a WhatsApp button that sends the product name and link, so you can confirm details before taking payment, while customers who prefer can check out directly.'],
    ],
  },
  {
    city: 'Jaipur',
    slug: 'wordpress-shopify-developer-jaipur',
    nav: 'WordPress & Shopify Developer in Jaipur',
    title: 'WordPress & Shopify Developer in Jaipur | Samverse',
    description: 'Shopify and WordPress developer for Jaipur jewellery, handicraft, textile and hotel businesses: online stores, export sites and booking-ready websites.',
    eyebrow: 'Jaipur',
    h1: 'Shopify & WordPress developer for <span class="grad">Jaipur</span>',
    lead: 'Jaipur\'s gems and jewellery, block-print textiles, handicrafts and heritage hotels sell to buyers across India and the world. I build Shopify stores and WordPress websites that present your products beautifully and make it easy to order, enquire or book.',
    pains: [
      ['Products that need great photos', 'Image-led designs with zoom, multiple angles and fast loading even with large galleries.'],
      ['Selling abroad', 'International payments, currency display and shipping options on Shopify, with clear product details for overseas buyers.'],
      ['Hotels and tourism', 'WordPress sites with room pages, galleries and direct booking or enquiry, so you rely less on commission-based portals.'],
      ['Wholesale and export enquiries', 'Catalogue pages and forms for boutiques, importers and resellers.'],
    ],
    gets: ['Jewellery & handicraft stores', 'Shopify stores for export', 'WooCommerce stores', 'Hotel & homestay websites', 'Wholesale catalogue sites', 'Website redesigns', 'Speed optimization', 'Monthly maintenance'],
    projects: ['Southern Flavours', 'Studio Agama Interiors', 'Our Temples', 'Vansh Group'],
    areaServed: ['Jaipur'],
    readingFrom: 'shopify-developer',
    faqs: [
      ['Can my Shopify store sell to customers outside India?', 'Yes. Shopify supports international markets with local currency display, payment options and shipping rates per country. I set these up and make sure duties, delivery times and returns are explained clearly.'],
      ['Can my hotel website take direct bookings?', 'Yes. A WordPress hotel site can connect to a booking engine or take enquiries directly, so guests can book with you instead of only through portals.'],
    ],
  },
  {
    city: 'Agra',
    slug: 'wordpress-shopify-developer-agra',
    nav: 'WordPress & Shopify Developer in Agra',
    title: 'WordPress & Shopify Developer in Agra | Samverse',
    description: 'WordPress and Shopify developer for Agra clinics, doctors, leather and footwear businesses and hotels. Two Agra clinic websites already in my portfolio.',
    eyebrow: 'Agra',
    h1: 'WordPress & Shopify developer for <span class="grad">Agra</span>',
    lead: 'I built the websites for Dr. Sunaina Dental Care in Rajpur Chungi and for an interventional pulmonologist at Niramaya Care Center, both in Agra. I build WordPress sites for Agra clinics, hotels and service businesses, and Shopify stores for footwear, leather and food brands.',
    pains: [
      ['Clinics and doctors', 'Treatment pages patients understand, doctor credentials, timings and one-tap call, WhatsApp and appointment buttons, as built for two Agra clinics.'],
      ['Footwear and leather brands', 'Shopify or WooCommerce stores with size variants, COD and shipping across India.'],
      ['Hotels and travel', 'Websites with rooms, packages and direct enquiries for visitors coming to see the Taj Mahal.'],
      ['Local search', 'Websites that work with your Google Business Profile for searches like "dentist in Agra".'],
    ],
    gets: ['Clinic & doctor websites', 'Hospital websites', 'Shopify footwear stores', 'WooCommerce stores', 'Hotel & travel websites', 'Local SEO setup', 'Speed optimization', 'Monthly maintenance'],
    projects: ['Dr. Sunaina Dental Care', 'Dr. Nitish Gupta', 'Dr. Sudhir Arora', 'Southern Flavours'],
    areaServed: ['Agra', 'Mathura', 'Firozabad'],
    readingFrom: 'wordpress-website-development',
    faqs: [
      ['Which Agra websites have you built?', 'Dr. Sunaina Dental Care & Implant Center in Rajpur Chungi, and the website of an interventional pulmonologist at Niramaya Care Center. Both are in my case studies.'],
      ['Can patients book appointments from my clinic website?', 'Yes. Patients can book through a form, WhatsApp or a call button, and you receive each request straight away. Online payment for consultations can be added if you want it.'],
    ],
  },
  {
    city: 'Kolkata',
    slug: 'wordpress-shopify-developer-kolkata',
    nav: 'WordPress & Shopify Developer in Kolkata',
    title: 'WordPress & Shopify Developer in Kolkata | Samverse',
    description: 'WordPress and Shopify developer for Kolkata traders, tea, sweets and handloom brands, clinics and schools: websites and online stores with fixed quotes.',
    eyebrow: 'Kolkata & Howrah',
    h1: 'WordPress & Shopify developer for <span class="grad">Kolkata</span>',
    lead: 'Kolkata has long-established trading houses, tea and sweets brands, handloom and saree sellers, schools and clinics. I build WordPress websites that bring enquiries and Shopify stores that let these businesses sell across India.',
    pains: [
      ['Old businesses going online', 'A modern website that tells your story and history, with products and contact details that are easy to find.'],
      ['Tea, sweets and food brands', 'Shopify or WooCommerce stores with weight variants, gift boxes, delivery zones and shipping rules.'],
      ['Handloom and sarees', 'Image-led catalogues with filters by fabric, colour and occasion.'],
      ['Bengali and English', 'Separate language pages where your customers need them.'],
    ],
    gets: ['Business & trading house websites', 'Shopify food stores', 'WooCommerce stores', 'Handloom & fashion stores', 'School & institute websites', 'Website redesigns', 'Speed optimization', 'Monthly maintenance'],
    projects: ['Southern Flavours', 'Vansh Group', 'Our Temples', 'Dr. Sudhir Arora'],
    areaServed: ['Kolkata', 'Howrah'],
    faqs: [
      ['Can I sell sweets or perishable food online?', 'Yes, with delivery limited to areas you can reach in time, or by selling only packaged items with a good shelf life for shipping across India. I set up delivery zones and shipping rules to match.'],
      ['Can you redesign an old website without losing Google rankings?', 'Yes. I map old pages to new ones with 301 redirects, keep the content that ranks, and check Search Console after launch.'],
    ],
  },
];

const india = {
  type: 'location',
  slug: 'wordpress-shopify-developer-india',
  nav: 'WordPress & Shopify Developer in India',
  title: 'Freelance WordPress & Shopify Developer India | Samverse',
  description: 'Hire a freelance WordPress and Shopify developer in India: business websites, WooCommerce and Shopify stores, speed, fixes and maintenance. Fixed quotes.',
  eyebrow: 'Working across India',
  h1: 'Freelance WordPress & Shopify developer in <span class="grad">India</span>',
  lead: 'I\'m a freelance WordPress and Shopify developer based in Pune, working with businesses across India, from Delhi NCR, Agra and Bengaluru to Hyderabad, as well as clients abroad. You deal with one developer directly, get a fixed quote, and own everything that is built.',
  wa: 'Hi, I found your India page. I need help with a WordPress or Shopify website.',
  painTitle: 'Why businesses across India hire me',
  pains: [
    ['WordPress or Shopify, honestly chosen', 'I build on both, so the advice is about what suits your business, not what I happen to sell.'],
    ['Built for Indian buyers', 'UPI, cards and COD, Shiprocket-style shipping, GST invoices, WhatsApp buttons and pages that load fast on mobile data.'],
    ['One developer, direct contact', 'No sales team or chain of freelancers. The person you message builds your site.'],
    ['Fixed quotes and ownership', 'An agreed scope and price before work starts, with the domain, hosting and store in your name.'],
  ],
  getsTitle: 'What I build',
  gets: ['WordPress business websites', 'Shopify stores', 'WooCommerce stores', 'Website redesigns', 'Speed optimization', 'Malware removal & security', 'Local SEO setup', 'Monthly maintenance'],
  projects: ['Vansh Group', 'Studio Agama Interiors', 'Dr. Sunaina Dental Care', 'Streak Creative'],
  areaServed: ['India'],
  readingFrom: 'hire-wordpress-developer',
  faqs: [
    ['Do you work with businesses outside Pune?', 'Yes. Most of my clients are elsewhere: Delhi NCR, Agra, Bengaluru, Hyderabad and the UK. Projects run over WhatsApp, calls and video, with a staging link you can check at any time.'],
    ['Should I choose WordPress or Shopify?', 'Shopify suits product brands that want a hosted store with payments and shipping handled. WordPress suits service businesses and content-led sites, and WooCommerce adds a store with more control. Tell me what you sell and I will recommend one.'],
    ['Why hire a freelancer instead of an agency?', 'You talk directly to the person building your site, decisions are quicker and there is no agency overhead. The trade-off is one person\'s capacity, so I take on a limited number of projects at a time and give clear timelines.'],
    ['Can you outsource WordPress development for my agency?', 'Yes. I work white-label with agencies in India and abroad: builds from your designs, fixes, speed work and maintenance.'],
    ['How much does a website cost in India?', 'It depends on pages, features and whether you need a store. The website cost calculator gives a quick estimate, or message me for a fixed quote, usually within 24 hours.'],
    ['Will I own the website?', 'Yes. Domain, hosting, Shopify store and payment accounts are in your business name and you get full admin access.'],
  ],
};

const pages = [india].concat(CITIES.map(cityPage));

// Long-form guides, one per page, with local detail
const guides = {
  'wordpress-shopify-developer-india': `
<h2>Hiring a WordPress or Shopify developer in India: what to check</h2>
<p>Whether you are in a metro or a smaller city, the steps for hiring a developer are the same. This guide covers how to choose a platform, what to ask any developer (me included) and how a remote project runs.</p>
<h2>WordPress, WooCommerce or Shopify?</h2>
<ul>
<li><strong>WordPress</strong> is best for service businesses, clinics, manufacturers, schools and anyone whose website is mainly about content and enquiries.</li>
<li><strong>WooCommerce</strong> adds a store to WordPress. It suits businesses that want full control, custom rules (such as wholesale pricing) and lots of content alongside products.</li>
<li><strong>Shopify</strong> is a hosted store. It suits product brands that want payments, shipping, security and updates handled, and are happy to pay a monthly plan and app fees.</li>
</ul>
<p>For more detail, read <a href="/blog/woocommerce-vs-shopify-india/">WooCommerce vs Shopify for India</a> or see the <a href="/shopify-developer/">Shopify developer</a> and <a href="/wordpress-website-development/">WordPress website development</a> pages.</p>
<h2>Questions to ask any developer</h2>
<ul>
<li>Can I see live websites you built, and speak to a client?</li>
<li>Will the domain, hosting and store be in my name?</li>
<li>Is the quote fixed, and what exactly is included?</li>
<li>Who will actually build the site?</li>
<li>What happens after launch if something breaks?</li>
</ul>
<h2>How a remote project runs</h2>
<p>I have built sites for clients in Delhi NCR, Agra, Bengaluru, Hyderabad and the UK without needing to meet. We plan on a call, you share content on WhatsApp, and the site is built on a private staging link you can open on your phone. You approve it before it goes live, and I stay available for changes and support.</p>
<h2>Find a page for your city</h2>
<p>I have pages for <a href="/wordpress-developer-pune/">Pune</a>, <a href="/wordpress-shopify-developer-mumbai/">Mumbai</a>, <a href="/wordpress-shopify-developer-delhi/">Delhi NCR</a>, <a href="/wordpress-shopify-developer-bangalore/">Bengaluru</a>, <a href="/wordpress-shopify-developer-hyderabad/">Hyderabad</a>, <a href="/wordpress-shopify-developer-chennai/">Chennai</a>, <a href="/wordpress-shopify-developer-ahmedabad/">Ahmedabad</a>, <a href="/wordpress-shopify-developer-surat/">Surat</a>, <a href="/wordpress-shopify-developer-jaipur/">Jaipur</a>, <a href="/wordpress-shopify-developer-agra/">Agra</a> and <a href="/wordpress-shopify-developer-kolkata/">Kolkata</a>, each with notes on what businesses there usually need.</p>
`,
  'wordpress-shopify-developer-mumbai': `
<h2>Websites for Mumbai businesses: what usually matters</h2>
<p>Mumbai buyers are busy and compare quickly, mostly on their phones. The websites that win are the ones that load fast, show proof and make contact one tap away.</p>
<h2>Common Mumbai projects</h2>
<ul>
<li><strong>D2C and fashion brands</strong> launching on Shopify, with UPI, COD, shipping and GST invoices set up from day one.</li>
<li><strong>Consultants, CAs and agencies</strong> needing a clean WordPress site with service pages and case studies.</li>
<li><strong>Clinics and wellness practices</strong> in the suburbs who want appointment requests from Google searches.</li>
<li><strong>Traders and wholesalers</strong> who want a product catalogue with enquiry forms.</li>
</ul>
<h2>Local search across a big city</h2>
<p>Mumbai searches are often very local: "near me", or a suburb such as Andheri, Bandra or Thane. Your Google Business Profile does most of the work for these, and your website supports it with clear service pages, your address, and consistent contact details.</p>
<h2>How we work together</h2>
<p>I'm based in Pune, so Mumbai is close. Most projects run on WhatsApp, calls and video, with a private staging link to review progress. If a project needs it, we can meet. Start with a message describing what you need and I will send a fixed quote.</p>
<p>Not in Mumbai? See the <a href="/wordpress-shopify-developer-india/">India page</a> or <a href="/wordpress-developer-pune/">Pune page</a>.</p>
`,
  'wordpress-shopify-developer-delhi': `
<h2>Websites for Delhi NCR businesses</h2>
<p>Delhi NCR mixes large industrial belts (Kundli, Okhla, Manesar, Noida and Faridabad), a huge services economy and busy healthcare practices. Each needs a different kind of website.</p>
<h2>Manufacturers and B2B suppliers</h2>
<p>Buyers want to see capacity, products, certifications and a way to enquire about a specific item. The <a href="/work/vansh-group/">Vansh Group</a> site, for an electronics manufacturer with plants in Northern India and a head office in Kundli near the Delhi border, shows how this works: product pages, company history and enquiry routes.</p>
<h2>Doctors and clinics</h2>
<p>Patients check credentials before they call. The <a href="/work/dr-sudhir-arora/">Dr. Sudhir Arora</a> website presents a doctor trained at Maulana Azad Medical College, Delhi, with qualifications, experience, timings and contact options laid out clearly.</p>
<h2>Shopify and online stores</h2>
<p>For brands in NCR selling across India, Shopify handles hosting, checkout and apps, while WooCommerce gives more control. Either way the store needs UPI, COD rules, shipping and GST invoices set up correctly.</p>
<h2>Working remotely</h2>
<p>All my NCR projects have run over WhatsApp, calls and video. Send a short note about your business for a fixed quote, or read the <a href="/wordpress-shopify-developer-india/">India page</a>.</p>
`,
  'wordpress-shopify-developer-bangalore': `
<h2>Websites for Bengaluru startups, agencies and service businesses</h2>
<p>Bengaluru clients tend to be fast-moving: startups launching campaigns, agencies with client deadlines, and service businesses competing across a large city.</p>
<h2>Projects from Bengaluru</h2>
<ul>
<li><a href="/work/streak-creative/">Streak Creative</a>, a growth marketing agency with a Bengaluru office: a site built to present services and capture sign-ups.</li>
<li><a href="/work/sahni-power-solutions/">Sahni Power Solutions</a>, generator rental in Bangalore: pages for sizes, emergency hire, maintenance and monthly DG rental, built to match how customers search.</li>
<li><a href="/work/third-eye-social/">Third Eye Social</a>, an AI automation agency whose case studies include a Bangalore hospital.</li>
</ul>
<h2>What startups usually need</h2>
<p>A marketing site the team can edit without a developer, landing pages for each campaign, forms connected to your CRM, and solid speed and analytics. WordPress with a block-based setup works well for this.</p>
<h2>Agencies and white-label work</h2>
<p>If you run an agency, I can build from your Figma designs, handle fixes and speed work, and stay in the background. Send me a brief for a fixed quote, or see the <a href="/wordpress-shopify-developer-india/">India page</a>.</p>
`,
  'wordpress-shopify-developer-hyderabad': `
<h2>Websites for Hyderabad and Andhra businesses</h2>
<p>Hyderabad businesses often serve customers across Telangana and Andhra Pradesh. A website can reach each of those cities with dedicated pages and useful local content.</p>
<h2>Interior design and real estate</h2>
<p>The <a href="/work/studio-agama-interiors/">Studio Agama Interiors</a> website presents modular kitchens, wardrobes, turnkey interiors and renovations for a Hyderabad studio, with project galleries, free quote requests and blog articles focused on Hyderabad, Vizag and Vijayawada.</p>
<h2>Directories and content sites</h2>
<p><a href="/work/our-temples/">Our Temples</a> is a temple directory with search, deity and state pages, and festival guides such as Ganesh Chaturthi temples in Hyderabad and the Pancharama temples of Andhra Pradesh. Large content sites need careful structure so they stay fast and every page can be found on Google.</p>
<h2>Online stores</h2>
<p>For Hyderabad brands selling clothing, food or home products, I set up Shopify or WooCommerce with Indian payments, shipping and GST invoices.</p>
<p>Send a note about your business for a fixed quote, or see the <a href="/wordpress-shopify-developer-india/">India page</a>.</p>
`,
  'wordpress-shopify-developer-chennai': `
<h2>Websites for Chennai businesses</h2>
<p>Chennai is home to auto and engineering suppliers, hospitals, textile and food brands, and many established family businesses. Most need either a B2B enquiry website or an online store.</p>
<h2>B2B and manufacturing</h2>
<p>Procurement teams look for products, capabilities, quality certifications and a quick way to send an RFQ. A good manufacturer website gives each product its own page with specifications and an enquiry form, as on the <a href="/work/vansh-group/">Vansh Group</a> site.</p>
<h2>Healthcare</h2>
<p>Hospital and clinic sites need doctors, specialities, timings and appointment options that work well on a phone. See the <a href="/work/dr-sunaina-dental-care/">dental clinic</a> case study for an example.</p>
<h2>D2C and food brands</h2>
<p>Shopify or WooCommerce stores with weight or size variants, COD rules, shipping partners and GST invoices.</p>
<h2>Working remotely</h2>
<p>I work with Chennai businesses over WhatsApp, calls and video, with a staging link to review progress. Send a note for a fixed quote, or read the <a href="/wordpress-shopify-developer-india/">India page</a>.</p>
`,
  'wordpress-shopify-developer-ahmedabad': `
<h2>Websites for Ahmedabad manufacturers, traders and brands</h2>
<p>Ahmedabad and the wider Gujarat belt have a dense mix of manufacturers, traders and family brands. The most useful websites here are catalogue and enquiry sites, and stores that handle both retail and wholesale buyers.</p>
<h2>Catalogue websites that bring enquiries</h2>
<p>Each product or category gets its own page with specifications, photos and an enquiry button that records which product the buyer asked about. That helps buyers and helps Google index every product.</p>
<h2>Retail plus wholesale</h2>
<p>WooCommerce can show retail prices to the public and trade prices or bulk enquiry forms to approved dealers. Shopify can do similar with the right setup. Read more on the <a href="/woocommerce-developer/">WooCommerce developer</a> page.</p>
<h2>Export buyers</h2>
<p>Overseas buyers want clear English product details, certifications, MOQ and a reliable contact route. A fast, clean website builds trust before the first email.</p>
<p>Send a short note for a fixed quote, or see the <a href="/wordpress-shopify-developer-india/">India page</a>.</p>
`,
  'wordpress-shopify-developer-surat': `
<h2>Online stores for Surat textile, saree and jewellery businesses</h2>
<p>Many Surat businesses started on WhatsApp catalogues and marketplaces. A store of your own lets you keep more margin, build repeat customers and show your full range.</p>
<h2>Managing big catalogues</h2>
<p>Sarees, suits and fabrics come in many colours, fabrics and sizes. A good store groups them into collections with filters, uses variants instead of duplicate products, and keeps images optimised so pages stay fast on mobile data.</p>
<h2>WhatsApp plus checkout</h2>
<p>Many buyers still want to ask before they pay. A WhatsApp button on each product sends the product link to you, while customers who are ready can check out directly with UPI, cards or COD.</p>
<h2>Wholesale and resellers</h2>
<p>Retailers and resellers need a catalogue and bulk enquiry form separate from retail prices. WooCommerce handles this well; Shopify can too with the right setup.</p>
<p>See the <a href="/shopify-developer/">Shopify developer</a> page, or send a note about your catalogue for a fixed quote.</p>
`,
  'wordpress-shopify-developer-jaipur': `
<h2>Websites and stores for Jaipur businesses</h2>
<p>Jaipur sells to the world: jewellery and gemstones, block-print textiles, blue pottery and handicrafts, and heritage hotels for visitors. Each needs a site that looks as good as the product.</p>
<h2>Jewellery and handicrafts</h2>
<p>Image-led Shopify or WooCommerce stores with zoom, multiple angles and clear details on materials, sizes and care. Large photos are compressed and lazy-loaded so pages stay fast.</p>
<h2>Selling to international buyers</h2>
<p>Shopify Markets can show prices in local currencies with shipping rates per country. Be clear about duties, delivery times and returns, as these decide whether overseas buyers order.</p>
<h2>Hotels and homestays</h2>
<p>A WordPress site with room pages, galleries, location details and a direct booking or enquiry option helps you take bookings without paying commission on every one.</p>
<p>Send a note about your business for a fixed quote, or see the <a href="/wordpress-shopify-developer-india/">India page</a>.</p>
`,
  'wordpress-shopify-developer-agra': `
<h2>Websites for Agra clinics, hotels and brands</h2>
<p>Agra is where two of my healthcare projects are based, so I know what local patients look for before they book.</p>
<h2>Clinics and doctors in Agra</h2>
<ul>
<li><a href="/work/dr-sunaina-dental-care/">Dr. Sunaina Dental Care & Implant Center</a> in Rajpur Chungi: treatments explained in plain language, from cleaning and braces to implants, with booking options.</li>
<li><a href="/work/dr-nitish-gupta-pulmonologist/">Dr. Nitish Gupta</a>, interventional pulmonologist at Niramaya Care Center: credentials, lung and chest services, diagnostics and appointment booking.</li>
</ul>
<p>Both are built to build trust and turn searches like "dentist in Agra" or "chest specialist in Agra" into calls and visits, alongside the clinic's Google Business Profile.</p>
<h2>Footwear, leather and food brands</h2>
<p>Agra is a major footwear centre. Shopify or WooCommerce stores with size variants, COD and shipping across India let these brands sell directly.</p>
<h2>Hotels and travel</h2>
<p>Hotels and tour operators serving Taj Mahal visitors benefit from direct booking or enquiry pages with clear photos and location details.</p>
<p>Send a note for a fixed quote, or see the <a href="/wordpress-shopify-developer-india/">India page</a>.</p>
`,
  'wordpress-shopify-developer-kolkata': `
<h2>Websites for Kolkata businesses</h2>
<p>Kolkata has many long-running businesses with strong local reputations, from tea and sweets to handloom and trading houses. A website lets that reputation reach customers across India.</p>
<h2>Bringing established businesses online</h2>
<p>A clear story and history, products or services, and contact details that are easy to find. If you already have an old site, a redesign with proper 301 redirects keeps any Google rankings you have.</p>
<h2>Food, tea and sweets</h2>
<p>Stores with weight variants, gift boxes and delivery zones. Perishable items can be limited to local delivery, while packaged products ship across India.</p>
<h2>Handloom and sarees</h2>
<p>Image-led catalogues with filters by fabric, colour and occasion, on Shopify or WooCommerce, with WhatsApp enquiry on each product.</p>
<p>Send a note for a fixed quote, or see the <a href="/wordpress-shopify-developer-india/">India page</a>.</p>
`,
};

module.exports = { pages, guides };
