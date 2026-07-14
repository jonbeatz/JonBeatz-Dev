# Tools Setup Status — Hermes Ecosystem

**Start here:** [TOOL-CHEST-INDEX.md](./TOOL-CHEST-INDEX.md) · **Refresh keys map:** `npm run ecosystem:audit`

**Canonical home:** `D:\Hermes\projects\_core-scripts\shared-profile-content\docs\TOOLS-SETUP-STATUS.md`  
**Grades & summaries:** [TOOLS-WATCHLIST.md](./TOOLS-WATCHLIST.md) · **Deep dives:** [TOOLS-REFERENCE.md](./TOOLS-REFERENCE.md)  
**Env var registry:** [../ENV-VARS-REFERENCE.md](../ENV-VARS-REFERENCE.md) · **Live values:** `D:\Hermes\projects\_core-scripts\.env.local.master`  
**Vault mirror:** `H:\Vader_Vault\04_Research\Repo-Watchlist.md`

Use this doc to see what is **100% ready** vs what still needs **API keys**, **OAuth**, **service start**, or **install**.

---

## Setup status legend

| Status | Meaning |
|--------|---------|
| **READY** | Installed + configured — works now (may still need a local service running, e.g. LM Studio) |
| **PARTIAL** | Installed; core works but optional key/step missing, or service must be started on demand |
| **NEEDS_KEY** | Needs API token / env var in `.env.local` (check `.env.local.master` first) |
| **NEEDS_LOGIN** | Needs account OAuth, burner login, or desktop app running |
| **NOT_INSTALLED** | Approved on deck — install when Jon says go |
| **SKIP** | Evaluated — not pursuing |

**Credential rule:** Never commit keys. Set in project `.env.local` → run `npm run sync:mcp-env` (where applicable). Master copy: `_core-scripts/.env.local.master`.

---

## Configuration queue (needs attention later)

Tools **not 100% ready** — configure when you want full capability:

| Priority | Tool | Status | What to do | Env / path |
|----------|------|--------|------------|------------|
| P3 | **claude-video Whisper** | PARTIAL | Add Groq key for caption-less videos | `%USERPROFILE%\.config\watch\.env` → `GROQ_API_KEY` (see `.env.example`) |
| P3 | **Firecrawl MCP** | NEEDS_KEY | Add key if enabling MCP (skills already vendored) | `FIRECRAWL_API_KEY` in `.env.local` |
| P3 | **Composio** | PARTIAL | Key in manifest; disable in Cursor if unused | `COMPOSIO_API_KEY` |
| P3 | **Penpot** | NOT_INSTALLED | Self-host or Penpot Cloud + MCP setup | Penpot account / self-host URL |
| P3 | **React Bits Pro** | NEEDS_KEY | Only if buying Pro tier | Pro license at reactbits.dev |
| P4 | **NeuTTS** | NOT_INSTALLED | Install on approval; needs ref wav + transcript for clone | HuggingFace GGUF models |
| P4 | **OmniVoice-Studio** | NOT_INSTALLED | Install on approval; GPU optional | Desktop app + AGPL |
| P4 | **LuxTTS** | NOT_INSTALLED | Install on approval; ~1 GB VRAM when GPU path | Python venv / GPU |

Everything else in **production** below is configured on Jon's PC (2026-07-04) unless marked PARTIAL for runtime (start service when needed).

---

## Production stack — setup matrix

| Tool | Grade | Setup | Keys / connection | Where configured | Runtime notes |
|------|-------|-------|-------------------|------------------|---------------|
| **DeepSeek + LiteLLM** | A | READY | `DEEPSEEK_API_KEY`, `MSC_LITELLM_MASTER_KEY` | `.env.local` | `:4000` — session:start auto-starts |
| **LM Studio + qwen3-4b** | A- | READY | None (local) | LM Studio GUI + `.env.local` ctx | `:1234` — 16384 ctx, parallel 1 |
| **Mem0 + Qdrant** | A | READY | `MEM0_API_KEY` | `.env.local` per profile | `npm run mem0:preflight` |
| **Draven Mem0** | A | READY | (hardcoded collection) | `scripts/draven-mem0.ps1` | Cross-project — `npm run draven:add` |
| **Telegram gateway** | A- | READY | `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `TELEGRAM_ALLOWED_USERS` | `.env.local` + profile `.env` | `npm run telegram:ensure` |
| **ngrok (Cursor bridge)** | A- | READY | `NGROK_AUTHTOKEN` | `.env.local` | `:4040` when LiteLLM ngrok on |
| **OmniVoice Draven** | A- | READY | `OMNIVOICE_PYTHON` (path) | `.env.local` | Lazy start on ritual speak |
| **Context7 MCP** | A | **READY** | **None** | MCP manifest | Always on |
| **filesystem MCP** | A | **READY** | **None** | Built-in | Always on |
| **fetch MCP** | A- | **READY** | **None** | MCP manifest | Always on |
| **sequential-thinking MCP** | A- | **READY** | **None** | MCP manifest | Always on |
| **Playwright MCP** | A- | **READY** | **None** | MCP manifest | Browser on demand |
| **desktop-commander MCP** | A- | **READY** | **None** | MCP manifest | Terminal access |
| **cursor-ide-browser MCP** | A- | **READY** | **None** | Cursor built-in | Browser tab automation |
| **GitHub MCP** | A- | READY | `GITHUB_PERSONAL_ACCESS_TOKEN` | `.env.local` | `sync:mcp-env` |
| **Tavily MCP** | A- | READY | `TAVILY_API_KEY` | `.env.local` | `sync:mcp-env` |
| **Hostinger MCPs** (4) | A- | READY | `HOSTINGER_API_TOKEN` | `.env.local` | DNS / hosting / VPS / domains |
| **Stripe MCP** | B+ | NEEDS_LOGIN | `STRIPE_API_KEY` (when billing tasks) | `.env.local` | Plugin — use when needed |
| **Vercel MCP** | B+ | NEEDS_LOGIN | Vercel login via plugin | Cursor plugin auth | Deploy tasks only |
| **Firebase MCP** | B+ | NEEDS_LOGIN | Firebase project via plugin | Cursor plugin auth | When mobile/Firebase work |
| **vault MCP** | B+ | **READY** | **None** (local path) | `H:\Vader_Vault` | Obsidian vault filesystem |
| **ComfyUI MCP** | A- | PARTIAL | `COMFYUI_ROOT`, `COMFYUI_URL` — **no API key** | `.env.local` + MCP | **Start ComfyUI** `:8188` first |
| **Hugging Face image:gen** | A | READY | `HF_TOKEN` | `.env.local` | `npm run image:gen` — cloud, zero VRAM |
| **fal.ai** | B+ | READY | `FAL_API_KEY` | `.env.local` | Optional paid bonus pipeline |
| **Obsidian Copilot** | B+ | PARTIAL | LM Studio or LiteLLM URL in plugin | Obsidian plugin settings | Vault chat — local LLM |
| **claude-video `/watch`** | A- | PARTIAL | **Optional** `GROQ_API_KEY` | `%USERPROFILE%\.config\watch\.env` | **YouTube captions = no key.** Skill installed globally |
| **21st-dev Magic MCP** | B | READY | `21ST_DEV_MAGIC_API_KEY` | `.env.local` | UI component registry |
| **Browserbase MCP** | B | READY | `BROWSERBASE_API_KEY`, `BROWSERBASE_PROJECT_ID` | `.env.local` | Cloud browser |
| **Pencil MCP** | B | NEEDS_LOGIN | None — **desktop app** | Pencil.dev app | App must be running |
| **Composio MCP** | B | PARTIAL | `COMPOSIO_API_KEY` | `.env.local` | Optional — disable if unused |
| **markdownify MCP** | B | **READY** | **None** | MCP manifest | URL/PDF → Markdown |
| **fal-ai MCP** | B+ | READY | `FAL_API_KEY` | `.env.local` | Cloud image bonus pipeline |
| **terminal-controller MCP** | B | **READY** | **None** | MCP manifest | Terminal automation alt |
| **Agent-Reach CLI** | B+ | PARTIAL | None (venv); optional login for social | `%USERPROFILE%\.agent-reach-venv` | 7/15 channels; `npm run agent-reach:doctor` |
| **Hermes motion baseline** | A | **READY** | **None** (npm only) | `gsap`, `@gsap/react`, `lenis`, `split-type`, `three`, R3F, `motion` | JonBeatz, JonBeatz.dev, DigitalStudioz, VaderLabz — `npm run scroll:motion:status` |
| **GSAP agent skills (global)** | A- | **READY** | **None** | `~\.agents\skills\gsap-*` | `npx skills add https://github.com/greensock/gsap-skills -g -a cursor` |
| **Hallmark (global skill)** | B+ | **READY** | **None** | `~\.agents\skills\hallmark` | `npm run skills:hallmark:install` |
| **emilkowalski/skills (fleet)** | A- | **READY** | **None** | `shared-profile-content/skills/emil-design-eng` (+ 4 siblings) → `.cursor/skills` via `sync:skills` | `npm run skills:emil:install` · `npm run skills:emil:status` |
| **Claude Blog (global skills)** | B | **READY** | Optional Gemini for images | `~\.agents\skills\blog*` + `~\.claude\scripts\` | `npm run skills:claude-blog:install` + `skills:claude-blog:scripts` |
| **find-skills** | A- | **READY** | **None** | `~\.agents\skills\find-skills` | `npx skills add vercel-labs/skills --skill find-skills -g -a cursor` |
| **Claude Watch** | B+ | PARTIAL | Optional `GROQ_API_KEY` (Whisper) | `~\.agents\skills\claude-watch` | Study notes from video; complements claude-video |
| **Agent Browser CLI** | B+ | **READY** | **None** | `agent-browser` global + Chrome @ `~\.agent-browser\` | `npm i -g agent-browser && agent-browser install` |
| **Agent Skills (Osmani)** | B | **READY** | **None** | `~\.agents\skills\spec-driven-development` etc. | Cherry-pick; overlaps Hermes rituals |

---

## Evaluated tools — setup matrix

| Tool | Grade | Verdict | Setup | Keys / connection | Install / configure |
|------|-------|---------|-------|-------------------|---------------------|
| **claude-video** | A- (92) | IN USE | PARTIAL | Optional `GROQ_API_KEY` | Done — `npx skills add … -g -a cursor` |
| **Agent-Reach** | B+ (87) | IN USE | PARTIAL | Free; optional login for Twitter/Reddit | Installed 2026-07-04 — venv + `agent-reach install --env=auto --safe` |
| **React Bits** | B+ (88) | WATCH | **READY** (free) | Pro = paid license only | Browse/copy — no install |
| **Firecrawl MCP** | B+ (86) | WATCH | NEEDS_KEY | `FIRECRAWL_API_KEY` | Enable in MCP + key; skills exist |
| **Penpot** | B (82) | WATCH | NOT_INSTALLED | Self-host or cloud account | penpot.app + MCP when needed |
| **Composio** | B (84) | WATCH | PARTIAL | `COMPOSIO_API_KEY` | Already in JonBeatz manifest |
| **NeuTTS** | A- (90) | WATCH | NOT_INSTALLED | None (local HF models) | Clone TTS — ref wav + transcript on install |
| **OmniVoice-Studio** | B+ (87) | WATCH | NOT_INSTALLED | None (local desktop) | GUI + MCP hub — install on approval |
| **LuxTTS** | B (86) | WATCH | NOT_INSTALLED | None (local) | GPU ~1 GB VRAM for fast clone path |
| **find-skills** | A- (91) | IN USE | **READY** | None | Installed 2026-07-04 — `npx skills find [query]` |
| **Hallmark** | B+ (88) | IN USE | **READY** | None | Installed 2026-07-04 — `npm run skills:hallmark:install` |
| **emilkowalski/skills** | A- (90) | **IN USE** | **READY** | None | Installed 2026-07-13 — 5 skills; `npm run skills:emil:status` |
| **Claude Blog** | B (84) | IN USE | **READY** | Optional `GOOGLE_AI_API_KEY` (hero images) | Installed 2026-07-04 — skills + `npm run skills:claude-blog:scripts` |
| **Claude Watch** | B+ (88) | IN USE | PARTIAL | Optional `GROQ_API_KEY` | Installed 2026-07-04 — persistent study notes |
| **Agent Browser** | B+ (86) | IN USE | **READY** | None (local Chrome) | Installed 2026-07-04 — CLI; MCP optional |
| **AgentMail** | A- (91) | **ADOPT** | PARTIAL | `AGENTMAIL_API_KEY` | Key SET Next-Flick `.env.local` (2026-07-07); install SDK/MCP on first use |
| **Agent Skills (Osmani)** | B (84) | IN USE | **READY** | None | Installed 2026-07-04 — cherry-pick vs rituals |
| **devini-tea** | A (93) | REF | **READY** | None | Reference repo — see SCROLL-3D-REFERENCES |
| **cinematic-scroll-skill** | A- (92) | **ADOPT** | **READY** | None (vault clone) | Vendored `D:\Hermes\assets\3d-web-workflows\cinematic-scroll-skill` — `npm run vault:cinematic-scroll-skill`; `npm install` in vault for doctor |
| **scroll-cinematic-claude** | B (84) | WATCH | NOT_INSTALLED | Higgsfield MCP key if used | Overlaps fal `video:fal`; study only unless Higgsfield MCP adopted |
| **fullPage.js** | B- (82) | WATCH | NOT_INSTALLED | Commercial license for paid sites | Section-based scroll — alt pattern to Lenis chapters |
| **codebase-memory-mcp** | A- (92) | **IN USE** | **READY** | None (static binary) | Binary: `%USERPROFILE%\.local\bin\`; index per repo. Script: `shared-profile-content/scripts/codebase-memory-status.ps1` |
| **OpenMontage** | A- (90) | **IN USE** | **READY**‡ | `FAL_KEY` | Install: `D:\Hermes\assets\openmontage` (fleet vault). Script: `shared-profile-content/scripts/openmontage-status.ps1` |
| **profile-health-watchdog** | — | **IN USE** | **READY** | None (Hermes cron) | Fleet LiteLLM key probe — 7 profiles every 6h; Telegram alert on auth failure; silent = healthy |
| **agency-agents** | B+ (86) | WATCH | NOT_INSTALLED | None | Cherry-pick agents only — `install.sh --tool cursor` or Hermes plugin |
| **AnythingLLM** | B (83) | WATCH | NOT_INSTALLED | LLM keys (DeepSeek/LM Studio via LiteLLM) | Desktop/Docker RAG app — overlaps Hermes Desktop; study patterns only |
| **Open Notebook** | B- (82) | WATCH | NOT_INSTALLED | Docker + optional LLM keys | `:8502` UI · `:5055` API · SurrealDB `:8000` localhost |
| **Capacitor** | B- (82) | WATCH | NOT_INSTALLED | None (Xcode/Android Studio for builds) | Per-project `npx cap init` when wrapping a Next web app |
| **Prisma ORM** | B- (81) | WATCH | NOT_INSTALLED | ORM free; Prisma Postgres/Compute paid | Use Drizzle/Payload paths first — see TOOLS-STACK-OPTIONS |
| **Flowise** | B- (82) | WATCH | NOT_INSTALLED | LLM API keys | Visual agent builder — `:3000` clashes with JonBeatz dev; use n8n/Hermes instead |
| **Hermes Agora** | B (84) | WATCH | PRE_RELEASE | None | Wait for launch — local Hermes gateway; unofficial fan project |
| **OpenRouter** | A- (92) | **IN USE** | **READY** | `OPENROUTER_API_KEY` | ~22 LiteLLM `*-or` aliases; key in JonBeatz `.env.local` → `sync:deepseek-env` |
| **OmniRoute** | B (85) | WATCH | NOT_INSTALLED | None (local `:20128`) | LiteLLM **alternative** — isolated trial only |
| **mockit-mcp** | B- (81) | WATCH | NOT_INSTALLED | Claude CLI or `ANTHROPIC_API_KEY` | iOS UI mock MCP — mobile workspace |
| **OpenWhispr** | B (85) | WATCH | NOT_INSTALLED | None (local STT); optional LM Studio `:1234` for cleanup | `.exe` from GitHub releases — Local → Parakeet |
| **Handy** | A- (91) | IN USE | **READY** | None (local STT) | `winget install cjpais.Handy` → `npm run handy:status` → `handy:model` if in-app DL fails |
| **Wan2.1** | B+ (88) | ADOPT | **READY** | HF token optional | Weights on `H:\AI_Models\Wan2.1` — `npm run wan21:status`; ComfyUI Wan workflows |
| **Tabby** | B (83) | WATCH | NOT_INSTALLED | None | `winget install Eugeny.Tabby` or GitHub release — SSH profiles for fleet ops |
| **Graphify** | B (84) | WATCH | NOT_INSTALLED | Claude Code or skill install | `pipx install graphifyy` — overlaps `codebase-memory-mcp` IN USE |
| **Artlist** | B- (81) | WATCH | NEEDS_LOGIN | Paid subscription | Stock music/SFX + AI toolkit — fal/local gen primary for agents |
| **getdesign.md** | A- (91) | **IN USE** | **READY** | None (`npx getdesign` / `@designmdcc/cli`) | DesignMD skill — `.cursor/skills/DesignMD/` |
| **mp4-to-jpg** | B (85) | **REF** | **READY** | None (web demo) | Bookmark: https://allarddewinter.github.io/mp4-to-jpg/ — Jon 2026-07-13 |
| **Video To JPG** | B+ (88) | **REF** | **READY** | None (web) | **Bookmark:** https://videotojpg.com/ — Jon 2026-07-13 |
| **free-llm-api-resources** | B+ (88) | **REF** | **READY** | None | GitHub discovery list — pair with `CURSOR-MODELS-CHEATSHEET.md` |
| **cto.new** | B (83) | WATCH | NOT_INSTALLED | None (SaaS signup) | https://cto.new/ — free pilot; overlaps Hermes Desktop |
| **Supabase** | B+ (88) | **REF** | **READY** | None (bookmark) | **Bookmark:** https://supabase.com/ — Neon alt for Next-Flick (Jon 2026-07-13) |
| **PocketBase** | A- (91) | WATCH | **PARTIAL** | None (local binary) | `D:\Hermes\apps\pocketbase` — `npm run pocketbase:install` smoke OK; start `:8090` on demand |
| **InsForge** | B+ (88) | **IN USE** | **READY** | Docker Desktop | `D:\Hermes\apps\insforge` — `npm run insforge:*`; localhost `:7130` / `:15432`; spike only |
| **aitmpl.com** | B (84) | REF | **READY** | None (web) | Browse/install individual Claude Code components cautiously |
| **Toolfolio** | B- (81) | REF | **READY** | None (web) | Discovery bookmark only |
| **Databasement** | A- (90) | **IN USE** | **READY** | Docker Desktop | `D:\Hermes\apps\databasement` — `npm run databasement:*`; localhost `:2226` |
| **Voicebox** | A- (92) | WATCH | NOT_INSTALLED | Windows MSI + models | Jon self-install from https://voicebox.sh — MCP `:17493`; VRAM heavy |
| **Theatre.js** | B+ (86) | WATCH | **PARTIAL** | None | Dev deps in JonBeatz playground — not wired to routes yet |
| **Threlte** | B (84) | WATCH | NOT_INSTALLED | None | Svelte-only — reference; use R3F for JonBeatz/MSC stack |
| **Nellavio** | B- (81) | WATCH | NOT_INSTALLED | None | Clone `nellavio/nellavio` — dashboard shell spike only |
| **awesome-freellm-apis** | B+ (87) | **REF** | **READY** | None | **Bookmark:** https://freellm.net/ — Jon 2026-07-13; config at freellm.net/config/ |
| **Mnemosyne** | B+ (89) | **IN USE (Cursor MCP trial)** | READY | None (local SQLite) | `npm run mnemosyne:status` — JonBeatz only; Mem0 canonical |
| **hermes-browser-extension** | A (93) | **ADOPT** | **READY** | `API_SERVER_KEY` + `API_SERVER_CORS_ORIGINS` | Chrome+Brave `:8642` + companion plugin `hermes-browser-companion` enabled (Jon 2026-07-13) |
| **deepseek-mcp-server** | B (83) | WATCH | NOT_INSTALLED | `DEEPSEEK_API_KEY` | `npx -y deepseek-mcp-server` stdio — **do not** use hosted `ragweld.com` |
| **Calliop** | B- (82) | WATCH | NOT_INSTALLED | None (bundled whisper.cpp + Qwen sidecar) | NSIS installer — SmartScreen unsigned warning |
| **LTX Desktop** | B+ (87) | WATCH | NOT_INSTALLED | Optional LTX API key (free text encode); local mode needs none | `.exe` from GitHub — ~160 GB disk; 16 GB VRAM min; Jon download later |
| **Open Generative AI + muapi** | B+ (87) | WATCH | CLONED @ `D:\Hermes\apps\Open-Generative-AI` | `MUAPI_API_KEY` (VaderLabz / cloud) | MIT + muapi.ai |
| **Hermex** | B+ (88) | WATCH | NOT_INSTALLED | App Store + `hermes-webui` + tunnel | iOS 18+; Cloudflare Tunnel or Tailscale to `:8787` |
| **Aight** | B (85) | WATCH | NOT_INSTALLED | App Store; Pro optional | Hermes mode → gateway; free tier = 1 mode only |
| **Hermes WebUI** | B+ (88) | WATCH | NOT_INSTALLED | None | `:8787` Hermes-native web UI — prerequisite for Hermex |
| **Open WebUI** | B (85) | WATCH | NOT_INSTALLED | Docker + `API_SERVER_KEY` | Hermes `:8642/v1` integration |
| **Refero MCP** | A- (91) | WATCH | NOT_INSTALLED | Pro ($17/mo) when ready | **Bookmark** — Cursor MCP; Jon 2026-07-13 |
| **Refero Styles** | B+ (88) | WATCH | NOT_INSTALLED | Refero account when ready | **Bookmark** — DESIGN.md library |
| **MemPalace** | B (84) | WATCH | NOT_INSTALLED | None (local embed) | **Bookmark** — `uv tool install mempalace` when ready; Mem0 primary |
| **AgentsView** | B+ (87) | IN USE | **READY** | None | Sessions `:8080` — 2026-07-04 |
| **TokenTracker** | B+ (87) | IN USE | **READY** | None | Primary spend dashboard `:7680` |
| **ccusage** | B+ (86) | WATCH | **READY** | None | Demoted 2026-07-04 — optional `npx ccusage hermes daily` |
| **Payload CMS** | A (94) | **IN USE** | **READY** | `PAYLOAD_SECRET`, `DATABASE_URL` | MSC — SQLite local; Hostinger prod |
| **Better Auth** | A (92) | **ADOPT** | **PARTIAL** | `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `DATABASE_URL`, `AUTH_PROVIDER` | Next-Flick v7 — `npm run auth:setup` + `db:push`; Clerk prod default |
| **Stack Auth** | B+ (86) | WATCH | NOT_INSTALLED | Docker env + API URL | Self-host compose — Clerk-like |
| **Strapi** | B+ (87) | WATCH | NOT_INSTALLED | DB URL + admin JWT secrets | Separate Node service; **MCP GA** 2026 |
| **Directus** | B+ (87) | WATCH | NOT_INSTALLED | `DB_*` connection | Docker or Node; BSL license; **native MCP** |
| **Sanity** | B+ (85) | WATCH | NEEDS_KEY | `SANITY_PROJECT_ID`, dataset, token | Content Lake cloud |
| **MarkText** | A- (91) | WATCH | NOT_INSTALLED | None | Desktop `.exe` install |
| **pg0** | A- (90) | **IN USE** | **READY** | `DATABASE_URL` → `:5433` | Next-Flick `npm run db:local` |
| **Neon PostgreSQL** | B+ (86) | **IN USE** | **READY** | `NEON_DATABASE_URL` | Next-Flick prod; hPanel `DATABASE_URL` |
| **shadcn/ui** | A+ (97) | **IN USE** | **READY** | None | Copy components via CLI; registries in skills |
| **Zod** | A+ (96) | **IN USE** | **READY** | None | MSC `package.json` |
| **React Hook Form** | A (93) | **IN USE** | **READY** | None | MSC `package.json` |
| **TanStack Query** | A (94) | **ADOPT** | NOT_INSTALLED | None | `npm i @tanstack/react-query` when needed |
| **bknd** | B+ (87) | WATCH | NOT_INSTALLED | `DB_URL`, `JWT_SECRET` | Beta — `npx bknd create` spike only |

**Stack options index:** [TOOLS-STACK-OPTIONS.md](./TOOLS-STACK-OPTIONS.md)

## Quick reference — env vars by tool

| Var(s) | Tool(s) | Required? |
|--------|---------|-----------|
| — | Context7, fetch, Playwright, filesystem, sequential-thinking, markdownify, vault | No |
| `DEEPSEEK_API_KEY` | LiteLLM / Hermes / Telegram agent | Yes (cloud LLM) |
| `MSC_LITELLM_MASTER_KEY` | LiteLLM proxy auth | Yes |
| `NGROK_AUTHTOKEN` | Cursor ↔ LiteLLM tunnel | When ngrok enabled |
| `MEM0_API_KEY` | Mem0 | Yes |
| `TELEGRAM_*` | Telegram gateway | Yes |
| `HF_TOKEN` | HF image gen | Yes for cloud images |
| `FAL_API_KEY` | fal.ai | Optional |
| `GITHUB_PERSONAL_ACCESS_TOKEN` | GitHub MCP | Yes for GitHub MCP |
| `TAVILY_API_KEY` | Tavily search | Yes for Tavily |
| `HOSTINGER_API_TOKEN` | Hostinger MCPs | Yes for Hostinger MCP |
| `COMFYUI_ROOT` / `COMFYUI_URL` | ComfyUI scripts + MCP | When using Comfy |
| `GROQ_API_KEY` | claude-video Whisper fallback | Optional |
| `FIRECRAWL_API_KEY` | Firecrawl MCP | If enabling MCP |
| `COMPOSIO_API_KEY` | Composio MCP | If using social automation |
| `BROWSERBASE_*` | Browserbase MCP | If using cloud browser |
| `21ST_DEV_MAGIC_API_KEY` | 21st.dev Magic | If using UI registry MCP |
| `STRIPE_API_KEY` | Stripe MCP | Billing tasks only |
| `BETTER_AUTH_SECRET` / `BETTER_AUTH_URL` | Better Auth | When adopted |
| `SUPABASE_URL` / `SUPABASE_ANON_KEY` / `SUPABASE_SERVICE_ROLE_KEY` | Supabase | When trialed |
| `AGENTMAIL_API_KEY` | AgentMail | When using agent inboxes API |
| `PAYLOAD_SECRET` / `DATABASE_URL` | Payload CMS (MSC) | Yes on MSC |
| Burner accounts | Agent-Reach (Twitter/Reddit) | Optional per channel |

Full registry: [ENV-VARS-REFERENCE.md](../ENV-VARS-REFERENCE.md)

---

## Post-install verify registry

Run after install or when flipping Setup → **READY**. Add a row here when a new tool reaches **IN USE** or **ADOPT**.

| Tool | Verify command | Notes |
|------|----------------|-------|
| **codebase-memory-mcp** | `npm run codebase-memory:status` | Reindex: `codebase-memory:reindex` |
| **OpenMontage** | `npm run openmontage:status` | Needs `FAL_KEY` for cloud gen |
| **Agent-Reach** | `npm run agent-reach:doctor` | Optional channel logins |
| **Claude Watch** | `npm run watch:check` | Optional `GROQ_API_KEY` |
| **Mem0** | `npm run mem0:preflight` | LM Studio :1234 |
| **cinematic-scroll-skill** | `npm run vault:cinematic-scroll-skill` + doctor in vault | ≥ 80 gate |
| **emilkowalski/skills** | `npm run skills:emil:status` | 5 skills in shared library + `.cursor/skills` after `sync:skills` |
| **Handy** | `npm run handy:status` | Model: `npm run handy:model` if in-app HF download fails (content-range bug) |
| **Wan2.1** | `npm run wan21:status` | Weights on `H:\AI_Models\Wan2.1`; ComfyUI Wan workflows |
| **Tabby** | `winget list Eugeny.Tabby` + SSH smoke test | Optional daily-driver terminal — not fleet-required |
| **Graphify** | `graphify --help` after `pipx install graphifyy` | Claude Code `/graphify` skill — do not stack with CBM git hooks |
| **Artlist** | Login + free-tier generation smoke | Paid stock/AI — use for licensed MSC/jonbeatz video B-roll |
| **getdesign.md** | `npx getdesign list` | DesignMD skill — `npx getdesign add stripe --out .cursor/DesignMD/DESIGN-STRIPE.md` |
| **Mnemosyne** | `npm run mnemosyne:status` | Cursor MCP trial @ JonBeatz — Mem0 stays canonical |
| **hermes-browser-extension** | `npm run hermes-browser:install` → load `dist/` in Chrome + Brave → `npm run hermes-browser:cors-sync` → side-panel smoke | JonBeatz hub scripts; gateway `:8642` + profile `API_SERVER_*` |
| **deepseek-mcp-server** | `DEEPSEEK_API_KEY=… npx -y deepseek-mcp-server` → MCP tool smoke (`list_models`) | Local stdio only — skip third-party hosted remote |
| **cto.new** | Sign up at cto.new → hire Engineering Team → one MCP smoke (e.g. Linear) | Free tier; overlaps Hermes — pilot only |
| **Better Auth** | Next-Flick: `npm run auth:status` → `npm run db:push` → sign-up smoke → `npm run web:build` | Local spike; Clerk prod default |
| **Supabase** | Bookmark only — https://supabase.com/ | **REF** Neon alt (Jon 2026-07-13); trial later: `npx supabase init` |
| **PocketBase** | `npm run pocketbase:install` → `npm run pocketbase:status` → optional `npm run pocketbase:start` | JonBeatz hub; `:8090` localhost only |
| **Databasement** | `npm run databasement:install` → `npm run databasement:status` | JonBeatz hub; `:2226` localhost only; data under `D:\Hermes\apps\databasement\data` |
| **InsForge** | `npm run insforge:install` → `npm run insforge:status` | JonBeatz hub; `:7130` localhost; creds `D:\Hermes\apps\insforge\ADMIN-CREDENTIALS.txt`; never Neon |
| **Theatre.js** | `npm ls @theatre/core @theatre/r3f` in JonBeatz playground | Deps on deck — spike when showcase chapter needs timeline |
| **Nellavio** | `git clone` → `npm i` → dev smoke on dashboard pages | Overlaps shadcn IN USE — spike only |
| **3D vault bundles** | `npm run workflows:3d:status` | Asset paths on `D:\Hermes\assets` |
| **MCP keys added** | `npm run sync:mcp-env` | Then reload Cursor MCP |
| **Any install** | `npm run tools:status` | Config queue summary |
| **Duplicate check** | `npm run tools:review-precheck -- "name-or-url"` | Before new review |

---

## How to configure (any Hermes project)

1. **Check master:** `D:\Hermes\projects\_core-scripts\.env.local.master`
2. **Project copy:** `D:\Hermes\projects\<Profile>\.env.local` — `npm run env:setup` if missing
3. **MCP sync:** `npm run sync:mcp-env` from project root (pushes keys to Cursor MCP config)
4. **Verify:** `npm run session:start` or tool-specific doctor (`mem0:preflight`, `agent-reach doctor`, ComfyUI `health_check`)
5. **Update this doc** when a tool moves from NEEDS_KEY → READY

---

## Related paths (universal)

| Resource | Path |
|----------|------|
| Shared brain | `D:\Hermes\projects\_core-scripts\shared-profile-content\` |
| Ecosystem map | `D:\Hermes\projects\_core-scripts\UPGRADES-SYSTEMS.md` |
| MCP manifest (bootstrap) | `shared-profile-content\mcp.json` |
| JonBeatz command center | `D:\Hermes\projects\JonBeatz\.cursor\docs\TOOLS-*.md` (mirrors shared) |

**Last updated:** 2026-07-07
