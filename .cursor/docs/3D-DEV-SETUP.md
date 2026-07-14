# 3D Web Dev Setup — Hermes Best Practice

**Operator:** Jon · **Fleet hub:** JonBeatz · **Last audited:** 2026-07-13

Single reference for building premium scroll / 3D / cinematic sites on the Hermes stack.

---

## Architecture

```
D:\Hermes\assets\3d-web-workflows\     Asset vault (guides, repos, frames, HTML modules)
_core-scripts\shared-profile-content\    Skills, templates, docs (fleet-synced)
{project}\.cursor\                       Synced copy via npm run sync:skills / sync:docs
```

**Rule:** Never copy the vault into project `.cursor/`. Reference paths only.

---

## Daily commands (from any web profile root)

```powershell
npm run workflows:3d:status      # vault + shared wiring
npm run scroll:motion:status       # gsap/lenis/three/motion deps
npm run sync:skills                # pull shared skills
npm run sync:docs -- -Write        # refresh 3D hub docs
npm run vault:robonuggets          # refresh RoboNuggets HTML repos (JonBeatz)
npm run vault:cinematic-scroll-skill   # clone MustBeSimo craft skill + doctor (JonBeatz)
npm run vault:pdf:inventory            # re-extract all vault PDF/DOCX text (audit)
```

**Media pipeline:**

```powershell
npm run image:gen                  # HF cloud stills (zero VRAM)
npm run video:fal                  # Kling/Veo clips (when configured)
# FFmpeg → WebP/JPG → public/sequence/ → ScrollFrameHero
```

---

## Asset inventory (D:\Hermes audit 2026-07-13)

| Bundle | On disk | Notes |
|--------|---------|-------|
| **devini-tea** | ✅ source + **~586 media** | `public/frames/` JPG sequence present |
| **IronMan** | ✅ 169 + 169 frames | `public/frames/` + `frames2/` |
| **IronMan/video-assets** | ✅ 2 files | Kling source clips |
| **ai-scroll-product** | ✅ WORKFLOW.md | `source/` + `frames/` staging empty (fill per project) |
| **MAVRA** | ✅ 622-line guide | Duplicate at `D:\Hermes\assets\docs\` |
| **premium-site** | ✅ CLAUDE.md + **PDF** | `Build Premium Sites with AI.pdf` (~3.8 MB) |
| **robonuggets** | ✅ 30 modules + 5 inspo | Entry 005 missing in design-inspo |
| **design-agent-solpowa** | ✅ | **Now in shared** `Design-Engineer` skill |
| **cinematic-scroll-skill** | ✅ vendored | MustBeSimo — doctor, tokens, themes, 11 visual systems |
| **web-xtraz** | ✅ archive (5 files read) | Guide.pdf + RIFT webguide.pdf + 2 docx + skill pack dup — see `VAULT-PDF-INDEX.md` |
| **docmo-guides-pdf** | ✅ **16 PDFs** (2026-07-13) | Doc Mo agency guides — scroll scrub, sliders, AI ads — see `DOCMO-GUIDES-INDEX.md` |
| **SCROLL-VIDEO-RESEARCH** | ✅ | Vault-only living index |
| **cinematic-scroll-kit** | ❌ not vendored | GitHub GUIDE only — tier C external (distinct from cinematic-scroll-skill) |

**Duplicate / alias paths (do not edit):**
- `D:\Hermes\assets\xtraz\design-agent-soulpowa\` — typo copy; canonical = vault `design-agent-solpowa`
- `D:\Hermes\assets\xtraz\Code-ZenithAI-Assets\iron-man-main.zip` — archive; use vendored repo

---

## Skill read order (build ritual)

1. **frontend-design** — anti-slop brief
2. **NovaMira-Design** → **MSC-UI-Taste** → pick taste catalog accent
3. Pipeline skill (pick one):
   - `Scroll-Video-Sequence` + `3d-scroll-website` — canvas frame hero
   - `3D-Website-Fusion` — live R3F backdrop
4. **Scroll-Motion** — Lenis + GSAP
5. **cinematic-scroll-skill** (vault) — optional doctor/tokens/themes pass before ship
6. **Design-Engineer** — screenshot polish pass
7. **Motion-Accessibility** — required gate before ship

**Prompt:** `.cursor/prompts/Build-3D-Website.md`

---

## Template components (copy from shared)

| File | Purpose |
|------|---------|
| `templates/ThreeBackground.tsx` | R3F backdrop + scroll color-shift |
| `templates/SmoothScrollProvider.tsx` | Lenis ↔ GSAP bridge |
| `templates/components/ScrollFrameHero.tsx` | Canvas frame sequence + loader gate |
| `templates/components/CinematicBeatOverlay.tsx` | Scroll-linked quote cards (Iron Man) |
| `templates/components/HudFrame.tsx` | HUD corner brackets |
| `templates/lib/scrollBeats.ts` | Beat timing types |
| `templates/lib/useScrollFrameProgress.ts` | Read progress from ScrollFrameHero |
| `templates/lib/useSplitType.ts` | MAVRA SplitType line reveals |
| `templates/components/ParallaxStack.tsx` | Multi-layer parallax |

---

## Local dev frame sources (no generation needed)

| Use case | Path |
|----------|------|
| Tea scroll demo frames | `D:\Hermes\assets\3d-web-workflows\devini-tea\devini-tea-main\public\frames\` |
| Iron Man hero | `...\IronMan\iron-man-main\public\frames\` |
| Iron Man cinematic beat | `...\IronMan\iron-man-main\public\frames2\` |
| Showcase dev | Copy subset to `public/showcase/sequence/` or symlink in dev |

**Symlink example (PowerShell, project root):**

```powershell
New-Item -ItemType Directory -Force -Path public\showcase | Out-Null
cmd /c mklink /J public\showcase\sequence "D:\Hermes\assets\3d-web-workflows\devini-tea\devini-tea-main\public\frames"
```

---

## Workflow tiers (source media)

| Tier | Pattern | Vault start |
|------|---------|-------------|
| **A** | 2 stills → 1 Kling clip → explode | `ai-scroll-product-workflow/WORKFLOW.md` |
| **B** | 10+ stills → multi-clip → merge | `devini-tea/BUILD-GUIDE.md` |
| **C** | 9×2 start/end → 9 clips crossfade | cinematic-scroll-kit (external) |

Full matrix: vault `SCROLL-VIDEO-RESEARCH.md` · summary in `SCROLL-3D-REFERENCES.md`

---

## Production stack (ship checklist)

```
HTML scroll (Lenis desktop-only, native on mobile)
├── ScrollFrameHero (canvas frames, NOT <video> scrub)
├── GSAP ScrollTrigger sections (Scroll-Motion)
├── CinematicBeatOverlay + HudFrame (optional HUD sites)
├── ThreeBackground R3F backdrop (3D-Website-Fusion)
├── motion/react micro-motion
├── View Transitions (route morphs)
└── Motion-Accessibility gate (reduced-motion + CWV)
```

**Verify before PR:**

```powershell
npm run build                    # or project verify script
# HTTP smoke :3000/ + hero route
```

---

## Docs map

| Doc | Role |
|-----|------|
| [3D-WEB-WORKFLOWS.md](./3D-WEB-WORKFLOWS.md) | Agent hub + bundle picker |
| [SCROLL-3D-REFERENCES.md](./SCROLL-3D-REFERENCES.md) | Pattern map + RoboNuggets table |
| [VAULT-BUNDLE-SUMMARIES.md](./VAULT-BUNDLE-SUMMARIES.md) | MAVRA / Luke / Iron Man / cinematic-scroll-skill summaries |
| [VAULT-PDF-INDEX.md](./VAULT-PDF-INDEX.md) | Full read of every vault PDF/DOCX (2026-07-13) |
| [DOCMO-GUIDES-INDEX.md](./DOCMO-GUIDES-INDEX.md) | Doc Mo 16-PDF catalog + scroll/configurator/ad patterns (2026-07-13) |
| [3D-WEBSITE-TASTE-CATALOG.md](./3D-WEBSITE-TASTE-CATALOG.md) | Accent palettes + font inspo |
| [HERMES-SHOWCASE-SPEC.md](./HERMES-SHOWCASE-SPEC.md) | Motion lab `/showcase` |
| [IMAGE-WORKFLOW.md](./IMAGE-WORKFLOW.md) | Stills + video generation |

---

## cinematic-scroll-skill (vault — ADOPT)

**Path:** `D:\Hermes\assets\3d-web-workflows\cinematic-scroll-skill\`  
**Refresh:** `npm run vault:cinematic-scroll-skill` (JonBeatz hub)

MIT craft skill — DTCG tokens, 11 themes, `cinematic-doctor` (0–100 CI gate), `page-proof`, CinematicBench. Complements Hermes `Scroll-Motion` + `Scroll-Video-Sequence`; does **not** replace fal/Kling media pipeline.

```powershell
cd D:\Hermes\assets\3d-web-workflows\cinematic-scroll-skill
npm install
npm run doctor -- examples/noir/index.html
```

**Grade:** A- (92) · **Verdict:** ADOPT · See [TOOLS-REFERENCE.md](./TOOLS-REFERENCE.md) § cinematic-scroll-skill.

---

## Related repos (not in vault)

| Repo | When |
|------|------|
| [cinematic-scroll-kit](https://github.com/yojahny55/cinematic-scroll-kit) | Tier C multi-chapter — read GUIDE.md (different from MustBeSimo skill) |
| [scroll-cinematic-claude](https://github.com/zubair-trabzada/scroll-cinematic-claude) | WATCH — Higgsfield MCP scroll recipe; Hermes uses fal |
| [fullPage scroll effects](https://alvarotrigo.com/fullPage/scroll-effects/) | WATCH — section transitions; paid license for commercial |
| [scroll-cinema](https://github.com/vvlars-cmd/scroll-cinema) | WATCH — browser MP4→frames prototype |

**Last updated:** 2026-07-13
