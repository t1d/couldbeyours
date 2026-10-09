// Build metadata injected by Cloudflare Workers Builds. Read at build time only: import this from
// .astro frontmatter, never from a client-side island (process.env does not exist in the browser).
export const buildInfo = {
  commit: process.env.WORKERS_CI_COMMIT_SHA?.slice(0, 7) ?? "lokal",
  branch: process.env.WORKERS_CI_BRANCH ?? "lokal",
}
