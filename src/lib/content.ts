// All site copy, contact details, links and images live here, so they can be edited without
// touching the components. Every placeholder is marked with TODO: `grep -rn TODO src/lib` lists
// what is still missing before launch.
//
// Images: replace a file in src/assets/images/ (same name) or import a new one below. Astro
// optimises them at build time (resizing, AVIF/WebP), so originals can be large camera files.
// The alt texts describe the intended photo; adjust them when the real photo is in place.

import type { ImageMetadata } from "astro"
import heroImage from "@/assets/images/hero.jpg"
import portraitImage from "@/assets/images/svenja.jpg"
import impression01 from "@/assets/images/impression-01.jpg"
import impression02 from "@/assets/images/impression-02.jpg"
import impression03 from "@/assets/images/impression-03.jpg"
import impression04 from "@/assets/images/impression-04.jpg"
import impression05 from "@/assets/images/impression-05.jpg"
import impression06 from "@/assets/images/impression-06.jpg"

export const site = {
  name: "could be yours",
  // TODO: add the town once it is final, e.g. "could be yours – Atelier in Zürich".
  title: "could be yours – Atelier",
  // Shown by search engines, up to ~150 characters; same wording as the hero.
  description:
    "could be yours – Atelier für handgefertigte Unikate, Schnitt & Design, Accessoires, individuelle Änderungen und Reparaturen.",
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

// The one main action of the site, used in the header, the hero and the mobile menu.
export const cta = { label: "Termin vereinbaren", href: `/#${anchors.contact}` }

// Shown wherever the atelier's hours come up: on the hero's round stamp, in the mobile menu, in
// the contact section and in the footer.
export const appointments = "Termine nach Vereinbarung"

export const hero = {
  // The atelier name (site.name) is the main heading and types itself in on load; the tagline sits
  // right below it, as on the flyer, and the lead continues it ("Atelier …für handgefertigte
  // Unikate").
  tagline: "Atelier",
  lead: "…für handgefertigte Unikate, Schnitt & Design, Accessoires, individuelle Änderungen und Reparaturen",
  cta,
  secondary: { label: "Angebot ansehen", href: `#${anchors.services}` },
  // Hard facts under the buttons; both are stated again further down the page.
  facts: ["Erstgespräch kostenlos", "Änderungen ab CHF 20"],
  image: {
    src: heroImage,
    // TODO: replace the placeholder photo and describe it here.
    alt: "Hände legen ein Schnittmuster auf hellen Leinenstoff, daneben Schneiderkreide und Massband.",
  },
}

// The statement between hero and about: one sentence in large type.
export const statement = {
  text: "Mich begeistern Kleider, die bleiben – Stücke, die gut sitzen, lange halten und eine Geschichte erzählen.",
  // Signs the sentence, next to a small heart.
  author: "Svenja",
}

export const about = {
  eyebrow: "Über mich",
  title: "Hallo, ich bin Svenja.",
  // The part of the title set in italics; must match the title's wording exactly.
  emphasis: "Svenja.",
  // TODO: replace with Svenja's own story; the facts below are invented placeholders.
  paragraphs: [
    "Schon als Kind sass ich am liebsten neben der Nähmaschine meiner Grossmutter. Aus der Neugier von damals ist ein Beruf geworden: Ich habe Bekleidungsgestalterin gelernt und in verschiedenen Ateliers Erfahrung gesammelt, bevor ich mit could be yours meinen eigenen Raum eröffnet habe.",
    "Ich nehme mir Zeit: fürs Zuhören, fürs genaue Messen und für die kleinen Details, die man erst auf den zweiten Blick sieht.",
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

export const services: {
  eyebrow: string
  title: string
  emphasis: string
  intro: string
  items: Service[]
} = {
  eyebrow: "Angebot",
  title: "Was ich für dich tun kann",
  emphasis: "dich",
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

// Sprüche: quotes Svenja likes, shown one at a time between Angebot and Impressionen; they change
// on their own. Any number works. `style: "caps"` sets a quote in spaced capitals instead of the
// serif face; `lang` is only needed when a quote is not in German (for screen readers).
export type Quote = { text: string; author: string; style?: "serif" | "caps"; lang?: string }

export const quotes = {
  eyebrow: "Sprüche",
  title: "Worte, die mich begleiten",
  emphasis: "begleiten",
  items: [
    {
      text: "Das Geheimnis der Eleganz liegt in der Schlichtheit der Dinge.",
      author: "Christian Dior",
    },
    {
      text: "Ein gut geschnittenes Kleid steht jeder Frau.",
      author: "Coco Chanel",
      style: "caps",
    },
    {
      text: "Every day is a fashion show, and the world is the runway.",
      author: "Coco Chanel",
      lang: "en",
    },
    {
      text: "Minimalismus ist der Schlüssel zu wahrer Eleganz.",
      author: "Coco Chanel",
      style: "caps",
    },
    {
      text: "If you want to be original, be ready to be copied.",
      author: "Coco Chanel",
      lang: "en",
    },
  ] satisfies Quote[],
}

export const instagram = {
  handle: "_.couldbeyours._",
  url: "https://www.instagram.com/_.couldbeyours._/",
  // How many of the newest posts the gallery shows once the account is connected (see README).
  feedLimit: 9,
}

/** A photo of the gallery wall: one of the images below, or a post from Instagram. */
export type Photo = {
  /** An imported local image, or the address of a remote one (Instagram). */
  src: ImageMetadata | string
  alt: string
  caption: string
  /** Set for posts that cannot open in the lightbox (videos): the tile links there instead. */
  link?: string
}

export const gallery = {
  eyebrow: "Impressionen",
  title: "Aus dem Atelier",
  emphasis: "Atelier",
  // TODO: final wording.
  intro:
    "Einblicke in meine Arbeit: Stoffe, Details und fertige Stücke. Mehr aus dem Atelier-Alltag zeige ich auf Instagram.",
  instagramLabel: "Mehr auf Instagram",
  // Next to the buttons under the photos: "drag" for mouse users, "swipe" on touchscreens.
  hint: { drag: "Ziehen zum Blättern", swipe: "Wischen zum Blättern" },
  // Shown until the Instagram account is connected, and whenever Instagram cannot be reached.
  // TODO: replace the placeholder photos, describe each one (alt) and give it a short caption.
  // Any number of images works; the photo wall repeats its pattern of sizes after three.
  images: [
    {
      src: impression01,
      alt: "Nahaufnahme einer Naht an einem Leinenhemd, mit Stecknadeln fixiert.",
      caption: "Leinenhemd, Naht im Detail",
    },
    {
      src: impression02,
      alt: "Stoffmuster in Salbeigrün, Sand und Naturweiss nebeneinander auf dem Arbeitstisch.",
      caption: "Stoffe in Salbei, Sand und Naturweiss",
    },
    {
      src: impression03,
      alt: "Ein fertiges Kleid an der Schneiderpuppe im Tageslicht.",
      caption: "Kleid auf Mass",
    },
    {
      src: impression04,
      alt: "Die Nähmaschine im Atelier, daneben Garnrollen in warmen Farben.",
      caption: "Die Nähmaschine",
    },
    {
      src: impression05,
      alt: "Hände kürzen den Saum einer Jeans.",
      caption: "Jeans kürzen",
    },
    {
      src: impression06,
      alt: "Blick ins Atelier mit Zuschneidetisch und Kleiderstange.",
      caption: "Das Atelier",
    },
  ] satisfies Photo[],
}

export const email = "atelier@couldbeyours.ch"
const whatsappNumber = "41792191408" // international format, digits only (wa.me link)
// "41792191408" → "+41 79 219 14 08" (Swiss number format)
const whatsappDisplay = whatsappNumber.replace(
  /^(\d{2})(\d{2})(\d{3})(\d{2})(\d{2})$/,
  "+$1 $2 $3 $4 $5",
)
// TODO: real address; this one is a placeholder.
export const address = { street: "Musterstrasse 1", city: "8000 Musterort" }

export const contact = {
  eyebrow: "Kontakt",
  title: "Schreib mir",
  emphasis: "mir",
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
  // TODO: add fixed opening hours here, if there ever are any, e.g. "Di–Fr, 9–12 Uhr".
  appointments: {
    eyebrow: "Termine",
    title: appointments,
    text: "Schreib mir, und wir finden einen Termin, der dir passt.",
    cta: {
      label: "Termin anfragen",
      href: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hallo Svenja, ich möchte gerne einen Termin vereinbaren.")}`,
    },
  },
}

export const footer = {
  // TODO: add the town once it is final, as in site.title.
  tagline: `Atelier · ${appointments}`,
  links: [
    { label: "Impressum", href: "/impressum/" },
    { label: "Datenschutz", href: "/datenschutz/" },
  ],
}
