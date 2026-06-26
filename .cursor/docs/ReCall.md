# JONBEATZ.DEV — ReCall Log

## [SETUP 2026-06-25] — Project split out of the personal profile (Tier 3)
- **Created** `D:\Hermes\projects\JonBeatz.dev` as a standalone project for the red
  `jonbeatz.dev` site — the `NEXT_PUBLIC_JB_VARIANT=dev` variant that previously lived
  inside the JonBeatz personal profile (Tier 1). This is the planned **Tier 3** split
  (separate project/repo) from `JONBEATZ-SITE-DEPLOY.md` → "Architecture tiers".
- **Curated scaffold, not a clone** (same pattern as Kristina-Irwin). Brought over:
  website (`app/`, `components/`, configs), UI/3D design skills + `skills-external`
  (gsap, awesome-design-md), GitHub-Ops + Hostinger-Ops skills, the docs system, and the
  dev/build/deploy/backup/mem0/docs/version scripts. **Left out** all personal services
  (JARVIS voice, Telegram, DeepSeek/LiteLLM, ComfyUI, Google, image-gen).
- **Red is now the DEFAULT** — `app/layout.tsx`, `app/page.tsx`, and
  `components/ThreeBackground.tsx` default `IS_DEV_SITE` to true (red theme + glow-beam
  portal). `NEXT_PUBLIC_JB_VARIANT="default"` falls back to the legacy gold theme.
- **Mem0:** fresh isolated scope `jonbeatz_dev` (`qdrant_jonbeatz_dev`) — separate from
  `jonbeatz_personal`. Env prefix `JBD_*`; backup root `G:\Hermes_Project_BackUpz\JonBeatz.dev`
  (guarded against the personal `...\JonBeatz` tree).
- **Original untouched:** this was a COPY — the personal profile + gold jon-beatz.com
  still work exactly as before.
- **Verified:** `npm install` (--legacy-peer-deps, React 19/Next 14), `npm run dev` serves
  the red site (data-variant=dev, JONBEATZ.DEV header, portal beam) on :3001 (port 3000 was
  the personal Playground), and `npm run site:build:static` exports clean.
- **GitHub (2026-06-25):** repo **`jonbeatz/JonBeatz-Dev`** created **private**, `main`
  pushed, tag **`v1.0.0`** + release **JONBEATZ.DEV v1.0.0** (marked Latest). Badges wired
  to `jonbeatz/JonBeatz-Dev` (version/release/repo). Homepage + topics set.
  > NOTE: repo is PRIVATE — the shields.io `release` badge only renders on a PUBLIC repo.
  > Flip with `gh repo edit jonbeatz/JonBeatz-Dev --visibility public` if you want it live.
- **Next:** first deploy of jonbeatz.dev from THIS project (currently still served by the
  Tier-1 variant in the personal profile). Tier 2/3 redesign (DevHome split, more 3D,
  scroll choreography) now happens here freely.
