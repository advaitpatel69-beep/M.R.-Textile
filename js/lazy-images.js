/**
 * lazy-images.js
 * Pairs with loading="lazy" images: once the browser actually loads an
 * image, we add .is-loaded so the CSS opacity transition can fade it in
 * rather than having it pop in abruptly.
 */
export function initLazyImageFade() {
  const images = document.querySelectorAll('img[loading="lazy"]');

  images.forEach((img) => {
    if (img.complete && img.naturalWidth > 0) {
      img.classList.add("is-loaded");
      return;
    }
    img.addEventListener("load", () => img.classList.add("is-loaded"), { once: true });
    img.addEventListener("error", () => img.classList.add("is-loaded"), { once: true });
  });
}
