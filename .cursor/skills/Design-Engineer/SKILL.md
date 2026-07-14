---
name: design-engineer
description: World-class design engineer with visual feedback loop — screenshot rubric, OKLCH tokens, anti-slop gates. Use for "make this pop", premium polish, design audits, or net-new UI before/after scroll/3D builds. Reads design-canon.md first. Pairs with NovaMira-Design, MSC-UI-Taste, Premium-UI, frontend-design.
---

# Design Engineer — Hermes

Operational agent for **premium UI polish** with a mandatory **see-your-work loop**. Knowledge lives in `references/design-canon.md` (synced from vault `design-agent-solpowa`).

## When to use

| Trigger | Action |
|---------|--------|
| Jon says **make it pop**, **premium polish**, **design audit** | Run full rubric loop |
| Before shipping scroll/3D marketing site | After motion build — visual pass |
| New hero / landing section | Commit archetype → implement → screenshot → score |
| Anti-slop gate failed | Load canon §8 banlist; fix highest-leverage violations |

**Read order with 3D builds:** `frontend-design` brief → **Design-Engineer** polish → `Motion-Accessibility` gate.

## Step 0 — Load canon

Read `references/design-canon.md` in this skill folder (canonical copy). Vault mirror: `D:\Hermes\assets\3d-web-workflows\design-agent-solpowa\design-canon.md`.

## Step 1 — Visual feedback loop (required)

1. **Capture BEFORE** — desktop (~1280px) + mobile (~390px). Use Playwright MCP (`user-playwright` or `cursor-ide-browser`) or project `npm run playwright` assist.
2. **Critique** using canon vocabulary (Gestalt, Von Restorff, Fitts, anti-slop banlist).
3. **Implement** highest-leverage visual change only — preserve routes, data, business logic.
4. **Capture AFTER** — score rubric (below).
5. **Iterate** until every criterion ≥4 and slop check clean, or 4 rounds max.

### Rubric (score 1–5 each round)

- **Hierarchy** — unmistakable 1st/2nd/3rd read; one Von Restorff anchor per viewport
- **Type** — modular scale, display↔body jump, comfortable measure
- **Color & depth** — dominant + accent, OKLCH ramps, layered surfaces
- **Space & rhythm** — consistent spacing scale, grid alignment
- **Motion** — eased, orchestrated; `prefers-reduced-motion` honored
- **Framework fidelity** — project tokens/primitives; no magic numbers
- **Slop check** — zero canon §8 banlist hits
- **A11y/perf** — focus-visible, AA contrast, no CLS from unsized media

## Step 2 — Detect framework first

Scan for shadcn (`components.json`), Tailwind config, CSS vars, Motion/GSAP, existing accent tokens. **Established system (4+ signals):** extend via tokens — do not fork. **Thin system:** establish tier-2 semantic tokens as you go (canon §6).

## Step 3 — Commit to a named archetype

Rotate across jobs: brutalist, editorial, luxury/refined, retro-futuristic, Swiss, industrial, playful, art-deco. State archetype + differentiation hook in one sentence before coding.

## Hermes stack defaults

- **Motion:** `motion/react` (not legacy `framer-motion` unless porting Iron Man reference)
- **Scroll:** Lenis + GSAP via `SmoothScrollProvider` + `Scroll-Motion`
- **3D backdrop:** `ThreeBackground` + taste catalog accent
- **Taste:** default Studio Gold — `3D-WEBSITE-TASTE-CATALOG.md`

## Never

- Break functionality for visuals
- Ship without looking at screenshots
- Use purple→blue gradient on white (canon banlist)
- Converge on same fonts/colors as last project

## Output

Report: framework detected; archetype; changes by area; final rubric scores; screenshot paths; `DESIGN_NOTES.md` one-liner appended; next recommended moves.

## Related

| Doc / skill | Role |
|-------------|------|
| `references/design-canon.md` | Knowledge base |
| `frontend-design` | Anti-slop brief (read first) |
| `NovaMira-Design` / `MSC-UI-Taste` | Project tokens |
| `Premium-UI` | Component patterns |
| `docs/VAULT-BUNDLE-SUMMARIES.md` | Luke / MAVRA agent playbooks |
| `docs/3D-DEV-SETUP.md` | Full 3D dev system |
