# 3D Website Taste Catalog

Design accelerators for JonBeatz 3D websites. Each "taste" defines a complete
look-and-feel: accent palette, Three.js colors, CSS tokens, and mood.

---

## 1. Studio Gold (JonBeatz Default)

The flagship. Warm, premium, authoritative.

| Token | Value |
|-------|-------|
| Accent | `#F5B841` |
| Bright | `#ffcb6b` |
| Dim | `#c8922e` |
| Background | `#040405` |
| Surface | `#0b0b0e` |
| Card | `#0d0d11` |
| Text | `#fbfbfb` |
| Scroll shift | → `#ff0033` (Vader Red at 50%+) |
| Mood | Command center, studio, premium dark |

```css
:root {
  --accent-rgb: 245, 184, 65;
  --accent-gold: #f5b841;
  --accent-gold-bright: #ffcb6b;
  --accent-gold-dim: #c8922e;
  --accent-gold-glow: rgba(245, 184, 65, 0.15);
}
```

```tsx
<ThreeBackground accent="#F5B841" />
```

---

## 2. VaderLabz Red (JonBeatz.dev)

Aggressive, intense, cyberpunk. Think Huly + command-line aesthetic.

| Token | Value |
|-------|-------|
| Accent | `#ff2a36` |
| Bright | `#ff5a64` |
| Dim | `#c01e28` |
| Background | `#040405` |
| Surface | `#0b0b0e` |
| Card | `#0d0d11` |
| Text | `#fbfbfb` |
| Scroll shift | → none (stays red) |
| Mood | Terminal, alert, power user |

```css
[data-variant="dev"] {
  --accent-rgb: 255, 42, 54;
  --accent-gold: #ff2a36;
  --accent-gold-bright: #ff5a64;
  --accent-gold-dim: #c01e28;
}
```

```tsx
<ThreeBackground accent="#ff2a36" secondary="#ff2a36" />
```

---

## 3. Electric Blue (Tech/Startup)

Cool, modern, SaaS. Good for developer tools or analytics dashboards.

| Token | Value |
|-------|-------|
| Accent | `#3b82f6` |
| Bright | `#60a5fa` |
| Dim | `#2563eb` |
| Background | `#04060a` |
| Surface | `#0a0d14` |
| Card | `#0e111a` |
| Text | `#f1f5f9` |
| Scroll shift | → `#06b6d4` (cyan) |
| Mood | Technical, sharp, focused |

```css
:root {
  --accent-rgb: 59, 130, 246;
  --accent-gold: #3b82f6;
  --accent-gold-bright: #60a5fa;
  --accent-gold-dim: #2563eb;
}
```

```tsx
<ThreeBackground accent="#3b82f6" secondary="#06b6d4" />
```

---

## 4. Amethyst Purple (Creative/Art)

Expressive, artistic, gallery feel.

| Token | Value |
|-------|-------|
| Accent | `#a855f7` |
| Bright | `#c084fc` |
| Dim | `#7c3aed` |
| Background | `#050308` |
| Surface | `#0b0612` |
| Card | `#10091a` |
| Text | `#faf5ff` |
| Scroll shift | → `#ec4899` (pink) |
| Mood | Creative, experimental, gallery |

```css
:root {
  --accent-rgb: 168, 85, 247;
  --accent-gold: #a855f7;
  --accent-gold-bright: #c084fc;
  --accent-gold-dim: #7c3aed;
}
```

```tsx
<ThreeBackground accent="#a855f7" secondary="#ec4899" />
```

---

## 5. Emerald Green (Environmental/Finance)

Organic, calm, trustworthy. Good for sustainability or fintech.

| Token | Value |
|-------|-------|
| Accent | `#10b981` |
| Bright | `#34d399` |
| Dim | `#059669` |
| Background | `#040a07` |
| Surface | `#08120a` |
| Card | `#0c1a10` |
| Text | `#ecfdf5` |
| Scroll shift | → `#f59e0b` (amber) |
| Mood | Natural, calm, premium |


```css
:root {
  --accent-rgb: 16, 185, 129;
  --accent-gold: #10b981;
  --accent-gold-bright: #34d399;
  --accent-gold-dim: #059669;
}
```

```tsx
<ThreeBackground accent="#10b981" secondary="#f59e0b" />
```

---

## 6. Cyber Amethyst (Dark Cyberpunk)

High contrast, neon-drenched, borderless. Think synthwave meets hacker terminal.

| Token | Value |
|-------|-------|
| Accent | `#d946ef` |
| Bright | `#e879f9` |
| Dim | `#a21caf` |
| Background | `#030105` |
| Surface | `#08020a` |
| Card | `#0d0512` |
| Text | `#f5f0ff` |
| Scroll shift | → `#22d3ee` (cyan) |
| Mood | Neon, cyberpunk, night market |

```css
:root {
  --accent-rgb: 217, 70, 239;
  --accent-gold: #d946ef;
  --accent-gold-bright: #e879f9;
  --accent-gold-dim: #a21caf;
}
```

```tsx
<ThreeBackground accent="#d946ef" secondary="#22d3ee" />
```

---

## How to Apply a Taste

1. Pick a taste from this catalog
2. Copy its `:root` CSS tokens into `app/globals.css`
3. Pass the accent hex to `ThreeBackground`
4. Apply glassmorphism cards using `background: rgba(...)` with the surface color

```tsx
// pages/page.tsx
import { ThreeBackground } from '@/components/ThreeBackground'

export default function Home() {
  return (
    <>
      <ThreeBackground accent="#3b82f6" secondary="#06b6d4" />
      <main className="relative z-10">
        <section className="backdrop-blur-xl bg-[rgba(10,13,20,0.45)] border border-[rgba(59,130,246,0.1)]">
          Your content
        </section>
      </main>
    </>
  )
}
```

## Notes

- The ThreeBackground component performance is calibrated for 1600 particles,
  4-layer wireframe core, and 60fps on modern GPUs
- For performance-sensitive pages, reduce particles with a `calm` prop
- Scroll shift at 50% is the default — adjust `secondary` color to change the
  destination hue, or set it to the same as `accent` to disable shifting
