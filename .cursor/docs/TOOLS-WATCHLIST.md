# Tools Watchlist — Hermes Ecosystem

**Canonical home:** `D:\Hermes\projects\_core-scripts\shared-profile-content\docs\TOOLS-WATCHLIST.md`  
**Setup status (keys / ready):** [TOOLS-SETUP-STATUS.md](./TOOLS-SETUP-STATUS.md)  
**Detailed reviews:** [TOOLS-REFERENCE.md](./TOOLS-REFERENCE.md)  
**Vault mirror:** `H:\Vader_Vault\04_Research\Repo-Watchlist.md`  
**Ecosystem MCP audit:** `D:\Hermes\projects\JonBeatz\.cursor\plans\2026-07-03_HERMES-ECOSYSTEM-AUDIT.md`

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

*Baseline grades for tools already in daily use — not re-reviewed each session.

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
- [DESIGN-REFERENCES.md](./DESIGN-REFERENCES.md) — **inspiration & UI craft** (not install queue)
- [SCROLL-3D-REFERENCES.md](./SCROLL-3D-REFERENCES.md) — scroll animation, 3D scroll, video-frame scrub map
- [AI-Master-Plan.md](./AI-Master-Plan.md) — cloud vs local strategy
- [DISCOVERY-REPORT.md](./DISCOVERY-REPORT.md) — environment audit
- [Mobile-Dev-Master.md](./Mobile-Dev-Master.md) — Flutter strategy + iOS handoff
- [MOBILE-START-HERE.md](./MOBILE-START-HERE.md) — **mobile homebase** (tools, MCPs, skills, workflows)
- [MOBILE-TOOLS-WATCHLIST.md](./MOBILE-TOOLS-WATCHLIST.md) · [MOBILE-SETUP-STATUS.md](./MOBILE-SETUP-STATUS.md) · [MOBILE-MASTER-COMMANDS.md](./MOBILE-MASTER-COMMANDS.md)
