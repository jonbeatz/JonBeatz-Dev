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
| **Claude Blog** | B (84) | IN USE | **READY** | Optional `GOOGLE_AI_API_KEY` (hero images) | Installed 2026-07-04 — skills + `npm run skills:claude-blog:scripts` |
| **Claude Watch** | B+ (88) | IN USE | PARTIAL | Optional `GROQ_API_KEY` | Installed 2026-07-04 — persistent study notes |
| **Agent Browser** | B+ (86) | IN USE | **READY** | None (local Chrome) | Installed 2026-07-04 — CLI; MCP optional |
| **Agent Skills (Osmani)** | B (84) | IN USE | **READY** | None | Installed 2026-07-04 — cherry-pick vs rituals |
| **devini-tea** | A (93) | REF | **READY** | None | Reference repo — see SCROLL-3D-REFERENCES |
| **Hermes Agora** | B (84) | WATCH | PRE_RELEASE | None | Wait for launch — local Hermes gateway; unofficial fan project |
| **OpenRouter** | A- (92) | **IN USE** | **READY** | `OPENROUTER_API_KEY` | ~22 LiteLLM `*-or` aliases; key in JonBeatz `.env.local` → `sync:deepseek-env` |
| **OmniRoute** | B (85) | WATCH | NOT_INSTALLED | None (local `:20128`) | LiteLLM **alternative** — isolated trial only |
| **mockit-mcp** | B- (81) | WATCH | NOT_INSTALLED | Claude CLI or `ANTHROPIC_API_KEY` | iOS UI mock MCP — mobile workspace |
| **OpenWhispr** | B (85) | WATCH | NOT_INSTALLED | None (local STT); optional LM Studio `:1234` for cleanup | `.exe` from GitHub releases — Local → Parakeet |
| **Calliop** | B- (82) | WATCH | NOT_INSTALLED | None (bundled whisper.cpp + Qwen sidecar) | NSIS installer — SmartScreen unsigned warning |
| **LTX Desktop** | B+ (87) | WATCH | NOT_INSTALLED | Optional LTX API key (free text encode); local mode needs none | `.exe` from GitHub — ~160 GB disk; 16 GB VRAM min; Jon download later |
| **Open Generative AI + muapi** | B+ (87) | WATCH | NOT_INSTALLED | `MUAPI_API_KEY` (cloud) | MIT + muapi.ai |
| **Hermes WebUI** | B+ (88) | WATCH | NOT_INSTALLED | None | `:8787` Hermes-native web UI |
| **Open WebUI** | B (85) | WATCH | NOT_INSTALLED | Docker + `API_SERVER_KEY` | Hermes `:8642/v1` integration |
| **AgentsView** | B+ (87) | IN USE | **READY** | None | Sessions `:8080` — 2026-07-04 |
| **TokenTracker** | B+ (87) | IN USE | **READY** | None | Primary spend dashboard `:7680` |
| **ccusage** | B+ (86) | WATCH | **READY** | None | Demoted 2026-07-04 — optional `npx ccusage hermes daily` |

---

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
| Burner accounts | Agent-Reach (Twitter/Reddit) | Optional per channel |

Full registry: [ENV-VARS-REFERENCE.md](../ENV-VARS-REFERENCE.md)

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

**Last updated:** 2026-07-04
