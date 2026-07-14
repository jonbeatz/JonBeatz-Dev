# Emil Animation Skills — Cursor workflow

**Installed:** 2026-07-13 · **Pack:** [emilkowalski/skills](https://github.com/emilkowalski/skills) · MIT  
**Site:** [animations.dev/skills](https://animations.dev/skills) · **Catalog:** [skills.sh/emilkowalski/skills](https://skills.sh/emilkowalski/skills)

Five Cursor skills from Emil Kowalski (Vercel / Linear) that fix **agent motion mistakes** — wrong easing on enter, `transition: all`, missing reduced-motion, sloppy dropdown timing. Complements **Hallmark** (layout anti-slop) and **Scroll-Motion** (scroll/GSAP patterns).

---

## Where skills live (Hermes fleet)

| Layer | Path | How it gets there |
|-------|------|-------------------|
| **Shared library (canonical)** | `D:\Hermes\projects\_core-scripts\shared-profile-content\skills\{name}\` | `npm run skills:emil:install` vendors from global after `npx skills` |
| **Per-project** | `.cursor\skills\{name}\` | `npm run sync:skills` (also runs on `session:start` / `fleet:sync`) |
| **Global (optional)** | `%USERPROFILE%\.agents\skills\{name}\` | `npx skills add emilkowalski/skills -g -a cursor` |

**Fleet rule:** shared library is source of truth for siblings. Any Hermes profile with `sync:skills` in `package.json` receives all five after `npm run sync:skills` or cold `session:start`.

---

## Installed skills

| Skill | When to invoke |
|-------|----------------|
| **emil-design-eng** | Default motion + micro-interaction advice while building UI |
| **review-animations** | Strict review of a diff or component's motion |
| **improve-animations** | Whole-codebase motion audit → `plans/` for any agent to execute |
| **animation-vocabulary** | Name the motion you want (shared vocabulary with the agent) |
| **apple-design** | Apple WWDC fluid-motion principles translated for web |

Paths: `.cursor\skills\<name>\` (project) or shared library above.

---

## Read order (greenfield UI)

1. **Hallmark** — structure + anti-slop gates  
2. **NovaMira-Design** → **MSC-UI-Taste** → **Premium-UI** → **DesignMD** — layout and systems  
3. **Scroll-Motion** / **3D-Scroll** — when the page is scroll-driven  
4. **emil-design-eng** or **improve-animations** — motion polish pass (easing, duration, a11y)

Hallmark refuses generic layout; Emil skills refuse generic **motion**.

---

## Operator phrases

| Jon says | Skill |
|----------|-------|
| *improve the animations in this codebase* | **improve-animations** (full audit) |
| *improve-animations quick* | Hotspots only |
| *improve-animations performance* | One audit category |
| *review animations on this PR / file* | **review-animations** |
| *use apple-style motion for this modal* | **apple-design** |
| *what easing should this use?* | **emil-design-eng** or **animation-vocabulary** |

**improve-animations** is read-only on source — it writes plans under `plans/` (or `animation-plans/`). Execute with a separate agent turn: *execute `plans/001-….md`*.

---

## Install / update / verify

```powershell
# From any Hermes profile root
npm run skills:emil:install   # npx global + vendor to shared library + sync project
npm run skills:emil:status    # checks shared library (+ project when cwd has .cursor)
npm run sync:skills           # refresh .cursor/skills from shared library only
```

Re-run install to update from upstream. Cursor discovers skills under `.cursor\skills\` and `~\.agents\skills\`.

---

## Related

- [TOOLS-REFERENCE.md](./TOOLS-REFERENCE.md) § emilkowalski/skills  
- [HALLMARK-WORKFLOW.md](./HALLMARK-WORKFLOW.md) — layout pass before motion  
- [SCROLL-3D-REFERENCES.md](./SCROLL-3D-REFERENCES.md) — scroll + GSAP skill map  
- `.cursor/skills/Scroll-Motion/SKILL.md`

**Last updated:** 2026-07-13 (vendored to shared-profile-content)
