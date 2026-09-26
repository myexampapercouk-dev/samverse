// ==========================================================
// Samverse — Sameer Gupta Portfolio
// To add a project, append an entry to PROJECTS below.
// Optional `thumb`: your own screenshot (e.g. "assets/work/thirdeye.png").
// If it is missing, a live screenshot is fetched automatically.
// ==========================================================
const PROJECTS = [
  { name: "Third Eye Social",       url: "https://thirdeye.social/",             tag: "Digital Agency",       thumb: "assets/work/thirdeye.svg", colors: ["#7C5CFF", "#EC4899"] },
  { name: "Vansh Group",            url: "https://vansh.group/",                 tag: "Corporate",            colors: ["#0EA5E9", "#6366F1"] },
  { name: "India Automation Hub",   url: "https://indiaautomationhub.com/",      tag: "Industrial / B2B",     colors: ["#F59E0B", "#EF4444"] },
  { name: "Streak Creative",        url: "https://streakcreative.in/",           tag: "Creative Studio",      thumb: "assets/work/streakcreative.svg", colors: ["#EC4899", "#8B5CF6"] },
  { name: "Our Temples",            url: "https://ourtemples.info/",             tag: "Information Portal",   colors: ["#F97316", "#FACC15"] },
  { name: "Dr. Sudhir Arora",       url: "https://drsudhirarora.com/",           tag: "Healthcare",           colors: ["#14B8A6", "#3B82F6"] },
  { name: "Sahni Power Solutions",  url: "https://sahnipowersolutions.com/",      tag: "Power & Energy",       colors: ["#22C55E", "#0EA5E9"] },
  { name: "CNN Food & Spices",      url: "https://cnnfoodandspices.com/",        tag: "Food & Spices",        colors: ["#DC2626", "#F59E0B"] },
];

// ---------- Render portfolio cards ----------
const grid = document.getElementById("workGrid");
// Landing pages can show a subset: <div id="workGrid" data-projects="Name 1|Name 2">
const only = (grid.dataset.projects || "").split("|").filter(Boolean);
PROJECTS.filter(p => !only.length || only.includes(p.name)).forEach(({ name, url, tag, thumb, colors }) => {
  const host = new URL(url).hostname.replace(/^www\./, "");
  // WordPress.com mShots generates a live screenshot of each site
  const shot = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=800&h=500`;
  const card = document.createElement("a");
  card.className = "work-card reveal";
  card.href = url;
  card.target = "_blank";
  card.rel = "noopener";
  card.innerHTML = `
    <div class="browser-bar"><i></i><i></i><i></i></div>
    <div class="work-thumb" style="background:${colors[0]}">
      <div class="fallback">${name}</div>
      <img src="${thumb || shot}" alt="Screenshot of ${name} website" loading="lazy">
    </div>
    <div class="work-body">
      <span class="work-tag">${tag}</span>
      <h3>${name}</h3>
      <div class="work-url"><span>${host}</span><span class="arrow">↗</span></div>
    </div>`;
  const img = card.querySelector("img");
  // mShots returns a 400px "Generating preview" placeholder the first time;
  // retry a few times until the real 800px screenshot is ready.
  let tries = 0;
  img.addEventListener("load", () => {
    if (img.naturalWidth > 400 || !img.src.includes("mshots")) return img.classList.add("loaded");
    if (++tries <= 4) setTimeout(() => { img.src = `${shot}&r=${tries}`; }, 5000);
  });
  img.addEventListener("error", () => {
    // Custom thumb not found: fall back to the live screenshot
    if (thumb && !img.src.includes("mshots")) img.src = shot;
    else img.remove();
  });
  grid.appendChild(card);
});

// ---------- Header shadow on scroll ----------
const header = document.querySelector(".header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ---------- Mobile menu ----------
const toggle = document.getElementById("menuToggle");
const links = document.getElementById("navLinks");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  links.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
}));

// ---------- Reveal on scroll + counters ----------
const countUp = el => {
  const target = +el.dataset.count;
  const start = performance.now();
  const tick = now => {
    const p = Math.min((now - start) / 1400, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      e.target.querySelectorAll("[data-count]").forEach(countUp);
      io.unobserve(e.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach(el => el.classList.add("in"));
  document.querySelectorAll("[data-count]").forEach(el => (el.textContent = el.dataset.count));
}

// ---------- Contact form spam protection ----------
// Math question + hidden honeypot field + minimum time on page.
const form = document.getElementById("contactForm");
const captchaQ = document.getElementById("captchaQ");
const captchaInput = document.getElementById("captchaInput");
const formError = document.getElementById("formError");
const loadedAt = Date.now();
let captchaAnswer = 0;

const newCaptcha = () => {
  const a = 2 + Math.floor(Math.random() * 9);
  const b = 1 + Math.floor(Math.random() * 9);
  captchaAnswer = a + b;
  captchaQ.textContent = `${a} + ${b}`;
  captchaInput.value = "";
};
newCaptcha();
document.getElementById("captchaRefresh").addEventListener("click", () => { newCaptcha(); captchaInput.focus(); });
captchaInput.addEventListener("input", () => { formError.textContent = ""; });

// ---------- Contact form → email (Netlify Function) → WhatsApp ----------
const msgEl = document.getElementById("msg");
const submitBtn = document.getElementById("formSubmit");
const setMsg = (text, cls = "") => { msgEl.textContent = text; msgEl.className = "form-msg " + cls; };

form.addEventListener("submit", async e => {
  e.preventDefault();
  const f = e.target;
  // Bots fill the hidden field or submit instantly: silently ignore them
  if (f["bot-field"].value || Date.now() - loadedAt < 3000) return;
  if (parseInt(captchaInput.value, 10) !== captchaAnswer) {
    formError.textContent = "That answer isn't right. Please try the new question.";
    newCaptcha();
    captchaInput.focus();
    return;
  }

  submitBtn.disabled = true;
  setMsg("Sending...");
  const payload = new URLSearchParams(new FormData(f));
  payload.delete("captcha");
  payload.set("page", location.pathname);

  // Email the enquiry; WhatsApp still opens if email fails, so no lead is lost
  let emailed = false;
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 10000);
    const res = await fetch("/.netlify/functions/send-quote", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: payload.toString(),
      signal: ctrl.signal
    });
    clearTimeout(timer);
    emailed = (await res.json().catch(() => ({}))).ok === true;
  } catch (err) {}

  if (typeof gtag === "function") gtag("event", "generate_lead", { form_name: "contact", emailed });

  // Note: an input named "name" shadows form.name, so f.name.value reads the Name field
  const text =
    `Hi Sameer, I found you on samverse.space.\n\n` +
    `Name: ${f.name.value}\n` +
    `Phone: ${f.phone.value}\n` +
    (f.email.value ? `Email: ${f.email.value}\n` : "") +
    `Project: ${f.type.value}\n\n` +
    `${f.message.value}`;
  setMsg(emailed ? "Thanks! Your enquiry has been sent. Opening WhatsApp..." : "Opening WhatsApp so you can send your enquiry...", emailed ? "ok" : "");
  f.reset();
  newCaptcha();
  submitBtn.disabled = false;
  // Same-tab redirect: popup blockers stop window.open after an await
  setTimeout(() => { location.href = `https://wa.me/917417049145?text=${encodeURIComponent(text)}`; }, 1200);
});

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Analytics: track contact clicks and portfolio visits (GA4) ----------
document.addEventListener("click", e => {
  const a = e.target.closest("a[href]");
  if (!a || typeof gtag !== "function") return;
  const href = a.getAttribute("href");
  if (href.startsWith("https://wa.me")) gtag("event", "contact_whatsapp", { link_text: a.textContent.trim() });
  else if (href.startsWith("tel:")) gtag("event", "contact_call");
  else if (href.startsWith("mailto:")) gtag("event", "contact_email");
  else if (a.classList.contains("work-card")) gtag("event", "portfolio_click", { site: new URL(href).hostname });
});
