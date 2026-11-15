// @ts-check

import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"

import react from "@astrojs/react"

// https://astro.build/config
export default defineConfig({
  // Public URL, used for absolute links such as the Open Graph image.
  // TODO: replace with the real domain once it is connected.
  site: "https://couldbeyours.ch",

  // Photos from the Instagram feed are fetched while building (src/lib/instagram.ts) and optimised
  // like the local ones; only these hosts may be fetched.
  image: {
    remotePatterns: [
      { protocol: "https", hostname: "**.cdninstagram.com" },
      { protocol: "https", hostname: "**.fbcdn.net" },
    ],
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],
})
