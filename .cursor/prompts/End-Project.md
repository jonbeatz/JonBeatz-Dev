# End Project — JONBEATZ.DEV

## Trigger
**End Project**, **End Session**, **Close Session**

## Steps

1. Update `.cursor/docs/ReCall.md` and `.cursor/docs/project-log.md` with this session's outcomes.
2. `npm run docs:sync` (encoding + alignment audit).
3. Optional: `npm run mem0:add -- "session summary ..."` (scope jonbeatz_dev).
4. If Jon asks, commit + push, then `npm run backup:quick`.
5. Speak a short farewell once (OmniVoice, ritual-only):

```powershell
npm run jarvis:speak -- "Session saved, Jon. Powering down."
```

6. Run `npm run session:stop` (also stops the OmniVoice daemon to free RAM).
7. Closeout line: **"Great work Jon — JONBEATZ.DEV session saved."**
