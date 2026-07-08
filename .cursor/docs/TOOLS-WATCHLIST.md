# Tools Watchlist — Hermes Ecosystem

**Canonical home:** `D:\Hermes\projects\_core-scripts\shared-profile-content\docs\TOOLS-WATCHLIST.md`  
**Setup status (keys / ready):** [TOOLS-SETUP-STATUS.md](./TOOLS-SETUP-STATUS.md)  
**Detailed reviews:** [TOOLS-REFERENCE.md](./TOOLS-REFERENCE.md)  
**Vault mirror:** `H:\Vader_Vault\04_Research\Repo-Watchlist.md`  
**Ecosystem MCP audit:** `D:\Hermes\projects\JonBeatz\.cursor\plans\2026-07-03-hermes-ecosystem-audit.plan.md`

Jon researches tools → paste links in Cursor → Draven reviews → **grade + summary + setup status** lands here.
---

## Evaluation policy (Jon 2026-07-04)

1. **Additive only** — approved tools join the arsenal. **Never replace or break** what's working (Mem0, DeepSeek, ComfyUI, MCPs, boot stack, etc.).
2. **Overlap is OK** — if a new tool is similar to something we have but is a strong **alternative on deck**, it can still earn **ADOPT** or **IN USE**. Pick the best tool per task; keep backups.
3. **Cost preference** — **open source + free first**. Minimal paid spend is fine when reward is high (e.g. Groq Whisper pennies, fal.ai per-image, DeepSeek daily driver).
4. **Every review gets** — letter grade (A+→F), score (/100), one-line summary, cost tag (`Free` / `Freemium` / `Paid`), overlap notes.
5. **Install gate** — **IN USE** only after Jon approves install (or explicit "run install now").
6. **Doc threshold (Jon 2026-07-04)** — only **B- (80+) and above** land in watchlist, setup-status, and workflow docs. **C+ and below:** grade in chat only — do not persist unless Jon explicitly asks.

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
| **Claude Blog** | **B (84)** | IN USE | **READY** | Free | 30-skill SEO/GEO blog pipeline — write, analyze, schema, editorial calendar |
| **ComfyUI MCP** | **A- (91)** | IN USE | PARTIAL | Free | Local GPU Comfy control from Cursor; pairs with `:8188` |
| **Context7 MCP** | **A (94)** | IN USE | **READY** | Free | Stops hallucinated library APIs — use before coding |
| **devini-tea (reference)** | **A (93)** | REF | **READY** | Free | Open-source scroll-video cinematic site + 2h build playbook — study, not install |
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
| **LongCat-Video** | B+ (87) | WATCH | NOT_INSTALLED | Free§ | Local 13.6B I2V — **fal credit fallback #1** |
| **HunyuanVideo** | B+ (86) | WATCH | NOT_INSTALLED | Free§ | Tencent 13B+ local I2V — **fal credit fallback #2**; FP8 weights |
| **LTX Desktop** | B+ (87) | WATCH | NOT_INSTALLED | Free OSS‡‡ | Local AI NLE + LTX-2.3 T2V/I2V — Jon download later (scroll clips) |
| **Open Generative AI + muapi** | B+ (87) | WATCH | NOT_INSTALLED | Freemium‡‡‡ | OSS Higgsfield-style studio; cloud = muapi wallet; local sd.cpp incl. Z-Image |
| **Hermes Agora** | B (84) | WATCH | PRE_RELEASE | Free | Unofficial 3D Hermes agent office visualizer — fun when it ships |
| **OpenRouter** | A- (92) | **IN USE** | **READY** | Pay-per-use | LiteLLM ~22 `*-or` aliases; Cursor Setup B/C — JonBeatz `CURSOR-MODELS-CHEATSHEET.md` |
| **OmniRoute** | B (85) | WATCH | NOT_INSTALLED | Free OSS | Self-hosted AI gateway alt to LiteLLM — 237 providers, compression, MCP; complex |
| **mockit-mcp** | B- (81) | WATCH | NOT_INSTALLED | Freemium | Text → premium iOS UI mockups (PNG+HTML) via Claude + Playwright |
| **OpenWhispr** | B (85) | WATCH | NOT_INSTALLED | Free OSS | Local dictation — Parakeet/Whisper STT; optional LM Studio `:1234` cleanup |
| **Calliop** | B- (82) | WATCH | NOT_INSTALLED | Free OSS | Wispr-style Windows dictation — whisper.cpp + local Qwen cleanup sidecar |
| **Hermes WebUI** | B+ (88) | WATCH | NOT_INSTALLED | Free OSS | Native Hermes web/mobile UI — alt to Telegram |
| **Open WebUI** | B (85) | WATCH | NOT_INSTALLED | Free OSS | Docker chat UI + Hermes API `:8642` |
| **AgentsView** | B+ (87) | IN USE | **READY** | Free OSS | Session search + messages — `:8080` |
| **TokenTracker** | B+ (87) | IN USE | **READY** | Free OSS | **Primary** spend dashboard — `:7680` |
| **ccusage** | B+ (86) | WATCH | **READY** | Free OSS | CLI Hermes-only alt — Jon prefers TokenTracker |
| **Payload CMS** | **A (94)** | **IN USE** | **READY** | Free OSS | MSC mystudiochannel.com — Next.js in-process v3; SQLite local |
| **Better Auth** | **A (92)** | **ADOPT** | NOT_INSTALLED | Free OSS | In-app auth + Drizzle/pg0; Next-Flick spike candidate |
| **Stack Auth / Hexclave** | B+ (86) | WATCH | NOT_INSTALLED | Free OSS† | Self-host Clerk-like; Docker + AGPL backend |
| **Strapi** | B+ (87) | WATCH | NOT_INSTALLED | Free OSS | Largest OSS CMS ecosystem; separate Node service |
| **Directus** | B+ (86) | WATCH | NOT_INSTALLED | Free OSS‡ | Database-first admin + API; wrap existing SQL |
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
| **shadcn/ui** | **A+ (97)** | **IN USE** | **READY** | Free OSS | Copy-paste Radix+Tailwind; Component-Registries skill |
| **Zod** | **A+ (96)** | **IN USE** | **READY** | Free OSS | Schema validation — MSC; pairs with RHF + APIs |
| **React Hook Form** | **A (93)** | **IN USE** | **READY** | Free OSS | Forms — MSC; use with Zod resolver |
| **TanStack Query** | **A (94)** | **ADOPT** | NOT_INSTALLED | Free OSS | Client server-state; App Router prefetch/hydrate |
| **bknd** | B+ (87) | WATCH | NOT_INSTALLED | Free OSS | Embedded BaaS (beta); Firebase alt; Next.js embed |

† Stack Auth: MIT SDK + AGPL backend.  
‡ Directus: BSL 1.1 under revenue cap; GPL alternative.  
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
| [OpenWhispr](https://github.com/OpenWhispr/openwhispr) · [openwhispr.com](https://openwhispr.com/) | B (85) | WATCH | **Try first** — local Parakeet on RTX 5060 Ti; global hotkey paste anywhere; optional cleanup via LM Studio `http://127.0.0.1:1234/v1` |
| [Calliop](https://github.com/Lappom/Calliop) | B- (82) | WATCH | Wispr-like **local Qwen cleanup** sidecar; Windows-only; unsigned installer; alt if OpenWhispr polish insufficient |

**Workflow (both):** click target field (Gmail compose, Notepad) → hotkey → speak → stop → auto-paste. OpenWhispr default **Ctrl+Win** (tap or push-to-talk); Calliop default **Alt+Space**.

**Not LM Studio by default:** STT models download inside each app (Parakeet/Whisper). LM Studio only for optional text cleanup (OpenWhispr Self-Hosted mode).

Install when Jon says try — not scheduled yet (2026-07-04).

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
| **Blog / SEO content** | Manual | **Claude Blog** | Articles, changelog posts; optional Gemini for hero images |
| **UI components** | shadcn + skills | React Bits Pro | New pages only |
| **Hermes dashboard** | Built-in + Reflect / plugins | [Hermes Agora](https://www.hermesagora.com/) | 3D fun visualizer; pre-release; unofficial |
| **LLM routing** | LiteLLM `:4000` + DeepSeek direct + **OpenRouter** `*-or` | **OmniRoute** | OpenRouter active via LiteLLM; OmniRoute = self-host experiment only |
| **Mobile UI design** | Penpot + Mobbin refs | **mockit-mcp** | Prompt → iOS PNG/HTML before Flutter build |
| Cloud **images** | HF `image:gen` (free) | fal.ai (paid bonus) | Already dual pipeline |
| Cloud **video / lip sync GUI** | fal Kling (`video:fal`) | **Open Generative AI + muapi** | OSS studio + muapi wallet; alt to Higgsfield-style UIs |
| Local **images/video** | ComfyUI | — | Generation, not consumption |
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
| [Better Auth](https://github.com/better-auth/better-auth) | A (92) | **ADOPT** | Next.js + Drizzle/pg0; replace Clerk dual-store |
| [Stack Auth](https://github.com/stack-auth/stack) | B+ (86) | WATCH | Clerk-like components; self-host Docker |
| [Hanko](https://github.com/teamhanko/hanko) | B (84) | WATCH | Passkey-first; separate auth server |
| [Authgear](https://github.com/authgear/authgear-server) | B- (80) | WATCH | Enterprise SSO/MFA; K8s ops |

### Headless CMS watch deck

| Tool | Grade | Verdict | When to reach for it |
|------|-------|---------|----------------------|
| [Payload](https://github.com/payloadcms/payload) | A (94) | **IN USE** | MSC + any new Next marketing site |
| [Strapi](https://github.com/strapi/strapi) | B+ (87) | WATCH | GUI content builder; non-dev editors |
| [Directus](https://github.com/directus/directus) | B+ (86) | WATCH | Admin over existing Postgres |
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

---

## Workflow (when Jon sends a link)

1. Research (fetch, Tavily, Context7, agents)
2. Compare vs **full stack** — note overlaps and **alternatives on deck**
3. Assign **grade + one-line summary + setup status** → tables above + `TOOLS-REFERENCE.md` + `TOOLS-SETUP-STATUS.md`
4. Verdict: IN USE / ADOPT / WATCH / SKIP — **additive only**
5. Install only after approval
6. Post-install: run doctor/preflight → update TOOLS-SETUP-STATUS → `npm run tools:status`
7. Optional: `npm run draven:add -- "Tool X: grade, verdict, one line"`

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
