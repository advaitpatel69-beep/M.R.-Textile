/**
 * faq.js
 * Accessible accordion: multiple items may be open at once, each toggle
 * updates aria-expanded on the button and aria-hidden on the panel.
 */
export function initFaq() {
  const items = document.querySelectorAll(".faq-item");
  if (!items.length) return;

  items.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    if (!question || !answer) return;

    question.addEventListener("click", () => {
      const isOpen = item.classList.toggle("is-open");
      question.setAttribute("aria-expanded", String(isOpen));
      answer.setAttribute("aria-hidden", String(!isOpen));
    });
  });
}
