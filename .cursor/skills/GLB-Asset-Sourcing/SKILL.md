# GLB-Asset-Sourcing — Free 3D Models & HDR Maps for Web

## When to use this skill
- Finding free, production-quality GLB/GLTF 3D models for web projects
- Sourcing HDR environment maps for realistic reflections in Three.js scenes
- Validating file integrity and licensing before committing assets
- Understanding the glTF 2.0 Binary format and how it works in the browser

## The glTF 2.0 Binary Format (.glb)

**`.glb`** is the industry standard format for 3D on the web:
- Single binary file bundling geometry + textures + materials together
- PBR (Physically Based Rendering) materials — metalness, roughness, normal maps, optional sub-surface scattering
- Loaded via `useGLTF()` from `@react-three/drei` (R3F wrapper for Three.js GLTFLoader)
- Typically paired with **HDR environment maps (`.exr` or `.hdr`)** for realistic reflections

### File Validation (always check before using)

| Format | Magic Bytes (file header) | Expected Size |
|--------|--------------------------|---------------|
| `.glb` | Should start with `glTF` text | 100KB–10MB (web-optimized) |
| `.exr` (HDR) | Should start with `v/1` magic | 500KB–5MB (1K resolution) |
| `.hdr` (HDR) | Should start with `#?RADIANCE` | 1MB–30MB (varies) |

To validate: `curl.exe -s URL | Select-Object -First 1` or `head -c 10 file.glb` should show `glTF`.

## Sources (Free / Open License)

| Site | URL | License | Best For | Notes |
|------|-----|---------|----------|-------|
| **Poly Haven** | polyhaven.com | **CC0** (no attribution) | HDRIs, 3D models, textures — highest quality | All free, no account needed. Use API for direct downloads. |
| **Khronos glTF Samples** | github.com/KhronosGroup/glTF-Sample-Assets | CC-BY 4.0 / CC0 | Official glTF test models (DamagedHelmet, SciFiHelmet, BoomBox) | Well-formed, PBR, great for testing. |
| **poly.pizza** | poly.pizza | Varies (mostly CC0) | Curated Google Poly archive — thousands of clean GLB files | Remastered, web-ready, searchable. |
| **Sketchfab** | sketchfab.com | Varies | Largest 3D library | Filter by "Free Download" → download as GLB. Verify license per model. |
| **AmbientCG** | ambientcg.com | **CC0** | PBR materials + some 3D assets | Completely free, no account. |
| **Free3D** | free3d.com | Varies | Props, characters, environments | Filter by `.glb` format and "free". Quality varies. |

### Search Terms
For best results on any platform, try:
- `glb model free download`
- `PBR glTF model CC0`
- `sci-fi prop glb free`
- `character glb CC0`
- `weapon glb free`
- `vehicle glb PBR`

## Download Pipeline

### Direct Download (curl/PowerShell)
```powershell
# GLB model
curl.exe -Lo model.glb "https://cdn.polyhaven.com/..." 

# HDR environment map
curl.exe -Lo env.exr "https://dl.polyhaven.org/..."
```

### Poly Haven API (for programmatic access)
```powershell
# List available HDRIs
curl.exe "https://api.polyhaven.com/assets?t=hdris"

# Get download URL for specific asset
curl.exe "https://api.polyhaven.com/files/neon_photostudio_1k"
```

### Khronos GitHub (direct raw URLs)
```powershell
# Download DamagedHelmet
curl.exe -Lo DamagedHelmet.glb `
  "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/DamagedHelmet/glTF-Binary/DamagedHelmet.glb"
```

## Integration Pattern

```tsx
import { useGLTF, Environment } from '@react-three/drei'

// Preload at module level
useGLTF.preload('/media/model.glb')

function MyModel() {
  const { scene } = useGLTF('/media/model.glb')
  const cloned = useMemo(() => {
    const s = scene.clone()
    // Required: traverse and fix materials
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
  return <primitive object={cloned} />
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={4} />
      <Environment files="/media/env.exr" blur={0.2} />
      <MyModel />
    </>
  )
}
```

## Anti-Slop
- **No 3D assets without license check** — always verify CC0 / CC-BY before committing
- **No missing preload** — always `useGLTF.preload()` for models >500KB to prevent loading jank
- **No raw scene.use()** — always clone and traverse to fix materials
- **No .glb without magic-byte validation** — HTML error pages can be confused for model files (check header bytes)
- **No >5MB models without progress indicator** — show loading state for large assets
