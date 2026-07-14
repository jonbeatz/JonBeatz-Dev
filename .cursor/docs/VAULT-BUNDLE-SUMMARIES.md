# Vault Bundle Summaries — 3D Web Workflows

One-page distillations of large vault playbooks. **Full content stays in the asset vault** — edit vault files, then refresh summaries here when chapters change.

**Vault root:** `D:\Hermes\assets\3d-web-workflows\`

---

## design-agent-solpowa

| Item | Path |
|------|------|
| Agent (operational) | Vault: `design-agent-solpowa/design-engineer.md` |
| Canon (knowledge) | Vault + shared: `skills/Design-Engineer/references/design-canon.md` |
| Hermes skill | `skills/Design-Engineer/SKILL.md` |

**Use when:** UI polish, design audits, "make it pop" after scroll/3D build.

**Loop:** Playwright screenshot → 8-criterion rubric → iterate until ship-ready. Read canon §1 (Laws of UX) + §8 (anti-slop banlist) first.

**Duplicate note:** `D:\Hermes\assets\xtraz\design-agent-soulpowa\` is a typo-alias copy — **canonical = `design-agent-solpowa`** in 3d-web-workflows vault.

---

## premium-site-workflow (Luke agency)

| Item | Path |
|------|------|
| Full agent playbook | `premium-site-workflow/CLAUDE.md` |
| Companion PDF | ✅ `premium-site-workflow/Build Premium Sites with AI.pdf` (~3.8 MB, 2026-07-01) |

**Use when:** Motion-first agency landing ($2k+ feel), video/image hero, plain-English client handoff.

**Stack (Luke default):** Next.js App Router · Tailwind · **Motion** · TypeScript · Vercel.

**Hermes overrides:** Use `motion/react` + `SmoothScrollProvider`; taste from `3D-WEBSITE-TASTE-CATALOG.md`; stills via `npm run image:gen` / fal; video via `npm run video:fal` + FFmpeg → `ScrollFrameHero`.

**Key moves from CLAUDE.md:**
- Plain-English tone for non-technical operators
- Video-first or image-first hero; restraint over decoration
- Nano Banana / GPT Image 2 still prompts + Kling motion prompts in CLAUDE §6–8
- Motion library for all scroll reveals (not CSS-only for hero)
- Proactive skills: ui-ux, frontend-design equivalents → **Design-Engineer** + **Premium-UI**

---

## MAVRA_Build_Guide (AutomationX luxury scroll)

| Item | Path |
|------|------|
| Full guide (~622 lines) | `MAVRA_Build_Guide.md` |
| Duplicate copy | `D:\Hermes\assets\docs\MAVRA_Build_Guide.md` (same content) |

**Use when:** Full luxury brand story (tea, perfume, CPG, spirits) — hero-first system.

**Five-layer pipeline:**
1. Concept — one product, one emotion, one story
2. Prompt system — structured repeatable prompts
3. Image generation — compare hero variations before committing
4. Motion — stills → video (same visual language)
5. Build — organized asset folder, hero first

**Chapter map:**

| Ch | Topic | Hermes equivalent |
|----|-------|-------------------|
| 01–03 | Concept + asset list | `frontend-design` + taste catalog |
| 04–05 | Prompt formula + hero variations | `IMAGE-WORKFLOW` |
| 06–09 | Video + merge + file naming | `devini-tea/BUILD-GUIDE` + FFmpeg |
| 10 | Frame extraction | `Scroll-Video-Sequence` |
| 11–12 | Project + architecture | `3d-scroll-website` |
| 13 | Lenis + GSAP | `Scroll-Motion` + `SmoothScrollProvider` |
| 14 | SplitType text reveals | `templates/lib/useSplitType.ts` |
| 15–16 | AI agent build + iteration | `Build-3D-Website.md` + **Design-Engineer** |
| 17–18 | Luxury mistakes + launch checklist | `MSC-UI-Taste` + `Motion-Accessibility` |

**Case study:** MAVRA mango juice — same tier as devini-tea (luxury multi-beat).

---

## IronMan reference site

| Item | Path |
|------|------|
| Next.js 16 source | `IronMan/iron-man-main/` |
| Hero frames | `public/frames/` (169 JPG) |
| Cinematic beat frames | `public/frames2/` (169 JPG) |
| Kling source clips | `IronMan/video-assets/` |
| Patterns doc | `skills/3d-scroll-website/references/08-iron-man-patterns.md` |

**Use when:** HUD cinematic marketing, dual frame sequences, scroll-linked quote beats.

**Hermes port:** `ScrollFrameHero` + `CinematicBeatOverlay` + `HudFrame` + `scrollBeats.ts` — use `motion/react` not framer-motion from reference.

---

## RoboNuggets modules

| Item | Path |
|------|------|
| 30 HTML modules | `robonuggets/cinematic-site-components/` |
| Module index | `robonuggets/INDEX.md` |
| Font/dither inspo | `robonuggets/design-inspo/` |
| Full module map | `SCROLL-3D-REFERENCES.md` § RoboNuggets module map |

**Install/refresh:** `npm run vault:robonuggets` (JonBeatz hub).

---

## cinematic-scroll-skill (MustBeSimo)

| Item | Path |
|------|------|
| Vendored repo | `cinematic-scroll-skill/` |
| Live demo | https://mustbesimo.github.io/cinematic-scroll-skill/ |
| Doctor CLI | `tools/cinematic-doctor/` |
| Themes + tokens | `themes/`, `tokens/`, `design.md` |

**Use when:** Art-directed scroll sites need a **scored quality gate** — taste, a11y, mobile, tokens, 3D categories; CI-blockable `doctor` exit code.

**Hermes pairing:** Run after `Scroll-Motion` + frame hero build; use vault examples as rubric reference. Media still from `image:gen` / `video:fal` + FFmpeg — skill does not replace Kling pipeline.

**Install/refresh:** `npm run vault:cinematic-scroll-skill` (JonBeatz hub). First use: `cd` vault path → `npm install` → `npm run doctor -- examples/noir/index.html`.

**Grade:** A- (92) ADOPT — [TOOLS-WATCHLIST](./TOOLS-WATCHLIST.md).

---

## web-xtraz (archive / staging)

| Item | Path | Read? |
|------|------|-------|
| Staging folder | `web-xtraz/` | 2026-07-13 full pass |
| Premium workflow PDF | `Guide.pdf` (10 pp) | Vigneshwari 5-phase primer — archive only |
| RIFT Scroll-Cinema whitepaper | `webguide.pdf` (14 pp) | Six-act multi-clip scrub engine — maps to fal tier + WATCH Higgsfield |
| Devini TEA export | `Devini-Labs-Scroll-Website-Build-Guide.docx` | Duplicate of `devini-tea/BUILD-GUIDE.md` |
| Agency one-shot prompt | `Ai site prompt v1.docx` | Dark luxury Three.js/GSAP/Lenis prompt |
| Skill pack duplicate | `3d-scroll-website-skill-pack/` | **Do not fleet-sync** — canonical skill in shared library |

**Full text summaries:** vault `VAULT-PDF-INDEX.md` · fleet `.cursor/docs/VAULT-PDF-INDEX.md` · refresh `npm run vault:pdf:inventory`

**Use when:** Recovering one-off guides or docx exports — **not** canonical for builds. Prefer `devini-tea/`, `premium-site-workflow/`, and fleet skills.

---

## docmo-guides-pdf (Doc Mo Agency — 2026)

| Item | Path | Read? |
|------|------|-------|
| **16 build guides** | `docmo-guides-pdf/*.pdf` | 2026-07-13 index pass |
| Fleet index | [DOCMO-GUIDES-INDEX.md](./DOCMO-GUIDES-INDEX.md) | Catalog + patterns (not full OCR) |

**Categories:** food scroll-scrub (UMAMI, BIRRIA, Smash, BRACE, explosion/PRIME), villa real-estate tour, CHRONOS watch scrub, Nike/NOIR product sliders, clinic character-select (APEX/ATLAS/IVORY), AI ads (Chanel/Coke/Sultan), Cosmos canvas 2D.

**Key patterns for Hermes:** four-layer animation split · canvas-not-video scrub · mobile frame halving · configurator fly clones · AI ad 5-step pipeline · consolidated pitfalls table.

**Use when:** Building food/luxury scroll sites, configurators, or short AI product films — pair with `ScrollFrameHero` + `Scroll-Motion` + `video:fal`.

---

## SCROLL-VIDEO-RESEARCH.md

Living external workflow index (20 ranked guides, Kling matrix, FFmpeg recipes). **Vault-only** — do not duplicate; link from `SCROLL-3D-REFERENCES.md` tier table.

---

## Related

- [3D-DEV-SETUP.md](./3D-DEV-SETUP.md) — full dev system + asset inventory
- [3D-WEB-WORKFLOWS.md](./3D-WEB-WORKFLOWS.md) — agent hub
- [Build-3D-Website.md](../prompts/Build-3D-Website.md) — build ritual

**Last updated:** 2026-07-13
