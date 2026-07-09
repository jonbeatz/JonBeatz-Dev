# Tool Chest Index — Start Here

**One-page map** of everything in the JonBeatz / Hermes developer arsenal: tools, keys, dashboards, and verify commands.

| Doc | Purpose |
|-----|---------|
| **This file** | Daily cheat sheet — start here |
| **[TOOLS-STACK-OPTIONS.md](./TOOLS-STACK-OPTIONS.md)** | **Full stack catalog** — core tech IN USE + researched alternatives |
| [MASTER-ECOSYSTEM-AUDIT.md](./MASTER-ECOSYSTEM-AUDIT.md) | Full system overview (sites, stacks, MCPs) |
| [CREDENTIALS-MANIFEST.md](./CREDENTIALS-MANIFEST.md) | Auto-generated — *where* every key lives (no values) |
| `MASTER-SECRETS-INVENTORY.local.md` | **Gitignored** — full API keys & passwords (run audit to refresh) |
| [TOOLS-SETUP-STATUS.md](./TOOLS-SETUP-STATUS.md) | Per-tool READY / NEEDS_KEY matrix |
| [TOOLS-WATCHLIST.md](./TOOLS-WATCHLIST.md) | Grades, verdicts, paid vs free |
| **[TOOLS-STACK-OPTIONS.md](./TOOLS-STACK-OPTIONS.md)** | **Auth, CMS, DB, MD editors** — researched stack picks for new projects |
| [ENV-VARS-REFERENCE.md](../ENV-VARS-REFERENCE.md) | Every env var defined |

**Refresh everything:** `npm run ecosystem:audit` (any Hermes profile)  
**Quick health:** `npm run tools:status`

---

## Top 25 tools — access at a glance

| Tool | Paid? | Env var(s) | Verify / start | Status |
|------|-------|------------|----------------|--------|
| **DeepSeek + LiteLLM** | Paid | `DEEPSEEK_API_KEY`, `MSC_LITELLM_MASTER_KEY` | `npm run deepseek:status` | Master + JonBeatz |
| **OpenRouter** | Pay-per-use | `OPENROUTER_API_KEY` | `npm run deepseek:test:openrouter` | JonBeatz, Next-Flick |
| **LM Studio** | Free local | `LMSTUDIO_*` (optional) | GUI `:1234` + `npm run mem0:preflight` | Desktop app |
| **Mem0** | Free local | `MEM0_*` per profile | `npm run mem0:preflight` | Isolated per project |
| **Draven Mem0** | Free | (hardcoded collection) | `npm run draven:list` | Cross-project |
| **Telegram gateway** | Free | `TELEGRAM_*` | `npm run telegram:ensure` | JonBeatz master |
| **ngrok** | Paid | `NGROK_AUTHTOKEN` | `:4040` when LiteLLM ngrok on | Master |
| **OmniVoice (Draven)** | Free CPU | `OMNIVOICE_PYTHON` | `npm run draven:speak -- "test"` | Ritual only |
| **Hugging Face images** | Freemium | `HF_TOKEN` | `npm run image:gen` | JonBeatz |
| **fal.ai** | Per use | `FAL_API_KEY` | `npm run image:fal` | Optional bonus |
| **ComfyUI** | Free local | `COMFYUI_ROOT`, `COMFYUI_URL` | Start `:8188`, `npm run comfy:start` | On demand |
| **Context7 MCP** | Free | — | Always on in Cursor | No key |
| **GitHub MCP** | Free | `GITHUB_PERSONAL_ACCESS_TOKEN` | `npm run sync:mcp-env` | Global MCP |
| **Tavily MCP** | API credits | `TAVILY_API_KEY` | Search in Cursor | Global MCP |
| **Hostinger MCPs (×4)** | Hosting sub | `HOSTINGER_API_TOKEN` | MCP deploy tasks | Global MCP |
| **fal-ai MCP** | Per use | `FAL_API_KEY` | Global MCP | Same key as fal scripts |
| **vault MCP** | Free | — | `H:\Vader_Vault` | Obsidian vault |
| **Clerk** | SaaS | `CLERK_SECRET_KEY`, `NEXT_PUBLIC_CLERK_*` | Next-Flick sign-in | Next-Flick |
| **Neon Postgres** | SaaS | `NEON_DATABASE_URL` | Next-Flick prod | Next-Flick |
| **TMDB** | Free tier | `TMDB_API_KEY` | Next-Flick search | Next-Flick |
| **Resend** | SaaS | `RESEND_API_KEY` | MSC email | MSC |
| **AgentMail** | Freemium | `AGENTMAIL_API_KEY` | [agentmail.to](https://www.agentmail.to/) — agent inboxes | Next-Flick (ADOPT) |
| **Sentry** | SaaS | `SENTRY_*` | MSC monitoring | MSC |
| **GCP / Vertex** | GCP billing | `GOOGLE_APPLICATION_CREDENTIALS` | MSC google-api-proxy | JSON file path |
| **Google Workspace (personal)** | Free (OAuth) | File: `%LOCALAPPDATA%\hermes\profiles\jonbeatz\google_token.json` | `npm run google:doctor` (JonBeatz) | jonbeatz@gmail.com — Gmail, Drive, Docs |
| **Firecrawl MCP** | Freemium | `FIRECRAWL_API_KEY` | VPE / optional | Master has key |
| **Browserbase** | SaaS | `BROWSERBASE_*` | JonBeatz project MCP | Hub overlay |

Run `npm run ecosystem:audit` for exact SET/EMPTY per file.

---

## Where secrets live (priority order)

1. **`D:\Hermes\projects\_core-scripts\.env.local.master`** — canonical master (copy from here first)
2. **Profile `.env.local`** — `npm run env:setup` merges from master
3. **`deepseek-api\.env.local`** — LiteLLM runtime (synced via `sync:deepseek-env`)
4. **`MASTER-SECRETS-INVENTORY.local.md`** — full dump after `npm run ecosystem:audit`
5. **`G:\Hermes_Project_BackUpz\MASTER-ECOSYSTEM-AUDIT\*-SECRETS-BACKUP.local.md`** — external backup
6. **Hermes Desktop** — `%LOCALAPPDATA%\hermes\profiles\jonbeatz\.env` (Telegram)
7. **Hermes Desktop root** — `%LOCALAPPDATA%\hermes\.env` (Telegram mirror)
8. **Hermes config.yaml** — LiteLLM `api_key` / provider URLs (root + profiles — in secrets inventory)
9. **Groq / claude-video** — `%USERPROFILE%\.config\watch\.env`

**Re-enter a key somewhere new?** Open `CREDENTIALS-MANIFEST.md` → find env var → open source file from manifest. Or open `MASTER-SECRETS-INVENTORY.local.md` for copy-paste.

---

## Dashboards & accounts (browser login — not in .env)

| Service | URL | Notes |
|---------|-----|-------|
| **Hostinger hPanel** | https://hpanel.hostinger.com/ | Restart Node apps after deploy |
| **Clerk** | https://dashboard.clerk.com/ | Next-Flick instance |
| **Neon** | https://console.neon.tech/ | Next-Flick prod DB |
| **DeepSeek** | https://platform.deepseek.com/ | API billing |
| **OpenRouter** | https://openrouter.ai/keys | LiteLLM `*-or` aliases |
| **ngrok** | https://dashboard.ngrok.com/ | Tunnel token |
| **TMDB** | https://www.themoviedb.org/settings/api | Movie metadata |
| **GitHub PAT** | https://github.com/settings/tokens | MCP + backups |
| **Hugging Face** | https://huggingface.co/settings/tokens | Image inference |
| **fal.ai** | https://fal.ai/dashboard | Image/video API |
| **Tavily** | https://tavily.com/ | Search API |
| **Resend** | https://resend.com/api-keys | MSC transactional email |
| **AgentMail** | https://www.agentmail.to/ | Agent email inboxes (Next-Flick key SET) |
| **Sentry** | https://sentry.io/ | MSC errors |
| **Google Cloud** | https://console.cloud.google.com/ | Vertex / MSC |
| **Google Workspace (jonbeatz@gmail.com)** | https://mail.google.com · https://drive.google.com · https://docs.google.com | Personal OAuth — see `JonBeatz\.cursor\docs\GOOGLE-WORKSPACE.md` |
| **GCP OAuth clients** | https://console.cloud.google.com/auth/clients?project=wordpress-map-1492461083797 | Desktop client for Hermes skill |
| **Cursor** | https://cursor.com/dashboard | IDE subscription |
| **Spaceship** | cPanel for MSC-Projectz | jon-beatz.com vault app |

**Cursor plugins (OAuth in IDE):** Stripe, Vercel, Firebase — no env var until you use them.

---

## Local services — boot order

| Order | Service | Port | Start |
|-------|---------|------|-------|
| 1 | LM Studio | 1234 | Open app, load qwen3-4b |
| 2 | LiteLLM + ngrok | 4000 / 4040 | `npm run deepseek:on` or `session:start -- -Full` |
| 3 | Telegram gateway | — | Auto with session:start |
| 4 | Next-Flick dev | 3000 | `npm run web:dev` |
| 5 | ComfyUI | 8188 | Manual or `npm run comfy:start` |
| 6 | OmniVoice | 18776 | Lazy on `draven:speak` |
| 7 | TokenTracker | 7680 | Optional analytics |
| 8 | AgentsView | 8080 | Optional sessions UI |

**Do not** let agents `taskkill` LiteLLM/ngrok — use `npm run deepseek:off` from JonBeatz only.

---

## WordPress / LocalWP sites

| Site | URL | MCP / config |
|------|-----|--------------|
| **mscclean.local** | http://mscclean.local | MSC `local-wp`, VPE `novamira-mscclean-local` |
| **NovaMira v3/v4** | LocalWP URLs in VPE `mcp.json` | Node-Launcher novamira-* MCPs |
| **msc-v1** | VPE MCP | `@automattic/mcp-wordpress-remote` |

App passwords: see `WORDPRESS_*` / `WP_*` in env or `MASTER-SECRETS-INVENTORY.local.md`.

---

## MCP layers

| Layer | Location | Count |
|-------|----------|-------|
| **Global** | `C:\Users\JONBEATZ\.cursor\mcp.json` | 16 servers |
| **JonBeatz project** | `.cursor\mcp.json` | **2** live (`21st-dev-magic`, `markdownify`); example template lists optional extras |
| **Next-Flick / VaderLabz** | Bootstrap template | 15 |
| **MSC** | `.cursor\mcp.json` | 7 (+ global 12) |
| **Node-Launcher** | `.cursor\mcp.json` | 12 (WP locals, firecrawl, docker, …) |
| **Workspace plugins** | Cursor UI | stripe, vercel, firebase, ide-browser |

**Sync keys into MCP JSON:** `npm run sync:mcp-env` (Hermes) · `npm run msc:sync:mcp-env` (MSC)

---

## Skills & agent expertise

| Location | Contents |
|----------|----------|
| `D:\Hermes\projects\Next-Flick\SKILL-INDEX.md` | Catalog of `.cursor/skills/` |
| `%USERPROFILE%\.agents\skills\` | Global skills (GSAP, blog, hallmark, find-skills, …) |
| `%USERPROFILE%\.claude\skills\` | Claude Code skills |
| `npm run skills:hallmark:install` | Anti-slop design skill |
| `npx skills find [query]` | Discover new skills |

---

## Adding a new service (checklist)

1. Sign up → create API key at provider dashboard (table above).
2. Add vars to **`ENV-VARS-REFERENCE.md`** first.
3. Set values in **`_core-scripts\.env.local.master`**.
4. Run **`npm run env:setup`** in affected profile(s).
5. If MCP: add server to `mcp.json` template + **`npm run sync:mcp-env`**.
6. Add path to **`ecosystem-audit.ps1`** `$ActiveEnvFiles` if new project root.
7. Run **`npm run ecosystem:audit`** — refreshes secrets + manifest.
8. If tool is graded B-+: update **`TOOLS-WATCHLIST.md`** + **`TOOLS-SETUP-STATUS.md`**.
9. Optional: `npm run draven:add -- "Service X: configured for Y"`.

---

## After fleet sync (commit checklist)

`npm run fleet:sync` can change sibling **`package.json`** without updating the lockfile. **Always commit `package.json` + `package-lock.json` together** before push — CI uses `npm ci`.

1. Run **`npm run fleet:sync`** from JonBeatz
2. Check output for **WARN package.json / package-lock.json changed**
3. Per profile: `npm install` → `git add package.json package-lock.json` → commit → push
4. **`npm run fleet:status`** — lockfile must show OK

See [COMMAND-CENTER.md](./COMMAND-CENTER.md) § Fleet sync commit checklist. DigitalStudioz GitHub Pages requires **Node 22+**.

---

## Commands cheat sheet

```powershell
npm run ecosystem:audit      # Regenerate secrets inventory + manifest + G:\ backup
npm run tools:status         # Config queue + runtime checks
npm run sync:mcp-env         # Push .env.local keys → Cursor MCP JSON
npm run env:setup            # Bootstrap profile .env.local from master
npm run mem0:preflight       # LM Studio + Mem0 health
npm run deepseek:status      # LiteLLM + ngrok stack
npm run session:start -- -Full   # Full Hermes boot ritual
```

---

*Last manual update: 2026-07-07 · Secrets/manifest auto-update via `ecosystem:audit`*
