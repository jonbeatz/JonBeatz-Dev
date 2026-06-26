# JONBEATZ.DEV

[![Version](https://img.shields.io/badge/version-1.0.0-blue)](https://github.com/jonbeatz/JonBeatz-Dev/releases)
[![Release](https://img.shields.io/github/v/release/jonbeatz/JonBeatz-Dev?label=release&sort=semver)](https://github.com/jonbeatz/JonBeatz-Dev/releases)
[![Repo](https://img.shields.io/badge/GitHub-jonbeatz%2FJonBeatz--Dev-181717?logo=github)](https://github.com/jonbeatz/JonBeatz-Dev)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-149eca?logo=react)](https://react.dev)
[![Three.js](https://img.shields.io/badge/Three.js-r163-000?logo=three.js)](https://threejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)](https://www.typescriptlang.org)

> The standalone **red command-center site** — a dark, cinematic Next.js + Three.js
> single-page site with a glow-beam hero portal, animated 3D particle field, bento
> panels, and a JARVIS console footer. Live at **https://jonbeatz.dev**.

This project was split out of the JonBeatz personal AI profile (where it lived as the
`dev` theme variant) into its own self-contained repo. **Red is the baked default** —
`npm run dev` shows the red theme + glow beam with no flags.

## Quick start

```powershell
npm install
npm run dev            # red site + glow beam @ http://localhost:3000
```

## Build & deploy

```powershell
npm run site:build:static   # static export -> out/
npm run site:preview        # QA the export @ :5057
npm run site:package        # build + zip -> .deploy/ for Hostinger MCP
```

Deploy: `hosting_deployStaticWebsite { domain: "jonbeatz.dev", archivePath: "<zip>" }`,
then flush the CDN. Full runbook: [`.cursor/docs/JONBEATZ-DEV-DEPLOY.md`](.cursor/docs/JONBEATZ-DEV-DEPLOY.md).

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 (App Router) · React 19 · TypeScript 5 |
| 3D | Three.js r163 · @react-three/fiber · @react-three/drei |
| Motion | `motion` (Framer Motion) |
| Hosting | Hostinger static export |
| Memory (local) | Mem0 + LM Studio, scope `jonbeatz_dev` |

## Variant

| Variable | Default | Effect |
|----------|---------|--------|
| `NEXT_PUBLIC_JB_VARIANT` | `dev` (red) | set `default` for the legacy gold theme |
| `JB_STATIC` | unset | `1` produces the static public export |

## Docs

- [`TRUTH.md`](TRUTH.md) — project identity + boundaries
- [`.cursor/docs/START-HERE.md`](.cursor/docs/START-HERE.md) — daily ops
- [`.cursor/docs/MASTER-COMMANDS.md`](.cursor/docs/MASTER-COMMANDS.md) — command reference
- [`.cursor/docs/JONBEATZ-DEV-DEPLOY.md`](.cursor/docs/JONBEATZ-DEV-DEPLOY.md) — deploy runbook

## Boundaries

Self-contained. No JARVIS voice / Telegram / DeepSeek / ComfyUI / Google / image-gen —
those belong to the personal profile at `D:\Hermes\projects\JonBeatz`. This repo ships
only `jonbeatz.dev` (red); the gold `jon-beatz.com` stays in the personal profile.

— Maintainer: **Jon Beatz** · License: UNLICENSED (private)
