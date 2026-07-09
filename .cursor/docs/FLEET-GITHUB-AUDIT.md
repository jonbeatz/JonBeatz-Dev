# Fleet GitHub & Backup Audit — Hermes Apps

**Date:** 2026-07-08  
**Operator:** Jon  
**Scope:** `D:\Hermes\apps\` (Profile Jedi, TaskBoardAI), `_core-scripts`, sibling profiles

---

## Executive summary

| Repo | GitHub | Follows JonBeatz template? | Backup wired? | Priority |
|------|--------|----------------------------|---------------|----------|
| **profile-jedi** | [jonbeatz/profile-jedi](https://github.com/jonbeatz/profile-jedi) public | **Yes** — v1.1.0 released | Yes | Done |
| **TaskBoardAI** | [jonbeatz/hermes-taskboard](https://github.com/jonbeatz/hermes-taskboard) private | **Yes** — v1.0.0 released | Yes | Done |
| **hermes-core-scripts** | [jonbeatz/hermes-core-scripts](https://github.com/jonbeatz/hermes-core-scripts) | N/A | Yes | Done @ 3544c72 |
| **Next-Flick** | jonbeatz/Next-Flick | **Yes** — GITHUB-SETUP, branch cut, release | Yes | P2 doc sync only |
| **JonBeatz hub** | jonbeatz/JonBeatz-Command-Center | **Yes** — template source | Yes + `backup:core-scripts` | P2 fleet:sync |

---

## Profile Jedi (`D:\Hermes\apps\profile-jedi`)

### What exists

- Public GitHub: `https://github.com/jonbeatz/profile-jedi`
- Branch: `main`
- Package version: **1.1.0** (local; may be ahead of remote)
- Docs: `README.md`, `TRUTH.md`, `AGENTS.md`, `Hermes-Profile-Switcher.md`, `CHANGELOG.md`
- **Uncommitted (2026-07-08 session):** v1.1 tray proxy, repair-cli, profile align rituals, DRAVEN rebrand, pick-folder, registry restore

### Template gaps vs Next-Flick / JonBeatz

| Item | Status |
|------|--------|
| `GITHUB-SETUP.md` | **Missing** — add (branch model, topics, release) |
| `npm run release` / `version:sync` | **Missing** |
| `scripts/github-release.ps1` | **Missing** |
| `.github/workflows` | **None** (OK for local-first app) |
| GitHub Pages | **Not needed** |
| README badges + status table | **Present** — matches template spirit |
| `npm run backup:quick` | **Missing** — add via shared app backup script |

### Recommended branch model

| Branch | Purpose |
|--------|---------|
| `main` | Stable releases |
| `profile-jedi-v1` | Milestone dev (optional — currently on `main`) |

---

## TaskBoardAI (`D:\Hermes\apps\TaskBoardAI`)

### What exists

- **Remote:** `https://github.com/TuckerTucker/TaskBoardAI` (upstream author, not Jon)
- **No** `jonbeatz/TaskBoardAI` or `jonbeatz/hermes-taskboard` on GitHub
- Local branch: `pre-v0-merge-backup` (Hermes fleet customizations)
- Fleet fork features: Fleet Command rollup, DRAVEN footer, Profile Jedi integration, MCP, multi-board JSON
- **Uncommitted:** `app.js` fix, fleet boards under `boards/` (gitignored by design)

### Why you only saw two profiles in Desktop before

Unrelated to GitHub — CLI homes were missing until **Repair CLI** (2026-07-08). All six profiles now show in Hermes Desktop strip.

### Fork strategy (recommended)

1. **Create** `jonbeatz/hermes-taskboard` (or `jonbeatz/TaskBoardAI-fleet`) — **private** recommended (fleet board JSON may contain task text).
2. **Do not** push `boards/*.json` — keep `.gitignore` rule; fleet boards backup separately.
3. **Commit** Hermes code: `server/`, `app/`, fleet services, MCP, docs.
4. **Add upstream** remote to TuckerTucker for selective merges.
5. **Branch model:** `main` + `hermes-fleet-v1` (active) — mirror Next-Flick pattern.

```powershell
# One-time (operator + gh auth)
cd D:\Hermes\apps\TaskBoardAI
gh repo create jonbeatz/hermes-taskboard --private --description "Hermes fleet TaskBoardAI fork — Fleet Command, MCP, Profile Jedi" --source . --remote jonbeatz
git remote rename origin upstream   # TuckerTucker
git remote add jonbeatz https://github.com/jonbeatz/hermes-taskboard.git
# Commit fleet code (not boards/*.json), push to jonbeatz
```

See **`TaskBoardAI/GITHUB-SETUP.md`** (local) for full ritual.

### Template gaps

| Item | Status |
|------|--------|
| `TRUTH.md` | **Missing** — add |
| `GITHUB-SETUP.md` | **Missing** — add |
| `AGENTS.md` | **Missing** |
| Author in package.json | Still **TuckerTucker** — update after fork |
| Policy: no push to upstream | **Document** — Jon policy from chat |

---

## `_core-scripts` (uncommitted fleet work)

Push when ready:

| Path | Change |
|------|--------|
| `profile-switcher/Switch-Hermes-Profile.ps1` | set-active, repair-cli-all, Find-Profile, Ensure-ProfileScaffolding |
| `profile-switcher/Align-Hermes-Profile.ps1` | **New** — Open Project align |
| `profile-switcher/create-profile-template.ps1` | BOM fix |
| `profile-switcher/profile-template/...` | BOM fix launcher |
| `shared-profile-content/scripts/session-start.ps1` | Hermes active probe |
| `shared-profile-content/prompts/Open-Project.md` | profile:align steps |
| `shared-profile-content/rules/open-project-ritual.mdc` | align rule |
| `shared-profile-content/docs/FLEET-BOOT-SESSION.md` | browser stack (prior session) |

Run from JonBeatz after commit: `npm run fleet:sync`

---

## Docs & Mem0 sync queue

| Doc | Action |
|-----|--------|
| `MASTER-ECOSYSTEM-AUDIT.md` | Bump date; §6 apps GitHub table; profile-jedi v1.1, align ritual |
| `COMMAND-CENTER.md` | Apps GitHub + backup table |
| `KANBAN-WORKFLOW.md` | Note jonbeatz fork pending; Fleet Command verified |
| `FLEET-BOOT-SESSION.md` | Already has browser stack — add profile align one-liner |
| `Next-Flick/ReCall.md` | Session handoff (operator closeout) |
| `profile-jedi` remote docs | Commit + push v1.1 |
| **Mem0** | `npm run draven:add` fleet summary; `mem0:seed:profile-jedi` if script exists on JonBeatz |
| **Vader vault** | `01_Projects/Next-Flick.md` link to this audit |

---

## Backup workflow (apps)

Hermes **project** backups (`npm run backup:quick` from Next-Flick/JonBeatz) mirror `D:\Hermes\projects\<Profile>\` — they do **not** include `D:\Hermes\apps\` by default.

| App | Backup target | Command (after wiring) |
|-----|---------------|-------------------------|
| Profile Jedi | `G:\Hermes_Project_BackUpz\apps\profile-jedi\` | `npm run backup:quick` from app root |
| TaskBoardAI | `G:\Hermes_Project_BackUpz\apps\TaskBoardAI\` | same |
| Fleet board JSON | `TaskBoardAI/boards/*.json` | Include in TaskBoardAI backup (gitignored but backed up) |

Shared script: `_core-scripts/shared-profile-content/scripts/backup-hermes-app.mjs`

---

## Action checklist (priority order)

### P0 — TaskBoardAI ownership

- [x] Create `jonbeatz/hermes-taskboard` (private) — **DONE 2026-07-08**
- [x] Commit fleet code; keep boards out of git
- [x] Update `package.json` repository + author
- [x] Add TRUTH + GITHUB-SETUP + AGENTS
- [x] Remotes: `jonbeatz` (push) + `upstream` (TuckerTucker)
- [x] Default branch: `hermes-fleet-v1`; `main` aligned to same baseline

### P1 — Profile Jedi + core-scripts

- [x] Commit profile-jedi v1.1; push `main`; tag `v1.1.0` — **DONE**
- [x] Add GITHUB-SETUP.md + backup npm scripts — **DONE**
- [x] Commit + push hermes-core-scripts session changes — **DONE @ 3544c72**
- [x] `npm run fleet:sync` from JonBeatz — **DONE**

### P2 — Fleet awareness

- [x] Update MASTER-ECOSYSTEM-AUDIT + COMMAND-CENTER — **DONE**
- [x] ReCall / fleet profile doc commits — **DONE**
- [x] `npm run draven:add` — **DONE**

---

## Security — GitGuardian 2026-07-08 (repos scrubbed; rotation pending)

**What happened:** GitGuardian emailed after `hermes-taskboard` fork push (old MSC vault docs in git history) and `JonBeatz-Command-Center` commit `e9aaa0f` (live keys in `mcp-overlays-archived.json`).

**Remediated (2026-07-08):**
- `hermes-taskboard` — removed `Personal-Secrets-Vault*.md`, gitignored, history rewritten, force-pushed.
- `JonBeatz-Command-Center` — scrubbed overlay keys from history; file restored with placeholders.

**Prevention (2026-07-08):** Fleet **pre-commit + pre-push** hooks + `npm run git:secrets-scan` — install on every GitHub repo before push:

```powershell
npm run git:hooks:install          # from any Hermes profile
npm run git:secrets-scan           # staged changes
npm run git:secrets-scan:push      # outgoing commits vs remote
```

Templates: `_core-scripts/shared-profile-content/templates/.githooks/`

**Jon — rotate when ready (do not skip):**

| Service | Where to update after rotate |
|---------|------------------------------|
| GitHub PAT | `.env.local`, `_core-scripts/.env.local.master`, `sync:mcp-env` |
| Resend | master env + any profile using `RESEND_API_KEY` |
| Firecrawl | master env + Cursor MCP if wired |
| Tavily | master env (was in vault doc) |
| Browserbase | `.env.local` + `npm run sync:mcp-env` |
| Composio | `.env.local` + `npm run sync:mcp-env` |

Mark incidents resolved in GitGuardian after rotation.

**Full procedure:** `SECRETS-ROTATION-RUNBOOK.md` (fleet-synced to every profile).

---

## Drift prevention (2026-07-08)

| Ritual | When | Command |
|--------|------|---------|
| Fleet sync | After `_core-scripts` doc/script changes | `npm run fleet:sync` (JonBeatz hub) |
| Fitness check | Weekly or before major push | `npm run fleet:status` |
| Doc parity | Single profile | `npm run sync:docs -- -Write` |
| Secret hooks | New clone / new repo | `npm run git:hooks:install` |
| Pre-push scan | Every push | `npm run git:secrets-scan:push` |
| Hermes scaffold | New profile | Commit `HERMES.md`, `cli-profile/`, `hermes-desktop-profile.json`, desktop launcher |
| Ecosystem keys map | Monthly | `npm run ecosystem:audit` |

**Do not commit:** orphan `scripts/mem0-chat.ps1` copies when `package.json` points at `_core-scripts` — add gitignore entries instead.

---

*Maintainer: Jon · Refresh after fork or major fleet release*
