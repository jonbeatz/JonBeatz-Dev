# Hostinger Reference — JONBEATZ.DEV

Everything this standalone project needs to host **https://jonbeatz.dev** on Hostinger.
Deploy steps live in **`JONBEATZ-DEV-DEPLOY.md`**; this file is the MCP / SSH / account
reference. The companion skill is **`.cursor/skills/Hostinger-Ops/SKILL.md`**.

> **Static, not Node.** jonbeatz.dev is a static export. There is **no** FTPS/Node
> two-folder pipeline here — that belongs to the MyStudioChannel Node app (a different
> repo on the same Hostinger account). Don't apply MSC `pushit:live*` / `sync-app`
> patterns to this project.

---

## hPanel + account

| Item | Value |
|------|-------|
| hPanel | https://hpanel.hostinger.com/ |
| Live URL | https://jonbeatz.dev |
| Site type | Static (HTML/CSS/JS export of the Next.js app) |
| Same account also hosts | `jon-beatz.com` (personal profile, gold), `mystudiochannel.com` (MSC Node app) — **don't touch from here** |

---

## Deploy workflow (the only one for this project)

```powershell
npm run site:package          # Local: build static export + zip → .deploy\jonbeatz-dev-site_<ts>.zip
```
```text
hosting_deployStaticWebsite { domain: "jonbeatz.dev", archivePath: "<.deploy\...zip>" }   # Agent (MCP)
hPanel → Websites → jonbeatz.dev → Performance → CDN → Flush cache                          # Live (required)
```

Full runbook with the "why static" details: **`JONBEATZ-DEV-DEPLOY.md`**.

---

## Hostinger MCP (global quartet)

The Hostinger MCP servers are **global** (`~/.cursor/mcp.json`) and shared across projects.
This project syncs the token from its own `.env.local`:

```powershell
npm run sync:mcp-env          # injects HOSTINGER_API_TOKEN into the global hostinger-* servers
# then: Cursor Settings → MCP → refresh
```

| Server | Purpose |
|--------|---------|
| `hostinger-hosting` | static deploy (`hosting_deployStaticWebsite`), websites list, deploy logs |
| `hostinger-dns` | DNS records (A/CNAME/MX/TXT) |
| `hostinger-domains` | domain management |
| `hostinger-vps` | VPS (unused for this static site) |

- Token source: hPanel → Account → API. It's an **account** token (same one the personal
  profile uses), not a JonBeatz-personal secret.
- Launcher: `scripts/jonbeatz-hostinger-mcp.mjs` (scoped — avoids the 129-tool default binary).
- Useful tools: `hosting_listWebsitesV1`, `hosting_createWebsiteV1`, `hosting_deployStaticWebsite`,
  plus DNS/domain tools for cutover work.

---

## Account SSH (optional admin)

One Hostinger SSH login is **account-wide** — it reaches every site; only the folder path
differs. Use it to inspect or clean `jonbeatz.dev`'s `public_html`.

```powershell
npm run site:ssh -- "ls -la domains/jonbeatz.dev/public_html"
npm run site:ssh -- "du -sh domains/jonbeatz.dev/public_html"
```

- Creds in `.env.local`: `HOSTINGER_SSH_HOST` / `_PORT` (usually 65002) / `_USER` / `_PASSWORD`
  (hPanel → Advanced → SSH Access). Read from the env file, never passed on the CLI.
- Requires the optional `ssh2` dependency (installed by default; safe to skip if unused).
- **Only touch the `jonbeatz.dev` folder** — the same login can see `jon-beatz.com` and the
  MSC app.

---

## Pitfalls (symptom → cause → fix)

| Symptom | Cause | Fix |
|---------|-------|-----|
| Old page still served after deploy | CDN edge cache (`Server: hcdn`) — per-PoP, server-side | hPanel → jonbeatz.dev → Performance → CDN → **Flush cache** (a private window does NOT help) |
| `NET::ERR_CERT_DATE_INVALID` | stale/expired Let's Encrypt cert (not DNS) | hPanel → Security → SSL Manager → re-issue; confirm **HTTPS Enforce** ON |
| hPanel shows a WordPress icon | leftover auto-installer app on the domain | Website → Auto Installer → **Delete application only** |
| Status badges/doc links inert on live | `app/api/*` is local-only; static freezes them | Expected for the static export — `npm run dev` locally is unaffected |
| Tempted to zip-deploy a Node app | `better-sqlite3` compile fails on shared Node | N/A here (static). For the MSC Node app use its FTPS pipeline, not MCP zip |

Diagnose the CDN from the workstation:

```powershell
$r = Invoke-WebRequest "https://jonbeatz.dev/?cb=$(Get-Random)" -UseBasicParsing
$r.Headers['x-hcdn-cache-status']   # DYNAMIC = this hit was not edge-cached
```

---

## DNS / SSL cutover (if jonbeatz.dev moves registrars)

If the domain's nameservers ever move to Hostinger (or away), the provider-agnostic
recipe — nameserver cutover, preserving Google Workspace MX/email, SSL re-issue, HTTPS
enforce — is captured in the personal profile's
`SITEGROUND-NAMECHEAP-DEPLOY.md`. Same principles apply on Hostinger DNS (use the
`hostinger-dns` MCP server to set records).

---

## Keys (in `.env.local`, gitignored)

| Key | Use |
|-----|-----|
| `HOSTINGER_API_TOKEN` | MCP quartet — `npm run sync:mcp-env` |
| `HOSTINGER_SSH_HOST` / `_PORT` / `_USER` / `_PASSWORD` | `npm run site:ssh` |

Template: `.env.local.example`. Never commit real values (repo is public).
