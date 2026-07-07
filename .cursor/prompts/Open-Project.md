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

| Mode | Command | When |
|------|---------|------|
| **Open Project** | `npm run session:open` | Switching into this workspace |
| **Start Project** | `npm run session:start -- -Full` | Cold boot / first PC session / stack down |
| **Add ngrok only** | `npm run deepseek:ngrok` | LiteLLM up but Agent needs HTTPS |

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
