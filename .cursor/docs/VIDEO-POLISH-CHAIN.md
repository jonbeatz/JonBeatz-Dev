# VIDEO-POLISH-CHAIN.md — Hermes short-form polish lane

**Canonical:** `D:\Hermes\projects\_core-scripts\shared-profile-content\docs\VIDEO-POLISH-CHAIN.md`  
**Status:** IN USE (2026-07-14)  
**Goal:** One repeatable path from generated clip → agent cut/QC → optional human timeline → publish-ready file.

---

## The chain (default)

```text
[1 GEN]   fal Kling / OpenMontage master
    ↓
[2 CUT]   Kinocut (CLI or Cursor MCP) — trim · 9:16 · quality-check
    ↓
[3 HUMAN] FreeCut (freecut.net) — optional timeline polish
    ↓
[4 OUT]   D:\Hermes\apps\kinocut-media\polish-out\
```

| Stage | Tool | When |
|-------|------|------|
| **1 Gen** | `npm run video:fal` or OpenMontage | Need new pixels / agent pipeline |
| **2 Cut** | **Kinocut** IN USE | Always for Shorts / QC before publish |
| **3 Human** | **FreeCut** [freecut.net](https://freecut.net) (**IN USE**) | Timing, titles, music ears-on |
| **4 Out** | File explorer / ScrollFrameHero FFmpeg | Hand to site or archive |

**Not this chain:** cinematic-scroll-skill (web motion), Wan2.1 (local I2V gen) — stay ADOPT on their own lanes.

---

## Folders

| Path | Role |
|------|------|
| `D:\Hermes\apps\kinocut-media\inbox\` | Drop fal / OpenMontage masters here |
| `D:\Hermes\apps\kinocut-media\work\` | Intermediate Kinocut renders |
| `D:\Hermes\apps\kinocut-media\polish-out\` | Final agent-polished exports |
| `D:\Hermes\apps\freecut-workspaces\` | FreeCut File System Access workspace (pick once in browser) |

---

## Commands

```powershell
cd D:\Hermes\projects\JonBeatz

# Smoke doctor for the polish tools
npm run video:polish:status

# Agent cut: trim + vertical + quality check → polish-out
npm run video:polish -- -InputPath "D:\Hermes\apps\kinocut-media\inbox\clip.mp4"

# Custom window + open FreeCut when done
npm run video:polish -- -InputPath "D:\path\to\master.mp4" -Start 2 -Duration 45 -AspectRatio 9:16 -OpenFreeCut

# Gen-only still works as before
npm run video:fal -- -StartImage a.png -EndImage b.png
```

### Cursor agent path (same chain)

1. Put absolute path under `kinocut-media\inbox\` (or any absolute path).  
2. Ask agent: *trim to N seconds, resize 9:16, quality-check, write under polish-out*.  
3. Optional: open FreeCut, import from `polish-out`, export again into same folder.

Kinocut MCP tools: `video_info`, `video_trim` / CLI `kino trim`, `video_resize`, `video_quality_check`.

---

## Lane recipes

### A — Scroll transition Short (most common)

1. Still: `npm run image:gen` / `image:fal`  
2. Clip: `npm run video:fal -- -StartImage assembled.png -EndImage exploded.png`  
3. Polish: `npm run video:polish -- -InputPath <mp4> -AspectRatio 9:16` (or keep 16:9 for hero)  
4. Frames for site: existing FFmpeg → WebP → `ScrollFrameHero` (vault `ai-scroll-product-workflow`)  
5. FreeCut only if you need human trim after fal.

### B — OpenMontage master → polish

1. Produce master in `D:\Hermes\assets\openmontage` (see `AGENT_GUIDE.md`).  
2. Copy into `kinocut-media\inbox\`.  
3. `npm run video:polish -- -InputPath ... -OpenFreeCut`.  
4. Human pass in FreeCut if needed; keep OpenMontage as generation engine.

### C — Chat-only (no npm)

Drop a file path → Kinocut MCP does cut/QC → open [freecut.net](https://freecut.net) for ears-on.

---

## FreeCut (promoted P3)

| Decision | Why FreeCut over cinematic-scroll / Wan for this gap |
|----------|------------------------------------------------------|
| **IN USE** | Completes **human polish** after Kinocut — cinematic-scroll is website motion; Wan is local gen |
| **How** | Browser: [freecut.net](https://freecut.net) — Chrome/Edge; workspace `D:\Hermes\apps\freecut-workspaces` |
| **Not** | Desktop install / perpetual `:5173` unless offline needed later |

```powershell
npm run freecut:open
```

Brave: enable File System Access flag if workspace picker fails.

---

## Verify

```powershell
npm run kinocut:status
npm run video:polish:status
npm run openmontage:status   # only if using lane B
```

Smoke (built-in after install):

```powershell
# Uses existing smoke clip if present, else fails with path hint
npm run video:polish -- -InputPath "D:\Hermes\apps\kinocut-media\smoke-src.mp4" -Duration 1 -AspectRatio 9:16
```

---

## Guardrails

- Keep **sources** outside `work\` — copy into inbox first.  
- Do not stack ComfyUI + FreeCut AI models + Wan on 16 GB VRAM.  
- Kinocut Whisper extras optional — captions can wait.  
- MSC / Neon / live brand DNS are unrelated to this media folder.
- **Windows note:** Kinocut `video-quality-check` may report signalstats FAIL on `D:\` paths (ffprobe `movie=` colon bug). Trim/resize still succeed; use `-SkipQualityCheck` to silence, or re-check on a path without quirks later.

---

## Related

- [IMAGE-WORKFLOW.md](./IMAGE-WORKFLOW.md) § `video:fal`  
- [TOOLS-REFERENCE.md](./TOOLS-REFERENCE.md) § Kinocut · FreeCut · OpenMontage  
- OpenMontage vault: `D:\Hermes\assets\openmontage\AGENT_GUIDE.md`  
- Friend VPS finish: parked (box ready in a few days) — [JonBeatz `VPS-PLAYGROUND-RESEARCH.md`](file:///D:/Hermes/projects/JonBeatz/.cursor/docs/VPS-PLAYGROUND-RESEARCH.md)
