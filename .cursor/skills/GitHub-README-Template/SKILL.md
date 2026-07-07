# GitHub-README-Template — GitHub README Template

**Purpose:** Standard template for all VaderLabz/JonBeatz ecosystem GitHub project READMEs.
**Primary Reference:** `D:\Hermes\projects\JonBeatz\README.md` (JonBeatz-Command-Center) — the canonical style.
**Secondary Reference:** `D:\Hermes\projects\VaderLabz\README.md` (VaderLabz) — adapted for project sites.

## Canonical Format (from JonBeatz-Command-Center)

### Badge Row Style
All badges use **shields.io** with `logo=` parameter for icon integration:

```
[![Platform](https://img.shields.io/badge/Platform-Windows_10%2F11-0078D6?logo=windows)]()
[![Version](https://img.shields.io/badge/version-X.X.X-blue)]()
[![Release](https://img.shields.io/github/v/release/jonbeatz/RepoName?label=release&sort=semver)]()
[![Repo](https://img.shields.io/badge/GitHub-username%2FRepoName-181717?logo=github)]()
[![License](https://img.shields.io/badge/license-MIT-green)]()
[![Framework](https://img.shields.io/badge/Framework-Version-black?logo=next.js)]()
[![Mem0](https://img.shields.io/badge/Mem0-local_qdrant-purple)]()
[![LM Studio](https://img.shields.io/badge/LM_Studio-port_1234-blue)]()
```

Key rules:
- Use `?logo=<icon>` for branded badges (GitHub, Next.js, Node.js, Windows, etc.)
- Use hex color codes for background color (e.g. `-181717` for GitHub black)
- NO `style=flat-square` — the default GitHub-style badges look cleaner with the logo icons
- First badge is always **Platform** or category identifier

### Hero Image
A single large hero screenshot at the top, below the badges:
```
![Project Hero](path/to/hero-image.png)
```

### Source of Truth Banner
```
> **Single source of truth:** Read **[`TRUTH.md`](TRUTH.md)** first, then **[`.cursor/docs/START-HERE.md`](.cursor/docs/START-HERE.md)**.
```

### Section Structure (Numbered)
1. **Header** — title + tagline + badges + hero image
2. **Current Status** — table with Version, Stack, Status emoji, Live Site, Verified
3. **Screenshots** — sectioned with descriptions
4. **Project Overview** — numbered section explaining what it does
5. **Tech Stack** — table with Layer, Technology, Purpose columns
6. **Pages/Routes** — for web projects
7. **Quick Start** — clone + install + dev command
8. **Architecture** — tree diagram
9. **Available Commands** — command table
10. **Documentation** — linked doc table
11. **Design System** — if applicable
12. **License**

### Status Table Format
```
| Metric | Value |
| :--- | :--- |
| **Version** | `vX.X.X` · [Latest release](link) |
| **Stack** | ... |
| **Status** | 🟢 / ⚡ / 🔴 |
```

### Screenshots Section
```
## Screenshots

### Section Title

![Description](path/to/screenshot.png)
*Caption describing the screenshot.*
```

## Rules

- Hero screenshot goes at top below badges (before the divider)
- Use `----` as section divider
- Numbered sections: `## 1.`, `## 2.`, etc.
- Use emoji in the Status table for visual cues
- Always link TRUTH.md and START-HERE.md in the source of truth banner
- Screenshots go in `public/media/` or root-level `media/` folder
- Always link to the latest release in the Status table
