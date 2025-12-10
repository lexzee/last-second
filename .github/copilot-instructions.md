# GitHub Copilot / AI Agent Instructions — last-second-ui

Purpose: Provide focused, actionable guidance so an AI coding agent can be immediately productive in this Next.js app.

**Architecture:**

- **Framework:** Next.js (app directory, Next v16) using the App Router and Server Components by default.
- **Styling:** Tailwind CSS + PostCSS. Global styles live in `app/globals.css`.
- **Fonts:** `next/font/google` is used (see `app/layout.tsx` for `Geist`/`Geist_Mono` usage and CSS variables).
- **Assets:** Public static assets are in `public/` and referenced by `next/image` in `app/page.tsx`.

**Run & Build (concrete commands):**

- Development: `npm run dev` (same works with `pnpm`/`yarn` if the user prefers). This runs `next dev` (see `package.json`).
- Build: `npm run build` then `npm run start` to serve the production build.

**Project conventions & patterns (do not change without reason):**

- App router: Files under `app/` are server components by default. For client-only components add `"use client"` at the very top of the file.
- Root layout: `app/layout.tsx` holds global HTML + `metadata` export used for page metadata.
- Entry page: `app/page.tsx` is the primary landing page — small edits here refresh the dev server.
- TypeScript: `tsconfig.json` enables strict checks and defines a path alias `@/*` → `./*`. Use this alias consistently when present.
- Tailwind/PostCSS: Tailwind v4 is installed; keep changes to `postcss.config.mjs` and `tailwind.config` consistent with the project's current setup.

**Integration points & external deps to be aware of:**

- `next` (v16), `react` 19 — expect modern React/Next APIs (app dir, server components, `next/font`).
- `tailwindcss` and `@tailwindcss/postcss` — CSS utilities are relied on in `app/page.tsx` and `app/globals.css`.

**Examples & quick edits:**

- To change the global font variables: edit `app/layout.tsx` (the `Geist` and `Geist_Mono` calls) and `app/globals.css` where the variables are consumed.
- To add an API route in the app router, create `app/api/<route>/route.ts` and export the handler (server-side only).
- To force a component to be client-side (e.g., uses state/hooks), add `"use client"` as the first line of the component file.

**Hints for code generation & PRs:**

- Keep diffs minimal and focused: prefer editing `app/*` files rather than changing global config unless necessary.
- When adding new dependencies, update `package.json` and include a brief note in the PR about why the dependency is required for runtime (not only dev).
- Respect TypeScript strict mode; ensure types are added rather than using `any` when possible.

**Where to look for context in the repo:**

- `package.json` — scripts and core dependency versions (dev/build commands).
- `app/layout.tsx`, `app/page.tsx`, `app/globals.css` — main UI entrypoints and styling patterns.
- `next.config.ts`, `tsconfig.json` — configuration affecting bundling and module resolution.

If anything in this file is unclear or you need more examples (tests, CI scripts, or contributor conventions), request which area to expand and I'll iterate.
