# Project Structure Standard — JonBeatz Ecosystem

This document defines the **standard project layout** used across the JonBeatz ecosystem.
Every new project should follow this skeleton so agents can always find their way around.

## The Standard Layout

Every project lives under `D:\Hermes\projects\<ProjectName>\` and follows this structure:

```
<ProjectName>/
├── TRUTH.md                      # Constitution — identity, rules, connections
├── START-HERE.md                 # Daily ops — handshake, rituals, local services
├── AGENTS.md                     # Agent orientation — doc hierarchy, skills
├── REPO-BRAIN.md                 # Onboarding guide — how this project was built
├── package.json                  # npm scripts (shared commands + project-specific)
├── .cursorrules                  # Always-applied workspace rules
├── .env.local                    # Secrets (gitignored, template at .env.local.example)
├── .cursor/
│   ├── rules/                    # Shared rules (*.mdc) from _core-scripts
│   ├── prompts/                  # Session rituals (Start-Project, End-Project, etc.)
│   ├── docs/                     # Project docs + references
│   │   ├── ReCall.md             # Session memory log
│   │   ├── project-log.md        # Project changelog
│   │   ├── MASTER-COMMANDS.md    # All npm commands
│   │   └── ...                   # Project-specific docs
│   ├── skills/                   # Domain skills from shared library
│   └── mcp.json                  # MCP server configurations
└── scripts/                      # Project-specific scripts (mirrors shared scripts)
```

## The Source of Truth

All shared brains live in **`D:\Hermes\projects\_core-scripts\shared-profile-content\`**:

| Shared Resource | Path | Purpose |
|-----------------|------|---------|
| Templates | `templates/` | TRUTH, START-HERE, AGENTS, REPO-BRAIN, package.json, .cursorrules |
| Skills | `skills/` | Domain expertise (design, 3D, git, deploy, etc.) |
| Prompts | `prompts/` | Session rituals (Start, End, Update, Release, Branch-Cut) |
| Rules | `rules/*.mdc` | Shared Cursor rules (voice, mem0, workflow, etc.) |
| Docs | `docs/` | Universal references (ENGINEERING, INFRASTRUCTURE, MEM0, etc.) |
| Scripts | `scripts/` | Shared PowerShell/Node utilities |
| MCP Config | `mcp.json` | Canonical MCP server setup |

This is the **main brain** — always update shared improvements here first, then re-bootstrap
projects or backport changes via `CONTRIBUTING.md`.

## Backup Convention

Every project has its own backup directory under `G:\Hermes_Project_BackUpz\<ProjectName>\`
with sequential folder naming: `<project-slug>-v{N}-{letter}` (v1-a, v1-b, ... v1-z, v2-a).

| Project | Backup Script | Backup Root |
|---------|--------------|-------------|
| JonBeatz | `npm run backup:project` | `G:\...\JonBeatz\` |
| _core-scripts | `npm run backup:core-scripts` (from JonBeatz) or direct | `G:\...\_core-scripts\` |
| NewProject | Project's own `npm run backup:quick` | `G:\...\NewProject\` |

New projects get a backup caller injected by the bootstrap script.

## Standard npm Scripts

Every new project should have these npm scripts (from `templates/package.json`):

```json
{
  "session:start": "powershell -File scripts/session-start.ps1",
  "session:stop": "powershell -File scripts/session-stop.ps1",
  "docs:sync": "powershell -File scripts/docs-update.ps1",
  "encoding:check": "python scripts/encoding-check.py",
  "mem0:preflight": "powershell -File scripts/mem0-preflight.ps1",
  "mem0:add": "powershell -File scripts/mem0-chat.ps1 -Action add -Text",
  "backup": "node scripts/project-backup.mjs",
  "backup:project": "node scripts/project-backup.mjs",
  "backup:standard": "node scripts/project-backup.mjs --standard",
  "backup:full": "node scripts/project-backup.mjs --full",
  "backup:quick": "node scripts/project-backup.mjs --standard --yes",
  "backup:clean": "powershell -File scripts/clean-old-backups.ps1"
}
```

## How to Bootstrap a New Project

```powershell
powershell -File D:\Hermes\projects\_core-scripts\shared-profile-content\scripts\bootstrap-new-project.ps1 `
  -ProjectName "ProjectName" `
  -ProjectRoot "D:\Hermes\projects\ProjectName" `
  -ProjectSlug "projectname" `
  -ProjectDesc "Description of the project"
```

This creates the full skeleton, copies shared artifacts, initializes git, and injects
the backup caller script. The new project is immediately ready for a "Start Project" session.

## Ecosystem Diagram

```
D:\Hermes\projects\
├── _core-scripts\                   ← The brain (shared library)
│   └── shared-profile-content\      ← Templates, skills, prompts, rules, scripts
├── JonBeatz\                        ← Personal profile (your profile)
├── JonBeatz.dev\                    ← Standalone site
├── NewProject\                      ← Any new project
└── ...
     Each project ═══bootstraps═══>  shared-profile-content
     Each project ═══backups═══>     G:\Hermes_Project_BackUpz\<ProjectName>\
```

Every project is **self-contained** but **stays in sync** with the shared brain.
