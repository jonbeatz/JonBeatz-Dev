# Draven Voice Workflow — OmniVoice + Edge Ryan

**Last updated:** 2026-07-04  
**Operator:** Jon Beatz  
**Status:** **Ritual-only** — OmniVoice primary, Ryan backup, no auto-read replies

---

## Jon's policy (confirmed)

| Hear voice? | When |
|-------------|------|
| **Yes** | **Start Project** greeting (once) |
| **Yes** | **End Project** farewell (once, short) |
| **No** | **Open Project** / **Close Project** (silent handoff) |
| **Yes** | Jon says **speak** / **say** / **talk this** |
| **Maybe** | Critical Mem0/stack errors (`DRAVEN_VOICE_ERRORS=1`) |
| **No** | Ordinary chat replies, summaries, `mem0:add`, `mem0:search` recall |
| **No** | Hermes Desktop / Telegram auto-TTS (`auto_tts: false`) |

**One primary voice:** OmniVoice whenever speech is allowed. Edge Ryan **only** if Omni fails.

---

## OmniVoice vs Edge Ryan

| | **OmniVoice** (primary) | **Edge Ryan** (backup) |
|--|-------------------------|-------------------------|
| Quality | Lifelike, British male Draven | Robotic but clear |
| Speed | ~10–27s per line (CPU) | ~1–2s |
| RAM | **~2–4 GB** while daemon warm | **~0** (cloud) |
| GPU | None (CPU only) | None |
| Boot | **Not** on PC login | Always available |
| Best for | Rituals + when Jon asks to speak | Fallback only |

**Not optimal** to run OmniVoice daemon 24/7 — lazy start on first `draven:speak`, stop on **End Project** (`session:stop`).

---

## Commands

| Command | Purpose |
|---------|---------|
| `npm run draven:speak -- "text"` | OmniVoice (Ryan if Omni fails) |
| `npm run draven:voice-test` | Short test |
| `npm run draven:omni-daemon` | Optional pre-warm before Start Project |
| `npm run draven:omni-daemon -- -Stop` | Free RAM (auto on `session:stop`) |

`jarvis:*` aliases deprecated — use `draven:*` equivalents.

---

## `.env.local` policy keys

```env
DRAVEN_VOICE=omnivoice
DRAVEN_VOICE_FALLBACK=edge
DRAVEN_VOICE_POLICY=ritual
DRAVEN_VOICE_ERRORS=1
DRAVEN_OMNI_STOP_ON_END=1
DRAVEN_OMNI_INSTRUCT=male, low pitch, british accent
DRAVEN_OMNI_STEPS=16
DRAVEN_OMNI_STEPS_MEDIUM=24
DRAVEN_OMNI_STEPS_LONG=32
DRAVEN_OMNI_GUIDANCE=1.5
DRAVEN_OMNI_PORT=18776
OMNIVOICE_PYTHON=D:\Hermes\apps\OmniVoice\.venv\Scripts\python.exe
```

| Key | Meaning |
|-----|---------|
| `DRAVEN_VOICE_POLICY=ritual` | Speak only rituals + explicit `draven:speak` (+ gated errors) |
| `DRAVEN_VOICE_ERRORS=1` | Mem0 critical errors may speak (OmniVoice) |
| `DRAVEN_OMNI_STOP_ON_END=1` | `session:stop` kills Omni daemon |

Set `DRAVEN_VOICE_ERRORS=0` to silence error speaks too.

---

## Daily workflow

```
Start Project
  └── npm run draven:speak -- "Command Center online Jon. Draven standing by. The Matrix is ready, lets begin."  (OmniVoice)
  └── optional: npm run draven:omni-daemon  (pre-warm ~15s)

Work in Cursor
  └── Agent text only — NO auto voice on replies
  └── Jon: "speak this: …" → npm run draven:speak -- "…"

End Project
  └── npm run draven:speak -- "Great work, Jon. The Matrix holds our progress. Until next time."  (optional short line)
  └── npm run session:stop  → stops OmniVoice daemon, frees RAM
```

---

## Architecture

```
Allowed speak request
    └── draven-voice-gate.ps1 (policy check)
          └── draven-voice.ps1
                ├── OmniVoice daemon :18776
                └── fallback Edge Ryan (SoundPlayer for both)
```

**Mem0** (`mem0-chat.ps1`): text output only on success; voice **only** on critical errors via gate.

---

## Errors we hit and fixes

### Muffled scratches (long phrases)
- **Cause:** Hermes sounddevice playback + low CPU steps on long text.
- **Fix:** Windows `SoundPlayer`; adaptive steps 16/24/32; PCM16 normalize.

### Two voices confusing
- **Cause:** Mem0 used Edge Ryan while rituals used OmniVoice.
- **Fix:** Removed Mem0 auto-speak; OmniVoice for all allowed speaks; Ryan fallback only.

### RAM always on
- **Cause:** Daemon left running after tests.
- **Fix:** `DRAVEN_OMNI_STOP_ON_END=1` in `session:stop`.

---

## Troubleshooting

| Symptom | Action |
|---------|--------|
| Scratchy / empty | `draven:omni-daemon -- -Stop` then restart; retry speak |
| Voice when not wanted | Check `DRAVEN_VOICE_POLICY=ritual`; Mem0 no longer speaks on search/add |
| Slow first speak | Pre-warm `draven:omni-daemon` at Start Project |
| Free RAM | `session:stop` or `draven:omni-daemon -- -Stop` |

---

## Voice dictation (inbound STT — on deck)

**Not installed yet** (Jon 2026-07-04). Separate from Draven **speak-out** (OmniVoice).

| Tool | Verdict | Notes |
|------|---------|-------|
| [OpenWhispr](https://github.com/OpenWhispr/openwhispr) | WATCH — try first | Local Parakeet/Whisper; Ctrl+Win; optional LM Studio `:1234` cleanup |
| [Calliop](https://github.com/Lappom/Calliop) | WATCH — alt | Windows Wispr-style; Alt+Space; bundled Qwen cleanup |

Details: [TOOLS-WATCHLIST.md](./TOOLS-WATCHLIST.md) · [TOOLS-REFERENCE.md](./TOOLS-REFERENCE.md)

---

## Related

- `.cursor/rules/voice-policy.mdc` — agent rules
- `TRUTH.md` — persona law
- `.cursor/prompts/Start-Project.md` / `End-Project.md`
