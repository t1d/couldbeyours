// @ts-check

import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"

import react from "@astrojs/react"

// https://astro.build/config
export default defineConfig({
  // Public URL, used for absolute links such as the Open Graph image.
  // TODO: replace with the real domain once it is connected.
  site: "https://couldbeyours.ch",

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],
})
