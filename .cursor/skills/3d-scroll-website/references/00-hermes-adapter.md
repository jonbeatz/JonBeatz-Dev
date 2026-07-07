# Hermes adapter — read before building

This skill pack is vendored from Devini Labs. On Hermes profiles, **combine** it with curated skills — do not treat it as the only source of truth.

## Stack overrides (Hermes)

| Skill pack says | Hermes uses |
|-----------------|-------------|
| `framer-motion` | **`motion/react`** — import `{ motion } from "motion/react"` |
| Manual Lenis setup | **`Scroll-Motion`** skill + `components/SmoothScrollProvider.tsx` |
| Three.js for scroll hero | **Prefer canvas frame sequence** (`Scroll-Video-Sequence`) unless user wants live R3F |

## Read order on Hermes

1. `.cursor/docs/3D-WEB-WORKFLOWS.md` — vault paths + bundle picker
2. `.cursor/docs/3D-WEBSITE-TASTE-CATALOG.md` — accent tokens
3. This skill’s references 01–07 for Devini-specific patterns
4. **`Motion-Accessibility`** before ship

## Asset vault

Heavy repos, PDFs, and reference sites ( **not** skills — those live in shared library):

`D:\Hermes\assets\3d-web-workflows\`

| Bundle | Path |
|--------|------|
| devini-tea | `devini-tea/devini-tea-main/` |
| Iron Man | `IronMan/iron-man-main/` |
| Premium workflow | `premium-site-workflow/CLAUDE.md` |

## Verify baseline

```powershell
npm run scroll:motion:status
npm run workflows:3d:status
```
