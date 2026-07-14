# Vault PDF & DOCX Index — 3D Web Workflows

**Vault root:** `D:\Hermes\assets\3d-web-workflows\`  
**Last full read:** 2026-07-13 (Python `pypdf` + `python-docx` via `npm run vault:pdf:inventory`)  
**Doc Mo addendum:** 2026-07-13 — **16 PDFs** in `docmo-guides-pdf/` — indexed in [DOCMO-GUIDES-INDEX.md](./DOCMO-GUIDES-INDEX.md) (patterns + catalog; not line-by-line like Luke/RIFT below).

Hermes has **3 legacy PDFs** + **2 DOCX** in premium/web-xtraz bundles, plus **16 Doc Mo PDFs** in `docmo-guides-pdf/` (see DOCMO-GUIDES-INDEX).

---

## Summary table

| File | Pages | Size | Author / source | Hermes role |
|------|-------|------|-----------------|-------------|
| `premium-site-workflow/Build Premium Sites with AI.pdf` | 20 | ~3.8 MB | Luke (agency) | **Canonical** with `CLAUDE.md` — motion-first agency landing primer |
| `web-xtraz/Guide.pdf` | 10 | ~149 KB | Vigneshwari | **Archive** — generic 5-phase premium AI site workflow (overlaps Luke PDF) |
| `web-xtraz/webguide.pdf` | 14 | ~30 KB | RIFT Scroll-Cinema | **Archive** — multi-clip scroll-scrub engine whitepaper (Higgsfield/Kling pipeline) |
| `web-xtraz/Devini-Labs-Scroll-Website-Build-Guide.docx` | — | ~1.5 MB | Devini Labs | **Archive** — TEA master prompt export; canonical = `devini-tea/BUILD-GUIDE.md` |
| `web-xtraz/Ai site prompt v1.docx` | — | ~7 KB | Social prompt | **Archive** — one-shot dark luxury agency prompt (Three.js + GSAP + Lenis) |

---

## premium-site-workflow — Build Premium Sites with AI.pdf

**Pairs with:** `premium-site-workflow/CLAUDE.md` · summary in [VAULT-BUNDLE-SUMMARIES.md](./VAULT-BUNDLE-SUMMARIES.md) § premium-site

**What it is:** Luke's free open primer — *"Build Sites with AI"* — for non-coders using Claude app + Claude Code.

**Five phases (PDF structure):**

| Phase | Topic |
|-------|--------|
| **1 — Reference** | Pinterest / Behance / MotionSites / Dribbble — 5–8 refs with distinct roles (mood, brand system, hero hook, structure, micro-detail) |
| **2 — Setup** | Install Claude app + Claude Code; add official + community skills for design taste |
| **3 — Visuals & motion** | Hero stills + short loops; image/motion tool prompts |
| **4 — Build** | Structure → motion → polish (three rounds, not one mega-prompt) |
| **5 — Components** | Import premium sections (forms, pricing, marquees) vs rebuilding |

**Key ideas:** Plan long, execute short; `CLAUDE.md` in project folder sets premium defaults; Motion.dev for animation; restraint over decoration.

**Hermes mapping:** `Premium-UI` + `frontend-design` + `image:gen` / `video:fal` + `motion/react` — see `3D-DEV-SETUP.md`.

---

## web-xtraz — Guide.pdf

**What it is:** Third-party *Premium Website Workflow* by Vigneshwari — beginner-oriented, parallels Luke PDF structure.

**Phases:** (1) Collect references by direction (minimal luxury / SaaS / editorial / dark futuristic), (2) Set up Claude + Claude Code + motion library, (3) Visuals & motion (hero still → loop → compress), (4) Build in 3 rounds (structure / motion / polish), (5) Premium components.

**End matter:** Services contact (email/phone) — commercial guide, not Hermes-authored.

**Hermes use:** Inspiration for Phase 1 reference ritual; **do not** treat as stack authority (Hermes uses Next.js + fleet skills, not Claude-only path).

---

## web-xtraz — webguide.pdf (RIFT Scroll-Cinema Build System)

**Subtitle:** *How a single rendered clip becomes a 60 fps, scroll-scrubbed product film* — RIFT concept sneaker edition 1.0 (2026).

**What it is:** Technical whitepaper for a **six-act scroll-cinema engine** — multiple Kling clips + stills, frame capture via `requestVideoFrameCallback`, scroll segments with reversed acts for free motion.

**Six scroll acts:**

| Act | Source | Scroll span |
|-----|--------|-------------|
| Deconstruct | forward clip | 0–17% |
| Reassemble | same clip reversed | 17–34% |
| Orbit | orbit clip | 34–51% |
| Bridge | orbit-end → hero | 51–66% |
| Detail | macro push-in | 66–83% |
| Reveal | macro reversed | 83–100% |

**Production pipeline (doc uses Higgsfield):** Nano Banana stills → Kling 3.0 clips (deconstruct, orbit, macro, bridge) → Topaz upscale. Prompts included for sneaker hero / exploded / orbit / macro.

**Engine details:** Canvas capture at device width (mobile floor ~900px); live CSS filters (brightness/contrast/saturate); edge vignette; IndexedDB cache; reduced-motion static fallback.

**Hermes mapping:**

| Doc path | Fleet equivalent |
|----------|------------------|
| 2-still product explode | `ai-scroll-product-workflow/` + `video:fal` |
| Multi-clip scrub | `devini-tea` (single merged film) or canvas `ScrollFrameHero` |
| Higgsfield MCP recipe | **WATCH** `scroll-cinematic-claude` — Jon uses **fal**, not Higgsfield |
| Quality gate | **ADOPT** `cinematic-scroll-skill` doctor |

---

## web-xtraz — Devini-Labs-Scroll-Website-Build-Guide.docx

**What it is:** Full **TEA** luxury scroll playbook export — 10 image prompts, 5 video clip prompts, master Claude Code prompt for single-file Express + canvas scroll hero (~227 frames, Lenis + GSAP).

**Canonical Hermes paths (prefer these):**

- `devini-tea/BUILD-GUIDE.md`
- `devini-tea/devini-tea-main/` (source + frames on disk)
- Skills: `Scroll-Video-Sequence`, `3d-scroll-website`, `Scroll-Motion`

**Drift note:** DOCX duplicates BUILD-GUIDE content; edit vault markdown + source repo, not this export, when updating workflow.

---

## web-xtraz — Ai site prompt v1.docx

**What it is:** Single Instagram-style agency prompt — dark luxury, cinematic storytelling, abstract 3D sculptures, particles, oversized type.

**Stack listed:** Three.js/WebGL, GSAP ScrollTrigger, GLSL/bloom, Lenis, monochrome + accent.

**Hermes use:** Paste into `frontend-design` brief or taste catalog accent pick — not a full build ritual. For ship path use `3D-Website-Fusion` + `Scroll-Motion`.

---

## web-xtraz — 3d-scroll-website-skill-pack/

**Not a PDF** — included because it sits beside the guides.

| Item | Note |
|------|------|
| `README.md` | Devini/reel skill pack install instructions |
| `3d-scroll-website/SKILL.md` + 7 references | **Duplicate** of `_core-scripts/shared-profile-content/skills/3d-scroll-website/` |

**Policy:** Never `sync:skills` from this folder — fleet canonical skill only.

---

## Refresh inventory

```powershell
npm run vault:pdf:inventory          # JonBeatz — re-extract all PDF/DOCX to JSON report
npm run vault:pdf:inventory -- -Write # also refresh this file's machine summary (when implemented)
```

Manual re-read after adding new PDFs to the vault.

---

## Related

- [VAULT-BUNDLE-SUMMARIES.md](./VAULT-BUNDLE-SUMMARIES.md)
- [3D-DEV-SETUP.md](./3D-DEV-SETUP.md)
- [DESIGN-REFERENCES.md](./DESIGN-REFERENCES.md)

**Last updated:** 2026-07-13
