const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");
const projectTrack = document.querySelector("[data-project-track]");

function updateHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 18);
}
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

function closeMenu() {
  navigation?.classList.remove("is-open");
  menuButton?.setAttribute("aria-expanded", "false");
  if (menuButton) menuButton.textContent = "Menu";
}
menuButton?.addEventListener("click", () => {
  const open = navigation.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.textContent = open ? "Close" : "Menu";
});
navigation?.addEventListener("click", closeMenu);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

if (projectTrack) {
  const cards = [...projectTrack.querySelectorAll(".project-card")];
  const canHover = matchMedia("(hover: hover)");
  let visible = false;
  let touching = false;
  let manualUntil = 0;
  let cycle = 0;
  let position = 0;
  let written = 0;
  let lastTime = 0;

  // One repeated set on either side makes the seam identical in both directions.
  // Copies stay clickable but are excluded from keyboard/screen-reader traversal.
  const copies = () =>
    cards.map((card) => {
      const copy = card.cloneNode(true);
      copy.dataset.loopCopy = "";
      copy.setAttribute("aria-hidden", "true");
      copy
        .querySelectorAll("a, button")
        .forEach((link) => (link.tabIndex = -1));
      return copy;
    });
  const before = copies();
  projectTrack.prepend(...before);
  projectTrack.append(...copies());
  projectTrack.classList.add("is-looping");

  function measure() {
    const previousCycle = cycle;
    cycle = cards[0].offsetLeft - before[0].offsetLeft;
    const progress = previousCycle
      ? (((position % previousCycle) + previousCycle) / previousCycle) % 1
      : 0;
    position = cycle * (1 + progress);
    projectTrack.scrollLeft = position;
    written = projectTrack.scrollLeft;
  }
  new ResizeObserver(measure).observe(projectTrack);
  measure();

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
  }).observe(projectTrack);
  projectTrack.addEventListener("pointerdown", () => {
    touching = true;
  });
  window.addEventListener("pointerup", () => {
    if (touching) manualUntil = performance.now() + 1200;
    touching = false;
  });
  window.addEventListener("pointercancel", () => {
    touching = false;
  });
  projectTrack.addEventListener(
    "wheel",
    () => {
      manualUntil = performance.now() + 2500;
    },
    { passive: true },
  );
  projectTrack.addEventListener("keydown", () => {
    manualUntil = performance.now() + 2500;
  });

  function normalize() {
    if (cycle && !touching) {
      while (position < cycle * 0.5) position += cycle;
      while (position >= cycle * 2) position -= cycle;
    }
  }
  function move(direction) {
    manualUntil = performance.now() + 2500;
    position = projectTrack.scrollLeft + (direction * cycle) / cards.length;
    normalize();
    projectTrack.scrollLeft = position;
    written = projectTrack.scrollLeft;
  }
  document
    .querySelector("[data-project-prev]")
    .addEventListener("click", () => move(-1));
  document
    .querySelector("[data-project-next]")
    .addEventListener("click", () => move(1));

  function animate(time) {
    const elapsed = Math.min(time - (lastTime || time), 50);
    lastTime = time;
    // Adopt native wheel/touch/keyboard scrolling without losing fractional motion.
    if (Math.abs(projectTrack.scrollLeft - written) > 1)
      position = projectTrack.scrollLeft;
    if (
      visible &&
      !document.hidden &&
      !touching &&
      time > manualUntil &&
      !(canHover.matches && projectTrack.querySelector(".project-card:hover"))
    ) {
      position += elapsed * 0.0242; // 24.2 pixels per second.
    }
    normalize();
    if (!touching) {
      projectTrack.scrollLeft = position;
      written = projectTrack.scrollLeft;
    }
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

// Inline SVGs keep the footer independent of external fonts or icon services.
const icons = {
  Email:
    '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  LinkedIn:
    '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 10v7m0-10v.1M11 17v-7m0 3c0-4 6-4 6 0v4"/>',
  GitHub:
    '<path d="M9 19c-4 1-4-2-6-2m12 5v-4c0-1-.3-1.7-1-2 3-.4 6-1.5 6-6a4.7 4.7 0 0 0-1-3.2A4.4 4.4 0 0 0 19 3s-1 0-3 1.5a13 13 0 0 0-8 0C6 3 5 3 5 3a4.4 4.4 0 0 0 0 3.8A4.7 4.7 0 0 0 4 10c0 4.5 3 5.6 6 6-.7.3-1 1-1 2v4"/>',
};
document.querySelectorAll(".footer-links a").forEach((link) => {
  const name = link.textContent.trim();
  if (!icons[name]) return;
  link.setAttribute("aria-label", name);
  link.title = name;
  link.innerHTML =
    '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    icons[name] +
    "</svg>";
});
