# couldbeyours

Website for a tailoring atelier in Switzerland: a marketing/portfolio site now, a small shop later.
German first.

**Status:** Phase 1. The home page is a one-pager (hero, Über mich, Angebot, Impressionen, Kontakt)
with Impressum and Datenschutz as separate pages. Copy, contact details and images are still
placeholders, see [Editing content](#editing-content).

## Stack

| Layer     | Choice                                                                       |
| --------- | ---------------------------------------------------------------------------- |
| Framework | [Astro](https://docs.astro.build) 7, fully static output                     |
| UI        | Tailwind CSS 4 + [shadcn/ui](https://ui.shadcn.com) (Base UI), React islands |
| Hosting   | Cloudflare Workers (static assets), deployed by Workers Builds               |
| CI        | GitHub Actions: typecheck, lint, format check, build                         |
| Node      | 24 LTS, pinned in `.nvmrc` (used locally, in CI, and by Cloudflare's builds) |

There is no server code, database or secret yet.

## Getting started

Prerequisites: Node 24 and git. On macOS: `brew install node@24 && brew link --force node@24`.

```bash
git clone https://github.com/t1d/couldbeyours.git
cd couldbeyours
npm ci
npm run dev
```

Open <http://localhost:4321>. Saving a file updates the browser immediately.

Open the folder in VS Code and accept the recommended extensions (Astro, Tailwind CSS
IntelliSense, ESLint, Prettier). Files are formatted on save with the same rules CI uses.

## Commands

| Command                 | What it does                                                        |
| ----------------------- | ------------------------------------------------------------------- |
| `npm run dev`           | Dev server with hot reload on <http://localhost:4321>               |
| `npm run dev -- --host` | Same, reachable from your phone on the local network                |
| `npm run build`         | Production build into `dist/`                                       |
| `npm run preview`       | Build, then serve `dist/` in Cloudflare's local runtime (port 8787) |
| `npm run typecheck`     | TypeScript and Astro type checking                                  |
| `npm run lint`          | ESLint                                                              |
| `npm run format`        | Format all files with Prettier                                      |
| `npm run format:check`  | Fail if any file is not formatted                                   |
| `npm run check`         | Everything CI runs: typecheck, lint, format check, build            |
| `npm run deploy`        | Manual deploy from your machine. Emergency use only, see below.     |

Run `npm run check` before pushing; if it passes locally, CI will pass.

## Project structure

```
src/
  pages/                one file per route (index.astro → /, impressum.astro → /impressum/)
  layouts/              page shells (<html>, <head> with SEO tags, header, footer)
  components/           site components; interactive ones are React .tsx files
  components/sections/  the sections of the home page, in page order
  components/icons/     icons Lucide does not ship (brand glyphs)
  components/ui/        shadcn/ui components (generated, then owned by us)
  lib/content.ts        all copy, contact details, links and image imports
  lib/                  other helpers
  assets/images/        photos, optimised at build time by astro:assets
  styles/               global.css: Tailwind setup, fonts and theme tokens
public/                 files served as-is (favicons, Open Graph image)
wrangler.jsonc          Cloudflare deployment config
.github/                CI workflow
```

The site ships almost no JavaScript: everything is static HTML except a few inline lines that close
the mobile menu (which itself uses the native popover API). Reach for a React island only when a
feature really needs client-side state.

Adding a shadcn/ui component: `npx shadcn@latest add <name>`, then `npm run format`, because
generated files don't follow our Prettier style.

## Editing content

- **Text, services, prices, contact details, links:** `src/lib/content.ts`. Components only read
  from there. Placeholders are marked `TODO`; `grep -rn TODO src astro.config.mjs` lists what is
  still open before launch (including the domain in `astro.config.mjs`).
- **Photos:** replace the files in `src/assets/images/` (keep the names, or change the imports at
  the top of `content.ts`) and update the alt texts next to them. Originals can be full-size
  camera files; the build generates AVIF/WebP in several widths. Portrait 4:5 suits every slot.
- **Sharing image:** `public/og-image.jpg`, 1200 × 630 px.
- **Colours:** the brand palette at the top of `:root` in `src/styles/global.css`. All components
  use these tokens, so changing a value there changes the whole site. Keep text colours at a
  contrast of at least 4.5:1 against the background (the current values are noted next to them).
- **Fonts:** Cormorant Garamond (headings), Jost (text) and Courier Prime Bold (the "could be yours"
  wordmark, as on the flyer), self-hosted via Fontsource packages and set in `@theme` in
  `global.css`. Swapping one means installing another `@fontsource*/*` package and updating the
  import, the `--font-*` token and the preload in `layouts/main.astro`.

## How changes reach production

1. Work on a branch, push it, open a pull request against `main`.
2. GitHub Actions runs the `checks` job. Cloudflare builds a **preview** version of the site and
   links it on the PR.
3. `main` is protected: a PR can only merge when `checks` is green.
4. Merging deploys `main` to production automatically (Cloudflare Workers Builds).

Production URL: `https://couldbeyours.<account-subdomain>.workers.dev` until the custom domain is
connected.

## Rollback

A bad deploy is fixed in two steps. Step 1 is fast; step 2 makes it stick.

1. **Restore the previous version (seconds).** Cloudflare dashboard → Workers & Pages →
   `couldbeyours` → Deployments → pick the last good version → Rollback.
   CLI alternative: `npx wrangler rollback` (requires `npx wrangler login`).
2. **Make the fix permanent in git.** The rollback only changes what is live; the next merge to
   `main` would deploy the bad code again. Revert it on a branch and merge through a PR:

   ```bash
   git switch -c revert-bad-change
   git revert <bad-commit-sha>
   git push -u origin revert-bad-change
   gh pr create --fill
   ```

## Dependency notes

- **Install scripts.** npm 11 only runs package install scripts that are approved in
  `package.json` → `allowScripts`. `esbuild` and `workerd` are approved for their current
  versions; after upgrading either one, re-approve with `npm install-scripts approve <pkg>`.
  `fsevents` is denied on purpose (it ships prebuilt).
- **`shadcn` is a runtime dependency** because `global.css` imports `shadcn/tailwind.css`.
- **Known audit finding:** `npm audit` reports `braces` (GHSA-vfj7-8cjw-p6xm), reached only
  through the shadcn CLI. It is a crash on attacker-controlled glob patterns; we never pass
  untrusted input to it, and no patched version exists yet. Re-check when shadcn updates.

## Troubleshooting

- **`UNABLE_TO_GET_ISSUER_CERT_LOCALLY` from npm on macOS/Homebrew:** Homebrew's Node uses
  OpenSSL 4's certificate store, which can be missing after an interrupted install. Fix with
  `brew postinstall openssl@4`.
