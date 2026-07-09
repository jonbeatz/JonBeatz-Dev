# Tools Reference — Research Notes (JonBeatz Ecosystem)

**Canonical:** Hermes ecosystem · **Index:** [TOOLS-WATCHLIST.md](./TOOLS-WATCHLIST.md) · **Setup:** [TOOLS-SETUP-STATUS.md](./TOOLS-SETUP-STATUS.md)  
**Last updated:** 2026-07-04

Each entry: grade → summary → fit → overlap/alternatives → verdict.

**Policy:** Tools are **additive** to the arsenal. Overlap with existing tools is OK when the new option is a strong **alternative on deck**. Prefer **free/OSS**; minimal paid cost acceptable when ROI is high. Never break production stack.

---

## claude-video (`/watch`)

- **URL:** https://github.com/bradautomates/claude-video
- **Grade:** **A- (92/100)**
- **Status:** **IN USE** (installed 2026-07-04)
- **Type:** Cursor/Claude **skill** — video consumption for AI agents (not generation)
- **Stars:** ~3.1k (Jul 2026) · **License:** MIT · **Stack:** Python, `yt-dlp`, `ffmpeg`, optional Groq/OpenAI Whisper

### Grade breakdown

| Factor | Score | Notes |
|--------|-------|-------|
| Gap fill | 38/40 | Only tool that lets agent *see* video — nothing else in stack compares |
| Stack fit | 23/25 | Cursor-native install; zero VRAM; complements (not replaces) ComfyUI/Tavily |
| Cost/complexity | 16/20 | Free captions path; token burn on long videos; optional Groq key |
| Maturity/trust | 15/15 | 3.1k stars, MIT, pytest suite, active releases — young but polished |
| **Total** | **92** | **A-** |

**Why not A+:** Long-video token cost needs discipline (`--detail transcript`, `--start`/`--end`); Snyk flagged skill install (review scripts); Whisper fallback needs API key for caption-less sources.

### Install record (JonBeatz PC)

```text
yt-dlp 2026.07.04          pip install yt-dlp
ffmpeg 8.1.1               already on PATH
Skill path                 %USERPROFILE%\.agents\skills\watch
Install cmd                npx skills add bradautomates/claude-video -g -a cursor
Whisper fallback           optional — ~/.config/watch/.env (GROQ_API_KEY preferred)
Caption-only mode          works now without any API key
```

**Usage in Cursor:** invoke `/watch <url-or-path> [question]` or ask Draven to watch a video (skill auto-discovered).

### What it does

`/watch` lets an agent **understand video content** — the opposite of our ComfyUI video **generation** pipeline:

1. Accepts URL (YouTube, TikTok, Loom, X, … via `yt-dlp`) or local file (`.mp4`, `.mov`, …)
2. Pulls **native captions free** when available (`--detail transcript`)
3. Otherwise downloads minimal media, extracts **JPEG frames** (`ffmpeg`), transcribes audio (Whisper via Groq preferred or OpenAI)
4. Returns timestamped frames + transcript for the agent to **Read** as images + text
5. Modes: `efficient` (keyframes), `balanced` (scene cuts), `token-burner` (uncapped), focus windows via `--start`/`--end`

**Use cases:** competitor video teardowns, bug repro from screen recordings, summarize long tutorials, playlist → notes.

### Compare vs our current stack

| Need | Best tool today | claude-video better? |
|------|-----------------|----------------------|
| **Watch / analyze a video** (URL or `.mov`) | ❌ **Nothing** — agent guesses from title or plain fetch | ✅ **Yes — fills major gap** |
| YouTube **transcript text only** | Planned **Agent-Reach**; manual copy/paste | ✅ Better when visuals matter (UI demos, ads, hooks) |
| Web page / article research | **Tavily**, **fetch MCP**, Firecrawl skills | ❌ Different layer |
| Browser automation | **Playwright / browser MCP** | ❌ Can open a player, not frame+transcript pipeline |
| **Generate** video (txt2vid, img2vid) | **ComfyUI** `generate-video`, `animate-image` | ❌ Opposite direction — creation not consumption |
| Scroll-scrub **website build** | **Scroll-Video-Sequence** skill | ❌ Builds sites from frames; doesn't analyze source videos |
| Cloud / local **still images** | HF `image:gen`, fal, ComfyUI | ❌ Unrelated |
| LM Studio / Mem0 / DeepSeek | Text LLMs | ❌ No native video watch |

**Verdict: nothing we have is better for video understanding.** Tavily/fetch can't see frames. ComfyUI makes video; it doesn't watch it. Agent-Reach overlaps on YouTube subtitles only — claude-video is strictly stronger when the question is *what's on screen*.

### Ecosystem assessment

**Verdict: IN USE** (installed 2026-07-04)

### Optional: Whisper fallback

For videos **without captions** (local `.mov`, some TikToks), add `GROQ_API_KEY` to `%USERPROFILE%\.config\watch\.env`. Caption-only YouTube works **now** with no key.

Preflight: `python %USERPROFILE%\.agents\skills\watch\scripts\setup.py --check`

### When to use

- `/watch https://youtu.be/... summarize` or "what hook did they use?"
- Screen recording bug repro: `/watch bug.mov what's breaking?`
- Design research: scroll sites, motion references, competitor launches
- Course/playlist → structured notes

### When to skip

- Generating video → ComfyUI
- Building scroll-frame hero → Scroll-Video-Sequence skill
- Simple web article → Tavily/fetch
- Only need tweet/Reddit text → Agent-Reach (when installed)

---

## React Bits

- **URL:** https://www.reactbits.dev/ | https://github.com/DavidHDev/react-bits
- **Grade:** **B+ (88/100)** · **Cost:** Free (MIT) / Pro $99–299 lifetime
- **Verdict:** **WATCH (P2)**
- **Summary:** 130+ copy-paste animated React components — fast prototyping for **new** pages, not locked engines.
- **Stars:** 41,000+ (2026-07-01, #2 in JS Rising Stars 2025)
- **License:** MIT + Commons Clause (free) / $99–$299 Pro
- **Stack:** React 19/Next.js 16, Tailwind CSS 4 or vanilla CSS, optional GSAP/Three.js/Matter.js

### What it does

130+ animated, interactive, customizable React components for text effects, animated backgrounds, and UI elements:

- **4 variants per component** — JS-CSS, JS-TW, TS-CSS, TS-TW
- **Minimal dependencies** — CSS animations by default; GSAP/Three only when needed
- **RSC compatible** — CSS-based components work in server components
- **Copy-paste via CLI** — shadcn/jsrepo protocol; you own the code
- **Pro** ($99–$299 lifetime): premium components, UI blocks, Next.js templates, AI SKILL.md

### Ecosystem assessment

**Verdict: WATCH (P2)** — Pro optional; free tier + MIT is enough to evaluate.

**Alternatives on deck:** shadcn, Magic UI, Aceternity (Component-Registries skill), Premium-UI patterns — React Bits is another component source, not a replacement.

### When to use

- New section outside a locked engine (e.g. DigitalStudioz marketing blocks)
- Quick **fluid cursor, text scramble, particle background** without bespoke build
- Prototyping before committing to custom GSAP/R3F

### When to skip

- VaderLabz saber experience (purpose-built Three.js)
- DigitalStudioz `engine.tsx` locked inline-`S` layout

---

## Penpot

- **URL:** https://penpot.app/
- **Grade:** **B (82/100)** · **Cost:** Free OSS (self-hostable)
- **Verdict:** **WATCH (P3)**
- **Summary:** Open Figma alternative with MCP — for designer handoff, not daily code-first workflow.

### What it does

Full UI design, wireframing, prototyping, design tokens, CSS Grid/Flexbox. Self-hostable; open file format; design-to-code pipelines via MCP.

### Ecosystem assessment

**Verdict: WATCH (P3)**

We build **directly in code** (Tailwind + React). Penpot pays off only if:

- Collaborating with a **non-coding designer**
- Self-hosting design instead of Figma subscription
- Running **Penpot MCP + Cursor** design-to-code experiments

**Alternatives on deck:** **Pencil MCP** (already in JonBeatz manifest) — use Pencil for quick canvas; Penpot if self-hosted Figma-like workflow or external designer.

### When to use

- Designer handoff workflow
- Client wants mockups before build (MSC, etc.)

---

## Agent-Reach

- **URL:** https://github.com/Panniantong/Agent-Reach
- **Grade:** **B+ (87/100)** · **Cost:** Free (MIT)
- **Verdict:** **IN USE** (installed 2026-07-04)
- **Summary:** CLI breadth layer — Twitter/Reddit/RSS/YouTube **text**, Exa search; complements claude-video.

| Factor | Score | Notes |
|--------|-------|-------|
| Gap fill | 32/40 | Overlaps Tavily/fetch; still adds social + RSS + unified CLI |
| Stack fit | 22/25 | Python CLI, zero VRAM, Cursor-compatible SKILL.md |
| Cost/complexity | 18/20 | Free; burner accounts for login-gated platforms |
| Maturity/trust | 15/15 | 48k+ stars, active |

### What it does

One install configures agent-accessible channels:

- **Zero-config:** webpages, YouTube subtitles, GitHub repos, RSS
- **With login:** Twitter, Reddit, Bilibili, etc. (burner accounts recommended)
- **Search:** Exa semantic search (MCP-based)
- **Self-healing:** multi-backend routing per platform
- **`agent-reach doctor`** — channel diagnostics
- **SKILL.md** registration for Cursor/Claude Code

### Ecosystem assessment

**Keep both Agent-Reach and claude-video on deck:**

| Task | Use |
|------|-----|
| Visual video analysis (hooks, UI in recording) | **claude-video** |
| YouTube transcript only, fast | **Agent-Reach** or claude-video `--detail transcript` |
| Twitter / Reddit / RSS monitoring | **Agent-Reach** |
| General web article | **Tavily / fetch** |

### Install record (JonBeatz PC 2026-07-04)

```text
Venv                       %USERPROFILE%\.agent-reach-venv
CLI install                pip install github.com/Panniantong/agent-reach/archive/main.zip
Setup                      agent-reach install --env=auto --safe
Doctor                     npm run agent-reach:doctor  (7/15 channels active)
Skill                      %USERPROFILE%\.agents\skills\agent-reach
Exa search                 mcporter + https://mcp.exa.ai/mcp (free, no key)
YouTube                    yt-dlp --js-runtimes node in %APPDATA%\yt-dlp\config
Optional social            agent-reach install --channels=twitter,reddit,...
```

### Prerequisites

- Python 3.10+
- Burner accounts for login-gated platforms

---

## NeuTTS

- **URL:** https://github.com/neuphonic/neutts
- **Grade:** **A- (90/100)** · **Cost:** Free (Apache 2.0 / NeuTTS Open License for Nano)
- **Verdict:** **WATCH**
- **Summary:** On-device **voice-clone** TTS (GGUF/CPU path); needs reference wav + transcript — alt when clone fidelity matters more than OmniVoice instruct speed.

| Factor | Score | Notes |
|--------|-------|-------|
| Gap fill | 34/40 | Strong clone path; overlaps OmniVoice clone mode but lighter CPU story |
| Stack fit | 22/25 | Local-only; no API key; fits Draven ritual *if* ref clip workflow added |
| Cost/complexity | 18/20 | Free models; RAM for GGUF; no VRAM required on CPU path |
| Maturity/trust | 16/15 | Neuphonic-backed; active 2025–2026 |

### vs OmniVoice (production)

| | OmniVoice (IN USE) | NeuTTS |
|--|-------------------|--------|
| Mode | **Instruct** — text describes voice | **Clone** — ref wav + transcript |
| VRAM | 0 (CPU) | 0 on CPU GGUF path |
| Ritual fit | **Current default** | Needs recorded Draven reference |

**Install gate:** NOT_INSTALLED — Jon approval only. See profile `VOICE-WORKFLOW.md` (Draven ritual policy).

---

## OmniVoice-Studio

- **URL:** https://github.com/debpalash/OmniVoice-Studio
- **Grade:** **B+ (87/100)** · **Cost:** Free OSS (AGPL-3.0; commercial license available)
- **Verdict:** **WATCH**
- **Summary:** Desktop ElevenLabs-style **GUI** — voice design, cloning, dubbing, dictation; **14 TTS engines** including OmniVoice; built-in MCP server.

| Factor | Score | Notes |
|--------|-------|-------|
| Gap fill | 30/40 | Complements `draven:speak` scripts — lab/GUI layer, not replacement |
| Stack fit | 22/25 | Wraps OmniVoice we already use; optional GPU per engine |
| Cost/complexity | 16/20 | Free; GPU engines compete with LM Studio VRAM if enabled |
| Maturity/trust | 19/15 | Active (700+ commits); beta desktop app |

### When to use

- A/B clone experiments, dubbing, side-by-side engine comparison
- MCP-driven TTS from agents without custom scripts

### When to skip

- Daily Start/End Project rituals — keep lightweight `npm run draven:speak`
- When VRAM budget is tight — disable GPU engines or don't run alongside ComfyUI

---

## LuxTTS

- **URL:** https://github.com/ysharma3501/LuxTTS
- **Grade:** **B (86/100)** · **Cost:** Free
- **Verdict:** **WATCH**
- **Summary:** Fast **voice-clone** TTS (~1 GB VRAM on GPU, 48 kHz); speed/GPU alternative when clone quality experiments beat OmniVoice CPU latency.

| Factor | Score | Notes |
|--------|-------|-------|
| Gap fill | 32/40 | Clone-only; faster GPU path than OmniVoice CPU |
| Stack fit | 20/25 | Needs ref clip; VRAM competes with ComfyUI/LM Studio |
| Cost/complexity | 17/20 | Free; GPU ~1 GB when accelerated |
| Maturity/trust | 17/15 | Smaller community than NeuTTS/OmniVoice |

### vs NeuTTS

| | NeuTTS | LuxTTS |
|--|--------|--------|
| Grade | A- (90) | B (86) |
| Strength | CPU/GGUF on-device clone | GPU speed, 48 kHz |
| Ref clip | wav + transcript | wav |

**Install gate:** NOT_INSTALLED — Jon approval only.

---

## OpenWhispr

- **URL:** https://github.com/OpenWhispr/openwhispr · [openwhispr.com](https://openwhispr.com/) · [docs](https://docs.openwhispr.com/quickstart)
- **Grade:** **B (85/100)** · **Cost:** Free OSS (optional paid Lazy Edition — not required)
- **Verdict:** **WATCH** — Jon to install and trial later (2026-07-04)
- **Summary:** Cross-platform **local dictation** — global hotkey, paste at cursor in any app. STT via **Whisper** or **NVIDIA Parakeet** (downloads inside app). Optional text cleanup via bundled llama.cpp **or** Self-Hosted OpenAI-compatible endpoint (**LM Studio** `http://127.0.0.1:1234/v1`).

| Factor | Score | Notes |
|--------|-------|-------|
| Gap fill | 34/40 | Strong Win+H replacement; speak-**in** vs Draven speak-**out** |
| Stack fit | 22/25 | Parakeet fits RTX 5060 Ti; can reuse LM Studio for cleanup only |
| Cost/complexity | 18/20 | Free local; ~631 MB+ model download; tray app + start-with-Windows |
| Maturity/trust | 11/15 | ~4.2k★; active; Windows Whisper fixes in changelog |

### Workflow (Windows)

1. Click text field (Gmail compose, Notepad, Cursor chat).
2. **Ctrl+Win** (default) — tap-to-talk or enable **push-to-talk** (hold/release).
3. Speak → stop → local transcribe → auto-paste (`Ctrl+V`; terminals get `Ctrl+Shift+V`).

### vs Calliop / Win+H

| | OpenWhispr | Calliop | Win+H |
|--|------------|---------|-------|
| Local/offline | Yes (after model DL) | Yes | Often cloud-dependent |
| STT engine | Parakeet / Whisper | whisper.cpp | Microsoft |
| LLM cleanup | Optional (bundled or LM Studio) | Bundled Qwen sidecar | Minimal |
| Hotkey | Ctrl+Win (configurable) | Alt+Space | Win+H |

### Install (when approved)

Download Windows `.exe` from [releases](https://github.com/OpenWhispr/openwhispr/releases/latest) → onboarding **Local** → **Parakeet** → allow microphone → optional Self-Hosted cleanup → LM Studio `:1234/v1`.

See [VOICE-WORKFLOW.md](./VOICE-WORKFLOW.md) — dictation is **inbound STT**, not ritual TTS.

---

## Calliop

- **URL:** https://github.com/Lappom/Calliop
- **Grade:** **B- (82/100)** · **Cost:** Free OSS (AGPL-3.0)
- **Verdict:** **WATCH** — backup trial if OpenWhispr cleanup insufficient (2026-07-04)
- **Summary:** Windows-only **Wispr Flow–style** dictation — **whisper.cpp** STT + **calliop-llm-worker** (llama.cpp) **Qwen3** cleanup sidecar. Does **not** integrate with LM Studio; self-contained model downloads.

| Factor | Score | Notes |
|--------|-------|-------|
| Gap fill | 32/40 | Local polish layer; early project (~2★) |
| Stack fit | 20/25 | Duplicate Qwen vs LM Studio; Vulkan whisper.cpp on GPU |
| Cost/complexity | 17/20 | ~466 MB Whisper + Qwen DL; unsigned SmartScreen |
| Maturity/trust | 13/15 | Active Tauri app; small community |

### Workflow (Windows)

1. Click target field → **Alt+Space** (toggle or push-to-talk).
2. Whisper transcribes → optional local Qwen removes fillers / fixes punctuation → paste.

### vs OpenWhispr

| | Calliop | OpenWhispr |
|--|---------|------------|
| Platform | Windows only | Win / Mac / Linux |
| Cleanup | Always bundled Qwen sidecar | Optional; can point at LM Studio |
| Maturity | Early | Larger community |
| Try order | **Second** | **First** |

### Install (when approved)

`Calliop_*_x64-setup.exe` from [releases](https://github.com/Lappom/Calliop/releases) → accept SmartScreen → first-run Whisper model download.

---

## ComfyUI MCP (local)

- **URL:** `npx -y comfyui-mcp`
- **Grade:** **A- (91/100)** · **Cost:** Free (MIT)
- **Verdict:** **IN USE**
- **Summary:** Cursor MCP for local ComfyUI — start workflows, health check, models; requires `:8188` running.

| Factor | Score | Notes |
|--------|-------|-------|
| Gap fill | 36/40 | Agent GPU image/video control from Cursor |
| Stack fit | 24/25 | Wired in `.cursor/mcp.json`; pairs with existing Comfy scripts |
| Cost/complexity | 17/20 | Free; uses VRAM only when Comfy running |
| Maturity/trust | 14/15 | Official-style MCP; 113 tools |

**Alternatives:** npm `comfy:*` scripts, comfyui-mcp when agent needs programmatic control in chat.

See [IMAGE-WORKFLOW.md](./IMAGE-WORKFLOW.md).

---

## find-skills (Vercel Labs)

- **URL:** https://github.com/vercel-labs/skills · [find-skills](https://stayahead.space/resources/find-skills)
- **Grade:** **A- (91/100)** · **Cost:** Free (MIT)
- **Verdict:** **IN USE** (installed 2026-07-04)
- **Summary:** Meta-skill on the Vercel `skills` CLI — search 2000+ agent skills by task instead of hunting GitHub.

| Factor | Score | Notes |
|--------|-------|-------|
| Gap fill | 38/40 | Discovery layer on top of manual `npx skills add` |
| Stack fit | 24/25 | Same CLI we use for gsap-skills, claude-video, agent-reach |
| Cost/complexity | 20/20 | One install; no keys |
| Maturity/trust | 9/15 | Vercel Labs; 2M+ installs on skills.sh |

### Commands

```powershell
npx skills add https://github.com/vercel-labs/skills --skill find-skills -g -a cursor
npx skills find scroll animation
npx skills find video watch
```

### When to use

- Jon pastes a stayahead.space / skills.sh link — verify catalog before custom install
- Before building a new workflow — "is there already a skill for X?"

---

## Hallmark (nutlope)

- **URL:** https://github.com/nutlope/hallmark · [usehallmark.com](https://www.usehallmark.com/)
- **Grade:** **B+ (88/100)** · **Cost:** Free (MIT)
- **Verdict:** **IN USE** (installed 2026-07-04)
- **Summary:** Design **skill** that refuses AI-slop UI — 57 gates, 20 themes, 21 macrostructures, OKLCH tokens, paired fonts.

| Factor | Score | Notes |
|--------|-------|-------|
| Gap fill | 34/40 | Agent-time taste enforcement at generation |
| Stack fit | 23/25 | Cursor-native; complements NovaMira/DesignMD |
| Cost/complexity | 20/20 | One skill install; no keys |
| Maturity/trust | 11/15 | ~3.5k★; nutlope/Together |

### Install

```powershell
npm run skills:hallmark:install
# or: npx skills add nutlope/hallmark -g -a cursor -y
```

Skill path: `%USERPROFILE%\.agents\skills\hallmark`

---

## Claude Blog (AgriciDaniel)

- **URL:** https://github.com/AgriciDaniel/claude-blog · [claude-blog.md](https://claude-blog.md/)
- **Grade:** **B (84/100)** · **Cost:** Free (MIT)
- **Verdict:** **IN USE** (installed 2026-07-04)
- **Summary:** **30-skill** blog/SEO/GEO pipeline — research → write → score (0–100) → schema; 5 agent roles.

### Install

```powershell
npm run skills:claude-blog:install
npm run skills:claude-blog:scripts
```

Cursor: chat *"Use the blog skill to write …"*. Claude Code: `/blog write "topic"`.

Optional: `GOOGLE_AI_API_KEY` for hero images.

---

## Claude Watch (devinilabs)

- **URL:** https://github.com/devinilabs/claude-watch · [stayahead](https://stayahead.space/resources/claude-watch)
- **Grade:** **B+ (88/100)** · **Cost:** Free (MIT)
- **Verdict:** **IN USE** (installed 2026-07-04)
- **Summary:** Video → structured **study notes** — scene-aware frames, timestamped transcript, persistent slug library.

| Factor | Score | Notes |
|--------|-------|-------|
| Gap fill | 32/40 | Persistent tutorial library; overlaps claude-video on frames |
| Stack fit | 22/25 | Python + yt-dlp + ffmpeg; skill for Cursor |
| Cost/complexity | 18/20 | Free captions; optional Whisper/Groq |
| Maturity/trust | 16/15 | devinilabs; complements bradautomates claude-video |

### vs claude-video

| Task | Use |
|------|-----|
| Agent needs to **see** video during a coding task | **claude-video** |
| Build searchable **learning notes** from tutorials | **Claude Watch** |
| YouTube transcript text only | **Agent-Reach** |

### Install

```powershell
npx skills add https://github.com/devinilabs/claude-watch -g -a cursor
```

Skill path: `%USERPROFILE%\.agents\skills\claude-watch`

---

## Agent Browser (Vercel Labs)

- **URL:** https://github.com/vercel-labs/agent-browser · [agent-browser.dev](https://agent-browser.dev)
- **Grade:** **B+ (86/100)** · **Cost:** Free (Apache-2.0)
- **Verdict:** **IN USE** (CLI installed 2026-07-04)
- **Summary:** Rust browser automation CLI + optional MCP — ref-based snapshots (`@e1`, `@e2`), Web Vitals, network intercept.

| Factor | Score | Notes |
|--------|-------|-------|
| Gap fill | 28/40 | Overlaps cursor-ide-browser, Playwright, Browserbase |
| Stack fit | 22/25 | Native binary; fast; good for headless agent runs |
| Cost/complexity | 18/20 | Free; bundles Chrome to `~\.agent-browser\` |
| Maturity/trust | 18/15 | 36K+ stars; Vercel Labs |

### vs browser stack

| Task | Use |
|------|-----|
| In Cursor chat tab automation | **cursor-ide-browser** (default) |
| Headless CLI / CI smoke / Rust MCP | **Agent Browser** |
| Cross-browser E2E tests | **Playwright MCP** |
| Cloud browser sessions | **Browserbase MCP** |

### Install

```powershell
npm install -g agent-browser
agent-browser install
agent-browser open example.com
agent-browser snapshot -i
```

Version on Jon PC (2026-07-04): **0.31.1**

---

## Agent Skills (Addy Osmani)

- **URL:** https://github.com/addyosmani/agent-skills · [stayahead](https://stayahead.space/resources/agent-skills)
- **Grade:** **B (84/100)** · **Cost:** Free (MIT)
- **Verdict:** **IN USE** (installed 2026-07-04) — **cherry-pick only**
- **Summary:** 24 production engineering skills — spec → plan → build → verify → review → ship with verification gates.

| Factor | Score | Notes |
|--------|-------|-------|
| Gap fill | 26/40 | Overlaps Start/End Project, Branch-Cut, Review-Tool, Workflow-Portable |
| Stack fit | 20/25 | Slash commands map better to Claude Code; skills work in Cursor |
| Cost/complexity | 20/20 | Free; no keys |
| Maturity/trust | 18/15 | 61K+ stars; Addy Osmani |

### Cherry-pick (don't replace TRUTH rituals)

| Osmani skill | Hermes equivalent |
|--------------|-------------------|
| `spec-driven-development` | TRUTH.md + Start Project |
| `test-driven-development` | Project-specific tests |
| `shipping-and-launch` | Branch-Cut + release ritual |
| `security-and-hardening` | security-review subagent |

### Install

```powershell
npx skills add https://github.com/addyosmani/agent-skills -g -a cursor
```

Skills land in `%USERPROFILE%\.agents\skills\` (spec-driven-development, test-driven-development, etc.)

---

## AgentMail

- **URL:** https://www.agentmail.to/ · **Docs:** https://docs.agentmail.to/
- **Grade:** **A- (91/100)** · **Cost:** Freemium — free tier, no credit card to start; paid at scale
- **Verdict:** **ADOPT** — on deck for agent email workflows; key provisioned 2026-07-07
- **Setup:** **PARTIAL** — `AGENTMAIL_API_KEY` SET in Next-Flick `.env.local`; SDK/MCP not installed until first use
- **Summary:** Email **inbox API for AI agents** — programmatic inboxes, threads, replies, attachments, webhooks, semantic search. YC-backed (Seed $6M).

### vs our stack

| | **Resend (IN USE — MSC)** | **AgentMail (ADOPT)** |
|---|---------------------------|------------------------|
| Model | Transactional **outbound** (Payload, site email) | **Two-way** agent inboxes (read + reply) |
| Use case | "Send password reset / contact form" | "Agent signs up for service, reads OTP, handles support thread" |
| Overlap | Both send email | Different layer — **complementary**, not a Resend replacement |

### When to reach for it

- Browser/automation agents need **OTP / verification codes** from email
- Executive-assistant flows — schedule via email thread
- Parse **attachments** (invoices, receipts) into agent pipeline
- Customer-service routing — ingest + classify inbound mail
- Hermes/Telegram agent needs a dedicated `@agentmail.to` (or custom domain) inbox

### Setup (when Jon says go)

1. Key already in Next-Flick `.env.local` → `AGENTMAIL_API_KEY`
2. TypeScript: `npm i agentmail` or Python SDK per [docs](https://docs.agentmail.to/)
3. Optional: AgentMail MCP for Cursor agent tooling
4. Copy key to JonBeatz `.env.local` / `.env.local.master` if used from hub-wide scripts

### Grade breakdown

| Factor | Score | Notes |
|--------|-------|-------|
| Gap fill | 38/40 | No current agent inbox layer; Resend is outbound-only |
| Stack fit | 23/25 | REST + TS/Python SDKs + MCP; fits Hermes agent stack |
| Cost/complexity | 17/20 | Freemium; API-only until integrated |
| Maturity | 13/15 | YC, enterprise references, 100M+ emails claimed |

**Install gate:** ADOPT — no SDK install until a concrete agent email task.

---

## devini-tea (reference — not a CLI)

- **URL:** https://github.com/devinilabs/devini-tea · [stayahead](https://stayahead.space/resources/devini-tea)
- **Grade:** **A (93/100)** · **Cost:** Free (open source)
- **Verdict:** **REF** — linked in [SCROLL-3D-REFERENCES.md](./SCROLL-3D-REFERENCES.md)
- **Summary:** Luxury tea-brand site where **scroll drives cinematic video frame-by-frame** — open source + 2h prompt playbook.

| Factor | Score | Notes |
|--------|-------|-------|
| Gap fill | 38/40 | Best reference build for scroll-video cinematic sites |
| Stack fit | 24/25 | HTML/JS; study with `Scroll-Video-Sequence` skill |
| Cost/complexity | 20/20 | Clone repo; no npm install on Hermes profiles |
| Maturity/trust | 11/15 | devinilabs; prompt guide on Google Docs |

### When to use

- Before JonBeatz.dev Tier 2 scroll hero
- Frame extraction + sticky runway pattern validation

---

## Hermes Agora

- **URL:** https://www.hermesagora.com/
- **Grade:** **B (84/100)** · **Cost:** Free (community)
- **Verdict:** **WATCH (pre-release)**
- **Summary:** Unofficial 3D “virtual office” dashboard — agent avatars walk zones (designers, library, café, play room) while a HUD streams gateway/sessions/host telemetry.
- **Status:** `v0.1.0` coming soon (Jul 2026) — no public repo or install guide yet
- **Disclaimer:** Not affiliated with Nous Research / Hermes — fan project per site

### Stack fit (Jon)

- Pairs with existing **Hermes Desktop** + **jonbeatz** profile + gateway (`:9119` dashboard)
- **Fun / monitoring only** — does not replace Cursor, Mem0, or built-in dashboard plugins ([Mindscape](https://github.com/southy404/hermes-mindscape), [Labyrinth](https://github.com/stainlu/hermes-labyrinth))
- Likely needs **local Hermes gateway running** + browser WebGL when released

### When to use

- Idle-agent eye candy while fleet/Telegram sessions run
- Show-and-tell demo of Hermes multi-agent setup

### When not to use

- Production debugging (use Hermes dashboard + Labyrinth/Mindscape)
- Anything requiring official support

**Install gate:** wait for public release + integration docs; then wire to `%LOCALAPPDATA%\hermes\` if straightforward.

---

## OpenRouter

- **URL:** https://openrouter.ai/
- **Grade:** **A- (92/100)** · **Cost:** Pay-per-use (+ ~5.5% platform fee)
- **Verdict:** **IN USE** — LiteLLM `*-or` aliases on `:4000`; Cursor Setup B unchanged (same master key + ngrok)
- **Summary:** Unified OpenAI-compatible API for **400+ models**. Jon routes OR through **LiteLLM** (`OPENROUTER_API_KEY` in `deepseek-api/.env.local`); Cursor never pastes OR key on Setup B.

### Stack fit (JonBeatz hub — 2026-07-05)

- **Direct DeepSeek** stays primary — `deepseek-v4-pro` / `deepseek-v4-flash` via `DEEPSEEK_API_KEY` (no OR duplicate).
- **OpenRouter** for providers without direct keys — Qwen, GLM, Kimi, Claude, Gemini, GPT, Grok, free tier.
- **~22 `*-or` aliases** in `_core-scripts/deepseek-api/config/litellm_config.yaml`.
- **Registry:** JonBeatz `config/cursor-models.example.yaml` · **`npm run cursor:models`** · doc **`CURSOR-MODELS-CHEATSHEET.md`** (Setup B vs C, Auto vs BYOK, pricing).

### Cursor setups

| Setup | Cursor key | Override URL | Model names |
|-------|------------|--------------|-------------|
| **B — LiteLLM** (daily) | `sk-jonbeatz-deepseek-2026` | ngrok `/v1` | `deepseek-v4-pro`, `*-or` aliases |
| **C — OR direct** | `sk-or-v1-...` | `openrouter.ai/api/v1/cursor` | OpenRouter slugs (`z-ai/glm-4.5-air`, …) |

**Auto mode:** With Setup B ON, **Auto** uses Cursor subscription (Composer 2.5-ish) — **not** the custom `-or` list. Pick models explicitly for LiteLLM routing.

### When to use

- A/B models without new provider accounts
- Code workhorses: `qwen-coder-or`, `glm-air-or`, `kimi-k2.7-code-or`
- Premium experiments: Sonnet/Opus, Gemini 3.5, GPT-5.4 (toggle in registry)

### Setup

1. `OPENROUTER_API_KEY` in JonBeatz `.env.local`
2. `npm run sync:deepseek-env` → `deepseek-api/.env.local`
3. Aliases in `litellm_config.yaml` (sync via `npm run cursor:models:sync:write` from JonBeatz)
4. Cursor: add aliases from **`CURSOR-MODELS-CHEATSHEET.md`** Setup B block

**Overlap:** LiteLLM stays the local gate; OpenRouter is one **provider**, not a replacement proxy.

**Removed (do not register):** `deepseek-v4-pro-or`, `kimi-k2-or`, `glm-4-or` — superseded by direct DeepSeek + `kimi-k2.7-code-or` / `glm-air-or`.

---

## OmniRoute

- **URL:** https://github.com/diegosouzapw/OmniRoute · https://omniroute.online
- **Grade:** **B (85/100)** · **Cost:** Free OSS (MIT) — paid provider usage varies
- **Verdict:** **WATCH** — alternative on deck; **do not replace LiteLLM** without isolated test
- **Stars:** ~11k · **273 releases** (v3.8.x, Jul 2026) — very active TypeScript gateway

### What it is

Self-hosted **AI gateway** at `http://localhost:20128/v1` — aggregates **237+ providers** (90+ free tiers claimed), auto-fallback, token compression (RTK + Caveman), built-in **MCP server** (87 tools), dashboard, desktop/PWA. Markets heavily toward routing Cursor/Claude Code/Copilot through free OAuth pools.

### vs our stack

| | **LiteLLM `:4000` (IN USE)** | **OmniRoute (WATCH)** |
|---|---------------------------|----------------------|
| Role | Production DeepSeek + Hermes + Cursor | Multi-provider playground + compression |
| Maturity | Jon's daily driver, verified | Huge community; complex surface area |
| Python integration | Native Hermes scripts | Node/TS — separate process |
| Free-tier routing | Not the goal | Core pitch — **ToS / stability risk** |
| MITM / OAuth tricks | No | Yes — gray area for production |

### When it might help

- Experimenting with **many models** without wiring each into LiteLLM yaml
- Token compression on **tool-heavy** agent sessions
- Side-by-side eval — run on **different port**, not `:4000`

### When to skip

- Replacing working DeepSeek/LiteLLM boot stack
- Production Hermes/Telegram without audit
- Jon only needs OpenRouter — simpler path (see above)

**Install gate:** isolated VM or second port trial only; read `docs/comparison/OMNIROUTE_VS_ALTERNATIVES.md` first.

---

## mockit-mcp

- **URL:** https://github.com/karyaboyraz/mockit-mcp
- **Grade:** **B- (81/100)** · **Cost:** Freemium — Claude CLI subscription **or** Anthropic API per mock
- **Verdict:** **WATCH (mobile)**
- **Summary:** MCP server — natural language → **premium iOS UI mockups** (PNG + HTML) via Claude Opus + Playwright (390×844 @2x default).
- **Stars:** 2 (early) · MIT · Node 20+

### Stack fit (Jedi-iOS)

- **Design-before-code** for Flutter screens — mock in Cursor, then implement in `jb_ui`
- Complements **Penpot** (full design system) and **Mobbin** (reference patterns)
- Does **not** generate Flutter/Dart — HTML mock only (SwiftUI port on roadmap)

### MCP tools (4)

Generate screen, iterate, batch concepts — see repo `docs/tools.md`.

### Setup sketch

```json
"mockit-mcp": {
  "command": "npx",
  "args": ["-y", "mockit-mcp"],
  "env": { "MOCKIT_BACKEND": "cli" }
}
```

Requires Playwright Chromium (~170 MB) + Claude CLI or `ANTHROPIC_API_KEY`.

**Mobile doc:** also listed in [MOBILE-TOOLS-WATCHLIST.md](./MOBILE-TOOLS-WATCHLIST.md).

---

## MCP & platform candidates (ecosystem audit)

| Server | Grade | Verdict | Cost | Summary |
|--------|-------|---------|------|---------|
| **Context7** | A (94) | IN USE | Free | Library docs — check before API calls |
| **Firecrawl MCP** | B+ (86) | WATCH | Freemium | Deep scrape; **alt** to Tavily — firecrawl skills already vendored |
| **Stripe / Vercel / Firebase** | B+ (85) | IN USE | Free tier | Cursor plugins for deploy/billing |
| **Composio** | B (84) | WATCH | Freemium | Social automation — in manifest, optional |

Full audit: `D:\Hermes\projects\JonBeatz\.cursor\plans\2026-07-03-hermes-ecosystem-audit.plan.md`

**Doc threshold:** C+ and below are not persisted here unless Jon asks — see [TOOLS-WATCHLIST.md](./TOOLS-WATCHLIST.md) policy §6.

---

## AI 3D & scroll video — top picks (Jul 2026)

Jon batch: Tripo, 3DGenStudio, LongCat-Video, Meshy, Hyper3D, Fast3D. **Only the primary row below is canonical** — others are backup or skip.

### Decision matrix (use this)

| Job | **Primary (Hermes)** | On deck | Skip (redundant) |
|-----|----------------------|---------|------------------|
| **Product photo → GLB** (scroll site §2) | [**Tripo Studio**](https://www.tripo3d.ai/) | [3DGenStudio](https://github.com/visualbruno/3DGenStudio) (local) | Meshy, Hyper3D, Fast3D |
| **Local mesh pipeline** (ComfyUI @ `:8188`) | [**3DGenStudio**](https://github.com/visualbruno/3DGenStudio) | ComfyUI MCP + vault workflows | — |
| **Scroll transition clip** (assembled → exploded) | **`npm run video:fal`** (Kling I2V) | LongCat / HunyuanVideo (local, heavy) | — |
| **Free existing GLBs** | **GLB-Asset-Sourcing** skill | Poly Haven, poly.pizza | — |

**Vault links:** `ai-scroll-product-workflow/WORKFLOW.md` (Tripo step 1) · `SCROLL-VIDEO-RESEARCH.md` (Kling matrix) · [IMAGE-WORKFLOW.md](./IMAGE-WORKFLOW.md) § `video:fal`

---

## Tripo Studio

- **URL:** https://www.tripo3d.ai/
- **Grade:** **A (93/100)** · **Cost:** Freemium (credits)
- **Verdict:** **PRIMARY** — cloud image/text → GLB for product scroll sites
- **Status:** Documented in vault workflows; not a CLI install

### What it does

Image/text → GLB with segmentation, AI texturing (4K PBR), rigging/animation. Blender/Unity/Unreal plugins. Matches Notion scroll workflow step 1 (product photo → interactive 3D section below canvas hero).

### vs our stack

| Need | Tripo | Alternative |
|------|-------|-------------|
| Fast product GLB from one photo | ✅ **Best default** | 3DGenStudio + ComfyUI (local, more setup) |
| Scroll hero (2D frames) | ❌ Use Kling + FFmpeg | `video:fal` |
| Ship in R3F | Export GLB → Draco → `3D-Modeling` skill | `<model-viewer>` for v1 |

### When to use

- Product explode scroll **optional §2** — rotate/zoom GLB under `ScrollFrameHero`
- Single hero product with clean studio photo

### When to skip

- Pure scroll-frame hero only (no real geometry) — frames alone are enough for v1
- Local/offline-only mandate — use 3DGenStudio instead

---

## 3DGenStudio

- **URL:** https://github.com/visualbruno/3DGenStudio · https://www.3dgenstudio.com
- **Grade:** **A- (91/100)** · **Cost:** Free OSS
- **Verdict:** **IN USE (local)** — ComfyUI orchestration; Tripo web stays primary for one-shot GLB

### What it does

Open-source Kanban + node graph for full 3D pipeline: text/image → edit → mesh gen → UV/texture → GLB export. Native **ComfyUI** workflow runner; **Tripo AI v3** integration built-in; mesh editor (paint, sculpt, projection inpaint). Local-first SQLite projects.

### vs our stack

| | Tripo web | 3DGenStudio |
|--|-----------|-------------|
| Setup | Browser, credits | Clone + `npm run dev` + ComfyUI @ `:8188` |
| VRAM | Zero (cloud) | Uses local GPU when Comfy runs |
| Fit | One-shot product GLB | Multi-step pipeline, batch assets, Comfy workflows |

**Install gate:** Installed @ `D:\Hermes\apps\3DGenStudio` (2026-07-04). **Ports:** API **3021**, UI **5183**, mesh-tools **8200** — avoids TaskBoardAI **3001**.

```powershell
npm run 3dgenstudio:install   # once
npm run comfy:start           # required for mesh workflows
npm run 3dgenstudio:start     # http://localhost:5183
```

First-run in app Settings: ComfyUI `http://127.0.0.1:8188`, path `H:\AI_Models\ComfyUI`. Optional Tripo API key in settings for cloud mesh from Kanban.

**Why not something else?** See decision matrix above — Tripo web wins for single product GLB; raw ComfyUI only wins if you never want a UI; Meshy/Fast3D/Hyper3D are redundant SaaS.

### When to use

- Repeat 3D asset production with Comfy workflows already on Jon's PC
- Tripo API from local UI without leaving the Kanban board
- Mesh cleanup/texturing after generation

---

## LongCat-Video

- **URL:** https://github.com/meituan-longcat/LongCat-Video
- **Grade:** **B+ (87/100)** · **Cost:** Free OSS (MIT weights)
- **Verdict:** **WATCH** — local **video** gen; not 3D mesh

### What it does

13.6B open model: text-to-video, image-to-video, video continuation, long clips (minutes). Avatar branch for audio-driven talking head. Requires CUDA, large download, multi-GB VRAM.

### vs our stack

| Task | Primary today | LongCat |
|------|---------------|---------|
| Scroll transition 5s clip | **`npm run video:fal`** (Kling) | Local alt if avoiding fal spend |
| Long I2V / continuation | fal Kling 10s or CapCut merge | Stronger for **minutes-long** open-source path |
| 3D GLB | Tripo | ❌ Wrong tool |

**Install gate:** NOT_INSTALLED — heavy; only if Jon wants local video lab alongside ComfyUI.

---

## HunyuanVideo

- **URL:** https://github.com/Tencent-Hunyuan/HunyuanVideo · [Hugging Face weights](https://huggingface.co/tencent/HunyuanVideo)
- **Grade:** **B+ (86/100)** · **Cost:** Free OSS
- **Verdict:** **WATCH** — local **video** fallback when **fal credits run out**

### What it does

Tencent open **13B+** video foundation model: text-to-video, image-to-video, video continuation. Systematic training pipeline; quality comparable to closed models per their paper. **FP8 quantized weights** save ~10 GB VRAM vs full precision — still needs a strong GPU and large HF download.

### vs our stack (scroll clips)

| Task | Primary | HunyuanVideo |
|------|---------|--------------|
| Product transition 5s (start + end stills) | **`npm run video:fal`** (Kling) | Local I2V try when fal balance is zero |
| Long / continuation clips | fal + CapCut merge | Strong open-source path |
| Zero VRAM / quick test | fal cloud | ❌ Requires CUDA + model weights |

**Local video fallback ladder (fal credits exhausted):**

1. **`npm run video:fal`** — stay on fal while balance > 0 ([dashboard](https://fal.ai/dashboard))
2. **[LongCat-Video](https://github.com/meituan-longcat/LongCat-Video)** — 13.6B I2V + long continuation (Meituan OSS)
3. **HunyuanVideo** — 13B+ Tencent OSS; try if LongCat install/quality doesn't fit
4. **ComfyUI** `generate-video` / Wan workflows — if graphs already on `H:\AI_Models\ComfyUI`
5. **[LTX Desktop](https://ltx.io/ltx-desktop)** — GUI NLE + local LTX-2.3 (Jon download later; ~160 GB disk)

Same post-step either way: **FFmpeg → WebP frames → `ScrollFrameHero`** (`Scroll-Video-Sequence` skill).

### Minimal install sketch (when needed)

```powershell
git clone https://github.com/Tencent-Hunyuan/HunyuanVideo
cd HunyuanVideo
# See repo README: conda env, torch 2.6+cu124, huggingface-cli download weights
# I2V demo: run_demo_image_to_video.py
# FP8 weights on HF for ~10GB VRAM savings
```

**Prerequisites:** Stop or avoid LM Studio + ComfyUI during run (`npm run comfy:stop`); 16 GB GPU is tight — prefer FP8 weights, close other GPU apps.

**Install gate:** NOT_INSTALLED — document-only until Jon wants GUI trial or lip-sync/cinema lane beyond fal scripts.

---

## Open Generative AI + muapi

- **URL:** https://github.com/Anil-matcha/Open-Generative-AI · [muapi.ai hosted studio](https://muapi.ai/open-generative-ai) · [Ash Harris setup guide](https://ashharris.co/guides/open-generative-ai)
- **Grade:** **B+ (87/100)** · **Cost:** Freemium — MIT OSS studio; **muapi.ai** cloud models pay-as-you-go; optional local **sd.cpp** (no API key)
- **Verdict:** **WATCH** (added 2026-07-04)
- **Summary:** OSS **Higgsfield-style** creative studio — Image, Video, Lip Sync, Cinema modes; 200+ cloud models via muapi; self-host or browser; local sd.cpp incl. **Z-Image**.

### vs our stack

| | HF `image:gen` | fal.ai | Open Generative AI |
|--|----------------|--------|---------------------|
| Cost default | Free (HF token) | Prepaid fal wallet | muapi pay-as-you-go |
| Interface | npm script | npm script + MCP | Full GUI studio |
| Lip sync / cinema | ❌ | Partial | ✅ First-class modes |
| Local Z-Image | Comfy GGUF | ❌ | sd.cpp (optional) |

**Do not default over** HF or fal. Try hosted studio + muapi key first; self-host when Jon approves.

**Install gate:** Cloned @ `D:\Hermes\apps\Open-Generative-AI` (2026-06-29). Upstream only — no Jon fork. Dev **`:3000`** (TaskBoardAI owns `:3001`). `MUAPI_API_KEY` in VaderLabz when using cloud models. Excluded from fleet scaffold / Mem0.

---

## LTX Desktop

- **URL:** https://ltx.io/ltx-desktop · https://github.com/Lightricks/LTX-Desktop · [docs](https://docs.ltx.video/open-source-model/getting-started/quick-start)
- **Grade:** **B+ (87/100)** · **Cost:** Free OSS app (Apache-2.0); LTX-2.3 weights under LTX-Video Model License (free under revenue cap)
- **Verdict:** **WATCH** — Jon **download later** (interested 2026-07-04); not installed
- **Summary:** Free **desktop AI video studio** — generate clips (text/image/audio → video) on local NVIDIA GPU, **edit on a timeline** (retake, gap fill, subtitles), export H.264/ProRes. Alternative to fal Kling for **scroll-cinema / hero clips** with built-in NLE.

| Factor | Score | Notes |
|--------|-------|-------|
| Gap fill | 35/40 | GUI NLE + local gen; Comfy/LongCat are graph/CLI-only |
| Stack fit | 20/25 | RTX 5060 Ti **16 GB = minimum** VRAM; ~160 GB disk; fights ComfyUI + LM Studio |
| Cost/complexity | 14/20 | Free local inference; huge first download (~20 GB checkpoint + optional ~150 GB) |
| Maturity/trust | 18/15 | Lightricks; ~1.7k★; beta |

### Plain description

One app: **AI generates video** (LTX-2.3) + **Premiere-like timeline** to trim, retake bad sections, and export — all on your PC after model download. Not an agent tool; a **creator app** for making MP4s that feed FFmpeg → WebP scroll heroes.

### Example use (JonBeatz)

1. Gen Space prompt: cinematic studio B-roll for jon-beatz.com scroll section.
2. Generate **720p** (safer on 16 GB VRAM).
3. **Retake** a weak middle segment without redoing the whole clip.
4. Export MP4 → existing **FFmpeg → WebP** → `ScrollFrameHero` pipeline.

### vs stack

| | fal Kling | LongCat/Hunyuan | LTX Desktop |
|--|-----------|-----------------|-------------|
| Interface | npm script | CLI/repos | Full desktop NLE |
| Cost | Per-gen credits | Free local | Free local |
| VRAM | 0 (cloud) | Heavy CUDA | ≥16 GB min (Jon at floor) |
| Edit timeline | External | External | Built-in |

### Install (when Jon approves)

1. Confirm **~160 GB** free disk on target drive.
2. Download `.exe` from [GitHub Releases](https://github.com/Lightricks/LTX-Desktop/releases).
3. First launch: accept license → download checkpoint (~20 GB) + optional models.
4. Optional: free LTX API key for cloud text encoding (saves VRAM) — or enable local T5 encoder for fully offline.
5. Stop ComfyUI / avoid LM Studio during generation (`npm run comfy:stop`).

**Install gate:** NOT_INSTALLED — Jon queued for later trial.

---

## Evaluated — not on deck (Jul 2026)

Compact skip list — full reviews omitted per doc threshold; all overlap Tripo or existing stack.

| Tool | Grade | Why skip |
|------|-------|----------|
| [Meshy](https://www.meshy.ai/) | B (84) | Strong SaaS, but **same lane as Tripo** (image/text → GLB + rig). Keep as manual alt only. |
| [Hyper3D Rodin](https://hyper3d.ai/tools/image-to-gltf) | B- (81) | Image → GLTF; overlaps Tripo + fal 3D models. Use if a project needs Rodin specifically. |
| [Fast3D](https://fast3d.io/) | C+ (78) | Another image/text → GLB SaaS; **no API yet**; no Hermes wiring advantage over Tripo. |

---

## Template for new entries

```markdown
## [Tool Name]

- **URL:**
- **Grade:** A- (92/100)
- **Verdict:** ADOPT | WATCH | SKIP | IN USE

### Grade breakdown
| Factor | Score | Notes |
| Gap fill | /40 | |
| Stack fit | /25 | |
| Cost/complexity | /20 | |
| Maturity/trust | /15 | |

### What it does
…

### Ecosystem assessment

Overlap with existing MCPs/skills is **expected** — document **alternatives on deck**, not replacements. **Additive only** — do not disable working MCPs when adding new ones.

### Cost tag

`Free` | `Freemium` | `Paid` — note minimal paid OK when ROI high (Jon policy 2026-07-04).

### When to use / skip
…
```

---

## Stack options index (2026-07-07)

**Canonical:** [TOOLS-STACK-OPTIONS.md](./TOOLS-STACK-OPTIONS.md)

Researched in one pass for **new-project planning** — auth, headless CMS, database/hosting, markdown editors. Includes:

- **Auth:** Better Auth (ADOPT), Stack Auth, Hanko, Authgear, Clerk (IN USE Next-Flick)
- **CMS:** Payload (IN USE MSC), Strapi, Directus, Sanity, Keystone, Apostrophe; SKIP notes for Contentful, Cosmic, brixcms.com
- **DB:** pg0, Drizzle, Neon, Hostinger VPS Postgres path
- **MD editors:** MarkText, Zettlr, Milkdown (Markpad replacement brainstorm)
- **Frontend:** shadcn/ui (IN USE), Zod + RHF (IN USE MSC), TanStack Query (ADOPT), bknd (WATCH beta)
- **Core stack (IN USE):** Next.js, Node, TypeScript, Tailwind, React, Drizzle, PostgreSQL, SQLite, Payload, Clerk, Playwright, Hostinger — full table in STACK-OPTIONS

**Next-Flick repo:** `NEXT-FLICK-AUTH-NOTES.md`, `NEXT-FLICK-DATABASE-NOTES.md`, backlog platform section.

Full per-tool grade breakdowns live in STACK-OPTIONS; add individual TOOLS-REFERENCE entries here only when a tool moves to IN USE or ADOPT with install notes.
