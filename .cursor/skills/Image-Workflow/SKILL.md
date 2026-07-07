---
name: Image-Workflow
description: JonBeatz Hugging Face + ComfyUI complete image pipeline — cloud FLUX, local GPU edit/upscale/video
---

# Image Workflow (JonBeatz)

Use this skill for any image, inpaint, upscale, or video request in the **JonBeatz** profile.

## Read first

1. `.cursor/docs/IMAGE-WORKFLOW.md` — master guide
2. `.cursor/docs/COMFYUI-MODELS.md` — model matrix
3. `.cursor/docs/VRAM-IMAGE.md` — VRAM policy

## Quick commands

```powershell
npm run env:setup           # first-time .env.local
npm run image:doctor        # health check
npm run image:gen -- "prompt"
npm run comfy:start         # only when local GPU needed
npm run comfy:repair-symlinks  # after H: vault moves
npm run comfy:compare -- "prompt"  # all workflows + HF cloud
npm run lmstudio:audit
```

## Decision tree

- **Fast still, VRAM tight, LM Studio up** → HF cloud `image:gen`
- **Local GPU / edit / inpaint / upscale / video** → start ComfyUI, use profile commands or **comfyui MCP** (JonBeatz `.cursor/mcp.json`)
- **Done with ComfyUI** → `comfy:stop`

## Outputs

Personal work: `D:\Hermes\assets\media\JonBeatz`

## Related MSC docs (same workstation)

- `D:\Cursor_Projectz\MyStudioChannel\.cursor\docs\IMAGE-VIDEO-CHEATSHEET.md`
- `D:\Cursor_Projectz\MyStudioChannel\.cursor\docs\comfyui-setup.md`
