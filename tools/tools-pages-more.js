// More free tools (image, SEO, marketing, developer). Merged into TOOLS by tools/tools-pages.js.
// Each tool's browser JS lives in tools/free-tool-scripts/<name>.js (plain files, so `node --check` works),
// inlined after the shared helpers in _shared.js. Everything runs client-side; nothing is uploaded.
const fs = require('fs');
const path = require('path');
const read = f => fs.readFileSync(path.join(__dirname, 'free-tool-scripts', f), 'utf8');
const js = (...files) => [read('_shared.js'), ...files.map(read)].join('\n');

module.exports = ({ esc, howTo, faqHtml, HUB, moreHtml, reviewCta }) => {
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
  const page = t => t.main + howTo(t.steps, read2(...t.links)) + moreHtml(t.more) + reviewCta(t.name) + faqHtml(t.faqHead, t.faqs);

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
    steps: [
      'Upload a photo with a clear subject: a product, a person or a logo.',
      'Let the tool remove the background, then check the edges at full size, especially hair, glass and shadows.',
      'Pick transparent output, or fill with plain white for marketplaces and product grids.',
      'Download as PNG (keeps transparency) and compress or convert it if it will go on a web page.',
      'Worked example: a handmade product shot on a kitchen table. Remove the background, fill it white, crop to a square, then upload it so it matches the rest of the catalogue.',
    ],
    more: [
      ['Common mistakes with background removal', `<ul>
    <li><strong>Saving the result as JPG.</strong> JPG cannot hold transparency, so the background comes back as a solid colour.</li>
    <li><strong>Poor source photos.</strong> A subject that blends into the background gives rough edges. Shoot against a plain, contrasting surface with even light.</li>
    <li><strong>Leaving halos.</strong> A thin fringe of old background colour shows on dark pages. Zoom in before downloading.</li>
    <li><strong>Inconsistent results across a catalogue.</strong> Mixing cut-outs with lifestyle shots in one product grid looks messy. Pick one style per collection.</li>
  </ul>`],
      ['WordPress and Shopify notes', `<p><strong>WordPress:</strong> transparent PNGs can be heavy. For product grids on a white page, a white-filled WebP is lighter and looks the same. Keep a transparent PNG for use on coloured sections or in the header.</p>
  <p><strong>Shopify:</strong> a plain white or light background across all product photos keeps collection pages tidy, and marketplace feeds such as Google Merchant Center favour clean product images with no added text or watermarks.</p>`],
    ],
    links: ['image-seo-guide', 'the image SEO guide', 'woocommerce-developer', 'WooCommerce development'],
    faqHead: 'Background remover questions',
    faqs: [
      ['Is my photo uploaded?', 'No. The background is removed by an AI model that runs in your browser. Only the model files are downloaded from a CDN; your photo stays on your device.'],
      ['Why is the first run slow?', 'The model files are downloaded the first time, then your browser caches them. After that it works much faster, and the speed depends on your device.'],
      ['How do I get a white background for marketplace listings?', 'After removing the background, choose White in the Background menu and download. Many marketplaces ask for a plain white background on the main product photo.'],
      ['What images work best?', 'Photos where the subject is in focus and stands out from the background. Fine hair, glass and very busy backgrounds may need touching up in an editor.'],
      ['Are my photos uploaded anywhere?', 'No. The background removal runs in your browser, so the image never leaves your device.'],
      ['Why are the edges rough on hair or fur?', 'Fine detail is the hardest part for any automatic tool. A sharper photo against a plain contrasting background gives cleaner edges.'],
      ['Should product photos have a white background?', 'For shop grids and shopping feeds, a plain white or light background is the safest choice. Use lifestyle photos as the second or third image.'],
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
    steps: [
      'Add the images you want to convert: PNG, JPG or WebP.',
      'Pick the output format. WebP for the web, JPG when a platform does not accept WebP, PNG when you need transparency.',
      'Set quality for WebP or JPG (75 to 82 is a good starting point). PNG ignores quality.',
      'Convert, check the preview, then download each file or all of them.',
      'Worked example: a supplier sends product shots as large PNGs. Convert them to WebP at quality 80 before adding them to WooCommerce, and keep the PNG originals in a folder in case you need them again.',
    ],
    more: [
      ['Common conversion mistakes', `<ul>
    <li><strong>Converting a logo with a transparent background to JPG.</strong> JPG has no transparency, so the background turns white or black. Use PNG or WebP.</li>
    <li><strong>Converting JPG to PNG to "improve quality".</strong> Lost detail does not come back. The file just gets bigger.</li>
    <li><strong>Uploading WebP where it is not accepted.</strong> Some email tools, marketplaces and older plugins still want JPG or PNG. Check before converting everything.</li>
    <li><strong>Losing the originals.</strong> Keep a copy of the source files so you can re-export at a different size or format later.</li>
  </ul>`],
      ['WordPress and Shopify notes', `<p><strong>WordPress:</strong> current WordPress accepts WebP uploads and creates WebP thumbnails. If an older theme or page builder shows a broken image, update it first. For logos in the header, transparent PNG or SVG (through a plugin that sanitises SVG) is usually cleaner than WebP.</p>
  <p><strong>Shopify:</strong> you can upload JPG, PNG or WebP, and Shopify serves an optimised format to each browser by itself, so converting to WebP is optional there. Converting still helps when you are uploading many large PNGs, because smaller files upload faster and are easier to manage.</p>`],
    ],
    links: ['image-seo-guide', 'the image SEO guide', 'wordpress-speed-optimization', 'WordPress speed optimization'],
    faqHead: 'Image converter questions',
    faqs: [
      ['Which format is best for a website?', 'WebP is supported by all current major browsers and is usually smaller than JPG or PNG at similar quality. Use PNG only for graphics that need sharp edges or transparency.'],
      ['What happens to transparency when converting to JPG?', 'JPG has no transparency, so transparent areas are filled with white.'],
      ['Why is AVIF missing?', 'AVIF output is shown only if your browser can encode it. If you do not see it, use WebP, or try a recent version of Chrome or Edge.'],
      ['Are my files uploaded?', 'No. Conversion uses your browser canvas, and the files never leave your device.'],
      ['Is WebP supported by all browsers?', 'All current major browsers display WebP. Very old browsers may not, which is why some sites keep a JPG fallback, and why WordPress and Shopify handle fallbacks for you.'],
      ['Does converting change image dimensions?', 'No. The converter keeps the width and height. Use the image resizer if you also need a different size.'],
      ['Which format is best for screenshots?', 'PNG or lossless WebP keeps text sharp. A lossy JPG often blurs small text in screenshots.'],
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
    steps: [
      'Drop in one or more JPG, PNG or WebP images. Everything stays in your browser.',
      'Choose WebP output and set quality between 75 and 82. That range keeps photos sharp while cutting file size hard.',
      'Set a maximum width if the original is huge. A blog image rarely needs to be wider than the content column it sits in.',
      'Compare the before and after preview at 100% zoom, looking at faces, text and edges, then download.',
      'Worked example: a phone photo for a WordPress blog post. Set WebP, quality 80, max width 1600, then upload the result to the Media Library instead of the original.',
    ],
    more: [
      ['Common compression mistakes', `<ul>
    <li><strong>Compressing an image that is still far too large.</strong> Resizing does more than quality settings. Shrink the pixel size first, then compress.</li>
    <li><strong>Compressing the same JPG again and again.</strong> Each save loses detail. Always start from the original file.</li>
    <li><strong>Using PNG for photos.</strong> PNG is lossless and makes photos heavy. Keep PNG for logos, screenshots and images with transparency, and use WebP or JPG for photos.</li>
    <li><strong>Going too low on quality.</strong> Below about 60, banding and blocky skies show up. Product photos lose trust fast when they look smudged.</li>
    <li><strong>Forgetting the file name and alt text.</strong> A small file called <code>IMG_4821.webp</code> with no alt text still misses image search.</li>
  </ul>`],
      ['Recommended settings for WordPress and Shopify', `<p><strong>WordPress:</strong> WordPress creates several resized copies of every upload, so compress before uploading and the copies start smaller too. WebP uploads are supported in current WordPress versions. If you already run an optimisation plugin, avoid double compression: either compress here and switch the plugin's compression off, or let the plugin do it and skip this step. For featured images, match the width your theme actually displays.</p>
  <p><strong>Shopify:</strong> Shopify's CDN converts and resizes images for each device automatically, so your job is to upload a clean, sensibly sized original. Compress very large product photos at quality 80 to 82 before upload to keep the admin and theme editor quick, and keep all product images in a collection the same aspect ratio so the grid lines up.</p>`],
    ],
    links: ['image-optimization-wordpress', 'image optimization for WordPress', 'wordpress-speed-optimization', 'WordPress speed optimization'],
    faqHead: 'Image compressor questions',
    faqs: [
      ['What quality should I use?', 'For most photos, a quality between 70 and 85 looks almost the same as the original at a much smaller file size. Check the downloaded file and adjust if you see blur or blocky areas.'],
      ['Why did a file get bigger?', 'Images that are already well compressed, or simple graphics saved as PNG, can grow when re-encoded. The tool tells you, so you can keep the original.'],
      ['Does resizing help as much as compression?', 'Often more. An image shown 800 px wide on the page but saved 4000 px wide wastes a lot of data, so setting a maximum width is one of the biggest savings.'],
      ['Will compressing images make my website faster?', 'Usually yes, because images are often the heaviest part of a page. The biggest gains come from resizing oversized images and serving WebP, then from lazy loading images below the fold.'],
      ['What quality setting should I use for WebP?', 'Between 75 and 82 suits most photos. Go to the top of that range for product photos and images with fine text, and the bottom for large background images.'],
      ['Should I compress images that are already on my site?', 'Yes for the heaviest ones, such as homepage banners and top product photos. Replace the file with the same name, or update the image in the page, and clear any cache.'],
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
    steps: [
      'Add your image and choose a preset or type an exact width and height.',
      'Choose crop to fill the box, or fit to keep the whole image with no cropping.',
      'Drag the crop area so the subject (a face, a product) stays in frame.',
      'Download the resized file, then compress it with the image compressor if it is still heavy.',
      'Worked example: product photos of mixed shapes for a WooCommerce shop. Crop every one to a 1:1 square at the same pixel size so the shop grid lines up with no gaps.',
    ],
    more: [
      ['Common resizing mistakes', `<ul>
    <li><strong>Making small images bigger.</strong> Upscaling adds blur, not detail. Start from the largest original you have.</li>
    <li><strong>Mixed aspect ratios in one grid.</strong> Product and gallery grids look broken when some images are square and some are tall.</li>
    <li><strong>Cropping off the important part.</strong> Check that heads, product edges and text are not cut, especially in banners that crop again on mobile.</li>
    <li><strong>Uploading at camera size.</strong> A 4000-pixel-wide photo in a 800-pixel column wastes data on every visit.</li>
  </ul>`],
      ['WordPress and Shopify sizes', `<p><strong>WordPress and WooCommerce:</strong> your theme decides the display sizes. WooCommerce has image settings under Appearance, Customize, WooCommerce, Product Images, where you set the thumbnail crop (for example 1:1). After you change them, existing thumbnails need regenerating with a regenerate-thumbnails plugin. Resize uploads to roughly the largest size your theme shows.</p>
  <p><strong>Shopify:</strong> square product images work with almost every theme. Keep all products in the same ratio, and check your theme's documentation for the recommended collection and slideshow banner sizes, since these vary between themes.</p>`],
    ],
    links: ['woocommerce-product-images-wrong-size', 'why WooCommerce product images show at the wrong size', 'woocommerce-developer', 'WooCommerce development'],
    faqHead: 'Image resizer questions',
    faqs: [
      ['What size should an Open Graph image be?', '1200x630 pixels is the widely used size for Facebook, LinkedIn and WhatsApp link previews. Keep important text away from the edges.'],
      ['What is the difference between crop and fit?', 'Crop to fill covers the whole frame and trims the edges that do not fit. Fit inside keeps the whole image and fills the empty space with a colour.'],
      ['Why do my WooCommerce images look different sizes?', 'Products look uneven when the photos have different aspect ratios. Cropping every photo to the same square size, such as 800x800, keeps the shop grid neat.'],
      ['What size should product images be?', 'Use one consistent ratio, usually square, at a size large enough for zoom on your theme. Consistency matters more than any single magic number.'],
      ['Does resizing reduce quality?', 'Shrinking an image keeps it sharp. Enlarging it beyond the original size makes it soft.'],
      ['Why do my images look cropped differently on mobile?', 'Many themes crop banners to a different ratio on small screens. Keep the subject in the centre or upload a separate mobile banner if the theme allows it.'],
    ],
  });
  T.push({
    cat: 'Image tools', slug: `${HUB}/image-to-base64`, noindex: true, name: 'Image to Base64 Converter', crumb: 'Image to Base64',
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
    steps: [
      'Paste your page title and meta description.',
      'Watch the preview and the pixel-width bars. Titles cut off at about 600 pixels on desktop, so put the important words first.',
      'Check the hints for missing keywords, repeated words and the brand name position.',
      'Copy the final text into your SEO plugin or platform settings.',
      'Worked example: "WordPress Speed Optimization in Pune | Samverse" puts the service and city first and the brand last, and the description answers who it is for and what to do next.',
    ],
    more: [
      ['Common meta tag mistakes', `<ul>
    <li><strong>The same title on many pages.</strong> Every indexed page needs its own title that matches its own content.</li>
    <li><strong>Brand first, topic last.</strong> On a long title the topic gets cut off. Put the topic first.</li>
    <li><strong>Keyword stuffing.</strong> Repeating the keyword three times reads as spam and Google may rewrite it.</li>
    <li><strong>A description that does not match the page.</strong> Google often replaces it with page text if it does not answer the query.</li>
    <li><strong>No call to action.</strong> The description is your ad copy in search. Say what the reader gets.</li>
  </ul>`],
      ['Where to put them in WordPress and Shopify', `<p><strong>WordPress:</strong> with Yoast SEO or Rank Math, edit the SEO title and meta description in the box below the editor or in the sidebar. Check the site-wide title template too, so the brand is not added twice.</p>
  <p><strong>Shopify:</strong> scroll to "Search engine listing" at the bottom of a product, collection or page and click Edit. The homepage title and description are under Online Store, Preferences. Some themes append the store name automatically, so leave it out of the field if yours does.</p>`],
    ],
    links: ['write-meta-titles-descriptions', 'how to write meta titles and descriptions', 'wordpress-seo-services', 'WordPress SEO services'],
    faqHead: 'Meta tag length questions',
    faqs: [
      ['How long should a title tag be?', 'Google truncates titles by pixel width rather than a fixed character count. Around 50 to 60 characters usually fits on desktop, but wide letters take more space, which is why the tool measures pixels.'],
      ['How long should a meta description be?', 'Aim for roughly 120 to 155 characters. Google may show more or less depending on the search and the device.'],
      ['Why does Google show a different title or description?', 'Google can rewrite them when it thinks other text on the page matches the search better. A clear, accurate title and description that match the page make this less likely.'],
      ['Why does Google show a different title from mine?', 'Google rewrites titles that are too long, stuffed with keywords or do not match the page. A clear, accurate title close to the H1 is rewritten less often.'],
      ['Does the meta description affect rankings?', 'Not directly. It affects whether people click, which is why it is worth writing for each important page.'],
      ['Should every page have a meta description?', 'Every page you want people to find should. For thin or utility pages, Google will generate one from the page text.'],
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
    steps: [
      'Start from a preset: WordPress, WooCommerce or Shopify-style rules.',
      'Add the paths you want crawlers to skip, such as internal search results and cart pages.',
      'Add your sitemap URL so search engines can find it.',
      'Copy the file, upload it to the root of your domain as /robots.txt, and check it in Search Console.',
      'Worked example for WooCommerce: User-agent: * then Disallow: /cart/, Disallow: /checkout/, Disallow: /my-account/, Disallow: /?s=, then Sitemap: https://example.com/sitemap_index.xml.',
    ],
    more: [
      ['Common robots.txt mistakes', `<ul>
    <li><strong>Disallow: / left over from staging.</strong> This blocks the whole site. Check it after every launch or migration.</li>
    <li><strong>Blocking CSS, JS or /wp-content/.</strong> Google needs these to render the page. Do not block theme or plugin files.</li>
    <li><strong>Using robots.txt to hide a page from Google.</strong> A blocked page can still be indexed from links. Use a noindex tag instead and let Google crawl it.</li>
    <li><strong>Blocking /wp-admin/ entirely.</strong> If you block it, add Allow: /wp-admin/admin-ajax.php, as WordPress does by default.</li>
    <li><strong>Forgetting the sitemap line.</strong> It is a simple way to point every crawler at your sitemap.</li>
  </ul>`],
      ['WordPress and Shopify notes', `<p><strong>WordPress:</strong> WordPress serves a virtual robots.txt until you upload a real file. Yoast SEO and Rank Math let you edit it from the dashboard. For WooCommerce, disallow cart, checkout and my-account, which have no search value. Also check "Discourage search engines" is off under Settings, Reading.</p>
  <p><strong>Shopify:</strong> Shopify generates robots.txt for you and already blocks cart, checkout and internal search. To change it you edit the <code>robots.txt.liquid</code> theme template. Only add rules there if you have a clear reason, such as filtered collection URLs being crawled.</p>`],
    ],
    links: ['robots-txt-explained', 'robots.txt explained', 'wordpress-seo-services', 'WordPress SEO services'],
    faqHead: 'Robots.txt questions',
    faqs: [
      ['Does robots.txt remove pages from Google?', 'No. It only stops crawling. A blocked page can still be indexed if other sites link to it. To remove a page, use a noindex tag and let Google crawl it.'],
      ['Should I block /wp-content/ or /wp-includes/?', 'No. Google needs your CSS, JavaScript and images to render pages properly, and many of those files live in these folders.'],
      ['Where does robots.txt go?', 'At the root of your domain, so it opens at example.com/robots.txt. Each subdomain needs its own file.'],
      ['What does Disallow: / do?', 'It asks all crawlers not to crawl any page on the site. It is useful on staging sites, but on a live site it can make your pages drop out of search.'],
      ['Where do I upload robots.txt?', 'At the root of the domain, so it opens at https://yourdomain.com/robots.txt. Subfolders are ignored.'],
      ['How do I test my robots.txt?', 'Open the robots.txt report in Google Search Console, and use URL Inspection on an important page to confirm it is not blocked.'],
      ['Can robots.txt remove a page from Google?', 'No. To remove a page, use a noindex tag or the Removals tool in Search Console, and keep the page crawlable so Google sees the tag.'],
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
    steps: [
      'Enter the page URL, title and a short description written for social sharing.',
      'Add the share image URL. Use a 1200 x 630 pixel image with any text kept away from the edges.',
      'Choose the card type (summary_large_image for most pages) and copy the generated meta tags.',
      'Paste the tags into the page head, or fill the same fields in your SEO plugin, then test the URL in the platform preview tools.',
      'Worked example: a blog post shared in WhatsApp groups. Set og:image to a 1200 x 630 cover with the post title in large type, so the preview reads clearly even at thumbnail size.',
    ],
    more: [
      ['Common Open Graph mistakes', `<ul>
    <li><strong>A wrong-sized image.</strong> Small or tall images get cropped or shown as a tiny thumbnail. 1200 x 630 works across Facebook, LinkedIn, WhatsApp and X.</li>
    <li><strong>Relative image URLs.</strong> og:image must be a full https URL.</li>
    <li><strong>Old previews after changes.</strong> Platforms cache previews. Re-scrape the URL in the platform's debugger after you update tags.</li>
    <li><strong>Duplicate tags.</strong> A theme and an SEO plugin both adding og tags can make platforms pick the wrong image.</li>
    <li><strong>Heavy share images.</strong> Very large files may not load in WhatsApp previews. Keep the image compressed.</li>
  </ul>`],
      ['WordPress and Shopify notes', `<p><strong>WordPress:</strong> Yoast SEO and Rank Math add Open Graph tags for you. Set a default share image in the plugin's social settings, and a per-post image in the post's social tab. Avoid also pasting manual tags, or you will get duplicates.</p>
  <p><strong>Shopify:</strong> most themes output og tags from the product image or the social sharing image set under Online Store, Preferences. Use a 1200 x 630 image there for the homepage and pages that have no product image.</p>`],
    ],
    links: ['repurpose-website-content-social-media', 'repurposing website content for social media', 'wordpress-seo-services', 'WordPress SEO services'],
    faqHead: 'Open Graph questions',
    faqs: [
      ['What image size should I use?', '1200x630 pixels works well for most platforms. Use a JPG or PNG under a few hundred KB and keep text away from the edges.'],
      ['Why does Facebook or WhatsApp still show the old preview?', 'Platforms cache previews. Use the Facebook Sharing Debugger to scrape the URL again; WhatsApp usually updates after some time or with a new URL.'],
      ['Do Open Graph tags help SEO?', 'They do not change rankings directly, but a clear preview can earn more clicks when your pages are shared.'],
      ['Why is WhatsApp showing no image for my link?', 'Usually the og:image is missing, not a full https URL, or too heavy. Fix the tag, then share the link again; WhatsApp may cache the old preview for a while.'],
      ['Do I need separate Twitter card tags?', 'X falls back to Open Graph tags for most fields. Adding twitter:card set to summary_large_image makes sure the large image layout is used.'],
    ],
  });
  T.push({
    cat: 'SEO tools', slug: `${HUB}/word-counter`, noindex: true, name: 'Word Counter & Keyword Density', crumb: 'Word Counter',
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
    steps: [
      'Paste the page URL you want people to land on.',
      'Fill in source, medium and campaign. Keep names lowercase and consistent across campaigns.',
      'Copy the tracking link, or paste a list of URLs in bulk mode.',
      'Worked example for a Google Ads campaign without auto-tagging: utm_source=google, utm_medium=cpc, utm_campaign=diwali_sale, utm_term={keyword}. If auto-tagging (gclid) is on, you usually do not need UTMs on Google Ads at all.',
      'In GA4, find the results under Reports, Acquisition, Traffic acquisition, with the session campaign dimension.',
    ],
    more: [
      ['Common UTM mistakes', `<ul>
    <li><strong>Mixing cases and spellings.</strong> "Facebook", "facebook" and "fb" become three sources. Agree a naming list and stick to it.</li>
    <li><strong>Tagging internal links.</strong> A UTM on a link from your own homepage restarts the session with the wrong source.</li>
    <li><strong>Unusual mediums.</strong> GA4 groups traffic into channels using medium values such as cpc, email, social and paid_social. Made-up mediums land in "Unassigned".</li>
    <li><strong>Spaces in values.</strong> Use underscores or hyphens instead.</li>
    <li><strong>Tagging links that redirect and drop the query string.</strong> Click your tagged link once and check the parameters survive in the address bar.</li>
  </ul>`],
      ['WordPress and Shopify notes', `<p><strong>WordPress:</strong> some caching and security setups strip or ignore query strings. Test a tagged link while logged out. If you use a redirect plugin, make sure it passes query parameters through.</p>
  <p><strong>Shopify:</strong> UTM tags work on product, collection and landing pages, and Shopify's own reports show sessions by UTM as well. Use the same naming in both places so GA4 and Shopify figures can be compared.</p>`],
    ],
    links: ['utm-tags-explained', 'UTM tags explained', 'landing-page-design', 'landing page design'],
    faqHead: 'UTM builder questions',
    faqs: [
      ['Which UTM tags are required?', 'GA4 needs utm_source to attribute the visit, and you should add utm_medium and utm_campaign too. utm_term, utm_content and utm_id are optional.'],
      ['Are UTM values case-sensitive?', 'Yes. "Facebook" and "facebook" show as two sources, which is why the tool lowercases values by default.'],
      ['Should I use UTM tags on internal links?', 'No. Tagging links between your own pages starts a new session with the wrong source. Use them only on links from outside your site.'],
      ['Do I need UTM tags for Google Ads?', 'Not if auto-tagging is on and Google Ads is linked to GA4. Use UTMs for everything else: email, WhatsApp, social posts, QR codes and other ad platforms.'],
      ['What should I use as utm_medium for WhatsApp?', 'Pick one value and keep it, such as "social" or "messaging", with utm_source=whatsapp. Consistency is what makes the report useful.'],
      ['Do UTM tags affect SEO?', 'Not when used on links from outside your site. Your pages should have a canonical tag pointing to the clean URL so tagged versions are not treated as separate pages.'],
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
    steps: [
      'Enter the WhatsApp number with country code and no plus sign, spaces or leading zero (for India, 91 followed by the 10-digit number).',
      'Write a pre-filled message that tells you where the lead came from, such as "Hi, I saw your website and want a quote for...".',
      'Copy the wa.me link or download the QR code.',
      'Place it on your site as a button, and add UTM tags to the page link you share elsewhere so GA4 still sees the source.',
      'Worked example: a clinic adds a "Book on WhatsApp" button with the message "Hi, I want to book an appointment" on its contact page, and a QR code of the same link on the front-desk poster.',
    ],
    more: [
      ['Common WhatsApp link mistakes', `<ul>
    <li><strong>Wrong number format.</strong> Including +, spaces, dashes or a leading 0 breaks the link.</li>
    <li><strong>No pre-filled message.</strong> A blank chat makes visitors hesitate, and you cannot tell which page they came from.</li>
    <li><strong>A floating button that covers other buttons.</strong> On mobile, keep it clear of "Add to cart", cookie banners and the menu.</li>
    <li><strong>Not tracking clicks.</strong> Without a GA4 event on the button, WhatsApp leads look like nothing happened.</li>
    <li><strong>Using a personal number with no business hours.</strong> A WhatsApp Business account with an away message sets expectations.</li>
  </ul>`],
      ['WordPress and Shopify notes', `<p><strong>WordPress:</strong> you can add the link to any button block, or use a lightweight click-to-chat plugin. Track clicks in Google Tag Manager with a click trigger on links containing <code>wa.me</code>, sent to GA4 as a lead event.</p>
  <p><strong>Shopify:</strong> add the link to a button in the theme editor, or use a chat app. On product pages, a pre-filled message that includes the product name helps you answer faster. Keep the button away from the sticky add-to-cart bar on mobile.</p>`],
    ],
    links: ['whatsapp-on-business-website', 'adding WhatsApp to a business website', 'wordpress-website-development', 'WordPress website development'],
    faqHead: 'WhatsApp link questions',
    faqs: [
      ['Does the link work for WhatsApp Business numbers?', 'Yes. wa.me links work for both personal and WhatsApp Business numbers.'],
      ['Why do I need the country code?', 'wa.me links use the full international number without the plus sign or leading zero, for example 91 followed by the 10-digit number in India.'],
      ['Can I change the message later?', 'The message is part of the link, so a new message needs a new link and a new QR code. If you print QR codes, keep the message general.'],
      ['Does the wa.me link work on desktop?', 'Yes. It opens WhatsApp Web or the desktop app, or asks the visitor to choose.'],
      ['Can I add the product name to the message automatically?', 'Yes, with a little theme code that builds the link from the page title. The generator gives you the base link to start from.'],
      ['Will the WhatsApp QR code stop working?', 'No. It holds the wa.me link directly, so it keeps working as long as the number is active on WhatsApp.'],
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
    steps: [
      'Choose what the code should open: a web page, WhatsApp chat, phone number, email or plain text.',
      'Paste the link. For web pages, add UTM tags first with the UTM builder so scans show up in GA4.',
      'Pick colours with strong contrast (dark code on a light background) and add a quiet margin around it.',
      'Download PNG for screens or SVG for print, then test the printed proof with two different phones before printing in bulk.',
      'Worked example: a table card in a restaurant. Link to the menu page with utm_source=table_card and utm_medium=qr, download SVG, and print it at least a few centimetres wide.',
    ],
    more: [
      ['Common QR code mistakes', `<ul>
    <li><strong>Printing before testing.</strong> Always scan the final printed proof, not only the screen preview.</li>
    <li><strong>Low contrast or inverted colours.</strong> Light codes on dark backgrounds and pastel codes fail on many phone cameras.</li>
    <li><strong>Too small or too close to the edge.</strong> Leave a clear margin around the code and size it for the scanning distance.</li>
    <li><strong>Linking to a page that may move.</strong> If the URL changes, printed codes break. Use a stable page, and set up a 301 redirect if you ever change it.</li>
    <li><strong>No tracking.</strong> Without UTM tags, scans look like direct visits in analytics.</li>
  </ul>`],
      ['WordPress and Shopify notes', `<p><strong>WordPress:</strong> point the code at a short, permanent URL such as <code>/menu/</code> or <code>/offer/</code>. If you later change the page, add a 301 redirect with the Redirection plugin so old prints keep working.</p>
  <p><strong>Shopify:</strong> link to a collection or a specific product rather than the homepage, so the scan lands where the buyer wants to be. Shopify adds a redirect automatically when you change a product handle, but check it under Navigation, URL Redirects.</p>`],
    ],
    links: ['qr-codes-for-business-website', 'QR codes for a business website', 'wordpress-website-development', 'WordPress website development'],
    faqHead: 'QR code questions',
    faqs: [
      ['Do these QR codes expire?', 'No. They are static codes with the data inside them, so they keep working as long as the link or details inside stay valid.'],
      ['PNG or SVG?', 'PNG for websites, slides and social posts. SVG for print, because it scales to any size without going blurry.'],
      ['What does error correction do?', 'Higher levels let the code still scan when part of it is damaged or covered, but make it denser. Medium suits most uses.'],
      ['Can I track scans?', 'Not with a static code. Put a UTM-tagged URL in the code and you can see the visits in Google Analytics.'],
      ['Can I track how many people scanned my QR code?', 'Yes, by adding UTM tags to the link before creating the code. Scans then show as visits from that source and medium in GA4.'],
      ['PNG or SVG for printing?', 'SVG, because it stays sharp at any size. PNG is fine for screens, social posts and documents.'],
    ],
  });

  // ---------------- Developer tools ----------------
  T.push({
    cat: 'Developer tools', slug: `${HUB}/json-formatter`, noindex: true, name: 'JSON & JSON-LD Formatter', crumb: 'JSON Formatter',
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
    steps: [
      'Enter the text colour and the background colour as hex, RGB or HSL.',
      'Read the contrast ratio and the WCAG results for normal text, large text and UI parts.',
      'If it fails, use the suggested darker or lighter shade, or nudge the lightness until it passes AA.',
      'Copy the passing colours into your theme settings or CSS.',
      'Worked example: light grey #999999 text on white fails AA for body text. Darken it toward #595959 and check again until normal text passes, then use that grey for captions site-wide.',
    ],
    more: [
      ['Common contrast mistakes', `<ul>
    <li><strong>Light grey body text.</strong> It looks elegant on a designer's screen and is hard to read on a phone in sunlight.</li>
    <li><strong>Text over photos.</strong> The contrast changes across the image. Add a solid or semi-opaque overlay behind the text.</li>
    <li><strong>Forgetting button and link states.</strong> Check hover, focus and disabled colours, not only the default.</li>
    <li><strong>Brand colour as text colour.</strong> A bright brand yellow or light blue often fails on white. Use it for shapes and use a darker shade for text.</li>
    <li><strong>Relying on colour alone.</strong> Error messages and links should also use icons, text or underlines.</li>
  </ul>`],
      ['WordPress and Shopify notes', `<p><strong>WordPress:</strong> in block themes, set colours once in Appearance, Editor, Styles, so every block uses passing pairs. The block editor also warns about low contrast on paragraph and button blocks. In classic themes, set them in the Customizer or theme options.</p>
  <p><strong>Shopify:</strong> Online Store 2.0 themes use colour schemes under Theme settings, Colors. Check each scheme's text, background and button pairs here, because sections reuse those schemes across the whole store.</p>`],
    ],
    links: ['website-accessibility-basics', 'website accessibility basics', 'website-redesign', 'website redesign'],
    faqHead: 'Colour contrast questions',
    faqs: [
      ['What contrast ratio do I need?', 'WCAG 2 level AA asks for at least 4.5:1 for normal text and 3:1 for large text. Level AAA asks for 7:1 and 4.5:1.'],
      ['What counts as large text?', 'Text of at least 18 point (about 24px), or 14 point (about 18.66px) when bold.'],
      ['Which colour formats can I enter?', 'HEX like #7C3AED or #fff, rgb(124, 58, 237), and hsl(262, 83%, 58%).'],
      ['Does colour contrast affect SEO?', 'Not as a direct ranking factor, but readable pages keep visitors longer, and Lighthouse flags low contrast in its accessibility score.'],
    ],
  });

  return T.map(t => ({ ...t, eyebrow: 'Free tool', main: page(t) }));
};
