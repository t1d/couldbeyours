// All site copy, contact details, links and images live here, so they can be edited without
// touching the components. Every placeholder is marked with TODO: `grep -rn TODO src/lib` lists
// what is still missing before launch.
//
// Images: replace a file in src/assets/images/ (same name) or import a new one below. Astro
// optimises them at build time (resizing, AVIF/WebP), so originals can be large camera files.
// The alt texts describe the intended photo; adjust them when the real photo is in place.

import heroImage from "@/assets/images/hero.jpg"
import portraitImage from "@/assets/images/svenja.jpg"

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

export const hero = {
  // TODO: add the town, e.g. "Schneideratelier in Zürich".
  eyebrow: "Schneideratelier",
  // The atelier name (site.name) is the main heading; this sentence sits below it.
  // TODO: final wording.
  lead: "Ein kleines Atelier für Änderungen, Reparaturen und Massanfertigungen – mit Zeit, Sorgfalt und Freude am Handwerk.",
  cta: { label: "Kontakt aufnehmen", href: `#${anchors.contact}` },
  image: {
    src: heroImage,
    // TODO: replace the placeholder photo and describe it here.
    alt: "Hände legen ein Schnittmuster auf hellen Leinenstoff, daneben Schneiderkreide und Massband.",
  },
}

export const about = {
  eyebrow: "Über mich",
  title: "Hallo, ich bin Svenja.",
  // TODO: replace with Svenja's own story; the facts below are invented placeholders.
  paragraphs: [
    "Schon als Kind sass ich am liebsten neben der Nähmaschine meiner Grossmutter. Aus der Neugier von damals ist ein Beruf geworden: Ich habe Bekleidungsgestalterin gelernt und in verschiedenen Ateliers Erfahrung gesammelt, bevor ich mit couldbeyours meinen eigenen Raum eröffnet habe.",
    "Mich begeistern Kleider, die bleiben – Stücke, die gut sitzen, lange halten und eine Geschichte erzählen. Darum nehme ich mir Zeit: fürs Zuhören, fürs genaue Messen und für die kleinen Details, die man erst auf den zweiten Blick sieht.",
    "Ob ein neuer Saum für die Lieblingshose oder ein Kleid von Grund auf: Ich freue mich auf dich und deine Ideen.",
  ],
  image: {
    src: portraitImage,
    // TODO: replace the placeholder photo and describe it here.
    alt: "Svenja in ihrem Atelier, im Hintergrund Stoffballen und eine Schneiderpuppe.",
  },
}
