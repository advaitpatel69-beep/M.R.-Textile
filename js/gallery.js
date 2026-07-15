/**
 * gallery.js
 * Wires the masonry gallery to the shared lightbox, and implements a
 * "Load more" reveal so only a first batch of images ships eagerly while
 * the rest lazy-load in on demand.
 */
export function initGallery(lightbox) {
  const grid = document.querySelector("[data-gallery-grid]");
  if (!grid) return;

  const items = Array.from(grid.querySelectorAll(".masonry__item"));
  const loadMoreBtn = document.querySelector("[data-gallery-loadmore]");
  const INITIAL_VISIBLE = 8;

  const toLightboxItem = (el) => ({
    src: el.getAttribute("data-full"),
    alt: el.querySelector("img")?.alt || "",
    caption: el.getAttribute("data-caption") || "",
  });

  const allLightboxItems = items.map(toLightboxItem);

  items.forEach((el, i) => {
    if (i >= INITIAL_VISIBLE) el.hidden = true;

    el.addEventListener("click", () => {
      lightbox.open(allLightboxItems, i, el);
    });
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        lightbox.open(allLightboxItems, i, el);
      }
    });
  });

  if (loadMoreBtn) {
    if (items.length <= INITIAL_VISIBLE) {
      loadMoreBtn.hidden = true;
    } else {
      loadMoreBtn.addEventListener("click", () => {
        items.forEach((el) => (el.hidden = false));
        loadMoreBtn.hidden = true;
      });
    }
  }
}
