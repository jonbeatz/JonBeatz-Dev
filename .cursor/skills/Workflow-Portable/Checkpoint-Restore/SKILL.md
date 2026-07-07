---
name: checkpoint-restore
description: Creates consistent restore points with branch/SHA, working-state notes, exact rollback commands, and the full MSC-Website branch-cut + version bump ritual.
---

# Checkpoint + Restore (Portable)

Use this skill to create fast rollback confidence after meaningful milestones and to **cut a new MSC development branch** without leaving GitHub or docs out of sync.

## When to add a restore point

- major UI/admin milestone
- deploy stability fix
- schema/migration change
- **branch handoff or release checkpoint** (always pair with RP row in `Restore-Points.md`)

## Restore point template

Use this row format in `.cursor/docs/Restore-Points.md`:

`| RP-YYYY-MM-DD-short-name | YYYY-MM-DD | Summary with active branch @ sha, frozen branch @ sha, version N.0.0, backup folder. Restore v(prev): git fetch origin && git checkout MSC-Website-v(prev) && git reset --hard <sha>. Restore v(N): git fetch --tags origin && git checkout MSC-Website-vN && git pull. |`

## Required checkpoint data

1. Checkpoint ID (`RP-…`)
2. Branch + commit SHA (active **and** frozen)
3. What was confirmed working
4. Exact restore commands (copy-paste ready)
5. Caveats (env/dependency/host notes; **live host version** if repo version moved)

---

## MSC branch-cut ritual (full)

**Prompt workflow:** `.cursor/prompts/Branch-Cut.md`  
**Triggers:** "branch cut", "Cut MSC-Website-vN", "cut development branch", "Lets Cut New Branch"

MyStudioChannel uses numbered branches (`MSC-Website-v10`, `MSC-Website-v11`, …) aligned with semver **`N.0.0`** in `package.json`. A branch cut is **not** just `git checkout -b`.

### Naming

| Active (today) | Cut creates | Version after bump | Git tag |
|----------------|-------------|--------------------|---------|
| `MSC-Website-v10` | `MSC-Website-v11` | `11.0.0` | `v11.0.0` |
| `MSC-Website-v9` | `MSC-Website-v10` | `10.0.0` | `v10.0.0` |

Previous active branch becomes the **frozen restore line** at its current SHA.

### Checklist (agent executes in order)

#### 0 — Preflight

- [ ] `git status -sb` clean (or commit first)
- [ ] Record **freeze SHA** on current active branch
- [ ] `npm run msc:backup:quick` (recommended)
- [ ] Confirm target `N` and branch name `MSC-Website-v{N}`

#### 1 — Branch

```powershell
git fetch origin
git checkout MSC-Website-v{prev}
git pull
git checkout -b MSC-Website-v{N}
```

#### 2 — Governance files

| File | Action |
|------|--------|
| `TRUTH.md` | Primary Branch → v{N} active; v{prev} frozen @ `<sha>` |
| `.cursor/docs/Restore-Points.md` | New **`RP-…-vN-start`** row |
| `.github/workflows/verify.yml` | Add `MSC-Website-v{N}` to push branches |

#### 3 — Version bump (automated gate)

```powershell
powershell -ExecutionPolicy Bypass -File scripts/version-bump.ps1 -Force -BranchName MSC-Website-v{N}
```

Script responsibilities (do not skip):

- `package.json` → **`N.0.0`**
- README **badge** + **Current Status table**
- `CHANGELOG.md`, `project-log.md`, scoped `Checkpoint.md` Current Status
- **types validate + lint + build**
- commit, push, tag **`vN.0.0`**
- **GitHub Release `--latest`** (default; use `-SkipRelease` only if tag-only is intentional)

#### 4 — Post-bump

- [ ] Audit `Checkpoint.md` **milestone table** — historical rows must keep correct v6–v(prev) branch names
- [ ] Commit/push any remaining `TRUTH.md`, `verify.yml`, Checkpoint fixes
- [ ] `npm run msc:docs:sync` → must pass (README table vs `package.json`)
- [ ] Verify GitHub Releases sidebar shows **vN.0.0 Latest**
- [ ] Optional: **update docs and mem0** (Path B)

#### 5 — Report to operator

Include: active @ sha, frozen @ sha, tag, GitHub Latest, **live site still old version until deploy**.

### Restore commands (template)

```powershell
# Roll back to frozen previous line
git fetch origin
git checkout MSC-Website-v{prev}
git reset --hard <freeze-sha>

# Continue on new active line
git fetch --tags origin
git checkout MSC-Website-v{N}
git pull
```

### Pitfalls learned (2026-06-19)

1. **Git tag ≠ GitHub Release** — sidebar "Latest" needs `gh release create … --latest` (now default in `version-bump.ps1`).
2. **README table vs badge** — both must update; `msc-audit-docs.mjs` fails on drift.
3. **Checkpoint history** — never global-replace `MSC-Website-v\d+` in milestone tables.
4. **Live vs repo** — bumping repo to v10 does not change mystudiochannel.com until **`pushit:live`**.

---

## Simple branch-only flow (deprecated for MSC releases)

Use only for **experimental** short-lived branches **without** a version bump:

1. Confirm working tree status
2. Create branch from current HEAD
3. Push upstream tracking
4. Confirm branch + status

For **MSC-Website-vN** release lines, always use the **full ritual** above.
