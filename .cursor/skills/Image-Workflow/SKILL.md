---
name: Image-Workflow
description: Hermes fleet Hugging Face + fal + ComfyUI image pipeline — cloud stills, local GPU edit/upscale, Fable 5 model dials
---

# Image Workflow (Hermes fleet)

Use this skill for image, inpaint, upscale, or video requests in any Hermes profile that shares the workstation ComfyUI stack.

## Read first

1. `.cursor/docs/LOCAL-COMFY-2512-LIGHTNING.md` — **free local stills (any project)**
2. `.cursor/docs/IMAGE-WORKFLOW.md` — master guide (includes **App Mode**)
3. `.cursor/docs/ENGINEERING.md` — Comfy model inventory + VRAM
4. Book projects: `IMAGE-LANE-SYSTEM-v2.md` + `LOCAL-COMFY-PICKER.md` when present
5. Vault: `[[Local-image-model-picker-16GB]]` · `[[ComfyUI-App-Mode-Fable5]]`

## Quick commands

```powershell
npm run env:setup           # first-time .env.local
npm run image:doctor        # env + vault<->Comfy hardlink health
npm run comfy:hardlink-check
npm run image:gen -- "prompt"   # HF cloud (if profile has it)
npm run image:fal -- "prompt"   # fal paid (if profile has it)
npm run comfy:start:qwen    # unload LMS + lowvram — default 2512 Lightning start
npm run comfy:start -- -UnloadLMStudio -LowVram
npm run comfy:status
npm run comfy:stop
npm run mem0:preflight      # restore qwen3-4b after unload
```

## Decision tree

- **Free local still (any project)** → `comfy:start:qwen` → App Mode **`qwen-image-2512-Lightning-AppMode`** (~22–40s warm)
- **Keep LMS loaded / photoreal cloud** → HF `image:gen` or fal
- **Website / v0-like photoreal** → fal `flux-2-pro` (pack) → `flux-2-max` or `nano-banana-pro` (keepers). Not Klein. See IMAGE-WORKFLOW three-tier table (2026-09-05).
- **Book dials / print finals** → project IMAGE-LANE (Lightning scenery → Fal HY-WU → Banana Pro)
- **20-step local keep** → `qwen-image-2512-AppMode` · **edit** → Edit-2511 · **z-image** Q4/BF16 · **Flux** Klein
- **Done with ComfyUI** → `comfy:stop` then `mem0:preflight`

## App Mode (default easy path)

1. `npm run comfy:start:qwen` → http://127.0.0.1:8188 (wait for `/queue` 200)
2. Open `Hermes-Fable5/qwen-image-2512-Lightning-AppMode.json` (user library)
3. Stay in **App** mode → edit Prompt / size / seed → **Run**. First Run after start is **warmup** (~2–4 min). Timed 35–55s plates start on Run 2. No Clear / `/free`.
4. If a later plate exceeds ~2 min: `comfy:stop` → `comfy:start:qwen` → one warmup. VRAM occupied ≠ warm. Card: `LOCAL-COMFY-2512-LIGHTNING.md`
5. Quality: `qwen-image-2512-AppMode.json`. Edit: `edit-qwen-2511-AppMode.json`
6. `npm run comfy:stop` then `mem0:preflight`

## Stack facts (2026-08-08)

- ComfyUI **0.31.0** · torch **2.11.0+cu128** · shared `H:\AI_Models\ComfyUI`
- Models: `H:\LLM_VAULT` GGUFs + hardlinks; BF16 under ComfyUI `diffusion_models/`
- App Mode files: `ComfyUI\user\default\workflows\Hermes-Fable5\*-AppMode.json`
- Never `pip install torch` from default PyPI on this box
## Outputs

`IMAGE_OUTPUT_DIR` → `D:\Hermes\assets\media\{ProjectName}`

## Related MSC docs (same workstation)

- `D:\Cursor_Projectz\MyStudioChannel\.cursor\docs\IMAGE-VIDEO-CHEATSHEET.md`
- `D:\Cursor_Projectz\MyStudioChannel\.cursor\docs\comfyui-setup.md`
