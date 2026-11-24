// 24 Nov expansion of zero-impression service and industry pages (docs/seo/prune-plan-24nov.md, section 3a).
// Each entry: `answer` (exact-query H2 + short direct answer, rendered just under the hero),
// three `extra` sections, two FAQs and a real /work/ case study for the Recent work block.
// No prices, stats or testimonials.
const W = {
  sunaina: ['/work/dr-sunaina-dental-care/', 'Dr. Sunaina Dental Care (appointment booking)'],
  southern: ['/work/southern-flavours/', 'Southern Flavours (reservations and WooCommerce shop)'],
  agama: ['/work/studio-agama-interiors/', 'Studio Agama Interiors'],
  streak: ['/work/streak-creative/', 'Streak Creative (built from design)'],
  temples: ['/work/our-temples/', 'Our Temples (large directory site)'],
  vansh: ['/work/vansh-group/', 'Vansh Group (B2B manufacturer)'],
  third: ['/work/third-eye-social/', 'Third Eye Social (custom WordPress build)'],
  sahni: ['/work/sahni-power-solutions/', 'Sahni Power Solutions (rental fleet site)'],
};

const X = {
  'website-for-travel-agencies': {
    work: [W.southern],
    answer: { h: 'Travel agency website design: what it takes', p: ['A travel agency website needs three things to get bookings: one clear page per tour package with the itinerary and inclusions, an enquiry or WhatsApp button on every package, and destination pages that can rank for searches like "Kerala tour package from Pune". The booking flow is built the same way as the reservation form on the <a href="/work/southern-flavours/">Southern Flavours case study</a>, with a quote first and payment once the trip is confirmed.'] },
    extra: [
      { h: 'Tour package pages that sell', p: ['Each package page follows one layout so travellers can compare quickly: duration and starting city at the top, a day-by-day itinerary, then a table of what is included and what is not.', 'Departure dates are shown as a list you edit from the dashboard, with a "few seats left" or "sold out" label per date. Hotels, transport and meals sit in the inclusions table, and visa, flights or entry fees in the exclusions, so the price question is answered before the enquiry.'] },
      { h: 'Enquiry and booking flow', p: ['Most packages are customised, so the flow is enquiry first: a WhatsApp button with the package name and date already filled in, or a short form asking for travel dates, group size and starting city.', 'Once the trip is agreed, a deposit can be taken through Razorpay (UPI, cards, netbanking) or Stripe and PayPal for foreign travellers. Group and corporate trips get a separate form that asks for headcount, budget range and preferred dates.'] },
      { h: 'Ranking for "[destination] tour package from [city]"', p: ['Searches for tours usually name a destination and a starting city. Each destination gets its own landing page that lists the matching packages, best months to travel and practical notes, written for the cities you actually sell from rather than copied for every city.', 'TravelAgency schema with your address and contact details is added site-wide, and TouristTrip details on package pages, so search engines can read what each page offers. Your Google Business Profile reviews are linked from the site.'] },
    ],
    faqs: [
      ['Can each departure date show if seats are left?', 'Yes. Departure dates are managed from the dashboard and each one can be marked open, filling fast or sold out.'],
      ['Do I need a separate page for every destination?', 'Only for destinations you actively sell. A page per destination with its packages and travel notes gives searchers a clear answer; thin pages for places you rarely sell are left out.'],
    ],
  },
  'website-for-gyms-and-fitness-studios': {
    work: [W.sunaina],
    answer: { h: 'Gym website design: what it should do', p: ['A gym website should turn a nearby visitor into a trial session: show your plans, your class timetable and your location in the first screen, with a "Book a free trial" and WhatsApp button that stay visible. The appointment flow works like the one on the <a href="/work/dr-sunaina-dental-care/">Dr. Sunaina Dental Care case study</a>: pick a slot, get a confirmation, and your front desk gets the details.'] },
    extra: [
      { h: 'Membership plans and online payment', p: ['Plans are shown as a simple comparison: monthly, quarterly, half-yearly and yearly, with what each includes (personal training sessions, classes, locker, diet consultation). You set and change the prices yourself from the dashboard.', 'Members can pay online through Razorpay with UPI, cards or netbanking. For recurring plans, UPI autopay or card subscriptions can be set up through the gateway, so renewals do not depend on someone remembering to pay at the desk.'] },
      { h: 'Class timetable and trial-session booking', p: ['A weekly timetable shows each class with time, trainer and level, and can be filtered by class type such as yoga, Zumba, HIIT or strength. You update it from the dashboard when a slot changes.', 'Trial booking asks for name, phone, preferred time and goal, then sends the lead to WhatsApp or email straight away, because trial leads go cold within hours.'] },
      { h: 'Local SEO for "gym near me"', p: ['"Gym near me" results come mostly from Google Business Profile, so the website and profile are set up to match: same name, address, phone and hours, with the site linked from the profile and your reviews linked from the site.', 'Transformation galleries are added only with written member consent and real photos. Separate pages for each programme and your area name in the right places help the site appear for searches like "yoga classes in Baner".'] },
    ],
    faqs: [
      ['Can members renew their plan online?', 'Yes. Plans can be paid online through a gateway such as Razorpay, including UPI autopay or card subscriptions for recurring plans.'],
      ['Can I change the timetable myself?', 'Yes. Classes, times and trainers are edited from the dashboard and the timetable updates on the site.'],
    ],
  },
  'shopify-to-woocommerce-migration': {
    work: [W.southern],
    answer: { h: 'Shopify to WooCommerce migration: how it works', p: ['A Shopify to WooCommerce migration moves your products, variants, customers and orders to a WordPress store you own, rebuilds the theme, and redirects every old Shopify URL so rankings carry over. Shopify keeps selling until the switch. For a live WooCommerce shop built and supported here, see the <a href="/work/southern-flavours/">Southern Flavours case study</a>.'] },
    extra: [
      { h: 'What moves and what does not', p: ['Moved: products with variants, SKUs, images and stock; collections as product categories; customers; past orders where the export allows; blog posts and pages; reviews from most review apps through their CSV export.'], table: { head: ['Data', 'Moves?', 'Notes'], rows: [['Products and variants', 'Yes', 'Variants become WooCommerce variations'], ['Customers', 'Yes', 'Passwords cannot be moved; customers reset them'], ['Orders', 'Yes, as history', 'Kept for records and reorders'], ['Reviews', 'Usually', 'Through the review app\'s export'], ['Gift cards', 'Partly', 'Balances need a gift card plugin and a manual import'], ['Shopify apps', 'No', 'Replaced with plugins or custom code']] } },
      { h: 'URL mapping and the 301 plan', p: ['Shopify and WooCommerce use different URL patterns, so every old address is mapped to its new one before launch: /products/name to /product/name, /collections/name to /product-category/name, and /blogs/news/post to the new post URL.', 'The redirect list is tested on staging, then Search Console is checked after launch for 404s and the new sitemap is submitted. Meta titles, descriptions and image alt text are carried over.'] },
      { h: 'Cost comparison after the move', p: ['The running costs change shape rather than disappear. Use this table with your own numbers to compare; you get exact figures for your store after the free review.'], table: { head: ['Cost line', 'On Shopify', 'On WooCommerce'], rows: [['Platform', 'Monthly Shopify plan', 'No platform fee'], ['Hosting', 'Included', 'Monthly or yearly hosting plan'], ['Apps and plugins', 'Monthly app fees', 'Free plugins or one-time and yearly licences'], ['Transaction fees', 'Extra fee if not using Shopify Payments', 'Only the gateway fee'], ['Updates and security', 'Handled by Shopify', 'You or a maintenance plan']] } },
    ],
    faqs: [
      ['Will customers need new passwords?', 'Yes. Shopify does not export passwords, so customer accounts are moved and customers set a new password with a reset link.'],
      ['Will my Shopify URLs still work?', 'Yes. Every product, collection and blog URL is redirected with a 301 to its new WooCommerce address.'],
    ],
  },
  'wordpress-to-shopify-migration': {
    work: [W.temples],
    answer: { h: 'WordPress to Shopify migration: how it works', p: ['A WordPress to Shopify migration starts with an audit of your products, content and URLs, moves products, customers and blog posts into Shopify, and redirects every old WordPress address so search rankings and links keep working. Large content sites need the most care; the <a href="/work/our-temples/">Our Temples case study</a> shows the kind of WordPress site structure that has to be mapped before a move.'] },
    extra: [
      { h: 'Pre-migration audit checklist', p: ['Before anything moves, the current site is checked and written down:'], list: ['Product count, variants, attributes and custom fields', 'Plugins that add store features (subscriptions, bookings, product add-ons) and their Shopify equivalents', 'Every indexed URL from the sitemap and Search Console', 'Top pages by traffic and pages with backlinks', 'Payment gateways, shipping rules and GST settings', 'Email accounts on the domain, so they keep working after DNS changes'] },
      { h: 'Blog and SEO preservation', p: ['Blog posts move to Shopify\'s blog with their images, and each old URL gets a 301 redirect to its new address. Yoast or Rank Math titles and descriptions are imported into Shopify\'s SEO fields or metafields, and image alt text is kept.', 'After launch the sitemap is submitted in Search Console and crawl errors are checked, so traffic losses are caught early.'] },
      { h: 'Timeline and fixed-price packages by store size', p: ['The work is quoted as a fixed price after the audit, grouped by store size:'], list: ['Small store: a few dozen products, simple variants, a short blog', 'Medium store: hundreds of products, several attributes, an active blog', 'Large store: thousands of products, custom features to rebuild, heavy content'], after: ['Each package includes the theme setup, data import, redirects and post-launch checks. You get the timeline and price in writing before work starts.'] },
    ],
    faqs: [
      ['Will my blog posts move to Shopify?', 'Yes. Posts, images and SEO titles are moved to Shopify\'s blog and the old URLs are redirected.'],
      ['Do I need an audit before migrating?', 'Yes. It shows which plugins need a Shopify app or custom code and which URLs must be redirected, so the fixed quote is accurate.'],
    ],
  },
  'website-for-jewellery-shop': {
    work: [W.southern],
    answer: { h: 'Jewellery website design: what to include', p: ['A jewellery website needs clear photos of every piece, a price that shows weight, purity and making charges, hallmark details on each product, and a way to book a store visit or chat on WhatsApp. It can start as a catalogue and add checkout later. For a WooCommerce store built and supported here, see the <a href="/work/southern-flavours/">Southern Flavours case study</a>; for planning tips, read <a href="/blog/website-for-jewellers/">websites for jewellers</a>.'] },
    extra: [
      { h: 'Live gold-rate pricing and making charges in WooCommerce or Shopify', p: ['Prices can be calculated from the gold rate you enter each day: weight times rate, plus making charges (a fixed amount or a percentage), plus stone value and GST. When you update the rate once, every gold product updates.', 'On WooCommerce this is done with a pricing plugin or a small custom function; on Shopify it needs an app or a scheduled price update. The rate stays under your control, not pulled from a feed you cannot check.'] },
      { h: 'Hallmark, BIS and certificate display', p: ['Each product shows purity (such as 22K or 18K), BIS hallmark details and, for diamonds, the certificate lab and number. These fields come from you and must match the piece.', 'A trust section explains hallmarking, exchange and buyback policy in plain words, and certificates can be shown as images or PDFs on the product page.'] },
      { h: 'Catalogue or full ecommerce: which to choose', p: ['A catalogue with WhatsApp enquiries and store-visit booking suits heavy gold and bridal pieces that buyers want to see in person. A full online store suits silver, fashion jewellery, lightweight gold and gifting pieces.', 'Many shops run both: checkout for everyday pieces, enquiry for high-value ones. The <a href="/blog/website-for-jewellers/">jewellers guide</a> compares the approaches in detail.'] },
    ],
    faqs: [
      ['Can prices update with the daily gold rate?', 'Yes. You enter the rate once and prices are recalculated from weight, making charges and GST across all gold products.'],
      ['Can I show BIS hallmark details on products?', 'Yes. Purity, hallmark and certificate fields are added to each product; the details come from you.'],
    ],
  },
  'website-for-salons-and-spas': {
    work: [W.sunaina],
    answer: { h: 'Salon website design: what it should do', p: ['A salon website should let clients see your services and prices, pick a stylist and a time slot, and book in under a minute, with WhatsApp and directions always visible. The booking page follows the same pattern as the appointment page on the <a href="/work/dr-sunaina-dental-care/">Dr. Sunaina Dental Care case study</a>.'] },
    extra: [
      { h: 'Online appointment booking with staff and slot selection', p: ['Clients choose a service, then a stylist or therapist, then an open slot. Each staff member has their own working hours and days off, and the service length blocks the right amount of time.', 'Confirmations go by email or WhatsApp, with a reminder before the appointment. Deposits can be taken online for long services such as bridal makeup to cut no-shows.'] },
      { h: 'Service menu with prices and packages', p: ['The menu is grouped by hair, skin, nails, spa and makeup, with duration and price for each service. You set and edit the prices yourself.', 'Packages such as bridal, pre-bridal and memberships get their own pages with what is included, so they can be shared on WhatsApp and Instagram.'] },
      { h: 'Instagram and Google review integration', p: ['Your latest Instagram posts can be shown on the site through a feed, so new work appears without uploading it twice.', 'Google reviews are linked or embedded from your Business Profile, and a "Leave a review" link is added to confirmation messages to keep new reviews coming.'] },
    ],
    faqs: [
      ['Can clients choose a specific stylist?', 'Yes. Each stylist or therapist has their own schedule and clients pick the person and slot when booking.'],
      ['Can I show my Instagram on the website?', 'Yes. A feed shows your latest posts, and Google reviews can be shown from your Business Profile.'],
    ],
  },
  'website-for-interior-designers': {
    work: [W.agama],
    answer: { h: 'Interior designer website design: what it needs', p: ['An interior designer website needs a portfolio with one page per project, a short enquiry form that asks budget, property type and city, and pages that can rank for "interior designer in [city]". See the <a href="/work/studio-agama-interiors/">Studio Agama Interiors case study</a> for a live interior design site built on WordPress.'] },
    extra: [
      { h: 'Project portfolio structure', p: ['Each project gets its own case page: property type, area, city, the brief, before and after photos, and 3D renders next to the finished rooms where you have them.', 'Projects are tagged by type (apartment, villa, office, retail) and style, so visitors can filter to work like theirs. A project page is also easier to share than a long gallery.'] },
      { h: 'Lead qualification form', p: ['The enquiry form asks the questions you would ask on the first call: budget range, property type, size, city, possession date and whether it is a full home or a single room.', 'Leads arrive by email and WhatsApp with these answers filled in, so you can prioritise serious projects and reply with the right next step.'] },
      { h: 'Ranking for "interior designer in [city]"', p: ['Local searches are won with a Google Business Profile that matches the site, a page for the city you work in, and project pages that name the area and property type.', 'Real projects with real photos are the strongest signal. Pages for cities where you have no projects are left out, because thin location pages rarely rank and can hold the whole site back.'] },
    ],
    faqs: [
      ['Should each project have its own page?', 'Yes. A page per project with the brief, photos and renders is easier to share and gives search engines more to rank than one large gallery.'],
      ['Can the enquiry form ask for budget?', 'Yes. The form can ask budget range, property type and city so you know which leads to call first.'],
    ],
  },
  'figma-to-wordpress': {
    work: [W.streak],
    answer: { h: 'Figma to WordPress conversion: how it works', p: ['Figma to WordPress conversion turns your design frames into a working, responsive WordPress site: styles become global settings, sections become reusable blocks or templates, and every page is checked against your frames at each breakpoint before launch. See the <a href="/work/streak-creative/">Streak Creative case study</a> for a design-led agency site built this way.'] },
    extra: [
      { h: 'Handoff checklist for designers', p: ['A clean file makes the build faster and closer to the design:'], list: ['Auto layout on sections, so spacing rules are clear', 'Colour and text styles (or variables) instead of one-off values', 'Desktop, tablet and mobile frames, or notes on how layouts stack', 'Hover, open and error states for buttons, menus and forms', 'Exported or exportable images and icons (SVG where possible)', 'Font names and licences'] },
      { h: 'Elementor vs Gutenberg vs custom theme: which output you get', p: ['The same design can be built three ways, chosen with you at the start:'], table: { head: ['Build', 'Best for', 'Editing'], rows: [['Elementor', 'Teams already using Elementor, fast marketing pages', 'Visual drag and drop'], ['Gutenberg block theme', 'Fast, lightweight sites with custom blocks', 'Block editor with locked patterns'], ['Custom classic theme', 'Complex layouts and custom post types', 'Fields per page, layout fixed in code']] } },
      { h: 'QA process', p: ['Each page is compared with its Figma frame using a pixel overlay at desktop, tablet and mobile widths. Lighthouse is run for performance, accessibility and SEO, and problems are fixed before handover.', 'The site is tested in a cross-browser matrix: Chrome, Safari, Firefox and Edge on desktop, plus Safari on iPhone and Chrome on Android. Forms, menus and animations are tested by hand.'] },
    ],
    faqs: [
      ['Do you need tablet and mobile frames?', 'They help, but are not required. Without them, layouts are stacked sensibly and shown to you on staging for approval.'],
      ['Which builder will my site use?', 'Elementor, a Gutenberg block theme or a custom theme, agreed before work starts based on how your team will edit the site.'],
    ],
  },
  'wordpress-migration': {
    work: [W.temples],
    answer: { h: 'WordPress migration service: how it works', p: ['A WordPress migration copies your files and database to the new host, tests the copy on a temporary address, then switches DNS with a low TTL so visitors move over with no downtime. Email, SSL and redirects are checked after the switch. Large sites like the <a href="/work/our-temples/">Our Temples directory</a> need the same care at a bigger scale.'] },
    extra: [
      { h: 'Zero-downtime migration steps', p: ['The order of work keeps the old site live until the new one is proven:'], list: ['Lower the DNS TTL a day before, so the switch spreads quickly', 'Copy files and database to the new host and test on a temporary URL or hosts file', 'Freeze content edits and orders for a short window, then sync the latest database', 'Switch DNS (or nameservers) and issue SSL on the new host', 'Keep the old host running for a few days as a fallback'] },
      { h: 'Host-specific notes: GoDaddy or Bluehost to Hostinger or Cloudways', p: ['GoDaddy and Bluehost shared plans often have email on the same account, so MX records are copied before the switch to keep mail working. Some older plans block large backups, so files are moved over SFTP and the database separately.', 'Hostinger uses hPanel with its own migration tool, useful for small sites; larger sites are moved by hand. Cloudways has no email hosting, so mail stays with the old provider or moves to Google Workspace or Zoho.'] },
      { h: 'Post-migration SEO checks', p: ['After the switch the site is crawled to find broken links, mixed content and missing images. If the domain or URL structure changed, 301 redirects are tested one by one.', 'In Search Console the sitemap is resubmitted and coverage is watched for errors over the next weeks. A domain change also needs the Change of Address tool.'] },
    ],
    faqs: [
      ['Will my email stop working during the move?', 'No, if MX records are copied before the switch. Email hosting is checked as part of every migration.'],
      ['Is there downtime when moving hosts?', 'Normally no. The new copy is tested first and DNS is switched with a low TTL, while the old host stays live as a fallback.'],
    ],
  },
  'website-redesign': {
    work: [W.vansh, W.sahni],
    answer: { h: 'Website redesign services: what is included', p: ['A website redesign rebuilds the design, structure and speed of your site while keeping the pages and URLs that already bring traffic. It starts with an audit, ends with a redirect map and Search Console checks, and the new site is built on staging so the old one keeps working. Read <a href="/blog/redesign-website-without-losing-rankings/">how to redesign without losing rankings</a>, or see the <a href="/work/vansh-group/">Vansh Group case study</a>.'] },
    extra: [
      { h: 'Redesign without losing rankings', p: ['Every URL is listed first from the sitemap, Search Console and a crawl, with its traffic and backlinks. Pages that rank keep their URL where possible.', 'Where a URL must change, it goes on a redirect map with a 301 to its closest new page, tested on staging and again after launch. Titles, headings and content that rank are carried over, not rewritten from scratch.'] },
      { h: 'Redesign audit: what we keep, rewrite and drop', p: ['The audit sorts every page into three groups:'], list: ['Keep: pages with traffic, links or enquiries, moved to the new design with their content intact', 'Rewrite: useful pages that are thin, dated or unclear, improved in the new design', 'Drop: duplicates and empty pages, removed or merged with a redirect'] },
      { h: 'Before and after examples from real work', p: ['The case studies on the <a href="/work/">work page</a> show real builds with the problem first, then the solution. <a href="/work/vansh-group/">Vansh Group</a> shows a B2B site organised around product families and a pre-qualifying enquiry form; <a href="/work/sahni-power-solutions/">Sahni Power Solutions</a> shows a fleet organised by capacity with call-back buttons.', 'No metrics are quoted here that the case studies do not state; your own before and after numbers are tracked from Search Console and Analytics after launch.'] },
    ],
    faqs: [
      ['Will a redesign hurt my Google rankings?', 'Not if ranking URLs are kept or redirected with 301s and their content is carried over. Search Console is checked after launch.'],
      ['Do you keep my existing content?', 'Pages that bring traffic or enquiries are kept. Thin pages are rewritten and duplicates are merged, agreed with you in the audit.'],
    ],
  },
  'wordpress-consultant': {
    work: [W.vansh],
    answer: { h: 'WordPress consultant: what you get', p: ['A WordPress consultant reviews your site and gives you a written plan: what is slowing it down, what is a security risk, which plugins to keep or replace, and what to build next. You can act on it yourself or have the work done. The <a href="/work/vansh-group/">Vansh Group case study</a> shows the kind of site structure a consultation plans.'] },
    extra: [
      { h: 'What a consultation covers', p: ['The review looks at each area that affects a business site:'], list: ['Speed: hosting, caching, images, heavy plugins and Core Web Vitals', 'Security: updates, users and roles, backups, login protection', 'SEO basics: titles, indexing, sitemap, redirects, Search Console errors', 'Plugins and theme: overlaps, abandoned plugins, licence status', 'Conversion: forms, calls to action, WhatsApp and tracking'], after: ['You get a written report with each issue, why it matters and the fix, ordered by impact.'] },
      { h: 'Hourly or fixed consulting packages', p: ['Short questions and calls suit hourly work. A full site review, a platform choice or a build plan suits a fixed package with a defined report. Either way the scope is agreed in writing first, with a fixed quote after a free review.'] },
      { h: 'Sample audit report excerpt', p: ['Each finding in the report follows the same short format:'], table: { head: ['Finding', 'Why it matters', 'Fix'], rows: [['Two caching plugins active', 'They conflict and can serve stale pages', 'Keep one, remove the other, clear cache'], ['Admin user named "admin"', 'Easy target for login attacks', 'Create a new admin, delete the old one'], ['Contact form emails not delivered', 'Lost enquiries', 'Send through SMTP with SPF and DKIM']] } },
    ],
    faqs: [
      ['Do I have to hire you to do the fixes?', 'No. The report is written so you or your own developer can act on it.'],
      ['What do I get after a consultation?', 'A written report listing each issue, why it matters and how to fix it, ordered by impact.'],
    ],
  },
  'wordpress-theme-development': {
    work: [W.third, W.streak],
    answer: { h: 'WordPress theme development: what you get', p: ['WordPress theme development builds a theme for your design and content only, with no unused features: templates for each page type, blocks or fields your team can edit, and fast, accessible code. See the <a href="/work/third-eye-social/">Third Eye Social case study</a> for a custom WordPress build.'] },
    extra: [
      { h: 'Block theme vs classic theme vs Elementor build', p: ['The right base depends on how the site will be edited:'], table: { head: ['Approach', 'Strengths', 'Trade-off'], rows: [['Block theme (FSE)', 'Lightweight, edits in the site editor, custom blocks', 'Complex logic needs custom blocks'], ['Classic theme', 'Full control in PHP templates, custom post types', 'Layout changes need a developer'], ['Elementor build', 'Visual editing for marketing teams', 'Heavier pages, plugin licence']] } },
      { h: 'Theme development process and timeline', p: ['Work runs in clear stages: scope and template list, design or Figma review, a staging build with templates and blocks, content entry and review, then launch and handover with a short editing guide. The timeline depends on the number of templates and custom features and is given in writing with the fixed quote.'] },
      { h: 'Performance and accessibility standards we ship to', p: ['Themes load only the scripts and styles a page uses, serve responsive images, and avoid render-blocking resources. Lighthouse is run on key templates before launch.', 'Accessibility checks cover keyboard navigation, visible focus, colour contrast, alt text fields and correct heading order. Code follows WordPress coding standards so updates stay safe.'] },
    ],
    faqs: [
      ['Should I choose a block theme or a classic theme?', 'A block theme suits sites edited in the site editor; a classic theme suits complex layouts with custom post types. This is agreed at the start.'],
      ['Will I be able to edit the theme myself?', 'Yes. Content is edited through blocks or fields, and you get a short guide at handover.'],
    ],
  },
};

module.exports = (PAGES) => {
  for (const p of PAGES) {
    const x = X[p.slug];
    if (!x) continue;
    p.answer = x.answer;
    p.extra = [...(p.extra || []), ...x.extra];
    p.faqs = [...x.faqs, ...(p.faqs || [])];
    p.recentWork = x.work;
  }
};
module.exports.SLUGS = Object.keys(X);
