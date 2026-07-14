# Hermes Voice Alignment — JonBeatz / Draven

**Last updated:** 2026-07-13  
**Audience:** Hermes Desktop agent, Telegram gateway, profile operators  
**Companion:** [VOICE-WORKFLOW.md](./VOICE-WORKFLOW.md) · `.cursor/rules/voice-policy.mdc`

---

## Two voice layers (do not mix)

| Layer | Engine | When it runs |
|-------|--------|--------------|
| **Draven ritual TTS** | **OmniVoice** → Edge Ryan backup | `npm run draven:speak` from JonBeatz root — Start/End Project, Jon says "speak" |
| **Hermes built-in TTS** | Hermes `tts` config (Edge Ryan today) | Hermes `/tts` or voice-mode only — **not** ritual Draven voice |

OmniVoice is **not** a native Hermes `tts.provider`. Ritual speech always goes through the Draven voice-engine scripts.

---

## Jon's policy (law)

| Speak? | When |
|--------|------|
| **Yes** | Start Project greeting (once), End Project farewell (once), Jon says speak/say/read aloud |
| **Maybe** | Critical Mem0/stack errors if `DRAVEN_VOICE_ERRORS=1` |
| **No** | Open/Close Project, ordinary replies, summaries, mem0:add/search, Telegram auto-read |

**Hermes:** `voice.auto_tts: false` — never auto-read agent replies.

---

## Draven stack (primary)

| Priority | Engine | Voice |
|----------|--------|-------|
| **1** | OmniVoice (CPU, local `:18776`) | Instruct: `male, low pitch, american accent` (active preset) |
| **2** | Edge TTS (cloud) | `en-GB-RyanNeural` — **backup only** if Omni fails |

**Commands** (cwd `D:\Hermes\projects\JonBeatz`):

```powershell
npm run draven:speak -- "text"
npm run draven:omni-daemon              # optional pre-warm
npm run draven:omni-daemon -- -Stop     # free RAM (End Project)
```

**Chain:** `draven-voice-gate.ps1` → `draven-voice.ps1` → OmniVoice daemon → Edge fallback.

**Paths:**

- Engine: `D:\Hermes\projects\_core-scripts\voice-engine\`
- Presets: `voice-profiles.json` (active: `draven-natural-american`)
- OmniVoice app: `D:\Hermes\apps\OmniVoice\`
- Env: `D:\Hermes\projects\JonBeatz\.env.local`

---

## Hermes Desktop config (verified 2026-07-13)

**Global:** `%LOCALAPPDATA%\hermes\config.yaml`

```yaml
tts:
  provider: edge              # active — NOT gemini
  edge:
    voice: en-GB-RyanNeural
voice:
  auto_tts: false             # required
```

`auxiliary.vision.provider: google` in profile config is **vision** (Gemini flash), not TTS.

**Lock alignment (CLI):**

```powershell
hermes config set tts.provider edge
hermes config set tts.edge.voice en-GB-RyanNeural
hermes config set voice.auto_tts false
```

**Do not** set `tts.provider` to `gemini` unless Jon explicitly asks.

---

## Hermes agent rules

1. Ritual voice → `npm run draven:speak` or `speak` (via `voice-engine.ps1` → `draven-speak.ps1` → OmniVoice).
2. `Invoke-HermesTTS` is a **legacy alias** — same Draven path, not Gemini.
3. Keep `auto_tts: false` — no spoken chat replies.
4. Do not start OmniVoice at PC boot; stop on End Project (`draven:omni-daemon -- -Stop`).
5. Hermes `tts.provider: edge` is for internal `/tts` only — not ritual Draven voice.
6. Do not set `tts.provider` to `gemini` unless Jon asks.

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Voice sounds like Ryan not Omni | Omni daemon down or instruct invalid — check `VOICE-WORKFLOW.md` |
| Gemini TTS errors | Stay on `tts.provider: edge` |
| RAM high | `draven:omni-daemon -- -Stop` or `session:stop` |
| Slow first speak (~44s) | Pre-warm `draven:omni-daemon` at Start Project |

---

## Related

- [VOICE-WORKFLOW.md](./VOICE-WORKFLOW.md) — full Draven voice doc
- [TELEGRAM-WORKFLOW.md](./TELEGRAM-WORKFLOW.md) — gateway (auto_tts off)
- Profile hint: `%LOCALAPPDATA%\hermes\profiles\jonbeatz\config.yaml` → `agent.environment_hint`
