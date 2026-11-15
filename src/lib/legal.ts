// The texts of the legal pages (Impressum, Datenschutz). They live apart from the rest of the copy
// because they are long and change for different reasons.

import { address, email, site } from "@/lib/content"

// A block in `body` is either a paragraph (string) or a group of lines that belong together, such
// as an address (string[]).
export type LegalPage = {
  title: string
  description: string
  updated: string
  sections: { heading: string; body: (string | string[])[] }[]
}

// TODO: Svenja's surname, legal form and, if registered, the UID number.
const owner = "Svenja Muster"
const postalAddress = [site.name, owner, address.street, address.city, "Schweiz"]

// TODO: have both legal texts reviewed before launch. They are careful placeholders for a small
// Swiss business without cookies or tracking, not legal advice.
export const impressum: LegalPage = {
  title: "Impressum",
  description: "Impressum des Ateliers could be yours.",
  updated: "Oktober 2026", // TODO: date of the final version
  sections: [
    {
      heading: "Kontaktadresse",
      body: [postalAddress, `E-Mail: ${email}`],
    },
    {
      heading: "Inhaberin",
      body: [`${owner}, Einzelunternehmen`],
    },
    {
      heading: "Handelsregister",
      // TODO: or "Eingetragen im Handelsregister des Kantons …, UID CHE-…".
      body: ["Nicht im Handelsregister eingetragen."],
    },
    {
      heading: "Haftungsausschluss",
      body: [
        "Ich stelle die Inhalte dieser Website mit Sorgfalt zusammen, übernehme aber keine Gewähr für ihre Richtigkeit, Vollständigkeit und Aktualität. Preise sind Richtwerte; verbindlich ist, was wir gemeinsam vereinbaren.",
        "Diese Website verweist auf Angebote Dritter (zum Beispiel Instagram oder Google Maps). Für deren Inhalte sind ausschliesslich die jeweiligen Betreiber verantwortlich.",
      ],
    },
    {
      heading: "Urheberrecht",
      // TODO: credit the photographer, if the photos are not Svenja's own.
      body: [
        "Texte und Fotos auf dieser Website gehören could be yours. Wer sie verwenden möchte, fragt bitte vorher nach.",
      ],
    },
  ],
}

export const privacy: LegalPage = {
  title: "Datenschutzerklärung",
  description: "Wie could be yours mit Personendaten umgeht.",
  updated: "Oktober 2026", // TODO: date of the final version
  sections: [
    {
      heading: "Verantwortlich",
      body: [
        "Diese Datenschutzerklärung erklärt, welche Personendaten ich bearbeite, wenn du diese Website besuchst oder mit mir Kontakt aufnimmst. Sie richtet sich nach dem Schweizer Datenschutzgesetz (DSG).",
        postalAddress,
        `E-Mail: ${email}`,
      ],
    },
    {
      heading: "Keine Cookies, kein Tracking",
      body: [
        "Diese Website setzt keine Cookies und verwendet keine Analyse- oder Werbewerkzeuge. Schriften und Bilder werden direkt von dieser Website geladen; Inhalte von Drittanbietern wie Google Fonts oder eingebettete Karten gibt es nicht. Auch die Fotos aus dem Instagram-Profil werden beim Aktualisieren der Website kopiert und von hier ausgeliefert; dein Browser verbindet sich dafür nicht mit Instagram.",
      ],
    },
    {
      heading: "Hosting und Server-Logdaten",
      // TODO: confirm the transfer safeguard Cloudflare offers at launch (e.g. Swiss-U.S. Data
      // Privacy Framework certification or standard contractual clauses) and name it here.
      body: [
        "Die Website wird über Cloudflare, Inc. (USA) ausgeliefert. Damit die Seite sicher und zuverlässig funktioniert, werden bei jedem Aufruf technisch notwendige Daten bearbeitet, zum Beispiel IP-Adresse, Datum und Uhrzeit, die aufgerufene Seite sowie Angaben zu Browser und Betriebssystem.",
        "Diese Daten können auch ausserhalb der Schweiz bearbeitet werden, insbesondere in den USA. Cloudflare sichert dabei vertraglich ein angemessenes Datenschutzniveau zu.",
      ],
    },
    {
      heading: "Kontakt per E-Mail, WhatsApp oder Instagram",
      body: [
        "Wenn du mir schreibst, bearbeite ich deine Angaben (zum Beispiel Name, Kontaktdaten, Nachricht und Fotos), um deine Anfrage zu beantworten und den Auftrag auszuführen.",
        "WhatsApp und Instagram gehören zu Meta Platforms. Wenn du diese Dienste nutzt, gelten zusätzlich deren Datenschutzbestimmungen, und Daten können in die USA übermittelt werden. Wenn du das nicht möchtest, schreib mir am besten per E-Mail.",
      ],
    },
    {
      heading: "Links zu anderen Websites",
      body: [
        "Die Links zu Instagram, WhatsApp und Google Maps sind einfache Verweise. Erst wenn du darauf klickst, wird eine Verbindung zum jeweiligen Anbieter aufgebaut; ab dann gilt dessen Datenschutzerklärung.",
      ],
    },
    {
      heading: "Aufbewahrung",
      body: [
        "Ich bewahre Personendaten nur so lange auf, wie es für die Bearbeitung deiner Anfrage oder deines Auftrags nötig ist oder das Gesetz es verlangt, etwa für Buchhaltungsunterlagen.",
      ],
    },
    {
      heading: "Deine Rechte",
      body: [
        `Du kannst jederzeit Auskunft über deine bei mir gespeicherten Daten verlangen und sie berichtigen oder löschen lassen. Schreib mir dafür an ${email}.`,
        "Wenn du findest, dass ich deine Daten nicht korrekt bearbeite, kannst du dich an den Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB) wenden.",
      ],
    },
  ],
}
