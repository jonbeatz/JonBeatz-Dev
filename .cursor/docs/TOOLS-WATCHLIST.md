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
| [**img2pdf**](https://github.com/josch/img2pdf) | **A- (91)** | **IN USE** | **READY** | Free | Lossless images→PDF (POD interiors from page JPEGs) |
| [**pikepdf**](https://github.com/pikepdf/pikepdf) | **A- (91)** | **IN USE** | **READY** | Free MPL | PDF Trim/Bleed/MediaBox QA for Lulu uploads |
| **Affinity MCP** (Studio beta) | **B+ (88)** | **IN USE** | **READY** | Free‡ | Local SSE `:6767` → Cursor via `mcp-proxy`; TNIMS polish lane — Affinity must be open (not Creative Cloud) |
| **InDesign UXP MCP** (Bridge) | **A- (90)** | **IN USE** | **READY** | Free‡ | UXP + bridge `:19300/:19301` + UDT. **Cold flow:** CC Desktop signed in (operator confirms) → UDT+InDesign+bridge → operator **Load & Watch** (agent cannot) → MCP. Web adobe.com login not enough. Keep CC installed; Startup disable OK |
| **claude-video `/watch`** | **A- (92)** | IN USE | PARTIAL‡ | Free† | Agent watches video — frames + transcript; best for visual analysis |
| **find-skills** | **A- (91)** | IN USE | **READY** | Free | Meta-skill — discover + install from 2000+ skill catalog via `npx skills find` |
| [**obsidian-skills**](https://github.com/kepano/obsidian-skills) | **A- (91)** | **IN USE** | **READY** | Free MIT | Kepano OFM + JSON Canvas vendored; vault MCP stays I/O |
| [**MeiGen**](https://github.com/jau123/MeiGen-AI-Design-MCP) | **B- (81)** | **WATCH** | NOT_INSTALLED | Freemium | 1,446 prompt gallery + MCP; bookmark [meigen.ai](https://www.meigen.ai/); do **not** `npx meigen init cursor` |
| **Hallmark** | **B+ (88)** | IN USE | **READY** | Free | Anti-slop design skill — build/audit/redesign UI; 57 slop gates; complements NovaMira |
| [**emilkowalski/skills**](https://github.com/emilkowalski/skills) | **A- (90)** | **IN USE** | **READY** | Free | Animation taste — 5 skills in shared library; `sync:skills` · `skills:emil:status` |
| **Claude Blog** | **B (84)** | IN USE | **READY** | Free | 30-skill SEO/GEO blog pipeline — write, analyze, schema, editorial calendar |
| **ComfyUI MCP** | **A- (91)** | IN USE | PARTIAL | Free | Local GPU Comfy control from Cursor; pairs with `:8188` |
| [**Comfy Canvas**](https://github.com/Zlata-Salyukova/Comfy-Canvas) | **B (84)** | **WATCH** | NOT_INSTALLED | Free MIT | In-Comfy layer editor overlay — `custom_nodes/comfy_canvas`; no extra server |
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
| [**Unsloth**](https://github.com/unslothai/unsloth) | **B- (80)** | **WATCH** | NOT_INSTALLED | Apache-2 core / AGPL Studio | Local train+run (LoRA/QLoRA) — **do not** `unsloth start hermes` or `irm install.ps1` |
| **Flowise** | **B- (82)** | WATCH | NOT_INSTALLED | Free OSS | Visual LangChain agent builder — overlaps Hermes; default `:3000` port clash |
| **Agent-Reach** | B+ (87) | IN USE | PARTIAL | Free | CLI breadth — GitHub/YouTube/RSS/Exa; Twitter/Reddit optional login |
| **Claude Watch** | B+ (88) | IN USE | PARTIAL‡ | Free† | Persistent video **study notes** — scene frames + transcript library |
| **Agent Skills (Osmani)** | B (84) | IN USE | **READY** | Free | 24 engineering workflow skills — cherry-pick; overlaps Hermes rituals |
| **Agent Browser** | B+ (86) | IN USE | PARTIAL | Free | Rust CLI/MCP browser — ref snapshots; alt to Playwright/Browserbase |
| [**AgentMail**](https://www.agentmail.to/) | **A- (91)** | **IN USE** (Grok Bot) / ADOPT (Cursor SDK) | PARTIAL | Freemium | Grok Bot plugin **connected**; Clerk = `jonbeatz-clerk@agentmail.to`. Cursor SDK/MCP still not installed |
| [**Hostinger Connector**](https://docs.hostinger.com/hostinger-connector/overview) | **C (74)** | **SKIP** | NOT_INSTALLED | Free (included) | Marketplace wrapper for MCP we already run — do **not** install (duplicates `hostinger-*`) |
| [**OpenMausBot**](https://github.com/milind-soni/OpenMausBot) | **B- (81)** | **WATCH** | NOT_INSTALLED | Free Apache-2 | OSS Grok Bot clone (Electron); do not replace live Grok Bot; no host-control; cua 0.19.3 ≠ ours |
| [**fx**](https://github.com/vercel-labs/fx) | **B- (80)** | **WATCH** | NOT_INSTALLED | Free Apache-2 | Vercel Labs 7.8 MiB Zig coding agent; experimental; do **not** `curl \| bash`; Cursor stays primary |
| [**Token Harbor**](https://tokenharbor.ai/) | **C (76)** | **SKIP** | NOT_INSTALLED | Freemium | OpenRouter-shaped gateway; **never** `irm connect.ps1` / Connect ALL — writes Claude/Codex/OpenClaw + can set `OPENAI_*` |
| [**VoxCPM**](https://github.com/OpenBMB/VoxCPM) | **B+ (85)** | **WATCH** | NOT_INSTALLED | Free Apache-2 | OpenBMB TTS 2B / ~8 GB VRAM; clone + 30 langs; do **not** replace Edge Liam / Omni |
| [**Kokoro-82M**](https://github.com/hexgrad/kokoro) | **B (86)** | **ADOPT** | PARTIAL | Free Apache-2 | On-deck venv `D:\Hermes\apps\kokoro` — `npm run kokoro:test`; **not** Draven |
| [**BetterWright**](https://github.com/BetterWright/betterwright) | **B- (80)** | **WATCH** | NOT_INSTALLED | Free MIT | Persistent policy-guarded Playwright; **never** `init` / `skill --install --all` (writes Cursor skills) |
| [**Ramp Router**](https://router.com/) | **C (74)** | **SKIP** | NOT_INSTALLED | Free thru 2026 + $26 credits | Cost-routing gateway; OpenRouter stays; **never** `curl agents.ramp.com/install.sh \| sh` |
| **NeuTTS** | A- (90) | WATCH | NOT_INSTALLED | Free§ | On-device clone TTS (GGUF/CPU); needs ref wav + transcript |
| **OmniVoice-Studio** | B+ (87) | WATCH | NOT_INSTALLED | Free†† | Desktop GUI + 14 TTS engines incl. OmniVoice; MCP; GPU optional |
| **LuxTTS** | B (86) | WATCH | NOT_INSTALLED | Free | Fast voice-clone TTS (~1GB VRAM GPU); speed/GPU alt to OmniVoice |
| **React Bits** | **B+ (88)** | WATCH | **READY** | Freemium | 130+ animated React components for new landing pages |
| **Firecrawl MCP** | **B+ (86)** | WATCH | NEEDS_KEY | Freemium | Deep web scrape; skills exist — MCP optional alt to Tavily/fetch |
| **Composio MCP** | **B (84)** | WATCH | PARTIAL | Freemium | Social automation; already in manifest, optional |
| **Penpot** | **B (82)** | WATCH | NOT_INSTALLED | Free OSS | Figma alt + MCP; alt to Pencil when designer handoff needed |
| **DesignLab** (alias **VaderBoard**) | **A- (90)** | **IN USE** | **READY** | Free MIT | Local Excalidraw mood board / ref studio — `D:\Hermes\apps\designlab` · `:3090` · `npm run designlab:dev` |
| **Tripo Studio** | **A (93)** | **PRIMARY** | **READY**‡ | Freemium | Cloud image/text → GLB — product scroll §2; vault WORKFLOW |
| **3DGenStudio** | **A- (91)** | **IN USE** | **READY**‡ | Free | Local Comfy Kanban 3D — `:3021`/`:5183`; Tripo web still primary |
| [**TRELLIS.2**](https://github.com/microsoft/TRELLIS.2) | **B- (82)** | WATCH | NOT_INSTALLED | Free§ | MSFT 4B image→PBR GLB — Linux + **24GB VRAM**; HF Space demo on Win |
| [**Step Beyond**](https://github.com/aievolutionpl/step-beyond) | **B- (80)** | WATCH | NOT_INSTALLED | Free | Agent behavior skill v4 alpha — cherry-pick verify/slop refs; rituals already cover |
| [**OpenCut**](https://github.com/OpenCut-app/OpenCut) | **B- (82)** | WATCH | NOT_INSTALLED | Free | OSS CapCut alt — use [opencut.app](https://opencut.app) classic; rewrite + MCP coming |
| [**Clypra**](https://github.com/AIEraDev/Clypra) | **B- (80)** | **WATCH** | NOT_INSTALLED | Free MIT | Tauri v2 + Rust FFmpeg NLE v1.4.5 — native HW decode; telemetry on; FreeCut stays polish UI |
| [**FreeCut**](https://github.com/walterlow/freecut) | **A- (91)** | **IN USE** | **READY** | Free MIT | Human polish UI after Kinocut — [freecut.net](https://freecut.net); `npm run freecut:open`; workspace `D:\Hermes\apps\freecut-workspaces` |
| [**Kinocut**](https://github.com/KyaniteLabs/kinocut) | **A- (91)** | **IN USE** | **READY** | Free Apache-2 | Agent FFmpeg video MCP (`kino` / `uvx`) — trim/caption/9:16/QC; chain: [VIDEO-POLISH-CHAIN.md](./VIDEO-POLISH-CHAIN.md) |
| [**video-use**](https://github.com/browser-use/video-use) | **B- (80)** | **WATCH** | NOT_INSTALLED | Free MIT + ElevenLabs Scribe | Agent talking-head editor — **do not** run setup prompt / symlink into Hermes or `~/.claude/skills` |
| [**Presenton**](https://github.com/presenton/presenton) | **B (85)** | **REF** | **READY** | Free Apache-2.0 | Jon bookmark — [presenton.ai](https://presenton.ai/); Docker `:5001` or Windows `.exe` later; **never** `:3000`; LiteLLM/LM Studio BYOK |
| [**Camera Control**](https://aicameracontrol.com/) | **B- (82)** | **REF** | **READY** | Free web | 3D shot blocking → ref frame + prompt — [aicameracontrol.com](https://aicameracontrol.com/); Higgsfield CTA ignore; fal stays gen |
| [**FigJam**](https://www.figma.com/figjam/) | **C (73)** | **REF** | **READY** | Freemium (Figma seats) | Jon bookmark — [figjam](https://www.figma.com/figjam/); DesignLab `:3090` stays the local board |
| [**TestingCatalog**](https://www.testingcatalog.com/) | **B- (80)** | **REF** | **READY** | Free / subscribe | AI rumor/news desk — browse; sponsored posts exist; do not treat leaks as stack truth |
| [**book-to-skill**](https://github.com/virgiliojr94/book-to-skill) | **B- (80)** | **WATCH** | NOT_INSTALLED | Free MIT | PDF/docs → Agent Skill — **do not** `npx skills add` into this profile; copyrighted books stay private |
| [**loop-engineering**](https://github.com/cobusgreyling/loop-engineering) | **B+ (87)** | WATCH | NOT_INSTALLED | Free | Agent loop patterns + `loop-audit`/`loop-init` CLIs — docs-first; **do not** `loop-init` on hub without review |
| [**system_prompts_leaks**](https://github.com/asgeirtj/system_prompts_leaks) | **B (84)** | **REF** | **READY** | Free | Catalog of extracted vendor system prompts (incl. Cursor) — research only; ToS gray |
| [**markdownify-mcp**](https://github.com/zcaceres/markdownify-mcp) | **B+ (88)** | **IN USE** | **READY** | Free MIT | PDF/URL/Office → Markdown MCP — already in JonBeatz MCP manifest (`project-0-JonBeatz-markdownify`) |
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
| [**Agent Arena**](https://arena.ai/leaderboard/agent) | **A- (90)** | **REF** | **READY** | Free web | LMSYS/Arena in-the-wild agent ranking (tool hallu, bash recovery, cost/task) — browse; do not auto-swap Cursor models |
| [**Bitwarden MCP**](https://github.com/bitwarden/mcp-server) | **B- (80)** | **WATCH** | NOT_INSTALLED | Free GPL-3 | Official vault MCP — **do not** add to Cursor (cloud models see retrieved secrets). Keep `.env.local` |
| [**proton-pass-community-mcp**](https://github.com/hesreallyhim/proton-pass-community-mcp) | **C (76)** | **WATCH** | NOT_INSTALLED | Free GPL-3 | Unofficial `pass-cli` MCP; list-without-secrets + write gate — still skip Cursor |
| [**protonpass-mcp**](https://github.com/aureTheDev/protonpass-mcp) | **C (70)** | **SKIP** | NOT_INSTALLED | Unlicensed OSS | 0★ Docker wrapper; Visionary CLI; session volume = keys on disk |
| [**cto.new**](https://cto.new/) | **B (83)** | WATCH | NOT_INSTALLED | Freemium‡‡‡‡ | Ad-supported multi-agent SaaS — Team Lead + MCP; overlaps Hermes Desktop |
| [**Paperclip**](https://github.com/paperclipai/paperclip) | **B- (81)** | **WATCH** | NOT_INSTALLED | Free MIT | Agent-org dashboard `:3100` — **never** `curl install.sh \| bash`; do not hire Cursor as a worker |
| [**LoopX**](https://github.com/huangruiteng/loopx) | **B- (80)** | **WATCH** | NOT_INSTALLED | Free Apache-2.0 (v0.4.8+) | Long-horizon control plane on top of Cursor/Codex — **do not** `loopx workflow-skills --install`; dashboard Vite `:5173` |
| [**Supabase**](https://supabase.com/) | **B+ (88)** | **REF** | **READY** | Freemium | **Bookmark** — Neon alt for Next-Flick (Jon 2026-07-13); PG + Auth/Storage/Vector/MCP |
| [**PocketBase**](https://pocketbase.io/) | **A- (91)** | WATCH | NOT_INSTALLED | Free MIT | Single-file Go backend `:8090` — SQLite + auth + realtime; pre-v1 migration caveat |
| [**InsForge**](https://github.com/InsForge/InsForge) | **B+ (88)** | **IN USE** | **READY** | Free Apache-2 | Agent-backend spike @ `D:\Hermes\apps\insforge` — localhost `:7130`; **not Neon** |
| [**aitmpl.com**](https://aitmpl.com/) | **B (84)** | **REF** | **READY** | Free | Claude Code templates marketplace (skills/agents/MCPs) — browse; overlaps agency-agents |
| [**Toolfolio**](https://toolfolio.com/) | **B- (81)** | **REF** | **READY** | Free | Tool discovery directory — bookmark only (not install) |
| [**GitReverse**](https://www.gitreverse.com/) | **B- (80)** | **WATCH** | NOT_INSTALLED | Free web | Repo/site → synthetic Cursor prompt + [library](https://gitreverse.com/library); public GitHub only; do not self-host |
| [**Databasement**](https://github.com/David-Crty/databasement) | **A- (90)** | **IN USE** | **READY** | Free MIT | DB backup UI @ `D:\Hermes\apps\databasement` — localhost `:2226` |
| [**Voicebox**](https://github.com/jamiepine/voicebox) | **A- (92)** | WATCH | NOT_INSTALLED | Free MIT | Local TTS+STT studio + MCP `:17493` — Jon self-install later; overlaps Handy+OmniVoice |
| [**VibeVoice-ASR**](https://huggingface.co/microsoft/VibeVoice-ASR) | **A- (90)** | WATCH | NOT_INSTALLED | Free MIT | MS 9B long-form ASR + diarization + hotwords (~60 min); VRAM-heavy vs Handy |
| [**Theatre.js**](https://www.theatrejs.com/) | **B+ (86)** | WATCH | NOT_INSTALLED | Free Apache-2.0 | Visual R3F timeline (`@theatre/r3f`) — showcase 3D; last major push 2024 |
| [**The Complete Shelf**](https://github.com/MengTo/complete-shelf) | **B+ (88)** | **REF** | **READY** | Free (no LICENSE file) | Bookmark — [live](https://mengto.github.io/complete-shelf/); single-file Three.js hardcover; study, not a product install |
| [**Threlte**](https://threlte.xyz/) | **B (84)** | WATCH | NOT_INSTALLED | Free MIT | Svelte 3D on Three.js — reference only; fleet stack is Next.js + R3F |
| [**Nellavio**](https://github.com/nellavio/nellavio) | **B- (81)** | WATCH | NOT_INSTALLED | Free MIT | Next.js dashboard starter (auth, RBAC, i18n, 90+ components) — overlaps shadcn/Premium-UI |
| [**Mnemosyne**](https://github.com/mnemosyne-oss/mnemosyne) | **B+ (89)** | **IN USE (Cursor MCP trial)** | READY | Free MIT | JonBeatz `.cursor/mcp.json` + `MNEMOSYNE.md` — Mem0 canonical |
| **hermes-browser-extension** | A (93) | **ADOPT** | **READY** | `API_SERVER_KEY` + `API_SERVER_CORS_ORIGINS` | Chrome+Brave `:8642`; side panel Alt+H; companion `hermes-browser-companion` |
| [**deepseek-mcp-server**](https://github.com/DMontgomery40/deepseek-mcp-server) | **B (83)** | WATCH | NOT_INSTALLED | Free MIT | Official MCP Registry DeepSeek V4 tools — local stdio only; LiteLLM stays primary |
| [**DeepSeek Harness**](https://github.com/deepseek-ai/deepseek-harness) | **B- (80)** | **REF** | **READY** | Free MIT | Official `dsh` docs/preview — bookmark; **do not** `npx @deepseek-ai/dsh web` on this box |
| **HunyuanVideo** | B+ (86) | WATCH | NOT_INSTALLED | Free§ | Tencent 13B+ local I2V — **fal credit fallback #2**; FP8 weights |
| **LTX Desktop** | B+ (87) | WATCH | NOT_INSTALLED | Free OSS‡‡ | Local AI NLE + LTX-2.3 T2V/I2V — Jon download later (scroll clips) |
| **Open Generative AI + muapi** | B+ (87) | WATCH | NOT_INSTALLED | Freemium‡‡‡ | OSS Higgsfield-style studio; cloud = muapi wallet; local sd.cpp incl. Z-Image |
| **Hermes Agora** | B (84) | WATCH | PRE_RELEASE | Free | Unofficial 3D Hermes agent office visualizer — fun when it ships |
| **OpenRouter** | A- (92) | **IN USE** | **READY** | Pay-per-use | LiteLLM ~22 `*-or` aliases; Cursor Setup B/C — JonBeatz `CURSOR-MODELS-CHEATSHEET.md` |
| [**NVIDIA Build / NIM catalog**](https://build.nvidia.com/) | **B (84)** | **WATCH** | **NEEDS_KEY** | Free† | Hosted OpenAI-compatible NIM APIs (`integrate.api.nvidia.com/v1`) — optional LiteLLM/Cursor/Hermes overflow; **not** a ComfyUI drop-in |
| **Cursor Origin** | **B (84)** | **IN USE (trial, 1 repo)** | **PARTIAL** | Included in Pro+ | GitHub forge mirror — namespace `jonbeatz`; Command-Center only; **no Origin MCP**; playbook JonBeatz `CURSOR-ORIGIN.md` |
| **OmniRoute** | B (85) | WATCH | NOT_INSTALLED | Free OSS | Self-hosted AI gateway alt to LiteLLM — 237 providers, compression, MCP; complex |
| **mockit-mcp** | B- (81) | WATCH | NOT_INSTALLED | Freemium | Text → premium iOS UI mockups (PNG+HTML) via Claude + Playwright |
| **OpenWhispr** | B (85) | WATCH | NOT_INSTALLED | Free OSS | Local dictation — Parakeet/Whisper STT; optional LM Studio `:1234` cleanup |
| [**Handy**](https://github.com/cjpais/handy) | **A- (91)** | **IN USE** | **READY** | Free MIT | Offline STT — `winget install cjpais.Handy`; `npm run handy:status` |
| **Calliop** | B- (82) | WATCH | NOT_INSTALLED | Free OSS | Wispr-style Windows dictation — whisper.cpp + local Qwen cleanup sidecar |
| **Hermex** | B+ (88) | WATCH | NOT_INSTALLED | Free MIT | **Bookmark Jon 2026-07-13** — native iOS for `hermes-webui` `:8787`; setup later (needs WebUI + tunnel) |
| **Aight** | B (85) | WATCH | NOT_INSTALLED | Freemium | **Bookmark Jon 2026-07-13** — Hermes gateway native iOS; setup later (free Hermes-only trial first) |
| **Hermes WebUI** | B+ (88) | WATCH | NOT_INSTALLED | Free OSS | Native Hermes web/mobile UI — **prerequisite for Hermex**; bookmark with Hermex path |
| [**Hermes Control Deck**](https://github.com/filipj9/Hermes-Control-Deck) | **B- (81)** | **WATCH** | NOT_INSTALLED | Free MIT | Community PWA for WebUI + Codex CLI — default `:4240`; Telegram stays primary; alpha |
| [**oh-my-hermes**](https://github.com/rlaope/oh-my-hermes) | **B- (80)** | **WATCH** | NOT_INSTALLED | Free MIT | Unofficial OMH overlay on Nous Hermes — **do not** `omh setup` / `irm install.ps1 \| iex` on jonbeatz |
| **Open WebUI** | B (85) | WATCH | NOT_INSTALLED | Free OSS | Docker chat UI + Hermes API `:8642` |
| **MemPalace** | B (84) | WATCH | NOT_INSTALLED | Free MIT | **Bookmark Jon 2026-07-13** — verbatim local memory + MCP; setup later; Mem0 stays primary |
| [**Hindsight**](https://github.com/vectorize-io/hindsight) | **B (83)** | **WATCH** | NOT_INSTALLED | Free MIT / Cloud usage | SOTA “learn not just remember” agent memory — Docker `:8888/:9999`; **do not** `hindsight-cursor init` on this PC |
| [**OpenViking**](https://github.com/volcengine/OpenViking) | **B- (80)** | **WATCH** | NOT_INSTALLED | Free AGPLv3 / Volcengine SaaS | Filesystem context DB (`viking://`); Hermes native provider exists — **do not** `hermes memory setup openviking` |
| [**watermarks-remover**](https://github.com/guillaumemeyer/watermarks-remover) | **B- (81)** | **WATCH** | NOT_INSTALLED | Free MIT | AI **provenance** strip (C2PA/Unicode/text marks) — **not** visual inpaint; CLI only, no hooks/plugin |
| [**Honcho**](https://github.com/plastic-labs/honcho) | **B- (81)** | **WATCH** | NOT_INSTALLED | Free AGPL-3.0 / managed credits | Plastic Labs reasoning-first peer memory — **do not** `hermes memory setup honcho` or `npx skills add plastic-labs/honcho` |
| [**krypt.cc/tools**](https://krypt.cc/tools) | **C (73)** | **SKIP** | NOT_INSTALLED | Free as-is | Mimosa “free tools” catalog (tweaker/cleaner/VPN/Discord/trading) — **do not** download binaries |
| **Headroom** | B- (81) | WATCH | NOT_INSTALLED | Free Apache-2.0 | **2026-07-21** — local token compress (proxy/MCP/library); do not wrap Cursor vs LiteLLM; avoid `:8787` (Hermex/WebUI) |
| [**ArcRift**](https://github.com/Eshaan-Nair/ArcRift) | **C (74)** | **WATCH** | NOT_INSTALLED | Free MIT | **Record Jon 2026-07-19** — browser AI chats→Cursor MCP + SQLite KG; below B- threshold but Jon asked to persist; Mem0/Mnemosyne primary — **do not install** |
| **Refero MCP** | A- (91) | WATCH | NOT_INSTALLED | Paid $17/mo | **Bookmark Jon 2026-07-13** — 135k screens/flows MCP; setup later ($17/mo Pro) |
| **Refero Styles** | B+ (88) | WATCH | NOT_INSTALLED | Freemium‡ | **Bookmark Jon 2026-07-13** — 2k+ DESIGN.md examples; pair Refero MCP + DesignMD later |
| **AgentsView** | B+ (87) | IN USE | **READY** | Free OSS | Session search + messages — `:8080` |
| **TokenTracker** | B+ (87) | IN USE | **READY** | Free OSS | **Primary** spend dashboard — `:7680` |
| **ccusage** | B+ (86) | WATCH | **READY** | Free OSS | CLI Hermes-only alt — Jon prefers TokenTracker |
| [**Hermes Session Analyzer**](https://github.com/tommulkins/hermes-plugin-session-analyzer) | **B- (81)** | **WATCH** | NOT_INSTALLED | Free MIT | Hermes Desktop per-session tool/cost/fail UI — **set `HERMES_HOME` to jonbeatz profile** |
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
| [**16wells/divi-docs**](https://github.com/16wells/divi-docs) | **A- (91)** | **REF** | **READY** | Free MIT | Community Divi 5 tech docs + [LLM playbooks](https://16wells.github.io/divi-docs/) — primary external KB for DSZ LocalWP |
| [**divilovewp/divi5-skill**](https://github.com/divilovewp/divi5-skill) | **A- (90)** | **ADOPT** | NOT_INSTALLED | Free | JSON-native Divi 5 page-gen skill — complements IAWB; clone when ready |
| [**cjsimon2/Divi5-ToolKit**](https://github.com/cjsimon2/Divi5-ToolKit) | **B+ (88)** | **WATCH** | NOT_INSTALLED | Free | Claude Code Divi 5 CSS/a11y/CWV plugin — useful if CC on WP; Cursor stays primary |

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

**Production:** Edge Liam (`en-CA-LiamNeural`, ritual-only; matches Hermes) + OmniVoice optional restore — do not remove Omni install.

| Tool | Grade | Verdict | When to reach for it |
|------|-------|---------|----------------------|
| [NeuTTS](https://github.com/neuphonic/neutts) | A- (90) | WATCH | On-device **clone** from ref wav + transcript; CPU/GGUF path |
| [**Kokoro-82M**](https://github.com/hexgrad/kokoro) | B (86) | **ADOPT** | Fast **local catalog** TTS (CPU/ONNX); British males; play engine — not ritual primary |
| [OmniVoice-Studio](https://github.com/debpalash/OmniVoice-Studio) | B+ (87) | WATCH | GUI lab — dubbing, clone A/B, 14 engines + MCP; GPU optional |
| [LuxTTS](https://github.com/ysharma3501/LuxTTS) | B (86) | WATCH | Fast **clone** when GPU free (~1 GB VRAM); 48 kHz experiments |

Install any of these only after Jon approves. None replace `draven:speak` until tested against current OmniVoice quality bar.

---

## Voice dictation watch deck (Jon 2026-07-04)

**Baseline:** Windows **Win+H** talk-to-type. **Production speak-out:** Edge Liam via `draven:speak` (OmniVoice optional restore) — do not remove Omni.

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
| **Skill discovery** | Manual `npx skills find` | **find-skills** IN USE · [**book-to-skill**](https://github.com/virgiliojr94/book-to-skill) WATCH | find-skills = catalog; book-to-skill = distill a PDF you own — no global `npx skills add` |
| **AI slide decks / PPTX** | InDesign / Typst (print) | [**Presenton**](https://github.com/presenton/presenton) REF | Bookmark; Docker `:5001` or Windows exe when a deck is needed; LiteLLM `:4000` — do not take `:3000` |
| **Mood board / whiteboard** | **DesignLab** `:3090` IN USE | [**FigJam**](https://www.figma.com/figjam/) REF · Miro SKIP · Penpot WATCH | Local Excalidraw stays; FigJam is a Figma-seat bookmark, not a subscribe |
| **3D / AI shot blocking** | fal + R3F + [AI Camera Movements](https://aicameramovements.com/) REF | [**Camera Control**](https://aicameracontrol.com/) REF | Block in 3D then gen with fal — ignore Higgsfield CTAs |
| **Browser automation** | cursor-ide-browser MCP | Agent Browser, Playwright, Browserbase · [BetterWright](https://github.com/BetterWright/betterwright) WATCH | BetterWright `init` writes `~/.cursor/skills` — do not run |
| **Engineering workflow** | Hermes rituals + Workflow-Portable | Agent Skills (Osmani) | Cherry-pick Osmani gates; don't replace Start/End Project |
| **Draven TTS** | Edge Liam (ritual) + OmniVoice (optional) | [**Kokoro-82M**](https://github.com/hexgrad/kokoro) ADOPT · NeuTTS, LuxTTS, [VoxCPM](https://github.com/OpenBMB/VoxCPM) WATCH | Liam primary; Kokoro = local play catalog; VoxCPM2 ~8 GB VRAM — unload Comfy first if ever spiked |
| **Voice dictation (STT in)** | Windows Win+H | **OpenWhispr**, **Calliop** | Local OSS alt; paste-at-cursor; try later |
| **TTS studio / GUI** | `draven:speak` scripts | OmniVoice-Studio | Optional GUI for dubbing/clone experiments |
| Web **research** | Tavily + fetch MCP | Firecrawl, Agent-Reach Exa | Different depth/speed |
| **DesignMD / getdesign.md** | Live site → DESIGN.md | [GitReverse](https://www.gitreverse.com/) WATCH | GitReverse = synthetic rebuild prompt (README + depth-1 tree); DesignMD = brand system extract |
| **DTP / picture-book layout** | Pillow + Typst (TNIMS print default) | **Affinity MCP**, **InDesign UXP Bridge** | Optional polish; see TNIMS `tools/layout-mcp/SETUP.md` |
| **Animation taste / easing** | Scroll-Motion + gsap skills | [**emilkowalski/skills**](https://github.com/emilkowalski/skills) | `improve-animations` audits whole codebase; complements Hallmark |
| **Cross-tool memory patterns** | Mem0 + **Vader Vault** + ReCall | [**Nemotron-Shared-Memory**](https://github.com/TheLasTech/Nemotron-Shared-Memory) | Public-safe MD+Git patterns — REF only, not a runtime |
| **Agent memory runtime** | **Mem0** (canonical) + Mnemosyne trial + Vault | [**Hindsight**](https://github.com/vectorize-io/hindsight) WATCH · [**OpenViking**](https://github.com/volcengine/OpenViking) WATCH · [**Honcho**](https://github.com/plastic-labs/honcho) WATCH · MemPalace | Do not replace; never `hermes memory setup honcho` / `openviking`; new-PC copy the cake first |
| **Obsidian vault authoring** | `vault` filesystem MCP + vader-vault.mdc | [**obsidian-skills**](https://github.com/kepano/obsidian-skills) IN USE (markdown + canvas) | OFM/wikilinks/callouts; CLI does not replace vault MCP |
| **Blog / SEO content** | Manual | **Claude Blog** | Articles, changelog posts; optional Gemini for hero images |
| **UI components** | shadcn + skills | React Bits Pro | New pages only |
| **Hermes dashboard** | Built-in + Reflect / plugins | [Hermes Agora](https://www.hermesagora.com/) | 3D fun visualizer; pre-release; unofficial |
| **Phone / PWA Hermes control** | Telegram (away) + Hermex/Aight WATCH | [**Hermes Control Deck**](https://github.com/filipj9/Hermes-Control-Deck) WATCH | Unofficial PWA `:4240`; needs WebUI `:8787`; never bind public Internet |
| **Hermes skill / operating overlays** | Fleet rituals + Telegram + Cursor C&C | [**oh-my-hermes**](https://github.com/rlaope/oh-my-hermes) WATCH · LoopX WATCH | Unofficial `omh setup` writes Hermes config + `~/.omh`; never `irm install.ps1 \| iex` |
| **LLM routing** | LiteLLM `:4000` + DeepSeek direct + **OpenRouter** `*-or` | **NVIDIA Build** WATCH · **OmniRoute** · Token Harbor SKIP · [Ramp Router](https://router.com/) SKIP · [RoutesMe](https://routesme.online/) SKIP | OpenRouter stays; NVIDIA = optional free NIM overflow (`nvapi-`); never Token Harbor Connect CLI, Ramp `install.sh`, or `routesme.online/v1` |
| **Agent model quality (in-the-wild)** | `CURSOR-MODELS-CHEATSHEET.md` + TokenTracker spend | [**Agent Arena**](https://arena.ai/leaderboard/agent) REF · [**TestingCatalog**](https://www.testingcatalog.com/) REF | Arena = ranking; TestingCatalog = rumor news — do not auto-swap defaults |
| **Runtime API keys (apps / LiteLLM / MCP)** | **`.env.local`** + `sync:mcp-env` + `_core-scripts/.env.local.master` | Bitwarden/Proton MCP | Human vaults stay human. **Never** wire password MCP into Cursor with cloud models |
| **Grok Bot roster** | xAI **Grok Bot** (Ravyn/Clerk IN USE) | [OpenMausBot](https://github.com/milind-soni/OpenMausBot) WATCH | OSS local-first clone; do not install over live Grok Bot |
| **CLI coding agent** | Cursor | [fx](https://github.com/vercel-labs/fx) WATCH · [**DeepSeek Harness**](https://github.com/deepseek-ai/deepseek-harness) REF · Kiro SKIP | Not a Cursor replacement; never `curl https://cli.kiro.dev/install \| bash` |
| **Agent org / multi-agent company** | Hermes Desktop + Telegram | [**Paperclip**](https://github.com/paperclipai/paperclip) WATCH · cto.new | Paperclip hires Cursor/OpenClaw — do not `install.sh`; Node 24 + `:3100` |
| **Long-horizon agent control plane** | Cursor + Hermes rituals + ReCall | [**LoopX**](https://github.com/huangruiteng/loopx) WATCH | Overlay kernel (goals/gates/quota) — not a harness swap; no skill install; keep OpenViking off |
| **Mobile UI design** | Penpot + Mobbin refs | **mockit-mcp** | Prompt → iOS PNG/HTML before Flutter build |
| Cloud **images** | HF `image:gen` (free) | fal.ai (paid bonus) · [MeiGen](https://www.meigen.ai/) prompt gallery · **NVIDIA Build** image NIMs WATCH | Dual pipeline; NVIDIA hosted FLUX/Qwen-Image is REST (`nvapi-`), **not** a Comfy node; [Comfy-Org/NIMnodes](https://github.com/Comfy-Org/NIMnodes) = **local** NIM containers + `NIMSetup.exe` (skip on 16 GB) |
| Cloud **video / lip sync GUI** | fal Kling (`video:fal`) | **Open Generative AI + muapi** | OSS studio + muapi wallet; alt to Higgsfield-style UIs |
| Local **images/video** | ComfyUI | MeiGen MCP Comfy bridge (WATCH) · [**Comfy Canvas**](https://github.com/Zlata-Salyukova/Comfy-Canvas) WATCH | Generation, not consumption — do not let MeiGen own `:8188`; Canvas = in-tab paint loop, not a second Comfy |
| **Local LLM train / LoRA** | LM Studio inference `:1234` | [**Unsloth**](https://github.com/unslothai/unsloth) WATCH | Unload Comfy first; never `unsloth start hermes`; Studio UI is AGPL |
| **AI provenance / C2PA hygiene** | Manual ExifTool / none | [**watermarks-remover**](https://github.com/guillaumemeyer/watermarks-remover) WATCH | Strips metadata/Unicode marks from **your** gens — not Lama/IOPaint visual watermarks; never `install_skill.py --target cursor` |
| **Image → PBR GLB** | **Tripo Studio** (cloud) | **3DGenStudio** (Comfy Kanban), [**TRELLIS.2**](https://github.com/microsoft/TRELLIS.2) | TRELLIS.2 = OSS SOTA but Linux + 24GB VRAM; HF Space demo on Win |
| **Manual video timeline** | FFmpeg + browser | [**FreeCut**](https://freecut.net) (preferred WATCH), [**OpenCut**](https://opencut.app) classic, LTX Desktop | OpenMontage = agent pipelines; FreeCut/OpenCut = human NLE cuts |
| **Agent trim / caption / Shorts QC** | [**Kinocut**](https://github.com/KyaniteLabs/kinocut) MCP **IN USE** | Raw FFmpeg · [**video-use**](https://github.com/browser-use/video-use) WATCH | Kinocut stays polish chain; video-use = talking-head EDL via ElevenLabs Scribe — no Hermes skill symlink |
| **Human timeline polish** | [**FreeCut**](https://freecut.net) **IN USE** | OpenCut classic · [**Clypra**](https://github.com/AIEraDev/Clypra) WATCH · LTX Desktop | After Kinocut; Clypra = native Tauri NLE if WebCodecs preview is the bottleneck — do not MSI today |
| **No-signup tool discovery** | Bookmarks + TOOL-CHEST | [**NoSignups**](https://nosignups.net/) | 210 curated browser OSS utilities — not an install |
| **PC tweaker / “free tools” catalogs** | Windows Settings + existing stack | [**krypt.cc/tools**](https://krypt.cc/tools) SKIP | Tweaker/cleaner/Cursor customizer/VPN/Discord automation — do **not** download |
| **Agent behavior formalism** | Cursor rules + rituals + Hallmark | [**Step Beyond**](https://github.com/aievolutionpl/step-beyond) skill | Cherry-pick verify/slop refs only; no runtime without adapter |
| **Agent token analytics** | **TokenTracker** (spend) + **AgentsView** (sessions) | ccusage · [**Hermes Session Analyzer**](https://github.com/tommulkins/hermes-plugin-session-analyzer) WATCH | Jon 2026-07-04 — ccusage demoted; Analyzer is Hermes-Desktop-only (not Cursor) |
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
| **Hostinger API in Cursor** | **Hostinger MCPs (4)** scoped launcher | [Hostinger Connector](https://docs.hostinger.com/hostinger-connector/overview) SKIP | Connector = same `hostinger-api-mcp`; writes `mcp.json` and duplicates ~200 tools |
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
| 2026-09-03 | [Kokoro-82M](https://github.com/hexgrad/kokoro) | B (86) | **ADOPT** — local catalog TTS; skip kokoroai.org; Breeze TTS 2 graded C in chat only |
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
| 2026-07-19 | [ArcRift](https://github.com/Eshaan-Nair/ArcRift) | C (74) | **WATCH record** — Jon asked persist despite &lt;B-; browser→IDE memory; skip install (Mem0/Mnemosyne) |
| 2026-07-21 | [Headroom](https://github.com/headroomlabs-ai/headroom) | B- (81) | **WATCH** — token compress proxy/MCP; trial later; never blind `wrap cursor` |
| 2026-07-21 | [MemPalace](https://github.com/MemPalace/mempalace) | B (84) | **DUPLICATE** — already WATCH bookmark 2026-07-13; no re-grade |
| 2026-07-21 | [alisaitteke/photoshop-mcp](https://github.com/alisaitteke/photoshop-mcp) | C (72) | **SKIP** — COM; UXP path locked LIVE (chat grade; SKIP pointer in table) |
| 2026-07-13 | [Hermex](https://github.com/uzairansaruzi/hermex) | B+ (88) | **WATCH bookmark** — Jon: setup later; needs hermes-webui + tunnel; Telegram stays primary |
| 2026-07-13 | [Aight](https://aight.cool/) | B (85) | **WATCH bookmark** — Jon: setup later; Hermes gateway native iOS; Telegram stays primary |
| 2026-07-13 | [Strands Agents](https://strandsagents.com/) | C+ (74) | **SKIP** — AWS agent SDK; heavy Hermes overlap (chat only) |
| 2026-07-14 | [InsForge](https://github.com/InsForge/InsForge) | B+ (88) | **IN USE** — hardened localhost spike @ `D:\Hermes\apps\insforge`; not Neon |
| 2026-07-14 | [aitmpl.com](https://aitmpl.com/) | B (84) | **REF** — Claude Code component marketplace; browse |
| 2026-07-14 | [Toolfolio](https://toolfolio.com/) | B- (81) | **REF** — tool discovery directory bookmark |
| 2026-07-14 | [Databasement](https://github.com/David-Crty/databasement) | A- (90) | **IN USE** — Docker localhost `:2226` @ `D:\Hermes\apps\databasement` |
| 2026-07-14 | [Voicebox](https://github.com/jamiepine/voicebox) | A- (92) | **WATCH** — Jon self-install later; keep Handy/OmniVoice primary |
| 2026-07-14 | [AI Camera Movements](https://aicameramovements.com/) | B+ (88) | **REF** — camera-move prompt library for AI video / 3D |
| 2026-07-14 | [Brand Motion prompts](https://brandmotion.in/prompts.html) | B (84) | **REF** — agency prompt library (extend violet-car bookmark) |
| 2026-07-14 | [VibeVoice-ASR](https://huggingface.co/microsoft/VibeVoice-ASR) | A- (90) | **WATCH** — MS long-form ASR+diarization; not Handy replacement |
| 2026-07-14 | [markdownify-mcp](https://github.com/zcaceres/markdownify-mcp) | B+ (88) | **IN USE** — re-confirmed; already in JonBeatz MCP manifest |
| 2026-07-14 | [system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks) | B (84) | **REF** — vendor prompt catalog research; ToS gray; Cursor folder useful |
| 2026-07-14 | [loop-engineering](https://github.com/cobusgreyling/loop-engineering) | B+ (87) | **WATCH** — loop patterns + CLIs; docs-first; no hub `loop-init` yet |
| 2026-07-14 | [FreeCut](https://github.com/walterlow/freecut) | A- (91) | **IN USE** — promoted P3 polish UI (freecut.net); `npm run freecut:open` |
| 2026-07-14 | Video polish chain | — | **IN USE** — VIDEO-POLISH-CHAIN.md + `npm run video:polish` (Kinocut cut → FreeCut optional) |
| 2026-07-14 | [Kinocut](https://github.com/KyaniteLabs/kinocut) | A- (91) | **IN USE** — uv tool 1.8.0 + project MCP; workspace `D:\Hermes\apps\kinocut-media`; `npm run kinocut:status` |
| 2026-07-14 | [img2pdf](https://github.com/josch/img2pdf) | A- (91) | **IN USE** — pip; The-Night-I-Met-Santa `npm run book:pdf:*`; lossless page JPEG→PDF |
| 2026-07-14 | [pikepdf](https://github.com/pikepdf/pikepdf) | A- (91) | **IN USE** — pip; `book:pdf:verify` Trim/Bleed boxes for Lulu |
| 2026-08-31 | [NVIDIA Build / NIM catalog](https://build.nvidia.com/) | B (84) | **WATCH** — hosted `nvapi-` OpenAI API; LiteLLM `nvidia_nim/`; not Comfy drop-in |
| 2026-08-27 | [Hindsight](https://github.com/vectorize-io/hindsight) | B (83) | **WATCH** — SOTA learn-memory; keep Mem0; no Cursor init / no Docker now |
| 2026-08-27 | [OpenViking](https://github.com/volcengine/OpenViking) | B- (80) | **WATCH** — `viking://` context FS; AGPL + ByteDance; no Hermes memory swap |
| 2026-08-27 | [obsidian-skills](https://github.com/kepano/obsidian-skills) | A- (91) | **IN USE** — cherry-pick `obsidian-markdown` + `json-canvas` vendored; skip CLI/defuddle/bases |
| 2026-08-27 | [GitReverse](https://www.gitreverse.com/) | B- (80) | **WATCH** — public repo/site → Cursor prompt; library bookmark; no self-host |
| 2026-08-27 | [AgentMail Grok Bot plugin](https://www.agentmail.to/blog/give-grok-bot-email-address) | A- (91) | **IN USE** — Grok Bot OAuth connected (default account, 26/26 tools); Clerk owns `clerk` inbox; Cursor SDK still ADOPT |
| 2026-08-27 | [Hostinger Connector](https://docs.hostinger.com/hostinger-connector/overview) | C (74) | **SKIP** — marketing email; same MCP as IN USE `hostinger-*` quartet; do not install |
| 2026-08-27 | [OpenMausBot](https://github.com/milind-soni/OpenMausBot) | B- (81) | **WATCH** — OSS Grok Bot; keep xAI Grok Bot; no host-control / no cua overwrite |
| 2026-08-27 | [fx](https://github.com/vercel-labs/fx) | B- (80) | **WATCH** — Vercel Labs experimental CLI agent; no curl\|bash |
| 2026-08-27 | [Token Harbor](https://tokenharbor.ai/) | C (76) | **SKIP** — OpenRouter overlap; never Connect CLI / `irm \| iex` |
| 2026-08-27 | [VoxCPM](https://github.com/OpenBMB/VoxCPM) | B+ (85) | **WATCH** — OpenBMB TTS; Edge Liam stays ritual; ~8 GB VRAM |
| 2026-08-27 | [BetterWright](https://github.com/BetterWright/betterwright) | B- (80) | **WATCH** — agent Playwright; no `init --all` / Cursor skill write |
| 2026-08-27 | [Ramp Router](https://router.com/) | C (74) | **SKIP** — OpenRouter overlap; never `agents.ramp.com/install.sh` |
| 2026-08-27 | [Honcho](https://github.com/plastic-labs/honcho) | B- (81) | **WATCH** — peer-reasoning memory; keep Mem0; no Hermes memory swap / no `npx skills add` |
| 2026-08-27 | [krypt.cc/tools](https://krypt.cc/tools) | C (73) | **SKIP** — free-tools catalog; never Tweaker/Cleaner/Cursor/Ghost/Cord/VPN binaries |
| 2026-08-27 | [Clypra](https://github.com/AIEraDev/Clypra) | B- (80) | **WATCH** — Tauri/Rust CapCut-style NLE; keep FreeCut; no MSI today (telemetry + open-core AI) |
| 2026-08-27 | [Agent Arena](https://arena.ai/leaderboard/agent) | A- (90) | **REF** — LMSYS/Arena agent leaderboard; bookmark; do not auto-swap Cursor/Hermes models |
| 2026-08-27 | [Bitwarden MCP](https://github.com/bitwarden/mcp-server) | B- (80) | **WATCH** — official; keep `.env.local`; no Cursor mcp.json (cloud LLM) |
| 2026-08-27 | [proton-pass-community-mcp](https://github.com/hesreallyhim/proton-pass-community-mcp) | C (76) | **WATCH** — unofficial pass-cli; skip Cursor |
| 2026-08-27 | [protonpass-mcp](https://github.com/aureTheDev/protonpass-mcp) | C (70) | **SKIP** — 0★ Docker; Visionary CLI |
| 2026-08-27 | [watermarks-remover](https://github.com/guillaumemeyer/watermarks-remover) | B- (81) | **WATCH** — C2PA/Unicode provenance strip; CLI only; no Cursor skill/hooks |
| 2026-08-27 | [ai-memory](https://github.com/akitaonrails/ai-memory) | C+ (77) | **WATCH (chat only)** — markdown wiki+hooks; Windows experimental; keep Vault+Mem0 |
| 2026-08-27 | [FreeForAI](https://draw.freeforai.com/) | C+ (75) | **SKIP** — browser Flux; ads + Ultimate upsell; keep HF/fal/Comfy |
| 2026-08-27 | [Malva AI](https://malvaai.com/) | C (70) | **SKIP** — affiliate directory + $70k course; NoSignups/TOOL-CHEST win |
| 2026-08-27 | [AnyCap](https://github.com/anycap-ai/anycap) | C+ (78) | **WATCH (chat only)** — agent media CLI/MCP; never `install.sh` / `skills add -g` |
| 2026-08-27 | [Hermes Control Deck](https://github.com/filipj9/Hermes-Control-Deck) | B- (81) | **WATCH** — unofficial PWA `:4240`; Telegram primary; no public bind |
| 2026-08-27 | [Unsloth](https://github.com/unslothai/unsloth) | B- (80) | **WATCH** — local LoRA/train; no `install.ps1` / no `unsloth start hermes` |
| 2026-08-27 | [Comfy Canvas](https://github.com/Zlata-Salyukova/Comfy-Canvas) | B (84) | **WATCH** — in-Comfy layer editor; custom_nodes only |
| 2026-08-27 | [FLORA](https://flora.ai/) | C+ (76) | **WATCH (chat only)** — paid Adobe-style canvas; keep fal/Comfy |
| 2026-08-27 | [NASC](https://archerionlabs.com/nasc) | C+ (73) | **SKIP** — invite MCP session-capture; keep Mem0/Vault |
| 2026-08-27 | [Hermes Session Analyzer](https://github.com/tommulkins/hermes-plugin-session-analyzer) | B- (81) | **WATCH** — Desktop plugin; `HERMES_HOME` = jonbeatz profile; TokenTracker stays spend |
| 2026-08-27 | [Devin](https://devin.ai/) | C+ (74) | **SKIP** — Cognition cloud SWE; Cursor stays C&C |
| 2026-08-27 | [Spines](https://spines.com/) | C (65) | **SKIP** — paid hybrid publisher $3.6k–$10k; keep Lulu + InDesign |
| 2026-08-27 | [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) | B- (80) | **REF** — bookmark; no `npx dsh` on this box; Cursor stays C&C |
| 2026-08-27 | [Paperclip](https://github.com/paperclipai/paperclip) | B- (81) | **WATCH** — agent org `:3100`; never `install.sh`; do not hire Cursor |
| 2026-08-27 | [The Complete Shelf](https://github.com/MengTo/complete-shelf) | B+ (88) | **REF** — Jon bookmark; live shelf + showcase queue; no local install |
| 2026-08-27 | [FenixAIStudio](https://github.com/FenixStudioAU/FenixAIStudio) | C (62) | **SKIP** — v0.1 zip/rar; AGPL; Ollama vs LM Studio |
| 2026-08-27 | [MySigMail](https://github.com/antonreshetov/mysigmail) | C+ (78) | **WATCH (chat only)** — AGPL + commercial license; SaaS extra |
| 2026-08-27 | [celld](https://github.com/denoland/celld) | C (74) | **SKIP** — Deno self-host Durable Objects; Linux Docker + S3; alpha; no `install.sh` |
| 2026-08-27 | [LoopX](https://github.com/huangruiteng/loopx) | B- (80) | **WATCH** — long-horizon overlay; no `workflow-skills --install`; Cursor stays C&C |
| 2026-08-27 | [video-use](https://github.com/browser-use/video-use) | B- (80) | **WATCH** — talking-head skill; keep Kinocut; no setup prompt / Hermes skill wire |
| 2026-08-27 | [aitmpl.com](https://aitmpl.com/) | B (84) | **REF** — already graded 2026-07-14; no re-review |
| 2026-08-27 | [CrocoBuilder](https://crocoblock.com/crocobuilder/) | C (70) | **SKIP** — paid WordPress builder; fleet is Next/Payload; no WP plugin |
| 2026-08-27 | [Presenton](https://github.com/presenton/presenton) | B (85) | **REF** — Jon bookmark; no Docker/exe tonight; install when a PPTX is needed |
| 2026-08-27 | [AutoSocial](https://github.com/Katzca/AutoSocial) | C (68) | **SKIP** — Playwright TikTok/IG/YouTube; default `:3000`; no auth; ToS |
| 2026-08-27 | [Viewmax](https://www.viewmax.io/) | C (71) | **SKIP** — paid Shorts SaaS; keep fal/OpenMontage; no Cursor MCP |
| 2026-08-27 | [book-to-skill](https://github.com/virgiliojr94/book-to-skill) | B- (80) | **WATCH** — PDF→skill; no `npx skills add`; keep copyrighted skills private |
| 2026-08-27 | [TencentDB Agent Memory](https://github.com/TencentCloud/TencentDB-Agent-Memory) | C+ (77) | **WATCH (chat only)** — team memory hub; keep Mem0; no Hermes proxy |
| 2026-08-27 | [Camera Control](https://aicameracontrol.com/) | B- (82) | **REF** — Jon bookmark; 3D shot block; Higgsfield CTA ignore; fal stays gen |
| 2026-08-27 | [FigJam](https://www.figma.com/figjam/) | C (73) | **REF** — Jon bookmark (below B-; explicit); DesignLab stays local board |
| 2026-08-27 | [Orchard](https://github.com/microsoft/Orchard) | C (72) | **SKIP** — MS K8s RL sandbox research; Azure AKS; not this workstation |
| 2026-08-27 | [Kiro](https://kiro.dev/) | C (74) | **SKIP** — AWS spec IDE; Cursor stays C&C; never `cli.kiro.dev/install` |
| 2026-08-27 | [Miro](https://miro.com/) | C (70) | **SKIP** — paid canvas; DesignLab `:3090` stays |
| 2026-08-27 | [TestingCatalog](https://www.testingcatalog.com/) | B- (80) | **REF** — AI rumor news bookmark; sponsored posts; not stack truth |
| 2026-08-27 | [Flow Devs Pack](https://aipack.flowagentautomation.com/) | C (65) | **SKIP** — paid $10/$30 AUD prompt pack; DesignMD/Hallmark stay |
| 2026-08-27 | [RoutesMe](https://routesme.online/) | C (68) | **SKIP** — unknown OpenAI-compatible gateway; never LiteLLM/Cursor `routesme.online/v1` |
| 2026-08-27 | [olmocr](https://github.com/allenai/olmocr) | C+ (76) | **WATCH (chat only)** — AllenAI PDF linearizer; Linux CUDA 12.8; keep markdownify |
| 2026-08-27 | [oh-my-hermes](https://github.com/rlaope/oh-my-hermes) | B- (80) | **WATCH** — unofficial Hermes overlay; no `omh setup` / `irm install.ps1 \| iex` |
| 2026-08-27 | [Mage](https://github.com/microsoft/Mage) | C+ (74) | **WATCH (chat only)** — MS 4B VL+Flow research; fal/Comfy/HF stay; not product deploy |
| 2026-08-27 | [VoxCPM](https://github.com/OpenBMB/VoxCPM) | B+ (85) | **WATCH** — already reviewed 2026-08-27; no re-grade |
| 2026-08-27 | [CheckMyVibeCode](https://checkmyvibecode.com/) | C (62) | **SKIP** — tiny showcase + paste-code checker; do not paste fleet code |

---

## Workflow (when Jon sends a link) — v2

**Prompts:** `Review-Tool.md` (single / batch / design grade) · `Review-Session-Done.md` (closeout)

1. **Precheck** — `npm run tools:review-precheck -- "query"`; skip if already reviewed unless **re-review**
2. Research (Firecrawl/fetch, Tavily, Context7); **security-review** mandatory for auth/deploy/agent-config tools
3. Grade with fixed template (Gap, Overlap, **Risks**, Verify, Recommendation)
4. Persist B-+ → `TOOLS-*` + `sync:docs -- -Write`
5. Install gate **next turn** after Jon has read the grades (batch = one AskQuestion). **Never** `AskQuestion` in the same message as the scoreboard.
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
