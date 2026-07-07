---
name: component-registries
description: Navigate the 2026 shadcn/ui ecosystem — the shadcn CLI + registry namespaces (Aceternity, Magic UI, Cult UI, Origin UI, 21st.dev, Tailark, ReUI). Use to pick the right registry for the job (app UI vs marketing wow-factor), install components via CLI, and keep everything Tailwind v4 + owned-in-source. Complements Premium-UI and UI-Generator.
---

# Component-Registries — shadcn/ui Ecosystem Map (2026)

## When to use this skill
- "Add a hero / bento / pricing / navbar / animated component"
- Deciding which registry to pull from for a given need
- Wiring up `components.json` + registry namespaces so `npx shadcn add @x/y` works

## Mental model
shadcn/ui is no longer one library — it's a **registry protocol**. You don't `npm install` UI; you **copy components into your repo** (you own the code) via the shadcn CLI. Every library below installs through the same CLI or copy-paste, and all are **Tailwind + CVA + tailwind-merge**.

## Which registry for what
| Need | Use | Notes |
|------|-----|-------|
| App UI, forms, dashboards, dialogs, tables | **shadcn/ui core** | Radix-based, accessible. The foundation. |
| Landing-page WOW (3D cards, spotlight, beams, particles) | **Aceternity UI** | Heaviest motion; pulls Framer Motion + some Three.js |
| Marketing micro-interactions (marquee, animated beam, retro grid, number ticker) | **Magic UI** | 150+ animated, MIT, free |
| AI-agent UI patterns (chat, tool calls, bold modern) | **Cult UI** | 100+ AI SDK patterns |
| System-grade primitives (advanced navbars, inputs, selects) | **Origin UI** | Clean, accessible, functional |
| Charts | **shadcn/ui Charts** | Official, Recharts-powered |
| High-conversion marketing sections, cohesive themes | **Tailark** | 300+ blocks, 4 themes |
| Huge catalog / community marketplace | **21st.dev**, **shadcn.io**, **Shadcnblocks** | 6000+ blocks; 21st.dev has Magic MCP |

## Setup (Tailwind v4)
```bash
# Once per project (writes components.json). See Nextjs-Tailwind-Bootstrap for Tailwind v4 first.
npx shadcn@latest init
# Core components:
npx shadcn@latest add button card dialog input
```

### Install the official shadcn skill (project-aware — recommended)
shadcn ships an **official Agent Skill** that reads your `components.json` and runs `shadcn info --json` so the agent generates correct code first try (framework, Tailwind version, aliases, installed components, base library, icon set). It also documents every CLI command + theming + registry authoring + the shadcn MCP server.
```bash
npx skills add shadcn/ui        # installs the project-aware shadcn skill
```
This is a **dynamic, per-project** skill (not a static SKILL.md) — install it in each web project rather than vendoring it. Pair with the shadcn **MCP server** for live registry search/browse/install from the agent.

### Register namespaces (components.json)
```jsonc
{
  "registries": {
    "@aceternity": "https://ui.aceternity.com/registry/{name}.json",
    "@magicui":    "https://magicui.design/r/{name}.json",
    "@cult-ui":    "https://cult-ui.com/r/{name}.json",
    "@originui":   "https://originui.com/r/{name}.json"
  }
}
```
```bash
npx shadcn@latest add @magicui/marquee
npx shadcn@latest add @aceternity/bento-grid
npx shadcn@latest add @cult-ui/texture-button
# Non-namespaced registries: paste the full JSON URL
npx shadcn@latest add https://animate-ui.com/r/install-tabs
```

## Dependencies you'll usually need
```bash
npm install motion            # Motion for React (import from "motion/react", NOT framer-motion)
npm install clsx tailwind-merge class-variance-authority
# Aceternity 3D bits:
npm install three @react-three/fiber @react-three/drei
```

## House rules (JonBeatz / NovaMira)
- **Studio Gold `#F5B841`** accent before you paste anything — recolor registry defaults to the design tokens (`NovaMira-Design`). **Reject generic purple-gradient** demos per `MSC-UI-Taste`.
- Import motion from **`motion/react`**, add `"motion"` to `transpilePackages`.
- After adding a component, run the **`MSC-UI-Taste` audit** (anti-slop gate) before committing.
- Log new additions in `.cursor/docs/PREMIUM-UI-CATALOG.md` if the project keeps one.

## Anti-Slop
- **Own the code** — after `add`, treat it as your source; don't leave 6 near-identical variants.
- **Don't ship the demo palette** — retheme to project tokens immediately.
- **One animation engine** — `motion/react`, not framer-motion + motion mixed.
- **Accessibility** — prefer Radix-backed (shadcn core / Origin UI) for interactive primitives; Aceternity/Magic UI are presentation-first (add ARIA yourself).
- **Bundle watch** — Aceternity 3D components pull Three.js; lazy-load them (`next/dynamic`, `ssr:false`).

## Related skills
- **Premium-UI** — the how-to for micro-interactions + registry techniques
- **UI-Generator** — AI-driven generation (Cult UI, AI SDK, Next 16 + Tailwind v4)
- **NovaMira-Design / MSC-UI-Taste** — tokens + anti-slop gate
- **Nextjs-Tailwind-Bootstrap** — Tailwind v4 must be set up first
