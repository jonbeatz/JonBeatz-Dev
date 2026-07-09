# Open Project — Resume workspace (fleet already running)

## Trigger

**Open Project**, **Resume Session**

> **Not** Start Project / Cold Start — those boot the full paid stack. **Open** = switch into this folder while LiteLLM/ngrok may already be up from another Hermes project.

---

## Step 1: Light probes (no stack restart)

From **JonBeatz.dev** profile root:

```powershell
npm run session:open
```

Equivalent: `npm run session:start` (no `-Full`) — Mem0 preflight + port probes only. **Skips** DeepSeek/ngrok restart if already warm.

**Hermes active profile:** `session:open` prints a **yellow line** if fleet active ≠ `hermes-desktop-profile.json` in this repo. When mismatched, use **AskQuestion** then:

```powershell
npm run profile:align        # set-active only — no Hermes relaunch (Open Project default)
npm run profile:align:full   # full switch + Hermes Desktop launch (Start Project optional)
npm run profile:align:check  # probe for agents
```

| Mode | Command | When |
|------|---------|------|
| **Open Project** | `npm run session:open` | Switching into this workspace |
| **Align (light)** | `npm run profile:align` | After operator confirms mismatch on Open |
| **Start Project** | `npm run session:start -- -Full` | Cold boot / first PC session / stack down |
| **Align (full)** | `npm run profile:align:full` | Cold boot — optional after `-Full` |
| **Add ngrok only** | `npm run deepseek:ngrok` | LiteLLM up but Agent needs HTTPS |

---

## Step 1.5: Hermes active profile (if mismatch reported)

If Step 1 printed **Hermes active mismatch**, ask the operator:

- **Align (recommended for Open)** → `npm run profile:align` — updates AppData + CLI sync, **does not** relaunch Hermes Desktop.
- **Skip** — continue; Mem0 in Cursor still uses this repo’s `.env.local`.

Do **not** auto-run align without confirmation.

---

## Step 2: Mandatory reads (Read tool — do not skip)

1. **`TRUTH.md`**
2. **`.cursor/docs/START-HERE.md`**
3. **`.cursor/docs/ReCall.md`** — focus **tomorrow start** / last handoff
4. **`.cursor/docs/project-log.md`** (tail)

Profile-specific docs as listed in **`AGENTS.md`** (e.g. NEXT-FLICK-FEATURES.md for Next-Flick).

---

## Step 3: Mem0 recall

```powershell
npm run mem0:preflight
npm run mem0:search -- "current priorities"
```

If LM Studio offline → use **ReCall.md** only; alert operator once.

---

## Step 4: Status card (print in chat)

```
Ok Jon — JonBeatz.dev workspace open.

SERVICE STATUS (probes only — stack not restarted)
  LM Studio (1234)        [online/offline]
  DeepSeek LiteLLM (4000) [online/offline]
  ngrok (4040)            [online/offline]
  Web dev (3000)          [online/offline]  — not auto-started

HERMES ACTIVE
  workspace slug          jonbeatz-dev (from hermes-desktop-profile.json)
  fleet active            [aligned / mismatch → offer profile:align]

RECALL FOCUS
  - [from ReCall.md]
  - [from Mem0 if available]

What's the mission?
```

---

## Step 5: Voice

**Do NOT** run `draven:speak` on Open/Resume — voice is **Start Project** (cold boot) and **End Project** (day-end) only.

If stack is offline and operator clearly wanted cold boot, suggest: *"Say **Start Project** to bring up DeepSeek + ngrok."*

---

## Aliases

- **Open Project** = **Resume Session**
- Legacy `Personal-Start.md` → **Start-Project.md** for cold boot; this file for resume
