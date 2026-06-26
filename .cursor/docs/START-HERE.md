# START HERE — JONBEATZ.DEV

Standalone red command-center site. If you're new to this project, read this first.

**Project root:** `D:\Hermes\projects\JonBeatz.dev`
**Live target:** https://jonbeatz.dev

---

## Source-of-truth order

1. **`TRUTH.md`** — what this project is + boundaries
2. **`START-HERE.md`** (this file)
3. **`MASTER-COMMANDS.md`** — command reference
4. **`JONBEATZ-DEV-DEPLOY.md`** — Hostinger static deploy + CDN flush
5. **`ReCall.md`** / **`Restore-Points.md`** — focus + milestones

---

## Start Project (cold boot)

Say **Start Project**, **Start Session**, or **Cold Start**. Agent must:

1. `npm run session:start` from the project root (Mem0 preflight + port probes).
2. Follow `.cursor/prompts/Start-Project.md`.
3. Read `TRUTH.md`, this file, and `ReCall.md`.
4. Handshake: **"Ok Jon — JONBEATZ.DEV site loaded, ready."**

This project has **no** DeepSeek/Telegram/voice/ComfyUI — those are the personal profile.

---

## Local dev

```powershell
npm run dev            # red site + glow beam @ http://localhost:3000 (default)
npm run site:preview   # serve the static export @ :5057
```

Red is the default. To preview the legacy gold theme: `NEXT_PUBLIC_JB_VARIANT=default npm run dev`.

---

## Deploy

```powershell
npm run site:package   # build + zip -> .deploy/jonbeatz-dev-site_*.zip
```

Then agent: `hosting_deployStaticWebsite { domain: "jonbeatz.dev", archivePath: "<zip>" }`
→ **flush CDN** (hPanel → jonbeatz.dev → Performance → CDN → Flush cache).
Full runbook: **`JONBEATZ-DEV-DEPLOY.md`**.

---

## Mem0

```powershell
npm run mem0:preflight
npm run mem0:search -- "current priorities"
npm run mem0:add -- "Remember: ..."
```

Scope: **`jonbeatz_dev`** (isolated from the personal profile).

---

## UI / 3D skills (read order)

Visual: **NovaMira-Design → MSC-UI-Taste → Premium-UI → DesignMD**. Code: **Nova**.
3D/WebGL: **3D-Modeling, 3D-Scroll, Three.js-Ops, WebGL-UI**. On-deck (vendored):
`.cursor/skills-external/` (gsap, awesome-design-md).

---

## Docs & UTF-8 hygiene

```powershell
npm run encoding:check   # mojibake scan
npm run version:sync     # README badges (Python UTF-8)
npm run docs:sync        # alignment audit + encoding gate
```

---

## Related projects (separate — switch context explicitly)

| Project | Root | Use for |
|---------|------|---------|
| **JONBEATZ.DEV** (this) | `D:\Hermes\projects\JonBeatz.dev` | The red jonbeatz.dev site |
| **JonBeatz** (personal) | `D:\Hermes\projects\JonBeatz` | Personal AI, Mem0, gold jon-beatz.com, voice/Telegram/DeepSeek |
