# Hermes Stack Catalog — Core Tech (IN USE) + Researched Options

**Canonical home:** `_core-scripts/shared-profile-content/docs/TOOLS-STACK-OPTIONS.md`  
**Index:** [TOOLS-WATCHLIST.md](./TOOLS-WATCHLIST.md) · [TOOL-CHEST-INDEX.md](./TOOL-CHEST-INDEX.md) · [MASTER-ECOSYSTEM-AUDIT.md](./MASTER-ECOSYSTEM-AUDIT.md)  
**Last updated:** 2026-07-07  
**Policy:** Jon prefers **local-first / self-host** where possible. **Additive only** — do not replace working stack without approval.

**Two layers in this doc:**

1. **§ Core production stack** — what Hermes **already runs** (Next.js, Node, Tailwind, SQLite, etc.)
2. **§ Researched options** — alternatives evaluated for future projects (Better Auth, Strapi, MarkText, …)

Grades on researched options follow [TOOLS-WATCHLIST](./TOOLS-WATCHLIST.md) rubric. Core stack items are **IN USE** baseline — not re-graded each session.

---

## Core production stack (IN USE)

> **Refresh:** `npm run ecosystem:audit` · per-app versions in each repo `package.json` / `TRUTH.md`

### Runtime & environment

| Tech | Role | Hermes usage |
|------|------|----------------|
| **Node.js** | JS runtime | **≥20** — Next-Flick engines; MSC 15.x; JonBeatz 16.x; Hostinger Node prod |
| **npm** | Package manager | All profiles; scripts in `package.json` |
| **PowerShell** | Shell / rituals | Windows 10/11 — `session:start`, deploy, backup (no bash heredocs) |
| **Git + GitHub** | VCS / CI | Private repos; `deploy-hostinger.yml` on Next-Flick |
| **TypeScript** | Language | **5.3–5.9** — all modern web apps; strict configs per repo |

### Web framework

| Tech | Versions | Projects |
|------|----------|----------|
| **Next.js** (App Router) | 15.4–16.2 | **Next-Flick** 15.5, **MSC** 15.4, **MSC-Projectz** 16.2, **JonBeatz** 16.2, Node-Launcher renderer |
| **React** | **19.x** | All Next apps |
| **React DOM** | **19.x** | Paired with React |
| **Server Components / RSC** | Next default | Data loaders on server (Next-Flick `lib/media/queries.ts`, etc.) |
| **Server Actions** | Next | Next-Flick mutations where used |
| **middleware.ts** | Next | Clerk auth + redirects (Next-Flick) |

### Styling & UI

| Tech | Versions | Projects |
|------|----------|----------|
| **Tailwind CSS** | **v4** (PostCSS) | Next-Flick, JonBeatz; **v3/v4** mix on older sites |
| **@tailwindcss/postcss** | v4 pipeline | Next-Flick |
| **CSS custom properties** | — | Theme tokens (Next-Flick gold/dark, NovaMira patterns) |
| **shadcn/ui** + **Radix** | copy-paste | **MSC**, MSC-Projectz, JonBeatz Playground — `npx shadcn add`, Component-Registries skill |
| **Clerk Themes** | `@clerk/themes` | Next-Flick dark sign-in |
| **next/font** | Google fonts | Inter, mono stacks per project |
| **Lucide / heroicons** | Icons | Where shadcn or custom UI uses them |

**Next-Flick note:** Custom Tailwind components (no `components.json` yet) — design refs point to shadcn for future pages.

### Databases & drivers

| Tech | Type | Projects | Notes |
|------|------|----------|-------|
| **PostgreSQL** | RDBMS | **Next-Flick** | **pg0** local `:5433` · **Neon** prod |
| **pg0** | Embedded local Postgres | Next-Flick dev | `npm run db:local` — not production |
| **Neon** | Managed Postgres | Next-Flick prod | `NEON_DATABASE_URL`; Hostinger `DATABASE_URL` |
| **SQLite** | File DB | **MSC**, MSC-Projectz, VPE registry | `file:./payload.sqlite` |
| **better-sqlite3** | Node SQLite driver | MSC, VPE | Payload adapter |
| **postgres** (postgres.js) | PG driver | Next-Flick | Drizzle client |
| **MySQL** | RDBMS | Hostinger hPanel only | **Available** on Web/Cloud — **not used** by our Node apps (Postgres/SQLite instead) |
| **Mem0 + Qdrant** | Vector memory | All Hermes profiles | Isolated `MEM0_COLLECTION` per project |
| **Draven Mem0** | Assistant memory | Cross-project | `draven_memories` |

### ORM, schema & migrations

| Tech | Projects | Notes |
|------|----------|-------|
| **Drizzle ORM** | Next-Flick | `lib/db/schema.ts`, `drizzle-kit push` |
| **drizzle-kit** | Next-Flick | `db:push`, `db:push:prod`, `db:studio` |
| **Payload CMS 3.x** | MSC, MSC-Projectz | Schema in code; admin UI; REST/local API |

### Auth (production)

| Tech | Projects |
|------|----------|
| **Clerk** (`@clerk/nextjs`) | Next-Flick — test + prod instances |
| **Payload Auth** | MSC admin, MSC-Projectz users |

### Forms & validation (where installed)

| Tech | Projects |
|------|----------|
| **Zod** | MSC, MSC-Projectz |
| **React Hook Form** | MSC |
| **@hookform/resolvers** | MSC (with Zod) |

### Motion, 3D & scroll

| Tech | Projects |
|------|----------|
| **GSAP** + **ScrollTrigger** | JonBeatz, DigitalStudioz, showcase |
| **@gsap/react** | React integration |
| **Three.js** | MSC, JonBeatz, DigitalStudioz |
| **React Three Fiber (R3F)** | 3D scroll sites |
| **@react-three/drei** | R3F helpers |
| **Lenis** | Smooth scroll |
| **Motion** / **Framer Motion** | UI motion where used |
| **split-type** | Text animation |

### Testing & quality

| Tech | Projects |
|------|----------|
| **Playwright** | Next-Flick E2E (`web:verify-local`, manual assist) |
| **Vitest** | MSC / some profiles |
| **next lint** | ESLint via Next |
| **npm audit** | Pre-deploy gate (Next-Flick prod smoke) |

### Deploy, hosting & ops

| Tech | Target |
|------|--------|
| **Hostinger** hPanel | next-flick.com, mystudiochannel.com, jon-beatz.com, jonbeatz.dev — Node + static |
| **Passenger** | Hostinger Node process manager |
| **FTPS / SSH** | MSC deploy pipelines (`pushit:live*`) |
| **Spaceship cPanel** | MSC-Projectz |
| **GitHub Pages** | DigitalStudioz preview |
| **GitHub Actions** | Next-Flick `deploy-hostinger.yml` |
| **ngrok** | LiteLLM ↔ Cursor tunnel `:4040` |
| **PM2** | Node-Launcher process management |

### Email, monitoring & external APIs

| Tech | Use |
|------|-----|
| **Resend** | MSC transactional email |
| **AgentMail** | Agent email inboxes (2-way threads, OTP) — **ADOPT**; key Next-Flick |
| **Nodemailer** | MSC-Projectz / Payload email adapter |
| **Sentry** | MSC error monitoring |
| **TMDB API** | Next-Flick metadata + posters |
| **Google Workspace OAuth** | jonbeatz@gmail.com — Hermes skill |
| **Google Vertex / Gemini** | MSC LiteLLM bridge |
| **Stripe MCP** | Billing tasks (plugin, when needed) |

### AI & agent layer (summary)

| Tech | Role | Port / path |
|------|------|-------------|
| **LiteLLM** | LLM proxy | `:4000` |
| **DeepSeek API** | Cloud daily driver | via LiteLLM |
| **OpenRouter** | Model aliases `*-or` | via LiteLLM |
| **LM Studio** | Local LLM | `:1234` |
| **Hermes Desktop** | Agent UI | `%LOCALAPPDATA%\hermes` |
| **Telegram gateway** | Mobile agent | Bot API |
| **ComfyUI** | Local GPU images | `:8188` |
| **Hugging Face Inference** | Cloud images | `HF_TOKEN` |
| **fal.ai** | Cloud image/video | `FAL_API_KEY` |
| **OmniVoice** | Draven TTS | CPU ritual |
| **Cursor IDE** | Primary dev + MCPs | 16+ MCP servers |

**Full AI/tools matrix:** [TOOL-CHEST-INDEX.md](./TOOL-CHEST-INDEX.md) · [TOOLS-WATCHLIST.md](./TOOLS-WATCHLIST.md)

### Desktop & launcher

| Tech | Projects |
|------|----------|
| **Electron** 28.x | Node-Launcher-v2 |
| **Tauri** v2 | MSC-Projectz desktop wrapper |

### Knowledge & docs

| Tech | Path |
|------|------|
| **Obsidian Vader Vault** | `H:\Vader_Vault` — vault MCP |
| **Markdown** | All `.cursor/docs`, TRUTH.md, ReCall |
| **Markpad** | Jon daily `.md` editor (Windows) |

### Default ports (local)

| Port | Service |
|------|---------|
| 3000 | Next.js dev (Next-Flick, etc.) |
| 1234 | LM Studio |
| 4000 | LiteLLM |
| 4040 | ngrok dashboard |
| 5433 | pg0 PostgreSQL |
| 7680 | TokenTracker |
| 8080 | AgentsView |
| 8188 | ComfyUI |

### Hermes default web app recipe

```
Node 20+ · TypeScript · Next.js App Router · React 19
Tailwind v4 · shadcn/ui (when building UI)
Drizzle + Postgres/SQLite OR Payload CMS
Clerk OR Payload Auth OR (future) Better Auth
Hostinger Node deploy · Playwright smoke
```

---

## Quick pick by need (researched alternatives)

| Need | First try | Also on deck | Skip for sovereignty |
|------|-----------|--------------|----------------------|
| **Next.js CMS (self-host)** | **Payload** (IN USE on MSC) | Strapi, Directus | Contentful, Cosmic, brixcms.com cloud |
| **Next.js auth (self-host)** | **Better Auth** | Stack Auth / Hexclave | Clerk (current Next-Flick prod) |
| **Postgres local dev** | **pg0** `:5433` | — | — |
| **Postgres prod (Hostinger shared)** | **Neon** (current Next-Flick) | External Supabase | Hostinger managed PG (not on Web/Cloud plan) |
| **Postgres prod (one vendor)** | **Hostinger VPS** + Postgres | — | — |
| **Markdown editor (fork)** | **MarkText** | Zettlr, Milkdown (build) | — |
| **Admin over existing SQL** | **Directus** | — | — |
| **Marketing content (cloud OK)** | **Sanity** | Payload | — |
| **UI components (Next.js)** | **shadcn/ui** | Magic UI, Tailark registries | — |
| **Schema / validation** | **Zod** | — | — |
| **Forms (React)** | **React Hook Form** + Zod | — | — |
| **Client server-state / fetch** | **TanStack Query** | SWR, RSC-only | — |
| **Embedded BaaS (Firebase alt)** | **bknd** (beta) | Payload, Better Auth+Drizzle | Firebase, Supabase cloud |

---

## Authentication (researched — 2026-07-07)

**Context:** Next-Flick uses **Clerk** today (v5 prod, v6 dev). Brainstorm: move to **in-app auth + pg0** for local-first. See Next-Flick `NEXT-FLICK-AUTH-NOTES.md`.

| Tool | Grade | Verdict | Self-host | Next.js | One-line |
|------|-------|---------|-----------|---------|----------|
| [Better Auth](https://github.com/better-auth/better-auth) | **A (92)** | **ADOPT** | ✅ in-app + your DB | ✅ Native | Drizzle adapter; Auth.js successor path; best local-first fit |
| [Stack Auth](https://github.com/stack-auth/stack) / [Hexclave](https://github.com/hexclave/hexclave) | **B+ (86)** | WATCH | ✅ Docker | ✅ Components | Clerk-like UI; AGPL backend; separate auth server |
| [Hanko](https://github.com/teamhanko/hanko) | **B (84)** | WATCH | ✅ Docker | ✅ | Passkey-first; JWT + `jose`; separate Go backend |
| [Authgear](https://github.com/authgear/authgear-server) | **B- (80)** | WATCH | ✅ K8s/Helm | Via API | Enterprise IdP; heavy ops for family apps |
| [jose](https://www.npmjs.com/package/jose) | — | dep | N/A | ✅ | JWT library only — not an auth product |
| **Clerk** | B+ (87) | **IN USE** | ❌ SaaS | ✅ | Next-Flick prod + dev; DNS verified |

**Trial order (Next-Flick):** Better Auth spike on pg0 → Stack Auth Docker compare → defer Authgear.

**Env (Better Auth):** `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `DATABASE_URL` (same pg0/Postgres as app).

---

## Headless CMS (researched — 2026-07-07)

**Context:** **Payload IN USE** on MyStudioChannel (Hostinger Node + SQLite local). Next-Flick PRD **rejected CMS** — custom Drizzle social app. Use CMS for **marketing / studio / blog** sites only.

| Tool | Stars | Grade | Verdict | Self-host data | Next.js | License |
|------|-------|-------|---------|----------------|---------|---------|
| [Payload](https://github.com/payloadcms/payload) | ~43k | **A (94)** | **IN USE** | ✅ Full | ✅ In-process v3 | MIT |
| [Strapi](https://github.com/strapi/strapi) | ~73k | **B+ (87)** | WATCH | ✅ Full | API | MIT* |
| [Directus](https://github.com/directus/directus) | ~36k | **B+ (86)** | WATCH | ✅ Full | API | BSL/GPL |
| [KeystoneJS](https://github.com/keystonejs/keystone) | ~10k | **B (82)** | WATCH | ✅ Full | GraphQL | MIT |
| [Sanity](https://www.sanity.io/) | ~6k studio | **B+ (85)** | WATCH | ⚠️ Content Lake cloud | ✅ Strong | Studio MIT |
| [ApostropheCMS](https://github.com/apostrophecms/apostrophe) | ~4k+ | **B- (80)** | WATCH | ✅ Full | Starters | MIT |
| [Contentful](https://www.contentful.com/) | — | C+ (74) | SKIP | ❌ SaaS only | SDK | Proprietary |
| [Cosmic](https://www.cosmicjs.com/) | — | C (72) | SKIP | ❌ SaaS only | SDK | Proprietary |
| **Brix CMS** ([brixcms.com](https://www.brixcms.com)) | — | D (55) | SKIP | ❌ Agency cloud | API | Proprietary |

\*Strapi v5 — verify license tier for enterprise features.

**Brix name collision:** `brixcms.com` = proprietary agency platform. [Learsi23/BrixCMS](https://github.com/Learsi23/BrixCMS) = .NET 10 + Blazor (wrong stack). [brix-cms/brix-cms](https://github.com/brix-cms/brix-cms) = legacy Java (~130★).

**When to use what:**
- **MSC / new marketing site:** keep **Payload** — do not churn.
- **Non-dev editors + GUI:** trial **Strapi**.
- **Wrap existing Postgres:** trial **Directus**.
- **Content-heavy + accept cloud data:** **Sanity** (verostudio pattern in design refs).

---

## Database & hosting (researched + Next-Flick — 2026-07-07)

**Context:** Next-Flick = **pg0 local** + **Neon prod** + **Hostinger Node**. Hostinger **Web/Cloud** has **MySQL only** — not PostgreSQL. PostgreSQL on Hostinger = **VPS** or external (Neon/Supabase).

| Layer | Current (Next-Flick) | Local-first target | Notes |
|-------|----------------------|--------------------|-------|
| **Local dev** | pg0 `:5433` | Same | `npm run db:local`, `demo:seed`, `web:dev` |
| **ORM** | Drizzle | Same | `lib/db/schema.ts` |
| **Prod DB** | Neon PostgreSQL | VPS Postgres optional | `NEON_DATABASE_URL`, `db:push:prod` |
| **Prod app** | Hostinger Node | Same | `deploy:package` + hPanel Restart |
| **Auth** | Clerk (cloud) | Better Auth (in-app) | parked spike |

**Mirror local → live (safe pattern):**
1. Schema: `db:push:prod` (Drizzle)
2. App: Hostinger deploy ritual
3. Data: `pg_dump` content tables OR real Clerk sign-ups (demo seed = local Clerk test only)
4. Do **not** expect to “upload pg0” as a file to shared hosting

See Next-Flick `NEXT-FLICK-DATABASE-NOTES.md`, `NEXT-FLICK-AUTH-NOTES.md`.

---

## Markdown editors (researched — 2026-07-07)

**Context:** Jon uses **Markpad** today. Parked: trial OSS editors; later fork or build custom (Milkdown). JonBeatz `ReCall.md` + vault.

| Tool | Stars | Grade | Verdict | Stack | One-line |
|------|-------|-------|---------|-------|----------|
| [MarkText](https://github.com/marktext/marktext) | ~58k | **A- (91)** | WATCH | Electron | Best Markpad upgrade; MIT; try first |
| [Zettlr](https://github.com/Zettlr/Zettlr) | ~13k | **B+ (86)** | WATCH | Electron | Long-form / research; GPL |
| [Milkdown](https://github.com/Milkdown/milkdown) | ~11k | **B+ (88)** | WATCH | TS framework | Build your own editor; Typora-inspired |
| Markpad | — | — | IN USE | WPF | Current daily driver |

**Trial order:** MarkText → Zettlr → Milkdown only if building custom product.

---

## Frontend, forms & data layer (researched — 2026-07-07)

**Context:** Hermes Next.js projects share Tailwind v4 + TypeScript. **MSC** uses **Zod** + **React Hook Form**. **shadcn/ui** is the default component pattern via `Component-Registries` skill (Magic UI, Tailark, etc.). **Next-Flick** today is minimal: custom Tailwind UI, Drizzle server loaders, **no** TanStack Query / Zod / shadcn in `package.json` yet.

### UI — shadcn/ui

| | |
|---|---|
| **Site** | [ui.shadcn.com](https://ui.shadcn.com) · **GitHub:** ~118k ⭐ · **MIT** |
| **What** | Copy-paste Radix + Tailwind components (not an npm design system) |
| **Grade** | **A+ (97)** · **Verdict: IN USE** (ecosystem) · **Setup: READY** |
| **Fit** | Default for new marketing pages, JonBeatz Playground, MSC-adjacent UI; pairs with Tailwind v4 |
| **Hermes** | `.cursor/skills/Component-Registries/SKILL.md`, `registry.directory`, `npx shadcn add` |
| **Caveat** | You own the copied source — upgrades are manual `shadcn` CLI |

### Validation — Zod

| | |
|---|---|
| **Site** | [zod.dev](https://zod.dev) · **GitHub:** ~43k ⭐ · **MIT** |
| **What** | TypeScript-first runtime schemas → inferred static types |
| **Grade** | **A+ (96)** · **Verdict: IN USE** (MSC) · **Setup: READY** |
| **Fit** | API route input, env parsing, forms with `@hookform/resolvers`, Better Auth configs |
| **Hermes** | MSC `package.json`; Drizzle can pair via `drizzle-zod` when needed |
| **Next-Flick gap** | Not installed yet — add when building custom forms beyond Clerk |

### Forms — React Hook Form

| | |
|---|---|
| **Site** | [react-hook-form.com](https://react-hook-form.com) · **GitHub:** ~45k ⭐ · **MIT** |
| **What** | Performant React forms via hooks; minimal re-renders |
| **Grade** | **A (93)** · **Verdict: IN USE** (MSC) · **Setup: READY** |
| **Fit** | Complex forms with Zod resolver; standard pair: `react-hook-form` + `zod` + shadcn `<Form>` |
| **Hermes** | MSC `package.json` (`^7.78`) |
| **Next-Flick gap** | Clerk handles sign-in UI today; adopt for ratings/reviews/settings forms |

### Client data — TanStack Query

| | |
|---|---|
| **Site** | [tanstack.com/query](https://tanstack.com/query) · **GitHub:** ~50k ⭐ · **MIT** |
| **What** | Async server-state: cache, refetch, mutations, SSR dehydrate/hydrate |
| **Grade** | **A (94)** · **Verdict: ADOPT** · **Setup: READY** |
| **Fit** | Client-heavy refetch UX (activity feed polling, optimistic ratings); App Router `prefetchQuery` + `HydrationBoundary` |
| **Hermes** | Not in MSC/Next-Flick deps yet — Next-Flick uses RSC + Drizzle loaders |
| **When to add** | When a page needs live updates, optimistic UI, or client cache without prop drilling |
| **Gotcha** | Per-request `QueryClient` on server; set `staleTime > 0` to avoid duplicate refetch after hydrate |

### Embedded backend — bknd

| | |
|---|---|
| **Site** | [bknd.io](https://bknd.io) · **GitHub:** [bknd-io/bknd](https://github.com/bknd-io/bknd) ~3.7k ⭐ · **Apache-2.0** |
| **What** | Lightweight **Firebase/Supabase-style** backend embedded in Next.js — DB admin UI, REST API, auth, media, flows |
| **Grade** | **B+ (87)** · **Verdict: WATCH** · **Setup: NOT_INSTALLED** |
| **Self-host** | ✅ Runs in Next.js server, Docker, Node/Bun, Cloudflare Workers; **your** SQLite/Postgres/LibSQL |
| **Fit** | Greenfield apps wanting admin UI + API without stitching auth/storage/DB separately |
| **Overlap** | **Payload** (CMS), **Better Auth + Drizzle** (auth+data), **Directus** (SQL admin) — bknd bundles all three vibes |
| **Caveat** | **Beta** (docs: not recommended for production until v1); younger ecosystem (~2024) |
| **Trial** | `npx bknd create` on throwaway branch — compare vs Better Auth spike for Next-Flick |

**Default new Next.js app stack (Hermes recommendation):**

```
shadcn/ui + Tailwind v4 + Zod + React Hook Form + TanStack Query (when client state)
Drizzle + pg0 (data) + Better Auth or Payload (pick one role — don't triple-stack)
```

---

## Hermes / project mapping

| Project | UI | Forms / validation | Client data | Auth | CMS | DB |
|---------|-----|-------------------|-------------|------|-----|-----|
| **MyStudioChannel** | shadcn pattern | **Zod + RHF** ✅ | RSC / Payload | Payload Auth | **Payload** ✅ | SQLite → Hostinger |
| **Next-Flick** | Custom Tailwind | Clerk forms only | RSC loaders | Clerk → **Better Auth?** | None | pg0 + Neon |
| **JonBeatz / showcase** | shadcn + motion skills | Zod when forms | Optional Query | N/A | Payload or Sanity | Static |
| **MSC-Projectz** | shadcn | Zod + RHF | — | Payload | Payload | SQLite |

---

## Review queue (stack options)

| Date | Topic | Top pick | Status |
|------|-------|----------|--------|
| 2026-07-07 | Auth local-first | Better Auth | **ADOPT** — spike when Jon says go |
| 2026-07-07 | CMS greenfield | Payload (existing) | **IN USE** on MSC |
| 2026-07-07 | DB sovereignty | Hostinger VPS Postgres | WATCH — migrate off Neon when approved |
| 2026-07-07 | MD editor | MarkText | WATCH — Jon trialing |
| 2026-07-07 | Frontend stack | shadcn + Zod + RHF + TanStack Query | **IN USE / ADOPT** — see Frontend section |
| 2026-07-07 | Embedded BaaS | bknd (beta) | WATCH — Firebase alt; overlap Better Auth/Drizzle |

---

## Related repo docs

| Project | Doc |
|---------|-----|
| Next-Flick auth | `.cursor/docs/NEXT-FLICK-AUTH-NOTES.md` |
| Next-Flick DB | `.cursor/docs/NEXT-FLICK-DATABASE-NOTES.md` |
| Next-Flick backlog | `.cursor/docs/NEXT-FLICK-BACKLOG.md` |
| JonBeatz Hermes models | `.cursor/docs/HERMES-MODEL-PICKER.md` |
| JonBeatz MD editors | `.cursor/docs/ReCall.md` (parked) |
