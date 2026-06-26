# MASTER COMMANDS — JONBEATZ.DEV

**Last updated:** 2026-06-25 · **Version:** 1.0.0

All commands run from `D:\Hermes\projects\JonBeatz.dev` (Windows PowerShell).

## Site

| Command | Does |
|---------|------|
| `npm run dev` | Local dev server — red site + glow beam @ :3000 |
| `npm run build` | Standard Next.js build (local dashboard, keeps API routes) |
| `npm run site:build:static` | Static export → `out/` (red, API routes stashed) |
| `npm run site:preview` | Serve `out/` @ http://localhost:5057 |
| `npm run site:package` | Build + zip → `.deploy/jonbeatz-dev-site_*.zip` for Hostinger MCP |

## Session

| Command | Does |
|---------|------|
| `npm run session:start` | Mem0 preflight + port probes (lightweight) |
| `npm run session:stop` | Closeout reminder |

## Mem0 (scope: jonbeatz_dev)

| Command | Does |
|---------|------|
| `npm run mem0:preflight` | Verify LM Studio :1234 has an LLM loaded |
| `npm run mem0:search -- "q"` | Search memories |
| `npm run mem0:add -- "text"` | Add a memory (infer=False) |
| `npm run mem0:list` | List all memories |

## Docs / version

| Command | Does |
|---------|------|
| `npm run encoding:check` | UTF-8 mojibake scan (.md/.mdc) |
| `npm run version:sync` | Sync version + README badges (Python UTF-8) |
| `npm run docs:sync` | Docs alignment audit + encoding gate |

## Backup

| Command | Does |
|---------|------|
| `npm run backup:quick` | Standard versioned backup → `jonbeatz-dev-project-v{N}-{a-z}` |
| `npm run backup:quick:full` | Full mirror backup |
| `npm run backup:clean` | Retain 10 newest backups |

## Release

| Command | Does |
|---------|------|
| `npm run release` | Tag + push + publish GitHub release from `package.json` version (needs `gh` + remote) |

## Deploy (Hostinger MCP — agent)

```text
hosting_deployStaticWebsite { domain: "jonbeatz.dev", archivePath: "<.deploy\jonbeatz-dev-site_*.zip>" }
```
Then flush CDN: hPanel → jonbeatz.dev → Performance → CDN → Flush cache.
