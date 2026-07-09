# Hostinger Pitfalls — JonBeatz.dev

| Mistake | Fix |
|---------|-----|
| Staging updated, live stale | Sync to `JONBEATZ.DEV_APP_ROOT`, hPanel Restart |
| Partial `.next` upload | Upload complete build folder |
| Wrong repo for MSC deploy | MSC = MyStudioChannel; this profile = JonBeatz.dev |
| Committed `.env.local` | Never — gitignored |
| MCP red after env change | `npm run sync:mcp-env` + reload Cursor MCP |

---

*Bootstrap template — 2026-07-09*
