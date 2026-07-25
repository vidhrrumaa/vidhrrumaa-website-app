/** Smooth-scroll to a CSS selector, offset by the navbar height. */
export function scrollTo(selector: string) {
  const el = document.querySelector(selector);
  if (!el) return;
  const offset = 80; // navbar height
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}
