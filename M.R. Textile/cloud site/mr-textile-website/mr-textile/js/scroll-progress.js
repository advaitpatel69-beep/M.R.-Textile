/**
 * scroll-progress.js
 * Fills the thin top progress bar according to how far the page has been
 * scrolled.
 */
export function initScrollProgress() {
  const bar = document.querySelector(".scroll-progress");
  if (!bar) return;

  let ticking = false;

  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${Math.min(100, Math.max(0, percent))}%`;
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );

  update();
}
