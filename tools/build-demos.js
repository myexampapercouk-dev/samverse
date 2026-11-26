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
  'skin clinic': {
    label: 'Skin & Hair Clinic', color: '#9a4f6a', soft: '#faf0f4',
    tagline: 'Thoughtful skin and hair care, explained clearly at every step.',
    services: [
      ['Skin Consultation', 'Assessment of skin concerns and a clear care plan.'],
      ['Acne Care', 'Treatment options for acne and acne marks.'],
      ['Pigmentation Care', 'Guidance and treatment for uneven skin tone.'],
      ['Hair & Scalp Care', 'Evaluation of hair fall and scalp conditions.'],
      ['Laser Procedures', 'Laser-based treatments where clinically suitable.'],
      ['Skin Allergies', 'Care for rashes, eczema and other skin conditions.'],
    ],
    why: [
      ['Personal attention', 'Each concern is examined and discussed in detail.'],
      ['Clear guidance', 'Options and aftercare explained before treatment.'],
      ['Comfortable clinic', 'A clean, calm space for every visit.'],
      ['Easy appointments', 'Call or WhatsApp to book a convenient time.'],
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
  'restaurant': {
    label: 'Restaurant', color: '#a8461b', soft: '#fbf0e8',
    waText: 'Hi, I would like to reserve a table.',
    tagline: 'Fresh, tasty food served with warm hospitality.',
    services: [
      ['Menu Highlights', 'Ask us about our popular dishes and daily specials.'],
      ['Dine-In', 'Sit down and enjoy your meal with family and friends.'],
      ['Takeaway', 'Call ahead and pick up your order on the way.'],
      ['Family Meals', 'Space and dishes for family outings.'],
      ['Group Bookings', 'Call to check availability for larger groups.'],
      ['Table Reservations', 'Call or WhatsApp to reserve a table.'],
    ],
    why: [
      ['Freshly prepared', 'Food made in our kitchen for every order.'],
      ['Family friendly', 'A comfortable place for all ages.'],
      ['Dine-in or takeaway', 'Eat with us or take your food home.'],
      ['Easy reservations', 'Call or WhatsApp to reserve a table.'],
    ],
  },
  salon: {
    label: "Salon & Spa", color: "#9b4d6b", soft: "#fbf1f5",
    tagline: "Hair, beauty and spa care in a calm, welcoming space.",
    services: [
      ["Haircut & Styling", "Cuts, blow-dries and styling for every hair type."],
      ["Hair Colour", "Colour, highlights and touch-ups to suit your look."],
      ["Facials", "Cleansing and refreshing facials for your skin type."],
      ["Bridal Makeup", "Hair and makeup for your wedding and special events."],
      ["Nails", "Manicures, pedicures and nail care."],
      ["Spa & Massage", "Relaxing spa treatments to unwind and recharge."],
    ],
    why: [
      ["Clean, hygienic setup", "Tools and stations are cleaned for every client."],
      ["Personal attention", "Your look is discussed before we begin."],
      ["Relaxed space", "A comfortable place to sit back and enjoy."],
      ["Easy appointments", "Call or WhatsApp to book a convenient time."],
    ],
  },
};

// ---- Visual design per category (fonts, accent, layout, verified Unsplash photos) ----
const U = id => `https://images.unsplash.com/photo-${id}?w=1600&q=80`;
const US = id => `https://images.unsplash.com/photo-${id}?w=800&q=75`;
const S = {
  'dental clinic': { fonts: ['Plus Jakarta Sans', 'Inter'], accent: '#0e7490', soft: '#ecf7fa', layout: 'left', radius: 18,
    hero: '1629909613654-28e377c37b09', about: '1606811971618-4486d14f3f99', svc: ['1609840114035-3c981b782dfe', '1588776814546-1ffcf47267a5', '1606811971618-4486d14f3f99'] },
  'physiotherapy clinic': { fonts: ['Outfit', 'Inter'], accent: '#15803d', soft: '#eef8f1', layout: 'left', radius: 16,
    hero: '1597764690523-15bea4c581c9', about: '1576091160550-2173dba999ef', svc: ['1571019613454-1cb2f99b2d8b', '1544367567-0f2fcb009e0b', '1597764690523-15bea4c581c9'] },
  'interior designer': { fonts: ['Cormorant Garamond', 'Jost'], accent: '#8a5a2b', soft: '#f7f1ea', layout: 'center', radius: 4, gallery: true,
    hero: '1618221195710-dd6b41faaea6', about: '1616486338812-3dadae4b4ace', svc: ['1600210492486-724fe5c67fb0', '1586023492125-27b2c045efd7', '1615529182904-14819c35db37', '1600585154340-be6161a56a0c'],
    gal: ['1618221195710-dd6b41faaea6', '1600210492486-724fe5c67fb0', '1586023492125-27b2c045efd7', '1616486338812-3dadae4b4ace', '1615529182904-14819c35db37', '1600585154340-be6161a56a0c'] },
  'car garage': { fonts: ['Oswald', 'Roboto'], accent: '#c2410c', soft: '#fdf1ea', layout: 'left', radius: 6,
    hero: '1487754180451-c456f719a1fc', about: '1619642751034-765dfdf7c58e', svc: ['1625047509248-ec889cbff17f', '1486262715619-67b85e0b08d3', '1619642751034-765dfdf7c58e'] },
  'skin clinic': { fonts: ['Lora', 'Nunito Sans'], accent: '#9a4f6a', soft: '#faf0f4', layout: 'left', radius: 20,
    hero: '1519494026892-80bbd2d6fd0d', about: '1612349317150-e413f6a5b16d', svc: ['1584515933487-779824d29309', '1559839734-2b71ea197ec2', '1631217868264-e5b90bb7e133'] },
  'eye clinic': { fonts: ['Manrope', 'Inter'], accent: '#1d4ed8', soft: '#eef3fd', layout: 'left', radius: 18,
    hero: '1574258495973-f010dfbb5371', about: '1579684385127-1ef15d508118', svc: ['1577401239170-897942555fb3', '1574258495973-f010dfbb5371', '1559839734-2b71ea197ec2'] },
  'ivf centre': { fonts: ['Lora', 'Nunito Sans'], accent: '#9d3b6c', soft: '#fbf0f5', layout: 'center', radius: 22,
    hero: '1555252333-9f8e92e65df9', about: '1519689680058-324335c77eba', svc: ['1584515933487-779824d29309', '1559839734-2b71ea197ec2', '1519689680058-324335c77eba'] },
  'nursing home': { fonts: ['Merriweather', 'Source Sans 3'], accent: '#a23b5a', soft: '#fbf0f3', layout: 'left', radius: 14,
    hero: '1519494026892-80bbd2d6fd0d', about: '1612349317150-e413f6a5b16d', svc: ['1538108149393-fbbd81895907', '1631217868264-e5b90bb7e133', '1584515933487-779824d29309'] },
  'jeweller': { fonts: ['Playfair Display', 'Lato'], accent: '#8a6d1f', soft: '#faf6ea', layout: 'center', radius: 2, gallery: true,
    hero: '1515562141207-7a88fb7ce338', about: '1605100804763-247f67b3557e', svc: ['1599643478518-a784e5dc4c8f', '1611591437281-460bfbe1220a', '1605100804763-247f67b3557e'],
    gal: ['1515562141207-7a88fb7ce338', '1599643478518-a784e5dc4c8f', '1605100804763-247f67b3557e', '1611591437281-460bfbe1220a', '1515562141207-7a88fb7ce338', '1599643478518-a784e5dc4c8f'] },
  'coaching classes': { fonts: ['Poppins', 'Inter'], accent: '#3730a3', soft: '#eff0fb', layout: 'left', radius: 14,
    hero: '1524178232363-1fb2b075b655', about: '1427504494785-3a9ca7044f45', svc: ['1503676260728-1c00da094a0b', '1427504494785-3a9ca7044f45', '1524178232363-1fb2b075b655'] },
  'furniture': { fonts: ['DM Serif Display', 'DM Sans'], accent: '#7a4f2a', soft: '#f6efe7', layout: 'center', radius: 8, gallery: true,
    hero: '1555041469-a586c61ea9bc', about: '1493663284031-b7e3aefcae8e', svc: ['1524758631624-e2822e304c36', '1493663284031-b7e3aefcae8e', '1555041469-a586c61ea9bc'],
    gal: ['1555041469-a586c61ea9bc', '1524758631624-e2822e304c36', '1493663284031-b7e3aefcae8e', '1586023492125-27b2c045efd7', '1600210492486-724fe5c67fb0', '1616486338812-3dadae4b4ace'] },
  'restaurant': { fonts: ['Fraunces', 'Work Sans'], accent: '#b4441d', soft: '#fcf2ea', layout: 'center', radius: 12, gallery: true,
    hero: '1585937421612-70a008356fbe', about: '1517248135467-4c7edcad34c4', svc: ['1601050690597-df0568f70950', '1555396273-367ea4eb4db5', '1546833999-b9f581a1996d', '1414235077428-338989a2e8c0'],
    gal: ['1585937421612-70a008356fbe', '1601050690597-df0568f70950', '1546833999-b9f581a1996d', '1504674900247-0877df9cc836', '1517248135467-4c7edcad34c4', '1565958011703-44f9829ba187'] },
  salon: { fonts: ["Cormorant Garamond", "Jost"], accent: "#9b4d6b", soft: "#fbf1f5", layout: "center", radius: 16, gallery: true,
    hero: "1560066984-138dadb4c035", about: "1521590832167-7bcbfaa6381f", svc: ["1522337360788-8b13dee7a37e", "1562322140-8baeececf3df", "1570172619644-dfd03ed5d881", "1487412947147-5cebf100ffc2", "1604654894610-df63bc536371", "1544161515-4ab6ce6db874"],
    gal: ["1560066984-138dadb4c035", "1522337360788-8b13dee7a37e", "1487412947147-5cebf100ffc2", "1604654894610-df63bc536371", "1570172619644-dfd03ed5d881", "1544161515-4ab6ce6db874"] },
};
const BOOK = { 'restaurant': 'Reserve a table', 'jeweller': 'Enquire now', 'coaching classes': 'Enquire about batches', 'furniture': 'Enquire now', 'interior designer': 'Get a consultation', 'car garage': 'Book a service' };

const I = {
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
  cal: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/>',
  star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
  spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  pin: '<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
};
const ico = (k, s = 22) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[k]}</svg>`;
const WA = '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8zm0-21.6A11.8 11.8 0 0 0 1.9 17.9L.2 24l6.3-1.6A11.8 11.8 0 1 0 12 .2z"/></svg>';
const SVC_ICONS = ['spark', 'shield', 'heart', 'star', 'check', 'users'];
const WHY_ICONS = ['shield', 'check', 'users', 'clock'];

function faqs(p, t, isFood) {
  return [
    [isFood ? 'How do I reserve a table?' : 'How do I book an appointment?', 'Call us or send a WhatsApp message and we will confirm a suitable time.'],
    ['Where are you located?', `${p.name} is in ${p.city}. Call or WhatsApp us for directions.`],
    ['What are your timings?', 'Please call or WhatsApp to confirm current opening hours before you visit.'],
    isFood ? ['Do you offer takeaway?', 'Call ahead and we will tell you what is available for takeaway.']
      : [`What services do you offer?`, `We offer ${t.services.slice(0, 3).map(s => s[0].toLowerCase()).join(', ')} and more. Ask us about your requirement.`],
  ];
}

function page(p) {
  const t = T[p.category];
  const s = S[p.category];
  if (!t || !s) throw new Error('No template for category: ' + p.category);
  const tel = '+' + p.phone;
  const wa = `https://wa.me/${p.phone}?text=${encodeURIComponent(t.waText || 'Hi, I would like to book an appointment.')}`;
  const n = esc(p.name), city = esc(p.city);
  const isFood = p.category === 'restaurant';
  const center = s.layout === 'center';
  const rated = p.rating != null && p.reviews != null;
  const r = rated ? Number(p.rating).toFixed(1) : '';
  const rv = rated ? Number(p.reviews).toLocaleString('en-IN') : '';
  const book = BOOK[p.category] || 'Book appointment';
  const [hf, bf] = s.fonts;
  const fq = [hf, bf].map(f => 'family=' + f.replace(/ /g, '+') + ':wght@400;500;600;700').join('&amp;');
  const svcCards = t.services.map(([h, d], i) => `<article class="svc rv"><div class="svc-img"><img src="${US(s.svc[i % s.svc.length])}" alt="${esc(h)}" loading="lazy" width="800" height="533"><span class="svc-ico">${ico(SVC_ICONS[i % 6])}</span></div><div class="svc-b"><h3>${esc(h)}</h3><p>${esc(d)}</p></div></article>`).join('');
  const why = t.why.map(([h, d], i) => `<li><span class="wi">${ico(WHY_ICONS[i % 4], 20)}</span><div><h3>${esc(h)}</h3><p>${esc(d)}</p></div></li>`).join('');
  const gallery = s.gallery ? `<section id="gallery" class="sec"><div class="wrap"><p class="eyebrow">Gallery</p><h2>${isFood ? 'A taste of what we serve' : 'Our work &amp; collection'}</h2><p class="note">Sample photos &mdash; to be replaced with your own.</p><div class="gal">${s.gal.map((g, i) => `<figure class="rv${i === 0 ? ' big' : ''}"><img src="${US(g)}" alt="Gallery photo ${i + 1}" loading="lazy"></figure>`).join('')}</div></div></section>` : '';
  const stats = rated ? `<div class="stats"><div class="wrap sg"><div class="st"><b>${r}<span>&#9733;</span></b><small>Google rating</small></div><div class="st"><b>${rv}</b><small>Google reviews</small></div><div class="st"><b>${city}</b><small>Our city</small></div></div></div>` : '';
  const review = rated ? `<section class="sec"><div class="wrap"><div class="revbox rv"><div class="stars" aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</div><p class="rbig">${r} out of 5</p><p>Rated by <strong>${rv}</strong> customers on Google</p><a class="btn ghost" href="https://www.google.com/search?q=${encodeURIComponent(p.name + ' ' + p.city + ' reviews')}" rel="nofollow noopener" target="_blank">Read reviews on Google</a></div></div></section>` : '';
  const faq = faqs(p, t, isFood).map(([q, a]) => `<details><summary>${esc(q)}<span class="pl">+</span></summary><p>${esc(a)}</p></details>`).join('');
  const addr = p.address ? esc(p.address) : city;
  const mapQ = encodeURIComponent(p.name + ' ' + (p.address || p.city));
  const hero = U(s.hero);
  const initial = esc(p.name.replace(/^dr\.?\s+/i, '').charAt(0).toUpperCase());
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>${n} | ${esc(t.label)} in ${city} (Sample Homepage)</title>
<meta name="description" content="Sample homepage for ${n}, ${esc(t.label.toLowerCase())} in ${city}. Demo by Samverse.">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="preconnect" href="https://images.unsplash.com">
<link rel="preload" as="image" href="${hero}">
<link href="https://fonts.googleapis.com/css2?${fq}&amp;display=swap" rel="stylesheet">
<style>
:root{--c:${s.accent};--soft:${s.soft};--ink:#16191f;--mute:#5a6270;--line:#e6e8ec;--bg:#fff;--r:${s.radius}px;--hf:"${hf}",Georgia,serif;--bf:"${bf}",system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif}
*{box-sizing:border-box}html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
body{margin:0;font-family:var(--bf);color:var(--ink);background:var(--bg);line-height:1.6;font-size:16px;overflow-x:hidden}
img{max-width:100%;display:block}a{color:var(--c)}
h1,h2,h3{font-family:var(--hf);line-height:1.15;margin:0;font-weight:700;letter-spacing:-.01em}
.wrap{max-width:1180px;margin:0 auto;padding:0 16px}@media(min-width:768px){.wrap{padding:0 28px}}
.demo{background:#fff8db;border-bottom:1px solid #f0e2a8;font-size:13px;text-align:center;padding:8px 16px;color:#3d3517}.demo a{font-weight:700;color:#7a5b00}
.nav{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.97);border-bottom:1px solid var(--line)}
.nav .wrap{display:flex;align-items:center;justify-content:space-between;gap:14px;height:68px}
.logo{display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--ink);font-family:var(--hf);font-weight:700;font-size:19px;min-width:0}
.logo i{flex:none;width:38px;height:38px;border-radius:calc(var(--r)*.6 + 4px);background:var(--c);color:#fff;display:grid;place-items:center;font-style:normal;font-size:18px}
.logo span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.menu{display:none;gap:26px}.menu a{color:var(--ink);text-decoration:none;font-size:15px;font-weight:500}.menu a:hover{color:var(--c)}
@media(min-width:960px){.menu{display:flex}}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:50px;padding:0 24px;border-radius:calc(var(--r)*.5 + 6px);font-weight:600;font-size:16px;text-decoration:none;border:2px solid transparent;transition:transform .2s,box-shadow .2s;white-space:nowrap}
.btn:hover{transform:translateY(-2px);box-shadow:0 10px 24px rgba(0,0,0,.14)}
.btn.pri{background:var(--c);color:#fff}.btn.wa{background:#1fa855;color:#fff}.btn.lt{background:#fff;color:var(--ink)}
.btn.ghost{border-color:var(--c);color:var(--c);background:#fff}
.nav .btn{min-height:42px;padding:0 16px;font-size:14px;flex:none}
.hero{position:relative;min-height:min(86vh,760px);display:flex;align-items:${center ? 'center' : 'flex-end'};color:#fff;background:#222 url("${hero}") center/cover no-repeat}
.hero::before{content:"";position:absolute;inset:0;background:rgba(10,12,16,.56)}
.hero .wrap{position:relative;width:100%;padding-top:96px;padding-bottom:${center ? '96px' : '72px'}${center ? ';text-align:center' : ''}}
.hero .in{max-width:${center ? '820px;margin:0 auto' : '680px'}}
.tag{display:inline-block;font-size:13px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.35);padding:6px 14px;border-radius:99px;margin:0 0 20px}
.hero h1{font-size:clamp(34px,6.4vw,68px);margin-bottom:18px}
.hero .lead{font-size:clamp(17px,2.2vw,20px);opacity:.94;margin:0 0 24px${center ? ';max-width:620px;margin-left:auto;margin-right:auto' : ''}}
.hr{display:inline-flex;align-items:center;gap:8px;font-size:15px;margin:0 0 26px;background:rgba(255,255,255,.14);padding:8px 14px;border-radius:10px}.hr .stars{color:#fbbf24;letter-spacing:2px}
.btns{display:flex;flex-wrap:wrap;gap:12px${center ? ';justify-content:center' : ''}}
@media(max-width:520px){.hero .btns .btn{flex:1 1 100%}}
.stats{background:var(--c);color:#fff}.sg{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding-top:26px;padding-bottom:26px;text-align:center}
.st b{display:block;font-family:var(--hf);font-size:clamp(20px,4vw,36px);line-height:1.1;word-break:break-word}.st b span{font-size:.7em;margin-left:2px}.st small{opacity:.85;font-size:12px;text-transform:uppercase;letter-spacing:.06em}
.sec{padding:clamp(60px,9vw,104px) 0}.alt{background:var(--soft)}
.eyebrow{color:var(--c);font-weight:700;font-size:13px;letter-spacing:.14em;text-transform:uppercase;margin:0 0 10px}
.sec h2{font-size:clamp(28px,4.4vw,44px);margin-bottom:14px}.intro{color:var(--mute);max-width:620px;margin:0 0 40px;font-size:17px}
.note{color:var(--mute);font-size:14px;margin:0 0 28px}
.svcs{display:grid;gap:22px;grid-template-columns:1fr}@media(min-width:640px){.svcs{grid-template-columns:1fr 1fr}}@media(min-width:1000px){.svcs{grid-template-columns:repeat(3,1fr)}}
.svc{background:#fff;border:1px solid var(--line);border-radius:var(--r);overflow:hidden;transition:transform .25s,box-shadow .25s}
.svc:hover{transform:translateY(-4px);box-shadow:0 18px 40px rgba(20,24,32,.1)}
.svc-img{position:relative;aspect-ratio:3/2;background:var(--soft)}.svc-img img{width:100%;height:100%;object-fit:cover}
.svc-ico{position:absolute;left:18px;bottom:-24px;width:48px;height:48px;border-radius:calc(var(--r)*.5 + 6px);background:var(--c);color:#fff;display:grid;place-items:center;box-shadow:0 6px 16px rgba(0,0,0,.18)}
.svc-b{padding:36px 20px 22px}.svc-b h3{font-size:20px;margin-bottom:6px}.svc-b p{margin:0;color:var(--mute);font-size:15px}
.about{display:grid;gap:40px;align-items:center}@media(min-width:900px){.about{grid-template-columns:1.05fr 1fr;gap:64px}}
.aimg{position:relative}.aimg img{width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:var(--r)}
.abadge{position:absolute;right:12px;bottom:24px;background:#fff;border-radius:var(--r);padding:14px 18px;box-shadow:0 14px 34px rgba(0,0,0,.14);font-size:14px}.abadge b{display:block;font-family:var(--hf);font-size:24px;color:var(--c)}
.why{list-style:none;padding:0;margin:26px 0 30px;display:grid;gap:18px}.why li{display:flex;gap:14px}
.wi{flex:none;width:42px;height:42px;border-radius:50%;background:#fff;color:var(--c);display:grid;place-items:center}
.why h3{font-family:var(--bf);font-size:17px;font-weight:700;margin-bottom:2px}.why p{margin:0;color:var(--mute);font-size:15px}
.gal{display:grid;gap:12px;grid-template-columns:1fr 1fr}@media(min-width:800px){.gal{grid-template-columns:repeat(4,1fr);grid-auto-rows:220px}.gal .big{grid-column:span 2;grid-row:span 2}}
.gal figure{margin:0;overflow:hidden;border-radius:var(--r);aspect-ratio:1}@media(min-width:800px){.gal figure{aspect-ratio:auto}}
.gal img{width:100%;height:100%;object-fit:cover;transition:transform .6s}.gal figure:hover img{transform:scale(1.06)}
.revbox{max-width:680px;margin:0 auto;text-align:center;background:#fff;border:1px solid var(--line);border-radius:calc(var(--r) + 6px);padding:48px 24px;box-shadow:0 20px 50px rgba(20,24,32,.06)}
.revbox .stars{color:#f5a524;font-size:30px;letter-spacing:6px}.rbig{font-family:var(--hf);font-size:clamp(34px,6vw,52px);font-weight:700;margin:8px 0 4px}.revbox p{color:var(--mute);margin:0 0 24px}
.faqw{max-width:820px}
details{border-bottom:1px solid var(--line);padding:4px 0}summary{list-style:none;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:16px;padding:18px 0;font-weight:600;font-size:17px}
summary::-webkit-details-marker{display:none}.pl{flex:none;width:32px;height:32px;border-radius:50%;background:#fff;border:1px solid var(--line);color:var(--c);display:grid;place-items:center;font-size:20px;transition:transform .25s}
details[open] .pl{transform:rotate(45deg)}details p{margin:0 0 18px;color:var(--mute)}
.visit{display:grid;gap:28px}@media(min-width:900px){.visit{grid-template-columns:1fr 1.3fr}}
.vcard{background:#fff;border:1px solid var(--line);border-radius:var(--r);padding:30px}.vrow{display:flex;gap:14px;margin-bottom:20px}.vrow .wi{background:var(--soft)}.vrow b{display:block}.vrow span{color:var(--mute);font-size:15px}
.map{border:0;width:100%;min-height:340px;height:100%;border-radius:var(--r);background:var(--soft)}
.cta{background:var(--ink);color:#fff;text-align:center}.cta h2{color:#fff}.cta p{opacity:.8;margin:0 0 28px}.cta .btns{justify-content:center}
footer{background:#0f1115;color:#aab0bb;font-size:14px;padding:40px 0 96px}footer .wrap{display:flex;flex-wrap:wrap;gap:16px;justify-content:space-between}footer a{color:#fff}footer b{color:#fff;font-family:var(--hf);font-size:18px}
.fwa{position:fixed;right:18px;bottom:18px;z-index:60;width:58px;height:58px;border-radius:50%;background:#1fa855;color:#fff;display:grid;place-items:center;box-shadow:0 10px 26px rgba(0,0,0,.25);transition:transform .2s}.fwa:hover{transform:scale(1.08)}.fwa svg{width:30px;height:30px}
.js .rv{opacity:0;transform:translateY(24px);transition:opacity .7s ease,transform .7s ease}.js .rv.in{opacity:1;transform:none}
@media(prefers-reduced-motion:reduce){.js .rv{opacity:1;transform:none;transition:none}html{scroll-behavior:auto}}
</style>
<script>document.documentElement.className='js'</script>
</head>
<body>
<div class="demo">Sample homepage made by Samverse for ${n} &mdash; not the official site. Like it? <a href="https://wa.me/917417049145">Contact Samverse</a></div>
<header class="nav"><div class="wrap"><a class="logo" href="#top"><i>${initial}</i><span>${n}</span></a>
<nav class="menu" aria-label="Main"><a href="#services">${isFood ? 'Menu' : 'Services'}</a><a href="#about">About</a>${s.gallery ? '<a href="#gallery">Gallery</a>' : ''}<a href="#faq">FAQ</a><a href="#visit">Visit</a></nav>
<a class="btn pri" href="tel:${tel}">${ico('phone', 16)} Call</a></div></header>
<main id="top">
<section class="hero"><div class="wrap"><div class="in">
<p class="tag">${esc(t.label)} &middot; ${city}</p>
<h1>${n}</h1>
<p class="lead">${esc(t.tagline)} Serving ${city} and nearby areas.</p>
${rated ? `<p class="hr"><span class="stars" aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span> <strong>${r}</strong> from ${rv} Google reviews</p>` : ''}
<div class="btns"><a class="btn pri" href="tel:${tel}">${ico('phone', 18)} Call now</a><a class="btn wa" href="${wa}">${WA} WhatsApp</a><a class="btn lt" href="${wa}">${ico('cal', 18)} ${book}</a></div>
</div></div></section>
${stats}
<section id="services" class="sec"><div class="wrap">
<p class="eyebrow">${isFood ? 'What we offer' : 'Our services'}</p><h2>${isFood ? 'Come hungry, leave happy' : 'How we can help you'}</h2>
<p class="intro">What we offer at ${n}, ${city}. Call or WhatsApp to ask about anything you need.</p>
<div class="svcs">${svcCards}</div>
</div></section>
<section id="about" class="sec alt"><div class="wrap about">
<div class="aimg rv"><img src="${US(s.about)}" alt="Inside ${n}" loading="lazy">${rated ? `<div class="abadge"><b>${r}&#9733;</b>${rv} Google reviews</div>` : ''}</div>
<div class="rv"><p class="eyebrow">About us</p><h2>Why people in ${city} choose ${n}</h2>
<p class="intro" style="margin-bottom:0">${esc(t.tagline)}</p>
<ul class="why">${why}</ul>
<div class="btns" style="justify-content:flex-start"><a class="btn pri" href="tel:${tel}">${ico('phone', 18)} Call now</a><a class="btn wa" href="${wa}">${WA} WhatsApp</a></div></div>
</div></section>
${gallery}
${review}
<section id="faq" class="sec alt"><div class="wrap faqw">
<p class="eyebrow">FAQ</p><h2>Frequently asked questions</h2>
<div style="margin-top:24px">${faq}</div>
</div></section>
<section id="visit" class="sec"><div class="wrap">
<p class="eyebrow">Visit us</p><h2>Find ${n}</h2><p class="intro">We are in ${city}. Call ahead and we will guide you.</p>
<div class="visit"><div class="vcard rv">
<div class="vrow"><span class="wi">${ico('pin', 20)}</span><div><b>Address</b><span>${addr}</span></div></div>
<div class="vrow"><span class="wi">${ico('phone', 20)}</span><div><b>Phone</b><span><a href="tel:${tel}">${tel}</a></span></div></div>
<div class="vrow"><span class="wi">${ico('clock', 20)}</span><div><b>Timings</b><span>Call to confirm today's hours</span></div></div>
<div class="btns" style="justify-content:flex-start"><a class="btn pri" href="https://www.google.com/maps/search/?api=1&amp;query=${mapQ}" target="_blank" rel="noopener">Get directions</a></div>
</div>
<iframe class="map" title="Map of ${n}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=${mapQ}&amp;output=embed"></iframe></div>
</div></section>
<section class="sec cta"><div class="wrap">
<h2>${isFood ? 'Hungry? We are ready for you.' : `Ready to visit ${n}?`}</h2><p>Call or WhatsApp us today.</p>
<div class="btns"><a class="btn pri" href="tel:${tel}">${ico('phone', 18)} Call now</a><a class="btn wa" href="${wa}">${WA} WhatsApp</a></div>
</div></section>
</main>
<footer><div class="wrap"><div><b>${n}</b><br>${esc(t.label)} &middot; ${city}</div><div>Sample homepage by <a href="https://samverse.space/">Samverse</a> &middot; photos are placeholders</div></div></footer>
<a class="fwa" href="${wa}" aria-label="Chat on WhatsApp">${WA}</a>
<script>(function(){var e=document.querySelectorAll('.rv');if(!('IntersectionObserver' in window)){e.forEach(function(x){x.classList.add('in')});return}var o=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');o.unobserve(x.target)}})},{threshold:.1,rootMargin:'0px 0px -40px 0px'});e.forEach(function(x){o.observe(x)})})();</script>
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
