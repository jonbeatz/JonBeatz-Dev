# Fleet Tools Knowledge — Hermes-wide policy

**Canonical home:** `D:\Hermes\projects\_core-scripts\shared-profile-content\docs\FLEET-TOOLS-KNOWLEDGE.md`  
**Hub workspace (review desk):** `D:\Hermes\projects\JonBeatz` — Jon often reviews tools *from* JonBeatz, but **reviews are fleet knowledge**, not JonBeatz-only.

---

## Mental model

| Layer | Path | Role |
|-------|------|------|
| **Canonical write** | `_core-scripts/shared-profile-content/` | Source of truth for TOOLS-*, skills, scripts, rules, prompts |
| **Profile mirrors** | `<profile>/.cursor/docs/TOOLS-*.md` | Read-only copies via `npm run sync:docs -- -Write` |
| **Profile skills** | `<profile>/.cursor/skills/` | Copies via `npm run sync:skills` |
| **Machine global** | `%USERPROFILE%\.agents\skills\` | Optional; some packs (Hallmark, emilkowalski) also vendored to shared library |
| **Vault** | `H:\Vader_Vault\04_Research\` | Human-readable cross-project memory (links to canonical docs) |

**Rule:** When Jon says **review tool**, **update docs**, or accepts an install — agents **edit shared-profile-content first**, then sync/propagate. Never treat JonBeatz `.cursor/docs` as the only write target.

---

## What belongs in shared (fleet-wide)

| Artifact | Canonical location | Propagate via |
|----------|-------------------|---------------|
| Tool grades B-+ | `docs/TOOLS-WATCHLIST.md`, `TOOLS-REFERENCE.md`, `TOOLS-SETUP-STATUS.md` | `sync:docs -- -Write` |
| Daily drivers / keys | `docs/TOOL-CHEST-INDEX.md`, `ENV-VARS-REFERENCE.md` | `sync:docs` |
| Design / showcase refs | `docs/DESIGN-REFERENCES.md`, `HERMES-SHOWCASE-SPEC.md` | `sync:docs` |
| Workflow docs | `docs/EMIL-ANIMATION-SKILLS.md`, `FLEET-TOOLS-KNOWLEDGE.md`, etc. | `sync:docs -AddMissing` |
| Skills (IN USE) | `skills/<name>/` | `sync:skills` + `fleet:sync` |
| Doctor / verify scripts | `scripts/*-status.ps1`, `tools-*.ps1` | `templates/package.json` + manual sibling bump |
| Agent rules | `rules/tools-watchlist.mdc`, `workflow.mdc` | `sync:rituals` / `fleet:sync` |
| Ritual prompts | `prompts/Review-Tool.md`, `Review-Session-Done.md`, `Update-Docs.md` | `sync:rituals` / `fleet:sync` |

---

## What stays profile-local

| Artifact | Example | Why |
|----------|---------|-----|
| `TRUTH.md`, `ReCall.md`, `project-log.md` | JonBeatz v4 branch focus | Per-repo constitution + session state |
| `CHANGELOG.md`, `Checkpoint.md` | JonBeatz releases | Project version history |
| Deploy runbooks | `JONBEATZ-SITE-DEPLOY.md` | Site-specific |
| Mem0 scope | `jonbeatz_personal` vs MSC | Profile boundary |

Tool **grades** and **install status** are never profile-local.

---

## Review workflow (fleet)

1. **Research** from any open profile (usually JonBeatz hub).
2. **Grade in chat first** — full template before install prompts.
3. **Persist B-+** → edit `_core-scripts/shared-profile-content/docs/TOOLS-*.md` (not JonBeatz mirror only).
4. **Install artifacts** → shared `skills/`, `scripts/`, `rules/`, `templates/package.json` as needed.
5. **Sync mirrors** from hub:
   ```powershell
   npm run sync:docs -- -Write
   npm run encoding:check
   npm run tools:status
   ```
6. **Propagate fleet** (when skills, rules, prompts, or universal docs changed):
   ```powershell
   npm run fleet:sync
   npm run fleet:status
   ```
7. **Git** — commit `_core-scripts` **and** hub/sibling mirrors when Jon asks (two repos minimum for tool sessions).

Closeout: **`review session done`** → [Review-Session-Done.md](../prompts/Review-Session-Done.md).

---

## Update docs workflow (fleet)

**`update docs`** from any profile:

1. Fix **shared canonical** docs if TOOLS-* or universal docs drifted.
2. Run **`npm run docs:sync`** (pulls shared → `.cursor/docs` mirror).
3. Fix **profile-local** only items (`TRUTH.md`, `ReCall.md`, version in `package.json`).
4. If new scripts/skills/rules were added → **`npm run fleet:sync`** from JonBeatz hub.
5. Phase 6 backport check → [BACKPORT-CANDIDATES.md](./BACKPORT-CANDIDATES.md).

See [Update-Docs.md](../prompts/Update-Docs.md).

---

## Hub commands (run from JonBeatz)

| Command | Purpose |
|---------|---------|
| `npm run fleet:sync` | Push docs + skills + session rituals to all fleet profiles |
| `npm run fleet:status` | Audit parity (missing TOOLS-*, scripts, skills) |
| `npm run sync:docs -- -Write -AddMissing` | Refresh this profile's mirrors |
| `npm run tools:review-precheck -- "url"` | Duplicate check against canonical TOOLS-* |

---

## IN USE fleet tools (2026-07-13 batch)

| Tool | Docs (shared) | Runtime / install | Scripts (shared) | Per-profile |
|------|---------------|---------------------|------------------|-------------|
| **emilkowalski/skills** | TOOLS-* + `EMIL-ANIMATION-SKILLS.md` | `skills/` (5 folders) + optional `~\.agents\skills\` | `emil-skills-install.ps1`, `emil-skills-status.ps1` | `.cursor/skills/` via `sync:skills` |
| **codebase-memory-mcp** | TOOLS-* | Machine binary + per-repo index DB | `codebase-memory-status.ps1` | Run `codebase-memory:reindex` from each profile root |
| **OpenMontage** | TOOLS-* | `D:\Hermes\assets\openmontage` (fleet asset vault) | `openmontage-status.ps1` | Same vault for all profiles — not per-repo |
| **Handy** | TOOLS-* | `%LOCALAPPDATA%\Handy\` (winget `cjpais.Handy`) | `handy-status.ps1`, `handy-model.ps1` | Models in `~/.cache/huggingface/hub` (`handy-computer/*-gguf`) |
| **Wan2.1** | TOOLS-* | `H:\AI_Models\Wan2.1` (weights 2GB+ on H:) | `wan21-install.ps1`, `wan21-status.ps1` | ComfyUI path on Windows; native `generate.py` needs Linux `flash_attn` |

---

## Large asset storage (Jon PC — fleet default)

When installing tools that pull **heavy LLM weights or files ≥2GB**, use **`H:\`** (especially **`H:\AI_Models`** via `AI_MODELS_ROOT` in `.env.local`). Smaller per-app caches (e.g. Handy GGUF in HF hub cache on C:) are OK when the consuming app expects that path.

| Asset type | Default path | Script |
|------------|--------------|--------|
| Video / diffusion weights | `H:\AI_Models\<tool>` | `wan21-install.ps1`, ComfyUI models dir |
| ComfyUI install | `H:\AI_Models\ComfyUI` | `COMFYUI_ROOT` |
| 3D / workflow vault | `D:\Hermes\assets\` | `vault:*`, `workflows:3d:status` |
| Fleet app clones | `D:\Hermes\assets\` | OpenMontage, etc. |

**New tool install checklist (always shared-profile-content first):**

1. Grade + persist to `docs/TOOLS-*.md` (B-+ only).
2. Add `scripts/<tool>-status.ps1` (+ `-install.ps1` if multi-GB).
3. Wire npm aliases in `templates/package.json` + hub `package.json`.
4. Document in `MASTER-COMMANDS.md` + `TOOLS-REFERENCE.md` verify row.
5. `npm run sync:docs -- -Write` → `fleet:sync` if rules/skills changed.
6. Commit `_core-scripts` + hub mirror when Jon asks.

---

## Related

- [COMMAND-CENTER.md](./COMMAND-CENTER.md) — hub zones + fleet sync checklist  
- [TOOLS-WATCHLIST.md](./TOOLS-WATCHLIST.md) — grades table  
- [Review-Tool.md](../prompts/Review-Tool.md) — single / batch / design review  
- `.cursor/rules/tools-watchlist.mdc` — agent always-on policy  

**Last updated:** 2026-07-13 (v1.31.4 — fleet:merge-npm + sibling npm alias propagate; cua-overlay status checks)
