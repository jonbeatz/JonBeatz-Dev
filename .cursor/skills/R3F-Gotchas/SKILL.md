# R3F-Gotchas — React Three Fiber Known Issues & Workarounds

## When to use this skill
- Debugging a blank/black 3D canvas (WebGL renders but nothing visible)
- `EffectComposer` or `Bloom` causing the scene to crash silently
- `Float` wrapper makes `Suspense` hang with GLB models
- GLB/GLTF models load (200 status) but don't render
- Setting up a new R3F scene in Next.js and hitting unexpected issues

## 1. EffectComposer + Bloom Crash

### Symptom
WebGL canvas renders black when `EffectComposer` + `Bloom` from `@react-three/postprocessing` is used. No console errors — the canvas simply stops rendering.

### Root Cause
Version incompatibility between `@react-three/postprocessing@3.0.4`, `three@0.185.0`, and `@react-three/fiber@9.6.1`. The EffectComposer's internal setup fails silently with newer three.js versions.

### Workaround
Remove EffectComposer and Bloom imports entirely until version compatibility is verified:

```tsx
// ❌ BROKEN
import { EffectComposer, Bloom } from '@react-three/postprocessing'

function Scene() {
  return (
    <EffectComposer>
      <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} intensity={0.6} />
    </EffectComposer>
  )
}

// ✅ WORKING — remove entirely, animate materials directly instead
function Scene() {
  return (
    <mesh>
      <meshStandardMaterial color="#ff2a36" metalness={0.7} roughness={0.3} />
    </mesh>
  )
}
```

### Future Fix (not yet tested)
Try pinning to compatible versions:
```json
"three": "0.163.0",
"@react-three/postprocessing": "2.16.0"
```

## 2. Float Wrapper + Suspense Deadlock

### Symptom
When wrapping a `useGLTF` model in `<Float>`, the `Suspense` boundary never resolves — the component hangs indefinitely.

### Root Cause
`Float` from `@react-three/drei` attempts to animate the group's position/rotation properties, which conflicts with the cloned scene's animation state or the model's internal animation mixer.

### Workaround
Remove `Float` and animate the model directly in `useFrame`:

```tsx
// ❌ BROKEN
<Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
  <HelmetModel />
</Float>

// ✅ WORKING — animate in useFrame instead
function HelmetModel() {
  const groupRef = useRef<THREE.Group>(null!)
  useFrame((state, delta) => {
    const g = groupRef.current
    if (!g) return
    g.rotation.y += delta * 0.15
    g.position.y = Math.sin(state.clock.elapsedTime) * 0.1
  })
  return <primitive ref={groupRef} object={sceneClone} />
}
```

## 3. GLB Model Loads (200) But Doesn't Render

### Symptom
Model file serves correctly (HTTP 200, correct content-type `model/gltf-binary`), but nothing appears in the scene. No WebGL errors.

### Root Causes & Fixes

#### A. Missing useGLTF.preload()
If the model is >1MB, it may not load in time before the scene renders:
```tsx
// Module-level preload (outside component)
useGLTF.preload('/media/DamagedHelmet.glb')
```

#### B. scene.clone() loses material references
When cloning, materials may not transfer correctly. Always traverse:
```tsx
const sceneClone = useMemo(() => {
  const s = scene.clone()
  s.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true
      child.receiveShadow = true
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach(m => { m.needsUpdate = true })
        } else {
          child.material.needsUpdate = true
        }
      }
    }
  })
  return s
}, [scene])
```

#### C. Sub-surface scattering materials not lighting
Some GLB models (like DamagedHelmet) use sub-surface scattering or custom shader materials that don't light correctly with default scene lighting. Increase light intensity and add multiple directional lights:
```tsx
<ambientLight intensity={0.5} />
<directionalLight position={[5, 5, 5]} intensity={4} />
<directionalLight position={[-5, 3, -5]} intensity={2} color="#ff2a36" />
```

## 4. Canvas Parent Must Have position: fixed

### Symptom
3D canvas renders at ~150px tall instead of filling the viewport.

### Root Cause
The `<Canvas>` component's parent div needs `position: fixed` to fill the screen. Using `className="fixed inset-0 z-0"` requires Tailwind CSS to be installed (see Nextjs-Tailwind-Bootstrap skill).

### Fix
```tsx
<div className="fixed inset-0 z-0">
  <Canvas camera={{ position: [0, 0.5, 5], fov: 45 }}>
    <Scene3D />
  </Canvas>
</div>
```

## 5. Three.js Versions Matter

Always keep three.js, @react-three/fiber, @react-three/drei, and @react-three/postprocessing version-aligned. The verified working combination for Next.js 16 + R3F is:

```json
"three": "^0.185.0",
"@react-three/fiber": "^9.6.1",
"@react-three/drei": "^10.7.7",
"@react-three/postprocessing": "^3.0.4"  // Currently broken — see #1
```

## 6. Next.js Transpilation

R3F packages must be transpiled by Next.js:
```js
// next.config.mjs
transpilePackages: [
  'three',
  '@react-three/fiber',
  '@react-three/drei',
  '@react-three/postprocessing',
],
```

## Anti-Slop
- **No blindly adding EffectComposer** — verify version compatibility first (it will crash silently)
- **No using Float with useGLTF models** — animate in useFrame instead
- **No using scene without clone** — always clone and traverse to fix materials
- **No Canvas without position:fixed parent** — verify with computed styles in browser
- **No skipping useGLTF.preload for large models** — always preload at module level
