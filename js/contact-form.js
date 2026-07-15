/**
 * contact-form.js
 * Client-side validation + submit UX for the wholesale inquiry form.
 *
 * This static site has no backend, so a valid submit opens WhatsApp with
 * a prefilled inquiry message. If the browser blocks the new tab, the same
 * WhatsApp link is shown inside the form status area.
 */
import { showToast } from "./toast.js";

const WHATSAPP_NUMBER = "919428393320";

const VALIDATORS = {
  name: (v) => (v.trim().length >= 2 ? "" : "Please enter your full name."),
  business: (v) => (v.trim().length >= 2 ? "" : "Please enter your business name."),
  city: (v) => (v.trim().length >= 2 ? "" : "Please enter your city."),
  phone: (v) =>
    /^(\+?91[\s-]?)?[6-9]\d{9}$/.test(v.replace(/\s+/g, ""))
      ? ""
      : "Enter a valid 10-digit phone number.",
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Enter a valid email address."),
  message: (v) => (v.trim().length >= 10 ? "" : "Tell us a little more (10+ characters)."),
};

export function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const statusEl = form.querySelector(".form-status");
  const submitBtn = form.querySelector('button[type="submit"]');

  const fieldWrap = (input) => input.closest(".form-field");

  const setError = (input, message) => {
    const wrap = fieldWrap(input);
    if (!wrap) return;
    const errorEl = wrap.querySelector(".form-field__error");
    if (message) {
      wrap.classList.add("has-error");
      if (errorEl) errorEl.textContent = message;
    } else {
      wrap.classList.remove("has-error");
      if (errorEl) errorEl.textContent = "";
    }
  };

  const validateField = (input) => {
    const validator = VALIDATORS[input.name];
    if (!validator) return true;
    const message = validator(input.value);
    setError(input, message);
    return !message;
  };

  Object.keys(VALIDATORS).forEach((name) => {
    const input = form.elements.namedItem(name);
    if (!input) return;
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => {
      if (fieldWrap(input)?.classList.contains("has-error")) validateField(input);
    });
  });

  const showStatus = (type, message) => {
    if (!statusEl) return;
    statusEl.className = `form-status is-visible is-${type}`;
    const icon =
      type === "success"
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 9v4M12 17h.01" stroke-linecap="round"/><circle cx="12" cy="12" r="9"/></svg>';
    statusEl.innerHTML = `${icon}<span>${message}</span>`;
  };

  const showWhatsappStatus = (url) => {
    if (!statusEl) return;
    statusEl.className = "form-status is-visible is-success";
    statusEl.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    const text = document.createElement("span");
    text.textContent = "Your inquiry is ready in WhatsApp. ";

    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = "Open WhatsApp";

    text.appendChild(link);
    statusEl.appendChild(text);
  };

  const buildWhatsappUrl = () => {
    const value = (name) => form.elements.namedItem(name)?.value.trim() || "";
    const message = [
      "Hi M.R. Textile, I am interested in wholesale saree inquiries.",
      "",
      `Name: ${value("name")}`,
      `Business: ${value("business")}`,
      `City: ${value("city")}`,
      `Phone: ${value("phone")}`,
      `Email: ${value("email")}`,
      "",
      `Requirement: ${value("message")}`,
    ].join("\n");

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;
    Object.keys(VALIDATORS).forEach((name) => {
      const input = form.elements.namedItem(name);
      if (input && !validateField(input)) isValid = false;
    });

    if (!isValid) {
      showStatus("error", "Please correct the highlighted fields and try again.");
      form.querySelector(".has-error input, .has-error textarea")?.focus();
      return;
    }

    const whatsappUrl = buildWhatsappUrl();
    showWhatsappStatus(whatsappUrl);
    const whatsappWindow = window.open(whatsappUrl, "_blank", "noopener");
    if (!whatsappWindow) {
      showToast("Please open the WhatsApp link to send your inquiry", "error");
      return;
    }

    showToast("WhatsApp inquiry ready to send", "success");
    form.reset();
  });
}
