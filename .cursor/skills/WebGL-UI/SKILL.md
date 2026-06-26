# WebGL-UI — Shader Effects & 3D UI

## When to use this skill
- Adding interactive 3D UI elements to the Playground
- Shader effects (glow, distortion, morphing)
- Post-processing (bloom, vignette, color grading)

## Core Setup

### Installation
```bash
npm install @react-three/postprocessing
```

### Bloom Effect Setup
```javascript
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'

function SceneWithEffects() {
  return (
    <Canvas>
      <EffectComposer>
        <Bloom intensity={0.5} luminanceThreshold={0.1} />
        <Vignette offset={0.1} darkness={0.5} />
      </EffectComposer>
      {/* scene content */}
    </Canvas>
  )
}
```

### Custom Shader (glow pulse)
Always use Studio Gold `#F5B841` as the glow/accent color for consistency with the NovaMira brand and JonBeatz design guidelines.

```javascript
const GlowShader = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#F5B841') }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor;
    varying vec2 vUv;
    void main() {
      float glow = 0.5 + 0.5 * sin(uTime * 3.0);
      gl_FragColor = vec4(uColor * glow, 1.0);
    }
  `
}
```

## UI Integration
- **Complement Glassmorphism** — 3D UI elements should complement, not replace, glassmorphism. Place 3D canvas backgrounds with transparent backings directly *behind* translucent glass panels.
- **Translucency layers** — Combine CSS backdrop filters (`backdrop-filter: blur(12px)`) on cards with subtle 3D glowing meshes underneath to create high-end volumetric spatial depth.
- **Reduced Motion Fallback** — Always test and respect `prefers-reduced-motion`. For devices with this preference, disable active rotation/shader loops and fallback to subtle static CSS transitions.

## Anti-Slop
- **No heavy post-processing on mobile** — Disable bloom, depth-of-field, or high-radius vignettes for mobile browser user-agents.
- **No un-optimized shader loops** — Keep uniforms simple. Use `useMemo` for shader materials and do not re-instantiate them every render tick.
- **Clean Disposal** — Always dispose of geometries, materials, and textures when unmounting WebGL/Canvas nodes to prevent browser memory leaks.
