/**
 * Build-only config for compiling assets/css/tailwind.css (replaces the old
 * cdn.tailwindcss.com Play CDN, so the site loads no third-party scripts).
 * Rebuild after changing markup/classes:
 *   ./tailwindcss -c tailwind.config.js -i tailwind-input.css -o assets/css/tailwind.css --minify
 * (tailwindcss = the standalone v3 CLI binary; no Node required.)
 */
module.exports = {
  content: ["./*.html", "./assets/js/*.js"],
  theme: {
    extend: {
      colors: {
        "navy-900": "#173753",
        "navy-800": "#1B4353",
        "navy-700": "#1D70A2",
        "navy-600": "#2892D7",
        sky: "#6DAEDB",
        gold: "#E8B530",
        "gold-hover": "#D4A020",
        "gold-light": "#F5C84A",
        charcoal: "#16232F",
        "text-dark": "#22323F",
        "text-muted": "#5C7182",
        "card-bg": "#1B4353",
        "card-border": "#2892D7",
        "light-gray": "#F4F7F9",
        "border-light": "#E2E9EE",
      },
      fontFamily: {
        serif: ["Fraunces", "Georgia", "serif"],
        script: ['"Instrument Serif"', "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
};
