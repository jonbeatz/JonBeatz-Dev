# Hermes Voice Alignment — Fleet / Draven

**Last updated:** 2026-08-03  
**Audience:** Hermes Desktop agent, Telegram gateway, profile operators (all Hermes projects)  
**Companion:** [VOICE-WORKFLOW.md](./VOICE-WORKFLOW.md) · `.cursor/rules/voice-policy.mdc`

---

## Two voice layers (do not mix)

| Layer | Engine | When it runs |
|-------|--------|--------------|
| **Draven ritual TTS** | **Edge Liam** → OmniVoice fallback | `npm run draven:speak` from any fleet profile root — Start/End Project, Jon says "speak" |
| **Hermes built-in TTS** | Hermes `tts` config (Edge Liam) | Hermes `/tts` or voice-mode only — **not** ritual Draven path |

Ritual speech always goes through the shared Draven voice-engine scripts (`_core-scripts/voice-engine/`). OmniVoice is **optional restore**, not the daily primary.

---

## Jon's policy (law)

| Speak? | When |
|--------|------|
| **Yes** | Start Project greeting (once), End Project farewell (once), Jon says speak/say/read aloud |
| **Maybe** | Critical Mem0/stack errors if `DRAVEN_VOICE_ERRORS=1` |
| **No** | Open/Close Project, ordinary replies, summaries, mem0:add/search, Telegram auto-read |

**Hermes:** `voice.auto_tts: false` — never auto-read agent replies.

---

## Draven stack (fleet default — 2026-08-03)

| Priority | Engine | Voice |
|----------|--------|-------|
| **1** | Edge TTS (cloud) | `en-CA-LiamNeural` — **same as Hermes Desktop** |
| **2** | OmniVoice (CPU, local `:18776`) | Dialed-in British instruct — **fallback / optional restore only** |

**Commands** (cwd = active project root that has `draven:speak`):

```powershell
npm run draven:speak -- "text"
npm run draven:speak -- -OmniOnly "text"   # force Omni once
npm run draven:omni-daemon -- -Stop        # free Omni RAM if it was started
```

**Chain:** `draven-voice-gate.ps1` → `draven-voice.ps1` → Edge Liam → Omni fallback.

**Paths:**

- Engine: `D:\Hermes\projects\_core-scripts\voice-engine\`
- Presets: `voice-profiles.json` (active: `edge-liam-primary`)
- OmniVoice app: `D:\Hermes\apps\OmniVoice\` (keep installed)
- Env: each project's `.env.local` — `DRAVEN_VOICE=edge`, `DRAVEN_EDGE_VOICE=en-CA-LiamNeural`

**Restore Omni as primary:** see [VOICE-WORKFLOW.md](./VOICE-WORKFLOW.md) → **Restore OmniVoice**. Flip `DRAVEN_VOICE=omnivoice` + `DRAVEN_VOICE_FALLBACK=edge`; leave all `DRAVEN_OMNI_*` knobs as-is.

---

## Hermes Desktop config (aligned 2026-08-03)

**Profile / global TTS** should match Liam:

```yaml
tts:
  provider: edge
  edge:
    voice: en-CA-LiamNeural
voice:
  auto_tts: false
```

**Lock alignment (CLI):**

```powershell
hermes config set tts.provider edge
hermes config set tts.edge.voice en-CA-LiamNeural
hermes config set voice.auto_tts false
```

**Do not** set `tts.provider` to `gemini` unless Jon explicitly asks.

---

## Hermes agent rules

1. Ritual voice → `npm run draven:speak` (Edge Liam). Do not invent a second TTS path.
2. Keep `auto_tts: false` — no spoken chat replies.
3. Do not start OmniVoice at PC boot; only if Omni is primary or fallback fires; stop on End Project.
4. Config self-breaking changes (providers / voice rails) → propose on bridge; Cursor applies.

---

## Fleet coverage

| Project | Voice env |
|---------|-----------|
| JonBeatz (hub) | Edge Liam + Omni knobs preserved |
| DigitalStudioz, Next-Flick, The-Night-I-Met-Santa | Edge Liam (synced 2026-08-03) |
| Profiles without `DRAVEN_VOICE` in `.env.local` | Script default = **edge** / Liam |

Shared scripts + `voice-policy.mdc` + Start/End prompts ship via `npm run fleet:sync`.
