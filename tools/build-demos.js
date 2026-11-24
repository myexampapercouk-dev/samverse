// Builds personalised one-page demo homepages for outreach prospects: demo/<slug>/index.html
// Pages are noindex,nofollow and never added to the sitemap. Usage: node tools/build-demos.js
const fs = require('fs');
const path = require('path');
const PROSPECTS = require('./demo-data');
const ROOT = path.join(__dirname, '..');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const T = {
  'dental clinic': {
    label: 'Dental Clinic', color: '#0f6e8c', soft: '#e8f4f8',
    tagline: 'Gentle, modern dental care for the whole family.',
    services: [
      ['Teeth Cleaning & Scaling', 'Routine cleaning to keep teeth and gums healthy.'],
      ['Root Canal Treatment', 'Save a painful or infected tooth with careful treatment.'],
      ['Dental Implants', 'Fixed replacement for missing teeth that looks natural.'],
      ['Braces & Aligners', 'Straighten teeth with metal, ceramic or clear options.'],
      ['Crowns & Bridges', 'Restore broken or weak teeth for chewing and smiling.'],
      ['Teeth Whitening', 'Brighten your smile with safe in-clinic whitening.'],
    ],
    why: [
      ['Clean, sterilised setup', 'Hygiene and sterilisation are followed for every patient.'],
      ['Clear treatment plans', 'Options and costs explained before treatment starts.'],
      ['Family friendly', 'Care for children, adults and senior patients.'],
      ['Easy appointments', 'Call or WhatsApp to book a convenient time.'],
    ],
  },
  'physiotherapy clinic': {
    label: 'Physiotherapy Clinic', color: '#2f7d4f', soft: '#ebf6ef',
    tagline: 'Move better, recover faster, live pain-free.',
    services: [
      ['Back & Neck Pain', 'Treatment and exercises to relieve spine-related pain.'],
      ['Sports Injury Rehab', 'Return to sport safely after sprains and strains.'],
      ['Post-Surgery Rehab', 'Guided recovery after knee, hip or shoulder surgery.'],
      ['Knee & Joint Pain', 'Programmes for arthritis and joint stiffness.'],
      ['Neuro Rehabilitation', 'Support for stroke and nerve-related conditions.'],
      ['Home Exercise Plans', 'Simple routines to continue progress at home.'],
    ],
    why: [
      ['One-to-one sessions', 'Each session focuses on your condition and goals.'],
      ['Personalised plans', 'Treatment adjusted as you improve.'],
      ['Modern equipment', 'Therapy aids chosen to support recovery.'],
      ['Easy appointments', 'Call or WhatsApp to book a session.'],
    ],
  },
  'interior designer': {
    label: 'Interior Designer', color: '#8a5a2b', soft: '#f6efe7',
    tagline: 'Thoughtful interiors for homes and workplaces.',
    services: [
      ['Complete Home Interiors', 'End-to-end design and execution for your home.'],
      ['Modular Kitchens', 'Practical, easy-to-clean kitchens built to fit your space.'],
      ['Wardrobes & Storage', 'Custom wardrobes and storage for every room.'],
      ['False Ceiling & Lighting', 'Gypsum and POP ceilings with planned lighting.'],
      ['Office & Shop Interiors', 'Functional commercial spaces that look professional.'],
      ['Custom Furniture', 'Made-to-measure furniture in your choice of finish.'],
    ],
    why: [
      ['Design before build', 'Layouts and finishes agreed before work begins.'],
      ['Transparent quotes', 'Clear itemised estimates with no surprises.'],
      ['Quality materials', 'Material options explained to suit your budget.'],
      ['Site supervision', 'Work tracked on site from start to handover.'],
    ],
  },
  'car garage': {
    label: 'Car Garage', color: '#b4441d', soft: '#fbefe9',
    tagline: 'Reliable car repair and servicing you can trust.',
    services: [
      ['General Car Service', 'Oil change, filters and full check-up.'],
      ['Engine Repair', 'Diagnosis and repair of engine problems.'],
      ['Brakes & Suspension', 'Brake pads, discs and suspension work.'],
      ['AC Repair & Gas Refill', 'Keep your car cool with AC servicing.'],
      ['Denting & Painting', 'Body repair and paint for dents and scratches.'],
      ['Battery & Electricals', 'Battery replacement and electrical fixes.'],
    ],
    why: [
      ['Honest estimates', 'Problem and cost explained before work starts.'],
      ['All car brands', 'Servicing for hatchbacks, sedans and SUVs.'],
      ['Genuine parts', 'Parts options explained clearly.'],
      ['Quick turnaround', 'Call or WhatsApp to book a slot.'],
    ],
  },
  'eye clinic': {
    label: 'Eye Clinic', color: '#1d5fa8', soft: '#eaf1fa',
    tagline: 'Caring eye check-ups and treatment for clear, healthy vision.',
    services: [
      ['Eye Check-ups', 'Complete eye examinations for adults and children.'],
      ['Cataract Care', 'Assessment and treatment options for cataract.'],
      ['Glaucoma Screening', 'Pressure checks to help catch glaucoma early.'],
      ['Diabetic Eye Check', 'Retina checks for patients with diabetes.'],
      ['Spectacles & Lenses', 'Prescription glasses and contact lens guidance.'],
      ["Children's Eye Care", 'Vision checks and care for kids.'],
    ],
    why: [
      ['Careful examination', 'Each eye check is done thoroughly and explained.'],
      ['Clear guidance', 'Treatment options discussed before any procedure.'],
      ['All ages', 'Care for children, adults and senior patients.'],
      ['Easy appointments', 'Call or WhatsApp to book a convenient time.'],
    ],
  },
  'ivf centre': {
    label: 'IVF & Fertility Centre', color: '#9b3d6e', soft: '#f8edf3',
    tagline: 'Supportive fertility care at every step of your journey.',
    services: [
      ['Fertility Consultation', 'Understand your options with a detailed consultation.'],
      ['Fertility Tests', 'Evaluation for both partners to plan the next steps.'],
      ['IUI', 'Intrauterine insemination where suitable.'],
      ['IVF / ICSI', 'Assisted reproduction guided by your doctor.'],
      ['Pregnancy Care', 'Follow-up and monitoring in early pregnancy.'],
      ['Counselling & Support', 'Guidance and emotional support through treatment.'],
    ],
    why: [
      ['Private consultations', 'Your concerns discussed in confidence.'],
      ['Clear treatment plans', 'Each step and its cost explained upfront.'],
      ['Couple-focused care', 'Both partners supported through the process.'],
      ['Easy appointments', 'Call or WhatsApp to book a consultation.'],
    ],
  },
  'nursing home': {
    label: 'Nursing Home', color: '#a23b5a', soft: '#f9edf1',
    tagline: 'Trusted care for mothers and families, close to home.',
    services: [
      ['Pregnancy Care', 'Regular check-ups and monitoring through pregnancy.'],
      ['Delivery Care', 'Care during normal and caesarean deliveries.'],
      ['Gynaecology Consultation', "Consultations for women's health concerns."],
      ['Post-Delivery Care', 'Support for mother and baby after delivery.'],
      ['Infertility Guidance', 'Consultation and guidance for couples.'],
      ['Indoor Admission', 'Inpatient care when admission is needed.'],
    ],
    why: [
      ['Personal attention', 'Patients and families kept informed at each stage.'],
      ['Clean facility', 'Hygiene followed in wards and procedure rooms.'],
      ['Clear guidance', 'Treatment options explained before they begin.'],
      ['Easy appointments', 'Call or WhatsApp to book a visit.'],
    ],
  },
  'jeweller': {
    label: 'Jewellers', color: '#8a6d1f', soft: '#f8f3e4',
    tagline: 'Beautiful jewellery for every occasion.',
    services: [
      ['Bridal Jewellery', 'Sets and pieces for weddings and special days.'],
      ['Daily Wear Jewellery', 'Light, elegant designs for everyday use.'],
      ['Silver Jewellery', 'Silver ornaments, gifts and articles.'],
      ['Rings & Earrings', 'A range of designs to choose from.'],
      ['Custom Orders', 'Pieces made to your design and requirement.'],
      ['Gifting', 'Jewellery gifts for festivals and celebrations.'],
    ],
    why: [
      ['Wide collection', 'Traditional and modern designs in store.'],
      ['Transparent billing', 'Weight and charges shown clearly on the bill.'],
      ['Personal service', 'Help choosing the right piece for the occasion.'],
      ['Easy enquiry', 'Call or WhatsApp to ask about designs.'],
    ],
  },
  'coaching classes': {
    label: 'Coaching Classes', color: '#3b4aa0', soft: '#eceefa',
    tagline: 'Focused coaching to help students reach their goals.',
    services: [
      ['Regular Batches', 'Structured classes covering the full syllabus.'],
      ['Concept Clarity', 'Topics taught from the basics with examples.'],
      ['Tests & Practice', 'Regular tests to track progress.'],
      ['Doubt Solving', 'Time set aside to clear student doubts.'],
      ['Study Material', 'Notes and practice questions for revision.'],
      ['Online & Offline', 'Learning options to suit each student.'],
    ],
    why: [
      ['Focused teaching', 'Subjects taught with a focus on understanding.'],
      ['Individual attention', 'Student progress followed up regularly.'],
      ['Clear schedule', 'Batch timings and syllabus shared upfront.'],
      ['Easy enquiry', 'Call or WhatsApp to ask about batches.'],
    ],
  },
  'furniture': {
    label: 'Furniture', color: '#7a4f2a', soft: '#f5eee6',
    tagline: 'Quality furniture for homes and offices.',
    services: [
      ['Living Room Furniture', 'Sofas, tables and units for your living space.'],
      ['Bedroom Furniture', 'Beds, wardrobes and side tables.'],
      ['Dining Sets', 'Dining tables and chairs in different sizes.'],
      ['Office Furniture', 'Desks, chairs and storage for workspaces.'],
      ['Custom Furniture', 'Made-to-measure pieces in your choice of finish.'],
      ['Delivery', 'Ask about delivery options for your purchase.'],
    ],
    why: [
      ['Wide range', 'Designs to suit different spaces and styles.'],
      ['Clear pricing', 'Prices and materials explained before you buy.'],
      ['Quality materials', 'Material options explained to suit your budget.'],
      ['Easy enquiry', 'Call or WhatsApp to ask about products.'],
    ],
  },
};

const card =([h, d]) => `<div class="card"><h3>${esc(h)}</h3><p>${esc(d)}</p></div>`;

function page(p) {
  const t = T[p.category];
  if (!t) throw new Error('No template for category: ' + p.category);
  const tel = '+' + p.phone;
  const wa = `https://wa.me/${p.phone}?text=${encodeURIComponent('Hi, I would like to book an appointment.')}`;
  const n = esc(p.name);
  const city = esc(p.city);
  const rated = p.rating != null && p.reviews != null;
  const r = rated ? Number(p.rating).toFixed(1) : '';
  const stars = rated ? `<p class="rating"><span class="stars" aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span> <strong>${r}</strong> &middot; ${p.reviews} Google reviews</p>` : '';
  const btns = `<div class="btns"><a class="btn p" href="tel:${tel}">Call</a><a class="btn s" href="${wa}">WhatsApp</a></div>`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>${n} | ${esc(t.label)} in ${city} (Sample Homepage)</title>
<meta name="description" content="Sample homepage for ${n}, ${esc(t.label.toLowerCase())} in ${city}. Demo by Samverse.">
<style>
:root{--c:${t.color};--soft:${t.soft};--ink:#1c2430;--mute:#5b6675;--line:#e3e7ec;--bg:#fff}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%}
body{margin:0;font-family:system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;color:var(--ink);background:var(--bg);line-height:1.55}
a{color:var(--c)}.wrap{max-width:1040px;margin:0 auto;padding:0 16px}
.demo{background:#fff8db;border-bottom:1px solid #f0e2a8;font-size:13px;text-align:center;padding:8px 16px}.demo a{font-weight:600}
header{border-bottom:1px solid var(--line)}header .wrap{display:flex;align-items:center;justify-content:space-between;gap:12px;padding-top:14px;padding-bottom:14px}
.brand{font-weight:700;font-size:17px;color:var(--ink);text-decoration:none}.hcall{font-size:14px;font-weight:600;text-decoration:none;white-space:nowrap}
.hero{background:var(--soft);padding:48px 0 44px}
.kicker{display:inline-block;font-size:13px;font-weight:600;color:var(--c);background:#fff;border:1px solid var(--line);border-radius:99px;padding:4px 12px;margin:0 0 14px}
h1{font-size:clamp(28px,6vw,44px);line-height:1.15;margin:0 0 12px}.lead{font-size:18px;color:var(--mute);margin:0 0 18px;max-width:600px}
.rating{margin:0 0 22px;font-size:15px}.stars{color:#e0a400;letter-spacing:1px}
.btns{display:flex;flex-wrap:wrap;gap:10px}
.btn{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 22px;border-radius:10px;font-weight:600;font-size:16px;text-decoration:none;border:2px solid var(--c)}
.btn.p{background:var(--c);color:#fff}.btn.s{background:#fff;color:var(--c)}
section{padding:44px 0}h2{font-size:clamp(22px,4.5vw,30px);margin:0 0 8px}.sub{color:var(--mute);margin:0 0 24px}
.grid{display:grid;gap:14px;grid-template-columns:1fr}
@media(min-width:640px){.grid{grid-template-columns:1fr 1fr}}@media(min-width:900px){.grid.g3{grid-template-columns:repeat(3,1fr)}}
.card{border:1px solid var(--line);border-radius:12px;padding:18px;background:#fff}.card h3{margin:0 0 6px;font-size:17px}.card p{margin:0;color:var(--mute);font-size:15px}
.card h3::before{content:"";display:block;width:28px;height:4px;border-radius:2px;background:var(--c);margin-bottom:12px}
.alt{background:#f7f8fa}
.rev{text-align:center;border:1px solid var(--line);border-radius:14px;padding:28px 16px;background:#fff}
.rev .big{font-size:34px;font-weight:700;margin:0}.rev p{margin:6px 0 0;color:var(--mute)}
.loc{border:2px dashed var(--line);border-radius:14px;padding:24px;text-align:center;color:var(--mute);background:#fff}
.cta{background:var(--c);color:#fff;text-align:center}.cta h2{color:#fff}.cta .btns{justify-content:center}
.cta .btn.p{background:#fff;color:var(--c);border-color:#fff}.cta .btn.s{background:transparent;color:#fff;border-color:#fff}
footer{text-align:center;font-size:13px;color:var(--mute);padding:22px 16px;border-top:1px solid var(--line)}
</style>
</head>
<body>
<div class="demo">Sample homepage made by Samverse for ${n} &mdash; not the official site. Like it? <a href="https://samverse.space/contact/">Contact Samverse</a></div>
<header><div class="wrap"><a class="brand" href="#">${n}</a><a class="hcall" href="tel:${tel}">Call now</a></div></header>
<main>
<div class="hero"><div class="wrap">
<p class="kicker">${esc(t.label)} &middot; ${city}</p>
<h1>${n}</h1>
<p class="lead">${esc(t.tagline)} Serving ${city} and nearby areas.</p>
${stars}
${btns}
</div></div>
<section><div class="wrap">
<h2>Our services</h2><p class="sub">What we help with at ${n}.</p>
<div class="grid g3">${t.services.map(card).join('')}</div>
</div></section>
<section class="alt"><div class="wrap">
<h2>Why choose us</h2><p class="sub">Simple, honest service in ${city}.</p>
<div class="grid">${t.why.map(card).join('')}</div>
</div></section>
${rated ? `<section><div class="wrap"><div class="rev"><p class="big"><span class="stars">&#9733;</span> ${r}</p><p>${r}&#9733; from ${p.reviews} Google reviews</p></div></div></section>` : ''}
<section class="alt"><div class="wrap">
<h2>Visit us</h2>
<div class="loc">Add your address &amp; timings</div>
</div></section>
<section class="cta"><div class="wrap">
<h2>Book with ${n}</h2><p>Call or WhatsApp us today.</p>
${btns}
</div></section>
</main>
<footer>Demo by Samverse &middot; <a href="https://samverse.space/">samverse.space</a></footer>
</body>
</html>
`;
}

for (const p of PROSPECTS) {
  const dir = path.join(ROOT, 'demo', p.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), page(p));
  console.log('demo: https://samverse.space/demo/' + p.slug + '/');
}
