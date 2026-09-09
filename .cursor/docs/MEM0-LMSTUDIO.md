# Mem0 + LM Studio — Fleet memory

How local memory works across Hermes profiles and what agents must know before add/search.

**This doc is fleet-wide.** Identity values differ per project — **never assume `jonbeatz_personal`.**

---

## Identity (read for *this* open project)

1. Open **`TRUTH.md`** in the current workspace — Mem0 user / collection / Qdrant path live there.
2. Confirm **`.env.local`** (`MEM0_*` or project-prefixed vars such as `JBD_MEM0_*`).
3. Optional cross-check: `hermes-desktop-profile.json` → `mem0` block (must match TRUTH).
4. Full fleet table: [FLEET-TEAM-MEMORY.md](./FLEET-TEAM-MEMORY.md) → **Mem0 scopes**.

| Project folder | Hermes slug | Typical Mem0 user / collection / Qdrant |
|----------------|-------------|------------------------------------------|
| JonBeatz | `jonbeatz` | `jonbeatz_personal` / `jonbeatz_personal_memories` / `qdrant_personal` |
| DigitalStudioz | `digitalstudioz` | `digitalstudioz` / `digitalstudioz_memories` / `qdrant_digitalstudioz` |
| VaderLabz | `vaderlabz` | `vaderlabz` / `vaderlabz_memories` / `qdrant_vaderlabz` |
| JonBeatz.dev | `jonbeatz-dev` | `jonbeatz_dev` / `jonbeatz_dev_memories` / `qdrant_jonbeatz_dev` |
| Next-Flick | `next-flick` | `next-flick` / `next-flick_memories` / `qdrant_next-flick` |
| The-Night-I-Met-Santa | `the-night-i-met-santa` | `the-night-i-met-santa` / `the-night-i-met-santa_memories` / (profile path) |
| MSC (separate repo) | `msc` | MSC-only — never mix with personal fleet |

**Never** write to `jonbeatz_memories` (stale name). **Never** mix MSC with personal collections.

**JonBeatz.dev naming lock (2026-08-04):** Mem0 IDs use **underscores** (`jonbeatz_dev`). Hermes profile folder / slug stays hyphenated (`jonbeatz-dev`). Do not invent `jonbeatz-dev_memories`.

---

## Architecture

```
Jon / Agent  (in an open Hermes project)
    │
    ▼
npm run mem0:add / mem0:search
    │
    ▼
scripts/mem0-chat.ps1  →  mem0-preflight.ps1 (LM Studio)
    │
    ▼
scripts/mem0_integration.py  →  Mem0 OSS (Qdrant local)
    │
    ├── LLM: LM Studio http://127.0.0.1:1234/v1  (shared with Hermes — default `qwen3-4b-instruct-2507`)
    └── Vector store: %USERPROFILE%\.mem0\<this project's qdrant path>
```

| Key | Source |
|-----|--------|
| **user_id / collection / qdrant** | This project's `TRUTH.md` + `.env.local` |
| **Python runtime** | Hermes venv `%LOCALAPPDATA%\hermes\hermes-agent\venv\Scripts\python.exe` (interactive scripts pin this — **not** Python312). Hidden cron/watchdogs must **not** launch that folder's `pythonw.exe` (uv CUI stub). |
| **Config file** | `hermes-desktop-profile.json` → `mem0` block (must match TRUTH) |

---

## Preflight (search and infer-add only)

```powershell
npm run mem0:preflight
```

Preflight **does not swap models**. If an LLM is already loaded (e.g. Hermes `qwen3-4b-instruct-2507`), Mem0 uses it. If nothing is loaded, it loads **`qwen3-4b-instruct-2507`** @ **16384** context, **parallel 1** (or `HERMES_LM_*` / `LMSTUDIO_*` from `.env.local`). Tuned for the RTX 5060 Ti 16 GB (~3.5 GiB GPU for qwen3-4b). **Do not use 81920/parallel 2** — KV cache can balloon a 4B model to ~14 GB VRAM. `session-start.ps1`, `mem0-preflight.ps1`, and `boot-doctor.ps1` source `load-env.ps1` so `.env.local` values are authoritative.

**Per-model defaults:** `npm run lmstudio:tune` (`scripts/tune-lmstudio-models.py`) sets VRAM-safe context + parallel 1 on each chat/coding model's LM Studio config (validated via `lms load --estimate-only`). Re-run after installing new models. `contextLength` is the TOTAL KV pool split across `parallel` slots.

**LM Studio UI (one-time):** Settings → Hardware → **CPU threads** = your physical core count. Scripts tune model/context/parallel via `lms load`; CPU threads stay in the app.

LM Studio is required for **search** and **`mem0:add:infer`** (LLM fact extraction). Standard **`mem0:add`** uses `infer=False` and only needs the local HuggingFace embedder — preflight is skipped.

### Windows boot policy (2026-07-08)

- **Disable** LM Studio in Task Manager → **Startup apps** (saves RAM/VRAM at login).
- **Start Project** (`session:start -- -Full`) auto-launches LM Studio if `:1234` is offline.
- **End Project** does **not** stop LM Studio — close the app manually if desired.
- Full fleet context: `FLEET-BOOT-SESSION.md`.

If preflight fails:
1. Open LM Studio → Local Server → start on port **1234**
2. Ensure `lms` is on PATH
3. Re-run preflight

---

## Commands

```powershell
# Search (agent cold-start) — uses THIS project's Mem0 scope
npm run mem0:search -- "current priorities"

# Save session takeaway (direct storage — default)
npm run mem0:add -- "Completed Profile Jedi GitHub setup and JonBeatz agent docs."

# Save with LLM fact extraction (optional; 32K ctx recommended)
npm run mem0:add:infer -- "Long conversational note for LLM to distill into facts."

# List all
npm run mem0:list

# Delete a memory by ID
npm run mem0:delete -- <memory-id>
```

Draven memory commands:
```powershell
npm run draven:add -- "text"
npm run draven:search -- "query"
npm run draven:list
npm run draven:delete -- <memory-id>
```

Python direct:
```powershell
python scripts/mem0_integration.py --action add --text "Direct storage note"
python scripts/mem0_integration.py --action add --text "Infer note" --infer
python scripts/mem0_integration.py --action search --query "Profile Jedi"
```

---

## infer=True vs infer=False

| Mode | Command | When | Notes |
|------|---------|------|-------|
| **infer=False** (default) | `mem0:add` | Session takeaways, docs sync | Direct storage; reliable with 13+ memories |
| **infer=True** | `mem0:add:infer` | Short natural notes | LLM extracts facts; needs LM Studio @ 16384 ctx |

`mem0:add` defaults to **infer=False** since v1.3.1 to prevent silent failures when the memory bank exceeds the LM Studio context window.

---

## Seeded knowledge

`scripts/seed-profile-jedi-memories.py` — Profile Jedi / Hermes switcher reference memories (10 entries). Re-run after major doc updates:

```powershell
npm run mem0:seed:profile-jedi
```

(Hub / JonBeatz — skip if the open project has no seed script.)

---

## Draven memory — AI assistant cross-session memory

Draven (the AI assistant) has his own isolated Mem0 collection, shared across **all** projects:

| Key | Value |
|-----|-------|
| **user_id** | `draven` |
| **collection** | `draven_memories` |
| **qdrant path** | `%USERPROFILE%\.mem0\qdrant_draven` |
| **Commands** | `npm run draven:add` / `draven:search` / `draven:list` / `draven:delete` |

This uses the same `mem0_integration.py` infrastructure, just with Draven-specific env vars. It's **project-independent** — Draven remembers context from all projects he works on.

### Draven memory = not per-project

Unlike `mem0:add` which targets each project's own Qdrant collection, `draven:add` always writes to `draven_memories`. This means Draven can recall context about JonBeatz when working in VaderLabz, and vice versa.

**Both Cursor and Hermes may write** project Mem0 one-liners **and** Draven Mem0 (fleet lock 2026-08-03).

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| "LM Studio endpoint not online" | Start local server on 1234; run preflight |
| "No models loaded" | `npm run mem0:preflight` |
| Empty search after add | Wait 2–3s; verify `user_id` is **this project's** TRUTH value |
| Wrong collection / mixed memories | Stop — check TRUTH + `.env.local`; never use another profile's IDs |
| "Memory recorded" but nothing stored | Fixed in v1.3.1 — `mem0:add` now uses `infer=False` by default |
| Context length error on add | Use `mem0:add` (infer=False) or `mem0:add:infer` only for short notes |
| `migrations_qdrant` already accessed / “error accessing memory layer” voice | Two Mem0 Python processes at once (usually `mem0:add` + `draven:add` in parallel). Local Qdrant exclusive-locks folders. Mem0 telemetry used to open a **shared** `~\.mem0\migrations_qdrant` even when collections differ. Integration now defaults `MEM0_TELEMETRY=false` and retries the lock. Run adds **one after another**. Retry if it still fails. Store is not corrupt. |

---

## Agent checklist (memory tasks)

1. Confirm **this project's** Mem0 IDs from `TRUTH.md` (not another profile's)
2. `npm run mem0:preflight`
3. `npm run mem0:search -- "<topic>"` before planning (project memory)
4. `npm run draven:search -- "<topic>"` — check Draven's cross-session memory
5. `npm run mem0:add -- "<takeaway>"` at end of significant work
6. `npm run draven:add -- "<takeaway>"` — also store in Draven's memory (**after** mem0:add, not in parallel)
7. `npm run mem0:delete -- <id>` / `npm run draven:delete -- <id>` — clean up stale/incorrect memories

## Recommended setup (locked 2026-07-09)

| Setting | Value | Why |
|---------|-------|-----|
| Embedder | `BAAI/bge-small-en-v1.5` | Best quality/speed for English tech memories on this PC |
| Dims | `384` | Matches Qdrant collection; no rebuild tax vs MiniLM |
| Reranker | **off** (do not set `MEM0_RERANKER=1`) | Extra CPU latency; only enable if search feels fuzzy |
| Add mode | `mem0:add` (`infer=False`) | Reliable; use `mem0:add:infer` only for short natural notes |

Set in `.env.local` (already recommended):

```
MEM0_EMBEDDER_MODEL=BAAI/bge-small-en-v1.5
MEM0_EMBEDDER_DIMS=384
```

### What “dims” means (bge-small vs bge-m3)

An **embedder** turns each memory into a list of numbers (a vector) so search can find similar notes.

| Model | Dims | Meaning |
|-------|------|---------|
| **bge-small-en-v1.5** (current) | **384** | 384 numbers per memory — fast, English-strong, fits our Qdrant stores |
| **bge-m3** (parked) | **1024** | 1024 numbers per memory — richer multilingual vectors, but ~3× larger storage + must wipe/rebuild every collection |

**Stay on bge-small** unless you need strong non-English recall. Switching to bge-m3 requires changing `MEM0_EMBEDDER_DIMS=1024` and re-running `mem0:reembed` / `draven:reembed` on every profile.

## Version notes

- **mem0ai 2.0.10** pinned in `requirements.txt` — re-run `pip install -r requirements.txt` after venv rebuilds.
- **Per-profile `history_db_path`** — each project writes memory history to `~/.mem0/history_<user_id>.db` (no cross-profile mixing).
- **`lmstudio_response_format`** — defaults to `{"type": "json_object"}` for broad model compatibility. Set `MEM0_JSON_SCHEMA=true` in `.env.local` to enable `json_schema` format for `infer=True` fact extraction.
- **`~/.mem0/config.json`** — redacted (platform API key removed). Gitignored via `.mem0/` entry in `.gitignore`.
- **Embedder (2026-07-09):** locked to `BAAI/bge-small-en-v1.5` (384 dims). After changing embedder, run **`npm run mem0:reembed`** (and **`npm run draven:reembed`** for Draven) once to rebuild vectors.
- **Reranker:** leave off. Set `MEM0_RERANKER=1` only if search quality is weak after a week of normal use.
- **2026-08-04:** Doc reframed fleet-wide (no hardcoded JonBeatz-only identity). JonBeatz.dev Mem0 IDs locked to underscores.
