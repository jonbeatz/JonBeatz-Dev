# Image Workflow — Hermes fleet (shared workstation)

**Hub profile:** `D:\Hermes\projects\JonBeatz` (Command Center)  
**Canonical model inventory:** [COMFYUI-MODELS.md](./COMFYUI-MODELS.md) → [ENGINEERING.md](./ENGINEERING.md)  
**VRAM playbook:** [VRAM-IMAGE.md](./VRAM-IMAGE.md) → [ENGINEERING.md](./ENGINEERING.md)  
**Environment:** profile `.env.local` (from `.env.local.example` — run `npm run env:setup`)  
**Vault picker:** `H:\Vader_Vault\02_Knowledge\Patterns\Local-image-model-picker-16GB.md`

This is the **fleet agent source of truth** for Hugging Face cloud generation + fal + local ComfyUI editing, upscaling, and video on the shared RTX 16 GB box.

---

## Two pipelines (when to use which)

| Goal | Pipeline | VRAM | Speed | Cost |
|------|----------|------|-------|------|
| **Free local painted still (any project)** | **ComfyUI 2512 Lightning** | GPU · unload LMS | **~22–40s warm** (cold first ~2–4 min) | $0 |
| Quick photoreal still while LMS stays loaded | **Hugging Face** `image:gen` / FLUX.1-schnell | **0** (cloud) | ~10–15 s | Free/cheap (HF token) |
| Paid bonus / book identity + finals | **fal.ai** `image:fal` · HY-WU · Banana Pro | **0** (cloud) | ~5–30 s+ | Pay-per-use |
| Local edit, inpaint, upscale, video | **ComfyUI** @ `:8188` | GPU | 30 s – 5 min | $0 API |

**Rule:** For **free local images** on this box, use **Qwen-Image-2512 Lightning** (Comfy App Mode). LM Studio does **not** load 2512 — unload `qwen3-4b` first. Full card: [LOCAL-COMFY-2512-LIGHTNING.md](./LOCAL-COMFY-2512-LIGHTNING.md). Use **HF** only when you must keep Mem0 loaded. Use **fal** for premium / book identity+finals.

**On deck (not wired):** [NVIDIA Build](https://build.nvidia.com/) hosts FLUX / Qwen-Image NIMs. Key inventory name is `BUILD_NVIDIA_API` in `_core-scripts\.env.local.master` — **do not copy to `.env.local` until Jon says go.** Hosted NIM is a **REST catalog**, not a ComfyUI provider. Comfy-Org **NIMnodes** = local NIM containers — skip on 16 GB. See TOOLS-REFERENCE § NVIDIA Build.

---

## Environment setup (first time)

```powershell
cd D:\Hermes\projects\JonBeatz
npm run env:setup          # creates .env.local; merges HF_TOKEN from MSC if present
npm run image:doctor       # HF_TOKEN, Comfy paths, Python deps + vault↔Comfy hardlink health
pip install huggingface_hub pillow python-dotenv
```

Required in **`.env.local`:**

| Variable | Purpose |
|----------|---------|
| `HF_TOKEN` | Hugging Face Inference API (FLUX.1-schnell) |
| `FAL_API_KEY` | fal.ai pay-per-use wallet ([fal.ai](https://fal.ai/pricing)). Same value as SDK `FAL_KEY`. **API/MCP only** — not the fal.ai website login. |
| `FAL_IMAGE_MODEL` | Default fal model id for `image:fal` (default `fal-ai/flux/schnell` — cheap drafts. Pass `-Model` for Pro/Max/Banana.) |
| `COMFYUI_ROOT` | Shared install `H:\AI_Models\ComfyUI` |
| `IMAGE_OUTPUT_DIR` | Hermes media vault `D:\Hermes\assets\media\JonBeatz` |
| `LMSTUDIO_*` / `MEM0_*` | Personal memory stack |

---

## Quick reference card

| What Jon wants | Command (JonBeatz) | Where it runs |
|----------------|-------------------|---------------|
| Cloud image from text | `npm run image:gen -- "prompt"` | Hugging Face API |
| Cloud image + open viewer | `npm run image:gen:open -- "prompt"` | HF + default photo app |
| **Paid bonus** cloud image | `npm run image:fal -- "prompt"` | fal.ai API (prepaid credits) |
| **Paid bonus** + open | `npm run image:fal:open -- "prompt"` | fal.ai + viewer |
| **Kling scroll clip** (start + end stills) | `npm run video:fal -- -StartImage a.png -EndImage b.png` | fal.ai queue |
| Start ComfyUI | `npm run comfy:start` | Local GPU :8188 |
| **2512 Lightning (free local still)** | `npm run comfy:start:qwen` then App Mode `qwen-image-2512-Lightning-AppMode` | Unload LMS + `--lowvram` · see [LOCAL-COMFY-2512-LIGHTNING.md](./LOCAL-COMFY-2512-LIGHTNING.md) |
| Stop ComfyUI (keep LM Studio) | `npm run comfy:stop` | Local |
| ComfyUI status JSON | `npm run comfy:status` | Local |
| Repair model hardlinks (post H: migration) | `npm run comfy:repair-symlinks` | Local |
| Check vault↔Comfy hardlinks only | `npm run comfy:hardlink-check` | Local |
| Full model comparison test | `npm run comfy:compare -- "prompt"` | Local GPU |
| LM Studio vault audit | `npm run lmstudio:audit` | Local |
| Health check (env + hardlinks) | `npm run image:doctor` | Local |
| ComfyUI web UI | Browser → http://127.0.0.1:8188 | Local |

### PowerShell profile commands (workstation-wide)

These live in Jon's **PowerShell profile** (shared with MSC). They call ComfyUI workflows under `H:\AI_Models\ComfyUI\workflows\`:

| Command | Purpose |
|---------|---------|
| `gen-image "prompt"` | HF FLUX cloud (same as MSC — uses repo `.env.local` when run from JonBeatz) |
| `gen-image-local "prompt"` | ComfyUI z-image-turbo GGUF |
| `edit-image -InputPath ... -Prompt ...` | img2img |
| `inpaint-image -InputPath ... -MaskPath ...` | inpaint |
| `upscale-image -InputPath ... -TargetSize 4K` | upscale |
| `fix-face -InputPath ...` | face restore |
| `generate-video -Prompt ...` | CogVideoX T2V — **disabled** (see parked note below); use `video:fal` |
| `animate-image -InputPath ...` | SVD image-to-video (legacy local) |

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

Output default: `D:\Hermes\assets\media\JonBeatz\generated-YYYYMMDD-HHMMSS.png`

---

## C. fal.ai cloud bonus (`npm run image:fal`)

Pay-per-use prepaid wallet — use when HF is capped or Jon wants premium models. Docs: [fal.ai pricing](https://fal.ai/pricing).

**GUI alt (WATCH):** [Open Generative AI](https://github.com/Anil-matcha/Open-Generative-AI) @ `D:\Hermes\apps\Open-Generative-AI` + [muapi](https://muapi.ai) — OSS studio for 200+ cloud models (image/video/lip sync/cinema) + optional local **sd.cpp** (incl. Z-Image). Dev `:3000` only. Not default over HF/fal; see `TOOLS-REFERENCE.md` § Open Generative AI.

Architecture:

```
npm run image:fal → scripts/gen-image-fal.ps1 → scripts/generate-image-fal.py
  → reads .env.local FAL_API_KEY
  → POST https://fal.run/{model}
  → saves PNG to IMAGE_OUTPUT_DIR (fal-*.png)
```

**Cursor MCP:** `npm run sync:mcp-env` writes **fal-ai** to `%USERPROFILE%\.cursor\mcp.json` → reload Cursor Settings → MCP. Catalog, `get_pricing`, and `run_model` use `FAL_API_KEY`. That is **full API access**. The [fal.ai dashboard](https://fal.ai/dashboard) is a separate **browser OAuth** login (Google/GitHub). Agents cannot open that UI from the key. Do **not** store `FAL_USERNAME` / `FAL_PASSWORD`. Balance/keys UI: Jon in the browser. Optional CLI identity: `fal auth login` → `~/.fal/auth0_token` (not required; `FAL_KEY`/`FAL_API_KEY` wins).

Prices below: live `get_pricing` **2026-09-05**, typical **1024×1024 (~1 MP)** unless noted. GPT Image 2 bills by quality tokens — the API sometimes returns a dummy `$1/unit`; use the published quality band.

### Three-tier stills (locked 2026-09-05)

Use this for **website recreates / v0-like photoreal**. Picture-book lanes below stay Klein → Qwen 2 → Banana Pro edit.

| Tier | Default endpoint | ~$/1K | When |
|------|------------------|-------|------|
| **Best / expensive** | `fal-ai/flux-2-max` **or** `fal-ai/nano-banana-pro` | $0.07 / $0.15 | Keepers, 4K, character, readable type |
| **Production** | `fal-ai/flux-2-pro` | $0.03 | Default 10-image template packs |
| **Middle / iterate** | `fal-ai/flux-2/klein/9b` **or** `fal-ai/flux/schnell` | ~$0.01 / $0.003 | Layout probes, book dial — **not** cinema heroes |

**10-image site pack at 1K:** schnell ~$0.03 · Flux 2 Pro **$0.30** · Flux 2 Max **$0.70** · Nano Banana 2 **$0.80** · Nano Banana Pro **$1.50**.

**v0.app stills** (Website-Templates harvest 2026-09-05): unnamed Vercel AI Gateway, 1024² PNG, ~5/version. Closest fal match = **Flux 2 Max** (photoreal), not Comfy 2512 Lightning first.

| Model id (fal) | Use | ~Cost | In `image:fal` table? |
|----------------|-----|-------|------------------------|
| `fal-ai/flux/schnell` | Default cheap still (same family as HF) | ~$0.003 | **default** |
| `fal-ai/flux-2/klein/4b` | **Picture-book dial** — cheap gouache iterates | **$0.005/MP** | yes |
| `fal-ai/flux-2/klein/9b` | fal popularity default; better Klein | ~$0.01 | **add** (Comfy already has 9B) |
| `fal-ai/flux-2/flash` | Flux 2 speed SKU — look-tests before Pro | dev-class | **add** |
| `fal-ai/flux-2-pro` | **Website production photoreal** | $0.03/MP | **add** |
| `fal-ai/flux-2-max` | **v0-like cinema keepers** (2K ≈ $0.28) | $0.07/MP | **add** |
| `fal-ai/qwen-image-2/text-to-image` | Picture-book fallback when Klein misses | ~$0.035/img | yes |
| `fal-ai/qwen-image-max/text-to-image` | New Qwen cloud; stronger text than Image 2 | $0.075/img | **add** |
| `alibaba/qwen-image-3/text-to-image` | New; prompt rewrite + text. Confirm unit on first run | ~$0.01/unit | watch |
| `fal-ai/qwen-image-2512` | Cloud cousin of local Lightning | ~$0.02 | when LMS must stay up |
| `fal-ai/nano-banana` | Fast Google (Gemini 2.5 Flash Image) | ~$0.08 @ 1K | yes |
| `fal-ai/nano-banana-2` | **New** Google Flash (Gemini 3.1). Volume vs Pro | $0.08/img | **add** |
| `google/nano-banana-2-lite` | Newest SKU, sub-2s, 14 ratios | TBD ($1/unit dummy) | watch |
| `fal-ai/nano-banana-pro` | Hero / 4K / character (Gemini 3 Pro Image) | $0.15/img | yes |
| `fal-ai/nano-banana-pro/edit` | **Picture-book finals** + style refs (`image_urls`) | ~$0.15/img | yes |
| `openai/gpt-image-2` | Product/UI/type. Alias `fal-ai/gpt-image-2` still works | $0.005–0.21 by quality | yes (prefer `openai/` id) |
| `bytedance/seedream/v5/lite/text-to-image` | New; native ~2K–3K, cheap production alt | $0.035/img | one compare folder |
| `bytedance/seedream/v5/pro/text-to-image` | New; dense layouts, 14-language text | $0.068/unit | one compare folder |
| `xai/grok-imagine-image/v2.0/text-to-image` | New; typography + region edit | ~$0.04 | watch |

**Do not promote yet:** Ideogram V4 / Recraft (posters, not cinema; Ideogram still trips safety on some book beats). HiDream O1 unproven here. Seedream / Grok after one side-by-side vs Flux 2 Pro.

**Named models Jon already likes:** Qwen (local 2512 Lightning = $0 lane; fal Max/3 for cloud). Klein (books only). GPT Image 2 (layouts/type). Gemini Pro image = Nano Banana Pro. Add **Banana 2** for Google volume and **Flux 2 Pro/Max** for site heroes.

### Picture books (Hermes book workflow)

Locked recipe pioneered on **The-Night-I-Met-Santa** — full playbook lives in that project’s `BOOK-PRODUCTION-SYSTEM.md`. For any future picture book on fal:

| Priority | Lane | Endpoint | When |
|:--------:|------|----------|------|
| 1 | Dial / dev | `fal-ai/flux-2/klein/4b` | Layout, vibe, text-zone probes |
| 2 | Fallback | `fal-ai/qwen-image-2/text-to-image` | Klein missed; before finals spend |
| 3 | Finals | `fal-ai/nano-banana-pro/edit` + style refs | Approved pages/covers @ 2K |

**Skip:** Ideogram for child Christmas / pajamas beats if fal safety blocks.  
**Evidence template:** one real-beat compare folder (same prompt/seed) before locking lanes.  
**Call path:** prefer Cursor MCP `user-fal-ai` over default `image:fal` (Flux schnell) for dial/finals/website Pro-Max.

### Website recreates (Website-Templates)

| Priority | Lane | Endpoint | When |
|:--------:|------|----------|------|
| 1 | Production pack | `fal-ai/flux-2-pro` | Default 10 cinematic stills |
| 2 | Keepers / v0-match | `fal-ai/flux-2-max` | Hero + reel plates |
| 3 | Google text / 4K volume | `fal-ai/nano-banana-2` | Cheaper than Pro |
| 4 | Google best | `fal-ai/nano-banana-pro` | Character lock, type-heavy |
| — | Do **not** | Klein 4B/9B | Book dial, not photoreal heroes |

Examples:

```powershell
npm run image:fal -- "cinematic studio hero, dark gold, music producer"
npm run image:fal:open -- "product card with readable text"
powershell -File scripts/gen-image-fal.ps1 "portrait" -Model "fal-ai/nano-banana-2"
powershell -File scripts/gen-image-fal.ps1 "site hero pack" -Model "fal-ai/flux-2-pro"
powershell -File scripts/gen-image-fal.ps1 "v0-like keeper" -Model "fal-ai/flux-2-max"
powershell -File scripts/gen-image-fal.ps1 "book sneak beat" -Model "fal-ai/flux-2/klein/4b"
```

**Policy:** Daily stills → `image:gen` (HF) or Comfy Lightning ($0). fal = bonus when Jon asks **or** book/website lanes above. Picture-book finals = Banana `/edit` + refs, not Flux schnell. Website photoreal = Flux 2 Pro (volume) / Max or Banana Pro (keepers). Lightning is **look-test only** (Website-Templates `studio-dark/v1` 2026-09-05). Keep `FAL_IMAGE_MODEL=fal-ai/flux/schnell` until Jon changes the default.

**Website-Templates lab** (open that folder, not JonBeatz): `D:\Hermes\projects\Website-Templates` · cold-open `.cursor/docs/CURRENT.md` · Lightning hygiene in that repo’s `IMAGE-PIPELINE.md`.

### Scroll transition video (`npm run video:fal`)

Kling I2V for assembled → exploded product clips. See vault `ai-scroll-product-workflow/WORKFLOW.md`.

```powershell
npm run video:fal -- -StartImage assembled.png -EndImage exploded.png
```

Check balance: [fal.ai/dashboard](https://fal.ai/dashboard).

**fal credits exhausted?** Local fallback (manual install): **LongCat-Video** → **HunyuanVideo** → ComfyUI `generate-video` → **LTX Desktop** (GUI NLE — Jon download later). Same FFmpeg → WebP → `ScrollFrameHero`. Details: `TOOLS-REFERENCE.md` § LongCat / HunyuanVideo / LTX Desktop · `SCROLL-VIDEO-RESEARCH.md` tool matrix.

**Wan2.1 local weights (parked research lane):** `H:\AI_Models\Wan2.1` — keep **both** `checkpoints` (~16 GB native) and `hf` (~27 GB Diffusers). Not duplicates to delete; Windows verify = `npm run wan21:status`. Production clips still default to **fal**.

**CogVideo (parked — keep ~3.3 GB I2V):** `H:\AI_Models\ComfyUI\ComfyUI\models\CogVideo\CogVideoX_5b_I2V_GGUF_Q4_0.safetensors`. Workflow `txt2vid-cogvideo.json` stays in `workflows\_disabled\` (needs separate T2V weights to revive). Jon 2026-08-08: **do not delete** — fun/local I2V later; daily video = **fal**. Details in that folder’s README.

### Video polish chain (after gen)

Canonical runbook: **[VIDEO-POLISH-CHAIN.md](./VIDEO-POLISH-CHAIN.md)**

```powershell
npm run video:polish -- -InputPath "D:\Hermes\apps\kinocut-media\inbox\clip.mp4"
npm run freecut:open   # optional human pass
```

Flow: fal/OpenMontage → **Kinocut** cut/QC → **FreeCut** (optional) → `polish-out\`.

---

## D. ComfyUI local workflow

### Start / stop (JonBeatz npm wrappers → MSC scripts)

JonBeatz delegates to the **shared MSC ComfyUI scripts** (same engine, same VRAM guards):

```powershell
npm run comfy:start              # VRAM pre-flight, then launch
npm run comfy:start -- -LowVram -UnloadLMStudio   # 16 GB GPU + LM Studio loaded
npm run comfy:stop               # ComfyUI only — does NOT kill LM Studio
npm run comfy:restart
npm run comfy:status
```

**Agent rule:** Never auto-start ComfyUI unless Jon asks or `COMFYUI_AUTO_START=1` (legacy `JONBEATZ_COMFYUI_AUTO_START=1` also OK). See `.cursor/rules/image-workflow.mdc`.

### Web UI

http://127.0.0.1:8188 — drag workflow PNGs to load graphs; debug node execution visually.

### App Mode (preferred easy GUI — 2026-08-08; +Lightning / multi-edit 2026-08-15)

**Day-to-day local gens:** use official **ComfyUI App Mode** (no node graph). Requires ComfyUI frontend ≥1.41.13 (this stack: **0.31.0** / frontend **1.48.7**).

```powershell
npm run comfy:start:qwen
# or: npm run comfy:start -- -UnloadLMStudio -LowVram
# → open http://127.0.0.1:8188 → Workflows → Hermes-Fable5 → qwen-image-2512-Lightning-AppMode.json
# → stay in App mode → edit controls → first Run = warmup (~2–4 min) → later Runs ~22–40s
# → keep warm (no Clear / /free) → if a plate exceeds ~2 min: comfy:stop → comfy:start:qwen → warmup again
# → npm run comfy:stop → mem0:preflight
```

| Dial | App Mode workflow (user library) | Controls |
|------|----------------------------------|----------|
| **Default free still (Lightning)** | `qwen-image-2512-Lightning-AppMode.json` | Prompt · Negative · W/H · Seed · Steps — **4-step, not keep** |
| **Best 2512 keep** | `qwen-image-2512-AppMode.json` | same — quality T2I (20-step) |
| **Fast photoreal iterate (Q4)** | `z-image-turbo-Q4-AppMode.json` | same |
| **Keep BF16** | `z-image-turbo-BF16-AppMode.json` | same |
| **Flux Klein 4B** | `flux-klein-4B-AppMode.json` | same |
| **Flux Klein 9B** | `flux-klein-9B-AppMode.json` | same |
| **Edit 2511 (1 image)** | `edit-qwen-2511-AppMode.json` | **Image** · Prompt · Negative · Seed · Steps · Denoise |
| **Edit 2511 (3 images)** | `edit-qwen-2511-AppMode-multi.json` | **Image** · **Image 2** · **Image 3** · Prompt · Negative · Seed · Steps · Denoise |

**Path:** `H:\AI_Models\ComfyUI\ComfyUI\user\default\workflows\Hermes-Fable5\` (App Mode files only as of 2026-08-15)  
**Parked (not deleted):** `user/default/workflows/_archive/` — graph copies + `JARVIS-v1`  
**Vault:** `ComfyUI-App-Mode-Fable5` · picker `Local-image-model-picker-16GB`  
**Smoke:** App Mode z-image Q4 PASS → `D:\Hermes\assets\media\JonBeatz\comfyui-appmode-20260808\`

HBA sidecar (book profile): `npm run prompt:expand` — DeepSeek first; paste into App Mode. See project `LOCAL-COMFY-PICKER.md`.

Use **Graph mode** only when building/debugging nodes. API workflows under `H:\AI_Models\ComfyUI\workflows\` remain the CLI / graph source of truth.

### Default local txt2img workflow (graph / API)

| Goal | Workflow | Notes |
|------|----------|-------|
| **Free local still (default)** | `txt2img-qwen-image-2512-lightning.json` | Lightning 4-step / cfg 1 — card [LOCAL-COMFY-2512-LIGHTNING.md](./LOCAL-COMFY-2512-LIGHTNING.md) |
| **Fast photoreal iterate** | `txt2img-gen-image-local.json` / `txt2img-z-image-turbo.json` | z-image-turbo Q4 + Qwen3-4B CLIP + `ae.safetensors` — ~50s @ 1024, 8 steps |
| **Fast lane, final quality** | `txt2img-z-image-turbo-bf16.json` | z-image-turbo **BF16** (11.5 GB safetensors) — ~155s cold @ 1024. Q4 = iterate, BF16 = final |
| **Best quality / realism** | `txt2img-qwen-image-2512.json` | Qwen-Image-2512 Q4_K_M + Qwen2.5-VL-7B TE + `qwen_image_vae` — ~4 min @ 1024 / 20 steps |
| **Local instruction edit** | `edit-image-qwen-2511.json` | **Qwen-Image-Edit-2511** Q4_K_M (local nano-banana-style edits) + Qwen2.5-VL TE — set `OVERRIDE_INPUT_IMAGE.png` + prompt; 20 steps / cfg 2.5 |
| **Flux quality (fast)** | `txt2img-flux-klein-9b.json` | FLUX.2 Klein **9B** Q4 + **Qwen3-8B** TE + `flux2-vae` — ~90–100s (**non-commercial**) |
| **Flux speed / Apache** | `txt2img-flux-klein.json` | Klein **4B** Q5 + Qwen3-4B TE |

> **VRAM rule (16 GB):** the big Qwen models (2512, Edit-2511) fully load but crawl (~199 s/step) if LM Studio's qwen3-4b stays resident. **`lms unload qwen3-4b-instruct-2507` before heavy Qwen renders**, then `npm run mem0:preflight` to restore. Klein + both z-image variants run fine with it resident.

- **Profile command (fast):** `gen-image-local "prompt"`
- **ComfyUI:** **v0.31.0** · torch **2.11.0+cu128** (RTX 50 / Blackwell — **never** `pip install torch` from default PyPI)
- **Repair links:** `npm run comfy:repair-symlinks` (symlink → hardlink fallback on same H: volume; drops deleted `flux1-dev-Q4_K_M`, includes Edit-2511 + BF16)
- **Hardlink health:** `npm run comfy:hardlink-check` or `npm run image:doctor` (fails on broken critical Fable 5 links — see vault gotcha `LLM-VAULT-vs-AI-Models-hardlinks`)
- **Smoke outputs:** `D:\Hermes\assets\media\JonBeatz\comfyui-smoke-20260807\` · App Mode `comfyui-appmode-20260808\`

#### Local vs fal picture-book lanes

| Book stage (fal) | Local equivalent |
|------------------|------------------|
| Dial `fal-ai/flux-2/klein/4b` | Same family → Klein 4B GGUF (slightly softer) |
| Fallback `fal-ai/qwen-image-2/...` | Related only → **Qwen-Image-2512** (not identical to fal Qwen-Image-2) |
| Finals `fal-ai/nano-banana-pro/edit` | **Local edit lane now exists** → `edit-image-qwen-2511.json` (Qwen-Image-Edit-2511). fal stays default for book finals; local is the free/offline option |

#### LM Studio custom load settings (red-dot configs)

Stored under `%USERPROFILE%\.lmstudio\.internal\user-concrete-model-default-config\` (refresh My Models / restart LM Studio to see **Customized**):

| Model | Parallel | Context | GPU |
|-------|----------|---------|-----|
| flux-2-klein-9b / qwen-image-2512 / **qwen-image-edit-2511** / klein-4b / z-image-turbo | 1 | 4096 | offload **max** + flash attn + keep-in-memory + KV GPU |
| Qwen3-8B (Klein TE) | 1 | 8192 | max GPU |
| Qwen2.5-VL-7B (Qwen-Image TE) | 1 | 4096 | max GPU |

> **⚠️ Reality check (2026-08-08):** LM Studio's llama-server **cannot load diffusion GGUFs at all** (tested every image arch on newest engine 2.27.1 — all fail "exited before becoming healthy"). Image GGUFs index in My Models but never load; the dials above are **inert insurance** in case LMS ships diffusion support. **ComfyUI is the ONLY local image runtime.** Model root: `H:\LLM_VAULT` (`downloadsFolder`) — the legacy `~\.lmstudio\models` junction was removed 2026-08-08 (restore: `mklink /J` → `H:\AI_Models`).

### Edit / inpaint / upscale / video

Requires ComfyUI running. Use profile `edit-image`, `inpaint-image`, `upscale-image`, `generate-video`, `animate-image` — see cheat sheet above.

### Cursor MCP — local ComfyUI (`comfyui-mcp`)

**JonBeatz project MCP** — agent-native control of your **local** ComfyUI instance (not Comfy Cloud). Package: [`comfyui-mcp`](https://www.npmjs.com/package/comfyui-mcp) (community, local-first).

| Item | Value |
|------|-------|
| **Config** | `.cursor/mcp.json` → server `comfyui` |
| **Package** | `npx -y comfyui-mcp` (stdio MCP) |
| **Target** | `COMFYUI_URL=http://127.0.0.1:8188` (from `COMFYUI_HOST`/`PORT` in `.env.local`) |
| **Data path** | `COMFYUI_PATH` = `COMFYUI_ROOT` (e.g. `H:\AI_Models\ComfyUI`) |
| **Safety** | `COMFYUI_ALWAYS_RESTART=false` — MCP does **not** auto-launch ComfyUI |

**Setup (once):**

```powershell
cd D:\Hermes\projects\JonBeatz
# Copy .cursor/mcp.json.example → .cursor/mcp.json if missing; comfyui block is included
npm run sync:mcp-env    # writes COMFYUI_URL + COMFYUI_PATH from .env.local
```

Then **Cursor Settings → MCP → enable `comfyui`** and refresh servers.

**Agent workflow with MCP:**

1. Jon asks for local GPU work → run **`npm run comfy:start`** first (VRAM pre-flight).
2. Use **comfyui MCP tools** for workflow authoring, execution, model/node ops in natural language.
3. When done → **`npm run comfy:stop`** to free VRAM for LM Studio / Mem0.

**VRAM rules still apply:** MCP does not replace `comfy:start`/`comfy:stop` guards. Never start ComfyUI via MCP auto-restart unless Jon explicitly opts in. Cloud Comfy MCP (`cloud.comfy.org`) is **not** used in this stack.

---

## E. Complete recipe examples

### 1. Cloud generate → local upscale

```powershell
npm run image:gen -- "mountain landscape at sunset"
npm run comfy:start
# Then in profile or agent: upscale-image -InputPath "D:\Hermes\assets\media\JonBeatz\generated-*.png" -TargetSize 4K
npm run comfy:stop
```

### 2. Local generate → edit → stop ComfyUI

```powershell
npm run comfy:start
gen-image-local "futuristic studio desk, photorealistic"
edit-image -InputPath "D:\Hermes\assets\media\JonBeatz\generated-local-*.png" -Prompt "add gold accent lighting" -Strength 0.45
npm run comfy:stop
```

### 3. Mem0 + image session

After a good prompt/style Jon wants to reuse:

```powershell
npm run mem0:add -- "Preferred image style: gold accent studio lighting, photorealistic 4k, FLUX cloud"
```

---

## F. Model & path reference

| Resource | Path |
|----------|------|
| ComfyUI engine | `H:\AI_Models\ComfyUI\` |
| Workflows | `H:\AI_Models\ComfyUI\workflows\` |
| Model cache (H:) | `H:\AI_Models\` |
| JonBeatz outputs | `D:\Hermes\assets\media\JonBeatz\` |
| MSC outputs (website) | `D:\Cursor_Projectz\MyStudioChannel\public\media\` |
| Restore symlinks | `H:\AI_Models\ComfyUI\scripts\repair-comfyui-symlinks.ps1` |
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
| `Cannot set properties of undefined (setting 'read_only')` red toasts | Vue Nodes / Nodes 2.0 on. Set `Comfy.VueNodes.Enabled` **false**, stay in **App** on Lightning AppMode, close stale `:8188` tabs. Python may still have generated. See [LOCAL-COMFY-2512-LIGHTNING.md](./LOCAL-COMFY-2512-LIGHTNING.md) · Website-Templates `IMAGE-PIPELINE.md` |
| Edit-2511 graph / 20-step VAE Encode | Wrong file for new stills. Use **Lightning** AppMode. Edit-2511 is img2img. |

---

## F. Agent instructions

1. Read **this file** before any image/video task in JonBeatz.
2. Run **`npm run image:doctor`** if env or ComfyUI state is unclear.
3. **Cloud first** unless Jon says local/GPU/ComfyUI.
4. **Stop ComfyUI** when done (`npm run comfy:stop`) to free VRAM for LM Studio / Mem0.
5. Save outputs under **`public/media/`** for personal work. This keeps assets served root-relatively by Next.js.
6. Log reusable prompts/styles to **Mem0** + **ReCall.md**.

---

*Last updated: 2026-09-05 · Vue Nodes off / `read_only` toast · Lightning fire-up (warmup then ~22–40s) · +Lightning App Mode · +Edit-2511 multi (3 images) · Hermes-Fable5 App Mode-only (`_archive`) · LMS can't load diffusion GGUFs — ComfyUI only · ComfyUI 0.31 · cu128*
