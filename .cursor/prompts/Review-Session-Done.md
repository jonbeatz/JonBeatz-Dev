# Review Session Done — Closeout Ritual

> **Fleet scope:** Closeout syncs **canonical** `_core-scripts/shared-profile-content` to all profile mirrors. JonBeatz is the usual hub — not the sole owner of tool knowledge. See [FLEET-TOOLS-KNOWLEDGE.md](../docs/FLEET-TOOLS-KNOWLEDGE.md).

## Trigger

Jon says **`review session done`**, **`tools review complete`**, or ends a batch review session.

---

## Phase 1: Confirm session output

Verify this session produced at least one of:

- Grade blocks in chat (single or batch)
- Updates to `_core-scripts/shared-profile-content/docs/TOOLS-*.md` (canonical)
- DESIGN-REFERENCES / HERMES-SHOWCASE-SPEC rows in **shared** docs
- New skills/scripts in `shared-profile-content/skills/` or `scripts/`

If nothing was reviewed, note in chat and skip doc writes.

---

## Phase 2: Sync docs (mirrors)

From **hub** (JonBeatz) or current profile:

```powershell
npm run sync:docs -- -Write
npm run encoding:check
npm run tools:status
```

Confirm edits landed in **shared** `TOOLS-*.md` first — `.cursor/docs` mirrors are downstream.

---

## Phase 2b: Fleet propagate (when skills / rules / prompts / new universal docs)

If this session added or changed **fleet artifacts** (skills, scripts, rules, prompts, `templates/package.json`):

```powershell
# From JonBeatz hub
npm run fleet:sync
npm run fleet:status
```

Skip if session was **docs-only** (grades in TOOLS-* with no new skills/scripts).

---

## Phase 3: Session summary (post in chat)

| Field | Content |
|-------|---------|
| **Reviewed** | Count + list (tool names) |
| **Persisted** | Which hit shared `TOOLS-*` (B-+) |
| **Chat-only** | C+ and below (if any) |
| **Install queue** | ADOPT not installed — pending Jon decision |
| **Design** | DESIGN-REFERENCES / showcase rows added |
| **Fleet** | skills/scripts/rules added to shared skeleton? fleet:sync run? |

---

## Phase 4: Mem0 + vault (if substantive)

```powershell
npm run mem0:add -- "Review session [date]: [count] tools — [one-line highlights] (fleet canonical TOOLS-*)"
npm run draven:add -- "Review session [date]: [highlights]"
```

Append to vault `03_AI_Memory/Sessions/YYYY-MM-DD-<profile>.md` — link to shared TOOLS-WATCHLIST; installs pending/done.

---

## Phase 5: Git (AskQuestion — never auto-commit)

If **`_core-scripts/shared-profile-content`** or profile mirrors changed:

- **Commit + push `_core-scripts` + JonBeatz** (recommended after batch reviews)
- **Commit `_core-scripts` only**
- **Commit current profile only**
- **Skip git**

**Priority:** `_core-scripts` commit is required for fleet knowledge to survive — profile-only commits are insufficient for tool grades.

---

## Do NOT

- Run `session:stop` or End Project gates — this is a **review closeout**, not day-end.
- Install tools without Jon's prior batch/single install approval.
- Persist grades only under JonBeatz `.cursor/docs` without updating shared canonical docs.
