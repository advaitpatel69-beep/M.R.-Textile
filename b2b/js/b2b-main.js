/**
 * b2b-main.js
 * Entry point for b2b/index.html. Reuses shared, unmodified modules from
 * the premium site's /js/ folder wherever the behavior is identical
 * (navigation, contact form, back-to-top, lazy images, lightbox) — only
 * imports NEW code for what's actually different (product-catalog.js).
 *
 * Deliberately NOT imported here, by design: preloader.js, hero-slider.js,
 * parallax.js, counters.js, scroll-reveal.js, scroll-progress.js — the B2B
 * experience skips loading screens, slideshows, parallax, animated counting
 * and scroll-triggered reveals entirely. See /b2b/README.md.
 */
import { initNavigation } from "../../js/navigation.js";
import { initContactForm } from "../../js/contact-form.js";
import { initBackToTop } from "../../js/back-to-top.js";
import { initLazyImageFade } from "../../js/lazy-images.js";
import { createLightbox } from "../../js/lightbox.js";
import { initHeroSlider } from "../../js/hero-slider.js";
import { initProductCatalog } from "./product-catalog.js";

function init() {
  initNavigation();
  initContactForm();
  initBackToTop();
  initLazyImageFade();
  initHeroSlider();

  const lightbox = createLightbox();
  initProductCatalog(lightbox);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
