---
name: session-handoff-restore
description: Unified closeout + checkpoint workflow with clean handoff notes and restore discipline.
---

# Session Handoff + Restore (Canonical)

Use this skill when ending a work block, preparing handoff context, or creating a rollback checkpoint.

## Authority

1. `package.json` is command truth.
2. Project docs map is docs-map truth.

## Closeout checklist

1. Summarize working tree changes by theme.
2. Update session snapshots doc with:
   - what changed,
   - where it changed,
   - what was verified,
   - exact start-next steps.
3. If milestone-level changes landed, add a row to restore points doc.
4. Ask for explicit confirmation before commit/push/deploy.
5. Commit and push only when requested.

## Restore-point template

`| RP-YYYY-MM-DD-short-name | YYYY-MM-DD | What worked. Branch/commit: <branch>@<sha>. Restore: <exact commands>. Caveats: <env/deps>. |`

## Branch-cut mini-flow

1. Confirm clean/intentional tree state.
2. Create branch from current HEAD.
3. Push upstream.
4. Record branch and checkpoint context in docs.
