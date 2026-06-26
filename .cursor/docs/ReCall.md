# JONBEATZ.DEV — ReCall Log

## [2026-06-25] — Hostinger deploy layer completed (static-focused)
- Added a self-contained Hostinger setup for the **static** jonbeatz.dev (NOT the MSC Node
  FTPS pipeline — that's a different repo). New: `.cursor/docs/HOSTINGER-REFERENCE.md`
  (MCP quartet, account SSH, SSL, CDN, pitfalls), rewrote `.cursor/skills/Hostinger-Ops/
  SKILL.md` to be jonbeatz.dev-only (dropped MSC/FTPS + broken doc refs), added
  `.cursor/rules/hostinger-reference.mdc`.
- **Account SSH:** brought `scripts/hostinger-ssh.mjs` (self-contained, reads this project's
  `.env.local`, dropped MSC fallback) + `npm run site:ssh` + `ssh2` as an **optionalDependency**
  (installed; graceful "missing creds" exit when `HOSTINGER_SSH_*` unset).
- **Env:** added `HOSTINGER_API_TOKEN` + `HOSTINGER_SSH_*` to `.env.local.example` and
  `.env.local` (commented). Token → global MCP quartet via `npm run sync:mcp-env`.
- **Deploy workflow stays 3-step:** `npm run site:package` → `hosting_deployStaticWebsite`
  → flush CDN in hPanel. Cross-linked from START-HERE / MASTER-COMMANDS / deploy doc /
  source-of-truth lists.
- **Verified:** ssh script graceful w/o creds, package.json valid, docs:sync green,
  secrets still gitignored.

## [2026-06-25] — Public repo + full workflow/voice/MCP parity
- **Repo is now PUBLIC:** `jonbeatz/JonBeatz-Dev`. README screenshots (hero, pipelines,
  stack) + release badge now render. Earlier private-repo caveat resolved.
- **OmniVoice (JARVIS) added + verified.** Copied `jarvis-speak/voice/omni-daemon/voice-gate`
  scripts (portable — point at shared `_core-scripts\voice-engine` + `OmniVoice\.venv`;
  daemon now reads THIS project's `.env.local`). `npm run jarvis:voice-test` → "Voice active
  (omnivoice)". Ritual-only via `.cursor/rules/voice-policy.mdc`. `session:stop` stops the
  daemon; `session:start:full` pre-warms it.
- **Project MCPs added.** `.cursor/mcp.json` (21st-dev-magic, markdownify, browserbase,
  pencil, composio) is **gitignored** (public repo) — committed `.cursor/mcp.json.example`
  + `npm run sync:mcp-env` (injects keys from gitignored `.env.local`). Global MCPs
  (github/tavily/hostinger-*/fal) remain shared in `~/.cursor/mcp.json`.
- **Workflow rituals completed:** added `workflow.mdc` (Start/End/Update Docs/Backup/Release/
  Branch Cut/Deploy triggers), `interactive-workflows.mdc` (AskQuestion backup gates),
  `voice-policy.mdc`, and the `Update-Docs.md` prompt. Added npm scripts: `jarvis:speak`,
  `jarvis:voice-test`, `jarvis:omni-daemon`, `sync:mcp-env`, `session:start:full`.
- **Boundary corrected everywhere:** voice + MCPs ARE in-scope now; only Telegram /
  DeepSeek / ComfyUI / Google / image-gen stay personal. Updated TRUTH, AGENTS, .cursorrules,
  dev-site.mdc, START-HERE, MASTER-COMMANDS, README.
- **Verified:** JSON valid; secrets gitignored (mcp.json + .env.local), examples tracked;
  encoding clean; `sync:mcp-env` OK; voice test OK.

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
