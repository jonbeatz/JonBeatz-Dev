---
name: 3D-Website-Fusion
description: >-
  Master skill for building production 3D websites with Next.js App Router.
  Combines Three.js (r3f/drei), scroll-driven animations, particle systems,
  wireframe crystalline cores, color-shift theming, mouse parallax, glassmorphism
  overlays, and CSS light portals into a single integrated pattern.
  This is the "fusion" skill — read it after the individual technique skills
  (Three.js-Ops, 3D-Scroll, WebGL-UI, NovaMira-Design) to see how they combine.
---

# 3D-Website-Fusion — Production 3D Website Patterns

## Overview

This skill documents the **production-proven architecture** used by JonBeatz.dev and
JonBeatz Playground — a complete 3D website stack that layers:

1. **Three.js background scene** — particle field + crystalline wireframe core + orbiting torus ring
2. **Scroll-driven animation** — native `window.scrollY` read in `useFrame` (no hijacking)
3. **CSS light portal overlay** — the hero 'beam' effect (red or gold)
4. **Color-shift theming** — scene + CSS tokens shift together on scroll
5. **Mouse parallax** — subtle inertia drift on the 3D core
6. **Glassmorphism UI** — transparent cards on top of 3D canvas

## Production Stack

| Layer | Package | Version (verified) |
|-------|---------|-------------------|
| 3D engine | `three` | `^0.163.0` |
| React bindings | `@react-three/fiber` | `^9.6.1` |
| Utilities | `@react-three/drei` | `^10.7.7` |
| Scroll animations | None needed — `useFrame` reads `window.scrollY` directly | — |
| UI animations | `motion` (formerly `framer-motion`) | `^11.11.0` |
| Framework | `next` (App Router) | `^15.5.19` |
| Render engine | `react` / `react-dom` | `^19.0.0` |

```bash
npm install three @react-three/fiber @react-three/drei motion
```

## Architecture: Sibling Backdrop Pattern

The golden rule: **never nest HTML inside ScrollControls.** The 3D scene lives as a
fixed-position backdrop (`z-index: 0`, `pointer-events: none`) behind normal scrolling HTML.

```
┌─────────────────────────────────────┐
│  <ThreeBackground> (fixed, z:0)    │
│  ┌───────────────────────────────┐  │
│  │  Canvas                       │  │
│  │  ├── DynamicLights            │  │
│  │  ├── ParticleFlyThrough       │  │
│  │  └── HeroCore                 │  │
│  └───────────────────────────────┘  │
├─────────────────────────────────────┤
│  <main> (relative, z:10)           │
│  ├── nav                           │
│  ├── hero (contains CSS portal)    │
│  ├── sections                      │
│  └── footer                        │
└─────────────────────────────────────┘
```

## The Three Components of a 3D Scene

### 1. ParticleFlyThrough — Immersive Starfield

A wide particle field that moves toward the camera on scroll (parallax depth).

```tsx
function ParticleFlyThrough() {
  const pointsRef = useRef<THREE.Points>(null)

  // Memoize particle positions — they never change
  const positions = useMemo(() => {
    const count = 1400 // lighter for red studio, 2000 for gold
    const coords = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      coords[i * 3]     = (Math.random() - 0.5) * 35
      coords[i * 3 + 1] = (Math.random() - 0.5) * 35
      coords[i * 3 + 2] = (Math.random() - 0.5) * 45
    }
    return coords
  }, [])

  useFrame((state, delta) => {
    if (!pointsRef.current) return
    const progress = getScrollProgress()
    // Particles fly toward camera on scroll
    pointsRef.current.position.z = THREE.MathUtils.lerp(
      pointsRef.current.position.z,
      progress * 35,
      0.08
    )
    pointsRef.current.rotation.y += delta * 0.02
    pointsRef.current.rotation.x += delta * 0.01
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        size={0.18}
        sizeAttenuation
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  )
}
```

### 2. HeroCore — Crystalline Wireframe + Orbiting Ring

A layered 3D sculpture: inner octahedron core → outer glow mesh → box cage shell → orbiting torus ring.
All wireframe, all driven by `useMemo` for geometry/materials.

```tsx
function HeroCore() {
  const mouse = useRef({ x: 0, y: 0 })

  // Single useMemo that creates ALL geometry + materials + groups
  const { grp, coreMesh, glowMesh, shellMesh, ringMesh } = useMemo(() => {
    const grp = new THREE.Group()
    const ACCENT = '#ff2a36' // or '#F5B841'

    // Core
    const core = new THREE.Mesh(
      new THREE.OctahedronGeometry(5.2, 1),
      new THREE.MeshBasicMaterial({ color: ACCENT, wireframe: true, transparent: true, opacity: 0.16 })
    )
    grp.add(core)

    // Glow aura
    const glow = new THREE.Mesh(
      new THREE.OctahedronGeometry(5.4, 1),
      new THREE.MeshBasicMaterial({ color: ACCENT, wireframe: true, transparent: true, opacity: 0.25, blending: THREE.AdditiveBlending })
    )
    grp.add(glow)

    // Cage shell
    const shell = new THREE.Mesh(
      new THREE.BoxGeometry(7.8, 7.8, 7.8),
      new THREE.MeshBasicMaterial({ color: ACCENT, wireframe: true, transparent: true, opacity: 0.06 })
    )
    shell.rotation.set(Math.PI / 4, Math.PI / 4, 0)
    grp.add(shell)

    // Orbiting ring
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(9.2, 0.18, 16, 100),
      new THREE.MeshBasicMaterial({ color: ACCENT, wireframe: true, transparent: true, opacity: 0.22 })
    )
    ring.rotation.set(Math.PI / 3, Math.PI / 6, 0)
    grp.add(ring)

    return { grp, coreMesh: core, glowMesh: glow, shellMesh: shell, ringMesh: ring }
  }, [])

  // Mouse tracking (no re-renders — ref-based)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5,
      }
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  useFrame((state, delta) => {
    const progress = getScrollProgress()
    const { grp, coreMesh, glowMesh, shellMesh, ringMesh } = result

    // Scroll: sink + shrink
    grp.position.y = THREE.MathUtils.lerp(grp.position.y, -1.2 + progress * -25, 0.08)
    grp.scale.setScalar(THREE.MathUtils.lerp(grp.scale.x, Math.max(0.2, 1.2 - progress * 2.0), 0.08))

    // Mouse parallax drift
    const mx = mouse.current.x * 2.2
    const my = -mouse.current.y * 2.2
    grp.position.x = THREE.MathUtils.lerp(grp.position.x, mx, 0.06)
    grp.position.z = THREE.MathUtils.lerp(grp.position.z, my, 0.06)

    // Spin — core and shell in opposite directions
    coreMesh.rotation.y += delta * 0.35
    coreMesh.rotation.x += delta * 0.15
    glowMesh.rotation.y += delta * 0.35
    glowMesh.rotation.x += delta * 0.15
    shellMesh.rotation.y -= delta * 0.25
    shellMesh.rotation.z += delta * 0.15
    ringMesh.rotation.z += delta * 0.45

    // Color-shift on scroll (gold → red or any accent pair)
    if (progress > 0.5) {
      const factor = (progress - 0.5) / 0.5
      grp.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const mat = child.material as THREE.MeshBasicMaterial
          mat.color.lerpColors(new THREE.Color('#F5B841'), new THREE.Color('#ff2a36'), factor)
        }
      })
    }
  })

  return <primitive object={result.grp} position={[0, -1.2, -6]} />
}
```

### 3. DynamicLights — Accent-colored scene lighting

```tsx
function DynamicLights() {
  const lights = useMemo(() => {
    const group = new THREE.Group()
    const ambient = new THREE.AmbientLight('#F5B841', 0.5)
    const dir1 = new THREE.DirectionalLight('#ffffff', 2.0)
    const dir2 = new THREE.DirectionalLight('#F5B841', 1.0)
    dir1.position.set(10, 15, 5)
    dir2.position.set(-10, -15, -5)
    group.add(ambient, dir1, dir2)
    return { group, ambient, dir1, dir2 }
  }, [])

  useFrame(() => {
    const progress = getScrollProgress()
    if (progress > 0.5) {
      const f = (progress - 0.5) / 0.5
      lights.ambient.color.lerpColors(new THREE.Color('#F5B841'), new THREE.Color('#ff2a36'), f)
      lights.dir1.color.lerpColors(new THREE.Color('#ffffff'), new THREE.Color('#ff0033'), f)
      lights.dir2.color.lerpColors(new THREE.Color('#F5B841'), new THREE.Color('#000000'), f)
    }
  })

  return <primitive object={lights.group} />
}
```

## The CSS Light Portal (Hero Beam)

The 3D scene handles geometry; **CSS handles the light.** The "portal" is pure CSS
gradients + blur, synced to the accent variable. No Three.js, no overhead.

```css
/* Dark scrim behind light beam — calms the 3D warp */
.portalScrim {
  background: radial-gradient(
    ellipse 34% 85% at 50% 78%,
    rgba(7, 7, 8, 0.92) 0%,
    rgba(7, 7, 8, 0.35) 55%,
    rgba(7, 7, 8, 0) 75%
  );
}

/* Hot core shaft — thin bright column reaching up behind the wordmark */
.portalBeam {
  width: 5px;
  height: 124%;
  background: linear-gradient(to top,
    rgba(var(--accent-rgb), 0) 0%,
    rgba(255, 180, 90, 0.55) 6%,
    rgba(255, 232, 195, 0.95) 15%,
    rgba(255, 248, 240, 1) 22%,
    rgba(var(--accent-rgb), 0.8) 40%,
    rgba(var(--accent-rgb), 0.42) 60%,
    rgba(var(--accent-rgb), 0.16) 80%,
    rgba(var(--accent-rgb), 0) 100%
  );
  filter: blur(2px);
  animation: portalPulse 4.5s ease-in-out infinite;
}

/* Wide glow halo around shaft */
.portalBeam::before {
  width: 340px;
  height: 100%;
  background: linear-gradient(to top,
    rgba(var(--accent-rgb), 0.55) 0%,
    rgba(var(--accent-rgb), 0.22) 38%,
    rgba(var(--accent-rgb), 0.06) 68%,
    rgba(var(--accent-rgb), 0) 100%
  );
  filter: blur(60px);
}

/* Floor ember burst — wide hot glow at base */
.portalBloom {
  background: radial-gradient(ellipse 54% 56% at 50% 100%,
    rgba(255, 232, 148, 0.98) 0%,
    rgba(255, 198, 96, 0.74) 14%,
    rgba(255, 120, 76, 0.46) 32%,
    rgba(var(--accent-rgb), 0.22) 54%,
    rgba(var(--accent-rgb), 0) 80%
  );
  filter: blur(44px);
  animation: portalPulse 4.5s ease-in-out infinite;
}

@keyframes portalPulse {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}
```

## Color-Theme Architecture

The key insight: **CSS and Three.js share the same accent values** via CSS custom
properties. The Three.js scene reads its color from `getComputedStyle` or uses a
hardcoded constant that mirrors the CSS.

```css
:root {
  --accent-rgb: 245, 184, 65;       /* Studio Gold — default */
  --accent-gold: #f5b841;
  --accent-gold-bright: #ffcb6b;
  --accent-gold-dim: #c8922e;
  --accent-gold-glow: rgba(245, 184, 65, 0.15);
}
[data-variant="dev"] {
  --accent-rgb: 255, 42, 54;        /* VaderLabz Red — override */
  --accent-gold: #ff2a36;
  --accent-gold-bright: #ff5a64;
  --accent-gold-dim: #c01e28;
}
```

The Three.js `ACCENT_BASE` constant mirrors whichever variant is active (set at build
time via `NEXT_PUBLIC_JB_VARIANT`).

## The Complete Integration Pattern

In your page/layout, you compose it like this:

```tsx
export default function Home() {
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, -100])

  return (
    <>
      <ThreeBackground />           {/* Fixed, z-index: 0 */}
      <main className="relative z-10">
        <nav>...</nav>

        <motion.section style={{ y: heroY }}>
          <div className="heroPortal">    {/* CSS light beam */}
            <div className="portalScrim" />
            <div className="portalBeam" />
            <div className="portalBloom" />
          </div>
          <h1>Your Brand</h1>
        </motion.section>

        <section>Content...</section>
        <footer>...</footer>
      </main>
    </>
  )
}
```

## Scroll Progress Utility

Both the 3D scene and the CSS system need to read scroll progress. This is the
shared helper — called inside `useFrame` so it never triggers React re-renders:

```ts
function getScrollProgress(): number {
  if (typeof window === 'undefined') return 0
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight
  return totalHeight > 0 ? window.scrollY / totalHeight : 0
}
```

## Performance Rules (non-negotiable)

1. **ALL geometry and materials in useMemo** — Never create `new THREE.*` inside `useFrame` or the component body
2. **No React state in useFrame** — Use refs for scroll, mouse, and animation values
3. **Particle count ceiling**: 2000 for gold scenes, 1400 for red (visually denser)
4. **Wireframe only** — No solid mesh rendering in the background scene (it's a backdrop, not a model viewer)
5. **No post-processing for hero scenes** — Bloom/vignette is unnecessary when CSS does the glow work
6. **`pointer-events: none`** on the Canvas container — so clicks pass through to HTML
7. **`prefers-reduced-motion`** — Disable active rotations and portal animations, fall back to a static gradient
8. **Scroll progress is NaN-safe** — Always guard `scrollHeight - innerHeight` to avoid divide-by-zero

## Multi-chapter WebGL (Cartier / Montfort pattern)

When scroll crosses **distinct 3D worlds** (alcoves, planets, districts) — not one continuous backdrop:

1. **One active scene at a time** — mount/unmount or hide inactive chapters; never keep six full GLB scenes in GPU memory.
2. **Dispose on exit** — when scroll progress leaves a chapter band, run cleanup:

```ts
function disposeChapter(scene: THREE.Object3D) {
  scene.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      obj.geometry?.dispose()
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
      mats.forEach((m) => {
        m.dispose()
        Object.values(m).forEach((v) => {
          if (v instanceof THREE.Texture) v.dispose()
        })
      })
    }
  })
}
```

3. **Preload next chapter** — start fetching the next GLB when user hits ~80% of current chapter (Cartier pattern).
4. **Hash sync** — `history.replaceState` when chapter changes; deep-link scroll on load (see `Scroll-Video-Sequence` Step 6).
5. **Reduced motion** — static hero still per chapter (first frame or poster GLB snapshot); skip camera flights.
6. **Flat fallback route** — mirror IA on `/flat` or static HTML for no-WebGL (SBS Town pattern) — see `Motion-Accessibility`.

For DOM-aligned meshes (HTML card tracks a 3D object), evaluate **`@14islands/r3f-scroll-rig`** (WATCH in SCROLL-3D-REFERENCES) vs sibling-backdrop Fusion.

## Persistent canvas across routes (day1-run / Codrops pattern)

Webflow award sites (day1-run, nudot, schmitt) use **Barba.js** to swap HTML while a **singleton Three.js `Experience`** keeps rendering. In **Next.js App Router**, do not install Barba — use:

1. **Fixed `<Canvas>` in root `layout.tsx`** — position `fixed inset-0 -z-10`, outside `{children}` page slot.
2. **One R3F scene manager** — reads `pathname` or a Zustand chapter id; cross-fade or dispose props on route change (lighter than full scene swap).
3. **View Transitions API** — morph DOM between routes (`View-Transitions` skill); WebGL canvas never unmounts.
4. **Scroll reset** — on navigation, `lenis.scrollTo(0, { immediate: true })` + kill stale ScrollTriggers in `useGSAP` cleanup.
5. **Mobile** — consider disabling Lenis on touch (see `Motion-Accessibility`); persistent canvas still runs but reduce particle count.

```tsx
// app/layout.tsx — sketch
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SmoothScrollProvider>
          <PersistentFusionCanvas /> {/* fixed, never unmounts */}
          <ViewTransition>{children}</ViewTransition>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
```

Reference: [FUTURE THREE — day1-run](https://www.futurethree.studio/project/day-one-run) · Codrops Webflow+GSAP+Three+Barba tutorials.

## Related Skills

| Skill | When to read |
|-------|-------------|
| **Three.js-Ops** | Core R3F setup, model loading, basic scenes |
| **3D-Scroll** | Alternative ScrollControls pattern (if you need HTML-over-3D) |
| **WebGL-UI** | Post-processing effects, custom shaders for advanced scenes |
| **NovaMira-Design** | Design tokens, glassmorphism, bento grids for the HTML layer |
| **Premium-UI** | Motion components, shadcn registry for UI elements |
| **DesignMD** | Brand design systems extraction for color tokens |
