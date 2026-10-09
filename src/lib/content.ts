// All site copy, contact details, links and images live here, so they can be edited without
// touching the components. Every placeholder is marked with TODO: `grep -rn TODO src/lib` lists
// what is still missing before launch.
//
// Images: replace a file in src/assets/images/ (same name) or import a new one below. Astro
// optimises them at build time (resizing, AVIF/WebP), so originals can be large camera files.

export const site = {
  name: "couldbeyours",
  // TODO: add the town once it is final, e.g. "couldbeyours – Schneideratelier in Zürich".
  title: "couldbeyours – Schneideratelier",
  // TODO: final meta description (shown by search engines, ~150 characters).
  description:
    "Schneideratelier couldbeyours: Änderungen, Reparaturen und Massanfertigungen mit viel Sorgfalt und Zeit fürs Detail.",
  // Served from public/; shown when the page is shared (WhatsApp, Instagram, …). 1200 × 630 px.
  // TODO: replace public/og-image.jpg with a real photo.
  ogImage: "/og-image.jpg",
}

// Anchor ids of the sections on the home page (they appear in the URL, e.g. /#kontakt).
export const anchors = {
  about: "ueber-mich",
  services: "angebot",
  gallery: "impressionen",
  contact: "kontakt",
} as const

// Header navigation. The links start with "/" so they also work from Impressum and Datenschutz.
export const nav = [
  { label: "Über mich", href: `/#${anchors.about}` },
  { label: "Angebot", href: `/#${anchors.services}` },
  { label: "Impressionen", href: `/#${anchors.gallery}` },
  { label: "Kontakt", href: `/#${anchors.contact}` },
]
