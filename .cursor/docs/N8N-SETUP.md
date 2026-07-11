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
| `EXTENDED_HEALTH_PROFILE` | (optional) | Require this Hermes profile in `hermes gateway list` |
| `NGROK_API_URL` | `http://127.0.0.1:4040/api/tunnels` | ngrok inspector |
| `HERMES_EXE` | auto | Path to `hermes.exe` |

### Suggested n8n pattern

1. Schedule every 15–30 min  
2. HTTP GET ngrok `:4040/api/tunnels` (retry on fail)  
3. HTTP GET sidecar `/health/extended`  
4. Merge / Code → if `allUp === false`, Telegram Bot API alert  

### n8n 2.x publish gotcha

PATCH updates the **draft**. Activate with `{ "versionId": "<draft versionId>" }` (or Publish in UI) or scheduled runs keep the old published graph.

## Helper scripts (profile-local)

JonBeatz keeps operator helpers under `scripts/n8n_*.py` that read `N8N_OWNER_PASSWORD` + `MSC_LITELLM_MASTER_KEY` from `.env.local` (never commit passwords).

## Related

- `TROUBLESHOOTING.md` — N8N_LISTEN_ADDRESS + Execute Command blocked  
- `ENV-VARS-REFERENCE.md` — n8n + Extended Health vars  
- Vault gotcha: `n8n-LISTEN-ADDRESS-not-HOST`
