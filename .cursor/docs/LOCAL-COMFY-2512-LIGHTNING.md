# Free local stills — Qwen-Image-2512 Lightning (any Hermes project)

**Workstation:** shared ComfyUI `H:\AI_Models\ComfyUI` · `:8188` · RTX 16 GB  
**Runtime:** **ComfyUI only.** LM Studio cannot load the 2512 image GGUF. If LMS is open during a Lightning session it should show **no model loaded** — that is correct. Text `qwen3-4b` is for Mem0/Hermes, not images.

**Why this dial:** HBA 2026-08-16/22 locked Lightning as the **free look-test**. Warm plate **~22–40s** @ 1536×768 (Jon’s iterate band **35–55s** is healthy). 20-step keep is quality, not the first sketch. Never `/free` between gens in a session.

## Fire-up (correct warm lane)

1. `npm run comfy:start:qwen` — wait until `http://127.0.0.1:8188/queue` returns 200. LMS empty is correct.
2. Run **one warmup gen at the size you will iterate** (look-test **1536×768**). First plate after start is cold **~2–4 min** (2026-08-27 proof: **181s**). Do not interrupt it.
3. Leave Comfy up. Plate 2+ should be **~22–40s** (same day proof: **20.5s GPU / 22s wall**). That is the lane.
4. When done: `comfy:stop` then `mem0:preflight`.

`:8188` up + VRAM occupied is **not** proof of a warm lane. A slow *finished* gen still poisons the next one.

## From any profile root (JonBeatz, TNIMS, HBA, Next-Flick, …)

```powershell
npm run comfy:start:qwen
# same thing if that alias is missing:
npm run comfy:start -- -UnloadLMStudio -LowVram -NoVRAMCheck
```

Browser: **http://127.0.0.1:8188** → Workflows → **Hermes-Fable5** → **`qwen-image-2512-Lightning-AppMode.json`** → stay in App mode → Prompt → **Run** (first Run = warmup).

**UI hygiene (2026-09-05):** Keep **`Comfy.VueNodes.Enabled` = false** in `ComfyUI\user\default\comfy.settings.json`. Vue Nodes / Nodes 2.0 leaves `app.canvas` undefined → toast `Cannot set properties of undefined (setting 'read_only')` on App↔Graph. Stay in **App**, not Graph. Do **not** open `edit-qwen-2511-AppMode` unless editing an existing image. Empty Media sidebar is normal for API gens. Close stale `:8188` browser tabs. Vault: [[ComfyUI-VueNodes-canvas-read_only]].

Keep Comfy **warm**. When done:

```powershell
npm run comfy:stop
npm run mem0:preflight    # reload qwen3-4b for Mem0
```

**Outputs:** `IMAGE_OUTPUT_DIR` → `D:\Hermes\assets\media\{ProjectName}` (promote keepers into the project `Media/` with RECIPE if it is a book).

## Locked knobs

| | |
|--|--|
| Model | Qwen-Image-2512 **Q4_K_M** + LoRA `Qwen-Image-2512-Lightning-4steps-V1.0-bf16.safetensors` |
| Steps / cfg | **4 / 1** |
| Sampler | **euler** / **simple** |
| Size | Drafts **1024²** or look-test **1536×768** (books) |
| Start flags | `--lowvram` + **unload** LM Studio `qwen3-4b` |
| CLI (HBA) | `npm run comfy:qwen2512:lightning -- "prompt"` · graph `txt2img-qwen-image-2512-lightning.json` |
| CLI (JonBeatz / agent) | `python scripts/comfy-run-workflow.py --workflow "H:\AI_Models\ComfyUI\workflows\txt2img-qwen-image-2512-lightning.json"` · `--timeout 360` on first gen, `120` once warm |

## Do / don’t

| Do | Don’t |
|----|--------|
| Unload LMS before 2512 | Expect 2512 to appear as a loaded model in LM Studio |
| Let the **first** gen after start finish (cold **~2–4 min** load) | Interrupt the first load, then spam more prompts (16 GB thrash → 10–15 min/plate) |
| Leave Comfy running between plates | Click Clear / call `/free` mid-session |
| Picture-book / gouache language in the prompt | One-line “fox in a field” with no style — Lightning goes photoreal |
| `comfy:stop` then `mem0:preflight` when finished | Leave 2512 in VRAM overnight unless you are still dialing |

**If a warm Lightning exceeds ~2 min (or log shows `lowvram patches: 480+` with ~100s/it):** interrupt, then `npm run comfy:stop` → `npm run comfy:start:qwen` → **one warmup gen** → continue. Do not queue another prompt on the poisoned session — GPU at 100% can still be patch-thrash, not a 35s plate. Cause is `--lowvram` UNet↔CLIP↔VAE shuffle on 16 GB, not “Lightning is slow.” Vault: [[ComfyUI-Lightning-lowvram-patch-thrash]]

## Quality upgrade (still free / local)

Same prompt through **20-step** `qwen-image-2512-AppMode` (or HBA keep 28 @ 1536×768 for spreads). Lightning is **not** a print keep.

**Books:** scenery lock on Lightning → Fal HY-WU identity → Banana Pro `/edit` polish. See project `LOCAL-COMFY-PICKER.md` / `PAGE-DIAL-PROCESS.md`. Do not replace locked fal finals with a random local plate unless Jon asks.

**Prompt expander (HBA):** `npm run prompt:expand -- "idea"` then paste into Lightning App Mode.

## Related

- Fleet: `IMAGE-WORKFLOW.md` § App Mode · `ENGINEERING.md` Comfy section  
- Vault: [[Local-image-model-picker-16GB]] · [[ComfyUI-App-Mode-Fable5]]  
- Never `pip install torch` from default PyPI on this box  
