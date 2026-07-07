# Engineering & Technical Workflows

## --- Source: COMFYUI-MODELS.md ---

1|# ComfyUI Model Library — JonBeatz (shared workstation)
2|
3|**Hardware:** NVIDIA RTX 5060 Ti (16 GB VRAM)  
4|**ComfyUI:** `D:\AI_Models\ComfyUI\` · port **8188**  
5|**Workflows:** `D:\AI_Models\ComfyUI\workflows\`  
6|**Full MSC inventory:** `D:\Cursor_Projectz\MyStudioChannel\.cursor\docs\COMFYUI-MODELS.md`
7|
8|JonBeatz uses the **same ComfyUI install** as MyStudioChannel. Models live on `H:\AI_Models\` and symlink into ComfyUI.
9|
10|---
11|
12|## Quick switch guide
13|
14|| Goal | Workflow | Command |
15||------|----------|---------|
16|| Fast local default | `txt2img-gen-image-local.json` | `gen-image-local "prompt"` |
17|| Flux.1-dev quality | `txt2img-flux-dev.json` | ComfyUI / test script |
18|| Flux.2 Klein 4B | `txt2img-flux-klein.json` | ComfyUI / test script |
19|| SDXL | `txt2img-sdxl.json` | ComfyUI / test script |
20|| Photorealism | `txt2img-realism.json` | ComfyUI / test script |
21|| Anime | `txt2img-anime.json` | ComfyUI / test script |
22|| img2img | `img2img.json` | `edit-image` |
23|| inpaint | `inpaint.json` | `inpaint-image` |
24|
25|```powershell
26|# Smoke test all workflows
27|powershell -File D:\AI_Models\ComfyUI\scripts\test-comfyui-workflows.ps1
28|
29|# Repair symlinks
30|powershell -File D:\AI_Models\ComfyUI\scripts\repair-comfyui-symlinks.ps1
31|
32|# Re-download deleted weights
33|powershell -File D:\AI_Models\ComfyUI\scripts\restore-comfyui-models.ps1
34|```
35|
36|---
37|
38|## Primary models (installed)
39|
40|| Model | Role | Path hint |
41||-------|------|-----------|
42|| **z-image-turbo** Q4_K_M | Default local txt2img | `H:\AI_Models\unsloth\Z-Image-Turbo-GGUF\` |
43|| **Qwen3-4B-Instruct** Q4_K_M | CLIP for z-image | `H:\AI_Models\unsloth\Qwen3-4B-Instruct-2507-GGUF\` |
44|| **ae.safetensors** | VAE (Flux/Z) | `ComfyUI\models\vae\` |
45|| **Flux.2 Klein 4B** | Fast Flux | `H:\AI_Models\unsloth\FLUX.2-klein-4B-GGUF\` |
46|| **Flux.1-dev** Q4_K_S | Quality Flux | `H:\AI_Models\comfyui_cache\unet\` |
47|| **SD 1.5 fp16** | ComfyUI default UI | `checkpoints\v1-5-pruned-emaonly-fp16.safetensors` |
48|| **4x-UltraSharp / AnimeSharp** | Upscale | `H:\AI_Models\comfyui_cache\upscale_models\` |
49|
50|Download SD 1.5 fp16 (requires `HF_TOKEN` in JonBeatz `.env.local`):
51|
52|```powershell
53|cd D:\Hermes\projects\JonBeatz
54|hf download Comfy-Org/stable-diffusion-v1-5-archive v1-5-pruned-emaonly-fp16.safetensors --local-dir "D:\AI_Models\ComfyUI\ComfyUI\models\checkpoints"
55|```
56|
57|---
58|
59|## JonBeatz control commands
60|
61|| Command | Action |
62||---------|--------|
63|| `npm run comfy:start` | Start ComfyUI (VRAM guards) |
64|| `npm run comfy:stop` | Stop ComfyUI only |
65|| `npm run comfy:status` | JSON state |
66|| `npm run image:doctor` | Env + ComfyUI health |
67|
68|See **[IMAGE-WORKFLOW.md](./IMAGE-WORKFLOW.md)** and **[VRAM-IMAGE.md](./VRAM-IMAGE.md)**.
69|

---

## --- Source: IMAGE-WORKFLOW.md ---

1|# Image Workflow — JonBeatz Complete Guide
2|
3|**Profile root:** `D:\Hermes\projects\JonBeatz`  
4|**Canonical model inventory:** [COMFYUI-MODELS.md](./COMFYUI-MODELS.md)  
5|**VRAM playbook:** [VRAM-IMAGE.md](./VRAM-IMAGE.md)  
6|**Environment:** `.env.local` (from `.env.local.example` — run `npm run env:setup`)
7|
8|This is the **JonBeatz agent source of truth** for Hugging Face cloud generation + local ComfyUI editing, upscaling, and video.
9|
10|---
11|
12|## Two pipelines (when to use which)
13|
14|| Goal | Pipeline | VRAM | Speed |
15||------|----------|------|-------|
16|| Quick photorealistic still (1024²) | **Hugging Face** `gen-image` / FLUX.1-schnell | **0** (cloud) | ~10–15 s |
17|| Local GPU txt2img, edit, inpaint, upscale, video | **ComfyUI** @ `:8188` | Uses GPU | 30 s – 5 min |
18|
19|**Rule:** Prefer **HF cloud** when LM Studio is loaded or VRAM is tight. Use **ComfyUI** when Jon asks for local GPU, img2img, inpaint, upscale, or video.
20|
21|---
22|
23|## Environment setup (first time)
24|
25|```powershell
26|cd D:\Hermes\projects\JonBeatz
27|npm run env:setup          # creates .env.local; merges HF_TOKEN from MSC if present
28|npm run image:doctor       # verify HF_TOKEN, ComfyUI paths, Python deps
29|pip install huggingface_hub pillow python-dotenv
30|```
31|
32|Required in **`.env.local`:**
33|
34|| Variable | Purpose |
35||----------|---------|
36|| `HF_TOKEN` | Hugging Face Inference API (FLUX.1-schnell) |
37|| `COMFYUI_ROOT` | Shared install `D:\AI_Models\ComfyUI` |
38|| `IMAGE_OUTPUT_DIR` | JonBeatz outputs `public\media` (served root-relatively) |
39|| `LMSTUDIO_*` / `MEM0_*` | Personal memory stack |
40|
41|---
42|
43|## Quick reference card
44|
45|| What Jon wants | Command (JonBeatz) | Where it runs |
46||----------------|-------------------|---------------|
47|| Cloud image from text | `npm run image:gen -- "prompt"` | Hugging Face API |
48|| Cloud image + open viewer | `npm run image:gen:open -- "prompt"` | HF + default photo app |
49|| Start ComfyUI | `npm run comfy:start` | Local GPU :8188 |
50|| Stop ComfyUI (keep LM Studio) | `npm run comfy:stop` | Local |
51|| ComfyUI status JSON | `npm run comfy:status` | Local |
52|| Health check | `npm run image:doctor` | Local |
53|| ComfyUI web UI | Browser → http://127.0.0.1:8188 | Local |
54|
55|### PowerShell profile commands (workstation-wide)
56|
57|These live in Jon's **PowerShell profile** (shared with MSC). They call ComfyUI workflows under `D:\AI_Models\ComfyUI\workflows\`:
58|
59|| Command | Purpose |
60||---------|---------|
61|| `gen-image "prompt"` | HF FLUX cloud (same as MSC — uses repo `.env.local` when run from JonBeatz) |
62|| `gen-image-local "prompt"` | ComfyUI z-image-turbo GGUF |
63|| `edit-image -InputPath ... -Prompt ...` | img2img |
64|| `inpaint-image -InputPath ... -MaskPath ...` | inpaint |
65|| `upscale-image -InputPath ... -TargetSize 4K` | upscale |
66|| `fix-face -InputPath ...` | face restore |
67|| `generate-video -Prompt ...` | CogVideoX text-to-video |
68|| `animate-image -InputPath ...` | SVD image-to-video |
69|
70|**Natural language:** Jon can say *"make me a chicken playing golf"* → agent runs cloud `gen-image` or asks cloud vs local.
71|
72|Full cheat sheet (all parameters): MSC [IMAGE-VIDEO-CHEATSHEET.md](file:///D:/Cursor_Projectz/MyStudioChannel/.cursor/docs/IMAGE-VIDEO-CHEATSHEET.md) — same workstation commands.
73|
74|---
75|
76|## A. Hugging Face cloud (`npm run image:gen`)
77|
78|Architecture:
79|
80|```
81|npm run image:gen → scripts/gen-image.ps1 → scripts/generate-image.py
82|  → reads .env.local HF_TOKEN
83|  → Hugging Face InferenceClient (FLUX.1-schnell)
84|  → saves PNG to IMAGE_OUTPUT_DIR
85|```
86|
87|Examples:
88|
89|```powershell
90|npm run image:gen -- "a beautiful recording studio with gold accent lighting, photorealistic, 4k"
91|npm run image:gen -- "cyberpunk city" -- --width 1920 --height 1080
92|powershell -File scripts/gen-image.ps1 "portrait of astronaut" -Width 1920 -Height 1080 -Open
93|```
94|
95|Output default: `D:\Hermes\projects\JonBeatz\public\media\generated-YYYYMMDD-HHMMSS.png`
96|
97|---
98|
99|## B. ComfyUI local workflow
100|
101|### Start / stop (JonBeatz npm wrappers → MSC scripts)
102|
103|JonBeatz delegates to the **shared MSC ComfyUI scripts** (same engine, same VRAM guards):
104|
105|```powershell
106|npm run comfy:start              # VRAM pre-flight, then launch
107|npm run comfy:start -- -LowVram -UnloadLMStudio   # 16 GB GPU + LM Studio loaded
108|npm run comfy:stop               # ComfyUI only — does NOT kill LM Studio
109|npm run comfy:restart
110|npm run comfy:status
111|```
112|
113|**Agent rule:** Never auto-start ComfyUI unless Jon asks or `JONBEATZ_COMFYUI_AUTO_START=1`. See `.cursor/rules/image-workflow.mdc`.
114|
115|### Web UI
116|
117|http://127.0.0.1:8188 — drag workflow PNGs to load graphs; debug node execution visually.
118|
119|### Default local txt2img workflow
120|
121|- **Workflow:** `D:\AI_Models\ComfyUI\workflows\txt2img-gen-image-local.json`
122|- **Model:** z-image-turbo GGUF + Qwen3-4B CLIP + ae.safetensors VAE
123|- **Profile command:** `gen-image-local "prompt"`
124|
125|### Edit / inpaint / upscale / video
126|
127|Requires ComfyUI running. Use profile `edit-image`, `inpaint-image`, `upscale-image`, `generate-video`, `animate-image` — see cheat sheet above.
128|
129|---
130|
131|## C. Complete recipe examples
132|
133|### 1. Cloud generate → local upscale
134|
135|```powershell
136|npm run image:gen -- "mountain landscape at sunset"
137|npm run comfy:start
138|# Then in profile or agent: upscale-image -InputPath "D:\Hermes\projects\JonBeatz\public\media\generated-*.png" -TargetSize 4K
139|npm run comfy:stop
140|```
141|
142|### 2. Local generate → edit → stop ComfyUI
143|
144|```powershell
145|npm run comfy:start
146|gen-image-local "futuristic studio desk, photorealistic"
147|edit-image -InputPath "D:\Hermes\projects\JonBeatz\public\media\generated-local-*.png" -Prompt "add gold accent lighting" -Strength 0.45
148|npm run comfy:stop
149|```
150|
151|### 3. Mem0 + image session
152|
153|After a good prompt/style Jon wants to reuse:
154|
155|```powershell
156|npm run mem0:add -- "Preferred image style: gold accent studio lighting, photorealistic 4k, FLUX cloud"
157|```
158|
159|---
160|
161|## D. Model & path reference
162|
163|| Resource | Path |
164||----------|------|
165|| ComfyUI engine | `D:\AI_Models\ComfyUI\` |
166|| Workflows | `D:\AI_Models\ComfyUI\workflows\` |
167|| Model cache (H:) | `H:\AI_Models\` |
168|| JonBeatz outputs | `D:\Hermes\projects\JonBeatz\public\media\` |
169|| MSC outputs (website) | `D:\Cursor_Projectz\MyStudioChannel\public\media\` |
170|| Restore symlinks | `D:\AI_Models\ComfyUI\scripts\repair-comfyui-symlinks.ps1` |
171|| Download SD1.5 fp16 | `hf download Comfy-Org/stable-diffusion-v1-5-archive v1-5-pruned-emaonly-fp16.safetensors` → checkpoints folder |
172|
173|See **[COMFYUI-MODELS.md](./COMFYUI-MODELS.md)** for full model matrix.
174|
175|---
176|
177|## E. Troubleshooting
178|
179|| Issue | Fix |
180||-------|-----|
181|| `HF_TOKEN not configured` | `npm run env:setup` then set token in `.env.local` |
182|| ComfyUI not reachable | `npm run comfy:start` then open :8188 |
183|| CUDA OOM | `npm run comfy:stop`; use `-LowVram`; reduce resolution; unload LM Studio |
184|| Missing checkpoint | Run restore scripts; see COMFYUI-MODELS.md |
185|| Wrong output folder | Check `IMAGE_OUTPUT_DIR` in `.env.local` |
186|
187|---
188|
189|## F. Agent instructions
190|
191|1. Read **this file** before any image/video task in JonBeatz.
192|2. Run **`npm run image:doctor`** if env or ComfyUI state is unclear.
193|3. **Cloud first** unless Jon says local/GPU/ComfyUI.
194|4. **Stop ComfyUI** when done (`npm run comfy:stop`) to free VRAM for LM Studio / Mem0.
195|5. Save outputs under **`public/media/`** for personal work. This keeps assets served root-relatively by Next.js.
196|6. Log reusable prompts/styles to **Mem0** + **ReCall.md**.
197|
198|---
199|
200|*Last updated: 2026-06-19 · JonBeatz v1.2 image workflow layer*
201|

---

## --- Source: MCP-SETUP.md ---

1|# MCP setup — JonBeatz Personal
2|
3|How Model Context Protocol servers are configured for **JonBeatz** and Jon's global Cursor profile.
4|
5|**Related:** `.env.local.example`, `npm run sync:mcp-env`, `.cursor/skills/Premium-UI/SKILL.md`
6|
7|**Last updated:** 2026-06-19
8|
9|---
10|
11|## Three MCP channels
12|
13|| Channel | Config | JonBeatz |
14||---------|--------|----------|
15|| **Global manual MCPs** | `%USERPROFILE%\.cursor\mcp.json` | github, tavily, playwright, fetch, Hostinger ×4, etc. |
16|| **Project manual MCPs** | `.cursor/mcp.json` in repo (gitignored — copy from `mcp.json.example`) | **5 servers** (see table below) |
17|| **Workspace / plugin MCPs** | Cursor Settings → MCP, marketplace | cursor-ide-browser, Stripe, Vercel, Firebase — no JSON in repo |
18|
19|**Merge rule:** Cursor loads global + project. If the same server name exists in both, **project wins**.
20|
21|**Registered vs configured:** A server in `mcp.json` only works when **enabled** in **Cursor Settings → MCP** and successfully started. After edits, refresh the server or restart Cursor.
22|
23|---
24|
25|## Health check
26|
27|```powershell
28|cd D:\Hermes\projects\JonBeatz
29|npm run sync:mcp-env
30|```
31|
32|| Check | Pass means |
33||-------|------------|
34|| `sync:mcp-env` | Project keys from `.env.local` written to `.cursor/mcp.json` |
35|| Settings → MCP | Project servers toggled **on** (not auto-enabled from git alone) |
36|
37|---
38|
39|## Secrets workflow
40|
41|**Never commit real API keys** in `.cursor/mcp.json` (file is **gitignored**). Template: **`.cursor/mcp.json.example`**. First setup: `Copy-Item .cursor/mcp.json.example .cursor/mcp.json`
42|
43|1. Put secrets in **`.env.local`** (gitignored) — see **`.env.local.example`**
44|2. Sync:
45|
46|   ```powershell
47|   npm run sync:mcp-env
48|   ```
49|
50|3. **Reload MCP** — Cursor Settings → MCP → refresh each server
51|
52|### What `sync:mcp-env` syncs
53|
54|| Server | `.env.local` keys | Notes |
55||--------|-------------------|-------|
56|| **21st-dev-magic** | `21ST_DEV_MAGIC_API_KEY` → MCP `API_KEY` | shadcn-style component generation |
57|| **browserbase** | `BROWSERBASE_API_KEY`, `BROWSERBASE_PROJECT_ID` | Cloud browser |
58|| **composio** | `COMPOSIO_API_KEY` | Optional — use `ck_` consumer key from composio.dev |
59|| **markdownify** | — | No secrets |
60|| **pencil** | — | Pencil desktop app must be running |
61|
62|---
63|
64|## Project servers (`.cursor/mcp.json`)
65|
66|| Server | Purpose | Ready when |
67||--------|---------|------------|
68|| **21st-dev-magic** | Generate UI components into workspace | API key synced + MCP enabled |
69|| **markdownify** | Web/PDF/images → Markdown | MCP enabled |
70|| **browserbase** | Cloud browser + Stagehand | Keys synced + MCP enabled |
71|| **pencil** | Design canvas → code | Pencil app running + MCP enabled |
72|| **composio** | Social/tool connectors (optional) | Key synced; disable in Settings if unused |
73|
74|---
75|
76|## Browser QA playbook
77|
78|| Task | Tool |
79||------|------|
80|| Local Playground smoke | **cursor-ide-browser** MCP or `http://localhost:3000` |
81|| Scripted automation | Global **playwright** MCP |
82|| Cloud / Stagehand | Project **browserbase** |
83|
84|Do **not** duplicate browser MCPs unnecessarily.
85|
86|---
87|
88|## Adding a new project MCP
89|
90|1. Add server block to `.cursor/mcp.json` with `REPLACE_WITH_*` placeholders
91|2. Document keys in `.env.local.example`
92|3. Extend `scripts/sync-mcp-env.mjs` if secrets are required
93|4. Document here and in `MASTER-COMMANDS.md`
94|5. Run `npm run sync:mcp-env` and refresh MCP in Cursor
95|
96|---
97|
98|## Global MCPs (outside this repo)
99|
100|Managed in `%USERPROFILE%\.cursor\mcp.json` — never committed.
101|
102|```powershell
103|cd D:\Hermes\projects\JonBeatz
104|npm run sync:mcp-env
105|```
106|
107|### Global servers synced from JonBeatz `.env.local`
108|
109|| Server | `.env.local` key | Purpose |
110||--------|------------------|---------|
111|| `github` | `GITHUB_PERSONAL_ACCESS_TOKEN` | Repos, issues, PRs |
112|| `tavily` | `TAVILY_API_KEY` | Web search |
113|| `hostinger-hosting` | `HOSTINGER_API_TOKEN` | JS deployments, hosting API |
114|| `hostinger-vps` | same token | VPS management |
115|| `hostinger-domains` | same token | Domain management |
116|| `hostinger-dns` | same token | DNS records |
117|
118|**Hostinger launcher:** `scripts/jonbeatz-hostinger-mcp.mjs` copied to `~/.cursor/scripts/` on sync. Uses scoped bins — **not** the default 129-tool `hostinger-api-mcp` server.
119|
120|**Useful MCP tools:** `hosting_listJsDeployments`, `hosting_deployJsApplication`, `hosting_showJsDeploymentLogs`.
121|
122|**Deploy scripts** (`pushit:live`, `msc:hostinger:*`) still run from **MyStudioChannel** — see `.cursor/docs/HOSTINGER-REFERENCE.md`.
123|
124|---
125|
126|## Hostinger reference (JonBeatz)
127|
128|| Doc | Purpose |
129||-----|---------|
130|| `HOSTINGER-REFERENCE.md` | When to switch to MSC, deploy tiers, env keys |
131|| `PITFALLS-HOSTINGER.md` | 503, fast-deploy traps, MCP zip warning |
132|| `Hostinger-Ops` skill | Agent deploy/MCP guidance |
133|| `Hostinger-MSC.md` prompt | "push it live" workspace switch ritual |
134|
135|**Profile boundary:** JonBeatz project MCPs are for **personal** work. MSC website deploy runs from `D:\Cursor_Projectz\MyStudioChannel` unless Jon explicitly opens that repo.
136|

---

## --- Source: VRAM-IMAGE.md ---

1|# VRAM + ComfyUI — JonBeatz Playbook
2|
3|**GPU:** RTX 5060 Ti (16 GB) · **LM Studio** (:1234) + **ComfyUI** (:8188) share VRAM.
4|
5|Full MSC playbook: `D:\Cursor_Projectz\MyStudioChannel\.cursor\docs\VRAM-TROUBLESHOOTING.md`
6|
7|---
8|
9|## Golden rules
10|
11|1. **Never auto-start ComfyUI** in JonBeatz unless Jon asks or `JONBEATZ_COMFYUI_AUTO_START=1`.
12|2. **Cloud first:** use `npm run image:gen` (HF FLUX) when LM Studio is loaded — zero local VRAM.
13|3. **Stop when done:** `npm run comfy:stop` frees GPU for Mem0 / LM Studio.
14|4. **Do not run** large LM Studio model + ComfyUI without Jon confirming on 16 GB.
15|
16|---
17|
18|## Commands
19|
20|| Situation | Command |
21||-----------|---------|
22|| Start ComfyUI (explicit) | `npm run comfy:start` |
23|| Start with LM Studio unload | `npm run comfy:start -- -LowVram -UnloadLMStudio` |
24|| Stop ComfyUI only | `npm run comfy:stop` |
25|| Restart after model install | `npm run comfy:restart` |
26|| Check state | `npm run comfy:status` |
27|| MSC full VRAM diag | From MSC repo: `npm run msc:vram:diag` |
28|| MSC emergency cleanup | From MSC: `powershell -File .cursor/custom-scriptz/vram-cleanup.ps1` |
29|
30|---
31|
32|## Thresholds (`.env.local`)
33|
34|| Variable | Default | Meaning |
35||----------|---------|---------|
36|| `VRAM_WARN_PERCENT` | 65 | Warn before ComfyUI start |
37|| `VRAM_BLOCK_MB` | 10240 | Block start if total VRAM used > ~10 GB |
38|
39|---
40|
41|## ComfyUI states
42|
43|| State | Meaning |
44||-------|---------|
45|| **stopped** | Port 8188 not listening |
46|| **idle** | Running, empty queue |
47|| **generating** | Active job |
48|| **unknown** | Booting — wait and recheck |
49|
50|Web UI: http://127.0.0.1:8188  
51|Audit log (MSC repo): `logs/comfyui.log`
52|
53|---
54|
55|## When VRAM is stuck
56|
57|1. `npm run comfy:stop`
58|2. If still high: `lms unload --all` (LM Studio)
59|3. If still high: MSC `vram-cleanup.ps1` (kills ComfyUI + LM Studio python)
60|
61|---
62|
63|*JonBeatz agents: see `.cursor/rules/image-workflow.mdc`*
64|

---

## --- Source: MEM0-LMSTUDIO.md ---

1|# Mem0 + LM Studio — JonBeatz Personal Memory
2|
3|How local memory works in this profile and what agents must know before add/search.
4|
5|---
6|
7|## Architecture
8|
9|```
10|Jon / Agent
11|    │
12|    ▼
13|npm run mem0:add / mem0:search
14|    │
15|    ▼
16|scripts/mem0-chat.ps1  →  mem0-preflight.ps1 (LM Studio)
17|    │
18|    ▼
19|scripts/***.py  →  Mem0 OSS (Qdrant local)
20|    │
21|    ├── LLM: LM Studio http://127.0.0.1:1234/v1  (qwen3-4b-instruct-2507)
22|    └── Vector store: %USERPROFILE%\.mem0\qdrant_personal
23|```
24|
25|---
26|
27|## Identity (do not change casually)
28|
29|| Key | Value |
30||-----|-------|
31|| **user_id** | `jonbeatz_personal` |
32|| **collection** | `jonbeatz_personal_memories` |
33|| **qdrant path** | `%USERPROFILE%\.mem0\qdrant_personal` |
34|| **Config file** | `hermes-desktop-profile.json` → `mem0` block |
35|
36|MSC uses a **separate** store — never mix slugs or user IDs.
37|
38|---
39|
40|## Preflight (always before add/search)
41|
42|```powershell
43|npm run mem0:preflight
44|```
45|
46|This loads **`qwen3-4b-instruct-2507`** with **16384 context** and **parallel 1** (~3.5–4 GB VRAM) via `lms` CLI. Required for **search** and for **`mem0:add:infer`** (LLM fact extraction). Standard **`mem0:add`** uses `infer=False` and only needs the local HuggingFace embedder.
47|
48|If preflight fails:
49|1. Open LM Studio → Local Server → start on port **1234**
50|2. Ensure `lms` is on PATH
51|3. Re-run preflight
52|
53|---
54|
55|## Commands
56|
57|```powershell
58|# Search (agent cold-start)
59|npm run mem0:search -- "current priorities"
60|
61|# Save session takeaway (direct storage — default)
62|npm run mem0:add -- "Completed Profile Jedi GitHub setup and JonBeatz agent docs."
63|
64|# Save with LLM fact extraction (optional; 16384 ctx for larger memory banks)
65|npm run mem0:add:infer -- "Long conversational note for LLM to distill into facts."
66|
67|# List all
68|npm run mem0:list
69|```
70|
71|Python direct:
72|```powershell
73|python scripts/***.py --action add --text "Direct storage note"
74|python scripts/***.py --action add --text "Infer note" --infer
75|python scripts/***.py --action search --query "Profile Jedi"
76|```
77|
78|---
79|
80|## infer=True vs infer=False
81|
82|| Mode | Command | When | Notes |
83||------|---------|------|-------|
84|| **infer=False** (default) | `mem0:add` | Session takeaways, docs sync | Direct storage; reliable with 13+ memories |
85|| **infer=True** | `mem0:add:infer` | Short natural notes | LLM extracts facts; needs LM Studio; 16384 ctx handles larger memory banks |
86|
87|`mem0:add` defaults to **infer=False** since v1.3.1 to prevent silent failures when the memory bank exceeds the LM Studio context window.
88|
89|---
90|
91|## Seeded knowledge
92|
93|`scripts/seed-profile-jedi-memories.py` — Profile Jedi / Hermes switcher reference memories (10 entries). Re-run after major doc updates:
94|
95|```powershell
96|npm run mem0:seed:profile-jedi
97|```
98|
99|---
100|
101|## Troubleshooting
102|
103|| Symptom | Fix |
104||---------|-----|
105|| "LM Studio endpoint not online" | Start local server on 1234; run preflight |
106|| "No models loaded" | `npm run mem0:preflight` |
107|| Empty search after add | Wait 2–3s; verify `user_id` is `jonbeatz_personal` |
108|| "Memory recorded" but nothing stored | Fixed in v1.3.1 — `mem0:add` now uses `infer=False` by default |
109|| Context length error on add | Use `mem0:add` (infer=False) or `mem0:add:infer` only for short notes |
110|
111|---
112|
113|## Agent checklist (memory tasks)
114|
115|1. `npm run mem0:preflight`
116|2. `npm run mem0:search -- "<topic>"` before planning
117|3. `npm run mem0:add -- "<takeaway>"` at end of significant work
118|

---

## --- Source: Agent-Runbook.md ---

1|# Agent Runbook — JonBeatz Personal Profile
2|
3|Copy/paste prompts for consistent Cursor sessions.
4|
5|**Profile root:** `D:\Hermes\projects\JonBeatz`
6|
7|---
8|
9|## Operator handshake (required)
10|
11|**Operator:** Jon
12|
13|- Startup: **"Ok Jon — JonBeatz personal profile loaded, ready."**
14|- Continue: **"Ok Jon — personal context restored."**
15|- Closeout: **"Great work Jon — personal session saved."**
16|
17|---
18|
19|## 1) Start Project (full cold boot)
20|
21|```text
22|Start Project
23|
24|Profile root: D:\Hermes\projects\JonBeatz
25|Operator: Jon. Handshake: "Ok Jon — JonBeatz personal profile loaded, ready."
26|
27|Run npm run session:start from profile root.
28|
29|Read in order (use Read tool, not memory):
30|1) TRUTH.md
31|2) .cursor/docs/START-HERE.md
32|3) .cursor/docs/MEM0-LMSTUDIO.md
33|4) .cursor/docs/IMAGE-WORKFLOW.md (if image/creative work)
34|5) .cursor/docs/ReCall.md
35|6) .cursor/docs/Checkpoint.md
36|
37|Then:
38|- npm run mem0:search -- "current priorities" (if LM Studio up)
39|- npm run image:doctor (if image work planned)
40|- git status (if repo initialized)
41|
42|Print session card:
43|- LM Studio :1234
44|- Mem0 store path + memory count hint
45|- Google API :4000 / ngrok :4040
46|- Profile Jedi :7780 / tray :7781
47|- ComfyUI :8188 (only if started)
48|- ReCall "Current Focus" (2–4 bullets)
49|
50|Ask: "What do you want to work on today?"
51|Do NOT open MSC deploy or Hostinger unless I say so.
52|```
53|
54|---
55|
56|## 2) Ready to begin (docs only, lighter)
57|
58|```text
59|Ready to begin — JonBeatz personal.
60|
61|Read TRUTH.md, START-HERE.md, ReCall.md.
62|Run npm run doctor.
63|Handshake + ReCall summary + ask what to work on.
64|```
65|
66|---
67|
68|## 3) End Project
69|
70|```text
71|End Project
72|
73|Follow .cursor/prompts/End-Project.md:
74|- Summarize what we did
75|- Update ReCall.md and project-log.md
76|- npm run mem0:add -- "<one-line session takeaway>" if significant
77|- npm run session:stop
78|Handshake: "Great work Jon — personal session saved."
79|```
80|
81|---
82|
83|## 4) Mem0 recall
84|
85|```text
86|Search my personal Mem0 for everything about [topic].
87|Run npm run mem0:preflight first, then mem0:search.
88|Summarize top matches for Jon.
89|```
90|
91|---
92|
93|## 5) Update docs
94|
95|```text
96|update docs
97|
98|Run npm run docs:sync.
99|Align TRUTH.md, START-HERE.md, ReCall.md with any changes from this session.
100|```
101|
102|---
103|
104|## 6) Image workflow (Hugging Face + ComfyUI)
105|
106|```text
107|Image task — JonBeatz personal profile.
108|
109|Read .cursor/docs/IMAGE-WORKFLOW.md first.
110|Run npm run image:doctor.
111|
112|If cloud still (no VRAM): npm run image:gen -- "[prompt]"
113|If local GPU / edit / upscale / video:
114|  npm run comfy:start
115|  use profile commands (gen-image-local, edit-image, etc.)
116|  npm run comfy:stop when done
117|
118|Save outputs to output/media/ unless I say otherwise.
119|Log good prompts to Mem0.
120|```
121|
122|---
123|
124|| Tag | Where |
125||-----|-------|
126|| **Local (JonBeatz profile root)** | `D:\Hermes\projects\JonBeatz` — npm, mem0, session scripts |
127|| **MSC repo** | `D:\Cursor_Projectz\MyStudioChannel` — website, deploy, Kanban |
128|| **Live (Hostinger)** | Only when explicitly working in MSC deploy context |
129|

---

## --- Source: MASTER-COMMANDS.md ---

1|# JonBeatz — Master Command Reference
2|
3|**Profile root:** `D:\Hermes\projects\JonBeatz`  
4|**Last updated:** 2026-06-20 · **Version:** 2.0.0
5|
6|---
7|
8|## Session rituals
9|
10|| Command | What it does | When |
11||---------|--------------|------|
12|| `npm run dev` | Launch Next.js local Playground UI on **localhost:3000** | Anytime |
13|| `npm run build` | Compile Playground UI static files | Prior to ship |
14|| `npm run session:start` | LM Studio preflight + service probes | **Start Project** |
15|| `npm run session:start -- -Full` | Mem0 + Google stack + image doctor | Heavy session |
16|| `npm run session:start -- -WithGoogle` | Also start LiteLLM if down | Google tasks |
17|| `npm run session:stop` | Session closeout summary | **End Project** |
18|| `npm run session:stop -- -StopGoogleApi -StopComfy` | Also stop Google + ComfyUI | End + free VRAM |
19|| `npm run doctor` | **Unified** health: services, env, image, Google, git | Anytime |
20|
21|---
22|
23|## Mem0 (personal memory)
24|
25|| Command | What it does |
26||---------|--------------|
27|| `npm run mem0:preflight` | Load `qwen3-4b-instruct-2507` @ 16384 ctx for Mem0 |
28|| `npm run mem0:add -- "text"` | Add memory directly (`infer=False`, reliable) |
29|| `npm run mem0:add:infer -- "text"` | Add memory with LLM fact extraction (`infer=True`) |
30|| `npm run mem0:search -- "query"` | Semantic search personal memory |
31|| `npm run mem0:list` | List all personal memories |
32|| `npm run mem0:seed:profile-jedi` | Re-seed Profile Jedi knowledge (infer=False) |
33|
34|**Requires:** LM Studio local server on **port 1234**.
35|
36|---
37|
38|## Image workflow (Hugging Face + ComfyUI)
39|
40|| Command | What it does |
41||---------|--------------|
42|| `npm run env:setup` | Create `.env.local` from template; merge HF_TOKEN from MSC if present |
43|| `npm run image:doctor` | Verify HF_TOKEN, ComfyUI paths, Python deps, output dir |
44|| `npm run image:gen -- "prompt"` | Cloud FLUX.1-schnell → `output/media/` |
45|| `npm run image:gen:open -- "prompt"` | Same + open in default viewer |
46|| `npm run comfy:start` | Start shared ComfyUI (:8188) with VRAM guards |
47|| `npm run comfy:stop` | Stop ComfyUI only (keeps LM Studio) |
48|| `npm run comfy:restart` | Restart ComfyUI |
49|| `npm run comfy:status` | JSON: port, queue, PIDs |
50|| `npm run comfy:idle-watcher` | MSC idle watcher daemon (suggest stop after 15m idle) |
51|
52|**Docs:** [IMAGE-WORKFLOW.md](./IMAGE-WORKFLOW.md) · [COMFYUI-MODELS.md](./COMFYUI-MODELS.md) · [VRAM-IMAGE.md](./VRAM-IMAGE.md)
53|
54|**Profile commands** (PowerShell profile, require ComfyUI): `gen-image-local`, `edit-image`, `inpaint-image`, `upscale-image`, `generate-video`, `animate-image`.
55|
56|---
57|
58|## Hermes & Google API
59|
60|| Command | What it does |
61||---------|--------------|
62|| `npm run desktop` | Launch Hermes Desktop (JonBeatz profile) |
63|| `npm run deepseek:ngrok` | Start DeepSeek/LiteLLM stack (with ngrok for Cursor Agent) |
64|| `npm run stop` | Stop Google API stack |
65|| `npm run google:doctor` | OAuth token + LiteLLM + setup.py --check |
66|| `npm run google:status` | JSON status for agents |
67|
68|**Docs:** [GOOGLE-WORKSPACE.md](./GOOGLE-WORKSPACE.md)
69|
70|Google API scripts delegate to `D:\Hermes\projects\_core-scripts\deepseek-api\scripts\` (google-api archived to `_archive/`).
71|
72|---
73|
74|## Logging & maintenance
75|
76|| Command | What it does |
77||---------|--------------|
78|| `npm run log:session -- "summary"` | Append to `project-log.md` |
79|| `npm run log:fix` | Append to `ISSUES-RESOLVED.md` (interactive) |
80|| `npm run log:fix -- --issue "..." --cause "..." --solution "..."` | Non-interactive fix log |
81|| `npm run backup:project` | Interactive backup (Standard or Full, robocopy) |
82|| `npm run backup:standard` | Standard backup — skips node_modules, .next, output, logs |
83|| `npm run backup:full` | Full mirror — includes everything |
84|| `npm run backup:quick` | Standard quick — auto `jonbeatz-project-v{N}-{a-z}`, no prompts |
85|| `npm run backup:quick:full` | Full quick — auto folder name, no prompts |
86|| `npm run backup:profile` | Alias for `backup:quick` (legacy phrase) |
87|| `npm run backup:clean` | Retain 10 newest `jonbeatz-project-v*` folders |
88|| `npm run python:setup` | `pip install -r requirements.txt` |
89|| `npm run draven:speak -- "text"` | J.A.R.V.I.S. TTS |
90|| `npm run env:setup` | Create / refresh `.env.local` |
91|| `npm run dev:recover` | Free port 3000, clear `.next`/cache, `npm install`, `npm run dev` |
92|| `npm run sync:mcp-env` | Sync project MCP keys from `.env.local` → `.cursor/mcp.json` |
93|| `npm run obsidian:distill` | Scan `I:\Vader_Vault` for weekly ReCall.md candidate notes |
94|
95|---
96|
97|## Playground UI
98|
99|| Command | What it does |
100||---------|--------------|
101|| `npm run dev` | Playground UI @ **localhost:3000** |
102|| `npm run build` | Production build gate |
103|| `npm run dev:recover` | Hard recovery when stale `.next` or port conflict |
104|
105|---
106|
107|## MCP (project)
108|
109|See **`.cursor/docs/MCP-SETUP.md`**. After editing `.env.local` MCP keys: `npm run sync:mcp-env` → reload Cursor Settings → MCP.
110|
111|---
112|
113|## Hostinger (MSC reference)
114|
115|See **`.cursor/docs/HOSTINGER-REFERENCE.md`**. Deploy runs from MSC repo; MCP + docs available here.
116|
117|| Command | What it does |
118||---------|--------------|
119|| `npm run sync:mcp-env` | Sync project + **global** MCP (github, tavily, hostinger-*) |
120|
121|| Command | What it does |
122||---------|--------------|
123|| `npm run docs:sync` | Audit TRUTH / START-HERE / ReCall alignment |
124|| `npm run docs:update` | Same as `docs:sync` (Cursor hook alias) |
125|
126|---
127|
128|## VS Code tasks (keyboard shortcuts)
129|
130|Open **`JonBeatz.code-workspace`** or folder `JonBeatz` in Cursor.
131|
132|| Shortcut | Task | npm script |
133||----------|------|------------|
134|| **Ctrl+Shift+B** | Start Session | `session:start` |
135|| **Ctrl+Shift+E** | End Session | `session:stop` |
136|| **Ctrl+Shift+Alt+D** | Doctor | `doctor` |
137|| **Ctrl+Shift+Alt+M** | Search Mem0 | `mem0:search` (prompt) |
138|
139|One-time install into Cursor user keybindings:
140|
141|```powershell
142|npm run vscode:keybindings
143|```
144|
145|Bindings apply only when `workspaceFolderBasename == 'JonBeatz'` (Explorer shortcut unchanged in other projects).
146|
147|Run any task: **Ctrl+Shift+P** → **Tasks: Run Task**.
148|
149|## Direct PowerShell (when npm wrappers aren't enough)
150|
151|```powershell
152|# Mem0 via Python
153|python scripts/***.py --action search --query "priorities"
154|
155|# Hermes desktop launcher
156|powershell -File scripts/start-hermes-desktop-jonbeatz.ps1
157|
158|# Google API (portable Hermes home)
159|powershell -File D:\Hermes\projects\_core-scripts\deepseek-api\scripts\start-deepseek.ps1
160|```
161|
162|---
163|
164|## Ports (personal stack)
165|
166|| Port | Service |
167||------|---------|
168|| 1234 | LM Studio (Mem0 LLM + embedder host) |
169|| 4000 | LiteLLM |
170|| 4040 | ngrok inspector |
171|| 7780 | Profile Jedi app |
172|| 7781 | Profile Jedi tray supervisor |
173|
174|MSC Kanban ports (3001/3005/9119) live in the **MyStudioChannel** repo — not started by default here.
175|
176|---
177|
178|## Cursor chat triggers
179|
180|| Say this | Agent runs |
181||----------|------------|
182|| **Start Project** / **Start Session** | `session:start` + Start-Project.md |
183|| **End Project** / **End Session** | End-Project.md + `session:stop` |
184|| **update docs** | `docs:sync` / Update-Docs.md |
185|| **backup profile** / **backup quick** | `backup:quick` |
186|| **backup project** | `backup:project` |
187|| **backup full** | `backup:quick:full` |
188|
189|See **[Agent-Runbook.md](./Agent-Runbook.md)** for full copy/paste prompts.
190|

---

## --- Source: Custom-Prompts.md ---

1|# Custom Prompts — JonBeatz Personal Cheat Sheet
2|
3|**Profile root:** `D:\Hermes\projects\JonBeatz`  
4|Copy/paste phrases for Cursor chat. Agents map these to scripts and docs.
5|
6|---
7|
8|## Session rituals
9|
10|| Say this | Agent does |
11||----------|------------|
12|| **Start Project** / **Start Session** / **Cold Start** | `session:start` + Start-Project.md + read TRUTH/START-HERE/ReCall |
13|| **End Project** / **End Session** | End-Project.md + `session:stop` + update logs |
14|| **update docs** | Update-Docs.md + `docs:sync` |
15|| **update docs and mem0** | Update-Docs + Mem0 summary add |
16|| **postflight personal** | `doctor` + report all service ports |
17|| **Update Project** / **Sync Project** | Update-Project.md + git-log sync to project-log/Checkpoint |
18|| **dev recover** / **fix playground** | `npm run dev:recover` |
19|| **sync mcp** | `npm run sync:mcp-env` + reload Cursor MCP |
20|
21|---
22|
23|## Hostinger (MSC website — reference from JonBeatz)
24|
25|| Say this | Agent does |
26||----------|------------|
27|| **hostinger reference** | `HOSTINGER-REFERENCE.md` + `PITFALLS-HOSTINGER.md` |
28|| **push it live** / **deploy msc** / **deploy website** | `Hostinger-MSC.md` — confirm MSC repo open |
29|| **sync hostinger mcp** | `sync:mcp-env` (global hostinger-* + project MCPs) |
30|| **open msc deploy** | Point to `D:\Cursor_Projectz\MyStudioChannel` + `HOSTINGER-DEPLOY.md` |
31|
32|Deploy **commands** run from MSC repo. MCP + docs available from JonBeatz.
33|
34|---
35|
36|## Memory (Mem0)
37|
38|| Say this | Agent does |
39||----------|------------|
40|| **mem0 search** [topic] | `mem0:preflight` then `mem0:search` |
41|| **remember this** [text] | `mem0:add` |
42|| **what do you know about** [topic] | Mem0 search + ReCall |
43|
44|---
45|
46|## Image workflow
47|
48|| Say this | Agent does |
49||----------|------------|
50|| **image cloud** [prompt] | `image:gen` (HF FLUX, zero VRAM) |
51|| **image local** [prompt] | `comfy:start` + `gen-image-local` |
52|| **comfy start** | `npm run comfy:start` |
53|| **comfy stop** | `npm run comfy:stop` |
54|| **image doctor** | `npm run image:doctor` |
55|| **upscale** / **edit image** | Read IMAGE-WORKFLOW.md, ComfyUI profile commands |
56|
57|---
58|
59|## Google Workspace
60|
61|| Say this | Agent does |
62||----------|------------|
63|| **google doctor** | `google:doctor` |
64|| **start deepseek stack** | `npm run deepseek:ngrok` |
65|| **stop google stack** | `npm run stop` |
66|| **check my email** / **calendar** | GOOGLE-WORKSPACE.md + Hermes skill |
67|
68|---
69|
70|## Maintenance
71|
72|| Say this | Agent does |
73||----------|------------|
74|| **backup profile** / **backup quick** | `npm run backup:quick` |
75|| **backup project** | `npm run backup:project` (interactive) |
76|| **backup full** | `npm run backup:quick:full` |
77|| **log session** [summary] | `npm run log:session -- "..."` |
78|| **log fix** | `npm run log:fix` or ISSUES-RESOLVED entry |
79|| **env setup** | `npm run env:setup` |
80|| **python setup** | `npm run python:setup` |
81|| **speak** [text] | `npm run draven:speak -- "..."` |
82|
83|---
84|
85|## Session start modes (terminal)
86|
87|```powershell
88|npm run session:start                    # default: Mem0 preflight + probes
89|npm run session:start -- -Full           # Mem0 + Google stack + image doctor
90|npm run session:start -- -WithGoogle     # also start LiteLLM if down
91|npm run session:start -- -ImageDoctor    # include image:doctor
92|npm run session:start -- -SkipMem0       # probes only
93|```
94|
95|---
96|
97|## Boundaries (always)
98|
99|- **JonBeatz** = personal (this folder)
100|- **MyStudioChannel** = website / deploy — say "switch to MSC" explicitly
101|- **Profile Jedi** = profile switcher UI at :7780
102|
103|---
104|
105|*Version 1.3 · See MASTER-COMMANDS.md for full command table*
106|

---

