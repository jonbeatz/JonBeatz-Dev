# Engineering & Technical Workflows

## --- Source: COMFYUI-MODELS.md ---

# ComfyUI Model Library — JonBeatz (shared workstation)

**Hardware:** NVIDIA RTX 5060 Ti (16 GB VRAM)  
**ComfyUI:** `D:\AI_Models\ComfyUI\` · port **8188**  
**Workflows:** `D:\AI_Models\ComfyUI\workflows\`  
**Full MSC inventory:** `D:\Cursor_Projectz\MyStudioChannel\.cursor\docs\COMFYUI-MODELS.md`

JonBeatz uses the **same ComfyUI install** as MyStudioChannel. Models live on `H:\AI_Models\` and symlink into ComfyUI.

---

## Quick switch guide

| Goal | Workflow | Command |
|------|----------|---------|
| Fast local default | `txt2img-gen-image-local.json` | `gen-image-local "prompt"` |
| Flux.1-dev quality | `txt2img-flux-dev.json` | ComfyUI / test script |
| Flux.2 Klein 4B | `txt2img-flux-klein.json` | ComfyUI / test script |
| SDXL | `txt2img-sdxl.json` | ComfyUI / test script |
| Photorealism | `txt2img-realism.json` | ComfyUI / test script |
| Anime | `txt2img-anime.json` | ComfyUI / test script |
| img2img | `img2img.json` | `edit-image` |
| inpaint | `inpaint.json` | `inpaint-image` |

```powershell
# Smoke test all workflows
powershell -File D:\AI_Models\ComfyUI\scripts\test-comfyui-workflows.ps1

# Repair symlinks
powershell -File D:\AI_Models\ComfyUI\scripts\repair-comfyui-symlinks.ps1

# Re-download deleted weights
powershell -File D:\AI_Models\ComfyUI\scripts\restore-comfyui-models.ps1
```

---

## Primary models (installed)

| Model | Role | Path hint |
|-------|------|-----------|
| **z-image-turbo** Q4_K_M | Default local txt2img | `H:\AI_Models\unsloth\Z-Image-Turbo-GGUF\` |
| **Qwen3-4B-Instruct** Q4_K_M | CLIP for z-image | `H:\AI_Models\unsloth\Qwen3-4B-Instruct-2507-GGUF\` |
| **ae.safetensors** | VAE (Flux/Z) | `ComfyUI\models\vae\` |
| **Flux.2 Klein 4B** | Fast Flux | `H:\AI_Models\unsloth\FLUX.2-klein-4B-GGUF\` |
| **Flux.1-dev** Q4_K_S | Quality Flux | `H:\AI_Models\comfyui_cache\unet\` |
| **SD 1.5 fp16** | ComfyUI default UI | `checkpoints\v1-5-pruned-emaonly-fp16.safetensors` |
| **4x-UltraSharp / AnimeSharp** | Upscale | `H:\AI_Models\comfyui_cache\upscale_models\` |

Download SD 1.5 fp16 (requires `HF_TOKEN` in JonBeatz `.env.local`):

```powershell
cd D:\Hermes\projects\JonBeatz
hf download Comfy-Org/stable-diffusion-v1-5-archive v1-5-pruned-emaonly-fp16.safetensors --local-dir "D:\AI_Models\ComfyUI\ComfyUI\models\checkpoints"
```

---

## JonBeatz control commands

| Command | Action |
|---------|--------|
| `npm run comfy:start` | Start ComfyUI (VRAM guards) |
| `npm run comfy:stop` | Stop ComfyUI only |
| `npm run comfy:status` | JSON state |
| `npm run image:doctor` | Env + ComfyUI health |

See **[IMAGE-WORKFLOW.md](./IMAGE-WORKFLOW.md)** and **[VRAM-IMAGE.md](./VRAM-IMAGE.md)**.


---

## --- Source: IMAGE-WORKFLOW.md ---

# Image Workflow — JonBeatz Complete Guide

**Profile root:** `D:\Hermes\projects\JonBeatz`  
**Canonical model inventory:** [COMFYUI-MODELS.md](./COMFYUI-MODELS.md)  
**VRAM playbook:** [VRAM-IMAGE.md](./VRAM-IMAGE.md)  
**Environment:** `.env.local` (from `.env.local.example` — run `npm run env:setup`)

This is the **JonBeatz agent source of truth** for Hugging Face cloud generation + local ComfyUI editing, upscaling, and video.

---

## Two pipelines (when to use which)

| Goal | Pipeline | VRAM | Speed |
|------|----------|------|-------|
| Quick photorealistic still (1024²) | **Hugging Face** `gen-image` / FLUX.1-schnell | **0** (cloud) | ~10–15 s |
| Local GPU txt2img, edit, inpaint, upscale, video | **ComfyUI** @ `:8188` | Uses GPU | 30 s – 5 min |

**Rule:** Prefer **HF cloud** when LM Studio is loaded or VRAM is tight. Use **ComfyUI** when Jon asks for local GPU, img2img, inpaint, upscale, or video.

---

## Environment setup (first time)

```powershell
cd D:\Hermes\projects\JonBeatz
npm run env:setup          # creates .env.local; merges HF_TOKEN from MSC if present
npm run image:doctor       # verify HF_TOKEN, ComfyUI paths, Python deps
pip install huggingface_hub pillow python-dotenv
```

Required in **`.env.local`:**

| Variable | Purpose |
|----------|---------|
| `HF_TOKEN` | Hugging Face Inference API (FLUX.1-schnell) |
| `COMFYUI_ROOT` | Shared install `D:\AI_Models\ComfyUI` |
| `IMAGE_OUTPUT_DIR` | JonBeatz outputs `public\media` (served root-relatively) |
| `LMSTUDIO_*` / `MEM0_*` | Personal memory stack |

---

## Quick reference card

| What Jon wants | Command (JonBeatz) | Where it runs |
|----------------|-------------------|---------------|
| Cloud image from text | `npm run image:gen -- "prompt"` | Hugging Face API |
| Cloud image + open viewer | `npm run image:gen:open -- "prompt"` | HF + default photo app |
| Start ComfyUI | `npm run comfy:start` | Local GPU :8188 |
| Stop ComfyUI (keep LM Studio) | `npm run comfy:stop` | Local |
| ComfyUI status JSON | `npm run comfy:status` | Local |
| Health check | `npm run image:doctor` | Local |
| ComfyUI web UI | Browser → http://127.0.0.1:8188 | Local |

### PowerShell profile commands (workstation-wide)

These live in Jon's **PowerShell profile** (shared with MSC). They call ComfyUI workflows under `D:\AI_Models\ComfyUI\workflows\`:

| Command | Purpose |
|---------|---------|
| `gen-image "prompt"` | HF FLUX cloud (same as MSC — uses repo `.env.local` when run from JonBeatz) |
| `gen-image-local "prompt"` | ComfyUI z-image-turbo GGUF |
| `edit-image -InputPath ... -Prompt ...` | img2img |
| `inpaint-image -InputPath ... -MaskPath ...` | inpaint |
| `upscale-image -InputPath ... -TargetSize 4K` | upscale |
| `fix-face -InputPath ...` | face restore |
| `generate-video -Prompt ...` | CogVideoX text-to-video |
| `animate-image -InputPath ...` | SVD image-to-video |

**Natural language:** Jon can say *"make me a chicken playing golf"* → agent runs cloud `gen-image` or asks cloud vs local.

Full cheat sheet (all parameters): MSC [IMAGE-VIDEO-CHEATSHEET.md](file:///D:/Cursor_Projectz/MyStudioChannel/.cursor/docs/IMAGE-VIDEO-CHEATSHEET.md) — same workstation commands.

---

## A. Hugging Face cloud (`npm run image:gen`)

Architecture:

```
npm run image:gen → scripts/gen-image.ps1 → scripts/generate-image.py
  → reads .env.local HF_TOKEN
  → Hugging Face InferenceClient (FLUX.1-schnell)
  → saves PNG to IMAGE_OUTPUT_DIR
```

Examples:

```powershell
npm run image:gen -- "a beautiful recording studio with gold accent lighting, photorealistic, 4k"
npm run image:gen -- "cyberpunk city" -- --width 1920 --height 1080
powershell -File scripts/gen-image.ps1 "portrait of astronaut" -Width 1920 -Height 1080 -Open
```

Output default: `D:\Hermes\projects\JonBeatz\public\media\generated-YYYYMMDD-HHMMSS.png`

---

## B. ComfyUI local workflow

### Start / stop (JonBeatz npm wrappers → MSC scripts)

JonBeatz delegates to the **shared MSC ComfyUI scripts** (same engine, same VRAM guards):

```powershell
npm run comfy:start              # VRAM pre-flight, then launch
npm run comfy:start -- -LowVram -UnloadLMStudio   # 16 GB GPU + LM Studio loaded
npm run comfy:stop               # ComfyUI only — does NOT kill LM Studio
npm run comfy:restart
npm run comfy:status
```

**Agent rule:** Never auto-start ComfyUI unless Jon asks or `JONBEATZ_COMFYUI_AUTO_START=1`. See `.cursor/rules/image-workflow.mdc`.

### Web UI

http://127.0.0.1:8188 — drag workflow PNGs to load graphs; debug node execution visually.

### Default local txt2img workflow

- **Workflow:** `D:\AI_Models\ComfyUI\workflows\txt2img-gen-image-local.json`
- **Model:** z-image-turbo GGUF + Qwen3-4B CLIP + ae.safetensors VAE
- **Profile command:** `gen-image-local "prompt"`

### Edit / inpaint / upscale / video

Requires ComfyUI running. Use profile `edit-image`, `inpaint-image`, `upscale-image`, `generate-video`, `animate-image` — see cheat sheet above.

---

## C. Complete recipe examples

### 1. Cloud generate → local upscale

```powershell
npm run image:gen -- "mountain landscape at sunset"
npm run comfy:start
# Then in profile or agent: upscale-image -InputPath "D:\Hermes\projects\JonBeatz\public\media\generated-*.png" -TargetSize 4K
npm run comfy:stop
```

### 2. Local generate → edit → stop ComfyUI

```powershell
npm run comfy:start
gen-image-local "futuristic studio desk, photorealistic"
edit-image -InputPath "D:\Hermes\projects\JonBeatz\public\media\generated-local-*.png" -Prompt "add gold accent lighting" -Strength 0.45
npm run comfy:stop
```

### 3. Mem0 + image session

After a good prompt/style Jon wants to reuse:

```powershell
npm run mem0:add -- "Preferred image style: gold accent studio lighting, photorealistic 4k, FLUX cloud"
```

---

## D. Model & path reference

| Resource | Path |
|----------|------|
| ComfyUI engine | `D:\AI_Models\ComfyUI\` |
| Workflows | `D:\AI_Models\ComfyUI\workflows\` |
| Model cache (H:) | `H:\AI_Models\` |
| JonBeatz outputs | `D:\Hermes\projects\JonBeatz\public\media\` |
| MSC outputs (website) | `D:\Cursor_Projectz\MyStudioChannel\public\media\` |
| Restore symlinks | `D:\AI_Models\ComfyUI\scripts\repair-comfyui-symlinks.ps1` |
| Download SD1.5 fp16 | `hf download Comfy-Org/stable-diffusion-v1-5-archive v1-5-pruned-emaonly-fp16.safetensors` → checkpoints folder |

See **[COMFYUI-MODELS.md](./COMFYUI-MODELS.md)** for full model matrix.

---

## E. Troubleshooting

| Issue | Fix |
|-------|-----|
| `HF_TOKEN not configured` | `npm run env:setup` then set token in `.env.local` |
| ComfyUI not reachable | `npm run comfy:start` then open :8188 |
| CUDA OOM | `npm run comfy:stop`; use `-LowVram`; reduce resolution; unload LM Studio |
| Missing checkpoint | Run restore scripts; see COMFYUI-MODELS.md |
| Wrong output folder | Check `IMAGE_OUTPUT_DIR` in `.env.local` |

---

## F. Agent instructions

1. Read **this file** before any image/video task in JonBeatz.
2. Run **`npm run image:doctor`** if env or ComfyUI state is unclear.
3. **Cloud first** unless Jon says local/GPU/ComfyUI.
4. **Stop ComfyUI** when done (`npm run comfy:stop`) to free VRAM for LM Studio / Mem0.
5. Save outputs under **`public/media/`** for personal work. This keeps assets served root-relatively by Next.js.
6. Log reusable prompts/styles to **Mem0** + **ReCall.md**.

---

*Last updated: 2026-06-19 · JonBeatz v1.2 image workflow layer*


---

## --- Source: MCP-SETUP.md ---

# MCP setup — JonBeatz Personal

How Model Context Protocol servers are configured for **JonBeatz** and Jon's global Cursor profile.

**Related:** `.env.local.example`, `npm run sync:mcp-env`, `.cursor/skills/Premium-UI/SKILL.md`

**Last updated:** 2026-06-19

---

## Three MCP channels

| Channel | Config | JonBeatz |
|---------|--------|----------|
| **Global manual MCPs** | `%USERPROFILE%\.cursor\mcp.json` | github, tavily, playwright, fetch, Hostinger ×4, etc. |
| **Project manual MCPs** | `.cursor/mcp.json` in repo (gitignored — copy from `mcp.json.example`) | JonBeatz: 2 servers (`21st-dev-magic`, `markdownify`) |
| **Project MCP catalog** | `.cursor/mcp-manifest.json` (optional committed reference) | Not created on JonBeatz — `mcp.json` is the live source |
| **Workspace / plugin MCPs** | Cursor Settings → MCP, marketplace | cursor-ide-browser, Stripe, Vercel, Firebase — no JSON in repo |

**Merge rule:** Cursor loads global + project. If the same server name exists in both, **project wins**.

**Cursor schema (2026):** `.cursor/mcp.json` **must** be `{ "mcpServers": { ... } }`. The bootstrap key `project_mcp_servers` causes **red MCP configuration errors**. On JonBeatz `mcp.json` is the live source (2 servers); `mcp-manifest.json` is optional and not created here. Launch commands for shared servers → **global** `%USERPROFILE%\.cursor\mcp.json` (or project `mcpServers` with `command`/`args`).

**Fleet audit:** `node D:\Hermes\projects\_core-scripts\shared-profile-content\scripts\check-project-mcp-json.mjs`

**Registered vs configured:** A server in `mcp.json` only works when **enabled** in **Cursor Settings → MCP** and successfully started. After edits, refresh the server or restart Cursor.

---

## Health check

```powershell
cd D:\Hermes\projects\JonBeatz
npm run sync:mcp-env
```

| Check | Pass means |
|-------|------------|
| `sync:mcp-env` | Project keys from `.env.local` written to `.cursor/mcp.json` |
| Settings → MCP | Project servers toggled **on** (not auto-enabled from git alone) |

---

## Secrets workflow

**Never commit real API keys** in `.cursor/mcp.json` (file is **gitignored**). Template: **`.cursor/mcp.json.example`**. First setup: `Copy-Item .cursor/mcp.json.example .cursor/mcp.json`

1. Put secrets in **`.env.local`** (gitignored) — see **`.env.local.example`**
2. Sync:

   ```powershell
   npm run sync:mcp-env
   ```

3. **Reload MCP** — Cursor Settings → MCP → refresh each server

### What `sync:mcp-env` syncs

| Server | `.env.local` keys | Notes |
|--------|-------------------|-------|
| **21st-dev-magic** | `21ST_DEV_MAGIC_API_KEY` → MCP `API_KEY` | shadcn-style component generation |
| **browserbase** | `BROWSERBASE_API_KEY`, `BROWSERBASE_PROJECT_ID` | Cloud browser |
| **composio** | `COMPOSIO_API_KEY` | Optional — use `ck_` consumer key from composio.dev |
| **markdownify** | — | No secrets |
| **pencil** | — | Pencil desktop app must be running |

---

## Project servers (`.cursor/mcp.json`)

**Live (JonBeatz hub):** 2 servers — `21st-dev-magic`, `markdownify`.  
**Template (`.cursor/mcp.json.example`):** optional extras (browserbase, pencil, composio, comfyui) — enable only when keys + need exist.

| Server | Purpose | Ready when |
|--------|---------|------------|
| **21st-dev-magic** | Generate UI components into workspace | API key synced + MCP enabled |
| **markdownify** | Web/PDF/images → Markdown | MCP enabled |
| **browserbase** *(optional)* | Cloud browser + Stagehand | Keys synced + MCP enabled |
| **pencil** *(optional)* | Design canvas → code | Pencil app running + MCP enabled |
| **composio** *(optional)* | Social/tool connectors | Key synced; disable in Settings if unused |

---

## Browser QA playbook

| Task | Tool |
|------|------|
| Local Playground smoke | **cursor-ide-browser** MCP or `http://localhost:3000` |
| Scripted automation | Global **playwright** MCP |
| Cloud / Stagehand | Project **browserbase** *(optional)* |

Do **not** duplicate browser MCPs unnecessarily.

---

## Adding a new project MCP

1. Add server block to `.cursor/mcp.json` with `REPLACE_WITH_*` placeholders
2. Document keys in `.env.local.example`
3. Extend `scripts/sync-mcp-env.mjs` if secrets are required
4. Document here and in `MASTER-COMMANDS.md`
5. Run `npm run sync:mcp-env` and refresh MCP in Cursor

---

## Global MCPs (outside this repo)

Managed in `%USERPROFILE%\.cursor\mcp.json` — never committed.

```powershell
cd D:\Hermes\projects\JonBeatz
npm run sync:mcp-env
```

### Global servers synced from JonBeatz `.env.local`

| Server | `.env.local` key | Purpose |
|--------|------------------|---------|
| `github` | `GITHUB_PERSONAL_ACCESS_TOKEN` | Repos, issues, PRs |
| `tavily` | `TAVILY_API_KEY` | Web search |
| `hostinger-hosting` | `HOSTINGER_API_TOKEN` | JS deployments, hosting API |
| `hostinger-vps` | same token | VPS management |
| `hostinger-domains` | same token | Domain management |
| `hostinger-dns` | same token | DNS records |

**Hostinger launcher:** `scripts/jonbeatz-hostinger-mcp.mjs` copied to `~/.cursor/scripts/` on sync. Uses scoped bins — **not** the default 129-tool `hostinger-api-mcp` server.

**Useful MCP tools:** `hosting_listJsDeployments`, `hosting_deployJsApplication`, `hosting_showJsDeploymentLogs`.

**Deploy scripts** (`pushit:live`, `msc:hostinger:*`) still run from **MyStudioChannel** — see `.cursor/docs/HOSTINGER-REFERENCE.md`.

---

## Hostinger reference (JonBeatz)

| Doc | Purpose |
|-----|---------|
| `HOSTINGER-REFERENCE.md` | When to switch to MSC, deploy tiers, env keys |
| `PITFALLS-HOSTINGER.md` | 503, fast-deploy traps, MCP zip warning |
| `Hostinger-Ops` skill | Agent deploy/MCP guidance |
| `Hostinger-MSC.md` prompt | "push it live" workspace switch ritual |

**Profile boundary:** JonBeatz project MCPs are for **personal** work. MSC website deploy runs from `D:\Cursor_Projectz\MyStudioChannel` unless Jon explicitly opens that repo.


---

## --- Source: VRAM-IMAGE.md ---

# VRAM + ComfyUI — JonBeatz Playbook

**GPU:** RTX 5060 Ti (16 GB) · **LM Studio** (:1234) + **ComfyUI** (:8188) share VRAM.

Full MSC playbook: `D:\Cursor_Projectz\MyStudioChannel\.cursor\docs\VRAM-TROUBLESHOOTING.md`

---

## Golden rules

1. **Never auto-start ComfyUI** in JonBeatz unless Jon asks or `JONBEATZ_COMFYUI_AUTO_START=1`.
2. **Cloud first:** use `npm run image:gen` (HF FLUX) when LM Studio is loaded — zero local VRAM.
3. **Stop when done:** `npm run comfy:stop` frees GPU for Mem0 / LM Studio.
4. **Do not run** large LM Studio model + ComfyUI without Jon confirming on 16 GB.

---

## Commands

| Situation | Command |
|-----------|---------|
| Start ComfyUI (explicit) | `npm run comfy:start` |
| Start with LM Studio unload | `npm run comfy:start -- -LowVram -UnloadLMStudio` |
| Stop ComfyUI only | `npm run comfy:stop` |
| Restart after model install | `npm run comfy:restart` |
| Check state | `npm run comfy:status` |
| MSC full VRAM diag | From MSC repo: `npm run msc:vram:diag` |
| MSC emergency cleanup | From MSC: `powershell -File .cursor/custom-scriptz/vram-cleanup.ps1` |

---

## Thresholds (`.env.local`)

| Variable | Default | Meaning |
|----------|---------|---------|
| `VRAM_WARN_PERCENT` | 65 | Warn before ComfyUI start |
| `VRAM_BLOCK_MB` | 10240 | Block start if total VRAM used > ~10 GB |

---

## ComfyUI states

| State | Meaning |
|-------|---------|
| **stopped** | Port 8188 not listening |
| **idle** | Running, empty queue |
| **generating** | Active job |
| **unknown** | Booting — wait and recheck |

Web UI: http://127.0.0.1:8188  
Audit log (MSC repo): `logs/comfyui.log`

---

## When VRAM is stuck

1. `npm run comfy:stop`
2. If still high: `lms unload --all` (LM Studio)
3. If still high: MSC `vram-cleanup.ps1` (kills ComfyUI + LM Studio python)

---

*JonBeatz agents: see `.cursor/rules/image-workflow.mdc`*


---

## --- Source: MEM0-LMSTUDIO.md ---

# Mem0 + LM Studio — JonBeatz Personal Memory

How local memory works in this profile and what agents must know before add/search.

---

## Architecture

```
Jon / Agent
    │
    ▼
npm run mem0:add / mem0:search
    │
    ▼
scripts/mem0-chat.ps1  →  mem0-preflight.ps1 (LM Studio)
    │
    ▼
scripts/***.py  →  Mem0 OSS (Qdrant local)
    │
    ├── LLM: LM Studio http://127.0.0.1:1234/v1  (qwen3-4b-instruct-2507)
    └── Vector store: %USERPROFILE%\.mem0\qdrant_personal
```

---

## Identity (do not change casually)

| Key | Value |
|-----|-------|
| **user_id** | `jonbeatz_personal` |
| **collection** | `jonbeatz_personal_memories` |
| **qdrant path** | `%USERPROFILE%\.mem0\qdrant_personal` |
| **Config file** | `hermes-desktop-profile.json` → `mem0` block |

MSC uses a **separate** store — never mix slugs or user IDs.

---

## Preflight (always before add/search)

```powershell
npm run mem0:preflight
```

This loads **`qwen3-4b-instruct-2507`** with **16384 context** and **parallel 1** (~3.5–4 GB VRAM) via `lms` CLI. Required for **search** and for **`mem0:add:infer`** (LLM fact extraction). Standard **`mem0:add`** uses `infer=False` and only needs the local HuggingFace embedder.

If preflight fails:
1. Open LM Studio → Local Server → start on port **1234**
2. Ensure `lms` is on PATH
3. Re-run preflight

---

## Commands

```powershell
# Search (agent cold-start)
npm run mem0:search -- "current priorities"

# Save session takeaway (direct storage — default)
npm run mem0:add -- "Completed Profile Jedi GitHub setup and JonBeatz agent docs."

# Save with LLM fact extraction (optional; 16384 ctx for larger memory banks)
npm run mem0:add:infer -- "Long conversational note for LLM to distill into facts."

# List all
npm run mem0:list
```

Python direct:
```powershell
python scripts/***.py --action add --text "Direct storage note"
python scripts/***.py --action add --text "Infer note" --infer
python scripts/***.py --action search --query "Profile Jedi"
```

---

## infer=True vs infer=False

| Mode | Command | When | Notes |
|------|---------|------|-------|
| **infer=False** (default) | `mem0:add` | Session takeaways, docs sync | Direct storage; reliable with 13+ memories |
| **infer=True** | `mem0:add:infer` | Short natural notes | LLM extracts facts; needs LM Studio; 16384 ctx handles larger memory banks |

`mem0:add` defaults to **infer=False** since v1.3.1 to prevent silent failures when the memory bank exceeds the LM Studio context window.

---

## Seeded knowledge

`scripts/seed-profile-jedi-memories.py` — Profile Jedi / Hermes switcher reference memories (10 entries). Re-run after major doc updates:

```powershell
npm run mem0:seed:profile-jedi
```

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| "LM Studio endpoint not online" | Start local server on 1234; run preflight |
| "No models loaded" | `npm run mem0:preflight` |
| Empty search after add | Wait 2–3s; verify `user_id` is `jonbeatz_personal` |
| "Memory recorded" but nothing stored | Fixed in v1.3.1 — `mem0:add` now uses `infer=False` by default |
| Context length error on add | Use `mem0:add` (infer=False) or `mem0:add:infer` only for short notes |

---

## Agent checklist (memory tasks)

1. `npm run mem0:preflight`
2. `npm run mem0:search -- "<topic>"` before planning
3. `npm run mem0:add -- "<takeaway>"` at end of significant work


---

## --- Source: Agent-Runbook.md ---

# Agent Runbook — JonBeatz Personal Profile

Copy/paste prompts for consistent Cursor sessions.

**Profile root:** `D:\Hermes\projects\JonBeatz`

---

## Operator handshake (required)

**Operator:** Jon

- Startup: **"Ok Jon — JonBeatz personal profile loaded, ready."**
- Continue: **"Ok Jon — personal context restored."**
- Closeout: **"Great work Jon — personal session saved."**

---

## 1) Start Project (full cold boot)

```text
Start Project

Profile root: D:\Hermes\projects\JonBeatz
Operator: Jon. Handshake: "Ok Jon — JonBeatz personal profile loaded, ready."

Run npm run session:start from profile root.

Read in order (use Read tool, not memory):
1) TRUTH.md
2) .cursor/docs/START-HERE.md
3) .cursor/docs/MEM0-LMSTUDIO.md
4) .cursor/docs/IMAGE-WORKFLOW.md (if image/creative work)
5) .cursor/docs/ReCall.md
6) .cursor/docs/Checkpoint.md

Then:
- npm run mem0:search -- "current priorities" (if LM Studio up)
- npm run image:doctor (if image work planned)
- git status (if repo initialized)

Print session card:
- LM Studio :1234
- Mem0 store path + memory count hint
- Google API :4000 / ngrok :4040
- Profile Jedi :7780 / tray :7781
- ComfyUI :8188 (only if started)
- ReCall "Current Focus" (2–4 bullets)

Ask: "What do you want to work on today?"
Do NOT open MSC deploy or Hostinger unless I say so.
```

---

## 2) Ready to begin (docs only, lighter)

```text
Ready to begin — JonBeatz personal.

Read TRUTH.md, START-HERE.md, ReCall.md.
Run npm run doctor.
Handshake + ReCall summary + ask what to work on.
```

---

## 3) End Project

```text
End Project

Follow .cursor/prompts/End-Project.md:
- Summarize what we did
- Update ReCall.md and project-log.md
- npm run mem0:add -- "<one-line session takeaway>" if significant
- AskQuestion git → dev :3000 (if listening) → stop LiteLLM/ngrok
- npm run session:stop (with -StopDeepSeek if confirmed)
Handshake: "Great work Jon — personal session saved."
```

---

## 4) Mem0 recall

```text
Search my personal Mem0 for everything about [topic].
Run npm run mem0:preflight first, then mem0:search.
Summarize top matches for Jon.
```

---

## 5) Update docs

```text
update docs

Run npm run docs:sync.
Align TRUTH.md, START-HERE.md, ReCall.md with any changes from this session.
```

---

## 6) Image workflow (Hugging Face + ComfyUI)

```text
Image task — JonBeatz personal profile.

Read .cursor/docs/IMAGE-WORKFLOW.md first.
Run npm run image:doctor.

If cloud still (no VRAM): npm run image:gen -- "[prompt]"
If local GPU / edit / upscale / video:
  npm run comfy:start
  use profile commands (gen-image-local, edit-image, etc.)
  npm run comfy:stop when done

Save outputs to output/media/ unless I say otherwise.
Log good prompts to Mem0.
```

---

| Tag | Where |
|-----|-------|
| **Local (JonBeatz profile root)** | `D:\Hermes\projects\JonBeatz` — npm, mem0, session scripts |
| **MSC repo** | `D:\Cursor_Projectz\MyStudioChannel` — website, deploy, Kanban |
| **Live (Hostinger)** | Only when explicitly working in MSC deploy context |


---

## --- Source: MASTER-COMMANDS.md ---

# JonBeatz — Master Command Reference

**Profile root:** `D:\Hermes\projects\JonBeatz`  
**Last updated:** 2026-06-20 · **Version:** 2.0.0

---

## Session rituals

| Command | What it does | When |
|---------|--------------|------|
| `npm run dev` | Launch Next.js local Playground UI on **localhost:3000** | Anytime |
| `npm run build` | Compile Playground UI static files | Prior to ship |
| `npm run session:start` | LM Studio preflight + service probes | **Start Project** |
| `npm run session:start -- -Full` | Mem0 + Google stack + image doctor | Heavy session |
| `npm run session:start -- -WithGoogle` | Also start LiteLLM if down | Google tasks |
| `npm run session:stop` | Session closeout summary | **End Project** |
| `npm run session:stop -- -StopGoogleApi -StopComfy` | Also stop Google + ComfyUI | End + free VRAM |
| `npm run doctor` | **Unified** health: services, env, image, Google, git | Anytime |

---

## Mem0 (personal memory)

| Command | What it does |
|---------|--------------|
| `npm run mem0:preflight` | Load `qwen3-4b-instruct-2507` @ 16384 ctx for Mem0 |
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
| `npm run image:gen -- "prompt"` | Cloud FLUX.1-schnell → `output/media/` |
| `npm run image:gen:open -- "prompt"` | Same + open in default viewer |
| `npm run comfy:start` | Start shared ComfyUI (:8188) with VRAM guards |
| `npm run comfy:stop` | Stop ComfyUI only (keeps LM Studio) |
| `npm run comfy:restart` | Restart ComfyUI |
| `npm run comfy:status` | JSON: port, queue, PIDs |
| `npm run comfy:idle-watcher` | MSC idle watcher daemon (suggest stop after 15m idle) |

**Docs:** [IMAGE-WORKFLOW.md](./IMAGE-WORKFLOW.md) · [COMFYUI-MODELS.md](./COMFYUI-MODELS.md) · [VRAM-IMAGE.md](./VRAM-IMAGE.md)

**Profile commands** (PowerShell profile, require ComfyUI): `gen-image-local`, `edit-image`, `inpaint-image`, `upscale-image`, `generate-video`, `animate-image`.

---

## Hermes & Google API

| Command | What it does |
|---------|--------------|
| `npm run desktop` | Launch Hermes Desktop (JonBeatz profile) |
| `npm run deepseek:ngrok` | Start DeepSeek/LiteLLM stack (with ngrok for Cursor Agent) |
| `npm run stop` | Stop Google API stack |
| `npm run google:doctor` | OAuth token + LiteLLM + setup.py --check |
| `npm run google:status` | JSON status for agents |

**Docs:** [GOOGLE-WORKSPACE.md](./GOOGLE-WORKSPACE.md)

Google API scripts delegate to `D:\Hermes\projects\_core-scripts\deepseek-api\scripts\` (google-api archived to `_archive/`).

---

## Logging & maintenance

| Command | What it does |
|---------|--------------|
| `npm run log:session -- "summary"` | Append to `project-log.md` |
| `npm run log:fix` | Append to `ISSUES-RESOLVED.md` (interactive) |
| `npm run log:fix -- --issue "..." --cause "..." --solution "..."` | Non-interactive fix log |
| `npm run backup:project` | Interactive backup (Standard or Full, robocopy) |
| `npm run backup:standard` | Standard backup — skips node_modules, .next, output, logs |
| `npm run backup:full` | Full mirror — includes everything |
| `npm run backup:quick` | Standard quick — auto `jonbeatz-project-v{N}-{a-z}`, no prompts |
| `npm run backup:quick:full` | Full quick — auto folder name, no prompts |
| `npm run backup:profile` | Alias for `backup:quick` (legacy phrase) |
| `npm run backup:clean` | Retain 10 newest `jonbeatz-project-v*` folders |
| `npm run python:setup` | `pip install -r requirements.txt` |
| `npm run draven:speak -- "text"` | J.A.R.V.I.S. TTS |
| `npm run env:setup` | Create / refresh `.env.local` |
| `npm run dev:recover` | Free port 3000, clear `.next`/cache, `npm install`, `npm run dev` |
| `npm run sync:mcp-env` | Sync project MCP keys from `.env.local` → `.cursor/mcp.json` |
| `npm run obsidian:distill` | Scan `I:\Vader_Vault` for weekly ReCall.md candidate notes |

---

## Playground UI

| Command | What it does |
|---------|--------------|
| `npm run dev` | Playground UI @ **localhost:3000** |
| `npm run build` | Production build gate |
| `npm run dev:recover` | Hard recovery when stale `.next` or port conflict |

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
| **Ctrl+Shift+B** | Start Session | `session:start` |
| **Ctrl+Shift+E** | End Session | `session:stop` |
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
python scripts/***.py --action search --query "priorities"

# Hermes desktop launcher
powershell -File scripts/start-hermes-desktop-jonbeatz.ps1

# Google API (portable Hermes home)
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

## Cursor chat triggers

| Say this | Agent runs |
|----------|------------|
| **Start Project** / **Start Session** | `session:start` + Start-Project.md |
| **End Project** / **End Session** | End-Project.md + `session:stop` (AskQuestion git → dev `:3000` if up → `-StopDeepSeek`) |
| **update docs** | `docs:sync` / Update-Docs.md |
| **backup profile** / **backup quick** | `backup:quick` |
| **backup project** | `backup:project` |
| **backup full** | `backup:quick:full` |

See **[Agent-Runbook.md](./Agent-Runbook.md)** for full copy/paste prompts.


---

## --- Source: Custom-Prompts.md ---

# Custom Prompts — JonBeatz Personal Cheat Sheet

**Profile root:** `D:\Hermes\projects\JonBeatz`  
Copy/paste phrases for Cursor chat. Agents map these to scripts and docs.

---

## Session rituals

| Say this | Agent does |
|----------|------------|
| **Start Project** / **Start Session** / **Cold Start** | `session:start` + Start-Project.md + read TRUTH/START-HERE/ReCall |
| **End Project** / **End Session** | End-Project.md + `session:stop` + AskQuestion git/dev/stop stack |
| **update docs** | Update-Docs.md + `docs:sync` |
| **update docs and mem0** | Update-Docs + Mem0 summary add |
| **postflight personal** | `doctor` + report all service ports |
| **Update Project** / **Sync Project** | Update-Project.md + git-log sync to project-log/Checkpoint |
| **dev recover** / **fix playground** | `npm run dev:recover` |
| **sync mcp** | `npm run sync:mcp-env` + reload Cursor MCP |

---

## Hostinger (MSC website — reference from JonBeatz)

| Say this | Agent does |
|----------|------------|
| **hostinger reference** | `HOSTINGER-REFERENCE.md` + `PITFALLS-HOSTINGER.md` |
| **push it live** / **deploy msc** / **deploy website** | `Hostinger-MSC.md` — confirm MSC repo open |
| **sync hostinger mcp** | `sync:mcp-env` (global hostinger-* + project MCPs) |
| **open msc deploy** | Point to `D:\Cursor_Projectz\MyStudioChannel` + `HOSTINGER-DEPLOY.md` |

Deploy **commands** run from MSC repo. MCP + docs available from JonBeatz.

---

## Memory (Mem0)

| Say this | Agent does |
|----------|------------|
| **mem0 search** [topic] | `mem0:preflight` then `mem0:search` |
| **remember this** [text] | `mem0:add` |
| **what do you know about** [topic] | Mem0 search + ReCall |

---

## Image workflow

| Say this | Agent does |
|----------|------------|
| **image cloud** [prompt] | `image:gen` (HF FLUX, zero VRAM) |
| **image local** [prompt] | `comfy:start` + `gen-image-local` |
| **comfy start** | `npm run comfy:start` |
| **comfy stop** | `npm run comfy:stop` |
| **image doctor** | `npm run image:doctor` |
| **upscale** / **edit image** | Read IMAGE-WORKFLOW.md, ComfyUI profile commands |

---

## Google Workspace

| Say this | Agent does |
|----------|------------|
| **google doctor** | `google:doctor` |
| **start deepseek stack** | `npm run deepseek:ngrok` |
| **stop google stack** | `npm run stop` |
| **check my email** / **calendar** | GOOGLE-WORKSPACE.md + Hermes skill |

---

## Maintenance

| Say this | Agent does |
|----------|------------|
| **backup profile** / **backup quick** | `npm run backup:quick` |
| **backup project** | `npm run backup:project` (interactive) |
| **backup full** | `npm run backup:quick:full` |
| **log session** [summary] | `npm run log:session -- "..."` |
| **log fix** | `npm run log:fix` or ISSUES-RESOLVED entry |
| **env setup** | `npm run env:setup` |
| **python setup** | `npm run python:setup` |
| **speak** [text] | `npm run draven:speak -- "..."` |

---

## Session start modes (terminal)

```powershell
npm run session:start                    # default: Mem0 preflight + probes
npm run session:start -- -Full           # Mem0 + Google stack + image doctor
npm run session:start -- -WithGoogle     # also start LiteLLM if down
npm run session:start -- -ImageDoctor    # include image:doctor
npm run session:start -- -SkipMem0       # probes only
```

---

## Boundaries (always)

- **JonBeatz** = personal (this folder)
- **MyStudioChannel** = website / deploy — say "switch to MSC" explicitly
- **Profile Jedi** = profile switcher UI at :7780

---

*Version 1.3 · See MASTER-COMMANDS.md for full command table*


---

