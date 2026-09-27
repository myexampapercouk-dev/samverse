// ==========================================================
// Samverse — Sameer Gupta Portfolio
// Portfolio cards are written into the HTML by tools/build-pages.js
// (data in tools/projects.js) so their links are crawlable.
// This script only manages their screenshots.
// ==========================================================

// ---------- Portfolio card screenshots ----------
document.querySelectorAll(".work-thumb img[data-shot]").forEach(img => {
  const shot = img.dataset.shot;
  // mShots returns a 400px "Generating preview" placeholder the first time;
  // retry a few times until the real 800px screenshot is ready.
  let tries = 0;
  const onLoad = () => {
    if (img.naturalWidth > 400 || !img.src.includes("mshots")) return img.classList.add("loaded");
    if (++tries <= 4) setTimeout(() => { img.src = `${shot}&r=${tries}`; }, 5000);
  };
  const onError = () => {
    // Custom thumb not found: fall back to the live screenshot
    if (!img.src.includes("mshots")) img.src = shot;
    else img.remove();
  };
  img.addEventListener("load", onLoad);
  img.addEventListener("error", onError);
  // The image may have finished before this deferred script ran
  if (img.complete) img.naturalWidth ? onLoad() : onError();
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

// ---------- Hero counters (hero is visible immediately) + reveal on scroll ----------
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

document.querySelectorAll("[data-count]").forEach(countUp);

if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      io.unobserve(e.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach(el => el.classList.add("in"));
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
  else if (a.classList.contains("work-card")) gtag("event", "portfolio_click", { site: new URL(href, location.href).pathname });
  else if (a.closest(".share")) gtag("event", "share", { method: a.getAttribute("aria-label") || "link" });
});

// ---------- Article pages: reading progress, active contents link, copy link ----------
const article = document.querySelector(".post-body");
if (article) {
  const bar = document.getElementById("readProgress");
  const tocLinks = [...document.querySelectorAll(".post-toc a")];
  const headings = tocLinks.map(a => document.getElementById(decodeURIComponent(a.hash.slice(1)))).filter(Boolean);

  const onArticleScroll = () => {
    const rect = article.getBoundingClientRect();
    const total = rect.height - innerHeight;
    const done = Math.min(Math.max(-rect.top / (total > 0 ? total : 1), 0), 1);
    if (bar) bar.style.width = (done * 100).toFixed(1) + "%";
    // Highlight the last heading that has scrolled past the top area
    let current = headings[0];
    for (const h of headings) if (h.getBoundingClientRect().top < 140) current = h;
    tocLinks.forEach(a => a.classList.toggle("active", current && a.hash === "#" + current.id));
  };
  addEventListener("scroll", onArticleScroll, { passive: true });
  addEventListener("resize", onArticleScroll);
  onArticleScroll();

  // Close the mobile contents menu after choosing a section
  document.querySelectorAll(".toc-mobile a").forEach(a => a.addEventListener("click", () => a.closest("details").removeAttribute("open")));
}

document.querySelectorAll(".share-copy").forEach(btn => btn.addEventListener("click", async () => {
  const label = btn.querySelector("span");
  try {
    await navigator.clipboard.writeText(btn.dataset.url);
    btn.classList.add("copied");
    if (label) label.textContent = "Copied!";
    setTimeout(() => { btn.classList.remove("copied"); if (label) label.textContent = "Copy link"; }, 2000);
  } catch (e) {
    prompt("Copy this link:", btn.dataset.url);
  }
}));
