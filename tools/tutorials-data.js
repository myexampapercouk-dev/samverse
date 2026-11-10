// Step-by-step tutorials at /tutorials/<slug>/ (built by tools/tutorials-build.js, called from build-pages.js).
// Each tutorial targets one exact "how to ..." query that no blog post targets, and links to the post(s) that explain the topic.
// `service`: slug of the money page for the "Need it done for you?" box. `linkFrom`: [blog post slug, sentence] appended to that post.
// Images: node tools/tutorial-images.js -> /assets/tutorials/<slug>-step-N.svg
const fig = (slug, n, alt, cap) => `<figure class="step-shot"><img src="/assets/tutorials/${slug}-step-${n}.svg" alt="${alt}" width="960" height="560" loading="lazy" decoding="async"><figcaption>${cap}</figcaption></figure>`;
const path_ = p => `<p class="tut-path"><strong>Where:</strong> ${p}</p>`;

const TUTORIALS = [
  {
    slug: 'add-razorpay-to-woocommerce',
    title: 'How to Add Razorpay to WooCommerce: Step-by-Step (2026)',
    description: 'Add Razorpay to WooCommerce in 6 steps: install the official plugin, create test API keys, paste them in Payments, add the webhook, test, then go live.',
    date: '2026-11-10',
    service: 'woocommerce-developer',
    serviceText: 'I set up Razorpay, UPI, COD and GST invoices on WooCommerce stores and test every payment path before launch.',
    time: '30 to 45 minutes (plus Razorpay account activation, which can take a few days)',
    need: ['A WordPress site with WooCommerce installed and HTTPS working', 'A Razorpay account (business details and KYC submitted)', 'Admin access to WordPress', 'A phone with a UPI app or a card for the live test'],
    linkFrom: [
      ['accept-online-payments-wordpress-india', 'If you have picked Razorpay, follow the click-by-click tutorial on <a href="/tutorials/add-razorpay-to-woocommerce/">how to add Razorpay to WooCommerce</a>, from API keys to the webhook and a live test.'],
      ['woocommerce-store-launch-checklist', 'For the payments line of this checklist, the <a href="/tutorials/add-razorpay-to-woocommerce/">Razorpay for WooCommerce setup tutorial</a> walks through test mode, the webhook and the first live payment.'],
    ],
    body: (s) => `
<p>To add Razorpay to WooCommerce, install the official <strong>Razorpay for WooCommerce</strong> plugin, generate API keys in the Razorpay Dashboard, paste the Key ID and Key Secret into <strong>WooCommerce &gt; Settings &gt; Payments &gt; Razorpay</strong>, add a webhook, and place a test order before switching to live keys. Customers then pay by UPI, cards, netbanking or wallets on your checkout.</p>
<p>This tutorial is the hands-on part. If you are still choosing a gateway, read <a href="/blog/accept-online-payments-wordpress-india/">how to accept online payments on WordPress in India</a> first.</p>

<h2>Step 1: Check your Razorpay account is ready</h2>
${path_('Razorpay Dashboard &gt; Home')}
<p>Log in to the Razorpay Dashboard. You can build and test everything in <strong>Test Mode</strong> straight away, but live payments only work once Razorpay has approved your account (business details, KYC documents and your website URL). Razorpay reviews the website itself, so make sure these pages are live and linked in your footer before you apply:</p>
<ul>
  <li>A contact page with a real address, phone and email</li>
  <li>Terms and conditions, privacy policy, and a refund and cancellation policy (see <a href="/blog/woocommerce-returns-refunds-policy/">writing a WooCommerce returns and refunds policy</a>)</li>
  <li>Shipping or delivery policy, and product pages with clear prices</li>
</ul>
<p>Missing policy pages are one of the most common reasons an activation is held up, so do this first.</p>

<h2>Step 2: Install the Razorpay for WooCommerce plugin</h2>
${path_('WordPress admin &gt; Plugins &gt; Add New Plugin')}
<ol>
  <li>In WordPress, go to <strong>Plugins &gt; Add New Plugin</strong>.</li>
  <li>Search for <strong>Razorpay</strong>.</li>
  <li>Find <strong>Razorpay for WooCommerce</strong> by Team Razorpay and click <strong>Install Now</strong>, then <strong>Activate</strong>.</li>
</ol>
${fig(s, 1, 'How to add Razorpay to WooCommerce: Plugins Add New Plugin screen with the Razorpay for WooCommerce Install Now button highlighted', 'Step 2: Plugins &gt; Add New Plugin, search Razorpay, then Install Now and Activate on the official plugin.')}
<p>Use the official plugin from the WordPress.org directory. Avoid "nulled" or re-uploaded copies of payment plugins: a tampered payment plugin is exactly where card skimmers hide (see <a href="/blog/woocommerce-checkout-skimmer-malware/">WooCommerce checkout skimmer malware</a>).</p>

<h2>Step 3: Generate test API keys in Razorpay</h2>
${path_('Razorpay Dashboard &gt; Account &amp; Settings &gt; API keys (with Test Mode on)')}
<ol>
  <li>Switch the dashboard to <strong>Test Mode</strong> using the mode toggle at the top.</li>
  <li>Open <strong>Account &amp; Settings</strong> and, under Website and app settings, click <strong>API keys</strong>.</li>
  <li>Click <strong>Generate Key</strong>. Copy the <strong>Key ID</strong> (it starts with <code>rzp_test_</code>) and the <strong>Key Secret</strong>.</li>
</ol>
${fig(s, 2, 'Razorpay Dashboard Account and Settings API keys page in Test Mode with the Generate Key button highlighted', 'Step 3: In Test Mode, Account &amp; Settings &gt; API keys &gt; Generate Key. Copy both values now.')}
<p>The Key Secret is shown only once. Save it in a password manager, not in an email or a WhatsApp chat. If you lose it, you simply regenerate the key and paste the new pair into WooCommerce.</p>

<h2>Step 4: Paste the keys into WooCommerce</h2>
${path_('WordPress admin &gt; WooCommerce &gt; Settings &gt; Payments &gt; Razorpay')}
<ol>
  <li>Go to <strong>WooCommerce &gt; Settings &gt; Payments</strong> and open <strong>Razorpay</strong> (click Manage or Set up, depending on your WooCommerce version).</li>
  <li>Tick <strong>Enable this payment method</strong>.</li>
  <li>Set a clear <strong>Title</strong> such as "Pay with UPI, cards, netbanking (Razorpay)". This is what shoppers see.</li>
  <li>Paste the <strong>Key ID</strong> and <strong>Key Secret</strong>.</li>
  <li>Leave <strong>Payment Action</strong> on <strong>Authorize and Capture</strong> unless you deliberately capture payments by hand.</li>
  <li>Click <strong>Save changes</strong>.</li>
</ol>
${fig(s, 3, 'WooCommerce Settings Payments Razorpay screen with the enable checkbox and the Key ID and Key Secret fields highlighted', 'Step 4: WooCommerce &gt; Settings &gt; Payments &gt; Razorpay. Enable it and paste the Key ID and Key Secret.')}

<h2>Step 5: Add the Razorpay webhook</h2>
${path_('Razorpay Dashboard &gt; Account &amp; Settings &gt; Webhooks &gt; Add New Webhook')}
<p>The webhook lets Razorpay tell your store about a payment even if the shopper closes the browser before returning to your thank-you page. Without it you can end up with "Pending payment" orders that were actually paid.</p>
<ol>
  <li>In the Razorpay Dashboard (still in Test Mode), open <strong>Account &amp; Settings &gt; Webhooks</strong> and click <strong>Add New Webhook</strong>.</li>
  <li>Webhook URL: <code>https://yourdomain.com/wp-admin/admin-post.php?action=rzp_wc_webhook</code> (replace with your domain).</li>
  <li>Create a <strong>Secret</strong> (any strong random string) and note it.</li>
  <li>Under active events, tick at least <strong>payment.authorized</strong> and <strong>order.paid</strong>, plus the refund events if you refund from the dashboard.</li>
  <li>Save, then paste the same secret into the <strong>Webhook Secret</strong> field on the Razorpay settings page in WooCommerce, and save again.</li>
</ol>
<p>If a security plugin or firewall blocks <code>admin-post.php</code> for outside requests, allow this URL, or webhooks will silently fail.</p>

<h2>Step 6: Place a test order, then go live</h2>
${path_('Your shop front end, then WooCommerce &gt; Orders')}
<ol>
  <li>Open your shop in a private window, add a product to the cart and check out with Razorpay.</li>
  <li>In the Razorpay test popup, use one of the test payment methods Razorpay shows for test mode and complete the payment.</li>
  <li>In <strong>WooCommerce &gt; Orders</strong>, confirm the order moved to <strong>Processing</strong> and the order notes show the Razorpay payment ID.</li>
  <li>In Razorpay, switch to <strong>Live Mode</strong>, generate live keys (they start with <code>rzp_live_</code>), add the webhook again in live mode, and replace the test keys in WooCommerce.</li>
  <li>Make one small real payment with your own UPI app, check the order, then refund it from the Razorpay Dashboard.</li>
</ol>
<p>Test and live webhooks are separate. Forgetting to add the live webhook is the most common reason orders stay pending after launch.</p>

<h2>Troubleshooting</h2>
<ul>
  <li><strong>Razorpay does not appear at checkout:</strong> check it is enabled under Payments, that your store currency is INR (or a currency your account supports), and clear any page cache. If you use the block-based checkout, update the plugin to the latest version.</li>
  <li><strong>Orders stay "Pending payment" though money was taken:</strong> the webhook is missing, has the wrong secret, or is blocked by a firewall. Check the webhook's delivery log in the Razorpay Dashboard.</li>
  <li><strong>"Authentication failed" error:</strong> the Key ID and Key Secret do not match, or you mixed a test key with a live secret. Regenerate and paste both again.</li>
  <li><strong>Popup opens and closes immediately:</strong> a JavaScript optimisation setting (combine or delay JS) is breaking the checkout. Exclude the checkout page and the Razorpay script from JS optimisation.</li>
</ul>

<h2>FAQs</h2>
<h3>Is the Razorpay WooCommerce plugin free?</h3>
<p>Yes, the plugin is free. Razorpay charges a transaction fee on each payment as per your agreement with them; check the current rates on your Razorpay pricing page.</p>
<h3>Can I add Razorpay to WooCommerce before my account is activated?</h3>
<p>Yes. You can install the plugin, use test keys and run test orders right away. Live payments only start after Razorpay approves your account and you swap in live keys.</p>
<h3>Can I offer Razorpay and cash on delivery together?</h3>
<p>Yes. Enable both under WooCommerce &gt; Settings &gt; Payments. See <a href="/blog/woocommerce-cash-on-delivery-india/">cash on delivery on WooCommerce in India</a> for limiting COD to keep returns down.</p>
`,
  },

  {
    slug: 'connect-domain-to-shopify',
    title: 'How to Connect a Domain to Shopify: Step-by-Step (2026)',
    description: 'Connect a domain you own to Shopify: add it in Settings > Domains, set the A and www CNAME records at your registrar, verify, then make it primary.',
    date: '2026-11-10',
    service: 'shopify-developer',
    serviceText: 'I connect domains, set up payments and shipping, and launch Shopify stores for Indian brands without email or DNS surprises.',
    time: '15 minutes of work, then up to 48 hours for DNS to update (often much less)',
    need: ['A Shopify store on a paid plan', 'Login to the registrar where you bought the domain (GoDaddy, Hostinger, BigRock, Namecheap and so on)', 'A note of any existing email (MX) records, so you do not break email'],
    linkFrom: [
      ['choose-domain-name-business', 'Already bought the domain and building on Shopify? Follow the tutorial on <a href="/tutorials/connect-domain-to-shopify/">how to connect a domain to Shopify</a> to point it at your store without touching your email.'],
      ['domain-hosting-ssl-explained', 'For a Shopify store, "pointing the domain" means two DNS records; the <a href="/tutorials/connect-domain-to-shopify/">connect a domain to Shopify tutorial</a> shows exactly which ones.'],
    ],
    body: (s) => `
<p>To connect a domain to Shopify, go to <strong>Settings &gt; Domains &gt; Connect existing domain</strong> in Shopify, enter your domain, then at your domain registrar set an <strong>A record</strong> for <code>@</code> to <code>23.227.38.65</code> and a <strong>CNAME</strong> for <code>www</code> to <code>shops.myshopify.com</code>. Back in Shopify, click Verify, and set the domain as primary.</p>
<p>This keeps the domain registered where it is (you keep paying the renewal there) and leaves your email records alone. If you want Shopify to manage the whole domain instead, you can transfer it, but that is a separate process (see <a href="/blog/transfer-domain-to-another-registrar/">transferring a domain to another registrar</a>).</p>

<h2>Step 1: Start the connection in Shopify</h2>
${path_('Shopify admin &gt; Settings &gt; Domains &gt; Connect existing domain')}
<ol>
  <li>In Shopify admin, click <strong>Settings</strong> (bottom left), then <strong>Domains</strong>.</li>
  <li>Click <strong>Connect existing domain</strong>.</li>
  <li>Type your domain without <code>https://</code> or <code>www</code>, for example <code>yourdomain.com</code>, and click <strong>Next</strong>.</li>
</ol>
${fig(s, 1, 'How to connect a domain to Shopify: Settings Domains page with the Connect existing domain button highlighted', 'Step 1: Settings &gt; Domains &gt; Connect existing domain, then type the domain you already own.')}
<p>Shopify may offer to connect automatically if your registrar supports it. That is fine to use; the manual steps below are what it does for you, and they work with every registrar.</p>

<h2>Step 2: Write down your current DNS records</h2>
${path_('Your registrar &gt; Domains &gt; yourdomain.com &gt; DNS / Manage DNS')}
<p>Before changing anything, open your registrar's DNS page and take a screenshot of every record. In particular note the <strong>MX</strong> and <strong>TXT</strong> records: those run your business email (Google Workspace, Zoho, Hostinger email and so on) and must not be deleted. You will only touch two records.</p>
<p>If your site was on WordPress before, also note the old A record. That way you can switch back quickly if you need to.</p>

<h2>Step 3: Point the A record and the www CNAME to Shopify</h2>
${path_('Registrar DNS zone: A record (@) and CNAME record (www)')}
<ol>
  <li>Edit the <strong>A record</strong> with name/host <code>@</code> (sometimes shown as blank or as your domain) and set the value to <code>23.227.38.65</code>. If there are several A records for <code>@</code>, delete the extra ones so only Shopify's remains.</li>
  <li>Edit the <strong>CNAME</strong> with name <code>www</code> and set it to <code>shops.myshopify.com</code>. If <code>www</code> is an A record instead, delete it and create the CNAME.</li>
  <li>If there is an <strong>AAAA</strong> record for <code>@</code> pointing at your old host, remove it, otherwise some visitors still reach the old server.</li>
  <li>Save. Leave MX, TXT (SPF, DKIM, DMARC, verification) and any other records exactly as they were.</li>
</ol>
${fig(s, 2, 'Registrar DNS zone with the A record for @ set to 23.227.38.65 and the CNAME for www set to shops.myshopify.com highlighted', 'Step 3: Only the A record for @ and the CNAME for www change. Email (MX) and TXT records stay as they are.')}
<p>Some registrars insist on the full name, such as <code>www.yourdomain.com</code>, or add a trailing dot. Follow the format the other records on the page already use.</p>

<h2>Step 4: Verify the connection and set the primary domain</h2>
${path_('Shopify admin &gt; Settings &gt; Domains')}
<ol>
  <li>Back in Shopify, click <strong>Verify connection</strong>. If it says the records are not found yet, wait 30 to 60 minutes and try again.</li>
  <li>Once connected, open <strong>Change primary domain</strong> (or the menu next to the domain) and choose <code>yourdomain.com</code> or <code>www.yourdomain.com</code>. Pick one and keep it.</li>
  <li>Make sure the option to redirect all traffic to the primary domain is on, so the <code>myshopify.com</code> address and the other variant redirect to it.</li>
</ol>
${fig(s, 3, 'Shopify Domains list with yourdomain.com marked Primary and Connected, and www redirecting to the primary domain', 'Step 4: When the domain shows Connected and Primary, every other address redirects to it.')}
<p>Shopify issues a free SSL certificate automatically once DNS is correct. The padlock can take a while to appear; do not buy a separate certificate.</p>

<h2>Step 5: Check email, redirects and Search Console</h2>
<ul>
  <li>Send an email to your business address from Gmail and reply to it, to confirm email still works.</li>
  <li>Open <code>http://</code>, <code>https://</code>, <code>www</code> and non-www versions of your domain: all four should land on the same primary URL.</li>
  <li>If you moved from another platform, set up URL redirects in <strong>Content &gt; Menus &gt; URL Redirects</strong> (or Online Store &gt; Navigation in older admins) for old page URLs. The <a href="/blog/migrate-shopify-to-woocommerce/">migration guide</a> covers the reverse move, and the same redirect logic applies.</li>
  <li>Add the domain to Google Search Console and submit <code>/sitemap.xml</code>.</li>
</ul>

<h2>Troubleshooting</h2>
<ul>
  <li><strong>"Domain not connected" after a day:</strong> check for a second A record or an AAAA record on <code>@</code> still pointing to the old host. Use a public DNS checker to see what the world sees.</li>
  <li><strong>www works but the bare domain does not (or the reverse):</strong> one of the two records is wrong. The A record handles the bare domain; the CNAME handles www.</li>
  <li><strong>Your domain uses Cloudflare nameservers:</strong> make the changes in Cloudflare's DNS tab, not at the registrar, and set both records to DNS only (grey cloud).</li>
  <li><strong>Email stopped working:</strong> an MX record was deleted or changed. Restore it from your screenshot.</li>
</ul>

<h2>FAQs</h2>
<h3>How long does it take to connect a domain to Shopify?</h3>
<p>The setup takes about 15 minutes. DNS changes usually show within a few hours, but Shopify allows up to 48 hours before the connection and SSL are complete.</p>
<h3>Will connecting my domain to Shopify affect my email?</h3>
<p>No, as long as you only change the A record for @ and the CNAME for www. Email depends on the MX and TXT records, which you leave untouched.</p>
<h3>Do I have to transfer my domain to Shopify?</h3>
<p>No. Connecting keeps the domain at your current registrar. Transfer only if you want Shopify to handle renewals and DNS.</p>
`,
  },

  {
    slug: 'setup-smtp-wordpress',
    title: 'How to Set Up SMTP in WordPress: Step-by-Step (2026)',
    description: 'Set up SMTP in WordPress with WP Mail SMTP so contact form and order emails reach the inbox: install, choose Other SMTP, add host and port, send a test.',
    date: '2026-11-10',
    service: 'wordpress-maintenance',
    serviceText: 'Email setup and deliverability checks are part of my WordPress maintenance work, along with updates, backups and uptime monitoring.',
    time: '20 to 30 minutes',
    need: ['A business email address on your domain (for example hello@yourdomain.com)', 'That mailbox\'s SMTP details: host, port, encryption, username, password (from your email provider)', 'WordPress admin access'],
    linkFrom: [
      ['business-email-deliverability-spf-dkim-dmarc', 'Once SPF, DKIM and DMARC are in place, make WordPress send through your mailbox too: see the tutorial on <a href="/tutorials/setup-smtp-wordpress/">how to set up SMTP in WordPress</a> with WP Mail SMTP.'],
      ['contact-form-not-getting-enquiries', 'If form notifications are the problem, the <a href="/tutorials/setup-smtp-wordpress/">WordPress SMTP setup tutorial</a> shows how to route them through a real mailbox and send a test.'],
    ],
    body: (s) => `
<p>To set up SMTP in WordPress, install the free <strong>WP Mail SMTP</strong> plugin, open <strong>WP Mail SMTP &gt; Settings</strong>, set your From Email, choose the <strong>Other SMTP</strong> mailer, enter your email provider's SMTP host, port, encryption, username and password, then send a test from <strong>WP Mail SMTP &gt; Tools &gt; Email Test</strong>.</p>
<p>By default WordPress sends mail through the server's PHP mail function. Those emails often land in spam or vanish, which is why contact forms "stop working". SMTP sends the same emails through a real, authenticated mailbox. For the DNS side (SPF, DKIM, DMARC), read <a href="/blog/business-email-deliverability-spf-dkim-dmarc/">business email deliverability explained</a>.</p>

<h2>Step 1: Find your SMTP details</h2>
<p>Get these from your email provider's help pages or control panel, not from a random forum:</p>
<table>
  <thead><tr><th>Provider</th><th>SMTP host</th><th>Port / encryption</th></tr></thead>
  <tbody>
    <tr><td>Hostinger email</td><td><code>smtp.hostinger.com</code></td><td>465 / SSL</td></tr>
    <tr><td>Zoho Mail (India data centre)</td><td><code>smtp.zoho.in</code></td><td>465 / SSL or 587 / TLS</td></tr>
    <tr><td>Google Workspace or Gmail</td><td>Use the Google mailer in WP Mail SMTP, or <code>smtp.gmail.com</code> with an app password</td><td>465 / SSL or 587 / TLS</td></tr>
    <tr><td>cPanel hosting email</td><td>Usually <code>mail.yourdomain.com</code></td><td>Shown in cPanel &gt; Email Accounts &gt; Connect Devices</td></tr>
  </tbody>
</table>
<p>The username is normally the full email address, and the password is that mailbox's password (or an app password if two-step login is on).</p>

<h2>Step 2: Install WP Mail SMTP</h2>
${path_('WordPress admin &gt; Plugins &gt; Add New Plugin')}
<ol>
  <li>Go to <strong>Plugins &gt; Add New Plugin</strong> and search <strong>WP Mail SMTP</strong>.</li>
  <li>Install and activate <strong>WP Mail SMTP by WPForms</strong>.</li>
  <li>If the setup wizard opens, you can follow it, or exit and use the settings page below. The fields are the same.</li>
</ol>
<p>Run only one SMTP plugin. Two mail plugins fight over the same WordPress function and cause confusing failures.</p>

<h2>Step 3: Set the From Email and choose Other SMTP</h2>
${path_('WordPress admin &gt; WP Mail SMTP &gt; Settings &gt; General')}
<ol>
  <li><strong>From Email:</strong> the mailbox you will authenticate with, such as <code>hello@yourdomain.com</code>. Tick <strong>Force From Email</strong> so forms cannot override it with the visitor's address.</li>
  <li><strong>From Name:</strong> your business name.</li>
  <li><strong>Mailer:</strong> choose <strong>Other SMTP</strong>. (If you use Gmail or Microsoft 365, the dedicated Google or Microsoft mailer is more reliable than plain SMTP.)</li>
</ol>
${fig(s, 1, 'How to set up SMTP in WordPress: WP Mail SMTP Settings with From Email filled in and the Other SMTP mailer tile highlighted', 'Step 3: WP Mail SMTP &gt; Settings. Set the From Email, tick Force From Email and choose Other SMTP.')}

<h2>Step 4: Enter host, port and login</h2>
${path_('WP Mail SMTP &gt; Settings &gt; Other SMTP section (same page)')}
<ol>
  <li><strong>SMTP Host:</strong> from Step 1.</li>
  <li><strong>Encryption:</strong> SSL with port <strong>465</strong>, or TLS with port <strong>587</strong>. These pairs matter: SSL on 587 will fail.</li>
  <li><strong>Auto TLS:</strong> leave on.</li>
  <li><strong>Authentication:</strong> on. Enter the full email address as username and the mailbox password.</li>
  <li>Click <strong>Save Settings</strong>.</li>
</ol>
${fig(s, 2, 'WP Mail SMTP Other SMTP settings with SMTP Host, SSL encryption, port 465 and the username and password fields highlighted', 'Step 4: Host, encryption and port must match your provider. Username is the full email address.')}
<p>WP Mail SMTP stores the password in the database. If you prefer, it supports defining it in <code>wp-config.php</code> instead; its documentation lists the constants.</p>

<h2>Step 5: Send a test email</h2>
${path_('WordPress admin &gt; WP Mail SMTP &gt; Tools &gt; Email Test')}
<ol>
  <li>Open <strong>WP Mail SMTP &gt; Tools</strong> and the <strong>Email Test</strong> tab.</li>
  <li>Send To: an address <em>outside</em> your domain, such as a personal Gmail.</li>
  <li>Click <strong>Send Email</strong>. You should see a success message and the email should arrive in the inbox, not spam.</li>
</ol>
${fig(s, 3, 'WP Mail SMTP Tools Email Test tab with the Send To field and the Send Email button highlighted, plus a success message', 'Step 5: Tools &gt; Email Test. Send to an outside inbox and check it lands in the inbox, not spam.')}
<p>Then submit your real contact form and, on a WooCommerce store, place a test order. Those are the emails that actually matter.</p>

<h2>Step 6: Fix the From address in your form plugin</h2>
<p>Contact Form 7, WPForms, Fluent Forms and others each have their own notification settings. Set the notification "From" to your own domain address and put the visitor's email in <strong>Reply-To</strong>. Sending "from" the visitor's Gmail address is the classic reason form emails are rejected. See <a href="/blog/wordpress-form-plugins-compared/">WordPress form plugins compared</a> for where each plugin keeps this setting.</p>

<h2>Troubleshooting</h2>
<ul>
  <li><strong>"Could not authenticate":</strong> wrong password, or the provider needs an app password because two-step login is on.</li>
  <li><strong>Connection timed out:</strong> wrong port/encryption pair, or your host blocks outgoing SMTP ports. Try 587/TLS, or ask the host to open the port.</li>
  <li><strong>Test arrives but lands in spam:</strong> SMTP is working; the domain's SPF, DKIM or DMARC records are missing or wrong.</li>
  <li><strong>Test works but forms still fail:</strong> the form plugin's From address is overriding yours. Turn on Force From Email and fix the form notification.</li>
</ul>

<h2>FAQs</h2>
<h3>Do I need SMTP in WordPress?</h3>
<p>For any site with a contact form or a shop, yes. Server mail is unauthenticated and often filtered as spam; SMTP sends through a real mailbox.</p>
<h3>Is WP Mail SMTP free?</h3>
<p>The core plugin with the Other SMTP mailer is free. Paid versions add features such as email logs and extra mailers.</p>
<h3>Which port should I use for SMTP in WordPress?</h3>
<p>Use 465 with SSL or 587 with TLS, whichever your email provider lists. Avoid port 25, which many hosts block.</p>
`,
  },

  {
    slug: 'setup-cloudflare-wordpress',
    title: 'How to Set Up Cloudflare for WordPress: Step-by-Step (2026)',
    description: 'Set up Cloudflare for WordPress: add your domain on the Free plan, check DNS, change nameservers, set SSL to Full (strict) and avoid redirect loops.',
    date: '2026-11-10',
    service: 'wordpress-speed-optimization',
    serviceText: 'I set up Cloudflare, caching and image optimisation as part of WordPress speed work, and check that forms, logins and checkout still work afterwards.',
    time: '30 minutes, plus up to 24 hours for the nameserver change',
    need: ['Login to your domain registrar', 'Login to your hosting (to confirm the site has a valid SSL certificate)', 'WordPress admin access', 'A free Cloudflare account'],
    linkFrom: [
      ['what-is-a-cdn', 'Want to try a CDN on your own site? The <a href="/tutorials/setup-cloudflare-wordpress/">Cloudflare for WordPress tutorial</a> covers the free plan, nameservers and the SSL setting that avoids redirect loops.'],
      ['wordpress-caching-explained', 'Cloudflare adds a caching layer in front of your server; see <a href="/tutorials/setup-cloudflare-wordpress/">how to set up Cloudflare for WordPress</a> step by step.'],
    ],
    body: (s) => `
<p>To set up Cloudflare for WordPress, create a free Cloudflare account, <strong>add your domain</strong> and pick the Free plan, check the imported DNS records, replace your registrar's nameservers with the two Cloudflare gives you, then set <strong>SSL/TLS</strong> to <strong>Full (strict)</strong> and turn on <strong>Always Use HTTPS</strong>. The site keeps its hosting; Cloudflare sits in front as a proxy and CDN.</p>
<p>New to CDNs? <a href="/blog/what-is-a-cdn/">What a CDN is and when you need one</a> explains what Cloudflare changes and what it cannot fix (a slow server is still slow on uncached pages).</p>

<h2>Step 1: Make sure your site already has SSL</h2>
<p>Open your site at <code>https://</code> and check there is a valid padlock with no warning. Most Indian hosts (Hostinger, cPanel hosts) issue a free certificate. Cloudflare's safest mode, Full (strict), needs this certificate on the server. If it is missing, fix it first using <a href="/blog/ssl-certificate-errors-fix/">SSL certificate errors and how to fix them</a>.</p>

<h2>Step 2: Add your domain to Cloudflare</h2>
${path_('Cloudflare dashboard &gt; Account home &gt; Add a domain (older dashboards: Add a site)')}
<ol>
  <li>Sign up or log in at Cloudflare and click <strong>Add a domain</strong>.</li>
  <li>Enter <code>yourdomain.com</code> and keep the quick DNS scan selected.</li>
  <li>Choose the <strong>Free</strong> plan and continue.</li>
</ol>
${fig(s, 1, 'How to set up Cloudflare for WordPress: Cloudflare Add a domain screen with the Free plan highlighted', 'Step 2: Add a domain, keep the DNS scan on and choose the Free plan.')}

<h2>Step 3: Check the imported DNS records</h2>
${path_('Cloudflare &gt; your domain &gt; DNS &gt; Records')}
<p>Cloudflare copies the records it can find. Compare them with your registrar or host DNS page, line by line:</p>
<ul>
  <li>The <strong>A record</strong> for <code>@</code> and the <code>www</code> record should point to your hosting server and be <strong>Proxied</strong> (orange cloud).</li>
  <li><strong>MX</strong> records and mail-related A records (such as <code>mail</code>) must exist and be <strong>DNS only</strong> (grey cloud). Email cannot pass through the Cloudflare proxy.</li>
  <li><strong>TXT</strong> records for SPF, DKIM, DMARC and Google verification must all be copied. Missing DKIM records are the usual cause of email problems after a Cloudflare move.</li>
</ul>
<p>Add anything missing by hand before you change nameservers. This is the step that decides whether the switch is invisible or breaks email.</p>

<h2>Step 4: Change the nameservers at your registrar</h2>
${path_('Registrar &gt; Domains &gt; yourdomain.com &gt; DNS / Nameservers &gt; Change nameservers (in Hostinger hPanel: Domains &gt; your domain &gt; DNS / Nameservers)')}
<ol>
  <li>Cloudflare shows two nameservers assigned to your account, such as <code>name1.ns.cloudflare.com</code>. Your pair will have different names.</li>
  <li>At the registrar, choose <strong>Change nameservers</strong> (or Custom nameservers), replace the existing ones with exactly those two, and save.</li>
  <li>If your registrar has DNSSEC turned on, turn it off first, then re-enable it later from Cloudflare.</li>
</ol>
${fig(s, 2, 'Domain registrar nameservers screen with Change nameservers selected and two Cloudflare nameservers entered, highlighted', 'Step 4: Replace the registrar nameservers with the exact pair Cloudflare assigns to you.')}
<p>Cloudflare emails you when the domain is active. This often takes under an hour but can take up to a day. The site stays online during the change.</p>

<h2>Step 5: Set SSL/TLS to Full (strict) and force HTTPS</h2>
${path_('Cloudflare &gt; your domain &gt; SSL/TLS &gt; Overview, then SSL/TLS &gt; Edge Certificates')}
<ol>
  <li>In <strong>SSL/TLS &gt; Overview</strong>, set the encryption mode to <strong>Full (strict)</strong>. Newer dashboards may show an automatic mode; switch it to custom Full (strict) if your server has a valid certificate.</li>
  <li>In <strong>SSL/TLS &gt; Edge Certificates</strong>, turn on <strong>Always Use HTTPS</strong>.</li>
</ol>
${fig(s, 3, 'Cloudflare SSL/TLS Overview with the Full (strict) encryption mode selected and highlighted', 'Step 5: Full (strict) encrypts all the way to your server. Avoid Flexible on WordPress.')}
<p>Do not use <strong>Flexible</strong>. WordPress (or your host) forces HTTPS, Cloudflare connects over HTTP, and the two keep redirecting each other: the "too many redirects" error.</p>

<h2>Step 6: Tidy up caching inside WordPress</h2>
<ul>
  <li>Keep your existing page cache plugin (LiteSpeed Cache, WP Rocket and so on). Cloudflare's free plan caches static files such as images, CSS and JS by default, not HTML pages.</li>
  <li>Turn off any "minify" or "Rocket Loader" style options in Cloudflare if your cache plugin already optimises files, so the same work is not done twice. Test forms and checkout after any change.</li>
  <li>After a design change, purge both caches: your plugin's and <strong>Caching &gt; Configuration &gt; Purge Everything</strong> in Cloudflare.</li>
  <li>If your host offers its own CDN, use one CDN, not both.</li>
</ul>
<p>Read <a href="/blog/wordpress-caching-explained/">WordPress caching explained</a> for how the layers fit together.</p>

<h2>Troubleshooting</h2>
<ul>
  <li><strong>Too many redirects:</strong> SSL mode is Flexible. Switch to Full (strict).</li>
  <li><strong>Error 526 (invalid SSL certificate):</strong> the server's certificate is missing or expired. Reissue it at your host, or use Full (not strict) temporarily while you fix it.</li>
  <li><strong>Email stopped:</strong> an MX or DKIM record was not copied, or a mail record is proxied. Set mail records to DNS only.</li>
  <li><strong>Changes not showing:</strong> purge Cloudflare's cache and your plugin's cache, then check in a private window.</li>
</ul>

<h2>FAQs</h2>
<h3>Is Cloudflare free for WordPress?</h3>
<p>Yes, the Free plan covers DNS, the CDN for static files, free SSL at the edge and basic DDoS protection. Paid plans and add-ons add features such as full-page caching for WordPress.</p>
<h3>Does Cloudflare make WordPress faster?</h3>
<p>It speeds up images, CSS and JS for visitors far from your server, and absorbs bad traffic. It does not fix a slow server or heavy plugins on uncached pages.</p>
<h3>Can I use Cloudflare without changing nameservers?</h3>
<p>On the Free plan, no. The standard setup needs Cloudflare's nameservers; partial (CNAME) setup is limited to paid plans.</p>
`,
  },

  {
    slug: 'enable-cash-on-delivery-shopify',
    title: 'How to Enable COD on Shopify in India: Step-by-Step (2026)',
    description: 'Enable Cash on Delivery on Shopify in India: add the COD manual payment method in Settings > Payments, write checkout instructions, test it and cut RTO.',
    date: '2026-11-10',
    service: 'shopify-developer',
    serviceText: 'I set up Shopify stores for Indian brands: payments, COD rules, shipping, GST and the courier integration, tested end to end.',
    time: '10 to 15 minutes',
    need: ['A Shopify store with Settings access (owner or staff with payments permission)', 'Your courier or shipping aggregator already supporting COD collection for your pincodes', 'Your COD rules decided: any order limits, fees or areas you will not serve'],
    linkFrom: [
      ['woocommerce-cash-on-delivery-india', 'Selling on Shopify instead? The tutorial on <a href="/tutorials/enable-cash-on-delivery-shopify/">how to enable COD on Shopify in India</a> covers the manual payment method and testing.'],
      ['woocommerce-vs-shopify-india', 'Both platforms handle cash on delivery; on Shopify it is a manual payment method, shown step by step in <a href="/tutorials/enable-cash-on-delivery-shopify/">this Shopify COD tutorial</a>.'],
    ],
    body: (s) => `
<p>To enable Cash on Delivery on Shopify, go to <strong>Settings &gt; Payments</strong>, find <strong>Manual payment methods</strong>, click <strong>+ Manual payment method</strong>, choose <strong>Cash on Delivery (COD)</strong>, add the details customers see at checkout, and click <strong>Activate</strong>. COD then appears next to your online gateway at checkout.</p>
<p>COD is still expected by many Indian shoppers, but it brings returned-to-origin (RTO) costs. This tutorial covers switching it on and the settings that keep it under control. The WooCommerce version is in <a href="/blog/woocommerce-cash-on-delivery-india/">cash on delivery on WooCommerce in India</a>.</p>

<h2>Step 1: Confirm your courier can collect COD</h2>
<p>Shopify only shows the COD option; the cash is collected by your courier or shipping aggregator and remitted to you. Before you switch it on, check in your shipping account that COD is enabled, which pincodes are serviceable for COD, and how often remittances are paid. Turning on COD for areas your courier cannot serve leads to cancelled orders.</p>

<h2>Step 2: Open Manual payment methods</h2>
${path_('Shopify admin &gt; Settings &gt; Payments &gt; Manual payment methods')}
<ol>
  <li>In Shopify admin, click <strong>Settings</strong>, then <strong>Payments</strong>.</li>
  <li>Leave your online provider (Razorpay, PayU, Cashfree, PhonePe and so on) as it is.</li>
  <li>Scroll to <strong>Manual payment methods</strong> and click <strong>+ Manual payment method</strong>.</li>
  <li>Choose <strong>Cash on Delivery (COD)</strong> from the list.</li>
</ol>
${fig(s, 1, 'How to enable COD on Shopify: Settings Payments with the Manual payment method list open and Cash on Delivery (COD) highlighted', 'Step 2: Settings &gt; Payments &gt; Manual payment methods &gt; + Manual payment method &gt; Cash on Delivery (COD).')}

<h2>Step 3: Write the checkout details and activate</h2>
${path_('Cash on Delivery (COD) setup panel')}
<ol>
  <li><strong>Additional details:</strong> one short line shown under the COD option at checkout, for example "Pay in cash or UPI when your order arrives."</li>
  <li><strong>Payment instructions:</strong> shown on the order status page and in the confirmation email, for example delivery timelines and that the courier collects the amount.</li>
  <li>Click <strong>Activate Cash on Delivery (COD)</strong>.</li>
</ol>
${fig(s, 2, 'Shopify Cash on Delivery setup with Additional details and Payment instructions filled in and the Activate button highlighted', 'Step 3: Add a short checkout line and payment instructions, then Activate.')}
<p>Only promise "UPI on delivery" if your courier actually offers it in your areas.</p>

<h2>Step 4: Place a test COD order</h2>
${path_('Your storefront checkout, then Shopify admin &gt; Orders')}
<ol>
  <li>Open your store in a private window, add a product and go to checkout.</li>
  <li>Select <strong>Cash on Delivery (COD)</strong> and complete the order.</li>
  <li>In <strong>Orders</strong>, the order shows payment status <strong>Payment pending</strong>. That is correct for COD.</li>
  <li>Check the confirmation email shows your payment instructions, then cancel the test order.</li>
</ol>
${fig(s, 3, 'Shopify checkout payment section with the Cash on Delivery (COD) option selected and highlighted below the online gateway', 'Step 4: COD shows below your online gateway. Place a test order and check it arrives as Payment pending.')}

<h2>Step 5: Mark COD orders as paid after delivery</h2>
<p>When the courier remits the cash, open each order and click <strong>Collect payment &gt; Mark as paid</strong> (or let your shipping app do it automatically if it supports that). Keeping this up to date makes your sales reports and GST records match what you actually received. For invoices, see <a href="/blog/woocommerce-gst-invoices-india/">GST invoices for online stores in India</a>; the same GST rules apply on Shopify.</p>

<h2>Step 6: Reduce fake orders and RTO</h2>
<p>Shopify's built-in COD option has no limits of its own: it is on for every order. Common controls Indian stores add:</p>
<ul>
  <li><strong>Hide COD above an order value or for some pincodes</strong> with a payment customisation app from the Shopify App Store.</li>
  <li><strong>Confirm COD orders by WhatsApp or call</strong> before shipping. Several apps automate this.</li>
  <li><strong>Prepaid nudges:</strong> a small prepaid discount or free shipping on prepaid orders, set up with discounts in Shopify.</li>
  <li><strong>A COD fee:</strong> Shopify does not add one natively; it needs an app. Be transparent about it before checkout.</li>
</ul>
<p>Test checkout again after installing any of these, because payment apps can conflict with each other.</p>

<h2>Troubleshooting</h2>
<ul>
  <li><strong>COD not showing at checkout:</strong> check it is active in Settings &gt; Payments, and that no payment customisation app is hiding it for your test cart or address.</li>
  <li><strong>COD shows for international customers:</strong> use a payment customisation to limit it to India, or check your markets settings.</li>
  <li><strong>Orders stay "Payment pending" forever:</strong> mark them paid after remittance, or connect your shipping app's COD reconciliation.</li>
</ul>

<h2>FAQs</h2>
<h3>Is cash on delivery available on Shopify in India?</h3>
<p>Yes. Cash on Delivery (COD) is a built-in manual payment method in Shopify, available on all plans. The courier collects the money.</p>
<h3>Does Shopify charge transaction fees on COD orders?</h3>
<p>Shopify's policy on transaction fees for manual payment methods depends on your plan and payment setup; check the current terms in your Shopify plan and billing settings.</p>
<h3>Can I limit COD by order value on Shopify?</h3>
<p>Not with the built-in option alone. Use a payment customisation app to hide COD above a value or for certain pincodes.</p>
`,
  },

  {
    slug: 'setup-301-redirects-wordpress',
    title: 'How to Add 301 Redirects in WordPress: Step-by-Step (2026)',
    description: 'Add 301 redirects in WordPress with the free Redirection plugin: add old and new URLs, fix 404s from the log, use regex for old date URLs and test.',
    date: '2026-11-10',
    service: 'wordpress-migration',
    serviceText: 'I plan redirect maps for redesigns and migrations so old URLs, rankings and backlinks carry over to the new site.',
    time: '15 minutes for a few redirects; longer for a full redesign map',
    need: ['WordPress admin access', 'A list of old URLs and where each should go (a spreadsheet works)', 'Ideally, a recent backup (see the backup guide)'],
    linkFrom: [
      ['301-vs-302-redirects', 'Ready to add one? Follow the tutorial on <a href="/tutorials/setup-301-redirects-wordpress/">how to add 301 redirects in WordPress</a> with the free Redirection plugin.'],
      ['redesign-website-without-losing-rankings', 'For the redirect map itself, the <a href="/tutorials/setup-301-redirects-wordpress/">WordPress 301 redirects tutorial</a> shows how to add, test and monitor redirects after launch.'],
    ],
    body: (s) => `
<p>To add a 301 redirect in WordPress, install the free <strong>Redirection</strong> plugin, open <strong>Tools &gt; Redirection</strong>, enter the old path as the <strong>Source URL</strong> and the new address as the <strong>Target URL</strong>, and click <strong>Add Redirect</strong>. Redirection uses 301 (permanent) by default, and its 404s tab shows broken URLs that need one.</p>
<p>When to use a 301 rather than a 302 is covered in <a href="/blog/301-vs-302-redirects/">301 vs 302 redirects explained</a>. This page is the how-to.</p>

<h2>Step 1: Install Redirection and run the setup</h2>
${path_('WordPress admin &gt; Plugins &gt; Add New Plugin, then Tools &gt; Redirection')}
<ol>
  <li>Go to <strong>Plugins &gt; Add New Plugin</strong>, search <strong>Redirection</strong> (by John Godley) and install and activate it.</li>
  <li>Open <strong>Tools &gt; Redirection</strong>. The first time, a short setup runs.</li>
  <li>Keep <strong>Monitor permalink changes</strong> on (it adds a redirect automatically when you change a post's slug) and <strong>Keep a log of redirects and 404 errors</strong> on.</li>
  <li>Finish the setup so it creates its database tables.</li>
</ol>
<p>If you already use an SEO plugin with redirects (for example Rank Math's redirection module), use one tool, not both, so you have one list to maintain.</p>

<h2>Step 2: Add a single 301 redirect</h2>
${path_('Tools &gt; Redirection &gt; Redirects &gt; Add new redirection')}
<ol>
  <li><strong>Source URL:</strong> the old path only, starting with a slash, for example <code>/old-services-page/</code>. Leave out the domain.</li>
  <li><strong>Target URL:</strong> the new page, either a path (<code>/services/</code>) or a full URL.</li>
  <li><strong>Group:</strong> Redirections is fine.</li>
  <li>Click <strong>Add Redirect</strong>. The new row shows code 301 and a hit counter.</li>
</ol>
${fig(s, 1, 'How to add 301 redirects in WordPress: Tools Redirection add new redirection form with Source URL and Target URL highlighted', 'Step 2: Tools &gt; Redirection. Old path as Source URL, new page as Target URL, then Add Redirect (301 by default).')}
<p>Redirect each old URL to its closest equivalent page, not everything to the homepage. Google treats mass redirects to the homepage like missing pages.</p>

<h2>Step 3: Add many redirects at once</h2>
${path_('Tools &gt; Redirection &gt; Import/Export')}
<p>For a redesign or migration, build a two-column CSV (source, target) and import it from the <strong>Import/Export</strong> tab. Check a handful afterwards. The <a href="/blog/redesign-website-without-losing-rankings/">guide to redesigning without losing rankings</a> explains how to build that list from Search Console and your old sitemap.</p>

<h2>Step 4: Fix real 404s from the log</h2>
${path_('Tools &gt; Redirection &gt; 404s')}
<ol>
  <li>Open the <strong>404s</strong> tab. It lists URLs visitors and bots requested that do not exist, with a count.</li>
  <li>For a real old page (such as an old blog URL with hits), hover the row and click <strong>Add Redirect</strong>, then set the target.</li>
  <li>Ignore junk: bot probes for files like <code>wp-login.php.bak</code> or random strings do not need redirects.</li>
</ol>
${fig(s, 2, 'Redirection plugin 404s tab listing missing URLs with hit counts and the Add Redirect action highlighted', 'Step 4: The 404s tab shows missing URLs. Redirect the real old pages; ignore bot probes.')}

<h2>Step 5: Use a regex redirect for a URL pattern</h2>
${path_('Tools &gt; Redirection &gt; Add new redirection &gt; gear icon &gt; Regex')}
<p>If you changed permalinks from dated URLs (<code>/2024/05/12/post-name/</code>) to post-name URLs (<code>/post-name/</code>), one regular-expression redirect can cover every post:</p>
<ol>
  <li>Click the gear icon on the add form to show advanced options, and tick <strong>Regex</strong>.</li>
  <li>Source URL: <code>^/\\d{4}/\\d{2}/\\d{2}/(.*)$</code></li>
  <li>Target URL: <code>/$1</code></li>
  <li>HTTP code: <strong>301 - Moved Permanently</strong>. Add it, then test three or four old URLs.</li>
</ol>
${fig(s, 3, 'Redirection plugin add form with a regex source for old date-based URLs, the Regex option ticked and target /$1, highlighted', 'Step 5: A regex redirect sends every old date-based URL to the matching post-name URL.')}
<p>Regex redirects are powerful and easy to get wrong. Test on a staging site if you can (see <a href="/blog/staging-sites-explained/">staging sites explained</a>), and keep patterns specific.</p>

<h2>Step 6: Test every redirect</h2>
<ul>
  <li>Open each old URL in a private window and check it lands on the right page in one hop.</li>
  <li>Use a redirect checker or your browser's Network tab to confirm the status is <strong>301</strong>, not 302.</li>
  <li>Update internal links and menus to point at the new URLs directly; redirects are a safety net, not a replacement for correct links.</li>
  <li>Watch the 404s tab and Search Console's Pages report for a few weeks.</li>
</ul>

<h2>Troubleshooting</h2>
<ul>
  <li><strong>Redirect does nothing:</strong> a cached copy is being served. Purge your cache plugin and CDN cache, then retest.</li>
  <li><strong>Redirect loop:</strong> the target matches the source pattern (common with regex). Make the pattern stricter.</li>
  <li><strong>Old URL still shows the page:</strong> the old page still exists. Delete or unpublish it, or the redirect will not trigger.</li>
  <li><strong>Hit counter stays at zero:</strong> another redirect (host, .htaccess or SEO plugin) is catching the URL first.</li>
</ul>

<h2>FAQs</h2>
<h3>How do I add a 301 redirect in WordPress without a plugin?</h3>
<p>On Apache or LiteSpeed hosting you can add a <code>Redirect 301 /old/ https://yourdomain.com/new/</code> line to the .htaccess file. A plugin is safer for non-developers because a typo in .htaccess can take the site down.</p>
<h3>How long should I keep 301 redirects?</h3>
<p>Keep them for at least a year, and indefinitely for URLs with backlinks. They cost almost nothing to keep.</p>
<h3>Do 301 redirects pass SEO value?</h3>
<p>Yes. Google treats a 301 as a strong signal that the new URL replaces the old one, and rankings and links consolidate on the new page over time.</p>
`,
  },

  {
    slug: 'reset-wordpress-password-phpmyadmin',
    title: 'How to Reset WordPress Password in phpMyAdmin (2026)',
    description: 'Locked out and the reset email never arrives? Reset a WordPress admin password in phpMyAdmin: find the database, edit wp_users, set user_pass with MD5.',
    date: '2026-11-10',
    service: 'wordpress-maintenance',
    serviceText: 'I recover admin access, secure logins and keep WordPress sites updated and backed up every month.',
    time: '10 minutes',
    need: ['Login to your hosting control panel (hPanel, cPanel or similar)', 'Your WordPress username or admin email', 'A fresh backup of the database (one click in most panels)'],
    linkFrom: [
      ['regain-website-access-old-developer', 'If you have hosting access but not the WordPress login, you can <a href="/tutorials/reset-wordpress-password-phpmyadmin/">reset the WordPress password in phpMyAdmin</a> in about ten minutes.'],
      ['secure-wordpress-login', 'Locked out after tightening security? See <a href="/tutorials/reset-wordpress-password-phpmyadmin/">how to reset a WordPress password in phpMyAdmin</a>, then come back and set a strong one.'],
    ],
    body: (s) => `
<p>To reset a WordPress password in phpMyAdmin, open phpMyAdmin from your hosting panel, select the WordPress database, open the <strong>wp_users</strong> table, click <strong>Edit</strong> on your user, set the <strong>user_pass</strong> row's Function to <strong>MD5</strong>, type a new password in Value, and click <strong>Go</strong>. You can then log in with the new password; WordPress upgrades the stored hash to its stronger format on login.</p>
<p>Try the normal route first: click <strong>Lost your password?</strong> on <code>/wp-login.php</code>. Use phpMyAdmin when the reset email never arrives (often because email is not set up, see <a href="/tutorials/setup-smtp-wordpress/">how to set up SMTP in WordPress</a>) or the admin email belongs to someone who has left.</p>

<h2>Step 1: Back up the database</h2>
<p>You are editing the live database directly. Take a backup first: in Hostinger hPanel use <strong>Websites &gt; your site &gt; Backups</strong> or export from phpMyAdmin (<strong>Export &gt; Quick &gt; Go</strong>). If anything goes wrong, you restore it. The <a href="/blog/wordpress-backup-restore-guide/">WordPress backup and restore guide</a> covers both.</p>

<h2>Step 2: Find the right database</h2>
${path_('Hosting File Manager &gt; public_html &gt; wp-config.php')}
<p>Many hosting accounts have several databases. Open <code>wp-config.php</code> in the File Manager (view only, do not edit) and note two values:</p>
<ul>
  <li><code>DB_NAME</code>: the database your site uses.</li>
  <li><code>$table_prefix</code>: usually <code>wp_</code>, but often something custom such as <code>wpx7_</code>. Then the table is <code>wpx7_users</code>, not <code>wp_users</code>.</li>
</ul>

<h2>Step 3: Open phpMyAdmin</h2>
${path_('Hostinger hPanel: Databases &gt; phpMyAdmin &gt; Enter phpMyAdmin (cPanel: Databases &gt; phpMyAdmin)')}
<ol>
  <li>In hPanel, open <strong>Databases &gt; phpMyAdmin</strong>.</li>
  <li>Find the database that matches <code>DB_NAME</code> and click <strong>Enter phpMyAdmin</strong>.</li>
</ol>
${fig(s, 1, 'How to reset WordPress password in phpMyAdmin: Hostinger hPanel Databases phpMyAdmin with Enter phpMyAdmin highlighted', 'Step 3: hPanel &gt; Databases &gt; phpMyAdmin. Open the database named in DB_NAME.')}

<h2>Step 4: Edit your user in the users table</h2>
${path_('phpMyAdmin &gt; your database &gt; wp_users (or yourprefix_users) &gt; Browse')}
<ol>
  <li>In the left tree, click the <strong>users</strong> table with your prefix.</li>
  <li>On the <strong>Browse</strong> tab, find your row by <code>user_login</code> or <code>user_email</code>.</li>
  <li>Click <strong>Edit</strong> on that row.</li>
</ol>
${fig(s, 2, 'phpMyAdmin wp_users table selected with the Edit link on the admin user row highlighted', 'Step 4: Open the users table and click Edit on your own admin row.')}
<p>If you do not recognise any administrator accounts, stop: that can be a sign of a hacked site. See <a href="/blog/signs-wordpress-site-hacked/">signs your WordPress site is hacked</a>.</p>

<h2>Step 5: Set the new password with MD5</h2>
${path_('Edit row screen &gt; user_pass row')}
<ol>
  <li>In the <strong>user_pass</strong> row, set <strong>Function</strong> to <strong>MD5</strong>.</li>
  <li>In <strong>Value</strong>, delete the existing hash and type your new password in plain text. Use a long, unique password.</li>
  <li>Leave every other field alone and click <strong>Go</strong>.</li>
</ol>
${fig(s, 3, 'phpMyAdmin row editor with the MD5 function chosen for user_pass, a new password in the value box and the Go button highlighted', 'Step 5: Function MD5 on user_pass, type the new password, then Go.')}
<p>MD5 is only a temporary stand-in. On your first successful login WordPress rehashes the password with its modern, much stronger hashing, so you are not left with a weak MD5 hash.</p>

<h2>Step 6: Log in and secure the account</h2>
<ol>
  <li>Go to <code>yourdomain.com/wp-login.php</code> and log in with the new password.</li>
  <li>In <strong>Users &gt; Profile</strong>, confirm your email address is current, so future resets reach you.</li>
  <li>In <strong>Settings &gt; General</strong>, check the <strong>Administration Email Address</strong>.</li>
  <li>Remove administrator accounts nobody uses, and turn on two-factor login (see <a href="/blog/secure-wordpress-login/">how to secure the WordPress login</a>).</li>
</ol>

<h2>Alternative: WP-CLI</h2>
<p>If your host offers SSH (Hostinger: <strong>Advanced &gt; SSH Access</strong>), one command does the same job safely: <code>wp user update admin --user_pass="NewStrongPassword"</code>, run from the site folder. Replace <code>admin</code> with your username or user ID.</p>

<h2>Troubleshooting</h2>
<ul>
  <li><strong>New password is rejected:</strong> you edited the wrong database or table prefix, or a caching/security plugin is limiting login attempts. Check <code>DB_NAME</code> and the prefix again.</li>
  <li><strong>Login page redirects back to itself:</strong> clear browser cookies for the site, and check the site URL in <code>wp_options</code> (siteurl and home) matches your real address.</li>
  <li><strong>Login works but you are not an admin:</strong> the account's role was changed. That lives in the <code>usermeta</code> table; ask a developer rather than guessing.</li>
</ul>

<h2>FAQs</h2>
<h3>Is it safe to reset a WordPress password in phpMyAdmin?</h3>
<p>Yes, if you change only the user_pass field and have a backup. The MD5 value is replaced by a strong hash the first time you log in.</p>
<h3>Why is my WordPress password reset email not arriving?</h3>
<p>Usually the site has no working email setup, or the admin email is old. Fix email with SMTP and update the address once you are back in.</p>
<h3>Can I reset the WordPress password without hosting access?</h3>
<p>Only through the Lost your password email. Without email or hosting access you need whoever controls the hosting account.</p>
`,
  },

  {
    slug: 'change-wordpress-permalinks',
    title: 'How to Change WordPress Permalinks: Step-by-Step (2026)',
    description: 'Change WordPress permalinks to Post name without losing traffic: back up, switch in Settings > Permalinks, edit slugs, add 301 redirects and re-submit.',
    date: '2026-11-10',
    service: 'wordpress-seo-services',
    serviceText: 'I handle technical WordPress SEO, including URL structure changes, redirects and Search Console clean-up, without losing existing rankings.',
    time: '10 minutes on a new site; 1 to 2 hours on an established site with redirects and checks',
    need: ['WordPress admin access', 'A backup of the site', 'For established sites: a list of your top URLs from Search Console', 'The Redirection plugin (or your SEO plugin\'s redirect tool)'],
    linkFrom: [
      ['on-page-seo-checklist', 'If your URLs still look like <code>/?p=123</code> or include dates, follow the tutorial on <a href="/tutorials/change-wordpress-permalinks/">how to change WordPress permalinks</a> safely, with redirects.'],
      ['internal-linking-explained', 'Changing URL structure affects every internal link; the <a href="/tutorials/change-wordpress-permalinks/">WordPress permalinks tutorial</a> shows how to switch without breaking them.'],
    ],
    body: (s) => `
<p>To change WordPress permalinks, go to <strong>Settings &gt; Permalinks</strong>, choose <strong>Post name</strong> (<code>/%postname%/</code>) and click <strong>Save Changes</strong>. On a new site that is all. On a site that already has traffic, take a backup first, add 301 redirects from the old URL pattern to the new one, update internal links, and re-submit your sitemap in Search Console.</p>
<p>Changing one post's slug is different from changing the whole structure; both are covered below. For how URLs fit into on-page SEO, see the <a href="/blog/on-page-seo-checklist/">on-page SEO checklist</a>.</p>

<h2>Step 1: Decide whether to change at all</h2>
<p>On a brand-new site, switch to Post name before you publish. On an established site, change only if the current structure is genuinely poor (<code>/?p=123</code>, or long dated URLs for evergreen content). If your URLs are already readable, leave them: every change resets some signals while Google processes the redirects, and pages can dip for a few weeks.</p>

<h2>Step 2: Back up and export your current URLs</h2>
<ul>
  <li>Take a full backup (files and database). See the <a href="/blog/wordpress-backup-restore-guide/">backup and restore guide</a>.</li>
  <li>Save a copy of your current sitemap (usually <code>/sitemap_index.xml</code> or <code>/wp-sitemap.xml</code>) and export your top pages from Search Console's Performance report. These are the URLs you will test later.</li>
</ul>

<h2>Step 3: Choose Post name in Settings &gt; Permalinks</h2>
${path_('WordPress admin &gt; Settings &gt; Permalinks')}
<ol>
  <li>Open <strong>Settings &gt; Permalinks</strong>.</li>
  <li>Under Permalink structure, select <strong>Post name</strong>. It shows a preview such as <code>https://yourdomain.com/sample-post/</code>.</li>
  <li>Leave the optional category and tag bases empty unless you have a reason to change them.</li>
  <li>Click <strong>Save Changes</strong>. WordPress rewrites its URL rules immediately.</li>
</ol>
${fig(s, 1, 'How to change WordPress permalinks: Settings Permalinks screen with the Post name structure selected and highlighted', 'Step 3: Settings &gt; Permalinks &gt; Post name, then Save Changes.')}
<p>If you get 404 errors on every page after saving, WordPress could not write its rewrite rules. Click Save Changes once more; if that fails, your host needs to allow .htaccess rewrites (or, on Nginx, add the WordPress rewrite rule).</p>

<h2>Step 4: Tidy individual slugs</h2>
${path_('Posts &gt; edit a post &gt; Post sidebar &gt; Slug (or URL)')}
<p>With Post name on, each URL is the post's slug. Shorten long auto-generated slugs to the main words, for example <code>website-cost</code> rather than <code>how-much-does-a-website-cost-in-2026-complete-guide</code>.</p>
${fig(s, 2, 'WordPress block editor post sidebar with the Slug field highlighted', 'Step 4: In the post sidebar, edit the slug: short, lower case, main keyword first.')}
<p>WordPress remembers a published post's old slug and redirects it automatically in most cases, and the Redirection plugin (with Monitor permalink changes on) adds a proper 301 as well. Even so, only change slugs on pages that matter if you have a clear reason.</p>

<h2>Step 5: Redirect the old URL pattern</h2>
${path_('Tools &gt; Redirection &gt; Add new redirection (Regex)')}
<p>WordPress sometimes guesses the new address for an old dated URL, but do not rely on it. Add one regex 301 redirect instead. For a Day and name structure, the source <code>^/\\d{4}/\\d{2}/\\d{2}/(.*)$</code> with target <code>/$1</code> covers every post. The full steps are in the tutorial on <a href="/tutorials/setup-301-redirects-wordpress/">how to add 301 redirects in WordPress</a>.</p>
<p>Then test five or six old URLs from your export: each should reach the new URL in a single 301 hop.</p>

<h2>Step 6: Update internal links, sitemap and Search Console</h2>
${path_('Google Search Console &gt; URL inspection and Sitemaps')}
<ol>
  <li>Update menus and important internal links to the new URLs. A search-and-replace plugin can update old URLs inside post content; back up first. See <a href="/blog/internal-linking-explained/">internal linking explained</a> for why direct links beat chains of redirects.</li>
  <li>Purge your cache plugin and CDN.</li>
  <li>In Search Console, submit your sitemap again under <strong>Sitemaps</strong>.</li>
  <li>Use <strong>URL inspection</strong> on your top five new URLs, click <strong>Test live URL</strong>, then <strong>Request indexing</strong>.</li>
</ol>
${fig(s, 3, 'Google Search Console URL Inspection for a new permalink with the Request indexing link highlighted', 'Step 6: Inspect your key new URLs in Search Console and request indexing.')}
<p>Watch the Pages report for "Not found (404)" over the next few weeks and redirect anything you missed.</p>

<h2>Troubleshooting</h2>
<ul>
  <li><strong>Every page shows 404 after the change:</strong> rewrite rules were not saved. Save permalinks again, check .htaccess is writable, or ask your host.</li>
  <li><strong>Old URLs show the homepage:</strong> a plugin is redirecting all 404s to the homepage. Turn that off and use proper one-to-one redirects.</li>
  <li><strong>Redirect chains:</strong> an old redirect points to another redirect. Update the first one to point straight at the final URL.</li>
  <li><strong>WooCommerce product URLs did not change:</strong> products use their own base, set in the Product permalinks section on the same Settings &gt; Permalinks page.</li>
</ul>

<h2>FAQs</h2>
<h3>What is the best permalink structure for WordPress?</h3>
<p>Post name (<code>/%postname%/</code>) suits most business sites and blogs: short, readable and not tied to a date.</p>
<h3>Will changing WordPress permalinks hurt SEO?</h3>
<p>There is usually a temporary dip on an established site. With 301 redirects from every old URL and updated internal links, rankings normally settle on the new URLs.</p>
<h3>How do I change the permalink of a single page in WordPress?</h3>
<p>Edit the page, open the Page settings sidebar, change the Slug (or URL) field and update. Add a 301 from the old URL if the page was already indexed.</p>
`,
  },
];

// Extra section per tutorial, inserted before its Troubleshooting heading
const EXTRA = {
  'add-razorpay-to-woocommerce': `
<h2>After launch: what to check in the first week</h2>
<p>A payment setup that passes one test can still fail on real traffic. In the first week, check these each day for a few minutes:</p>
<ul>
  <li><strong>Match orders to payments.</strong> In Razorpay, open Transactions &gt; Payments and compare the captured payments with WooCommerce orders in Processing. Every captured payment should have an order, and every Processing order should have a payment ID in its notes.</li>
  <li><strong>Look at failed and pending orders.</strong> A few "Pending payment" orders are normal (people abandon the popup). A pending order with a matching captured payment in Razorpay means the webhook did not reach your site.</li>
  <li><strong>Check the webhook log.</strong> Each webhook in the Razorpay Dashboard shows recent deliveries. Repeated failures usually point to a firewall, a security plugin or a maintenance-mode plugin blocking requests.</li>
  <li><strong>Watch the settlement.</strong> Razorpay settles funds to your bank account on its own schedule. Make sure the first settlement arrives in the account you expect, and that the bank details in your Razorpay account are correct.</li>
  <li><strong>Refund once.</strong> Refund one small order from the Razorpay Dashboard (or from the WooCommerce order screen if your plugin version supports it) and confirm the order notes and status update.</li>
</ul>
<p>Also keep the plugin updated. Payment plugins change with WooCommerce's checkout, and an outdated version is a common reason Razorpay disappears from the block checkout after a WooCommerce update. Update on a staging copy first if your store is busy.</p>
`,
  'connect-domain-to-shopify': `
<h2>Moving from WordPress or another platform? Plan the switch</h2>
<p>If the domain currently shows a live website, the moment the A record changes, visitors start seeing Shopify instead. A little planning avoids a broken day:</p>
<ul>
  <li><strong>Finish the store first.</strong> Products, policies, payments and shipping should be ready, and the store password (Online Store &gt; Preferences) removed, before you change DNS.</li>
  <li><strong>Lower the TTL a day ahead.</strong> If your registrar lets you edit TTL, set the A and www records to a short value (such as 300 seconds) the day before. The switch then spreads faster, and so does a rollback.</li>
  <li><strong>List your old URLs.</strong> Export the old sitemap and your top pages from Search Console. Shopify URLs follow fixed patterns (<code>/products/</code>, <code>/collections/</code>, <code>/pages/</code>, <code>/blogs/news/</code>), so most old URLs need a redirect.</li>
  <li><strong>Keep the old hosting for a few weeks.</strong> Do not cancel it the same day. You may need old files, images or the database, and your email may still be hosted there.</li>
  <li><strong>Check subdomains.</strong> If you use subdomains such as <code>blog.yourdomain.com</code> or <code>shop.yourdomain.com</code> for other services, leave their records alone; only <code>@</code> and <code>www</code> move to Shopify.</li>
</ul>
<p>Switch on a quiet day and time, not during a sale or festival campaign, and test checkout on the live domain once the padlock appears.</p>
`,
  'setup-smtp-wordpress': `
<h2>SMTP or a transactional email service?</h2>
<p>"Other SMTP" with your normal mailbox is the simplest setup and is fine for a business site sending contact form notifications. A busier site, especially a WooCommerce store sending order, shipping and password emails to customers, can outgrow it:</p>
<ul>
  <li><strong>Mailbox sending limits.</strong> Business mailboxes have daily sending limits set by the provider. A sale or a newsletter-style plugin can hit them, and then every email fails until the limit resets.</li>
  <li><strong>Reputation is shared.</strong> If WordPress emails are marked as spam, the same mailbox you use for client emails can be affected.</li>
  <li><strong>Transactional services</strong> (the dedicated mailers WP Mail SMTP lists, such as SendLayer, Brevo, Mailgun, Postmark or Amazon SES) are built for automated emails, give delivery logs, and connect through an API key instead of a password.</li>
</ul>
<p>If you switch to one, you will add DNS records the service gives you (usually DKIM and sometimes a return-path CNAME) and choose that mailer in WP Mail SMTP instead of Other SMTP. The test step is the same.</p>
<p>Whichever you use, make one person responsible for the mailbox or service login. When that login lives with a former developer, email setups break silently and nobody notices until enquiries stop. The <a href="/blog/website-ownership-checklist/">website ownership checklist</a> covers which accounts you should hold yourself.</p>
`,
  'setup-cloudflare-wordpress': `
<h2>Settings worth leaving alone at first</h2>
<p>Cloudflare has many switches, and turning everything on is the fastest way to break a WordPress site. For the first week, change only what this tutorial covers, then add more one at a time and test after each:</p>
<ul>
  <li><strong>Security level and bot settings:</strong> aggressive settings can challenge real visitors, payment gateway callbacks (such as Razorpay webhooks) and uptime monitors. If you tighten them, check that webhooks still arrive.</li>
  <li><strong>Cache rules that cache everything:</strong> caching full HTML pages without excluding <code>/wp-admin/</code>, the login page, cart, checkout and my-account pages will show one user's data to another. Leave HTML caching to your WordPress cache plugin or a purpose-built WordPress option.</li>
  <li><strong>Email obfuscation and similar content rewrites:</strong> these alter your HTML and can interfere with forms or scripts. Try them only if you know why you need them.</li>
  <li><strong>Development Mode:</strong> handy while designing, because it bypasses Cloudflare's cache for a few hours. Remember it switches itself off.</li>
</ul>
<p>Keep a short note of every Cloudflare setting you change and the date. When something breaks weeks later, that note turns an hour of guessing into a two-minute fix. If you have a security plugin with its own firewall, read <a href="/blog/wordpress-firewall-waf-explained/">WordPress firewalls explained</a> to understand how Cloudflare's edge protection and a plugin firewall overlap.</p>
`,
  'enable-cash-on-delivery-shopify': `
<h2>Write COD terms customers can find</h2>
<p>COD disputes usually come from unclear expectations, not from the setting itself. Add a short COD section to your shipping policy (Settings &gt; Policies) and link it from the product page or cart:</p>
<ul>
  <li><strong>Where COD is available.</strong> Say that COD depends on the delivery pincode, if that is true for your courier.</li>
  <li><strong>How customers can pay.</strong> Cash only, or cash and UPI at the door, as your courier actually supports.</li>
  <li><strong>Any limits or fees.</strong> If you hide COD above an order value or add a fee through an app, state it plainly before checkout.</li>
  <li><strong>What happens on refusal.</strong> Explain your policy for orders refused at the door, and whether repeat refusals lose COD access.</li>
  <li><strong>Returns and refunds for COD orders.</strong> Since there is no card or UPI payment to reverse, say how refunds are paid (for example to a bank account or UPI ID the customer provides).</li>
</ul>
<p>Keep the same wording in your COD "Payment instructions" and the order confirmation email so the message is consistent. Clear terms also help if you later apply for a payment gateway or marketplace account, which often review your policy pages. For more on product pages that answer these questions up front, see <a href="/blog/woocommerce-product-page-optimization/">product page optimisation</a>; the same principles apply on Shopify.</p>
`,
  'setup-301-redirects-wordpress': `
<h2>Which redirects you actually need</h2>
<p>You do not need a redirect for every URL that ever existed. Prioritise like this:</p>
<ol>
  <li><strong>Pages with traffic or rankings:</strong> anything that appears in Search Console's Performance report in the last few months.</li>
  <li><strong>Pages with backlinks:</strong> check the Links report in Search Console (Top linked pages). Losing these loses the value of those links.</li>
  <li><strong>URLs printed or shared offline:</strong> brochures, visiting cards, QR codes, Google Business Profile, WhatsApp catalogues and old emails.</li>
  <li><strong>Old pages people still visit:</strong> the 404s tab will show these within days of a change.</li>
</ol>
<p>Pages with no traffic, no links and no close replacement can simply return a 404 (or 410 if you removed them on purpose). That is normal and does not harm the rest of the site.</p>
<p>Keep one master list (a spreadsheet with old URL, new URL and date) alongside the plugin. When the site is redesigned again, you will need it to update old redirects so they point straight at the newest URLs instead of forming chains. Also add a <a href="/blog/helpful-404-pages/">helpful 404 page</a> with search and key links, for the visits that slip through.</p>
`,
  'reset-wordpress-password-phpmyadmin': `
<h2>Other ways to get back in</h2>
<p>phpMyAdmin is the most universal method, but depending on what you can access, one of these may be quicker:</p>
<ul>
  <li><strong>Your host's WordPress tools.</strong> Many managed panels have a WordPress section with a one-click login or a password change for the admin user. In Hostinger, look under <strong>Websites &gt; your site &gt; WordPress</strong> for the admin login and dashboard tools.</li>
  <li><strong>Another administrator.</strong> If a colleague or agency still has an admin login, they can go to <strong>Users &gt; All Users</strong>, edit your account and click <strong>Set New Password</strong>. This is the safest route.</li>
  <li><strong>Create a temporary admin.</strong> A developer can add a new administrator through WP-CLI (<code>wp user create</code>) and delete it after you are back in.</li>
  <li><strong>Fix email, then use Lost your password.</strong> If the only problem is that reset emails do not arrive, setting up SMTP solves this and every other email problem at once.</li>
</ul>
<p>If none of these are possible because you do not have hosting access either, the problem is account ownership rather than passwords. <a href="/blog/regain-website-access-old-developer/">Regaining website access from an old developer</a> covers how to get the hosting, domain and admin logins transferred to you, and which ones you should always hold in your own name.</p>
`,
  'change-wordpress-permalinks': `
<h2>Category and tag bases, and other URL settings</h2>
<p>Settings &gt; Permalinks has a few more options that affect URLs. Most sites should leave them as they are:</p>
<ul>
  <li><strong>Category base and Tag base:</strong> empty means WordPress uses <code>/category/</code> and <code>/tag/</code>. Changing them changes every archive URL, which then needs redirects too.</li>
  <li><strong>Including the category in post URLs</strong> (<code>/%category%/%postname%/</code>): it looks organised, but the URL changes whenever you recategorise a post, and posts in several categories can be confusing. Post name alone is easier to maintain.</li>
  <li><strong>Trailing slashes:</strong> WordPress adds them for you with these structures. Keep internal links consistent with that (with the slash) so you do not create redirects on every click.</li>
  <li><strong>Product permalinks (WooCommerce):</strong> the shop base and product category base are set further down the same page. On an existing store, treat a change here as seriously as changing post permalinks.</li>
</ul>
<p>Pages (as opposed to posts) always use their slug and parent page, for example <code>/services/web-design/</code>, whatever structure you choose. To change a page's URL, change its slug or its parent in the page settings. Plan the page hierarchy with your menu, as described in <a href="/blog/website-navigation-structure/">planning website navigation</a>.</p>
`,
};
for (const t of TUTORIALS) {
  const x = EXTRA[t.slug]; if (!x) continue;
  const b = t.body;
  t.body = s => b(s).replace('<h2>Troubleshooting</h2>', x.trim() + '\n\n<h2>Troubleshooting</h2>');
}

module.exports = TUTORIALS;
