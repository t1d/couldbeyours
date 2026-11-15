// The photo wall of the gallery: a row of photos that scrolls sideways. Touchscreens and trackpads
// scroll it natively; this adds dragging with the mouse (with a short glide after letting go) and
// the buttons under the wall. Without it the wall is a plain sideways-scrolling row.

import { prefersReducedMotion } from "@/scripts/reduced-motion"

type Drag = {
  startX: number
  startScroll: number
  lastX: number
  lastTime: number
  velocity: number // px per ms
  moved: boolean
}

export function enhanceWall(wall: HTMLElement, controls: HTMLElement) {
  const tiles = [...wall.children] as HTMLElement[]
  const prev = controls.querySelector<HTMLButtonElement>("[data-prev]")!
  const next = controls.querySelector<HTMLButtonElement>("[data-next]")!
  const maxScroll = () => wall.scrollWidth - wall.clientWidth

  wall.classList.add("is-enhanced")

  // The buttons only show when the photos do not all fit; at either end one of them is disabled.
  let frame = 0
  const update = () => {
    const max = maxScroll()
    controls.hidden = max <= 0
    prev.disabled = wall.scrollLeft <= 1
    next.disabled = wall.scrollLeft >= max - 1
  }
  const scheduleUpdate = () => {
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(update)
  }
  wall.addEventListener("scroll", scheduleUpdate, { passive: true })
  window.addEventListener("resize", scheduleUpdate)
  update()

  // The buttons move to the start of the previous or next photo.
  const scrollToTile = (direction: 1 | -1) => {
    const inset = parseFloat(getComputedStyle(wall).paddingLeft)
    const position = wall.scrollLeft
    const starts = tiles.map((tile) => tile.offsetLeft - inset)
    const target =
      direction > 0
        ? starts.find((start) => start > position + 1)
        : starts.findLast((start) => start < position - 1)
    wall.scrollTo({
      left: target ?? (direction > 0 ? maxScroll() : 0),
      behavior: prefersReducedMotion.matches ? "auto" : "smooth",
    })
  }
  prev.addEventListener("click", () => scrollToTile(-1))
  next.addEventListener("click", () => scrollToTile(1))

  // Dragging with the mouse.
  let drag: Drag | null = null
  let glide = 0
  let suppressClick = false

  const startGlide = (initialVelocity: number) => {
    let velocity = initialVelocity
    let position = wall.scrollLeft
    let last = performance.now()
    const step = (now: number) => {
      const elapsed = Math.min(now - last, 32)
      last = now
      position = Math.min(Math.max(position + velocity * elapsed, 0), maxScroll())
      wall.scrollLeft = position
      velocity *= 0.995 ** elapsed
      if (Math.abs(velocity) > 0.02 && position > 0 && position < maxScroll()) {
        glide = requestAnimationFrame(step)
      }
    }
    glide = requestAnimationFrame(step)
  }

  const endDrag = (event: PointerEvent) => {
    if (!drag) return
    // Holding still before letting go means no glide.
    const velocity = event.timeStamp - drag.lastTime < 80 ? drag.velocity : 0
    const { moved } = drag
    drag = null
    if (!moved) return
    wall.classList.remove("is-dragging")
    // The drag ended on a photo: don't let the click that follows open it.
    suppressClick = true
    setTimeout(() => (suppressClick = false))
    if (!prefersReducedMotion.matches) startGlide(velocity)
  }

  wall.addEventListener("pointerdown", (event) => {
    // Any new input takes over from a glide that is still running, and a new press can click.
    cancelAnimationFrame(glide)
    suppressClick = false
    if (event.pointerType !== "mouse" || event.button !== 0) return
    drag = {
      startX: event.clientX,
      startScroll: wall.scrollLeft,
      lastX: event.clientX,
      lastTime: event.timeStamp,
      velocity: 0,
      moved: false,
    }
  })

  wall.addEventListener("pointermove", (event) => {
    if (!drag) return
    // The button was released outside the window.
    if (!(event.buttons & 1)) return endDrag(event)
    const distance = event.clientX - drag.startX
    if (!drag.moved) {
      // A few pixels of wobble still count as a click.
      if (Math.abs(distance) < 6) return
      drag.moved = true
      wall.setPointerCapture(event.pointerId)
      wall.classList.add("is-dragging")
    }
    const elapsed = event.timeStamp - drag.lastTime
    if (elapsed > 0) {
      const velocity = (drag.lastX - event.clientX) / elapsed
      drag.velocity = 0.7 * velocity + 0.3 * drag.velocity
    }
    drag.lastX = event.clientX
    drag.lastTime = event.timeStamp
    wall.scrollLeft = drag.startScroll - distance
  })

  wall.addEventListener("pointerup", endDrag)
  wall.addEventListener("pointercancel", endDrag)
  wall.addEventListener("wheel", () => cancelAnimationFrame(glide), { passive: true })
  // The browser's own drag-and-drop of images and links would cancel the drag.
  wall.addEventListener("dragstart", (event) => event.preventDefault())
  wall.addEventListener(
    "click",
    (event) => {
      if (!suppressClick) return
      event.preventDefault()
      event.stopPropagation()
    },
    true,
  )
}
