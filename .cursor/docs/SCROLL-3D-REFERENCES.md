# Scroll, 3D & Motion References — Tool Chest Map

**Canonical home:** `D:\Hermes\projects\_core-scripts\shared-profile-content\docs\SCROLL-3D-REFERENCES.md`  
**Visual inspiration:** [DESIGN-REFERENCES.md](./DESIGN-REFERENCES.md)  
**3D taste tokens:** [3D-WEBSITE-TASTE-CATALOG.md](./3D-WEBSITE-TASTE-CATALOG.md)  
**Workflow vault (prompts + assets):** [3D-WEB-WORKFLOWS.md](./3D-WEB-WORKFLOWS.md) · `D:\Hermes\assets\3d-web-workflows\`

Living map for **scroll animation sites**, **3D scroll transitions**, **canvas video-frame scrubbing**, and **immersive motion** — what we already have, what to install per project, and where to learn/steal patterns.

---

## Read order (agents)

| Task | Skills (in order) |
|------|-------------------|
| **Apple-style video scrub on scroll** | `Scroll-Video-Sequence` → `Motion-Accessibility` |
| **GSAP pin / parallax / text reveal** | `Scroll-Motion` → `skills-external/gsap-skills/` → `Motion-Accessibility` |
| **3D scene reacts to page scroll** | `3D-Website-Fusion` → `3D-Scroll` → `R3F-Gotchas` |
| **Full immersive 3D marketing site** | `NovaMira-Design` → `3D-Website-Fusion` → `Scroll-Motion` (overlays) → `MSC-UI-Taste` gate |
| **Page-to-page morph** | `View-Transitions` |
| **Shader / bloom / post FX** | `WebGL-UI` (verify EffectComposer compatibility — see `R3F-Gotchas`) |

Profile paths: `.cursor/skills/<name>/SKILL.md` · Vendored GSAP packs: `.cursor/skills-external/gsap-skills/`

---

## Internal arsenal (already documented)

| Layer | Skill / asset | What it covers |
|-------|---------------|----------------|
| **2026 scroll stack** | `Scroll-Motion` | Lenis + GSAP ScrollTrigger/SplitText, Lenis↔GSAP bridge, CSS `scroll()` |
| **Canvas frame scrub** | `Scroll-Video-Sequence` | FFmpeg → image sequence → sticky runway → rAF draw (**never scrub `<video>`**) |
| **R3F scroll in canvas** | `3D-Scroll` | `ScrollControls`, `useScroll`, parallax, section ranges |
| **Production 3D site** | `3D-Website-Fusion` | Sibling backdrop, `window.scrollY` in `useFrame`, particles, color-shift |
| **Safety gate** | `Motion-Accessibility` | `prefers-reduced-motion`, GSAP `matchMedia`, CWV budget |
| **Route morphs** | `View-Transitions` | Native View Transitions API (0kb) |
| **Three.js base** | `Three.js-Ops`, `3D-Modeling`, `WebGL-UI` | Scene setup, GLB, shaders |
| **R3F pitfalls** | `R3F-Gotchas` | Bloom crash, Float+GLB hang, blank canvas |
| **Look & feel** | `3D-WEBSITE-TASTE-CATALOG.md` | Studio Gold, Vader Red, scroll color-shift tokens |
| **Workflow vault** | `3D-WEB-WORKFLOWS.md` + `D:\Hermes\assets\3d-web-workflows\` | Prompts, guides, reference repos, skill packs |
| **GSAP agent packs** | `skills-external/gsap-skills/` | Official ScrollTrigger/timeline/React skills (vendored, on deck) |
| **npm (Hermes baseline)** | `gsap`, `@gsap/react`, `lenis`, `split-type`, `three`, R3F, `drei`, `motion` | **Installed** JonBeatz, JonBeatz.dev, DigitalStudioz, VaderLabz |
| **SmoothScrollProvider** | `components/SmoothScrollProvider.tsx` (template) | Lenis↔GSAP bridge — wrap layout when using ScrollTrigger |
| **Source video → frames** | FFmpeg (via `Scroll-Video-Sequence`, claude-video stack) | Already on PATH for frame extraction |

---

## Pattern picker — which technique?

| You want… | Use | Avoid |
|-----------|-----|--------|
| Video plays forward/back as you scroll | **Canvas image sequence** (`Scroll-Video-Sequence`) | Scrubbing `<video>.currentTime` |
| Pinned section, horizontal scroll, text lines reveal | **Lenis + GSAP ScrollTrigger** (`Scroll-Motion`) | Locomotive Scroll (legacy) |
| 3D object rotates/moves with page scroll | **Sibling backdrop + `useFrame` + `scrollY`** (`3D-Website-Fusion`) | Nesting all HTML inside `ScrollControls` |
| 3D scene with internal scroll pages | **`ScrollControls`** (`3D-Scroll`) | Same pattern on long marketing pages with nav |
| Cheap progress bar / light parallax | **CSS scroll-driven animations** | GSAP for trivial effects |
| Card → detail page morph | **View Transitions API** | Heavy JS page transition libs |
| Complex choreographed 3D timeline (editor) | **Theatre.js + R3F** (see below) | Hand-rolling 50+ keyframes in `useFrame` |
| 2D vector character on scroll | **Rive** (optional) | Lottie for long scroll-sync (heavier) |

---

## External references — inspiration

| Site | Focus | Notes |
|------|-------|-------|
| [Awwwards — Scrolling](https://www.awwwards.com/websites/scrolling) | Scroll-native award sites | Bar for kinetic scroll |
| [Awwwards — GSAP](https://www.awwwards.com/websites/gsap) | GSAP-built sites | Pair with `Scroll-Motion` |
| [Godly](https://godly.website/) | Scroll **video** captures of premium sites | Motion reference, not code |
| [Codrops](https://tympanus.net/codrops/) | Scroll/3D tutorials + demos | Deep dives; often GSAP + WebGL |
| [Hover States](https://hoverstates.com/) | Interaction + scroll craft | Micro-interaction ideas |
| [Maxi Best Of](https://maxibestof.one/) | Curated scroll / awwwards picks | Daily scroll-site discovery |
| **[devini-tea](https://github.com/devinilabs/devini-tea)** | **Open-source scroll-video cinematic site** | Vault: `D:\Hermes\assets\3d-web-workflows\devini-tea\` — scroll drives video frame-by-frame. Pair with `Scroll-Video-Sequence` |
| [spacexmarsmission.netlify.app](https://spacexmarsmission.netlify.app/#moon) | **120-frame canvas scroll** (Vite/React, no GSAP) | Loader gate until frames ready · hash anchors (`#moon`) · narrative stat overlays — Jon ref 2026-07-04 |
| [theoframerate.netlify.app](https://theoframerate.netlify.app/) | **AI Studio frame scrub** (WebP, 120 frames) | Rapid prototype path → port to Next.js + `Scroll-Video-Sequence` |
| [robolabs.net](https://robolabs.net/) | Robotics marketing (scroll sections, carousel) | B2B craft reference — pair with DESIGN-REFERENCES built-site table |
| [spacex.com](https://www.spacex.com/) | Space corporate (Angular) | Brand/minimal reference — scroll cinema on mission subpages |
| [starlink.com](https://starlink.com/) | Product marketing (Vite/React) | Hardware LP sections + map UX |
| [Cartier W&W](https://www.awwwards.com/sites/cartier-watches-wonders-2025) | **Multi-scene WebGL alcoves** · Lenis · GSAP · Web Audio | [Immersive Garden case study](https://immersive-g.com/projects/cartier-watches-and-wonders-24/) — scene dispose between chapters |
| [mont-fort.com](https://mont-fort.com/) | Astro + WebGL mountains/clouds | B2B immersive — IG Awwwards SOTM |
| [8bit.ai](https://www.awwwards.com/sites/8bit-ai) | Next.js shader manifesto · Lenis · Three.js · GSAP | Uprising — scroll camera + particle transitions |
| [davidwhyte.com/experience](https://davidwhyte.com/experience/) | Watercolor shaders · Mapbox · Lenis · GSAP | IG poetic map journey — Awwwards SOTM |
| [SBS Town](https://open-sbs.brig.ht/city) | WebGL town · GSAP · Bright/brig.ht | District navigation + **flat fallback** |
| [DESIGN-REFERENCES.md](./DESIGN-REFERENCES.md) | General UI galleries + Jon built-site refs | dark.design, land-book, batch 1 + 2 tables |

---

## External references — docs & learning

| Resource | URL | When |
|----------|-----|------|
| **GSAP docs + showcase** | [gsap.com](https://gsap.com/) · [showcase](https://gsap.com/showcase/) | ScrollTrigger, ScrollSmoother, SplitText (all free) |
| **Lenis** | [lenis.darkroom.engineering](https://lenis.darkroom.engineering/) | Smooth scroll base (`lenis/react`) |
| **CSS scroll-driven animations** | [scroll-driven-animations.style](https://scroll-driven-animations.style/) · [Chrome guide](https://developer.chrome.com/docs/css-ui/scroll-driven-animations) | Native `animation-timeline: scroll()` / `view()` — parallax + progress 0 JS |
| **GSAP ScrollTrigger (official)** | [gsap.com/docs/v3/Plugins/ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) | pin · scrub · snap · anticipatePin · fastScrollEnd |
| **MDN WebGL API** | [developer.mozilla.org/Web/API/WebGL_API](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) | Canvas fundamentals when debugging outside R3F |
| **R3F docs** | [r3f.docs.pmnd.rs](https://r3f.docs.pmnd.rs/) | Canvas, `useFrame`, drei helpers |
| **Three.js docs** | [threejs.org/docs](https://threejs.org/docs/) | Core API |
| **Theatre.js** | [theatrejs.com](https://www.theatrejs.com/) | Visual timeline for 3D/R3F (`@theatre/r3f`) — complex sequences |
| **View Transitions** | [developer.chrome.com/docs/web-platform/view-transitions](https://developer.chrome.com/docs/web-platform/view-transitions) | Native route morph |
| **GSAP ScrollTrigger examples** | [freefrontend.com/scroll-trigger-js](https://freefrontend.com/scroll-trigger-js) | Copy-paste pattern study |
| **Three.js Journey** | [threejs-journey.com](https://threejs-journey.com/) | Paid course — optional deep dive |

---

## Award-site recipe checklist (Cartier · Montfort · 8bit · David Whyte)

Patterns from Jon's batch-2 refs — adopt on Tier 2 `.dev` / client immersive builds.

| Pattern | Source | Hermes implementation |
|---------|--------|----------------------|
| **Lenis ↔ GSAP ↔ WebGL render loop** | Cartier, 8bit, David Whyte | `SmoothScrollProvider` + `Scroll-Motion` — already baseline |
| **Multi-chapter scene dispose** | Cartier alcoves | On scroll chapter cross: `scene.traverse(dispose)` · cancel loaders · swap GLB — see `3D-Website-Fusion` § Multi-chapter |
| **Hash / URL chapter sync** | Cartier `#/` routes | Same as `Scroll-Video-Sequence` Step 6 · GSAP ScrollTrigger `snap` optional |
| **Shader scene transition on scroll** | 8bit.ai | `WebGL-UI` + [Codrops GSAP shader scroll](https://tympanus.net/codrops/2025/10/08/how-to-animate-webgl-shaders-with-gsap-ripples-reveals-and-dynamic-blur-effects/) |
| **Scroll gate copy** | 8bit “Scroll Down To Continue” | One-screen loader before unlocking Lenis — pair with frame loader or WebGL init |
| **Web Audio narrative layer** | Cartier (Mooders) | **Reference only** — Web Audio API synced to scroll chapter; no lib in stack yet |
| **Mapbox + WebGL overlay** | David Whyte Experience | **Reference** — Mapbox GL for place pins + Three.js watercolor planes; optional per project |
| **Progressive enhancement flat site** | SBS Town | Parallel `/flat` or `<noscript>` route with same IA — document in `Motion-Accessibility` |
| **3D town / district navigation** | SBS Town | R3F world + GSAP camera paths OR `@14islands/r3f-scroll-rig` (WATCH) for DOM-synced meshes |
| **Canvas frame hero (not WebGL)** | spacex.com Starship clones | `ScrollFrameHero.tsx` — lighter than full Three.js for rocket/planet reveals |
| **B2B trust + immersive 3D** | mont-fort.com | Fusion backdrop + restrained typography — don't let WebGL overpower compliance copy |
| **Persistent WebGL across route changes** | day1-run · nudot · schmitt · Codrops Barba+Three | Fixed `<Canvas>` in **root layout** outside page slot — swap HTML via View Transitions, not Barba — see `3D-Website-Fusion` § Persistent canvas |
| **Visual noise / film grain overlay** | oncorps.ai | CSS `::after` fixed grain — **Scroll-Motion** §9 · zero JS |
| **Animated SVG diagram reveals** | oncorps.ai | GSAP `drawSVG` or stroke-dashoffset on scroll — B2B explainer panels |
| **Lenis desktop-only** | day1-run · jeskojets · Awwwards cluster | Enable Lenis only `(min-width: 768px)` + `(prefers-reduced-motion: no-preference)` — native scroll on mobile — **Motion-Accessibility** |
| **Barba.js page transitions** | day1-run · Squarespace refs | **Do not adopt** — use Next.js **View Transitions API** + layout-level persistent canvas instead |

---

Standard npm stack for scroll + 3D sites. Verify: **`npm run scroll:motion:status`**

| Package | Role |
|---------|------|
| `gsap` + `@gsap/react` | ScrollTrigger, pin, scrub, SplitText, `useGSAP` |
| `lenis` | Smooth scroll + GSAP ticker bridge |
| `split-type` | Text line reveal fallback (VaderLabz pattern) |
| `three` + `@react-three/fiber` + `@react-three/drei` | 3D backdrop / ScrollControls |
| `motion` | Light `whileInView`, UI micro-motion |

| Profile | Status (2026-07-04) |
|---------|---------------------|
| **JonBeatz** | Baseline installed + `components/SmoothScrollProvider.tsx` |
| **JonBeatz.dev** | Baseline installed + `SmoothScrollProvider` template |
| **DigitalStudioz** | gsap + lenis + split-type + `@gsap/react` |
| **VaderLabz** | gsap + lenis + split-type + `@gsap/react` |
| **New `-Website` bootstrap** | Copies `ThreeBackground` + `SmoothScrollProvider`; install line in bootstrap |

Optional global agent pack: `npx skills add https://github.com/greensock/gsap-skills -g -a cursor`

---

## Optional libraries (install per need)

Not required on every site — add when building:

```bash
# Theatre — only if timeline editor beats hand-rolled useFrame
npm install @theatre/core @theatre/studio @theatre/r3f
```

| Package | Role | Baseline? |
|---------|------|-----------|
| `gsap` + `@gsap/react` | ScrollTrigger, pin, scrub, SplitText | **Yes — Hermes baseline** |
| `lenis` | Smooth scroll + GSAP bridge | **Yes — Hermes baseline** |
| `split-type` | Text line reveal fallback | **Yes — recommended** |
| `@theatre/r3f` | Keyframed 3D timelines | Optional per project |
| `motion` | Enter/exit, `whileInView` | **Yes — Hermes baseline** |
| `three` / R3F / drei | 3D | **Yes — Hermes baseline** |

---

## Tool chest gaps & recommended actions

| Gap | Status | Action |
|-----|--------|--------|
| **Hermes motion baseline** | **Done (2026-07-04)** | `npm run scroll:motion:status` on any profile |
| **Canvas frame scrub (core)** | **Have** | `Scroll-Video-Sequence` + devini-tea / IronMan vault — matches SpaceX + theoframerate demos |
| **Progressive frame loader UX** | **Done (2026-07-04)** | `Scroll-Video-Sequence` Step 3 + `templates/components/ScrollFrameHero.tsx` |
| **Hash / anchor section sync** | **Done (2026-07-04)** | Skill Step 6 + `ScrollFrameHero` chapters prop |
| **[scroll-cinema](https://github.com/vvlars-cmd/scroll-cinema)** | **WATCH** | Browser MP4→frames, keyframe text, React export — see vault `SCROLL-VIDEO-RESEARCH.md` |
| **[mp4-to-jpg](https://github.com/allarddewinter/mp4-to-jpg)** | **REF** | **Bookmark** [demo](https://allarddewinter.github.io/mp4-to-jpg/) — privacy-local browser JPEG extract; ffmpeg still primary for scroll builds |
| **[Video To JPG](https://videotojpg.com/)** | **REF** | Browser frame extract — blur detection, HEVC WASM, PNG/WebP; richer alt to mp4-to-jpg |
| **[AI Camera Movements](https://aicameramovements.com/)** | **REF** | Copy-paste pan/dolly/orbit/drone prompts for AI video + R3F shot briefs |
| **External scroll-video workflow index** | **Done (2026-07-04)** | `D:\Hermes\assets\3d-web-workflows\SCROLL-VIDEO-RESEARCH.md` — Masonry, cinematic-scroll-kit, Mejba, Kling docs |
| **CapCut / multi-clip merge ritual** | **Done (2026-07-04)** | devini-tea + ai-scroll-product WORKFLOW §3b + research index |
| **Google AI Studio → Hermes port** | **Done (2026-07-04)** | Documented in `Scroll-Video-Sequence` — prototype → FFmpeg WebP → `ScrollFrameHero` → `SmoothScrollProvider` |
| **Multi-chapter WebGL dispose** | **Done (2026-07-04)** | Recipe in `3D-Website-Fusion` + award-site checklist (Cartier pattern) |
| **Progressive enhancement flat fallback** | **Partial** | SBS Town pattern — add flat route when shipping WebGL towns; gate in `Motion-Accessibility` |
| **Web Audio scroll narrative** | **Reference** | Cartier Mooders score — optional Web Audio API per project; no shared lib |
| **Mapbox + immersive map** | **Reference** | David Whyte — Mapbox GL + shaders; install `mapbox-gl` only when needed |
| **[@14islands/r3f-scroll-rig](https://github.com/14islands/r3f-scroll-rig)** | **WATCH** | DOM-synced WebGL (SBS Town class) — alternative to sibling-backdrop Fusion |
| **Shader scroll transitions** | **Partial** | 8bit pattern — `WebGL-UI` + Codrops GSAP shader tutorials |
| **Parallax playbook (full)** | **Done (2026-07-04)** | `Scroll-Motion` § Parallax + `ParallaxStack.tsx` — Vev/WWF/CSS patterns |
| **CSS scroll-driven animations** | **Done (2026-07-04)** | Scroll-Motion §6 · [Chrome docs](https://developer.chrome.com/docs/css-ui/scroll-driven-animations) |
| **Vev scrollytelling platform** | **Reference only** | WWF/Seher embeds — replicate in Next.js; do not adopt Vev as ship stack |
| **Framer agency layouts** | **Reference only** | robolabs.so pricing/process/FAQ — rebuild in shadcn + **Premium-UI**; do not adopt Framer as ship stack |
| **Barba.js + persistent Three canvas** | **Reference only** | day1-run / Codrops pattern — ship **Next.js layout canvas + View Transitions** instead |
| **Matter.js physics micro-play** | **WATCH** | bitfalk.com — optional showcase panel; no baseline install |
| **Visual noise / grain overlay** | **Done (2026-07-04)** | Scroll-Motion §9 — CSS film grain (oncorps pattern) |
| **Lenis desktop-only mobile** | **Done (2026-07-04)** | Motion-Accessibility — native scroll on touch devices |
| **Sanity + Next + WebGL** | **Have pattern** | verostudio.com — headless CMS + Fusion; no new lib |
| **Webflow + custom Vite bundle** | **Reference only** | Many Awwwards sites — export inspiration; ship Next.js |
| **gsap-skills global install** | Optional | `npx skills add https://github.com/greensock/gsap-skills -g -a cursor` |
| **Theatre.js** | Not in stack | Install only if visual 3D timeline editing needed |
| **Locomotive Scroll** | Legacy | **Do not adopt** — use Lenis |
| **Spline embeds** | Alternative | Skip — use R3F + GLB |
| **Postprocessing Bloom** | Broken combo | See `R3F-Gotchas` before shipping bloom |
| **Design-Engineer visual loop** | **Done (2026-07-13)** | `Design-Engineer` skill + vault `design-agent-solpowa` |
| **Iron Man HUD / dual sequence** | **Done (2026-07-13)** | `08-iron-man-patterns.md` + `CinematicBeatOverlay` + `HudFrame` templates |
| **RoboNuggets module map in shared** | **Done (2026-07-13)** | See § RoboNuggets module map below |
| **MAVRA / Luke vault summaries** | **Done (2026-07-13)** | `VAULT-BUNDLE-SUMMARIES.md` |
| **useSplitType template** | **Done (2026-07-13)** | `templates/lib/useSplitType.ts` (MAVRA ch.14) |
| **cinematic-scroll-skill doctor/tokens** | **Done (2026-07-13)** | Vendored vault + `vault:cinematic-scroll-skill`; A- ADOPT |
| **Vault PDF/DOCX full read** | **Done (2026-07-13)** | `VAULT-PDF-INDEX.md` — premium PDF + web-xtraz Guide/webguide/Devini docx |
| **Doc Mo guides (16 PDFs)** | **Done (2026-07-13)** | `docmo-guides-pdf/` → `DOCMO-GUIDES-INDEX.md` — scroll scrub, configurators, AI ads |

---

## Scroll-video workflow tiers

| Tier | Images | Videos | Best for | Vault |
|------|--------|--------|----------|-------|
| **A — Product explode** | 2 | 1 clip | CPG / hardware hero | `ai-scroll-product-workflow/` |
| **B — Luxury story** | 10+ | Multi-clip merge | Brand narrative | `devini-tea/BUILD-GUIDE.md` |
| **C — Multi-chapter** | 9×2 pairs | 9 clips | Editorial reel | [cinematic-scroll-kit](https://github.com/yojahny55/cinematic-scroll-kit) |

Full ranked guide list + Kling matrix: vault `SCROLL-VIDEO-RESEARCH.md`.

---

## RoboNuggets module map → Hermes skills

Browse: `D:\Hermes\assets\3d-web-workflows\robonuggets\cinematic-site-components\index.html`

| # | Module | Hermes skill |
|---|--------|--------------|
| 01–09 | Scroll-driven (mask, sticky stack, parallax, horizontal, …) | **Scroll-Motion**, **Scroll-Video-Sequence** |
| 10–17 | Cursor & hover (magnetic, trail, flip cards, …) | **Premium-UI**, **WebGL-UI** |
| 18 | View Transition Morphing | **View-Transitions** |
| 19–23 | Click / tap (particles, odometer, coverflow, …) | **NovaMira-Design**, **Component-Registries** |
| 24–30 | Ambient (marquee, mesh gradient, glitch, …) | **Scroll-Motion** § grain, **DesignMD** |

Port: extract motion logic → Next.js client component + Lenis. Do **not** ship raw HTML in production.

---

## Production stack summary (JonBeatz 2026)

```
┌─────────────────────────────────────────────────────────┐
│  HTML scroll (native or Lenis-smoothed)                 │
│  ├── GSAP ScrollTrigger overlays (marketing sections)   │
│  ├── Canvas frame sequence hero (Scroll-Video-Sequence) │
│  └── Fixed R3F backdrop reads window.scrollY            │
│       (3D-Website-Fusion — particles, wireframe core)     │
├─────────────────────────────────────────────────────────┤
│  motion/react — light whileInView, UI micro-motion      │
│  View Transitions — route morphs (0kb)                  │
│  Motion-Accessibility — reduced-motion + CWV gate       │
└─────────────────────────────────────────────────────────┘
```

**Source media pipeline:** ComfyUI / HF `image:gen` for stills · FFmpeg for frame strips · GLB from `3D-Modeling` / ComfyUI 3D when geometry beats baked video.

---

## Add queue

| Date | URL / item | Category | Note |
|------|------------|----------|------|
| 2026-07-04 | Internal skills map | Canon | Scroll-Motion + 3D-Scroll + Scroll-Video-Sequence + Fusion |
| 2026-07-04 | https://scroll-driven-animations.style/ | Docs | Native CSS scroll timelines |
| 2026-07-04 | https://www.awwwards.com/websites/scrolling | Inspiration | Scroll sites |
| 2026-07-04 | https://www.awwwards.com/websites/gsap | Inspiration | GSAP sites |
| 2026-07-04 | https://theatrejs.com/ | Tool (optional) | R3F timeline editor |
| 2026-07-04 | https://maxibestof.one/ | Inspiration | Daily scroll curation |
| 2026-07-04 | https://freefrontend.com/scroll-trigger-js | Examples | GSAP ScrollTrigger gallery |
| 2026-07-04 | https://spacexmarsmission.netlify.app/ | Built reference | 120-frame canvas, loader gate, hash sections |
| 2026-07-04 | https://theoframerate.netlify.app/ | Built reference | AI Studio WebP scrub prototype |
| 2026-07-04 | https://github.com/vvlars-cmd/scroll-cinema | Tool (WATCH) | Browser frame extract + React export |
| 2026-07-04 | Viktor Lövgren scroll WebP blog | Docs | FFmpeg WebP + fallback img pattern |
| 2026-07-04 | https://www.cartier.com/en-ro/watchesandwonders#/ | Built reference | IG alcoves — Lenis GSAP Three audio |
| 2026-07-04 | https://mont-fort.com/ | Built reference | Astro WebGL B2B immersive |
| 2026-07-04 | https://www.8bit.ai/ | Built reference | Next Lenis shader manifesto |
| 2026-07-04 | https://davidwhyte.com/experience/ | Built reference | Mapbox + watercolor shaders |
| 2026-07-04 | https://open-sbs.brig.ht/ | Built reference | Bright WebGL town + flat fallback |
| 2026-07-04 | https://github.com/14islands/r3f-scroll-rig | Tool (WATCH) | DOM-synced R3F scroll |
| 2026-07-14 | https://aicameramovements.com/ | Prompt REF | Camera move copy-paste library for AI video / shot briefs |
| 2026-07-04 | https://day1-run.webflow.io/ | Built reference | FUTURE THREE — Barba+Three → View Transitions port |
| 2026-07-04 | https://jeskojets.com/ | Built reference | Aviation cinematic — The First The Last |
| 2026-07-04 | https://www.nudot.com.tw/ | Built reference | TW agency Lenis+GSAP+Three |
| 2026-07-04 | https://bitfalk.com/ | Built reference | Astro + Matter.js physics |
| 2026-07-04 | https://www.verostudio.com/ | Built reference | Next.js + Sanity + WebGL |
| 2026-07-04 | https://www.oncorps.ai/ | Built reference | SVG diagrams + grain noise |
| 2026-07-04 | https://tympanus.net/codrops/ | Docs | Barba+Three persistent canvas tutorials |
| 2026-07-04 | https://www.awwwards.com/websites/parallax/ | Inspiration feed | Parallax browse — design refs only |
| 2026-07-04 | https://www.cssdesignawards.com/website-gallery?feature=parallax | Inspiration feed | Parallax SOTD gallery |
| 2026-07-04 | https://github.com/vvlars-cmd/scroll-cinema | Tool (WATCH) | Browser frame extract + React export |
| 2026-07-04 | https://masonry.so/blog/exploded-view-animation-guide-nanobananapro-kling | Workflow doc | Exploded view + Kling prompts |
| 2026-07-04 | https://github.com/yojahny55/cinematic-scroll-kit | Workflow doc | Multi-chapter cinematic reel |
| 2026-07-04 | https://www.viktorlovgren.com/blog/scroll-driven-frame-animation/ | Workflow doc | FFmpeg WebP canvas scroll |
| 2026-07-04 | https://www.mejba.me/blog/3d-scroll-animations-ai-claude-code | Workflow doc | Kling 3 + Claude build |
| 2026-07-04 | https://kling.ai/quickstart/ai-video-start-end-frames | Docs | Official start/end frame I2V |

---

## Related docs

- [DESIGN-REFERENCES.md](./DESIGN-REFERENCES.md) — general UI galleries + Jon built-site refs
- **[HERMES-SHOWCASE-SPEC.md](./HERMES-SHOWCASE-SPEC.md)** — living ultimate demo spec + run prompt
- [3D-WEBSITE-TASTE-CATALOG.md](./3D-WEBSITE-TASTE-CATALOG.md) — accent palettes (profile)
- [IMAGE-WORKFLOW.md](./IMAGE-WORKFLOW.md) — generating source video/stills
- `.cursor/skills-external/README.md` — when to pull vendored gsap-skills

**Last updated:** 2026-07-13 (vault backport: Design-Engineer, Iron Man templates, tier table, RoboNuggets map)
