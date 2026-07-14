# Doc Mo Guides Index — 3D Web Workflows Vault

**Vault folder:** `D:\Hermes\assets\3d-web-workflows\docmo-guides-pdf\`  
**Source:** [Doc Mo Agency](https://docmo.agency) · free PDF guides (2026)  
**Last read:** 2026-07-13 (`pypdf` extract — first-pass agent index)  
**Fleet mirror:** `.cursor/docs/DOCMO-GUIDES-INDEX.md` via `npm run sync:docs -- -Write`

**Fleet verdict (Jon 2026-07-13):** **B+ / A- reference** — keep indexed; supplement (not replace) devini-tea, RIFT, MAVRA, `ScrollFrameHero`. Best for food/luxury scroll-scrub, configurators, AI product ads, and production pitfalls. Agents read **this index first**, not full PDF OCR every time.

Sixteen brand-specific build breakdowns for **cinematic scroll sites**, **AI product ads**, and **interactive configurators**. Strong overlap with Hermes stack: **GSAP ScrollTrigger**, **canvas frame scrub**, **Kling/Seedance + ffmpeg**, **Claude Code** as builder — map to `ScrollFrameHero`, `Scroll-Video-Sequence`, `video:fal`, and `Build-3D-Website.md`.

---

## When to open which guide

| Jon / agent task | Start here |
|------------------|------------|
| **Food scroll-scrub + configurator** (ramen/taco/burger/pizza) | `UMAMI-Guide-EN.pdf` (canonical React) · `BRACE-Pizza-Guide-EN.pdf` (vanilla HTML) · `explosion-guide.pdf` (mobile-first PRIME) |
| **Product explode / reassemble on scroll** | `Smash-Guide-EN.pdf` · `BIRRIA-Guide-EN.pdf` |
| **Luxury property scroll tour** | `villa-guide.pdf` |
| **Watch / mechanical push-in scrub** | `CHRONOS-Guide-EN.pdf` |
| **Product slider (no scroll film)** | `Nike-Guide-EN.pdf` · `NOIR-BREW-Guide-EN.pdf` — "Coffee Drift" system |
| **Clinic character-select + booking** | `APEX-Guide-EN.pdf` · `ATLAS-Guide-EN.pdf` · `IVORY-Guide-EN.pdf` |
| **Short-form AI product commercial** | `CHANEL-No5-Guide-EN.pdf` · `CocaCola-AI-Guide.pdf` · `Sultan-Al-Oud-Guide-EN.pdf` |
| **Canvas 2D interactive (no WebGL)** | `Cosmos-Guide-EN.pdf` |

**Hermes adapters:** `templates/components/ScrollFrameHero.tsx` · `Scroll-Video-Sequence` skill · `ai-scroll-product-workflow/WORKFLOW.md` · `cinematic-scroll-skill` doctor.

---

## Catalog (16 PDFs)

| File | Pages | ~MB | Stack | Hero pattern | Frames / clips |
|------|-------|-----|-------|--------------|----------------|
| `UMAMI-Guide-EN.pdf` | 10 | 9.9 | Vite + React + Tailwind | Chef canvas scrub + HUD | 289 desktop / 145 mobile WebP |
| `BIRRIA-Guide-EN.pdf` | 10 | 1.6 | React (UMAMI clone) | Chef-duel → taco explosion scrub | 488 desktop |
| `Smash-Guide-EN.pdf` | 9 | 0.8 | React | Smash → explode → reassemble | 200 / 100 WebP, 8 Kling clips |
| `BRACE-Pizza-Guide-EN.pdf` | 10 | 15.5 | Single HTML + GSAP | Canvas scrub + camera HUD | 242 JPEG (Seedance) |
| `explosion-guide.pdf` | 11 | 66.7 | React (PRIME v3) | Flip-book scroll + sound | ~200, desktop + mobile same codebase |
| `villa-guide.pdf` | 9 | 46.3 | React | 6-space AI architecture tour | ~300 frames |
| `CHRONOS-Guide-EN.pdf` | 8 | 1.4 | React + Claude Code | Watch push-in + disassembly scrub | 200 / 100 WebP |
| `Nike-Guide-EN.pdf` | 10 | 17.9 | GSAP slider | 4-shoe Coffee Drift showcase | 16 AI assets |
| `NOIR-BREW-Guide-EN.pdf` | 9 | 27.7 | GSAP slider | 4-product Coffee Drift | AI stills + drift layers |
| `APEX-Guide-EN.pdf` | 8 | 9.5 | Single HTML | Anatomy video + character-select therapists | Video loop hero |
| `ATLAS-Guide-EN.pdf` | 9 | 9.8 | Single HTML | Hologram spine loop + character-select | ffmpeg forward/reverse alternation |
| `IVORY-Guide-EN.pdf` | 8 | 3.5 | Single HTML | Orbiting molar Kling hero + dentist roster | 8s orbit clip |
| `CHANEL-No5-Guide-EN.pdf` | 10 | 0.9 | AI ad pipeline | 5 keyframes → 4 morph clips | 12s spot |
| `CocaCola-AI-Guide.pdf` | 10 | 5.5 | AI ad pipeline | Ice → pour → bottle arc | 10 keyframes, 9 clips, 27s |
| `Sultan-Al-Oud-Guide-EN.pdf` | 10 | 1.0 | AI ad + CapCut | Ritual anointing story | 3 keyframes, 3 clips, 18s |
| `Cosmos-Guide-EN.pdf` | 7 | 0.7 | Canvas 2D + Claude Code | 9 constellations, 5 reveal styles | Zero WebGL |

---

## Common Doc Mo stack

| Layer | Tools (as documented) | Hermes equivalent |
|-------|----------------------|-------------------|
| **Builder** | Claude Code | Cursor agent + `Nova` / `Build-3D-Website.md` |
| **Motion** | GSAP 3.12+ ScrollTrigger | `Scroll-Motion` skill · Lenis bridge |
| **Stills** | Nano Banana Pro (Higgsfield) | `npm run image:gen` · fal · ComfyUI when local |
| **Video clips** | Kling 3.0 · Seedance 2.0 | `npm run video:fal` · Higgsfield when configured |
| **Frames** | ffmpeg → WebP/JPEG sequence | FFmpeg scripts in scroll workflows |
| **Ship** | Vercel · single HTML · React/Vite | Next.js Playground · `ScrollFrameHero` |

**Mobile rule (repeated across guides):** `IS_MOBILE = matchMedia('(max-width: 768px)')` — **halve frame count** on mobile to avoid RAM crashes (CHRONOS, UMAMI, Smash, explosion).

---

## Four-layer animation system (UMAMI / BRACE — use in Hermes builds)

Doc Mo splits motion into **non-competing layers** (separate elements, triggers, timing):

| Layer | Mechanism | Hermes note |
|-------|-----------|-------------|
| **1 — Canvas scrub** | ScrollTrigger progress → frame index → `drawImage()` only | `ScrollFrameHero` · no DOM writes on scroll tick |
| **2 — Fly clones** | Fixed-position image clone + GSAP arc → price punch on `onComplete` | Configurator / menu-to-cart pattern |
| **3 — Scroll reveals** | `from()` opacity/y stagger, **fire once**, kill after enter | Watch **pinned hero offset** (pitfall below) |
| **4 — HUD / gauges** | `setInterval` gated by `IntersectionObserver`; scrub-linked gauges share scroll proxy | `HudFrame` template · beat overlays |

---

## Canvas scrub vs `video.currentTime` (CHRONOS)

Doc Mo's clearest technical argument — **prefer pre-decoded WebP/JPEG on canvas**, not scrubbing HTML5 video:

- Video decoders are not built for random frame access → lag/stutter on mobile.
- Canvas + preloaded images = microseconds per frame.
- **Preload:** `Promise.all` on mount; canvas hidden until all frames resolve.
- **Extract:** `ffmpeg -i clip.mp4 -vf "fps=30,scale=1920:-1" -q:v 80 frames/f_%03d.webp`
- **Scroll math:** `floor(progress * (frameCount - 1))` — no GSAP timeline for scrub itself.

This matches Hermes `ScrollFrameHero` and RIFT whitepaper in `VAULT-PDF-INDEX.md`.

---

## Flip-book engine (explosion / villa)

Shared pattern for **PRIME** (burger) and **VILLA SCROLL** (real estate):

1. Generate AI stills or clip chains per section.
2. Extract to frame sequence; pin section while scroll maps to frame index.
3. **One codebase** for desktop + mobile (explosion guide emphasis).
4. Optional **sound design** synced to scroll sections (explosion).
5. Architecture photography / food prompts documented per chapter.

---

## AI cinematic ad workflow (Chanel / Coca-Cola / Sultan)

Repeatable **5-step** pipeline (social reel output):

1. **Keyframes** — Nano Banana Pro, 9:16, 2K, locked lighting/palette per product.
2. **Transitions** — Kling 3.0 pro, 3s, start+end frame per morph (chain end→start).
3. **Concat** — ffmpeg → single silent spot.
4. **Sound** — ElevenLabs SFX + bed, frame-accurate, limiter.
5. **Social layout** — HTML storyboard + prompt overlay, Instagram safe-zones, CapCut beat-sync (Sultan).

Hermes mapping: `video:fal` + FFmpeg + optional `openmontage` for assembly experiments — not production Telegram path.

---

## Product configurator pattern

Used in UMAMI, BRACE, BIRRIA, Smash:

- Size/cards with live price line items.
- Topping toggle → thumbnail **fly arc** to price display → scale punch + glow on landing.
- "ADD TO ORDER" → clone card image, fly to preview, smooth-scroll to configurator.
- **No cart library** — React state or vanilla JS + `getBoundingClientRect()` + GSAP.

---

## Character-select pattern (APEX / ATLAS / IVORY)

- Game-menu roster instead of static team grid.
- Hero: looping AI video (anatomy, hologram spine, orbiting tooth) with **screen blend** compositing.
- Profile panel slide-in on select; booking calendar + WhatsApp handoff.
- **Vanilla HTML** — no React build step.

---

## Coffee Drift slider (Nike / NOIR BREW)

- Horizontal product showcase: background color shift per slide.
- Floating detail parts around hero product; GSAP-driven, not scroll-scrub.
- All prompts for shoes/coffee products included in PDFs.

---

## Pitfalls — fleet gotchas (consolidated from guides)

| # | Issue | Source guides | Fix |
|---|--------|---------------|-----|
| 1 | **Pinned hero breaks downstream ScrollTrigger reveals** | UMAMI, BRACE | Recalculate triggers after pin/unpin or use shared scroll container offset |
| 2 | **`TOTAL` frame constant ≠ extracted file count** | BRACE, Smash | Re-sync JS constant after ffmpeg fps/trim changes |
| 3 | **Kling orbits the subject instead of camera** | UMAMI | Lock camera in prompt; use start/end frame constraint |
| 4 | **Mobile RAM crash on full desktop frame set** | CHRONOS, UMAMI, Smash | Half frames at `≤768px`; separate `*-mobile/` folders |
| 5 | **First-frame flash before preload completes** | CHRONOS, BRACE | Gate canvas visibility on `Promise.all` resolve |
| 6 | **Using `video.currentTime` for scrub** | CHRONOS | Use canvas + WebP sequence instead |
| 7 | **Keyframes wrong → entire chain wrong** | Chanel, Coke | "Keyframes first, always" — lock palette/void before clips |

---

## Overlap with existing vault docs

| Doc Mo topic | Existing Hermes doc |
|--------------|-------------------|
| Canvas scroll scrub | `devini-tea` · `ai-scroll-product-workflow` · `VAULT-PDF-INDEX` RIFT whitepaper |
| Agency landing phases | `premium-site-workflow` PDF + `CLAUDE.md` |
| Craft / doctor gate | `cinematic-scroll-skill` |
| Frame hero template | `templates/components/ScrollFrameHero.tsx` |
| GSAP + Lenis | `Scroll-Motion` skill |

**Doc Mo adds:** production-ready **prompt libraries**, **four-layer animation split**, **configurator fly UX**, **character-select clinic pattern**, **AI ad assembly pipeline**, and **mobile frame-budget** rules with real frame counts.

---

## Agent commands

```powershell
# List PDFs on disk
Get-ChildItem D:\Hermes\assets\3d-web-workflows\docmo-guides-pdf\*.pdf

# Re-extract full vault inventory (includes docmo PDFs)
npm run vault:pdf:inventory

# Sync this index to all profiles
npm run sync:docs -- -Write
```

**Build ritual:** `.cursor/prompts/Build-3D-Website.md` → pick guide row above → `npm run scroll:motion:status` → `Motion-Accessibility` gate.

---

## Related

- [3D-WEB-WORKFLOWS.md](./3D-WEB-WORKFLOWS.md) — vault hub
- [VAULT-PDF-INDEX.md](./VAULT-PDF-INDEX.md) — Luke + RIFT + web-xtraz PDFs
- [VAULT-BUNDLE-SUMMARIES.md](./VAULT-BUNDLE-SUMMARIES.md) — MAVRA, Iron Man, devini-tea
- [SCROLL-3D-REFERENCES.md](./SCROLL-3D-REFERENCES.md) — skill map + gap checklist
