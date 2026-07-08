# End Project — JonBeatz.dev Day-End Closeout

## Trigger

**End Project**, **End Session**, **Session Closeout**, **Personal End**, **Done for today**

> **Not** Close Project / Close Session — those keep the fleet running for workspace switches. **End** = done for the day.

---

## Step 1: Summarize

From conversation + any file changes under **D:\\Hermes\\projects\\JonBeatz.dev**:
- What was accomplished
- What's in progress
- Blockers (if any)

---

## Step 2: Update tracking docs

Append **`.cursor/docs/project-log.md`** and update **`ReCall.md`**.

Optional hub logger (JonBeatz):

```powershell
npm run log:session -- "[short title]: [summary of session]"
```

Update **`HISTORY.md`** (JonBeatz) when milestone-level.

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

## Step 5: Git (AskQuestion — never auto-commit)

If meaningful uncommitted changes, use **`AskQuestion`**:

| Option | Action |
|--------|--------|
| **Commit and push** (recommended when ready) | Stage, commit (why-focused message), push |
| **Commit only** | Commit, no push |
| **Skip git** | Docs/Mem0 only |
| **I'll commit manually** | Operator handles git |

Never commit `.env.local` or secrets.

---

## Step 6: Dev server on :3000 (AskQuestion — if listening)

After `web:verify-local` or `npm run web:dev`, port **3000** often stays up and Cursor warns on quit ("something still running").

**Probe first** (skip this step if port is free):

```powershell
Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue
```

If something is listening, use **`AskQuestion`**:

| Option | Action |
|--------|--------|
| **Stop dev server** (Recommended when quitting Cursor) | `npm run web:dev:stop` when the profile has that script; else free :3000 with PowerShell (stop owning PID only — do **not** run `web:dev:reset`, which wipes `.next` and restarts dev) |
| **Leave running** | No action — dev stays on :3000 for quick return |

**Next-Flick:** `npm run web:dev:stop` — kills :3000 only; no cache wipe, no restart.

---

## Step 7: Stop paid stack (AskQuestion — required)

Use **`AskQuestion`** before `session:stop`:

| Option | Action |
|--------|--------|
| **Stop LiteLLM + ngrok** (Recommended — day done) | `npm run session:stop -- -StopDeepSeek` |
| **Leave DeepSeek running** | `npm run session:stop` (no `-StopDeepSeek`) |

Default recommendation: **Stop** — End Project means billing-safe day off. Hermes switches to local LM Studio via `deepseek:off` when `-StopDeepSeek` runs.

**Voice (before session:stop):**

```powershell
npm run draven:speak -- "Great work Jon. JonBeatz.dev session saved. Until next time."
```

Ritual-only — never read the session summary aloud.

**Optional VRAM free (JonBeatz):**

```powershell
npm run session:stop -- -StopDeepSeek -StopComfy
```

**Default `session:stop` also:** stops OmniVoice daemon when `DRAVEN_OMNI_STOP_ON_END=1`. Does **not** stop LM Studio or Telegram gateway.

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

- **End Project** = **End Session** = same ritual
- Legacy `Personal-End.md` → this file
- `-StopGoogleApi` → same as `-StopDeepSeek` (deprecated alias)
