# N8N-SETUP — Local n8n for Hermes profiles

**Shared library:** `shared-profile-content` · see `VERSION.md`

## Bind localhost only (required)

On n8n v2 the default listen address is `::` (all interfaces).  
**`N8N_HOST` alone does not bind the socket.**

Set both:

```env
N8N_HOST=127.0.0.1
N8N_LISTEN_ADDRESS=127.0.0.1
N8N_PORT=5678
WEBHOOK_URL=http://127.0.0.1:5678/
```

Optional defense in depth: Windows Firewall Allow `127.0.0.1` + Block remote inbound on TCP **5678**.

## Hermes n8n MCP (overseer inspect)

**App:** `D:\Hermes\apps\hermes-n8n-mcp` (Windows venv)  
**Hermes profile config:** `jonbeatz` → `mcp_servers.n8n` (read-mostly tools)  
**Env file:** `%USERPROFILE%\.config\n8n-mcp\env`

```powershell
# After creating an API key in n8n Settings → n8n API:
npm run n8n:mcp:set-key -- "YOUR_KEY"
npm run n8n:mcp:test
```

Then `/reload-mcp` in Hermes Desktop (or start a fresh session).


## Extended Health sidecar (n8n CE)

Community Edition **rejects** `n8n-nodes-base.executeCommand`.  
For process / disk / ngrok checks, run the localhost sidecar and probe it from n8n HTTP nodes.

| Item | Value |
|------|--------|
| Script | `shared-profile-content/scripts/extended-health-sidecar.py` |
| Launcher | `shared-profile-content/scripts/start-extended-health.bat` |
| Default URL | `http://127.0.0.1:5699/health/extended` |
| Bind | `127.0.0.1` only |

### Env overrides

| Variable | Default | Purpose |
|----------|---------|---------|
| `EXTENDED_HEALTH_HOST` | `127.0.0.1` | Listen host |
| `EXTENDED_HEALTH_PORT` | `5699` | Listen port |
| `EXTENDED_HEALTH_DISK` | `D` | Drive letter to check |
| `EXTENDED_HEALTH_DISK_MIN` | `10` | Fail if free % ≤ this |
| `EXTENDED_HEALTH_PROFILE` | (optional) | Profile folder to read `gateway.pid` from (default jonbeatz) |
| `NGROK_API_URL` | `http://127.0.0.1:4040/api/tunnels` | ngrok inspector |
| `HERMES_EXE` | auto | unused — sidecar reads `gateway.pid` (do not spawn `hermes.exe`) |
| `EXTENDED_HEALTH_PYTHON` | auto (system) | **Must not** be Hermes venv Python — locks `.pyd` files and blocks `hermes update` on Windows |

### Launcher Python (Windows)

`start-extended-health.bat` resolves Python in this order:

1. `EXTENDED_HEALTH_PYTHON` (if set)
2. `py -3.12` / `py -3` launcher
3. `%LocalAppData%\Programs\Python\Python312\python.exe` (or 311)
4. First `python` on PATH **excluding** `%LOCALAPPDATA%\hermes\hermes-agent\venv`

It **refuses** to start if the only match is Hermes venv Python.

Starts with **`pythonw.exe`** (no console window). Skip-if-already-listening on `:5699`. Sidecar is started by `start-n8n.bat` when n8n boots — not needed when n8n is off.

Each `/health/extended` probe used to spawn **PowerShell** (disk) + **`hermes.exe gateway list`** (gateway). Those are both console processes — **two black windows every 30 min** (`:00` / `:30`). Sidecar now uses `shutil.disk_usage` + `gateway.pid` / heartbeat files only.

### Suggested n8n pattern

1. Schedule every 15–30 min  
2. HTTP GET ngrok `:4040/api/tunnels` (retry on fail)  
3. HTTP GET sidecar `/health/extended`  
4. Merge / Code → if `allUp === false`, Telegram Bot API alert  

### n8n 2.x publish gotcha

PATCH updates the **draft**. Activate with `{ "versionId": "<draft versionId>" }` (or Publish in UI) or scheduled runs keep the old published graph.

## Helper scripts (profile-local)

JonBeatz keeps operator helpers under `scripts/n8n_*.py` that read `N8N_OWNER_PASSWORD` + `MSC_LITELLM_MASTER_KEY` from `.env.local` (never commit passwords).

Use owner-login scripts (not the read-only Hermes MCP key) when you need to **PATCH / activate** workflows. Playwright against the UI without an `n8n-auth` session cookie will show the editor but **autosave Unauthorized**.

### Health workflows (JonBeatz)

| Workflow | ID | Schedule | Notes |
|----------|-----|----------|-------|
| Fleet Health | `KKJcMp41pLxcstgM` | every 15 min | Status only (no Telegram spam) |
| Daily Health Briefing | `gTbp2sfYjxCPTVFz` | 8 AM | Nodes: `Check DeepSeek` / `Check n8n` / `Check LM Studio` |
| Weekly Health Report | `lDlivEqEG1k0Qtez` | Mon 9 AM | Nodes: `DeepSeek` / `n8n` / `LM Studio` — Build Report fixed 2026-08-04 (`const text = ;` was the bug) |
| Extended Health | (sidecar) | ~30 min | Probes `:5699` — see above |
| n8n Health Watchdog | Windows task `JonBeatz_n8n_Health_Watchdog` | every 15 min | Hidden `wscript` + **real GUI** `pythonw` (never `venv\Scripts\pythonw.exe`). Hermes cron job `5b5f5dd604b6` is **paused** — do not resume it or the black windows return. Re-register: `npm run n8n:watchdog:hidden`. Failures append to `%LOCALAPPDATA%\hermes\profiles\jonbeatz\cron\output\n8n-health-watchdog.log`. |
| Profile Health Watchdog | Windows task `JonBeatz_Profile_Health_Watchdog` | 00/06/12/18 | Hidden `wscript` + **real GUI** `pythonw` (never venv Scripts stub). Hermes cron `56769cb1e0f3` is **paused**. Re-register: `npm run watchdogs:hidden`. Failures: `cron/output/profile-health-watchdog.log`. |
| Memory Auto-Archive Watchdog | Windows task `JonBeatz_Memory_Archive_Watchdog` | 06:00 / 18:00 | Hidden `wscript` + **real GUI** `pythonw` (never venv Scripts stub). Hermes cron `8907fe6a7096` is **paused**. Re-register: `npm run watchdogs:hidden`. Failures: `cron/output/memory-archive-watchdog.log`. |
| Vault Sync → Mem0 | Windows task `JonBeatz_Vault_Sync_Mem0` | 10:00 daily | Hidden `wscript` + **real GUI** `pythonw` (uv home or Python 3.12) with venv env overlay. **Never** `venv\Scripts\pythonw.exe` (uv CUI stub, two flashes). Hermes cron `9d9d73b21b0a` is **paused**. After editing `vault-sync-pure.py` run `npm run vault:sync:install` then `npm run watchdogs:hidden`. Log: `cron/output/vault-sync-pure.log`. |
| Mem0 Weekly Backup | Windows task `JonBeatz_Mem0_Weekly_Backup` | Sunday 03:00 | Hidden `wscript` + `pythonw` (PowerShell child has `CREATE_NO_WINDOW`). Hermes cron `14475eaf0f68` is **paused**. Log: `cron/output/mem0-backup-runner.log`. |
| Mnemosyne Weekly Sleep | Windows task `JonBeatz-Mnemosyne-Weekly-Sleep` | Sunday 04:30 | Hidden `wscript` + PowerShell (was `powershell.exe -WindowStyle Hidden`, which still flashes under Windows Terminal). |

Rebuild helpers: `scripts/n8n-rebuild-health-workflows.py` · one-off weekly fix: `scripts/_scratch/fix-weekly-build-report.py`.

## Related

- `TROUBLESHOOTING.md` — N8N_LISTEN_ADDRESS + Execute Command blocked  
- `ENV-VARS-REFERENCE.md` — n8n + Extended Health vars  
- Vault gotcha: `n8n-LISTEN-ADDRESS-not-HOST`
