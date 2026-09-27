// One-off helper: insert contextual links into existing blog posts (tools/blog-data.js).
// Each entry: [source post slug, anchor text that exists exactly once in that post's body, HTML to insert BEFORE the anchor]
// Safe to re-run: skips an insert if the target link already exists in that post.
const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, 'blog-data.js');

const LINKS = [
  ['local-seo-guide-small-business-india', '<h2>Step 5: Get listed in trusted directories</h2>', '<p>For a page-by-page routine, use the <a href="/blog/on-page-seo-checklist/">on-page SEO checklist</a> whenever you publish a new page.</p>\n\n'],
  ['how-to-write-website-content', '<h2>Stuck? Start with this</h2>', '<p>Before publishing each page, run through the <a href="/blog/on-page-seo-checklist/">on-page SEO checklist</a>.</p>\n\n'],
  ['website-design-mistakes', '<h2>How to audit your own site</h2>', '<p>Two related guides: the <a href="/blog/website-accessibility-basics/">accessibility basics</a> that make a site usable for everyone, and the <a href="/blog/signs-you-need-a-new-website/">signs it\'s time for a new website</a>.</p>\n\n'],
  ['get-more-enquiries-from-your-website', '<h2>Guide visitors to act</h2>', '<p>If your form gets no submissions at all, check that it isn\'t broken. See <a href="/blog/contact-form-not-getting-enquiries/">why contact forms stop getting enquiries</a>.</p>\n\n'],
  ['get-more-enquiries-from-your-website', '<h2>Where to start</h2>', '<p>Not everyone is ready to enquire today. A useful <a href="/blog/lead-magnets-newsletter-small-business/">lead magnet or newsletter</a> keeps those visitors in touch.</p>\n\n'],
  ['schema-markup-explained', '<h2>Schema types small businesses should know</h2>', '<p>Structured data is also part of being understood by AI tools; see <a href="/blog/ai-search-optimization-website/">AI search and your website</a>.</p>\n\n'],
  ['portfolio-website-freelancers-creatives', '<h2>Photographers: speed matters</h2>', '<p>Interior designers and architects have extra needs, such as project stories and process pages. See <a href="/blog/website-for-interior-designers-architects/">websites for interior designers and architects</a>.</p>\n\n'],
  ['portfolio-website-freelancers-creatives', '<h2>Get found</h2>', '<p>Event and wedding planners face the same challenge with large galleries; see <a href="/blog/website-for-event-wedding-planners/">websites for event and wedding planners</a>.</p>\n\n'],
  ['website-for-travel-agencies', '<h2>Campaign landing pages</h2>', '<p>If you also run accommodation, read <a href="/blog/hotel-website-direct-bookings/">how hotels and homestays get more direct bookings</a>.</p>\n\n'],
  ['hotel-website-direct-bookings', '<h2>Getting started</h2>', '<p>Tour operators and travel agencies can use many of the same ideas; see <a href="/blog/website-for-travel-agencies/">websites for travel agencies</a>.</p>\n\n'],
  ['personal-brand-website-professionals', '<h2>Design tips</h2>', '<p>Lawyers, chartered accountants and consultants have specific needs around practice areas and guidelines; see <a href="/blog/website-for-lawyers-and-chartered-accountants/">websites for lawyers, CAs and consultants</a>.</p>\n\n'],
  ['clinic-website-checklist-for-doctors', '<h2>Next step</h2>', '<p>Doctors who also coach, teach or run programs can go further with a <a href="/blog/personal-brand-website-professionals/">personal brand website</a>. Dental practices should also read <a href="/blog/website-for-dentists/">what patients look for in a dental clinic website</a>.</p>\n\n'],
  ['accept-online-payments-wordpress-india', '<h3>3. Payment links and buttons</h3>', '<p>Schools and coaching institutes often collect fees this way; see <a href="/blog/school-coaching-website-what-parents-look-for/">what parents and students look for</a>.</p>\n'],
  ['accept-online-payments-wordpress-india', '<h2>Common problems and fixes</h2>', '<p>Launching a full store? Use the <a href="/blog/woocommerce-store-launch-checklist/">WooCommerce launch checklist</a> before going live.</p>\n\n'],
  ['choose-wordpress-hosting-india', '<h2>How much should you spend?</h2>', '<p>New to all this? Start with <a href="/blog/domain-hosting-ssl-explained/">domain, hosting and SSL explained simply</a>.</p>\n\n'],
  ['migrate-wix-to-wordpress', '<h2>Is it worth it?</h2>', '<p>For the basics of domains, DNS and SSL, see <a href="/blog/domain-hosting-ssl-explained/">domain, hosting and SSL explained</a>.</p>\n\n'],
  ['setup-google-analytics-search-console', '<h2>Step 4: Link the two tools</h2>', '<p>New site not showing up yet? See <a href="/blog/get-website-indexed-google-faster/">how to get your website indexed faster</a>.</p>\n\n'],
  ['redesign-website-without-losing-rankings', '<h2>The bottom line</h2>', '<p>If traffic does drop after launch, work through the <a href="/blog/website-traffic-dropped/">traffic drop checklist</a> step by step, and check that new pages are being indexed; see <a href="/blog/get-website-indexed-google-faster/">getting indexed faster</a>.</p>\n\n'],
  ['signs-wordpress-site-hacked', '<h2>Need it fixed fast?</h2>', '<p>A hack is one common cause of sudden traffic loss; see <a href="/blog/website-traffic-dropped/">what to check when traffic drops</a>.</p>\n\n'],
  ['elementor-vs-gutenberg', '<h2>My recommendation</h2>', '<p>Your theme matters just as much as the builder; see <a href="/blog/how-to-choose-wordpress-theme/">how to choose a WordPress theme</a>.</p>\n\n'],
  ['essential-wordpress-plugins-business', '<h2>How to choose a plugin safely</h2>', '<p>The same principles apply to themes; see <a href="/blog/how-to-choose-wordpress-theme/">how to choose a WordPress theme</a>.</p>\n\n'],
  ['startup-website-checklist', '<h2>Build for iteration</h2>', '<p>Capture interest from visitors who aren\'t ready yet with a <a href="/blog/lead-magnets-newsletter-small-business/">lead magnet or waitlist</a>.</p>\n\n'],
  ['woocommerce-vs-shopify-india', '<h2>Our recommendation</h2>', '<p>Chosen WooCommerce? Work through the <a href="/blog/woocommerce-store-launch-checklist/">WooCommerce store launch checklist</a> before going live.</p>\n\n'],
  ['wordpress-maintenance-checklist', "<h2>Don't have time?</h2>", '<p>Wondering what professional maintenance costs? See <a href="/blog/website-maintenance-cost-india/">website maintenance cost in India</a>. For the plugins worth keeping, see <a href="/blog/essential-wordpress-plugins-business/">essential WordPress plugins</a>.</p>\n\n'],
  ['wordpress-website-cost-india', '<h2>How to get an accurate quote</h2>', '<p>For ongoing costs after launch, see <a href="/blog/website-maintenance-cost-india/">website maintenance cost in India</a>.</p>\n\n'],
  ['wordpress-website-cost-india', '<h2>The bottom line</h2>', '<p>Ready to request quotes? Use the <a href="/blog/website-brief-template/">website brief template</a> so every developer quotes on the same scope.</p>\n\n'],
  ['wordpress-security-checklist', '<h2>Signs something is already wrong</h2>', '<p>Keep your plugin list lean and well maintained; see <a href="/blog/essential-wordpress-plugins-business/">essential WordPress plugins (and ones to avoid)</a>.</p>\n\n'],
  ['how-to-choose-wordpress-theme', '<h2>Mistakes to avoid</h2>', '<p>Building a listings site? See <a href="/blog/directory-website-wordpress/">how directory websites work on WordPress</a>.</p>\n\n'],
  ['local-seo-guide-small-business-india', '<h2>How long does local SEO take?</h2>', '<p>More and more local questions are also answered by AI assistants; see <a href="/blog/ai-search-optimization-website/">how to get cited by AI search</a>.</p>\n\n'],
  ['signs-you-need-a-new-website', '<h2>Next step</h2>', '<p>If you decide to rebuild, start with a clear <a href="/blog/website-brief-template/">website brief</a>.</p>\n\n'],
  ['landing-page-mistakes-google-ads', '<h2>A simple high-converting structure</h2>', '<p>Not sure whether you need a landing page or a full website for your ads? See <a href="/blog/landing-page-vs-website/">landing page vs website</a>.</p>\n\n'],
  // Round 2
  ['how-long-to-build-wordpress-website', '<h2>Plan your launch</h2>', '<p>Budgeting too? See <a href="/blog/wordpress-website-cost-india/">how much a WordPress website costs in India</a>.</p>\n\n'],
  ['migrate-wix-to-wordpress', "<h2>What can (and can't) be migrated</h2>", '<p>Still comparing platforms? See <a href="/blog/wordpress-vs-wix-vs-shopify/">WordPress vs Wix vs Shopify</a>.</p>\n\n'],
  ['website-brief-template', '<h2>Send it and compare</h2>', '<p>Deciding who to send it to? See <a href="/blog/freelancer-vs-agency-web-developer/">freelancer vs agency</a> and the questions to ask before hiring.</p>\n\n'],
  ['woocommerce-store-launch-checklist', '<h2>Products</h2>', '<p>Still deciding on a platform? See <a href="/blog/woocommerce-vs-shopify-india/">WooCommerce vs Shopify in India</a>.</p>\n\n'],
  ['contact-form-not-getting-enquiries', '<h2>Make sure you never miss a lead</h2>', '<p>For more ways to turn visitors into leads, see <a href="/blog/get-more-enquiries-from-your-website/">12 ways to get more enquiries from your website</a>.</p>\n\n'],
  ['how-to-choose-wordpress-theme', '<h2>Free vs premium themes</h2>', '<p>Deciding how you\'ll edit pages? See <a href="/blog/elementor-vs-gutenberg/">Elementor vs Gutenberg</a>.</p>\n\n'],
  ['wordpress-vs-wix-vs-shopify', '<h2>Which should you choose?</h2>', '<p>Already on Wix and thinking of switching? Here\'s <a href="/blog/migrate-wix-to-wordpress/">how to move from Wix to WordPress without losing traffic</a>.</p>\n\n'],
  ['freelancer-vs-agency-web-developer', '<h2>10 questions to ask before hiring any web developer</h2>', '<p>Some developers will suggest a custom-coded site instead of WordPress; see <a href="/blog/wordpress-vs-custom-coded-website/">WordPress vs custom-coded websites</a> to judge which you need.</p>\n\n'],
  ['equipment-rental-website-guide', '<h2>Local SEO for rental companies</h2>', '<p>Solar installers face similar buyers; see the <a href="/blog/solar-company-website-guide/">solar company website guide</a>.</p>\n\n'],
  ['figma-to-wordpress-designer-guide', '<h2>Quick handoff checklist</h2>', '<p>Agencies outsourcing builds should also read <a href="/blog/white-label-wordpress-development-agencies/">how white-label WordPress development works</a>.</p>\n\n'],
  ['landing-page-vs-website', '<h2>You need both</h2>', '<p>Property marketing is a classic example: each project needs its own campaign page alongside the main site. See the <a href="/blog/real-estate-website-must-have-features/">real estate website must-haves</a>.</p>\n\n'],
  ['multilingual-wordpress-website-hindi-english', '<h2>Start small</h2>', '<p>Temples, trusts and NGOs often need Hindi or regional versions first; see the <a href="/blog/temple-ngo-website-online-donations/">guide to temple and NGO websites</a>.</p>\n\n'],
  ['wordpress-vs-custom-coded-website', '<h2>Common myths</h2>', '<p>Launching a startup? See the <a href="/blog/startup-website-checklist/">startup website checklist</a> for what to launch with first.</p>\n\n'],
  ['white-label-wordpress-development-agencies', '<h2>Pricing models</h2>', '<p>Smooth projects start with a clean design file; share the <a href="/blog/figma-to-wordpress-designer-guide/">Figma to WordPress handoff guide</a> with your designers.</p>\n\n'],
  ['b2b-manufacturer-website-guide', '<h2>Show your capability</h2>', '<p>For a detailed walkthrough of product pages, filters and quote flows, see <a href="/blog/industrial-website-product-catalogue/">how to build a product catalogue website</a>.</p>\n\n'],
  ['b2b-manufacturer-website-guide', '<h2>SEO basics for manufacturers</h2>', '<p>Selling to buyers in other countries? See <a href="/blog/multilingual-wordpress-website-hindi-english/">multilingual WordPress websites</a>.</p>\n\n'],
  ['solar-company-website-guide', '<h2>Running ads?</h2>', '<p>Rental and hire businesses in the power sector have their own needs; see <a href="/blog/equipment-rental-website-guide/">equipment and generator rental websites</a>.</p>\n\n'],
  ['personal-brand-website-professionals', '<h2>Stay professional</h2>', '<p>Fitness trainers and yoga teachers can apply the same ideas; see <a href="/blog/website-for-gyms-fitness-studios/">websites for gyms and fitness trainers</a>.</p>\n\n'],
  ['website-for-interior-designers-architects', '<h2>Design and performance</h2>', '<p>Many of the same principles apply to any creative portfolio; see <a href="/blog/portfolio-website-freelancers-creatives/">portfolio websites for freelancers and creatives</a>.</p>\n\n'],
  // Round 3
  ['wordpress-maintenance-checklist', '<h2>Monthly</h2>', '<p>For a deeper look at backups and restores, see the <a href="/blog/wordpress-backup-restore-guide/">WordPress backup and restore guide</a>.</p>\n\n'],
  ['wordpress-security-checklist', '<h2>Hosting and server</h2>', '<p>More on getting backups right: <a href="/blog/wordpress-backup-restore-guide/">WordPress backup and restore</a>.</p>\n\n'],
  ['woocommerce-store-launch-checklist', '<h2>After launch</h2>', '<p>Once live, keep improving: see <a href="/blog/woocommerce-product-page-optimization/">product page optimization</a> and <a href="/blog/woocommerce-seo-guide/">WooCommerce SEO</a>.</p>\n\n'],
  ['woocommerce-vs-shopify-india', '<h2>Speed and performance</h2>', '<p>Organic search matters for stores too; see <a href="/blog/woocommerce-seo-guide/">how to rank WooCommerce product and category pages</a>.</p>\n\n'],
  ['google-business-profile-checklist', '<h2>Posts, Q&amp;A and messaging</h2>', '<p>For templates and what to avoid, read <a href="/blog/get-more-google-reviews/">how to get more Google reviews ethically</a>.</p>\n\n'],
  ['local-seo-guide-small-business-india', '<h2>Step 3: Keep your NAP consistent</h2>', '<p>Need a steady flow of reviews? See <a href="/blog/get-more-google-reviews/">how to get more Google reviews the ethical way</a>.</p>\n\n'],
  ['on-page-seo-checklist', '<h2>Technical</h2>', '<p>Why links between your own pages matter so much: <a href="/blog/internal-linking-explained/">internal linking explained</a>.</p>\n\n'],
  ['get-website-indexed-google-faster', '<h2>Common blockers</h2>', '<p>For a full health check, work through the <a href="/blog/technical-seo-audit-wordpress/">technical SEO audit checklist</a>.</p>\n\n'],
  ['website-traffic-dropped', '<h2>What not to do</h2>', '<p>A structured <a href="/blog/technical-seo-audit-wordpress/">technical SEO audit</a> often reveals the cause.</p>\n\n'],
  // Round 4
  ['domain-hosting-ssl-explained', '<h2>Hosting</h2>', '<p>Still picking a name? See <a href="/blog/choose-domain-name-business/">how to choose a domain name for your business</a>.</p>\n\n'],
  ['startup-website-checklist', '<h2>What can wait</h2>', '<p>Haven\'t picked a domain yet? See <a href="/blog/choose-domain-name-business/">how to choose a domain name</a>.</p>\n\n'],
  ['b2b-manufacturer-website-guide', '<h2>The bottom line</h2>', '<p>Exporting? Read <a href="/blog/website-for-export-businesses/">websites for export businesses</a> for what international buyers look for.</p>\n\n'],
  ['industrial-website-product-catalogue', '<h2>Keep it manageable</h2>', '<p>Selling abroad too? See <a href="/blog/website-for-export-businesses/">how exporters win international buyers online</a>.</p>\n\n'],
  ['elementor-vs-gutenberg', '<h2>Choose Gutenberg if...</h2>', '<p>If your Elementor site is already slow, see <a href="/blog/why-elementor-sites-slow/">why Elementor sites get slow and how to fix them</a>.</p>\n\n'],
  ['why-is-my-wordpress-site-slow', '<h2>Quick wins you can do today</h2>', '<p>Built with Elementor? These <a href="/blog/why-elementor-sites-slow/">Elementor-specific fixes</a> help too.</p>\n\n'],
  ['wordpress-vs-custom-coded-website', '<h2>The practical answer for most businesses</h2>', '<p>Heard about "headless" WordPress? See <a href="/blog/headless-wordpress-small-business/">whether a small business needs headless WordPress</a>.</p>\n\n'],
  ['setup-google-analytics-search-console', '<h2>What to check every month</h2>', '<p>Once tracking works, you can <a href="/blog/measure-website-roi/">measure your website\'s ROI</a> in simple rupee terms.</p>\n\n'],
  ['get-more-enquiries-from-your-website', '<h3>12. Track what works</h3>', '<p>Then turn those numbers into rupees; see <a href="/blog/measure-website-roi/">how to measure website ROI</a>.</p>\n'],
  ['clinic-website-checklist-for-doctors', '<h2>Common mistakes to avoid</h2>', '<p>Running a diagnostic lab or pathology centre? See <a href="/blog/website-for-diagnostic-labs/">websites for diagnostic labs</a>.</p>\n\n'],
  // Round 5
  ['how-to-write-website-content', '<h2>Service pages</h2>', '<p>More detail: <a href="/blog/write-about-page-that-builds-trust/">how to write an About page that builds trust</a>.</p>\n\n'],
  ['how-to-write-website-content', '<h2>Writing tips that work</h2>', '<p>For a full walkthrough, see <a href="/blog/write-service-pages-that-convert/">how to write service pages that rank and convert</a>.</p>\n\n'],
  ['get-more-enquiries-from-your-website', '<h3>8. Use real photos</h3>', '<p>See <a href="/blog/collect-display-customer-testimonials/">how to collect and display testimonials</a> that actually convince people.</p>\n'],
  ['get-more-google-reviews', '<h2>Use reviews on your website too</h2>', '<p>For on-site quotes, see <a href="/blog/collect-display-customer-testimonials/">collecting and displaying testimonials</a>.</p>\n\n'],
  ['portfolio-website-freelancers-creatives', '<h2>Make it clear what you offer</h2>', '<p>See <a href="/blog/write-case-studies-business-website/">how to write case studies</a> for a simple structure.</p>\n\n'],
  ['wordpress-maintenance-checklist', '<h2>Golden rules</h2>', '<p>For a safe step-by-step process, see <a href="/blog/update-wordpress-safely/">how to update WordPress without breaking your site</a>.</p>\n\n'],
  ['wordpress-security-checklist', '<h2>Logins and users</h2>', '<p>Worried updates will break things? Follow <a href="/blog/update-wordpress-safely/">this safe update process</a>.</p>\n\n'],
  ['redesign-website-without-losing-rankings', '<h2>At launch</h2>', '<p>New to staging? See <a href="/blog/staging-sites-explained/">staging sites explained</a>.</p>\n\n'],
  ['wordpress-backup-restore-guide', '<h2>Test your backups</h2>', '<p>A <a href="/blog/staging-sites-explained/">staging site</a> is the ideal place to test restores.</p>\n\n'],
  // Round 6
  ['website-for-export-businesses', '<h2>Communication</h2>', '<p>If you also handle freight, see <a href="/blog/website-for-logistics-transport-companies/">websites for logistics and transport companies</a>.</p>\n\n'],
  ['website-for-gyms-fitness-studios', '<h2>Content that builds trust</h2>', '<p>Salons and spas share many of these needs; see <a href="/blog/website-for-salons-spas/">websites for salons and spas</a>.</p>\n\n'],
  ['real-estate-website-must-have-features', '<h2>SEO for real estate websites</h2>', '<p>Contractors and builders working on projects should also read <a href="/blog/website-for-construction-companies/">websites for construction companies</a>.</p>\n\n'],
  ['website-for-interior-designers-architects', '<h2>Get found locally</h2>', '<p>Selling furniture as well? See <a href="/blog/website-for-furniture-businesses/">websites for furniture showrooms and manufacturers</a>.</p>\n\n'],
  ['woocommerce-product-page-optimization', '<h2>Measure and improve</h2>', '<p>High-value products need extra trust; see <a href="/blog/website-for-jewellers/">websites for jewellers</a> for a good example.</p>\n\n'],
  ['startup-website-checklist', '<h2>Speed matters</h2>', '<p>IT services firms have their own priorities; see <a href="/blog/website-for-it-software-companies/">websites for IT and software companies</a>.</p>\n\n'],
  // Round 7
  ['restaurant-website-online-ordering', '<h2>Get found by hungry locals</h2>', '<p>Selling packaged food online too? See <a href="/blog/website-for-d2c-food-brands/">websites for organic and D2C food brands</a>.</p>\n\n'],
  ['woocommerce-seo-guide', '<h2>Quick checklist</h2>', '<p>Industry examples: <a href="/blog/website-for-fashion-boutiques/">fashion boutiques</a>, <a href="/blog/website-for-d2c-food-brands/">D2C food brands</a> and <a href="/blog/website-for-jewellers/">jewellers</a>.</p>\n\n'],
  ['website-for-diagnostic-labs', '<h2>Mobile first</h2>', '<p>Pharmacies have similar needs; see <a href="/blog/website-for-pharmacies/">websites for pharmacies and medical stores</a>.</p>\n\n'],
  ['equipment-rental-website-guide', '<h2>Build trust</h2>', '<p>Vehicle-based businesses have their own needs; see <a href="/blog/website-for-car-dealers-workshops/">websites for car dealers and workshops</a>.</p>\n\n'],
  ['industrial-website-product-catalogue', '<h2>Filters and search</h2>', '<p>Packaging suppliers use the same approach; see <a href="/blog/website-for-printing-packaging-companies/">websites for printing and packaging companies</a>.</p>\n\n'],
  ['website-for-logistics-transport-companies', '<h2>Make it fast to enquire</h2>', '<p>Similar B2B service providers: <a href="/blog/website-for-security-facility-management/">security and facility management companies</a>.</p>\n\n'],
  // Round 8
  ['wordpress-vs-wix-vs-shopify', '<h2>Shopify: built for selling online</h2>', '<p>Also considering Webflow? See <a href="/blog/wordpress-vs-webflow/">WordPress vs Webflow</a>.</p>\n\n'],
  ['landing-page-vs-website', '<h2>What makes a landing page work</h2>', '<p>Before launching ads, run through the <a href="/blog/website-ready-for-google-ads/">Google Ads readiness checklist</a>.</p>\n\n'],
  ['how-to-write-website-content', '<h2>SEO basics for your content</h2>', '<p>Avoid these <a href="/blog/website-copywriting-mistakes/">common copywriting mistakes</a>.</p>\n\n'],
  ['woocommerce-store-launch-checklist', '<h2>Shipping and taxes</h2>', '<p>More detail: <a href="/blog/woocommerce-shipping-setup-india/">WooCommerce shipping setup for India</a>.</p>\n\n'],
  ['woocommerce-product-page-optimization', '<h2>Don\'t forget speed</h2>', '<p>Losing buyers at checkout? See <a href="/blog/woocommerce-abandoned-cart-recovery/">abandoned cart recovery</a>.</p>\n\n'],
  ['local-seo-guide-small-business-india', '<h2>Step 6: Earn local links and mentions</h2>', '<p>Serving several cities? Read <a href="/blog/local-landing-pages-without-doorway-pages/">how to create location pages without doorway pages</a>.</p>\n\n'],
  // Round 9
  ['lead-magnets-newsletter-small-business', '<h2>Where to put your forms</h2>', '<p>Collecting emails means handling personal data carefully; see <a href="/blog/privacy-policy-cookie-basics-india/">privacy policy and cookie basics</a>.</p>\n\n'],
  ['wordpress-security-checklist', '<h2>Backups</h2>', '<p>Not sure which role to give whom? See <a href="/blog/wordpress-user-roles-explained/">WordPress user roles explained</a>.</p>\n\n'],
  ['wordpress-maintenance-checklist', '<h2>Every 3–6 months</h2>', '<p>Want alerts the moment your site goes down? See <a href="/blog/uptime-monitoring-explained/">uptime monitoring explained</a>.</p>\n\n'],
  ['core-web-vitals-explained', '<h2>Where to start</h2>', '<p>Remember your real audience: see <a href="/blog/website-speed-indian-mobile-networks/">website speed on Indian mobile networks</a>.</p>\n\n'],
  ['website-brief-template', '<h2>7. Content</h2>', '<p>Brand assets checklist: <a href="/blog/logo-favicon-brand-basics-website/">logo, favicon and brand basics</a>.</p>\n\n'],
  ['website-accessibility-basics', '<h2>Common WordPress issues</h2>', '<p>Serving many older customers? See <a href="/blog/website-accessibility-older-users/">making your website easy for older visitors</a>.</p>\n\n'],
  // Round 10
  ['freelancer-vs-agency-web-developer', '<h2>Red flags</h2>', '<p>Already stuck with a developer who won\'t hand over access? See <a href="/blog/regain-website-access-old-developer/">how to regain control of your website</a>.</p>\n\n'],
  ['contact-form-not-getting-enquiries', '<h2>Persuasion reasons people don\'t fill it in</h2>', '<p>Getting lots of junk instead? See <a href="/blog/stop-contact-form-spam/">how to stop contact form spam</a>, and make sure your domain email is authenticated: <a href="/blog/business-email-deliverability-spf-dkim-dmarc/">SPF, DKIM and DMARC explained</a>.</p>\n\n'],
  ['write-service-pages-that-convert', '<h2>SEO essentials</h2>', '<p>Tips for writing them: <a href="/blog/faq-page-seo/">FAQ sections that help customers and SEO</a>.</p>\n\n'],
  ['website-for-lawyers-and-chartered-accountants', '<h2>Local SEO for professionals</h2>', '<p>Insurance and financial advisors face similar rules; see <a href="/blog/website-for-insurance-financial-advisors/">websites for insurance agents and financial advisors</a>.</p>\n\n'],
  ['real-estate-website-must-have-features', '<h2>Common mistakes</h2>', '<p>Agents and brokers have different needs from builders; see <a href="/blog/website-for-real-estate-agents-brokers/">websites for real estate agents and brokers</a>.</p>\n\n'],
  // Round 11
  ['update-wordpress-safely', '<h2>Automatic updates: yes or no?</h2>', '<p>Seeing an error message? See <a href="/blog/common-wordpress-errors-fixes/">common WordPress errors explained</a>.</p>\n\n'],
  ['domain-hosting-ssl-explained', '<h2>Business email</h2>', '<p>Seeing certificate warnings? See <a href="/blog/ssl-certificate-errors-fix/">SSL certificate errors explained</a>.</p>\n\n'],
  ['why-is-my-wordpress-site-slow', '<h2>When to get help</h2>', '<p>Serving visitors across regions? A <a href="/blog/what-is-a-cdn/">CDN</a> can help.</p>\n\n'],
  ['local-seo-guide-small-business-india', '<h2>Step 5: Get listed in trusted directories</h2>', '<p>Adding a map to your contact page? See <a href="/blog/google-maps-on-website/">how to add Google Maps without slowing your site</a>.</p>\n\n'],
  ['measure-website-roi', '<h2>Review monthly</h2>', '<p>Not sure which numbers to watch? See <a href="/blog/website-analytics-metrics-that-matter/">the analytics metrics that actually matter</a>.</p>\n\n'],
  ['website-design-mistakes', '<h2>Navigation and content</h2>', '<p>The fix for most of these: <a href="/blog/mobile-first-design-explained/">mobile-first design</a>.</p>\n\n'],
  // Round 12
  ['website-for-salons-spas', '<h2>Design tips</h2>', '<p>Other booking-driven local services: <a href="/blog/website-for-home-services/">home services</a> and <a href="/blog/website-for-cleaning-services/">cleaning services</a>.</p>\n\n'],
  ['website-for-logistics-transport-companies', '<h2>SEO for logistics companies</h2>', '<p>Household moves are different; see <a href="/blog/website-for-packers-movers/">websites for packers and movers</a>.</p>\n\n'],
  ['clinic-website-checklist-for-doctors', '<h2>Your Google Business Profile matters too</h2>', '<p>Larger or specialist practices: <a href="/blog/website-for-hospitals/">hospitals</a>, <a href="/blog/website-for-physiotherapy-clinics/">physiotherapy clinics</a> and <a href="/blog/website-for-eye-clinics-opticians/">eye clinics</a>.</p>\n\n'],
  // Round 13
  ['website-for-dentists', '<h2>Stay within guidelines</h2>', '<p>Animal care has its own needs; see <a href="/blog/website-for-veterinary-pet-clinics/">websites for vets and pet clinics</a>.</p>\n\n'],
  ['restaurant-website-online-ordering', '<h2>Common mistakes</h2>', '<p>Bakeries have extra needs like custom orders; see <a href="/blog/website-for-bakeries-cake-shops/">websites for bakeries and cake shops</a>.</p>\n\n'],
  ['website-for-d2c-food-brands', '<h2>Grow repeat orders</h2>', '<p>Gifting is a big opportunity; see <a href="/blog/website-for-florists-gift-shops/">websites for florists and gift shops</a>.</p>\n\n'],
  ['website-for-event-wedding-planners', '<h2>Performance with lots of photos</h2>', '<p>Venues need their own approach; see <a href="/blog/website-for-wedding-venues-banquet-halls/">websites for wedding venues and banquet halls</a>.</p>\n\n'],
  ['website-for-it-software-companies', '<h2>Build trust</h2>', '<p>Where many startups and IT teams work: <a href="/blog/website-for-coworking-spaces/">websites for co-working spaces</a>.</p>\n\n'],
  ['hotel-website-direct-bookings', '<h2>SEO for hotels and homestays</h2>', '<p>Long-stay accommodation is different; see <a href="/blog/website-for-hostels-pg-accommodation/">websites for hostels and PGs</a>.</p>\n\n'],
  // Round 14
  ['school-coaching-website-what-parents-look-for', '<h2>Keep it updated</h2>', '<p>Other learning businesses: <a href="/blog/website-for-music-dance-academies/">music and dance academies</a>, <a href="/blog/website-for-driving-schools/">driving schools</a> and <a href="/blog/website-for-home-tutors-online-teachers/">home tutors</a>.</p>\n\n'],
  ['website-for-fashion-boutiques', '<h2>Organise collections well</h2>', '<p>Handmade and heritage brands have their own story to tell; see <a href="/blog/website-for-handicraft-artisan-brands/">websites for handicraft and artisan brands</a>.</p>\n\n'],
  ['website-for-export-businesses', '<h2>Language and localisation</h2>', '<p>Sector examples: <a href="/blog/website-for-chemical-pharma-manufacturers/">chemical and pharma manufacturers</a> and <a href="/blog/website-for-agriculture-businesses/">agriculture businesses</a>.</p>\n\n'],
  // Round 15
  ['website-for-export-businesses', '<h2>Speed for international visitors</h2>', '<p>Textile exporters have specific needs; see <a href="/blog/website-for-textile-manufacturers/">websites for textile manufacturers</a>.</p>\n\n'],
  ['website-for-construction-companies', '<h2>SEO for contractors</h2>', '<p>Suppliers to the trade: see <a href="/blog/website-for-hardware-building-materials/">websites for hardware and building material suppliers</a>.</p>\n\n'],
  ['setup-google-analytics-search-console', '<h2>Step 3: Track the actions that matter</h2>', '<p>Once it\'s running, here\'s <a href="/blog/google-search-console-reports-explained/">what each Search Console report means</a>.</p>\n\n'],
  ['how-to-write-website-content', '<h2>Homepage</h2>', '<p>Tempted to let AI write it all? Read <a href="/blog/ai-tools-website-content-responsibly/">using AI tools for website content responsibly</a> first.</p>\n\n'],
  ['website-maintenance-cost-india', '<h2>Why maintenance is worth it</h2>', '<p>Need more than upkeep? See <a href="/blog/website-maintenance-vs-management/">maintenance vs management</a>.</p>\n\n'],
  ['multilingual-wordpress-website-hindi-english', '<h2>How multilingual WordPress sites work</h2>', '<p>Running many separate regional sites instead? See <a href="/blog/wordpress-multisite-when-needed/">when WordPress Multisite makes sense</a>.</p>\n\n'],
  // Round 16
  ['wordpress-security-checklist', '<h2>Monitoring and protection</h2>', '<p>An extra layer: <a href="/blog/website-security-headers-explained/">website security headers explained</a>.</p>\n\n'],
  ['get-more-enquiries-from-your-website', '<h2>Make it instantly clear what you do</h2>', '<p>Want a structured approach? See <a href="/blog/conversion-rate-optimization-basics/">conversion rate optimization basics</a>.</p>\n\n'],
  ['signs-you-need-a-new-website', '<h2>Redesign or start fresh?</h2>', '<p>Limited budget? See <a href="/blog/redesign-website-tight-budget/">how to redesign on a tight budget</a>.</p>\n\n'],
  ['website-for-florists-gift-shops', '<h2>Trust</h2>', '<p>Plan peaks in advance with this guide to <a href="/blog/seasonal-festival-campaigns-website/">seasonal and festival campaigns</a>.</p>\n\n'],
  ['lead-magnets-newsletter-small-business', '<h2>Newsletters that people actually read</h2>', '<p>Plan what to send with a simple <a href="/blog/website-content-calendar/">content calendar</a>.</p>\n\n'],
  ['collect-display-customer-testimonials', '<h2>Beyond written quotes</h2>', '<p>Using video well matters; see <a href="/blog/video-on-business-website/">when video helps and when it hurts</a>.</p>\n\n'],
  // Round 17
  ['website-for-travel-agencies', '<h2>Build trust</h2>', '<p>Running cabs and transfers too? See <a href="/blog/website-for-taxi-car-rental/">websites for taxi and car rental services</a>.</p>\n\n'],
  ['website-for-insurance-financial-advisors', '<h2>Privacy and security</h2>', '<p>Similar trust challenges apply to <a href="/blog/website-for-immigration-visa-consultants/">immigration and visa consultants</a>.</p>\n\n'],
  ['website-for-hospitals', '<h2>SEO</h2>', '<p>Supplying hospitals? See <a href="/blog/website-for-medical-equipment-suppliers/">websites for medical equipment suppliers</a>.</p>\n\n'],
  ['portfolio-website-freelancers-creatives', '<h2>Build trust</h2>', '<p>Writers and video creators: see <a href="/blog/website-for-authors-content-creators/">websites for authors and content creators</a>.</p>\n\n'],
  ['migrate-wix-to-wordpress', '<h2>Keeping your Google rankings</h2>', '<p>Moving from Blogger instead? See <a href="/blog/migrate-blogger-to-wordpress/">Blogger to WordPress</a>.</p>\n\n'],
  ['woocommerce-vs-shopify-india', '<h2>Choose Shopify if...</h2>', '<p>Already on Shopify and thinking of switching? See <a href="/blog/migrate-shopify-to-woocommerce/">moving from Shopify to WooCommerce</a>.</p>\n\n'],
  // Round 18
  ['technical-seo-audit-wordpress', '<h2>3. One version of the site</h2>', '<p>Background reading: <a href="/blog/xml-sitemaps-explained/">XML sitemaps</a> and <a href="/blog/robots-txt-explained/">robots.txt</a> explained.</p>\n\n'],
  ['technical-seo-audit-wordpress', '<h2>6. Speed and Core Web Vitals</h2>', '<p>More detail: <a href="/blog/canonical-tags-explained/">canonical tags</a>, <a href="/blog/duplicate-content-explained/">duplicate content</a> and <a href="/blog/301-vs-302-redirects/">301 vs 302 redirects</a>.</p>\n\n'],
  ['website-analytics-metrics-that-matter', '<h2>6. Search queries (Search Console)</h2>', '<p>Low engagement on key pages? See <a href="/blog/keep-visitors-engaged-website/">how to keep visitors engaged</a>.</p>\n\n'],
  // Round 19
  ['local-seo-guide-small-business-india', '<h2>Quick checklist</h2>', '<p>Wondering how long it all takes? See <a href="/blog/how-long-does-seo-take/">how long SEO takes to work</a>.</p>\n\n'],
  ['landing-page-vs-website', '<h2>The difference</h2>', '<p>Deciding between paid and organic first? See <a href="/blog/seo-vs-google-ads/">SEO vs Google Ads</a>.</p>\n\n'],
  ['freelancer-vs-agency-web-developer', '<h2>The bottom line</h2>', '<p>Hiring for SEO too? Learn the <a href="/blog/seo-red-flags-scams/">SEO red flags to avoid</a>.</p>\n\n'],
  ['internal-linking-explained', '<h2>Common mistakes</h2>', '<p>Links from other websites matter too; see <a href="/blog/ethical-link-building-small-business/">ethical link building for small businesses</a>.</p>\n\n'],
  ['local-seo-guide-small-business-india', '<h2>Step 6: Earn local links and mentions</h2>', '<p>More on listings: <a href="/blog/business-directories-citations-india/">business directories and citations in India</a>.</p>\n\n'],
  ['get-more-google-reviews', '<h2>Make reviews a habit</h2>', '<p>Got a bad review? See <a href="/blog/handle-negative-reviews/">how to handle negative reviews professionally</a>.</p>\n\n'],
  // Round 20
  ['website-for-real-estate-agents-brokers', '<h2>Build trust</h2>', '<p>Managing rentals for owners? See <a href="/blog/website-for-property-management-companies/">websites for property management companies</a>.</p>\n\n'],
  ['woocommerce-product-page-optimization', '<h2>Remove doubts</h2>', '<p>For the copy itself, see <a href="/blog/write-product-descriptions-that-sell/">how to write product descriptions that sell</a>.</p>\n\n'],
  ['business-email-deliverability-spf-dkim-dmarc', '<h2>SPF: who may send</h2>', '<p>Still choosing a provider? See <a href="/blog/business-email-options/">business email options for small businesses</a>.</p>\n\n'],
  ['core-web-vitals-explained', '<h2>How to check your scores</h2>', '<p>Confused by different scores? See <a href="/blog/website-speed-test-tools-explained/">speed test tools explained</a>.</p>\n\n'],
  ['google-business-profile-checklist', '<h2>Connect it to your website</h2>', '<p>Wondering whether a small shop needs a website at all? See <a href="/blog/does-a-local-shop-need-a-website/">does a local shop need a website</a>.</p>\n\n'],
  ['seo-red-flags-scams', '<h2>Green flags</h2>', '<p>Related: <a href="/blog/domain-seo-scam-emails/">how to spot domain renewal and SEO scam emails</a>.</p>\n\n'],
  // Round 21
  ['website-for-dentists', '<h2>Local SEO for dentists</h2>', '<p>Cosmetic and skin practices: see <a href="/blog/website-for-dermatology-skin-clinics/">websites for dermatology and skin clinics</a>.</p>\n\n'],
  ['website-for-physiotherapy-clinics', '<h2>Trust</h2>', '<p>Holistic practices have their own needs; see <a href="/blog/website-for-ayurveda-wellness-centres/">websites for Ayurveda and wellness centres</a>.</p>\n\n'],
  ['website-for-hospitals', '<h2>Performance and accessibility</h2>', '<p>Sensitive specialities need extra care; see <a href="/blog/website-for-fertility-clinics/">websites for fertility clinics</a>.</p>\n\n'],
  ['website-for-home-services', '<h2>Trust signals</h2>', '<p>Pest control businesses face similar urgency; see <a href="/blog/website-for-pest-control-companies/">websites for pest control companies</a>.</p>\n\n'],
  ['website-for-car-dealers-workshops', '<h2>Make it easy on mobile</h2>', '<p>Selling electric vehicles? See <a href="/blog/website-for-ev-dealers/">websites for EV dealers</a>.</p>\n\n'],
  ['website-for-home-services', '<h2>Areas served</h2>', '<p>Device repairs work the same way; see <a href="/blog/website-for-mobile-laptop-repair/">websites for mobile and laptop repair shops</a>.</p>\n\n'],
  // Round 22
  ['website-for-cleaning-services', '<h2>Show results</h2>', '<p>Garment care is a related business; see <a href="/blog/website-for-laundry-dry-cleaning/">websites for laundry and dry cleaning</a>.</p>\n\n'],
  ['website-for-wedding-venues-banquet-halls', '<h2>Trust</h2>', '<p>Food partners matter; see <a href="/blog/website-for-catering-services/">websites for catering services</a>.</p>\n\n'],
  ['website-for-bakeries-cake-shops', '<h2>Show your work</h2>', '<p>Selling regular meals instead? See <a href="/blog/website-for-tiffin-meal-subscriptions/">websites for tiffin and meal subscriptions</a>.</p>\n\n'],
  ['website-for-travel-agencies', '<h2>SEO tips</h2>', '<p>Adventure specialists: see <a href="/blog/website-for-trekking-adventure-operators/">websites for trekking and adventure operators</a>.</p>\n\n'],
  ['website-for-immigration-visa-consultants', '<h2>Consultation booking</h2>', '<p>Study-abroad advisers: see <a href="/blog/website-for-overseas-education-consultants/">websites for overseas education consultants</a>.</p>\n\n'],
  ['website-for-security-facility-management', '<h2>SEO</h2>', '<p>Staffing businesses: see <a href="/blog/website-for-recruitment-agencies/">websites for recruitment agencies</a>.</p>\n\n'],
  // Round 23
  ['website-for-event-wedding-planners', '<h2>Build trust</h2>', '<p>Equipment suppliers: see <a href="/blog/website-for-event-rental-businesses/">websites for event rental businesses</a>.</p>\n\n'],
  ['website-for-music-dance-academies', '<h2>Keep it updated</h2>', '<p>Sports coaching has similar needs; see <a href="/blog/website-for-sports-academies/">websites for sports academies</a>.</p>\n\n'],
  ['school-coaching-website-what-parents-look-for', '<h2>Get found by local families</h2>', '<p>For early years, see <a href="/blog/website-for-preschools-daycare/">websites for preschools and daycare centres</a>.</p>\n\n'],
  ['website-for-fashion-boutiques', '<h2>Store essentials</h2>', '<p>Offering stitching too? See <a href="/blog/website-for-tailoring-services/">websites for tailoring services</a>.</p>\n\n'],
  ['directory-website-wordpress', '<h2>Content quality matters most</h2>', '<p>Running a content-heavy publication instead? See <a href="/blog/news-magazine-websites-wordpress/">news and magazine websites on WordPress</a>.</p>\n\n'],
  ['landing-page-vs-website', '<h2>Why landing pages usually convert ad traffic better</h2>', '<p>Deciding how big your main site should be? See <a href="/blog/one-page-vs-multi-page-website/">one-page vs multi-page websites</a>.</p>\n\n'],
  // Round 24
  ['how-long-to-build-wordpress-website', '<h2>Can it be done faster?</h2>', '<p>After launch, follow this <a href="/blog/first-90-days-after-website-launch/">90-day plan</a>.</p>\n\n'],
  ['on-page-seo-checklist', '<h2>Content</h2>', '<p>More detail: <a href="/blog/write-meta-titles-descriptions/">how to write meta titles and descriptions</a>.</p>\n\n'],
  ['website-design-mistakes', '<h2>Contact and conversion</h2>', '<p>Menus causing confusion? See <a href="/blog/website-navigation-structure/">how to structure your website navigation</a>.</p>\n\n'],
  ['internal-linking-explained', '<h2>A quick internal linking routine</h2>', '<p>Breadcrumbs add structural links too; see <a href="/blog/breadcrumbs-explained/">breadcrumbs explained</a>.</p>\n\n'],
  ['301-vs-302-redirects', '<h2>After setting redirects</h2>', '<p>For pages that truly no longer exist, make sure visitors land on a <a href="/blog/helpful-404-pages/">helpful 404 page</a>.</p>\n\n'],
  ['stop-contact-form-spam', '<h2>Real example</h2>', '<p>Blog comment spam is a similar problem; see <a href="/blog/wordpress-comments-enable-or-disable/">should a business site enable comments?</a></p>\n\n'],
  // Round 25
  ['website-content-calendar', '<h2>Step 1: Collect topics</h2>', '<p>No blog yet? See <a href="/blog/add-blog-to-existing-website/">how to add a blog to your existing website</a>.</p>\n\n'],
  ['website-content-calendar', '<h2>Step 6: Refresh old content</h2>', '<p>Get more mileage from each post by <a href="/blog/repurpose-website-content-social-media/">repurposing it for social media</a>.</p>\n\n'],
  ['logo-favicon-brand-basics-website', '<h2>Social share images</h2>', '<p>Choosing a palette and fonts? See <a href="/blog/choose-website-colours-fonts/">how to choose website colours and fonts</a>.</p>\n\n'],
  ['first-90-days-after-website-launch', '<h2>Week 1: check everything works</h2>', '<p>Before launch day, run through the full <a href="/blog/website-launch-checklist/">website launch checklist</a>.</p>\n\n'],
  ['image-optimization-wordpress', '<h2>1. Resize before uploading</h2>', '<p>Taking your own photos? See <a href="/blog/prepare-photos-for-website/">how to prepare photos for your website</a>.</p>\n\n'],
  ['freelancer-vs-agency-web-developer', '<h2>When a freelancer is the better choice</h2>', '<p>Considering building it yourself? See <a href="/blog/hire-developer-vs-diy-website/">hire a developer vs DIY</a>.</p>\n\n'],
  // Round 26
  ['how-to-write-website-content', '<h2>About page</h2>', '<p>Detailed walkthrough: <a href="/blog/write-homepage-that-converts/">how to write a homepage that converts</a>.</p>\n\n'],
  ['wordpress-website-cost-india', '<h2>Hidden costs to watch for</h2>', '<p>Running a service business? See <a href="/blog/show-prices-on-website/">whether you should show prices on your website</a>.</p>\n\n'],
  ['signs-you-need-a-new-website', '<h2>1. It doesn\'t work well on phones</h2>', '<p>Not sure? Run this <a href="/blog/diy-website-audit/">one-hour DIY website audit</a> first.</p>\n\n'],
  ['setup-google-analytics-search-console', '<h2>Step 4: Link the two tools</h2>', '<p>More on tracking the right actions: <a href="/blog/ga4-events-explained/">GA4 events explained</a> and <a href="/blog/utm-tags-explained/">UTM tags explained</a>.</p>\n\n'],
  ['contact-form-not-getting-enquiries', '<h2>Quick fix checklist</h2>', '<p>And confirm every submission properly with a <a href="/blog/thank-you-pages-forms/">thank-you page</a>.</p>\n\n'],
  // Round 27
  ['why-is-my-wordpress-site-slow', '<h2>Quick wins you can do today</h2>', '<p>New to caching? Read <a href="/blog/wordpress-caching-explained/">WordPress caching explained</a>.</p>\n\n'],
  ['woocommerce-shipping-setup-india', '<h2>4. Couriers and aggregators</h2>', '<p>More on reducing refused deliveries: <a href="/blog/woocommerce-cash-on-delivery-india/">cash on delivery without losing money</a>.</p>\n\n'],
  ['accept-online-payments-wordpress-india', '<h2>Testing before you go live</h2>', '<p>Registered under GST? See <a href="/blog/woocommerce-gst-invoices-india/">WooCommerce GST setup and invoices</a>.</p>\n\n'],
  ['regain-website-access-old-developer', '<h2>Prevent it happening again</h2>', '<p>Use this <a href="/blog/website-ownership-checklist/">website ownership checklist</a> once you have access back.</p>\n\n'],
  ['clinic-website-checklist-for-doctors', '<h2>Next step</h2>', '<p>Related guides: websites for <a href="/blog/website-for-nutritionists-dietitians/">nutritionists and dietitians</a> and <a href="/blog/website-for-psychologists-counsellors/">psychologists and counsellors</a>.</p>\n\n'],
  ['website-for-gyms-fitness-studios', '<h2>Local SEO</h2>', '<p>Offering diet plans too? See <a href="/blog/website-for-nutritionists-dietitians/">websites for nutritionists</a>.</p>\n\n'],
  // Round 28
  ['update-wordpress-safely', '<h2>Automatic updates: yes or no?</h2>', '<p>Don\'t forget the server side: <a href="/blog/update-php-version-wordpress/">update your PHP version safely</a>.</p>\n\n'],
  ['wordpress-maintenance-checklist', '<h2>Yearly</h2>', '<p>Detailed guides: <a href="/blog/wordpress-database-optimization/">database optimisation</a> and <a href="/blog/update-php-version-wordpress/">updating PHP</a>.</p>\n\n'],
  ['website-brief-template', '<h2>Send it and compare</h2>', '<p>Once you choose a developer, agree the details in writing; see the <a href="/blog/website-design-contract-checklist/">website contract checklist</a>.</p>\n\n'],
  ['stop-contact-form-spam', '<h2>Test after changes</h2>', '<p>Choosing a form plugin? See <a href="/blog/wordpress-form-plugins-compared/">WordPress form plugins compared</a>.</p>\n\n'],
  ['portfolio-website-freelancers-creatives', '<h2>Get found</h2>', '<p>Photographers: see the full guide to <a href="/blog/website-for-photographers/">websites for photographers</a>.</p>\n\n'],
  ['personal-brand-website-professionals', '<h2>Design tips</h2>', '<p>Consultants in traditional fields: see <a href="/blog/website-for-astrologers-vastu-consultants/">websites for astrologers and vastu consultants</a>.</p>\n\n'],
  // Round 29
  ['website-for-lawyers-and-chartered-accountants', '<h2>Design tips</h2>', '<p>Coaches and independent consultants: see <a href="/blog/website-for-coaches-consultants/">websites for coaches</a>.</p>\n\n'],
  ['b2b-manufacturer-website-guide', '<h2>Get found by international buyers</h2>', '<p>Selling through dealers? See <a href="/blog/website-for-wholesalers-distributors/">websites for wholesalers and distributors</a>.</p>\n\n'],
  ['school-coaching-website-what-parents-look-for', '<h2>Next step</h2>', '<p>Running a college? See <a href="/blog/website-for-colleges-universities/">websites for colleges and universities</a>.</p>\n\n'],
  ['website-for-hospitals', '<h2>SEO</h2>', '<p>Offering home care after discharge? See <a href="/blog/website-for-elder-care-home-nursing/">websites for elder care and home nursing</a>.</p>\n\n'],
  ['website-for-bakeries-cake-shops', '<h2>Local SEO</h2>', '<p>Selling mithai too? See <a href="/blog/website-for-sweet-shops-mithai/">websites for sweet shops</a>.</p>\n\n'],
  ['whatsapp-on-business-website', '<h2>Where it works especially well</h2>', '<p>Wondering about chatbots instead? Read <a href="/blog/website-chatbot-worth-it/">do you need a chatbot?</a></p>\n\n'],
  // Round 30
  ['on-page-seo-checklist', '<h2>Plan the page</h2>', '<p>Before you optimise, choose the right target: see <a href="/blog/keyword-research-small-business/">keyword research</a> and <a href="/blog/search-intent-explained/">search intent</a>.</p>\n\n'],
  ['how-long-does-seo-take', '<h2>What speeds SEO up</h2>', '<p>Start with realistic targets: <a href="/blog/search-intent-explained/">match search intent</a> and pick specific keywords.</p>\n\n'],
  ['website-traffic-dropped', '<h2>Step 6: Is it seasonal or market-wide?</h2>', '<p>More detail: <a href="/blog/google-algorithm-updates-small-business/">what to do after a Google update</a>.</p>\n\n'],
  ['add-blog-to-existing-website', '<h2>Plan content you can sustain</h2>', '<p>Step-by-step: <a href="/blog/write-blog-posts-that-rank/">how to write blog posts that rank</a>.</p>\n\n'],
  ['website-content-calendar', '<h2>Measure</h2>', '<p>Detailed process: <a href="/blog/update-old-blog-posts/">how to update old blog posts</a>.</p>\n\n'],
  ['internal-linking-explained', '<h2>How this site does it</h2>', '<p>Take it further with <a href="/blog/topic-clusters-pillar-pages/">topic clusters and pillar pages</a>.</p>\n\n'],
  // Round 31
  ['woocommerce-store-launch-checklist', '<h2>Emails and notifications</h2>', '<p>Writing your returns policy? See <a href="/blog/woocommerce-returns-refunds-policy/">returns and refunds for WooCommerce</a>.</p>\n\n'],
  ['write-product-descriptions-that-sell', '<h2>Scaling across many products</h2>', '<p>Selling sizes and colours? See <a href="/blog/woocommerce-product-variations/">WooCommerce product variations</a>.</p>\n\n'],
  ['woocommerce-vs-shopify-india', '<h2>Real costs over the first year</h2>', '<p>Still deciding whether to sell on your own site at all? Read <a href="/blog/own-website-vs-marketplaces/">own website vs marketplaces</a>.</p>\n\n'],
  ['woocommerce-seo-guide', '<h2>Quick checklist</h2>', '<p>Also get products into Google Shopping for free: <a href="/blog/google-merchant-center-woocommerce/">Merchant Center for WooCommerce</a>.</p>\n\n'],
  ['woocommerce-abandoned-cart-recovery', '<h2>Measure it</h2>', '<p>Using discounts to recover carts? See <a href="/blog/woocommerce-coupons-discounts/">coupon strategies that protect margins</a>.</p>\n\n'],
  ['woocommerce-product-page-optimization', '<h2>Make buying effortless</h2>', '<p>Accurate stock status matters too; see <a href="/blog/woocommerce-inventory-management/">inventory management</a>.</p>\n\n'],
  // Round 32
  ['uptime-monitoring-explained', '<h2>Uptime vs other monitoring</h2>', '<p>Full checklist: <a href="/blog/website-down-what-to-do/">website down? what to check, step by step</a>.</p>\n\n'],
  ['choose-domain-name-business', '<h2>After registering</h2>', '<p>If a renewal is ever missed, see <a href="/blog/domain-expired-what-to-do/">what to do when a domain expires</a>.</p>\n\n'],
  ['website-ownership-checklist', '<h2>2. DNS</h2>', '<p>Domain stuck in someone else\'s account? See <a href="/blog/transfer-domain-to-another-registrar/">how to transfer a domain safely</a>.</p>\n\n'],
  ['signs-wordpress-site-hacked', '<h2>How to prevent it happening again</h2>', '<p>Seeing a red browser warning? See <a href="/blog/deceptive-site-ahead-warning-fix/">how to fix "Deceptive site ahead"</a>.</p>\n\n'],
  ['wordpress-security-checklist', '<h2>Backups</h2>', '<p>More detail: <a href="/blog/secure-wordpress-login/">how to secure your WordPress login</a>.</p>\n\n'],
  ['essential-wordpress-plugins-business', '<h2>How many plugins is too many?</h2>', '<p>Dashboard feeling sluggish? See <a href="/blog/wordpress-admin-slow/">why the WordPress admin gets slow</a>.</p>\n\n'],
];

let src = fs.readFileSync(FILE, 'utf8');
let added = 0, skipped = 0;
for (const [slug, anchor, insert] of LINKS) {
  const start = src.indexOf(`slug: '${slug}',`);
  if (start < 0) throw new Error(`Post not found: ${slug}`);
  const bodyStart = src.indexOf('body: `', start);
  const bodyEnd = src.indexOf('`,\n  },', bodyStart);
  let body = src.slice(bodyStart, bodyEnd);
  const target = (insert.match(/href="(\/blog\/[^"]+)"/) || [])[1];
  if (target && body.includes(`href="${target}"`)) { skipped++; continue; }
  const count = body.split(anchor).length - 1;
  if (count !== 1) throw new Error(`Anchor found ${count} times in ${slug}: ${anchor}`);
  body = body.replace(anchor, insert + anchor);
  src = src.slice(0, bodyStart) + body + src.slice(bodyEnd);
  added++;
}
fs.writeFileSync(FILE, src);
console.log(`contextual links added: ${added}, already present: ${skipped}`);
