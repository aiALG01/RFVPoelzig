// Lays out the photo strip below the hero heading (index.html) as a
// "justified gallery" row: every tile in a row is stretched to exactly the
// same height, with its width scaled by its own aspect ratio, so the row
// always ends flush on both sides and no photo is ever cropped or
// distorted. Falls back to the plain CSS column layout already in the
// markup if this never runs.
(function () {
  "use strict";

  function layout() {
    var container = document.getElementById("hero-collage");
    if (!container) return;

    var tiles = Array.prototype.slice.call(container.querySelectorAll("img"));
    if (!tiles.length) return;

    var width = container.clientWidth;
    if (!width) return;

    var gap = width < 640 ? 12 : 16;
    var items = tiles.map(function (img) {
      var w = parseFloat(img.getAttribute("width")) || 1;
      var h = parseFloat(img.getAttribute("height")) || 1;
      return { img: img, ar: w / h };
    });

    // Narrow screens can't fit all tiles at a legible height in one row, so
    // split into two; anything sm/tablet and up reads fine as a single row.
    var rows = width < 640
      ? [items.slice(0, 3), items.slice(3)]
      : [items];

    container.className = "mt-6 flex flex-col gap-3 sm:mt-8 sm:gap-4";
    container.textContent = "";

    rows.forEach(function (row) {
      if (!row.length) return;
      var sumAr = row.reduce(function (sum, it) { return sum + it.ar; }, 0);
      var rowHeight = (width - gap * (row.length - 1)) / sumAr;

      var rowEl = document.createElement("div");
      rowEl.className = "flex gap-3 sm:gap-4";
      row.forEach(function (it) {
        it.img.className = "rounded-xl shadow-lg ring-1 ring-white/10 transition duration-300 hover:-translate-y-1";
        it.img.style.width = (rowHeight * it.ar) + "px";
        it.img.style.height = rowHeight + "px";
        rowEl.appendChild(it.img);
      });
      container.appendChild(rowEl);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", layout);
  } else {
    layout();
  }

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(layout, 150);
  });
})();
