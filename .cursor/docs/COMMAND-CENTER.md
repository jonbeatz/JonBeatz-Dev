# Hermes Command Center — JonBeatz Home Base

**Hub profile:** `D:\Hermes\projects\JonBeatz`  
**Shared skeleton:** `D:\Hermes\projects\_core-scripts\shared-profile-content\`  
**Asset vault (3D workflows):** `D:\Hermes\assets\3d-web-workflows\`

JonBeatz is the **delegation and propagation hub** — bootstrap new Hermes projects, push shared docs/skills to siblings, and run fleet-wide status checks from here.

---

## Three zones (D:\Hermes)

| Zone | Path | Role |
|------|------|------|
| **Factory** | `D:\Hermes\apps\` | Profile Jedi, TaskBoardAI, Hermes Desktop |
| **Office** | `D:\Hermes\projects\` | JonBeatz (hub), `_core-scripts`, sibling profiles |
| **Vault** | `D:\Hermes\assets\` | Media, 3D workflow assets, backups |

---

## Hub-only commands (run from JonBeatz)

| Command | What it does |
|---------|--------------|
| `npm run fleet:status` | Audit shared skeleton + all sibling profiles for docs/skills/npm parity |
| `npm run fleet:sync` | Push `sync:docs` + `sync:skills` to DigitalStudioz, VaderLabz, JonBeatz.dev |
| `npm run kanban:start` | TaskBoardAI :3001 + Hermes Workspace :3005 + Dashboard :9119 |
| `npm run kanban:stop` | Stop kanban stack |
| `npm run kanban:seed` | One fleet-verify task per profile board (idempotent smoke) |
| `npm run sync:docs -- -Write -AddMissing` | Pull shared universal docs into **this** profile |
| `npm run sync:skills:global` | Install all shared skills machine-wide (`~/.claude/skills`) |
| `npm run bootstrap:website` | Scaffold new `-Website` project from shared template (if aliased) |

Sibling profiles **consume** shared docs/skills; they do **not** copy the asset vault into `.cursor/`.

---

## After changing shared library

1. Edit under `_core-scripts/shared-profile-content/` (docs, skills, rules, prompts, scripts)
2. Bump `VERSION.md` if milestone-worthy
3. From JonBeatz: **`npm run fleet:sync`**
4. Verify: **`npm run fleet:status`**
5. Optional: `npm run draven:add -- "..."`

---

## Fleet sync commit checklist (required before push)

`fleet:sync` updates docs/skills and may touch **`package.json`** on siblings (e.g. scroll-motion deps). **GitHub Actions `npm ci` fails if `package-lock.json` is not committed in the same push.**

After every `npm run fleet:sync`:

| Step | Action |
|------|--------|
| 1 | Read fleet sync output — **WARN** lines for any profile with dirty `package.json` / `package-lock.json` |
| 2 | Per warned profile: `cd <profile>` → `npm install` (or accept lockfile from `npm install --package-lock-only`) |
| 3 | **Commit `package.json` + `package-lock.json` together** in that repo before `git push` |
| 4 | **DigitalStudioz GitHub Pages:** workflow uses **Node 22** — keep `engines.node >= 22` in `package.json` (R3F / `camera-controls`) |
| 5 | Run **`npm run fleet:status`** — lockfile row must show **OK** for each fleet profile |

**One-liner fix (single profile):**

```powershell
cd D:\Hermes\projects\DigitalStudioz
npm install
git add package.json package-lock.json
git commit -m "chore: sync package-lock after fleet sync"
git push
```

**Incident reference:** 2026-07-07 — DigitalStudioz Pages CI failed on `b07c65a` (docs-only commit left lockfile stale). Fixed in `397f717`.

---

## New project bootstrap

```powershell
powershell -File D:\Hermes\projects\_core-scripts\shared-profile-content\scripts\bootstrap-new-project.ps1 `
  -ProjectName "MySite" `
  -ProjectRoot "D:\Hermes\projects\MySite" `
  -ProjectSlug "mysite" `
  -ProjectDesc "Description" `
  -Website -WebsiteTaste "studio-gold" `
  -GitHub
```

Repair existing project:

```powershell
powershell -File ...\bootstrap-existing-project.ps1 -ProjectRoot "D:\Hermes\projects\MySite" -MergeEnv
```

---

## Sibling profiles (fleet)

Configured in `hermes-fleet-profiles.json`:

| Profile | Path |
|---------|------|
| **JonBeatz** (hub) | `D:\Hermes\projects\JonBeatz` |
| DigitalStudioz | `D:\Hermes\projects\DigitalStudioz` |
| VaderLabz | `D:\Hermes\projects\VaderLabz` |
| JonBeatz.dev | `D:\Hermes\projects\JonBeatz.dev` |

Add a sibling: edit JSON + run `fleet:sync`.

---

## Status checks (any web profile)

| Command | Checks |
|---------|--------|
| `npm run tools:status` | Tools watchlist + config queue |
| `npm run scroll:motion:status` | gsap/lenis/R3F/motion baseline |
| `npm run workflows:3d:status` | 3D asset vault + project wiring |
| `npm run agent-reach:doctor` | Agent-Reach channels |
| `npm run watch:check` | claude-video preflight |

**JonBeatz `docs:sync`** = local TRUTH/version alignment only. For shared universal docs use **`sync:docs`**, not `docs:sync`.

---

## Key doc map

| Doc | Purpose |
|-----|---------|
| [3D-WEB-WORKFLOWS.md](./3D-WEB-WORKFLOWS.md) | 3D asset vault hub |
| [TOOLS-WATCHLIST.md](./TOOLS-WATCHLIST.md) | Tool grades + review queue |
| [MOBILE-START-HERE.md](./MOBILE-START-HERE.md) | Flutter / iOS / Android homebase |
| [FITNESS-CHECK.md](./FITNESS-CHECK.md) | Skeleton self-audit checklist |
| [MASTER-COMMANDS.md](./MASTER-COMMANDS.md) | Full npm reference |
| `TRUTH.md` (profile root) | JonBeatz constitution |

---

## Related repos (outside fleet sync)

| Project | Path |
|---------|------|
| MyStudioChannel | `D:\Cursor_Projectz\MyStudioChannel` |
| Profile Jedi | `D:\Hermes\apps\profile-jedi` |

Open those workspaces separately — not in `hermes-fleet-profiles.json`.
