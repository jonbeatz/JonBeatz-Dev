---
name: view-transitions
description: Add smooth native page-to-page and state morph animations with the View Transitions API (0kb JS) in Next.js App Router and plain SPAs. Use for shared-element transitions (card to detail page), route morphs, and list reorders. Covers the native API, Next.js support, React useTransition pairing, and reduced-motion.
---

# View-Transitions — Native Morph Transitions (0kb JS)

## When to use this skill
- Card → detail page "shared element" morph
- Smooth route transitions without a heavy animation lib
- Animated list add/remove/reorder
- You want the effect for free (compositor-thread, native browser)

## Why native
The **View Transitions API** ships in all Chromium browsers and Safari 18 — **zero JS bundle**, GPU-accelerated. It snapshots the old and new DOM and cross-fades/morphs between them. For same-document (SPA/route) transitions it's the cleanest modern option; fall back gracefully where unsupported.

## Same-document (the core primitive)
```ts
function navigate(update: () => void) {
  if (!document.startViewTransition) return update();      // graceful fallback
  document.startViewTransition(() => update());
}
```
```css
/* default cross-fade is automatic; customize the pseudo-elements: */
::view-transition-old(root),
::view-transition-new(root) { animation-duration: 0.35s; }
```

## Shared-element morph
Give the matching elements the **same** `view-transition-name` before and after:
```css
.card-hero      { view-transition-name: hero-media; }
.detail-hero    { view-transition-name: hero-media; }  /* same name = morph between them */
```
Names must be unique per snapshot — set them dynamically for lists:
```tsx
<img style={{ viewTransitionName: `poster-${id}` }} />
```

## Next.js App Router
```jsx
// next.config.mjs
export default { experimental: { viewTransition: true } };
```
```tsx
// React 19 component (wrap the morphing subtree)
import { unstable_ViewTransition as ViewTransition } from "react";
<ViewTransition><Poster id={id} /></ViewTransition>
```
For route changes, pair with `useTransition` so React defers the swap into the transition:
```tsx
const [isPending, startTransition] = useTransition();
const go = (href: string) =>
  startTransition(() => document.startViewTransition?.(() => router.push(href)));
```
> If not on Next 16 / React 19 view-transition support yet, the plain `document.startViewTransition` wrapper above works today in any client component.

## Cross-document (MPA) — CSS only
```css
@view-transition { navigation: auto; }   /* opt in same-origin MPA nav */
```

## Anti-Slop
- **Always feature-detect** `document.startViewTransition` and fall back to an instant update.
- **Unique `view-transition-name`** per snapshot — duplicates throw and kill the transition.
- **Keep it short** (250–400ms) — long morphs feel sluggish on navigation.
- **Reduced motion:** gate custom animations behind `@media (prefers-reduced-motion: no-preference)`; let it fall back to instant. See `Motion-Accessibility`.
- **Don't morph huge subtrees** — snapshotting a whole heavy page can jank; scope to the hero/shared element.
- Not a replacement for `Scroll-Motion` — VT is for *state/route* changes, not scroll-linked timelines.

## Related skills
- **Scroll-Motion** — scroll-linked animation (different job)
- **Motion-Accessibility** — reduced-motion gating
- **Component-Registries** — components you'll be transitioning between
