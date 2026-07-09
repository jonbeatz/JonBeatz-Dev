# LLM Master Prompt — Hermes Fleet Deep Audit

**Purpose:** Copy-paste prompt for a **top-tier paid model** (Opus-class, o3, GPT-4.1, etc.) with **filesystem or repo access** to audit `D:\Hermes\projects`, `D:\Hermes\projects\_core-scripts`, and `D:\Hermes\apps`.  
**Output:** Actionable findings only — prioritized todos Jon runs on **regular local models** afterward.  
**Created:** 2026-07-08 · **Fleet library:** v1.26.0

---

## How Jon should use this

1. Open the premium model in a **fresh chat** with **full folder access** (or attach / mount these roots).
2. Copy everything inside **[MASTER PROMPT — START]** through **[MASTER PROMPT — END]** below.
3. Paste as the **first user message** (add: *"You have read access to D:\Hermes\"* if the UI asks).
4. Let it run — expect **30–90 minutes** of deep reading for a thorough pass.
5. **Live output file (required):** `D:\Hermes\projects\Next-Flick\.cursor\plans\2026-07-08-premium-audit.plan.md` — the premium model must **create/update this file as it goes** (not only at the end). A starter skeleton already exists; append findings and update the progress log after each tier.
6. Bring the **Prioritized Todo Table** back to Cursor/Draven on your normal stack — **do not** let the premium model push git or rotate keys unless you explicitly want that.

**Do not paste** `.env.local`, `MASTER-SECRETS-INVENTORY.local.md`, or any file containing live API keys into the chat.

### If you run out of premium credits mid-audit

| What happens | What to do |
|--------------|------------|
| Premium model wrote to the plan file | Open **this same Cursor chat (Auto)** and say: *"Continue the premium audit from `.cursor/plans/2026-07-08-premium-audit.plan.md` — read Resume instructions and finish remaining tiers."* |
| Premium chat only (no file writes) | Copy whatever the model printed into the plan file yourself, then hand off here. |
| Switch to a different model | Same plan file is the **single source of truth** — any model with repo access can resume from **Resume instructions** at the bottom of the plan. |

Cursor Auto **does not** see the premium model's chat history automatically — it **does** see the plan file on disk and this conversation if you return here.

---

## What we already fixed (skip or verify only)

| Item | Status |
|------|--------|
| Fleet `fleet:status` all green | ✅ 2026-07-08 |
| Secret-scan git hooks on all profiles | ✅ v1.26.0 |
| `hermes-taskboard` + `profile-jedi` GitHub releases | ✅ |
| GitGuardian history scrub | ✅ repos rewritten |
| Key rotation (PAT, Resend, Firecrawl, etc.) | ⏸ **Deferred by operator** — audit exposure risk only |
| Better Auth spike / v7 deploy | ⏸ Planned, not started |
| Next-Flick branding image winner | ⏸ Drafts committed, pick later |

---

## Reading order (tell the model to follow this)

### Tier 0 — Constitution (read first, conflicts: these win)

| Path | Why |
|------|-----|
| `D:\Hermes\projects\JonBeatz\TRUTH.md` | Hub identity, three-zone architecture |
| `D:\Hermes\projects\Next-Flick\TRUTH.md` | Flagship app state (v6 prod / v7 dev) |
| `D:\Hermes\projects\_core-scripts\shared-profile-content\VERSION.md` | Shared skeleton version |
| `D:\Hermes\projects\_core-scripts\shared-profile-content\hermes-fleet-profiles.json` | Hub + sibling list |

### Tier 1 — Fleet ops & known pain

| Path | Why |
|------|-----|
| `...\shared-profile-content\docs\FLEET-GITHUB-AUDIT.md` | GitHub + backup posture |
| `...\shared-profile-content\docs\SECRETS-ROTATION-RUNBOOK.md` | Deferred rotation checklist |
| `...\shared-profile-content\docs\FITNESS-CHECK.md` | Skeleton parity rubric |
| `...\shared-profile-content\TROUBLESHOOTING.md` | Top 10 gotchas |
| `D:\Hermes\projects\Next-Flick\.cursor\docs\ReCall.md` | Recent session history + tomorrow list |
| `...\shared-profile-content\docs\MASTER-ECOSYSTEM-AUDIT.md` | Tool chest + env map (no secret values) |
| `...\shared-profile-content\docs\PITFALLS-HOSTINGER.md` | Prod deploy footguns |

### Tier 2 — Per-repo TRUTH / AGENTS / backlog

| Repo root | Key docs |
|-----------|----------|
| `D:\Hermes\projects\JonBeatz` | `AGENTS.md`, `.cursor/docs/COMMAND-CENTER.md`, `.cursor/docs/ReCall.md` |
| `D:\Hermes\projects\Next-Flick` | `AGENTS.md`, `NEXT-FLICK-FEATURES.md`, `NEXT-FLICK-BACKLOG.md`, `NEXT-FLICK-AUTH-NOTES.md`, `NEXT-FLICK-DATABASE-NOTES.md`, `HOSTINGER-DEPLOY.md` |
| `D:\Hermes\projects\DigitalStudioz` | `TRUTH.md` or `README.md`, `package.json` |
| `D:\Hermes\projects\VaderLabz` | same pattern |
| `D:\Hermes\projects\JonBeatz.dev` | same pattern |
| `D:\Hermes\apps\profile-jedi` | `TRUTH.md`, `CHANGELOG.md`, `GITHUB-SETUP.md` |
| `D:\Hermes\apps\TaskBoardAI` | `TRUTH.md`, `GITHUB-SETUP.md`, `server/`, fleet API routes |
| `D:\Hermes\apps\Open-Generative-AI` | `TRUTH.md` (boundary only — upstream clone, no fleet scaffold) |
| `D:\Hermes\projects\_core-scripts` | `shared-profile-content/scripts/`, `deepseek-api/`, `profile-switcher/` |

### Tier 3 — Code hotspots (sample, then expand)

| Area | Paths to inspect |
|------|------------------|
| Next-Flick runtime | `app/`, `lib/`, `middleware.ts`, `drizzle.config*.ts`, `next.config.mjs`, `package.json` |
| Auth / user sync | `lib/auth/`, `app/api/auth/`, Clerk middleware |
| Deploy scripts | `scripts/package-hostinger-deploy.ps1`, `scripts/deploy-preflight*` |
| Fleet scripts | `_core-scripts/shared-profile-content/scripts/hermes-fleet-*.ps1`, `sync-docs.ps1`, `bootstrap-new-project.ps1` |
| Secret hooks | `templates/.githooks/`, `git-secrets-scan.ps1` |
| TaskBoard fleet | `TaskBoardAI/server/` fleet overview, health probes |
| Profile Jedi | tray proxy, registry, CLI repair paths |

### Tier 4 — Vault (human memory, link don't duplicate)

| Path | Why |
|------|-----|
| `H:\Vader_Vault\01_Projects\Next-Flick.md` | Cross-project decisions |
| `H:\Vader_Vault\02_Knowledge\Learnings\` | Gotchas |
| `H:\Vader_Vault\02_Knowledge\Decisions\2026-07-08 Fleet GitHub audit.md` | Security incident context |

---

## Audit dimensions (score each P0–P3)

| Dimension | Look for |
|-----------|----------|
| **Security** | Hardcoded secrets, weak gitignore, hook bypass, MCP json in git, vault doc patterns, client profile leaking hub secrets |
| **Secrets exposure** | `git log -p` patterns, archived overlays, example files with real keys, committed `.env` |
| **Doc drift** | `_core-scripts` vs profile `.cursor/docs` mismatch; stale version numbers; TRUTH vs ReCall conflict |
| **Skeleton parity** | Missing npm scripts, orphan local `scripts/mem0-*.ps1` when package.json uses `_core-scripts` |
| **Windows / PowerShell** | Bash-only patterns, BOM JSON writes, wrong path separators, stale `D:\Hermes\JonBeatz` |
| **Prod vs dev** | Next-Flick v6 live vs v7 branch; separate Clerk instances; Neon vs pg0 |
| **Deploy safety** | Build-while-dev-running, Passenger `0.0.0.0` origin leaks, hPanel env drift |
| **DB / migrations** | Drizzle push vs migrate; empty Neon on deploy; demo seed vs app DB mismatch |
| **Backup / restore** | Untested restore paths; TaskBoard `boards/*.json` gitignored but not in backup ritual |
| **Mem0 isolation** | Cross-profile `MEM0_USER_ID` / `KI_MEM0_*` collisions |
| **Fleet rituals** | Start/Open/Close/End prompt completeness; `profile:align` edge cases |
| **Dependencies** | `npm audit`, outdated Next/React, duplicate lockfile drift |
| **Performance** | Bundle size, unoptimized images, TMDB over-fetch, R3F/Three on weak GPUs |
| **Accessibility** | Focus traps, contrast on gold CTAs, mobile nav |
| **Test gaps** | Missing smoke tests for auth, deploy, fleet APIs |
| **Tech debt** | Duplicate code across profiles, dead scripts, unfinished spikes |
| **Better Auth readiness** | v7 spike blockers before Clerk replacement |
| **Operator UX** | Confusing command names, missing MASTER-COMMANDS entries |

---

# [MASTER PROMPT — START]

You are a **principal engineer + security reviewer** auditing the **Hermes AI development fleet** on a Windows 11 workstation. The operator (Jon) has **~1–2 days** of cheap access to you and wants maximum ROI: find real problems, not generic advice.

## Your mission

Perform a **read-only deep audit** of:

- `D:\Hermes\projects\` (all profile repos)
- `D:\Hermes\projects\_core-scripts\` (shared factory)
- `D:\Hermes\apps\` (Profile Jedi, TaskBoardAI, etc.)

**Do not** modify files, commit, push, rotate keys, or run destructive commands unless Jon explicitly asks in a follow-up.

**Exception — you MUST write one file:** maintain a **live audit log** on disk as you work (see below).

## Live audit document (write as you go — critical)

**Path (exact):** `D:\Hermes\projects\Next-Flick\.cursor\plans\2026-07-08-premium-audit.plan.md`

A starter skeleton may already exist. **Update this file incrementally** — do not wait until the end.

**After each action below, append to the plan file:**

| When | What to write |
|------|----------------|
| Start | Set `Status: in_progress`, model name, timestamp |
| Finish **Tier 0** | Progress log row + any early findings |
| Finish **Tier 1** | Progress log row + findings table rows |
| Finish **Tier 2** per repo | Progress log row + findings for that repo |
| Finish **Tier 3** code pass | Progress log row + findings |
| Each **P0 or P1** finding | Add row immediately (don't batch) |
| Before stopping / low tokens | Set `Status: paused`, fill **Resume instructions** (next tier, repos not opened, partial F-ids) |
| Complete | Set `Status: complete`, executive summary, final todo list, replace footer with `AUDIT COMPLETE — N findings (X P0, Y P1)` |

If you cannot write files, **print the full plan markdown in chat** after every tier so Jon can paste it into the file manually.

**Rules:**
- Never delete findings — only append or update status fields.
- Keep **Resume instructions** current whenever you pause.
- UTF-8 markdown; no live secrets in the file (path + line only).


1. **OS:** Windows 10/11 + PowerShell — flag bash-isms and heredoc patterns in docs/scripts.
2. **Secrets:** Never output live API keys. If you find one, cite **file path + line** and say ROTATE — do not echo the value.
3. **Source of truth:** Per-repo `TRUTH.md` beats other docs; fleet canonical docs live in `_core-scripts/shared-profile-content/docs/`.
4. **Isolation:** Each profile has its own Mem0 collection — flag any cross-profile leak between fleet profiles.
5. **Prod safety:** https://next-flick.com runs **v6** on branch `Next-Flick-Project-v6`; active dev is **v7** — do not recommend breaking prod without a milestone plan.
6. **Already done:** Fleet v1.26.0, `fleet:status` green, git secret hooks installed, GitGuardian repos scrubbed. Key rotation is **deferred** — only assess residual risk.

## Required reading order

Follow the **Tier 0 → Tier 4** table in `LLM-Master-Prompt.md` (same document you're executing). Spend at least:

- **25%** time on `_core-scripts` (factory affects every profile)
- **35%** on `Next-Flick` (flagship product + prod deploy)
- **15%** on `JonBeatz` hub + fleet scripts
- **15%** on `apps/` (Profile Jedi, TaskBoardAI)
- **10%** on sibling profiles (DigitalStudioz, VaderLabz, JonBeatz.dev)

## Active investigations (go deep)

### 1. Security & leak residual risk
- Verify pre-push hooks cover all git repos under `D:\Hermes\`
- Search for patterns: `sk-`, `ghp_`, `Bearer `, `api_key`, `Personal-Secrets-Vault`, live tokens in markdown/json
- Check `.cursor/mcp.json` is gitignored everywhere; `mcp.json.example` has placeholders only
- Assess **deferred rotation** blast radius (GitHub PAT highest)

### 2. Documentation drift
- Compare `_core-scripts/shared-profile-content/docs/` vs each profile's `.cursor/docs/` for synced files (especially `FLEET-GITHUB-AUDIT.md`, `SECRETS-ROTATION-RUNBOOK.md`, `VERSION.md` references)
- Find stale paths (`custom-scriptz`, `D:\Hermes\JonBeatz`, old `google-api` names)
- TRUTH vs ReCall vs vault contradictions

### 3. Skeleton & fleet parity
- Run mental `fleet:status` — any profile missing `git:hooks:install`, `sync:skills`, Hermes scaffold?
- Orphan duplicate scripts (`scripts/mem0-chat.ps1`) vs centralized `_core-scripts` paths
- `package.json` / `package-lock.json` pairs that would fail `npm ci`

### 4. Next-Flick product & deploy
- Auth flow: Clerk sync, sign-out, prod redirect origin (`lib/http/request-origin.ts`)
- Drizzle schema: local pg0 `:5433` vs Neon prod — deploy step 0 documented?
- Hostinger: middleware www→apex, process cap 503, build gate (`web:verify-local` pattern)
- Backlog items in `NEXT-FLICK-BACKLOG.md` — any P0 bugs disguised as backlog?
- v7 Better Auth spike: what must be decided before coding?

### 5. `_core-scripts` factory quality
- `bootstrap-new-project.ps1` — complete for 2026 stack?
- `hermes-fleet-sync.ps1` / `sync-docs.ps1` — edge cases, placeholder substitution bugs
- `deepseek-api/` — LiteLLM, ngrok, DISABLE_SCHEMA_UPDATE
- Backup scripts — do they cover apps + boards + pg0?

### 6. Hermes apps
- **Profile Jedi:** registry paths = workspace roots not CLI homes? tray/proxy failure modes
- **TaskBoardAI:** fleet overview API accuracy; boards backup story; upstream fork merge risk

### 7. Things Jon may not have thought of
- **Supply chain:** compromised npm deps, `npx` in scripts without pin
- **Cursor rules conflicts:** overlapping or contradictory `.cursor/rules/*.mdc`
- **UTF-8 / LF:** mojibake risk in docs committed from PowerShell
- **GPU/VRAM:** LM Studio parallel + ComfyUI + local dev simultaneously
- **GitHub:** private repo settings, branch protection, Actions secrets
- **Restore drill:** has anyone tested `BACKUP-RESTORE-SNAPSHOT.md` end-to-end?
- **Observability:** no centralized error tracking on prod Next-Flick
- **Rate limits:** TMDB, Clerk, Hostinger API throttling
- **PWA / offline:** deferred but any half-done code?

## Commands you may suggest Jon run (read-only)

```powershell
cd D:\Hermes\projects\JonBeatz
npm run fleet:status
npm run ecosystem:audit

cd D:\Hermes\projects\Next-Flick
npm run git:secrets-scan:push
npm run deploy:preflight
npm run encoding:check
```

Do not run `deploy:package`, `db:push:prod`, or anything that mutates prod.

## Output format (strict)

### Executive summary
3–5 sentences: overall health grade (A–F), top 3 risks, top 3 quick wins.

### Findings table

| ID | Sev | Area | Repo/Path | Finding | Evidence | Recommended fix | Effort |
|----|-----|------|-----------|---------|----------|-----------------|--------|
| F-001 | P0 | Security | ... | ... | file:line or doc § | ... | S/M/L |

Severity: **P0** = exploit/data loss/prod break · **P1** = fix this week · **P2** = next sprint · **P3** = nice-to-have

### Prioritized todo list (for regular LLM execution)

Numbered list, **max 25 items**, each with:
- **Title** (imperative)
- **Repo/path**
- **Acceptance criteria** (how Jon knows it's done)
- **Suggested agent prompt** (1–2 sentences Jon can paste into Cursor)
- **Do not** include tasks already marked done in ReCall unless verification failed

### Doc updates needed
Bullet list of markdown files to change (path only).

### Deferred / out of scope
What you intentionally did not recommend (e.g. key rotation until Jon says go).

### Open questions for Jon
Max 5 — only blockers needing human decision.

---

**End your response with:**  
`AUDIT COMPLETE — <N> findings (<P0 count> P0, <P1 count> P1) — ready for Cursor handoff`

Focus extra time on: (1) _core-scripts bootstrap + fleet-sync + backup scripts, (2) Next-Flick prod deploy path + auth/DB, (3) secret exposure residual scan across all repos including git log patterns.

# [MASTER PROMPT — END]

---

## Optional follow-up prompts (second message)

After the main audit, paste one of these for a focused second pass:

**Security only:**
> Re-run §1 only. Produce a rotation-ordered checklist with vendor URLs. Assume git history was force-pushed 2026-07-08 but keys may still be valid.

**Next-Flick prod:**
> Audit only Next-Flick for production incidents waiting to happen. Read `middleware.ts`, deploy scripts, Clerk integration, Neon config. No feature ideas — bugs and ops only.

**`_core-scripts` factory:**
> Audit bootstrap + fleet sync + backup scripts. Propose minimal diffs to reduce drift. Windows PowerShell only.

**Dependency CVE:**
> Run `npm audit` mentally per repo from package.json/lockfiles. List exploitable paths to production.

---

## Where to save the model's output

**Primary (required):** `D:\Hermes\projects\Next-Flick\.cursor\plans\2026-07-08-premium-audit.plan.md`  
Update **incrementally** during the audit — not only at the end. Starter template committed in repo.

| Destination | When |
|-------------|------|
| `.cursor/plans/2026-07-08-premium-audit.plan.md` | **Live log** — premium model writes here as it goes |
| `H:\Vader_Vault\03_AI_Memory\Sessions\2026-07-08-premium-audit.md` | Optional human copy at end |
| `npm run draven:add -- "Premium audit: <summary>"` | After complete — runtime recall for agents |
| TaskBoard `:3001` | Paste P0/P1 rows as cards if using fleet kanban |

### Continue in Cursor after premium credits run out

1. Open **this workspace** (Next-Flick) in Cursor Agent / Auto.
2. Say: *"Read `.cursor/plans/2026-07-08-premium-audit.plan.md` and continue the audit from Resume instructions"* **or** *"Execute the prioritized todos in the premium audit plan."*
3. Any model (Composer, Claude, GPT) with file access can pick up — the **plan file** is the handoff artifact, not the premium chat thread.
4. Returning to **this same agent chat** also works; mention the plan path so the agent reads current progress first.

---

## Sync note

Canonical copy: `_core-scripts/shared-profile-content/docs/LLM-Master-Prompt.md`  
Profile copy: `.cursor/docs/LLM-Master-Prompt.md` (after `npm run fleet:sync` or `sync:docs -- -Write`)

*Maintainer: Jon · Refresh after major fleet releases or post-audit learnings*
