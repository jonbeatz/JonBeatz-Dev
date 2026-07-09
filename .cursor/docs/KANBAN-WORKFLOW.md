# Kanban Workflow — TaskBoardAI + Hermes Workspace

**Fleet kanban** for Hermes projects: one **TaskBoardAI** install, one **global MCP** (`taskboard`), per-profile **board JSON** files, and the custom **Hermes Workspace** visual UI.

---

## Architecture (final decisions)

| Layer | Path / port | Role |
|-------|-------------|------|
| **TaskBoardAI** | `D:\Hermes\apps\TaskBoardAI` · **:3001** | Data + manager UI (`/?board=<boardId>`) |
| **Hermes Workspace** | `D:\Hermes\apps\hermes-workspace` · **:3005** | Custom drag-and-drop kanban UX (Jon’s designed UI) |
| **Hermes Dashboard** | **:9119** | Agent HUD |
| **MCP server** | `TaskBoardAI/server/mcp/kanbanMcpServer.js` | **Global only** in `%USERPROFILE%\.cursor\mcp.json` — stdio, no duplicate per project |
| **Profile registry** | `_core-scripts/profile-switcher/profiles.json` | Each profile has `boardId` → `boards/{boardId}.json` |
| **Profile Jedi** | `D:\Hermes\apps\profile-jedi` · **:7780** | Extras → TaskBoard / Kanban / Dashboard (board-aware) |

**Not in scope (skipped):** ai-todo, eyalzh/kanban-mcp, gablabelle/mcp-kanban — stay on the integrated TaskBoardAI fork.

---

## boardId map (source of truth)

`boardId` = **filename stem** (`boards/{boardId}.json`). MCP `boardId` args and Profile Jedi `?board=` use this value.

| Profile | Workspace path | boardId |
|---------|----------------|---------|
| JonBeatz (hub) | `D:\Hermes\projects\JonBeatz` | `jonbeatz` |
| Next-Flick | `D:\Hermes\projects\Next-Flick` | `next-flick` |
| DigitalStudioz | `D:\Hermes\projects\DigitalStudioz` | `digitalstudioz` |
| VaderLabz | `D:\Hermes\projects\VaderLabz` | `vaderlabz` |
| JonBeatz.dev | `D:\Hermes\projects\JonBeatz.dev` | `jonbeatz-dev` |
| MSC | `D:\Cursor_Projectz\MyStudioChannel` | `msc` |

**New profile:** bootstrap (`bootstrap-new-project.ps1`) and Profile Jedi **New/Adopt** auto-register via `kanban-stack/register-fleet-kanban-board.ps1` — upserts `profiles.json` + creates `boards/{boardId}.json` from `board-stub.json`. Manual fallback below.

**Manual only if needed:** add row to `profiles.json`, create `boards/{boardId}.json` from `shared-profile-content/templates/board-stub.json`.

---

## Commands (JonBeatz hub)

```powershell
npm run kanban:start   # TaskBoardAI :3001 + Hermes Workspace :3005 + Dashboard :9119
npm run kanban:stop    # Stop all three
npm run kanban:seed    # One fleet-verify task per profile board (idempotent)
```

From any profile folder you can call the same scripts via absolute path:

```powershell
powershell -File D:\Hermes\projects\_core-scripts\kanban-stack\start-kanban-stack.ps1
```

Profile Jedi **Extras** auto-starts the stack if **:3001** is down.

---

## MCP (agents)

**Config (global — reload Cursor after edit):**

```json
"taskboard": {
  "command": "node",
  "args": ["D:\\Hermes\\apps\\TaskBoardAI\\server\\mcp\\kanbanMcpServer.js"],
  "env": { "USE_LOCAL_BOARDS": "true" }
}
```

**Key tools:** `get-boards`, `get-board`, `create-board`, `update-card`, `move-card`, `batch-cards`.

**Agent rule:** When Jon asks to add/update tasks, todos, or kanban cards, use **TaskBoard MCP** with the **active workspace’s `boardId`** (see table above). Do **not** duplicate MCP in project `.cursor/mcp.json`.

**Smoke:** After `kanban:start`, in Cursor ask the agent to run MCP `get-boards` — should list fleet boards.

---

## TaskBoard vs Hermes Workspace (data layers)

| Port | UI | Data store |
|------|-----|------------|
| **:3001** | TaskBoardAI manager | JSON files `TaskBoardAI/boards/{boardId}.json` — **fleet source of truth for planning** |
| **:3005** | Hermes Workspace drag-and-drop | Hermes SQLite (`%LOCALAPPDATA%\hermes\kanban\boards/<slug>/`) or Dashboard plugin when **:9119** is up |

`:3001` deep-link `?board={boardId}` + header **Switch board** modal (lists `/api/boards`, navigates on pick).  
`:3005` → open **`http://localhost:3005/tasks`** for the visual kanban UI (Hermes Tasks screen).

### Fleet Command (default `:3001/`)

When **no** `?board=` query is present, TaskBoardAI shows a **read-only Fleet Command rollup** instead of empty kanban columns:

| Piece | Detail |
|-------|--------|
| **API** | `GET /api/fleet/overview` — aggregates all rows in `profiles.json` |
| **UI** | Per-project cards with counts + top active tasks; click → `?board={boardId}` |
| **Next Steps** | Live lines derived from each profile board (not static hints) |
| **HUD** | System gauges stay live; task readouts show fleet-wide todo / in-progress / blocked |
| **Data** | Read-only — tasks are **not** written to `boards/kanban.json` |

Profile registry: `D:\Hermes\projects\_core-scripts\profile-switcher\profiles.json` (override with `FLEET_PROFILES_JSON`).

Clear Hermes Workspace SQLite board (agent ops, not fleet JSON): `_core-scripts/kanban-stack/clear-hermes-kanban-board.mjs`.

### Footer command bar (DRAVEN)

| Zone | Behavior |
|------|----------|
| **DRAVEN Active** | Fleet assistant status; subline shows live core/optional service counts |
| **Service capsules** | Real TCP/HTTP probes every 8s via `GET /api/services/status` |
| **Fleet Health** | Modal: ports, ngrok tunnel, **full LiteLLM model list** (DeepSeek direct + all OpenRouter aliases from `litellm_config.yaml`), Profile Jedi |
| **Profile Jedi** | Smart: opens :7780 if running, otherwise auto-starts dev server (**minimized** cmd window on Windows) |
| **Switch Board** | Opens fleet board picker modal |

### Header controls (`:3001`)

| Button | Behavior |
|--------|----------|
| **Attention** | Fleet Command: blocked tasks fleet-wide + missing boards. Board view: agent approvals + task errors. |
| **Copy** | Clipboard JSON — fleet overview or current board snapshot |
| **Refresh** | Re-fetch board / fleet rollup + service probes |
| **Import** | Pick a `.json` file → `POST /api/boards/import` → open imported board |
| **Archive** | Board view only — `POST /api/boards/{id}/archive` (disabled on Fleet Command home) |
| **Settings** | HUD, Next Steps, polling, compact density (localStorage) |

**Core services (red when offline):** Hermes :8642, LM Studio :1234, Dashboard :9119, LiteLLM :4000  
**Optional (muted when off):** ComfyUI :8188  
(Postiz removed — MSC social-autopost only, not fleet-wide.)

---

## Verification (2026-07-08 test pass)

| Check | Result |
|-------|--------|
| `GET /api/boards` | 7 fleet JSON boards listed |
| `?board=next-flick` | Shows **Next-Flick** + `boards/next-flick.json` |
| **Switch board** modal | Lists all boards; navigation updates URL + content |
| `npm run kanban:seed` | One **Fleet verify - …** task per profile board (idempotent) |
| MCP `taskboard` | Global stdio — use `boardId` per workspace |
| `:3005` `/tasks` | Hermes Workspace Tasks UI loads (SQLite / Dashboard layer; MSC legacy tasks visible when `KANBAN_BOARD=msc-website-v9`) |

Seed script: `_core-scripts/kanban-stack/seed-fleet-board-tasks.ps1`

---

## TaskBoard vs ReCall vs backlog

| System | Use for |
|--------|---------|
| **TaskBoard / MCP** | Actionable session tasks, kanban columns, agent-managed todos |
| **ReCall.md** | Session handoff, tomorrow checklist, gotchas |
| **NEXT-FLICK-BACKLOG.md** (product) | Shipped-feature queue / PRD items — not every card belongs on kanban |

Agents may **mirror** a backlog item to kanban when Jon wants it tracked this week.

---

## URLs

| Target | URL |
|--------|-----|
| TaskBoard (profile board) | `http://localhost:3001/?board={boardId}` |
| Hermes Kanban UI | `http://localhost:3005` |
| Dashboard | `http://localhost:9119` |
| Profile Jedi | `http://localhost:7780` |

---

## Env (TaskBoardAI)

`D:\Hermes\apps\TaskBoardAI\.env`:

- `PORT=3001`
- `USE_LOCAL_BOARDS=true`
- Do **not** point `BOARD_FILE` at a single external project path — fleet uses `boards/*.json`.

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| MCP `taskboard` missing | Reload Cursor MCP; confirm global `mcp.json` entry |
| Board not found | `boardId` must match `boards/{boardId}.json` filename |
| UI won't load on **:3001** | `npm run kanban:start` from JonBeatz |
| **:3005** Hermes Workspace fails | `cd D:\Hermes\apps\hermes-workspace && npm install`, then retry `kanban:start` |
| Wrong board in Profile Jedi | Edit profile `boardId` in Jedi or `profiles.json` |
| Port conflict | Next.js dev uses **:3000**; kanban stack uses **:3001** / **:3005** — both can run |

---

*shared-profile-content v1.24.0 · 2026-07-08*
