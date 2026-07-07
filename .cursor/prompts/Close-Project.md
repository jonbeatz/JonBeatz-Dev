# Close Project — Workspace Switch (keep fleet running)

## Trigger

**Close Project**, **Close Session**, **Switch Project**

> **Not** End Project / End Session — those stop the day. **Close** = done in *this* Cursor folder; opening another Hermes project next.

---

## Step 1: Summarize (handoff focus)

From conversation + file changes under **D:\\Hermes\\projects\\JonBeatz.dev**:
- What was accomplished
- What's in progress (explicit next step for *this* repo)
- Blockers (if any)

Keep it shorter than End Project — optimized for the next agent in this folder or you returning later.

---

## Step 2: Update tracking docs

Append **`.cursor/docs/project-log.md`** and update **`ReCall.md`**.

Include in ReCall **tomorrow start** / **next open**:
- `**Fleet:** left running (LiteLLM :4000, ngrok :4040, LM Studio :1234) — use Open Project in next workspace.`

Optional hub logger (JonBeatz only):

```powershell
npm run log:session -- "[short title]: [handoff summary]"
```

---

## Step 3: Mem0 + vault

If substantive:

```powershell
npm run mem0:preflight
npm run mem0:add -- "Handoff [date]: [one-line takeaway]"
```

Skip Mem0 if LM Studio offline — note in project-log.

```powershell
npm run session:handoff -- -Summary "Handoff [date]: [one-line summary]"
```

Or: `npm run vault:log -- -Summary "..."` (same vault note; handoff script is preferred).

Update `H:\Vader_Vault\01_Projects\JonBeatz.dev.md` hub if decisions changed. See `.cursor/rules/vader-vault.mdc`.

---

## Step 4: MGR handoff (if repo has `MGR/`)

Per `.cursor/rules/mgr-handoff.mdc`:
1. Overwrite `MGR/sessions/handoff.md` (`tool: cursor`)
2. Append to `MGR/sessions/latest.md`
3. Ensure pending tasks in `MGR/tasks.json` have `context` blurbs

---

## Step 5: Git (AskQuestion — never auto-commit)

If the working tree has meaningful changes, use **`AskQuestion`**:

| Option | Action |
|--------|--------|
| **Commit and push** (recommended when ready) | Stage relevant files, commit with why-focused message, push current branch |
| **Commit only** | Commit, do not push |
| **Skip git** | Docs/Mem0 handoff only |
| **I'll commit manually** | Stop — operator handles git |

**Never** commit secrets (`.env.local`, keys). **Never** commit without operator selection.

---

## Step 6: Do NOT run

| Skip | Reason |
|------|--------|
| `npm run session:stop` | Would stop OmniVoice on End policy; may confuse day-end |
| `npm run draven:speak` | Close is silent — voice is **End Project** only |
| `-StopDeepSeek` | Paid stack stays hot for next workspace |

---

## Step 7: Farewell (chat only)

```
JonBeatz.dev handoff saved — fleet still running.

Done this visit:
  • ...

When you return here:
  • ...

Open another project with **Open Project** / **Resume Session**, or say **End Project** when done for the day.
```

---

## Aliases

- **Close Project** = **Close Session** = same ritual
- Legacy `Personal-End.md` → use **End-Project.md** for day-end, not this file
