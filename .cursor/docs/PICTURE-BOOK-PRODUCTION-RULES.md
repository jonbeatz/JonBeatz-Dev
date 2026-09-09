# Picture Book Production Rules — Locked Workflow

**Status:** LOCKED · **Date:** 2026-07-23 · **Applies to:** all Hermes children's picture-book projects  
**Canonical home:** `_core-scripts/shared-profile-content/docs/PICTURE-BOOK-PRODUCTION-RULES.md`  
**Project mirrors:** `.cursor/docs/PICTURE-BOOK-PRODUCTION-RULES.md` (via `npm run sync:docs -- -Write -AddMissing`)

> These rules keep model picks visual, book-order reviewable, and verdicts durable across sessions.  
> **2026-07-23:** Added §5 FINALS-CHECKLIST gate + matter audit-first / multi-count / closing-copy rules.  
> **2026-07-24:** Added §6 — every locked unit must have unit-root **RECIPE.md** + **meta.json**; agent must verify before reporting locked.

---

## 0. Current-plate pointer (required)

Every book project maintains:

```
Media/generated/mocks/_FLOW-CURRENT.json
```

Maps every page/beat → **path · version · model · status · decided_by · date · notes** (and `gpt_pillar` when used).  
**Flipbook reads this file only.** Agents must not guess “best” art from folder browsing.

---

## 1. Three-Panel Comparison Boards — one per decision

| Panel | Role |
|-------|------|
| **Left** | Klein 9B baseline (**always**) |
| **Center** | The new model being tested |
| **Right** | The current favorite / previous winner |

Label: model · version · cost · resolution · strengths.  
Save: `Media/generated/mocks/{unit}/_INDEX/{unit}-comparison-{YYYY-MM-DD}.png`

**Poem captions (LOCKED 2026-07-22):** every board must show Flow script text under each side.

| Layout | Footer format |
|--------|----------------|
| LEFT/RIGHT spread or split | `LEFT pN — "poem…"` · `RIGHT pN — "poem…"` |
| Single page | `pN — "poem / title text…"` |
| TEXT + IMAGE | `LEFT pN — "poem…"` · `RIGHT pN — "poem…"` or `RIGHT pN — IMAGE — "context…"` when Flow says no text |

**Glanceable tech cue (LOCKED 2026-07-22):** one quiet line under the title — model · size · quality bar.  
Example: `Qwen 2 Pro /edit · 2048×1024 · S3 v07 quality bar`  
No seeds / request IDs on the board (those stay in RECIPE.md).

Poem source: project Flow doc via `scripts/book_poem_map.py`.  
Board helpers: `scripts/book_review_board.py` (`text_image_board` · `seamless_board` · `split_board` · `tech=`).  
Three-panel model tests: `scripts/book-comparison-board.py --unit <beat>` (adds poem strip).

**Going forward:** one prompt → **one board** → one lock.  
Multi-round catch-up boards are **archive**, not active decision noise.

---

## 2. Full-Book Flipbook PDF

After every flow pass / batch:

```
npm run book:flipbook
# → Output/flipbook-{YYYY-MM-DD}.pdf
```

| Spec | Value |
|------|--------|
| Source | **`_FLOW-CURRENT.json` only** |
| Size | 8.5 × 8.5" · sRGB · full bleed · no crop marks |
| Cover | date · source · flow doc · models · plate count |
| Role | **Review only** — not the Lulu print PDF |

**Helper:** `scripts/book-flipbook-assemble.py`

---

## 3. Verdict Card

Last flipbook page. Statuses: `keep` · `keep-leaning` · `reject` · `locked`.

Every verdict **must** include:

- `decided_by` (usually `Jon`)
- `date` (`YYYY-MM-DD`) — required so August reopen is not mush

---

## 4. Hero spend (when using GPT Image 2 High 4K)

GPT High 4K (~$0.40) **only** for spreads Jon marks as pillars in the flow doc **and** `gpt_pillar: true` in `_FLOW-CURRENT.json`.  
**Default finals** = style-lock path (Krea/Qwen + style lock), not GPT.

---

## Always-open doc kit (per book)

Keep the always-open stack thin:

1. Flow / page map  
2. Master production dock (prompts)  
3. Image lane system  
4. Agent runbook (DTP / print)

Everything else = reference.

---

## Agent checklist

1. Plate or verdict changed? → update `_FLOW-CURRENT.json` (`decided_by` + `date`).  
2. Style/model decision? → **one** comparison board → lock.  
3. Flow pass / batch done? → `book:flipbook`.  
4. GPT run? → confirm `gpt_pillar` first.  
5. Before Banana / InDesign batch? → run **FINALS-CHECKLIST** (RES · TRIPLET · FRAME · wardrobe · face · gutter · baked text · poem).  
6. Matter pages wrong size/frame only? → **audit-first** (frame/upscale) — don’t regen content by default.  
7. Multi-count subjects collapsing? → bake count into canvas first; stop dial burns after 2 fails → PS or finals model.  
8. Spread locked / FLOW `keep`? → verify **`Media/development/{unit}/RECIPE.md`** AND **`meta.json`** exist. If either missing → create immediately, then report locked.  
9. Layout / live type? → **`type-inventory.json`** present (§7) before claiming PS→ID fidelity; Merged art + live ID type (not baked body copy).

---

## 5. Pre-finals quality gate (2026-07-23)

Every book keeps a **`FINALS-CHECKLIST.md`** (copy pattern from TNIMS). Grade plates **HIGH / MED / LOW** before spending Banana or assembling print.

| Check | Meaning |
|-------|---------|
| **RES** | Singles 2625² · spreads 5250×2625 + L/R 2625² |
| **TRIP** | Seamless units always have `art.png` + `art-left` + `art-right` |
| **FRAME** | Singles/text FRAME ON · story-spread cream frames = **finals only** |
| **COAT / wardrobe** | Match G0 refs (written lock must equal pixels) |
| **FACE** | Character drift vs G0 |
| **GUTTER** | No baked fold · faces off bisect |
| **TEXT** | No baked letters |
| **POEM** | Matches `book_poem_map` / Flow |
| **RECIPE+meta** | Unit-root `RECIPE.md` + `meta.json` present (§6) |

**Closing copy:** poem blessing / last story line lives on the **story closing** text pocket — do not duplicate onto quiet back-matter pages unless the book map explicitly says so.

---

## 6. Locked-unit RECIPE.md + meta.json (2026-07-24)

Every locked / keep unit under `Media/development/{unit}/` must have **BOTH** files. Created automatically on lock. **Never skip either.**

| File | Path | Role |
|------|------|------|
| **RECIPE.md** | `Media/development/{unit}/RECIPE.md` | Human-readable: unit name, version, model, resolution, seed, date, status, composition notes, art file paths |
| **meta.json** | `Media/development/{unit}/meta.json` | Machine-readable lock record |

**`meta.json` minimum:**

```json
{
  "unit": "S03-eyes-met",
  "version": "v07",
  "status": "keep",
  "date": "2026-07-22",
  "model": "fal-ai/qwen-image-2/pro/edit",
  "resolution": "5250x2625"
}
```

Also preferred: `paths`, `dimensions`, `pages`, `seed`.

**Agent rule:** Do **not** report a spread as locked until both files exist. If missing after a lock, create them immediately from `_FLOW-CURRENT.json` + art paths (+ version-folder RECIPE if present).

Dial `vNN/RECIPE.md` remains for generation history; unit-root pair is the dashboard lock.

---

## 7. Photoshop → InDesign type handoff (2026-08-03)

**Problem:** Matching PS type to live InDesign by eye (bold runs, sizes, leading, kerning, frame boxes) is the #1 layout time sink.

**Locked model for all Hermes picture books:**

1. **Design** type in Photoshop (placement + hierarchy).  
2. On keep/layout lock, write **`type-inventory.json`** (font · size · leading · tracking · color · align · bbox · text · optional bold `runs`).  
3. Export **Merged art** for ID links (fill-0 glow shells OK as **guides only**).  
4. InDesign: create a **style kit** once per book → build **live frames from inventory** → MOCK @ ~35% → hide MOCK.  
5. **Do not** place full PSB layers into InDesign. **Do not** bake body copy as final print type.

**Shadows/glows:** Prefer atmosphere painted into art; avoid Outer Glow/Drop Shadow as the sole body-text treatment.

**Detail + JSON schema:** keep a project doc `PS-TO-ID-TYPE-HANDOFF.md` (TNIMS reference implementation). Fleet rule is this section; per-book inventory paths live in the project.

**Scripts (TNIMS; copy pattern to new books):**

```powershell
npm run book:type:export          # PSB → type-inventory.json
npm run book:type:export:split    # + Media/development/{unit}/type-inventory.json
npm run book:type:validate -- path\to\type-inventory.json
npm run book:type:page-map
npm run book:type:apply           # emit JSX for MCP / File>Scripts
npm run book:type:pipeline        # export → map → validate → emit apply
```

**Agent checklist add:** Layout lock without `type-inventory.json` when type is required → create inventory (or flag Jon) before claiming type fidelity.

---

*Status date: 2026-08-03 (section 7 type handoff).*
