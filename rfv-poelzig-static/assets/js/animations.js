(function () {
  "use strict";

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasMotion = typeof window.Motion !== "undefined";

  if (reduceMotion || !hasMotion) {
    // No-op: nothing in this file is ever hidden via style.opacity outside of
    // the helpers below, and those helpers are simply never called on this
    // path, so every page stays fully visible with plain HTML/CSS.
    window.RFVAnim = { revealSponsorGrid: function () {} };
    return;
  }

  var animate = window.Motion.animate;
  var inView = window.Motion.inView;
  var stagger = window.Motion.stagger;

  // Safety net: rAF/WAAPI-driven animations (what Motion uses under the
  // hood) can stall indefinitely in a backgrounded/hidden tab (browsers
  // pause requestAnimationFrame there, unlike setTimeout). Since these
  // helpers hide content before animating it in, a stalled animation would
  // violate the hard rule that nothing stays permanently invisible. This
  // force-reveals after a short delay no matter what happened to the
  // animation itself; it's a no-op once the real animation has finished.
  function forceVisible(el, transform) {
    setTimeout(function () {
      el.style.opacity = "1";
      el.style.transform = transform || "none";
    }, 1200);
  }

  // Gentle settings: trigger right at the viewport edge (no negative margin,
  // so nothing pops in "late" mid-scroll), small 12px rise, soft ease-out.
  var EASE = [0.25, 0.1, 0.25, 1];

  function reveal(el, opts) {
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(12px)";
    forceVisible(el);
    var stop = inView(el, function () {
      animate(el, { opacity: [0, 1], y: [12, 0] },
        Object.assign({ duration: 0.5, easing: EASE }, opts));
      stop();
    });
  }

  function revealStagger(container, opts, childSelector) {
    if (!container) return;
    var children = childSelector
      ? Array.prototype.slice.call(container.querySelectorAll(childSelector))
      : Array.prototype.slice.call(container.children);
    if (!children.length) return;
    children.forEach(function (c) {
      c.style.opacity = "0";
      c.style.transform = "translateY(12px)";
      forceVisible(c);
    });
    var stop = inView(container, function () {
      animate(children, { opacity: [0, 1], y: [12, 0] },
        Object.assign({ duration: 0.45, delay: stagger(0.06), easing: EASE }, opts));
      stop();
    });
  }

  function init() {
    var hero = document.querySelector('[data-animate="hero"]');
    if (hero) {
      hero.style.opacity = "0";
      hero.style.transform = "translateY(12px)";
      forceVisible(hero);
      animate(hero, { opacity: [0, 1], y: [12, 0] }, { duration: 0.6, delay: 0.1, easing: EASE });
    }

    document.querySelectorAll('[data-animate="reveal"]').forEach(function (el) { reveal(el); });
    document.querySelectorAll('[data-animate="stagger"]').forEach(function (el) { revealStagger(el); });

    // Hero photo collage (index.html): tiles get redistributed into balanced
    // columns by hero-collage.js, so reveal every <img> descendant rather
    // than the container's direct children.
    revealStagger(document.getElementById("hero-collage"), { duration: 0.45 }, "img");

    // Timeline entries (geschichte.html): each reveals as it individually
    // scrolls into view, plus a small "pop" on its marker dot.
    document.querySelectorAll('[data-animate="timeline-item"]').forEach(function (item) {
      var dot = item.querySelector('[data-animate="timeline-dot"]');
      reveal(item);
      if (dot) {
        dot.style.transform = "scale(0)";
        forceVisible(dot, "scale(1)");
        var stop = inView(item, function () {
          animate(dot, { scale: [0, 1] }, { duration: 0.35, easing: EASE });
          stop();
        });
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // sponsoren.html injects its cards after DOMContentLoaded (renderSponsors()
  // runs later), so #sponsor-grid doesn't exist yet when init() runs above.
  // That page calls this manually right after renderSponsors().
  window.RFVAnim = {
    revealSponsorGrid: function () {
      reveal(document.getElementById("sponsor-grid"), { duration: 0.5 });
    }
  };
})();
