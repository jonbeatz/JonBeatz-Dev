---
name: scroll-motion
description: Build award-winning scroll experiences with the 2026 standard stack — Lenis smooth scroll + GSAP ScrollTrigger/ScrollSmoother/SplitText (all free since Webflow open-sourced GSAP). Use for scroll-linked timelines, pinning, parallax, text reveals, and syncing DOM scroll with WebGL. Not for R3F-internal scroll (use 3D-Scroll).
---

# Scroll-Motion — Lenis + GSAP (2026 Immersive Scroll Stack)

## When to use this skill
- Marketing / landing pages that need "awwwards-grade" scroll choreography
- Scroll-linked timelines, pinned sections, parallax, horizontal scroll
- Text line/word/char reveals on scroll (SplitText)
- Syncing native DOM scroll with a WebGL/R3F background (see `3D-Scroll` for the R3F side)
- Anything where you'd reach for "scroll jacking" — do it correctly here

**Do NOT use for:** scroll *inside* an R3F Canvas (`ScrollControls`) — that's `3D-Scroll`. Simple one-shot enter animations — plain `motion/react` `whileInView` is lighter.

## The 2026 stack (what changed)
- **GSAP is now fully free** (Webflow open-sourced every plugin Apr 2025) — `ScrollTrigger`, `ScrollSmoother`, `SplitText`, `MorphSVG`, `DrawSVG` all free for commercial use. Stop using paid-Club workarounds.
- **Lenis** (`darkroom.engineering`, ~4kb) is the default smooth-scroll base. `@studio-freight/react-lenis` is retired — use **`lenis/react`**.
- **CSS scroll-driven animations** are native in Chromium + Safari 18 (`animation-timeline: scroll()`) — use for cheap compositor-thread effects (progress bars, simple parallax) with **zero JS**.
- Rule of thumb: **2 libraries + 1 CSS feature**, not 5 libraries.

## Install
```bash
npm install lenis gsap
# React adapters:
npm install @gsap/react
```

## Canonical setup (Next.js App Router + React)
Create a single smooth-scroll provider and hook Lenis into the GSAP ticker **once** — this is the #1 thing people get wrong (frozen ScrollTriggers).

```tsx
"use client";
import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      <LenisGsapBridge />
      {children}
    </ReactLenis>
  );
}

function LenisGsapBridge() {
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, [lenis]);
  return null;
}
```

## Core patterns

### 1. Scroll-linked timeline (scrub)
```tsx
"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function PinnedReveal() {
  const scope = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".panel",
        start: "top top",
        end: "+=1500",
        scrub: 1,       // 1 = smooth catch-up; true = 1:1
        pin: true,
      },
    });
    tl.to(".layer-a", { yPercent: -40, ease: "none" })
      .to(".layer-b", { scale: 1.2, ease: "none" }, 0);
  }, { scope });
  return <div ref={scope}>{/* .panel > .layer-a .layer-b */}</div>;
}
```

### 2. Text line reveal (SplitText — now free)
```tsx
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText, ScrollTrigger);

useGSAP(() => {
  const split = new SplitText(".headline", { type: "lines", linesClass: "line" });
  gsap.from(split.lines, {
    yPercent: 120, opacity: 0, stagger: 0.08, ease: "power3.out",
    scrollTrigger: { trigger: ".headline", start: "top 80%" },
  });
  return () => split.revert();   // always revert on cleanup
}, { scope });
```
> Wrap each line in `overflow: hidden` for the classic masked line-reveal. If SplitText is unavailable, `SplitType` (npm, MIT) is a drop-in fallback (used in VaderLabz `useSplitType.ts`).

### 3. Horizontal scroll section
```tsx
useGSAP(() => {
  const track = trackRef.current!;
  gsap.to(track, {
    x: () => -(track.scrollWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: {
      trigger: track.parentElement, pin: true, scrub: 1,
      end: () => "+=" + (track.scrollWidth - window.innerWidth),
      invalidateOnRefresh: true,
    },
  });
}, { scope });
```

### 4. Native CSS scroll progress (0 JS)
```css
@supports (animation-timeline: scroll()) {
  .progress-bar { animation: grow linear both; animation-timeline: scroll(root); }
  @keyframes grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
}
```

## Parallax playbook (Vev · WWF · Palmdream patterns)

Use the **cheapest tool that works**. Full reference: [Chrome scroll-driven animations](https://developer.chrome.com/docs/css-ui/scroll-driven-animations) · [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) · template `ParallaxStack.tsx`.

### Picker — which parallax?

| Effect | Best tool | Example ref |
|--------|-----------|-------------|
| Scroll progress bar / reading indicator | **CSS `scroll()`** | Vev presentations · Chrome docs |
| Element fades/slides in when entering viewport | **CSS `view()`** + `animation-range: entry` | WWF infographic panels |
| Multi-layer depth (bg moves slower than fg) | **GSAP scrub** `yPercent` per layer | [Vev multi-layer parallax](https://www.vev.design/blog/underrated-vev-features/) · WWF PTM |
| Scroll zoom (element scales up while scrolling) | **GSAP scrub** `scale` | Vev scroll-zoom add-on |
| Pinned section + layers move at different rates | **GSAP timeline** + `pin: true` | Palmdream · climbwales.co.uk |
| Horizontal infographic break inside vertical story | **GSAP horizontal** pin | [WWF Priority Threat Management](https://wwf.ca/prioritythreatmanagement/) |
| 3D product spin / bottle | **`<model-viewer>`** + sticky section | palmdream.com |
| WebGL depth parallax | **R3F** reads `scrollY` | 3D-Website-Fusion |

### 5. Multi-layer parallax (GSAP — Vev/WWF style)

Foreground moves faster than background. **Never animate the pinned wrapper** — only children inside.

```tsx
useGSAP(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".parallax-section",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
  tl.to(".layer-bg",   { yPercent: 15, ease: "none" }, 0)
    .to(".layer-mid",  { yPercent: 35, ease: "none" }, 0)
    .to(".layer-fg",   { yPercent: 55, ease: "none" }, 0);
}, { scope });
```

**Template:** `templates/components/ParallaxStack.tsx` — pass `layers: { className, speed }[]`.

For **photographic** multi-layer (cutout fg/bg in Photoshop), duplicate layers as absolutely stacked `<img>` elements with increasing `speed` (0.15 → 0.45 → 0.75).

### 6. CSS view-timeline reveal (0 JS — infographic panels)

```css
@supports (animation-timeline: view()) {
  .panel {
    animation: rise linear both;
    animation-timeline: view();
    animation-range: entry 25% cover 40%;
  }
  @keyframes rise {
    from { opacity: 0; transform: translateY(2rem); }
    to   { opacity: 1; transform: translateY(0); }
  }
}
```

Pair with `@media (prefers-reduced-motion: reduce)` → `animation: none; opacity: 1`.

### 7. Scroll zoom section (Vev scroll-zoom)

```tsx
gsap.fromTo(".zoom-target",
  { scale: 1 },
  {
    scale: 1.25,
    ease: "none",
    scrollTrigger: {
      trigger: ".zoom-section",
      start: "top bottom",
      end: "center center",
      scrub: true,
    },
  }
);
```

Use `overflow: hidden` on the section so zoom doesn't cause horizontal scroll.

### 9. Visual noise / film grain (oncorps.ai — CSS only)

Premium B2B sites add subtle **film grain** over the whole viewport — cheap depth, hides banding on dark gradients. No JS; respect reduced motion (grain can stay — it's not motion, but offer `opacity: 0` if Jon prefers cleaner a11y).

```css
.grain-overlay {
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 9999;
  opacity: 0.04;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

Pair with **animated SVG diagrams** (oncorps): GSAP stroke reveal on scroll for B2B explainer panels — use `stroke-dashoffset` or Club GSAP `DrawSVGPlugin` when licensed.

### 8. ScrollTrigger pro tips (from official docs)

| Option | When |
|--------|------|
| `scrub: 1` | Soft catch-up (not 1:1) — feels premium |
| `anticipatePin: 1` | Large pinned panels — avoids 1-frame unpinned flash |
| `fastScrollEnd: true` | Fast flick scroll — finish scrubbed tween |
| `invalidateOnRefresh: true` | Horizontal tracks + resize |
| `end: "clamp(bottom top)"` | Triggers near page bottom |
| `pinSpacing: true` (default) | Let GSAP add spacer — don't hand-roll height |

**Lenis + ScrollTrigger:** always use `SmoothScrollProvider` bridge — never double rAF.

## Anti-Slop
- **Hook Lenis into `gsap.ticker` exactly once** — never call both `lenis.raf` in your own rAF *and* the ticker.
- **Always `invalidateOnRefresh: true`** on pinned/horizontal triggers so resize recalculates.
- **`ease: "none"` for scrubbed tweens** — eased scrubs feel laggy.
- **Respect reduced motion** — see `Motion-Accessibility`; wrap kinetic scroll in `gsap.matchMedia()` and disable for `(prefers-reduced-motion: reduce)`.
- **Kill/revert on unmount** — `useGSAP({ scope })` auto-cleans; SplitText needs manual `.revert()`.
- **Don't pin more than ~2 sections per viewport** — pin-spacing math compounds and janks.
- **Test on real devices** — trackpads fire hundreds of scroll events/sec; scrub math must be frame-decoupled.

## Related skills
- **3D-Scroll** — scroll inside an R3F Canvas (`ScrollControls`), and the sibling-backdrop pattern for syncing WebGL to `window.scrollY`
- **Scroll-Video-Sequence** — Apple-style frame scrubbing on scroll
- **Motion-Accessibility** — `prefers-reduced-motion`, `gsap.matchMedia()`, CWV budget
- **MSC-UI-Taste** — motion dials / anti-slop gate
