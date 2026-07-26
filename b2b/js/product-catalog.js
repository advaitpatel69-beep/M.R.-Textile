/**
 * product-catalog.js
 * Powers every [data-product-card] on the B2B pages:
 *  - clicking a variant swatch swaps the main product image (instant,
 *    generic swap — no zoom/scale animation)
 *  - clicking the main image opens it in the shared lightbox
 *  - clicking "Inquire" smooth-scrolls to the inquiry form and prefills
 *    the message field with the product name
 *
 * Product grouping follows the saree_N (main) / saree_N.1, saree_N.2
 * (color variants) file naming convention — see /b2b/README.md.
 */
export function initProductCatalog(lightbox) {
  const cards = document.querySelectorAll("[data-product-card]");

  cards.forEach((card) => {
    const mainImg = card.querySelector(".product-card__image img");
    const swatches = card.querySelectorAll(".variant-swatch");
    const inquireBtn = card.querySelector("[data-inquire]");
    const imageWrap = card.querySelector(".product-card__image");

    swatches.forEach((swatch) => {
      swatch.addEventListener("click", () => {
        const fullSrc = swatch.getAttribute("data-full") || swatch.getAttribute("data-image");
        const thumbSrc = swatch.getAttribute("data-image");
        const label = swatch.getAttribute("data-label") || "";
        if (!mainImg || !thumbSrc) return;

        mainImg.style.opacity = "0";
        window.setTimeout(() => {
          mainImg.src = thumbSrc;
          mainImg.alt = label ? `${card.getAttribute("data-product-name")} — ${label}` : mainImg.alt;
          mainImg.style.opacity = "1";
        }, 100);

        swatches.forEach((s) => s.classList.remove("is-active"));
        swatch.classList.add("is-active");
        card.dataset.activeFull = fullSrc || thumbSrc;
      });
    });

    if (imageWrap && mainImg) {
      imageWrap.addEventListener("click", () => {
        const productName = card.getAttribute("data-product-name") || mainImg.alt;
        const full = card.dataset.activeFull || mainImg.src;
        lightbox.open([{ src: full, alt: mainImg.alt, caption: productName }], 0, imageWrap);
      });
    }

    if (inquireBtn) {
      inquireBtn.addEventListener("click", () => {
        const productName = card.getAttribute("data-product-name") || "";
        const target = document.getElementById("inquiry") || document.getElementById("contact");
        const messageField = document.querySelector('[data-contact-form] textarea[name="message"]');

        if (messageField && productName) {
          messageField.value = `Inquiry about: ${productName}\n\n`;
        }
        if (target) {
          const header = document.querySelector(".site-header");
          const offset = header ? header.getBoundingClientRect().height + 16 : 0;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }
        if (messageField) {
          window.setTimeout(() => messageField.focus(), 350);
        }
      });
    }
  });
}
