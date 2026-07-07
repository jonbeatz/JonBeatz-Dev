---
name: Google-Workspace
description: Gmail, Calendar, Drive automation for JonBeatz personal profile via Hermes google-workspace skill
---

# Google Workspace — JonBeatz

Use for personal Google tasks in the **JonBeatz** profile (not MSC website deploy).

## Read first

1. `.cursor/docs/GOOGLE-WORKSPACE.md`
2. `.cursor/docs/Custom-Prompts.md` (google doctor, email, calendar phrases)

## Health check

```powershell
npm run google:doctor
npm run google:status
```

## Auth locations

| File | Path |
|------|------|
| OAuth token | `%LOCALAPPDATA%\hermes\google_token.json` |
| Setup script | `%LOCALAPPDATA%\hermes\skills\productivity\google-workspace\scripts\setup.py` |

## Agent workflow

1. Run `google:doctor` if auth state unknown
2. For stack-dependent tasks, ensure LiteLLM `:4000` (`npm run deepseek:on`)
3. Use Hermes natural language or documented APIs
4. Log automation wins to Mem0 + ReCall
5. Do **not** mix with MSC deploy or Hostinger rules

## OAuth ERR_UNSAFE_PORT

Normal on `localhost:1` — copy full redirect URL. See ISSUES-RESOLVED.md.
