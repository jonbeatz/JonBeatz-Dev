# DesignLab (alias VaderBoard) — Mood Board / Reference Studio

**Product:** DesignLab · **Alias:** VaderBoard  
**App:** `D:\Hermes\apps\designlab`  
**Engine:** [Excalidraw](https://github.com/excalidraw/excalidraw) (MIT) — **not** tldraw (production license)  
**UI:** http://127.0.0.1:3090  
**Grade:** **A- (90)** · **Verdict:** **IN USE** · **Setup:** **READY**

Fleet-wide local mood board for design refs, sticky ideas, UI option dumps, and project brainstorming — FigJam-like without SaaS. Cursor agents can read boards via JSON + PNG export.

---

## What it is

| Piece | Role |
|-------|------|
| **DesignLab** | Product name (Factory app) |
| **VaderBoard** | Alias / lore shorthand (same app) |
| **Excalidraw** | Infinite canvas — drag images, draw, text, frames |
| **Disk boards** | `data/boards/{id}.json` source of truth |
| **Agent export** | `data/exports/{id}.png` after **Export for Agent** |

**Not:** Figma/Penpot (UI design systems) · TaskBoardAI (kanban) · Obsidian Canvas (vault notes) — complementary.

---

## When to use (any Hermes project)

- Mood boards / visual refs for websites, books, 3D, brand
- Side-by-side design options (keep / kill / maybe)
- Sticky-note brainstorm before code or InDesign
- Collecting screenshots + ComfyUI/HF outputs on one canvas
- Agent review: export PNG → Cursor critiques layout / hierarchy

Tag each board’s **Project** field (`TNIMS`, `Harlows-Big-Adventure`, `VaderLabz`, `JonBeatz.dev`, …).

---

## Commands

**From app:**

```powershell
cd D:\Hermes\apps\designlab
npm run dev          # UI :3090 + API :3091 (proxied)
npm run build
npm start            # production both on :3090
```

**From JonBeatz hub:**

```powershell
npm run designlab:dev
npm run designlab:start
npm run vaderboard:dev      # alias
npm run vaderboard:start    # alias
```

---

## Agent bridge (Cursor ↔ board)

1. Jon runs DesignLab (`designlab:dev` or `start`)
2. Agent: `GET http://127.0.0.1:3090/api/agent/context`
3. Read `D:\Hermes\apps\designlab\data\boards\*.json`
4. Jon clicks **Export for Agent** → agent reads `data/exports/{id}.png` (Read tool) or browser-screenshots `:3090`
5. Suggest frames/stickies/copy; Jon applies on canvas

App notes: `D:\Hermes\apps\designlab\AGENTS.md` · `README.md`

### API (localhost)

| Endpoint | Purpose |
|----------|---------|
| `GET /api/health` | Product + paths |
| `GET /api/boards` | List |
| `GET /api/boards/:id` | Full scene |
| `POST /api/boards` | Create `{ title, project }` |
| `PUT /api/boards/:id` | Save scene |
| `POST /api/boards/:id/export` | Save PNG |
| `GET /api/agent/context` | Agent cheat sheet |

---

## Related tools

| Tool | Lane |
|------|------|
| **Penpot** | Figma-class design (WATCH) — not mood board |
| **Pencil MCP** | Quick canvas sketches |
| **DESIGN-REFERENCES** | URL bookmarks |
| **Obsidian Canvas** | Vault-native light boards |
| **tldraw** | SKIP as free product base (license) |

---

## Risks

- Boards gitignored (large base64 images) — backup `data/` with profile backups if needed
- Port **3090** — avoid clashes
- tldraw must not replace Excalidraw without commercial license
