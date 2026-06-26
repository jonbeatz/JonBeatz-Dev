# 3D-Scroll — Scroll-Triggered 3D Animations

## When to use this skill
- Building scroll-triggered 3D transitions in Next.js Playground
- Creating parallax effects with Three.js scenes
- Scroll-driven animations (scroll → rotate/scale/transform 3D objects)
- Hero sections with 3D elements that respond to scroll
- Storytelling experiences where 3D scenes change as user scrolls

## Core Setup

### Installation
```bash
npm install @react-three/drei @react-three/fiber
# ScrollControls is included in drei
```

### Basic Scroll Scene
```tsx
import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll, useScroll } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function ScrollScene() {
  const scroll = useScroll()
  const groupRef = useRef()

  useFrame(() => {
    // Map scroll position (0 to 1) to rotation
    groupRef.current.rotation.x = scroll.offset * Math.PI * 2
    groupRef.current.position.y = scroll.offset * -5
  })

  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color="#F5B841" />
      </mesh>
    </group>
  )
}

function Page() {
  return (
    <div style={{ height: '200vh' }}>
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ScrollControls pages={2}>
          <Scroll>
            <ScrollScene />
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  )
}
```

## Scroll Controls API Reference

### ScrollControls Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| **pages** | number | 1 | Number of scroll pages (total scroll distance = pages * 100vh) |
| **damping** | number | 0.1 | Smoothing factor (0 = no damping) |
| **horizontal** | boolean | false | Horizontal scroll mode |
| **infinite** | boolean | false | Infinite scroll loop |

### useScroll() Return Values
| Property / Method | Type | Description |
|-------------------|------|-------------|
| **offset** | number (0-1) | Overall scroll progress |
| **range(start, end)** | function | Map scroll to a range: range(0.2, 0.5) returns progress between 0-1 within that scroll segment |
| **visible(start, end)** | function | Check if an element is in view: visible(0.2, 0.5) |
| **delta** | number | Scroll delta since last frame |
| **pages** | number | Total pages configured |

## Common Patterns

### Parallax with Multiple Layers
```tsx
import { Sphere, Box, Torus } from '@react-three/drei'

function ParallaxScene() {
  const scroll = useScroll()
  const bgRef = useRef()
  const midRef = useRef()
  const fgRef = useRef()

  useFrame(() => {
    bgRef.current.position.z = -scroll.offset * 20
    midRef.current.position.z = -scroll.offset * 10
    fgRef.current.position.z = -scroll.offset * 5
  })

  return (
    <>
      <group ref={bgRef}><Sphere scale={3}><meshStandardMaterial color="#3FB950" /></Sphere></group>
      <group ref={midRef}><Box scale={2}><meshStandardMaterial color="#F5B841" /></Box></group>
      <group ref={fgRef}><Torus scale={1}><meshStandardMaterial color="#F85149" /></Torus></group>
    </>
  )
}
```

### Section-Based Animations
```tsx
function SectionScene() {
  const scroll = useScroll()
  const meshRef = useRef()

  useFrame(() => {
    // Animate only between scroll 0.3 and 0.7
    const progress = scroll.range(0.3, 0.7)
    meshRef.current.scale.setScalar(1 + progress * 2)
    meshRef.current.material.opacity = 1 - progress
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry />
      <meshStandardMaterial transparent opacity={1} color="#F5B841" />
    </mesh>
  )
}
```

### Hero to Detail Transition
```tsx
function HeroTransition() {
  const scroll = useScroll()
  const groupRef = useRef()

  useFrame(() => {
    // Hero phase: 0.0-0.3
    // Transition: 0.3-0.5
    // Detail phase: 0.5-1.0
    
    const heroProgress = scroll.range(0, 0.3)
    const transitionProgress = scroll.range(0.3, 0.5)
    const detailProgress = scroll.range(0.5, 1.0)
    
    if (scroll.offset < 0.3) {
      // Hero state (rotation, position static)
    } else if (scroll.offset < 0.5) {
      // Transition state (interpolate values)
    } else {
      // Detail state (show details)
    }
  })

  return <group ref={groupRef}>{/* ... */}</group>
}
```

## Performance Rules
1. **Use useMemo for geometry/materials** — Do not declare meshes, materials, or geometry structures inside the render loop or inside scroll scenes.
2. **Limit visible objects** — Only render what is visible. Use `scroll.visible(start, end)` to check and dynamically skip rendering or freeze heavy logic.
3. **Avoid expensive per-frame operations** — Keep `useFrame` code lightweight. Do not trigger state updates or DOM touches per frame.
4. **Use React.memo** — Wrap complex scroll-driven sub-components in `React.memo` to optimize standard React rendering sweeps.
5. **Consider pages carefully** — Keep total pages configured as small as possible; more pages can increase overall layout and virtualization memory footprint.

## UI Integration (with Motion)
Using `motion/react` (native and optimized for React 19) to create overlays:

```tsx
import { motion } from 'motion/react'

function ScrollUI() {
  const scroll = useScroll()
  const opacity = scroll.range(0, 0.2) // fade out during first 20% of scroll
  
  return (
    <motion.div 
      style={{ 
        position: 'fixed', 
        top: 20, 
        left: 20, 
        opacity: 1 - opacity 
      }}
    >
      <span style={{ color: '#F5B841' }}>Studio Gold</span>
    </motion.div>
  )
}
```

## Sibling Backdrop Pattern (No Scroll Hijacking)
For complex corporate or portfolio websites (like Next.js bento sites with fixed header bars), nesting the whole layout inside Drei's `<Scroll html>` can trigger scroll-hijacking, layout shifting, and clipping.

### The Solution: Sibling Overlay
1. Render the Canvas inside a fixed, background-layer backdrop with `pointer-events: none` and `z-index: 0`.
2. Let the HTML content scroll natively using the browser's native engine on the `body` element.
3. Synchronize the 3D scene inside `useFrame` by reading native `window.scrollY` scroll ratios. This is incredibly fast, does not trigger React state updates or component re-renders, and remains perfectly smooth.

### Implementation Example
```tsx
import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function BackgroundScene() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (typeof window === 'undefined') return
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollProgress = totalHeight > 0 ? window.scrollY / totalHeight : 0

    // Transform 3D mesh scale, position, or rotate directly with scroll progress
    if (groupRef.current) {
      groupRef.current.position.y = scrollProgress * -15
      groupRef.current.rotation.y = scrollProgress * Math.PI
    }
  })

  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry />
        <meshBasicMaterial color="#F5B841" wireframe />
      </mesh>
    </group>
  )
}

export function ThreeBackground({ children }) {
  return (
    <>
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <Canvas>
          <BackgroundScene />
        </Canvas>
      </div>
      {children}
    </>
  )
}
```

## Anti-Slop
- **No scroll animations without useMemo on objects** — Always cache materials and geometries.
- **No heavy scenes with >20 objects visible at once** — Virtualize or toggle visibility with `visible()`.
- **No scroll sensitivity that feels "janky"** — Always specify and tune the `damping` prop on `ScrollControls`.
- **Always test with prefers-reduced-motion** — Disable kinetic translation or quick rotation if the user prefers reduced motion.
- **No blocking main thread with complex geometry during scroll** — Pre-optimize models offline.
- **Use @react-three/drei helpers (ScrollControls, Scroll)** — Do not use raw native Three.js scroll events or native window scroll listeners.

## Related Skills
- **Three.js-Ops** — core Three.js setup
- **WebGL-UI** — post-processing + shaders
- **Premium-UI** — glassmorphism + animation polish
- **NovaMira-Design** — Studio Gold design tokens
