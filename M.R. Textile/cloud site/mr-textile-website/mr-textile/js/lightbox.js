/**
 * lightbox.js
 * A single shared fullscreen lightbox used by both the Gallery section and
 * the "View Collection" action on collection cards. Supports arrow-key and
 * swipe navigation, Escape to close, and returns focus to whatever
 * triggered it.
 *
 * Usage:
 *   const lightbox = createLightbox();
 *   lightbox.open(itemsArray, startIndex, triggerElement);
 *   // itemsArray: [{ src, alt, caption }, ...]
 */
export function createLightbox() {
  const root = document.querySelector("[data-lightbox]");
  if (!root) return { open() {} };

  const frame = root.querySelector(".lightbox__frame");
  const imgEl = root.querySelector(".lightbox__frame img");
  const captionEl = root.querySelector(".lightbox__caption");
  const counterEl = root.querySelector(".lightbox__counter");
  const closeBtn = root.querySelector(".lightbox__close");
  const prevBtn = root.querySelector(".lightbox__nav--prev");
  const nextBtn = root.querySelector(".lightbox__nav--next");

  let items = [];
  let index = 0;
  let lastTrigger = null;
  let touchStartX = null;

  const render = () => {
    const item = items[index];
    if (!item) return;
    imgEl.classList.remove("is-visible");
    // Swap after a beat so the fade-out/in reads as a transition, not a jump.
    window.setTimeout(() => {
      captionEl.innerHTML = item.caption || "";
      imgEl.onload = () => imgEl.classList.add("is-visible");
      imgEl.src = item.src;
      imgEl.alt = item.alt || "";
      if (imgEl.complete && imgEl.naturalWidth > 0) {
        imgEl.classList.add("is-visible");
      }
    }, 90);
    counterEl.textContent = `${index + 1} / ${items.length}`;
    const multiple = items.length > 1;
    prevBtn.hidden = !multiple;
    nextBtn.hidden = !multiple;
  };

  const open = (newItems, startIndex, triggerEl) => {
    if (!newItems || !newItems.length) return;
    items = newItems;
    index = startIndex || 0;
    lastTrigger = triggerEl || document.activeElement;
    render();
    root.classList.add("is-open");
    root.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    closeBtn.focus();
    document.addEventListener("keydown", onKeydown);
  };

  const close = () => {
    root.classList.remove("is-open");
    root.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    document.removeEventListener("keydown", onKeydown);
    imgEl.classList.remove("is-visible");
    imgEl.src = "";
    if (lastTrigger && typeof lastTrigger.focus === "function") {
      lastTrigger.focus();
    }
  };

  const go = (delta) => {
    index = (index + delta + items.length) % items.length;
    render();
  };

  function onKeydown(e) {
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  }

  closeBtn.addEventListener("click", close);
  root.querySelector(".lightbox__backdrop").addEventListener("click", close);
  prevBtn.addEventListener("click", () => go(-1));
  nextBtn.addEventListener("click", () => go(1));

  // Swipe support for touch devices
  frame.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
    },
    { passive: true }
  );
  frame.addEventListener(
    "touchend",
    (e) => {
      if (touchStartX === null) return;
      const delta = e.changedTouches[0].clientX - touchStartX;
      const SWIPE_THRESHOLD = 40;
      if (delta > SWIPE_THRESHOLD) go(-1);
      else if (delta < -SWIPE_THRESHOLD) go(1);
      touchStartX = null;
    },
    { passive: true }
  );

  return { open, close };
}
