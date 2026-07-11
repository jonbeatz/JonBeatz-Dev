# Fitness Check — Is your project up to date with the shared skeleton?

Any project — old or new — can read this doc to check if it's missing shared skeleton features or best practices. Agents should read this when onboarding to an existing project or during `update docs`.

---

## Quick version check

```powershell
# Run from any project that was bootstrapped from shared-profile-content
powershell -File D:\Hermes\projects\_core-scripts\shared-profile-content\scripts\check-shared-version.ps1
```

This checks that templates, skills, prompts, rules, docs, MCP config, and scripts are all present.

---

## What the skeleton provides (shared-profile-content v1.29.0)

### 1. Session rituals
| Ritual | Prompt | When |
|--------|--------|------|
| Start Project | `.cursor/prompts/Start-Project.md` | Cold boot (`-Full`) |
| Open Project | `.cursor/prompts/Open-Project.md` | Resume workspace |
| Close Project | `.cursor/prompts/Close-Project.md` | Switch folder — fleet stays up |
| End Project | `.cursor/prompts/End-Project.md` | Day-end |
| Update Docs | `.cursor/prompts/Update-Docs.md` | Doc sync + Mem0 + backport review |
| Branch Cut | `.cursor/prompts/Branch-Cut.md` | New milestone branch |
| Release Version | `.cursor/prompts/Release-Version.md` | Version bump + GitHub release |

### 2. Shared rules (`.cursor/rules/`)
| Rule | What it enforces |
|------|-----------------|
| `voice-policy.mdc` | Draven ritual-only TTS (OmniVoice) |
| `mem0-lmstudio.mdc` | Per-project isolated Mem0 + Draven cross-session memory |
| `workflow.mdc` | Start/Open/Close/End rituals, branch cut, backup |
| `docs-checkpoint-governance.mdc` | Doc source-of-truth order, drift audits |
| **tools-watchlist.mdc** | Tool review workflow (grades, setup status, install gate) |

### 3. Domain skills (`.cursor/skills/`)
See `SKILL-INDEX.md` for the full catalog — design, 3D, git, deploy, automation, workflow.

### 4. Universal docs (`.cursor/docs/`)
| Doc | Purpose |
|-----|---------|
| `MEM0-LMSTUDIO.md` | Memory + local LLM setup |
| `IMAGE-WORKFLOW.md` | HF cloud + ComfyUI image pipeline |
| `VOICE-WORKFLOW.md` | Draven TTS setup and policy |
| `TELEGRAM-WORKFLOW.md` | iPhone two-way chat setup |
| `MASTER-COMMANDS.md` | All npm commands reference |
| `PROJECT-STRUCTURE.md` | Standard project file layout |
| `ENGINEERING.md` | MCP setup, ComfyUI, VRAM |
| `INFRASTRUCTURE.md` | Hostinger, Google Workspace, Hermes |
| `3D-WEBSITE-TASTE-CATALOG.md` | 6 design palettes for 3D sites |
| `3D-WEB-WORKFLOWS.md` | Hermes workflow vault hub (`D:\Hermes\assets\3d-web-workflows\`) |
| `SCROLL-3D-REFERENCES.md` | Scroll/3D skill map + motion baseline |
| `TOOLS-WATCHLIST.md` / `TOOLS-SETUP-STATUS.md` | Hermes-wide tool grades + setup checklist |
| `KANBAN-WORKFLOW.md` | TaskBoardAI fleet kanban, boardId map, MCP + ports |

### 5. Environment variables
| Variable set | Purpose |
|-------------|---------|
| `MEM0_USER_ID`, `MEM0_COLLECTION`, `MEM0_QDRANT_PATH` | Per-project isolated Mem0 |
| `LMSTUDIO_*` / `HERMES_LM_*` | LM Studio config (model, context, parallel) |
| `DRAVEN_*` | Draven voice (TTS) |
| `TELEGRAM_*` | Telegram gateway |
| `HOSTINGER_*` | Hostinger deploy credentials |

Draven's own memory (`draven_memories`) is **shared across all projects** — no per-project config needed.

---

## Fitness checklist — run against your project

| # | Check | How |
|---|-------|-----|
| 1 | Version check | Run `check-shared-version.ps1` |
| 2 | Session prompts exist | Check `.cursor/prompts/` has Start-Project, End-Project, Update-Docs |
| 3 | Core rules exist | Check `.cursor/rules/` has mem0-lmstudio.mdc, voice-policy.mdc, workflow.mdc, global.mdc |
| 4 | Mem0 commands work | `npm run mem0:add`, `mem0:search`, `mem0:list` all resolve |
| 5 | Draven memory commands work | `npm run draven:add`, `draven:search`, `draven:list` all resolve |
| 6 | Backport candidates tracked | `BACKPORT-CANDIDATES.md` exists and has been reviewed |
| 7 | .env.local has Mem0 config | `MEM0_USER_ID`, `MEM0_COLLECTION`, `MEM0_QDRANT_PATH` are set |
| 8 | Draven voice policy set | `DRAVEN_VOICE_POLICY=ritual` in `.env.local` (or voice-policy.mdc present) |
| 9 | Backup scripts work | `npm run backup:quick` runs without error |
| 10 | MCP sync works | `npm run sync:mcp-env` runs without error |
| 11 | Hostinger docs present | `.cursor/docs/HOSTINGER-REFERENCE.md`, `HOSTINGER-DEPLOY.md` |
| 12 | GitHub docs present (web projects) | `.cursor/docs/GITHUB-SETUP.md`, optional `.github/workflows/` |
| 13 | `.env.local` ecosystem keys | JonBeatz credentials merged; Mem0 isolated to project slug |
| 14 | Docs alignment | `npm run encoding:check` passes, `npm run docs:sync` passes |
| 15 | Tools watchlist docs | `.cursor/docs/TOOLS-WATCHLIST.md`, `TOOLS-SETUP-STATUS.md` present (or `npm run sync:docs -- -Write -AddMissing`) |
| 16 | Tools config queue | `npm run tools:status` — optional keys only (Groq, Firecrawl) |
| 17 | tools-watchlist rule | `.cursor/rules/tools-watchlist.mdc` present |
| 18 | 3D workflow vault docs | `.cursor/docs/3D-WEB-WORKFLOWS.md` + `npm run workflows:3d:status` |
| 19 | Scroll/motion baseline | `npm run scroll:motion:status` + `3d-scroll-website` skill (`npm run sync:skills`) |
| 20 | Command Center fleet (JonBeatz hub) | `npm run fleet:status` + `.cursor/docs/COMMAND-CENTER.md` — lockfile rows must be OK before push |
| 21 | Kanban stack + MCP | Global `taskboard` MCP; `npm run kanban:start` (JonBeatz); `.cursor/docs/KANBAN-WORKFLOW.md` + `taskboard-kanban.mdc` |

**If any check fails**, the best fix is usually:
1. Re-bootstrap shared artifacts: copy missing files from `_core-scripts\shared-profile-content\`
2. Or manually add the missing piece following `CONTRIBUTING.md`

---

## Best practices summary

### Memory
- Each project has its **own isolated Mem0** collection (defined in `.env.local`)
- Draven has a **shared cross-project** Mem0 (`draven_memories`) for AI assistant context
- Use `mem0:add` for project-specific takeaways
- Use `draven:add` for things Draven should remember across sessions/projects

### Docs
- `TRUTH.md` is king — when docs conflict, TRUTH wins
- Update `ReCall.md` after each significant session
- `npm run encoding:check` before any doc commit
- `update docs and mem0` runs Phase 5b (Mem0) + Phase 6 (skeleton backport review)

### Rituals
- **Start Project:** agent reads TRUTH → START-HERE → ReCall → `-Full` or probes → Mem0
- **Open Project:** light probes only — no stack restart, no voice
- **Close Project:** handoff docs + Mem0 + `session:handoff` — no `session:stop`
- **End Project:** summarize → docs → Mem0 → AskQuestion git → AskQuestion dev `:3000` (if up) → AskQuestion stop stack → voice → `session:stop`
- **Update Docs:** agent scans drift → fixes links/versions → runs auditor → reports

### Backporting
- During `update docs and mem0`, the agent checks if anything new should go in the skeleton
- If yes, follow `CONTRIBUTING.md`: copy → strip paths → update indexes → bump version → commit

---

*Last updated: 2026-07-08 · shared-profile-content v1.23.0*
