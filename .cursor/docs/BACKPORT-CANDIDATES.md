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
| 3 | Experience Engine layout doc: monolith pages may need inline-style lock when Tailwind v4 layout refactors fail repeatedly; pair with project-local layout skill | docs/skill | DigitalStudioz | 2026-07-03 | pending |

## Completed

| # | What | Version | Date |
|---|------|---------|------|
| 2 | DigitalStudioz gaps: env merge, Hostinger/GitHub docs, sync-mcp-env wrapper, repair script, universal doc copy in bootstrap | 1.12.0 | 2026-07-03 |
| 1 | Premium scroll toolkit: Lenis provider, GSAP scroll hook, CustomCursor, StudioRails | 1.8.0 | 2026-06-29 |
| 2 | TROUBLESHOOTING #11: removed gateway platform retries due to auth.json credential_pool cache (Photon gotcha) | 1.9.0 | 2026-06-29 |
|   |      |         |      |
