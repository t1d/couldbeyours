// The lightbox of the gallery: a photo opens large in a dialog, with arrows, arrow keys and swipe.
// Without this script the tiles are plain links to the large photos.

import { prefersReducedMotion } from "@/scripts/reduced-motion"

export function enhanceLightbox(wall: HTMLElement, dialog: HTMLDialogElement) {
  const links = [...wall.querySelectorAll<HTMLAnchorElement>("[data-index]")]
  const slides = [...dialog.querySelectorAll<HTMLElement>("[data-slide]")]
  const stage = dialog.querySelector<HTMLElement>("[data-stage]")!
  const counter = dialog.querySelector<HTMLElement>("[data-counter]")!
  const counterLabel = dialog.querySelector<HTMLElement>("[data-counter-label]")!
  let current = 0

  const show = (index: number, direction?: "prev" | "next") => {
    current = (index + slides.length) % slides.length
    slides.forEach((slide, i) => (slide.hidden = i !== current))
    counter.textContent = `${current + 1} / ${slides.length}`
    counterLabel.textContent = `Bild ${current + 1} von ${slides.length}`
    if (direction) dialog.dataset.direction = direction
    else delete dialog.dataset.direction
  }
  const step = (direction: 1 | -1) => show(current + direction, direction > 0 ? "next" : "prev")

  links.forEach((link, index) =>
    link.addEventListener("click", (event) => {
      // Cmd/Ctrl-click still opens the photo in a new tab.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      event.preventDefault()
      show(index)
      dialog.showModal()
    }),
  )

  dialog.querySelector("[data-prev]")!.addEventListener("click", () => step(-1))
  dialog.querySelector("[data-next]")!.addEventListener("click", () => step(1))
  dialog.querySelector("[data-close]")!.addEventListener("click", () => dialog.close())
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") step(-1)
    else if (event.key === "ArrowRight") step(1)
  })

  // A sideways swipe on a touchscreen changes the photo; a tap or click next to it closes.
  let swipeStart: number | null = null
  let swiped = false
  stage.addEventListener("pointerdown", (event) => {
    swiped = false
    if (event.pointerType !== "mouse") swipeStart = event.clientX
  })
  stage.addEventListener("pointerup", (event) => {
    if (swipeStart === null) return
    const distance = event.clientX - swipeStart
    swipeStart = null
    if (Math.abs(distance) < 50) return
    swiped = true
    step(distance < 0 ? 1 : -1)
  })
  stage.addEventListener("pointercancel", () => (swipeStart = null))
  stage.addEventListener("click", (event) => {
    if (swiped) return
    const target = event.target
    if (target === stage || (target instanceof Element && target.matches("[data-slide]"))) {
      dialog.close()
    }
  })

  // Back on the wall, focus and show the photo that was open last.
  dialog.addEventListener("close", () => {
    const link = links[current]
    link.focus({ preventScroll: true })
    link.scrollIntoView({
      block: "nearest",
      inline: "nearest",
      behavior: prefersReducedMotion.matches ? "auto" : "smooth",
    })
  })
}
