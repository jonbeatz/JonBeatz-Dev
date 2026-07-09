# Infrastructure & Environment

## --- Source: GOOGLE-WORKSPACE.md ---

# GOOGLE-WORKSPACE.md — JonBeatz Personal Google Automation

**Account:** jonbeatz@gmail.com  
**Token:** `%LOCALAPPDATA%\hermes\google_token.json` (shared Hermes OAuth)  
**API stack:** LiteLLM `:4000` + ngrok `:4040` (optional, `npm run deepseek:on`)

---

## Quick commands (JonBeatz profile root)

| Command | Purpose |
|---------|---------|
| `npm run google:doctor` | Token + LiteLLM + setup.py --check |
| `npm run google:status` | JSON status for agents |
| `npm run deepseek:on` | Start DeepSeek / LiteLLM stack |
| `npm run stop` | Stop Google API stack |

---

## Hermes google-workspace skill

| Item | Path |
|------|------|
| Skill | `%LOCALAPPDATA%\hermes\skills\productivity\google-workspace\` |
| Setup | `...\scripts\setup.py` |
| Client secret | `%LOCALAPPDATA%\hermes\google_client_secret.json` |
| GCP project | `wordpress-map-1492461083797` |

**Check auth:**

```powershell
python "$env:LOCALAPPDATA\hermes\skills\productivity\google-workspace\scripts\setup.py" --check
```

Expected: `AUTHENTICATED`

**Re-auth (missing Drive / Docs scopes):**

```powershell
python "$env:LOCALAPPDATA\hermes\skills\productivity\google-workspace\scripts\setup.py" --auth-url
# Open printed URL → Allow → copy full redirect URL from address bar (ERR_UNSAFE_PORT is OK)
python "$env:LOCALAPPDATA\hermes\skills\productivity\google-workspace\scripts\setup.py" --auth-code "FULL_REDIRECT_URL"
python "$env:LOCALAPPDATA\hermes\skills\productivity\google-workspace\scripts\setup.py" --check
```

Required scopes: `gmail.modify`, `calendar`, `documents`, `drive` (included in setup.py `SCOPES`).

---

## OAuth gotcha (ERR_UNSAFE_PORT)

After browser **Allow**, redirect to `http://localhost:1` may show **ERR_UNSAFE_PORT** — this is **normal**. Copy the **full URL** from the address bar (contains `code=4/0A…`) and pass to setup:

```powershell
python ...\setup.py --auth-code "FULL_URL_FROM_ADDRESS_BAR"
```

See `.cursor/docs/ISSUES-RESOLVED.md` for full notes.

---

## What Jon can ask (natural language)

Via **Hermes Desktop**, **Telegram**, or Cursor agents with Google context:

- Summarize unread Gmail
- What's on my calendar today / this week?
- Search Drive for [filename or topic]
- Draft an email to [person]
- List large Drive files (storage cleanup)

**JonBeatz agents:** Prefer Hermes skill or documented APIs — do not invent Gmail credentials.

---

## Standing personal goals (from ReCall)

1. Weekly storage report (Gmail + Drive under 70%)
2. Auto-label receipts by year
3. Inbox cleanup rituals

Log new automation ideas to **ReCall.md** + **Mem0**.

---

## GCP admin links

- [OAuth Clients](https://console.cloud.google.com/auth/clients?project=wordpress-map-1492461083797)
- [Test users / Audience](https://console.cloud.google.com/auth/audience?project=wordpress-map-1492461083797)
- [Google Account dashboard](https://myaccount.google.com/dashboard)

---

## Boundaries

- **Shared token** with MSC Hermes stack — same `google_token.json`
- **JonBeatz Mem0** stays isolated (`jonbeatz_personal`) — do not store email bodies in MSC Mem0
- Website-related Google tasks → open **MyStudioChannel** repo instead

---

*Last updated: 2026-06-19 · JonBeatz v1.3*


---

## --- Source: HOSTINGER-REFERENCE.md ---

# Hostinger Reference — JonBeatz → MyStudioChannel

**Purpose:** Keep Hostinger deploy knowledge reachable from JonBeatz without mixing MSC daily deploy into the personal profile.

**Live site:** [mystudiochannel.com](https://mystudiochannel.com)  
**hPanel:** [https://hpanel.hostinger.com/](https://hpanel.hostinger.com/)

---

## When to use which repo

| Task | Open this repo | Why |
|------|----------------|-----|
| Personal Mem0, Playground, Google, backup | `D:\Hermes\projects\JonBeatz` | JonBeatz profile boundary |
| **Deploy / fix live MSC website** | `D:\Cursor_Projectz\MyStudioChannel` | All `pushit:live`, `msc:hostinger:*` scripts live here |
| Hostinger MCP (hosting, DNS, domains, VPS) | **Either** — global MCP | Token synced from JonBeatz `.env.local` via `npm run sync:mcp-env` |

**Agent rule:** If Jon says **"push it live"**, **"deploy website"**, or **"fix live site"** — confirm MSC repo is open, or tell Jon to switch workspace to MyStudioChannel before running deploy commands.

---

## Two-folder model (MSC production)

| Server path | Role |
|-------------|------|
| `public_html/nodejs/` (FTPS `FTP_REMOTE_PATH`) | **Staging** — FTPS uploads land here |
| `HOSTINGER_APP_ROOT` | **Live app root** — Node.js actually runs here |

FTPS alone does **not** update live. MSC runs **`msc:hostinger:sync-app`** (and **`sync-db`** when DB changed).

---

## Deploy tiers (run from MSC repo only)

| Tier | MSC command | When |
|------|-------------|------|
| Quick DB | `npm run msc:push:db:live` | `/` OK, APIs 500, stub `payload.sqlite` |
| Fast (daily) | `npm run pushit:live:fast` | Code/UI — zip `.next`, SSH unzip, sync-app |
| Fast + DB | `npm run pushit:live:fast -- -WithDb` | Fast path **with** database |
| Full | `npm run pushit:live` | DB + media + full parity (~45–60 min) |

**Prompt:** `.cursor/prompts/Push-Website-Live.md` in MSC (AskQuestion deploy modes).

---

## Command locality

| Where | What |
|-------|------|
| **Local (PC — MSC repo root)** | `npm run build`, `pushit:live*`, `msc:hostinger:*`, `git` |
| **Live (hPanel browser)** | Node.js **Restart** @ [hpanel.hostinger.com](https://hpanel.hostinger.com/) |
| **Live (SSH)** | Prefer **local scripts**: `msc:hostinger:npm-install`, `sync-app`, `recover` |

**Never** run `pushitup` in hPanel Terminal.

---

## Environment keys (in JonBeatz `.env.local`)

Active keys for MCP + MSC reference (deploy scripts read MSC `.env.local` when in that repo):

| Key | Use |
|-----|-----|
| `HOSTINGER_API_TOKEN` | Global MCP quartet — `npm run sync:mcp-env` |
| `FTP_HOST`, `FTP_USERNAME`, `FTP_PASSWORD`, `FTP_REMOTE_PATH` | FTPS deploy (MSC) |
| `HOSTINGER_SSH_*`, `HOSTINGER_APP_ROOT` | SSH sync/recovery (MSC) |

MSC-only keys are commented in JonBeatz `.env.local` under **MSC website reference**.

---

## Hostinger MCP (global — works from JonBeatz)

Four servers in `%USERPROFILE%\.cursor\mcp.json`:

| Server | Purpose |
|--------|---------|
| `hostinger-hosting` | JS deployments, hosting API, deploy logs |
| `hostinger-vps` | VPS management |
| `hostinger-domains` | Domain management |
| `hostinger-dns` | DNS records |

**Setup from JonBeatz:**

```powershell
cd D:\Hermes\projects\JonBeatz
npm run sync:mcp-env
```

Then **Cursor Settings → MCP** → refresh `hostinger-*` servers.

Uses scoped launcher `scripts/jonbeatz-hostinger-mcp.mjs` (copied from MSC pattern). **Do not** use raw `npx hostinger-api-mcp@latest` (129-tool default server).

**Avoid MCP zip deploy** on shared Node (`better-sqlite3` compile fails) — prefer FTPS scripts in MSC.

---

## MSC canonical docs (read-only paths)

| Doc | Path |
|-----|------|
| Full deploy bible | `D:\Cursor_Projectz\MyStudioChannel\.cursor\docs\HOSTINGER-DEPLOY.md` |
| Portable module guide | `D:\Cursor_Projectz\MyStudioChannel\.cursor\docs\HOSTINGER-MODULE.md` |
| Pitfalls | `.cursor/docs/PITFALLS-HOSTINGER.md` (JonBeatz copy) + MSC original |
| Go-live checklist | `D:\Cursor_Projectz\MyStudioChannel\.cursor\docs\Go-Live-Checklist.md` |
| Deploy troubleshooting | `D:\Cursor_Projectz\MyStudioChannel\.cursor\docs\DEPLOYMENT-TROUBLESHOOTING.md` |
| Command index | `D:\Cursor_Projectz\MyStudioChannel\.cursor\docs\Jedi-List.md` |
| Portable install module | `D:\Cursor_Projectz\MyStudioChannel\.cursor\custom-scriptz\hostinger-setup\` |
| MCP setup (MSC) | `D:\Cursor_Projectz\MyStudioChannel\.cursor\docs\MCP-SETUP.md` |

---

## Post-deploy ritual (MSC)

1. Wait for deploy script completion / "Restart Node in hPanel"
2. **Restart** Node.js app in hPanel
3. `npm run msc:verify:live` (from MSC repo)
4. Optional: `npm run msc:verify:live:version`

---

## JonBeatz skills & rules

| Asset | Path |
|-------|------|
| **Hostinger-Ops skill** | `.cursor/skills/Hostinger-Ops/SKILL.md` |
| **hPanel operator rule** | `.cursor/rules/jon-operator-hpanel.mdc` |
| **Deploy safety reference** | `.cursor/rules/hostinger-reference.mdc` |
| **MSC deploy prompt** | `.cursor/prompts/Hostinger-MSC.md` |

---

## Quick phrases (from JonBeatz)

| Say this | Agent does |
|----------|------------|
| **hostinger reference** | Read this file + pitfalls |
| **open msc deploy** | Confirm MSC repo; read `HOSTINGER-DEPLOY.md` |
| **sync hostinger mcp** | `npm run sync:mcp-env` + reload MCP |
| **push it live** | Switch to MSC + `Push-Website-Live.md` ritual |


---

## --- Source: PITFALLS-HOSTINGER.md ---

# Hostinger pitfalls — lessons learned

Portable reference distilled from MyStudioChannel production. Symptom → cause → fix.

**Deploy commands run from:** `D:\Cursor_Projectz\MyStudioChannel`  
**Full context:** `.cursor/docs/HOSTINGER-REFERENCE.md`

---

## 503 Service Unavailable

| Cause | Fix |
|-------|-----|
| Missing `next/dist/compiled/webpack` | `npm run msc:hostinger:npm-install` → Restart Node in hPanel |
| Missing `.builds/config/preload-timestamp.js` | `npm run msc:hostinger:recover` → Restart Node |
| Code only in staging, not live root | `npm run msc:hostinger:sync-app` or full deploy → Restart |
| `payload.sqlite` ~4 KB stub on server | `npm run msc:push:db:live` → Restart |

---

## Fast deploy (`pushit:live:fast`)

| Mistake | Symptom | Fix |
|---------|---------|-----|
| Assumed DB ships by default | Live CMS stale | Use **`-WithDb`** flag |
| Bash `'$STAGING'` quoting bug | 45 min FTPS fallback | Check `logs/pushit-unzip-last.log` |
| `package.json` not uploaded | Wrong version on live | Fast path uploads `package.json` in step 4 |
| Zip uploaded to `zips/` on remote | missing deploy-next.zip | Upload repo-root **`deploy-next.zip`** only |
| Skipped `sync-app` | New `.next` in staging only | Always run sync-app in pipeline |
| Restart too early | 503 / half-updated | Wait for script completion message |

**Preflight:** `npm run msc:hostinger:deploy-diagnose` (MSC repo)

---

## API 500 on `/api/*`

- Local DB good, live stub → **Quick DB** (`msc:push:db:live`)
- After deploy: `rm -f payload.sqlite-wal payload.sqlite-shm` on server if lock errors

---

## MCP zip deploy

- **Avoid on Hostinger shared Node** — `better-sqlite3` compile often fails
- MCP zip ≠ DB deploy even if zip contains sqlite
- Prefer **Fast FTPS** or **Full FTPS** from MSC scripts

---

## npm on server

- Manual hPanel install: **`npm install --legacy-peer-deps --ignore-scripts`** only
- Plain `npm install` can break webpack preload

---

## Local dev after deploy

- Production `.next` on PC can break `next dev` → JonBeatz: `npm run dev:recover` · MSC: `npm run dev:fresh`

---

## WAL / SQLite

- Copy DB with deploy scripts; on server delete `payload.sqlite-wal` and `payload.sqlite-shm` if lock errors
- Never commit live `payload.sqlite` unless project policy says so


---

## --- Source: WORK-ENVIRONMENT.md ---

# Work Environment — JonBeatz + Hermes Ecosystem

Reference map for agents: what runs where, and which repo to open.

---

## This profile

| Item | Value |
|------|-------|
| **Root** | `D:\Hermes\projects\JonBeatz` |
| **Slug** | `jonbeatz` |
| **Hermes CLI home** | `%LOCALAPPDATA%\hermes\profiles\jonbeatz` |
| **Desktop shortcut** | `%USERPROFILE%\Desktop\Hermes - JonBeatz.lnk` |
| **Google account** | jonbeatz@gmail.com |
| **Profile backup** | `G:\Hermes_Project_BackUpz\JonBeatz\jonbeatz-project-v{N}-{a-z}` (`npm run backup:quick`) |

---

## Sibling projects

| Project | Path | GitHub |
|---------|------|--------|
| **MyStudioChannel** | `D:\Cursor_Projectz\MyStudioChannel` | [jonbeatz/MyStudioChannel](https://github.com/jonbeatz/MyStudioChannel) |
| **Profile Jedi** | `D:\Hermes\apps\profile-jedi` | [jonbeatz/profile-jedi](https://github.com/jonbeatz/profile-jedi) |
| **Hermes switcher** | `D:\Hermes\projects\_core-scripts\profile-switcher\` | (local scripts) |
| **LiteLLM / DeepSeek stack** | `D:\Hermes\projects\_core-scripts\deepseek-api\` | (local scripts; legacy `google-api` retired to `_archive/`) |
| **Core scripts README** | `D:\Hermes\projects\_core-scripts\README.md` | audit + layout |

**Rule:** Open the repo that matches the task. Personal Mem0 + rituals = **JonBeatz**. Website deploy = **MSC**. Profile UI = **Profile Jedi**.

---

## Hostinger (MyStudioChannel live site)

| Item | Value |
|------|-------|
| **Live URL** | https://mystudiochannel.com |
| **hPanel** | https://hpanel.hostinger.com/ |
| **Deploy repo** | `D:\Cursor_Projectz\MyStudioChannel` |
| **JonBeatz reference** | `.cursor/docs/HOSTINGER-REFERENCE.md` |
| **MCP sync** | `npm run sync:mcp-env` from JonBeatz (uses `HOSTINGER_API_TOKEN`) |
| **FTPS/SSH keys** | In JonBeatz `.env.local` — MSC scripts read MSC `.env.local` when in that repo |

**Deploy tiers (MSC only):** Quick DB · Fast FTPS · Full FTPS — see `HOSTINGER-REFERENCE.md`.

---

## Port map

| Port | Service | Started by |
|------|---------|------------|
| 1234 | LM Studio | Manual / mem0 preflight |
| 4000 | LiteLLM | `npm run deepseek:on` (DeepSeek proxy) |
| 4040 | ngrok inspector | Google API stack |
| 7780 | Profile Jedi | Profile Jedi shortcut / tray |
| 7781 | Profile Jedi tray | Profile Jedi Tray shortcut |
| 8188 | ComfyUI (shared) | `npm run comfy:start` (opt-in — not session default) |

### MSC-only (not default in JonBeatz session)

| Port | Service |
|------|---------|
| 3000 | Next.js dev (MSC website) |
| 3001 | TaskBoardAI |
| 3005 | Hermes Kanban |
| 9119 | Hermes Dashboard |

Start these from **MyStudioChannel** (`npm run msc:session:start`).

---

## Shared vs isolated

| Resource | Shared? | Location |
|----------|---------|----------|
| Google OAuth token | Shared | `%LOCALAPPDATA%\hermes\google_token.json` |
| Mem0 store | **Isolated** | `%USERPROFILE%\.mem0\qdrant_personal` |
| Active Hermes profile | Per session | `%APPDATA%\Hermes\active-profile.json` |
| LiteLLM master key | Shared stack | `D:\Hermes\projects\_core-scripts\deepseek-api\.env.local` |
| ComfyUI engine | **Shared** | `H:\AI_Models\ComfyUI` (port 8188) |
| HF_TOKEN / image env | **JonBeatz** | `D:\Hermes\projects\JonBeatz\.env.local` |
| Image outputs (personal) | **JonBeatz** | `D:\Hermes\assets\media\JonBeatz` |
| Image outputs (website) | MSC | `public\media\` |

---

## Python / LM Studio tooling

| Tool | Path / command |
|------|----------------|
| Python (Mem0) | `C:\Users\JONBEATZ\AppData\Local\Programs\Python\Python312\python.exe` |
| LM Studio CLI | `lms` on PATH |
| Mem0 model | `qwen3-4b-instruct-2507` |
| Embedder | HuggingFace `multi-qa-MiniLM-L6-cos-v1` (in ***.py) |

---

## Obsidian (optional think layer)

Personal vault: `H:\Vader_Vault` (not in git). Ship layer = this profile's `.cursor/docs/` + `TRUTH.md`. Distill weekly using **`npm run obsidian:distill`** to find candidate notes for `ReCall.md`.


---

## --- Source: OBSIDIAN-BRIDGE.md ---

# OBSIDIAN-BRIDGE.md — JonBeatz Think Layer vs Ship Layer

**Personal vault (think):** `H:\Vader_Vault` (Obsidian, not in git)  
**Ship layer (agents):** `D:\Hermes\projects\JonBeatz\.cursor\docs\` + `TRUTH.md` + Mem0

---

## Where to put what

| Content type | Primary home | Secondary |
|--------------|--------------|-----------|
| Daily focus, ideas, session context | **ReCall.md** | Mem0 search |
| Agent constitution, commands, workflows | **TRUTH.md** + `.cursor/docs/` | — |
| Long-form personal notes, journaling | **Obsidian vault** | Distill to ReCall weekly |
| Durable facts agents must recall | **Mem0** (`jonbeatz_personal`) | One-line in ReCall |
| Troubleshooting fixes | **ISSUES-RESOLVED.md** | Mem0 if recurring |
| Session history | **project-log.md** | `npm run log:session` |

---

## Workflow

### During a Cursor session (ship layer)

1. Agents read **TRUTH.md** → **START-HERE.md** → **ReCall.md**
2. Substantive takeaways → `npm run mem0:add -- "..."`
3. End Project → update **ReCall.md** + **project-log.md**

### Weekly distill (manual — Jon)

1. Review Obsidian daily notes in `H:\Vader_Vault`
2. Move actionable items to **ReCall.md** Idea Log
3. Archive or delete stale vault clutter
4. Optional: one Mem0 memory per week summarizing themes

**No auto-sync** between Obsidian and JonBeatz git — intentional air gap.

---

## Agent rules

1. **Do not** write to `H:\Vader_Vault` unless Jon explicitly asks
2. **Do not** assume vault contents are in context — Jon must paste or summarize
3. **Prefer ReCall + Mem0** for anything agents need next session
4. Creative/design extraction → **DesignMD** skill → ship to `.cursor/docs/` or specs

---

## Related paths

| Layer | Path |
|-------|------|
| JonBeatz ship | `D:\Hermes\projects\JonBeatz` |
| Obsidian vault | `H:\Vader_Vault` |
| MSC website ship | `D:\Cursor_Projectz\MyStudioChannel` |

---

*Last updated: 2026-06-19*


---

## --- Source: HERMES.md ---

# HERMES.md — JonBeatz Personal Profile

Hermes Desktop and CLI should treat **`D:\Hermes\projects\JonBeatz`** as the project root for this profile.

## Read first
1. `TRUTH.md`
2. `.cursor/docs/START-HERE.md`
3. `.cursor/docs/MEM0-LMSTUDIO.md`
4. `.cursor/docs/IMAGE-WORKFLOW.md` (if creative/image work)
5. `.cursor/docs/GOOGLE-WORKSPACE.md` (if Google tasks)
6. `.cursor/docs/ReCall.md`

## Hermes profile name
`jonbeatz` (CLI: `jonbeatz chat`, Desktop: **Hermes - JonBeatz** shortcut)

## Profile Jedi
- **boardId:** `jonbeatz-personal-board-id`
- **Board file:** `.cursor/boards/jonbeatz-personal.json`
- **UI:** http://localhost:7780 → Extras → TaskBoard

## Session rituals (Cursor)
- **Start Project** → `npm run session:start` + `.cursor/prompts/Start-Project.md`
- **End Project** → `.cursor/prompts/End-Project.md` + `npm run session:stop`
- **update docs** → `.cursor/prompts/Update-Docs.md` + `npm run docs:sync`

## Personal commands (from profile root)
```powershell
npm run session:start          # LM Studio preflight + probes
npm run session:start -- -Full # + Google stack + image doctor
npm run session:stop           # Session closeout
npm run doctor                 # Unified health check
npm run desktop                # Hermes Desktop JonBeatz
npm run deepseek:on             # DeepSeek / LiteLLM stack
npm run google:doctor          # Google Workspace auth check
npm run image:gen -- "prompt"  # HF cloud image
npm run comfy:start            # Local ComfyUI (opt-in)
npm run mem0:search -- "query"
npm run backup:quick            # Standard → G:\Hermes_Project_BackUpz\JonBeatz\jonbeatz-project-v1-a
npm run backup:quick:full       # Full mirror backup
npm run log:session -- "..."   # Session log
```

Full reference: `.cursor/docs/MASTER-COMMANDS.md` · Phrases: `.cursor/docs/Custom-Prompts.md`

## Boundaries
- This profile is **personal** — not MyStudioChannel.
- Mem0 uses `jonbeatz_personal` / `qdrant_personal` (isolated from MSC).
- Google OAuth tokens are shared globally (`%LOCALAPPDATA%\hermes\google_token.json`).

## Agent entry
See **`AGENTS.md`** and **`.cursorrules`**.


---

