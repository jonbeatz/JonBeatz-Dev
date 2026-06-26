# Premium UI Skill Pack

Integrate highly animated, modern, and high-fidelity UI components from community-trusted registries and design catalogs.

## Capabilities
- **Shadcn Registries**: Instantly add components from pre-wired third-party registries.
- **Micro-Interactions**: Implement motion-first components, custom physics animations, SVG micro-interactions, and premium layout presets.
- **Copy-Paste Assets**: Seamlessly convert Tailwind and CSS structures into React components fitting the NovaMira design system.

## Registry Selection & Installation

### 1. Pre-registered CLI Addition (Best Developer Experience)
Use namespaced tags to add components directly using your current `components.json` setup:

```bash
# Cult UI (Motion-rich cards, buttons, text-gif)
npx shadcn@latest add @cult-ui/texture-button

# Aceternity UI (Framer motion bento grids, spotlights, etc.)
npx shadcn@latest add @aceternity/bento-grid

# Ali Imam (Physics attractions, hardcovers, carousels)
npx shadcn@latest add @aliimam/carousel
```

### 2. Direct JSON Registries
For non-namespaced registries, use direct URLs, or standard package installations for scroll controllers:

```bash
# Its Hover (Animated action icons)
npx shadcn@latest add https://itshover.com/r/like-icon.json

# Animate UI (Fluid primitives and effects)
npx shadcn@latest add https://animate-ui.com/r/install-tabs

# Lenis (Butter-smooth scrolling and scroll-linked animations)
npm install lenis

# Motion for React (Formerly Framer Motion — React 19 optimized)
npm install motion

# Three.js & React Three Fiber (R3F) (Interactive 3D web graphics)
npm install three @react-three/fiber @react-three/drei
npm install --save-dev @types/three
```

### 3. Motion React (React 19 & Next.js 15 Native)
When using motion in React 19:
1. Always import from `"motion/react"` instead of `"framer-motion"` to use the React 19 native optimizations.
2. Add `"motion"` to your `transpilePackages` array inside `next.config.mjs`.
3. Syntax mapping:
```typescript
import { motion, AnimatePresence } from "motion/react"

// Use exactly like framer-motion:
<motion.div animate={{ opacity: 1 }} />
```

### 4. Next.js 15 & React 19 Considerations for 3D
When setting up a 3D Canvas component in Next.js 15:
1. Always add `"use client"` to the top of your 3D canvas files.
2. Ensure you have `"three", "@react-three/fiber", "@react-three/drei"` added to `transpilePackages` in `next.config.mjs`.
3. Wrap your canvas in a client-side dynamic import in a helper file to bypass server-side hydration mismatches:
```typescript
import dynamic from "next/dynamic"
export const AnimatedThreeDScene = dynamic(() => import("./ThreeDComponent"), {
  ssr: false,
  loading: () => <div className="animate-pulse">Loading 3D...</div>
})
```

### 4. Snippet Injection & AI Prompts
- **21st.dev (Magic MCP)**: Set `21ST_DEV_MAGIC_API_KEY` in `.env.local`, run `npm run sync:mcp-env`, reload MCP in Cursor. Prompt: *"Use 21st.dev Magic MCP to build a custom component styled like 21st.dev's library"*.
- **Uiverse.io**: Optimized CSS animations and Tailwind blocks for buttons, inputs, loaders.
- **VibeUI / MotionSites.ai**: Layout prompt patterns for AI generation context.
- **Pencil.dev (Design MCP)**: In `.cursor/mcp.json`. Pencil desktop app must be running. Prompt: *"Scan my active Pencil canvas and translate structure/colors into a Next.js/Tailwind section"*.

## Skill routing (JonBeatz)

| Task | Read first |
|------|------------|
| Tokens, glass, bento, Gold Standard | `.cursor/skills/NovaMira-Design/SKILL.md` |
| Anti-slop, audit/polish, motion dials | `.cursor/skills/MSC-UI-Taste/SKILL.md` |
| Brand extraction before greenfield UI | `.cursor/skills/DesignMD/SKILL.md` |

Agents: cite Studio Gold `#F5B841` before adding registry components. Reject generic purple-gradient layouts per MSC-UI-Taste banned patterns.

## Guidelines
- **Motion package**: Use `motion/react` (not legacy `framer-motion`) per MSC-UI-Taste.
- **Framer Motion Dependencies**: Ensure `motion` is active when adding interactive elements.
- **Cinematic Harmony**: Style additions to match the **Gold Standard** (Accent gold) and deep dark layered bento layouts defined in `.cursor/skills/NovaMira-Design/SKILL.md`.
- **Reference Catalog**: Check `.cursor/docs/PREMIUM-UI-CATALOG.md` for the single source of truth catalog indexing of these assets.
