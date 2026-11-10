// More free tools (image, SEO, marketing, developer). Merged into TOOLS by tools/tools-pages.js.
// Each tool's browser JS lives in tools/free-tool-scripts/<name>.js (plain files, so `node --check` works),
// inlined after the shared helpers in _shared.js. Everything runs client-side; nothing is uploaded.
const fs = require('fs');
const path = require('path');
const read = f => fs.readFileSync(path.join(__dirname, 'free-tool-scripts', f), 'utf8');
const js = (...files) => [read('_shared.js'), ...files.map(read)].join('\n');

module.exports = ({ esc, howTo, faqHtml, HUB }) => {
  const privacy = (extra = '') => `<p class="tool-note">Runs 100% in your browser. Nothing you add is uploaded to any server.${extra}</p>`;
  const sec = inner => `
    <section class="section" style="padding-top:10px">
      <div class="container tool">
${inner}
      </div>
    </section>`;
  const panel = (inner, cls = '') => `        <div class="tool-panel${cls ? ' ' + cls : ''}">\n${inner}\n        </div>`;
  const hints = id => `<ul class="tool-hints" id="${id}" aria-live="polite"></ul>`;
  const out = (id, label, rows = 6) => `          <div class="tool-out-head"><h2 class="tool-h">${label}</h2><button type="button" class="btn btn-sm btn-ghost" data-copy="${id}">Copy</button></div>
          <label class="tool-label" for="${id}">${label}</label>
          <textarea id="${id}" class="tool-code" rows="${rows}" readonly></textarea>`;
  const field = (id, label, attrs = '', type = 'text') => `          <label class="tool-label" for="${id}">${label}</label>
          <input type="${type}" id="${id}" class="tool-input" ${attrs}>`;
  const read2 = (blog, blogText, svc, svcText) => (blog ? `\n        <p>Related reading: <a href="/blog/${blog}/" class="link-inline">${blogText}</a>.</p>` : '') +
    `\n        <p>Want it done for you? See <a href="/${svc}/" class="link-inline">${svcText}</a>.</p>`;
  const page = t => t.main + howTo(t.steps, read2(...t.links)) + faqHtml(t.faqHead, t.faqs);

  const T = [];

  // ---------------- Image tools ----------------
  T.push({
    cat: 'Image tools', slug: `${HUB}/background-remover`, name: 'Background Remover', crumb: 'Background Remover',
    title: 'Free Background Remover (Private, In-Browser) | Samverse',
    description: 'Remove the background from a photo for free. Runs on your device with no upload, then download a transparent PNG or add a white or custom colour.',
    blurb: 'Cut out the subject of a photo on your own device and download a transparent PNG, or put it on white or any colour.',
    h1: 'Free background remover', lead: 'Remove the background from product photos, portraits and logos without uploading them. The AI model runs inside your browser, so your image never leaves your device.',
    main: sec(panel(`          <label class="tool-label" for="bgFile">Choose an image (PNG, JPG or WebP)</label>
          <input type="file" id="bgFile" accept="image/png,image/jpeg,image/webp">
          <div class="tool-row"><button type="button" class="btn" id="bgRun">Remove background</button></div>
          <progress id="bgBar" max="100" value="0" hidden aria-label="Progress"></progress>
          <p class="tool-msg" id="bgMsg" role="status" aria-live="polite">Pick an image, then press Remove background.</p>
          ${privacy(' The AI model (open-source, by IMG.LY) downloads once from a CDN the first time you use it, so the first run can take a minute.')}`) + '\n' +
      panel(`          <h2 class="tool-h">Result</h2>
          <div class="tool-row"><label class="tool-label" for="bgMode">Background</label>
          <select id="bgMode" class="tool-input" style="width:auto"><option value="transparent">Transparent</option><option value="white">White</option><option value="custom">Custom colour</option></select>
          <input type="color" id="bgColor" value="#f1f1f6" aria-label="Custom background colour"></div>
          <div class="img-out checker" id="bgOut"></div>
          <div class="tool-row" id="bgDl"></div>`)),
    script: js('bg-remover.js'),
    steps: ['Choose a photo with a clear subject, such as a product, person or logo.', 'Press <strong>Remove background</strong>. The first run downloads the model; later runs are faster.', 'Pick transparent, white or a custom background colour.', 'Download the PNG and use it on your site, store or marketplace listing.'],
    links: ['woocommerce-product-images-wrong-size', 'fixing WooCommerce product images that show at the wrong size', 'woocommerce-developer', 'WooCommerce development'],
    faqHead: 'Background remover questions',
    faqs: [
      ['Is my photo uploaded?', 'No. The background is removed by an AI model that runs in your browser. Only the model files are downloaded from a CDN; your photo stays on your device.'],
      ['Why is the first run slow?', 'The model files are downloaded the first time, then your browser caches them. After that it works much faster, and the speed depends on your device.'],
      ['How do I get a white background for marketplace listings?', 'After removing the background, choose White in the Background menu and download. Many marketplaces ask for a plain white background on the main product photo.'],
      ['What images work best?', 'Photos where the subject is in focus and stands out from the background. Fine hair, glass and very busy backgrounds may need touching up in an editor.'],
    ],
  });
  T.push({
    cat: 'Image tools', slug: `${HUB}/image-converter`, name: 'Image Converter (PNG, JPG, WebP)', crumb: 'Image Converter',
    title: 'Image Converter: PNG to JPG, WebP, AVIF (Free) | Samverse',
    description: 'Convert images between PNG, JPG and WebP (and AVIF where your browser supports it) in batches. Free, private, with a quality slider. No upload.',
    blurb: 'Convert PNG, JPG and WebP files in bulk, plus AVIF output in supporting browsers, with a quality slider.',
    h1: 'Image converter: PNG, JPG and WebP', lead: 'Convert one image or a whole batch between PNG, JPG and WebP, with AVIF output where your browser can encode it. Files are converted on your device and downloaded one by one.',
    main: sec(panel(`          <div data-imgbatch="cv"></div>
          <label class="tool-label" for="cvFile">Choose images (you can select several)</label>
          <input type="file" id="cvFile" accept="image/*" multiple>
          <label class="tool-label" for="cvFmt">Convert to</label>
          <select id="cvFmt" class="tool-input"><option value="image/webp">WebP</option><option value="image/jpeg">JPG</option><option value="image/png">PNG</option></select>
          <p class="tool-note" id="cvAvifNote"></p>
          <label class="tool-label" for="cvQ">Quality <span id="cvQv"></span></label>
          <input type="range" id="cvQ" min="30" max="100" value="85">
          <div class="tool-row"><button type="button" class="btn" id="cvRun">Convert</button></div>
          ${privacy()}`) + '\n' +
      panel(`          <h2 class="tool-h">Converted files</h2>
          <p class="tool-msg" id="cvMsg" role="status" aria-live="polite">Your converted files appear here.</p>
          <ul class="img-list" id="cvList"></ul>`)),
    script: js('image-batch.js'),
    steps: ['Select one or more images.', 'Choose the format: WebP for websites, JPG for photos that need to open anywhere, PNG for graphics that need transparency.', 'Set the quality. Around 75 to 85 keeps photos looking sharp at a much smaller size.', 'Press <strong>Convert</strong> and download each file.'],
    links: ['image-seo-guide', 'the image SEO guide', 'wordpress-speed-optimization', 'WordPress speed optimization'],
    faqHead: 'Image converter questions',
    faqs: [
      ['Which format is best for a website?', 'WebP is supported by all current major browsers and is usually smaller than JPG or PNG at similar quality. Use PNG only for graphics that need sharp edges or transparency.'],
      ['What happens to transparency when converting to JPG?', 'JPG has no transparency, so transparent areas are filled with white.'],
      ['Why is AVIF missing?', 'AVIF output is shown only if your browser can encode it. If you do not see it, use WebP, or try a recent version of Chrome or Edge.'],
      ['Are my files uploaded?', 'No. Conversion uses your browser canvas, and the files never leave your device.'],
    ],
  });
  T.push({
    cat: 'Image tools', slug: `${HUB}/image-compressor`, name: 'Image Compressor', crumb: 'Image Compressor',
    title: 'Free Image Compressor: JPG & WebP, No Upload | Samverse',
    description: 'Compress JPG and WebP images in bulk with a quality slider and max width. See before and after file sizes, then download. Private and free.',
    blurb: 'Shrink JPG and WebP images in bulk with quality and max-width controls, and see the before and after sizes.',
    h1: 'Image compressor for JPG and WebP', lead: 'Make images smaller before you upload them to your website. Set a quality and a maximum width, compress a batch, and compare the file sizes before and after.',
    main: sec(panel(`          <div data-imgbatch="cp"></div>
          <label class="tool-label" for="cpFile">Choose images (you can select several)</label>
          <input type="file" id="cpFile" accept="image/*" multiple>
          <label class="tool-label" for="cpFmt">Output format</label>
          <select id="cpFmt" class="tool-input"><option value="image/jpeg">JPG</option><option value="image/webp">WebP</option></select>
          <label class="tool-label" for="cpQ">Quality <span id="cpQv"></span></label>
          <input type="range" id="cpQ" min="30" max="95" value="75">
          <label class="tool-label" for="cpMax">Maximum width in pixels (leave empty to keep the size)</label>
          <input type="number" id="cpMax" class="tool-input" min="100" max="8000" value="1600">
          <div class="tool-row"><button type="button" class="btn" id="cpRun">Compress</button></div>
          ${privacy()}`) + '\n' +
      panel(`          <h2 class="tool-h">Compressed files</h2>
          <p class="tool-msg" id="cpMsg" role="status" aria-live="polite">Before and after sizes appear here.</p>
          <ul class="img-list" id="cpList"></ul>`)),
    script: js('image-batch.js'),
    steps: ['Select the images you want to shrink.', 'Choose JPG or WebP and a quality. Start around 75 and check the result.', 'Set a maximum width. Most content images do not need to be wider than about 1600 px.', 'Press <strong>Compress</strong>, compare the sizes and download the files you want to keep.'],
    links: ['image-optimization-wordpress', 'image optimization for WordPress', 'wordpress-speed-optimization', 'WordPress speed optimization'],
    faqHead: 'Image compressor questions',
    faqs: [
      ['What quality should I use?', 'For most photos, a quality between 70 and 85 looks almost the same as the original at a much smaller file size. Check the downloaded file and adjust if you see blur or blocky areas.'],
      ['Why did a file get bigger?', 'Images that are already well compressed, or simple graphics saved as PNG, can grow when re-encoded. The tool tells you, so you can keep the original.'],
      ['Does resizing help as much as compression?', 'Often more. An image shown 800 px wide on the page but saved 4000 px wide wastes a lot of data, so setting a maximum width is one of the biggest savings.'],
    ],
  });
  T.push({
    cat: 'Image tools', slug: `${HUB}/image-resizer`, name: 'Image Resizer & Cropper', crumb: 'Image Resizer',
    title: 'Image Resizer & Cropper with Social Presets | Samverse',
    description: 'Resize and crop images to exact pixels or presets: Instagram post and story, OG image 1200x630, YouTube thumbnail, WooCommerce product. Free, no upload.',
    blurb: 'Resize or crop to exact pixels, or pick a preset for Instagram, Open Graph, YouTube thumbnails and WooCommerce products.',
    h1: 'Image resizer and cropper', lead: 'Resize an image to exact pixel dimensions, keep the aspect ratio, or crop it to fill a preset size for social posts, share images, thumbnails and product photos.',
    main: sec(panel(`          <label class="tool-label" for="rzFile">Choose an image</label>
          <input type="file" id="rzFile" accept="image/*">
          <label class="tool-label" for="rzPreset">Preset size</label>
          <select id="rzPreset" class="tool-input"><option value="">Custom size</option><option value="1080x1080">Instagram post (1080x1080)</option><option value="1080x1350">Instagram portrait (1080x1350)</option><option value="1080x1920">Instagram or WhatsApp story (1080x1920)</option><option value="1200x630">Open Graph share image (1200x630)</option><option value="1280x720">YouTube thumbnail (1280x720)</option><option value="800x800">WooCommerce product (800x800)</option><option value="1920x1080">Full HD banner (1920x1080)</option></select>
          <div class="tool-row">
            <div><label class="tool-label" for="rzW">Width (px)</label><input type="number" id="rzW" class="tool-input" min="1" max="8000" value="1080"></div>
            <div><label class="tool-label" for="rzH">Height (px)</label><input type="number" id="rzH" class="tool-input" min="1" max="8000" value="1080"></div>
          </div>
          <label class="tool-label" for="rzMode">How to fit the image</label>
          <select id="rzMode" class="tool-input"><option value="crop">Crop to fill (centre)</option><option value="fit">Fit inside and pad with a colour</option><option value="stretch">Resize to exact size</option></select>
          <div class="tool-row"><label class="calc-single"><input type="checkbox" id="rzKeep" checked> Keep aspect ratio when typing (exact-size mode)</label>
          <label class="tool-label" for="rzBg">Pad colour</label><input type="color" id="rzBg" value="#ffffff"></div>
          <label class="tool-label" for="rzFmt">Format</label>
          <select id="rzFmt" class="tool-input"><option value="image/jpeg">JPG</option><option value="image/png">PNG</option><option value="image/webp">WebP</option></select>
          ${privacy()}`) + '\n' +
      panel(`          <h2 class="tool-h">Preview</h2>
          <p class="tool-msg" id="rzMsg" role="status" aria-live="polite">Choose an image to see the preview.</p>
          <div class="img-out" id="rzOut"></div>
          <div class="tool-row" id="rzDl"></div>`)),
    script: js('resizer.js'),
    steps: ['Choose your image.', 'Pick a preset, or type a custom width and height.', 'Choose crop to fill, fit with padding, or exact resize.', 'Check the preview and download.'],
    links: ['woocommerce-product-images-wrong-size', 'why WooCommerce product images show at the wrong size', 'woocommerce-developer', 'WooCommerce development'],
    faqHead: 'Image resizer questions',
    faqs: [
      ['What size should an Open Graph image be?', '1200x630 pixels is the widely used size for Facebook, LinkedIn and WhatsApp link previews. Keep important text away from the edges.'],
      ['What is the difference between crop and fit?', 'Crop to fill covers the whole frame and trims the edges that do not fit. Fit inside keeps the whole image and fills the empty space with a colour.'],
      ['Why do my WooCommerce images look different sizes?', 'Products look uneven when the photos have different aspect ratios. Cropping every photo to the same square size, such as 800x800, keeps the shop grid neat.'],
    ],
  });
  T.push({
    cat: 'Image tools', slug: `${HUB}/image-to-base64`, name: 'Image to Base64 Converter', crumb: 'Image to Base64',
    title: 'Image to Base64 & Base64 to Image Converter | Samverse',
    description: 'Convert an image to a Base64 data URI for HTML or CSS, or paste Base64 to preview and download the image. Free, in your browser, no upload.',
    blurb: 'Turn an image into a Base64 data URI for HTML or CSS, or decode Base64 back into a downloadable image.',
    h1: 'Image to Base64 converter (and back)', lead: 'Encode a small image as a Base64 data URI to paste into HTML, CSS or an email template, or decode a Base64 string to see and save the image.',
    main: sec(panel(`          <h2 class="tool-h">Image to Base64</h2>
          <label class="tool-label" for="b64File">Choose an image</label>
          <input type="file" id="b64File" accept="image/*">
          <p class="tool-msg" id="b64Msg" role="status" aria-live="polite"></p>
${out('b64Out', 'Data URI', 5)}
${out('b64Css', 'CSS and HTML snippets', 5)}
          ${privacy()}`) + '\n' +
      panel(`          <h2 class="tool-h">Base64 to image</h2>
          <label class="tool-label" for="b64In">Paste a data URI or Base64 string</label>
          <textarea id="b64In" class="tool-code" rows="8" placeholder="data:image/png;base64,iVBORw0..."></textarea>
          <p class="tool-msg" id="b64Msg2" role="status" aria-live="polite"></p>
          <div class="img-out checker" id="b64Pv"></div>
          <div class="tool-row" id="b64Dl"></div>`)),
    script: js('base64.js'),
    steps: ['To encode, choose an image. The data URI appears instantly.', 'Copy the data URI, or the ready-made CSS and HTML snippets.', 'To decode, paste a Base64 string in the right-hand box.', 'Check the preview and download the image.'],
    links: [null, null, 'wordpress-website-development', 'WordPress website development'],
    faqHead: 'Base64 questions',
    faqs: [
      ['When should I use Base64 images?', 'For very small images such as tiny icons, or where you cannot host a separate file, like some email templates. For normal images, a regular file is better because it can be cached.'],
      ['Why is the Base64 version bigger?', 'Base64 encoding adds roughly a third to the size of the data, so a 30 KB image becomes about 40 KB of text.'],
      ['Is my image uploaded?', 'No. The encoding and decoding both happen in your browser.'],
    ],
  });

  // ---------------- SEO tools ----------------
  T.push({
    cat: 'SEO tools', slug: `${HUB}/meta-title-description-checker`, name: 'Meta Title & Description Checker', crumb: 'Meta Tag Checker',
    title: 'Meta Title & Description Length Checker | Samverse',
    description: 'Check meta title and description length in pixels and characters with a live Google result preview for desktop and mobile, plus truncation warnings.',
    blurb: 'Preview your title and meta description as a Google result on desktop and mobile, with pixel widths and truncation warnings.',
    h1: 'Meta title and description length checker', lead: 'Type a page title and meta description and see roughly how they will look in Google on desktop and mobile, with character counts, pixel widths and a warning when they are likely to be cut off.',
    main: sec(panel(`${field('mcTitle', 'Page title', 'maxlength="200" placeholder="WordPress Speed Optimization Service | Brand"')}
          <p class="tool-note" id="mcTc"></p>
          <label class="tool-label" for="mcDesc">Meta description</label>
          <textarea id="mcDesc" class="tool-input" rows="4" maxlength="400" placeholder="One or two sentences that tell searchers what the page gives them."></textarea>
          <p class="tool-note" id="mcDc"></p>
${field('mcUrl', 'Page URL (optional)', 'placeholder="https://example.com/services/"')}
          <label class="tool-label" for="mcDev">Preview on</label>
          <select id="mcDev" class="tool-input"><option value="desktop">Desktop</option><option value="mobile">Mobile</option></select>
          ${privacy()}`) + '\n' +
      panel(`          <h2 class="tool-h">Search result preview</h2>
          <div class="serp" id="mcPv"><div class="serp-url" id="mcPvUrl"></div><div class="serp-title" id="mcPvTitle"></div><div class="serp-desc" id="mcPvDesc"></div></div>
          ${hints('mcHints')}`)),
    script: js('meta-checker.js'),
    steps: ['Type or paste your page title.', 'Add the meta description.', 'Switch between desktop and mobile previews.', 'Shorten anything marked as likely to be cut off, keeping the main keyword near the start.'],
    links: ['write-meta-titles-descriptions', 'how to write meta titles and descriptions', 'wordpress-seo-services', 'WordPress SEO services'],
    faqHead: 'Meta tag length questions',
    faqs: [
      ['How long should a title tag be?', 'Google truncates titles by pixel width rather than a fixed character count. Around 50 to 60 characters usually fits on desktop, but wide letters take more space, which is why the tool measures pixels.'],
      ['How long should a meta description be?', 'Aim for roughly 120 to 155 characters. Google may show more or less depending on the search and the device.'],
      ['Why does Google show a different title or description?', 'Google can rewrite them when it thinks other text on the page matches the search better. A clear, accurate title and description that match the page make this less likely.'],
    ],
  });
  T.push({
    cat: 'SEO tools', slug: `${HUB}/robots-txt-generator`, name: 'Robots.txt Generator', crumb: 'Robots.txt Generator',
    title: 'Robots.txt Generator for WordPress (Free) | Samverse',
    description: 'Create a robots.txt file with WordPress-safe defaults, a sitemap line, optional AI crawler blocks and warnings for risky rules like Disallow: /.',
    blurb: 'Build a robots.txt with WordPress-safe defaults, your sitemap URL and optional AI crawler blocks, with warnings for risky rules.',
    h1: 'Robots.txt generator for WordPress', lead: 'Tick the options you need and copy a clean robots.txt. The defaults are safe for WordPress, and the tool warns you about rules that could block your whole site or its CSS.',
    main: sec(panel(`          <fieldset class="tool-radios"><legend class="tool-label">Rules</legend>
          <label class="calc-single"><input type="checkbox" id="rbWp" checked> WordPress defaults (block /wp-admin/, allow admin-ajax.php)</label>
          <label class="calc-single"><input type="checkbox" id="rbSearch"> Block internal search result pages</label>
          <label class="calc-single"><input type="checkbox" id="rbFeeds"> Block comment and category feeds</label>
          <label class="calc-single"><input type="checkbox" id="rbAi"> Block common AI training crawlers (GPTBot, CCBot, Google-Extended and others)</label>
          <label class="calc-single"><input type="checkbox" id="rbBlockAll"> Block everything (staging sites only)</label>
          </fieldset>
${field('rbSitemap', 'Sitemap URL', 'placeholder="https://example.com/sitemap_index.xml"', 'url')}
          <label class="tool-label" for="rbCustom">Extra paths to block (one per line)</label>
          <textarea id="rbCustom" class="tool-input" rows="3" placeholder="/cart/&#10;/checkout/"></textarea>
          <label class="tool-label" for="rbAllow">Paths to allow (one per line, optional)</label>
          <textarea id="rbAllow" class="tool-input" rows="2"></textarea>
          ${privacy()}`) + '\n' +
      panel(`${out('rbOut', 'robots.txt', 14)}
          ${hints('rbHints')}`)),
    script: js('robots.js'),
    steps: ['Keep the WordPress defaults ticked unless you have a reason not to.', 'Add your sitemap URL.', 'Add any extra paths to block, such as cart or checkout pages.', 'Copy the result into a file named robots.txt at your site root, or into the robots.txt editor in Yoast or Rank Math.'],
    links: ['robots-txt-explained', 'robots.txt explained', 'wordpress-seo-services', 'WordPress SEO services'],
    faqHead: 'Robots.txt questions',
    faqs: [
      ['Does robots.txt remove pages from Google?', 'No. It only stops crawling. A blocked page can still be indexed if other sites link to it. To remove a page, use a noindex tag and let Google crawl it.'],
      ['Should I block /wp-content/ or /wp-includes/?', 'No. Google needs your CSS, JavaScript and images to render pages properly, and many of those files live in these folders.'],
      ['Where does robots.txt go?', 'At the root of your domain, so it opens at example.com/robots.txt. Each subdomain needs its own file.'],
      ['What does Disallow: / do?', 'It asks all crawlers not to crawl any page on the site. It is useful on staging sites, but on a live site it can make your pages drop out of search.'],
    ],
  });
  T.push({
    cat: 'SEO tools', slug: `${HUB}/open-graph-generator`, name: 'Open Graph & Twitter Card Generator', crumb: 'Open Graph Generator',
    title: 'Open Graph & Twitter Card Meta Tag Generator | Samverse',
    description: 'Generate Open Graph and Twitter card meta tags with a live share preview. Add title, description, image and URL, check warnings, copy the tags.',
    blurb: 'Write Open Graph and Twitter card tags with a live link-preview card and checks for missing or oversized fields.',
    h1: 'Open Graph and Twitter card tag generator', lead: 'Fill in your page details to get the Open Graph and Twitter card meta tags that control how links look on Facebook, LinkedIn, WhatsApp and X, with a live preview.',
    main: sec(panel(`${field('ogTitle', 'Title', 'placeholder="Page title for social shares"')}
          <label class="tool-label" for="ogDesc">Description</label>
          <textarea id="ogDesc" class="tool-input" rows="3"></textarea>
${field('ogUrl', 'Page URL', 'placeholder="https://example.com/page/"', 'url')}
${field('ogImg', 'Image URL (1200x630 recommended)', 'placeholder="https://example.com/share.jpg"', 'url')}
${field('ogSite', 'Site name', 'placeholder="Your brand"')}
          <div class="tool-row">
            <div><label class="tool-label" for="ogType">og:type</label><select id="ogType" class="tool-input"><option>website</option><option>article</option><option>product</option></select></div>
            <div><label class="tool-label" for="ogCard">Twitter card</label><select id="ogCard" class="tool-input"><option value="summary_large_image">Large image</option><option value="summary">Small image</option></select></div>
          </div>
${field('ogHandle', 'X (Twitter) handle, optional', 'placeholder="@yourbrand"')}
          ${privacy()}`) + '\n' +
      panel(`          <h2 class="tool-h">Share preview</h2>
          <div class="og-pv"><div class="og-pv-img" id="ogPvImg"></div><div class="og-pv-body"><span id="ogPvHost"></span><strong id="ogPvTitle"></strong><span id="ogPvDesc"></span></div></div>
          ${hints('ogHints')}
${out('ogOut', 'Meta tags', 12)}`)),
    script: js('og.js'),
    steps: ['Enter the title and description you want people to see when the link is shared.', 'Add the full page URL and a full https:// image URL.', 'Check the live preview and the warnings.', 'Copy the tags into the &lt;head&gt; of the page. On WordPress, Yoast and Rank Math have social fields that do this for you.'],
    links: ['on-page-seo-checklist', 'the on-page SEO checklist', 'wordpress-seo-services', 'WordPress SEO services'],
    faqHead: 'Open Graph questions',
    faqs: [
      ['What image size should I use?', '1200x630 pixels works well for most platforms. Use a JPG or PNG under a few hundred KB and keep text away from the edges.'],
      ['Why does Facebook or WhatsApp still show the old preview?', 'Platforms cache previews. Use the Facebook Sharing Debugger to scrape the URL again; WhatsApp usually updates after some time or with a new URL.'],
      ['Do Open Graph tags help SEO?', 'They do not change rankings directly, but a clear preview can earn more clicks when your pages are shared.'],
    ],
  });
  T.push({
    cat: 'SEO tools', slug: `${HUB}/word-counter`, name: 'Word Counter & Keyword Density', crumb: 'Word Counter',
    title: 'Word Counter, Reading Time & Keyword Density | Samverse',
    description: 'Count words, characters, sentences and paragraphs, estimate reading and speaking time, and see keyword density and top phrases. Free and private.',
    blurb: 'Count words and characters, estimate reading time, and see the most used keywords and two-word phrases.',
    h1: 'Word counter with reading time and keyword density', lead: 'Paste your text to count words, characters, sentences and paragraphs, estimate reading and speaking time, and check which keywords and phrases you use most.',
    main: sec(panel(`          <label class="tool-label" for="wcText">Your text</label>
          <textarea id="wcText" class="tool-input" rows="16" placeholder="Paste or type your text here"></textarea>
          <label class="tool-label" for="wcWpm">Reading speed (words per minute)</label>
          <input type="number" id="wcWpm" class="tool-input" min="50" max="600" value="200">
          ${privacy()}`) + '\n' +
      panel(`          <h2 class="tool-h">Counts</h2>
          <div class="wc-stats" id="wcStats" aria-live="polite"></div>
          <h2 class="tool-h">Top keywords</h2>
          <table class="tool-table"><thead><tr><th scope="col">Word</th><th scope="col">Count</th><th scope="col">Density</th></tr></thead><tbody id="wcDens"></tbody></table>
          <h2 class="tool-h">Top two-word phrases</h2>
          <table class="tool-table"><thead><tr><th scope="col">Phrase</th><th scope="col">Count</th><th scope="col">Density</th></tr></thead><tbody id="wcPhr"></tbody></table>`)),
    script: js('word-counter.js'),
    steps: ['Paste or type your text.', 'Read the word, character and sentence counts as you type.', 'Adjust the reading speed if your audience reads faster or slower.', 'Check the keyword tables to spot words you repeat too often.'],
    links: ['add-blog-to-existing-website', 'adding a blog to an existing website', 'wordpress-seo-services', 'WordPress SEO services'],
    faqHead: 'Word counter questions',
    faqs: [
      ['How is reading time worked out?', 'Word count divided by the reading speed you set, which defaults to 200 words per minute. Speaking time uses 130 words per minute.'],
      ['What is a good keyword density?', 'There is no ideal number. Write naturally for the reader; if one word stands far above the rest in the table, it may read as repetitive.'],
      ['Which words are ignored in the keyword table?', 'Common words such as "the", "and" and "with", and words of two letters or fewer, so the table shows meaningful terms.'],
    ],
  });

  // ---------------- Marketing tools ----------------
  T.push({
    cat: 'Marketing tools', slug: `${HUB}/utm-builder`, name: 'UTM Link Builder (GA4)', crumb: 'UTM Builder',
    title: 'UTM Link Builder for GA4 with Bulk Mode (Free) | Samverse',
    description: 'Build UTM tracking links for Google Analytics 4: source, medium, campaign, term and content, with checks for capitals and spaces and a bulk mode.',
    blurb: 'Build GA4 campaign links with UTM tags, consistency checks and a bulk mode for many URLs at once.',
    h1: 'UTM link builder for GA4', lead: 'Add UTM parameters to your links so Google Analytics 4 shows exactly which campaign, ad or post sent each visitor. Build one link or tag a whole list.',
    main: sec(panel(`${field('utmUrl', 'Website URL', 'placeholder="https://example.com/offer/"', 'url')}
${field('utm_source', 'utm_source (where: google, facebook, newsletter)', 'placeholder="facebook"')}
${field('utm_medium', 'utm_medium (how: cpc, email, social)', 'placeholder="paid_social"')}
${field('utm_campaign', 'utm_campaign (which campaign)', 'placeholder="diwali_sale"')}
${field('utm_id', 'utm_id (campaign ID, optional)')}
${field('utm_term', 'utm_term (keyword, optional)')}
${field('utm_content', 'utm_content (ad or link variant, optional)')}
          <label class="calc-single"><input type="checkbox" id="utmLower" checked> Convert values to lowercase</label>
          ${privacy()}`) + '\n' +
      panel(`${out('utmOut', 'Tracking link', 4)}
          ${hints('utmHints')}
          <h2 class="tool-h">Bulk mode</h2>
          <label class="tool-label" for="utmBulk">Paste URLs, one per line. The tags on the left are added to each.</label>
          <textarea id="utmBulk" class="tool-input" rows="5"></textarea>
${out('utmBulkOut', 'Tagged URLs', 6)}`)),
    script: js('utm.js'),
    steps: ['Paste the page URL you want people to land on.', 'Fill in source, medium and campaign. Keep the names consistent across campaigns.', 'Copy the tracking link, or paste a list of URLs in bulk mode.', 'In GA4, find the results under Reports, Acquisition, Traffic acquisition, with the session campaign dimension.'],
    links: ['utm-tags-explained', 'UTM tags explained', 'landing-page-design', 'landing page design'],
    faqHead: 'UTM builder questions',
    faqs: [
      ['Which UTM tags are required?', 'GA4 needs utm_source to attribute the visit, and you should add utm_medium and utm_campaign too. utm_term, utm_content and utm_id are optional.'],
      ['Are UTM values case-sensitive?', 'Yes. "Facebook" and "facebook" show as two sources, which is why the tool lowercases values by default.'],
      ['Should I use UTM tags on internal links?', 'No. Tagging links between your own pages starts a new session with the wrong source. Use them only on links from outside your site.'],
    ],
  });
  T.push({
    cat: 'Marketing tools', slug: `${HUB}/whatsapp-link-generator`, name: 'WhatsApp Link & QR Generator', crumb: 'WhatsApp Link Generator',
    title: 'WhatsApp Link Generator with Message & QR | Samverse',
    description: 'Create a wa.me click-to-chat link with a prefilled message, copy a ready button snippet and download a QR code for print. Free, no sign-up.',
    blurb: 'Make a wa.me click-to-chat link with a prefilled message, an HTML button snippet and a QR code for print.',
    h1: 'WhatsApp link generator with message and QR code', lead: 'Turn your WhatsApp number into a click-to-chat link with a ready-typed message, then put it on your website, Instagram bio, ads or a printed QR code.',
    main: sec(panel(`          <div class="tool-row">
            <div><label class="tool-label" for="waCc">Country code</label><input type="text" id="waCc" class="tool-input" value="91" inputmode="numeric" style="max-width:90px"></div>
            <div style="flex:1"><label class="tool-label" for="waNum">WhatsApp number</label><input type="tel" id="waNum" class="tool-input" placeholder="98765 43210"></div>
          </div>
          <label class="tool-label" for="waText">Prefilled message (optional)</label>
          <textarea id="waText" class="tool-input" rows="4" placeholder="Hi, I saw your website and would like a quote for..."></textarea>
          <p class="tool-msg" id="waMsg" role="status" aria-live="polite"></p>
          ${privacy(' The QR code library loads from a CDN only when you press the QR button.')}`) + '\n' +
      panel(`${out('waOut', 'WhatsApp link', 3)}
          <div class="tool-row"><a class="btn btn-sm btn-ghost" id="waTest" href="#" target="_blank" rel="noopener" hidden>Test the link</a></div>
${out('waHtml', 'HTML button snippet', 3)}
          <div class="tool-row"><button type="button" class="btn" id="waQrBtn">Make QR code</button></div>
          <div class="img-out" id="waQr"></div>
          <div class="tool-row" id="waQrDl"></div>`)),
    script: js('whatsapp.js'),
    steps: ['Enter your country code and WhatsApp number (no leading 0).', 'Type the message customers should see ready in their chat box.', 'Copy the link or the HTML snippet for your site.', 'Make a QR code and download it as PNG or SVG for flyers, shop counters and packaging.'],
    links: ['whatsapp-on-business-website', 'adding WhatsApp to a business website', 'wordpress-website-development', 'WordPress website development'],
    faqHead: 'WhatsApp link questions',
    faqs: [
      ['Does the link work for WhatsApp Business numbers?', 'Yes. wa.me links work for both personal and WhatsApp Business numbers.'],
      ['Why do I need the country code?', 'wa.me links use the full international number without the plus sign or leading zero, for example 91 followed by the 10-digit number in India.'],
      ['Can I change the message later?', 'The message is part of the link, so a new message needs a new link and a new QR code. If you print QR codes, keep the message general.'],
    ],
  });
  T.push({
    cat: 'Marketing tools', slug: `${HUB}/qr-code-generator`, name: 'QR Code Generator', crumb: 'QR Code Generator',
    title: 'QR Code Generator: URL, WiFi, vCard, SVG | Samverse',
    description: 'Make QR codes for a URL, text, WiFi login or vCard contact. Choose size, colours and error correction, then download PNG or SVG. Free, no tracking.',
    blurb: 'Create QR codes for links, text, WiFi logins and contact cards, and download them as PNG or SVG.',
    h1: 'QR code generator for URL, WiFi and vCard', lead: 'Create a static QR code for a link, plain text, your WiFi network or a contact card. It does not expire and does not redirect through anyone else, because the data is in the code itself.',
    main: sec(panel(`          <label class="tool-label" for="qrType">QR code type</label>
          <select id="qrType" class="tool-input"><option value="url">Website URL</option><option value="text">Plain text</option><option value="wifi">WiFi network</option><option value="vcard">Contact card (vCard)</option></select>
          <div data-qr="url">${field('qrUrl', 'URL', 'placeholder="https://example.com/"', 'url')}</div>
          <div data-qr="text" hidden><label class="tool-label" for="qrText">Text</label><textarea id="qrText" class="tool-input" rows="4"></textarea></div>
          <div data-qr="wifi" hidden>${field('qrSsid', 'Network name (SSID)')}${field('qrPass', 'Password')}
            <label class="tool-label" for="qrEnc">Security</label><select id="qrEnc" class="tool-input"><option value="WPA">WPA/WPA2/WPA3</option><option value="WEP">WEP</option><option value="nopass">None</option></select>
            <label class="calc-single"><input type="checkbox" id="qrHidden"> Hidden network</label></div>
          <div data-qr="vcard" hidden>${field('qrFn', 'First name')}${field('qrLn', 'Last name')}${field('qrOrg', 'Company')}${field('qrTel', 'Phone', '', 'tel')}${field('qrEmail', 'Email', '', 'email')}${field('qrWeb', 'Website', '', 'url')}</div>
          <div class="tool-row">
            <div><label class="tool-label" for="qrSize">Size</label><select id="qrSize" class="tool-input"><option value="256">256 px</option><option value="512" selected>512 px</option><option value="1024">1024 px</option><option value="2048">2048 px</option></select></div>
            <div><label class="tool-label" for="qrEcl">Error correction</label><select id="qrEcl" class="tool-input"><option value="L">Low</option><option value="M" selected>Medium</option><option value="Q">Quartile</option><option value="H">High</option></select></div>
            <div><label class="tool-label" for="qrFg">Colour</label><input type="color" id="qrFg" value="#000000"></div>
            <div><label class="tool-label" for="qrBg">Background</label><input type="color" id="qrBg" value="#ffffff"></div>
          </div>
          ${privacy(' The small open-source QR library loads from a CDN; your data is encoded on your device.')}`, 'qr-tool') + '\n' +
      panel(`          <h2 class="tool-h">Your QR code</h2>
          <p class="tool-msg" id="qrMsg" role="status" aria-live="polite"></p>
          <div class="img-out" id="qrBox"></div>
          <div class="tool-row" id="qrDl"></div>`)),
    script: js('qr.js'),
    steps: ['Pick the type: URL, text, WiFi or contact card.', 'Fill in the details. The code updates as you type.', 'Set the size and colours. Keep strong contrast, dark on light, so phones can read it.', 'Scan it with your phone to test, then download PNG for screens or SVG for print.'],
    links: ['whatsapp-marketing-small-business', 'WhatsApp marketing for small businesses', 'wordpress-website-development', 'WordPress website development'],
    faqHead: 'QR code questions',
    faqs: [
      ['Do these QR codes expire?', 'No. They are static codes with the data inside them, so they keep working as long as the link or details inside stay valid.'],
      ['PNG or SVG?', 'PNG for websites, slides and social posts. SVG for print, because it scales to any size without going blurry.'],
      ['What does error correction do?', 'Higher levels let the code still scan when part of it is damaged or covered, but make it denser. Medium suits most uses.'],
      ['Can I track scans?', 'Not with a static code. Put a UTM-tagged URL in the code and you can see the visits in Google Analytics.'],
    ],
  });

  // ---------------- Developer tools ----------------
  T.push({
    cat: 'Developer tools', slug: `${HUB}/json-formatter`, name: 'JSON & JSON-LD Formatter', crumb: 'JSON Formatter',
    title: 'JSON & JSON-LD Formatter and Validator | Samverse',
    description: 'Format, minify and validate JSON or JSON-LD schema. Shows the line and column of errors and hints for trailing commas, curly quotes and @context.',
    blurb: 'Pretty-print, minify and validate JSON and JSON-LD, with the exact error position and schema hints.',
    h1: 'JSON and JSON-LD formatter and validator', lead: 'Paste JSON or a JSON-LD schema block to format it, minify it or find the exact line and column of a syntax error. Script tags around JSON-LD are stripped automatically.',
    main: sec(panel(`          <label class="tool-label" for="jsIn">Paste JSON or JSON-LD</label>
          <textarea id="jsIn" class="tool-code" rows="18" placeholder='{"@context": "https://schema.org", "@type": "Organization", "name": "Example"}'></textarea>
          <div class="tool-row"><button type="button" class="btn" id="jsFormat">Format</button><button type="button" class="btn btn-ghost" id="jsMin">Minify</button>
          <label class="tool-label" for="jsIndent">Indent</label><select id="jsIndent" class="tool-input" style="width:auto"><option value="2">2 spaces</option><option value="4">4 spaces</option><option value="tab">Tab</option></select></div>
          ${privacy()}`) + '\n' +
      panel(`          ${hints('jsHints')}
${out('jsOut', 'Result', 18)}`)),
    script: js('json.js'),
    steps: ['Paste your JSON or JSON-LD, with or without the script tags.', 'Press <strong>Format</strong> to pretty-print it or <strong>Minify</strong> to compress it.', 'If there is an error, fix it at the line and column shown.', 'Copy the result. For schema, also test it in the Rich Results Test.'],
    links: ['technical-seo-audit-wordpress', 'the technical SEO audit for WordPress', 'wordpress-seo-services', 'WordPress SEO services'],
    faqHead: 'JSON formatter questions',
    faqs: [
      ['Does valid JSON mean my schema is valid?', 'Not always. Valid JSON is the first step. Google also checks the schema types and required properties, so test the page in the Rich Results Test too.'],
      ['What are the most common JSON errors?', 'Trailing commas, single quotes instead of double quotes, curly quotes pasted from a word processor, and missing commas between items.'],
      ['Is my data sent anywhere?', 'No. Parsing and formatting happen in your browser.'],
    ],
  });
  T.push({
    cat: 'Developer tools', slug: `${HUB}/color-contrast-checker`, name: 'Colour Contrast Checker & Converter', crumb: 'Contrast Checker',
    title: 'Color Contrast Checker (WCAG) & HEX/RGB/HSL | Samverse',
    description: 'Check text and background colour contrast against WCAG AA and AAA, with a live preview, and convert colours between HEX, RGB and HSL. Free.',
    blurb: 'Test colour pairs against WCAG AA and AAA contrast levels, and convert colours between HEX, RGB and HSL.',
    h1: 'Colour contrast checker (WCAG) and HEX, RGB, HSL converter', lead: 'Check whether your text colour is readable on its background under WCAG 2 AA and AAA, see a live preview, and convert any colour between HEX, RGB and HSL.',
    main: sec(panel(`          <div class="tool-row">
            <div><label class="tool-label" for="ccFg">Text colour</label><input type="text" id="ccFg" class="tool-input" value="#5B5B6E"></div><input type="color" id="ccFgPick" value="#5b5b6e" aria-label="Pick text colour">
          </div>
          <div class="tool-row">
            <div><label class="tool-label" for="ccBg">Background colour</label><input type="text" id="ccBg" class="tool-input" value="#FFFFFF"></div><input type="color" id="ccBgPick" value="#ffffff" aria-label="Pick background colour">
          </div>
          <div class="tool-row"><button type="button" class="btn btn-sm btn-ghost" id="ccSwap">Swap colours</button></div>
          <div class="cc-pv" id="ccPv"><p class="cc-big">Large heading text</p><p>Normal body text looks like this. Can you read it comfortably?</p></div>
          ${privacy()}`) + '\n' +
      panel(`          <h2 class="tool-h">Contrast ratio</h2>
          <p class="cc-ratio" id="ccRatio" aria-live="polite"></p>
          <ul class="tool-hints" id="ccRes"></ul>
          <h2 class="tool-h">HEX, RGB and HSL converter</h2>
          <label class="tool-label" for="cvIn">Enter a colour in any format</label>
          <div class="tool-row"><input type="text" id="cvIn" class="tool-input" value="#7C3AED" style="flex:1"><span class="cv-swatch" id="cvSwatch" aria-hidden="true"></span></div>
          <p class="tool-msg" id="cvMsg" role="status"></p>
${out('cvOut', 'Converted values', 3)}`)),
    script: js('contrast.js'),
    steps: ['Enter or pick the text colour and the background colour.', 'Read the contrast ratio and the AA and AAA results.', 'Adjust the colours until normal text passes AA (4.5:1) at least.', 'Use the converter to get the same colour as HEX, RGB or HSL for your CSS or theme settings.'],
    links: ['choose-website-colours-fonts', 'choosing website colours and fonts', 'website-redesign', 'website redesign'],
    faqHead: 'Colour contrast questions',
    faqs: [
      ['What contrast ratio do I need?', 'WCAG 2 level AA asks for at least 4.5:1 for normal text and 3:1 for large text. Level AAA asks for 7:1 and 4.5:1.'],
      ['What counts as large text?', 'Text of at least 18 point (about 24px), or 14 point (about 18.66px) when bold.'],
      ['Which colour formats can I enter?', 'HEX like #7C3AED or #fff, rgb(124, 58, 237), and hsl(262, 83%, 58%).'],
    ],
  });

  return T.map(t => ({ ...t, eyebrow: 'Free tool', main: page(t) }));
};
