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
  ['google-business-profile-checklist', '<h2>Posts, Q&amp;A and responding quickly</h2>', '<p>For templates and what to avoid, read <a href="/blog/get-more-google-reviews/">how to get more Google reviews ethically</a>.</p>\n\n'],
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
  // Round 33
  ['wordpress-website-cost-india', '<h2>The bottom line</h2>', '<p>Got several quotes? See <a href="/blog/compare-website-quotes/">how to compare website quotes</a>.</p>\n\n'],
  ['white-label-wordpress-development-agencies', '<h2>How to choose a white-label partner</h2>', '<p>More on pricing models: <a href="/blog/fixed-price-vs-hourly-website-projects/">fixed price vs hourly</a>.</p>\n\n'],
  ['how-long-to-build-wordpress-website', '<h2>Can it be done faster?</h2>', '<p>Slow or scattered feedback is a common cause of delays; see <a href="/blog/give-website-feedback-developer/">how to give clear website feedback</a>.</p>\n\n'],
  ['website-design-contract-checklist', '<h2>10. Confidentiality</h2>', '<p>More on this: <a href="/blog/website-bug-vs-change-request/">bug or change request?</a></p>\n\n'],
  ['freelancer-vs-agency-web-developer', '<h2>The bottom line</h2>', '<p>Hiring from outside India? See <a href="/blog/outsource-wordpress-development-india/">outsourcing WordPress development to India</a>.</p>\n\n'],
  ['hire-developer-vs-diy-website', '<h2>If you hire, choose well</h2>', '<p>Not sure what you\'d be paying for? See <a href="/blog/what-does-wordpress-developer-do/">what a WordPress developer does</a> and <a href="/blog/web-designer-vs-web-developer/">designer vs developer</a>.</p>\n\n'],
  ['figma-to-wordpress-designer-guide', '<h2>Quick handoff checklist</h2>', '<p>Who does what in a project? See <a href="/blog/web-designer-vs-web-developer/">web designer vs web developer</a>.</p>\n\n'],
  // Round 34
  ['elementor-vs-gutenberg', '<h2>My recommendation</h2>', '<p>Going with Elementor? See <a href="/blog/elementor-pro-worth-it/">is Elementor Pro worth it?</a></p>\n\n'],
  ['how-to-choose-wordpress-theme', '<h2>Mistakes to avoid</h2>', '<p>Building with Elementor? See <a href="/blog/best-theme-for-elementor/">the best themes for Elementor</a>.</p>\n\n'],
  ['why-elementor-sites-slow', '<h2>Should you switch away from Elementor?</h2>', '<p>Your theme matters too; see <a href="/blog/best-theme-for-elementor/">choosing a lightweight theme for Elementor</a>.</p>\n\n'],
  ['figma-to-wordpress-designer-guide', '<h2>8. Agree on scope</h2>', '<p>How will it be built? Compare <a href="/blog/figma-to-wordpress-approaches/">page builder, block theme and custom theme approaches</a>.</p>\n\n'],
  ['startup-website-checklist', '<h2>Build for iteration</h2>', '<p>Building a software product? See <a href="/blog/website-for-saas-startups/">websites for SaaS startups</a>.</p>\n\n'],
  ['restaurant-website-online-ordering', '<h2>Get found by hungry locals</h2>', '<p>More guides: <a href="/blog/restaurant-menu-on-website/">putting your menu online</a> and <a href="/blog/website-for-cloud-kitchens/">websites for cloud kitchens</a>.</p>\n\n'],
  ['real-estate-website-must-have-features', '<h2>Performance and marketing</h2>', '<p>Launching a new project? See <a href="/blog/real-estate-project-microsite/">real estate project microsites</a>.</p>\n\n'],
  // Round 35
  ['hotel-website-direct-bookings', '<h2>SEO for hotels and homestays</h2>', '<p>More detail: <a href="/blog/hotel-booking-engine-channel-manager/">booking engines and channel managers explained</a> and <a href="/blog/website-for-homestays-bnbs/">websites for homestays</a>.</p>\n\n'],
  ['temple-ngo-website-online-donations', '<h2>Build trust and transparency</h2>', '<p>Handling tax receipts? See <a href="/blog/ngo-website-donations-80g/">online donations, 80G receipts and FCRA</a>.</p>\n\n'],
  ['solar-company-website-guide', '<h2>Get found locally</h2>', '<p>More tactics: <a href="/blog/solar-company-lead-generation/">solar lead generation</a>.</p>\n\n'],
  ['website-for-lawyers-and-chartered-accountants', '<h2>Local SEO for professionals</h2>', '<p>Advocates: see <a href="/blog/website-for-advocates-bar-council-rules/">what the Bar Council rules allow</a>.</p>\n\n'],
  ['website-for-hostels-pg-accommodation', '<h2>Local SEO</h2>', '<p>Running a homestay instead? See <a href="/blog/website-for-homestays-bnbs/">websites for homestays and B&amp;Bs</a>.</p>\n\n'],
  ['website-for-salons-spas', '<h2>Design tips</h2>', '<p>Setting up bookings? See <a href="/blog/online-appointment-booking-website/">online appointment booking</a>.</p>\n\n'],
  // Round 36
  ['signs-wordpress-site-hacked', '<h2>What to do if your site is hacked</h2>', '<p>The full clean-up process: <a href="/blog/remove-malware-wordpress-step-by-step/">how to remove WordPress malware step by step</a>.</p>\n\n'],
  ['signs-wordpress-site-hacked', '<h2>Need it fixed fast?</h2>', '<p>Specific hacks: <a href="/blog/fix-wordpress-redirect-hack/">spam redirects</a>, <a href="/blog/fix-japanese-keyword-seo-spam-hack/">Japanese keyword and pharma spam</a> and <a href="/blog/wordpress-site-sending-spam-emails/">sites sending spam emails</a>.</p>\n\n'],
  ['deceptive-site-ahead-warning-fix', '<h2>Step 3: Close the hole</h2>', '<p>Don\'t miss hidden access points; see <a href="/blog/find-remove-wordpress-backdoors/">finding and removing backdoors</a>.</p>\n\n'],
  ['common-wordpress-errors-fixes', '<h2>Golden rules when something breaks</h2>', '<p>Warnings caused by a hack? See <a href="/blog/remove-malware-wordpress-step-by-step/">removing WordPress malware step by step</a>.</p>\n\n'],
  ['business-email-deliverability-spf-dkim-dmarc', '<h2>Be careful when changing DNS</h2>', '<p>Getting bounces for emails you never sent? See <a href="/blog/wordpress-site-sending-spam-emails/">website sending spam emails</a>.</p>\n\n'],
  ['accept-online-payments-wordpress-india', '<h2>Getting it set up</h2>', '<p>Protect your checkout from card skimmers: see <a href="/blog/woocommerce-checkout-skimmer-malware/">WooCommerce skimming malware</a>.</p>\n\n'],
  ['website-traffic-dropped', '<h2>What not to do</h2>', '<p>Seeing strange Japanese or pharma pages in Search Console? See <a href="/blog/fix-japanese-keyword-seo-spam-hack/">fixing SEO spam hacks</a>.</p>\n\n'],
  // Round 37: case study links
  ['website-for-dentists', '<h2>Local SEO for dentists</h2>', '<p><strong>Real example:</strong> the <a href="/work/dr-sunaina-dental-care/">Dr. Sunaina Dental Care case study</a> shows a dental clinic site in Agra with a treatments page, patient testimonials, FAQs on pain and booking, an appointment page and one-tap WhatsApp.</p>\n\n'],
  ['clinic-website-checklist-for-doctors', '<h2>Common mistakes to avoid</h2>', '<p>See these ideas on live clinic sites: <a href="/work/dr-sunaina-dental-care/">Dr. Sunaina Dental Care</a> and <a href="/work/dr-sudhir-arora/">Dr. Sudhir Arora</a>.</p>\n\n'],
  ['website-for-interior-designers-architects', '<h2>Explain your services and process</h2>', '<p><strong>Real example:</strong> the <a href="/work/studio-agama-interiors/">Studio Agama Interiors case study</a> shows a Hyderabad interior studio site with a filterable project gallery, detailed services, a design partner page and free quote calls to action throughout.</p>\n\n'],
  ['elementor-pro-worth-it', '<h2>Licences: buy in your name</h2>', '<p>For a real Elementor Pro build, see the <a href="/work/studio-agama-interiors/">Studio Agama Interiors case study</a>.</p>\n\n'],
  // Round 38
  ['remove-malware-wordpress-step-by-step', '<h2>Want it done for you?</h2>', '<p>Afterwards, see <a href="/blog/recover-rankings-after-hack/">how to recover Google rankings after a hack</a>.</p>\n\n'],
  ['wordpress-security-checklist', '<h2>Hosting and server</h2>', '<p>Server-side hardening: <a href="/blog/wordpress-file-permissions/">file permissions</a> and <a href="/blog/harden-wp-config-php/">wp-config.php settings</a>.</p>\n\n'],
  ['website-down-what-to-do', '<h2>Step 5: Think about recent changes</h2>', '<p>Suspended for malware? See <a href="/blog/hosting-suspended-malware/">what to do when your hosting is suspended</a>.</p>\n\n'],
  ['deceptive-site-ahead-warning-fix', '<h2>Step 5: Check other blocklists</h2>', '<p>Seeing a label in search results instead? See <a href="/blog/this-site-may-be-hacked-google/">removing "This site may be hacked"</a>.</p>\n\n'],
  ['why-wordpress-sites-get-hacked', '<h2>It\'s rarely personal</h2>', '<p>Choosing protection? See <a href="/blog/wordpress-firewall-waf-explained/">WordPress firewalls explained</a>.</p>\n\n'],
  // Round 39: new case studies
  ['restaurant-website-online-ordering', '<h2>Common mistakes</h2>', '<p><strong>Real example:</strong> the <a href="/work/southern-flavours/">Southern Flavours case study</a> shows an Indian restaurant site in the UK with table reservations, a menu, a weekend breakfast buffet feature and WooCommerce ordering.</p>\n\n'],
  ['outsource-wordpress-development-india', '<h2>Freelancer or agency?</h2>', '<p><strong>Real example:</strong> I built the website for <a href="/work/southern-flavours/">Southern Flavours</a>, a restaurant in Solihull, UK, working remotely from India.</p>\n\n'],
  ['website-for-hospitals', '<h2>Appointments</h2>', '<p><strong>Real example:</strong> the <a href="/work/dr-nitish-gupta-pulmonologist/">Dr. Nitish Gupta case study</a> shows a specialist\'s site with a detailed doctor profile, services and diagnostics explained in plain language, and appointment booking.</p>\n\n'],
  // Round 40: hosting and maintenance
  ['choose-wordpress-hosting-india', '<h2>How much should you spend?</h2>', '<p>Using Hostinger? See <a href="/blog/hostinger-wordpress-setup-guide/">setting up WordPress on Hostinger</a> and <a href="/blog/hostinger-website-slow-fix/">speeding up a Hostinger site</a>.</p>\n\n'],
  ['choose-wordpress-hosting-india', '<h2>Warning signs of bad hosting</h2>', '<p>Check renewal prices before you buy; see <a href="/blog/hosting-renewal-price-increase/">why hosting renewals cost more</a>.</p>\n\n'],
  ['website-maintenance-cost-india', '<h2>What usually costs extra</h2>', '<p>Full breakdown: <a href="/blog/monthly-website-maintenance-plan/">what a monthly maintenance plan should include</a>.</p>\n\n'],
  ['domain-hosting-ssl-explained', '<h2>Checklist</h2>', '<p>Keep track of every renewal with the <a href="/blog/domain-hosting-renewal-checklist/">domain and hosting renewal checklist</a>.</p>\n\n'],
  ['business-email-options', '<h2>Website form emails</h2>', '<p>Hosting on Hostinger? See <a href="/blog/hostinger-business-email-setup/">setting up business email on Hostinger</a>.</p>\n\n'],
  ['why-is-my-wordpress-site-slow', '<h2>When to get help</h2>', '<p>On Hostinger? See <a href="/blog/hostinger-website-slow-fix/">Hostinger-specific speed fixes</a>. Moving hosts? See <a href="/blog/migrate-website-to-hostinger/">migrating to Hostinger</a>.</p>\n\n'],
  // Round 41: WordPress issues, Elementor and themes
  ['common-wordpress-errors-fixes', '<h2>White screen (blank page)</h2>', '<p>Step-by-step guide: <a href="/blog/fix-wordpress-critical-error/">how to fix "There has been a critical error"</a>.</p>\n\n'],
  ['update-wordpress-safely', '<h2>If something breaks</h2>', '<p>Specific fixes: <a href="/blog/fix-wordpress-critical-error/">the critical error</a> and <a href="/blog/elementor-layout-broken-after-update/">Elementor layouts broken after an update</a>.</p>\n\n'],
  ['why-elementor-sites-slow', '<h2>Measure before and after</h2>', '<p>Editor not loading at all? See <a href="/blog/elementor-not-loading-fix/">Elementor stuck on loading</a>.</p>\n\n'],
  ['wordpress-caching-explained', '<h2>Caching won\'t fix everything</h2>', '<p>Edits not appearing? See <a href="/blog/wordpress-changes-not-showing/">WordPress changes not showing</a>.</p>\n\n'],
  ['hire-developer-vs-diy-website', '<h2>A middle path</h2>', '<p>Want to handle updates yourself? See <a href="/blog/edit-website-content-wordpress/">how to edit your WordPress content</a>.</p>\n\n'],
  ['how-to-choose-wordpress-theme', '<h2>Popular choices for business sites</h2>', '<p>Considering a premium theme? Read <a href="/blog/premium-wordpress-themes-guide/">what to know before buying</a>.</p>\n\n'],
  ['nulled-themes-plugins-risks', '<h2>Licences are cheaper than clean-ups</h2>', '<p>Already have a genuine premium theme? See <a href="/blog/update-premium-theme-safely/">how to update it safely</a>.</p>\n\n'],
  // Round 42: theme and plugin development
  ['how-to-choose-wordpress-theme', '<h2>The simple rule</h2>', '<p>Need something no theme offers? See <a href="/blog/custom-wordpress-theme-development/">custom WordPress theme development</a>.</p>\n\n'],
  ['wordpress-vs-custom-coded-website', '<h2>Common myths</h2>', '<p>The middle ground: WordPress with a <a href="/blog/custom-wordpress-theme-development/">custom theme</a> and <a href="/blog/custom-wordpress-plugin-development/">custom plugins</a>.</p>\n\n'],
  ['essential-wordpress-plugins-business', '<h2>Plugins and habits to avoid</h2>', '<p>Not sure whether to add a plugin at all? See <a href="/blog/plugin-vs-custom-code-wordpress/">plugin vs custom code</a>.</p>\n\n'],
  ['figma-to-wordpress-approaches', '<h2>Option 3: Custom classic theme</h2>', '<p>More on this approach: <a href="/blog/block-themes-full-site-editing/">block themes explained</a> and <a href="/blog/custom-gutenberg-blocks/">custom Gutenberg blocks</a>.</p>\n\n'],
  ['update-premium-theme-safely', '<h2>Step 3: Back up and use staging</h2>', '<p>New to child themes? See <a href="/blog/wordpress-child-theme-explained/">child themes explained</a>.</p>\n\n'],
  ['directory-website-wordpress', '<h2>Real example</h2>', '<p>The foundations: <a href="/blog/custom-post-types-fields/">custom post types and fields</a>.</p>\n\n'],
  ['what-does-wordpress-developer-do', '<h2>Online stores</h2>', '<p>More detail: <a href="/blog/custom-wordpress-plugin-development/">custom plugin development</a> and <a href="/blog/custom-wordpress-theme-development/">custom theme development</a>.</p>\n\n'],
  // Agent 02
  ['website-for-homestays-bnbs', '<h2>Direct booking options</h2>', '<p>Hosting guests on a working farm, with day visits and school trips as well as stays? See <a href="/blog/website-for-farm-stays-agritourism/">websites for farm stays and agritourism</a>.</p>\n\n'],
  ['website-for-interior-designers-architects', '<h2>Make enquiring easy</h2>', '<p>If you design outdoor spaces such as terraces, lawns and society gardens, see <a href="/blog/website-for-landscaping-gardening-services/">websites for landscaping and gardening services</a>.</p>\n\n'],
  ['website-for-home-services', '<h2>Local SEO is everything</h2>', '<p>Brand names need extra care for water purifier businesses, where fake helpline numbers are common; see <a href="/blog/website-for-water-purifier-ro-service/">websites for water purifier and RO service businesses</a>.</p>\n\n'],
  // Agent 04
  ['website-for-furniture-businesses', '<h2>B2B buyers</h2>', '<p>Selling fitted kitchens and wardrobes rather than loose furniture? See <a href="/blog/website-for-modular-kitchen-companies/">websites for modular kitchen and wardrobe companies</a>.</p>\n\n'],
  ['website-for-hardware-building-materials', '<h2>Online catalogue or store?</h2>', '<p>Fabricate and install windows, doors or glass work rather than supplying materials? See <a href="/blog/website-for-glass-aluminium-fabricators/">websites for glass, aluminium and uPVC fabricators</a>.</p>\n\n'],
  ['b2b-manufacturer-website-guide', '<h2>Make enquiring effortless</h2>', '<p>Run a fabrication shop that works to customers\' drawings? See <a href="/blog/website-for-steel-fabrication-companies/">websites for steel and metal fabrication companies</a>.</p>\n\n'],
  // Agent 03
  ['website-for-construction-companies', '<h2>Performance with lots of photos</h2>', '<p>Specialist finishing trades need a slightly different approach; see <a href="/blog/website-for-painting-contractors/">websites for painting contractors</a>.</p>\n\n'],
  ['website-for-construction-companies', '<h2>Show projects properly</h2>', '<p>If you specialise in fixing leaks and dampness rather than building, see <a href="/blog/website-for-waterproofing-companies/">websites for waterproofing companies</a>.</p>\n\n'],
  ['website-for-home-services', '<h2>Local SEO is everything</h2>', '<p>If AC repair, installation and maintenance contracts are your main business, see the more detailed guide to <a href="/blog/website-for-ac-repair-services/">websites for AC repair services</a>.</p>\n\n'],
  // Agent 05
  ['website-for-security-facility-management', '<h2>Build trust</h2>', '<p>If your business installs CCTV, access control and alarm systems rather than providing guards, see <a href="/blog/website-for-cctv-security-installers/">websites for CCTV and security system installers</a>.</p>\n\n'],
  ['website-for-it-software-companies', '<h2>Essential pages</h2>', '<p>If your business sells and installs computers, laptops and networking hardware rather than software, see <a href="/blog/website-for-it-hardware-computer-dealers/">websites for computer, laptop and IT hardware dealers</a>.</p>\n\n'],
  ['website-for-printing-packaging-companies', '<h2>SEO for printing and packaging</h2>', '<p>If you make shop boards, LED letters and other signage rather than printed products and packaging, see <a href="/blog/website-for-signage-companies/">websites for signage and LED board companies</a>.</p>\n\n'],
  // Agent 10
  ['website-for-property-management-companies', '<h2>Trust</h2>', '<p>Running an entire residential complex rather than individual flats? See <a href="/blog/website-for-housing-societies-rwas/">websites for housing societies and RWAs</a>.</p>\n\n'],
  ['website-for-chemical-pharma-manufacturers', '<h2>SEO</h2>', '<p>Marketing finished formulations through distributors and franchise partners instead? See <a href="/blog/website-for-pharma-franchise-companies/">websites for PCD pharma franchise companies</a>.</p>\n\n'],
  ['website-for-gyms-fitness-studios', '<h2>Essential pages and features</h2>', '<p>Running a dedicated yoga studio or teaching yoga independently? See <a href="/blog/website-for-yoga-studios-teachers/">websites for yoga studios and teachers</a>.</p>\n\n'],
  // Agent 20
  ['wordpress-maintenance-checklist', '<h2>Golden rules</h2>', '<p>Running an online store? Add store-specific tasks like test orders and payment checks from the <a href="/blog/woocommerce-maintenance-checklist/">WooCommerce maintenance checklist</a>.</p>\n\n'],
  ['wordpress-caching-explained', '<h2>Clearing the cache</h2>', '<p>Running an online store? The <a href="/blog/woocommerce-speed-optimization/">WooCommerce speed optimisation guide</a> covers cart fragments, object caching and other store-specific fixes.</p>\n\n'],
  ['woocommerce-checkout-skimmer-malware', '<h2>Ongoing protection</h2>', '<p>For the wider picture, including staff accounts, card-testing bots and fraud orders, work through the <a href="/blog/woocommerce-security-checklist/">WooCommerce security checklist</a>.</p>\n\n'],
  // Agent 06
  ['website-for-car-dealers-workshops', '<h2>Make it easy on mobile</h2>', '<p>Run a dedicated wash, detailing or coating studio rather than a full workshop? See <a href="/blog/website-for-car-wash-detailing/">websites for car wash, detailing and ceramic coating studios</a>.</p>\n\n'],
  ['website-for-veterinary-pet-clinics', '<h2>Pet owner guides</h2>', '<p>If grooming, boarding or a pet supplies shop is your main business rather than a clinic, see <a href="/blog/website-for-pet-shops-grooming/">websites for pet shops, grooming and boarding services</a>.</p>\n\n'],
  ['website-for-florists-gift-shops', '<h2>Checkout essentials</h2>', '<p>Selling toys and games as gifts for children? Age filters and safety information matter too; see <a href="/blog/website-for-toy-stores/">websites for toy stores and kids\' brands</a>.</p>\n\n'],
  // Agent 01
  ['website-for-d2c-food-brands', '<h2>SEO for food brands</h2>', '<p>The same repeat-order ideas work for skincare, haircare and makeup, where ingredient lists and careful claims matter even more; see <a href="/blog/website-for-beauty-cosmetics-brands/">websites for beauty and cosmetics brands</a>.</p>\n\n'],
  ['website-for-salons-spas', '<h2>Common mistakes</h2>', '<p>Work as a freelance or bridal makeup artist who travels to clients? See <a href="/blog/website-for-makeup-artists/">websites for makeup artists</a> for portfolios, packages and date bookings.</p>\n\n'],
  ['online-appointment-booking-website', '<h2>Reduce no-shows</h2>', '<p>Businesses that need a consultation before a booking, such as tattoo studios, can pair an enquiry form with a deposit; see <a href="/blog/website-for-tattoo-studios/">websites for tattoo studios</a>.</p>\n\n'],
  // Agent 07
  ['video-on-business-website', '<h2>Make videos effective</h2>', '<p>If video is your product rather than a marketing extra, see <a href="/blog/website-for-video-production-companies/">websites for video production companies</a>.</p>\n\n'],
  ['website-for-event-rental-businesses', '<h2>Show your work</h2>', '<p>Performers face the same date and package questions; see <a href="/blog/website-for-djs-live-bands/">websites for wedding DJs and live bands</a>.</p>\n\n'],
  ['website-for-handicraft-artisan-brands', '<h2>Wholesale and B2B</h2>', '<p>Selling original paintings, limited-edition prints or commissions instead? See <a href="/blog/website-for-artists-art-galleries/">websites for artists and art galleries</a>.</p>\n\n'],
  // Agent 08
  ['website-for-authors-content-creators', '<h2>For YouTubers and podcasters</h2>', '<p>Running a publishing house or independent press rather than promoting your own books? See <a href="/blog/website-for-book-publishers/">websites for book publishers</a>.</p>\n\n'],
  ['website-for-florists-gift-shops', '<h2>Festival campaigns</h2>', '<p>If corporate orders are your main business rather than a sideline, see <a href="/blog/website-for-corporate-gifting-companies/">websites for corporate gifting companies</a>.</p>\n\n'],
  ['website-for-furniture-businesses', '<h2>Product pages that sell furniture</h2>', '<p>Selling cushions, curtains, rugs and lighting rather than furniture? See <a href="/blog/website-for-home-decor-stores/">websites for home decor and furnishing stores</a>.</p>\n\n'],
  // Agent 09
  ['website-for-coaches-consultants', '<h2>Keep claims honest</h2>', '<p>If you mainly sell workshops and programmes to companies rather than one-to-one coaching, see <a href="/blog/website-for-corporate-training-companies/">websites for corporate training companies</a>.</p>\n\n'],
  ['school-coaching-website-what-parents-look-for', '<h2>Keep it updated</h2>', '<p>Teaching coding, data or other IT skills to college students and working professionals? See <a href="/blog/website-for-software-training-institutes/">websites for software training institutes</a>.</p>\n\n'],
  ['website-for-overseas-education-consultants', '<h2>Counsellors</h2>', '<p>If you run IELTS, PTE or spoken English classes as a separate institute, see <a href="/blog/website-for-ielts-spoken-english-institutes/">websites for IELTS and spoken English institutes</a>.</p>\n\n'],
  // Agent 11
  ['faq-page-seo', '<h2>Keep them up to date</h2>', '<p>Clear question-and-answer formatting can also earn a place in Google\'s answer boxes; see <a href="/blog/featured-snippets-how-to-win/">how to win featured snippets and People Also Ask</a>.</p>\n\n'],
  ['keyword-research-small-business', '<h2>Map keywords to pages</h2>', '<p>To find and use these longer, more specific phrases, see <a href="/blog/long-tail-keywords-explained/">long-tail keywords explained</a>.</p>\n\n'],
  ['301-vs-302-redirects', '<h2>Common mistakes</h2>', '<p>Changing a page slug or your WordPress permalink settings also needs redirects; see <a href="/blog/seo-friendly-urls/">SEO-friendly URLs in WordPress</a>.</p>\n\n'],
  // Agent 12
  ['image-optimization-wordpress', '<h2>Special cases</h2>', '<p>Alt text and file names are only part of getting your photos found in search; see the <a href="/blog/image-seo-guide/">image SEO guide</a> for Google Images and Google Lens.</p>\n\n'],
  ['faq-page-seo', '<h2>Where to put FAQs</h2>', '<p>Answer-first writing also suits people who ask their phones questions out loud; see <a href="/blog/voice-search-local-seo/">voice search for local businesses</a>.</p>\n\n'],
  ['google-business-profile-checklist', '<h2>Connect it to your website</h2>', '<p>For post ideas, offers, events and a simple weekly routine, see <a href="/blog/google-business-profile-posts/">how to use Google Business Profile posts and photos</a>.</p>\n\n'],
  // Agent 13
  ['google-algorithm-updates-small-business', '<h2>How to recover</h2>', '<p>These questions sum up what Google calls E-E-A-T; see <a href="/blog/eeat-explained-small-business/">E-E-A-T explained for small business websites</a> for practical ways to show it.</p>\n\n'],
  ['get-more-enquiries-from-your-website', '<h2>Guide visitors to act</h2>', '<p>Reviews and photos are only part of the picture. For contact details, credentials, policies and security too, work through the <a href="/blog/website-trust-signals-checklist/">website trust signals checklist</a>.</p>\n\n'],
  ['ethical-link-building-small-business', '<h2>Be patient and consistent</h2>', '<p>If links like these were built for your site in the past, see <a href="/blog/backlink-audit-disavow/">how to audit your backlinks and when to use the disavow tool</a>.</p>\n\n'],
  // Agent 14
  ['keyword-research-small-business', '<h2>Understand search intent</h2>', '<p>For a step-by-step method that also covers Business Profiles, ranking pages and links, see <a href="/blog/competitor-seo-analysis/">how to analyse your competitors\' SEO</a>.</p>\n\n'],
  ['website-for-home-services', '<h2>Pricing guidance</h2>', '<p>Working from home or a van rather than a shop? See <a href="/blog/service-area-business-seo/">SEO for service-area businesses</a> for the right Business Profile settings and when area pages are worth building.</p>\n\n'],
  ['local-landing-pages-without-doorway-pages', '<h2>What makes a location page genuinely useful</h2>', '<p>If your business has several branches or clinics, see <a href="/blog/multi-location-business-website/">how to structure a multi-location business website</a>, including Business Profiles and schema for each branch.</p>\n\n'],
  // Agent 15
  ['google-search-console-reports-explained', '<h2>Sitemaps</h2>', '<p>For what each status means and which ones need fixing, see <a href="/blog/search-console-page-indexing-errors/">Search Console page indexing errors explained</a>.</p>\n\n'],
  ['website-navigation-structure', '<h2>Test it</h2>', '<p>Pages that no menu or other page links to become orphans; see <a href="/blog/orphan-pages-fix/">how to find and fix orphan pages</a>.</p>\n\n'],
  ['seo-red-flags-scams', '<h2>Questions to ask before hiring</h2>', '<p>Not sure what a useful monthly report should include? See <a href="/blog/seo-reporting-what-to-track/">what to track in a monthly SEO report</a>.</p>\n\n'],
  // Agent 16
  ['thank-you-pages-forms', '<h2>Tracking conversions</h2>', '<p>A promise like "within 24 hours" only helps if you keep it; see <a href="/blog/respond-to-website-enquiries-fast/">how to respond to website enquiries fast</a> for a simple routine.</p>\n\n'],
  ['wordpress-form-plugins-compared', '<h2>Email delivery matters more than the plugin</h2>', '<p>To send every entry on to a CRM, Google Sheet or email tool automatically, see <a href="/blog/connect-website-forms-to-crm/">connecting WordPress forms to a CRM or Google Sheets</a>.</p>\n\n'],
  ['landing-page-mistakes-google-ads', '<h2>7. No trust signals</h2>', '<p>If you do need more detail before calling, a short multi-step form can collect it without a wall of fields; see <a href="/blog/multi-step-forms-lead-qualification/">multi-step forms for lead qualification</a>.</p>\n\n'],
  // Agent 17
  ['whatsapp-on-business-website', '<h2>Best practices</h2>', '<p>These same features can also help you win repeat business from past customers; see <a href="/blog/whatsapp-marketing-small-business/">WhatsApp marketing for small businesses</a>.</p>\n\n'],
  ['conversion-rate-optimization-basics', '<h2>Quick wins that usually work</h2>', '<p>Pop-ups are a common thing to test; see <a href="/blog/exit-intent-popups/">when exit-intent pop-ups help and when they hurt</a> before adding one.</p>\n\n'],
  ['collect-display-customer-testimonials', '<h2>Permissions and honesty</h2>', '<p>Your Google reviews can sit alongside testimonials in these places too; see <a href="/blog/google-reviews-on-website/">how to show Google reviews on your website</a>.</p>\n\n'],
  // Agent 21
  ['accept-online-payments-wordpress-india', '<h2>Ways to take payments on WordPress</h2>', '<p>Still deciding between providers? See <a href="/blog/payment-gateways-india-compared/">how to choose a payment gateway in India</a> for what to compare, from settlement times to KYC and WooCommerce support.</p>\n\n'],
  ['website-for-d2c-food-brands', '<h2>Content that sells</h2>', '<p>Planning subscribe-and-save for staples? See <a href="/blog/woocommerce-subscriptions/">selling subscriptions with WooCommerce</a> for how recurring plans and payments work in India.</p>\n\n'],
  ['website-for-home-tutors-online-teachers', '<h2>Get found</h2>', '<p>When you\'re ready to sell notes, recorded courses or test series, see <a href="/blog/sell-digital-products-wordpress/">how to sell digital products on WordPress</a>.</p>\n\n'],
  // Agent 18
  ['ga4-events-explained', '<h2>Reading the results</h2>', '<p>A tap on a phone number shows intent, not a conversation; see <a href="/blog/call-tracking-small-business/">call tracking for small businesses</a> for ways to measure real calls and WhatsApp chats.</p>\n\n'],
  ['website-ready-for-google-ads', '<h2>4. A clear call to action</h2>', '<p>For a step-by-step walkthrough, see <a href="/blog/google-ads-conversion-tracking-setup/">how to set up Google Ads conversion tracking on WordPress</a>.</p>\n\n'],
  ['landing-page-mistakes-google-ads', '<h2>10. Never testing anything</h2>', '<p>If you advertise on Facebook or Instagram, see <a href="/blog/meta-pixel-conversions-api/">the Meta Pixel and Conversions API explained</a>.</p>\n\n'],
  // Agent 22
  ['woocommerce-seo-guide', '<h2>6. Handle duplicate and thin pages</h2>', '<p>Those ratings should come from genuine customer reviews shown on the page; see <a href="/blog/woocommerce-product-reviews/">how to collect and display WooCommerce product reviews</a>.</p>\n\n'],
  ['woocommerce-store-launch-checklist', '<h2>Speed, mobile and SEO</h2>', '<p>For branding, content and inbox delivery in detail, see <a href="/blog/customize-woocommerce-emails/">how to customise WooCommerce order emails</a>.</p>\n\n'],
  ['own-website-vs-marketplaces', '<h2>Choosing a platform for your store</h2>', '<p>Thinking of running your own marketplace, with other sellers listing on your site? See <a href="/blog/woocommerce-multi-vendor-marketplace/">building a multi-vendor marketplace with WooCommerce</a>.</p>\n\n'],
  // Agent 24
  ['image-optimization-wordpress', '<h2>5. Set image dimensions</h2>', '<p>Lazy loading applies to videos and embeds too; see <a href="/blog/lazy-loading-explained/">lazy loading explained</a> for what to lazy-load and what to leave alone.</p>\n\n'],
  ['choose-website-colours-fonts', '<h2>Apply them as global styles</h2>', '<p>For the practical side, including weights, self-hosting, font-display and preloading, see <a href="/blog/web-fonts-performance/">how to load web fonts without slowing your site</a>.</p>\n\n'],
  ['website-chatbot-worth-it', '<h2>Answer questions on the page first</h2>', '<p>Chat widgets are only one kind of external code; see <a href="/blog/third-party-scripts-slow-website/">how third-party scripts slow your website</a> to audit trackers, embeds and the rest.</p>\n\n'],
  // Agent 19
  ['landing-page-vs-website', '<h2>When sending ads to your website makes sense</h2>', '<p>To find out which headline or offer really works better, rather than guessing, see <a href="/blog/landing-page-ab-testing/">A/B testing landing pages</a>.</p>\n\n'],
  ['conversion-rate-optimization-basics', '<h2>Step 3: Form hypotheses</h2>', '<p>For how to set these tools up, what to look for and which privacy settings to use, see <a href="/blog/website-heatmaps-session-recordings/">heatmaps and session recordings</a>.</p>\n\n'],
  ['woocommerce-coupons-discounts', '<h2>Watch out for</h2>', '<p>Coupons can also power a customer referral programme; see <a href="/blog/referral-program-website/">how to set up a referral programme on your website</a>.</p>\n\n'],
  // Agent 23
  ['core-web-vitals-explained', '<h2>How to improve INP (responsiveness)</h2>', '<p>For a step-by-step walkthrough, including how to find your LCP element and which part of it is slow, see <a href="/blog/fix-lcp-largest-contentful-paint/">how to fix slow Largest Contentful Paint</a>.</p>\n\n'],
  ['image-optimization-wordpress', '<h2>6. Serve responsive sizes</h2>', '<p>Missing dimensions are only one cause of jumping pages; fonts, ads, banners and sticky headers can shift content too. See <a href="/blog/fix-cls-layout-shift/">how to fix Cumulative Layout Shift</a>.</p>\n\n'],
  ['website-speed-indian-mobile-networks', '<h2>Serve it fast</h2>', '<p>Heavy JavaScript mostly shows up as slow taps and clicks, which Google measures as INP; see <a href="/blog/fix-inp-interaction-to-next-paint/">how to improve Interaction to Next Paint</a>.</p>\n\n'],
  // Agent 25
  ['monthly-website-maintenance-plan', '<h2>Emergency support</h2>', '<p>Before signing up, see <a href="/blog/choose-wordpress-maintenance-provider/">how to choose a WordPress maintenance provider</a>, including what a useful monthly report looks like.</p>\n\n'],
  ['wordpress-backup-restore-guide', '<h2>Where to store backups</h2>', '<p>If scheduled backups sometimes don\'t run on time, WordPress\'s built-in scheduler may be the reason; see <a href="/blog/wordpress-cron-explained/">WP-Cron explained</a>.</p>\n\n'],
  ['fix-wordpress-critical-error', '<h2>Step 4: Fix the cause</h2>', '<p>For memory errors in detail, see <a href="/blog/wordpress-memory-limit-errors/">how to fix "Allowed memory size exhausted" errors</a>.</p>\n\n'],
  // Agent 28
  ['wordpress-vs-wix-vs-shopify', '<h2>Already on Wix or another platform?</h2>', '<p>Also weighing up Squarespace? See <a href="/blog/wordpress-vs-squarespace/">WordPress vs Squarespace</a> for ownership, long-term costs and Indian payments.</p>\n\n'],
  ['hire-developer-vs-diy-website', '<h2>Hiring a developer makes sense when...</h2>', '<p>Thinking of a free builder like Google Sites? Here\'s <a href="/blog/wordpress-vs-google-sites/">when a free website is enough, and when it isn\'t</a>.</p>\n\n'],
  ['choose-domain-name-business', '<h2>Check its history</h2>', '<p>Still undecided on the extension? See <a href="/blog/in-vs-com-domain/">.in vs .com for Indian businesses</a>.</p>\n\n'],
  // Agent 26
  ['ssl-certificate-errors-fix', '<h2>Warnings after moving hosts or domains</h2>', '<p>For a step-by-step clean-up, see <a href="/blog/mixed-content-warnings-fix/">how to fix mixed content warnings in WordPress</a>.</p>\n\n'],
  ['301-vs-302-redirects', '<h2>Setting up redirects on WordPress</h2>', '<p>If a loop has taken your whole site offline with a "too many redirects" error, see <a href="/blog/too-many-redirects-error-fix/">how to fix ERR_TOO_MANY_REDIRECTS in WordPress</a>.</p>\n\n'],
  ['wordpress-form-plugins-compared', '<h2>Spam protection</h2>', '<p>For a step-by-step fix, see <a href="/blog/wordpress-not-sending-emails-smtp/">why WordPress doesn\'t send emails and how to set up SMTP</a>.</p>\n\n'],
  // Agent 29
  ['wordpress-website-cost-india', '<h2>What makes a website cost more?</h2>', '<p>Planning an online store? See <a href="/blog/ecommerce-website-cost-india/">what affects the cost of an e-commerce website in India</a> for platform, payment, shipping and running-cost factors.</p>\n\n'],
  ['compare-website-quotes', '<h2>Think in total cost</h2>', '<p>Tempted by the lowest quote? See <a href="/blog/cheap-website-risks/">what very cheap websites usually leave out</a> before you decide.</p>\n\n'],
  ['redesign-website-tight-budget', '<h2>Phase the redesign</h2>', '<p>Sometimes these improvements are all your site needs; see <a href="/blog/website-refresh-vs-redesign/">website refresh vs redesign</a> to decide.</p>\n\n'],
  // Agent 27
  ['privacy-policy-cookie-basics-india', '<h2>Practical next steps</h2>', '<p>For a closer look at consent, notices and security under the Act, see <a href="/blog/dpdp-act-website-basics/">what the DPDP Act generally means for small business websites</a>.</p>\n\n'],
  ['website-launch-checklist', '<h2>Launch and after</h2>', '<p>Not sure what your terms page should say? See <a href="/blog/website-terms-and-conditions/">what website terms and conditions usually cover</a>.</p>\n\n'],
  ['website-ownership-checklist', '<h2>Keep a secure record</h2>', '<p>When a project finishes, use the <a href="/blog/website-handover-checklist/">website handover checklist</a> to confirm you have received everything.</p>\n\n'],
  // Agent 30
  ['prepare-photos-for-website', '<h2>Phone photography tips</h2>', '<p>Tempted to use stock images instead? See <a href="/blog/stock-photos-vs-real-photos/">stock photos vs real photos</a> for where each one belongs.</p>\n\n'],
  ['third-party-scripts-slow-website', '<h2>Keep it from creeping back</h2>', '<p>New to Tag Manager? Our guide to <a href="/blog/google-tag-manager-basics/">Google Tag Manager basics</a> explains how to set it up, test it and keep the container lean.</p>\n\n'],
  ['transfer-domain-to-another-registrar', '<h2>Before you start</h2>', '<p>Changing to a different domain name altogether is a bigger job; see <a href="/blog/change-domain-name-without-losing-seo/">how to change your domain name without losing SEO</a>.</p>\n\n'],
  // Agent 32
  ['equipment-rental-website-guide', '<h2>Speak to each customer type</h2>', '<p>Renting furniture and appliances to households on monthly plans works differently, with tenure-based rents, deposits and KYC; see <a href="/blog/website-for-furniture-appliance-rental/">websites for furniture and appliance rental businesses</a>.</p>\n\n'],
  ['website-for-car-dealers-workshops', '<h2>Campaigns</h2>', '<p>Selling spare parts and accessories as well? Parts catalogues need fitment search by make and model; see <a href="/blog/website-for-auto-parts-dealers/">websites for auto parts and accessories dealers</a>.</p>\n\n'],
  ['woocommerce-subscriptions', '<h2>Retention: keeping subscribers longer</h2>', '<p>Daily deliveries such as milk bring their own needs, like morning slots, cut-off times and pause and resume; see <a href="/blog/website-for-dairy-milk-delivery/">websites for dairy brands and milk delivery services</a>.</p>\n\n'],
  // Agent 31
  ['write-case-studies-business-website', '<h2>Make it visual</h2>', '<p>Marketing agencies are judged on this more than most businesses; see <a href="/blog/website-for-digital-marketing-agencies/">what a digital marketing agency\'s own website needs</a>.</p>\n\n'],
  ['website-for-coworking-spaces', '<h2>Show the space</h2>', '<p>Renting quiet study seats to students rather than desks to professionals? See <a href="/blog/website-for-study-centres-libraries/">websites for self-study centres and reading libraries</a>.</p>\n\n'],
  ['website-for-astrologers-vastu-consultants', '<h2>Content and SEO</h2>', '<p>If you also help families with matchmaking, see <a href="/blog/website-for-marriage-bureaus/">websites for marriage bureaus and matrimony services</a> for handling profiles privately and building trust.</p>\n\n'],
  // Agent 34
  ['website-for-physiotherapy-clinics', '<h2>Easy booking</h2>', '<p>Working mainly with children? See <a href="/blog/website-for-speech-therapy-child-development/">websites for speech therapy and child development centres</a> for what parents look for.</p>\n\n'],
  ['website-for-interior-designers-architects', '<h2>Turn projects into case studies</h2>', '<p>Studios that produce renders and walkthroughs for other firms have a different brief; see <a href="/blog/website-for-3d-visualisation-studios/">websites for 3D visualisation studios</a>.</p>\n\n'],
  ['does-a-local-shop-need-a-website', '<h2>What a simple shop website needs</h2>', '<p>Grocery and organic stores that deliver usually need more than a simple site; see <a href="/blog/website-for-grocery-delivery-stores/">websites for grocery delivery stores</a>.</p>\n\n'],
  // Agent 36
  ['schema-markup-explained', '<h2>A practical example</h2>', '<p>For a step-by-step walkthrough of these tools, and how to fix the errors and warnings they report, see <a href="/blog/test-structured-data-rich-results/">how to test structured data and rich results</a>.</p>\n\n'],
  ['lead-magnets-newsletter-small-business', '<h2>Setting it up on WordPress</h2>', '<p>Starting from scratch? Our guide on <a href="/blog/email-newsletter-small-business/">how to start an email newsletter for your small business</a> covers tools, consent, content and measurement.</p>\n\n'],
  ['repurpose-website-content-social-media', '<h2>Case studies work especially well</h2>', '<p>If you sell to other businesses, LinkedIn deserves extra attention; see <a href="/blog/linkedin-b2b-website-traffic/">how to use LinkedIn to bring B2B visitors to your website</a>.</p>\n\n'],
  // Agent 35
  ['duplicate-content-explained', '<h2>The principle</h2>', '<p>Not sure which archives count as low-value? See <a href="/blog/category-tag-pages-seo/">when to index or noindex WordPress category and tag pages</a>.</p>\n\n'],
  ['helpful-404-pages', '<h2>Technical must-haves</h2>', '<p>A search box only helps if it returns good results; see <a href="/blog/improve-wordpress-site-search/">how to improve WordPress site search</a>.</p>\n\n'],
  ['multilingual-wordpress-website-hindi-english', '<h2>Real examples</h2>', '<p>For URL structures, hreflang codes and checking that Google shows the right version, see <a href="/blog/hreflang-multilingual-seo-india/">hreflang and multilingual SEO for Indian websites</a>.</p>\n\n'],
  // Agent 33
  ['restaurant-menu-on-website', '<h2>Make it easy to scan</h2>', '<p>Cafes have a few menu details of their own, such as milk options, seasonal drinks and eggless bakes; see <a href="/blog/website-for-cafes-coffee-shops/">websites for cafes and coffee shops</a>.</p>\n\n'],
  ['website-accessibility-older-users', '<h2>Trust and reassurance</h2>', '<p>For visitors with hearing loss, a phone call can be the hardest way to reach you, so always offer WhatsApp, email or a form as well; see <a href="/blog/website-for-hearing-aid-centres/">websites for hearing aid centres</a>.</p>\n\n'],
  ['website-for-ayurveda-wellness-centres', '<h2>Booking</h2>', '<p>Homeopathy clinics face similar questions about credentials and claims; see <a href="/blog/website-for-homeopathy-clinics/">websites for homeopathy clinics</a>.</p>\n\n'],
  // Agent 37
  ['video-on-business-website', '<h2>SEO</h2>', '<p>Publishing these videos on YouTube as well? See <a href="/blog/youtube-video-seo-small-business/">YouTube and video SEO for small businesses</a> for titles, chapters and video schema.</p>\n\n'],
  ['repurpose-website-content-social-media', '<h2>Keep a simple workflow</h2>', '<p>For Instagram in particular, see <a href="/blog/instagram-to-website-enquiries/">how to turn Instagram followers into website enquiries</a>.</p>\n\n'],
  ['website-ready-for-google-ads', '<h2>10. A plan to review and improve</h2>', '<p>Not sure how much to spend? See <a href="/blog/google-ads-budget-small-business/">how to set a sensible Google Ads budget</a>.</p>\n\n'],
  // Agent 38
  ['website-down-what-to-do', '<h2>Prevent the next outage</h2>', '<p>An outage is far easier to handle when roles, contacts and backups are sorted out in advance; see <a href="/blog/website-disaster-recovery-plan/">how to write a simple website disaster recovery plan</a>.</p>\n\n'],
  ['wordpress-user-roles-explained', '<h2>Review users regularly</h2>', '<p>To see what each account actually does once it has access, add an activity log; see <a href="/blog/wordpress-activity-logs/">WordPress activity logs explained</a>.</p>\n\n'],
  ['website-accessibility-basics', '<h2>Accessibility is ongoing</h2>', '<p>To check your own pages step by step, work through the <a href="/blog/website-accessibility-audit-checklist/">website accessibility audit checklist</a>.</p>\n\n'],
  // Agent 40
  ['woocommerce-shipping-setup-india', '<h2>6. Packaging</h2>', '<p>A <a href="/blog/pincode-delivery-checker-woocommerce/">pin code delivery checker</a> on product pages lets shoppers see delivery dates and COD availability before they reach checkout.</p>\n\n'],
  ['website-for-wholesalers-distributors', '<h2>Get found</h2>', '<p>For the technical setup of dealer roles, price tiers and hidden trade prices, see <a href="/blog/woocommerce-wholesale-dealer-pricing/">WooCommerce wholesale and dealer pricing</a>.</p>\n\n'],
  ['customize-woocommerce-emails', '<h2>Make sure the emails arrive</h2>', '<p>Custom statuses like "Shipped" work best as part of a clear <a href="/blog/woocommerce-order-management-workflow/">order management workflow</a> that the whole team follows.</p>\n\n'],
  // Agent 39
  ['woocommerce-subscriptions', '<h2>Recurring payments in India</h2>', '<p>Selling access to members-only content or a community rather than products? See <a href="/blog/membership-website-wordpress/">how to build a membership website on WordPress</a>.</p>\n\n'],
  ['sell-digital-products-wordpress', '<h2>Piracy: what you can and can\'t control</h2>', '<p>For a fuller walkthrough of LMS plugins, video hosting, quizzes and certificates, see <a href="/blog/online-course-website-wordpress/">how to build an online course website on WordPress</a>.</p>\n\n'],
  ['woocommerce-coupons-discounts', '<h2>Measure results</h2>', '<p>Another way to raise order value without a coupon is to sell sensible sets or suggest the right add-ons; see <a href="/blog/woocommerce-product-bundles-upsells/">product bundles, upsells and cross-sells in WooCommerce</a>.</p>\n\n'],
  // Agent 41
  ['website-for-construction-companies', '<h2>Essential pages</h2>', '<p>Electrical contracting firms are judged on licences, safety and after-sales support too; see <a href="/blog/website-for-electrical-contractors/">websites for electrical contractors</a>.</p>\n\n'],
  ['website-for-logistics-transport-companies', '<h2>Essential pages</h2>', '<p>If storage space is your main business rather than transport, see <a href="/blog/website-for-cold-storage-warehousing/">websites for cold storage and warehousing companies</a>.</p>\n\n'],
  ['website-for-taxi-car-rental', '<h2>Popular routes and services</h2>', '<p>If tempo travellers, mini buses and coaches for groups make up most of your fleet, see <a href="/blog/website-for-tempo-traveller-bus-rental/">websites for tempo traveller and bus rental operators</a>.</p>\n\n'],
  // Agent 45
  ['website-for-cctv-security-installers', '<h2>Show the brands you work with</h2>', '<p>If fire alarms, extinguishers and hydrant systems are a large part of your work, see <a href="/blog/website-for-fire-safety-companies/">websites for fire safety and fire protection companies</a>.</p>\n\n'],
  ['website-for-it-hardware-computer-dealers', '<h2>Trust signals that matter</h2>', '<p>Corporate clients replacing old machines often ask about safe disposal. If e-waste collection and recycling is your main business, see <a href="/blog/website-for-recycling-ewaste-companies/">websites for scrap, recycling and e-waste companies</a>.</p>\n\n'],
  ['wordpress-backup-restore-guide', '<h2>How to restore safely</h2>', '<p>For a closer look at host backups versus tools such as UpdraftPlus, BlogVault and Duplicator, see <a href="/blog/wordpress-backup-plugins-compared/">WordPress backup plugins compared</a>.</p>\n\n'],
  // Agent 42
  ['website-for-hospitals', '<h2>Departments and specialities</h2>', '<p>Private ambulance operators need the same emergency-first approach across their whole website; see <a href="/blog/website-for-ambulance-services/">websites for private ambulance services</a>.</p>\n\n'],
  ['clinic-website-checklist-for-doctors', '<h2>Information patients need</h2>', '<p>Specialists such as orthopaedic surgeons, cardiologists and gynaecologists need more, including procedure pages and a second opinion page; see <a href="/blog/website-for-specialist-doctors/">websites for specialist doctors</a>.</p>\n\n'],
  ['website-for-music-dance-academies', '<h2>Show your academy in action</h2>', '<p>Running abacus, robotics, coding or art classes, or a summer camp? See <a href="/blog/website-for-kids-activity-classes/">websites for kids\' activity classes and summer camps</a>.</p>\n\n'],
  // Agent 43
  ['website-for-sports-academies', '<h2>Fees and enrolment</h2>', '<p>If your academy also sells kit and equipment, or works closely with a local sports shop, see <a href="/blog/website-for-sports-bicycle-stores/">websites for sports goods and bicycle stores</a>.</p>\n\n'],
  ['website-for-furniture-appliance-rental', '<h2>Deposits, charges and terms in plain language</h2>', '<p>If you sell TVs, fridges and washing machines outright rather than renting them, see <a href="/blog/website-for-electronics-appliance-stores/">websites for electronics and home appliance stores</a>.</p>\n\n'],
  ['website-for-beauty-cosmetics-brands', '<h2>Reviews and social proof, done honestly</h2>', '<p>Fragrance brands face their own version of these questions, from describing scents honestly to shipping alcohol-based perfumes; see <a href="/blog/website-for-perfume-fragrance-brands/">websites for perfume, attar and fragrance brands</a>.</p>\n\n'],
  // Agent 44
  ['multilingual-wordpress-website-hindi-english', '<h2>SEO best practices</h2>', '<p>If you run a translation or interpretation agency yourself, see <a href="/blog/website-for-translation-services/">websites for translation and interpretation agencies</a>.</p>\n\n'],
  ['website-for-interior-designers-architects', '<h2>Explain your services and process</h2>', '<p>Civil and structural engineering consultants can present projects the same way; see <a href="/blog/website-for-civil-engineering-consultants/">websites for civil and structural engineering consultants</a>.</p>\n\n'],
  ['website-for-electrical-contractors', '<h2>Local SEO and speed</h2>', '<p>If lifts and elevators are your main business, AMC and breakdown support matter even more; see <a href="/blog/website-for-lift-elevator-companies/">websites for lift and elevator companies</a>.</p>\n\n'],
  // Agent 46
  ['google-search-console-reports-explained', '<h2>Pages (indexing)</h2>', '<p>For a step-by-step method that turns this report into content ideas and a list of pages to improve, see <a href="/blog/search-console-content-ideas/">how to find content ideas in Search Console</a>.</p>\n\n'],
  ['business-directories-citations-india', '<h2>Avoid spammy directories</h2>', '<p>Consistent details also help Google connect everything to you when people search your name; see <a href="/blog/rank-for-your-business-name/">how to make sure your business ranks for its own name</a>.</p>\n\n'],
  ['essential-wordpress-plugins-business', '<h3>2. Security</h3>', '<p>Choosing between the popular options? See <a href="/blog/wordpress-seo-plugins-compared/">Yoast SEO vs Rank Math vs All in One SEO compared</a>.</p>\n\n'],
  // Agent 47
  ['website-for-textile-manufacturers', '<h2>Capability</h2>', '<p>If finished school, corporate or hospital uniforms are your main line, see <a href="/blog/website-for-uniform-manufacturers/">websites for uniform manufacturers and suppliers</a>.</p>\n\n'],
  ['website-for-water-purifier-ro-service', '<h2>AMC plans, explained clearly</h2>', '<p>Many purifier customers rely on borewell water. If drilling new borewells or installing submersible pumps is part of your business, see <a href="/blog/website-for-borewell-drilling/">websites for borewell drilling and water well services</a>.</p>\n\n'],
  ['website-for-pharma-franchise-companies', '<h2>An enquiry form that qualifies leads</h2>', '<p>Consumer brands that franchise outlets, such as food, retail or education chains, need a different set of pages; see <a href="/blog/website-for-franchise-brands/">websites for franchise brands</a>.</p>\n\n'],
  // Agent 48
  ['website-for-hardware-building-materials', '<h2>For contractors and projects</h2>', '<p>Run a dedicated tiles and bathroom fittings showroom? See <a href="/blog/website-for-tiles-sanitaryware-showrooms/">websites for tiles, sanitaryware and bathroom fittings showrooms</a>.</p>\n\n'],
  ['website-for-furniture-businesses', '<h2>Inspire and reassure</h2>', '<p>Selling mattresses, pillows or bedding? See <a href="/blog/website-for-mattress-sleep-brands/">websites for mattress and sleep brands</a> for comparison pages, trial periods and careful comfort claims.</p>\n\n'],
  ['ethical-link-building-small-business', '<h2>What to avoid</h2>', '<p>For a step-by-step approach to stories, data and expert comment that journalists can use, see <a href="/blog/digital-pr-small-business/">digital PR for small businesses</a>.</p>\n\n'],
  // Agent 49
  ['website-for-travel-agencies', '<h2>Enquiry vs online booking</h2>', '<p>Guides who sell single walks and local experiences rather than packages need a slightly different setup; see <a href="/blog/website-for-tour-guides-heritage-walks/">websites for tour guides and heritage walk operators</a>.</p>\n\n'],
  ['website-copywriting-mistakes', '<h2>8. Ignoring objections</h2>', '<p>The small words on buttons, forms and messages matter too; see <a href="/blog/website-microcopy-that-converts/">website microcopy that converts</a> for before-and-after examples.</p>\n\n'],
  ['website-for-wholesalers-distributors', '<h2>Online B2B ordering</h2>', '<p>For more detail on fields, file uploads and routing, see <a href="/blog/rfq-forms-b2b-websites/">request-for-quote forms for B2B websites</a>.</p>\n\n'],
  // Agent 50
  ['website-for-bakeries-cake-shops', '<h2>Trust and practical details</h2>', '<p>Teaching baking as well as selling it? See <a href="/blog/website-for-cooking-baking-classes/">websites for cooking and baking class studios</a>.</p>\n\n'],
  ['website-for-video-production-companies', '<h2>Getting found</h2>', '<p>Running a sound recording, podcast or dubbing studio instead? See <a href="/blog/website-for-recording-studios/">websites for recording studios</a>.</p>\n\n'],
  ['multi-step-forms-lead-qualification', '<h2>Measure, then adjust</h2>', '<p>To rank incoming enquiries and decide who to call first, see <a href="/blog/lead-scoring-small-business/">simple lead scoring for small businesses</a>.</p>\n\n'],
  // Agent 51
  ['website-for-toy-stores', '<h2>Make gifting easy</h2>', '<p>Selling baby care products such as lotions, wipes or feeding items as well? They need even more careful ingredient and age information; see <a href="/blog/website-for-baby-products-brands/">websites for baby care and baby products brands</a>.</p>\n\n'],
  ['solar-company-website-guide', '<h2>Build trust quickly</h2>', '<p>If your business mainly sells inverters, UPS systems and batteries for power backup, the website needs are a little different; see <a href="/blog/website-for-inverter-battery-dealers/">websites for inverter, UPS and battery dealers</a>.</p>\n\n'],
  ['image-optimization-wordpress', '<h2>3. Use modern formats</h2>', '<p>Not sure which compression tool to use? See <a href="/blog/image-compression-plugins-compared/">WordPress image compression plugins compared</a>.</p>\n\n'],
  // Agent 52
  ['website-for-music-dance-academies', '<h2>Teachers</h2>', '<p>If your teachers also prepare couples and families for wedding performances, that work deserves its own pages; see <a href="/blog/website-for-wedding-choreographers/">websites for wedding and sangeet choreographers</a>.</p>\n\n'],
  ['website-for-astrologers-vastu-consultants', '<h2>Language</h2>', '<p>If you also perform pujas and sanskars at clients\' homes or online, see <a href="/blog/website-for-pandit-puja-services/">websites for pandits and puja booking services</a>.</p>\n\n'],
  ['woocommerce-coupons-discounts', '<h2>Restrictions to protect margins</h2>', '<p>Coupons reduce a price, while gift cards and store credit hold value a customer has paid for or earned; for those, see <a href="/blog/woocommerce-gift-cards/">selling gift cards and store credit in WooCommerce</a>.</p>\n\n'],
];

let src = fs.readFileSync(FILE, 'utf8');
let added = 0, skipped = 0;
for (const [slug, anchor, insert] of LINKS) {
  const start = src.indexOf(`slug: '${slug}',`);
  if (start < 0) throw new Error(`Post not found: ${slug}`);
  const bodyStart = src.indexOf('body: `', start);
  const bodyEnd = src.indexOf('`,\n  },', bodyStart);
  let body = src.slice(bodyStart, bodyEnd);
  const target = (insert.match(/href="(\/[^"]+)"/) || [])[1];
  if (target && body.includes(`href="${target}"`)) { skipped++; continue; }
  const count = body.split(anchor).length - 1;
  if (count !== 1) throw new Error(`Anchor found ${count} times in ${slug}: ${anchor}`);
  body = body.replace(anchor, insert + anchor);
  src = src.slice(0, bodyStart) + body + src.slice(bodyEnd);
  added++;
}
fs.writeFileSync(FILE, src);
console.log(`contextual links added: ${added}, already present: ${skipped}`);
