# couldbeyours

Website for a tailoring atelier in Switzerland: a marketing/portfolio site now, a small shop later.
German first.

**Status:** Phase 0. The site is a single placeholder page whose job is to prove that build, CI,
preview deployments and production deployments all work.

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
  pages/          one file per route (index.astro → /)
  layouts/        page shells (<html>, <head>, global CSS)
  components/     site components; interactive ones are React .tsx files
  components/ui/  shadcn/ui components (generated, then owned by us)
  lib/            helpers
  styles/         global.css: Tailwind setup and theme tokens
public/           files served as-is (favicon)
wrangler.jsonc    Cloudflare deployment config
.github/          CI workflow
```

Adding a shadcn/ui component: `npx shadcn@latest add <name>`, then `npm run format`, because
generated files don't follow our Prettier style.

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
