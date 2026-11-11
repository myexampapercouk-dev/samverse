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

  {
    slug: 'install-ssl-wordpress',
    title: 'How to Install an SSL Certificate on WordPress (2026)',
    description: 'Install a free SSL certificate on WordPress: issue it in your hosting panel, switch both URLs to https, force HTTPS and fix mixed content.',
    date: '2026-11-11',
    service: 'wordpress-maintenance',
    serviceText: 'I move WordPress sites to HTTPS, fix mixed content and redirects, and keep certificates renewing as part of WordPress maintenance.',
    time: '20 to 40 minutes (the certificate itself can take up to a few hours to issue)',
    need: ['Login to your hosting panel (hPanel, cPanel or similar)', 'WordPress admin access', 'A full backup taken today', 'Your domain already pointing at the hosting'],
    linkFrom: [
      ['ssl-certificate-errors-fix', 'If your site has no certificate at all yet, follow the tutorial on <a href="/tutorials/install-ssl-wordpress/">how to install an SSL certificate on WordPress</a>, from the hosting panel to forcing HTTPS.'],
      ['domain-hosting-ssl-explained', 'For the hands-on part on a WordPress site, see <a href="/tutorials/install-ssl-wordpress/">installing an SSL certificate on WordPress step by step</a>.'],
    ],
    body: (s) => `
<p>To install an SSL certificate on WordPress, issue the free certificate (usually Let's Encrypt) in your hosting panel, change both the <strong>WordPress Address</strong> and <strong>Site Address</strong> in <strong>Settings &gt; General</strong> to <code>https://</code>, redirect all HTTP traffic to HTTPS, and replace old <code>http://</code> links in the database so there is no mixed content. Most hosts include the certificate free and renew it automatically.</p>
<p>If you see "Not secure" or "Your connection is not private" after this, read <a href="/blog/ssl-certificate-errors-fix/">SSL certificate errors explained</a> for what each message means.</p>

<h2>Step 1: Take a backup</h2>
${path_('Hosting panel &gt; Backups, or your backup plugin')}
<p>Switching to HTTPS changes the site address. If something goes wrong you can be locked out of the admin, so take a full backup (files and database) first. The <a href="/tutorials/backup-wordpress-updraftplus/">UpdraftPlus backup tutorial</a> shows one way to do it.</p>

<h2>Step 2: Issue the free SSL certificate in your hosting panel</h2>
${path_('hPanel &gt; Security &gt; SSL (cPanel: SSL/TLS Status or Let\'s Encrypt)')}
<ol>
  <li>Log in to your hosting panel and open the <strong>SSL</strong> section.</li>
  <li>Find your domain. If the status is not Active, click <strong>Install SSL</strong> (or Run AutoSSL in cPanel).</li>
  <li>Choose the free certificate and make sure it covers both <code>yourdomain.com</code> and <code>www.yourdomain.com</code>.</li>
</ol>
${fig(s, 1, 'How to install an SSL certificate on WordPress: hosting panel SSL page with the Install SSL button highlighted', 'Step 2: In the hosting panel SSL page, install the free certificate for the domain and www.')}
<p>Issuing can take from a few minutes to a few hours. It fails if the domain does not yet point at this hosting, so check DNS first.</p>

<h2>Step 3: Check the certificate in the browser</h2>
<p>Open <code>https://yourdomain.com</code> in a private window. You should see the padlock (the page may still show warnings about insecure content; that is fixed in Step 6). If the browser says the certificate is for another name, the certificate has not finished issuing or does not cover that variant.</p>

<h2>Step 4: Change the WordPress and Site Address to https</h2>
${path_('WordPress admin &gt; Settings &gt; General')}
<ol>
  <li>Go to <strong>Settings &gt; General</strong>.</li>
  <li>Change <strong>WordPress Address (URL)</strong> and <strong>Site Address (URL)</strong> from <code>http://</code> to <code>https://</code>. Keep www or non-www exactly as it was.</li>
  <li>Click <strong>Save Changes</strong>. WordPress logs you out; log back in on the https address.</li>
</ol>
${fig(s, 2, 'WordPress Settings General with WordPress Address and Site Address both changed to https highlighted', 'Step 4: Both address fields start with https://. Save, then log back in.')}

<h2>Step 5: Force HTTPS with a 301 redirect</h2>
${path_('Hosting panel &gt; Force HTTPS toggle, or .htaccess in the site root')}
<p>Many panels have a <strong>Force HTTPS</strong> switch next to the certificate. Turn it on. If yours does not, add this at the top of <code>.htaccess</code> on Apache or LiteSpeed hosting:</p>
<pre><code>RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [L,R=301]</code></pre>
<p>Test by opening <code>http://yourdomain.com/any-page/</code>: it should land on the https version of the same page in one hop.</p>

<h2>Step 6: Fix mixed content</h2>
${path_('WordPress admin &gt; Tools &gt; Better Search Replace')}
<p>Old posts and page-builder data still contain <code>http://yourdomain.com</code> links to images and pages, which cause "not fully secure" warnings.</p>
<ol>
  <li>Install and activate <strong>Better Search Replace</strong>.</li>
  <li>Search for <code>http://yourdomain.com</code>, replace with <code>https://yourdomain.com</code>, select all tables.</li>
  <li>Run it once with <strong>Run as dry run</strong> ticked, check the count, then untick it and run for real.</li>
  <li>Clear every cache (plugin, host and CDN).</li>
</ol>
${fig(s, 3, 'Better Search Replace screen replacing http://yourdomain.com with https://yourdomain.com with the dry run box highlighted', 'Step 6: Replace http:// with https:// across the database. Dry run first.')}
<p>If you use Elementor, also run <strong>Elementor &gt; Tools &gt; Replace URL</strong>. Hard-coded http links in theme files or custom code need editing by hand.</p>

<h2>Step 7: Update Search Console and analytics</h2>
<ul>
  <li>In Google Search Console, a Domain property covers https automatically. If you use URL-prefix properties, add the https version and submit <code>/sitemap.xml</code> there.</li>
  <li>In GA4, update the web stream URL to https.</li>
  <li>Update the website link on your Google Business Profile and social profiles.</li>
</ul>

<h2>Troubleshooting</h2>
<ul>
  <li><strong>Too many redirects after Step 4 or 5:</strong> often a CDN such as Cloudflare set to Flexible SSL. Set it to Full (strict), or remove the extra redirect rule.</li>
  <li><strong>Locked out after changing the addresses:</strong> add <code>define('WP_HOME','https://yourdomain.com');</code> and <code>define('WP_SITEURL','https://yourdomain.com');</code> to <code>wp-config.php</code>, or fix the <code>siteurl</code> and <code>home</code> rows in <code>wp_options</code>.</li>
  <li><strong>Padlock still missing on some pages:</strong> open DevTools &gt; Console; it lists each http resource still loading.</li>
  <li><strong>Certificate will not issue:</strong> check the A record points at this host and there is no old AAAA record pointing elsewhere.</li>
</ul>

<h2>FAQs</h2>
<h3>Do I need to buy an SSL certificate for WordPress?</h3>
<p>Usually not. Most hosts provide a free Let's Encrypt certificate that renews automatically. A paid certificate does not make the padlock more secure for a normal business site.</p>
<h3>Will moving to HTTPS hurt my SEO?</h3>
<p>Not if every http URL redirects with a 301 to the same https URL. Google treats it as a site move on the same domain, and rankings normally carry over.</p>
<h3>Do I need the Really Simple SSL plugin?</h3>
<p>It is optional. It automates Steps 4 to 6, but the manual method keeps one fewer plugin on the site. Either way the certificate itself comes from your host.</p>
`,
  },

  {
    slug: 'add-google-search-console-shopify',
    title: 'How to Add Google Search Console to Shopify (2026)',
    description: 'Add Google Search Console to Shopify: create a Domain property, verify with a DNS TXT record (or HTML tag), then submit the Shopify sitemap.',
    date: '2026-11-11',
    service: 'shopify-developer',
    serviceText: 'I set up Search Console, analytics and SEO basics on new Shopify stores so you can see what Google indexes from day one.',
    time: '15 to 20 minutes, plus a short wait for DNS to update',
    need: ['A Shopify store on your own domain', 'A Google account (ideally a business one you will keep)', 'Login to where your domain DNS is managed (Shopify, GoDaddy, Hostinger, Cloudflare and so on)'],
    linkFrom: [
      ['google-search-console-reports-explained', 'Running a Shopify store? The tutorial on <a href="/tutorials/add-google-search-console-shopify/">how to add Google Search Console to Shopify</a> covers verification and the sitemap.'],
      ['xml-sitemaps-explained', 'On Shopify the sitemap is created for you; the <a href="/tutorials/add-google-search-console-shopify/">Search Console for Shopify tutorial</a> shows where to submit it.'],
    ],
    body: (s) => `
<p>To add Google Search Console to Shopify, open Search Console, add a <strong>Domain</strong> property for <code>yourdomain.com</code>, copy the <strong>TXT record</strong> Google gives you, add it in your domain's DNS (in Shopify under <strong>Settings &gt; Domains</strong> if Shopify manages the domain), click Verify, then submit <code>https://yourdomain.com/sitemap.xml</code> in <strong>Sitemaps</strong>.</p>
<p>Shopify creates the sitemap and robots.txt for you, so there is no plugin to install. For what each report means once data arrives, see <a href="/blog/google-search-console-reports-explained/">Google Search Console reports explained</a>.</p>

<h2>Step 1: Open Search Console and add a property</h2>
${path_('search.google.com/search-console &gt; Add property')}
<ol>
  <li>Sign in at Google Search Console with the Google account the business will keep.</li>
  <li>Click the property menu (top left) and choose <strong>Add property</strong>.</li>
  <li>Choose <strong>Domain</strong> and type <code>yourdomain.com</code> without https or www.</li>
</ol>
${fig(s, 1, 'How to add Google Search Console to Shopify: Select property type dialog with the Domain option highlighted', 'Step 1: Choose a Domain property: it covers https, http, www and non-www in one place.')}
<p>A Domain property needs DNS access. If you cannot edit DNS, use <strong>URL prefix</strong> instead and verify with the HTML tag in Step 3.</p>

<h2>Step 2: Add the TXT record to your DNS</h2>
${path_('Shopify admin &gt; Settings &gt; Domains &gt; your domain &gt; DNS settings (or your registrar\'s DNS page)')}
<ol>
  <li>Copy the TXT value Google shows. It starts with <code>google-site-verification=</code>.</li>
  <li>If you bought the domain through Shopify, go to <strong>Settings &gt; Domains</strong>, open the domain, then <strong>DNS settings &gt; Add custom record &gt; TXT</strong>. Otherwise open the DNS page at your registrar or Cloudflare.</li>
  <li>Set name/host to <code>@</code> and paste the value. Save. Do not change any other records.</li>
</ol>
${fig(s, 2, 'Shopify domain DNS settings with a new TXT record for @ containing google-site-verification highlighted', 'Step 2: Add one TXT record on @ with the google-site-verification value. Leave the rest alone.')}

<h2>Step 3: Verify (or use the HTML tag method)</h2>
<p>Back in Search Console click <strong>Verify</strong>. If it fails, wait 15 to 60 minutes and try again. For a URL-prefix property, choose <strong>HTML tag</strong>, copy the meta tag, then in Shopify go to <strong>Online Store &gt; Themes &gt; ... &gt; Edit code</strong>, open <code>theme.liquid</code> and paste it on a new line just after <code>&lt;head&gt;</code>. Save and click Verify.</p>
<p>Keep the TXT record or tag in place afterwards. Removing it can make you lose verification.</p>

<h2>Step 4: Submit the Shopify sitemap</h2>
${path_('Search Console &gt; Indexing &gt; Sitemaps')}
<ol>
  <li>Open <strong>Sitemaps</strong> in the left menu.</li>
  <li>Type <code>sitemap.xml</code> after your domain and click <strong>Submit</strong>.</li>
  <li>The status should read <strong>Success</strong>. Shopify's sitemap is an index that links to product, collection, page and blog sitemaps; you only submit the main one.</li>
</ol>
${fig(s, 3, 'Search Console Sitemaps page with sitemap.xml typed and the Submit button highlighted', 'Step 4: Submit only /sitemap.xml. Shopify keeps the child sitemaps up to date itself.')}
<p>"Couldn't fetch" just after submitting is common and usually clears on its own; see <a href="/blog/search-console-sitemap-couldnt-fetch/">sitemap couldn't fetch</a>.</p>

<h2>Step 5: Inspect your homepage and a product</h2>
<p>Paste your homepage URL into the search bar at the top (URL Inspection). If it says the URL is not on Google, click <strong>Request indexing</strong>. Repeat for one or two main collections. There is no need to do this for every product.</p>

<h2>Step 6: Remove the store password and add users</h2>
<ul>
  <li>If <strong>Online Store &gt; Preferences &gt; Password protection</strong> is still on, Google cannot crawl the store. Turn it off at launch.</li>
  <li>In Search Console <strong>Settings &gt; Users and permissions</strong>, add your developer or marketer with Full rather than giving them your login.</li>
  <li>Link Search Console to GA4 (Admin &gt; Product links) once analytics is set up; see <a href="/tutorials/add-google-analytics-shopify/">adding Google Analytics to Shopify</a>.</li>
</ul>

<h2>Troubleshooting</h2>
<ul>
  <li><strong>Verification failed:</strong> the TXT record is on the wrong name (for example <code>www</code>), has extra quotes, or DNS is managed somewhere else (check the nameservers).</li>
  <li><strong>Many "Duplicate without user-selected canonical" or "Alternate page" rows:</strong> normal on Shopify for variant and collection-product URLs. Shopify sets canonicals; leave them.</li>
  <li><strong>"Blocked by robots.txt" for /cart, /checkout, /search:</strong> expected. Shopify blocks these on purpose.</li>
  <li><strong>No data after verifying:</strong> reports fill in over a few days.</li>
</ul>

<h2>FAQs</h2>
<h3>Does Shopify have a built-in Search Console integration?</h3>
<p>No. Shopify generates the sitemap and robots.txt, but you add and verify the property in Search Console yourself, as above.</p>
<h3>Where is my Shopify sitemap?</h3>
<p>At <code>https://yourdomain.com/sitemap.xml</code>. It is created automatically and updates when you add products, collections, pages or blog posts.</p>
<h3>Should I use a Domain or URL-prefix property for Shopify?</h3>
<p>Domain, if you can edit DNS. It covers every version of the address. URL prefix with the HTML tag is the fallback when DNS is out of reach.</p>
`,
  },

  {
    slug: 'add-google-analytics-shopify',
    title: 'How to Add Google Analytics 4 to Shopify (2026)',
    description: 'Add Google Analytics 4 to Shopify with the Google & YouTube app: create a GA4 property, connect it in the app, check purchase events, avoid double counts.',
    date: '2026-11-11',
    service: 'shopify-developer',
    serviceText: 'I set up GA4, ecommerce events and Search Console on Shopify stores and check that purchases are tracked once, not twice.',
    time: '20 to 30 minutes, plus up to a day for reports to fill in',
    need: ['A Shopify store and staff access with permission to install apps', 'A Google account with access to Google Analytics', 'A test product you can order and refund'],
    linkFrom: [
      ['ga4-events-explained', 'On Shopify, the purchase and checkout events come from the Google &amp; YouTube app; the tutorial on <a href="/tutorials/add-google-analytics-shopify/">how to add Google Analytics 4 to Shopify</a> shows the setup.'],
      ['website-analytics-metrics-that-matter', 'Selling on Shopify? Start with the <a href="/tutorials/add-google-analytics-shopify/">GA4 for Shopify setup tutorial</a> so these numbers include your orders.'],
    ],
    body: (s) => `
<p>To add Google Analytics 4 to Shopify, create a GA4 property and web data stream in Google Analytics, install Shopify's <strong>Google &amp; YouTube</strong> app, connect your Google account in it and select the GA4 property. The app then sends page views and ecommerce events (view item, add to cart, begin checkout, purchase) without any code.</p>
<p>For what those events mean and which ones to report on, see <a href="/blog/ga4-events-explained/">GA4 events explained</a>.</p>

<h2>Step 1: Create a GA4 property and web stream</h2>
${path_('analytics.google.com &gt; Admin &gt; Create &gt; Property')}
<ol>
  <li>In Google Analytics click <strong>Admin</strong> (gear icon), then <strong>Create &gt; Property</strong>.</li>
  <li>Name it after the store, set your reporting time zone and currency (the currency your store sells in).</li>
  <li>Choose <strong>Web</strong> as the platform, enter <code>https://yourdomain.com</code> and create the stream.</li>
</ol>
${fig(s, 1, 'How to add Google Analytics 4 to Shopify: GA4 Admin create property screen with time zone and currency highlighted', 'Step 1: Create the GA4 property with the store\'s time zone and currency, then a Web stream.')}
<p>If you already have a GA4 property for the store, skip this step and use that one.</p>

<h2>Step 2: Remove any old tracking code</h2>
${path_('Shopify admin &gt; Online Store &gt; Themes &gt; Edit code &gt; theme.liquid, and Settings &gt; Customer events')}
<p>Before connecting the app, look for an older gtag snippet (<code>G-</code> or <code>UA-</code> ID) in <code>theme.liquid</code>, and any custom pixel under <strong>Settings &gt; Customer events</strong> that also sends to Google Analytics. Two setups at once count every purchase twice. Remove the old one after the app is working.</p>

<h2>Step 3: Install the Google &amp; YouTube app</h2>
${path_('Shopify App Store &gt; Google &amp; YouTube')}
<ol>
  <li>In Shopify admin, open <strong>Apps</strong> and search the Shopify App Store for <strong>Google &amp; YouTube</strong> (published by Google).</li>
  <li>Click <strong>Install</strong> and approve the permissions.</li>
  <li>In the app, click <strong>Connect Google account</strong> and sign in with the account that has GA4 access.</li>
</ol>
${fig(s, 2, 'Shopify App Store page for the Google and YouTube app with the Install button highlighted', 'Step 3: Install Google &amp; YouTube from the Shopify App Store, then connect your Google account.')}

<h2>Step 4: Connect the GA4 property</h2>
${path_('Shopify admin &gt; Apps &gt; Google &amp; YouTube &gt; Settings &gt; Google Analytics')}
<ol>
  <li>In the app's settings, find <strong>Google Analytics</strong> and click <strong>Connect</strong>.</li>
  <li>Select the GA4 property from Step 1 and confirm.</li>
  <li>You can skip Merchant Center and Google Ads for now if you only want analytics.</li>
</ol>

<h2>Step 5: Check it in Realtime</h2>
${path_('Google Analytics &gt; Reports &gt; Realtime')}
<ol>
  <li>Open your store in a private window and click through a product and the cart.</li>
  <li>In GA4 open <strong>Reports &gt; Realtime</strong>. You should see yourself as a user and events such as <code>page_view</code>, <code>view_item</code> and <code>add_to_cart</code>.</li>
  <li>Place a test order (for example with a discount code or a manual payment method), then refund or cancel it.</li>
</ol>
${fig(s, 3, 'GA4 Realtime report with page_view, view_item, add_to_cart and purchase events listed and purchase highlighted', 'Step 5: In Realtime, look for one purchase event per test order, not two.')}

<h2>Step 6: Link Search Console and set key events</h2>
<ul>
  <li>In GA4 <strong>Admin &gt; Product links &gt; Search Console links</strong>, link the property you created in the <a href="/tutorials/add-google-search-console-shopify/">Search Console for Shopify tutorial</a>.</li>
  <li>Under <strong>Admin &gt; Events</strong>, make sure <code>purchase</code> is marked as a key event.</li>
  <li>Set data retention to the longest option under <strong>Admin &gt; Data collection and modification &gt; Data retention</strong>.</li>
</ul>

<h2>Troubleshooting</h2>
<ul>
  <li><strong>Purchases counted twice:</strong> an old gtag snippet or a second pixel is still sending. Keep one source only.</li>
  <li><strong>No purchase events:</strong> they can take time to appear outside Realtime. Also check the customer privacy settings: in regions where consent is required, visitors who decline are not tracked.</li>
  <li><strong>Revenue in the wrong currency:</strong> check the GA4 property currency in Admin &gt; Property details.</li>
  <li><strong>Can't see the property in the app:</strong> the Google account you connected does not have Editor access on that GA4 property.</li>
</ul>

<h2>FAQs</h2>
<h3>Does Shopify have Google Analytics built in?</h3>
<p>Not directly. The free Google &amp; YouTube app is the supported way to connect GA4; the old field for a tracking ID in preferences was for the retired Universal Analytics.</p>
<h3>Will GA4 match my Shopify sales report exactly?</h3>
<p>No. Ad blockers, declined cookie consent and refunds mean GA4 usually shows fewer orders than Shopify. Use Shopify for sales totals and GA4 for where visitors came from.</p>
<h3>Can I use Google Tag Manager on Shopify instead?</h3>
<p>Yes, through a custom pixel in Customer events, but it takes more setup. For most stores the Google &amp; YouTube app is enough.</p>
`,
  },

  {
    slug: 'backup-wordpress-updraftplus',
    title: 'How to Back Up WordPress with UpdraftPlus (2026)',
    description: 'Back up WordPress with UpdraftPlus: install the free plugin, set file and database schedules, connect Google Drive, run the first backup, test a restore.',
    date: '2026-11-11',
    service: 'wordpress-maintenance',
    serviceText: 'Scheduled off-site backups and tested restores are part of every WordPress maintenance plan I run.',
    time: '15 to 20 minutes, plus the first backup run',
    need: ['WordPress admin access', 'A Google Drive (or Dropbox) account that the business owns', 'Enough free space in that account for a few copies of the site'],
    linkFrom: [
      ['wordpress-backup-plugins-compared', 'If you pick UpdraftPlus, the tutorial on <a href="/tutorials/backup-wordpress-updraftplus/">how to back up WordPress with UpdraftPlus</a> walks through schedules, Google Drive and a test restore.'],
      ['wordpress-backup-restore-guide', 'For a click-by-click setup of one plugin, see <a href="/tutorials/backup-wordpress-updraftplus/">backing up WordPress with UpdraftPlus</a>.'],
    ],
    body: (s) => `
<p>To back up WordPress with UpdraftPlus, install the free <strong>UpdraftPlus</strong> plugin, open <strong>Settings &gt; UpdraftPlus Backups &gt; Settings</strong>, set schedules for files and the database, choose remote storage such as Google Drive and authorise it, save, then click <strong>Backup Now</strong>. Backups then run on schedule and are stored off the server.</p>
<p>Not sure UpdraftPlus is right for you? See <a href="/blog/wordpress-backup-plugins-compared/">WordPress backup plugins compared</a>.</p>

<h2>Step 1: Install UpdraftPlus</h2>
${path_('WordPress admin &gt; Plugins &gt; Add New Plugin')}
<ol>
  <li>Search for <strong>UpdraftPlus</strong>.</li>
  <li>Install and activate <strong>UpdraftPlus: WP Backup &amp; Migration Plugin</strong>.</li>
  <li>Open <strong>Settings &gt; UpdraftPlus Backups</strong>. Close the welcome tour if it appears.</li>
</ol>

<h2>Step 2: Set the backup schedules</h2>
${path_('Settings &gt; UpdraftPlus Backups &gt; Settings tab')}
<ol>
  <li><strong>Files backup schedule:</strong> Weekly suits most brochure sites. Retain 4.</li>
  <li><strong>Database backup schedule:</strong> Daily for shops, blogs and sites with forms. Retain 14.</li>
  <li>If you take orders every hour, ask your host about more frequent database backups too.</li>
</ol>
${fig(s, 1, 'How to back up WordPress with UpdraftPlus: Settings tab with files backup weekly and database backup daily highlighted', 'Step 2: Files weekly, database daily is a sensible start. Retain several copies of each.')}

<h2>Step 3: Choose remote storage and authorise it</h2>
${path_('Settings tab &gt; Choose your remote storage')}
<ol>
  <li>Click <strong>Google Drive</strong> (or Dropbox, OneDrive, S3).</li>
  <li>Scroll down and click <strong>Save Changes</strong>. A popup asks you to authorise.</li>
  <li>Sign in with the business Google account, allow access, then click <strong>Complete setup</strong>.</li>
</ol>
${fig(s, 2, 'UpdraftPlus remote storage icons with Google Drive selected and highlighted', 'Step 3: Pick an off-site destination. A backup kept only on the same server is lost with the server.')}
<p>Use an account the business owns, not a developer's personal Drive, so access survives a change of developer.</p>

<h2>Step 4: Choose what to include</h2>
<p>Leave Plugins, Themes, Uploads and Others ticked. If you have large folders that are not needed (old backup zips from other plugins, cache folders), add them to the exclude list so backups stay small.</p>

<h2>Step 5: Run the first backup</h2>
${path_('Settings &gt; UpdraftPlus Backups &gt; Backup / Restore tab')}
<ol>
  <li>Click <strong>Backup Now</strong>.</li>
  <li>Keep <strong>Include your database</strong>, <strong>Include your files</strong> and <strong>Send this backup to remote storage</strong> ticked.</li>
  <li>Click Backup Now in the dialog and wait. It shows progress and then lists the backup under Existing backups.</li>
</ol>
${fig(s, 3, 'UpdraftPlus Backup Restore tab with the Backup Now button highlighted and an existing backup listed', 'Step 5: Backup Now, then check the new set appears under Existing backups and in Google Drive.')}

<h2>Step 6: Check the files reached Google Drive</h2>
<p>Open Google Drive and find the <strong>UpdraftPlus</strong> folder. You should see a database file and several zip files (plugins, themes, uploads, others) with today's date.</p>

<h2>Step 7: Test a restore</h2>
<p>A backup is only proven when it restores. Restore it on a staging copy or a test install, not on the live site: in Existing backups click <strong>Restore</strong>, choose the components and follow the steps. Repeat the test every few months and after big changes.</p>

<h2>Troubleshooting</h2>
<ul>
  <li><strong>Backup stuck or never finishes:</strong> WordPress cron is not running because the site gets few visits. Set a real server cron job, or ask your host.</li>
  <li><strong>Google Drive upload fails:</strong> re-authorise in Settings, and check the Drive account has free space.</li>
  <li><strong>Backups are huge:</strong> exclude cache folders and old backup files, and compress images.</li>
  <li><strong>"Insufficient permissions" or timeouts:</strong> look in the log (Backup / Restore tab &gt; View log) for the exact error.</li>
</ul>

<h2>FAQs</h2>
<h3>Is UpdraftPlus free?</h3>
<p>Yes, the core plugin with scheduled backups to Google Drive, Dropbox and others is free. A paid version adds features such as incremental backups and more storage options.</p>
<h3>Do I still need UpdraftPlus if my host takes backups?</h3>
<p>It is a sensible second copy. Host backups sit with the same company as the site; a plugin copy in your own Drive is independent.</p>
<h3>How do I restore WordPress from UpdraftPlus?</h3>
<p>In Settings &gt; UpdraftPlus Backups, open the Backup / Restore tab, click Restore on the backup set, tick the components and follow the prompts. If the site will not load, install a fresh WordPress, add UpdraftPlus, connect the same Drive and restore from there.</p>
`,
  },

  {
    slug: 'setup-zoho-mail-custom-domain',
    title: 'How to Set Up Zoho Mail with Your Own Domain (2026)',
    description: 'Set up Zoho Mail on your own domain: sign up, verify with a TXT record, add MX, SPF and DKIM records, create mailboxes, then test sending and receiving.',
    date: '2026-11-11',
    service: 'wordpress-maintenance',
    serviceText: 'I set up business email, DNS records and website form delivery so enquiries reach the inbox, as part of WordPress maintenance.',
    time: '30 to 45 minutes, plus time for DNS to update',
    need: ['A domain you own and login to its DNS (registrar, Hostinger, Cloudflare and so on)', 'A phone number for the Zoho sign-up', 'A list of the mailboxes you need, for example hello@ and accounts@'],
    linkFrom: [
      ['business-email-options', 'If Zoho Mail is your pick, the tutorial on <a href="/tutorials/setup-zoho-mail-custom-domain/">how to set up Zoho Mail with your own domain</a> covers every DNS record in order.'],
      ['business-email-deliverability-spf-dkim-dmarc', 'Using Zoho? See <a href="/tutorials/setup-zoho-mail-custom-domain/">setting up Zoho Mail on a custom domain</a> for where its SPF and DKIM values go.'],
    ],
    body: (s) => `
<p>To set up Zoho Mail with your own domain, sign up for a Zoho Mail plan with your domain, add the <strong>TXT verification record</strong> Zoho gives you in your DNS, then replace the <strong>MX records</strong> with Zoho's, add Zoho's <strong>SPF</strong> and <strong>DKIM</strong> records, create your mailboxes and send a test both ways. Zoho shows the exact values for your account in its setup screens.</p>
<p>Comparing providers first? Read <a href="/blog/business-email-options/">business email options for small businesses</a>.</p>

<h2>Step 1: Sign up with your domain</h2>
${path_('zoho.com/mail &gt; Pricing &gt; choose a plan')}
<ol>
  <li>Choose a business email plan and pick the option to use a domain you already own.</li>
  <li>Enter <code>yourdomain.com</code>, your name and phone, and create the account.</li>
  <li>Pick the data centre closest to your customers if asked (for example India or Europe).</li>
</ol>
<p>Check current plan features and limits on Zoho's pricing page before choosing; they change from time to time.</p>

<h2>Step 2: Verify the domain with a TXT record</h2>
${path_('Zoho Mail Admin Console &gt; Domains &gt; Verify, and your DNS manager')}
<ol>
  <li>Zoho shows a TXT value starting with <code>zoho-verification=</code>. Copy it.</li>
  <li>In your DNS manager add a <strong>TXT</strong> record with host <code>@</code> and that value.</li>
  <li>Back in Zoho, click <strong>Verify TXT Record</strong>. Retry after 15 to 30 minutes if it is not found yet.</li>
</ol>
${fig(s, 1, 'How to set up Zoho Mail with your own domain: Zoho Admin Console domain verification with the TXT method and Verify button highlighted', 'Step 2: Add the zoho-verification TXT record at your DNS, then click Verify.')}

<h2>Step 3: Create your mailboxes</h2>
${path_('Admin Console &gt; Users &gt; Add user')}
<p>Create each person's mailbox, for example <code>hello@yourdomain.com</code>, and set up group addresses (such as <code>sales@</code> delivered to two people) under <strong>Groups</strong>. Set strong passwords and turn on two-factor sign-in.</p>

<h2>Step 4: Point the MX records to Zoho</h2>
${path_('Your DNS manager &gt; MX records')}
<ol>
  <li>Delete the existing MX records (from your host or old email provider). Take a screenshot first.</li>
  <li>Add the three MX records Zoho lists for your data centre, with the priorities shown (for example <code>mx.zoho.in</code>, <code>mx2.zoho.in</code>, <code>mx3.zoho.in</code> for India).</li>
  <li>Save, then click <strong>Verify MX</strong> in Zoho's setup.</li>
</ol>
${fig(s, 2, 'DNS zone with three Zoho MX records and their priorities, plus SPF and DKIM TXT records highlighted', 'Step 4 and 5: Only Zoho\'s MX records remain; SPF and DKIM are TXT records alongside them.')}
<p>New mail starts arriving at Zoho once DNS updates. Leave the old mailboxes open for a few days to collect stragglers.</p>

<h2>Step 5: Add SPF, DKIM and DMARC</h2>
${path_('Admin Console &gt; Domains &gt; Email configuration')}
<ul>
  <li><strong>SPF:</strong> one TXT record on <code>@</code>, such as <code>v=spf1 include:zoho.in ~all</code> (use the include Zoho shows). If an SPF record already exists, merge the includes into one record; never have two.</li>
  <li><strong>DKIM:</strong> in Zoho, add a selector, copy the TXT host (like <code>zmail._domainkey</code>) and value into DNS, then click Verify.</li>
  <li><strong>DMARC:</strong> add a TXT on <code>_dmarc</code> such as <code>v=DMARC1; p=none; rua=mailto:hello@yourdomain.com</code> to start monitoring.</li>
</ul>
<p>Why these matter is explained in <a href="/blog/business-email-deliverability-spf-dkim-dmarc/">SPF, DKIM and DMARC for business email</a>.</p>

<h2>Step 6: Test, then connect your phone and website</h2>
<ol>
  <li>Send from Gmail to your new address and reply. Check the reply lands in the inbox, not spam.</li>
  <li>Install the Zoho Mail app on phones, or add the account to Outlook with Zoho's IMAP/SMTP settings.</li>
  <li>Point your website's form emails at the new mailbox through SMTP; see <a href="/tutorials/setup-smtp-wordpress/">how to set up SMTP in WordPress</a>.</li>
</ol>
${fig(s, 3, 'Zoho Mail inbox showing a test email received from Gmail with the message highlighted', 'Step 6: A test from Gmail arrives and your reply reaches Gmail\'s inbox: setup done.')}

<h2>Troubleshooting</h2>
<ul>
  <li><strong>Mail still goes to the old provider:</strong> an old MX record is still present, or DNS is managed elsewhere (check nameservers, for example Cloudflare).</li>
  <li><strong>Sent mail lands in spam:</strong> DKIM not verified, or two SPF records. Fix to one SPF record.</li>
  <li><strong>Website broke after editing DNS:</strong> an A or CNAME record was changed by mistake. Restore it from your screenshot.</li>
  <li><strong>Wrong data centre values:</strong> zoho.com, zoho.in and zoho.eu use different hostnames. Use the ones in your own Admin Console.</li>
</ul>

<h2>FAQs</h2>
<h3>Will setting up Zoho Mail affect my website?</h3>
<p>No, as long as you only add TXT records and change MX records. The website runs on A and CNAME records, which stay as they are.</p>
<h3>Can I keep my old emails when moving to Zoho?</h3>
<p>Yes. Zoho has a migration tool in the Admin Console that imports mail from IMAP accounts such as your hosting email or Gmail.</p>
<h3>Do I need a separate domain for Zoho Mail?</h3>
<p>No. Use the same domain as your website so addresses read hello@yourdomain.com.</p>
`,
  },

  {
    slug: 'add-favicon-wordpress',
    title: 'How to Add a Favicon in WordPress: Step-by-Step (2026)',
    description: 'Add a favicon in WordPress: make a 512x512 square icon, upload it as the Site Icon, publish, then check it in browser tabs and on mobile.',
    date: '2026-11-11',
    service: 'wordpress-website-development',
    serviceText: 'I build WordPress sites with the favicon, social share images and brand details set up properly from launch.',
    time: '10 minutes',
    need: ['Your logo or brand mark as a PNG or SVG', 'WordPress admin access', 'An image editor (or a free online resizer)'],
    linkFrom: [
      ['logo-favicon-brand-basics-website', 'To put the icon on a WordPress site, follow the tutorial on <a href="/tutorials/add-favicon-wordpress/">how to add a favicon in WordPress</a>.'],
    ],
    body: (s) => `
<p>To add a favicon in WordPress, make a square PNG at least <strong>512 x 512 pixels</strong>, then go to <strong>Appearance &gt; Customize &gt; Site Identity &gt; Site Icon</strong> (classic themes) and click <strong>Select site icon</strong>, upload it, crop and Publish. On block themes, set it in <strong>Settings &gt; General</strong> or the Site Logo block settings. WordPress then creates the sizes browsers and phones need.</p>
<p>For which file format and design work best at tiny sizes, see <a href="/blog/logo-favicon-brand-basics-website/">logo, favicon and brand basics</a>.</p>

<h2>Step 1: Prepare a square icon</h2>
<ul>
  <li>Use a simple mark, not the full logo with small text: at 16 pixels text becomes a blur.</li>
  <li>Make it square, 512 x 512 pixels, PNG with a transparent or solid background.</li>
  <li>Leave a little padding so the mark is not cut off in round icons on phones.</li>
</ul>
<p>Use the <a href="/free-tools/image-resizer/">image resizer</a> to get it to 512 x 512, and the <a href="/free-tools/favicon-size-checker/">favicon size checker</a> to confirm it.</p>

<h2>Step 2: Open Site Identity in the Customizer</h2>
${path_('WordPress admin &gt; Appearance &gt; Customize &gt; Site Identity')}
<ol>
  <li>Go to <strong>Appearance &gt; Customize</strong>.</li>
  <li>Click <strong>Site Identity</strong>.</li>
  <li>Scroll to <strong>Site Icon</strong> and click <strong>Select site icon</strong>.</li>
</ol>
${fig(s, 1, 'How to add a favicon in WordPress: Customizer Site Identity panel with the Select site icon button highlighted', 'Step 2: Appearance &gt; Customize &gt; Site Identity &gt; Select site icon.')}
<p>Using a block theme such as Twenty Twenty-Five, there is no Customize menu. Go to <strong>Settings &gt; General</strong> and use <strong>Site Icon</strong> there, or open <strong>Appearance &gt; Editor</strong>, select the Site Logo block and turn on <strong>Use as site icon</strong>.</p>

<h2>Step 3: Upload and crop the icon</h2>
<ol>
  <li>In the media window, click <strong>Upload files</strong> and choose your 512 x 512 PNG.</li>
  <li>Click <strong>Select</strong>. If the image is not square, WordPress asks you to crop it; keep the mark centred.</li>
</ol>
${fig(s, 2, 'WordPress media library with the uploaded square icon selected and the Select button highlighted', 'Step 3: Upload the square PNG and click Select. A 512 x 512 image skips the crop.')}

<h2>Step 4: Check the preview and publish</h2>
${path_('Customizer &gt; Site Identity &gt; Site Icon preview')}
<p>The panel previews the icon in a browser tab and as an app icon. If it looks right, click <strong>Publish</strong> at the top.</p>
${fig(s, 3, 'Customizer Site Icon preview showing the icon in a browser tab and as an app icon with Publish highlighted', 'Step 4: Check both previews, then Publish.')}

<h2>Step 5: Clear caches and test</h2>
<ol>
  <li>Clear your caching plugin, host cache and CDN.</li>
  <li>Open the site in a private window and look at the tab.</li>
  <li>On a phone, use Add to Home Screen to check the larger icon.</li>
</ol>
<p>Browsers cache favicons stubbornly. If you still see the old one, try another browser before assuming it failed.</p>

<h2>Step 6: Remove old favicon code</h2>
<p>If a theme option, SEO plugin or a hard-coded <code>&lt;link rel="icon"&gt;</code> in <code>header.php</code> also sets a favicon, the page may output two. View the page source and search for <code>rel="icon"</code>; keep only the WordPress Site Icon ones.</p>

<h2>Troubleshooting</h2>
<ul>
  <li><strong>Old icon still shows:</strong> browser cache. Test in a private window or another browser, and clear site caches.</li>
  <li><strong>Google search shows the wrong icon:</strong> Google updates favicons in results on its own schedule after recrawling the homepage. Make sure the icon is a multiple of 48 pixels square (512 works) and not blocked by robots.txt.</li>
  <li><strong>No Site Icon option:</strong> some themes hide it. Use Settings &gt; General on recent WordPress versions, or check the theme's own options panel.</li>
  <li><strong>Icon looks blurry:</strong> the source was too small. Upload a fresh 512 x 512 file.</li>
</ul>

<h2>FAQs</h2>
<h3>What size should a WordPress favicon be?</h3>
<p>Upload a square image of at least 512 x 512 pixels. WordPress generates the smaller sizes (such as 32 x 32 and 180 x 180) automatically.</p>
<h3>Can I use an SVG or ICO file as the WordPress site icon?</h3>
<p>The Site Icon setting expects an image WordPress can crop, so PNG or JPG is the safe choice. SVG and ICO need a plugin or manual code.</p>
<h3>Do I need a favicon plugin?</h3>
<p>No. The built-in Site Icon setting covers browsers, Android and iOS for most sites.</p>
`,
  },

  {
    slug: 'enable-maintenance-mode-wordpress',
    title: 'How to Put WordPress in Maintenance Mode (2026)',
    description: 'Put WordPress in maintenance mode or show a coming soon page: install a free plugin, design the page, turn it on, check it logged out, then switch it off.',
    date: '2026-11-11',
    service: 'wordpress-maintenance',
    serviceText: 'I run updates and redesign work on staging or behind a maintenance page so visitors and Google never see a broken site.',
    time: '15 to 20 minutes',
    need: ['WordPress admin access', 'Your logo and a short message for visitors', 'A contact email or WhatsApp number to show on the page'],
    linkFrom: [
      ['wordpress-stuck-in-maintenance-mode', 'If you want to put the site into maintenance mode on purpose, with your own page, follow the tutorial on <a href="/tutorials/enable-maintenance-mode-wordpress/">how to put WordPress in maintenance mode</a>.'],
      ['monthly-website-maintenance-plan', 'For bigger changes on a live site, the <a href="/tutorials/enable-maintenance-mode-wordpress/">WordPress maintenance mode tutorial</a> shows how to show visitors a proper holding page.'],
    ],
    body: (s) => `
<p>To put WordPress in maintenance mode, install a free maintenance plugin such as <strong>LightStart</strong> (formerly WP Maintenance Mode), set the status to <strong>Activated</strong>, choose <strong>Maintenance</strong> (or Coming Soon for a site not yet launched), edit the message, save, and check the site in a logged-out window. Visitors see the page while you, as a logged-in admin, still see and work on the real site.</p>
<p>This is different from the automatic "Briefly unavailable for scheduled maintenance" message during updates; if that one is stuck, see <a href="/blog/wordpress-stuck-in-maintenance-mode/">WordPress stuck in maintenance mode</a>.</p>

<h2>Step 1: Decide if you need it</h2>
<p>For updates and design changes, a <strong>staging copy</strong> is better: you work on the copy and the live site never goes down. Use maintenance mode for short jobs on the live site, for a site that is not launched yet (coming soon), or when you must stop orders for a while.</p>

<h2>Step 2: Install the maintenance plugin</h2>
${path_('WordPress admin &gt; Plugins &gt; Add New Plugin')}
<ol>
  <li>Search for <strong>LightStart</strong> or <strong>WP Maintenance Mode</strong>.</li>
  <li>Install and activate <strong>LightStart - Maintenance Mode, Coming Soon and Landing Page Builder</strong>.</li>
</ol>
${fig(s, 1, 'How to put WordPress in maintenance mode: Add Plugins screen with the LightStart maintenance plugin Install Now button highlighted', 'Step 2: Install and activate a well-maintained maintenance mode plugin.')}

<h2>Step 3: Set status and mode</h2>
${path_('WordPress admin &gt; Settings &gt; LightStart &gt; General')}
<ol>
  <li>Set <strong>Status</strong> to <strong>Activated</strong>.</li>
  <li>Choose <strong>Maintenance</strong> for a live site, or <strong>Coming soon</strong> for a new one.</li>
  <li>Leave <strong>Bypass for search bots</strong> off, and keep administrators in the roles that can see the site.</li>
  <li>Click <strong>Save settings</strong>.</li>
</ol>
${fig(s, 2, 'Maintenance mode plugin General settings with Status set to Activated and the mode set to Maintenance highlighted', 'Step 3: Status Activated, mode Maintenance, then Save settings.')}
<p>In maintenance mode the plugin returns a <strong>503</strong> status, which tells Google the outage is temporary so it does not drop your pages. Keep it short: hours, not weeks.</p>

<h2>Step 4: Edit the page</h2>
${path_('Settings &gt; LightStart &gt; Design')}
<ul>
  <li>Add your logo, a clear heading such as "We'll be back shortly" and when you expect to be back.</li>
  <li>Add a way to reach you: phone, email or a WhatsApp link (the <a href="/free-tools/whatsapp-link-generator/">WhatsApp link generator</a> makes one).</li>
  <li>Keep it light and fast: one image at most.</li>
</ul>

<h2>Step 5: Check it logged out</h2>
<p>Open the site in a private window or on your phone's mobile data. You should see the maintenance page. In your normal browser, where you are logged in, you still see the real site; that is expected.</p>
${fig(s, 3, 'Browser showing a simple maintenance page with logo, We will be back shortly heading and a contact link, viewed in a private window', 'Step 5: In a private window, visitors see the holding page with a way to contact you.')}

<h2>Step 6: Turn it off and clear caches</h2>
<ol>
  <li>When the work is done, set <strong>Status</strong> to <strong>Deactivated</strong> and save.</li>
  <li>Clear your caching plugin, host cache and CDN, or some visitors keep seeing the maintenance page.</li>
  <li>Check the homepage, a key page and the checkout in a private window.</li>
</ol>

<h2>Troubleshooting</h2>
<ul>
  <li><strong>Visitors still see the maintenance page after switching off:</strong> a cache is serving the old page. Purge all caches, including Cloudflare.</li>
  <li><strong>You see the maintenance page while logged in:</strong> your role is not in the bypass list, or you are logged in on a different address (www vs non-www).</li>
  <li><strong>Payment gateway or webhooks stop working:</strong> some plugins block webhook URLs too. Exclude them in the plugin's settings, or avoid maintenance mode on a live shop.</li>
  <li><strong>Locked out:</strong> rename the plugin's folder in <code>wp-content/plugins</code> by FTP or File Manager to switch it off.</li>
</ul>

<h2>FAQs</h2>
<h3>Can I put WordPress in maintenance mode without a plugin?</h3>
<p>Yes, with a small code snippet that shows a message to logged-out users and returns a 503, but a plugin is easier to turn on and off safely.</p>
<h3>Does maintenance mode hurt SEO?</h3>
<p>Not for a short time, as long as the page returns a 503 status. Leaving it on for weeks can lead Google to drop pages.</p>
<h3>What is the difference between maintenance mode and coming soon mode?</h3>
<p>Maintenance mode is for an existing site that is temporarily unavailable (503 status). Coming soon is for a site that has not launched yet and usually returns a normal 200 status.</p>
`,
  },

  {
    slug: 'add-whatsapp-button-wordpress',
    title: 'How to Add a WhatsApp Button to WordPress (2026)',
    description: 'Add a WhatsApp chat button to WordPress: install Click to Chat, add your number in international format, set a pre-filled message, test, track clicks.',
    date: '2026-11-11',
    service: 'wordpress-website-development',
    serviceText: 'I add WhatsApp, call and enquiry buttons to WordPress sites and track the clicks in GA4 so you know what brings leads.',
    time: '15 minutes',
    need: ['WordPress admin access', 'The WhatsApp or WhatsApp Business number you want enquiries on', 'A short pre-filled message, for example "Hi, I have a question about your services"'],
    linkFrom: [
      ['whatsapp-on-business-website', 'On WordPress, the tutorial on <a href="/tutorials/add-whatsapp-button-wordpress/">how to add a WhatsApp button to WordPress</a> covers the plugin, the pre-filled message and click tracking.'],
    ],
    body: (s) => `
<p>To add a WhatsApp button to WordPress, install the free <strong>Click to Chat</strong> plugin, go to <strong>Click to Chat &gt; Settings</strong>, enter your number in international format with the country code (for example <code>919876543210</code>), add a pre-filled message, pick a style and position, save, and test on your phone. The button opens a chat with you in WhatsApp on mobile or WhatsApp Web on desktop.</p>
<p>Whether a floating button, a contact-page link or both suits you is covered in <a href="/blog/whatsapp-on-business-website/">WhatsApp on your business website</a>.</p>

<h2>Step 1: Get the number in the right format</h2>
<p>WhatsApp links need the full number with country code and no plus, spaces, zeros or dashes: <code>91</code> then the 10-digit mobile for India, <code>44</code> then the number without its leading 0 for the UK, <code>1</code> for the USA and Canada, <code>971</code> for the UAE. Use a number that has WhatsApp Business with a business profile, greeting and away messages set up.</p>
<p>You can build and test the link with the <a href="/free-tools/whatsapp-link-generator/">WhatsApp link generator</a>.</p>

<h2>Step 2: Install Click to Chat</h2>
${path_('WordPress admin &gt; Plugins &gt; Add New Plugin')}
<ol>
  <li>Search for <strong>Click to Chat</strong>.</li>
  <li>Install and activate <strong>Click to Chat - HoliThemes</strong>.</li>
</ol>
${fig(s, 1, 'How to add a WhatsApp button to WordPress: Add Plugins screen with Click to Chat Install Now highlighted', 'Step 2: Install and activate Click to Chat from the plugin directory.')}

<h2>Step 3: Add your number and pre-filled message</h2>
${path_('WordPress admin &gt; Click to Chat &gt; Settings')}
<ol>
  <li>Choose your country code and enter the number.</li>
  <li>In <strong>Pre-filled message</strong>, write a short opener. You can include <code>{{url}}</code> so you see which page they came from.</li>
  <li>Set <strong>Call to action</strong> text, for example "Chat on WhatsApp".</li>
</ol>
${fig(s, 2, 'Click to Chat settings with the WhatsApp number in international format and the pre-filled message fields highlighted', 'Step 3: Number with country code, a short pre-filled message, and a clear call to action.')}

<h2>Step 4: Choose the style and position</h2>
<ul>
  <li>Pick a style (an icon, or icon with text) that does not cover the cart, cookie banner or chat widgets.</li>
  <li>Bottom right is usual. Leave enough space from the edge on mobile so it does not block the menu.</li>
  <li>Under display settings, hide it on pages where it gets in the way, such as checkout.</li>
</ul>
<p>Click <strong>Save Changes</strong>.</p>

<h2>Step 5: Test on mobile and desktop</h2>
<ol>
  <li>Open the site on your phone, tap the button: WhatsApp should open with your number and the message ready to send.</li>
  <li>On desktop it should open WhatsApp Web or the desktop app.</li>
  <li>Send a test message from another phone and check it arrives on the business number.</li>
</ol>
${fig(s, 3, 'Phone mock-up of a WordPress site with the floating WhatsApp button in the bottom right corner highlighted', 'Step 5: On a phone, the floating button sits bottom right and opens a ready-to-send chat.')}

<h2>Step 6: Track clicks in GA4</h2>
<p>Click to Chat can send an event to Google Analytics when someone taps the button (in its <strong>Other Settings &gt; Analytics</strong>). Turn it on, then mark that event as a key event in GA4 so WhatsApp enquiries show up next to form leads. Tag WhatsApp links you share elsewhere with the <a href="/free-tools/utm-builder/">UTM builder</a> if you send people to the site from campaigns.</p>

<h2>Step 7: Add it to key pages too</h2>
<p>Besides the floating button, add a normal WhatsApp link or button on the contact page and at the end of service pages, using a Button block with the <code>https://wa.me/919876543210</code> style link.</p>

<h2>Troubleshooting</h2>
<ul>
  <li><strong>"Phone number shared via url is invalid":</strong> the number has a plus, a leading zero or spaces, or is not on WhatsApp.</li>
  <li><strong>Button does not appear:</strong> clear caches, and check the display settings are not hiding it on that page or device.</li>
  <li><strong>Button covers other buttons:</strong> change the position offset or style in the plugin settings.</li>
  <li><strong>No events in GA4:</strong> check GA4 is installed on the site and look in Realtime while you tap the button.</li>
</ul>

<h2>FAQs</h2>
<h3>Can I add a WhatsApp button to WordPress without a plugin?</h3>
<p>Yes. Add a Button block that links to <code>https://wa.me/yournumber</code>. A plugin is only needed for the floating button on every page.</p>
<h3>Does a WhatsApp button slow down my site?</h3>
<p>A simple button adds very little. Heavy chat widgets with many scripts can; test with PageSpeed Insights after adding one.</p>
<h3>Can I use a WhatsApp Business number?</h3>
<p>Yes, and it is recommended: you get a business profile, quick replies and away messages, all free in the WhatsApp Business app.</p>
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
