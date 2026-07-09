/**
 * main.js
 * Entry point (loaded via <script type="module">). Initializes every
 * feature module once the DOM is ready. Each module is self-contained and
 * safely no-ops if its markup isn't present on the page.
 */
import { initPreloader } from "./preloader.js";
import { initNavigation } from "./navigation.js";
import { initHeroSlider } from "./hero-slider.js";
import { initScrollReveal } from "./scroll-reveal.js";
import { initCounters } from "./counters.js";
import { createLightbox } from "./lightbox.js";
import { initGallery } from "./gallery.js";
import { initCollections } from "./collections.js";
import { initFaq } from "./faq.js";
import { initTestimonials } from "./testimonials.js";
import { initContactForm } from "./contact-form.js";
import { initScrollProgress } from "./scroll-progress.js";
import { initBackToTop } from "./back-to-top.js";
import { initLazyImageFade } from "./lazy-images.js";

function init() {
  initPreloader();
  initNavigation();
  initHeroSlider();
  initScrollReveal();
  initCounters();
  initFaq();
  initTestimonials();
  initContactForm();
  initScrollProgress();
  initBackToTop();
  initLazyImageFade();

  const lightbox = createLightbox();
  initGallery(lightbox);
  initCollections(lightbox);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
