# Tools Watchlist — Hermes Ecosystem

**Canonical home:** `D:\Hermes\projects\_core-scripts\shared-profile-content\docs\TOOLS-WATCHLIST.md`  
**Setup status (keys / ready):** [TOOLS-SETUP-STATUS.md](./TOOLS-SETUP-STATUS.md)  
**Detailed reviews:** [TOOLS-REFERENCE.md](./TOOLS-REFERENCE.md)  
**Vault mirror:** `H:\Vader_Vault\04_Research\Repo-Watchlist.md`  
**Ecosystem MCP audit:** `D:\Hermes\projects\JonBeatz\.cursor\plans\2026-07-03-hermes-ecosystem-audit.plan.md`  
**Fleet policy:** [FLEET-TOOLS-KNOWLEDGE.md](./FLEET-TOOLS-KNOWLEDGE.md)

Jon researches tools → paste links in Cursor (often from **JonBeatz hub**) → Draven reviews → **grade + summary + setup status** lands in **shared canonical** docs → `sync:docs` mirrors to every profile.
---

## Evaluation policy (Jon 2026-07-04)

1. **Additive only** — approved tools join the arsenal. **Never replace or break** what's working (Mem0, DeepSeek, ComfyUI, MCPs, boot stack, etc.).
2. **Overlap is OK** — if a new tool is similar to something we have but is a strong **alternative on deck**, it can still earn **ADOPT** or **IN USE**. Pick the best tool per task; keep backups.
3. **Cost preference** — **open source + free first**. Minimal paid spend is fine when reward is high (e.g. Groq Whisper pennies, fal.ai per-image, DeepSeek daily driver).
4. **Every review gets** — letter grade (A+→F), score (/100), one-line summary, cost tag (`Free` / `Freemium` / `Paid`), overlap notes.
5. **Install gate** — **IN USE** only after Jon approves install (or explicit "run install now").
6. **Doc threshold (Jon 2026-07-04)** — only **B- (80+) and above** land in watchlist, setup-status, and workflow docs. **C+ and below:** grade in chat only — do not persist unless Jon explicitly asks.
7. **Grades first (v2 2026-07-13)** — full review template in chat before any install `AskQuestion`.
8. **Batch mode** — `review batch` or multiple URLs → all grades → session scoreboard → **one** install gate.
9. **Duplicate pre-check** — `npm run tools:review-precheck -- "url-or-name"` before research.
10. **Re-grade policy** — WATCH: 6 months or major version; IN USE: breakage/upgrade; ADOPT: >3 months before install.

---

## Grade scale

| Letter | Score | Meaning |
|--------|-------|---------|
| **A+** | 97–100 | Must-have; best-in-class |
| **A** | 93–96 | Strong adopt; clear ROI |
| **A-** | 90–92 | Adopt; minor caveats |
| **B+** | 87–89 | Good; adopt with conditions |
| **B** | 83–86 | Useful niche; keep on deck |
| **B-** | 80–82 | Watch closely |
| **C+** | 77–79 | Marginal; optional alternative |
| **C** | 73–76 | Skip unless specific need |
| **D** | 60–72 | Weak fit |
| **F** | &lt;60 | Skip |

**Rubric:** gap fill (40%), stack fit (25%), cost/VRAM/complexity (20%), maturity/trust (15%). Overlap reduces gap-fill score slightly — **does not auto-SKIP**.

---

## Quick summaries (all evaluated)

| Tool | Grade | Verdict | Setup | Cost | One-line summary |
|------|-------|---------|-------|------|------------------|
| **claude-video `/watch`** | **A- (92)** | IN USE | PARTIAL‡ | Free† | Agent watches video — frames + transcript; best for visual analysis |
| **find-skills** | **A- (91)** | IN USE | **READY** | Free | Meta-skill — discover + install from 2000+ skill catalog via `npx skills find` |
| **Hallmark** | **B+ (88)** | IN USE | **READY** | Free | Anti-slop design skill — build/audit/redesign UI; 57 slop gates; complements NovaMira |
| [**emilkowalski/skills**](https://github.com/emilkowalski/skills) | **A- (90)** | **IN USE** | **READY** | Free | Animation taste — 5 skills in shared library; `sync:skills` · `skills:emil:status` |
| **Claude Blog** | **B (84)** | IN USE | **READY** | Free | 30-skill SEO/GEO blog pipeline — write, analyze, schema, editorial calendar |
| **ComfyUI MCP** | **A- (91)** | IN USE | PARTIAL | Free | Local GPU Comfy control from Cursor; pairs with `:8188` |
| **Context7 MCP** | **A (94)** | IN USE | **READY** | Free | Stops hallucinated library APIs — use before coding |
| **devini-tea (reference)** | **A (93)** | REF | **READY** | Free | Open-source scroll-video cinematic site + 2h build playbook — study, not install |
| **cinematic-scroll-skill** | **A- (92)** | **ADOPT** | **READY**‡ | Free MIT | MustBeSimo craft skill — doctor/tokens/themes; vendored `3d-web-workflows/cinematic-scroll-skill` |
| **scroll-cinematic-claude** | **B (84)** | WATCH | NOT_INSTALLED | Free‡ | Higgsfield MCP scroll recipe — overlaps fal path; skip unless Higgsfield MCP added |
| **fullPage.js** | **B- (82)** | WATCH | NOT_INSTALLED | Paid§ | Section snap/scroll transitions — alt to Lenis+GSAP for full-page decks |
| [**Capacitor**](https://github.com/ionic-team/capacitor) | **B- (82)** | WATCH | NOT_INSTALLED | Free MIT | Web→native iOS/Android shell for Next apps; Flutter is Jedi-iOS primary |
| [**Prisma**](https://www.prisma.io/) | **B- (81)** | WATCH | NOT_INSTALLED | Freemium | ORM + hosted Postgres/Compute — Drizzle/Payload already chosen |
| [**Open Notebook**](https://github.com/lfnovo/open-notebook) | **B- (82)** | WATCH | NOT_INSTALLED | Free MIT‡ | Self-hosted Notebook LM — Docker; overlaps Mem0/Hermes/AnythingLLM |
| **codebase-memory-mcp** | **A- (92)** | **IN USE** | **READY** | Free | Static-binary code graph MCP — JonBeatz indexed; `npm run codebase-memory:status` |
| **OpenMontage** | **A- (90)** | **IN USE** | **READY**‡ | Free‡ | Agentic video studio — `D:\Hermes\assets\openmontage`; `npm run openmontage:status` |
| **agency-agents** | **B+ (86)** | WATCH | NOT_INSTALLED | Free | 230+ persona agent packs — cherry-pick; Hermes plugin; overlaps curated skills |
| **AnythingLLM** | **B (83)** | WATCH | NOT_INSTALLED | Free OSS | All-in-one RAG chat desktop — overlaps Hermes Desktop + Mem0 + LiteLLM |
| **Flowise** | **B- (82)** | WATCH | NOT_INSTALLED | Free OSS | Visual LangChain agent builder — overlaps Hermes; default `:3000` port clash |
| **Agent-Reach** | B+ (87) | IN USE | PARTIAL | Free | CLI breadth — GitHub/YouTube/RSS/Exa; Twitter/Reddit optional login |
| **Claude Watch** | B+ (88) | IN USE | PARTIAL‡ | Free† | Persistent video **study notes** — scene frames + transcript library |
| **Agent Skills (Osmani)** | B (84) | IN USE | **READY** | Free | 24 engineering workflow skills — cherry-pick; overlaps Hermes rituals |
| **Agent Browser** | B+ (86) | IN USE | PARTIAL | Free | Rust CLI/MCP browser — ref snapshots; alt to Playwright/Browserbase |
| **AgentMail** | A- (91) | ADOPT | PARTIAL | Freemium | Agent email inboxes API — 2-way threads, OTP/attachments; alt to Resend for agents |
| **NeuTTS** | A- (90) | WATCH | NOT_INSTALLED | Free§ | On-device clone TTS (GGUF/CPU); needs ref wav + transcript |
| **OmniVoice-Studio** | B+ (87) | WATCH | NOT_INSTALLED | Free†† | Desktop GUI + 14 TTS engines incl. OmniVoice; MCP; GPU optional |
| **LuxTTS** | B (86) | WATCH | NOT_INSTALLED | Free | Fast voice-clone TTS (~1GB VRAM GPU); speed/GPU alt to OmniVoice |
| **React Bits** | **B+ (88)** | WATCH | **READY** | Freemium | 130+ animated React components for new landing pages |
| **Firecrawl MCP** | **B+ (86)** | WATCH | NEEDS_KEY | Freemium | Deep web scrape; skills exist — MCP optional alt to Tavily/fetch |
| **Composio MCP** | **B (84)** | WATCH | PARTIAL | Freemium | Social automation; already in manifest, optional |
| **Penpot** | **B (82)** | WATCH | NOT_INSTALLED | Free OSS | Figma alt + MCP; alt to Pencil when designer handoff needed |
| **Tripo Studio** | **A (93)** | **PRIMARY** | **READY**‡ | Freemium | Cloud image/text → GLB — product scroll §2; vault WORKFLOW |
| **3DGenStudio** | **A- (91)** | **IN USE** | **READY**‡ | Free | Local Comfy Kanban 3D — `:3021`/`:5183`; Tripo web still primary |
| [**TRELLIS.2**](https://github.com/microsoft/TRELLIS.2) | **B- (82)** | WATCH | NOT_INSTALLED | Free§ | MSFT 4B image→PBR GLB — Linux + **24GB VRAM**; HF Space demo on Win |
| [**Step Beyond**](https://github.com/aievolutionpl/step-beyond) | **B- (80)** | WATCH | NOT_INSTALLED | Free | Agent behavior skill v4 alpha — cherry-pick verify/slop refs; rituals already cover |
| [**OpenCut**](https://github.com/OpenCut-app/OpenCut) | **B- (82)** | WATCH | NOT_INSTALLED | Free | OSS CapCut alt — use [opencut.app](https://opencut.app) classic; rewrite + MCP coming |
| [**NoSignups**](https://nosignups.net/) | **B (84)** | **REF** | **READY** | Free | 210 no-signup OSS browser tools — discovery bookmark (not install) |
| [**Nemotron-Shared-Memory**](https://github.com/TheLasTech/Nemotron-Shared-Memory) | **B- (80)** | **REF** | **READY** | Free CC BY | Public MD+Git memory patterns — vault hygiene reference (not Nemotron model) |
| **LongCat-Video** | B+ (87) | WATCH | NOT_INSTALLED | Free§ | Local 13.6B I2V — **fal fallback #1**; Avatar 1.5 = talking-head branch |
| [**Wan2.1**](https://github.com/Wan-Video/Wan2.1) | **B+ (88)** | **ADOPT** | **READY** | Free Apache-2 | `H:\AI_Models\Wan2.1` — ComfyUI path on Windows; `npm run wan21:status` |
| [**Tabby**](https://github.com/Eugeny/tabby) | **B (83)** | WATCH | NOT_INSTALLED | Free MIT | Modern Windows terminal + SSH client — alt to Windows Terminal |
| [**Graphify**](https://github.com/Graphify-Labs/graphify) | **B (84)** | WATCH | NOT_INSTALLED | Free | Multimodal code/PDF→knowledge graph skill; overlaps codebase-memory-mcp |
| [**Artlist**](https://artlist.io/) | **B- (81)** | WATCH | NEEDS_LOGIN | Paid§ | Stock music/SFX/footage + AI toolkit aggregator (Sora/Veo/Kling/Wan) |
| [**getdesign.md**](https://getdesign.md/) | **A- (91)** | **IN USE** | **READY** | Freemium | 300+ DESIGN.md brand analyses + `npx getdesign` — DesignMD skill canonical |
| [**mp4-to-jpg**](https://github.com/allarddewinter/mp4-to-jpg) | **B (85)** | **REF** | **READY** | Free MIT | Browser MP4→JPEG bookmark — [demo](https://allarddewinter.github.io/mp4-to-jpg/); ffmpeg primary |
| [**Video To JPG**](https://videotojpg.com/) | **B+ (88)** | **REF** | **READY** | Free | Browser frame extractor — blur detection, HEVC WASM, PNG/WebP; alt to mp4-to-jpg |
| [**free-llm-api-resources**](https://github.com/cheahjs/free-llm-api-resources) | **B+ (88)** | **REF** | **READY** | Free | 27k★ curated free LLM API tiers — discovery bookmark; overlaps OpenRouter/Groq IN USE |
| [**cto.new**](https://cto.new/) | **B (83)** | WATCH | NOT_INSTALLED | Freemium‡‡‡‡ | Ad-supported multi-agent SaaS — Team Lead + MCP; overlaps Hermes Desktop |
| [**Supabase**](https://supabase.com/) | **B+ (88)** | **REF** | **READY** | Freemium | **Bookmark** — Neon alt for Next-Flick (Jon 2026-07-13); PG + Auth/Storage/Vector/MCP |
| [**PocketBase**](https://pocketbase.io/) | **A- (91)** | WATCH | NOT_INSTALLED | Free MIT | Single-file Go backend `:8090` — SQLite + auth + realtime; pre-v1 migration caveat |
| [**Theatre.js**](https://www.theatrejs.com/) | **B+ (86)** | WATCH | NOT_INSTALLED | Free Apache-2.0 | Visual R3F timeline (`@theatre/r3f`) — showcase 3D; last major push 2024 |
| [**Threlte**](https://threlte.xyz/) | **B (84)** | WATCH | NOT_INSTALLED | Free MIT | Svelte 3D on Three.js — reference only; fleet stack is Next.js + R3F |
| [**Nellavio**](https://github.com/nellavio/nellavio) | **B- (81)** | WATCH | NOT_INSTALLED | Free MIT | Next.js dashboard starter (auth, RBAC, i18n, 90+ components) — overlaps shadcn/Premium-UI |
| [**Mnemosyne**](https://github.com/mnemosyne-oss/mnemosyne) | **B+ (89)** | **IN USE (Cursor MCP trial)** | READY | Free MIT | JonBeatz `.cursor/mcp.json` + `MNEMOSYNE.md` — Mem0 canonical |
| **hermes-browser-extension** | A (93) | **ADOPT** | **READY** | `API_SERVER_KEY` + `API_SERVER_CORS_ORIGINS` | Chrome+Brave `:8642`; side panel Alt+H; companion `hermes-browser-companion` |
| [**deepseek-mcp-server**](https://github.com/DMontgomery40/deepseek-mcp-server) | **B (83)** | WATCH | NOT_INSTALLED | Free MIT | Official MCP Registry DeepSeek V4 tools — local stdio only; LiteLLM stays primary |
| **HunyuanVideo** | B+ (86) | WATCH | NOT_INSTALLED | Free§ | Tencent 13B+ local I2V — **fal credit fallback #2**; FP8 weights |
| **LTX Desktop** | B+ (87) | WATCH | NOT_INSTALLED | Free OSS‡‡ | Local AI NLE + LTX-2.3 T2V/I2V — Jon download later (scroll clips) |
| **Open Generative AI + muapi** | B+ (87) | WATCH | NOT_INSTALLED | Freemium‡‡‡ | OSS Higgsfield-style studio; cloud = muapi wallet; local sd.cpp incl. Z-Image |
| **Hermes Agora** | B (84) | WATCH | PRE_RELEASE | Free | Unofficial 3D Hermes agent office visualizer — fun when it ships |
| **OpenRouter** | A- (92) | **IN USE** | **READY** | Pay-per-use | LiteLLM ~22 `*-or` aliases; Cursor Setup B/C — JonBeatz `CURSOR-MODELS-CHEATSHEET.md` |
| **OmniRoute** | B (85) | WATCH | NOT_INSTALLED | Free OSS | Self-hosted AI gateway alt to LiteLLM — 237 providers, compression, MCP; complex |
| **mockit-mcp** | B- (81) | WATCH | NOT_INSTALLED | Freemium | Text → premium iOS UI mockups (PNG+HTML) via Claude + Playwright |
| **OpenWhispr** | B (85) | WATCH | NOT_INSTALLED | Free OSS | Local dictation — Parakeet/Whisper STT; optional LM Studio `:1234` cleanup |
| [**Handy**](https://github.com/cjpais/handy) | **A- (91)** | **IN USE** | **READY** | Free MIT | Offline STT — `winget install cjpais.Handy`; `npm run handy:status` |
| **Calliop** | B- (82) | WATCH | NOT_INSTALLED | Free OSS | Wispr-style Windows dictation — whisper.cpp + local Qwen cleanup sidecar |
| **Hermex** | B+ (88) | WATCH | NOT_INSTALLED | Free MIT | **Bookmark Jon 2026-07-13** — native iOS for `hermes-webui` `:8787`; setup later (needs WebUI + tunnel) |
| **Aight** | B (85) | WATCH | NOT_INSTALLED | Freemium | **Bookmark Jon 2026-07-13** — Hermes gateway native iOS; setup later (free Hermes-only trial first) |
| **Hermes WebUI** | B+ (88) | WATCH | NOT_INSTALLED | Free OSS | Native Hermes web/mobile UI — **prerequisite for Hermex**; bookmark with Hermex path |
| **Open WebUI** | B (85) | WATCH | NOT_INSTALLED | Free OSS | Docker chat UI + Hermes API `:8642` |
| **MemPalace** | B (84) | WATCH | NOT_INSTALLED | Free MIT | **Bookmark Jon 2026-07-13** — verbatim local memory + MCP; setup later; Mem0 stays primary |
| **Refero MCP** | A- (91) | WATCH | NOT_INSTALLED | Paid $17/mo | **Bookmark Jon 2026-07-13** — 135k screens/flows MCP; setup later ($17/mo Pro) |
| **Refero Styles** | B+ (88) | WATCH | NOT_INSTALLED | Freemium‡ | **Bookmark Jon 2026-07-13** — 2k+ DESIGN.md examples; pair Refero MCP + DesignMD later |
| **AgentsView** | B+ (87) | IN USE | **READY** | Free OSS | Session search + messages — `:8080` |
| **TokenTracker** | B+ (87) | IN USE | **READY** | Free OSS | **Primary** spend dashboard — `:7680` |
| **ccusage** | B+ (86) | WATCH | **READY** | Free OSS | CLI Hermes-only alt — Jon prefers TokenTracker |
| **Payload CMS** | **A (94)** | **IN USE** | **READY** | Free OSS | MSC mystudiochannel.com — Next.js in-process v3; SQLite local |
| **Better Auth** | **A (92)** | **ADOPT** | **PARTIAL** | Free OSS | Next-Flick v7 spike — `AUTH_PROVIDER=better-auth` local; Clerk prod default |
| **Stack Auth / Hexclave** | B+ (86) | WATCH | NOT_INSTALLED | Free OSS† | Self-host Clerk-like; Docker + AGPL backend |
| **Strapi** | B+ (87) | WATCH | NOT_INSTALLED | Free OSS | Largest OSS CMS; **MCP GA** (2026) — separate Node service |
| **Directus** | B+ (87) | WATCH | NOT_INSTALLED | Free OSS‡ | SQL-first admin + **native MCP**; BSL/GPL — Payload IN USE on MSC |
| **Sanity** | B+ (85) | WATCH | NEEDS_KEY | Freemium | Studio OSS; Content Lake cloud — marketing sites |
| **KeystoneJS** | B (82) | WATCH | NOT_INSTALLED | Free OSS | GraphQL schema CMS; Prisma |
| **Hanko** | B (84) | WATCH | NOT_INSTALLED | Free OSS§ | Passkey-first auth server; AGPL |
| **Authgear** | B- (80) | WATCH | NOT_INSTALLED | Free OSS | Enterprise IdP; K8s-heavy |
| **MarkText** | A- (91) | WATCH | NOT_INSTALLED | Free OSS | Markpad replacement; MIT Electron |
| **Zettlr** | B+ (86) | WATCH | NOT_INSTALLED | Free OSS | Research writing MD editor; GPL |
| **Milkdown** | B+ (88) | WATCH | NOT_INSTALLED | Free OSS | Plugin MD editor framework; build custom |
| **ApostropheCMS** | B- (80) | WATCH | NOT_INSTALLED | Free OSS | In-context page edit; MongoDB |
| **pg0** | A- (90) | **IN USE** | **READY** | Free | Local Postgres `:5433` — Next-Flick dev |
| **Neon PostgreSQL** | B+ (86) | **IN USE** | **READY** | Freemium | Next-Flick prod DB on Hostinger shared Node |
| **Supabase** | **B+ (88)** | **REF** | **READY** | Freemium | **Bookmark** — Neon alt for Next-Flick (Jon 2026-07-13); use Better Auth for in-app auth |
| **shadcn/ui** | **A+ (97)** | **IN USE** | **READY** | Free OSS | Copy-paste Radix+Tailwind; Component-Registries skill |
| **Zod** | **A+ (96)** | **IN USE** | **READY** | Free OSS | Schema validation — MSC; pairs with RHF + APIs |
| **React Hook Form** | **A (93)** | **IN USE** | **READY** | Free OSS | Forms — MSC; use with Zod resolver |
| **TanStack Query** | **A (94)** | **ADOPT** | NOT_INSTALLED | Free OSS | Client server-state; App Router prefetch/hydrate |
| **bknd** | B+ (87) | WATCH | NOT_INSTALLED | Free OSS | Embedded BaaS (beta); Firebase alt; Next.js embed |

† Stack Auth: MIT SDK + AGPL backend.  
‡ Directus: BSL 1.1 under revenue cap; GPL alternative.  
‡‡‡‡ cto.new: free tier ad-supported; rolling 24h+7d limits; Premium paid.  
§ Hanko: AGPL community edition.

† claude-video: free captions; optional Groq/OpenAI Whisper for no-caption sources (minimal cost).  
‡ claude-video PARTIAL = YouTube captions work now; optional Groq for no-caption sources.  
§ NeuTTS-Air Apache 2.0; NeuTTS-Nano uses NeuTTS Open License 1.0.  
†† OmniVoice-Studio AGPL-3.0 (commercial license available).  
‡‡ LTX Desktop app Apache-2.0; LTX-2.3 weights under LTX-Video Model License (free under revenue cap).  
‡‡‡ Open Generative AI MIT OSS; **muapi.ai** cloud models pay-as-you-go; optional local sd.cpp (no key).

---

## Voice / TTS watch deck (Jon 2026-07-04)

**Production:** OmniVoice instruct (CPU, ritual-only) + Edge Ryan fallback — do not replace.

| Tool | Grade | Verdict | When to reach for it |
|------|-------|---------|----------------------|
| [NeuTTS](https://github.com/neuphonic/neutts) | A- (90) | WATCH | On-device **clone** from ref wav + transcript; CPU/GGUF path |
| [OmniVoice-Studio](https://github.com/debpalash/OmniVoice-Studio) | B+ (87) | WATCH | GUI lab — dubbing, clone A/B, 14 engines + MCP; GPU optional |
| [LuxTTS](https://github.com/ysharma3501/LuxTTS) | B (86) | WATCH | Fast **clone** when GPU free (~1 GB VRAM); 48 kHz experiments |

Install any of these only after Jon approves. None replace `draven:speak` until tested against current OmniVoice quality bar.

---

## Voice dictation watch deck (Jon 2026-07-04)

**Baseline:** Windows **Win+H** talk-to-type. **Production speak-out:** OmniVoice (`draven:speak`) — do not replace.

| Tool | Grade | Verdict | When to reach for it |
|------|-------|---------|----------------------|
| [**Handy**](https://github.com/cjpais/handy) · [handy.computer](https://handy.computer) | **A- (91)** | **ADOPT** | **Try first** — offline Whisper/Parakeet dictation; hotkey paste anywhere; `winget install cjpais.Handy` |
| [OpenWhispr](https://github.com/OpenWhispr/openwhispr) | B (85) | WATCH | **Second** — local Parakeet; optional LM Studio cleanup |
| [Calliop](https://github.com/Lappom/Calliop) | B- (82) | WATCH | **Third** — bundled Qwen cleanup sidecar; Windows-only alt |

**Workflow:** click target field → hotkey → speak → stop → auto-paste. Handy: configurable shortcut (default in app); OpenWhispr **Ctrl+Win**; Calliop **Alt+Space**.

**Not LM Studio by default:** STT models download inside each app. LM Studio only for optional OpenWhispr Self-Hosted cleanup.

**Install gate:** Handy **ADOPT** — Jon approval via review batch (2026-07-13).

### Overlap map (alternatives on deck — all can coexist)

| Domain | Primary | Alternative(s) | Notes |
|--------|---------|----------------|-------|
| Video **understanding** | claude-video | Claude Watch (study notes), Agent-Reach (text-only YouTube) | claude-video = in-task visuals; Claude Watch = persistent tutorial library |
| **Skill discovery** | Manual `npx skills add` | **find-skills** | Ask "is there a skill for X?" → `npx skills find [query]` |
| **Browser automation** | cursor-ide-browser MCP | Agent Browser, Playwright, Browserbase | cursor-ide-browser default in Cursor; agent-browser for Rust CLI/MCP |
| **Engineering workflow** | Hermes rituals + Workflow-Portable | Agent Skills (Osmani) | Cherry-pick Osmani gates; don't replace Start/End Project |
| **Draven TTS** | OmniVoice (CPU, voice design) | NeuTTS, LuxTTS (clone) | Keep Omni primary; clones need ref clip |
| **Voice dictation (STT in)** | Windows Win+H | **OpenWhispr**, **Calliop** | Local OSS alt; paste-at-cursor; try later |
| **TTS studio / GUI** | `draven:speak` scripts | OmniVoice-Studio | Optional GUI for dubbing/clone experiments |
| Web **research** | Tavily + fetch MCP | Firecrawl, Agent-Reach Exa | Different depth/speed |
| **Design** mockups | Code-first (Nova/Premium-UI) | **Hallmark**, Pencil MCP, Penpot | Hallmark = agent-time anti-slop gates |
| **Animation taste / easing** | Scroll-Motion + gsap skills | [**emilkowalski/skills**](https://github.com/emilkowalski/skills) | `improve-animations` audits whole codebase; complements Hallmark |
| **Cross-tool memory patterns** | Mem0 + **Vader Vault** + ReCall | [**Nemotron-Shared-Memory**](https://github.com/TheLasTech/Nemotron-Shared-Memory) | Public-safe MD+Git patterns — REF only, not a runtime |
| **Blog / SEO content** | Manual | **Claude Blog** | Articles, changelog posts; optional Gemini for hero images |
| **UI components** | shadcn + skills | React Bits Pro | New pages only |
| **Hermes dashboard** | Built-in + Reflect / plugins | [Hermes Agora](https://www.hermesagora.com/) | 3D fun visualizer; pre-release; unofficial |
| **LLM routing** | LiteLLM `:4000` + DeepSeek direct + **OpenRouter** `*-or` | **OmniRoute** | OpenRouter active via LiteLLM; OmniRoute = self-host experiment only |
| **Mobile UI design** | Penpot + Mobbin refs | **mockit-mcp** | Prompt → iOS PNG/HTML before Flutter build |
| Cloud **images** | HF `image:gen` (free) | fal.ai (paid bonus) | Already dual pipeline |
| Cloud **video / lip sync GUI** | fal Kling (`video:fal`) | **Open Generative AI + muapi** | OSS studio + muapi wallet; alt to Higgsfield-style UIs |
| Local **images/video** | ComfyUI | — | Generation, not consumption |
| **Image → PBR GLB** | **Tripo Studio** (cloud) | **3DGenStudio** (Comfy Kanban), [**TRELLIS.2**](https://github.com/microsoft/TRELLIS.2) | TRELLIS.2 = OSS SOTA but Linux + 24GB VRAM; HF Space demo on Win |
| **Manual video timeline** | FFmpeg + browser | [**OpenCut**](https://opencut.app) classic, LTX Desktop | OpenMontage = agent pipelines; OpenCut = human NLE cuts |
| **No-signup tool discovery** | Bookmarks + TOOL-CHEST | [**NoSignups**](https://nosignups.net/) | 210 curated browser OSS utilities — not an install |
| **Agent behavior formalism** | Cursor rules + rituals + Hallmark | [**Step Beyond**](https://github.com/aievolutionpl/step-beyond) skill | Cherry-pick verify/slop refs only; no runtime without adapter |
| **Agent token analytics** | **TokenTracker** (spend) + **AgentsView** (sessions) | ccusage | Jon 2026-07-04 — ccusage demoted |
| **Scroll / cinematic I2V** | fal Kling (`video:fal`) | LongCat, HunyuanVideo, Comfy `generate-video`, **LTX Desktop** | LTX = GUI NLE + local gen; ~160 GB disk; 16 GB VRAM min |
| **Headless CMS** | **Payload** (MSC) | Strapi, Directus, Sanity, Keystone | See [TOOLS-STACK-OPTIONS.md](./TOOLS-STACK-OPTIONS.md) |
| **App auth (self-host)** | Clerk (Next-Flick prod) | **Better Auth**, Stack Auth, Hanko | Better Auth = in-app + pg0; Stack = Clerk-like Docker |
| **Local Postgres** | **pg0** `:5433` | Hostinger VPS Postgres | Neon = prod on shared Hostinger today |
| **Markdown editor** | Markpad | **MarkText**, Zettlr, Milkdown | Jon trialing; parked fork idea |
| **UI components** | **shadcn/ui** | Magic UI, Tailark registries | Copy-paste; Component-Registries skill |
| **Form validation** | **Zod** + **RHF** (MSC) | — | Next-Flick: Clerk UI only today |
| **Client fetch cache** | RSC loaders (Next-Flick) | **TanStack Query** | Add when optimistic/live refetch needed |
| **Embedded BaaS** | Drizzle + Clerk/Better Auth | **bknd** (beta) | Overlaps Payload / BA+Drizzle |

---

## Active stack (production — do not break)

| Tool | Layer | Grade* | Notes |
|------|-------|--------|-------|
| DeepSeek + LiteLLM | Paid cloud LLM | A | `:4000`, Hermes/Telegram/Cursor |
| LM Studio + qwen3-4b | Local LLM | A- | `:1234`, 16384/parallel 1 |
| Mem0 + Qdrant | Memory | A | `jonbeatz_personal` |
| OmniVoice Draven | Voice | A- | Ritual-only TTS |
| ComfyUI + comfyui-mcp | Local GPU | A- | `:8188` |
| Hugging Face + fal.ai | Cloud images | A / B+ | Free default + paid bonus |
| Context7 MCP | Library docs | A | Version-accurate refs |
| GitHub / Hostinger / Playwright / Tavily | Ops MCPs | A- | See `ENGINEERING.md` |
| Obsidian Copilot + vault | Knowledge | B+ | `H:\Vader_Vault` |
| claude-video `/watch` | Video understanding | A- | Installed 2026-07-04 |
| Hallmark | Greenfield UI / anti-slop | B+ | Installed 2026-07-04 — `npm run skills:hallmark:install` |
| emilkowalski/skills | Animation / motion taste | A- | Installed 2026-07-13 — `npm run skills:emil:install` |
| Claude Blog | Blog / SEO content | B | Installed 2026-07-04 — 30 skills + Python helpers |
| **Payload CMS** | MSC content / admin | A | MyStudioChannel — SQLite local, Hostinger prod |
| **Core web stack** | Next.js + React + TS + Tailwind | A+ | See [TOOLS-STACK-OPTIONS.md](./TOOLS-STACK-OPTIONS.md) § Core |

*Baseline grades for tools already in daily use — not re-reviewed each session.

---

## Stack options deck (2026-07-07)

**Full research:** [TOOLS-STACK-OPTIONS.md](./TOOLS-STACK-OPTIONS.md) — auth, CMS, database, markdown editors for new projects.

### Auth — local-first watch deck

| Tool | Grade | Verdict | When to reach for it |
|------|-------|---------|----------------------|
| [Better Auth](https://github.com/better-auth/better-auth) | A (92) | **ADOPT** | Next-Flick v7 — installed local spike (`npm run auth:setup`) |
| [Stack Auth](https://github.com/stack-auth/stack) | B+ (86) | WATCH | Clerk-like components; self-host Docker |
| [Hanko](https://github.com/teamhanko/hanko) | B (84) | WATCH | Passkey-first; separate auth server |
| [Authgear](https://github.com/authgear/authgear-server) | B- (80) | WATCH | Enterprise SSO/MFA; K8s ops |

### Headless CMS watch deck

| Tool | Grade | Verdict | When to reach for it |
|------|-------|---------|----------------------|
| [Payload](https://github.com/payloadcms/payload) | A (94) | **IN USE** | MSC + any new Next marketing site |
| [Strapi](https://github.com/strapi/strapi) | B+ (87) | WATCH | GUI content builder; non-dev editors |
| [Directus](https://github.com/directus/directus) | B+ (87) | WATCH | Admin over existing Postgres + native MCP |
| [Sanity](https://www.sanity.io/) | B+ (85) | WATCH | Marketing content; cloud Content Lake OK |
| [KeystoneJS](https://keystonejs.com/) | B (82) | WATCH | GraphQL-first backend CMS |
| [ApostropheCMS](https://apostrophecms.com/) | B- (80) | WATCH | On-page visual editing; MongoDB |

**SKIP (chat/doc only):** Contentful C+ (74), Cosmic C (72), brixcms.com cloud D (55) — see STACK-OPTIONS.

### Markdown editor watch deck (Jon 2026-07-07)

| Tool | Grade | Verdict | When to reach for it |
|------|-------|---------|----------------------|
| [MarkText](https://github.com/marktext/marktext) | A- (91) | WATCH | **Try first** — Markpad upgrade; MIT |
| [Zettlr](https://github.com/Zettlr/Zettlr) | B+ (86) | WATCH | Long-form / project folders |
| [Milkdown](https://github.com/Milkdown/milkdown) | B+ (88) | WATCH | Build custom Hermes-branded editor |

### Database / hosting (Next-Flick pattern)

| Layer | Tool | Verdict | Notes |
|-------|------|---------|-------|
| Local dev | **pg0** `:5433` | IN USE | `npm run db:local` |
| Prod (today) | **Neon** | IN USE | Hostinger shared has no native Postgres |
| Prod (future) | **Hostinger VPS** Postgres | WATCH | One-vendor; `pg_dump` from Neon |
| ORM | **Drizzle** | IN USE | Same schema local + prod |

### Frontend & data layer (Jon 2026-07-07)

| Tool | Grade | Verdict | When to reach for it |
|------|-------|---------|----------------------|
| [shadcn/ui](https://ui.shadcn.com/) | A+ (97) | **IN USE** | Default UI for new Next pages — `npx shadcn add` |
| [Zod](https://zod.dev/) | A+ (96) | **IN USE** | MSC — API/forms/env validation |
| [React Hook Form](https://react-hook-form.com/) | A (93) | **IN USE** | MSC — complex forms + Zod resolver |
| [TanStack Query](https://tanstack.com/query) | A (94) | **ADOPT** | Client cache, mutations, live refetch in App Router |
| [bknd](https://bknd.io/) | B+ (87) | WATCH | Beta embedded BaaS — trial vs Better Auth+Drizzle |

---

## Review queue

| Date | Link | Grade | Status |
|------|------|-------|--------|
| 2026-07-04 | [NeuTTS](https://github.com/neuphonic/neutts) | A- (90) | **WATCH** — on-device clone alt |
| 2026-07-04 | [OmniVoice-Studio](https://github.com/debpalash/OmniVoice-Studio) | B+ (87) | **WATCH** — TTS GUI/MCP hub |
| 2026-07-04 | [LuxTTS](https://github.com/ysharma3501/LuxTTS) | B (86) | **WATCH** — GPU clone alt |
| 2026-07-04 | [Agent-Reach](https://github.com/Panniantong/Agent-Reach) | B+ (87) | **IN USE** — 7/15 channels |
| 2026-07-04 | [claude-video](https://github.com/bradautomates/claude-video) | A- (92) | **IN USE** — installed |
| 2026-07-04 | [find-skills](https://github.com/vercel-labs/skills) | A- (91) | **IN USE** — skill discovery |
| 2026-07-04 | [devini-tea](https://github.com/devinilabs/devini-tea) | A (93) | **REF** — scroll-video reference in SCROLL-3D-REFERENCES |
| 2026-07-04 | [Claude Watch](https://github.com/devinilabs/claude-watch) | B+ (88) | **IN USE** — study notes skill |
| 2026-07-04 | [Agent Browser](https://github.com/vercel-labs/agent-browser) | B+ (86) | **IN USE** — CLI v0.31+; MCP optional |
| 2026-07-04 | [Agent Skills](https://github.com/addyosmani/agent-skills) | B (84) | **IN USE** — cherry-pick vs rituals |
| 2026-07-04 | [Hermes Agora](https://www.hermesagora.com/) | B (84) | **WATCH** — 3D agent office; pre-release v0.1.0 |
| 2026-07-05 | [OpenRouter](https://openrouter.ai/) | A- (92) | **IN USE** — LiteLLM Phase 1 `*-or` models |
| 2026-07-04 | [OmniRoute](https://github.com/diegosouzapw/OmniRoute) | B (85) | **WATCH** — LiteLLM alt; do not replace `:4000` without test |
| 2026-07-04 | [mockit-mcp](https://github.com/karyaboyraz/mockit-mcp) | B- (81) | **WATCH** — iOS UI mock MCP for Jedi-iOS |
| 2026-07-04 | [Agent-Reach](https://github.com/Panniantong/Agent-Reach) | B+ (87) | **DUPLICATE** — already IN USE (7/15 channels) |
| 2026-07-04 | [flutter_nocode](https://github.com/hishamnasrallah/flutter_nocode) | D (68) | **SKIP** — chat only; 0★ Django no-code; code-first stack wins |
| 2026-07-04 | [OpenWhispr](https://github.com/OpenWhispr/openwhispr) | B (85) | **WATCH** — local dictation; try first vs Win+H |
| 2026-07-04 | [Calliop](https://github.com/Lappom/Calliop) | B- (82) | **WATCH** — Wispr-style Windows dictation alt |
| 2026-07-04 | [LTX Desktop](https://ltx.io/ltx-desktop) | B+ (87) | **WATCH** — Jon download later; local AI NLE + scroll clips |
| 2026-07-04 | [Open Generative AI + muapi](https://github.com/Anil-matcha/Open-Generative-AI) | B+ (87) | **WATCH** — OSS Higgsfield-style studio; muapi wallet; local sd.cpp incl. Z-Image |
| 2026-07-04 | [Hallmark](https://github.com/nutlope/hallmark) | B+ (88) | **IN USE** — anti-slop design skill; installed |
| 2026-07-04 | [Claude Blog](https://github.com/AgriciDaniel/claude-blog) | B (84) | **IN USE** — SEO/GEO blog pipeline; installed |
| 2026-07-04 | [AgentsView](https://github.com/kenn-io/agentsview) | B+ (87) | **IN USE** — sessions `:8080` |
| 2026-07-04 | [TokenTracker](https://github.com/mm7894215/TokenTracker) | B+ (87) | **IN USE** — primary spend `:7680` |
| 2026-07-04 | [ccusage](https://github.com/ccusage/ccusage) | B+ (86) | **WATCH** — demoted; CLI alt only |
| 2026-07-07 | [Better Auth](https://github.com/better-auth/better-auth) | A (92) | **ADOPT** — Next-Flick local-first auth spike |
| 2026-07-07 | [Payload CMS](https://github.com/payloadcms/payload) | A (94) | **IN USE** — MSC; documented in STACK-OPTIONS |
| 2026-07-07 | [Stack Auth](https://github.com/stack-auth/stack) | B+ (86) | **WATCH** — Clerk-like self-host |
| 2026-07-07 | [Strapi](https://github.com/strapi/strapi) | B+ (87) | **WATCH** — GUI CMS alt |
| 2026-07-07 | [Directus](https://github.com/directus/directus) | B+ (86) | **WATCH** — SQL admin wrapper |
| 2026-07-07 | [Sanity](https://www.sanity.io/) | B+ (85) | **WATCH** — cloud content lake |
| 2026-07-07 | [MarkText](https://github.com/marktext/marktext) | A- (91) | **WATCH** — Jon trialing vs Markpad |
| 2026-07-07 | [Milkdown](https://github.com/Milkdown/milkdown) | B+ (88) | **WATCH** — custom editor framework |
| 2026-07-07 | [Hanko](https://github.com/teamhanko/hanko) | B (84) | **WATCH** — passkey server |
| 2026-07-07 | [KeystoneJS](https://github.com/keystonejs/keystone) | B (82) | **WATCH** — GraphQL CMS |
| 2026-07-07 | [Authgear](https://github.com/authgear/authgear-server) | B- (80) | **WATCH** — enterprise IdP |
| 2026-07-07 | [ApostropheCMS](https://github.com/apostrophecms/apostrophe) | B- (80) | **WATCH** — on-page CMS |
| 2026-07-07 | [Zettlr](https://github.com/Zettlr/Zettlr) | B+ (86) | **WATCH** — research MD editor |
| 2026-07-07 | Stack options index | — | **DOC** — [TOOLS-STACK-OPTIONS.md](./TOOLS-STACK-OPTIONS.md) |
| 2026-07-07 | [shadcn/ui](https://ui.shadcn.com/) | A+ (97) | **IN USE** — ecosystem default UI |
| 2026-07-07 | [Zod](https://zod.dev/) | A+ (96) | **IN USE** — MSC validation |
| 2026-07-07 | [React Hook Form](https://react-hook-form.com/) | A (93) | **IN USE** — MSC forms |
| 2026-07-07 | [TanStack Query](https://tanstack.com/query) | A (94) | **ADOPT** — client server-state |
| 2026-07-07 | [bknd](https://bknd.io/) | B+ (87) | **WATCH** — beta embedded BaaS |
| 2026-07-07 | [AgentMail](https://www.agentmail.to/) | A- (91) | **ADOPT** — key in Next-Flick `.env.local`; SDK/MCP when needed |
| 2026-07-13 | [cinematic-scroll-skill](https://github.com/MustBeSimo/cinematic-scroll-skill) | A- (92) | **ADOPT** — vendored vault + doctor; complements Scroll-Motion |
| 2026-07-13 | [scroll-cinematic-claude](https://github.com/zubair-trabzada/scroll-cinematic-claude) | B (84) | **WATCH** — Higgsfield MCP; Hermes uses fal |
| 2026-07-13 | [fullPage.js scroll effects](https://alvarotrigo.com/fullPage/scroll-effects/) | B- (82) | **WATCH** — section transitions; commercial license |
| 2026-07-13 | [codebase-memory-mcp](https://github.com/DeusData/codebase-memory-mcp) | A- (92) | **IN USE** — v0.9.0; JonBeatz indexed |
| 2026-07-13 | [OpenMontage](https://github.com/calesthio/OpenMontage) | A- (90) | **IN USE** — assets/openmontage; contracts pass |
| 2026-07-13 | [TRELLIS.2](https://github.com/microsoft/TRELLIS.2) | B- (82) | **WATCH** — OSS image→PBR GLB; Linux + 24GB VRAM; HF demo |
| 2026-07-13 | [Step Beyond](https://github.com/aievolutionpl/step-beyond) | B- (80) | **WATCH** — agent verify/permission skill v4 alpha; cherry-pick refs |
| 2026-07-13 | [OpenCut](https://github.com/OpenCut-app/OpenCut) | B- (82) | **WATCH** — CapCut alt; classic @ opencut.app; rewrite MCP pending |
| 2026-07-13 | [NoSignups](https://nosignups.net/) | B (84) | **REF** — no-signup OSS tool directory bookmark |
| 2026-07-13 | [emilkowalski/skills](https://github.com/emilkowalski/skills) | A- (90) | **IN USE** — 5 skills; `skills:emil:status` |
| 2026-07-13 | [Nemotron-Shared-Memory](https://github.com/TheLasTech/Nemotron-Shared-Memory) | B- (80) | **REF** — vault memory patterns; not NVIDIA Nemotron |
| 2026-07-13 | [LongCat Avatar 1.5](https://www.longcatai.org/news/video-avatar-1.5) | C+ (78) | **WATCH** — extends LongCat-Video; talking-head branch |
| 2026-07-13 | [EvoMap/evolver](https://github.com/EvoMap/evolver) | C+ (74) | **SKIP** — Cursor hooks risk; overlaps Mem0/vault |
| 2026-07-13 | [agency-agents](https://github.com/msitarzewski/agency-agents) | B+ (86) | **WATCH** — 230+ personas; cherry-pick only |
| 2026-07-13 | [AnythingLLM](https://github.com/mintplex-labs/anything-llm) | B (83) | **WATCH** — RAG chat alt; Hermes Desktop wins |
| 2026-07-13 | [Flowise](https://github.com/FlowiseAI/Flowise) | B- (82) | **WATCH** — visual agent flows; n8n/Hermes overlap |
| 2026-07-13 | [Agent-Reach](https://github.com/Panniantong/Agent-Reach) | B+ (87) | **RE-CONFIRMED IN USE** — grade holds |
| 2026-07-13 | [Capacitor](https://github.com/ionic-team/capacitor) | B- (82) | **WATCH** — web→native; Flutter primary for Jedi-iOS |
| 2026-07-13 | [brandmotion Violet Car prompt](https://brandmotion.in/violet-car.html) | B+ (85) | **REF** — scroll-video + liquid glass showcase spec |
| 2026-07-13 | [Prisma](https://www.prisma.io/) | B- (81) | **WATCH** — ORM alt; Drizzle/Payload in stack |
| 2026-07-13 | [Open Notebook](https://github.com/lfnovo/open-notebook) | B- (82) | **WATCH** — Docker Notebook LM; Mem0 local wins |
| 2026-07-13 | [Handy](https://github.com/cjpais/handy) | A- (91) | **ADOPT** — offline dictation; try first vs OpenWhispr |
| 2026-07-13 | [Wan2.1](https://github.com/Wan-Video/Wan2.1) | B+ (88) | **WATCH** — local T2V/I2V; ComfyUI path; fal/OpenMontage primary |
| 2026-07-13 | [Tabby](https://github.com/Eugeny/tabby) | B (83) | **WATCH** — tabbed terminal + SSH; optional Hermes ops shell |
| 2026-07-13 | [Graphify](https://github.com/Graphify-Labs/graphify) | B (84) | **WATCH** — multimodal knowledge graph; CBM IN USE |
| 2026-07-13 | [Artlist](https://artlist.io/) | B- (81) | **WATCH** — licensed stock + AI toolkit; paid |
| 2026-07-13 | [responsive-navbar topic](https://github.com/topics/responsive-navbar) | — | **REF** — pattern catalog bookmark (not a product) |
| 2026-07-13 | [HeyGem.ai](https://github.com/efarsoft/HeyGem.ai) | C+ (77) | **SKIP** — 70GB Docker avatar; D: drive + VRAM ops (chat only) |
| 2026-07-13 | [getdesign.md](https://getdesign.md/) | A- (91) | **IN USE** — DesignMD skill + `npx getdesign`; catalog 300+ brands |
| 2026-07-13 | [PixVerse](https://pixverse.ai/en) | C+ (77) | **SKIP** — cloud video API; fal/OpenMontage/Wan cover stack (chat only) |
| 2026-07-13 | [XConvert video→JPEG](https://www.xconvert.com/convert-video-to-jpeg) | C+ (78) | **SKIP** — server upload; ffmpeg on PATH wins (chat only) |
| 2026-07-13 | [Video-to-Images](https://github.com/akash-rajak/Video-to-Images) | D (64) | **SKIP** — stale 2021 OpenCV tkinter toy (chat only) |
| 2026-07-13 | [Vid2JPG](https://github.com/MichaelHolley/Vid2JPG) | C (74) | **SKIP** — OpenCV GUI; ffmpeg is primary (chat only) |
| 2026-07-13 | [mp4-to-jpg](https://github.com/allarddewinter/mp4-to-jpg) | B (85) | **REF** — bookmark [demo](https://allarddewinter.github.io/mp4-to-jpg/); Jon bookmark-only |
| 2026-07-13 | [Video To JPG / videotojpg.com](https://videotojpg.com/) | B+ (88) | **REF** — bookmark Jon 2026-07-13; blur detect + HEVC WASM |
| 2026-07-13 | [OnlineConverter video→JPG](https://www.onlineconverter.com/video-to-jpg) | C+ (77) | **SKIP** — server upload 200MB cap; ffmpeg/mp4-to-jpg win (chat only) |
| 2026-07-13 | [free-llm-api-resources](https://github.com/cheahjs/free-llm-api-resources) | B+ (88) | **REF** — 27k★ free API tier catalog |
| 2026-07-13 | [awesome-freellm-apis](https://github.com/open-free-llm-api/awesome-freellm-apis) | B+ (87) | **REF** — bookmark freellm.net Jon 2026-07-13; Cursor config generator |
| 2026-07-13 | [free-llm-api-resources](https://github.com/cheahjs/free-llm-api-resources) | B+ (88) | **RE-CONFIRMED REF** — grade holds (batch 5 re-send) |
| 2026-07-13 | [Directus](https://directus.com/) | B+ (87) | **RE-CONFIRMED WATCH** — native MCP + AI Studio; was 86 |
| 2026-07-13 | [Strapi](https://strapi.io/) | B+ (87) | **RE-CONFIRMED WATCH** — MCP GA; grade holds |
| 2026-07-13 | [cto.new](https://cto.new/) | B (83) | **WATCH** — free ad-supported multi-agent SaaS; Hermes overlap |
| 2026-07-13 | [Supabase](https://supabase.com/) | B+ (88) | **REF** — **bookmark** Neon alt for Next-Flick (Jon 2026-07-13) |
| 2026-07-13 | [Better Auth](https://www.better-auth.com/) | A (92) | **ADOPT → PARTIAL** — installed Next-Flick v7 local spike |
| 2026-07-13 | [hermes-browser-extension](https://github.com/abundantbeing/hermes-browser-extension) | A (93) | **ADOPT** — Hermes side panel v0.1.11; Local/Cloud/Remote gateway |
| 2026-07-13 | [deepseek-mcp-server](https://github.com/DMontgomery40/deepseek-mcp-server) | B (83) | **WATCH** — MCP Registry V4 tools; local stdio; skip hosted remote |
| 2026-07-13 | [DeepSeek-V4-Claude-Code-MCP](https://github.com/DeepSeek-V4-Claude-Code-MCP/DeepSeek-V4-Claude-Code-MCP) | C+ (74) | **SKIP** — 0★ marketing binary; bundled proxy risk (chat only) |
| 2026-07-13 | [PocketBase](https://pocketbase.io/) | A- (91) | **WATCH** — single-file Go backend; Neon/Supabase alt for MVPs |
| 2026-07-13 | [Theatre.js](https://www.theatrejs.com/) | B+ (86) | **WATCH** — R3F timeline editor; SCROLL-3D ref |
| 2026-07-13 | [Threlte](https://threlte.xyz/) | B (84) | **WATCH** — Svelte 3D; not primary React/R3F stack |
| 2026-07-13 | [Nellavio](https://github.com/nellavio/nellavio) | B- (81) | **WATCH** — Next.js admin dashboard starter |
| 2026-07-13 | [Refero MCP](https://refero.design/mcp) | A- (91) | **WATCH bookmark** — Jon: setup later; Pro $17/mo |
| 2026-07-13 | [Refero Styles](https://styles.refero.design/) | B+ (88) | **WATCH bookmark** — Jon: setup later; pair Refero MCP + DesignMD |
| 2026-07-13 | [MiMo Code](https://github.com/XiaomiMiMo/MiMo-Code) | C+ (76) | **REF bookmark** — Jon: blog/concepts only; no install |
| 2026-07-13 | [AgentsView](https://github.com/kenn-io/agentsview) | B+ (87) | **RE-CONFIRMED IN USE** — 4.4k★; `:8080` (unchanged) |
| 2026-07-13 | [MemPalace](https://github.com/MemPalace/mempalace) | B (84) | **WATCH bookmark** — Jon: setup later; additive vs Mem0 |
| 2026-07-13 | [Hermex](https://github.com/uzairansaruzi/hermex) | B+ (88) | **WATCH bookmark** — Jon: setup later; needs hermes-webui + tunnel; Telegram stays primary |
| 2026-07-13 | [Aight](https://aight.cool/) | B (85) | **WATCH bookmark** — Jon: setup later; Hermes gateway native iOS; Telegram stays primary |
| 2026-07-13 | [Strands Agents](https://strandsagents.com/) | C+ (74) | **SKIP** — AWS agent SDK; heavy Hermes overlap (chat only) |

---

## Workflow (when Jon sends a link) — v2

**Prompts:** `Review-Tool.md` (single / batch / design grade) · `Review-Session-Done.md` (closeout)

1. **Precheck** — `npm run tools:review-precheck -- "query"`; skip if already reviewed unless **re-review**
2. Research (Firecrawl/fetch, Tavily, Context7); **security-review** mandatory for auth/deploy/agent-config tools
3. Grade with fixed template (Gap, Overlap, **Risks**, Verify, Recommendation)
4. Persist B-+ → `TOOLS-*` + `sync:docs -- -Write`
5. Install gate **after** grades (batch = one AskQuestion)
6. Post-install → verify registry command → `npm run tools:status`
7. Closeout → **`review session done`**

| Trigger | Mode |
|---------|------|
| `review tool` / one URL | Single |
| `review batch` / many URLs | Batch + scoreboard |
| `review design` / `grade this site` | Design rubric |
| Design URL only | Bookmark → DESIGN-REFERENCES |
| `review session done` | Review-Session-Done.md |

---

## Related docs

- [TOOLS-SETUP-STATUS.md](./TOOLS-SETUP-STATUS.md) — **READY vs NEEDS_KEY** matrix (Hermes-wide)
- [TOOLS-REFERENCE.md](./TOOLS-REFERENCE.md) — full write-ups + grade breakdowns
- **[TOOLS-STACK-OPTIONS.md](./TOOLS-STACK-OPTIONS.md)** — **auth, CMS, DB, markdown editors** (new-project cheat sheet)
- [DESIGN-REFERENCES.md](./DESIGN-REFERENCES.md) — **inspiration & UI craft** (not install queue)
- [SCROLL-3D-REFERENCES.md](./SCROLL-3D-REFERENCES.md) — scroll animation, 3D scroll, video-frame scrub map
- [AI-Master-Plan.md](./AI-Master-Plan.md) — cloud vs local strategy
- [DISCOVERY-REPORT.md](./DISCOVERY-REPORT.md) — environment audit
- [Mobile-Dev-Master.md](./Mobile-Dev-Master.md) — Flutter strategy + iOS handoff
- [MOBILE-START-HERE.md](./MOBILE-START-HERE.md) — **mobile homebase** (tools, MCPs, skills, workflows)
- [MOBILE-TOOLS-WATCHLIST.md](./MOBILE-TOOLS-WATCHLIST.md) · [MOBILE-SETUP-STATUS.md](./MOBILE-SETUP-STATUS.md) · [MOBILE-MASTER-COMMANDS.md](./MOBILE-MASTER-COMMANDS.md)
