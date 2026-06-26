'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Site variant accent: this standalone project IS jonbeatz.dev, so the red
// scene is the DEFAULT. The scroll-driven crimson shift below is unchanged.
// Set NEXT_PUBLIC_JB_VARIANT="default" for the legacy Studio Gold scene.
const IS_DEV_SITE = process.env.NEXT_PUBLIC_JB_VARIANT !== 'default'
const ACCENT_BASE = IS_DEV_SITE ? '#ff2a36' : '#F5B841'

// jonbeatz.dev: calm the wireframe "warp" (core/shell/ring/particles) so the
// CSS red light portal owns the hero. jon-beatz.com (gold) keeps full intensity.
const DEV_CALM = IS_DEV_SITE ? 0.4 : 1
const OP_CORE = 0.16 * DEV_CALM
const OP_GLOW = 0.25 * DEV_CALM
const OP_SHELL = 0.06 * DEV_CALM
const OP_RING = 0.22 * DEV_CALM
const OP_GLOW_MAX = 0.65 * DEV_CALM
const PARTICLE_OP = IS_DEV_SITE ? 0.4 : 0.55

// 1. Immersive Wide Particle Field (2000 Particles, Bigger Bokeh, Rapid Fly-Through)
function ParticleFlyThrough() {
  const pointsRef = useRef<THREE.Points>(null)

  // Particle field. Gold site keeps 2000 uniform particles; jonbeatz.dev dials
  // the count down a touch and gives each particle one of several aesthetic
  // colors (crimson, ember, warm yellow, white-hot, deep red) for variety.
  const { particleCoords, particleColors } = useMemo(() => {
    const count = IS_DEV_SITE ? 1400 : 2000
    const coords = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 35     // Wider X spread
      coords[i * 3 + 1] = (Math.random() - 0.5) * 35 // Wider Y spread
      coords[i * 3 + 2] = (Math.random() - 0.5) * 45 // Deeper Z field
    }

    let colors: Float32Array | undefined
    if (IS_DEV_SITE) {
      const palette = ['#ff2a36', '#ff6a3d', '#ffc24a', '#fff1dd', '#b01e28']
      const weights = [0.34, 0.24, 0.16, 0.12, 0.14]
      colors = new Float32Array(count * 3)
      const c = new THREE.Color()
      for (let i = 0; i < count; i++) {
        const roll = Math.random()
        let idx = 0
        let acc = 0
        for (let w = 0; w < weights.length; w++) {
          acc += weights[w]
          if (roll <= acc) { idx = w; break }
        }
        c.set(palette[idx])
        colors[i * 3] = c.r
        colors[i * 3 + 1] = c.g
        colors[i * 3 + 2] = c.b
      }
    }
    return { particleCoords: coords, particleColors: colors }
  }, [])

  useFrame((state, delta) => {
    if (!pointsRef.current || typeof window === 'undefined') return

    // Get native browser scroll progress
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollProgress = totalHeight > 0 ? window.scrollY / totalHeight : 0

    // Rapid camera movement forward: offset moves up to 35 units on scroll!
    pointsRef.current.position.z = THREE.MathUtils.lerp(
      pointsRef.current.position.z,
      scrollProgress * 35,
      0.08
    )

    // Dynamic color transition on scroll. The dev site uses per-particle vertex
    // colors (kept stable so the variety reads), so we only drive the uniform
    // material color on the gold site.
    const material = pointsRef.current.material as THREE.PointsMaterial
    if (material && !IS_DEV_SITE) {
      if (scrollProgress > 0.5) {
        const redFactor = (scrollProgress - 0.5) / 0.5
        material.color.lerpColors(
          new THREE.Color(ACCENT_BASE), // base accent (gold)
          new THREE.Color('#ff0033'), // Vader Red
          redFactor
        )
      } else {
        material.color.set(ACCENT_BASE)
      }
    }

    // Slow cinematic spin of the starfield
    pointsRef.current.rotation.y += delta * 0.02
    pointsRef.current.rotation.x += delta * 0.01
  })

  return (
    <Points
      ref={pointsRef}
      positions={particleCoords}
      colors={particleColors}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        vertexColors={IS_DEV_SITE}
        color={IS_DEV_SITE ? '#ffffff' : ACCENT_BASE}
        size={0.18} // Much larger, beautiful glowing dust particles
        sizeAttenuation={true}
        depthWrite={false}
        opacity={PARTICLE_OP} // Brighter visibility (calmed on dev)
      />
    </Points>
  )
}

// 2. Majestic 5x Scaled Interactive Crystalline Core & Orbiting Gyro Torus Ring
function HeroCore() {
  const mouse = useRef({ x: 0, y: 0 })

  // Instantiate massive, high-tech programmatic meshes
  const result = useMemo(() => {
    const grp = new THREE.Group()

    // A. Main Majestic Crystalline Core (Octahedron - Scaled 5x!)
    const coreGeo = new THREE.OctahedronGeometry(5.2, 1)
    const coreMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(ACCENT_BASE),
      wireframe: true,
      transparent: true,
      opacity: OP_CORE,
    })
    const coreMesh = new THREE.Mesh(coreGeo, coreMat)
    grp.add(coreMesh)

    // B. Inner Core Glow Mesh (Creating a high-end Bloom/Aura layer!)
    const glowGeo = new THREE.OctahedronGeometry(5.4, 1)
    const glowMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(ACCENT_BASE),
      wireframe: true,
      transparent: true,
      opacity: OP_GLOW,
      blending: THREE.AdditiveBlending,
    })
    const glowMesh = new THREE.Mesh(glowGeo, glowMat)
    grp.add(glowMesh)

    // C. Outer spinning mechanical cage shell (Box - Majestic size!)
    const shellGeo = new THREE.BoxGeometry(7.8, 7.8, 7.8)
    const shellMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(ACCENT_BASE),
      wireframe: true,
      transparent: true,
      opacity: OP_SHELL,
    })
    const shellMesh = new THREE.Mesh(shellGeo, shellMat)
    shellMesh.rotation.set(Math.PI / 4, Math.PI / 4, 0)
    grp.add(shellMesh)

    // D. Orbiting Gyro Ring (Torus Geometry for structural complexity!)
    const ringGeo = new THREE.TorusGeometry(9.2, 0.18, 16, 100)
    const ringMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(ACCENT_BASE),
      wireframe: true,
      transparent: true,
      opacity: OP_RING,
    })
    const ringMesh = new THREE.Mesh(ringGeo, ringMat)
    ringMesh.rotation.set(Math.PI / 3, Math.PI / 6, 0)
    grp.add(ringMesh)

    return { grp, coreMesh, glowMesh, shellMesh, ringMesh }
  }, [])

  // Capture mouse coordinates
  useMemo(() => {
    if (typeof window === 'undefined') return
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) - 0.5
      mouse.current.y = (e.clientY / window.innerHeight) - 0.5
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state, delta) => {
    const { grp, coreMesh, glowMesh, shellMesh, ringMesh } = result
    if (!grp || typeof window === 'undefined') return

    // Get native browser scroll progress
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollProgress = totalHeight > 0 ? window.scrollY / totalHeight : 0

    // Dynamic scale and sink on scroll: shrinks down slightly and slides down as we enter bento sections
    const targetY = -1.2 + scrollProgress * -25
    const targetScale = Math.max(0.2, 1.2 - scrollProgress * 2.0)

    // Smooth lerps
    grp.position.y = THREE.MathUtils.lerp(grp.position.y, targetY, 0.08)
    grp.scale.setScalar(THREE.MathUtils.lerp(grp.scale.x, targetScale, 0.08))

    // Interactive Mouse Inertia (parallax drift)
    const targetMouseX = mouse.current.x * 2.2
    const targetMouseY = -mouse.current.y * 2.2
    grp.position.x = THREE.MathUtils.lerp(grp.position.x, targetMouseX, 0.06)
    grp.position.z = THREE.MathUtils.lerp(grp.position.z, targetMouseY, 0.06)

    // Dual-axis cinematic spinning: core and shell spin in opposite directions!
    coreMesh.rotation.y += delta * 0.35
    coreMesh.rotation.x += delta * 0.15

    glowMesh.rotation.y += delta * 0.35
    glowMesh.rotation.x += delta * 0.15

    shellMesh.rotation.y -= delta * 0.25
    shellMesh.rotation.z += delta * 0.15

    ringMesh.rotation.z += delta * 0.45 // Gyroscopic spin

    // 50%+ Color transition to intense crimson Vader Red on scroll!
    grp.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mat = child.material as THREE.MeshBasicMaterial
        if (scrollProgress > 0.5) {
          const redFactor = (scrollProgress - 0.5) / 0.5
          mat.color.lerpColors(
            new THREE.Color(ACCENT_BASE), // Studio Gold
            new THREE.Color('#ff0011'), // Vader Red
            redFactor
          )
          // Make the elements shine brighter as we reach the Obsidian Bridge!
          if (child === glowMesh) mat.opacity = THREE.MathUtils.lerp(OP_GLOW, OP_GLOW_MAX, redFactor)
        } else {
          mat.color.set(ACCENT_BASE)
          if (child === coreMesh) mat.opacity = OP_CORE
          if (child === glowMesh) mat.opacity = OP_GLOW
          if (child === shellMesh) mat.opacity = OP_SHELL
          if (child === ringMesh) mat.opacity = OP_RING
        }
      }
    })
  })

  // Positioned prominently in the center of the viewport
  return React.createElement('primitive', { object: result.grp, position: [0, -1.2, -6] })
}

// 3. Strong Dynamic Lights and Intense Red Color-Shift
function DynamicLights() {
  const scroll = useScrollRef()

  const lights = useMemo(() => {
    const group = new THREE.Group()

    const ambientLight = new THREE.AmbientLight(ACCENT_BASE, 0.5)
    const dirLight1 = new THREE.DirectionalLight('#ffffff', 2.0)
    const dirLight2 = new THREE.DirectionalLight(ACCENT_BASE, 1.0)
    
    dirLight1.position.set(10, 15, 5)
    dirLight2.position.set(-10, -15, -5)

    group.add(ambientLight)
    group.add(dirLight1)
    group.add(dirLight2)

    return { group, ambientLight, dirLight1, dirLight2 }
  }, [])

  useFrame(() => {
    if (!lights) return
    const scrollProgress = scroll.current

    // Strong shift of lighting values to Vader Red
    if (scrollProgress > 0.5) {
      const redFactor = (scrollProgress - 0.5) / 0.5
      lights.ambientLight.color.lerpColors(
        new THREE.Color(ACCENT_BASE),
        new THREE.Color('#ff0011'),
        redFactor
      )
      lights.dirLight1.color.lerpColors(
        new THREE.Color('#ffffff'),
        new THREE.Color('#ff0033'),
        redFactor
      )
      lights.dirLight2.color.lerpColors(
        new THREE.Color(ACCENT_BASE),
        new THREE.Color('#000000'), // Dim the gold keylight to black
        redFactor
      )
    } else {
      lights.ambientLight.color.set(ACCENT_BASE)
      lights.dirLight1.color.set('#ffffff')
      lights.dirLight2.color.set(ACCENT_BASE)
    }
  })

  return React.createElement('primitive', { object: lights.group })
}

// Custom hook helper to capture scroll position without triggering component re-renders
function useScrollRef() {
  const scrollRef = useRef(0)

  useFrame(() => {
    if (typeof window === 'undefined') return
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight
    scrollRef.current = totalHeight > 0 ? window.scrollY / totalHeight : 0
  })

  return scrollRef
}

interface ThreeBackgroundProps {
  // children is optional now
  children?: React.ReactNode
}

export function ThreeBackground({ children }: ThreeBackgroundProps) {
  return (
    <div 
      className="fixed inset-0 w-full h-full bg-[#040405]"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0, // Behind content
        pointerEvents: 'none', // Allow clicks to pass through
      }}
    >
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <DynamicLights />
        <ParticleFlyThrough />
        <HeroCore />
      </Canvas>
    </div>
  )
}
