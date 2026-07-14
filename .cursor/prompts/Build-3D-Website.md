# Build 3D / Scroll Website — Hermes Workflow

## Trigger

Jon says **build 3d site**, **scroll website**, **cinematic landing**, **frame sequence hero**, or starts a `-Website` bootstrap.

---

## Step 1 — Read (in order)

1. `.cursor/docs/3D-WEB-WORKFLOWS.md` — vault paths + bundle picker
2. `.cursor/docs/3D-DEV-SETUP.md` — dev system, frame paths, daily commands
3. `.cursor/docs/VAULT-BUNDLE-SUMMARIES.md` — MAVRA / Luke / cinematic-scroll-skill one-pagers
4. `.cursor/docs/SCROLL-3D-REFERENCES.md` — pattern map
5. `.cursor/docs/3D-WEBSITE-TASTE-CATALOG.md` — pick taste (default: Studio Gold)
6. Skills: **NovaMira-Design** → **MSC-UI-Taste** → pipeline below → **Design-Engineer** (polish) → **cinematic-scroll-skill doctor** (quality gate)

Vault root: `D:\Hermes\assets\3d-web-workflows\` — never copy into project `.cursor/`.

**cinematic-scroll-skill** (when vendored): read `cinematic-scroll-skill/README.md` + `design.md` for token/theme contract before art-directing sections.

---

## Step 2 — Pick pipeline

| Goal | Vault path | Skills |
|------|------------|--------|
| Canvas JPG frame scrub | (skill only) | `3d-scroll-website`, `Scroll-Video-Sequence`, `Scroll-Motion` |
| Scroll scrubs **video** | `D:\Hermes\assets\3d-web-workflows\devini-tea\devini-tea-main\` | `Scroll-Video-Sequence` |
| Premium agency / video hero | `...\premium-site-workflow\CLAUDE.md` | `Premium-UI`, `frontend-design` |
| Live 3D backdrop + scroll | `...\IronMan\iron-man-main\` | `3D-Website-Fusion`, `Scroll-Motion` |
| Full luxury playbook | `...\MAVRA_Build_Guide.md` | All scroll skills |
| Scored cinematic craft (doctor/tokens) | `...\cinematic-scroll-skill\` | Pair with `Scroll-Motion`; run doctor before ship |

Read `references/00-hermes-adapter.md` in **3d-scroll-website** before coding.

---

## Step 3 — Verify stack

```powershell
npm run scroll:motion:status
npm run workflows:3d:status
npm run sync:skills
```

If `cinematic-scroll-skill` is missing from vault: `npm run vault:cinematic-scroll-skill` (JonBeatz hub).

Wrap layout with `SmoothScrollProvider` when using GSAP ScrollTrigger.

---

## Step 4 — Build gates

- **Motion-Accessibility** — reduced-motion path before ship
- **MSC-UI-Taste** — anti-slop audit before merge
- **cinematic-scroll-skill doctor** — scored quality gate (taste, a11y, mobile, tokens, 3D)

```powershell
# One-time in vault (if node_modules absent):
cd D:\Hermes\assets\3d-web-workflows\cinematic-scroll-skill
npm install

# After local HTML export or static preview path exists:
npm run doctor -- path/to/index.html
# Optional runtime proof (console + scroll screenshots):
npm run proof -- path/to/index.html
# Competitive bench (same rubric family):
npx -p cinematic-scroll-skill cinematic-bench https://your-preview-url
```

**Pass bar:** doctor score **≥ 80** (exits non-zero below). Fix failures before merge. Vault examples: `examples/noir/index.html` (87), `examples/luxe/index.html` (88), `examples/flagship/index.html` (100).

- Use **`motion/react`**, not legacy `framer-motion`

---

## Handoff

Summarize: taste chosen, pipeline, vault paths used, sections built, **doctor score** (if run), reduced-motion status.
