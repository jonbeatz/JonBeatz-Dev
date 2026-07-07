# Nextjs-Tailwind-Bootstrap — Tailwind v4 Setup Checklist

## When to use this skill
- Bootstrapping a new Next.js project from the shared-profile-content skeleton
- Diagnosing why Tailwind utility classes (like `fixed`, `inset-0`, `flex`, `z-30`) appear to do nothing
- Setting up the PostCSS pipeline for the first time on a new project

## Critical Context

The skeleton standardizes on **Tailwind CSS v4** (Next.js 16 + Turbopack). The `bootstrap-new-project.ps1 -Website` flag already writes `app/globals.css` (with `@import "tailwindcss";`) and `postcss.config.mjs` (with `@tailwindcss/postcss`). You still must **install the packages** — without them, all `className` utilities are silently ignored and the page appears unstyled.

> **Do not mix v3 and v4.** v4 has no `tailwind.config.js`, no `@tailwind base/components/utilities` directives, and no `autoprefixer`/`postcss` peer packages. If you find those in a project, it was set up for v3 — migrate it to v4 rather than mixing.

## Installation

```powershell
npm install -D tailwindcss @tailwindcss/postcss
```

## Configuration Files

### `postcss.config.mjs`
```js
const config = {
  plugins: { '@tailwindcss/postcss': {} },
}
export default config
```

### `app/globals.css`
Tailwind v4 is imported with a single line at the top. Theme tokens live in a `@theme` block (or plain CSS variables) — there is **no** `tailwind.config.ts`.

```css
@import "tailwindcss";

@theme {
  --color-accent: #ff2a36;
  --color-bg-deep: #040405;
  --color-text-primary: #f0f0f0;
}

:root {
  --accent: #ff2a36;
}
```

### Google Fonts
Prefer `next/font` over CSS `@import`. If you must use `@import url(...)`, it has to appear **above** the `@import "tailwindcss";` line (CSS requires `@import` first).

## Verification

```powershell
npm run web:build
```

Then in the browser console confirm utilities produce CSS:

```js
const el = document.createElement('div')
el.className = 'fixed inset-0 z-0'
document.body.appendChild(el)
getComputedStyle(el).position  // 'fixed'
getComputedStyle(el).zIndex    // '0'
el.remove()
```

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `className` has no effect | Tailwind not installed | `npm install -D tailwindcss @tailwindcss/postcss` |
| Build error `Cannot find module 'tailwindcss'` | Package missing | install as above |
| Build error about `@tailwind` directive | Using v3 syntax | replace `@tailwind base/components/utilities` with `@import "tailwindcss";` |
| PostCSS not processing | Wrong plugin | `postcss.config.mjs` must use `@tailwindcss/postcss`, not `tailwindcss` + `autoprefixer` |
| Canvas renders ~150px tall | Parent `fixed inset-0` not applying | Tailwind not compiling — verify install |

## Anti-Slop
- **No assuming Tailwind is pre-installed** — the skeleton ships the config but not the packages; always install.
- **No v3 syntax in a v4 project** — no `tailwind.config.ts`, no `@tailwind` directives, no `autoprefixer`.
- **Verify before claiming done** — run the build and check computed styles.
