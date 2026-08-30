/**
 * collections.js
 * - Filters the collection card grid by category via the filter chips
 * - Opens the shared lightbox, scoped to that category's gallery images,
 *   when "View Collection" is activated on a card
 */
export function initCollections(lightbox) {
  const grid = document.querySelector("[data-collections-grid]");
  const chips = document.querySelectorAll("[data-filter-chip]");
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll(".collection-card"));

  /* ---- Filtering ---- */
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      const filter = chip.getAttribute("data-filter-chip");

      cards.forEach((card) => {
        const matches = filter === "all" || card.getAttribute("data-category") === filter;
        card.classList.toggle("is-hidden", !matches);
      });
    });
  });

  /* ---- View Collection -> scoped lightbox ---- */
  const galleryItems = Array.from(document.querySelectorAll(".masonry__item"));

  cards.forEach((card) => {
    const trigger = card.querySelector("[data-view-collection]");
    if (!trigger) return;
    const category = card.getAttribute("data-category");

    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      const scoped = galleryItems.filter((el) => el.getAttribute("data-category") === category);
      const pool = scoped.length ? scoped : galleryItems;
      const items = pool.map((el) => ({
        src: el.getAttribute("data-full"),
        alt: el.querySelector("img")?.alt || "",
        caption: el.getAttribute("data-caption") || "",
      }));
      lightbox.open(items, 0, trigger);
    });
  });

  /* ---- Mobile / Touch interaction: active ONLY when touch/swipe is inside card area ---- */
  cards.forEach((card) => {
    let isTouching = false;

    const isTouchInsideCard = (touch) => {
      const rect = card.getBoundingClientRect();
      return (
        touch.clientX >= rect.left &&
        touch.clientX <= rect.right &&
        touch.clientY >= rect.top &&
        touch.clientY <= rect.bottom
      );
    };

    card.addEventListener(
      "touchstart",
      () => {
        isTouching = true;
        card.classList.add("is-active");
      },
      { passive: true }
    );

    card.addEventListener(
      "touchmove",
      (e) => {
        if (!isTouching) return;
        const touch = e.touches[0];
        if (!touch) return;
        if (isTouchInsideCard(touch)) {
          card.classList.add("is-active");
        } else {
          card.classList.remove("is-active");
        }
      },
      { passive: true }
    );

    card.addEventListener(
      "touchend",
      () => {
        isTouching = false;
        setTimeout(() => {
          card.classList.remove("is-active");
        }, 250);
      },
      { passive: true }
    );

    card.addEventListener(
      "touchcancel",
      () => {
        isTouching = false;
        card.classList.remove("is-active");
      },
      { passive: true }
    );
  });
}
