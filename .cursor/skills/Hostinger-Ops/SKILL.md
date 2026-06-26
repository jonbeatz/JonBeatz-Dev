---
name: hostinger-ops
description: >-
  Hostinger deploy + MCP operations for the standalone jonbeatz.dev STATIC site.
  Static export → Hostinger MCP deploy → CDN flush; the MCP quartet setup, SSL
  gotchas, account SSH, and pitfalls. Use when Jon mentions Hostinger, hPanel,
  deploy, push live, CDN, SSL, or jonbeatz.dev going live.
---

# Hostinger-Ops — JONBEATZ.DEV (static site)

**Read first:** `.cursor/docs/JONBEATZ-DEV-DEPLOY.md` (runbook) +
`.cursor/docs/HOSTINGER-REFERENCE.md` (MCP/SSH/pitfalls reference).

> This project is a **static export** — NOT a Node.js app. There is no FTPS/Node
> two-folder pipeline here (that's the personal profile's MyStudioChannel deploy, a
> separate repo). jonbeatz.dev ships as static files via the Hostinger MCP.

---

## The 3-step deploy (the whole workflow)

```powershell
# 1. Local — build + zip the static export
npm run site:package          # → .deploy\jonbeatz-dev-site_<ts>.zip
```

```text
# 2. Agent — deploy the printed archive via Hostinger MCP
hosting_deployStaticWebsite { domain: "jonbeatz.dev", archivePath: "<.deploy\...zip>" }
```

```text
# 3. hPanel — FLUSH THE CDN (required every update, or the old page keeps serving)
hPanel → Websites → jonbeatz.dev → Performance → CDN → Flush cache
```

Then hard-refresh `https://jonbeatz.dev` (Ctrl+Shift+R / private window).

---

## Command locality (tag every command)

| Where | What |
|-------|------|
| **Local (JonBeatz.dev root)** | `npm run site:build:static`, `site:preview`, `site:package`, `site:ssh` |
| **Agent (Hostinger MCP)** | `hosting_deployStaticWebsite`, `hosting_listWebsitesV1`, DNS/domain tools |
| **Live (hPanel browser)** | CDN flush, SSL re-issue — [hpanel.hostinger.com](https://hpanel.hostinger.com/) |
| **Live (account SSH via local script)** | `npm run site:ssh -- "<cmd>"` (inspect/clean `public_html`) |

**No MCP/API tool flushes the CDN** — it's an hPanel UI action (or via the
logged-in Cursor browser).

---

## Hostinger MCP quartet (global — shared across projects)

`HOSTINGER_API_TOKEN` in `.env.local` → `npm run sync:mcp-env` → four global servers in
`~/.cursor/mcp.json`:

| Server | Purpose |
|--------|---------|
| `hosting-*` (hosting) | static deploy, websites list, deploy logs |
| `hostinger-dns` | DNS records |
| `hostinger-domains` | domain management |
| `hostinger-vps` | VPS (unused for this static site) |

Uses the scoped launcher `scripts/jonbeatz-hostinger-mcp.mjs` — **not** the raw 129-tool
`hostinger-api-mcp` default. After sync: Cursor Settings → MCP → refresh.

---

## First-time / re-attach (only if jonbeatz.dev loses its public_html)

```text
hosting_listWebsitesV1 {}                                   # get plan order_id
hosting_createWebsiteV1 { domain: "jonbeatz.dev", order_id: <id> }
hosting_listWebsitesV1 { domain: "jonbeatz.dev" }           # confirm root_directory
```

A brand-new website serves the first deploy immediately (no stale CDN yet).

---

## Pitfalls (static-site specific)

| Symptom | Cause | Fix |
|---------|-------|-----|
| Old page after deploy | CDN edge cache (`Server: hcdn`) | Flush CDN in hPanel (private window does NOT help — it's server-side) |
| `NET::ERR_CERT_DATE_INVALID` | stale/expired Let's Encrypt cert | hPanel → Security → SSL Manager → re-issue; confirm HTTPS Enforce ON |
| hPanel shows WordPress icon | leftover auto-installer app | Website → Auto Installer → Delete application only |
| Build has no API data | `app/api/*` is local-only; static freezes status | Expected — badges frozen "online", doc links inert |
| MCP zip deploy on Node app | `better-sqlite3` compile fails | N/A here (static) — but never use zip-deploy for the MSC Node app |

Diagnose CDN from the workstation:

```powershell
$r = Invoke-WebRequest "https://jonbeatz.dev/?cb=$(Get-Random)" -UseBasicParsing
$r.Headers['x-hcdn-cache-status']   # DYNAMIC = not edge-cached for this hit
```

---

## Boundary

- This repo deploys **only** `jonbeatz.dev` (red static site).
- The gold `jon-beatz.com` and the `mystudiochannel.com` Node app live in **other**
  repos/profiles on the same Hostinger account. The account SSH login reaches them too —
  only touch the `jonbeatz.dev` folder here.

---

## Quick phrases

| Say this | Agent does |
|----------|------------|
| **deploy** / **push live** / **go live** | `npm run site:package` → MCP deploy → CDN flush (3-step above) |
| **sync hostinger mcp** | `npm run sync:mcp-env` + reload MCP |
| **flush cdn** | hPanel → jonbeatz.dev → Performance → CDN → Flush cache |
| **ssh into hostinger** | `npm run site:ssh -- "<cmd>"` (needs `HOSTINGER_SSH_*`) |
