# Telegram Workflow — JonBeatz Command Center

**Last updated:** 2026-06-23 · **Status:** Verified on DeepSeek (2026-06-22)

Single source of truth for iPhone ↔ PC Telegram. Read this before debugging Telegram silence or garbled emoji.

---

## Validated workflow (2026-06-22 — DeepSeek)

| Step | What happens |
|------|----------------|
| iPhone Telegram | Chat with `hermes_vaderlabz_bot` |
| **Prerequisite** | `npm run deepseek:on` — LiteLLM `:4000` must be online |
| Hermes Gateway | Background listener (not Desktop UI) |
| LiteLLM :4000 | Agent brain (`deepseek-v4-pro`) |
| PC tools | Terminal, files, Mem0 — when you ask for agent tasks |
| Hermes Desktop | **Optional** — TELEGRAM sidebar shows session previews |

**Desktop UI is NOT required for Telegram.** Gateway + LiteLLM are.

### Daily ritual (paid cloud / iPhone agent)

| When | Action |
|------|--------|
| Before iPhone agent work | `npm run deepseek:on` or **`D:\Hermes\My-DeepSeek-API.lnk`** |
| PC boot / work session | `npm run session:start` (includes quiet gateway ensure) |
| Gateway closed by accident | Double-click **`D:\Hermes\Start Telegram Gateway.lnk`** |
| Quick health check | `npm run telegram:doctor` |
| LiteLLM down / provider failed | `npm run deepseek:on` then retry (do **not** ask agent to "diagnose" — tool loops can kill `:4000`) |
| Fresh test thread | Send **`/new`** on iPhone before regression messages |
| See recent phone chats on PC | Hermes Desktop **TELEGRAM** sidebar, or `npm run telegram:sessions` |

### Verified test — DeepSeek P2 (2026-06-22)

1. `npm run deepseek:on` + `npm run telegram:doctor` all green  
2. iPhone: **`/new`**  
3. iPhone: **`PONG`** → short reply, session `20260622_024851_e6fb28c6`  
4. Gateway log: `response ready` ~5s, `deepseek-v4-pro` @ `:4000`  
5. `npm run telegram:sessions` shows new thread  

### Verified test — file create (2026-06-21, pre-DeepSeek — still valid pattern)

1. Phone: "do you see my reply?" → agent confirmed connection  
2. Phone: create `hello.md` on Desktop with test text → file created at `%USERPROFILE%\Desktop\hello.md`  
3. Phone: create `hello-deepseek.md` on Desktop — **PASS** (2026-06-22 DeepSeek retest)  
4. Gateway log: `Connected to Telegram (polling mode)`  
5. Session stored: `npm run telegram:sessions`

---

## Legacy note (2026-06-21 Vertex era)

Earlier validation used Vertex via LiteLLM. **Daily driver is now DeepSeek** — same gateway architecture, different yaml on `:4000`.

---

## Architecture (three layers)

| Layer | Tool | Direction | When it runs |
|-------|------|-----------|--------------|
| **Outbound alerts** | `scripts/telegram-notify.mjs` | PC → iPhone | Boot pings, test messages, agent notifications |
| **Two-way chat** | **Hermes Telegram Gateway** | iPhone ↔ PC | `hermes -p <profile> gateway …` — full agent with tools |
| **Fallback relay** | `msc-telegram-bot.mjs --standalone` | iPhone ↔ LiteLLM only | Only when gateway is **off** and Desktop is **off** |

**Never run two pollers on the same bot token.** Hermes gateway + `msc-telegram-bot` together drops messages.

---

## Critical rule: profile `.env` must have Telegram vars

Hermes **profile gateways** read:

`%LOCALAPPDATA%\hermes\profiles\<slug>\.env`

They do **not** inherit global `~/.hermes/.env` alone. If `TELEGRAM_BOT_TOKEN` is missing in the profile `.env`, gateway logs:

`No messaging platforms enabled`

…while outbound `telegram-notify.mjs` still works (reads JonBeatz `.env.local`).

### Default fix (run after any profile create or token change)

```powershell
npm run sync:telegram-env          # sync to jonbeatz + msc + all profiles
npm run telegram:ensure            # sync + start gateway for active profile
npm run telegram:doctor            # audit stack
```

**Source of truth for tokens (edit only this):** `D:\Hermes\projects\JonBeatz\.env.local`  
**Auto-synced to:** `%LOCALAPPDATA%\hermes\profiles\<slug>\.env` + global `%LOCALAPPDATA%\hermes\.env`  

**Do not maintain** a duplicate `.env` in the JonBeatz repo root — older sync runs created one from `profiles.json` workspace paths; gateway reads AppData profile `.env`, not the git folder.

Required keys:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_ALLOWED_USERS` (your Telegram user ID)
- `TELEGRAM_HOME_CHANNEL` (same ID for DM)

---

## Boot sequence (`Master-Startup.ps1`)

Full PC boot — **fast path first** so the Telegram confirmation + Hermes never wait on the slow DeepSeek warm-up:

1. **Telegram gateway** — `Start-Telegram-Gateway.ps1 -SkipLiteLLM -EnsureLoginTask -NoNotify` (sync + register login Scheduled Task)
2. **Early partial ping** — `telegram-notify.mjs --startup --partial` ("warming up", 8× network retry)
3. **Hermes Desktop** — **skipped at PC login** (`-SkipDesktop` in `Master-Startup-Hidden.vbs`). Open manually: `npm run hermes:desktop-ready` when you need off-Cursor browser/desktop control.
4. **DeepSeek + ngrok** — started **in the background** (non-blocking `Start-Process`); a stall here no longer eats the Telegram ping
5. **Full ONLINE ping** — `scripts/boot-ready-notify.ps1` polls `:4000` (up to 120s) then sends the full ONLINE message

**Why two pings:** PC boot fires before LiteLLM is ready and often before the NIC is up. The partial ping confirms boot immediately; the ONLINE ping confirms the paid stack once `:4000` answers.

**Hidden orchestrator:** Startup `Master-Startup.lnk` → **`wscript.exe`** → `Master-Startup-Hidden.vbs` → hidden PowerShell. This hides the orchestrator console even under Windows Terminal (which ignores `-WindowStyle Hidden`). The detached **LiteLLM** window may still appear — expected/wanted.

**Gateway auto-start:** `-EnsureLoginTask` registers the **`Hermes_Gateway_jonbeatz`** Windows Scheduled Task, so the iPhone listener auto-starts on login independent of Master-Startup. Hermes' interactive install prompts are answered non-interactively (piped) so boot never hangs.

Refresh Windows Startup shortcut (hidden VBS launcher):

```powershell
npm run boot:setup
# or: powershell -File D:\Hermes\projects\_core-scripts\create-master-startup-shortcut.ps1
```

**Single boot entry:** Only `Startup\Master-Startup.lnk` (→ wscript + VBS) — **not** `Master-Startup-Relay.vbs` or `Hermes_Gateway_jonbeatz.cmd` in Startup (removed by `boot:setup`; gateway uses scheduled task + Master-Startup PHASE 1).

**Visible debug:** `powershell -File D:\Hermes\projects\_core-scripts\Master-Startup.ps1 -ShowWindows` (also the target of the manual `D:\Hermes\Master-Startup.lnk`).

Params: `-LocalOnly` (no ngrok), `-SkipDesktop` (**default at PC login** via VBS), `-SkipNotify`, `-ShowWindows` (visible windows; omit `-SkipDesktop` to also launch Desktop)

**Session start** (`npm run session:start -- -Full`) — Mem0 + DeepSeek + ngrok + gateway ensure (**Start Project** ritual).

---

## Commands

| Command | Purpose |
|---------|---------|
| `npm run sync:telegram-env` | Push Telegram creds to all Hermes profiles |
| `npm run telegram:ensure` | Sync + start gateway for active profile |
| `npm run telegram:gateway` | Full stack: DeepSeek sync + LiteLLM + Hermes billing mode + sync + gateway + ping — same as **D:\Hermes\Start Telegram Gateway.lnk** |
| `npm run telegram:sessions` | List recent Telegram chat sessions (same data as Desktop TELEGRAM sidebar) |
| `npm run telegram:doctor` | Full audit (creds, gateway, LiteLLM, duplicates) |
| `npm run telegram:test` | Send clean UTF-8 test notification |
| `npm run notify` | Send custom message (`$env:TELEGRAM_MESSAGE`) |

### One-click shortcut (accidental gateway close)

Double-click **`D:\Hermes\Start Telegram Gateway.lnk`** — runs `_core-scripts/telegram-gateway/Start-Telegram-Gateway.ps1`:

1. `sync-deepseek-env` + LiteLLM `:4000` via `deepseek-api` if offline
2. Hermes → `deepseek-v4-pro` @ `:4000` when proxy is up
3. Sync Telegram creds to all profiles
4. Start Hermes gateway for active profile
5. Outbound ping to iPhone

Refresh shortcut after moves:

```powershell
powershell -ExecutionPolicy Bypass -File D:\Hermes\projects\_core-scripts\telegram-gateway\create-telegram-gateway-shortcut.ps1
```

### Manual gateway (active profile)

```powershell
hermes -p jonbeatz gateway status
hermes -p jonbeatz gateway install --no-start-on-login --start-now
hermes -p jonbeatz gateway restart
```

---

## Timezone (California / Pacific)

Boot verification pings and Hermes agent context use **Pacific time**, not East Coast.

| Layer | Setting | Default |
|-------|---------|---------|
| Boot ping (`telegram-notify --startup`) | `TELEGRAM_TIMEZONE` in JonBeatz `.env.local` | `America/Los_Angeles` |
| Hermes agent + gateway | `timezone:` in profile `config.yaml` | Synced by `npm run sync:telegram-env` |

```env
# JonBeatz .env.local
TELEGRAM_TIMEZONE=America/Los_Angeles
```

After change: `npm run sync:telegram-env` then `hermes -p jonbeatz gateway restart` (picks up `config.yaml`).

Test ping: `npm run telegram:test` — time line shows `PDT`/`PST` and timezone name.

---

## Common failures

| Symptom | Cause | Fix |
|---------|-------|-----|
| Get messages, can't reply | Gateway not running | `npm run telegram:ensure` |
| Gateway up, still silent | Profile `.env` missing `TELEGRAM_*` | `npm run sync:telegram-env` then restart gateway |
| Garbled emoji `ðŸ°` | Emoji passed via PowerShell argv | Use `--startup` or `TELEGRAM_MESSAGE` env var |
| Weird `**n**` in replies | Markdown on AI text | Fixed: AI replies use plain text |
| Proxy errors | LiteLLM `:4000` down | `npm run deepseek:on` (the legacy `google-api` stack is retired) |
| "Model provider failed after retries" | LiteLLM offline mid-session | `npm run deepseek:on`; avoid "diagnose" prompts that run terminal tool loops |
| Wrong / stale reply content | Old Telegram session history | Send **`/new`** before test messages |
| Gateway shutdown mid-chat | `deepseek:on` recycled proxy (fixed) | Now uses `--keep-gateway`; gateway stays up |
| Random missed messages | Two pollers same token | Stop `msc-telegram-bot` when gateway runs |

---

## Profiles

| Profile | Hermes path | Telegram |
|---------|-------------|----------|
| **jonbeatz** | `%LOCALAPPDATA%\hermes\profiles\jonbeatz` | Primary iPhone chat |
| **msc** | `%LOCALAPPDATA%\hermes\profiles\msc` | Same bot creds synced; start gateway only if that profile is active |

Active profile: `%APPDATA%\Hermes\active-profile.json`

---

## Log locations

| Log | Path |
|-----|------|
| Gateway (jonbeatz) | `%LOCALAPPDATA%\hermes\profiles\jonbeatz\logs\gateway.log` |
| Hermes agent | `%LOCALAPPDATA%\hermes\logs\agent.log` |

Look for: `Connected to Telegram (polling mode)` or `No messaging platforms enabled`.

---

## Related files

| Path | Role |
|------|------|
| `scripts/sync-telegram-env.mjs` | Sync creds to all profile `.env` |
| `scripts/telegram-notify.mjs` | Outbound UTF-8-safe pings |
| `scripts/telegram-ensure-gateway.ps1` | Sync + start gateway (session start) |
| `scripts/telegram-sessions.ps1` | List Telegram sessions on PC |
| `scripts/telegram-doctor.ps1` | Full stack audit |
| `_core-scripts/telegram-gateway/Start-Telegram-Gateway.ps1` | One-click reconnect |
| `D:\Hermes\Start Telegram Gateway.lnk` | Shortcut in Hermes folder |
| `_core-scripts/Master-Startup.ps1` | PC boot: Telegram gateway + LiteLLM + ngrok (`-SkipDesktop` default; Desktop on demand) |
| `D:\Hermes\My-DeepSeek-API.lnk` | Paid cloud only (no Desktop/Telegram orchestration) |

**Best practices:** Telegram text via Node only (never PowerShell argv emoji). Creds in `.env.local`, synced via `sync-telegram-env.mjs`. One poller per bot token.
