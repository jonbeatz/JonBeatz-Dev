# Draven Voice Workflow — Edge Liam + OmniVoice (optional)

**Last updated:** 2026-08-08  
**Operator:** Jon Beatz  
**Status:** **Ritual-only** — Edge Liam primary (matches Hermes); OmniVoice installed + dialed-in for restore; **Kokoro-82M on deck** (`npm run kokoro:test`, not wired to Draven); NeuTTS parked for fun clone tests

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

**One primary voice:** Edge `en-CA-LiamNeural` (same as Hermes Desktop). OmniVoice only if Edge fails, or when Jon restores Omni as primary / uses `-OmniOnly`.

---

## Edge Liam vs OmniVoice

| | **Edge Liam** (primary) | **OmniVoice** (optional / fallback) |
|--|-------------------------|-------------------------------------|
| Voice | `en-CA-LiamNeural` | British male instruct (dialed-in) |
| Speed | **~1–2s** short lines | Cold ~44s; warm short ~6–7s; long ~33–43s |
| RAM | **~0** (cloud) | **~2–4 GB** while daemon warm |
| GPU | None | None (CPU only) |
| Best for | Start/End rituals + quick speak | Premium character reads |

**Why we switched (2026-08-03):** Rituals are two short lines. OmniVoice’s load + RAM cost was disproportionate. Liam matches Hermes and stays fast.

---

## Commands

| Command | Purpose |
|---------|---------|
| `npm run draven:speak -- "text"` | Edge Liam (Omni fallback if Edge fails) |
| `npm run draven:speak -- -OmniOnly "text"` | Force OmniVoice once (keeps current Omni knobs) |
| `npm run draven:voice-test` | Short test |
| `npm run draven:omni-daemon` | Pre-warm Omni (only needed when Omni is primary) |
| `npm run draven:omni-daemon -- -Stop` | Free Omni RAM (also on `session:stop`) |
| `npm run kokoro:status` | On-deck Kokoro venv check (not Draven) |
| `npm run kokoro:test` | Write `D:\Hermes\apps\kokoro\output\smoke-bm_george.wav` |

`jarvis:*` aliases deprecated — use `draven:*` equivalents.

---

## `.env.local` policy keys (current — Edge primary)

```env
DRAVEN_VOICE=edge
DRAVEN_VOICE_FALLBACK=omnivoice
DRAVEN_VOICE_POLICY=ritual
DRAVEN_VOICE_ERRORS=1
DRAVEN_EDGE_VOICE=en-CA-LiamNeural
DRAVEN_OMNI_STOP_ON_END=1
# --- Omni knobs preserved for restore (do not delete) ---
DRAVEN_OMNI_INSTRUCT=male, low pitch, british accent
DRAVEN_OMNI_STEPS=16
DRAVEN_OMNI_STEPS_MEDIUM=24
DRAVEN_OMNI_STEPS_LONG=32
DRAVEN_OMNI_GUIDANCE=1.5
DRAVEN_OMNI_PORT=18776
DRAVEN_OMNI_CHUNK_LEN=70
DRAVEN_OMNI_CHUNK_GAP=0.25
DRAVEN_OMNI_MIN_ZCR=0.02
OMNIVOICE_PYTHON=D:\Hermes\apps\OmniVoice\.venv\Scripts\python.exe
```

| Key | Meaning |
|-----|---------|
| `DRAVEN_VOICE=edge` | Primary TTS engine |
| `DRAVEN_EDGE_VOICE` | Edge Neural voice id (Liam = Hermes) |
| `DRAVEN_VOICE_FALLBACK=omnivoice` | If Edge fails, try Omni |
| `DRAVEN_VOICE_POLICY=ritual` | Speak only rituals + explicit `draven:speak` (+ gated errors) |
| `DRAVEN_OMNI_*` | **Leave set** even when Edge is primary — restore snapshot |

---

## Restore OmniVoice (premium primary again)

Do **not** uninstall OmniVoice. To make it primary again:

1. In `D:\Hermes\projects\JonBeatz\.env.local` set:
   ```env
   DRAVEN_VOICE=omnivoice
   DRAVEN_VOICE_FALLBACK=edge
   ```
   Leave all `DRAVEN_OMNI_*` and `OMNIVOICE_PYTHON` as they are (already dialed-in).
2. Optional: set `active_profile` in `_core-scripts/voice-engine/voice-profiles.json` to `draven-default` (British) or `draven-natural-american`.
3. Optional pre-warm: `npm run draven:omni-daemon`
4. Test: `npm run draven:speak -- "OmniVoice restore test"`
5. One-shot without env flip: `npm run draven:speak -- -OmniOnly "text"`

**Locked Omni snapshot (JonBeatz, 2026-08-03):**

| Knob | Value |
|------|-------|
| Instruct | `male, low pitch, british accent` |
| Steps | 16 / medium 24 / long 32 |
| Guidance | 1.5 |
| Chunk | len 70 · gap 0.25 · min ZCR 0.02 |
| Python | `D:\Hermes\apps\OmniVoice\.venv\Scripts\python.exe` |
| Profile alias | `draven-default` / `draven-natural-british` in `voice-profiles.json` |

American alternate (not active): `draven-natural-american` — instruct american, steps 24, speed 0.92.

---

## Voice presets (`voice-profiles.json`)

Profiles: `D:\Hermes\projects\_core-scripts\voice-engine\voice-profiles.json`

| Preset | Engine | Notes |
|--------|--------|-------|
| `edge-liam-primary` | Edge Liam | **Active default** (2026-08-03) |
| `draven-default` | OmniVoice British | Restore / premium |
| `draven-natural-american` | OmniVoice American | Alternate restore |
| `edge-fallback` | Edge Liam | Legacy row; same engine as primary |

**Instruct vocabulary (OmniVoice):** fixed tokens only — e.g. `male`, `low pitch`, `british accent`, `american accent`. Free text causes daemon **500** and fallback.

---

## Daily workflow

```
Start Project
  └── npm run draven:speak -- "…"  (Edge Liam ~1–2s)

Work in Cursor
  └── Agent text only — NO auto voice on replies
  └── Jon: "speak this: …" → npm run draven:speak -- "…"

End Project
  └── npm run draven:speak -- "…"  (Edge Liam)
  └── npm run session:stop  → stops Omni daemon if it was running
```

---

## Architecture

```
Allowed speak request
    └── draven-voice-gate.ps1 (policy check)
          └── draven-voice.ps1
                ├── Edge Liam (primary) — DRAVEN_EDGE_VOICE
                └── fallback OmniVoice daemon :18776 (if Edge fails)
```

**Mem0** (`mem0-chat.ps1`): text output only on success; voice **only** on critical errors via gate.

---

## Errors we hit and fixes

### Invalid instruct → silent Edge fallback (2026-07-12)
- **Cause:** OmniVoice `instruct` is a fixed vocabulary; free-text phrases error at synthesis.
- **Fix:** Use only valid tokens (see presets). Relevant when Omni is primary or fallback.

### Muffled feedback on long phrases (CPU OmniVoice)
- **Fix (2026-07-09):** sentence chunking via `DRAVEN_OMNI_CHUNK_LEN=70` + `DRAVEN_OMNI_MIN_ZCR=0.02`.

### Two voices confusing
- **Fix:** Rituals + Hermes now share **Liam**. Omni is optional premium / fallback only.

### RAM always on
- **Fix:** With Edge primary, Omni daemon should stay off. `DRAVEN_OMNI_STOP_ON_END=1` still kills it on `session:stop` if it was started.

---

## Troubleshooting

| Symptom | Action |
|---------|--------|
| Edge fail / no audio | Check network; retry; or `-OmniOnly` / restore Omni primary |
| Scratchy Omni | `draven:omni-daemon -- -Stop` then retry |
| Voice when not wanted | Check `DRAVEN_VOICE_POLICY=ritual` |
| Slow speak (~6–40s) | You are on Omni — expected; switch back to `DRAVEN_VOICE=edge` for rituals |
| Free RAM | `session:stop` or `draven:omni-daemon -- -Stop` |

---

## Voice dictation (inbound STT — on deck)

**Not installed yet** (Jon 2026-07-04). Separate from Draven **speak-out**.

| Tool | Verdict | Notes |
|------|---------|-------|
| [OpenWhispr](https://github.com/OpenWhispr/openwhispr) | WATCH — try first | Local Parakeet/Whisper; Ctrl+Win; optional LM Studio `:1234` cleanup |
| [Calliop](https://github.com/Lappom/Calliop) | WATCH — alt | Windows Wispr-style; Alt+Space; bundled Qwen cleanup |

Details: [TOOLS-WATCHLIST.md](./TOOLS-WATCHLIST.md) · [TOOLS-REFERENCE.md](./TOOLS-REFERENCE.md)

---

## NeuTTS (parked — keep both stacks)

**Policy (Jon 2026-08-08):** Keep both paths. Fun later for Jon / Maria voice-clone experiments. **Not** wired into Draven rituals (still Edge → Omni). Do **not** delete during vault cleanups.

| Path | What’s there | Size (approx) |
|------|--------------|---------------|
| `H:\AI_Models\Hermes-NeuTTS` | `pytorch_model.bin` + `my_voice\` (Jon long/short + Maria wavs + `speak_clone.bat`) | ~1.1 GB |
| `H:\LLM_VAULT\jonbeatz\neutts-air-Q4_0` | LM Studio GGUF `neutts-air-Q4_0.gguf` | ~0.5 GB |

| Do | Don’t |
|----|-------|
| Leave weights + ref wavs in place | Treat as Draven primary / replace Liam |
| Use for manual clone smoke when curious | Merge into OmniVoice or delete “duplicate” NeuTTS |
| See TOOLS-WATCHLIST **WATCH** grade | Auto-install / wire into `draven:speak` without Jon asking |

When ready to test: load the LMS GGUF **or** run the Hermes-NeuTTS scrap against `my_voice\` refs — separate from Edge/Omni.

---

## Kokoro-82M (on deck — not wired)

**Policy (Jon 2026-09-03):** Downloaded and smokes. **Not** a `draven:speak` engine. Turn on later with the npm aliases.

| Item | Path / command |
|------|----------------|
| App + CPU venv | `D:\Hermes\apps\kokoro` |
| Weights cache | `%USERPROFILE%\.cache\huggingface\hub\models--hexgrad--Kokoro-82M` |
| Smoke wav | `D:\Hermes\apps\kokoro\output\smoke-bm_george.wav` |
| Status | `npm run kokoro:status` |
| Generate test wav | `npm run kokoro:test` |

Do **not** set `DRAVEN_VOICE=kokoro`. Do **not** use kokoroai.org.

---

## Related

- `.cursor/rules/voice-policy.mdc` — agent rules
- `TRUTH.md` — persona law
- `.cursor/prompts/Start-Project.md` / `End-Project.md`
- `_core-scripts/voice-engine/voice-profiles.json` — presets + restore profiles