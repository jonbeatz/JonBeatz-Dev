# JonBeatz — Master Command Reference

**Profile root:** `D:\Hermes\projects\JonBeatz`  
**Last updated:** 2026-06-25 · **Version:** 4.0.0

---

## Session rituals

| Command | What it does | When |
|---------|--------------|------|
| `npm run dev` | Launch Next.js local Playground UI on **localhost:3000** | Anytime |
| `npm run web:dev:stop` | Free port **3000** only (no `.next` wipe) — website profiles | **End Project** before quitting Cursor |
| `npm run build` | Compile Playground UI static files | Prior to ship |
| `npm run session:start` | LM Studio preflight + probes + Telegram ensure | Light probe |
| `npm run session:start -- -Full` | Mem0 + DeepSeek + **ngrok** + image doctor | **Start Project** |
| `npm run session:start -- -WithDeepSeek` | Also start DeepSeek stack | Paid cloud prep |
| `npm run session:start -- -WithDeepSeek -WithNgrok` | DeepSeek + ngrok | Cursor Agent boot |
| `npm run session:start:full` | Same as `-Full` | **Start Project** |
| `npm run session:open` | Light probes — no stack restart | **Open Project** / **Resume Session** |
| `npm run session:resume` | Alias of `session:open` | Same |
| `npm run session:handoff` | Vault note only — fleet stays up; sweeps Hermes `cua-driver` | **Close Project** / **Close Session** |
| `npm run session:stop` | Day-end closeout (+ optional stack stop); sweeps Hermes `cua-driver` | **End Project** |
| `npm run session:stop -- -StopDeepSeek -StopComfy` | Stop DeepSeek + ComfyUI | End + free VRAM |
| `npm run session:stop -- -StopGoogleApi` | Legacy alias for `-StopDeepSeek` | Same |
| `npm run doctor` | **Unified** health: services, env, image, Google, git | Anytime |
| `npm run boot:setup` | Refresh Master-Startup + DeepSeek + Telegram shortcuts; remove duplicate `Hermes_Gateway_*`, Profile Jedi Tray from Startup | After boot script changes |
| `npm run boot:doctor` | Audit shortcuts, single Startup entry, ports, LM Studio tuning | Troubleshoot boot |

---

## Boot workflow (PC login)

| Item | Path / command |
|------|----------------|
| **Windows Startup** | `Startup\Master-Startup.lnk` only (hidden) → `Master-Startup.ps1 -SkipDesktop` |
| Boot sequence | Telegram gateway → partial ping → LiteLLM + ngrok (background). **Desktop skipped** — open via `npm run hermes:desktop-ready` |
| Manual boot | `D:\Hermes\Master-Startup.lnk` or `Master-Startup.ps1 -ShowWindows` (omit `-SkipDesktop` to also launch Desktop) |
| DeepSeek only | `D:\Hermes\My-DeepSeek-API.lnk` or `npm run deepseek:on` |
| Telegram reconnect | `D:\Hermes\Start Telegram Gateway.lnk` or `npm run telegram:gateway` |

**Do not** use `Master-Startup-Relay.vbs`, `Hermes_Gateway_*.vbs`, or `Hermes_Gateway_*.cmd` in Startup — duplicates boot and can steal the Telegram token (wrong Hermes profile). Telegram gateway is **always jonbeatz** (not Cursor `active-profile.json`). `npm run boot:setup` removes dupes.

**LM Studio:** Disable Windows Startup autostart (Task Manager → Startup apps). `session:start -- -Full` launches LM Studio when needed. See `FLEET-BOOT-SESSION.md`.

---

## Mem0 (personal memory)

| Command | What it does |
|---------|--------------|
| `npm run mem0:preflight` | Verify LM Studio up; load **qwen3-4b-instruct-2507** @ 16384 ctx / parallel 1 if no model loaded (no swap) |
| `npm run mem0:add -- "text"` | Add memory directly (`infer=False`, reliable) |
| `npm run mem0:add:infer -- "text"` | Add memory with LLM fact extraction (`infer=True`) |
| `npm run mem0:search -- "query"` | Semantic search personal memory |
| `npm run mem0:list` | List all personal memories |
| `npm run mem0:seed:profile-jedi` | Re-seed Profile Jedi knowledge (infer=False) |

**Requires:** LM Studio local server on **port 1234**.

---

## Image workflow (Hugging Face + ComfyUI)

| Command | What it does |
|---------|--------------|
| `npm run env:setup` | Create `.env.local` from template; merge HF_TOKEN from MSC if present |
| `npm run image:doctor` | Verify HF_TOKEN, ComfyUI paths, Python deps, output dir |
| `npm run image:gen -- "prompt"` | Cloud FLUX.1-schnell → `D:\Hermes\assets\media\JonBeatz` |
| `npm run image:gen:open -- "prompt"` | Same + open in default viewer |
| `npm run image:fal -- "prompt"` | fal.ai pay-per-use bonus (`FAL_API_KEY`) |
| `npm run image:fal:open -- "prompt"` | fal + open in default viewer |
| `npm run video:fal -- -StartImage a.png -EndImage b.png` | Kling I2V scroll clip via fal queue |
| `npm run video:fal:open -- -StartImage a.png -EndImage b.png` | Kling clip + open MP4 |
| `npm run comfy:start` | Start shared ComfyUI (:8188) with VRAM guards |
| `npm run comfy:stop` | Stop ComfyUI only (keeps LM Studio) |
| `npm run comfy:restart` | Restart ComfyUI |
| `npm run comfy:status` | JSON: port, queue, PIDs |
| `npm run comfy:repair-symlinks` | Recreate ComfyUI model symlinks (H:\LLM_VAULT → models/) |
| `npm run comfy:compare -- "prompt"` | Run all txt2img workflows + HF cloud comparison |
| `npm run lmstudio:audit` | LM Studio vault + API health check |
| `npm run comfy:idle-watcher` | MSC idle watcher daemon (suggest stop after 15m idle) |

**Docs:** [IMAGE-WORKFLOW.md](./IMAGE-WORKFLOW.md) · [COMFYUI-MODELS.md](./COMFYUI-MODELS.md) · [VRAM-IMAGE.md](./VRAM-IMAGE.md)

**Profile commands** (PowerShell profile, require ComfyUI): `gen-image-local`, `edit-image`, `inpaint-image`, `upscale-image`, `generate-video`, `animate-image`.

---

## Command Center (JonBeatz hub)

| Command | What it does |
|---------|--------------|
| `npm run fleet:status` | Audit shared skeleton + sibling profile parity |
| `npm run fleet:sync` | Push sync:docs + sync:skills to all fleet profiles |
| `npm run fleet:merge-npm` | Additive merge of fleet npm aliases into each profile package.json |
| `npm run docs:pull-shared` | Alias: sync universal docs into this profile |

**Doc:** [COMMAND-CENTER.md](./COMMAND-CENTER.md)

---

## Scroll, 3D & motion (Hermes web profiles)

| Command | What it does |
|---------|--------------|
| `npm run scroll:motion:status` | Verify **gsap / lenis / @gsap/react / three / R3F / motion** baseline + docs |
| `npm run workflows:3d:status` | Verify **3d-web-workflows** asset vault + shared docs/skills wiring |
| `npm run vault:robonuggets` | Clone/update RoboNuggets HTML modules into asset vault |
| `npm run vault:robonuggets:refresh` | Force re-clone RoboNuggets vault repos |
| `npm run vault:cinematic-scroll-skill` | Clone MustBeSimo cinematic-scroll-skill into asset vault |
| `npm run vault:cinematic-scroll-skill:refresh` | Force re-clone cinematic-scroll-skill |
| `npm run vault:pdf:inventory` | Extract text from all vault PDF/DOCX → `vault-pdf-inventory.json` |
| `npm run 3dgenstudio:install` | Install 3DGenStudio @ `D:\Hermes\apps\3DGenStudio` |
| `npm run 3dgenstudio:start` | Start UI (:5183) + API (:3021); requires ComfyUI :8188 |
| `npm run hermes:theme:reflect` | Install **Reflect** Hermes dashboard theme (+ rollback manifest) |
| `npm run hermes:theme:restore` | Restore previous dashboard theme (was `default` before Reflect) |
| `npm run hermes:theme:status` | Active theme + rollback manifest |
| `npm run sync:skills` | Pull shared skills (incl. **3d-scroll-website**) into `.cursor/skills/` |
| `npm run sync:docs -- -Write -AddMissing` | Pull `3D-WEB-WORKFLOWS.md`, `SCROLL-3D-REFERENCES.md`, taste catalog |

**Docs:** [3D-WEB-WORKFLOWS.md](./3D-WEB-WORKFLOWS.md) · [SCROLL-3D-REFERENCES.md](./SCROLL-3D-REFERENCES.md) · [DESIGN-REFERENCES.md](./DESIGN-REFERENCES.md) · [3D-WEBSITE-TASTE-CATALOG.md](./3D-WEBSITE-TASTE-CATALOG.md) · [HERMES-DASHBOARD-THEMES.md](./HERMES-DASHBOARD-THEMES.md)

**Skills (read order):** `Scroll-Video-Sequence` (canvas frame scrub) → `Scroll-Motion` (Lenis+GSAP) → `3D-Website-Fusion` → `Motion-Accessibility`

**Component:** `components/SmoothScrollProvider.tsx` — wrap `app/layout.tsx` when using ScrollTrigger.

**New site bootstrap:** `npm run bootstrap:website` copies `ThreeBackground` + `SmoothScrollProvider`.

**Optional agent pack:** `npx skills add https://github.com/greensock/gsap-skills -g -a cursor`

---

## Hermes & Google API

| Command | What it does |
|---------|--------------|
| `npm run desktop` | Launch Hermes Desktop (JonBeatz profile) |
| `npm run hermes:lmstudio` | Smart-load **qwen3-4b-instruct-2507** @ 16384 / parallel 1 (skips if already optimal) |
| `npm run lmstudio:dedupe` | Remove duplicate LM Studio instances (`qwen3-4b` + `qwen3-4b:2`) |
| `npm run lmstudio:switch -- -Model <id>` | Unload other LLMs, load target (before heavy picker switch) |
| `npm run hermes:local` | Set **active** Hermes model to LM Studio default (providers stay dual-registered) |
| `npm run deepseek:billing-stop` | Stop LiteLLM/ngrok + switch **active** Hermes model to local LM Studio |
| `npm run deepseek:billing-status` | Show LM Studio vs LiteLLM billing mode |
| `npm run gcp:billing-stop` | **Alias** → `deepseek:billing-stop` (legacy name) |
| `npm run gcp:billing-status` | **Alias** → `deepseek:billing-status` (legacy name) |
| `npm run gcp:vertex-on` | Re-enable Vertex via LiteLLM (paid) — retired path; prefer DeepSeek |
| `npm run sync:deepseek-env` | Sync DeepSeek keys from JonBeatz `.env.local` → `deepseek-api/.env.local` |
| `npm run deepseek:ngrok` | Full start + ngrok tunnel (Cursor Agent HTTPS) |
| Shortcut | `D:\Hermes\My-DeepSeek-API.lnk` — sync env + LiteLLM :4000 + Hermes `deepseek-v4-pro` |
| `npm run deepseek:shortcut` | Recreate `My-DeepSeek-API.lnk` (+ Desktop copy) |
| `npm run stop` | Alias for `deepseek:billing-stop` (not Next.js stop) |
| `npm run profile:align` | Set Hermes active profile to this workspace (no Desktop launch) |
| `npm run profile:align:full` | Align + full Hermes profile switch |
| `npm run profile:align:check` | Report mismatch only (exit 2 if misaligned) |
| `npm run google:doctor` | OAuth token + LiteLLM + setup.py --check |
| `npm run google:status` | JSON status for agents |

## Telegram (iPhone ↔ PC)

| Command | What it does |
|---------|--------------|
| `npm run sync:telegram-env` | Sync `TELEGRAM_*` from `.env.local` → all Hermes profile `.env` files |
| `npm run telegram:ensure` | Sync creds + start gateway for active profile |
| `npm run telegram:gateway` | Full reconnect (LiteLLM + sync + gateway + ping) — same as `D:\Hermes\Start Telegram Gateway.lnk` |
| `npm run telegram:shortcut` | Recreate `Start Telegram Gateway.lnk` (+ Desktop copy) |
| `npm run telegram:sessions` | List recent Telegram chat sessions (Desktop TELEGRAM sidebar data) |
| `npm run telegram:doctor` | Audit creds, gateway, LiteLLM, duplicate pollers |
| `npm run telegram:test` | Send UTF-8-safe boot-style test notification |
| `npm run notify` | Send custom alert (`$env:TELEGRAM_MESSAGE` recommended) |

**Docs:** [TELEGRAM-WORKFLOW.md](./TELEGRAM-WORKFLOW.md)

**Pitfall:** Hermes Desktop UI ≠ Telegram listener. Gateway must be running and profile `.env` must have `TELEGRAM_BOT_TOKEN`. Desktop UI is optional for phone chat; use TELEGRAM sidebar or `telegram:sessions` to view phone threads on PC.

## Hermes Browser Extension (Chrome / Brave ↔ `:8642`)

| Command | What it does |
|---------|--------------|
| `npm run hermes-browser:install` | Sync `API_SERVER_*` to profile env, build extension, restart gateway, open browser extensions + copy API key |
| `npm run hermes-browser:status` | Dist manifest, profile CORS, `:8642` health |
| `npm run hermes-browser:cors-sync` | Detect extension IDs → set `API_SERVER_CORS_ORIGINS` → restart gateway |
| `npm run hermes-browser:sync-api-env` | Copy `API_SERVER_*` from global Hermes `.env` into profile `.env` |
| `npm run hermes-browser:clip-key` | Copy `API_SERVER_KEY` to clipboard (paste in extension Settings) |
| `npm run hermes-browser:companion` | Install + enable `hermes-browser-companion` plugin (Desktop bridge tools) |
| `npm run hermes-browser:build` | Rebuild `D:\Hermes\apps\hermes-browser-extension` only |

**Paths:** extension clone `D:\Hermes\apps\hermes-browser-extension` · load unpacked `dist/` · gateway `http://127.0.0.1:8642`

**Workflow:** Live webpage questions → **side panel (Alt+H)**. Hermes Desktop = code/files; does not auto-see open tabs. Companion plugin adds `browser_context_*` tools when enabled on the profile.

**Pitfall:** After load unpacked, **must** run `hermes-browser:cors-sync` or every browser request gets **403**. Profile-scoped `HERMES_HOME` needs `API_SERVER_*` in `profiles/<slug>/.env`, not global only.

**Docs:** [TOOLS-REFERENCE.md](./TOOLS-REFERENCE.md) § hermes-browser-extension

## PocketBase (on-deck backend `:8090`)

| Command | What it does |
|---------|--------------|
| `npm run pocketbase:install` | Download v0.39.6 binary to `D:\Hermes\apps\pocketbase` + smoke `:8090` |
| `npm run pocketbase:status` | Binary present + port check |
| `npm run pocketbase:start` | Start localhost `:8090` on demand (does not touch `:3000` / `:4000` / `:8642`) |
| `npm run databasement:install` | Docker Databasement → `D:\Hermes\apps\databasement` · localhost `:2226` |
| `npm run databasement:status` | Container + UI health |
| `npm run databasement:start` / `:stop` | Start/stop container (data kept) |
| `npm run insforge:install` | Hardened InsForge spike compose @ `D:\Hermes\apps\insforge` · localhost `:7130` |
| `npm run insforge:status` | Compose ps + UI health |
| `npm run insforge:start` / `:stop` | Start/stop spike stack (never Neon) |

**Theatre.js (on-deck):** devDeps `@theatre/core`, `@theatre/studio`, `@theatre/r3f` in JonBeatz playground — not wired to routes until showcase spike.

**Shortcut (one-click local prep + Desktop):** `D:\Hermes\Start Hermes Desktop (JonBeatz).lnk`  
Script: `D:\Hermes\projects\_core-scripts\hermes-desktop\Start-JonBeatz-Hermes-Desktop.ps1`

LiteLLM / DeepSeek stack scripts live in `D:\Hermes\projects\_core-scripts\deepseek-api\scripts\` (the legacy `google-api` stack is retired under `_archive/`).

---

## Switching between DeepSeek and LM Studio in Hermes

**Dual-provider config** (jonbeatz `config.yaml`):

| Provider slug | Endpoint | Models |
|---------------|----------|--------|
| `local-127.0.0.1:4000` | LiteLLM `:4000` | `deepseek-v4-pro`, `deepseek-v4-flash` |
| `local-lm-studio-(free)` | LM Studio `:1234` | `qwen3-4b-instruct-2507`, `qwen3.5-9b`, `qwen2.5-coder-32b-instruct`, `deepseek-r1-distill-qwen-14b` |

**Desktop picker (preferred):** Hermes Desktop → model menu → **Refresh Models** → pick from **LOCAL DEEPSEEK LITELLM (PAID)** or **LOCAL LM STUDIO (FREE)**. Use **Edit Models…** to show/hide rows.

**LM Studio must already be running** (app open → Developer → Local Server → **Running** on `:1234`). Hermes does **not** launch the LM Studio app — it talks to the local server only. When you pick a local model, Hermes sends chat to `:1234`; you'll see the model appear in LM Studio's **Loaded Models** panel (Hermes may JIT-load on first message for models not pre-loaded).

**Avoid duplicate loads:** `hermes:lmstudio` and Mem0 preflight use smart-load (skip if same model already loaded). If you see `qwen3-4b` twice (`:2` suffix), run `npm run lmstudio:dedupe`. Switching local models: `npm run lmstudio:switch -- -Model qwen3.5-9b` (unloads previous LLM first).

| Command | What it does |
|---------|--------------|
| `npm run hermes:lmstudio` | Smart-load default **qwen3-4b-instruct-2507** @ 16384 / parallel 1 (no duplicate) |
| `npm run lmstudio:switch -- -Model qwen3.5-9b` | Unload other LLMs, load target model |
| `npm run lmstudio:dedupe` | Eject duplicate instances (`model` + `model:2`) |

**CLI default switch** (sets active `model:` block only — both providers stay registered):

| Goal | Command |
|------|---------|
| Paid DeepSeek default | `npm run deepseek:on` |
| Free local default | `npm run hermes:local` or `npm run deepseek:billing-stop` |
| Billing status | `npm run deepseek:billing-status` |

**Offline:** Start LM Studio server → `npm run hermes:lmstudio` → pick a local model in Desktop — internet optional once loaded.

---

## DeepSeek + LiteLLM (active paid cloud)

**Docs:** [AI-Master-Plan.md](./AI-Master-Plan.md) · [DeepSeek-Master.md](./DeepSeek-Master.md) · [Google-Cloud.md](./Google-Cloud.md)

| Command | What it does |
|---------|--------------|
| `npm run deepseek:on` | Start LiteLLM (DeepSeek yaml, **--keep-gateway**) + switch Hermes to `deepseek-v4-pro` |
| `npm run deepseek:off` | Stop LiteLLM + switch Hermes to local qwen3-4b-instruct-2507 |
| `npm run deepseek:status` | Probe `:4000/v1/models` + Hermes model line |
| `npm run deepseek:test` | One-shot LiteLLM chat completion smoke test |

**Ngrok (Cursor Agent):** Run `npm run deepseek:ngrok` (LiteLLM + ngrok from the `_core-scripts/deepseek-api` stack) — use the HTTPS URL + `/v1` in Cursor Override. The public URL is written to `_core-scripts/deepseek-api/logs/ngrok-public-url.txt`. Localhost `:4000` fails Agent ("private networks forbidden").

**Cursor (Setup B — JonBeatz hub):** Override ON → ngrok `/v1` + `sk-jonbeatz-deepseek-2026`. Models: `deepseek-v4-pro` / `deepseek-v4-flash` (direct) + OpenRouter `*-or` aliases. Registry: JonBeatz **`CURSOR-MODELS-CHEATSHEET.md`** · `npm run cursor:models`. **Auto** = Cursor subscription, not BYOK list — pick models explicitly.

**Verify:** `npm run deepseek:test` · `npm run deepseek:test:openrouter`

**Emergency Vertex rollback:** `npm run gcp:vertex-on` — `litellm_config.vertex.yaml` only; GCP billing risk.

---

## Logging & maintenance

| Command | What it does |
|---------|--------------|
| `npm run version:sync` | Sync README badges + TRUTH/MASTER-COMMANDS from `package.json` (Python UTF-8) |
| `npm run hermes:tune` | Apply Hermes Desktop display + timeout tuning (jonbeatz profile) |
| `npm run release` | Tag `vX.Y.Z`, push, publish GitHub release (`--latest`) |
| `npm run log:session -- "summary"` | Append to `project-log.md` |
| `npm run log:fix` | Append to `ISSUES-RESOLVED.md` (interactive) |
| `npm run log:fix -- --issue "..." --cause "..." --solution "..."` | Non-interactive fix log |
| `npm run backup:project` | Interactive backup (Standard or Full, robocopy) |
| `npm run backup:standard` | Standard backup — skips node_modules, .next, output, logs |
| `npm run backup:full` | Full mirror — includes everything |
| `npm run backup:quick` | Standard quick — auto `jonbeatz-project-v{N}-{a-z}`, no prompts |
| `npm run backup:quick:full` | Full quick — auto folder name, no prompts |
| `npm run backup:hermes-profile` | Hermes runtime only → `hermes-profile-latest/` (config.yaml, .env, memories) |
| `npm run backup:profile` | Alias for `backup:quick` (legacy phrase) |
| `npm run backup:clean` | Retain 10 newest `jonbeatz-project-v*` folders |

**Backup root:** `G:\Hermes_Project_BackUpz\JonBeatz` (`JONBEATZ_BACKUP_ROOT` in `.env.local`). Each backup includes `_hermes-profile-snapshot/jonbeatz/` (`config.yaml`, `.env`, `memories/` — no logs/sessions). Restore Hermes: copy `config.yaml` to `%LOCALAPPDATA%\hermes\profiles\jonbeatz\`.

| `npm run python:setup` | `pip install -r requirements.txt` |
| `npm run draven:speak -- "text"` | Draven TTS — OmniVoice (ritual + explicit only; Ryan fallback) |
| `npm run draven:voice-test` | Short OmniVoice test phrase |
| `npm run draven:omni-daemon` | Warm OmniVoice model on `:18776` (lazy-started by speak) |
| `npm run draven:omni-daemon -- -Stop` | Stop OmniVoice daemon |

**Voice policy:** `DRAVEN_VOICE_POLICY=ritual` — no auto-read of replies or Mem0 recall. See [VOICE-WORKFLOW.md](./VOICE-WORKFLOW.md).

| `npm run env:setup` | Create / refresh `.env.local` |
| `npm run dev:recover` | Free port 3000, clear `.next`/cache, `npm install`, `npm run dev` |
| `npm run sync:mcp-env` | Sync project MCP keys from `.env.local` → `.cursor/mcp.json` |
| `npm run obsidian:distill` | Scan `H:\Vader_Vault` for weekly ReCall.md candidate notes |

---

## Playground UI

| Command | What it does |
|---------|--------------|
| `npm run dev` | Playground UI @ **localhost:3000** |
| `npm run build` | Production build gate |
| `npm run dev:recover` | Hard recovery when stale `.next` or port conflict |

**API routes (server-side, secrets in `.env.local`):**

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/system/status` | GET | Live port probe: LiteLLM, LM Studio, ComfyUI, ngrok |
| `/api/deepseek/chat` | POST | Proxy chat to LiteLLM `deepseek-v4-pro` |
| `/api/comfyui/status` | GET | ComfyUI port 8188 up/down |
| `/api/telegram/sessions` | GET | Recent iPhone Telegram sessions |

---

## MCP (project)

See **`.cursor/docs/MCP-SETUP.md`**. After editing `.env.local` MCP keys: `npm run sync:mcp-env` → reload Cursor Settings → MCP.

---

## Hostinger (MSC reference)

See **`.cursor/docs/HOSTINGER-REFERENCE.md`**. Deploy runs from MSC repo; MCP + docs available here.

| Command | What it does |
|---------|--------------|
| `npm run sync:mcp-env` | Sync project + **global** MCP (github, tavily, hostinger-*) |

| Command | What it does |
|---------|--------------|
| `npm run docs:sync` | Audit TRUTH / START-HERE / ReCall alignment |
| `npm run docs:update` | Same as `docs:sync` (Cursor hook alias) |

---

## VS Code tasks (keyboard shortcuts)

Open **`JonBeatz.code-workspace`** or folder `JonBeatz` in Cursor.

| Shortcut | Task | npm script |
|----------|------|------------|
| **Ctrl+Shift+B** | Start Project (full) | `session:start:full` |
| **Ctrl+Shift+O** | Open / Resume | `session:open` |
| **Ctrl+Shift+E** | Close Session (handoff) | `session:handoff` |
| **Ctrl+Shift+Alt+E** | End Project (stop stack) | `session:stop` |
| **Ctrl+Shift+Alt+D** | Doctor | `doctor` |
| **Ctrl+Shift+Alt+M** | Search Mem0 | `mem0:search` (prompt) |

One-time install into Cursor user keybindings:

```powershell
npm run vscode:keybindings
```

Bindings apply only when `workspaceFolderBasename == 'JonBeatz'` (Explorer shortcut unchanged in other projects).

Run any task: **Ctrl+Shift+P** → **Tasks: Run Task**.

## Direct PowerShell (when npm wrappers aren't enough)

```powershell
# Mem0 via Python
python scripts/mem0_integration.py --action search --query "priorities"

# Hermes desktop launcher
powershell -File scripts/start-hermes-desktop-jonbeatz.ps1

# Google API (_legacy archived — use DeepSeek)
powershell -File D:\Hermes\projects\_core-scripts\deepseek-api\scripts\start-deepseek.ps1
```

---

## Ports (personal stack)

| Port | Service |
|------|---------|
| 1234 | LM Studio (Mem0 LLM + embedder host) |
| 4000 | LiteLLM |
| 4040 | ngrok inspector |
| 7780 | Profile Jedi app |
| 7781 | Profile Jedi tray supervisor |

MSC Kanban ports (3001/3005/9119) live in the **MyStudioChannel** repo — not started by default here.

---

## jon-beatz.com deploy (personal static site — gold only)

| Command | What it does |
|---------|--------------|
| `npm run dev` | Gold Command Center @ :3000 (local APIs, live dashboard) |
| `npm run site:build:static` | Static export → `out/` — **jon-beatz.com** (gold footer) |
| `npm run site:preview` | Serve `out/` at http://localhost:5055 (pre-deploy QA) |
| `npm run site:package` | Build + zip → `.deploy\jonbeatz-site_<ts>.zip` → deploy **jon-beatz.com** |
| `npm run site:ssh -- "cmd"` | SSH remote command (optional; reads `.env.local`) |

**jonbeatz.dev (red site)** — standalone repo `D:\Hermes\projects\JonBeatz.dev` (GitHub `jonbeatz/JonBeatz-Dev`). Deploy with `npm run site:package` from **that** folder. Runbook: `JonBeatz.dev\.cursor\docs\JONBEATZ-DEV-DEPLOY.md`. The old `:dev` scripts here (`dev:devsite`, `site:package:dev`, etc.) print a redirect message.

**After deploy:** hPanel → target domain → **Performance → CDN → Flush cache** (required on updates; first deploy often skips).

**Stale WordPress icon in hPanel?** Website → **Auto Installer** → Delete WP app (**application only** — do not check installation files). See [JONBEATZ-SITE-DEPLOY.md](./JONBEATZ-SITE-DEPLOY.md) → "Clear stale WordPress label".

**Docs:** [JONBEATZ-SITE-DEPLOY.md](./JONBEATZ-SITE-DEPLOY.md) · env: `JONBEATZ_*` + `HOSTINGER_SSH_*` in `.env.local`

---

---

## Tools watchlist (Hermes-wide)

| Command | What it does |
|---------|--------------|
| `npm run tools:status` | Config queue + verdict counts (READY vs NEEDS_KEY) |
| `npm run tools:review-precheck -- "url-or-name"` | Duplicate check before review (TOOLS-* + DESIGN-REFERENCES) |
| `npm run codebase-memory:status` | Code graph MCP index health (JonBeatz hub) |
| `npm run codebase-memory:reindex` | Rebuild codebase-memory-mcp index |
| `npm run openmontage:status` | OpenMontage venv + Remotion + FAL_KEY check |
| `npm run cua:cleanup` | Close Cua overlay + sweep orphaned `cua-driver` only |
| `npm run cua:cleanup:all` | Also kill live Hermes `cua-driver` (session close uses this) |
| `npm run cua:cleanup:reset` | Kill driver + restart DWM (clears leaked grey GPU overlay; ~1s flicker) |
| `npm run cua:cleanup:check` | Dry run — report only |
| `npm run cua:overlay:harden` | **Permanent grey-box fix** — bake `serve --no-overlay` into logon task + restart daemon (re-run after cua-driver update) |
| `npm run cua:overlay:check` | Dry run — is overlay hardened? |
| `npm run handy:status` | Handy offline STT install check (`%LOCALAPPDATA%\Handy\Handy.exe` + winget) |
| `npm run handy:model` | Download default Parakeet model into HF cache (workaround for Handy content-range bug) |
| `npm run handy:model:list` | List Handy catalog repo ids + default GGUF filenames |
| `npm run wan21:install` | Clone Wan2.1 + download T2V-1.3B weights to `H:\AI_Models\Wan2.1` |
| `npm run wan21:status` | Verify Wan2.1 repo + native/Diffusers checkpoints on H: |
| `npm run skills:emil:install` | Install/update emilkowalski/skills — npx global + vendor to `shared-profile-content/skills` + sync project |
| `npm run skills:emil:status` | Verify 5 Emil skills in shared library, global `~\.agents\skills`, and project `.cursor\skills` |
| `npm run ecosystem:audit` | Regenerate secrets inventory + credentials manifest + G:\\ backup |
| `npm run agent-reach:doctor` | Agent-Reach channel health |
| `npm run watch:check` | claude-video `/watch` preflight + Groq optional |
| `npx skills find [query]` | **find-skills** — search 2000+ agent skills catalog |
| `agent-browser snapshot -i` | **Agent Browser** — ref-based page snapshot (CLI) |
| `npm run sync:docs -- -Write -AddMissing` | Pull TOOLS-*.md into `.cursor/docs/` |

**Canonical:** `D:\Hermes\projects\_core-scripts\shared-profile-content\docs\TOOLS-*.md`  
**Fleet policy:** [FLEET-TOOLS-KNOWLEDGE.md](./FLEET-TOOLS-KNOWLEDGE.md) — reviews are Hermes-wide; JonBeatz is hub, not sole owner.

**Cursor trigger:** paste repo URL or say **review tool** → `Review-Tool.md`. **review batch** · **review design** · **review session done** → same ritual family.

---

## Cursor chat triggers

| Say this | Agent runs |
|----------|------------|
| **Start Project** / **Cold Start** | `session:start -- -Full` + Start-Project.md |
| **Open Project** / **Resume Session** | `session:open` + Open-Project.md |
| **Close Project** / **Close Session** | Close-Project.md + `session:handoff` |
| **End Project** / **End Session** | End-Project.md + `session:stop` (AskQuestion git → dev `:3000` if up → `-StopDeepSeek`) |
| **update docs** | `docs:sync` / Update-Docs.md |
| **backup profile** / **backup quick** | `backup:quick` |
| **backup project** | `backup:project` |
| **backup full** | `backup:quick:full` |
| **push jon-beatz live** / **update jon-beatz site** | `site:package` + MCP deploy + CDN flush |
| **push jonbeatz.dev live** / **update .dev site** | Open `D:\Hermes\projects\JonBeatz.dev` → `npm run site:package` + MCP deploy `jonbeatz.dev` + CDN flush |
| **review tool** / paste repo URL | Review-Tool.md + update TOOLS-*.md |
| **review batch** / multiple URLs | Review-Tool.md batch — grades first, one install gate |
| **review design** / **grade this site** | Review-Tool.md design grade → DESIGN-REFERENCES |
| **review session done** | Review-Session-Done.md + sync:docs + tools:status |

See **[Agent-Runbook.md](./Agent-Runbook.md)** for full copy/paste prompts.

---
