// Mobile nav toggle
function toggleMenu() {
  var menu = document.getElementById("mobile-menu");
  var button = document.querySelector('[aria-controls="mobile-menu"]');
  if (menu) menu.classList.toggle("hidden");
  if (button) {
    var expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
  }
}

// Impressionen slider (index.html) — horizontal scroll-snap carousel driven
// by two arrow buttons; native touch/trackpad scroll and keyboard scrolling
// keep working on their own since it's a real scroll container, not a
// JS-only carousel.
function scrollImpressionen(direction) {
  var el = document.getElementById("impressionen-slider");
  if (!el) return;
  // Slides have natural (varying) widths, so page by ~80% of the visible
  // strip instead of by a fixed slide width.
  var amount = Math.max(el.clientWidth * 0.8, 240);
  el.scrollBy({ left: direction * amount, behavior: "smooth" });
}

// Contact form -> opens the visitor's email client with the message pre-filled
// (no backend on a static host, so email is the delivery mechanism).
function handleContactSubmit(event) {
  event.preventDefault();
  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim();
  var message = document.getElementById("message").value.trim();

  var subject = "Nachricht von der Vereinswebsite: " + name;
  var body =
    "Name: " + name + "\n" +
    "E-Mail: " + email + "\n\n" +
    message;

  var mailto =
    "mailto:k.gerth@gmx.de" +
    "?subject=" + encodeURIComponent(subject) +
    "&body=" + encodeURIComponent(body);

  window.location.href = mailto;

  var note = document.getElementById("form-note");
  if (note) note.classList.remove("hidden");
  return false;
}
