# jonbeatz.dev — Static Site Deploy Runbook

How the **JONBEATZ.DEV** site (this repo) goes live at **https://jonbeatz.dev** on
Hostinger, and how to update it.

> **Boundary:** This standalone project ships only `jonbeatz.dev` (red). The gold
> `jon-beatz.com` lives in the personal profile (`D:\Hermes\projects\JonBeatz`) and is
> a different `public_html` on the same Hostinger account. Nothing here touches it.

---

## TL;DR — update the live site (3 steps)

```powershell
# 1. Build + zip the static export (Local)
npm run site:package
```

```text
# 2. Agent: deploy the printed archive via Hostinger MCP
hosting_deployStaticWebsite { domain: "jonbeatz.dev", archivePath: "<.deploy\jonbeatz-dev-site_*.zip>" }
```

```text
# 3. FLUSH THE CDN (required — or the old page keeps serving)
hPanel -> Websites -> jonbeatz.dev -> Performance -> CDN -> Flush cache
```

Then verify `https://jonbeatz.dev` (hard refresh Ctrl+Shift+R or a private window).

---

## Why static (not a Node app)

The app's `app/api/*` routes are **local-workstation-only** (they probe `127.0.0.1`
ports / run PowerShell) and cannot run on a remote host. So the public site is a
**static export** of the same UI: the status badges/footer dots are frozen to "all
online" and the doc-card links are inert. `npm run dev` locally is unaffected.

| Mechanism | Detail |
|-----------|--------|
| Build flag | `JB_STATIC=1` → `next.config.mjs` sets `output: "export"` + `images.unoptimized` |
| Client flag | `NEXT_PUBLIC_JB_STATIC=1` → `app/page.tsx` freezes status + disables doc links |
| Variant | Red is the default (`NEXT_PUBLIC_JB_VARIANT` defaults to dev) — no flag needed |
| API routes | `build-static-site.mjs` stashes `app/api` during export, then restores it |
| Output | `out/` (gitignored) |

---

## Build scripts

| Command | Does |
|---------|------|
| `npm run site:build:static` | static export → `out/` (red) |
| `npm run site:preview` | serve `out/` @ http://localhost:5057 |
| `npm run site:package` | build + zip → `.deploy\jonbeatz-dev-site_<ts>.zip` |

---

## First-time setup (if jonbeatz.dev ever needs re-attaching)

A registered/parked domain has no `public_html` until attached to the hosting plan:

```text
hosting_listWebsitesV1 {}                              # get the plan order_id
hosting_createWebsiteV1 { domain: "jonbeatz.dev", order_id: <id> }
hosting_listWebsitesV1 { domain: "jonbeatz.dev" }      # confirm root_directory exists
```

A brand-new website serves the first deploy immediately (no stale CDN to flush).

> jonbeatz.dev was first attached + deployed on 2026-06-25 from the personal profile
> (Tier 1 variant). This standalone project (Tier 3) is the new home for it.

---

## The CDN gotcha (every update deploy)

Hostinger fronts every site with its CDN (`Server: hcdn`). After you change origin
files, edge nodes keep serving the **old** page per-PoP until flushed (a private window
does NOT help — the cache is server-side).

**Fix = flush the CDN every update:**
`hPanel -> jonbeatz.dev -> Performance -> CDN -> Flush cache`
(The "Cache Manager" under Advanced is a different cache — not the one that matters.)

Diagnose from the workstation:

```powershell
$r = Invoke-WebRequest "https://jonbeatz.dev/?cb=$(Get-Random)" -UseBasicParsing
$r.Headers['x-hcdn-cache-status']   # DYNAMIC = not edge-cached for this hit
```

---

## SSL note (learned on jon-beatz.com / kristinairwin.com)

If a browser shows `NET::ERR_CERT_DATE_INVALID` after a clean deploy, it's usually a
**stale/expired cert** on the host, not a DNS problem. Re-issue Let's Encrypt in
hPanel → Security → SSL Manager and confirm HTTPS Enforce is ON.

---

## Hard refs

| Item | Value |
|------|-------|
| Live URL | https://jonbeatz.dev |
| Deploy archive | `.deploy\jonbeatz-dev-site_<timestamp>.zip` (gitignored) |
| hPanel CDN flush | Websites → jonbeatz.dev → Performance → CDN → Flush cache |
| Env template | `.env.local.example` (`HOSTINGER_API_TOKEN`) |

**Hostinger MCP tools:** `hosting_deployStaticWebsite`, `hosting_listWebsitesV1`.
**No MCP/API tool for CDN flush** — hPanel UI (or agent in logged-in Cursor browser).

**See also:** `.cursor/docs/HOSTINGER-REFERENCE.md` (MCP quartet setup, account SSH,
pitfalls) and `.cursor/skills/Hostinger-Ops/SKILL.md`.
