# Master Ecosystem Audit — JonBeatz / Hermes

**Generated:** 2026-07-07  
**Operator:** Jon (JonBeatz)  
**Scope:** `D:\Hermes`, `D:\Hermes\projects`, `D:\Cursor_Projectz` (MSC trio), **`%LOCALAPPDATA%\hermes`** (root + profiles + config.yaml), Cursor global MCPs  
**Secrets policy:** This file lists **env var names, paths, and status only** — never live key values.  
**Live secrets backup:** `G:\Hermes_Project_BackUpz\MASTER-ECOSYSTEM-AUDIT\2026-07-07-SECRETS-BACKUP.local.md` (external drive — **do not commit**)

---

## How to use this doc

| Need | Go to |
|------|--------|
| **Daily cheat sheet** | **[TOOL-CHEST-INDEX.md](./TOOL-CHEST-INDEX.md)** ← start here |
| **Full stack catalog (core + options)** | **[TOOLS-STACK-OPTIONS.md](./TOOLS-STACK-OPTIONS.md)** |
| Copy-paste API keys | `MASTER-SECRETS-INVENTORY.local.md` (gitignored — `npm run ecosystem:audit`) |
| Where each key lives (no values) | [CREDENTIALS-MANIFEST.md](./CREDENTIALS-MANIFEST.md) |
| What's configured vs missing keys | §4 Env inventory + [TOOLS-SETUP-STATUS.md](./TOOLS-SETUP-STATUS.md) |
| Tool grades & paid/free tags | [TOOLS-WATCHLIST.md](./TOOLS-WATCHLIST.md) |
| Every env var definition | [ENV-VARS-REFERENCE.md](../ENV-VARS-REFERENCE.md) |
| MCP key requirements | §5 MCP catalog |
| Per-app stack | §6 Tech stacks |
| Production URLs | §2 Live sites |
| Copy all secrets for offline backup | `G:\...\2026-07-07-SECRETS-BACKUP.local.md` |

**Refresh ritual:** Re-run env audit script or ask Draven to regenerate after adding a new service. Update `TOOLS-SETUP-STATUS.md` when a tool moves NEEDS_KEY → READY.

---

## 1. Executive summary

| Layer | Status (2026-07-07) |
|-------|---------------------|
| **AI daily driver** | DeepSeek via LiteLLM `:4000` + OpenRouter `*-or` aliases — **READY** |
| **Local LLM** | LM Studio `:1234` (qwen3-4b) — **READY** |
| **Memory** | Mem0 + Qdrant per-profile + Draven cross-project — **READY** |
| **Voice** | OmniVoice CPU + Edge Ryan fallback — **READY** |
| **Telegram agent** | Gateway + Hermes Desktop — **READY** |
| **Cursor bridge** | ngrok `:4040` when LiteLLM ngrok on — **READY** |
| **Image gen** | HF cloud + fal.ai bonus + ComfyUI local `:8188` — **READY** (ComfyUI start on demand) |
| **Hosting** | Hostinger (primary), Spaceship/cPanel (MSC-Projectz), SiteGround (Kristina-Irwin) — **READY** |
| **MCPs** | 16 global + project overlays — mostly **READY**; Stripe/Firebase/Vercel = plugin login when needed |

**Master env source:** `D:\Hermes\projects\_core-scripts\.env.local.master` (105 keys set)  
**Hub profile:** `D:\Hermes\projects\JonBeatz\.env.local` (93 keys set)

---

## 2. Live sites & deployment map

| Site / product | URL | Host | Repo / branch | Notes |
|----------------|-----|------|---------------|-------|
| **Next-Flick** | https://next-flick.com | Hostinger Node | `Next-Flick` · prod v5 @ frozen branch | v6 dev local only until milestone deploy |
| **MyStudioChannel** | https://mystudiochannel.com | Hostinger Node | `MyStudioChannel` · MSC-Website-v10 | Payload CMS + MSC PRO ENGINE |
| **JonBeatz (gold)** | https://jon-beatz.com | Hostinger static | `JonBeatz` | Static export |
| **JonBeatz.dev** | https://jonbeatz.dev | Hostinger static | `JonBeatz.dev` | Red variant site |
| **MSC-Projectz** | https://jon-beatz.com | Spaceship cPanel | `MSC-Projectz` | Private ops dashboard (same domain, different host than gold static) |
| **DigitalStudioz** | GitHub Pages preview | GitHub Pages | `DigitalStudioz` | Prod target `digitalstudioz.dev` |
| **Kristina-Irwin** | https://kristinairwin.com | SiteGround | `Kristina-Irwin` | Netlify previews also |
| **Hermes analytics** | http://127.0.0.1:7680 | Local | TokenTracker | Spend dashboard |
| **Hermes sessions** | http://127.0.0.1:8080 | Local | AgentsView | Session search |
| **LiteLLM** | http://127.0.0.1:4000/v1 | Local | `_core-scripts/deepseek-api` | Cursor + Hermes + Telegram |
| **LM Studio** | http://127.0.0.1:1234 | Local | Desktop app | Mem0 inference |
| **ComfyUI** | http://127.0.0.1:8188 | Local | `H:\AI_Models\ComfyUI` | GPU pipeline — start manually |
| **Next-Flick dev** | http://localhost:3000 | Local | `Next-Flick` v6 | pg0 `:5433` |

---

## 3. Services — paid vs free & subscription map

### Paid / pay-per-use (active)

| Service | Billing | Used for | Config status | Primary env vars |
|---------|---------|----------|---------------|------------------|
| **DeepSeek API** | Pay-per-token | Daily LLM via LiteLLM | ✅ SET | `DEEPSEEK_API_KEY`, `MSC_LITELLM_MASTER_KEY` |
| **OpenRouter** | Pay-per-use | LiteLLM `*-or` model aliases (~22) | ✅ SET (JonBeatz, Next-Flick) | `OPENROUTER_API_KEY` |
| **ngrok** | Paid plan | Cursor ↔ LiteLLM tunnel | ✅ SET | `NGROK_AUTHTOKEN` |
| **Hostinger** | Hosting subscription | next-flick.com, mystudiochannel.com, jonbeatz sites | ✅ SET | `HOSTINGER_API_TOKEN`, FTP/SSH vars |
| **Clerk** | SaaS (free tier + usage) | Next-Flick auth | ✅ SET | `CLERK_SECRET_KEY`, `NEXT_PUBLIC_CLERK_*` |
| **Neon** | SaaS Postgres | Next-Flick prod DB | ✅ SET | `NEON_DATABASE_URL` |
| **TMDB** | Free API key | Next-Flick metadata | ✅ SET | `TMDB_API_KEY`, `TMDB_API_Read_Access_Token` |
| **Resend** | Email SaaS | MSC + MSC-Projectz email | ✅ SET (MSC) | `RESEND_API_KEY` |
| **AgentMail** | Agent inbox API | Hermes agent email (on deck) | ✅ SET (Next-Flick) | `AGENTMAIL_API_KEY` |
| **Sentry** | SaaS | MSC error monitoring | ✅ SET (MSC) | `SENTRY_*` |
| **fal.ai** | Per-image/video | Bonus image/video pipeline | ✅ SET | `FAL_API_KEY` |
| **Hugging Face** | Free tier + optional paid | Cloud image inference | ✅ SET | `HF_TOKEN` |
| **Tavily** | API credits | Web search MCP | ✅ SET | `TAVILY_API_KEY` |
| **Browserbase** | Cloud browser SaaS | MCP automation | ✅ SET | `BROWSERBASE_API_KEY`, `BROWSERBASE_PROJECT_ID` |
| **Composio** | Freemium | Social automation MCP | ✅ SET (optional use) | `COMPOSIO_API_KEY` |
| **Google Cloud / Vertex** | GCP billing | MSC LiteLLM Vertex bridge, VPE | ✅ SET (MSC) | `GOOGLE_APPLICATION_CREDENTIALS`, `GOOGLE_CLOUD_*` |
| **Google Workspace (personal)** | Free (Gmail/Drive/Docs OAuth) | Hermes skill, Telegram, Cursor | ✅ AUTHENTICATED | `jonbeatz@gmail.com` — token at `%LOCALAPPDATA%\hermes\profiles\jonbeatz\google_token.json` |
| **Netlify** | Free/paid | Kristina-Irwin previews | ✅ SET | `NETLIFY_AUTH_TOKEN` |
| **SiteGround** | Hosting | kristinairwin.com prod | ✅ SET | `SITEGROUND_*` |
| **Namecheap** | Registrar | DNS/domain ops | ✅ SET (KI) | `NAMECHEAP_*` |
| **Spaceship** | Hosting | MSC-Projectz on jon-beatz.com | ✅ ACTIVE | Hosting only — **Spacemail SMTP retired** (Jon 2026-07-07) |
| **Cursor** | Subscription | IDE | ✅ SET | `CURSOR_API_KEY` (JonBeatz hub) |
| **Parallel** | API | Documented in env | ✅ SET | `PARALLEL_API_KEY` |
| **Postiz** | Self-host / API | MSC social module | ✅ SET (MSC) | `POSTIZ_API_*` |
| **muapi.ai** | Wallet | VaderLabz + Open-Generative-AI path | ✅ SET (VaderLabz) | `MUAPI_API_KEY` |
| **Vercel** | SaaS | Analytics token in MSC | ✅ SET | `VERCEL_API_TOKEN` |

### Free / local (production)

| Service | Role | Config |
|---------|------|--------|
| **LM Studio** | Local LLM `:1234` | No key |
| **Mem0 + Qdrant** | Per-project memory | `MEM0_API_KEY` (local service key) |
| **OmniVoice** | Draven TTS CPU | `OMNIVOICE_PYTHON` path |
| **ComfyUI** | Local GPU images | Path vars only — no API key |
| **Context7, fetch, Playwright, filesystem, sequential-thinking, markdownify, vault, terminal-controller** | MCPs | No keys |
| **Obsidian Vader Vault** | Cross-project knowledge | `H:\Vader_Vault` |
| **TokenTracker / AgentsView** | Local analytics | No keys |
| **SQLite** | MSC, MSC-Projectz, VPE registry | File DB |

### Needs attention (not 100% ready)

| Service | Status | Action |
|---------|--------|--------|
| **Firecrawl MCP** | NEEDS_KEY in some profiles | `FIRECRAWL_API_KEY` — set in master ✅; Node-Launcher `.env.local` empty |
| **MSC-Projectz outbound email** | DEFERRED | Spacemail retired — configure via Payload admin `emailSettings` or new provider when needed |
| **Stripe MCP** | NEEDS_LOGIN | Plugin OAuth when billing tasks |
| **Vercel / Firebase MCP** | NEEDS_LOGIN | Plugin OAuth when deploy/mobile tasks |
| **Pencil MCP** | NEEDS_LOGIN | Desktop app must run |
| **Groq Whisper** | OPTIONAL | `%USERPROFILE%\.config\watch\.env` → `GROQ_API_KEY` |
| **Node-Launcher MCP keys** | PARTIAL | 15 empty keys in `.env.local` — uses global Cursor MCPs instead |

---

## 4. Environment files inventory

Audit date: **2026-07-07**. “Set” = non-empty value present. Values are **not** listed here.

| File | Keys set | Empty / missing | Notes |
|------|----------|-----------------|-------|
| `_core-scripts\.env.local.master` | 105 | 1 (`MSC_LITELLM_DATABASE_URL`) | Canonical secret store |
| `JonBeatz\.env.local` | 93 | 0 | Hub — includes OpenRouter, Clerk, TMDB, Cursor |
| `JonBeatz.dev\.env.local` | 14 | 0 | Minimal — Mem0 + LM Studio + MCP keys |
| `Next-Flick\.env.local` | 110 | 0 | Full merge — Neon, Clerk, TMDB, Telegram, DeepSeek |
| `VaderLabz\.env.local` | 10 | 0 | Lab — includes `MUAPI_API_KEY` |
| `DigitalStudioz\.env.local` | 91 | 0 | Near-full Hermes stack |
| `Kristina-Irwin\.env.local` | 26 | 0 | SiteGround + Netlify + Mem0 |
| `MyStudioChannel\.env.local` | 63 | 0 | Payload, Hostinger, Sentry, Vertex, social |
| `MSC-Projectz\.env.local` | 5 | 2 legacy SMTP vars empty | Spacemail retired — env SMTP optional |
| `Node-Launcher-v2\.env.local` | 3 | 15 | Google cred paths only — rest via global MCP |
| `hermes\profiles\jonbeatz\.env` | 5 | 0 | Telegram mirror for Hermes Desktop |

### Additional env files (full-disk scan 2026-07-07)

The recursive scan found **~100+ env files** across the machine. Below: **active** paths worth knowing; archives/backups are omitted from secrets backup unless noted.

| Category | Path | Notes |
|----------|------|-------|
| **LiteLLM runtime** | `_core-scripts\deepseek-api\.env.local` | Active LiteLLM start env (synced from master) |
| **Hermes Desktop root** | `%LOCALAPPDATA%\hermes\.env` | Telegram mirror (synced from JonBeatz) |
| **Hermes Desktop** | `%LOCALAPPDATA%\hermes\profiles\jonbeatz\.env` | Telegram + profile secrets |
| **Hermes Desktop** | `%LOCALAPPDATA%\hermes\profiles\msc\.env` | MSC Hermes profile |
| **Hermes config (LiteLLM keys)** | `%LOCALAPPDATA%\hermes\config.yaml` + `profiles\*\config.yaml` | `api_key`, `base_url` — in secrets backup as YAML |
| **Hermes OAuth / state** | `%LOCALAPPDATA%\hermes\google_*.json`, `auth.json`, `gateway_state.json` | See CREDENTIALS-MANIFEST Hermes inventory table |
| **Hermes apps** | `D:\Hermes\apps\3DGenStudio\.env` | 3D Kanban studio |
| **Hermes apps** | `D:\Hermes\apps\hermes-workspace\.env` | Workspace app |
| **Hermes apps** | `D:\Hermes\apps\TaskBoardAI\.env` | Task board |
| **Mobile** | `D:\Hermes\mobile-dev\apps\Jedi-iOS\.env.local` | Flutter iOS project |
| **Profile assets** | `D:\Hermes\assets\hermes-profiles\jonbeatz\`, `msc\` | Hermes profile copies |
| **MGR** | `D:\Cursor_Projectz\MGR\.env` | Cross-tool task manager |
| **VPE** | `Node-Launcher-v2\.env` | Additional to `.env.local` |
| **Archives** | `Cursor_AI_Assetz\`, `Cursor-BackUp-Projects\`, `_core-scripts\_archive\` | Legacy — do not treat as source of truth |

**Canonical active set** for backup: master + all `D:\Hermes\projects\*\`.env.local` + MSC trio + Hermes profiles + `deepseek-api\.env.local`.

### Key services by env file (set = configured)

| Env var(s) | Master | JonBeatz | Next-Flick | MSC | MSC-Proj | KI | VaderLabz |
|------------|:------:|:--------:|:----------:|:---:|:--------:|:--:|:---------:|
| `DEEPSEEK_API_KEY` | ✅ | ✅ | ✅ | ✅ | — | — | — |
| `OPENROUTER_API_KEY` | — | ✅ | ✅ | — | — | — | — |
| `NGROK_AUTHTOKEN` | ✅ | ✅ | ✅ | ✅ | — | — | — |
| `MEM0_*` | ✅ | ✅ | ✅ | ✅ | — | ✅ | ✅ |
| `TELEGRAM_*` | ✅ | ✅ | ✅ | ✅ | — | — | — |
| `HF_TOKEN` / `FAL_API_KEY` | ✅ | ✅ | ✅ | ✅ | — | — | — |
| `GITHUB_PAT` | ✅ | ✅ | ✅ | ✅ | — | — | — |
| `TAVILY_API_KEY` | ✅ | ✅ | ✅ | ✅ | — | — | ✅ |
| `HOSTINGER_API_TOKEN` | ✅ | ✅ | ✅ | ✅ | — | — | ✅ |
| `CLERK_*` | — | ✅ | ✅ | — | — | — | — |
| `NEON_DATABASE_URL` | — | — | ✅ | — | — | — | — |
| `TMDB_*` | — | ✅ | ✅ | — | — | — | — |
| `RESEND_API_KEY` | ✅ | ✅ | ✅ | — | — | — | — |
| `SENTRY_*` | — | — | — | ✅ | — | — | — |
| `GOOGLE_CLOUD_*` | — | — | — | ✅ | — | — | — |
| `SITEGROUND_*` | — | — | — | — | — | ✅ | — |
| `MUAPI_API_KEY` | — | — | — | — | — | — | ✅ |

---

## 5. MCP catalog

### 5.1 Cursor global (`C:\Users\JONBEATZ\.cursor\mcp.json`)

| Server | Key required | Status |
|--------|--------------|--------|
| filesystem | No | READY |
| github | `GITHUB_PERSONAL_ACCESS_TOKEN` | READY |
| context7 | No | READY |
| tavily | `TAVILY_API_KEY` | READY |
| hostinger-dns / hosting / vps / domains | `HOSTINGER_API_TOKEN` | READY |
| fetch | No | READY |
| playwright | No | READY |
| desktop-commander | No | READY |
| sequential-thinking | No | READY |
| terminal-controller | No | READY |
| vault | No (local `H:\Vader_Vault`) | READY |
| fal-ai | `FAL_API_KEY` | READY |
| browsermcp | No | READY |

### 5.2 Workspace plugins (Cursor — no repo JSON)

| Plugin | Auth | When to use |
|--------|------|-------------|
| cursor-ide-browser | Built-in | Default browser automation |
| stripe | Plugin login / `STRIPE_API_KEY` | Billing |
| vercel | Plugin login | Deploy |
| firebase | Plugin login | Mobile/Firebase |
| user-payload | Project | MSC Payload admin |
| user-playwright | No | Headed assist tests |

### 5.3 Project overlays

| Profile | Servers |
|---------|---------|
| **JonBeatz** | 21st-dev-magic, browserbase, composio, markdownify, pencil, comfyui |
| **Next-Flick / VaderLabz** | Bootstrap template: github, context7, tavily, hostinger×4, stripe, firebase, fetch, playwright, desktop-commander, comfyui (off) |
| **MyStudioChannel** | context7, local-wp, mcp-wordpress, browserbase, 21st-dev-magic, markdownify, composio |
| **Node-Launcher-v2** | firecrawl, docker, google-workspace, instawp, elementor-mcp, woocommerce-mcp, animate-ui, novamira WP locals×4, msc-v1 |

**Sync command:** `npm run sync:mcp-env` (Hermes profiles) or `npm run msc:sync:mcp-env` (MSC)

---

## 6. Tech stacks at our disposal

> **Expanded catalog:** [TOOLS-STACK-OPTIONS.md](./TOOLS-STACK-OPTIONS.md) — core **IN USE** (Node, Next.js, Tailwind, SQLite, …) + researched alternatives.

### Frameworks & languages

| Tech | Versions in use | Projects |
|------|-----------------|----------|
| **Next.js** | 14, 15.4–15.5, 16.2 | Next-Flick, MSC, MSC-Projectz, Node-Launcher renderer, Kristina-Irwin |
| **React** | 19 | All modern web apps |
| **TypeScript** | 5.3–5.7 | All TS projects |
| **Electron** | 28.x | Node-Launcher-v2 |
| **Tauri** | v2 | MSC-Projectz desktop wrapper |

### Styling & UI

| Tech | Projects |
|------|----------|
| **Tailwind CSS** v3 / v4 | All web apps |
| **shadcn/ui** (Radix) | MSC, MSC-Projectz, JonBeatz; Next-Flick = custom Tailwind (shadcn in design refs) |
| **GSAP + ScrollTrigger** | JonBeatz, DigitalStudioz, showcase work |
| **Three.js / R3F** | MSC, Kristina-Irwin, DigitalStudioz |
| **Lenis / Motion / Framer** | Scroll sites, MSC |
| **Clerk Themes** | Next-Flick dark auth |

### Data & ORM

| Tech | Use |
|------|-----|
| **PostgreSQL** | Next-Flick (pg0 local `:5433`, Neon prod) |
| **MySQL** | Hostinger hPanel (available; not used in Hermes Node apps) |
| **SQLite** | MSC Payload, MSC-Projectz Payload, VPE registry |
| **Drizzle ORM** | Next-Flick |
| **Payload CMS** | MSC, MSC-Projectz |
| **better-sqlite3** | MSC, VPE |
| **Mem0 + Qdrant** | All Hermes profiles (isolated collections) |

### Auth

| Tech | Projects |
|------|----------|
| **Clerk** | Next-Flick |
| **Payload Auth** | MSC admin, MSC-Projectz users |

### AI / ML stack

| Tech | Role |
|------|------|
| **LiteLLM** | Proxy `:4000` — DeepSeek, OpenRouter, Vertex |
| **LM Studio** | Local qwen3-4b `:1234` |
| **DeepSeek V4** | Cloud daily driver |
| **OpenRouter** | Model aliases via LiteLLM |
| **Google Vertex / Gemini** | MSC google-api-proxy |
| **Google Workspace OAuth** | jonbeatz@gmail.com — Gmail, Calendar, Drive, Docs, Sheets via Hermes `setup.py` |
| **Hugging Face Inference** | Cloud images |
| **fal.ai** | Image/video API |
| **ComfyUI** | Local GPU workflows |
| **OmniVoice** | CPU TTS (Draven) |
| **muapi.ai** | VaderLabz / Open-Generative-AI cloud |

### Deploy & ops

| Tech | Target |
|------|--------|
| **Hostinger** hPanel Node + FTPS/SSH | Next-Flick, MSC, JonBeatz static |
| **Spaceship cPanel** | MSC-Projectz |
| **SiteGround** | Kristina-Irwin |
| **Netlify** | KI previews |
| **GitHub Pages** | DigitalStudioz preview |
| **ngrok** | LiteLLM tunnel |
| **PM2** | Node-Launcher process management |
| **Playwright / Vitest** | E2E and unit tests |
| **Sentry** | MSC monitoring |

### Messaging & integrations

| Tech | Use |
|------|-----|
| **Telegram Bot API** | Hermes gateway |
| **Resend** | MSC transactional email |
| **Nodemailer** | MSC-Projectz (Payload `emailSettings` or env override; Spacemail retired) |
| **Postiz + Composio** | MSC social automation |
| **WordPress MCP** | MSC local sites, VPE LocalWP |

---

## 7. Hermes profiles (`D:\Hermes\projects`)

| Profile | Purpose | Mem0 collection | MCP | Live |
|---------|---------|-----------------|-----|------|
| **JonBeatz** | Command center / AI hub | `jonbeatz_personal_memories` | Hub overlay (6) | jon-beatz.com |
| **JonBeatz.dev** | Red static site | `jonbeatz_dev` | Hub subset (5) | jonbeatz.dev |
| **Next-Flick** | Family movie app | `next-flick_memories` | Bootstrap (15) | next-flick.com |
| **VaderLabz** | Dev lab | `vaderlabz_memories` | Bootstrap | — |
| **DigitalStudioz** | Studio showcase | `digitalstudioz_memories` | Global only | GH Pages |
| **Kristina-Irwin** | Client campaign | `kristina_irwin` | Global / docs | kristinairwin.com |
| **Open-Generative-AI** | OSS fork (experimental) | — | — | Local only |
| **_core-scripts** | Shared infra | — | Template | LiteLLM, Telegram, voice |

**Draven (cross-project):** `draven_memories` @ `%USERPROFILE%\.mem0\qdrant_draven`

---

## 8. MSC ecosystem (`D:\Cursor_Projectz`)

| Repo | Role | Stack highlight | Deploy |
|------|------|-----------------|--------|
| **MyStudioChannel** | Public site + Payload CMS | Next 15.4, Payload 3.85, SQLite, Sentry, Resend | Hostinger |
| **MSC-Projectz** | Private ops dashboard | Next 16.2, Payload 3.84, SQLite, Tauri | Spaceship |
| **Node-Launcher-v2** | Windows project launcher | Electron 28, Next 15.5 renderer, PM2, Vertex LiteLLM | Desktop EXE |

**Shared infra link:** `D:\Hermes\projects\_core-scripts` (Mem0, deploy patterns, Draven)

---

## 9. Runtime ports & boot stack

| Port | Service | Auto-start |
|------|---------|------------|
| 3000 | Next-Flick dev | On demand (`web:dev`) |
| 1234 | LM Studio | Manual / session |
| 4000 | LiteLLM | `session:start` / `deepseek:on` |
| 4040 | ngrok dashboard | With LiteLLM ngrok |
| 5433 | pg0 PostgreSQL | `db:local` |
| 7680 | TokenTracker | Optional |
| 8080 | AgentsView | Optional |
| 8188 | ComfyUI | Manual |
| 18776 | OmniVoice daemon | Lazy on `draven:speak` |

**Protected stack (Hermes config):** Agents must not `taskkill` LiteLLM/ngrok — operator restarts via JonBeatz npm scripts.

---

## 10. Configuration health checklist

| Check | Command / action | Expected |
|-------|------------------|----------|
| LiteLLM up | `curl http://127.0.0.1:4000/v1/models` | 200 + model list |
| OpenRouter aliases | `npm run deepseek:test:openrouter` (JonBeatz) | PASS |
| Mem0 | `npm run mem0:preflight` | LM Studio + collection OK |
| MCP keys synced | `npm run sync:mcp-env` | Keys in Cursor MCP JSON |
| Next-Flick local | `npm run web:verify-local` | Build + smoke PASS |
| MSC live | `npm run msc:verify:live` (MSC repo) | HTTP 200 |
| Tools queue | `npm run tools:status` | Config queue counts |
| MSC-Projectz email | Configure in Payload admin when needed | Verification mail delivers |

---

## 11. Backup & related paths

| Resource | Path |
|----------|------|
| **This audit (safe)** | `D:\Hermes\projects\_core-scripts\shared-profile-content\docs\MASTER-ECOSYSTEM-AUDIT.md` |
| **Secrets backup (PRIVATE)** | `G:\Hermes_Project_BackUpz\MASTER-ECOSYSTEM-AUDIT\2026-07-07-SECRETS-BACKUP.local.md` |
| **Profile backups** | `G:\Hermes_Project_BackUpz\` (`npm run backup:quick`) |
| **Master env** | `D:\Hermes\projects\_core-scripts\.env.local.master` |
| **Vader Vault** | `H:\Vader_Vault` |
| **AI models** | `H:\AI_Models` (ComfyUI, caches) |
| **Hermes profile** | `C:\Users\JONBEATZ\AppData\Local\hermes\profiles\jonbeatz` |

---

## 12. Related documentation index

| Doc | Path |
|-----|------|
| ENV registry | `shared-profile-content\ENV-VARS-REFERENCE.md` |
| Tools setup matrix | `shared-profile-content\docs\TOOLS-SETUP-STATUS.md` |
| Tools watchlist | `shared-profile-content\docs\TOOLS-WATCHLIST.md` |
| Hostinger ops | Per-profile `.cursor\docs\HOSTINGER-REFERENCE.md` |
| Next-Flick TRUTH | `Next-Flick\TRUTH.md` |
| MSC TRUTH | `MyStudioChannel\TRUTH.md` |
| Ecosystem upgrades map | `_core-scripts\UPGRADES-SYSTEMS.md` |
| Vault watchlist mirror | `H:\Vader_Vault\04_Research\Repo-Watchlist.md` |

---

## 13. Operator notes

- **MSC-Projectz email (2026-07-07):** Spacemail SMTP is **no longer used**. Outbound mail is deferred until a new provider is chosen (Payload admin `emailSettings` or future Resend/other).
- **Stripe:** Test playground in MSC docs only — no production Stripe in MSC / MSC-Projectz / Next-Flick runtime.
- **Refresh secrets backup:** Say “refresh ecosystem audit” to re-export `G:\...\SECRETS-BACKUP.local.md`.

---

*Maintainer: update after any new service signup, MCP install, or prod deploy. Never commit secret values to this file.*
