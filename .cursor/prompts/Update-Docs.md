# Update Docs — JONBEATZ.DEV

**Triggers:** `update docs`, `Update Docs`, `sync docs`
**With Mem0:** `update docs and mem0` (adds Phase 4b)

---

## Phase 1: Scan

Read and cross-check:

| Path | Purpose |
|------|---------|
| `TRUTH.md` | Version, project root, source-of-truth order |
| `package.json` | Version + scripts match docs |
| `README.md` | Badges, screenshots, quick start |
| `.cursor/docs/START-HERE.md` | Doc order, rituals |
| `.cursor/docs/MASTER-COMMANDS.md` | All npm scripts listed |
| `.cursor/docs/ReCall.md` | Current focus |
| `.cursor/docs/JONBEATZ-DEV-DEPLOY.md` | Deploy runbook |
| `.cursor/rules/*.mdc` | Workflow / voice / mem0 rules |
| `AGENTS.md`, `.cursorrules` | Entry points |

---

## Phase 2: Fix drift

1. Sync **version** across `package.json`, `TRUTH.md`, `MASTER-COMMANDS.md`, `README.md`.
2. Run **`npm run version:sync`** — README shields (repo slug `JonBeatz-Dev`); UTF-8 safe.
3. Run **`npm run encoding:check`** — fail fast on mojibake in `.md` / `.mdc`.
4. Ensure new npm scripts appear in **MASTER-COMMANDS.md**.
5. Fix broken internal links.

---

## Phase 3: Run auditor

```powershell
npm run encoding:check
npm run docs:sync
```

Fix any alignment warnings (project root, TRUTH link, version, mojibake).

---

## Phase 4: Report

Summarize: files updated, version line, remaining drift.
End with: **"Ready to commit when you say so."**

## Phase 4b (only if `update docs and mem0`)

```powershell
npm run mem0:preflight
npm run mem0:add -- "Docs sync [date]: [one-line summary]"
```

Skip if LM Studio offline — note it in `project-log.md`.

---

## Do NOT

- Pull in personal-profile docs (DeepSeek, Telegram, ComfyUI, image-gen, Google).
- Auto-commit unless Jon asks.
