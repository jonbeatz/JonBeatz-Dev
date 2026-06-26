# JONBEATZ.DEV — TRUTH.md
**Version:** 1.0.0
**Project root:** `D:\Hermes\projects\JonBeatz.dev`
**Live target:** https://jonbeatz.dev (Hostinger static)

## Identity

- **What:** The standalone **red command-center site** — JONBEATZ.DEV. A dark, cinematic
  Next.js + Three.js single-page site with a glow-beam hero portal, animated 3D particle
  field, bento panels, and a JARVIS console footer.
- **Origin:** Split out of the JonBeatz personal profile (`D:\Hermes\projects\JonBeatz`)
  where it lived as the `NEXT_PUBLIC_JB_VARIANT=dev` variant of the Command Center site.
  This project is now self-contained and owns jonbeatz.dev exclusively.

## Boundaries (hard rules)

- **Included here:** OmniVoice (JARVIS, ritual-only) + project MCPs (21st-dev, markdownify,
  browserbase, pencil, composio).
- **Stay in the personal profile:** Telegram, DeepSeek/LiteLLM, ComfyUI, Google Workspace,
  image-gen.
- **Gold `jon-beatz.com` stays in the personal profile.** This repo ships only the red site.
- **Mem0 scope = `jonbeatz_dev`** (`qdrant_jonbeatz_dev`). Never `jonbeatz_personal`,
  `kristina_irwin`, or any MSC store.
- **Secrets:** `.cursor/mcp.json` and `.env.local` are gitignored (repo is public). Commit
  only `*.example`.

## Core technical facts

- **Red is the default.** `npm run dev` / `npm run build` produce the red theme + glow beam
  with no flags. `NEXT_PUBLIC_JB_VARIANT="default"` falls back to the legacy gold theme.
- **Static export** for the public site (`JB_STATIC=1` → `output: 'export'`). The local-only
  `app/api/*` routes are stashed during the static build (see `scripts/build-static-site.mjs`).
- **Deploy:** Hostinger static (`hosting_deployStaticWebsite { domain: "jonbeatz.dev" }`),
  then **flush the CDN**. Full runbook: `.cursor/docs/JONBEATZ-DEV-DEPLOY.md`.

## Conventions

- **Environment:** Windows 10/11 PowerShell. No bash heredocs.
- **UTF-8:** never bulk-rewrite `.md`/`.mdc` from PowerShell without `-Encoding UTF8`.
  Use `npm run version:sync` for badges; `npm run encoding:check` before doc commits.
- **Backups:** `npm run backup:quick` → `G:\Hermes_Project_BackUpz\JonBeatz.dev` (guarded
  against the personal `...\JonBeatz` tree).
