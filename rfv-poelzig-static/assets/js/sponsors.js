// Sponsor names (alphabetical) with an optional link to the sponsor's own
// site. Logos were removed on purpose: hotlinking them from the sponsors'
// servers transmitted each visitor's IP to those third parties and broke
// whenever a sponsor changed their site. Names + links carry no such risk.
var SPONSORS = [
  { name: "Agrargenossenschaft Pölzig eG" },
  { name: "Appel Rehatechnik GmbH", website: "http://www.appel-rehatechnik.de/" },
  { name: "Auto Franke Nauendorf" },
  { name: "Bau- & Montageservice Thomas Schröder" },
  { name: "Barinesse Delikatesse für das Tier", website: "https://www.barynesse.com/" },
  { name: "Bioaktiv Professional Farming", website: "https://www.bioaktiv.com/en/" },
  { name: "Blumen Funke", website: "https://www.blumen-funke.de/" },
  { name: "Camet GmbH" },
  { name: "CARUBINA GmbH", website: "https://www.carubina.com/en/" },
  { name: "Container-Dienst Seyfarth GmbH", website: "https://www.containerdienst-seyfarth.de/" },
  { name: "dm Gera Dornaer Straße", website: "https://www.dm.de/store/d0a1/gera/dornaer-strasse-6" },
  { name: "Epiroc Deutschland GmbH", website: "https://www.epiroc.com/de-de/epiroc-deutschland-gmbh" },
  { name: "Florenz Industrielle Schweißarbeiten", website: "https://schweissarbeiten-florenz.de/" },
  { name: "Fotostudio Klick-Moment", website: "https://klick-momente.de/" },
  { name: "GbR Fraatz" },
  { name: "Gemeinde Pölzig", website: "https://www.vg-brahmetal.de/seite/486692/p%C3%B6lzig.html" },
  { name: "Heidrun und Rico Böttcher" },
  { name: "Hannelore Diesel – Ihre Filiale" },
  { name: "Holger Schmeißer KFZ-Werkstatt" },
  { name: "Hoofis, Hufbearbeitung und Manuelle Behandlung" },
  { name: "Horse Shop Landenhausen", website: "https://www.reitsport-landenhausen.de/" },
  { name: "Karosserie- und Fahrzeugservice Robert Übrig", website: "http://www.karosseriebau-fahrzeugservice-ubrig.de/" },
  { name: "KFZ-Meisterbetrieb Uwe Hahn", website: "https://www.autoreparatur-hahn.de/" },
  { name: "Köstritzer Schwarzbierbrauerei GmbH", website: "https://www.koestritzer.de/" },
  { name: "Krämer Pferdesport", website: "https://www.kraemer.de/" },
  { name: "Kristallkraft Pferdefutter", website: "https://kristallkraft-pferdefutter.de/" },
  { name: "LA-PRO-HA Cretzschwitz" },
  { name: "Landkreis Greiz", website: "https://www.landkreis-greiz.de/" },
  { name: "Landwirtschaftsbetrieb Gehrt GbR" },
  { name: "Leovet Dr. Jacoby GmbH & Co KG", website: "https://www.leovet.de/" },
  { name: "Pferdesporthaus Loesdau", website: "https://www.loesdau.de/" },
  { name: "LHG-Landhandelsgesellschaft eG", website: "https://www.landhandel-schmoelln.de/" },
  { name: "Pferd & Reiter-Shop Angelika Kretschmann" },
  { name: "PHILPHARMA GmbH", website: "https://philpharma.de/" },
  { name: "Physiotherapie Kerstin Jakubaßa" },
  { name: "Raiffeisen Markt Frohburg", website: "https://www.rw.net/standorte/raiffeisen-markt-frohburg" },
  { name: "Reithindernisse Neuhard", website: "https://www.reithindernisse-neuhard.de/" },
  { name: "RFV Alsenborn", website: "http://reitverein-alsenborn.de/" },
  { name: "Reitteam Laura Gehrt" },
  { name: "Reit- und Pensionsstall Förster" },
  { name: "Ridcon GmbH", website: "https://www.ridcon.de/" },
  { name: "Sparkasse Gera Greiz", website: "https://www.sparkasse-gera-greiz.de/de/home.html" },
  { name: "Sport & Freizeitpferde R. Tondock" },
  { name: "Steffen Wilfert R+V Versicherungen", website: "https://www.ruv.de/vor-ort/ronneburg/wilfert" },
  { name: "Tierarztpraxis Julia Buschner" },
  { name: "Thüringer Transportgesellschaft mbH" },
  { name: "VITANDAR INFRARED HORSEGEAR", website: "https://www.vitandar.de/en/" },
  { name: "Wagner Agrarservice GmbH", website: "https://www.wagner-agrarservice.de/" },
];

function renderSponsors(container) {
  var html = SPONSORS.map(function (s) {
    var card =
      '<div class="flex min-h-[92px] items-center justify-center rounded-xl border border-border-light bg-light-gray px-6 py-5 text-center transition hover:border-gold hover:bg-white hover:shadow-md">' +
      '<p class="font-serif text-base leading-snug text-navy-900">' + s.name + "</p>" +
      "</div>";
    if (s.website) {
      return '<a href="' + s.website + '" target="_blank" rel="noreferrer" class="block">' + card + "</a>";
    }
    return card;
  }).join("");
  container.innerHTML = html;
}
