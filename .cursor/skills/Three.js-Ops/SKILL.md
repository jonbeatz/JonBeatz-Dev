# Three.js-Ops — 3D Scene Setup & Management

## When to use this skill
- Setting up a 3D scene in Next.js/React
- Adding 3D objects, lighting, or interactivity to the Playground UI
- Rendering 3D models (GLTF/GLB) in the browser

## Core Setup Pattern

### Installation
```bash
npm install three @react-three/fiber @react-three/drei
```

### Next.js Scene Component
```javascript
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Box, Environment } from '@react-three/drei'

export default function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} />
      <Box>
        <meshStandardMaterial color="#F5B841" metalness={0.5} roughness={0.2} />
      </Box>
      <OrbitControls />
      <Environment preset="studio" />
    </Canvas>
  )
}
```

## Performance Rules
1. **Use useMemo for geometry/materials** — Do not declare them inside the render loop or standard component renders; reuse them.
2. **Limit polygon count** — Target < 50k triangles for real-time browser experiences.
3. **Use React.Suspense** — Always wrap loaders and models in a suspense block with fallback loading feedback.
4. **Enable shadows selectively** — Shadows are expensive; only turn them on for high-performance contexts.

## Model Loading
```javascript
import { useGLTF } from '@react-three/drei'

function Model({ url }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} />
}
```

## Anti-Slop
- **No raw THREE direct DOM manipulation in React** — Let `@react-three/fiber` manage the lifecycle; do not manually append canvases or elements to raw DOM unless absolutely required.
- **No blocking main thread with heavy geometry** — Run expensive mesh processing or parsing in web workers or prep files offline.
- **No textures > 2048x2048** — Compress to WebP or PNG format, keeping resolution at 1024x1024 whenever possible.
