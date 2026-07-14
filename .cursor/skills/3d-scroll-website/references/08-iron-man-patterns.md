# Iron Man HUD patterns — Hermes port guide

**Reference repo:** `D:\Hermes\assets\3d-web-workflows\IronMan\iron-man-main\`  
**Upstream:** [devinilabs/iron-man](https://github.com/devinilabs/iron-man)

Read `00-hermes-adapter.md` first. This doc covers **patterns unique to Iron Man** not fully spelled out in `Scroll-Video-Sequence`.

---

## Dual frame sequences

| Section | Frames path | Count | Source file |
|---------|-------------|-------|-------------|
| Hero | `/frames/frame_NNNN.jpg` | 169 | `src/lib/hero.ts`, `Hero.tsx` |
| Cinematic reveal | `/frames2/frame_NNNN.jpg` | 169 | `src/lib/cinematic.ts`, `CinematicReveal.tsx` |

**Hermes port:** Use two `ScrollFrameHero` sections with different `basePath` props, or one hero + one `CinematicBeatOverlay` on a second scroller.

```tsx
<ScrollFrameHero frameCount={169} basePath="/frames" ext="jpg" pad={4}>
  {/* HUD overlays */}
</ScrollFrameHero>
<ScrollFrameHero frameCount={169} basePath="/frames2" ext="jpg" pad={4} runwayVh={500}>
  <CinematicBeatOverlay progress={progress} beats={EXAMPLE_BEATS} />
</ScrollFrameHero>
```

---

## Scroll-linked beats (`BEATS`)

Defined in `src/lib/cinematic.ts` — each beat has `show` / `hide` on normalized progress 0–1.

**Shared templates:**
- `templates/lib/scrollBeats.ts` — types + `visibleBeatIds()`
- `templates/components/CinematicBeatOverlay.tsx` — quote cards
- `templates/lib/useScrollFrameProgress.ts` — read progress from `ScrollFrameHero`

---

## HUD chrome

| Component | Role |
|-----------|------|
| `HudFrame` | SVG corner brackets (tl/tr/bl/br) |
| `EyebrowBadge` | Mono uppercase section labels |
| Progress rail | `scaleX(progress)` bottom bar + SEQ readout |

**Template:** `templates/components/HudFrame.tsx`

---

## Stack differences (reference vs Hermes)

| Reference (iron-man) | Hermes ship |
|----------------------|-------------|
| `framer-motion` 12 | `motion/react` |
| Inline scroll listeners | `ScrollFrameHero` + optional GSAP for sections |
| `HTMLImageElement[]` preload | `createImageBitmap` in ScrollFrameHero (preferred) |

When copying motion from reference, translate to `motion/react` and shared templates — do not add framer-motion unless porting verbatim for study.

---

## Frame assets on disk

```
IronMan/iron-man-main/public/frames/     # 169 JPG
IronMan/iron-man-main/public/frames2/    # 169 JPG
IronMan/video-assets/                    # Kling source MP4s (2 files)
```

For local dev without FFmpeg: point `basePath` at vault frames via symlink or copy subset to `public/`.

---

## Related

- `Scroll-Video-Sequence` skill — core canvas scrub
- `3d-scroll-website` — neumorphic section architecture
- `docs/VAULT-BUNDLE-SUMMARIES.md` § IronMan
