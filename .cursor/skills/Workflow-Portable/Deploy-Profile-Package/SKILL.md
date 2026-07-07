---
name: deploy-profile-package
description: Repo-first deploy workflow using profile preflight, package build, upload, and restart verification.
---

# Deploy Profile + Package (Canonical)

Use this skill for production deployments in this repo.

## Command and docs authority

1. `package.json` is command truth.
2. Project deploy docs define the deploy flow.

## Repo-first deploy flow

1. Run preflight:
   - `npm run deploy:preflight`
2. Build package:
   - `npm run build:deploy` or equivalent
3. Confirm artifact:
   - Deploy archive at repo root
4. Upload artifact to host app path.
5. Restart Node app in cPanel / hosting panel.
6. Verify live routes and error logs.

## Guardrails

- Do not invent or use non-existent script names.
- Do not run local packaging commands in host terminal.
- If deploy docs conflict with commands, follow `package.json` and update docs in same session.
