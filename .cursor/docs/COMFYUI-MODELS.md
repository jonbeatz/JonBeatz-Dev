# ComfyUI Model Library — pointer

**Canonical inventory lives in [ENGINEERING.md](./ENGINEERING.md)** (section *Source: COMFYUI-MODELS.md* at the top).

### Locked local dials (2026-08-08)

| Job | Workflow |
|-----|----------|
| **Free local still (default)** | Lightning App Mode / `txt2img-qwen-image-2512-lightning.json` — [LOCAL-COMFY-2512-LIGHTNING.md](./LOCAL-COMFY-2512-LIGHTNING.md) |
| Fast z-image iterate | `txt2img-z-image-turbo.json` (Q4) |
| Fast keep | `txt2img-z-image-turbo-bf16.json` |
| Best 2512 quality | `txt2img-qwen-image-2512.json` (20-step keep) |
| Local edit | `edit-image-qwen-2511.json` |
| Flux quality (NC) | `txt2img-flux-klein-9b.json` |
| Flux speed / Apache | `txt2img-flux-klein.json` |

**Runtime:** ComfyUI only (`H:\AI_Models\ComfyUI` · `:8188` · v0.31.0 · torch cu128). LM Studio cannot load diffusion GGUFs.

Also: [IMAGE-WORKFLOW.md](./IMAGE-WORKFLOW.md) · vault `[[Local-image-model-picker-16GB]]`
