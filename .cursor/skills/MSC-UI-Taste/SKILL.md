---
name: msc-ui-taste
description: >-
  Authoritative UI taste layer for JonBeatz Playground: anti-slop dials,
  audit/polish workflow, and motion philosophy under NovaMira Studio Gold
  (#F5B841). Use for greenfield UI, polish passes, and rejecting generic AI
  layouts.
---

# MSC-UI-Taste — Anti-Slop + Polish Authority (JonBeatz)

**Canonical stack order** (when skills conflict, higher wins):

1. **TRUTH.md** + project security rules
2. **NovaMira-Design** — tokens, glass, bento, Gold `#F5B841`
3. **This skill** — taste dials, banned patterns, review workflow
4. **Premium-UI** — component registries and MCP builders
5. **DesignMD** — extracted brand systems (required before greenfield UI)

Cross-links: `.cursor/skills/NovaMira-Design/SKILL.md` · `.cursor/skills/Premium-UI/SKILL.md` · `.cursor/skills/DesignMD/SKILL.md`

---

## 0. Greenfield gate (mandatory)

Before designing **new** Playground or dashboard surfaces:

1. Check `.cursor/DesignMD/DESIGN-*.md` for an existing extraction
2. If none: run DesignMD workflow or document source brand URL in chat
3. Read **NovaMira-Design** for Studio Gold, 8px rhythm, 16:9 grids
4. Apply taste dials below — never ship first-draft AI layout

---

## 1. Taste dials

| Dial | Low | JonBeatz default | High |
|------|-----|------------------|------|
| **Variance** | Safe, minimal | **Restrained** — one signature moment per view | Experimental, asymmetric |
| **Motion** | Static | **Feedback-only** — hover, success, loading | Choreographed scroll scenes |
| **Density** | Airy marketing | **Bento-balanced** — modular tiles, 8px gutters | Dashboard-dense |

**Agent rule:** State which dial you are adjusting when proposing UI changes.

---

## 2. Banned patterns (anti-slop)

| Pattern | Why banned | JonBeatz alternative |
|---------|------------|----------------------|
| Purple/indigo gradient heroes | Generic AI slop | Dark charcoal + **Studio Gold** accent |
| Inter-only + centered everything | Cookie-cutter SaaS | Fonts from `globals.css`; asymmetric bento |
| Giant gradient CTA + stock illustration | Low craft | Real media from `output/media/`, gold CTA, glass panel |
| Identical card grid (3 equal columns) | No hierarchy | Bento unequal cells per NovaMira-Design |
| Neon glow on every element | Visual noise | Gold glow on **one** primary CTA max |
| `framer-motion` import (legacy) | React 19 path | `motion/react` per Premium-UI |
| Decorative motion on layout | A11y + perf | `prefers-reduced-motion`; feedback only |
| Invented brand colors | Drift | Tokens from DesignMD or NovaMira Gold |

---

## 3. Impeccable workflow (audit → polish → critique)

### Audit

- Screenshot or describe current section
- List violations of banned patterns + NovaMira checklist
- Score: **Ship / Polish / Rebuild**

### Polish

- Fix spacing to 8px rhythm
- Borders over muddy shadows
- One accent color (Gold) with scarcity
- Touch targets ≥ 44px; `:focus-visible` outlines

### Critique

- One paragraph: what still feels generic?
- Propose **one** signature improvement

---

## 4. Motion philosophy

- **Purpose:** motion explains state change — not decoration
- **Duration:** 150–300ms UI; 400–600ms hero entrances max
- **Easing:** ease-out enter; ease-in exit
- **Micro-interactions:** button `scale(0.98)`, card hover `scale(1.02–1.03)`, `transition: 0.2s ease-in-out`
- **Scroll:** Lenis only when scroll-linked animation required (Premium-UI)
- **Reduced motion:** disable scale/blur when `prefers-reduced-motion: reduce`

---

## 5. NovaMira tokens

| Token | Value | Use |
|-------|-------|-----|
| Studio Gold | `#F5B841` | Primary accent — CTAs, badges, glow |
| Nova Red | `#c01a1a` | Destructive only |
| Surface stack | `--nm-surface-*` | Layered neutrals |
| Rhythm | 8px multiples | Gaps, padding |
| Thumbnails | 16:9 | Media grids |

Full spec: `.cursor/skills/NovaMira-Design/SKILL.md`

---

## 6. Agent checklist (before marking UI done)

- [ ] DesignMD or NovaMira tokens cited
- [ ] No banned slop patterns
- [ ] Gold accent sparingly (≤ 2 prominent uses per viewport)
- [ ] `motion/react` if animating (not `framer-motion`)
- [ ] `prefers-reduced-motion` respected
- [ ] Images: meaningful `alt`, lazy below fold
- [ ] `npm run build` passes if runtime files changed
