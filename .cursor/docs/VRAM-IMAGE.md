# VRAM + Image — pointer

**Canonical VRAM playbook lives in [ENGINEERING.md](./ENGINEERING.md)** (VRAM-IMAGE section) and [IMAGE-WORKFLOW.md](./IMAGE-WORKFLOW.md).

### Hard rules (16 GB RTX)

1. Never auto-start ComfyUI — `npm run comfy:start` / operator ask / `COMFYUI_AUTO_START=1` only.
2. Prefer `npm run comfy:stop` when done (keeps LM Studio).
3. Before **Qwen-Image-2512** / **Edit-2511**: `lms unload qwen3-4b-instruct-2507` (or `comfy:start -- -UnloadLMStudio -LowVram`). Restore: `npm run mem0:preflight`.
4. Klein + z-image (Q4/BF16) are OK with `qwen3-4b` resident.
5. Never `pip install torch` from default PyPI on this box (CPU torch breaks CUDA).

Agent rule: `.cursor/rules/comfyui-vram.mdc`
