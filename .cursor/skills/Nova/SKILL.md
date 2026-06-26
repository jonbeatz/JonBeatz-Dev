---
name: nova
description: >-
  NovaMira conventions for JonBeatz Playground UI (Next.js): jb-/nm- CSS
  namespaces, Studio Gold (#F5B841) tokens, cinematic 16:9 grids, interaction
  polish, and pre-delivery checklist. Use when building or reviewing Playground
  pages, personal dashboards, or NovaMira-branded React/CSS.
---

# NovaMira Engine — JonBeatz Playground Edition

Guidance for **`D:\Hermes\projects\JonBeatz`** Playground UI (`npm run dev` @ `localhost:3000`). For WordPress/Divi work, open **MyStudioChannel** and use that repo's Nova skill.

## Extended context

| Topic | Path |
|-------|------|
| **Visual / dashboard design** | `.cursor/skills/NovaMira-Design/SKILL.md` |
| **Anti-slop / polish** | `.cursor/skills/MSC-UI-Taste/SKILL.md` |
| **Design tokens** | `app/globals.css` |
| **Component sourcing** | `.cursor/skills/Premium-UI/SKILL.md` |

---

## 1. Core identity and naming

| Area | Rule |
|------|------|
| **CSS** | Namespace custom classes with `jb-` or `nm-` to avoid collisions |
| **Components** | PascalCase React components under `app/` or `components/` |
| **Media** | Personal outputs in `output/media/`; static assets in `public/` |

---

## 2. UI/UX design system

### Cinematic thumbnails

Project/media grids enforce **16:9**:

```css
.jb-media-card img,
.nm-show-card img {
  aspect-ratio: 16 / 9;
  object-fit: cover;
  width: 100%;
  height: auto;
}
```

### Interaction polish

| Concern | Rule |
|---------|------|
| **Clickables** | `cursor: pointer` |
| **Motion** | `transition: all 0.2s ease-in-out` |
| **Card hover** | `transform: scale(1.02)` to `scale(1.03)` |
| **Accent** | Studio Gold `#F5B841` — see NovaMira-Design |

---

## 3. Pre-delivery checklist

1. **Responsive:** Layout holds at **375px** and **1024px**
2. **Performance:** `loading="lazy"` below the fold
3. **Contrast:** Light text readable on dark backgrounds (≥ 4.5:1)
4. **Accessibility:** Meaningful `alt`; `:focus-visible` on interactives
5. **Build:** `npm run build` exits 0 after runtime changes

---

## 4. Next.js Playground

- **Dev:** `npm run dev` — port **3000**
- **Recovery:** `npm run dev:recover` when stale `.next` or port conflicts
- **Build:** `npm run build` before considering UI tasks complete
- **Assets:** Root-relative paths (`/media/...`); respect `next.config.mjs` `basePath` if set

---

## When this skill should not override project facts

Do not mass-rename legacy classes without a scoped task. For **new** JonBeatz Playground surfaces, prefer Studio Gold + NovaMira-Design bento patterns unless Jon specifies otherwise.
