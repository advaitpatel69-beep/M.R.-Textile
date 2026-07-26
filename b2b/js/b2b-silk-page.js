/**
 * b2b-silk-page.js
 * Entry point for b2b/silk-sarees.html. Same reuse pattern as
 * b2b-main.js — see the notes there for what's intentionally omitted.
 */
import { initNavigation } from "../../js/navigation.js";
import { initContactForm } from "../../js/contact-form.js";
import { initBackToTop } from "../../js/back-to-top.js";
import { initLazyImageFade } from "../../js/lazy-images.js";
import { createLightbox } from "../../js/lightbox.js";
import { initProductCatalog } from "./product-catalog.js";

function init() {
  initNavigation();
  initContactForm();
  initBackToTop();
  initLazyImageFade();

  const lightbox = createLightbox();
  initProductCatalog(lightbox);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
