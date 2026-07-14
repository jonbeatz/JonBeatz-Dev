---
name: scroll-video-sequence
description: Build Apple AirPods-style "video scrubs as you scroll" hero sections using the reliable canvas image-sequence technique (NOT a scrubbed <video> tag). Covers FFmpeg frame extraction, sticky scroll runway, progressive loader UX, hash chapter anchors, scroll-to-frame mapping, rAF render decoupling, preloading, and content overlays. Use when the user wants cinematic scroll-driven product reveals or "video frame integration" scroll sites.
---

# Scroll-Video-Sequence — Cinematic Scroll Frame Scrubbing

## When to use this skill
- "Make the video play as I scroll" (Apple AirPods Pro / MacBook style)
- Cinematic product reveal, 360° spin, construction/deconstruction on scroll
- Multi-chapter scroll stories with hash anchors (`#moon`, `#mars`)
- Any "video frame integration scroll site" request

**Live refs (Jon):** [spacexmarsmission.netlify.app](https://spacexmarsmission.netlify.app/#moon) · [theoframerate.netlify.app](https://theoframerate.netlify.app/) — see [SCROLL-3D-REFERENCES.md](../../docs/SCROLL-3D-REFERENCES.md)

## The golden rule: image sequence, NOT `<video>`
Scrubbing a real `<video>` via `currentTime` is **unreliable** — backward scrubbing stutters, seeking is codec-dependent, and behaviour differs per browser/device. The technique every polished site uses:

> **Video → extract frames → draw the right frame to a `<canvas>` based on scroll progress.**

## Step 1 — Extract frames (design time, FFmpeg)

**Prefer WebP** — smaller than JPG at similar quality (validated on theoframerate demo).

```bash
# Recommended: WebP sequence (80–120 frames is the sweet spot for ~10 MB)
ffmpeg -i source.mp4 -vf "fps=10,scale=1280:-1" -c:v libwebp -quality 76 frames/frame_%04d.webp

# Poster / LCP fallback (first frame, heavily compressed)
ffmpeg -i source.mp4 -vf "scale=1280:-1" -frames:v 1 -c:v libwebp -quality 60 public/sequence/poster.webp
```

**Practical budget:** 8–12 fps · 70–80% quality · 1280px wide → usually **< 15 MB** for a ~30s clip. Keep total frames under ~500 (120 is a common demo size). Store under `public/sequence/`.

| Count | Use case |
|-------|----------|
| **80–120** | Hero scrub only (SpaceX / theoframerate pattern) |
| **120–180** | Longer runway, more cinematic |
| **300+** | Only if art-directed; watch mobile payload |

## Step 2 — Sticky scroll runway (the structural trick)

```css
.sequence-scroller { height: 400vh; }          /* runway: how far the user scrolls */
.sequence-sticky   { position: sticky; top: 0; height: 100vh; overflow: hidden; }
.sequence-sticky canvas { width: 100%; height: 100%; object-fit: cover; }

/* Loader gate — block interaction until frames ready */
.sequence-scroller.is-loading { overflow: hidden; height: 100vh; }
.sequence-scroller.is-loading .sequence-sticky { position: relative; }
```

**Template component:** `templates/components/ScrollFrameHero.tsx` (copy into project `components/`).

## Step 3 — Progressive preload (SpaceX-style loader gate)

Don't block the whole page on `Promise.all(180 frames)`. Polished sites:

1. Load **first + last** frame immediately (animation can start/end without gaps)
2. Stream the rest in parallel batches
3. Show a **progress bar** (`loaded / total`)
4. **Lock scroll** until 100% (or until first N frames for partial unlock — pick one policy)

```ts
const TOTAL = 120;
const src = (i: number) => `/sequence/frame_${String(i + 1).padStart(4, "0")}.webp`;

async function preloadProgressive(
  onProgress: (loaded: number, total: number) => void
): Promise<(ImageBitmap | null)[]> {
  const frames: (ImageBitmap | null)[] = new Array(TOTAL).fill(null);
  const loadOne = async (i: number) => {
    const res = await fetch(src(i));
    frames[i] = await createImageBitmap(await res.blob());
    onProgress(frames.filter(Boolean).length, TOTAL);
  };

  // Bookends first — scrub never shows blank at start/end
  await Promise.all([loadOne(0), loadOne(TOTAL - 1)]);

  const order = Array.from({ length: TOTAL - 2 }, (_, k) => k + 1);
  const BATCH = 8;
  for (let i = 0; i < order.length; i += BATCH) {
    await Promise.all(order.slice(i, i + BATCH).map(loadOne));
  }
  return frames as ImageBitmap[];
}
```

**UX copy pattern** (from SpaceX demo): `Loading all frames {n} / {total} — full scroll unlocks at 100%`

**Fallback `<img>`:** Keep `poster.webp` behind the canvas so LCP isn't a blank box before JS hydrates.

## Step 4 — Decouple scroll calc from rendering (critical)

Never draw inside the scroll handler. Scroll fires hundreds of times/sec.

```ts
let targetFrame = 0;
let drawnFrame = -1;

function onScroll() {
  const el = document.querySelector<HTMLElement>(".sequence-scroller")!;
  const rect = el.getBoundingClientRect();
  const scrollable = el.offsetHeight - window.innerHeight;
  const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1); // 0..1
  targetFrame = Math.round(progress * (TOTAL - 1));
}
window.addEventListener("scroll", onScroll, { passive: true }); // passive is essential

function tick() {
  if (targetFrame !== drawnFrame) {
    drawnFrame = targetFrame;
    draw(frames[targetFrame]);
  }
  requestAnimationFrame(tick);
}
```

**With Lenis:** `getBoundingClientRect()` on the scroller still works when `ReactLenis` wraps the layout. For GSAP-driven index instead, see `Scroll-Motion` (`scrub` + `snap: "index"`).

**GSAP-free is valid:** The SpaceX demo uses native scroll + rAF only — no Lenis/GSAP required for the hero scrub. Add `SmoothScrollProvider` for **sections below** the canvas runway.

## Step 5 — Draw with devicePixelRatio + cover fit

```ts
function draw(bitmap: ImageBitmap) {
  const canvas = canvasRef.current!;
  const ctx = canvas.getContext("2d", { alpha: false })!;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = canvas.clientWidth * dpr, h = canvas.clientHeight * dpr;
  if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
  const scale = Math.max(w / bitmap.width, h / bitmap.height);
  const dw = bitmap.width * scale, dh = bitmap.height * scale;
  ctx.drawImage(bitmap, (w - dw) / 2, (h - dh) / 2, dw, dh);
}
```

## Step 6 — Hash chapter anchors (`#moon`, `#mars`)

Map URL hash → scroll position within the runway. Good for multi-planet / multi-product chapters.

```ts
type Chapter = { id: string; start: number; end: number }; // progress 0..1

const CHAPTERS: Chapter[] = [
  { id: "moon", start: 0, end: 0.33 },
  { id: "mars", start: 0.33, end: 0.66 },
  { id: "earth", start: 0.66, end: 1 },
];

function scrollToChapter(id: string) {
  const ch = CHAPTERS.find((c) => c.id === id);
  if (!ch) return;
  const el = document.querySelector<HTMLElement>(".sequence-scroller")!;
  const scrollable = el.offsetHeight - window.innerHeight;
  const target = el.offsetTop + scrollable * ch.start;
  window.scrollTo({ top: target, behavior: "smooth" });
}

// On load + hashchange
function syncHashFromScroll(progress: number) {
  const active = CHAPTERS.find((c) => progress >= c.start && progress < c.end);
  if (active && location.hash !== `#${active.id}`) {
    history.replaceState(null, "", `#${active.id}`);
  }
}

window.addEventListener("hashchange", () => {
  const id = location.hash.slice(1);
  if (id) scrollToChapter(id);
});
```

On first paint: if `location.hash` is set, scroll to that chapter **after** loader unlocks.

## Step 7 — Overlay content by scroll range (not timers)

```ts
function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1);
  return t * t * (3 - 2 * t);
}

// Fade a card in during 30%-45% of the runway:
const cardOpacity = smoothstep(0.30, 0.45, progress) * (1 - smoothstep(0.55, 0.70, progress));
```

Polish: radial-gradient mask on canvas edges, glassmorphic overlay cards (`backdrop-filter: blur`), thin scroll progress rail, stat counters keyed to chapter ranges.

## Rapid prototype → Hermes production

| Phase | Tool | Output |
|-------|------|--------|
| **1. Prototype** | [Google AI Studio](https://aistudio.google.com/) | Vite bundle + canvas scrub (see theoframerate.netlify.app) |
| **2. Extract assets** | FFmpeg | WebP sequence + poster under `public/sequence/` |
| **3. Port** | Next.js App Router | Copy logic into `ScrollFrameHero.tsx`; wrap layout in `SmoothScrollProvider` |
| **4. Polish** | GSAP ScrollTrigger | Overlays, pin, text reveals on sections **after** hero |
| **5. Gate** | `Motion-Accessibility` | Reduced motion → static poster frame |

Don't ship the AI Studio bundle as-is — migrate to our stack for CWV, reduced motion, and fleet conventions.

## Alternatives / when to escalate

| Need | Use |
|------|-----|
| True 3D reveal (rotate/explode geometry) | **GLB + R3F** → `3D-Scroll` + `3D-Modeling` |
| GSAP owns frame index | `Scroll-Motion` — ScrollTrigger `scrub` + `snap: "index"` |
| Browser MP4 → frames (no FFmpeg) | **[scroll-cinema](https://github.com/vvlars-cmd/scroll-cinema)** — WATCH; evaluate vs FFmpeg pipeline |
| Full agency scroll site pipeline | `3d-scroll-website` skill + vault `devini-tea` / `IronMan` |
| **Product explode (2-image Kling)** | Vault `ai-scroll-product-workflow/WORKFLOW.md` — [Notion ref](https://slow-acai-c08.notion.site/AI-Powered-Scroll-Website-Full-Workflow-36cc6378b62d81dba4f6e4c4dfd8c277) |

## Anti-Slop

- **Never scrub a `<video>` tag** for frame-accurate scroll. Image sequence only.
- **`{ passive: true }`** on scroll listeners; **separate** scroll-calc from rAF draw.
- **`createImageBitmap`** (not `<img>` in the draw loop) so decode stays off the hot path.
- **Cap DPR at 2** — retina at DPR 3 tanks performance for negligible gain.
- **Real runway** (300–500vh) — too short = frames blur past; too long = user gets bored.
- **Loader gate** — never let users scrub into unloaded frames (blank canvas flashes).
- **Reduced motion:** show `poster.webp` static hero; skip scrub. See `Motion-Accessibility`.
- **Weight budget:** if frames exceed ~20 MB, cut fps, width, or trim clip.

## Related skills & assets

| Resource | Path |
|----------|------|
| **ScrollFrameHero template** | `templates/components/ScrollFrameHero.tsx` |
| **Cinematic beat overlays** | `templates/components/CinematicBeatOverlay.tsx` + `templates/lib/scrollBeats.ts` |
| **HUD chrome** | `templates/components/HudFrame.tsx` |
| **Iron Man port guide** | `3d-scroll-website/references/08-iron-man-patterns.md` |
| **Scroll-Motion** | Lenis + GSAP for sections after hero |
| **3d-scroll-website** | Full pipeline + vault adapters |
| **Vault workflows** | `D:\Hermes\assets\3d-web-workflows\devini-tea\`, `ai-scroll-product-workflow\`, `SCROLL-VIDEO-RESEARCH.md`, `IronMan\` |
| **Motion-Accessibility** | Reduced-motion + CWV gate |
| **Image-Workflow** | Source clip generation |
