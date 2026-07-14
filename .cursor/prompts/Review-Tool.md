# Review Tool — Hermes Watchlist Ritual (v2)

> **Fleet scope:** Tool reviews are **Hermes-wide knowledge**. Jon may trigger reviews from JonBeatz (hub), but **persist to** `_core-scripts/shared-profile-content/` **first** — then `sync:docs` / `fleet:sync`. See [FLEET-TOOLS-KNOWLEDGE.md](../docs/FLEET-TOOLS-KNOWLEDGE.md).

## Triggers

| Jon says / sends | Mode |
|------------------|------|
| Paste **one** repo/product URL | **Single review** |
| Paste **multiple URLs** or **`review batch`** | **Batch review** |
| **`review tool`**, **`evaluate tool`**, **`grade this tool`** | Single (URL in message) |
| **`review design`**, **`grade this site`** + URL | **Design grade** (full rubric → DESIGN-REFERENCES + optional showcase queue) |
| Design/inspiration URL only (no grade keyword) | **Bookmark only** → DESIGN-REFERENCES add queue (no grade) |
| **`re-review`**, **`refresh grade`** + name/URL | **Re-grade** (see Re-grade policy) |

---

## Step 0: Duplicate pre-check (mandatory)

Before research, search canonical docs for the URL slug, repo name, or product name:

```powershell
npm run tools:review-precheck -- "query-or-url"
```

Also grep:

- `_core-scripts/shared-profile-content/docs/TOOLS-WATCHLIST.md`
- `_core-scripts/shared-profile-content/docs/TOOLS-REFERENCE.md`
- `_core-scripts/shared-profile-content/docs/DESIGN-REFERENCES.md`

| Result | Action |
|--------|--------|
| **Already reviewed (IN USE / ADOPT / WATCH)** | Show existing grade + date. **Do not** re-research unless Jon said **re-review** / **refresh grade** or a major version shipped. |
| **Bookmark only in DESIGN-REFERENCES** | Offer full tool grade if repo/API, or design grade if Jon used **review design**. |
| **Not found** | Proceed to Step 1. |

---

## Step 1: Research

- Fetch README / docs (Firecrawl MCP preferred for product pages; fetch MCP for GitHub raw)
- Tavily for recent reviews if needed
- Context7 if library/SDK
- Compare vs `TOOLS-SETUP-STATUS.md` production matrix + overlap map

**Security gate (mandatory — not optional)** when the tool touches **any** of:

- Auth / OAuth / deploy / SSH / hosting
- Writes agent config (`install` hooks, MCP auto-wiring, `.claude/`, `.cursor/`)
- Secrets, billing, or production data paths

→ Launch **`security-review`** subagent before grading. Include findings in **Risks** block.

**Subagent dispatch (optional otherwise):**

| Phase | Subagent | When |
|-------|----------|------|
| Repo/docs scrape | `explore` or Firecrawl MCP | Large README, multi-page docs |
| Stack overlap audit | `generalPurpose` | Compare vs TOOLS-WATCHLIST + 3D vault |
| Final grade write-up | Parent agent | Always — single verdict for Jon |

---

## Step 2: Grade (rubric)

| Factor | Weight |
|--------|--------|
| Gap fill | 40% |
| Stack fit | 25% |
| Cost / VRAM / complexity | 20% |
| Maturity / trust | 15% |

Assign letter (A+→F) and score /100. Overlap reduces gap-fill slightly — **does not auto-SKIP**.

**Design grade** (when **review design** / **grade this site**): same rubric, but gap fill = motion/craft/showcase value; stack fit = Next.js + GSAP + R3F + Hermes showcase spec.

---

## Step 3: Verdict + setup status

**Doc threshold:** Below **B- (80)** → grade in chat only — **do not** persist to TOOLS-* unless Jon explicitly asks.

| Verdict | Meaning |
|---------|---------|
| **IN USE** | Installed and active (after Jon approval) |
| **ADOPT** | Approved on deck — install when asked |
| **WATCH** | Keep on radar |
| **SKIP** | Not pursuing |

| Setup | Meaning |
|-------|---------|
| **READY** | No keys; works now |
| **PARTIAL** | Works with caveats or optional key |
| **NEEDS_KEY** | API token required |
| **NEEDS_LOGIN** | OAuth / desktop app / burner account |
| **NOT_INSTALLED** | Approved but not installed |

---

## Step 4: Handoff in chat (grades first — mandatory)

**Before** docs persist or any install prompt, post **one block per item** using this template:

```markdown
## [Tool or Site Name] — [Grade] ([score]/100)
**Verdict:** … · **Setup:** … · **Cost:** …

**Summary:** one line

**Gap:** what it solves for Jon's stack (or showcase craft)
**Overlap:** Mem0 / Hermes / LiteLLM / MCPs / skills / existing tools
**Risks:** Windows hooks / ports (:3000/:4000/:5678) / VRAM / AGPL / auto-install side effects / SmartScreen
**Verify:** `npm run …` or doctor command (see TOOLS-SETUP-STATUS verify registry)
**Recommendation:** adopt / watch / skip — why
```

**Do not** lead with `AskQuestion` or "shall I install?" — Jon must see grades and summaries first.

### Batch mode (multiple URLs)

1. Run Step 0 per URL (can batch precheck calls).
2. Post **one template block per tool** (all grades before any install prompt).
3. End with a **session scoreboard** table:

| Tool | Grade | Verdict | Setup | Install? |
|------|-------|---------|-------|----------|
| … | … | … | … | queue / now / skip |

4. **One** `AskQuestion` for all ADOPT/IN USE items not yet installed — not one prompt per tool.

---

## Step 5: Update docs + fleet artifacts (shared canonical)

**Write target is always** `D:\Hermes\projects\_core-scripts\shared-profile-content\` — **not** JonBeatz `.cursor/docs` alone.

### 5a — Docs (B-+ tool reviews)

Edit `shared-profile-content/docs/`:

| Doc | When |
|-----|------|
| **TOOLS-WATCHLIST.md** | Tool review B-+ ; review queue row |
| **TOOLS-REFERENCE.md** | Tool review B-+ ; full write-up |
| **TOOLS-SETUP-STATUS.md** | Tool review B-+ ; add **Verify** row if new IN USE/ADOPT |
| **TOOL-CHEST-INDEX.md** | IN USE or daily-driver worthy |
| **DESIGN-REFERENCES.md** | Design URL (bookmark or design grade) |
| **HERMES-SHOWCASE-SPEC.md** | Design grade with build technique worth queuing |
| **ENV-VARS-REFERENCE.md** | New keys |
| **FLEET-TOOLS-KNOWLEDGE.md** | Policy / propagation changes (rare) |
| **EMIL-ANIMATION-SKILLS.md** | Motion skill pack workflow changes |

Then from **any** profile with `sync:docs`:

```powershell
npm run sync:docs -- -Write
```

### 5b — Fleet artifacts (IN USE / ADOPT installs)

When Jon approves install, place **durable** artifacts in shared skeleton:

| Artifact type | Canonical path |
|---------------|----------------|
| Cursor skill | `shared-profile-content/skills/<name>/` |
| Doctor / status script | `shared-profile-content/scripts/<name>-status.ps1` |
| npm alias | `shared-profile-content/templates/package.json` |
| Always-on rule | `shared-profile-content/rules/*.mdc` |
| Ritual prompt | `shared-profile-content/prompts/*.md` |

After adding scripts or skills:

```powershell
# From JonBeatz hub (recommended)
npm run fleet:sync
npm run fleet:status
```

Sibling profiles receive docs, skills, and review prompts/rules via fleet sync + `sync:rituals`.

---

## Step 6: Install gate (AskQuestion — only after Step 4)

**Single review:** AskQuestion only if ADOPT/IN USE and not installed.

**Batch review:** One AskQuestion with multi-select style options:

- **Install selected now** (list ADOPT items)
- **Queue all — docs only**
- **Skip installs this session**

**Never install** without Jon's selection or explicit **run install now**.

---

## Step 7: Post-install verification

Run verify command from **TOOLS-SETUP-STATUS.md → Post-install verify registry** (or tool-specific doctor).

```powershell
npm run tools:status
npm run sync:mcp-env          # if MCP keys added
# examples:
npm run agent-reach:doctor
npm run codebase-memory:status
npm run openmontage:status
```

Flip Setup to **READY** or **PARTIAL** in TOOLS-SETUP-STATUS.md.

---

## Step 8: Mem0 / vault (on ADOPT→IN USE or fleet policy)

- `npm run mem0:add -- "Tool X: grade, verdict, path"` (profile scope — note **fleet** path in text)
- `npm run draven:add -- "Tool X: grade, verdict, one line"`
- Vault: `03_AI_Memory/Sessions/YYYY-MM-DD-<profile>.md` + link to canonical `TOOLS-WATCHLIST.md` row (not a duplicate grade table)

---

## Re-grade policy

| Verdict | Re-review when |
|---------|----------------|
| **WATCH** | Major version release, or **6 months** since last queue row date |
| **IN USE** | Breakage, upgrade, or Jon says **re-review** |
| **ADOPT** | Before install if row is **>3 months** old |
| **SKIP / C+** | Only when Jon explicitly asks |

On re-grade: show **previous vs new** grade in chat; update docs if verdict changes.

---

## Review session closeout

When Jon says **`review session done`** → execute [Review-Session-Done.md](./Review-Session-Done.md).
