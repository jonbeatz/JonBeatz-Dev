---
name: novamira-design
description: >-
  NovaMira visual design system for JonBeatz Playground UI: glassmorphism, bento
  grids, SaaS dark layered neutrals, Studio Gold (#F5B841) as primary accent,
  8px rhythm, borders-over-shadows, and premium dashboard patterns. Use for
  Playground polish, personal dashboards, and high-end studio layouts.
---

# NovaMira Design — Glass + Bento (JonBeatz Playground)

**UI skill read order:** NovaMira-Design (this file) → **MSC-UI-Taste** → **Premium-UI** for component sourcing.

This skill complements **`.cursor/skills/Nova/SKILL.md`** (code conventions) and **`app/globals.css`** (design tokens). It does **not** replace `.cursorrules` on profile boundaries or secrets policy.

**Goal:** Premium personal command-center UI — **glassmorphism** + **Bento Grid** (varied rectangular cells for calm, high-density dashboards).

**JonBeatz Gold Standard:** Studio Gold **`#F5B841`** is the default strategic accent (CTAs, badges, highlights, glows) on the Playground UI @ `localhost:3000`. Nova Red **`#c01a1a`** is reserved for destructive actions only — not marketing accent.

---

## 1. Layered neutrality (“off-black” stack)

| Layer | Role | Guidance |
|-------|------|----------|
| **Canvas** | Deepest plane | Very dark charcoal — near black (`#000000` acceptable as page base) |
| **Raised surfaces** | Cards, panels, status tiles | One or two steps lighter than canvas |
| **Inset / well** | Secondary areas | Slightly darker than cards or same canvas + border — max **3–4** gray steps |

Define CSS variables once in `app/globals.css` (e.g. `--nm-surface-0` … `--nm-surface-2`) and reuse.

---

## 2. Border-defined hierarchy

- **Hairline borders:** `1px` subtle light-on-dark (`rgba(255,255,255,0.06)`–`0.12`)
- **Separation over depth:** surface step + border, not stacked shadows
- **Soft geometry:** large radii on cards (`12px`–`20px+`)
- Shadows **sparingly** — modals, dropdowns, FABs only

---

## 3. Strategic accents

| Use | Pattern |
|-----|---------|
| **Primary accent** | Studio Gold `#F5B841` — hero emphasis, CTAs, badges, controlled glow |
| **Destructive** | Nova Red `#c01a1a` — delete, irreversible confirms |
| **Success** | Vibrant green for status dots, OK states |
| **Text on dark** | ≥ **4.5:1** contrast |

Gold and Red used **sparingly** — scarcity preserves hierarchy.

---

## 4. Bento + component organization

- **Unequal cells** beat one long scrolling column
- **8px rhythm:** gaps and padding in multiples (8, 16, 24, 32, 64)
- **Responsive:** single column on narrow viewports; touch targets **≥ 44px**

---

## 5. Glassmorphism

- Translucent surface + backdrop blur + light border on **elevated** layers only
- **Solid fallback** when blur unsupported or `prefers-reduced-transparency`
- One glass header or panel per view — not full-page glass stacks

---

## 6. Playground checklist

- **Grids / cards:** **16:9** thumbnails where applicable; `object-fit: cover`
- **Gold tokens:** `--accent`, `text-accent`, `bg-accent` in `app/globals.css`
- **Interaction:** `cursor: pointer`; `transition: all 0.2s ease-in-out`; card hover `scale(1.02–1.03)`
- **Motion access:** `prefers-reduced-motion` — reduce scale/blur
- **Focus:** visible `:focus-visible` outlines
- **Images:** meaningful `alt`; `loading="lazy"` below fold
- **CSS namespaces:** prefer `jb-` or `nm-` for custom Playground classes
- **Hydration:** `suppressHydrationWarning` on `<body>` when theme classes differ server/client
- **Assets:** root-relative paths (`/media/...` under `public/` or `output/media/` references)

---

## 7. Anti-slop checklist

Verify with **`.cursor/skills/MSC-UI-Taste/SKILL.md`** before shipping UI polish:

| Check | Pass criteria |
|-------|---------------|
| Accent | Studio Gold `#F5B841` — not purple gradients |
| Layout | Bento or intentional asymmetry |
| Typography | Project font stack from `globals.css` |
| Motion | Feedback-only; `prefers-reduced-motion` honored |
| Brand | DesignMD extraction for greenfield — no invented palette |
| Density | 8px rhythm; borders over muddy shadows |

---

## Related files

| Doc | Path |
|-----|------|
| **UI Taste** | `.cursor/skills/MSC-UI-Taste/SKILL.md` |
| **Logic Skill** | `.cursor/skills/Nova/SKILL.md` |
| **Design tokens** | `app/globals.css` |
| **Playground entry** | `app/page.tsx` |

When working in **MyStudioChannel** (sibling repo), Divi/WordPress rules in MSC's Nova skill take precedence there — not here.
