---
name: motion-accessibility
description: Make immersive/animated sites accessible and performant — prefers-reduced-motion handling across CSS, motion/react, and GSAP (gsap.matchMedia), plus a Core Web Vitals performance budget for heavy scroll/3D pages. Use whenever a site has scroll effects, 3D, autoplay motion, or parallax. The safety gate for every motion-heavy build.
---

# Motion-Accessibility — Reduced Motion + Performance Budget

## When to use this skill
- **Any** page with scroll effects, 3D, parallax, autoplay, or big transitions
- Before shipping an immersive site (this is the safety gate)
- Fixing "the site makes me dizzy" / Lighthouse accessibility + CWV dings

## 1. Respect `prefers-reduced-motion` everywhere
Vestibular users can get sick from parallax/large motion. Provide a calm fallback — don't just delete content.

### CSS (global safety net)
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

### motion/react
```tsx
import { useReducedMotion } from "motion/react";
const reduce = useReducedMotion();
<motion.div animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            initial={reduce ? false : { opacity: 0, y: 40 }} />
```

### GSAP (matchMedia — the correct pattern)
```ts
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  // full scroll choreography here — auto-reverted for reduced-motion users
  gsap.to(".layer", { yPercent: -40, scrollTrigger: { /* ... */ } });
});
// reduced-motion users simply get the static layout
```

### Lenis
Disable smooth scroll for reduced motion (native scroll is the accessible default):
```tsx
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
<ReactLenis root options={{ smoothWheel: !reduce, lerp: reduce ? 1 : 0.1 }} />
```

**Desktop-only Lenis** (day1-run · jeskojets · Awwwards cluster): many award sites disable smooth scroll on mobile — touch devices get native momentum scroll, which feels better and avoids jank with address-bar resize.

```tsx
const [useLenis, setUseLenis] = useState(false);
useEffect(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const desktop = window.matchMedia("(min-width: 768px)").matches;
  setUseLenis(desktop && !reduce);
}, []);
// Pass enabled={useLenis} to SmoothScrollProvider or skip ReactLenis wrapper on mobile
```

### Scroll-video-sequence
Show a single hero still instead of scrubbing (see `Scroll-Video-Sequence`).

### WebGL / 3D town sites (SBS Town pattern)
Not everyone can run WebGL. Ship a **parallel flat route** (`/flat` or conventional marketing layout) with the same content IA — link prominently in footer/settings. Detect WebGL failure at runtime and offer redirect:

```ts
function webglAvailable() {
  try {
    const c = document.createElement("canvas")
    return !!(c.getContext("webgl2") || c.getContext("webgl"))
  } catch { return false }
}
```

Reference: [SBS Town](https://open-sbs.brig.ht/city) (Bright/brig.ht) — see SCROLL-3D award-site checklist.

## 2. Performance budget (immersive pages)
| Metric | Target | Killers to watch |
|--------|--------|------------------|
| LCP | < 2.5s | giant hero video/frames, unoptimized images |
| INP | < 200ms | scroll handlers doing work, per-frame React state |
| CLS | < 0.1 | pinned sections without reserved space, late-loading media |
| JS (initial) | keep 3D/heavy libs out of first load | Three.js, Aceternity 3D |

### Tactics
- **Lazy-load 3D & heavy motion**: `next/dynamic(() => import("./Scene"), { ssr: false })`.
- **Never `setState` per frame** — animate refs/DOM directly (`useFrame`, GSAP), not React state.
- **`{ passive: true }`** on scroll/touch listeners.
- **Cap `devicePixelRatio` at 2** for canvases (`dpr={[1, 2]}` in R3F).
- **Pause offscreen work** — `IntersectionObserver` to stop rAF/animation when the section isn't visible.
- **Preload the LCP asset**, defer everything below the fold.
- **Compress**: WebP/AVIF images, Draco/meshopt for GLB (see `3D-Modeling`).

## 3. Other a11y for motion sites
- Keyboard: never trap focus in scroll-jacked sections; anchor links must still work (Lenis preserves native scroll, so they do).
- Provide a visible focus ring; don't hide it behind animations.
- Autoplay media: muted + a pause control.
- Don't convey meaning by motion alone.

## Anti-Slop
- **No immersive site ships without a reduced-motion path** — this is non-negotiable.
- **Don't animate React state 60x/sec** — refs/GSAP/useFrame only.
- **Don't lazy-forget the LCP** — the hero must not be the thing you code-split.
- **Test**: Chrome DevTools → Rendering → "Emulate prefers-reduced-motion", and run Lighthouse.

## Related skills
- **Scroll-Motion / 3D-Scroll / Scroll-Video-Sequence** — the effects this gate protects
- **R3F-Gotchas** — R3F-specific perf traps
- **MSC-UI-Taste** — motion dials / taste
