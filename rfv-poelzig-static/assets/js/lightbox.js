// Sitewide image lightbox: clicking any content photo opens it large and
// centered over a dimmed backdrop, with a close (x) button in the top
// right; closes via that button, a click outside the photo, or Escape.
// The site logo and any image that's already a link (e.g. the header
// logo linking home) are left alone so this never hijacks navigation.
(function () {
  "use strict";

  var overlay, imgEl, closeBtn, lastTrigger;

  function build() {
    overlay = document.createElement("div");
    overlay.className =
      "fixed inset-0 z-[100] hidden items-center justify-center bg-navy-900/90 p-6 backdrop-blur-sm";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Bild vergrößert");

    imgEl = document.createElement("img");
    imgEl.className = "max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl";
    overlay.appendChild(imgEl);

    closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.setAttribute("aria-label", "Schließen");
    closeBtn.className =
      "fixed right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-navy-900/70 text-white transition hover:bg-navy-900";
    closeBtn.innerHTML =
      '<svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" /></svg>';
    overlay.appendChild(closeBtn);

    overlay.addEventListener("click", function (event) {
      if (event.target === overlay) close();
    });
    closeBtn.addEventListener("click", close);

    document.body.appendChild(overlay);
  }

  function open(src, alt, trigger) {
    if (!overlay) build();
    imgEl.src = src;
    imgEl.alt = alt || "";
    overlay.classList.remove("hidden");
    overlay.classList.add("flex");
    document.body.style.overflow = "hidden";
    lastTrigger = trigger;
    closeBtn.focus();
    document.addEventListener("keydown", onKeydown);
  }

  function close() {
    if (!overlay || overlay.classList.contains("hidden")) return;
    overlay.classList.add("hidden");
    overlay.classList.remove("flex");
    imgEl.src = "";
    document.body.style.overflow = "";
    document.removeEventListener("keydown", onKeydown);
    if (lastTrigger) lastTrigger.focus();
  }

  function onKeydown(event) {
    if (event.key === "Escape") close();
  }

  function eligible(img) {
    return !img.closest("a") && img.src.indexOf("logo.png") === -1;
  }

  function init() {
    document.querySelectorAll("img").forEach(function (img) {
      if (!eligible(img)) return;
      img.classList.add("cursor-zoom-in");
      img.addEventListener("click", function () {
        open(img.currentSrc || img.src, img.alt, img);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
