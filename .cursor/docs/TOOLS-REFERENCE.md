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
- **Verdict:** **WATCH** — try **second** after Handy (2026-07-13; was try-first 2026-07-04)
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

## cinematic-scroll-skill (MustBeSimo)

- **URL:** https://github.com/MustBeSimo/cinematic-scroll-skill · [live demo](https://mustbesimo.github.io/cinematic-scroll-skill/) · [npm](https://www.npmjs.com/package/cinematic-scroll-skill)
- **Grade:** **A- (92/100)** · **Cost:** Free MIT
- **Verdict:** **ADOPT** — vendored in `D:\Hermes\assets\3d-web-workflows\cinematic-scroll-skill\`
- **Summary:** Agent **craft skill** for cinematic scroll sites — DTCG tokens, 11 themes, component grammar, `cinematic-doctor` (0–100, CI exit &lt;80), `page-proof`, CinematicBench. Complements Hermes `Scroll-Motion` / `Scroll-Video-Sequence`; does not replace fal/Kling media.

| Factor | Score | Notes |
|--------|-------|-------|
| Gap fill | 36/40 | Only scored scroll craft contract in fleet — doctor + token gate |
| Stack fit | 23/25 | Mode A HTML + Mode B TSX; pairs with Lenis/GSAP/motion baseline |
| Cost/complexity | 18/20 | Vault clone free; `npm install` in vault for doctor; paid Studio optional |
| Maturity/trust | 15/15 | CI, npm, 11 themes, production examples (noir 87, luxe 88, flagship 100) |

### When to use

- After hero/scroll build — run `npm run doctor` on export HTML or local route
- Token/theme authoring for new taste catalog accents
- CinematicBench competitive scoring: `npx -p cinematic-scroll-skill cinematic-bench <url>`

### Hermes install

```powershell
npm run vault:cinematic-scroll-skill          # JonBeatz hub
cd D:\Hermes\assets\3d-web-workflows\cinematic-scroll-skill
npm install
npm run doctor -- examples/noir/index.html
```

### Overlap map

| Hermes asset | Relationship |
|--------------|--------------|
| `Scroll-Motion` | **Keep** — Lenis + GSAP implementation |
| `Scroll-Video-Sequence` | **Keep** — canvas frame scrub |
| `cinematic-scroll-kit` (yojahny55) | **Different** — Tier C video recipe only |
| `scroll-cinematic-claude` | **WATCH** — Higgsfield path; fal is primary |

---

## scroll-cinematic-claude

- **URL:** https://github.com/zubair-trabzada/scroll-cinematic-claude
- **Grade:** **B (84/100)** · **Cost:** Free (Higgsfield API when generating)
- **Verdict:** **WATCH**
- **Summary:** Claude skill + prompts for scroll cinematic sites via **Higgsfield MCP** — overlaps Hermes fal/Kling pipeline.

| Factor | Score | Notes |
|--------|-------|-------|
| Gap fill | 28/40 | Similar outcome to ai-scroll-product + fal path |
| Stack fit | 22/25 | Useful if Higgsfield MCP adopted; Jon uses fal |
| Cost/complexity | 18/20 | Extra MCP + wallet vs existing `video:fal` |
| Maturity/trust | 14/15 | Active repo; community skill pattern |

---

## fullPage.js (scroll effects)

- **URL:** https://alvarotrigo.com/fullPage/scroll-effects/
- **Grade:** **B- (82/100)** · **Cost:** GPL / commercial license for paid client work
- **Verdict:** **WATCH**
- **Summary:** Full-viewport section snapping + scroll transition effects — alternative to custom Lenis chapter pinning for marketing one-pagers.

| Factor | Score | Notes |
|--------|-------|-------|
| Gap fill | 30/40 | Fills section-snap niche; Hermes usually prefers Lenis+GSAP |
| Stack fit | 20/25 | jQuery-era API; React wrappers exist but not fleet default |
| Cost/complexity | 16/20 | Paid license for commercial sites |
| Maturity/trust | 14/15 | Long-running product; large effect gallery |

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
| **Product photo → GLB** (scroll site §2) | [**Tripo Studio**](https://www.tripo3d.ai/) | [3DGenStudio](https://github.com/visualbruno/3DGenStudio) (local), [TRELLIS.2](https://github.com/microsoft/TRELLIS.2) (OSS SOTA; Linux 24GB+) | Meshy, Hyper3D, Fast3D |
| **Local mesh pipeline** (ComfyUI @ `:8188`) | [**3DGenStudio**](https://github.com/visualbruno/3DGenStudio) | ComfyUI MCP + vault workflows; TRELLIS.2 separate conda stack | — |
| **OSS image → PBR GLB** (max fidelity, local) | [**TRELLIS.2**](https://github.com/microsoft/TRELLIS.2) (when HW allows) | Tripo cloud · HF [Space demo](https://huggingface.co/spaces/microsoft/TRELLIS.2) on Windows | — |
| **Scroll transition clip** (assembled → exploded) | **`npm run video:fal`** (Kling I2V) | LongCat / HunyuanVideo (local, heavy) | — |
| **Manual clip assembly / trims** | [**OpenCut**](https://opencut.app) classic (browser) | FFmpeg CLI, LTX Desktop | OpenMontage = automated pipelines |
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

## TRELLIS.2

- **URL:** https://github.com/microsoft/TRELLIS.2 · [HF weights](https://huggingface.co/microsoft/TRELLIS.2-4B) · [HF Space demo](https://huggingface.co/spaces/microsoft/TRELLIS.2) · [Project page](https://microsoft.github.io/TRELLIS.2)
- **Grade:** **B- (82/100)** · **Cost:** Free OSS (MIT; nvdiffrast/nvdiffrec separate licenses)
- **Verdict:** **WATCH** — best OSS image→PBR GLB when hardware/OS allow; Tripo stays PRIMARY on Jon's PC today
- **Status:** NOT_INSTALLED — Linux + **24GB VRAM** minimum (A100/H100 tested); Windows = HF demo only unless WSL2 experiment

### What it does

4B-parameter **image-to-3D** model using **O-Voxel** sparse voxels (field-free topology: open surfaces, non-manifold, internal structures). Exports **PBR GLB** (base color, roughness, metallic, opacity) up to **1536³** resolution. Includes shape-conditioned texture generation and full training codebase.

### vs our stack

| Need | TRELLIS.2 | Tripo | 3DGenStudio |
|------|-----------|-------|-------------|
| One product photo → GLB | ✅ SOTA OSS | ✅ **Fastest default** (browser) | ✅ via Comfy/Tripo API |
| Windows daily driver | ❌ Linux-only local | ✅ | ✅ |
| VRAM on Jon's PC | ❌ **24GB+** (fleet shares ~16GB) | Zero (cloud) | Comfy-sized |
| PBR + complex topology | ✅ Best local quality | ✅ Good | Workflow-dependent |
| R3F / showcase pipeline | `sample.glb` → Draco → `3D-Modeling` | Same | Same |

### Try without install (Windows)

1. [Hugging Face Space](https://huggingface.co/spaces/microsoft/TRELLIS.2) — upload image, download GLB
2. Export → `D:\Hermes\assets\3d-web-workflows\` or `public/media/` → `gltf-transform optimize` per **3D-Modeling** skill

### Local install gate (deferred)

- **OS:** Linux only (README); WSL2 unverified on Jon's workstation
- **GPU:** 24GB+ VRAM — conflicts with LM Studio + ComfyUI `:8188` policy
- **Stack:** Separate `trellis2` conda env — not ComfyUI-integrated; `setup.sh` compiles flash-attn, o-voxel, cumesh, nvdiffrast
- **Weights:** `HF_TOKEN` in `.env.local` for `microsoft/TRELLIS.2-4B` download

**Re-grade when:** Windows/WSL2 recipe validated, consumer-GPU benchmarks, or ComfyUI node wrapper ships.

### When to use

- Hero product GLB where Tripo credits/topology limits bite — trial on HF Space first
- Research / fine-tune on custom asset sets (training code released)

### When to skip

- Default scroll-site product GLB — **Tripo** wins on speed + Windows
- Local pipeline with Comfy UI — **3DGenStudio** already IN USE
- While LM Studio + ComfyUI need shared VRAM — do not add 4B local gen

---

## LongCat-Video

- **URL:** https://github.com/meituan-longcat/LongCat-Video
- **Grade:** **B+ (87/100)** · **Cost:** Free OSS (MIT weights)
- **Verdict:** **WATCH** — local **video** gen; not 3D mesh

### What it does

13.6B open model: text-to-video, image-to-video, video continuation, long clips (minutes). **LongCat-Video-Avatar 1.5** (2026): commercial-grade digital human — Whisper-large audio, DMD 8-step inference (~15× faster), multi-person dialogue, lip sync; weights on HF/ModelScope. Requires CUDA, large download, multi-GB VRAM.

### LongCat-Video-Avatar 1.5 (talking head)

- **News:** [longcatai.org/news/video-avatar-1.5](https://www.longcatai.org/news/video-avatar-1.5)
- **Grade:** **C+ (78/100)** as avatar-specific branch · parent **LongCat-Video** stays **B+ (87) WATCH**
- **Verdict:** **WATCH** — only if Jon needs open-source talking-head / digital human clips
- **Not** the scroll-site I2V path (`video:fal` Kling remains primary)

| vs | Notes |
|----|-------|
| fal Kling I2V | Scroll transitions — still primary |
| OpenMontage | Agent video pipelines — different job |
| Avatar 1.5 | Lip-synced presenter / UGC avatar — niche |

**Re-grade:** Install only when local avatar lab is a stated goal and VRAM budget allows alongside ComfyUI/LM Studio.

### vs our stack

| Task | Primary today | LongCat |
|------|---------------|---------|
| Scroll transition 5s clip | **`npm run video:fal`** (Kling) | Local alt if avoiding fal spend |
| Long I2V / continuation | fal Kling 10s or CapCut merge | Stronger for **minutes-long** open-source path |
| 3D GLB | Tripo | ❌ Wrong tool |

**Install gate:** NOT_INSTALLED — heavy; only if Jon wants local video lab alongside ComfyUI.

---

## emilkowalski/skills (Design Engineer)

- **URL:** https://github.com/emilkowalski/skills · [skills.sh](https://skills.sh/emilkowalski/skills)
- **Grade:** **A- (90/100)** · **Cost:** Free (MIT)
- **Verdict:** **IN USE** — animation + motion taste for showcase/scroll UI
- **Status:** **READY** — `npm run skills:emil:install` · verify `npm run skills:emil:status`

### What it does

Skills from Emil Kowalski (Vercel/Linear): **emil-design-eng**, **review-animations**, **improve-animations** (whole-codebase audit → `plans/` for cheaper agents), **animation-vocabulary**, **apple-design**. Targets agent mistakes (ease-in on enter, wrong shadows, etc.).

**Workflow doc:** [EMIL-ANIMATION-SKILLS.md](./EMIL-ANIMATION-SKILLS.md)

### vs our stack

| Layer | Current | emilkowalski/skills |
|-------|---------|---------------------|
| Anti-slop UI | **Hallmark** IN USE | Complements — motion-specific |
| Scroll/GSAP | Scroll-Motion, gsap-skills external | **improve-animations** = systematic audit |
| Discovery | **find-skills** IN USE | Install via same `npx skills` flow |
| NovaMira / Premium-UI | Layout craft | Animation execution layer |

### When to use

- Before/after showcase or `.dev` redesign motion pass
- `improve-animations` on JonBeatz Playground or scroll hero branches

### When to skip

- Replacing Hallmark or NovaMira — additive only

**Verify:** `npm run skills:emil:status` (expects 5 skills in `shared-profile-content/skills/` and project `.cursor/skills/` after `sync:skills`).

```powershell
npm run skills:emil:install   # npx global + vendor to shared library + sync project
npm run skills:emil:status    # doctor (library + global + project)
npm run sync:skills           # refresh .cursor/skills from shared library only
```

---

## Nemotron-Shared-Memory (reference)

- **URL:** https://github.com/TheLasTech/Nemotron-Shared-Memory
- **Grade:** **B- (80/100)** · **Cost:** Free (CC BY 4.0)
- **Verdict:** **REF** — read patterns; not a runtime or install
- **Status:** **READY** — clone/browse; 2★ early public derivative

### What it is

Sanitized public notes for a **Markdown + Git shared memory layer** (`context-manifest.yaml`, scoped retrieval, proposal-first publishing). Name is historical — **not** NVIDIA Nemotron-specific.

### vs our stack

| Layer | Hermes canonical | This repo |
|-------|------------------|-----------|
| Human memory | **Vader Vault** `H:\Vader_Vault` | Similar hub/decision/session patterns |
| Runtime recall | Mem0 + Draven | N/A — docs only |
| Repo truth | TRUTH + ReCall | N/A |

**Action:** Borrow `architecture/shared-memory-foundation.md` ideas for vault hygiene — do not duplicate vault content.

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

## codebase-memory-mcp

- **URL:** https://github.com/DeusData/codebase-memory-mcp
- **Grade:** **A- (92/100)** · **Cost:** Free (MIT)
- **Verdict:** **IN USE** (installed 2026-07-13)
- **Summary:** Fastest structural code-intelligence MCP — tree-sitter + Hybrid LSP knowledge graph, 14 tools, zero API keys, static binary for Windows/macOS/Linux.

| Factor | Score | Notes |
|--------|-------|-------|
| Gap fill | 36/40 | Call graphs, architecture overview, impact analysis — beyond grep/Read |
| Stack fit | 23/25 | Native MCP; complements Cursor indexing + Mem0 (semantic ≠ structural) |
| Cost/complexity | 19/20 | Single binary; local SQLite; no VRAM |
| Maturity/trust | 14/15 | 5600+ tests, arXiv paper, SLSA3 releases; young but rigorous |

### What it does

- Indexes repos into a **knowledge graph** (functions, classes, routes, call chains)
- **14 MCP tools:** `search_graph`, `trace_path`, `get_architecture`, `detect_changes`, Cypher-like `query_graph`, semantic search (bundled embeddings — no key)
- **158 languages** via vendored tree-sitter; Hybrid LSP for TS/JS/Python/Go/Rust/Java/C#/etc.
- **Cross-repo** fleet intelligence when multiple Hermes projects indexed
- Optional **3D graph UI** at `:9749` (`--ui` variant)
- `install.ps1` auto-wires Cursor, Codex, Hermes, OpenClaw, etc.

### Ecosystem assessment

| Overlap | Notes |
|---------|-------|
| Cursor built-in search | CBM adds **structural** queries (who calls X, blast radius, dead code) |
| Mem0 / vault | Semantic memory — **complementary**, not redundant |
| Context7 | Library API docs — different job |
| grep / explore | CBM replaces dozens of file-by-file cycles (~99% token reduction per their benchmarks) |

### When to use

- Large or unfamiliar repos (MSC, Next-Flick, Hermes multi-profile)
- Refactors needing call-chain / impact analysis
- Architecture onboarding across `D:\Hermes\projects\*`

### When to skip

- Small single-file edits where Read/grep suffices

### Install record (JonBeatz PC 2026-07-13)

```text
Binary                     %USERPROFILE%\.local\bin\codebase-memory-mcp.exe  (v0.9.0)
Cursor MCP                 %USERPROFILE%\.cursor\mcp.json
Index                      D-Hermes-projects-JonBeatz — 7423 nodes, 9067 edges
Verify                     npm run codebase-memory:status
Reindex                    npm run codebase-memory:reindex
```

### ⚠️ Windows gotcha — "Select an app to open 'cbm-code-discovery-gate'" popups

CBM's installer **auto-detects other agents** and writes **extensionless hook shims** into `~/.claude/hooks/` (`cbm-code-discovery-gate`, `cbm-session-reminder`, `cbm-subagent-reminder`) plus `PreToolUse`/`SessionStart`/`SubagentStart` entries in `~/.claude/settings.json`. On Windows those shims have no file association, so **Claude Desktop (`cowork-svc.exe`) firing them spawns a flood of `OpenWith.exe` "Pick an app" dialogs** — one per Grep/Glob and per session/subagent start.

**Jon uses Cursor + Hermes, not Claude Code hooks.** Fix (2026-07-13):

1. Kill stuck dialogs: `Get-Process OpenWith | Stop-Process -Force`
2. Strip the 3 CBM hook blocks from `~/.claude/settings.json` (keep the TokenTracker `SessionEnd` hook)
3. Delete `~/.claude/hooks/cbm-*`
4. Restart Claude Desktop so `cowork-svc` reloads settings

**After any CBM `install`/`update` re-run, re-check `~/.claude/settings.json`** — it re-plants these hooks. CBM's own Cursor MCP entry (`~/.cursor/mcp.json`) is unaffected and is all Jon needs.

---

---

## Step Beyond

- **URL:** https://github.com/aievolutionpl/step-beyond · [SPEC.md](https://github.com/aievolutionpl/step-beyond/blob/main/SPEC.md)
- **Grade:** **B- (80/100)** · **Cost:** Free (MIT)
- **Verdict:** **WATCH** — reference agent-behavior framework; cherry-pick, do not replace Hermes rituals
- **Status:** NOT_INSTALLED — v4.0.0-alpha.2; prompt-only portable or Node 20+ runtime packages

### What it does

Behavioral skill + optional TypeScript runtime for agents: **CONTEXT → INTENT → DECIDE → BUILD → INITIATIVE → EXECUTE → VERIFY → DELIVER → LEARN**. Permission classes (`AUTO`, `AUTO_WITH_DISCLOSURE`, `ASK`, `FORBIDDEN`), verification ledger, strict-scope detection (`only`, `just`, `nothing else`), and slop repair references.

### vs our stack

| Layer | Hermes today | Step Beyond |
|-------|--------------|-------------|
| Session rituals | Start/Open/Close/End + AskQuestion gates | Similar permission taxonomy — formalized |
| Quality gates | **Hallmark** IN USE, build verify, HTTP smoke | `verification.md`, `slop.md` refs |
| Memory | Mem0 + Draven + Vader Vault | Runtime store (needs host adapter) |
| Install policy | Review-Tool grades-first, tools-watchlist | Initiative scorer + adaptive budget |

**Overlap is high.** Value is **reference material** (`skills/step-beyond/references/verification.md`, `slop.md`) — not a second rule stack.

### When to use

- Audit agent permission language when writing new `.cursor/rules/`
- Borrow verification claim discipline for doc/tool reviews

### When to skip

- Full runtime install — no Cursor/Hermes adapter; alpha
- Replacing existing rituals, Mem0, or Hallmark

---

## OpenCut

- **URL:** https://github.com/OpenCut-app/OpenCut · **Use today:** [opencut.app](https://opencut.app) (classic) · **Rewrite preview:** [new.opencut.app](https://new.opencut.app)
- **Grade:** **B- (82/100)** · **Cost:** Free (MIT)
- **Verdict:** **WATCH** — browser CapCut alternative for manual timeline edits; track rewrite MCP
- **Status:** NOT_INSTALLED — main repo is ground-up rewrite; **opencut-classic** is production UI today

### What it does

Open-source video editor (web/desktop/mobile roadmap). Classic: browser timeline NLE for trim, arrange, export. Rewrite promises Editor API, plugins, Rust core, **MCP server**, headless batch render, scripting tab. Sponsored by **fal.ai**.

### vs our stack

| Job | Primary | OpenCut |
|-----|---------|---------|
| Agent video pipelines | **OpenMontage** IN USE | Complementary — human polish pass |
| Scroll I2V clips | `npm run video:fal` | Import + trim assembled clips |
| Local AI NLE | **LTX Desktop** WATCH | Lighter — no gen, just edit |
| Frame strips | FFmpeg → WebP | Optional intermediate assembly |

### When to use

- Trim/assemble fal Kling clips before FFmpeg → scroll frames
- Quick browser edits without Premiere/CapCut account

### When to skip

- End-to-end agent video — **OpenMontage**
- Until rewrite MCP ships — no Hermes automation hook yet

**Re-grade when:** MCP server + headless mode land; desktop Windows build verified.

---

## NoSignups (resource)

- **URL:** https://nosignups.net/ (formerly FckSignups)
- **Grade:** **B (84/100)** · **Cost:** Free
- **Verdict:** **REF** — bookmark discovery directory, not an install
- **Status:** **READY** — 210 curated no-signup OSS browser tools with GitHub links

### What it is

Searchable catalog of open-source tools runnable in-browser without accounts — categories: dev, design, media, privacy, utilities. Includes Hoppscotch, Squoosh, ffmpeg.wasm, Excalidraw, Stirling PDF, **OpenCut**, Cobalt, IT-Tools, etc.

### vs our stack

Complements **TOOL-CHEST-INDEX** (installed fleet) and **DESIGN-REFERENCES** (layout inspiration). Use when Jon needs a one-off utility (PDF, image compress, API test) without hunting GitHub.

**Action:** Bookmark only — add row to DESIGN-REFERENCES; no `npm run` verify.

---

## OpenMontage

- **URL:** https://github.com/calesthio/OpenMontage
- **Grade:** **A- (90/100)** · **Cost:** Free OSS (AGPLv3) + optional paid APIs
- **Verdict:** **IN USE** (installed 2026-07-13)
- **Summary:** First open-source **agentic video production system** — 12 pipelines (explainer, cinematic, documentary montage, podcast repurpose, etc.), Remotion/HyperFrames compose, Backlot live storyboard.

| Factor | Score | Notes |
|--------|-------|-------|
| Gap fill | 37/40 | Full production vs fal single-clip or ComfyUI stills — real gap for Jon's video/blog work |
| Stack fit | 21/25 | Uses `FAL_KEY`, FFmpeg, Remotion, Piper TTS — aligns with Hermes image/video stack |
| Cost/complexity | 16/20 | Heavy setup (Python+Node+FFmpeg); AGPL for commercial client deliverables |
| Maturity/trust | 16/15 | GitHub trending #1; impressive cost demos ($0.02–$1.33); active 2026 |

### What it does

- Agent reads **pipeline manifests + director skills** → researches → scripts → generates assets → composes → self-reviews
- **52 tools** across video gen (fal/Kling/Runway/local GPU), TTS, music (Suno), subtitles (WhisperX), stock footage (Pexels/Archive.org)
- **Backlot** local board — live production status, approval gates, replay
- **Reference-video mode** — paste a YouTube Short and get differentiated concepts + cost estimate
- **Zero-key path:** Piper TTS + free stock + Remotion still-animation

### Ecosystem assessment

| Overlap | Notes |
|---------|-------|
| fal MCP `video:fal` | OpenMontage **orchestrates** fal inside pipelines — not a replacement |
| ComfyUI | Local image/video nodes — OpenMontage is **production pipeline**, not node UI |
| LTX Desktop (WATCH) | Local NLE — OpenMontage is agent-driven end-to-end |
| cinematic-scroll-skill | Web scroll sites — different output (finished MP4 vs interactive site) |
| Claude Blog / video skills | OpenMontage is **make the video**; blog skills are **write about it** |

### When to use

- YouTube explainers, product teasers, documentary montages, podcast clips
- Blog companion videos, showcase reels, client pitch videos

### Caveats

- **AGPLv3** — review license for paid client deliverables
- Needs Python venv + FFmpeg + Node 18+; Windows path documented

### Install record (JonBeatz PC 2026-07-13)

```text
Vault path                   D:\Hermes\assets\openmontage
Python venv                  .venv (requirements.txt + piper-tts)
Remotion                     remotion-composer\node_modules (npm install)
FAL_KEY                      synced from JonBeatz .env.local → .env
Contract tests               561 passed, 7 skipped (tests/contracts/)
Tool registry                101 tools discovered
Verify                       npm run openmontage:status
Start                        Open folder in Cursor → read AGENT_GUIDE.md
```

---

## agency-agents

- **URL:** https://github.com/msitarzewski/agency-agents
- **Grade:** **B+ (86/100)** · **Cost:** Free (MIT)
- **Verdict:** **WATCH**
- **Summary:** 230+ personality-driven specialist agent packs (engineering, design, marketing, security, GIS, game dev…) with one-click install for Cursor, Hermes, Codex, Claude Code, etc.

| Factor | Score | Notes |
|--------|-------|-------|
| Gap fill | 28/40 | Some niche personas Jon lacks; mostly overlaps curated `.cursor/skills/` |
| Stack fit | 22/25 | Native Hermes lazy-router plugin; Cursor `.mdc` conversion |
| Cost/complexity | 18/20 | Free; **skill bloat risk** if bulk-installed |
| Maturity/trust | 18/15 | Huge community; companion desktop app; well-maintained |

### What it does

- Each agent = markdown personality + workflows + deliverables (not generic prompts)
- **`agency-agents-app`** — native macOS/Linux/Windows browser/installer
- `install.sh --tool hermes` → `~/.hermes/plugins/` lazy router
- `install.sh --tool cursor --division engineering,design` — selective install

### Ecosystem assessment

| Overlap | Notes |
|---------|-------|
| NovaMira / Hallmark / Premium-UI / DesignMD | Jon's **curated** UI skills win for Playground work |
| Hermes rituals / TRUTH | Agency agents are **task personas**, not session rituals |
| find-skills | Discovery catalog — agency-agents is **pre-built roster** |

### When to use

- Cherry-pick one agent for a specific task (e.g. Reddit Community Builder, Evidence Collector)
- Inspiration for writing new `.cursor/skills/` entries

### When to skip

- Bulk install all 230 — context pollution, conflicts with JonBeatz skill hierarchy

---

## AnythingLLM

- **URL:** https://github.com/mintplex-labs/anything-llm
- **Grade:** **B (83/100)** · **Cost:** Free OSS (MIT) + optional cloud keys
- **Verdict:** **WATCH**
- **Summary:** All-in-one private ChatGPT — RAG over docs, agents, MCP support, desktop + Docker; LiteLLM/LM Studio/Qdrant compatible.

| Factor | Score | Notes |
|--------|-------|-------|
| Gap fill | 22/40 | Solid product but Hermes Desktop + Mem0 + vault already cover chat+RAG+agents |
| Stack fit | 18/25 | Supports same LLM stack; **duplicate runtime** alongside Hermes |
| Cost/complexity | 17/20 | Easy desktop install; another always-on app |
| Maturity/trust | 26/15 | Very mature (Mintplex); telemetry opt-out available |

### What it does

- Document ingestion (PDF, DOCX, etc.) → vector DB (LanceDB default, Qdrant supported)
- Agent flows, scheduled jobs, embeddable chat widget (Docker)
- MCP compatibility, multi-user (Docker), dynamic model routing

### Ecosystem assessment

| Overlap | Notes |
|---------|-------|
| Hermes Desktop | **Primary** agent UI — Telegram + desktop + skills |
| Mem0 | Long-term memory — AnythingLLM has workspace memories |
| LiteLLM `:4000` | Both can point here — no need for second chat shell |
| Open WebUI (WATCH) | Same lane — study one, not all |

### When to use

- Reference for RAG/MCP patterns; client demo of "chat with your docs"
- Non-Hermes users on Jon's machine (unlikely)

### When to skip

- Daily driver — Hermes Desktop is the stack

---

## Flowise

- **URL:** https://github.com/FlowiseAI/Flowise
- **Grade:** **B- (82/100)** · **Cost:** Free OSS (Apache 2.0)
- **Verdict:** **WATCH**
- **Summary:** Visual drag-and-drop builder for LangChain AI agents and chatflows — Docker/Node, huge component library.

| Factor | Score | Notes |
|--------|-------|-------|
| Gap fill | 24/40 | Visual flows useful for non-code automations; Hermes + n8n cover most |
| Stack fit | 16/25 | Default **`:3000`** conflicts with JonBeatz Playground dev server |
| Cost/complexity | 16/20 | Another Node monorepo service to maintain |
| Maturity/trust | 26/15 | Industry standard for visual LLM flows; Flowise Cloud optional |

### What it does

- Node-based UI for chains, agents, tools, memory
- Self-host Docker or `npx flowise start`
- API for embedding flows in apps

### Ecosystem assessment

| Overlap | Notes |
|---------|-------|
| Hermes Desktop gateway | Agent runtime — Flowise is **parallel** orchestrator |
| n8n (if used) | Workflow automation — similar visual automation lane |
| Cursor agents | Code-first agents — Flowise is **no-code** |

### When to use

- Quick visual prototype of a LangChain flow without coding
- Study component patterns for Hermes tool design

### When to skip

- Default install on JonBeatz PC — port 3000 reserved for Next.js Playground

---

## Agent-Reach (re-review 2026-07-13)

- **Grade:** **B+ (87/100)** — **unchanged**
- **Verdict:** **IN USE** (installed 2026-07-04)
- **Re-review note:** README expanded (15+ platforms, OpenCLI routing, bili-cli B站 fix). Core value proposition holds — capability layer for agent internet access. Still **PARTIAL** until optional social channels configured. See main entry above.

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

---

## Capacitor (Ionic)

- **URL:** https://github.com/ionic-team/capacitor · https://capacitorjs.com/docs
- **Grade:** **B- (82/100)** · **Cost:** Free (MIT)
- **Verdict:** **WATCH** — per-project when wrapping a Next/web app as native iOS/Android
- **Status:** **NOT_INSTALLED** — no fleet package; add to app repo when needed

### Summary

Mature web-to-native bridge (v8.4.1, 16k★). Wrap existing Next/React SPAs in native shells with plugin API for camera, filesystem, etc. Ionic Framework optional.

### Gap / overlap

| Layer | Hermes |
|-------|--------|
| **Jedi-iOS / mobile-dev** | **Flutter** @ `D:\Hermes\mobile-dev` — primary native path |
| **Next.js sites** | Capacitor fits **companion apps** or web-first mobile without Flutter rewrite |
| **PWA** | Capacitor adds App Store distribution + native plugins |

### Risks

- Xcode + Android Studio toolchain on Windows (Android OK; iOS needs Mac or cloud build)
- Native project folders (`android/`, `ios/`) in repo — CI complexity
- Not a replacement for Flutter Jedi-iOS product work

**Verify:** `npx cap doctor` inside target app after `cap init`.

---

## Prisma (ORM + platform)

- **URL:** https://www.prisma.io/
- **Grade:** **B- (81/100)** · **Cost:** ORM free; **Prisma Postgres / Compute** freemium+paid
- **Verdict:** **WATCH** — stack option doc only; **Drizzle + Payload** already chosen
- **Status:** **NOT_INSTALLED**

### Summary

Industry-standard TypeScript ORM with schema-first migrations. Platform now pitches **Prisma Postgres** (managed) + **Prisma Compute** (long-lived TS agents). Strong Cursor/agent DX — but Jon's greenfield path is **Drizzle** (Next-Flick) and **Payload** (MSC).

### Overlap

| Tool | Role |
|------|------|
| **Drizzle** | Next-Flick ORM — IN USE pattern |
| **Payload CMS** | MSC content — A (94) IN USE |
| **Hostinger Postgres** | Prod DB path documented |
| **Prisma Cloud** | Overlaps hosted DB + deploy — not local-first |

**Verify:** N/A until a project explicitly picks Prisma over Drizzle.

---

## Open Notebook

- **URL:** https://github.com/lfnovo/open-notebook · https://www.open-notebook.ai/
- **Grade:** **B- (82/100)** · **Cost:** Free MIT (Docker); pay per LLM provider
- **Verdict:** **WATCH** — optional research notebook; **local Mem0 + Vader_Vault** stay canonical memory
- **Status:** **NOT_INSTALLED**

### Summary

35k★ self-hosted **Notebook LM** alternative — PDFs/video/audio ingestion, vector+full-text search, multi-speaker podcasts, REST API, MCP integration. Supports **LM Studio / Ollama** for local LLMs.

### Overlap

| System | Notes |
|--------|-------|
| **Mem0 (local Qdrant)** | Jon's semantic memory — `npm run mem0:*` |
| **Hermes Desktop** | Agent chat + memory block |
| **AnythingLLM** | Same RAG-chat niche (B WATCH) |
| **Vader_Vault** | Durable human-readable research |

### Risks

- **Docker required** — SurrealDB `:8000`, UI `:8502`, API `:5055`
- Default SurrealDB creds `root:root` — lock down before LAN exposure
- Another memory silo unless wired into vault/Mem0 rituals

**Verify:** `docker compose up` → http://localhost:8502 after setting `OPEN_NOTEBOOK_ENCRYPTION_KEY`.

---

## Brand Motion — Violet Car (design reference)

- **URL:** https://brandmotion.in/violet-car.html
- **Grade:** **B+ (85/100)** · **Verdict:** **REF** (prompt + showcase queue)
- **Not a product install** — copy-paste mega-prompt for cinematic automotive scroll sites

### Summary

Private prompt page: five pre-rendered videos (hero/exterior/interior/performance/finale), Lenis + GSAP ScrollTrigger, liquid glass UI, custom plasma cursor, R3F/WebGL shaders. Maps directly to **HERMES-SHOWCASE-SPEC** tier-2 scroll craft.

**Persisted:** DESIGN-REFERENCES + showcase add queue.

---

## Handy (offline dictation)

- **URL:** https://github.com/cjpais/handy · [handy.computer](https://handy.computer)
- **Grade:** **A- (91/100)** · **Cost:** Free MIT
- **Verdict:** **ADOPT** — try first for local speak-to-type (2026-07-13)
- **Summary:** Cross-platform **offline** speech-to-text — Tauri + Rust + Whisper/Parakeet V3. Global hotkey → speak → paste into any focused field. 26k★, active releases (v0.9.2), `winget install cjpais.Handy`.

| Factor | Score | Notes |
|--------|-------|-------|
| Gap fill | 36/40 | Best OSS dictation signal in fleet; Win+H replacement |
| Stack fit | 23/25 | Parakeet CPU path or Whisper GPU on RTX 5060 Ti; no cloud |
| Cost/complexity | 18/20 | Free; model DL 160MB–1.6GB; mic + accessibility perms |
| Maturity/trust | 14/15 | 26.4k★; MIT; signed Tauri updater; known Whisper crash edge cases |

### Overlap

| Tool | Role |
|------|------|
| **OpenWhispr** | B (85) WATCH — try **second**; optional LM Studio cleanup |
| **Calliop** | B- (82) WATCH — bundled Qwen cleanup; Windows-only backup |
| **Draven/OmniVoice** | Speak-**out** ritual TTS — orthogonal |

### Risks

- **Windows:** Whisper models can crash on some configs (documented in README); try Parakeet V3 CPU first
- **VRAM:** Large Whisper + LM Studio + ComfyUI concurrently — use Parakeet or unload GPU models
- **Permissions:** Microphone + accessibility (global hotkey paste)
- **winget package** not maintained by upstream — prefer GitHub release or `brew` on Mac

**Verify:** `winget install cjpais.Handy` → `npm run handy:status` → Parakeet V3 → hotkey paste test in Notepad.

**Install path (Jon 2026-07-13):** `winget install cjpais.Handy` v0.9.1 — first-run mic + model download in app.

**Known bug + fix (Jon 2026-07-13):** In-app model download can fail with **"Hugging Face download failed: Header content-range is missing"** — Handy's Rust `hf-hub` downloader chokes when the HF CDN returns `200` instead of `206` on a range request. Workaround: fetch the model into the stock HF cache with Python `huggingface_hub` (no range bug), which Handy then detects as ready. Use **`npm run handy:model`** (default Parakeet Unified EN 0.6B Q8_0) or `handy:model -Repo <id> -File <gguf> -Restart`. List catalog: `npm run handy:model:list`. Models live in `handy-computer/*-gguf` HF repos; Handy reads `~/.cache/huggingface/hub`, revision `main`, default quant Q8_0.

See [VOICE-WORKFLOW.md](./VOICE-WORKFLOW.md) — dictation is inbound STT, not ritual TTS.

---

## Wan2.1 (open video foundation models)

- **URL:** https://github.com/Wan-Video/Wan2.1 · [wan.video](https://wan.video)
- **Grade:** **B+ (88/100)** · **Cost:** Free Apache-2.0 (weights on HF/ModelScope)
- **Verdict:** **WATCH** — local research + ComfyUI path; fal/OpenMontage stay primary
- **Summary:** Alibaba Wan team's open **T2V / I2V / VACE / FLF2V** suite. T2V-1.3B runs on ~8.2 GB VRAM (480p); ComfyUI + Diffusers integrations shipped. 16.6k★.

| Factor | Score | Notes |
|--------|-------|-------|
| Gap fill | 34/40 | Strong local video fallback when fal credits thin |
| Stack fit | 22/25 | ComfyUI `@ H:\AI_Models\ComfyUI`; overlaps LongCat/Hunyuan watch deck |
| Cost/complexity | 14/20 | 14B checkpoints huge; slow on 5060 Ti (~minutes per clip) |
| Maturity/trust | 18/20 | SOTA OSS video; active community; Apache license |

### Overlap

| Tool | Role |
|------|------|
| **OpenMontage** | IN USE — agentic fal/Kling production |
| **fal Kling** | `video:fal` — zero-VRAM cloud default |
| **LongCat-Video** | B+ (87) WATCH — fal fallback #1 |
| **HunyuanVideo** | B+ (86) WATCH — fal fallback #2 |
| **ComfyUI** | IN USE — Wan nodes available |

### Risks

- **VRAM contention** with LM Studio :1234 — stop Comfy / unload before long runs
- **Disk:** multi-GB checkpoints per model variant (1.3B–14B)
- **Speed:** 5s 480p ~4 min on RTX 4090 (1.3B); slower on 5060 Ti
- Optional Dashscope prompt extension needs API key — skip for local-only

**Verify:** `npm run wan21:status` after `npm run wan21:install`.

**Install path (Jon 2026-07-13):** repo + weights on **`H:\AI_Models\Wan2.1`** (large files on H:). Windows: run via **ComfyUI** Wan workflows (`npm run comfy:start` when needed) — native `generate.py` needs `flash_attn` (Linux/CUDA build).

See [IMAGE-WORKFLOW.md](./IMAGE-WORKFLOW.md) video section + OpenMontage `AGENT_GUIDE.md`.

---

## Tabby (terminal + SSH)

- **URL:** https://github.com/Eugeny/tabby · https://tabby.sh
- **Grade:** **B (83/100)** · **Cost:** Free (MIT)
- **Verdict:** **WATCH** — optional Windows daily-driver terminal for Hermes fleet SSH ops
- **Status:** **NOT_INSTALLED**

### Summary

73k★ cross-platform terminal (formerly Terminus) — tabbed panes, integrated SSH/Telnet/serial, encrypted SSH vault, WSL/PowerShell/CMD profiles, Zmodem file transfer. Actively maintained (releases through 2026).

### Gap / overlap

| Layer | Hermes |
|-------|--------|
| **Cursor integrated terminal** | Default for agent sessions |
| **Windows Terminal** | OS default; lighter RAM |
| **desktop-commander MCP** | Programmatic shell from agents |
| **Hostinger SSH** | Tabby connection manager fits manual MSC deploy/debug |

### Risks

- Electron app — higher RAM than Alacritty/Windows Terminal; not lightweight
- SSH secrets in Tabby vault — separate from fleet `.env.local` discipline
- **tabby-mcp-server** plugin exists — optional; do not duplicate Playwright MCP browser work

**Verify:** `winget install Eugeny.Tabby` → save Hostinger SSH profile → connect smoke test.

---

## Graphify (multimodal knowledge graph)

- **URL:** https://github.com/Graphify-Labs/graphify
- **Grade:** **B (84/100)** · **Cost:** Free
- **Verdict:** **WATCH** — multimodal graph skill; **codebase-memory-mcp** stays primary for Cursor
- **Status:** **NOT_INSTALLED**

### Summary

Claude Code `/graphify` skill — builds a queryable knowledge graph from code (tree-sitter AST), markdown, PDFs, and images via Claude vision. Outputs `graph.html`, Obsidian vault, `GRAPH_REPORT.md`, optional MCP server. Claims ~71× token reduction vs reading raw corpora on large mixed folders.

### Overlap

| Tool | Role |
|------|------|
| **codebase-memory-mcp** | **IN USE** — JonBeatz indexed; Cursor MCP graph queries |
| **Vader_Vault** | Human-readable durable memory |
| **Mem0** | Runtime semantic memory |

### Risks

- **`graphify hook install`** writes git post-commit hooks — same class of gotcha as CBM `~/.claude/hooks` (audit before enabling)
- PyPI package temporarily named **`graphifyy`**; Windows PATH to Python Scripts
- Primary workflow is **Claude Code** skill — Cursor-native path is `--mcp` or manual skill port, not fleet-default

**Verify:** `pipx install graphifyy` → `graphify --help` → trial on small folder before large corpus.

---

## Artlist (stock + AI toolkit)

- **URL:** https://artlist.io/
- **Grade:** **B- (81/100)** · **Cost:** Paid subscription (free tier watermarked)
- **Verdict:** **WATCH** — licensed stock music/SFX/footage + unified AI model hub when cloud gen is OK
- **Status:** **NEEDS_LOGIN**

### Summary

Commercial creative platform — royalty-free music, SFX, footage, templates, LUTs, plus **AI Toolkit** aggregating Sora, Veo, Kling, Wan, Flux, ElevenLabs, HeyGen avatars, etc. Artlist Studio (beta) for end-to-end AI video production. 900K+ stock assets.

### Gap / overlap

| Layer | Hermes |
|-------|--------|
| **fal MCP / OpenMontage** | Agent video generation IN USE / WATCH |
| **Wan2.1 local** | `H:\AI_Models` when zero cloud cost matters |
| **HF `image:gen`** | Stills without subscription |
| **MSC / jonbeatz video** | Licensed music/SFX for client deliverables — real gap |

### Risks

- **Paid** — subscription creep; free tier watermarked
- Cloud-only generation — no local-first alignment with VRAM policy
- Another SaaS login — track in TOOL-CHEST if adopted

**Verify:** Free account → generate one watermarked clip → confirm license tier before client use.

---

## GitHub topic — responsive-navbar (pattern catalog)

- **URL:** https://github.com/topics/responsive-navbar
- **Verdict:** **REF** (not a product — topic index of OSS nav repos)
- **Persisted:** DESIGN-REFERENCES only

Curated GitHub topic listing responsive navigation implementations. Use alongside [Navbar Gallery](https://navbar.gallery/) for header/nav audits on Next.js sites — not a fleet install.

---

## getdesign.md

- **URL:** https://getdesign.md/
- **Grade:** **A- (91/100)** · **Cost:** Freemium (catalog free; private DESIGN.md / LaunchKit paid)
- **Verdict:** **IN USE** — via **DesignMD** skill (`.cursor/skills/DesignMD/`)
- **Status:** **READY**

### Summary

Web catalog of **300+ independent DESIGN.md analyses** (Apple, Stripe, Linear, Cursor, etc.) aligned with Google's official DESIGN.md spec. Operators pick a brand visual language and hand it to coding agents as a reusable design brief — colors, type, spacing, components, reasoning. CLI: `npx getdesign list` / `npx getdesign add <brand>`; custom URLs via `npx @designmdcc/cli <url>`.

### Grade breakdown

| Axis | Score | Notes |
|------|-------|-------|
| Gap fill | 37/40 | Best curated DESIGN.md source for agent UI work |
| Stack fit | 25/25 | DesignMD skill already canonical in fleet |
| Cost/complexity | 17/20 | Free catalog; paid custom requests |
| Maturity | 12/15 | Fast-growing catalog; skill doc still says "72" — use live site count |

### Gap / overlap

| Layer | Hermes |
|-------|--------|
| **DesignMD skill** | **IN USE** — primary workflow |
| **awesome-design-md** (vendored) | Static 74-brand snapshot — getdesign.md is live + larger |
| **Hallmark / NovaMira** | Taste gates + layout — DESIGN.md supplies tokens |

### Risks

- Catalog count drifts — re-check getdesign.md before citing brand list size
- Private/custom DESIGN.md is paid — default to catalog + CLI extract
- Do not duplicate full DESIGN.md bodies in vault — link + store in `.cursor/DesignMD/`

**Verify:** `npx getdesign list` → `npx getdesign add vercel --out .cursor/DesignMD/DESIGN-VERCEL.md`

---

## mp4-to-jpg (allarddewinter)

- **URL:** https://github.com/allarddewinter/mp4-to-jpg · **Demo:** https://allarddewinter.github.io/mp4-to-jpg/
- **Grade:** **B (85/100)** · **Cost:** Free MIT
- **Verdict:** **REF** — bookmark [demo](https://allarddewinter.github.io/mp4-to-jpg/) (Jon 2026-07-13 — no offline copy)
- **Status:** **READY**

### Summary

Single static **HTML** app — drag-drop video → extract JPEG frames **100% client-side** (no upload). Modes: step interval, FPS, exact timestamps; quality/scale; ZIP bundle; max 5000 frames. Built for **screen recording → LLM image input** when agents can't ingest video directly.

### Grade breakdown

| Axis | Score | Notes |
|------|-------|-------|
| Gap fill | 32/40 | Quick local extract without ffmpeg CLI — privacy vs XConvert |
| Stack fit | 22/25 | Scroll-video / claude-video adjacency; not agent-automatable |
| Cost/complexity | 20/20 | Zero install; optional JSZip CDN |
| Maturity | 11/15 | 1★ repo; MP4 keyframe seek imprecision |

### Gap / overlap

| Layer | Hermes |
|-------|--------|
| **ffmpeg** (PATH) | **Primary** for scroll-cinema frame sequences (`Scroll-Video-Sequence` skill) |
| **scroll-cinema** | WATCH — browser extract + React export prototype |
| **XConvert** | Server upload — skip for sensitive footage |
| **claude-video `/watch`** | Video understanding — not frame export for scroll builds |

### Risks

- **Keyframe seeking** — timestamps snap to nearest keyframe; not frame-perfect like ffmpeg
- **Browser RAM** — hundreds of 1080p frames can freeze tab; use max-frames + scale down
- **ZIP needs CDN** unless self-host JSZip — individual downloads work offline
- **iOS/Safari** — keep tab foreground during extract

**Verify:** Open demo → 10s clip → 2 fps → download ZIP → confirm `frame_*.jpg` count.

---

## Video To JPG (videotojpg.com)

- **URL:** https://videotojpg.com/ · **Org:** https://github.com/Video-To-JPG/
- **Grade:** **B+ (88/100)** · **Cost:** Free
- **Verdict:** **REF** — **bookmark** https://videotojpg.com/ (Jon 2026-07-13)
- **Status:** **READY**

### Summary

Production **browser-only** video frame extractor — JPG/PNG/WebP output, custom FPS/time range, **smart clarity/blur detection**, batch ZIP, thumbnail generator. v1.4+ adds **FFmpeg WASM** for H.265/HEVC and URL loading (CORS). No signup; processing stays local.

### Grade breakdown

| Axis | Score | Notes |
|------|-------|-------|
| Gap fill | 35/40 | Best-in-class browser extractor vs mp4-to-jpg single-file |
| Stack fit | 22/25 | Scroll/LLM stills adjacency; not agent-automatable |
| Cost/complexity | 20/20 | Free forever; WASM download on first HEVC use |
| Maturity | 11/15 | Closed-source web app; GitHub org is profile/README only |

### Gap / overlap

| Layer | Hermes |
|-------|--------|
| **ffmpeg** (PATH) | Primary for scroll-cinema sequences |
| **mp4-to-jpg** (REF) | Jon bookmarked simpler single-file tool |
| **XConvert / OnlineConverter** | Server upload — skip |

### Risks

- Closed-source SaaS — could change terms; no offline `index.html` fork like mp4-to-jpg
- HEVC path downloads ffmpeg.wasm (~tens of MB) on first use
- Large 4K videos can exhaust browser RAM

**Verify:** 30s MP4 → 2 fps → blur filter on → ZIP download.

---

## free-llm-api-resources (cheahjs)

- **URL:** https://github.com/cheahjs/free-llm-api-resources
- **Grade:** **B+ (88/100)** · **Cost:** Free
- **Verdict:** **REF** — discovery bookmark for free API tiers
- **Status:** **READY**

### Summary

Community-maintained list (**27k★**, 421 commits) of **legitimate free LLM API providers** — OpenRouter, Google AI Studio, Groq, NVIDIA NIM, Mistral, Cohere, Cloudflare Workers AI, trial-credit providers. GitHub Actions auto-updates model tables weekly. Explicitly excludes reverse-engineered chatbot APIs.

### Gap / overlap

| Layer | Hermes |
|-------|--------|
| **OpenRouter** | IN USE via LiteLLM `*-or` |
| **DeepSeek + LiteLLM** | IN USE `:4000` daily driver |
| **LM Studio** | IN USE `:1234` local |
| **Groq** | PARTIAL — Whisper for claude-video |
| **CURSOR-MODELS-CHEATSHEET** | Canonical Cursor routing doc |

### Risks

- Free tiers change without notice — verify limits before production routing
- Do not abuse quotas — list author asks operators to preserve access
- Not a replacement for LiteLLM config — discovery only

**Verify:** Open README → confirm OpenRouter/Groq rows match current provider docs.

---

## awesome-freellm-apis (freellm.net)

- **URL:** https://github.com/open-free-llm-api/awesome-freellm-apis · **Live:** https://freellm.net/
- **Grade:** **B+ (87/100)** · **Cost:** Free MIT
- **Verdict:** **REF** — **bookmark** https://freellm.net/ (Jon 2026-07-13); discovery + Cursor config generator
- **Status:** **READY**

### Summary

Structured directory of **377+ free models / 30 providers**, synced daily from **freellm.net**. Includes credit-card transparency, rate limits, context windows, and **one-click config snippets** for Cursor, Claude Code, Codex, Aider. Playground + compare tools on live site.

### Gap / overlap

| Layer | Hermes |
|-------|--------|
| **cheahjs/free-llm-api-resources** | Older/larger community list (27k★) — use both; freellm.net wins for Cursor configs |
| **OpenRouter IN USE** | Primary cloud routing already wired |
| **CURSOR-MODELS-CHEATSHEET** | Fleet canonical for Setup B/C |

### Risks

- Newer project (708★) — less battle-tested than cheahjs list
- freellm.net dependency for live data — README syncs daily but site is primary UX
- Free model slugs drift — cross-check before adding to LiteLLM yaml

**Verify:** https://freellm.net/config/#cursor → copy Groq snippet → smoke one completion.

---

## Mnemosyne

- **URL:** https://github.com/mnemosyne-oss/mnemosyne · **Site:** https://mnemosyne.site/
- **Grade:** **B+ (89/100)** · **Cost:** Free MIT
- **Verdict:** **IN USE (Cursor MCP trial)** — JonBeatz Phase 1; **do not replace Mem0**
- **Status:** **READY** — `npm run mnemosyne:status`

### Summary

**Zero-dependency, local-first AI memory** — single SQLite file, BEAM architecture (working + episodic + temporal KG), built-in **MCP server** for Cursor/Claude Code/Codex, native **Hermes Agent plugin** (23 tools). v3.12.2 (Jul 2026), 1.5k★. Claims strong LongMemEval/BEAM benchmark scores; optional bidirectional sync with client-side encryption.

### Grade breakdown

| Axis | Score | Notes |
|------|-------|-------|
| Gap fill | 34/40 | MCP-native memory for agents — complements Mem0's Qdrant path |
| Stack fit | 24/25 | Literal Hermes + Cursor integration; fleet-aligned |
| Cost/complexity | 19/20 | pip install; `[embeddings]` ~800MB RAM |
| Maturity | 12/15 | Fast-moving; Hermes plugin complexity; namespace collision history fixed |

### Gap / overlap

| Layer | Hermes |
|-------|--------|
| **Mem0 + Qdrant** | **IN USE** — `jonbeatz_personal`; semantic recall via LM Studio |
| **Draven Mem0** | **IN USE** — `draven_memories` isolated scope |
| **Vader Vault** | Human-readable durable memory — link, don't duplicate |
| **ReCall / project-log** | Session ritual memory — keep authoritative |

### Risks

- **Additive only** — policy forbids replacing working Mem0 stack without explicit Jon approval
- **Memory silo drift** — parallel SQLite DB vs Qdrant + vault unless rituals define what goes where
- **RAM** — `[embeddings]` ~800MB; `[all]` ~1.5GB+; shared embedding server pattern for multi-profile Hermes
- **Hermes plugin** — disable built-in MEMORY.md carefully; wrong config strips agent file tools
- **Fast-moving API** — v3.12.x with frequent fixes; read UPDATING.md before upgrades

**Verify:** `npm run mnemosyne:install` → reload Cursor MCP → `npm run mnemosyne:status` → `npm run mnemosyne:remember -- "test"` → `npm run mnemosyne:recall -- "test"`. Doc: JonBeatz `.cursor/docs/MNEMOSYNE.md`.

---

## Directus (re-confirmed 2026-07-13)

- **URL:** https://directus.com/ · **Repo:** https://github.com/directus/directus
- **Grade:** **B+ (87/100)** ↑ from 86 — **native MCP** + AI Studio assistant strengthen agent/CMS fit
- **Verdict:** **WATCH** — SQL-first headless backend; **Payload IN USE** on MSC
- **Status:** **NOT_INSTALLED**

**New since Jul 2026 review:** Native **MCP server** for Cursor/Claude; in-Studio AI for translations/schema; Monospace product line. Still BSL 1.1 (revenue cap) with GPL alternative.

**Verify:** `npx directus-template-cli@latest init` → connect Postgres → MCP smoke from Cursor.

---

## Strapi (re-confirmed 2026-07-13)

- **URL:** https://strapi.io/ · **Repo:** https://github.com/strapi/strapi
- **Grade:** **B+ (87/100)** — grade holds
- **Verdict:** **WATCH** — GUI CMS for non-dev editors; separate Node service
- **Status:** **NOT_INSTALLED**

**New since prior review:** **Strapi MCP GA** (Jul 2026) — agents can manage Strapi content. MIT OSS core; Strapi Cloud optional.

**Verify:** `npx create-strapi-app@latest` → enable MCP → one content-type CRUD via agent.

---

## cto.new (cto AI Business)

- **URL:** https://cto.new/ · **Product:** cto AI Business (agent teams)
- **Grade:** **B (83/100)** · **Cost:** Freemium (free forever ad-supported; Premium paid)
- **Verdict:** **WATCH** — SMB multi-agent pilot SaaS; **Hermes Desktop + Cursor fleet IN USE**
- **Status:** **NOT_INSTALLED**

### Summary

**Ad-supported, free-forever multi-agent platform** — Team Lead + hireable Team Members (engineering, marketing, content studio), Headquarters command center, kanban tasks, human approvals gate, cloud sandboxes. **Auto model** routes across 10+ frontier LLMs without BYOK. **MCP-native** with 10 pre-configured integrations (Linear, Sentry, Vercel, Supabase, Neon, Notion, Prisma, Render, Cloudflare Observability, Webflow) plus custom stdio/HTTP MCP servers.

### Grade breakdown

| Axis | Score | Notes |
|------|-------|-------|
| Gap fill | 28/40 | Zero-key multi-agent pilot for non-dev SMBs |
| Stack fit | 18/25 | Heavy overlap with Hermes Desktop, Cursor, LiteLLM, fleet rituals |
| Cost/complexity | 17/20 | Free tier generous; ads + rolling 24h/7d limits |
| Maturity | 10/15 | Marketing-heavy SEO; proprietary SaaS; limited OSS transparency |

### Gap / overlap

| Layer | Hermes |
|-------|--------|
| **Hermes Desktop + Telegram** | **IN USE** — primary agent surface |
| **Cursor + MCP fleet** | **IN USE** — dev agent orchestration |
| **LiteLLM + ngrok** | **IN USE** — model routing |
| **cto.new** | Parallel SMB “AI team” UI — not a dev stack replacement |

### Risks

- **Agent silo** — business context lives in cto cloud, not Mem0/vault/Hermes memory
- **Ad-supported free tier** — usage caps, upgrade pressure, data on vendor infra
- **Proprietary** — no self-host; export/portability unclear
- **Overlap tax** — duplicating agent workflows Jon already runs in Hermes/Cursor
- **MCP credentials** — connecting Linear/Vercel/Supabase grants platform access; use approvals gate

**Verify:** Sign up → hire **Engineering Team** → one task with approval flow → connect one MCP (e.g. Linear) → confirm output artifact.

**Recommendation:** Bookmark for **free multi-agent pilot** experiments (marketing/content teams). Do **not** replace Hermes Desktop or Cursor dev workflows.

---

## Better Auth (re-confirmed 2026-07-13)

- **URL:** https://www.better-auth.com/ · **Repo:** https://github.com/better-auth/better-auth
- **Grade:** **A (92/100)** — grade holds
- **Verdict:** **ADOPT** — in-app auth for Next.js + Drizzle/pg0; **Clerk IN USE** on Next-Flick prod until spike ships
- **Status:** **PARTIAL** — installed Next-Flick v7 (`npm run auth:setup`, `AUTH_PROVIDER=better-auth` local)

### Summary

**TypeScript-first auth framework** for Next.js — sessions in your Postgres via Drizzle adapter, plugins (2FA, orgs, passkeys), framework-agnostic core. Successor path from Auth.js for apps that want **data ownership** vs Clerk SaaS.

### Re-confirm notes (Jul 2026)

- Still best fleet fit for **Next-Flick local-first auth** (`pg0` dev + Neon/Supabase prod)
- **Clerk** remains prod on Next-Flick — local spike **installed** 2026-07-13; prod cutover still gated
- Pairs with **Better Auth + Drizzle** stack; do not triple-stack with Supabase Auth unless intentional

### Risks

- **Migration cost** — Clerk → Better Auth needs user/session migration plan
- **You own security** — session secret rotation, CSRF, cookie config vs Clerk managed
- **Plugin churn** — fast-moving OSS; pin versions on spike branch
- **Hostinger** — auth runs in-app on Node deploy; no hPanel magic

**Verify:** `cd D:\Hermes\projects\Next-Flick` → `npm run auth:setup` → `npm run db:push` → `npm run web:dev` → sign-up → `/home` → `npm run web:build` exits 0.

---

## Supabase

- **URL:** https://supabase.com/ · **Repo:** https://github.com/supabase/supabase
- **Grade:** **B+ (88/100)** · **Cost:** Freemium (generous free tier; paid scale)
- **Verdict:** **REF** — **bookmark** Neon alt for Next-Flick (Jon 2026-07-13); OSS Postgres BaaS
- **Status:** **NOT_INSTALLED** (bookmark only)

### Summary

**Open-source Firebase alternative** — managed or self-hosted **Postgres**, built-in **Auth + RLS**, **Storage**, **Edge Functions**, **Realtime**, **pgvector**, instant REST/GraphQL APIs, dashboard SQL editor, **MCP** for agent schema/RLS assistance. Strong Next.js quickstarts and Vercel partnership.

### Grade breakdown

| Axis | Score | Notes |
|------|-------|-------|
| Gap fill | 33/40 | Full BaaS when Neon is DB-only; Auth+Storage+Vector bundle |
| Stack fit | 23/25 | Next-Flick Drizzle + Hostinger external PG pattern fits |
| Cost/complexity | 18/20 | Free tier solid; self-host option for control |
| Maturity | 14/15 | Production-proven; huge OSS community |

Actually I already said B+ (88) in watchlist. Breakdown: 33+23+18+14 = 88.

### Gap / overlap

| Layer | Hermes |
|-------|--------|
| **Neon** | **IN USE** Next-Flick prod Postgres |
| **pg0** | **IN USE** local dev `:5433` |
| **Better Auth** | **ADOPT** — can use Supabase PG only + BA for auth (cleaner than dual auth) |
| **Payload** | **IN USE** MSC — SQLite local; not Supabase target |
| **bknd** | WATCH embedded BaaS overlap |

### Risks

- **Vendor bundling** — easy to over-adopt Supabase Auth when Better Auth ADOPT is planned
- **RLS complexity** — agent MCP can help but misconfigured policies leak data
- **Hostinger constraint** — shared Node hosting still needs **external** Supabase cloud or self-host VPS
- **Egress/cost** — storage + edge functions can surprise at scale
- **Lock-in perception** — portable Postgres but Supabase-specific features (Auth, Realtime) migrate work

**Verify:** `npx supabase init` → `supabase start` (local Docker) OR cloud free project → Drizzle connect → one table CRUD → optional MCP schema lint in Cursor.

**Recommendation:** **Bookmarked** as Neon alternative for Next-Flick. If trialed later: use **Supabase Postgres only** + **Better Auth** for in-app auth.

---

## hermes-browser-extension (2026-07-13)

- **URL:** https://github.com/abundantbeing/hermes-browser-extension
- **Grade:** **A (93/100)** · **License:** MIT · **Stars:** ~947 (Jul 2026)
- **Verdict:** **ADOPT** — browser side panel + Hermes Web for the real Hermes Agent runtime
- **Status:** **READY** (JonBeatz hub, 2026-07-13) — Chrome + Brave; companion plugin enabled

### Summary

Community **Chrome/Edge/Chromium MV3** extension (v0.1.11 alpha) by Jon Komet (`@abundantbeing`). Side panel + full-page **Hermes Web** connect to **Local gateway** (`:8642`), **Hermes Cloud** (trusted dashboard attach), or **Remote gateway**. Sends sanitized page context into persisted Hermes sessions — models, tools, skills, MCPs from the connected runtime.

### Gap / overlap

| Layer | Hermes |
|-------|--------|
| **Hermes Desktop** | **IN USE** — same three connection modes; extension adds **in-browser** page context |
| **Telegram gateway** | **IN USE** — phone chat; no tab/DOM context |
| **Cursor browser MCPs** | Playwright / pilot / cursor-ide-browser — **agent automation**, not Hermes session UI |
| **Hermes WebUI** (`:8787`) | WATCH — separate native web UI project |

### Risks

- **CORS gate** — empty `API_SERVER_CORS_ORIGINS` → **403** on all browser origins; set `chrome-extension://<id>` in profile + global `.env` after load unpacked
- **Profile env** — gateway reads `profiles/<slug>/.env`; `API_SERVER_*` in global `.env` alone does not start `:8642`
- **Companion plugin** — install under `profiles/<slug>/plugins/hermes-browser-companion`; context cache is process-local (side panel ≠ Desktop)
- **Remote gateway** — never expose `:8642` naked to internet; Tailscale/VPN or HTTPS reverse proxy + narrow CORS
- **Page content** — wrapped as untrusted but still flows to LLM; banking/crypto pages restricted by design
- **Mic in side panel** — Chromium may block; voice dictation fallback tab exists

**Verify:** `npm run hermes-browser:install` → load `dist/` in Chrome + Brave → `npm run hermes-browser:cors-sync` → side-panel summarize smoke → optional `npm run hermes-browser:companion`.

**Recommendation:** **ADOPT** for Jon's Hermes stack — strongest browser↔Hermes bridge. Pair with existing `:8642` gateway; do not replace Desktop/Telegram.

---

## iOS native clients vs Telegram — Hermex + Aight (2026-07-13)

**Context:** Jon's verified phone path is **Telegram gateway** (`npm run telegram:ensure`, `TELEGRAM-WORKFLOW.md`) — not a native App Store client. These reviews compare optional **native iOS** surfaces against that incumbent.

| Surface | Grade | Verdict | Connects to | Jon stack today |
|---------|-------|---------|-------------|-----------------|
| **Telegram gateway** (incumbent) | **A- (92)** | **IN USE** | Hermes gateway `:8642` + LiteLLM | **READY** — daily driver |
| **Hermex** | **B+ (88)** | **WATCH** | `nesquena/hermes-webui` server `:8787` | **NOT_INSTALLED** — different server path |
| **Aight** | **B (85)** | **WATCH** | Hermes gateway (Hermes mode, direct) | **NOT_INSTALLED** — App Store only |

**Recommendation for Jon:** **Keep Telegram primary** (Jon 2026-07-13 — confirmed). **Bookmark for later:** **Aight** (gateway-native, try free Hermes-only first) · **Hermex** (after Hermes WebUI + tunnel). No install until Jon explicitly asks.

**Jon decision (2026-07-13):** Telegram unchanged. Aight + Hermex bookmarked as future good native iOS options — not replacing Telegram.

---

## Hermex (2026-07-13)

- **URLs:** https://github.com/uzairansaruzi/hermex · https://apps.apple.com/us/app/hermex/id6767006319 · https://hermexapp.com
- **Grade:** **B+ (88/100)** · **License:** MIT · **Stars:** ~753 (Jul 2026)
- **Verdict:** **WATCH** — best native iOS UI for **hermes-webui**, not for Telegram-first stacks
- **Status:** **NOT_INSTALLED**

### Summary

**Hermex** is a native SwiftUI iPhone app (iOS 18+) that drives a self-hosted **[hermes-webui](https://github.com/nesquena/hermes-webui)** Python server on port **`:8787`**. Free, no IAP, no analytics, no third-party relay — the phone talks only to your server over HTTPS (Cloudflare Tunnel primary, Tailscale secondary per upstream docs).

Features: streaming chat with tool visibility, steer/stop runs, sessions search/resume, model picker, profiles/projects, cron tasks, skills browser, workspace file browser, read-only memory/insights, offline session cache.

### Gap / overlap

| vs | Notes |
|----|-------|
| **Telegram gateway** | Telegram hits `:8642` gateway polling — **no WebUI server required**. Hermex needs **separate** `hermes-webui` install + remote reachability. |
| **Hermes WebUI** | Hermex is the **official-feeling** mobile client for WebUI — pair them; WebUI is prerequisite. |
| **Aight** | Aight Hermes mode targets **gateway** directly; Hermex targets **WebUI API**. Different wire protocols. |
| **Hermes Desktop** | Desktop + Telegram sidebar already cover session preview on PC; Hermex is phone-native WebUI. |

### Risks

- **Wrong server assumption** — installing Hermex alone does nothing without `hermes-webui` running and reachable from iPhone.
- **Exposure** — tunnel/Tailscale misconfig can publish admin surfaces; use password auth (`HERMES_WEBUI_PASSWORD`) and narrow ingress.
- **Dual stack** — running WebUI + Telegram gateway + LiteLLM + Desktop is more moving parts than Telegram-only.
- **iOS 18+** — excludes older iPhones.
- **Upstream API churn** — Hermex pins upstream tags; `hermes-webui` is very active (~16k stars).

**Verify:** Install `hermes-webui` → expose via Cloudflare Tunnel or Tailscale → App Store Hermex → login smoke → streaming chat + session list.

---

## Aight (2026-07-13)

- **URLs:** https://aight.cool/ · https://apps.apple.com/us/app/aight-for-openclaw-hermes/id6758570441
- **Grade:** **B (85/100)** · **License:** Proprietary app; OSS plugins/relays (MIT)
- **Verdict:** **WATCH** — strongest **gateway-native** iOS UX; freemium + closed client hold it back vs Telegram
- **Status:** **NOT_INSTALLED**

### Summary

**Aight** is a native iOS + macOS client for multiple agent backends: OpenClaw, **Hermes**, Claude Code, Codex. Marketing positions it against "WhatsApp/Telegram bots with no sessions." **Hermes mode** connects **directly** to your self-hosted Hermes instance (per privacy policy — no Aight relay for Hermes chat).

Free tier: **1 mode at a time**, 1 team, 1 channel, 1 group chat. **Pro** $4.99/mo or $34.99/yr — all four modes, unlimited teams/agents/channels, premium themes, multi-device sync.

Features beyond Telegram: starred/pinned sessions, search, unread badges, multi-agent group chat with @mentions, push-to-talk + conversational voice (ElevenLabs or local TTS), gateway health dashboard, per-session token/cost view.

### Gap / overlap

| vs | Notes |
|----|-------|
| **Telegram** | Telegram is **free**, verified on Jon's stack, mixed with personal chats, weaker session UX, no native voice orb, no tool-call UI polish. |
| **Hermex** | Hermex = WebUI path; Aight Hermes mode = **gateway** path — **better stack fit for Jon** without adding `:8787`. |
| **Hermes Desktop** | Complementary — Desktop for deep work; Aight for pocket control surface. |

### Risks

- **Freemium lock** — free tier allows only one mode; Hermes-only is fine but Claude+Hermes needs Pro.
- **Closed source** — main app not auditable; only `aight-push-relay`, channel plugins OSS on `aight-cool` org.
- **Optional telemetry** — Amplitude + Sentry default on; opt out in Settings → Preferences.
- **Channels relay** — Claude Code/Codex modes use `channels.aight.cool`; **not** used for Hermes mode per privacy policy — still know which mode you're in.
- **Remote access** — like any gateway client, needs Tailscale/VPN or careful HTTPS reverse proxy; never naked `:8642` on the internet.
- **Not a Telegram replacement for alerts** — `telegram-notify.mjs` boot pings can stay alongside Aight.

**Verify:** App Store install → Hermes mode only (free) → point at gateway (Tailscale or LAN) → `/new` equivalent session → tool visibility smoke → opt out analytics.

---

## Refero MCP (2026-07-13)

- **URL:** https://refero.design/mcp · **Skill:** https://github.com/referodesign/refero_skill
- **Grade:** **A- (91/100)** · **License:** Proprietary SaaS · **Cost:** **$17/mo** Pro (MCP included)
- **Verdict:** **WATCH** — best MCP for agent-time UI/UX research; **Jon bookmark 2026-07-13 — setup later**
- **Status:** **NOT_INSTALLED** (bookmark)

### Summary

**Refero MCP** connects Cursor/Claude/Codex to **135,000+ real product screens** and **10,000+ user flows** with structured metadata (UX patterns, layouts, descriptions). Agent researches competitors and proven patterns before generating UI — directly addresses the "AI slop layout" problem. Includes **refero_skill** (`npx skills add https://github.com/referodesign/refero_skill`) for research-first methodology.

### Gap / overlap

| vs | Notes |
|----|-------|
| **Hallmark** | Hallmark = anti-slop **gates** at build time; Refero = **reference library** at research time — **complementary** |
| **DesignMD / getdesign.md** | DesignMD = brand DESIGN.md analyses; Refero = live product screens + flows — pair both |
| **Mobbin (REF)** | Mobbin = human browse; Refero MCP = **agent-queryable** at task time |
| **DESIGN-REFERENCES** | Refero site already bookmarked 2026-07-04; MCP is the installable layer |

### Risks

- **Paid** — $17/mo Pro required for MCP (annual discount available)
- **OAuth flow** — first MCP call opens browser login
- **SaaS dependency** — design data not self-hosted
- **Subscription creep** — overlaps Mobbin freemium if Jon already pays for pattern libraries

**Verify:** Refero Pro → add MCP to `.cursor/mcp.json` → restart Cursor → prompt: "Find onboarding flows from fintech apps" → confirm structured results.

**Recommendation:** **WATCH bookmark** — Jon 2026-07-13: setup later when doing heavy UI builds; pair Hallmark + DesignMD.

---

## Refero Styles (2026-07-13)

- **URL:** https://styles.refero.design/
- **Grade:** **B+ (88/100)** · **License:** Refero SaaS (beta)
- **Verdict:** **WATCH** — DESIGN.md pattern library; **Jon bookmark 2026-07-13 — setup later**
- **Status:** **NOT_INSTALLED** (bookmark)

### Summary

**Refero Styles** (beta) hosts **2,000+ AI-readable DESIGN.md examples** from real products (Linear, Raycast, Apple, Duolingo, etc.) — colors, typography, spacing, components, motion notes. Drop-in for Cursor, Claude Code, Codex, v0, Lovable. Cross-promotes Refero MCP.

### Gap / overlap

| vs | Notes |
|----|-------|
| **getdesign.md IN USE** | Same DESIGN.md concept — Refero Styles is curated visual catalog; getdesign is CLI + 300+ brands |
| **awesome-design-md (external)** | Vendored 74-brand catalog — Refero Styles is larger + searchable UI |
| **Refero MCP** | Styles = static DESIGN.md templates; MCP = dynamic screen/flow search — use together |

### Risks

- **Beta** — URL/content may shift
- **Account** — likely tied to Refero subscription for full export
- **Duplication** — don't maintain three parallel DESIGN.md sources without ritual

**Verify:** Browse styles → copy one DESIGN.md into a test prompt → compare output vs Hallmark gate pass.

**Recommendation:** **WATCH bookmark** — pair with Refero MCP when Jon sets both up.

---

## MemPalace (2026-07-13)

- **URL:** https://github.com/MemPalace/mempalace · **Docs:** https://mempalaceofficial.com
- **Grade:** **B (84/100)** · **License:** MIT · **Stars:** ~57,301 (Jul 2026)
- **Verdict:** **WATCH** — impressive local memory; **Jon bookmark 2026-07-13 — setup later; Mem0 stays primary**
- **Status:** **NOT_INSTALLED** (bookmark)

### Summary

**MemPalace** stores conversation history **verbatim** (no summarize/extract) with semantic retrieval. Palace metaphor: people/projects = wings, topics = rooms. Default backend ChromaDB; pluggable. MCP server (stdio/Docker). Claims **96.6% R@5** on LongMemEval with zero API calls. CLI via `uv tool install mempalace`.

### Gap / overlap

| vs | Notes |
|----|-------|
| **Mem0 IN USE** | Mem0 = inferred semantic memories + Qdrant; MemPalace = verbatim transcript retrieval — different model |
| **Mnemosyne trial** | Mnemosyne = Cursor MCP episodic SQLite; MemPalace = mining + palace structure + MCP |
| **Draven / Vault** | Draven = assistant scope; Vault = human durable — MemPalace doesn't replace either |
| **Open Notebook WATCH** | Both RAG/notebook style — MemPalace more agent-memory focused |

### Risks

- **Impostor domains** — official sources only: GitHub, PyPI, mempalaceofficial.com (`.tech`/`.net` fakes reported)
- **Another memory silo** — fleet policy: additive only; Jon must pick primary write target per fact
- **ChromaDB + embed RAM** — local embedding model ~800MB class (similar to Mnemosyne concern)
- **Claude Code 30-day expiry** — project markets retention hooks; not Jon's primary agent surface

**Verify:** `uv tool install mempalace` → `mempalace init` → mine one repo → search smoke → wire MCP in isolated profile only.

**Recommendation:** **WATCH bookmark** — trial only when Mem0+Mnemosyne gap appears.

---

## AgentsView — re-confirmed (2026-07-13)

- **URL:** https://github.com/kenn-io/agentsview · **Site:** https://agentsview.io
- **Grade:** **B+ (87/100)** · **License:** MIT · **Stars:** ~4,384 (Jul 2026)
- **Verdict:** **IN USE** — no change
- **Status:** **READY** @ `:8080`

### Summary

Already installed and fleet-documented (2026-07-04). Local-first session search, cost analytics, insights across **20+ agents** (Claude Code, Codex, Cursor ingest, Hermes paths). Scripts: `npm run analytics:open`, `analytics:agentsview:*`.

**Re-review note:** Stars grew significantly; desktop app + daemon model matured. Still pairs with **TokenTracker** (`:7680`) as spend primary. Hermes sessions path: `%LOCALAPPDATA%\hermes\profiles\*\sessions` — point ingest correctly on Windows.

**No action required** unless upgrade/reinstall requested.

---

## MiMo Code — blog + repo (2026-07-13)

- **URLs:** https://mimo.xiaomi.com/blog/mimo-code-long-horizon · https://github.com/XiaomiMiMo/MiMo-Code
- **Grade:** **C+ (76/100)** · **License:** MIT · **Stars:** ~11,983
- **Verdict:** **REF bookmark** — blog/concepts only; **Jon 2026-07-13 — no install**
- **Status:** **NOT_INSTALLED** (bookmark)

### Summary

**MiMo Code** is Xiaomi's MIT terminal coding agent (OpenCode fork) focused on **long-horizon** tasks. Blog covers three themes: **computation** (Max Mode parallel sampling, Goal completion verifier), **memory** (Cycle checkpoints, explicit storage/retrieval vs blind compression), **evolution** (cross-session learning). Technically interesting — Dynamic Workflow turns orchestration from prompt to sandboxed JS.

### Why SKIP for Jon

| vs | Notes |
|----|-------|
| **Cursor** | Jon's daily driver — adding MiMo = second terminal agent CLI |
| **Hermes** | Hermes already does tools + memory + Telegram + skills |
| **OpenCode ecosystem** | Another fork in a crowded space |

**Recommendation:** Read blog for **memory/orchestration ideas** only; do not install unless Jon wants a dedicated long-horizon terminal experiment.

---

## deepseek-mcp-server (2026-07-13)

- **URL:** https://github.com/DMontgomery40/deepseek-mcp-server · **npm:** `deepseek-mcp-server`
- **Grade:** **B (83/100)** · **License:** MIT · **Stars:** ~347
- **Verdict:** **WATCH** — optional MCP tool surface for DeepSeek V4 API
- **Status:** **NOT_INSTALLED**

### Summary

**Official MCP Registry** server (`io.github.DMontgomery40/deepseek`) exposing documented DeepSeek V4 API: `chat_completion`, FIM `completion`, `list_models`, `get_user_balance`, conversation memory. TypeScript, tests, Docker, npm.

### Gap / overlap

| Layer | Hermes |
|-------|--------|
| **LiteLLM `:4000`** | **IN USE** — primary DeepSeek routing for Cursor/Hermes |
| **Cursor Setup B** | `deepseek-v4-pro` via ngrok — daily driver |
| **This MCP** | Agent-callable balance/FIM/thinking tools — **additive**, not replacement |

### Risks

- **Hosted remote** `deepseek-mcp.ragweld.com` — **avoid**; prompts/API traffic through third party
- **README one-liner** auto-writes `~/.cursor/mcp.json` — review before running; prefer manual MCP entry + `sync:mcp-env`
- **Redundant spend** if agent uses MCP + LiteLLM for same chat — gate to diagnostic/FIM use cases

**Verify:** `DEEPSEEK_API_KEY=… npx -y deepseek-mcp-server` → `list_models` smoke → optional Cursor MCP row.

**Recommendation:** **WATCH** — useful reference MCP; install **local stdio only** if Jon wants agent-visible balance/FIM tools. LiteLLM stays canonical router.

---

## PocketBase (2026-07-13)

- **URL:** https://pocketbase.io/ · https://github.com/pocketbase/pocketbase
- **Grade:** **A- (91/100)** · **License:** MIT · **Stars:** ~59.6k (Jul 2026)
- **Verdict:** **WATCH** — embedded single-file backend for MVPs and internal tools
- **Status:** **NOT_INSTALLED**

### Summary

Open-source **Go** backend in one executable (~12MB): embedded **SQLite**, realtime subscriptions, auth, file storage, admin dashboard (`/_/` ), REST API on **`:8090`**. Extend via Go or JS hooks/migrations.

### Gap / overlap

| Layer | Hermes |
|-------|--------|
| **Neon PostgreSQL** | **IN USE** — Next-Flick prod |
| **Supabase** | **REF** — hosted PG + extras bookmark |
| **Payload CMS** | **IN USE** — MSC full CMS |
| **PocketBase** | Fast local backend / side-project MVPs — **different niche** |

### Risks

- **Pre-v1.0** — docs warn breaking migrations until v1; not for critical prod without changelog discipline
- **SQLite only** — not a Neon/PG drop-in at scale
- **`:8090`** — bind localhost; do not expose admin without reverse proxy + auth hardening
- **Single binary** — backup `pb_data/` directory; no managed HA

**Verify:** Download Windows zip → `pocketbase serve` → create superuser → REST CRUD smoke on one collection.

**Recommendation:** **WATCH** — excellent for quick MVPs and internal tools; keep Neon for Next-Flick prod.

---

## Theatre.js (2026-07-13)

- **URL:** https://www.theatrejs.com/ · https://github.com/theatre-js/theatre
- **Grade:** **B+ (86/100)** · **License:** Apache-2.0 · **Stars:** ~12.5k
- **Verdict:** **WATCH** — visual timeline editor for R3F sequences
- **Status:** **NOT_INSTALLED** (referenced in `SCROLL-3D-REFERENCES.md` since 2026-07-04)

### Summary

Animation **timeline studio** for web — `@theatre/r3f` integrates with React Three Fiber for keyframed 3D scenes without hand-rolling dozens of `useFrame` hooks.

### Gap / overlap

| Layer | Hermes |
|-------|--------|
| **GSAP + ScrollTrigger** | **IN USE** — primary scroll motion |
| **cinematic-scroll-skill** | **ADOPT** — scroll craft doctor |
| **Theatre.js** | **3D-specific** timeline editor — optional layer |

### Risks

- **Maintenance stall** — core repo last push **Aug 2024**
- **Studio bundle** — `@theatre/studio` dev-only; strip from prod builds

**Verify:** `npm i @theatre/core @theatre/studio @theatre/r3f` → keyframe one mesh smoke.

**Recommendation:** **WATCH** — install when a showcase chapter needs choreographed 3D beyond GSAP.

---

## Threlte (2026-07-13)

- **URL:** https://threlte.xyz/ · https://github.com/threlte/threlte
- **Grade:** **B (84/100)** · **License:** MIT · **Stars:** ~3.3k
- **Verdict:** **WATCH** — Svelte 3D framework reference
- **Status:** **NOT_INSTALLED**

### Summary

Declarative **Svelte** layer on **Three.js** (Threlte 8 adds WebGPU path). Not applicable to Jon's primary **Next.js + R3F** stack.

### Risks

- **Stack mismatch** — fleet is React/Next; use R3F for showcase work

**Recommendation:** **WATCH** as reference only.

---

## Nellavio (2026-07-13)

- **URL:** https://nellavio.com/ · https://github.com/nellavio/nellavio
- **Grade:** **B- (81/100)** · **License:** MIT · **Stars:** ~496
- **Verdict:** **WATCH** — Next.js dashboard starter kit
- **Status:** **NOT_INSTALLED**

### Summary

Next.js + TypeScript dashboard: auth, i18n, RBAC, ~18 pages, 90+ UI components.

### Risks

- **Heavy overlap** with shadcn IN USE + Premium-UI skills
- **Smaller community** (~500★)

**Recommendation:** **WATCH** — layout reference for admin dashboards; spike only.

---

## InsForge (2026-07-14)

- **URL:** https://github.com/InsForge/InsForge · https://insforge.dev/
- **Grade:** **B+ (88/100)** · **License:** Apache-2.0 · **Stars:** ~12k
- **Verdict:** **IN USE** — agent-native BaaS spike stack (auth/DB/storage/MCP)
- **Status:** **READY** @ `D:\Hermes\apps\insforge` (localhost binds; telemetry off)

### Summary

Open-source backend aimed at AI agents: Postgres, auth, storage, serverless functions, built-in MCP. **Hermes install:** official `deploy/docker-compose` under `D:\Hermes\apps\insforge`, project `hermes-insforge`, ports **127.0.0.1 only** (`:7130` app, `:15432` disposable PG — **not Neon**).

### Commands

```powershell
npm run insforge:install   # ensure compose + .env + up + smoke
npm run insforge:status
npm run insforge:start
npm run insforge:stop      # add -- -Purge to wipe volumes
```

Admin: `D:\Hermes\apps\insforge\ADMIN-CREDENTIALS.txt` (gitignored). MCP: wire only during spikes — remove from Cursor MCP after.

### Gap / overlap

| Layer | Hermes |
|-------|--------|
| **Neon** | **IN USE** — PG for Next-Flick |
| **Supabase** | **REF** — Neon alt bookmark |
| **LiteLLM / DeepSeek** | **IN USE** — LLM gateway |
| **InsForge** | Full agent backend — would stack auth+storage on top of Neon |

### Risks

- **Docker + port surface** — do not expose admin/MCP publicly without auth
- **Overlap** with Neon/Supabase/Better Auth — avoid dual truth for prod data
- **Cloud vendor path** — evaluate pricing before defaulting off self-host
- **Security gate required** before install (auth + deploy + agent config)

**Verify:** `npm run insforge:status` → HTTP 200 on `http://127.0.0.1:7130/`.

**Recommendation:** **IN USE** (toolchest spike) — keep Neon for Next-Flick prod; stop stack when idle.

---

## aitmpl.com — Claude Code Templates (2026-07-14)

- **URL:** https://aitmpl.com/
- **Grade:** **B (84/100)** · **License:** mixed (per component) · **Type:** marketplace
- **Verdict:** **REF** — browse catalog; cherry-pick only
- **Status:** **READY** (web)

### Summary

Marketplace of ready-to-use Claude Code configs: skills, agents, commands, hooks, MCPs, plugins. Stack builder UI for installing curated component sets.

### Gap / overlap

| Layer | Hermes |
|-------|--------|
| **agency-agents / fleet skills** | **IN USE** — curated `.cursor/skills` |
| **TOOLS watchlist** | Fleet-wide review desk |
| **aitmpl** | External Claude Code component shop |

### Risks

- **Quality variance** — community templates; grade before install
- **Skill sprawl** — do not bulk-install into JonBeatz without review
- **MCP auto-add** — security gate for any auth/deploy tools

**Recommendation:** **REF** — use as discovery when hunting Claude Code patterns; keep fleet `shared-profile-content` as source of truth.

---

## Toolfolio (2026-07-14)

- **URL:** https://toolfolio.com/
- **Grade:** **B- (81/100)** · **License:** N/A (directory) · **Type:** discovery site
- **Verdict:** **REF** — bookmark only
- **Status:** **READY** (web)

### Summary

Curated AI/dev tool directory for browsing SaaS and OSS tools. Not an installable product.

### Risks

- **Affiliate/marketing bias** possible — verify claims independently
- **Not a substitute** for Hermes TOOLS-WATCHLIST grades

**Recommendation:** **REF** — discovery bookmark alongside Nosignups / free-llm directories.

---

## Databasement (2026-07-14)

- **URL:** https://github.com/David-Crty/databasement
- **Grade:** **A- (90/100)** · **License:** MIT · **Stars:** ~1.3k
- **Verdict:** **IN USE** — self-hosted DB backup ops UI + MCP
- **Status:** **READY** @ `D:\Hermes\apps\databasement` (Docker `127.0.0.1:2226`)

### Summary

Self-hosted dashboard for database backups (Postgres/MySQL/SQLite and related targets), with MCP + Telegram hooks for agent-driven ops. **Hermes install:** `davidcrty/databasement:1`, data volume `D:\Hermes\apps\databasement\data`, bound **127.0.0.1:2226** only.

### Commands

```powershell
npm run databasement:install
npm run databasement:status
npm run databasement:start
npm run databasement:stop
```

First browser visit: create admin + enable 2FA. Prefer backup-only DB roles for Neon targets. MCP: scoped token; avoid restore tools in daily Cursor MCP.

### Gap / overlap

| Layer | Hermes |
|-------|--------|
| **Neon** | **IN USE** — prod PG; limited native backup UX in agent loop |
| **Hostinger / payload.sqlite (MSC)** | MSC-scoped; not JonBeatz default |
| **Databasement** | Fills **backup + restore ops** gap for fleet DBs |

### Risks

- **Docker + credentials** — backup jobs need DB URLs; keep secrets in vault/.env, not UI notes
- **`:2226` bind** — localhost only unless reverse-proxied
- **Security gate** before MCP enable (can touch live DBs)
- **Windows Docker** — Desktop required; resource cost vs Hostinger SSH backups

**Verify:** `npm run databasement:status` → HTTP 200 on `http://127.0.0.1:2226/`.

**Recommendation:** **IN USE** — primary hermes-side DB backup ops UI; restore stays human-gated.

---

## Voicebox (jamiepine) (2026-07-14)

- **URL:** https://voicebox.sh/ · https://github.com/jamiepine/voicebox
- **Grade:** **A- (92/100)** · **License:** MIT · **Stars:** ~41k
- **Verdict:** **WATCH** — local voice studio; Jon self-install later; do **not** replace Handy + OmniVoice yet
- **Status:** **NOT_INSTALLED** (operator will install MSI from https://voicebox.sh and report back)

### Summary

Open-source local TTS/STT/voice-cloning desktop app (Windows/macOS/Linux). Multi-engine (Qwen3-TTS, Chatterbox, Kokoro, Whisper, etc.), system dictation, MCP `voicebox.speak` on `127.0.0.1:17493`, REST API. Positioned as ElevenLabs/WisprFlow alternative, fully on-device.

### Gap / overlap

| Layer | Hermes |
|-------|--------|
| **Handy** | **IN USE** — offline dictation |
| **OmniVoice + Edge Ryan** | **IN USE** — Draven ritual speak |
| **Voicebox** | Broader studio (clone + stories + MCP TTS) — heavy overlap |

### Risks

- **VRAM / model downloads** — Qwen/Chatterbox compete with ComfyUI / LM Studio
- **MCP always-on TTS** — voice policy says ritual-only speak; do not auto-wire Hermes `auto_tts`
- **Clone ethics / ToS** — celebrity samples on marketing site; use only owned/licensed clips
- **Windows MSI + ports** — `:17493`; security review before Cursor MCP entry

**Verify:** Install MSI → health `:17493` → one Kokoro generate (light) → MCP speak smoke; measure VRAM before enabling larger engines.

**Recommendation:** **WATCH** — excellent capability, but stack already covers dictation + Draven. Spike when cloning / multi-voice production is needed; keep OmniVoice primary for rituals.

