# Branch Cut — JONBEATZ.DEV

## Trigger
**branch cut**, **cut new development branch**

## Ritual

1. Preflight: `npm run backup:quick` (snapshot current state).
2. Freeze the previous branch (leave it on the remote as a restore point; no further commits).
3. `git checkout -b JonBeatz-dev-v{N}` from the current tip.
4. Bump `package.json` to `N.0.0`; `npm run version:sync`.
5. Update `TRUTH.md`, `CHANGELOG.md`, `.cursor/docs/ReCall.md`, `.cursor/docs/Restore-Points.md`.
6. `npm run docs:sync` (green), commit.
7. `npm run release` when ready (requires a GitHub remote).

> Leave `main` untouched unless Jon explicitly asks for a merge.
