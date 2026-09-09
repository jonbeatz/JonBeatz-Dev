# Backport Candidates — Shared Skeleton Improvement Queue

When you discover something during a session that could benefit future projects, log it here. At the end of the session (or when you have a few minutes), review and backport.

## Triage criteria

| Include | Skip |
|---------|------|
| New scripts, rules, prompts, skills that are project-agnostic | Project-specific business logic |
| Bugs found in bootstrap/scripts/templates | One-time configuration tweaks |
| Environment variables worth documenting | Personal preferences that won't generalize |
| Missing docs or reference pages | Deprecated/legacy workarounds |
| Workflow improvements to prompts or rituals | Changes requiring bootstrap rewrite |

## Queue

| # | What | Type | Project | Date | Status |
|---|------|------|---------|------|--------|
| 8 | Picture-book type inventory: Photoshop EngineData `StyleRunAlignment` 2 is roman baseline not center — use `ParagraphRun.Justification`; unescape `\'` in `clean_text`; InDesign `fitOverflow` must grow height only (facing `parentPage.bounds` is spread width). Lives in HBA `scripts/lib/type_inventory_common.py` + `apply_type_inventory_to_indd.py` — backport into shared book-type scripts when those land in the skeleton. | scripts/docs | Harlows-Big-Adventure | 2026-08-22 | pending |
| 3 | Experience Engine layout doc: monolith pages may need inline-style lock when Tailwind v4 layout refactors fail repeatedly; pair with project-local layout skill | docs/skill | DigitalStudioz | 2026-07-03 | pending |

## Completed

| # | What | Version | Date |
|---|------|---------|------|
| 10 | ComfyUI Vue Nodes / `app.canvas.read_only` toast: keep Vue Nodes off, Lightning App Mode not Edit-2511 Graph; empty Media sidebar OK for API gens. Also: Windows PS 5.1 `Set-Content -Encoding utf8` writes BOM — Website-Templates `template-new.ps1` now uses UTF8Encoding false. | docs | 2026-09-05 |
| 9 | Hide Hermes `no_agent` cron on Windows via `wscript` + `pythonw` (`hermes-*-hidden.vbs`, `register-hidden-hermes-script-task.ps1`, fleet copies launchers) | 1.32.6 | 2026-08-27 |
| 7 | Picture-book fal model-lane recipe (Klein dial → Qwen fallback → Banana finals) in shared IMAGE-WORKFLOW | 1.31.5 | 2026-07-15 |
| 6 | Extended Health sidecar: system Python launcher (not Hermes venv) for `hermes update` safety | 1.29.2 | 2026-07-11 |
| 5 | End Project clickable AskQuestion UX (`end-project-ritual.mdc`, Hard UI rule, never Reply 1/2) | 1.29.1 | 2026-07-11 |
| 4 | n8n `N8N_LISTEN_ADDRESS` gotcha + Extended Health sidecar pattern (CE no Execute Command) | 1.29.0 | 2026-07-11 |
| 2 | DigitalStudioz gaps: env merge, Hostinger/GitHub docs, sync-mcp-env wrapper, repair script, universal doc copy in bootstrap | 1.12.0 | 2026-07-03 |
| 1 | Premium scroll toolkit: Lenis provider, GSAP scroll hook, CustomCursor, StudioRails | 1.8.0 | 2026-06-29 |
| 2 | TROUBLESHOOTING #11: removed gateway platform retries due to auth.json credential_pool cache (Photon gotcha) | 1.9.0 | 2026-06-29 |
|   |      |         |      |
