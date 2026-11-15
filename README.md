# couldbeyours

Website for a tailoring atelier in Switzerland: a marketing/portfolio site now, a small shop later.
German first.

**Status:** Phase 1. The home page is a one-pager (hero, Haltung, Über mich, Angebot, Sprüche,
Impressionen, Kontakt) with Impressum and Datenschutz as separate pages. Copy, contact details and images are still
placeholders, see [Editing content](#editing-content).

## Stack

| Layer     | Choice                                                                       |
| --------- | ---------------------------------------------------------------------------- |
| Framework | [Astro](https://docs.astro.build) 7, fully static output                     |
| UI        | Tailwind CSS 4 + [shadcn/ui](https://ui.shadcn.com) (Base UI), React islands |
| Hosting   | Cloudflare Workers (static assets), deployed by Workers Builds               |
| CI        | GitHub Actions: typecheck, lint, format check, build                         |
| Node      | 24 LTS, pinned in `.nvmrc` (used locally, in CI, and by Cloudflare's builds) |

There is no server code or database. The only secret is the Instagram access token, a build
variable that is read while the site is built (see [Instagram](#instagram)).

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
  components/           shared pieces: Section (a band of the page), SectionHeading, Wordmark,
                        LogoHeart, Intro, header, footer, PhotoImage, LegalPage
  components/sections/  the sections of the home page, in page order
  components/icons/     icons Lucide does not ship (brand glyphs)
  components/ui/        shadcn/ui components (generated, then owned by us)
  lib/content.ts        all copy, contact details, links and image imports
  lib/legal.ts          the texts of Impressum and Datenschutz
  lib/instagram.ts      fetches the newest Instagram posts while the site is built
  lib/                  other helpers
  scripts/              client scripts of the gallery (photo wall, lightbox) and the shared
                        "reduce motion" check
  assets/images/        photos, optimised at build time by astro:assets
  styles/               global.css: Tailwind setup, fonts, theme tokens, buttons and the page grid
public/                 files served as-is (favicons, Open Graph image)
wrangler.jsonc          Cloudflare deployment config
.github/                CI workflow and the daily rebuild
```

The site ships little JavaScript, and every part of it is an enhancement: the page reads and works
without it, just more plainly. What there is:

- `sections/Quotes.astro`: the Sprüche change on their own every eight seconds, with a cross-fade.
  The change waits while the pointer is on a quote; a swipe moves on. Without JavaScript, or with
  "reduce motion" on, all quotes are listed one below the other.
- `sections/Gallery.astro` with `scripts/photo-wall.ts` and `scripts/lightbox.ts`: dragging the
  photo wall (with buttons) and the lightbox.
- `SiteHeader.astro`: a few lines that close the mobile menu (itself a native popover).

Everything else that moves is CSS: the intro with the logo, the heart that beats when the logo in
the header is hovered, hover states. All of it rests under the system setting "reduce motion". Reach
for a React island only when a feature really needs client-side state.

Adding a shadcn/ui component: `npx shadcn@latest add <name>`, then `npm run format`, because
generated files don't follow our Prettier style.

## Editing content

- **Text, services, prices, contact details, links:** `src/lib/content.ts`. Components only read
  from there. Placeholders are marked `TODO`; `grep -rn TODO src astro.config.mjs` lists what is
  still open before launch (including the domain in `astro.config.mjs`).
- **Sprüche:** the `quotes` list in `content.ts`. Add, remove or reorder entries freely;
  `style: "caps"` sets a quote in spaced capitals, `lang` marks one that is not in German.
- **Headings:** `emphasis` next to a `title` names the part set in italics. It must match the
  title's wording exactly; leave it out for a plain heading.
- **Photos:** replace the files in `src/assets/images/` (keep the names, or change the imports at
  the top of `content.ts`) and update the alt texts next to them. Originals can be full-size
  camera files; the build generates AVIF/WebP in several widths. Portrait 4:5 suits every slot.
  The photos of the gallery ("Impressionen") come from Instagram as soon as the account is
  connected; the ones in `content.ts` are the stand-ins until then.
- **Sharing image:** `public/og-image.jpg`, 1200 × 630 px.
- **Colours:** the brand palette at the top of `:root` in `src/styles/global.css`. All components
  use these tokens, so changing a value there changes the whole site. Keep text colours at a
  contrast of at least 4.5:1 against the background (the current values are noted next to them).
- **Fonts:** Cormorant Garamond (headings), Jost (text) and Courier Prime Bold (the "could be yours"
  wordmark, as on the flyer), self-hosted via Fontsource packages and set in `@theme` in
  `global.css`. Swapping one means installing another `@fontsource*/*` package and updating the
  import, the `--font-*` token and the preload in `layouts/main.astro`.

## Instagram

The gallery ("Impressionen") shows the newest posts of the atelier's Instagram account. The posts
are fetched **while the site is built** with the official Instagram API (`src/lib/instagram.ts`),
downloaded and optimised like the other photos, and served from this site. Visitors never connect to
Instagram unless they click a link, so the "no cookies, no tracking" promise of the privacy page
still holds. Photos open in the lightbox; a video shows its cover photo and links to the post.

Without a token, or when Instagram does not answer, the gallery shows the stand-in photos from
`content.ts`. The build never fails because of Instagram.

**One-time setup (about 15 minutes, by the owner of the Instagram account):**

1. The account must be a _professional_ account (Business or Creator, free): Instagram app →
   Settings → Account type and tools → Switch to professional account.
2. Create an app at <https://developers.facebook.com/apps> (type "Business"), add the product
   **Instagram** and open **API setup with Instagram login**.
3. Under "Generate access tokens", add the account and click **Generate token**. Copy the token; it
   is valid for 60 days. No app review is needed, because the app only reads the owner's own account.
4. In Cloudflare: Workers & Pages → `couldbeyours` → Settings → Build → **Variables and secrets** →
   add `INSTAGRAM_ACCESS_TOKEN` with the token (as a secret).
5. To show new posts without anyone touching the site: Settings → Build → **Deploy hooks** → create
   a hook for the `main` branch and copy its URL. In GitHub: Settings → Secrets and variables →
   Actions → new secret `CLOUDFLARE_DEPLOY_HOOK_URL`. `.github/workflows/rebuild.yml` then
   rebuilds the site every morning.

To try it locally, copy `.env.example` to `.env`, fill in the token and run `npm run dev`.

**Keeping the token alive.** Every production build asks Instagram to extend the token by another
60 days, so a daily rebuild keeps it valid. If the gallery ever falls back to the stand-in photos,
look at the build log in Cloudflare (lines starting with `[instagram]`): an expired token has to be
generated again as in step 3 and replaced in Cloudflare. Not verified against a real account yet.

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
