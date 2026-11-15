// The latest photos of the atelier's Instagram account, fetched while the site is built. Nothing
// runs in the visitor's browser: the photos are downloaded and optimised like the local ones (see
// `image.remotePatterns` in astro.config.mjs) and then served from this site, so visitors never
// talk to Instagram unless they click a link.
//
// Needs INSTAGRAM_ACCESS_TOKEN (a long-lived token of the "Instagram API with Instagram Login",
// see README → Instagram). Without it, or when Instagram does not answer, this returns nothing and
// the gallery shows the photos from content.ts instead. A failure here never breaks the build.
//
// Import from .astro frontmatter only: like build-info.ts it reads the build environment.

import type { Photo } from "@/lib/content"

// Only tests point this somewhere else (a stand-in for the API).
const API = process.env.INSTAGRAM_API_URL ?? "https://graph.instagram.com"

type Media = {
  caption?: string
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM"
  media_url?: string
  thumbnail_url?: string
  permalink: string
}

const token = process.env.INSTAGRAM_ACCESS_TOKEN ?? import.meta.env.INSTAGRAM_ACCESS_TOKEN

async function get<T>(path: string, params: Record<string, string>): Promise<T> {
  const response = await fetch(`${API}${path}?${new URLSearchParams(params)}`, {
    signal: AbortSignal.timeout(15_000),
  })
  if (!response.ok) {
    // The body names the problem (expired token, missing permission, ...) and never holds the token.
    throw new Error(`HTTP ${response.status}: ${await response.text()}`)
  }
  return response.json() as Promise<T>
}

// A long-lived token lasts 60 days; asking for a fresh one on every production build keeps it
// alive as long as the site is rebuilt now and then (see .github/workflows/rebuild.yml).
async function extendToken() {
  if (!token || !import.meta.env.PROD) return
  try {
    await get("/refresh_access_token", { grant_type: "ig_refresh_token", access_token: token })
  } catch (error) {
    console.warn("[instagram] Token konnte nicht verlängert werden:", String(error))
  }
}

/** The first line of a caption, shortened to something that fits under a photo. */
function shorten(caption: string | undefined, max = 110) {
  const line = caption?.split("\n")[0]?.trim() ?? ""
  return line.length > max ? `${line.slice(0, max - 1).trimEnd()}…` : line
}

function toPhoto(media: Media): Photo | null {
  // A video shows its cover photo and links to the post, since the wall only shows photos.
  const video = media.media_type === "VIDEO"
  const src = video ? media.thumbnail_url : media.media_url
  if (!src) return null
  const caption = shorten(media.caption)
  return {
    src,
    alt: caption ? `Instagram-Beitrag: ${caption}` : "Foto aus dem Instagram-Profil des Ateliers",
    caption,
    link: video ? media.permalink : undefined,
  }
}

let latest: Promise<Photo[]> | undefined

/** The newest posts, newest first; an empty list when there is no token or Instagram fails. */
export function latestPhotos(limit: number): Promise<Photo[]> {
  latest ??= (async () => {
    if (!token) {
      console.info(
        "[instagram] Kein INSTAGRAM_ACCESS_TOKEN gesetzt: die Galerie zeigt die Platzhalterfotos.",
      )
      return []
    }
    try {
      await extendToken()
      const { data } = await get<{ data: Media[] }>("/me/media", {
        fields: "caption,media_type,media_url,thumbnail_url,permalink",
        limit: String(limit + 5), // a few spare, in case some posts have no photo
        access_token: token,
      })
      const photos = data.map(toPhoto).filter((photo) => photo !== null)
      console.info(`[instagram] ${photos.length} Beiträge geladen.`)
      return photos.slice(0, limit)
    } catch (error) {
      console.warn(
        "[instagram] Feed konnte nicht geladen werden, Platzhalterfotos werden gezeigt:",
        String(error),
      )
      return []
    }
  })()
  return latest
}
