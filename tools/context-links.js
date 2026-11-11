// Extra contextual links from posts to free tools, tutorials and the country service pages.
// One sentence per post, inserted before the post's FAQ heading (or at the end) by build-pages.js.
// Skipped when the post already links to the target. Keep each post to at most one entry here.
const W = 'WordPress and Shopify';
module.exports = {
  // Free tools
  'why-is-my-wordpress-site-slow': 'Heavy images are the usual first fix: the free <a href="/free-tools/image-compressor/">image compressor</a> shrinks them in your browser before you upload.',
  'core-web-vitals-explained': 'For a quick LCP win, convert large hero images with the free <a href="/free-tools/image-converter/">PNG and JPG to WebP converter</a>.',
  'test-structured-data-rich-results': 'Before testing, tidy and validate your markup in the free <a href="/free-tools/json-formatter/">JSON-LD formatter</a>, which points to the exact broken line.',
  'search-intent-explained': 'When drafting a page for a query, the free <a href="/free-tools/word-counter/">word counter and keyword density tool</a> shows whether you are covering the topic or just repeating it.',
  'google-business-profile-checklist': 'To collect reviews in person, print a code with the free <a href="/free-tools/qr-code-generator/">QR code generator</a> that opens your review link.',
  'website-design-mistakes': 'Grey text on white is a common one; check your colours in the free <a href="/free-tools/color-contrast-checker/">contrast checker</a>.',
  'change-domain-name-without-losing-seo': 'To map old URLs to new ones in bulk, the free <a href="/free-tools/redirect-htaccess-generator/">301 redirect generator</a> writes the rules for you.',
  'shopify-theme-change-without-losing-seo': 'After the switch, check your key titles and descriptions with the free <a href="/free-tools/meta-title-description-checker/">meta tag checker</a>.',
  'meta-catalog-instagram-shopping-woocommerce': 'Catalog images look best square; the free <a href="/free-tools/image-resizer/">image resizer</a> crops a whole batch to the same size.',
  'click-to-whatsapp-ads-vs-website': 'If you send ad traffic to chat, make the link with the free <a href="/free-tools/whatsapp-link-generator/">WhatsApp click-to-chat generator</a> and a prefilled message.',
  'google-ads-conversion-tracking-setup': 'For campaigns outside Google Ads, tag links with the free <a href="/free-tools/utm-builder/">UTM builder</a> so GA4 shows where leads came from.',
  'xml-sitemaps-explained': 'Your robots.txt should point to the sitemap; the free <a href="/free-tools/robots-txt-generator/">robots.txt generator</a> adds the Sitemap line for you.',
  'shopify-store-setup-india': 'Product photos on a clean white background convert better; the free <a href="/free-tools/background-remover/">background remover</a> runs in your browser.',
  'web-fonts-performance': 'For tiny icons that would cost an extra request, the free <a href="/free-tools/image-to-base64/">image to Base64 converter</a> gives you an inline data URI.',
  // Tutorials
  'wordpress-pages-404-permalinks-fix': 'If you need to change the URL structure itself, follow the <a href="/tutorials/change-wordpress-permalinks/">step-by-step permalinks tutorial</a> first.',
  'category-tag-pages-seo': 'Want cleaner category URLs? See <a href="/tutorials/change-wordpress-permalinks/">how to change WordPress permalinks safely</a>.',
  'shopify-cash-on-delivery-india': 'For the exact settings screens, see the <a href="/tutorials/enable-cash-on-delivery-shopify/">tutorial on enabling COD in Shopify</a>.',
  'shopify-shipping-india': 'Offering pay on delivery too? Here is <a href="/tutorials/enable-cash-on-delivery-shopify/">how to turn on cash on delivery in Shopify</a>, with screenshots.',
  'wordpress-login-not-working-fix': 'Locked out completely? You can <a href="/tutorials/reset-wordpress-password-phpmyadmin/">reset the admin password from phpMyAdmin</a>.',
  'shopify-domain-not-connecting': 'Starting again from scratch? Follow the <a href="/tutorials/connect-domain-to-shopify/">domain connection tutorial for Shopify</a> step by step.',
  'wordpress-site-sending-spam-emails': 'Once the site is clean, route real mail through an authenticated sender; see <a href="/tutorials/setup-smtp-wordpress/">setting up SMTP in WordPress</a>.',
  // Country pages
  'white-label-wordpress-development-agencies': `UK studios often work this way; see how we work as a <a href="/wordpress-shopify-developer-uk/">remote ${W} developer for UK agencies</a>.`,
  'agency-developer-handoff-checklist': `We use this checklist with agency partners abroad, including <a href="/wordpress-shopify-developer-uk/">UK agencies and businesses</a>.`,
  'outsource-wordpress-development-india': `Based outside India? Here is how projects run for clients in the <a href="/wordpress-shopify-developer-uk/">United Kingdom</a> and the <a href="/wordpress-shopify-developer-usa/">United States</a>.`,
  'freelancer-vs-agency-web-developer': `Hiring from the US? See how a <a href="/wordpress-shopify-developer-usa/">remote ${W} developer for USA businesses</a> handles time zones and billing.`,
  'agency-wordpress-care-plans': `The same care plans work for US agencies; see how we work as a <a href="/wordpress-shopify-developer-usa/">remote developer for USA clients</a>.`,
  'compare-website-quotes': `Comparing quotes from abroad? Our pages for <a href="/wordpress-shopify-developer-usa/">USA</a> and <a href="/wordpress-shopify-developer-canada/">Canada</a> explain pricing in local terms.`,
  'fixed-price-vs-hourly-website-projects': `Clients in North America often ask about this; see how fixed-price work runs for <a href="/wordpress-shopify-developer-canada/">Canadian businesses</a>.`,
  'website-payment-terms-milestones': `For overseas projects, such as for <a href="/wordpress-shopify-developer-canada/">clients in Canada</a>, milestones work the same way and are agreed before work starts.`,
  'agency-development-retainer': `Retainers suit agencies in different time zones too, including for <a href="/wordpress-shopify-developer-canada/">clients in Canada</a>.`,
  'website-for-overseas-education-consultants': `Consultancies with offices in the Gulf can see how we build for <a href="/wordpress-shopify-developer-uae/">businesses in Dubai and the UAE</a>.`,
  'website-for-recruitment-agencies': `Recruiting for Gulf employers? See our <a href="/wordpress-shopify-developer-uae/">${W} work for UAE companies</a>.`,
  'hotel-booking-engine-channel-manager': `Run properties in Dubai or Abu Dhabi? See our <a href="/wordpress-shopify-developer-uae/">website development for the UAE</a>.`,
  'privacy-policy-cookie-basics-india': `Selling to the EU means GDPR applies too; see how we build <a href="/wordpress-shopify-developer-europe/">GDPR-ready sites for European businesses</a>.`,
  'dpdp-act-website-basics': `If you also serve European customers, GDPR rules sit alongside the DPDP Act; see our <a href="/wordpress-shopify-developer-europe/">work for clients in Europe</a>.`,
  'hreflang-multilingual-seo-india': `Hreflang matters most for multi-country sites, such as the ones we build for <a href="/wordpress-shopify-developer-europe/">businesses across Europe</a>.`,
};
