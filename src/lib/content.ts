// All site copy, contact details, links and images live here, so they can be edited without
// touching the components. Every placeholder is marked with TODO: `grep -rn TODO src/lib` lists
// what is still missing before launch.
//
// Images: replace a file in src/assets/images/ (same name) or import a new one below. Astro
// optimises them at build time (resizing, AVIF/WebP), so originals can be large camera files.
// The alt texts describe the intended photo; adjust them when the real photo is in place.

import heroImage from "@/assets/images/hero.jpg"
import portraitImage from "@/assets/images/svenja.jpg"
import impression01 from "@/assets/images/impression-01.jpg"
import impression02 from "@/assets/images/impression-02.jpg"
import impression03 from "@/assets/images/impression-03.jpg"
import impression04 from "@/assets/images/impression-04.jpg"
import impression05 from "@/assets/images/impression-05.jpg"
import impression06 from "@/assets/images/impression-06.jpg"

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

export type Service = {
  title: string
  text: string
  /** Optional; leave out to show no price. */
  price?: string
}

export const services: { eyebrow: string; title: string; intro: string; items: Service[] } = {
  eyebrow: "Angebot",
  title: "Was ich für dich tun kann",
  // TODO: final wording.
  intro:
    "Jedes Stück ist anders. Die Preise sind Richtwerte – was es genau kostet, besprechen wir gemeinsam, bevor ich mit der Arbeit beginne.",
  // TODO: final services, texts and prices.
  items: [
    {
      title: "Änderungen",
      text: "Hosen kürzen, die Taille anpassen, Ärmel einnähen: Ich ändere deine Lieblingsstücke so, dass sie wieder sitzen, als wären sie für dich gemacht.",
      price: "ab CHF 20",
    },
    {
      title: "Massanfertigung",
      text: "Vom ersten Gespräch über die Wahl des Stoffes bis zur letzten Anprobe entsteht ein Kleidungsstück, das es nur einmal gibt – deines.",
      price: "nach Offerte",
    },
    {
      title: "Reparaturen",
      text: "Ein ausgerissener Saum, ein klemmender Reissverschluss, ein Loch im Lieblingspullover: Vieles lässt sich retten. Flicken ist für mich keine Notlösung, sondern Wertschätzung.",
      price: "ab CHF 15",
    },
    {
      title: "Beratung",
      text: "Du hast einen Stoff, eine Idee oder ein Kleidungsstück, das nicht ganz stimmt? Wir schauen es gemeinsam an und finden heraus, was möglich ist.",
      price: "Erstgespräch kostenlos",
    },
  ],
}

// TODO: check the handle and link.
export const instagram = {
  handle: "couldbeyours",
  url: "https://www.instagram.com/couldbeyours/",
}

export const gallery = {
  eyebrow: "Impressionen",
  title: "Aus dem Atelier",
  // TODO: final wording.
  intro:
    "Einblicke in meine Arbeit: Stoffe, Details und fertige Stücke. Mehr aus dem Atelier-Alltag zeige ich auf Instagram.",
  instagramLabel: "Mehr auf Instagram",
  // TODO: replace the placeholder photos and describe each one. Any number of images works;
  // multiples of six fill the grid evenly (two columns on phones, three on larger screens).
  images: [
    {
      src: impression01,
      alt: "Nahaufnahme einer Naht an einem Leinenhemd, mit Stecknadeln fixiert.",
    },
    {
      src: impression02,
      alt: "Stoffmuster in Salbeigrün, Sand und Naturweiss nebeneinander auf dem Arbeitstisch.",
    },
    {
      src: impression03,
      alt: "Ein fertiges Kleid an der Schneiderpuppe im Tageslicht.",
    },
    {
      src: impression04,
      alt: "Die Nähmaschine im Atelier, daneben Garnrollen in warmen Farben.",
    },
    {
      src: impression05,
      alt: "Hände kürzen den Saum einer Jeans.",
    },
    {
      src: impression06,
      alt: "Blick ins Atelier mit Zuschneidetisch und Kleiderstange.",
    },
  ],
}

// TODO: real email address, WhatsApp number and address. The values below are placeholders
// (example.com is a reserved test domain, the number does not exist).
const email = "hallo@example.com"
const whatsappNumber = "41790000000" // international format, digits only (wa.me link)
// "41790000000" → "+41 79 000 00 00" (Swiss number format)
const whatsappDisplay = whatsappNumber.replace(
  /^(\d{2})(\d{2})(\d{3})(\d{2})(\d{2})$/,
  "+$1 $2 $3 $4 $5",
)
const address = { street: "Musterstrasse 1", city: "8000 Musterort" }

export const contact = {
  eyebrow: "Kontakt",
  title: "Schreib mir",
  // TODO: final wording.
  intro:
    "Am einfachsten erreichst du mich per WhatsApp oder E-Mail. Erzähl mir kurz, worum es geht – gerne mit einem Foto. Ich melde mich innert ein bis zwei Arbeitstagen.",
  channels: {
    email: {
      label: "E-Mail",
      display: email,
      href: `mailto:${email}?subject=${encodeURIComponent("Anfrage ans Atelier")}`,
    },
    whatsapp: {
      label: "WhatsApp",
      display: whatsappDisplay,
      href: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hallo Svenja, ")}`,
    },
    instagram: {
      label: "Instagram",
      display: `@${instagram.handle}`,
      href: instagram.url,
    },
  },
  address: {
    title: "Atelier",
    name: site.name,
    ...address,
    mapLabel: "Auf der Karte zeigen",
    mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${address.street}, ${address.city}`)}`,
  },
  hours: {
    title: "Öffnungszeiten",
    // TODO: fixed opening hours, if any, e.g. "Di–Fr, 9–12 Uhr".
    lines: ["Termine nach Vereinbarung"],
  },
}
