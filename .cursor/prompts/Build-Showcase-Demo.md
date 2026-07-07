# Build Showcase Demo — Hermes Motion Lab

## Trigger

Jon says **Build Showcase Demo**, **Fire Showcase**, **Hermes Motion Lab**, **build motion lab**, or **ultimate demo site**.

---

## Step 1 — Read the living spec

1. **`.cursor/docs/HERMES-SHOWCASE-SPEC.md`** — source of truth (feature matrix, section blueprint, add queue)
2. `.cursor/docs/DESIGN-REFERENCES.md` — batch 1 + 2 built-site refs (aesthetic cues only)
3. `.cursor/docs/SCROLL-3D-REFERENCES.md` — award-site checklist

Do **not** start coding until the spec’s **required** rows are understood.

---

## Step 2 — Verify stack

```powershell
npm run scroll:motion:status
npm run workflows:3d:status
```

Default build target: **`JonBeatz.dev`** at route `/showcase`. If that repo is not open, ask Jon which `-Website` profile to use.

---

## Step 3 — Skills (in order)

1. **NovaMira-Design** → **MSC-UI-Taste** → **Premium-UI**
2. **Scroll-Video-Sequence** + copy **`ScrollFrameHero.tsx`** from templates
3. **3D-Website-Fusion** + **`SmoothScrollProvider`**
4. **Scroll-Motion** (pinned sections, marquees)
5. **Motion-Accessibility** (reduced motion + `/showcase/flat`)
6. **WebGL-UI** / **View-Transitions** only if spec add-queue items demand them for this pass

Templates: `_core-scripts/shared-profile-content/templates/components/`

---

## Step 4 — Build gates

- [ ] Every **required** feature matrix row implemented or explicitly deferred with reason
- [ ] Section dev badges visible (which pattern is which)
- [ ] Sticky nav jump list + hash chapters on frame hero
- [ ] `prefers-reduced-motion` path works
- [ ] `/showcase/flat` (or equivalent) flat fallback route exists
- [ ] **MSC-UI-Taste** anti-slop pass — Studio Gold, no template purple

---

## Step 5 — After build

1. Update **Feature matrix** statuses in `HERMES-SHOWCASE-SPEC.md` (`pending` → `in-demo`)
2. Update **Add queue** rows touched (`queued` → `in-demo`)
3. Handoff: local URL, sections list, assets used, what’s still `queued`

---

## Not this ritual

| Jon says | Use instead |
|----------|-------------|
| Single 3D client site | `Build-3D-Website.md` |
| Add a ref only | Append to `DESIGN-REFERENCES.md` + spec **Add queue** — no build |
| MSC / Hostinger deploy | `Hostinger-MSC.md` in MSC repo |
