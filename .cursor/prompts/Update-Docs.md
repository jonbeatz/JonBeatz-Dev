# Update Docs — Hermes Fleet + Profile

**Triggers:** `update docs`, `Update Docs`, `sync docs`

**With Mem0:** `update docs and mem0` (includes Phase 5b)

> **Fleet first:** Universal docs and **all tool reviews** live in `_core-scripts/shared-profile-content/docs/`. Edit canonical files there, then `npm run docs:sync`. JonBeatz is often the open workspace — not the source of truth. See [FLEET-TOOLS-KNOWLEDGE.md](../docs/FLEET-TOOLS-KNOWLEDGE.md).

---

## Phase 0: Canonical vs profile-local

| Edit here first (fleet) | Edit in profile only |
|-------------------------|----------------------|
| `shared-profile-content/docs/TOOLS-*.md` | `TRUTH.md`, `ReCall.md`, `project-log.md` |
| `TOOL-CHEST-INDEX`, `DESIGN-REFERENCES`, `MASTER-COMMANDS` (shared) | `CHANGELOG.md`, `Checkpoint.md` |
| `shared-profile-content/skills/`, `scripts/`, `rules/`, `prompts/` | Site deploy runbooks, profile-specific plans |

After shared edits: `npm run docs:sync -- -Write` from current profile.  
After skills/scripts/rules: `npm run fleet:sync` from **JonBeatz hub**.

---

## Phase 1: Scan

Read and cross-check:

| Path | Purpose |
|------|---------|
| `TRUTH.md` | Version, profile root, source-of-truth order |
| `package.json` | Version matches TRUTH |
| `.cursor/docs/START-HERE.md` | Doc order, rituals |
| `.cursor/docs/MASTER-COMMANDS.md` | All npm scripts listed |
| `.cursor/docs/Custom-Prompts.md` | Chat triggers (project-specific — may not exist in all projects) |
| `.cursor/docs/CHANGELOG.md` | Recent releases (project-specific — may not exist) |
| `.cursor/docs/Checkpoint.md` | Milestones (project-specific — may not exist) |
| `.cursor/docs/ReCall.md` | Current focus |
| `.cursor/docs/FITNESS-CHECK.md` | Skeleton fitness audit (if project has it) |
| `.cursor/docs/IMAGE-WORKFLOW.md` | Image pipeline |
| `.cursor/docs/GOOGLE-WORKSPACE.md` | Google automation (project-specific — may not exist) |
| `.cursor/rules/*.mdc` | Workflow rules |
| `AGENTS.md`, `README.md`, `HERMES.md` | Entry points |

---

## Phase 2: Fix drift

1. Sync **version** across `package.json`, `TRUTH.md`, `MASTER-COMMANDS.md`, `CHANGELOG.md`
2. Run **`npm run version:sync`** — README shields + badge repo slug (`JonBeatz-Command-Center`); Python UTF-8 safe
3. Run **`npm run encoding:check`** — fail fast on mojibake in `.md` / `.mdc` before any doc commit
4. Ensure new npm scripts appear in **MASTER-COMMANDS** + **Custom-Prompts**
5. Fix broken internal links
6. Update **Checkpoint.md** if milestone shipped

### Phase 2b — GitHub tag + release (version milestone)

When Jon bumps version (e.g. v2 → v3 on a new branch):

```powershell
npm run version:sync
npm run docs:sync
# commit + push branch
npm run release          # tag vX.Y.Z + GitHub release --latest
```

See **`.cursor/docs/VERSION-RELEASE.md`** for full checklist.

---

## Phase 3: Run auditor

```powershell
npm run encoding:check
npm run docs:sync
```

Fix any alignment warnings (profile root, TRUTH link, version, UTF-8 mojibake).

---

## Phase 4: ISSUES-RESOLVED

If this session fixed a bug, append to `.cursor/docs/ISSUES-RESOLVED.md` or run:

```powershell
npm run log:fix
```

---

## Phase 5: Report

Print summary:

- Files updated
- Version line
- Any remaining drift

End with: **"Ready to commit when you say so."**

---

## Phase 5b (only if `update docs and mem0`)

```powershell
npm run mem0:preflight
npm run mem0:add -- "Docs sync [date]: [one-line summary of doc changes]"
# Also update Draven's cross-session memory
npm run draven:add -- "Docs sync [date]: [one-line summary of doc changes]"
```

This updates **both** the project's own memory and Draven's cross-session memory. Draven stores it so he has context of what was synced across sessions. Skip if LM Studio offline — note in project-log.

Also triggers **Phase 6** — skeleton backport review.

---

## Phase 6 — Skeleton backport review (check after significant work)

During `update docs and mem0`, also check if anything created this session belongs in the shared skeleton:

1. Read `D:\Hermes\projects\_core-scripts\shared-profile-content\docs\FITNESS-CHECK.md` — this lists everything the skeleton provides
2. Compare with what the current project has — note any gaps
3. Open `D:\Hermes\projects\_core-scripts\shared-profile-content\docs\BACKPORT-CANDIDATES.md`
4. Log any candidates: new scripts, rules, skills, prompts, env vars, or fixes that are project-agnostic
3. If found, ask Jon: **"I noticed X is worth backporting to the shared skeleton. Shall I do that?"**
4. If yes, follow `CONTRIBUTING.md` workflow: copy → strip paths → update indexes → bump version → commit

**Examples of backport-worthy:**
- New `.ps1` / `.py` / `.mjs` script that other projects could use
- Bug fix in a shared script (`mem0-chat.ps1`, `bootstrap-new-project.ps1`, etc.)
- New rule/skill that is project-agnostic (like Draven Mem0, Hostinger-Ops)
- New env var worth documenting in `ENV-VARS-REFERENCE.md`

---

## Do NOT

- Apply MSC Hostinger/deploy doc changes unless Jon opened MSC repo
- Auto-commit unless Jon asks
