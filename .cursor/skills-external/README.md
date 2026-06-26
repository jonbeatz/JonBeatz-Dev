# External skills — ON DECK (vendored, not active)

Upstream skill packs kept **on deck** for the JonBeatz Playground / sites. They are
**vendored** (copied in, `.git` stripped) so they live in this repo and work offline —
they are **reference material**, not part of the curated active stack in
`.cursor/skills/`.

> **Precedence:** Your curated `.cursor/skills/` (NovaMira-Design → MSC-UI-Taste →
> Premium-UI → DesignMD → Nova) stays the source of truth. These external packs are
> pulled in **only when a task needs them**, and must not override JonBeatz brand
> rules (Studio Gold `#f5b841` / dev red `#ff2a36`, anti-slop, 8px rhythm).

| Pack | Source | Pinned commit | Use for |
|------|--------|---------------|---------|
| `gsap-skills/` | [greensock/gsap-skills](https://github.com/greensock/gsap-skills) | `aed9cfd` | GSAP animation (ScrollTrigger, timelines, React) — **when adopting GSAP** |
| `awesome-design-md/` | [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) | `664b3e7` | 74-brand `DESIGN.md` catalog — feed `DesignMD` skill for greenfield UI |

## gsap-skills — when to reach for it

GSAP is **not installed** yet (`package.json` uses `motion/react` + `@react-three/*`).
Pull these in when a **major jonbeatz.dev redesign** (Tier 2) wants timeline-based or
ScrollTrigger choreography beyond what R3F `useScroll` + `motion` cover.

Packs (`gsap-skills/skills/<name>/SKILL.md`):
`gsap-core`, `gsap-scrolltrigger`, `gsap-timeline`, `gsap-react`, `gsap-plugins`,
`gsap-frameworks`, `gsap-performance`, `gsap-utils`.

To actually use GSAP: `npm install gsap @gsap/react` then follow `gsap-react/SKILL.md`.
Respect `prefers-reduced-motion` (MSC-UI-Taste rule) and keep one signature motion
moment per view.

## awesome-design-md — when to reach for it

A catalog of ready-made `DESIGN.md` files for 74 brands (apple, stripe, figma, vercel,
linear, etc.) under `awesome-design-md/design-md/<brand>/`. Use as **input to the
`DesignMD` skill**: when building a new section "in the style of" a brand, copy the
relevant file into `.cursor/DesignMD/DESIGN-<NAME>.md` and treat it as the design
source of truth — then re-skin to JonBeatz tokens. Does **not** replace `DesignMD`;
it feeds it.

## Updating / refreshing

These are pinned snapshots. To refresh a pack, re-clone shallow, strip `.git`, and
update the commit + this table:

```powershell
# from .cursor/skills-external
git clone --depth 1 https://github.com/greensock/gsap-skills.git _tmp
Remove-Item -Recurse -Force _tmp\.git
# replace folder, update pinned commit above
```
