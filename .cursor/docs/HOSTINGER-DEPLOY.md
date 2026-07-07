# Hostinger Deploy — JonBeatz.dev

**Pre-flight:** Set `JONBEATZ.DEV_DOMAIN`, `JONBEATZ.DEV_WEB_ROOT`, `JONBEATZ.DEV_APP_ROOT`, and `FTP_REMOTE_PATH` in `.env.local` before first go-live.

---

## Option A — GitHub Pages (preview)

If `.github/workflows/deploy-pages.yml` exists, push to `main` deploys to:

`https://jonbeatz.github.io/JonBeatz-Dev/`

Local test: `$env:GITHUB_PAGES='true'; npm run build:pages`

---

## Option B — Hostinger Node.js (production domain)

| Step | Where | Action |
|------|-------|--------|
| 1 | Local | `npm run web:build` — verify exit 0 |
| 2 | Local | FTPS upload to `FTP_REMOTE_PATH` (staging) |
| 3 | Local (SSH) | Sync staging → `JONBEATZ.DEV_APP_ROOT` |
| 4 | hPanel | Node.js **Restart** |
| 5 | Local | HTTP smoke on `https://JONBEATZ.DEV_DOMAIN/` |

MSC full bible: `D:\Cursor_Projectz\MyStudioChannel\.cursor\docs\HOSTINGER-DEPLOY.md`

---

## Pitfalls

See `.cursor/docs/PITFALLS-HOSTINGER.md`

---

*Bootstrap template — 2026-07-07*
