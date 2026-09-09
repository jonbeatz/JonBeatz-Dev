# Fleet team + memory — keep every Hermes project on the same rails

**Canonical vault protocol:** `H:\Vader_Vault\02_Knowledge\Patterns\Cursor-Hermes-Team.md`  
**Active handoff board:** `H:\Vader_Vault\03_AI_Memory\CURSOR-HERMES-BRIDGE.md`  
**Vault rules:** `H:\Vader_Vault\AGENTS.md`  
**Aligned:** 2026-08-03 · **Hub:** JonBeatz · **Propagate:** `npm run fleet:sync`

This doc is **fleet-wide**. It does **not** replace each project's `TRUTH.md` Mem0 collection name.

---

## Roles (same in every project)

| Who | Role |
|-----|------|
| **Cursor** | Builder — code, LiteLLM YAML, audits, Cursor custom models |
| **Hermes Desktop** | Overseer / PA — ops, Telegram, memory hygiene, light tasks |
| **Jon** | Operator — decisions, Override, Hermes Edit Models |

Switching Cursor folders does **not** change the vault bridge. Leave notes there so the other agent (or the next project) can pick up.

---

**Note lanes (pick one):**

1. **Bridge board** — mid-flight Cursor ↔ Hermes (durable async notes) — **prefer at desk**
2. **Hermes MCP (`hermes mcp serve` in Cursor)** — Telegram when Jon is **away / phone** (IN USE 2026-08-04; see `HERMES-MCP-BRIDGE.md`). Not default spam during desk sessions.
2b. **Hermes client MCPs (jonbeatz):** `hermes-fs` read-only disk eyes + `n8n` overseer + InDesign — see `CURSOR-HERMES-COMMAND-CONTROL.md`
3. **TaskBoardAI `:3001`** — durable shared todos (`boards/{boardId}.json`) — **only** kanban SoT (not Hermes Workspace `:3005` SQLite)
4. **ReCall + vault Sessions** — milestones
5. **Mem0 / Draven one-liners** — cold-start / assistant continuity (both agents may write)
6. **Jon paste (desk default for Hermes action)** — still used for self-breaking rails / when Hermes must act now at PC

---

## Write once (anti-duplicate)

| Fact type | Primary home |
|-----------|----------------|
| Milestone / decision | This project's ReCall (+ vault Session on Close/End) |
| Cross-project lesson | Vault `02_Knowledge/` |
| Cold-start one-liner | **This profile's** Mem0 collection (see table below) |
| Draven continuity | `draven_memories` / `qdrant_draven` (shared assistant store) |
| Mid-thread working notes | Mnemosyne (Cursor trial only — do **not** set Hermes `memory.provider`) |
| Tell the other agent | Vault bridge board |
| **Tool IN USE install** | Vault Pattern how-to + session + hub Decision + For Hermes — `Vault-note-after-tool-install`. Grades stay in shared `TOOLS-*` (link only). |
| Always-on infra | That Hermes profile's `MEMORY.md` (short; no book/project bloat) |

---

## Mem0 scopes (never mix)

| Project folder | Hermes profile slug | Mem0 user / collection (typical) |
|----------------|---------------------|----------------------------------|
| JonBeatz | `jonbeatz` | `jonbeatz_personal` / `jonbeatz_personal_memories` |
| DigitalStudioz | `digitalstudioz` | `digitalstudioz_memories` |
| VaderLabz | `vaderlabz` | `vaderlabz_memories` |
| JonBeatz.dev | `jonbeatz-dev` | `jonbeatz_dev` / `jonbeatz_dev_memories` / `qdrant_jonbeatz_dev` (underscores; slug stays hyphen) |
| Next-Flick | `next-flick` | `next-flick` / `next-flick_memories` |
| The-Night-I-Met-Santa | `the-night-i-met-santa` | `the-night-i-met-santa_memories` |
| Website-Templates | *(Cursor folder; Desktop stays jonbeatz)* | `website-templates` / `website-templates_memories` / `qdrant_website-templates` |
| MSC (separate repo) | `msc` | MSC-only — never JonBeatz personal |

**Never** write to `jonbeatz_memories` (stale name). Confirm `environment_hint` + `TRUTH.md` for the open project.

---

## Hermes Desktop model rules (every profile on `:4000`)

When the profile uses LiteLLM `http://127.0.0.1:4000/v1`:

1. **API key** = real master `<MSC_LITELLM_MASTER_KEY>` (never a chat-redacted `«redacted:sk-…»` string in YAML)
2. DeepSeek provider = **Flash + Pro only** + **`discover_models: false`**
3. **Never** add a second LiteLLM OpenRouter provider (same URL → Hermes merges → floods DeepSeek Direct)
4. New OpenRouter models → **native** OpenRouter provider / aliases (Hermes), or Cursor `*-or` via LiteLLM
5. Default **`deepseek-v4-flash`** on **all** Hermes profiles (Pro when operator asks). Also `providers.local-127.0.0.1:4000.default_model` = flash (unspecified-model fallback — fixed jonbeatz 2026-08-16).
6. `hermes config set` **cannot** set dotted provider keys — **Cursor edits `config.yaml`** (Hermes proposes only).
7. **Self-breaking changes → Cursor owns them.** OpenRouter settings, Hermes provider/model/alias/`config.yaml` rewrites, LiteLLM YAML, anything that can take Hermes offline mid-edit → **do in Cursor**. Hermes: stop, bridge “For Cursor”, wait. Why: Hermes often drops before the fix lands; Cursor stays connected.
8. **Jon paste habit:** when Cursor needs Hermes to know/verify/stop, Cursor gives Jon a ready-to-paste prompt for Hermes (Draven).

Reference layout: `%LOCALAPPDATA%\hermes\profiles\jonbeatz\config.yaml`  
Startup boot default: `_core-scripts\deepseek-api\scripts\Start-My-DeepSeek-API.ps1` → Flash

---

## Ritual voice (fleet-wide — 2026-08-03)

| Layer | Default |
|-------|---------|
| **Primary** | Edge `en-CA-LiamNeural` (same as Hermes Desktop TTS) |
| **Fallback / restore** | OmniVoice (CPU) — knobs stay in each `.env.local`; do **not** uninstall |
| **Policy** | Ritual-only (`DRAVEN_VOICE_POLICY=ritual`) — Start/End + explicit speak |
| **Scripts** | Shared `_core-scripts/voice-engine/` — `draven:speak` |
| **Docs** | `VOICE-WORKFLOW.md` (restore steps) · `HERMES-VOICE-ALIGNMENT.md` · `voice-policy.mdc` |

**Env (every profile that speaks):** `DRAVEN_VOICE=edge` · `DRAVEN_EDGE_VOICE=en-CA-LiamNeural` · `DRAVEN_VOICE_FALLBACK=omnivoice`  
**Restore Omni primary:** `DRAVEN_VOICE=omnivoice` + `DRAVEN_VOICE_FALLBACK=edge` (leave `DRAVEN_OMNI_*` intact) or one-shot `-OmniOnly`.

### Operator phrase: **update the fleet** / **fleet this**

After a **default / shared** change (rituals, voice, tools policy, shared scripts, skeleton docs/rules/prompts), Jon may say **update the fleet** (or **fleet this**). That means Cursor should:

1. Edit **canonical** `_core-scripts/shared-profile-content/` (and `_core-scripts/voice-engine/` when voice)
2. Patch sibling `.env.local` / examples when the change is env-level (not only docs)
3. Run **`npm run docs:sync` / `sync:rituals` / `fleet:sync`** from JonBeatz hub as needed
4. Vault decision/gotcha + Mem0/Draven one-liner when durable
5. Bridge one-liner **only if Hermes runtime must act or must not regress** (e.g. don’t re-promote Omni). Pure Cursor ritual defaults often don’t need a Hermes paste — vault + `FLEET-TEAM-MEMORY` is enough for next open.

**Agent habit:** after a clearly fleet-scoped change, **offer once** — “Should I update the fleet?” — unless Jon already said **update the fleet** / **fleet this**.

---

## What Cursor fleet sync covers vs Hermes-owned

| Layer | Owner | How it stays aligned |
|-------|--------|----------------------|
| Shared docs / skills / rituals | Cursor hub | Edit `_core-scripts/shared-profile-content/` → `npm run fleet:sync` |
| This doc + FLEET-BOOT / MEM0 / TOOLS-* | Cursor hub | Same |
| Vault AGENTS + bridge + team pattern | Both | One vault; all projects read it via `vault` MCP |
| Hermes `config.yaml` / OpenRouter / model providers | **Cursor** (Hermes proposes) | Per-profile; never half-edit from Desktop mid-session |
| Hermes `MEMORY.md` / cron / vault-sync copy | Hermes | Per-profile; JonBeatz: `npm run vault:sync:install` |
| Project ReCall / TRUTH | That project's Cursor | Do not fleet-overwrite project-specific truth |

**Fleet siblings** (auto docs/skills): DigitalStudioz, VaderLabz, JonBeatz.dev, Next-Flick, The-Night-I-Met-Santa, Harlows-Big-Adventure, **Website-Templates**, PullaraLaw-WP.

**Website-Templates:** open `D:\Hermes\projects\Website-Templates` **alone** for recreate work. Do not require JonBeatz. Desktop stays **jonbeatz**. Cold-open `CURRENT.md` in that repo. Mem0 `website-templates_memories`.  
**Not in fleet JSON yet:** Hermes-Commander, Ai-Gang — bootstrap when those become active workspaces. Local-WP/PullaraLaw is listed; treat as WP desk not a second hub.

---

## Open-project checklist (any sibling)

1. Read that project's `TRUTH.md` + ReCall (Mem0 scope)
2. Read vault `AGENTS.md` + project hub under `01_Projects/`
3. Peek bridge board if switching from another agent mid-day
4. Do **not** invent a new Mem0 collection or LiteLLM OR provider
5. On Close/End: ReCall + vault Session; bridge bullet if Hermes/Cursor needs a follow-up

---

## Verify

```powershell
# From JonBeatz hub
npm run fleet:status
npm run fleet:sync

# Hermes profiles (API key + discover_models) — ask Hermes or Cursor audit
# Expect: real <MSC_LITELLM_MASTER_KEY>, discover_models: false on :4000 DeepSeek providers
```

Hub-only deep matrix (JonBeatz): `.cursor/docs/MEMORY-SYSTEMS-HEALTH.md`, `.cursor/docs/TEAM-CURSOR-HERMES.md`, `.cursor/docs/HERMES-MODEL-UPDATE-RUNBOOK.md`
