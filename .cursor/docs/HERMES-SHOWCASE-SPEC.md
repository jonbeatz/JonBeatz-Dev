# Hermes Showcase — Living Demo Spec & Run Prompt

**Canonical home:** `_core-scripts/shared-profile-content/docs/HERMES-SHOWCASE-SPEC.md`  
**Run ritual:** `.cursor/prompts/Build-Showcase-Demo.md`  
**Design inputs:** [DESIGN-REFERENCES.md](./DESIGN-REFERENCES.md) · [SCROLL-3D-REFERENCES.md](./SCROLL-3D-REFERENCES.md)

This file is the **accumulating blueprint** for one ultimate Hermes motion/3D playground — a functioning demo you can scroll through, click, and tune. **Append to the Add queue** as Jon finds new refs; when the list feels complete, trigger the build.

---

## How to use this file

| Jon says / does | Agent action |
|-----------------|--------------|
| Sends a cool site or technique | Add a row to **Add queue** below (feature, source URL, skill, status `queued`) |
| Feature gets implemented in the demo | Change status to `in-demo` and tick **Feature matrix** |
| **Build Showcase Demo**, **Fire Showcase**, **Hermes Motion Lab** | Execute **RUN PROMPT** section + `.cursor/prompts/Build-Showcase-Demo.md` |
| Wants to preview spec only | Read this file + `npm run scroll:motion:status` |

**Do not** duplicate full ref tables from DESIGN-REFERENCES — link them. This file answers: *what must the demo include when we build it?*

---

## RUN PROMPT (agent — execute when triggered)

Build the **Hermes Showcase** — a single-route Next.js demo that proves our scroll/3D/motion stack works together as a playable lab.

### Pre-flight (run before coding)

```powershell
npm run scroll:motion:status
npm run workflows:3d:status
npm run fleet:status   # from JonBeatz hub only
```

### Read order

1. **This file** — feature matrix + section blueprint (implement everything marked **required**)
2. `.cursor/docs/DESIGN-REFERENCES.md` — aesthetic cues (batch 1 + 2 tables)
3. `.cursor/docs/SCROLL-3D-REFERENCES.md` — award-site checklist
4. Skills: **NovaMira-Design** → **MSC-UI-Taste** → **Premium-UI** → **Motion-Accessibility**
5. Motion skills as needed: **Scroll-Video-Sequence**, **Scroll-Motion**, **3D-Website-Fusion**, **WebGL-UI**, **View-Transitions**

### Target

| Item | Value |
|------|--------|
| **Route** | `/showcase` (or `/motion-lab` if `/showcase` taken) |
| **Default host profile** | `JonBeatz.dev` — fallback: active `*-Website` bootstrap |
| **Taste** | Studio Gold (`3D-WEBSITE-TASTE-CATALOG.md`) — Vader Red variant toggle optional |
| **Framework** | Next.js App Router · TypeScript · Tailwind · `motion/react` (not legacy framer-motion) |

### Build rules

- Wrap app section in **`SmoothScrollProvider`** when GSAP ScrollTrigger sections exist
- **`Motion-Accessibility` gate** before done: reduced motion, flat fallback link, no per-frame React state
- Copy templates from `_core-scripts/shared-profile-content/templates/components/` — do not reinvent
- Frame assets: WebP under `public/showcase/sequence/` (FFmpeg) or vault **IronMan** / **devini-tea** frames for dev
- One **`DESIGN.md`** snippet in project `.cursor/DesignMD/` documenting Showcase tokens (optional, 1 page)

### Deliverable

A scrollable demo with labeled sections (small corner badges: “ScrollFrameHero”, “Fusion 3D”, etc.) so Jon can see which pattern is which. Include a sticky **nav jump list** to hash anchors.

### Handoff message

Summarize: route URL, sections built, reduced-motion path, flat fallback URL, frame/GLB sources used, and any **Add queue** items still `queued`.

---

## Demo identity

| Field | Value |
|-------|--------|
| **Working title** | Hermes Showcase · Motion Lab |
| **Purpose** | Internal playground — not client-facing — proves fleet motion stack |
| **Mood** | SpaceX restraint + Cartier polish + 8bit shader wow — gated by **MSC-UI-Taste** (no purple slop) |
| **Audience** | Jon + agents testing skills before client builds |

---

## Feature matrix (checklist)

Tick when implemented in the demo. **Required** = must ship on first showcase build.

| Feature | Source / ref | Skill · component | Priority | Status |
|---------|--------------|-------------------|----------|--------|
| Smooth scroll + GSAP bridge | Hermes baseline | `SmoothScrollProvider` | **required** | `pending` |
| Canvas frame scrub hero | [SpaceX Netlify demo](https://spacexmarsmission.netlify.app/#moon) | `ScrollFrameHero.tsx` · `Scroll-Video-Sequence` | **required** | `pending` |
| Progressive frame loader (100% gate) | SpaceX demo | `ScrollFrameHero` props | **required** | `pending` |
| Hash chapter anchors | `#moon` pattern | `ScrollFrameHero` chapters | **required** | `pending` |
| R3F sibling backdrop (particles + wireframe core) | JonBeatz.dev | `3D-Website-Fusion` | **required** | `pending` |
| CSS light portal / beam | Fusion skill | portal CSS in hero | **required** | `pending` |
| Scroll color-shift (gold → accent) | Fusion skill | `useFrame` + CSS vars | **required** | `pending` |
| GSAP ScrollTrigger pin + text reveal | robolabs / agency refs | `Scroll-Motion` · `split-type` | **required** | `pending` |
| Horizontal scroll section | [WWF PTM](https://wwf.ca/prioritythreatmanagement/) | GSAP pin + scrub | **required** | `pending` |
| Multi-layer parallax stack | [Vev features](https://www.vev.design/blog/underrated-vev-features/) | `ParallaxStack.tsx` · Scroll-Motion §5 | **required** | `pending` |
| CSS view-timeline panel reveals | [Chrome scroll-driven](https://developer.chrome.com/docs/css-ui/scroll-driven-animations) | Scroll-Motion §6 | **required** | `pending` |
| Scroll zoom section | Vev scroll-zoom | Scroll-Motion §7 | nice | `pending` |
| Scrollytelling stat counters | WWF PTM | motion `useInView` + count-up | nice | `pending` |
| `<model-viewer>` product sticky | [palmdream.com](https://palmdream.com/) | drei optional · native model-viewer | nice | `pending` |
| Decade hash timeline | [Aramark History](https://www.aramark.com/about-us/our-difference/history) | hash + jump nav | nice | `pending` |
| Stacking cards on scroll | GSAP pattern | `Scroll-Motion` | nice | `pending` |
| Infinite marquee strip | robolabs.so | `motion` or GSAP ticker | nice | `pending` |
| Custom cursor | Premium sites | `CustomCursor.tsx` template | nice | `pending` |
| Glassmorphic stat cards | Cartier / Montfort overlays | **Premium-UI** | **required** | `pending` |
| Multi-chapter WebGL dispose | Cartier alcoves | `3D-Website-Fusion` § Multi-chapter | nice | `pending` |
| Shader scene transition | [8bit.ai](https://www.8bit.ai/) | **WebGL-UI** | nice | `pending` |
| View Transition route morph | Hermes stack | **View-Transitions** · `/showcase/detail` | nice | `pending` |
| Persistent WebGL canvas across routes | [day1-run](https://day1-run.webflow.io/) · Codrops Barba+Three | `3D-Website-Fusion` § Persistent canvas · root layout | nice | `pending` |
| Visual noise / film grain overlay | [oncorps.ai](https://www.oncorps.ai/) | **Scroll-Motion** §9 grain · CSS only | nice | `pending` |
| Animated SVG diagram storytelling | oncorps.ai | SVG + GSAP draw · **Premium-UI** B2B | nice | `pending` |
| Lenis desktop-only (native scroll mobile) | day1-run · jeskojets | **Motion-Accessibility** | **required** | `pending` |
| Aviation / luxury cinematic parallax | [jeskojets.com](https://jeskojets.com/) | **ParallaxStack** + SplitText | nice | `pending` |
| Sanity CMS + Next + WebGL | [verostudio.com](https://www.verostudio.com/) | headless pattern — not demo section | ref | `skip` |
| Matter.js physics micro-interactions | [bitfalk.com](https://bitfalk.com/) | **WATCH** — optional fun panel | later | `pending` |
| Map / place pins overlay | David Whyte | Mapbox (optional install) | later | `pending` |
| Web Audio scroll chapter | Cartier Mooders | Web Audio API | later | `pending` |
| Flat `/showcase/flat` fallback | SBS Town | **Motion-Accessibility** | **required** | `pending` |
| Scroll progress rail | SpaceX / Viktor Lövgren | CSS + scroll progress var | nice | `pending` |
| Pricing / FAQ agency block | robolabs.so | shadcn + **Premium-UI** | nice | `pending` |
| Reduced motion static path | All | **Motion-Accessibility** | **required** | `pending` |
| Section labels (dev badges) | This spec | UI only | **required** | `pending` |

---

## Section blueprint (page order)

Scroll order for v1 demo — adjust when Add queue grows.

```
1. [GATE]     Full-viewport loader OR "Scroll to explore" (8bit-style) — unlock Lenis after ready
2. [HERO-A]   ScrollFrameHero — 120 WebP frames, hash chapters (moon / mars / earth labels)
3. [HERO-B]   HTML overlays on hero — glass stats, mission copy (SpaceX narrative)
4. [3D]       Fixed ThreeBackground — particles + HeroCore (Fusion) behind scroll content
5. [PIN]      GSAP pinned section — line-by-line text reveal (SplitText or split-type)
6. [PARALLAX] Multi-layer ParallaxStack + CSS view-timeline infographic panels (WWF/Vev)
7. [H-SCROLL] Horizontal scroll infographic break (WWF PTM) — required
8. [CARDS]    Stacking cards OR product sticky + model-viewer (Palmdream)
9. [MARQUEE]  Infinite tech strip (robolabs.so homage)
10. [WEBGL]   Optional shader transition panel OR second R3F chapter with dispose
11. [AGENCY]  Pricing + FAQ compact block (shadcn)
12. [FOOTER] Link to /showcase/flat · restart experience · fleet version badge
```

**Nav:** sticky jump list linking `#hero` `#pin` `#cards` `#flat`.

---

## Stack (install if missing)

Already on Hermes web profiles — verify with `npm run scroll:motion:status`:

`gsap` · `@gsap/react` · `lenis` · `split-type` · `three` · `@react-three/fiber` · `@react-three/drei` · `motion`

Optional per section: `mapbox-gl` (map panel) · `@theatre/r3f` (only if timeline chapter added)

---

## Asset sources (dev-friendly)

| Asset | Source |
|-------|--------|
| Frame sequence | `D:\Hermes\assets\3d-web-workflows\IronMan\iron-man-main\public\frames\` or FFmpeg from any short clip |
| GLB props | ComfyUI / `3D-Modeling` skill · or drei primitives for v1 |
| Posters / stills | HF `npm run image:gen` · first frame WebP |

---

## Add queue (append here)

| Date | Feature / technique | Source URL | Skill / component | Status |
|------|---------------------|------------|-------------------|--------|
| 2026-07-04 | Canvas 120-frame scrub + loader gate | https://spacexmarsmission.netlify.app/ | ScrollFrameHero | queued |
| 2026-07-04 | WebP frame scrub prototype path | https://theoframerate.netlify.app/ | Scroll-Video-Sequence | queued |
| 2026-07-04 | AI agency pricing + BIT process layout | https://robolabs.so/ | Premium-UI | queued |
| 2026-07-04 | B2B robotics marketing typography | https://robolabs.net/ | NovaMira-Design | queued |
| 2026-07-04 | Multi-scene 3D alcoves + audio | https://www.cartier.com/en-ro/watchesandwonders#/ | 3D-Website-Fusion | queued |
| 2026-07-04 | WebGL town + flat fallback | https://open-sbs.brig.ht/ | Motion-Accessibility | queued |
| 2026-07-04 | Astro WebGL B2B mountains | https://mont-fort.com/ | 3D-Website-Fusion | queued |
| 2026-07-04 | Shader manifesto + particles | https://www.8bit.ai/ | WebGL-UI | queued |
| 2026-07-04 | Watercolor map journey | https://davidwhyte.com/experience/ | WebGL-UI + Mapbox | queued |
| 2026-07-04 | Space brand minimal corporate | https://www.spacex.com/ | MSC-UI-Taste | queued |
| 2026-07-04 | Product marketing sections | https://starlink.com/ | Component-Registries | queued |
| 2026-07-04 | WWF scrollytelling + horizontal break | https://wwf.ca/prioritythreatmanagement/ | ParallaxStack + Scroll-Motion | queued |
| 2026-07-04 | Vev multi-layer parallax + scroll zoom | https://www.vev.design/blog/underrated-vev-features/ | Scroll-Motion parallax playbook | queued |
| 2026-07-04 | GSAP + model-viewer product hero | https://palmdream.com/ | model-viewer sticky | queued |
| 2026-07-04 | CSS scroll()/view() reveals | https://developer.chrome.com/docs/css-ui/scroll-driven-animations | Scroll-Motion §6 | queued |
| 2026-07-04 | Vev sponsored scrollytelling | https://www.seher.no/annonsorinnhold/... | editorial layout ref | queued |
| 2026-07-04 | AEM decade hash timeline | https://www.aramark.com/about-us/our-difference/history | hash nav | queued |
| 2026-07-04 | FUTURE THREE full stack (Lenis+GSAP+Three+Barba) | https://day1-run.webflow.io/ | 3D-Website-Fusion persistent canvas | queued |
| 2026-07-04 | Aviation cinematic parallax | https://jeskojets.com/ | ParallaxStack + Scroll-Motion | queued |
| 2026-07-04 | TW agency WebGL portfolio | https://www.nudot.com.tw/ | Fusion + SplitText | queued |
| 2026-07-04 | Astro agency + Matter.js | https://bitfalk.com/ | Matter.js WATCH | queued |
| 2026-07-04 | Next.js + Sanity + WebGL interior | https://www.verostudio.com/ | production pattern ref | skip |
| 2026-07-04 | Minimal Lenis+GSAP portfolio | https://irinamoi.com/ | Scroll-Motion only | queued |
| 2026-07-04 | B2B SVG diagrams + grain noise | https://www.oncorps.ai/ | Scroll-Motion §9 + Premium-UI | queued |
| 2026-07-04 | Finance cinematic scroll | https://www.penguin-capital.co.jp/en | Fusion backdrop | queued |
| 2026-07-04 | Medical luxury WebGL | https://grigoriak.doctor/ | WebGL-UI panels | queued |
| 2026-07-04 | Webflow+Shopify hybrid venue | https://dockyardsocial.com/ | shadcn commerce ref | skip |
| 2026-07-04 | Sustainable CPG clean LP | https://www.recapafteruse.co.uk/ | MSC-UI-Taste | skip |
| 2026-07-04 | Squarespace Three+Barba home builder | https://www.schmittcompany.com/ | View-Transitions ref | skip |
| 2026-07-04 | CrossFit parallax energy | https://www.bekawi.com/ | ParallaxStack | queued |
| 2026-07-04 | Enterprise game corp IA | https://www.riotgames.com/en | layout ref only | skip |
| 2026-07-04 | Nuxt architecture editorial | https://www.storeyarchitecture.co.uk/ | NovaMira typography | skip |
| 2026-07-04 | Wix photography portfolio | https://www.zionadventurephotog.com/ | mood/layout only | skip |
| 2026-07-04 | Pinned 6-chapter scroll hero + step counter | https://zerasoftwarestudio.com/webdeveloper?ref=hassen | Scroll-Motion pin timeline | queued |
| 2026-07-04 | iMessage/WhatsApp proof masonry cards | https://zerasoftwarestudio.com/webdeveloper?ref=hassen | Premium-UI social proof | queued |
| 2026-07-04 | Grain + corner frame + grid hero overlay | https://zerasoftwarestudio.com/webdeveloper?ref=hassen | Scroll-Motion §9 grain | queued |
| 2026-07-04 | In-hero browser mock + logo marquee | https://zerasoftwarestudio.com/webdeveloper?ref=hassen | Component-Registries | queued |
| 2026-07-04 | Course LP section flow (curriculum → FAQ → CTA) | https://zerasoftwarestudio.com/webdeveloper?ref=hassen | Premium-UI funnel | queued |
| 2026-07-04 | Pointer-tracked radial hero spotlight (CSS `--hero-mask-*`) | https://huly.io/ | NovaMira-Design glass/atmosphere | queued |
| 2026-07-04 | Frosted transparent hero feature tiles (`backdrop-blur` + hairline border) | https://huly.io/ | NovaMira-Design §5 glass | queued |
| 2026-07-04 | Gradient border glow CTA (pseudo blur — Studio Gold swap) | https://huly.io/ | Premium-UI primary CTA | queued |
| 2026-07-04 | Horizontal hero feature marquee strip | https://huly.io/ | Premium-UI SaaS hero | queued |

**Status values:** `queued` → `in-spec` → `in-demo` → `skip`

---

## Related docs & prompts

| Resource | Path |
|----------|------|
| Build ritual | `.cursor/prompts/Build-Showcase-Demo.md` |
| 3D / scroll build (subset) | `.cursor/prompts/Build-3D-Website.md` |
| Design bookmarks | `.cursor/docs/DESIGN-REFERENCES.md` |
| Motion map | `.cursor/docs/SCROLL-3D-REFERENCES.md` |
| Vault assets | `.cursor/docs/3D-WEB-WORKFLOWS.md` |
| Templates | `ParallaxStack.tsx` · `ScrollFrameHero.tsx` · `CustomCursor.tsx` |

---

## Canonical docs (scroll + WebGL)

| Doc | URL | Use when |
|-----|-----|----------|
| **Scroll-Motion skill** | `.cursor/skills/Scroll-Motion/SKILL.md` | Parallax playbook · GSAP patterns |
| **Chrome scroll-driven** | https://developer.chrome.com/docs/css-ui/scroll-driven-animations | CSS `scroll()` / `view()` · progress bars |
| **GSAP ScrollTrigger** | https://gsap.com/docs/v3/Plugins/ScrollTrigger/ | pin · scrub · snap · anticipatePin |
| **MDN WebGL** | https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API | Raw canvas debugging · extensions |

**Last updated:** 2026-07-04 (batch 5: Zera Studio 2D Lenis+GSAP course LP — pin hero, proof DMs, grain frame)
