# Build 3D / Scroll Website — Hermes Workflow

## Trigger

Jon says **build 3d site**, **scroll website**, **cinematic landing**, **frame sequence hero**, or starts a `-Website` bootstrap.

---

## Step 1 — Read (in order)

1. `.cursor/docs/3D-WEB-WORKFLOWS.md` — vault paths + bundle picker
2. `.cursor/docs/SCROLL-3D-REFERENCES.md` — pattern map
3. `.cursor/docs/3D-WEBSITE-TASTE-CATALOG.md` — pick taste (default: Studio Gold)
4. Skills: **NovaMira-Design** → **MSC-UI-Taste** → pick pipeline below

**Vault is assets-only:** `D:\Hermes\assets\3d-web-workflows\` — never copy into project `.cursor/`.

---

## Step 2 — Pick pipeline

| Goal | Vault path | Skills |
|------|------------|--------|
| Canvas JPG frame scrub | (skill only) | `3d-scroll-website`, `Scroll-Video-Sequence`, `Scroll-Motion` |
| Scroll scrubs **video** | `D:\Hermes\assets\3d-web-workflows\devini-tea\devini-tea-main\` | `Scroll-Video-Sequence` |
| Premium agency / video hero | `...\premium-site-workflow\CLAUDE.md` | `Premium-UI`, `frontend-design` |
| Live 3D backdrop + scroll | `...\IronMan\iron-man-main\` | `3D-Website-Fusion`, `Scroll-Motion` |
| Full luxury playbook | `...\MAVRA_Build_Guide.md` | All scroll skills |

Read `references/00-hermes-adapter.md` in **3d-scroll-website** before coding.

---

## Step 3 — Verify stack

```powershell
npm run scroll:motion:status
npm run workflows:3d:status
npm run sync:skills
```

Wrap layout with `SmoothScrollProvider` when using GSAP ScrollTrigger.

---

## Step 4 — Build gates

- **Motion-Accessibility** — reduced-motion path before ship
- **MSC-UI-Taste** — anti-slop audit before merge
- Use **`motion/react`**, not legacy `framer-motion`

---

## Handoff

Summarize: taste chosen, pipeline, vault paths used, sections built, reduced-motion status.
