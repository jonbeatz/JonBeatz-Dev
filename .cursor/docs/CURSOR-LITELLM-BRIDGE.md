# Cursor IDE ↔ LiteLLM Bridge — setup & failures

This guide covers setting up an **OpenAI-compatible** bridge via LiteLLM on **port 4000**, with optional ngrok for Cursor Cloud Agent access.

---

## Common failure modes

| Problem | Cause | Fix |
|--------|--------|-----|
| **Cursor `ERROR_PROVIDER_ERROR` / "resource"** | Stale ngrok (**ERR_NGROK_3200**), wrong base URL (missing **`/v1`**), or Cursor Agent path vs Ask. | Use live URL with **`/v1`** from startup log; test with **Ctrl+L** Ask mode first. |
| **Uvicorn on wrong port but ngrok → 4000** | Stray **`PORT`** env variable. | Clear **`PORT`** before launch; verify log shows **`0.0.0.0:4000`**. |
| **"Port 4000 already in use"** next session | Previous LiteLLM never stopped. | Use stop script before start. |

---

## Setup: Terminal vs Cursor Settings

### Terminal (keep the API window open)

1. **Start LiteLLM + ngrok**

```powershell
cd /path/to/repo
./scripts/start-api.ps1 -StartNgrok
```

2. **Wait** for **`[CRITICAL] Cursor 'Override OpenAI Base URL' must be:`** and **`Uvicorn running on http://0.0.0.0:4000`**.

3. **Test the ngrok URL**

```powershell
./scripts/verify-public-url.ps1 -BaseUrl "https://YOUR-SUBDOMAIN.ngrok-free.dev/v1"
```

Expect **`[OK]`**.

### Cursor Settings (UI only)

1. **Cursor** → **Settings** → **Cursor Settings** → **Models**.
2. **Override OpenAI Base URL** → **ON** → paste the **`https://…/v1`** URL from startup log (or **`http://127.0.0.1:4000/v1`** for local-only).
3. **OpenAI API Key** → **ON** → paste the **`sk-…`** from your LiteLLM config.
4. **Add custom models** (exact names from your config) — toggle **ON**.

### Test

**Ctrl+L** → choose your custom model → say "ping".

---

## #1 cause when "it worked yesterday" — ngrok URL is offline

**Free ngrok hostnames stop working** as soon as the ngrok process or the machine stops. Cursor keeps the **old** `https://….ngrok-free.dev/v1` URL, so every request hits ngrok's HTML error page (**ERR_NGROK_3200**).

**Fix (every time you restart ngrok or reboot):**

1. Start LiteLLM + ngrok (leave running).
2. Copy the **new** `https://…/v1` URL from the terminal.
3. Paste into **Cursor → Settings → Models → Override OpenAI Base URL** (replace the old ngrok host entirely).
4. Verify before opening Cursor:
   ```powershell
   ./scripts/verify-public-url.ps1 -BaseUrl "https://YOUR-HOST.ngrok-free.dev/v1"
   ```
   → must print **`[OK]`**.

**Stable options:** ngrok **reserved domain** / paid static URL, or **localhost** (`http://127.0.0.1:4000/v1`) when only local Chat/Composer needs the bridge.

---

## Quick manual checks (curl)

Replace **`BASE`** and **`KEY`**:

```powershell
curl.exe -s -H "Authorization: Bearer KEY" "BASE/v1/models"
curl.exe -s -X POST "BASE/v1/chat/completions" -H "Authorization: Bearer KEY" -H "Content-Type: application/json" -d "{\"model\":\"my-model\",\"messages\":[{\"role\":\"user\",\"content\":\"ping?\"}],\"max_tokens\":128}"
```

Expect **HTTP 200** and JSON (not HTML).
