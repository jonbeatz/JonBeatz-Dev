# Release Version — JONBEATZ.DEV

## Trigger
**release version**, **publish release**

## Steps

1. Bump `version` in `package.json`.
2. `npm run version:sync` (updates TRUTH.md, MASTER-COMMANDS.md, README badges — UTF-8 safe).
3. Add a `CHANGELOG.md` entry; update `.cursor/docs/ReCall.md`.
4. `npm run encoding:check` + `npm run docs:sync` (must be green).
5. Commit. Then `npm run release` (tags `vX.Y.Z`, pushes, publishes GitHub release via `gh`).

> A GitHub remote must exist first. Don't push to a remote without Jon's go-ahead.
