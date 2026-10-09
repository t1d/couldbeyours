import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Interactive island: needs client-side JS, so the page mounts it with a client:* directive.
// Kept in a .tsx file because React context (used by Dialog) is not shared across Astro islands.
export function DemoDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>Dialog öffnen</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pipeline funktioniert</DialogTitle>
          <DialogDescription>
            Diese Komponente ist eine React-Insel: Sie wird im Browser hydratisiert, der Rest der
            Seite ist statisches HTML.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton />
      </DialogContent>
    </Dialog>
  )
}
