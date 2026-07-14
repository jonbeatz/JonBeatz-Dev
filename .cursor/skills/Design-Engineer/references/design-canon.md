# Design Canon — the knowledge base

This is the durable reference a world-class design engineer operates from. The agent
(`design-engineer.md`) reads this at the start of any non-trivial job. Keep the agent
*operational* (process, gates, loop) and keep the slow-changing *knowledge* here, so when a
standard shifts you edit one file, not the agent's brain.

Last fact-checked: 2026. The items marked **[VERIFY]** are the ones that actually move —
re-check them when revisiting.

---

## 1. The mental model: design as perception, not decoration

Every visual decision is a bet about how a human brain will parse the screen. The taste comes
last; the perception comes first. Internalize these so critique stops being "I feel like the
hero is off" and becomes "the hero violates proximity and has no clear Von Restorff anchor."

### Laws of UX (Yablonski) — the load-bearing ones
- **Jakob's Law** — users spend most of their time on *other* sites; they expect yours to work
  the same way. Innovate on substance, conform on convention. Don't reinvent a date picker.
- **Fitts's Law** — time-to-target is a function of size and distance. Primary actions are
  large and close; destructive actions are not adjacent to confirmations. Drives touch-target
  sizing and CTA prominence.
- **Hick's Law** — decision time grows with the number/complexity of choices. Reduce options,
  stage them progressively, default the common path. Three pricing tiers convert better than five.
- **Miller's Law** — working memory is limited; the real lesson is *chunking*, not "7 items."
  Group related fields, segment long numbers, break flows into steps.
- **Tesler's Law (conservation of complexity)** — complexity can't be deleted, only moved.
  Decide whether the system or the user absorbs it. Almost always: the system.
- **Aesthetic–Usability Effect** — beautiful interfaces are *perceived* as more usable and buy
  forgiveness for minor friction. This is the literal license for the "pop" work — but it
  masks usability problems in testing, so don't let it hide real defects.
- **Von Restorff (isolation) Effect** — the one thing that differs is the thing remembered.
  Exactly one element should win each viewport. If everything pops, nothing does.
- **Doherty Threshold** — keep system response under **400ms** or the user disengages. Use
  optimistic UI, skeletons, and instant feedback to *feel* fast even when work is async.
- **Serial-Position / Peak-End** — people remember firsts, lasts, peaks, and endings. Put the
  strongest content at the edges; nail the final moment of a flow (success states, empty states).
- **Goal-Gradient / Zeigarnik** — motivation rises near completion; unfinished tasks nag.
  Progress indicators and "2 steps left" framing increase completion.

### Gestalt principles — how the eye groups
Proximity, Similarity, Common Region, Uniform Connectedness, Prägnanz (simplest reading wins),
Figure/Ground, Closure, Continuity. Most "cluttered / confusing" critiques resolve to a Gestalt
violation: things that belong together aren't near/alike/enclosed together, or things that
don't belong together look like they do.

### Norman's vocabulary (Design of Everyday Things)
Affordances (what's possible), Signifiers (what's communicated), Mapping (control↔effect
correspondence), Feedback (every action gets a visible reaction), Constraints (prevent error),
Conceptual model (the user's story of how it works). When something "feels confusing," name
which of these is missing.

### Nielsen's 10 usability heuristics — the critique checklist
1. Visibility of system status · 2. Match between system and real world · 3. User control &
freedom (undo/escape) · 4. Consistency & standards · 5. Error prevention · 6. Recognition
rather than recall · 7. Flexibility & efficiency (shortcuts) · 8. Aesthetic & minimalist
design · 9. Help users recognize/diagnose/recover from errors · 10. Help & documentation.
Run a heuristic evaluation pass on any interactive flow before declaring done.

---

## 2. Typography (Bringhurst, applied to screens)

- **Scale, don't free-style.** Pick a modular scale (e.g. 1.2 minor third for dense UI, 1.25–1.333
  for editorial, up to 1.5/golden for posters) and only use steps on it. The jump between display
  and body should be *dramatic* (3×+), not timid.
- **Weight contrast carries hierarchy** as much as size. Use extremes (e.g. 800 vs 400, or 300 vs
  700), not adjacent weights.
- **Measure** (line length) ~45–75 characters for body; tighten for narrow columns. **Leading**
  ~1.4–1.65 for body, tighter (1.0–1.2) for large display.
- **Tracking**: tighten large headings (−0.01 to −0.03em); never letter-space lowercase body.
  Slight positive tracking only on small caps / all-caps labels.
- **Optical sizing & real type.** Prefer variable fonts with `opsz` where available. Pair a
  characterful display face with a clean, high-legibility body face. Load with preconnect +
  `font-display: swap` (also a CLS/LCP win — see §5).
- **Pairing > collecting.** Two families, maybe a mono, is plenty. The pairing should have
  *contrast* (e.g. high-contrast serif display + neutral grotesque body), not two near-twins.

---

## 3. Color (modern, perceptual)

- **Build palettes in OKLCH, not HSL or hand-picked hex.** OKLCH is perceptually uniform, so a
  lightness/chroma ramp produces *even* steps across hues — HSL ramps blow out yellows and crush
  blues, forcing manual tuning. OKLCH is shipped in all evergreen browsers (CSS Color Module
  Level 4). Provide an sRGB hex fallback line before the `oklch()` line for the last few percent
  of clients. **[VERIFY]** browser support figure when revisiting.
- **One dominant color, one sharp accent.** Timid, evenly-distributed palettes read as generic.
  Derive tints/shades by stepping L and C in OKLCH from one or two seed hues; use `color-mix()`
  for states (hover/active) so they stay in-system.
- **Wide gamut** (`display-p3`) is available for vivid accents on modern displays — always with
  an sRGB fallback.
- **Banned tell:** purple→blue gradient on a white background. It is the single most recognizable
  "AI slop" color signature.
- **Depth via layered surfaces**, not flat fills: a base, slightly-lifted panels, low-opacity
  rings/borders, soft large shadows, a faint grain/noise to kill banding, and (for dark UI) a
  radial accent glow behind the focal point. But vary light vs dark across projects — see §8.

---

## 4. Accessibility — conform to 2.x, design with APCA

**The operative standard is WCAG 2.2 Level AA.** This is the legal/regulatory benchmark today.
WCAG 3.0 is a multi-year working draft not expected to be final until ~2028–2030, and its
contrast algorithm (APCA) was *pulled from the working draft in 2023* and is officially
"yet to be determined." So: **[VERIFY]** status, but as of 2026 do NOT treat APCA as the
compliance gate.

- **Contrast (WCAG 2.2 AA):** 4.5:1 for normal text, 3:1 for large text (≥24px, or ≥18.66px bold),
  3:1 for non-text/UI component boundaries and graphical objects.
- **Use APCA as a *design-time* perceptual check**, not for compliance. It models how the eye
  actually reads (factoring weight, size, polarity) and catches combos that pass the 2.x ratio
  but still feel fatiguing (e.g. orange on white). Rule of thumb: pick colors that pass *both*.
- **Target Size:** WCAG 2.2 SC 2.5.8 (AA) requires ≥24×24 CSS px. Design best practice is ≥44px
  (Fitts's Law), especially on touch.
- **Non-negotiables:** visible `:focus-visible` rings, full keyboard operability, semantic HTML
  / correct ARIA only where semantics fall short, alt text, `prefers-reduced-motion` fallbacks,
  no color as the sole carrier of meaning, logical heading order, labels tied to inputs.
- **Lean on headless primitives** (Radix, React Aria, Base UI, shadcn/ui) — they give correct
  focus management, roles, and keyboard behavior for free. Re-implementing a11y by hand is a
  bug source.

---

## 5. Performance is design

Core Web Vitals (Google), measured at the **75th percentile** of real users:
- **LCP < 2.5s** (loading). Wins: preload the hero image/font, inline critical CSS, SSR/streaming,
  right-sized responsive images, no render-blocking JS.
- **INP < 200ms** (responsiveness). Replaced FID in March 2024 and is the *most-failed* vital in
  2026 — it measures every interaction, not just the first. Wins: break long JS tasks, yield to
  the main thread, defer non-critical work, keep handlers cheap. **[VERIFY]** threshold.
- **CLS < 0.1** (visual stability) — a *design* gate, not just engineering: explicit width/height
  (or `aspect-ratio`) on every image/video/iframe/ad, `font-display: swap`, and reserved space
  for anything that loads in.

Perceived performance ≥ measured: skeletons over spinners where the wait is real, optimistic
updates, and instant micro-feedback (Doherty, §1). Animate only `transform` and `opacity`
(compositor-friendly); never animate layout properties. Lazy-load below-the-fold media.

---

## 6. Design-system architecture (Atomic Design + tokens)

Think in Brad Frost's stages so output is reusable, not one-off:
**Tokens → Atoms → Molecules → Organisms → Templates → Pages.**

**Three-tier token model** (Frost's "subatomic"):
1. **Tier 1 — primitives / global:** raw values. `--color-blue-500`, `--space-4`, `--font-size-3`.
   Never referenced directly by components.
2. **Tier 2 — semantic / alias:** meaning, not value. `--color-action-primary`, `--color-bg-surface`,
   `--color-text-muted`, `--radius-card`. Components consume these. Theming = re-point tier 2.
3. **Tier 3 — component-specific (optional):** `--button-bg`, `--card-border`. Use sparingly.

**Operating rule:** every change you make is emitted as a token (or a reusable variant), never a
one-off magic number. One spacing scale, one type scale, one radius scale, one shadow scale —
applied consistently. This is what "don't fork the system" actually means in code.

**Reference systems to study (don't clone wholesale):** Material 3, IBM Carbon, Shopify Polaris,
Apple HIG, Atlassian, Microsoft Fluent. They encode solved problems — interaction states, density
tiers, motion choreography, content rules — that you'd otherwise rediscover by hand.

---

## 7. Motion (Disney → Material, applied to UI)

Motion exists to *clarify* (where did this come from, where did it go, what changed), not to
decorate. Borrow Disney's 12 principles, filtered for interfaces:
- **Slow-in / slow-out (easing)** is the most important. Nothing in a good UI moves linearly.
  Ease-out for elements *entering*; ease-in for *exiting*; standard/emphasized curves for moves.
- **Staging** — direct the eye to one change at a time. **Follow-through / overlap** — staggered
  reveals (40–80ms offsets) feel alive. **Anticipation** — a tiny pre-move signals intent.
  **Squash/stretch** — only as a restrained press/spring on tactile elements.
- **Material motion patterns** for transitions: container transform, shared-axis, fade-through.
  Duration scale: micro-interactions 100–200ms, standard moves 200–300ms, large/entrance 300–500ms.
- **One orchestrated page-load reveal beats a dozen scattered micro-interactions.** Restraint reads
  as expensive.
- **Always** honor `prefers-reduced-motion` (provide an instant/cross-fade fallback) and respect
  the Doherty 400ms feedback ceiling.

---

## 8. Creative range — defeat distributional convergence

The failure mode of any AI designer is regression to the mean: the same dark Linear/Vercel clone,
Inter, Space Grotesk, purple gradients, rounded-everything. World-class means *intentional and
varied*, not "premium" on rails.

- **Commit to a named archetype before coding**, and rotate it across projects: brutalist, editorial/
  magazine, maximalist, retro-futuristic, luxury/refined, organic/natural, Swiss/International,
  industrial/utilitarian, playful/toy, art-deco/geometric, soft/pastel.
- **Vary the fundamentals between generations:** light vs dark, serif-led vs grotesque-led, dense
  vs airy, warm vs cool. Never converge on the same fonts/colors/layout across jobs.
- **Differentiation question:** "What is the one thing someone remembers about this?" If there
  isn't an answer, the design isn't done.
- **Aesthetic bar (2026):** awwwards Site-of-the-Day energy; Linear/Vercel/Stripe-tier polish on
  the restraint axis; cinematic, atmospheric heroes; confident negative space; one electric accent;
  text-reveal and subtle scroll-driven motion; physical, smooth transitions.

### The anti-slop banlist (the critic checks every item)
- ❌ Inter, Roboto, Open Sans, Lato, Arial, system-ui as the *display* face (fine as a deliberate
  neutral body choice, never as the characterful headline).
- ❌ Purple→blue gradient on white.
- ❌ Everything rounded `2xl` with a soft drop shadow (the "default card").
- ❌ Evenly-distributed timid palette with no dominant + accent.
- ❌ Centered hero / three-feature-cards / FAQ accordion with zero point of view.
- ❌ Lightness ramps built in HSL (§3).
- ❌ Linear easing or no motion at all.
- ❌ Converging on the same look as the last thing built.

---

## 9. Reading list (the canon a senior carries)

- **Refactoring UI** — Wathan & Schoger. The practical UI bible; tactical and example-dense.
- **The Design of Everyday Things** — Norman. Affordances, signifiers, feedback, mapping.
- **Don't Make Me Think** — Krug. Clarity and self-evidence.
- **Laws of UX** (2nd ed.) — Yablonski. The cognitive principles in §1. lawsofux.com is the
  free reference.
- **Designing with the Mind in Mind** — Jeff Johnson. The cognitive psychology underneath.
- **The Elements of Typographic Style** — Bringhurst. The typography canon (§2).
- **Grid Systems in Graphic Design** — Müller-Brockmann. Layout grids and rhythm.
- **The Visual Display of Quantitative Information** — Tufte. For any data/dashboard work.
- **Atomic Design** — Brad Frost (free at atomicdesign.bradfrost.com). System architecture (§6).
- **Practical UI** — Dannaway. Modern, logic-driven, current best practices.
- **Nielsen Norman Group** (nngroup.com) and **Smashing Magazine** — ongoing journals worth tracking.
