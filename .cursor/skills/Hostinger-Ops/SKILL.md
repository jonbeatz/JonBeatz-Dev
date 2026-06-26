---
name: hostinger-ops
description: >-
  Hostinger deploy and MCP operations for Jon's MyStudioChannel site — when to
  switch to MSC repo, FTPS/SSH two-folder model, hPanel restart, global MCP
  quartet, and pitfalls. Use when Jon mentions Hostinger, hPanel, push live,
  or mystudiochannel.com deploy.
---

# Hostinger-Ops — JonBeatz reference layer

**Read first:** `.cursor/docs/HOSTINGER-REFERENCE.md`  
**Pitfalls:** `.cursor/docs/PITFALLS-HOSTINGER.md`  
**MSC skill (portable):** `D:\Cursor_Projectz\MyStudioChannel\.cursor\skills\Workflow-Portable\Deploy-FTP-Node\SKILL.md`

---

## Profile boundary

| Context | Repo |
|---------|------|
| JonBeatz personal (Mem0, Playground, backup) | `D:\Hermes\projects\JonBeatz` |
| **MSC website deploy / live fixes** | `D:\Cursor_Projectz\MyStudioChannel` |

If deploy is requested from JonBeatz workspace → **confirm MSC repo open** or instruct workspace switch before running `pushit:live*`.

**jon-beatz.com (personal static site):** stays in **this** repo — see `.cursor/docs/JONBEATZ-SITE-DEPLOY.md` (`npm run site:package` + MCP + CDN flush). Do not use MSC FTPS/Node pipelines for jon-beatz.com. If hPanel still shows WordPress icon after deploy: **Website → Auto Installer → Delete application only** (see runbook section "Clear stale WordPress label").

---

## Golden split (always)

- **Local PC (MSC repo root):** build + FTPS upload + SSH sync scripts
- **hPanel browser:** Node.js app **Restart** — [https://hpanel.hostinger.com/](https://hpanel.hostinger.com/)
- **Never** run `pushitup` in hPanel Terminal

Label every command: **Local** vs **Live (hPanel)** vs **Live (SSH via local script)**.

---

## Deploy tiers (MSC `package.json` only)

| Need | Command |
|------|---------|
| Quick DB only | `npm run msc:push:db:live` |
| Daily code/UI | `npm run pushit:live:fast` |
| Fast + DB | `npm run pushit:live:fast -- -WithDb` |
| Full parity | `npm run pushit:live` |
| Preflight | `npm run msc:hostinger:deploy-diagnose` |
| Post-deploy verify | `npm run msc:verify:live` |

**Interactive gate:** MSC `.cursor/prompts/Push-Website-Live.md` (AskQuestion modes).

---

## Two-folder model

1. FTPS lands in **`public_html/nodejs/`** (staging)
2. **`msc:hostinger:sync-app`** copies staging → **`HOSTINGER_APP_ROOT`** (live)
3. DB changes → **`msc:hostinger:sync-db`** or `-WithDb`

Skipping sync-app = live site stale while staging updated.

---

## Hostinger MCP (from JonBeatz)

JonBeatz `.env.local` holds `HOSTINGER_API_TOKEN`. Sync to global MCP:

```powershell
cd D:\Hermes\projects\JonBeatz
npm run sync:mcp-env
```

Servers: `hostinger-hosting`, `hostinger-vps`, `hostinger-domains`, `hostinger-dns`  
Launcher: `scripts/jonbeatz-hostinger-mcp.mjs`

**Do not** use MCP zip deploy on shared Node — prefer FTPS pipelines.

Useful MCP tools: `hosting_listJsDeployments`, `hosting_deployJsApplication`, `hosting_showJsDeploymentLogs`, DNS/domain tools.

---

## Recovery playbook (MSC)

| Symptom | Command |
|---------|---------|
| 503 after deploy | `msc:hostinger:npm-install` → hPanel restart |
| Stuck / partial deploy | `msc:hostinger:recover` |
| Staging ≠ live | `msc:hostinger:sync-app` |
| Stub DB on live | `msc:push:db:live` |

---

## Post-deploy output (required)

Always return:

1. Upload/sync completion summary
2. **hPanel Restart** step with link
3. `msc:verify:live` result (when MSC repo available)

---

## Portable module (future projects)

MSC ships installable module at:

`D:\Cursor_Projectz\MyStudioChannel\.cursor\custom-scriptz\hostinger-setup\`

Run `install.ps1` when adding Hostinger deploy to a **new** repo (not JonBeatz Playground).
