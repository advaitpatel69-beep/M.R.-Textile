/**
 * whatsapp-gate.js
 * Intercepts all WhatsApp links and shows a qualification modal:
 * Name/Business, City/State, Inquiry type, Language preference (Hindi/English).
 * Builds a bilingual pre-filled message and opens WhatsApp.
 */

const WA_NUMBER = "919428393320";

const INTENTS = {
  en: ["Wholesale Pricing", "Product Catalog", "Bulk Order", "Custom / Special Order", "Other"],
  hi: ["होलसेल मूल्य जानकारी", "प्रोडक्ट कैटलॉग", "बल्क ऑर्डर", "कस्टम / विशेष ऑर्डर", "अन्य"]
};

function buildModal() {
  const overlay = document.createElement("div");
  overlay.id = "wa-gate-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "WhatsApp Inquiry");

  const enChips = INTENTS.en.map((t, i) =>
    `<label class="wa-gate__chip"><input type="radio" name="wa-intent" value="${t}" ${i === 0 ? "checked" : ""} /><span>${t}</span></label>`
  ).join("");

  const hiChips = INTENTS.hi.map((t, i) =>
    `<label class="wa-gate__chip"><input type="radio" name="wa-intent" value="${t}" ${i === 0 ? "checked" : ""} /><span>${t}</span></label>`
  ).join("");

  overlay.innerHTML = `
    <div class="wa-gate__card" id="wa-gate-card">
      <button class="wa-gate__close" id="wa-gate-close" aria-label="Close">&times;</button>
      <div class="wa-gate__header">
        <svg class="wa-gate__wa-icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true" width="42" height="42">
          <circle cx="16" cy="16" r="16" fill="#25D366"/>
          <path fill="#fff" d="M23.5 8.5A10.45 10.45 0 0 0 16 5.5C10.201 5.5 5.5 10.2 5.5 16c0 1.85.48 3.65 1.4 5.24L5.5 26.5l5.39-1.41A10.46 10.46 0 0 0 16 26.5c5.8 0 10.5-4.7 10.5-10.5 0-2.8-1.09-5.43-3-7.5zm-7.5 16.15a8.69 8.69 0 0 1-4.43-1.21l-.32-.19-3.2.84.86-3.12-.21-.32A8.63 8.63 0 0 1 7.35 16c0-4.77 3.88-8.65 8.65-8.65A8.65 8.65 0 0 1 24.65 16c0 4.77-3.88 8.65-8.65 8.65zm4.74-6.47c-.26-.13-1.53-.75-1.77-.84-.23-.09-.4-.13-.57.13-.17.26-.65.84-.8 1.01-.15.17-.29.19-.55.06-.26-.13-1.1-.4-2.09-1.29-.77-.69-1.29-1.54-1.44-1.8-.15-.26-.02-.4.11-.53.12-.11.26-.29.39-.44.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.57-1.37-.78-1.88-.2-.49-.41-.43-.57-.43h-.48c-.17 0-.44.06-.67.32-.23.26-.88.86-.88 2.09s.9 2.43 1.03 2.6c.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.48-.6 1.69-1.18.21-.58.21-1.08.15-1.18-.07-.09-.23-.15-.49-.28z"/>
        </svg>
        <div>
          <h3 class="wa-gate__title">Quick Inquiry</h3>
          <p class="wa-gate__subtitle">Tell us a bit about yourself before we connect</p>
        </div>
      </div>
      <form class="wa-gate__form" id="wa-gate-form" novalidate>

        <!-- Language toggle -->
        <div class="wa-gate__field">
          <label class="wa-gate__label">Message Language <span class="wa-gate__optional">(optional)</span></label>
          <div class="wa-gate__lang-toggle" role="group" aria-label="Message language">
            <label class="wa-gate__lang-opt">
              <input type="radio" name="wa-lang" value="hi" checked />
              <span>🇮🇳 Hindi</span>
            </label>
            <label class="wa-gate__lang-opt">
              <input type="radio" name="wa-lang" value="en" />
              <span>🇬🇧 English</span>
            </label>
          </div>
        </div>

        <div class="wa-gate__field">
          <label class="wa-gate__label" for="wa-name">Your Name / Business Name <span aria-hidden="true">*</span></label>
          <input class="wa-gate__input" id="wa-name" type="text" placeholder="e.g. Rahul Saree Store" autocomplete="name" required />
          <span class="wa-gate__error" id="wa-name-err" hidden>Please enter your name.</span>
        </div>

        <div class="wa-gate__field">
          <label class="wa-gate__label" for="wa-city">City / State <span aria-hidden="true">*</span></label>
          <input class="wa-gate__input" id="wa-city" type="text" placeholder="e.g. Jaipur, Rajasthan" autocomplete="address-level2" required />
          <span class="wa-gate__error" id="wa-city-err" hidden>Please enter your city or state.</span>
        </div>

        <div class="wa-gate__field">
          <label class="wa-gate__label" id="wa-intent-label">Inquiry Type <span aria-hidden="true">*</span></label>
          <div class="wa-gate__chips" id="wa-intent-chips" role="group" aria-labelledby="wa-intent-label">
            ${enChips}
          </div>
        </div>

        <button type="submit" class="wa-gate__submit" id="wa-gate-submit">
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="none" width="20" height="20" aria-hidden="true">
            <circle cx="16" cy="16" r="16" fill="white"/>
            <path fill="#25D366" d="M23.5 8.5A10.45 10.45 0 0 0 16 5.5C10.201 5.5 5.5 10.2 5.5 16c0 1.85.48 3.65 1.4 5.24L5.5 26.5l5.39-1.41A10.46 10.46 0 0 0 16 26.5c5.8 0 10.5-4.7 10.5-10.5 0-2.8-1.09-5.43-3-7.5zm-7.5 16.15a8.69 8.69 0 0 1-4.43-1.21l-.32-.19-3.2.84.86-3.12-.21-.32A8.63 8.63 0 0 1 7.35 16c0-4.77 3.88-8.65 8.65-8.65A8.65 8.65 0 0 1 24.65 16c0 4.77-3.88 8.65-8.65 8.65zm4.74-6.47c-.26-.13-1.53-.75-1.77-.84-.23-.09-.4-.13-.57.13-.17.26-.65.84-.8 1.01-.15.17-.29.19-.55.06-.26-.13-1.1-.4-2.09-1.29-.77-.69-1.29-1.54-1.44-1.8-.15-.26-.02-.4.11-.53.12-.11.26-.29.39-.44.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.57-1.37-.78-1.88-.2-.49-.41-.43-.57-.43h-.48c-.17 0-.44.06-.67.32-.23.26-.88.86-.88 2.09s.9 2.43 1.03 2.6c.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.48-.6 1.69-1.18.21-.58.21-1.08.15-1.18-.07-.09-.23-.15-.49-.28z"/>
          </svg>
          Confirm &amp; Open WhatsApp
        </button>

        <!-- Fix 3: Reply-time assurance -->
        <p class="wa-gate__assurance">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2" stroke-linecap="round"/></svg>
          We typically reply within a few hours — guaranteed within 24 hours on business days.
        </p>

      </form>
    </div>
  `;
  return overlay;
}

function updateIntentChips(overlay, lang) {
  const container = overlay.querySelector("#wa-intent-chips");
  const chips = INTENTS[lang].map((t, i) =>
    `<label class="wa-gate__chip"><input type="radio" name="wa-intent" value="${t}" ${i === 0 ? "checked" : ""} /><span>${t}</span></label>`
  ).join("");
  container.innerHTML = chips;
}

function buildMessage(name, city, intent, lang) {
  if (lang === "hi") {
    return `नमस्ते M.R. Textile, मैं ${name} हूँ, ${city} से। मुझे ${intent} के बारे में जानकारी चाहिए।`;
  }
  return `Hi M.R. Textile, I'm ${name} from ${city}. My inquiry is about: ${intent}.`;
}

function openGate(e) {
  e.preventDefault();
  const existing = document.getElementById("wa-gate-overlay");
  if (existing) existing.remove();

  const overlay = buildModal();
  document.body.appendChild(overlay);

  requestAnimationFrame(() => {
    overlay.classList.add("is-visible");
    overlay.querySelector("#wa-name").focus();
  });

  // Language toggle — swap intent chips
  overlay.querySelectorAll('input[name="wa-lang"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      updateIntentChips(overlay, radio.value);
    });
  });

  // Update chips immediately based on default (Hindi)
  updateIntentChips(overlay, "hi");

  const close = () => {
    overlay.classList.remove("is-visible");
    setTimeout(() => overlay.remove(), 280);
  };

  overlay.querySelector("#wa-gate-close").addEventListener("click", close);
  overlay.addEventListener("click", (ev) => { if (ev.target === overlay) close(); });
  document.addEventListener("keydown", function esc(ev) {
    if (ev.key === "Escape") { close(); document.removeEventListener("keydown", esc); }
  });

  overlay.querySelector("#wa-gate-form").addEventListener("submit", (ev) => {
    ev.preventDefault();
    const name   = overlay.querySelector("#wa-name").value.trim();
    const city   = overlay.querySelector("#wa-city").value.trim();
    const intent = overlay.querySelector('input[name="wa-intent"]:checked')?.value || "General Inquiry";
    const lang   = overlay.querySelector('input[name="wa-lang"]:checked')?.value || "hi";

    const nameErr = overlay.querySelector("#wa-name-err");
    const cityErr = overlay.querySelector("#wa-city-err");
    nameErr.hidden = true;
    cityErr.hidden = true;

    if (!name) { nameErr.hidden = false; overlay.querySelector("#wa-name").focus(); return; }
    if (!city) { cityErr.hidden = false; overlay.querySelector("#wa-city").focus(); return; }

    const msg = buildMessage(name, city, intent, lang);
    const url = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(msg);
    window.open(url, "_blank", "noopener,noreferrer");
    close();
  });
}

export function initWhatsAppGate() {
  // Use event delegation on document so ALL WhatsApp links — including those
  // injected by JS after DOMContentLoaded — trigger the gate.
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href*="wa.me"], a[href*="whatsapp.com"]');
    if (link) openGate(e);
  });
}
