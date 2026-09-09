# GOOGLE-WORKSPACE.md — Personal Google Automation (Hermes fleet)

**Canonical shared doc** — mirrored to profile `.cursor/docs/GOOGLE-WORKSPACE.md` via `npm run sync:docs -- -Write` (JonBeatz / siblings).  
**GCP project:** `wordpress-map-1492461083797` (console name: **Vader-Protocol**)  
**OAuth desktop client:** `576703972894-g6l4jgqhc6jtto4fhk4jgqllpmkj7bju.apps.googleusercontent.com` (**Hermes Vader Desktop**)  
**Publishing status:** **In production** (set 2026-07-20) — **required** to stop 7-day Testing refresh-token expiry  
**User type:** External · personal use (unverified app warning OK for own accounts)

---

## Accounts (additive — do not overwrite)

| Account | Token file | Role |
|---------|------------|------|
| **jonbeatz@gmail.com** (default / primary) | `%LOCALAPPDATA%\hermes\google_token.json` | Default for doctor, Cursor, Gmail/Drive day-to-day |
| **jonf822@gmail.com** (secondary) | `%LOCALAPPDATA%\hermes\google_token_jonf822.json` | Main YouTube + that mailbox; **never** copy over primary |

Same OAuth client + same SCOPES for both. Select with `--account jonf822` or `HERMES_GOOGLE_ACCOUNT=jonf822`.

**Hard rule:** Re-auth for jonf822 **must** use `--account jonf822`. Auth without the flag writes `google_token.json` and would replace jonbeatz.

**Usage rule for agents:** Default = **jonbeatz@gmail.com**. Use **jonf822@gmail.com** only when Jon explicitly asks (e.g. that mailbox, main YouTube channel).

Backup of primary (safety): `google_token_jonbeatz.backup.json`

---

## Which Cursor project should you be in?

**Does not matter for the tokens.** OAuth lives under `%LOCALAPPDATA%\hermes\` (machine-wide Hermes home), not inside TNIMS / JonBeatz / any repo folder. Authorizing while this chat is open on *The-Night-I-Met-Santa* is fine — same files as if you were in JonBeatz.

| Layer | Where it lives | Notes |
|-------|----------------|-------|
| Tokens + client secret | `%LOCALAPPDATA%\hermes\` | Global — every Hermes profile / project sees them |
| Skill scripts (`setup.py`) | `%LOCALAPPDATA%\hermes\skills\…` (+ profile mirrors) | Fleet-synced |
| Canonical docs | `_core-scripts/shared-profile-content/docs/GOOGLE-WORKSPACE.md` | Then mirror via JonBeatz `npm run sync:docs` |
| `npm run google:doctor` | **JonBeatz** repo scripts | Preferred health check desk |

**Recommendation:** Do OAuth / re-auth from *any* Hermes workspace (including TNIMS). Prefer **JonBeatz** when updating docs, running `google:doctor`, or `sync:docs` — that’s the global ops desk. Avoid writing Google secrets into a project `.env.local` unless a title-specific tool truly needs it.

---

## What this unlocks (per account)

| Scope | Use |
|-------|-----|
| Gmail (`readonly` / `send` / `modify`) | Read, send, labels |
| Calendar | Personal calendar |
| Drive · Docs · Sheets | Files / Docs / Sheets |
| Contacts readonly | Contacts |
| **YouTube (full)** | Manage · HTTPS writes · uploads (`youtube` + `force-ssl` + `upload`) — needs API key too |

---

## Token & secret paths

| File | Path | Role |
|------|------|------|
| Primary token | `%LOCALAPPDATA%\hermes\google_token.json` | jonbeatz |
| Primary profile copy | `%LOCALAPPDATA%\hermes\profiles\jonbeatz\google_token.json` | Sync with primary only |
| Secondary token | `%LOCALAPPDATA%\hermes\google_token_jonf822.json` | jonf822 — **do not** sync into primary |
| Client secret | `%LOCALAPPDATA%\hermes\google_client_secret.json` (+ profile copy) | Shared Desktop client |
| Node-Launcher mirror | `D:\Cursor_Projectz\Node-Launcher-v2\google-api\token.json` | Primary (jonbeatz) only unless that app is updated |

```powershell
# Primary sync only (after jonbeatz re-auth)
Copy-Item -Force "$env:LOCALAPPDATA\hermes\google_token.json" `
  "$env:LOCALAPPDATA\hermes\profiles\jonbeatz\google_token.json"
Copy-Item -Force "$env:LOCALAPPDATA\hermes\google_token.json" `
  "D:\Cursor_Projectz\Node-Launcher-v2\google-api\token.json"
```

---

## CLI selection

```powershell
$env:HERMES_HOME = "$env:LOCALAPPDATA\hermes"
$setup = "$env:LOCALAPPDATA\hermes\skills\productivity\google-workspace\scripts\setup.py"
$api = "$env:LOCALAPPDATA\hermes\skills\productivity\google-workspace\scripts\google_api.py"

# Primary (default)
python $setup --check
python $api gmail search "is:unread" --max 5

# Secondary
python $setup --account jonf822 --check
python $api --account jonf822 gmail search "is:unread" --max 5
# or: $env:HERMES_GOOGLE_ACCOUNT = 'jonf822'
```

---

## setup.py SCOPES (all Hermes profiles)

```text
https://www.googleapis.com/auth/youtube
https://www.googleapis.com/auth/youtube.force-ssl
https://www.googleapis.com/auth/youtube.upload
```
(+ Gmail / Calendar / Drive / Docs / Sheets / Contacts — see setup.py)

---

## Publishing: Testing vs Production

| Status | Refresh token |
|--------|----------------|
| **Testing** | Dies ~**7 days** |
| **In production** | Long-lived |

Confirm: https://console.cloud.google.com/auth/audience?project=wordpress-map-1492461083797

---

## Re-auth ritual — primary (jonbeatz)

```powershell
$env:HERMES_HOME = "$env:LOCALAPPDATA\hermes"
$setup = "$env:LOCALAPPDATA\hermes\skills\productivity\google-workspace\scripts\setup.py"
python $setup --account jonbeatz --auth-url
# Browser Allow → copy full localhost:1 URL
python $setup --account jonbeatz --auth-code "FULL_REDIRECT_URL"
python $setup --account jonbeatz --check
# then primary sync copies (see above)
npm run google:doctor   # JonBeatz root
```

## First-time / re-auth — secondary (jonf822)

1. Use **incognito** or a browser profile signed in as **jonf822@gmail.com** (not jonbeatz).
2. Run:

```powershell
$env:HERMES_HOME = "$env:LOCALAPPDATA\hermes"
$setup = "$env:LOCALAPPDATA\hermes\skills\productivity\google-workspace\scripts\setup.py"
python $setup --account jonf822 --auth-url
# Allow all scopes as jonf822 → paste URL:
python $setup --account jonf822 --auth-code "FULL_REDIRECT_URL"
python $setup --account jonf822 --check
```

3. Confirm primary still valid: `python $setup --account jonbeatz --check`  
4. Confirm files: `google_token.json` (jonbeatz) **and** `google_token_jonf822.json` (separate).

---

## YouTube Data API (extra)

1. Enable **YouTube Data API v3** on Vader-Protocol  
2. API key `Hermes-YouTube` (YouTube Data API v3 only)  
3. `channels.list(mine=true)` needs Bearer token **for that account** + API key  
4. Main YouTube channel work → `--account jonf822`

---

## Health check

```powershell
# JonBeatz root — checks primary; also checks jonf822 if token exists
npm run google:doctor
```

---

## Agent notes

- Personal Google ≠ MSC Vertex SA  
- Never commit tokens / client secrets  
- Dual-account: default = jonbeatz; say “jonf822” / “my YouTube account” for secondary  
- Doctor never merges jonf822 into `google_token.json`
- **Tony email aliases (LOCKED 2026-07-20):** Jon says **Tony** / **T** / **TNyse** / **bigtee** → always **`bigtee@gmail.com`** (from jonbeatz via Hermes Gmail)
---

## Admin links

- [Audience / Publishing](https://console.cloud.google.com/auth/audience?project=wordpress-map-1492461083797)  
- [OAuth Clients](https://console.cloud.google.com/auth/clients?project=wordpress-map-1492461083797)  
- [YouTube API](https://console.cloud.google.com/apis/library/youtube.googleapis.com?project=wordpress-map-1492461083797)  
- [Credentials](https://console.cloud.google.com/apis/credentials?project=wordpress-map-1492461083797)

---

*Canonical in `_core-scripts/shared-profile-content/docs/` · Updated 2026-07-20 (jonf822 additive)*
