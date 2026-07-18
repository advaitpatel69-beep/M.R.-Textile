/**
 * contact-page.js
 * Entry point for contact.html. Imports and initialises all modules
 * from the shared JS library. Safe no-ops if markup is absent.
 */
import { initPreloader } from "./preloader.js";
import { initNavigation } from "./navigation.js";
import { initScrollReveal } from "./scroll-reveal.js";
import { initFaq } from "./faq.js";
import { initContactForm } from "./contact-form.js";
import { initScrollProgress } from "./scroll-progress.js";
import { initBackToTop } from "./back-to-top.js";
import { initLazyImageFade } from "./lazy-images.js";

function init() {
  initPreloader();
  initNavigation();
  initScrollReveal();
  initFaq();
  initContactForm();
  initScrollProgress();
  initBackToTop();
  initLazyImageFade();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
