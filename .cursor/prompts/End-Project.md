# End Project — JonBeatz.dev Day-End Closeout

## Trigger

**End Project**, **End Session**, **Session Closeout**, **Personal End**, **Done for today**

> **Not** Close Project / Close Session — those keep the fleet running for workspace switches. **End** = done for the day.

### Shortcut: **End Project full**

When Jon says **End Project full**, **End Session full**, or **Full end**:

- Run the normal End Project steps (ReCall, project-log, Mem0/vault when substantive, farewell speak).
- **Skip all AskQuestion gates** — treat selections as already chosen:
  | Gate | Auto action |
  |------|-------------|
  | Git (if dirty, meaningful) | **Commit + push** (why-focused message; never `.env*` / secrets) |
  | Git clean | Skip |
  | `:3000` listening | **Stop** owning dev process |
  | `:3000` free | Skip |
  | LiteLLM + ngrok | **Stop** — `npm run session:stop -- -StopDeepSeek` |
- Still do **not** stop Telegram gateway or LM Studio unless Jon separately asks.
- Still run `draven:speak` once (Edge Liam) before `session:stop`.

Plain **End Project** (without **full**) keeps the clickable AskQuestion gates below.

---

## Hard UI rule (clickable choices)

For **every** operator choice in this ritual **except End Project full**, call the Cursor **`AskQuestion` tool** so options render as **clickable buttons** in the Agent window.

**Do NOT** ask for typed answers such as:
- "Reply **1** or **2**"
- "Type stop / leave"
- Numbered markdown lists as the only choice UI

**One `AskQuestion` per assistant turn.** Wait for the selection before the next gate.

### AskQuestion shape (required)

```json
{
  "title": "End Project — Stop paid stack",
  "questions": [
    {
      "id": "stop_stack",
      "prompt": "Stop LiteLLM + ngrok for the day? (recommended)",
      "options": [
        { "id": "stop_deepseek", "label": "Stop LiteLLM + ngrok (recommended)" },
        { "id": "leave_deepseek", "label": "Leave DeepSeek running" }
      ]
    }
  ]
}
```

If `AskQuestion` is truly unavailable in the tool list, say so once, then ask the **same labeled options in prose** (still no "Reply 1/2"). Prefer retrying `AskQuestion` on the next turn.

---

## Step 1: Summarize

From conversation + any file changes under **{PROJECT_ROOT}**:
- What was accomplished
- What's in progress
- Blockers (if any)

---

## Step 2: Update tracking docs

Append **`.cursor/docs/project-log.md`** and update **`ReCall.md`**.

Optional hub logger (JonBeatz.dev):

```powershell
npm run log:session -- "[short title]: [summary of session]"
```

Update **`HISTORY.md`** (JonBeatz.dev) when milestone-level.

---

## Step 3: Mem0 + Obsidian vault

If substantive:

```powershell
npm run mem0:preflight
npm run mem0:add -- "Session [date]: [one-line takeaway]"
```

Skip if LM Studio offline — note in project-log.

```powershell
npm run vault:log -- -Summary "Session [date]: [one-line summary]"
```

Update `H:\Vader_Vault\01_Projects/JonBeatz.dev.md` hub if decisions/learnings changed. See `.cursor/rules/vader-vault.mdc`.

---

## Step 4: MGR handoff (if repo has `MGR/`)

Per `.cursor/rules/mgr-handoff.mdc` — overwrite `MGR/sessions/handoff.md`, append `latest.md`, task context in `tasks.json`.

---

## Step 5: Git (`AskQuestion` — never auto-commit)

If meaningful uncommitted changes, call **`AskQuestion`**:

| Option id | Label | Action |
|-----------|--------|--------|
| `commit_push` | Commit and push (recommended) | Stage, commit (why-focused), push |
| `commit_only` | Commit only | Commit, no push |
| `skip_git` | Skip git | Docs/Mem0 only |
| `manual_git` | I'll commit manually | Operator handles git |

If the tree is clean (or only junk like `.vault-sync-last`), **skip this AskQuestion** and note "git clean".

Never commit `.env.local` or secrets.

---

## Step 6: Dev server on :3000 (`AskQuestion` — if listening)

Probe first (skip if free):

```powershell
Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue
```

If listening, call **`AskQuestion`**:

| Option id | Label | Action |
|-----------|--------|--------|
| `stop_dev` | Stop dev server (recommended when quitting Cursor) | `npm run web:dev:stop` if present; else stop owning PID only — never `web:dev:reset` |
| `leave_dev` | Leave :3000 running | No action |

---

## Step 7: Stop paid stack (`AskQuestion` — required)

Always call **`AskQuestion`** before `session:stop` (even when recommending stop):

| Option id | Label | Action |
|-----------|--------|--------|
| `stop_deepseek` | Stop LiteLLM + ngrok (recommended) | `npm run session:stop -- -StopDeepSeek` |
| `leave_deepseek` | Leave DeepSeek running | `npm run session:stop` (no `-StopDeepSeek`) |

Default recommendation: **stop** — billing-safe day off. Hermes switches to local LM Studio via `deepseek:off` when `-StopDeepSeek` runs.

**Voice (before session:stop):**

```powershell
npm run draven:speak -- "Great work Jon. JonBeatz.dev session saved. Until next time."
```

Ritual-only — never read the session summary aloud.

**Optional VRAM free:**

```powershell
npm run session:stop -- -StopDeepSeek -StopComfy
```

**Default `session:stop` also:** stops OmniVoice daemon when `DRAVEN_OMNI_STOP_ON_END=1`; sweeps Hermes `cua-driver` (prevents grey overlay leak). Does **not** stop LM Studio or Telegram gateway. **Prevention:** `npm run cua:overlay:harden` (re-run after cua-driver update). If a stuck grey box remains, run `npm run cua:cleanup:reset` (~1s flicker).

---

## Step 8: Farewell

```
Great work Jon — JonBeatz.dev session saved.

Done today:
  • ...

Next session:
  • ...

Say **Open Project** or **Start Project** when you return.
```

---

## Aliases

- **End Project** = **End Session** = same ritual (AskQuestion gates)
- **End Project full** / **End Session full** / **Full end** = same ritual with **no AskQuestion** — auto commit+push (if dirty), stop `:3000` if up, `session:stop -- -StopDeepSeek`
- Legacy `Personal-End.md` → this file
- `-StopGoogleApi` → same as `-StopDeepSeek` (deprecated alias)

