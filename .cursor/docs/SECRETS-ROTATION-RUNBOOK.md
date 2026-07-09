# Secrets rotation runbook — Hermes fleet

> **When:** After GitGuardian alert, suspected leak, or quarterly hygiene.  
> **Where values live:** `.env.local` per profile + `_core-scripts/.env.local.master` + Cursor global MCP (gitignored).  
> **Never** paste live keys into markdown, commits, or vault notes.

---

## Pre-rotation checklist

1. `npm run git:hooks:install` on every repo you push to GitHub
2. `npm run git:secrets-scan:push` before each push
3. Confirm no `Personal-Secrets-Vault*.md` in working tree: `git status`
4. Run `npm run ecosystem:audit` from JonBeatz hub — refresh `MASTER-SECRETS-INVENTORY.local.md`

---

## Priority order (GitGuardian 2026-07-08 incident)

| Priority | Service | Risk | Rotate at |
|----------|---------|------|-----------|
| **P0** | GitHub PAT | Full repo access | https://github.com/settings/tokens |
| **P1** | Resend | Email send | https://resend.com/api-keys |
| **P1** | Browserbase | Browser automation | Browserbase dashboard |
| **P1** | Composio | Tool integrations | Composio dashboard |
| **P2** | Firecrawl | Scrape API | Firecrawl dashboard |
| **P2** | Tavily | Search API | Tavily dashboard |

---

## Step-by-step per service

### GitHub PAT (P0)

1. GitHub → Settings → Developer settings → Personal access tokens → **revoke** exposed token
2. Create new fine-grained or classic PAT (minimum scopes: repo, workflow if needed)
3. Update:
   - `D:\Hermes\projects\_core-scripts\.env.local.master` → `GITHUB_TOKEN` or `GH_TOKEN`
   - JonBeatz `.env.local` if duplicated
   - Any CI secrets (GitHub Actions repo secrets)
4. `cd D:\Hermes\projects\JonBeatz && npm run sync:mcp-env` (if GitHub MCP wired)
5. Test: `gh auth status` or `gh repo list jonbeatz --limit 1`

### Resend (P1)

1. Resend dashboard → revoke old key → create new
2. Update `_core-scripts/.env.local.master` and profiles using `RESEND_API_KEY`
3. Redeploy any app sending email (Next-Flick prod if wired)

### Browserbase + Composio (P1)

1. Revoke in respective dashboards
2. Update JonBeatz `.env.local`
3. Restore **placeholders** in committed overlay templates only — never live keys in git
4. `npm run sync:mcp-env` from JonBeatz
5. Restart Cursor or reload MCP servers

### Firecrawl + Tavily (P2)

1. Revoke → new key in vendor dashboard
2. Update master env + Cursor MCP config (gitignored `mcp.json`)
3. `npm run sync:mcp-env`

---

## Post-rotation verification

```powershell
# From JonBeatz hub
npm run ecosystem:audit
npm run tools:status
npm run git:secrets-scan:push   # each repo before push
```

1. Mark incidents **resolved** in GitGuardian dashboard
2. `npm run draven:add -- "Rotated: GitHub PAT, Resend, … — GitGuardian closed YYYY-MM-DD"`
3. Append one line to `H:\Vader_Vault\03_AI_Memory\Sessions\YYYY-MM-DD-<project>.md`
4. Update `FLEET-GITHUB-AUDIT.md` rotation table → mark **DONE** with date

---

## Drift + leak prevention (ongoing)

| Practice | Command / location |
|----------|-------------------|
| Install hooks on new clone | `npm run git:hooks:install` |
| Pre-push scan | `npm run git:secrets-scan:push` |
| Fleet doc parity | `npm run fleet:sync` from JonBeatz |
| Fitness check | `npm run fleet:status` |
| Secrets inventory | `npm run ecosystem:audit` |
| MCP keys | Only in `.env.local` + gitignored `.cursor/mcp.json` |
| Vault dumps | **Never** commit `Personal-Secrets-Vault*.md` |
| Board JSON | TaskBoard `boards/*.json` gitignored — backup via `backup:quick` |

---

## What NOT to rotate blindly

- `sk-vader-protocol-1234` — local LiteLLM placeholder (not a real cloud secret)
- `MEM0_API_KEY` for local Qdrant — regenerate only if you use hosted Mem0 cloud
- Clerk / Neon / Hostinger keys — rotate only if those services were in the leak scope

---

*Maintainer: Jon · Linked from FLEET-GITHUB-AUDIT.md § Security*
