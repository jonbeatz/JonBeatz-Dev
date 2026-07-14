# Fleet Boot + Session Rituals — Hermes Ecosystem

**Canonical reference** for PC login, Cursor MCP, LM Studio, and **Start / Open / Close / End** workflows.  
**Shared library:** `D:\Hermes\projects\_core-scripts\shared-profile-content` · **v1.29.1+**

New skeleton projects inherit this via bootstrap + `npm run sync:docs -- -Write -AddMissing` + `npm run sync:rituals`.

---

## PC login (Windows boot)

| At login | Not at login |
|----------|----------------|
| Telegram gateway (background) | Cursor / MCP servers |
| LiteLLM `:4000` + ngrok `:4040` (background) | LM Studio (`:1234`) — **disable Windows Startup autostart** |
| One visible LiteLLM console (intentional fleet dashboard) | Next.js dev `:3000` |
| | Hermes Desktop GUI |
| | OmniVoice daemon |

**Single Startup entry:** `%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup\Master-Startup.lnk` → `Master-Startup.ps1 -SkipDesktop` (hidden VBS).

**Do not** duplicate boot with `Hermes_Gateway_jonbeatz.vbs`, `Hermes_Gateway_<other-profile>.vbs`, `Master-Startup-Relay.vbs`, or gateway `.cmd` in Startup. Telegram **always** uses **jonbeatz** — never Cursor `active-profile.json` (e.g. next-flick). Run `npm run boot:setup` to refresh shortcuts and remove dupes.

**Manual:** `D:\Hermes\Master-Startup.lnk` or `Master-Startup.ps1 -ShowWindows` for visible windows.

**Telegram ONLINE ping:** `boot-fleet-online.mjs` + `litellm-console-host.mjs` when `:4000` is ready (backup: `boot-ready-notify.ps1`).

---

## LM Studio policy (2026-07-08)

| When | Action |
|------|--------|
| **Windows login** | **Off** — disable LM Studio in Task Manager → Startup apps |
| **Start Project** (`session:start -- -Full`) | Auto-launch LM Studio if `:1234` offline |
| **Open Project** | Probe only — do not start LM Studio unless operator asks |
| **End Project** | **Does not** stop LM Studio (operator closes app if desired) |
| **Mem0 search / infer-add** | Needs `:1234` — run `npm run mem0:preflight` |

**Integrations tab empty in LM Studio:** Normal for Mem0/Hermes `:1234` workflow — no LM Studio Integrations required.

**VRAM:** Saves ~6 processes + GPU at login when autostart is off.

---

## Cursor MCP architecture

| Layer | Path | Purpose |
|-------|------|---------|
| **Global launch** | `%USERPROFILE%\.cursor\mcp.json` | github, Hostinger×4, playwright, fetch, context7, fal-ai, firebase, vault, etc. |
| **Project launch** | `.cursor/mcp.json` (gitignored) | Valid `{ "mcpServers": { ... } }` — empty `{}` for new leaves, **or** real `command`/`args` blocks (JonBeatz hub: 2 live servers) |
| **Catalog only** | `.cursor/mcp-manifest.json` | Optional docs/reference — **never** paste `project_mcp_servers` into `mcp.json` |
| **Hermes profile** | `%LOCALAPPDATA%\hermes\profiles\jonbeatz\config.yaml` | `mcp_servers: {}` — Cursor-only MCP (no duplicate Hostinger/github Node children) |

**LiteLLM master key (all profiles — 2026-07-13):** Every Hermes profile `model.api_key` must be `sk-jonbeatz-deepseek-2026` with `deepseek-v4-pro` at `http://127.0.0.1:4000/v1`. Wrong keys return HTTP 400 **"No connected db"** (stateless LiteLLM — not a SQLite bug). **Watchdog:** `profiles\jonbeatz\scripts\profile-health-watchdog.py` — Hermes cron every 6h; Telegram alert on failure only. Policy: JonBeatz `TRUTH.md` → LiteLLM Master Key Policy.

**Red Cursor error:** `mcpServers must be an object` → fix project `.cursor/mcp.json` schema.

**Fleet audit:**

```powershell
node D:\Hermes\projects\_core-scripts\shared-profile-content\scripts\check-project-mcp-json.mjs
```

**After global/project MCP edits:** Reload MCP in Cursor Settings or restart Cursor.

**Browser automation stack (Jon 2026-07-08):**

| Slot | MCP / tool | Brave extension | Use |
|------|------------|-----------------|-----|
| 1 | `playwright` | No | Localhost `:3000` / `:3001` — isolated Playwright Chrome |
| 2 | `cursor-ide-browser` | No | In-IDE tab (Cursor built-in) |
| 3 | **`playwright-brave`** | **Playwright MCP Bridge** (on) | Real Brave tab — share tab in extension |
| 4 | **`pilot`** (experimental) | **Pilot** (`npx pilot-mcp --install-extension`) | Tab list, handoff, lean snapshots |
| — | ~~browsermcp~~ | Off (retired 2026-07-08) | Replaced by playwright-brave |

**playwright-brave:** Global `mcp.json` uses `--extension`, Brave `--executable-path` + `--user-data-dir`, and `PLAYWRIGHT_MCP_EXTENSION_TOKEN` from the Bridge extension status page (local only — never commit).

**pilot:** Install extension once: `npx pilot-mcp --install-extension` → Load unpacked in Brave. Extension badge **ON** when connected.

**Trim policy (Jon 2026-07-08):** Keep fal-ai + firebase; removed sequential-thinking, terminal-controller, **browsermcp** from global. Project overlays minimal (JonBeatz: 2; VaderLabz/Next-Flick: empty).

---

## Session rituals (operator triggers)

| Trigger | Prompt | Stack | Voice |
|---------|--------|-------|-------|
| **Start Project** / cold start | `Start-Project.md` | `session:start -- -Full` | `draven:speak` once |
| **Open Project** / resume | `Open-Project.md` | `session:open` (warm probes) | Silent |
| **Close Project** / switch workspace | `Close-Project.md` | `session:handoff` — **keep** LiteLLM/ngrok | Silent |
| **End Project** / day-end | `End-Project.md` | `session:stop` (+ optional `-StopDeepSeek`) | `draven:speak` farewell |

**Propagate rituals to a profile:**

```powershell
npm run sync:rituals
```

**Fleet-wide (hub JonBeatz):**

```powershell
npm run fleet:sync
```

---

## End Project — AskQuestion sequence

Use Cursor **`AskQuestion`** so options are **clickable buttons** in the Agent window. Never “Reply 1 or 2”. See `end-project-ritual.mdc` + `End-Project.md` Hard UI rule. (If AskQuestion is missing from the model tool list, say so once and restate labeled options in prose.)

1. Summarize + update `ReCall.md` + `project-log.md`
2. Mem0 + vault (if substantive)
3. MGR handoff (if `MGR/` exists)
4. **AskQuestion — git** (never auto-commit)
5. **AskQuestion — dev server on `:3000`** (only if port is listening)
6. **AskQuestion — stop LiteLLM + ngrok** (recommend stop for day-end)
7. `draven:speak` → `npm run session:stop` (add `-StopDeepSeek` if confirmed)

### Dev server on `:3000` (Step 5)

After `web:verify-local` or `npm run web:dev`, dev often stays up → Cursor warns on quit.

**Probe:**

```powershell
Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue
```

| Option | Action |
|--------|--------|
| **Stop dev server** (recommended when quitting Cursor) | `npm run web:dev:stop` — kill `:3000` only |
| **Leave running** | No action |

**Do not** use `web:dev:reset` for End Project — that wipes `.next` and restarts dev.

**Close Project:** No dev-stop AskQuestion — new projects get `:3001` if `:3000` is busy; leave running when switching workspaces.

---

## Port map (local)

| Port | Service |
|------|---------|
| 3000 | Next.js dev (first project) |
| 3001+ | Next.js dev (second project if 3000 busy) |
| 1234 | LM Studio |
| 4000 | LiteLLM (DeepSeek billing) |
| 4040 | ngrok inspector |
| 8188 | ComfyUI (optional) |

---

## Process count notes (2026-07-08)

- **~260 processes at boot** was inflated by duplicate Startup entries + Hermes/Cursor duplicate MCP Node children.
- **Cursor MCP** is the main `node.exe` multiplier when IDE is open — not OpenRouter.
- Cleanup: fix `mcp.json` schema, empty Hermes `mcp_servers`, trim global MCP, `boot:setup` dedup.

---

## Skeleton checklist (new project)

1. Bootstrap from `shared-profile-content` (`bootstrap-new-project.ps1`)
2. `.cursor/mcp.json` → valid `{ "mcpServers": {} }` (or live servers) + optional `mcp-manifest.json` catalog
3. `npm run sync:rituals` + `npm run sync:docs -- -Write -AddMissing`
4. Per-project Mem0 in `.env.local` (`MEM0_USER_ID`, `MEM0_COLLECTION`, `MEM0_QDRANT_PATH`)
5. Read `FLEET-BOOT-SESSION.md`, `START-HERE.md`, `FITNESS-CHECK.md`

---

## Related docs

| Doc | Topic |
|-----|-------|
| `MASTER-COMMANDS.md` | All npm aliases |
| `MEM0-LMSTUDIO.md` | Mem0 + LM Studio |
| `FITNESS-CHECK.md` | Profile self-audit |
| `VOICE-WORKFLOW.md` | Draven speak policy |
| `ENGINEERING.md` | MCP + image + deep dives |

---

*Last updated: 2026-07-13 · shared-profile-content v1.30.6*
