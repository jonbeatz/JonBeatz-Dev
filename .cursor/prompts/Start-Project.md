# Start Project — JONBEATZ.DEV

## Trigger
**Start Project**, **Start Session**, **Cold Start**, **Begin Project**

## Steps

1. Run from project root:

```powershell
npm run session:start
```

   (Mem0 preflight + port probes. No DeepSeek/Telegram/ComfyUI/image-gen — those stay in
   the personal JonBeatz profile. OmniVoice IS available here.)

2. Read `TRUTH.md`, `.cursor/docs/START-HERE.md`, and `.cursor/docs/ReCall.md`.

3. Optional recall: `npm run mem0:search -- "current priorities"` (if LM Studio is up).

4. Speak the greeting once (OmniVoice, ritual-only):

```powershell
npm run jarvis:speak -- "JONBEATZ dot dev online, Jon. Command center ready."
```

5. Handshake (first line): **"Ok Jon — JONBEATZ.DEV site loaded, ready."**

## Local preview

```powershell
npm run dev            # red site + glow beam at http://localhost:3000
```

Red is the default — no flags needed.
