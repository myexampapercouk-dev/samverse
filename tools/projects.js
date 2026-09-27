// Portfolio cards shown on the homepage, landing pages and /work/.
// `study`: case study page (cards link there); without it, cards link to the live site.
// The homepage shows the first 9 cards without `hideOnHome` (order matters); /work/ shows them all.
// `hideOnHome`: show on /work/ only, not on the homepage grid.
// `thumb`: optional local screenshot; otherwise a live screenshot (WordPress.com mShots) is used.
// After editing, run: node tools/build-pages.js
module.exports = [
  { name: 'Third Eye Social',      url: 'https://thirdeye.social/',         study: '/work/third-eye-social/',      tag: 'AI Automation Agency',      thumb: '/assets/work/thirdeye.svg',       color: '#1A1A1A' },
  { name: 'Southern Flavours',     url: 'https://southernflavours.co.uk/',  study: '/work/southern-flavours/',     tag: 'Restaurant, UK',                                                       color: '#B45309' },
  { name: 'Vansh Group',           url: 'https://vansh.group/',             study: '/work/vansh-group/',           tag: 'Electronics Manufacturing',                                            color: '#0EA5E9' },
  { name: 'Studio Agama Interiors', url: 'https://interiorstudioagama.com/', study: '/work/studio-agama-interiors/', tag: 'Interior Design Studio',                                             color: '#A16207' },
  { name: 'Dr. Sunaina Dental Care', url: 'https://drsunainadentalcare.com/', study: '/work/dr-sunaina-dental-care/', tag: 'Dental Clinic',                                                      color: '#0891B2' },
  { name: 'India Automation Hub',  url: 'https://indiaautomationhub.com/',  study: '/work/india-automation-hub/',  tag: 'Industrial Media Portal',                                              color: '#F59E0B' },
  { name: 'Streak Creative',       url: 'https://streakcreative.in/',       study: '/work/streak-creative/',       tag: 'Growth Marketing Agency',   thumb: '/assets/work/streakcreative.svg', color: '#E8254B' },
  { name: 'Dr. Nitish Gupta',      url: 'https://agrapulmonologist.com/',   study: '/work/dr-nitish-gupta-pulmonologist/', tag: 'Pulmonology Clinic',                                           color: '#2563EB' },
  { name: 'Our Temples',           url: 'https://ourtemples.info/',         study: '/work/our-temples/',           tag: 'Temple Directory',                                                     color: '#F97316' },
  { name: 'Dr. Sudhir Arora',      url: 'https://drsudhirarora.com/',       study: '/work/dr-sudhir-arora/',       tag: 'Healthcare & Wellness',                                                color: '#14B8A6' },
  { name: 'Sahni Power Solutions', url: 'https://sahnipowersolutions.com/', study: '/work/sahni-power-solutions/', tag: 'Generator Rental',                                                     color: '#22C55E' },
  { name: 'Samverse (this website)', url: 'https://samverse.space/',        study: '/work/samverse/',             tag: 'Portfolio & Lead Generation', thumb: '/assets/og-image.png',             color: '#6D4AFF', hideOnHome: true },
  { name: 'CNN Food & Spices',     url: 'https://cnnfoodandspices.com/',                                           tag: 'E-commerce',                                                           color: '#DC2626', hideOnHome: true },
];
