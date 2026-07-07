# 3D Web Workflows — Hermes Asset Vault Hub

**Asset vault (binaries, full repos, PDFs):** `D:\Hermes\assets\3d-web-workflows\`  
**Agent docs (synced to every profile):** this file + [SCROLL-3D-REFERENCES.md](./SCROLL-3D-REFERENCES.md) + [3D-WEBSITE-TASTE-CATALOG.md](./3D-WEBSITE-TASTE-CATALOG.md)  
**Skills (single copy):** `_core-scripts/shared-profile-content/skills/` → `npm run sync:skills`  
**Verify:** `npm run workflows:3d:status` from any Hermes web profile

Jon’s curated **prompts, build guides, and reference sites** for premium scroll / 3D / cinematic websites. The vault holds large assets only — **no duplicate skills or docs** inside project repos.

---

## When an agent should read this

| Jon says / task | Start here |
|-----------------|------------|
| Build scroll-video cinematic site | **devini-tea/** vault bundle → `Scroll-Video-Sequence` |
| **Product explode scroll** (2-image Kling clip) | **ai-scroll-product-workflow/WORKFLOW.md** → FFmpeg → `ScrollFrameHero` |
| **Research external workflows** | **`SCROLL-VIDEO-RESEARCH.md`** (vault root) — Masonry, cinematic-scroll-kit, Mejba, etc. |
| Premium agency landing (motion-first) | **premium-site-workflow/** → `Premium-UI` + `NovaMira-Design` |
| Canvas frame-sequence Next.js site | **3d-scroll-website** skill (shared library) |
| Iron Man / HUD cinematic marketing | **IronMan/iron-man-main** reference |
| Luxury scroll system (MAVRA) | **MAVRA_Build_Guide.md** |
| Pick accent / scroll color-shift | [3D-WEBSITE-TASTE-CATALOG.md](./3D-WEBSITE-TASTE-CATALOG.md) |
| **RoboNuggets HTML module** (sticky stack, cursor trail, …) | **`robonuggets/INDEX.md`** → port to Next.js |
| New `-Website` bootstrap | `bootstrap-new-project.ps1 -Website` |

**Cursor prompt:** `.cursor/prompts/Build-3D-Website.md`

---

## Vault inventory (assets only)

| Bundle | Path | Use when |
|--------|------|----------|
| **devini-tea** | `devini-tea/devini-tea-main/` + `BUILD-GUIDE.md` | Scroll scrubs **video** frame-by-frame |
| **ai-scroll-product** | `ai-scroll-product-workflow/WORKFLOW.md` | **2-image → Kling/Veo → FFmpeg** product explode hero |
| **Scroll-video research index** | `SCROLL-VIDEO-RESEARCH.md` | External step-by-step guides + prompt library + tool matrix |
| **Iron Man reference** | `IronMan/iron-man-main/` | Next.js Lenis + GSAP HUD / cinematic sections |
| **Iron Man video clips** | `IronMan/video-assets/` | Kling source footage for hero experiments |
| **premium-site-workflow** | `premium-site-workflow/CLAUDE.md` + PDF | Agency landing workflow (Luke) |
| **MAVRA** | `MAVRA_Build_Guide.md` | Full luxury scroll playbook |
| **RoboNuggets modules** | `robonuggets/cinematic-site-components/` + `INDEX.md` | 30 single-file GSAP scroll/cursor HTML demos |
| **RoboNuggets design inspo** | `robonuggets/design-inspo/` | Live HTML taste samples (CC BY 4.0) |

---

## Shared library (not in vault)

| Item | Path | Install |
|------|------|---------|
| **3d-scroll-website skill** | `shared-profile-content/skills/3d-scroll-website/` | `npm run sync:skills` |
| **Scroll / 3D skills** | `shared-profile-content/skills/` | `npm run sync:skills:global` |
| **Taste catalog** | synced to `.cursor/docs/3D-WEBSITE-TASTE-CATALOG.md` | `npm run sync:docs -- -Write` |

Read `references/00-hermes-adapter.md` inside **3d-scroll-website** before coding (`motion/react`, not `framer-motion`).

---

## Hermes skill read order

1. **NovaMira-Design** → **MSC-UI-Taste** → taste catalog accent  
2. **Scroll-Video-Sequence** or **3d-scroll-website**  
3. **Scroll-Motion** (Lenis + GSAP)  
4. **3D-Website-Fusion** (live R3F backdrop)  
5. **Motion-Accessibility** (required gate)

```powershell
npm run sync:skills
npm run scroll:motion:status
npm run workflows:3d:status
```

---

## Workflow picker

| You want… | Vault | Skill |
|-----------|-------|-------|
| Apple-style **image** frame scrub | — | `3d-scroll-website` + `Scroll-Video-Sequence` |
| **Product assembled→exploded** scroll | `ai-scroll-product-workflow/` | Notion workflow · Kling + FFmpeg |
| Scroll scrubs **video** | `devini-tea/devini-tea-main/` | `Scroll-Video-Sequence` |
| Agency landing, video hero | `premium-site-workflow/` | `Premium-UI`, `frontend-design` |
| Live 3D + page scroll | `IronMan/iron-man-main/` (reference) | `3D-Website-Fusion` |
| Full luxury playbook | `MAVRA_Build_Guide.md` | All scroll skills |

---

## Adding new bundles

1. `D:\Hermes\assets\3d-web-workflows\<Name>\` — assets only  
2. Update this doc + vault `README.md`  
3. New skill → `shared-profile-content/skills/` → `npm run sync:skills:global`  
4. `npm run sync:docs -- -Write -AddMissing` from JonBeatz  

**Never** copy the vault into `.cursor/3d-web-workflows/` inside a project.

---

## Related

- [SCROLL-3D-REFERENCES.md](./SCROLL-3D-REFERENCES.md)
- [DESIGN-REFERENCES.md](./DESIGN-REFERENCES.md)
- [IMAGE-WORKFLOW.md](./IMAGE-WORKFLOW.md)
- Vault README: `D:\Hermes\assets\3d-web-workflows\README.md`
