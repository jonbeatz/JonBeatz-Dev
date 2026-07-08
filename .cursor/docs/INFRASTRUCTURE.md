# Infrastructure & Environment

## --- Source: GOOGLE-WORKSPACE.md ---

1|# GOOGLE-WORKSPACE.md — JonBeatz Personal Google Automation
2|
3|**Account:** jonbeatz@gmail.com  
4|**Token:** `%LOCALAPPDATA%\hermes\google_token.json` (shared Hermes OAuth)  
5|**API stack:** LiteLLM `:4000` + ngrok `:4040` (optional, `npm run deepseek:on`)
6|
7|---
8|
9|## Quick commands (JonBeatz profile root)
10|
11|| Command | Purpose |
12||---------|---------|
13|| `npm run google:doctor` | Token + LiteLLM + setup.py --check |
14|| `npm run google:status` | JSON status for agents |
15|| `npm run deepseek:on` | Start DeepSeek / LiteLLM stack |
16|| `npm run stop` | Stop Google API stack |
17|
18|---
19|
20|## Hermes google-workspace skill
21|
22|| Item | Path |
23||------|------|
24|| Skill | `%LOCALAPPDATA%\hermes\skills\productivity\google-workspace\` |
25|| Setup | `...\scripts\setup.py` |
26|| Client secret | `%LOCALAPPDATA%\hermes\google_client_secret.json` |
27|| GCP project | `wordpress-map-1492461083797` |
28|
29|**Check auth:**
30|
31|```powershell
32|python "$env:LOCALAPPDATA\hermes\skills\productivity\google-workspace\scripts\setup.py" --check
33|```
34|
35|Expected: `AUTHENTICATED`
36|
37|**Re-auth (missing Drive / Docs scopes):**
38|
39|```powershell
40|python "$env:LOCALAPPDATA\hermes\skills\productivity\google-workspace\scripts\setup.py" --auth-url
41|# Open printed URL → Allow → copy full redirect URL from address bar (ERR_UNSAFE_PORT is OK)
42|python "$env:LOCALAPPDATA\hermes\skills\productivity\google-workspace\scripts\setup.py" --auth-code "FULL_REDIRECT_URL"
43|python "$env:LOCALAPPDATA\hermes\skills\productivity\google-workspace\scripts\setup.py" --check
44|```
45|
46|Required scopes: `gmail.modify`, `calendar`, `documents`, `drive` (included in setup.py `SCOPES`).
47|
48|---
49|
50|## OAuth gotcha (ERR_UNSAFE_PORT)
51|
52|After browser **Allow**, redirect to `http://localhost:1` may show **ERR_UNSAFE_PORT** — this is **normal**. Copy the **full URL** from the address bar (contains `code=4/0A…`) and pass to setup:
53|
54|```powershell
55|python ...\setup.py --auth-code "FULL_URL_FROM_ADDRESS_BAR"
56|```
57|
58|See `.cursor/docs/ISSUES-RESOLVED.md` for full notes.
59|
60|---
61|
62|## What Jon can ask (natural language)
63|
64|Via **Hermes Desktop**, **Telegram**, or Cursor agents with Google context:
65|
66|- Summarize unread Gmail
67|- What's on my calendar today / this week?
68|- Search Drive for [filename or topic]
69|- Draft an email to [person]
70|- List large Drive files (storage cleanup)
71|
72|**JonBeatz agents:** Prefer Hermes skill or documented APIs — do not invent Gmail credentials.
73|
74|---
75|
76|## Standing personal goals (from ReCall)
77|
78|1. Weekly storage report (Gmail + Drive under 70%)
79|2. Auto-label receipts by year
80|3. Inbox cleanup rituals
81|
82|Log new automation ideas to **ReCall.md** + **Mem0**.
83|
84|---
85|
86|## GCP admin links
87|
88|- [OAuth Clients](https://console.cloud.google.com/auth/clients?project=wordpress-map-1492461083797)
89|- [Test users / Audience](https://console.cloud.google.com/auth/audience?project=wordpress-map-1492461083797)
90|- [Google Account dashboard](https://myaccount.google.com/dashboard)
91|
92|---
93|
94|## Boundaries
95|
96|- **Shared token** with MSC Hermes stack — same `google_token.json`
97|- **JonBeatz Mem0** stays isolated (`jonbeatz_personal`) — do not store email bodies in MSC Mem0
98|- Website-related Google tasks → open **MyStudioChannel** repo instead
99|
100|---
101|
102|*Last updated: 2026-06-19 · JonBeatz v1.3*
103|

---

## --- Source: HOSTINGER-REFERENCE.md ---

1|# Hostinger Reference — JonBeatz → MyStudioChannel
2|
3|**Purpose:** Keep Hostinger deploy knowledge reachable from JonBeatz without mixing MSC daily deploy into the personal profile.
4|
5|**Live site:** [mystudiochannel.com](https://mystudiochannel.com)  
6|**hPanel:** [https://hpanel.hostinger.com/](https://hpanel.hostinger.com/)
7|
8|---
9|
10|## When to use which repo
11|
12|| Task | Open this repo | Why |
13||------|----------------|-----|
14|| Personal Mem0, Playground, Google, backup | `D:\Hermes\projects\JonBeatz` | JonBeatz profile boundary |
15|| **Deploy / fix live MSC website** | `D:\Cursor_Projectz\MyStudioChannel` | All `pushit:live`, `msc:hostinger:*` scripts live here |
16|| Hostinger MCP (hosting, DNS, domains, VPS) | **Either** — global MCP | Token synced from JonBeatz `.env.local` via `npm run sync:mcp-env` |
17|
18|**Agent rule:** If Jon says **"push it live"**, **"deploy website"**, or **"fix live site"** — confirm MSC repo is open, or tell Jon to switch workspace to MyStudioChannel before running deploy commands.
19|
20|---
21|
22|## Two-folder model (MSC production)
23|
24|| Server path | Role |
25||-------------|------|
26|| `public_html/nodejs/` (FTPS `FTP_REMOTE_PATH`) | **Staging** — FTPS uploads land here |
27|| `HOSTINGER_APP_ROOT` | **Live app root** — Node.js actually runs here |
28|
29|FTPS alone does **not** update live. MSC runs **`msc:hostinger:sync-app`** (and **`sync-db`** when DB changed).
30|
31|---
32|
33|## Deploy tiers (run from MSC repo only)
34|
35|| Tier | MSC command | When |
36||------|-------------|------|
37|| Quick DB | `npm run msc:push:db:live` | `/` OK, APIs 500, stub `payload.sqlite` |
38|| Fast (daily) | `npm run pushit:live:fast` | Code/UI — zip `.next`, SSH unzip, sync-app |
39|| Fast + DB | `npm run pushit:live:fast -- -WithDb` | Fast path **with** database |
40|| Full | `npm run pushit:live` | DB + media + full parity (~45–60 min) |
41|
42|**Prompt:** `.cursor/prompts/Push-Website-Live.md` in MSC (AskQuestion deploy modes).
43|
44|---
45|
46|## Command locality
47|
48|| Where | What |
49||-------|------|
50|| **Local (PC — MSC repo root)** | `npm run build`, `pushit:live*`, `msc:hostinger:*`, `git` |
51|| **Live (hPanel browser)** | Node.js **Restart** @ [hpanel.hostinger.com](https://hpanel.hostinger.com/) |
52|| **Live (SSH)** | Prefer **local scripts**: `msc:hostinger:npm-install`, `sync-app`, `recover` |
53|
54|**Never** run `pushitup` in hPanel Terminal.
55|
56|---
57|
58|## Environment keys (in JonBeatz `.env.local`)
59|
60|Active keys for MCP + MSC reference (deploy scripts read MSC `.env.local` when in that repo):
61|
62|| Key | Use |
63||-----|-----|
64|| `HOSTINGER_API_TOKEN` | Global MCP quartet — `npm run sync:mcp-env` |
65|| `FTP_HOST`, `FTP_USERNAME`, `FTP_PASSWORD`, `FTP_REMOTE_PATH` | FTPS deploy (MSC) |
66|| `HOSTINGER_SSH_*`, `HOSTINGER_APP_ROOT` | SSH sync/recovery (MSC) |
67|
68|MSC-only keys are commented in JonBeatz `.env.local` under **MSC website reference**.
69|
70|---
71|
72|## Hostinger MCP (global — works from JonBeatz)
73|
74|Four servers in `%USERPROFILE%\.cursor\mcp.json`:
75|
76|| Server | Purpose |
77||--------|---------|
78|| `hostinger-hosting` | JS deployments, hosting API, deploy logs |
79|| `hostinger-vps` | VPS management |
80|| `hostinger-domains` | Domain management |
81|| `hostinger-dns` | DNS records |
82|
83|**Setup from JonBeatz:**
84|
85|```powershell
86|cd D:\Hermes\projects\JonBeatz
87|npm run sync:mcp-env
88|```
89|
90|Then **Cursor Settings → MCP** → refresh `hostinger-*` servers.
91|
92|Uses scoped launcher `scripts/jonbeatz-hostinger-mcp.mjs` (copied from MSC pattern). **Do not** use raw `npx hostinger-api-mcp@latest` (129-tool default server).
93|
94|**Avoid MCP zip deploy** on shared Node (`better-sqlite3` compile fails) — prefer FTPS scripts in MSC.
95|
96|---
97|
98|## MSC canonical docs (read-only paths)
99|
100|| Doc | Path |
101||-----|------|
102|| Full deploy bible | `D:\Cursor_Projectz\MyStudioChannel\.cursor\docs\HOSTINGER-DEPLOY.md` |
103|| Portable module guide | `D:\Cursor_Projectz\MyStudioChannel\.cursor\docs\HOSTINGER-MODULE.md` |
104|| Pitfalls | `.cursor/docs/PITFALLS-HOSTINGER.md` (JonBeatz copy) + MSC original |
105|| Go-live checklist | `D:\Cursor_Projectz\MyStudioChannel\.cursor\docs\Go-Live-Checklist.md` |
106|| Deploy troubleshooting | `D:\Cursor_Projectz\MyStudioChannel\.cursor\docs\DEPLOYMENT-TROUBLESHOOTING.md` |
107|| Command index | `D:\Cursor_Projectz\MyStudioChannel\.cursor\docs\Jedi-List.md` |
108|| Portable install module | `D:\Cursor_Projectz\MyStudioChannel\.cursor\custom-scriptz\hostinger-setup\` |
109|| MCP setup (MSC) | `D:\Cursor_Projectz\MyStudioChannel\.cursor\docs\MCP-SETUP.md` |
110|
111|---
112|
113|## Post-deploy ritual (MSC)
114|
115|1. Wait for deploy script completion / "Restart Node in hPanel"
116|2. **Restart** Node.js app in hPanel
117|3. `npm run msc:verify:live` (from MSC repo)
118|4. Optional: `npm run msc:verify:live:version`
119|
120|---
121|
122|## JonBeatz skills & rules
123|
124|| Asset | Path |
125||-------|------|
126|| **Hostinger-Ops skill** | `.cursor/skills/Hostinger-Ops/SKILL.md` |
127|| **hPanel operator rule** | `.cursor/rules/jon-operator-hpanel.mdc` |
128|| **Deploy safety reference** | `.cursor/rules/hostinger-reference.mdc` |
129|| **MSC deploy prompt** | `.cursor/prompts/Hostinger-MSC.md` |
130|
131|---
132|
133|## Quick phrases (from JonBeatz)
134|
135|| Say this | Agent does |
136||----------|------------|
137|| **hostinger reference** | Read this file + pitfalls |
138|| **open msc deploy** | Confirm MSC repo; read `HOSTINGER-DEPLOY.md` |
139|| **sync hostinger mcp** | `npm run sync:mcp-env` + reload MCP |
140|| **push it live** | Switch to MSC + `Push-Website-Live.md` ritual |
141|

---

## --- Source: PITFALLS-HOSTINGER.md ---

1|# Hostinger pitfalls — lessons learned
2|
3|Portable reference distilled from MyStudioChannel production. Symptom → cause → fix.
4|
5|**Deploy commands run from:** `D:\Cursor_Projectz\MyStudioChannel`  
6|**Full context:** `.cursor/docs/HOSTINGER-REFERENCE.md`
7|
8|---
9|
10|## 503 Service Unavailable
11|
12|| Cause | Fix |
13||-------|-----|
14|| Missing `next/dist/compiled/webpack` | `npm run msc:hostinger:npm-install` → Restart Node in hPanel |
15|| Missing `.builds/config/preload-timestamp.js` | `npm run msc:hostinger:recover` → Restart Node |
16|| Code only in staging, not live root | `npm run msc:hostinger:sync-app` or full deploy → Restart |
17|| `payload.sqlite` ~4 KB stub on server | `npm run msc:push:db:live` → Restart |
18|
19|---
20|
21|## Fast deploy (`pushit:live:fast`)
22|
23|| Mistake | Symptom | Fix |
24||---------|---------|-----|
25|| Assumed DB ships by default | Live CMS stale | Use **`-WithDb`** flag |
26|| Bash `'$STAGING'` quoting bug | 45 min FTPS fallback | Check `logs/pushit-unzip-last.log` |
27|| `package.json` not uploaded | Wrong version on live | Fast path uploads `package.json` in step 4 |
28|| Zip uploaded to `zips/` on remote | missing deploy-next.zip | Upload repo-root **`deploy-next.zip`** only |
29|| Skipped `sync-app` | New `.next` in staging only | Always run sync-app in pipeline |
30|| Restart too early | 503 / half-updated | Wait for script completion message |
31|
32|**Preflight:** `npm run msc:hostinger:deploy-diagnose` (MSC repo)
33|
34|---
35|
36|## API 500 on `/api/*`
37|
38|- Local DB good, live stub → **Quick DB** (`msc:push:db:live`)
39|- After deploy: `rm -f payload.sqlite-wal payload.sqlite-shm` on server if lock errors
40|
41|---
42|
43|## MCP zip deploy
44|
45|- **Avoid on Hostinger shared Node** — `better-sqlite3` compile often fails
46|- MCP zip ≠ DB deploy even if zip contains sqlite
47|- Prefer **Fast FTPS** or **Full FTPS** from MSC scripts
48|
49|---
50|
51|## npm on server
52|
53|- Manual hPanel install: **`npm install --legacy-peer-deps --ignore-scripts`** only
54|- Plain `npm install` can break webpack preload
55|
56|---
57|
58|## Local dev after deploy
59|
60|- Production `.next` on PC can break `next dev` → JonBeatz: `npm run dev:recover` · MSC: `npm run dev:fresh`
61|
62|---
63|
64|## WAL / SQLite
65|
66|- Copy DB with deploy scripts; on server delete `payload.sqlite-wal` and `payload.sqlite-shm` if lock errors
67|- Never commit live `payload.sqlite` unless project policy says so
68|

---

## --- Source: WORK-ENVIRONMENT.md ---

1|# Work Environment — JonBeatz + Hermes Ecosystem
2|
3|Reference map for agents: what runs where, and which repo to open.
4|
5|---
6|
7|## This profile
8|
9|| Item | Value |
10||------|-------|
11|| **Root** | `D:\Hermes\projects\JonBeatz` |
12|| **Slug** | `jonbeatz` |
13|| **Hermes CLI home** | `%LOCALAPPDATA%\hermes\profiles\jonbeatz` |
14|| **Desktop shortcut** | `%USERPROFILE%\Desktop\Hermes - JonBeatz.lnk` |
15|| **Google account** | jonbeatz@gmail.com |
16|| **Profile backup** | `G:\Hermes_Project_BackUpz\JonBeatz\jonbeatz-project-v{N}-{a-z}` (`npm run backup:quick`) |
17|
18|---
19|
20|## Sibling projects
21|
22|| Project | Path | GitHub |
23||---------|------|--------|
24|| **MyStudioChannel** | `D:\Cursor_Projectz\MyStudioChannel` | [jonbeatz/MyStudioChannel](https://github.com/jonbeatz/MyStudioChannel) |
25|| **Profile Jedi** | `D:\Hermes\apps\profile-jedi` | [jonbeatz/profile-jedi](https://github.com/jonbeatz/profile-jedi) |
26|| **Hermes switcher** | `D:\Hermes\projects\_core-scripts\profile-switcher\` | (local scripts) |
27|| **LiteLLM / DeepSeek stack** | `D:\Hermes\projects\_core-scripts\deepseek-api\` | (local scripts; legacy `google-api` retired to `_archive/`) |
28|| **Core scripts README** | `D:\Hermes\projects\_core-scripts\README.md` | audit + layout |
28|
29|**Rule:** Open the repo that matches the task. Personal Mem0 + rituals = **JonBeatz**. Website deploy = **MSC**. Profile UI = **Profile Jedi**.
30|
31|---
32|
33|## Hostinger (MyStudioChannel live site)
34|
35|| Item | Value |
36||------|-------|
37|| **Live URL** | https://mystudiochannel.com |
38|| **hPanel** | https://hpanel.hostinger.com/ |
39|| **Deploy repo** | `D:\Cursor_Projectz\MyStudioChannel` |
40|| **JonBeatz reference** | `.cursor/docs/HOSTINGER-REFERENCE.md` |
41|| **MCP sync** | `npm run sync:mcp-env` from JonBeatz (uses `HOSTINGER_API_TOKEN`) |
42|| **FTPS/SSH keys** | In JonBeatz `.env.local` — MSC scripts read MSC `.env.local` when in that repo |
43|
44|**Deploy tiers (MSC only):** Quick DB · Fast FTPS · Full FTPS — see `HOSTINGER-REFERENCE.md`.
45|
46|---
47|
48|## Port map
49|
50|| Port | Service | Started by |
51||------|---------|------------|
52|| 1234 | LM Studio | Manual / mem0 preflight |
53|| 4000 | LiteLLM | `npm run deepseek:on` (DeepSeek proxy) |
54|| 4040 | ngrok inspector | Google API stack |
55|| 7780 | Profile Jedi | Profile Jedi shortcut / tray |
56|| 7781 | Profile Jedi tray | Profile Jedi Tray shortcut |
57|| 8188 | ComfyUI (shared) | `npm run comfy:start` (opt-in — not session default) |
58|
59|### MSC-only (not default in JonBeatz session)
60|
61|| Port | Service |
62||------|---------|
63|| 3000 | Next.js dev (MSC website) |
64|| 3001 | TaskBoardAI |
65|| 3005 | Hermes Kanban |
66|| 9119 | Hermes Dashboard |
67|
68|Start these from **MyStudioChannel** (`npm run msc:session:start`).
69|
70|---
71|
72|## Shared vs isolated
73|
74|| Resource | Shared? | Location |
75||----------|---------|----------|
76|| Google OAuth token | Shared | `%LOCALAPPDATA%\hermes\google_token.json` |
77|| Mem0 store | **Isolated** | `%USERPROFILE%\.mem0\qdrant_personal` |
78|| Active Hermes profile | Per session | `%APPDATA%\Hermes\active-profile.json` |
79|| LiteLLM master key | Shared stack | `D:\Hermes\projects\_core-scripts\deepseek-api\.env.local` |
80|| ComfyUI engine | **Shared** | `H:\AI_Models\ComfyUI` (port 8188) |
81|| HF_TOKEN / image env | **JonBeatz** | `D:\Hermes\projects\JonBeatz\.env.local` |
82|| Image outputs (personal) | **JonBeatz** | `D:\Hermes\assets\media\JonBeatz` |
83|| Image outputs (website) | MSC | `public\media\` |
84|
85|---
86|
87|## Python / LM Studio tooling
88|
89|| Tool | Path / command |
90||------|----------------|
91|| Python (Mem0) | `C:\Users\JONBEATZ\AppData\Local\Programs\Python\Python312\python.exe` |
92|| LM Studio CLI | `lms` on PATH |
93|| Mem0 model | `qwen3-4b-instruct-2507` |
94|| Embedder | HuggingFace `multi-qa-MiniLM-L6-cos-v1` (in ***.py) |
95|
96|---
97|
98|## Obsidian (optional think layer)
99|
100|Personal vault: `H:\Vader_Vault` (not in git). Ship layer = this profile's `.cursor/docs/` + `TRUTH.md`. Distill weekly using **`npm run obsidian:distill`** to find candidate notes for `ReCall.md`.
101|

---

## --- Source: OBSIDIAN-BRIDGE.md ---

1|# OBSIDIAN-BRIDGE.md — JonBeatz Think Layer vs Ship Layer
2|
3|**Personal vault (think):** `H:\Vader_Vault` (Obsidian, not in git)  
4|**Ship layer (agents):** `D:\Hermes\projects\JonBeatz\.cursor\docs\` + `TRUTH.md` + Mem0
5|
6|---
7|
8|## Where to put what
9|
10|| Content type | Primary home | Secondary |
11||--------------|--------------|-----------|
12|| Daily focus, ideas, session context | **ReCall.md** | Mem0 search |
13|| Agent constitution, commands, workflows | **TRUTH.md** + `.cursor/docs/` | — |
14|| Long-form personal notes, journaling | **Obsidian vault** | Distill to ReCall weekly |
15|| Durable facts agents must recall | **Mem0** (`jonbeatz_personal`) | One-line in ReCall |
16|| Troubleshooting fixes | **ISSUES-RESOLVED.md** | Mem0 if recurring |
17|| Session history | **project-log.md** | `npm run log:session` |
18|
19|---
20|
21|## Workflow
22|
23|### During a Cursor session (ship layer)
24|
25|1. Agents read **TRUTH.md** → **START-HERE.md** → **ReCall.md**
26|2. Substantive takeaways → `npm run mem0:add -- "..."`
27|3. End Project → update **ReCall.md** + **project-log.md**
28|
29|### Weekly distill (manual — Jon)
30|
31|1. Review Obsidian daily notes in `H:\Vader_Vault`
32|2. Move actionable items to **ReCall.md** Idea Log
33|3. Archive or delete stale vault clutter
34|4. Optional: one Mem0 memory per week summarizing themes
35|
36|**No auto-sync** between Obsidian and JonBeatz git — intentional air gap.
37|
38|---
39|
40|## Agent rules
41|
42|1. **Do not** write to `H:\Vader_Vault` unless Jon explicitly asks
43|2. **Do not** assume vault contents are in context — Jon must paste or summarize
44|3. **Prefer ReCall + Mem0** for anything agents need next session
45|4. Creative/design extraction → **DesignMD** skill → ship to `.cursor/docs/` or specs
46|
47|---
48|
49|## Related paths
50|
51|| Layer | Path |
52||-------|------|
53|| JonBeatz ship | `D:\Hermes\projects\JonBeatz` |
54|| Obsidian vault | `H:\Vader_Vault` |
55|| MSC website ship | `D:\Cursor_Projectz\MyStudioChannel` |
56|
57|---
58|
59|*Last updated: 2026-06-19*
60|

---

## --- Source: HERMES.md ---

1|# HERMES.md — JonBeatz Personal Profile
2|
3|Hermes Desktop and CLI should treat **`D:\Hermes\projects\JonBeatz`** as the project root for this profile.
4|
5|## Read first
6|1. `TRUTH.md`
7|2. `.cursor/docs/START-HERE.md`
8|3. `.cursor/docs/MEM0-LMSTUDIO.md`
9|4. `.cursor/docs/IMAGE-WORKFLOW.md` (if creative/image work)
10|5. `.cursor/docs/GOOGLE-WORKSPACE.md` (if Google tasks)
11|6. `.cursor/docs/ReCall.md`
12|
13|## Hermes profile name
14|`jonbeatz` (CLI: `jonbeatz chat`, Desktop: **Hermes - JonBeatz** shortcut)
15|
16|## Profile Jedi
17|- **boardId:** `jonbeatz-personal-board-id`
18|- **Board file:** `.cursor/boards/jonbeatz-personal.json`
19|- **UI:** http://localhost:7780 → Extras → TaskBoard
20|
21|## Session rituals (Cursor)
22|- **Start Project** → `npm run session:start` + `.cursor/prompts/Start-Project.md`
23|- **End Project** → `.cursor/prompts/End-Project.md` + `npm run session:stop`
24|- **update docs** → `.cursor/prompts/Update-Docs.md` + `npm run docs:sync`
25|
26|## Personal commands (from profile root)
27|```powershell
28|npm run session:start          # LM Studio preflight + probes
29|npm run session:start -- -Full # + Google stack + image doctor
30|npm run session:stop           # Session closeout
31|npm run doctor                 # Unified health check
32|npm run desktop                # Hermes Desktop JonBeatz
33|npm run deepseek:on             # DeepSeek / LiteLLM stack
34|npm run google:doctor          # Google Workspace auth check
35|npm run image:gen -- "prompt"  # HF cloud image
36|npm run comfy:start            # Local ComfyUI (opt-in)
37|npm run mem0:search -- "query"
38|npm run backup:quick            # Standard → G:\Hermes_Project_BackUpz\JonBeatz\jonbeatz-project-v1-a
39|npm run backup:quick:full       # Full mirror backup
40|npm run log:session -- "..."   # Session log
41|```
42|
43|Full reference: `.cursor/docs/MASTER-COMMANDS.md` · Phrases: `.cursor/docs/Custom-Prompts.md`
44|
45|## Boundaries
46|- This profile is **personal** — not MyStudioChannel.
47|- Mem0 uses `jonbeatz_personal` / `qdrant_personal` (isolated from MSC).
48|- Google OAuth tokens are shared globally (`%LOCALAPPDATA%\hermes\google_token.json`).
49|
50|## Agent entry
51|See **`AGENTS.md`** and **`.cursorrules`**.
52|

---

