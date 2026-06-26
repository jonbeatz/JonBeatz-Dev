# Agent Instructions — JONBEATZ.DEV

## First time here?

1. Read **`TRUTH.md`** — what this project is and its boundaries.
2. Read **`.cursor/docs/START-HERE.md`** — daily ritual + doc order.
3. Read **`.cursor/docs/JONBEATZ-DEV-DEPLOY.md`** — Hostinger static deploy + CDN flush.
4. Read **`.cursor/docs/HOSTINGER-REFERENCE.md`** — MCP quartet, account SSH, SSL, pitfalls.
5. Read **`.cursor/docs/ReCall.md`** — current focus.

## What this project is

The standalone **red command-center site** (`jonbeatz.dev`) — Next.js 14 + React 19 +
Three.js. Split out of the JonBeatz personal profile. **Red is the baked default**
(`npm run dev` shows red + glow beam, no flags).

## Hard boundaries

- **Included:** OmniVoice (JARVIS, ritual-only) + project MCPs (21st-dev, markdownify,
  browserbase, pencil, composio).
- Do **not** add Telegram, DeepSeek/LiteLLM, ComfyUI, Google, or image-gen — they belong
  to `D:\Hermes\projects\JonBeatz`.
- Do **not** bring the gold `jon-beatz.com` here.
- Mem0 = **`jonbeatz_dev`** scope only.
- Windows PowerShell only (no bash heredocs). Never commit `.env*` or `.cursor/mcp.json`
  (gitignored — repo is public).

## Start Project ritual

When Jon says **Start Project** / **Start Session** / **Cold Start**:

1. `npm run session:start` from `D:\Hermes\projects\JonBeatz.dev` (`:full` pre-warms voice)
2. Read `TRUTH.md`, `.cursor/docs/START-HERE.md`, `.cursor/docs/ReCall.md`
3. Speak greeting once: `npm run jarvis:speak -- "..."` (ritual-only)
4. Handshake: **"Ok Jon — JONBEATZ.DEV site loaded, ready."**

## Key commands

```powershell
npm run dev                 # red site + glow beam @ :3000
npm run site:build:static   # static export -> out/
npm run site:preview        # serve out/ @ :5057
npm run site:package        # build + zip -> .deploy/ (for Hostinger MCP)
npm run mem0:search -- "q"  # jonbeatz_dev memory
npm run jarvis:speak -- ".."# OmniVoice (ritual-only)
npm run sync:mcp-env        # inject MCP keys from .env.local
npm run backup:quick        # versioned backup (backup:quick:full for full)
```

## Key paths

| Resource | Path |
|----------|------|
| Project root | `D:\Hermes\projects\JonBeatz.dev` |
| Live URL | https://jonbeatz.dev |
| Backups | `G:\Hermes_Project_BackUpz\JonBeatz.dev` |
| Personal profile (separate) | `D:\Hermes\projects\JonBeatz` |
