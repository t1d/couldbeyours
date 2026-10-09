// @ts-check
import js from "@eslint/js"
import astro from "eslint-plugin-astro"
import reactHooks from "eslint-plugin-react-hooks"
import { defineConfig, globalIgnores } from "eslint/config"
import globals from "globals"
import tseslint from "typescript-eslint"

export default defineConfig([
  globalIgnores(["dist/", ".astro/", ".wrangler/"]),
  js.configs.recommended,
  tseslint.configs.recommended,
  astro.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    extends: [reactHooks.configs.flat.recommended],
  },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
])
