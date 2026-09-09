# INVOICING.md — Fleet client invoice system (Jon Farrell)

**Scope:** Freelance / client **invoices** (Word DOCX + vault ledger).  
**Not this doc:** API/cloud spend (`deepseek:billing-*`, GCP Vertex, LiteLLM) — those are stack cost controls, not client billing.

**Status:** Fleet standard as of **2026-08-14** (proven on PullaraLaw).  
**Canonical vault root:** `H:\Vader_Vault\_attachments\invoices\JonFarrell\`

---

## Why this exists

Any Hermes profile (JonBeatz Command Center or a sibling) should answer:

> “What did we invoice for X?” / “Where is Tony’s invoice?” / “Was PullaraLaw paid?”

…by following **one** system: vault ledger + issued files + project hub Billing + optional profile `INVOICING-<PROJECT>.md`.

---

## Architecture (three layers)

| Layer | What lives here | Rule |
|-------|-----------------|------|
| **1. Vault (SoT for money + files)** | Ledger, templates, `issued/` DOCX, `clients/<Client>/` | Amounts, paid dates, binaries |
| **2. Fleet doc (this file)** | How the system works | Portable; sync to every profile via `sync:docs` |
| **3. Project** | Hub `01_Projects/<Name>.md` → **Billing** + optional `.cursor/docs/INVOICING-<PROJECT>.md` | Status + local asset paths — **link** vault, don’t fork amounts |

**Golden rule (matches Vader Vault):** link, don’t duplicate ledgers into every repo.

---

## Vault folder map

```
H:\Vader_Vault\_attachments\invoices\JonFarrell\
  INVOICE-LEDGER.md          ← search here first
  README.md                  ← short pointer (if present)
  templates\                 ← MASTER_1page / MASTER_full / blank / logo
  issued\                    ← JF-YYYY-MMDD-##_Client_….docx
  clients\<Client>\          ← per-client copies of sent finals
```

**Patterns (wikilink from hubs):**

- `Pattern-Invoice-tracking-vault` — findability + issue/send/pay checklist  
- `Pattern-Invoice-list-rate-courtesy-discount` — $60 list / $40 courtesy layout  

---

## Defaults (Jon Farrell)

| Setting | Value |
|---------|--------|
| List rate | **$60.00** / hour (show on line items) |
| Close-friend / partner effective | **$40.00** / hour |
| Discount display | **Dollar** amount = hours × $20 (not a messy %) |
| Number format | `JF-YYYY-MMDD-##` (sequence per calendar day) |
| **Preferred template** | `templates/JonFarrell_Invoice_MASTER_DEFAULT.docx` (= `MASTER_1page`) — layout from the 2026-08-13 PullaraLaw invoice, genericized |
| Layout source (filled archive) | `templates/_source_layout_Jon_Farrell_08_13_2026_Invoice_PullaraLaw.docx` |
| Payment channels (public) | Venmo / Zelle — see ledger header |

### Get a blank invoice to fill

From **JonBeatz** (or any profile with the alias after `fleet:merge-npm`):

```powershell
npm run invoice:template
# optional:
npm run invoice:template -- -ClientSlug Acme
```

Copies DEFAULT to Desktop as `JF-Invoice-DRAFT_<Client>_<date>.docx`.

**Chat:** say **invoice template** / **new invoice** / **give me the invoice template**.

Placeholders inside: `[CLIENT NAME]`, `[CLIENT / COMPANY]`, `[PROJECT / ENGAGEMENT]`, `[SERVICE CATEGORY]`, `JF-YYYY-MMDD-##`, `MM/DD/YYYY`, line descriptions, `$[DISCOUNT]`, `[HOURS]`, totals at `0.00`.

---

## Workflow — issue → send → pay

1. **Create** from vault MASTER → save as `issued/JF-YYYY-MMDD-##_ClientShort_….docx`.
2. **Copy** to `clients/<Client>/` (and project `assets/invoices/` when the profile keeps working copies).
3. **Log** a row in `INVOICE-LEDGER.md` (hours, list, discount, due, file path).
4. **Send** to client (email + any PDFs/reports). Note date in ledger Notes.
5. **On payment:** append **`PAID YYYY-MM-DD`** in ledger Notes; update project hub Billing; optional Mem0/Draven one-liner (**no** bank secrets).
6. **Session close:** vault session note + project ReCall if delivery closed that day.

### Agent lookup order

1. `H:\Vader_Vault\_attachments\invoices\JonFarrell\INVOICE-LEDGER.md`  
2. `issued/` + `clients/<Client>/`  
3. `H:\Vader_Vault\01_Projects\<Project>.md` → Billing  
4. Profile `.cursor/docs/INVOICING-<PROJECT>.md` if present  
5. Mem0 / Draven (runtime recall)

### Chat phrases that should resolve here

- “what did we invoice …” / “invoice for …” / “was … paid” / “where is the invoice file”

---

## Per-project profile index (optional but recommended)

When a client engagement is non-trivial, add:

`.cursor/docs/INVOICING-<PROJECT>.md`

Contents: final sent filename, vault `JF-…` id, amount, paid date, links to ledger + hub.  
**Example:** PullaraLaw → `INVOICING-PULLARALAW.md` (project-specific; **not** in universal sync list).

Point that file **up** to this fleet doc:

> System: see fleet [INVOICING.md](./INVOICING.md)

---

## Example (PullaraLaw — first full run)

| Field | Value |
|-------|--------|
| Final sent | `JF-2026-0813-01_PullaraLaw_FINAL_sent.docx` |
| Also | profile `assets/Jon_Farrell_08_13_2026_Invoice_PullaraLaw.docx` |
| Amount | $280 courtesy (7h @ $40) |
| Status | **PAID 2026-08-14** |
| Hub | `01_Projects/PullaraLaw.md` |

---

## Distinguishing “billing” words

| Phrase | Means |
|--------|--------|
| **Invoice / client invoice / JF-… / paid** | **This system** (vault ledger) |
| **`deepseek:billing-stop` / billing mode / GCP billing** | Stack cost (LiteLLM vs local LM Studio / cloud APIs) |

Do not mix the two in docs or agent answers.

---

## Fleet maintenance

| Change | Where |
|--------|--------|
| How invoices work | Edit **this file** under `_core-scripts/shared-profile-content/docs/` first |
| Propagate | From JonBeatz: `npm run sync:docs -- -Write -AddMissing` then `npm run fleet:sync` |
| New money/files | Vault ledger + `issued/` only |
| New project | Hub Billing section + optional `INVOICING-<PROJECT>.md` |

**Allowlist:** `INVOICING.md` is in `sync-docs.ps1` / bootstrap `$universalDocs` (skeleton v1.32.4+).

---

## Related

- Vault AGENTS.md → `_attachments/` row  
- Command Center: [COMMAND-CENTER.md](./COMMAND-CENTER.md)  
- PullaraLaw mail (separate): project `FLUENTSMTP-BREVO.md` — not invoicing  
